import assert from 'node:assert/strict';
import test from 'node:test';
import {
  articleSchema, articleLanguageHref, articleUrl, currentArticleDate,
  formatArticleDate, generateArticleId, selectPublicArticles, selectSeriesArticles,
  validateArticles, selectSeriesNeighbors,
} from '../src/lib/article-model.ts';

const metadata = {
  title: 'Título', description: 'Descripción', published: '2013-05-17',
  lang: 'es', category: 'juegos', draft: false,
};
function article(id, extra = {}) {
  return { id, data: articleSchema.parse({ ...metadata, ...extra }) };
}

test('El esquema omite opcionales, protege por defecto y normaliza texto', () => {
  const data = articleSchema.parse({ ...metadata, title: '  Título  ', draft: undefined });
  assert.equal(data.draft, true);
  assert.equal(data.title, 'Título');
  assert.equal(data.updated, undefined);
  for (const extra of [{ updated: null }, { slug: 'otro' }, { author: 'Otro' }, { category: 'juego' }, { lang: 'fr' }, { title: ' ' }, { description: ' ' }, { description: 'a\nb' }, { description: 'a'.repeat(301) }]) {
    assert.equal(articleSchema.safeParse({ ...metadata, ...extra }).success, false);
  }
});

test('Fechas reales y actualización sustancial explícita', () => {
  for (const published of ['17/05/2013', '2023-02-29', '2026-02-31', new Date('2013-05-17')]) {
    assert.equal(articleSchema.safeParse({ ...metadata, published }).success, false);
  }
  assert.equal(articleSchema.safeParse({ ...metadata, published: '2024-02-29' }).success, true);
  assert.equal(articleSchema.safeParse({ ...metadata, updated: '2013-05-16' }).success, false);
  assert.equal(articleSchema.safeParse({ ...metadata, updated: '2013-05-17' }).success, true);
});

test('series y seriesPart juntos; parte entera positiva e identificadores seguros', () => {
  for (const extra of [{ series: 'serie' }, { seriesPart: 1 }, { series: 'serie', seriesPart: 0 }, { series: 'serie', seriesPart: 1.5 }, { translationKey: 'Clave ES' }, { series: 'Serie', seriesPart: 1 }]) {
    assert.equal(articleSchema.safeParse({ ...metadata, ...extra }).success, false);
  }
  assert.equal(articleSchema.safeParse({ ...metadata, series: 'serie', seriesPart: 1 }).success, true);
});

test('IDs Windows/POSIX y nombres inválidos o idioma incoherente', () => {
  assert.equal(generateArticleId('es/articulo-1.md', metadata), 'es/articulo-1');
  assert.equal(generateArticleId('es\\articulo-1.md', metadata), 'es/articulo-1');
  for (const file of ['es/Artículo.md', 'es/sub/articulo.md', 'es/articulo_.md', 'en/articulo.md', 'es/articulo.mdx', '../articulo.md', 'es/articulo--1.md']) {
    assert.throws(() => generateArticleId(file, metadata));
  }
});

test('Publicación: fecha inclusiva, drafts y futuros fuera; orden original y desempate estable', () => {
  const entries = [
    article('es/z', { published: '2013-05-17', updated: '2026-10-04' }),
    article('es/a', { published: '2013-05-17' }),
    article('es/hoy', { published: '2026-10-04' }),
    article('es/futuro', { published: '2026-10-05' }),
    article('es/borrador', { draft: true }),
    article('en/english', { lang: 'en' }),
  ];
  const original = entries.map((entry) => entry.id);
  assert.deepEqual(selectPublicArticles(entries, '2026-10-04', 'es').map((entry) => entry.id), ['es/hoy', 'es/a', 'es/z']);
  assert.deepEqual(entries.map((entry) => entry.id), original);
  assert.deepEqual(selectPublicArticles(entries, '2013-05-16'), []);
  assert.throws(() => selectPublicArticles(entries, '04/10/2026'));
});

test('Validación global incluye borradores y detecta duplicados de traducción/serie/ID', () => {
  const base = article('es/uno', { translationKey: 'clave', series: 'serie', seriesPart: 1 });
  assert.throws(() => validateArticles([base, article('es/dos', { translationKey: 'clave', draft: true })]), /Traducción duplicada/);
  assert.throws(() => validateArticles([base, article('es/dos', { series: 'serie', seriesPart: 1, draft: true })]), /Parte de serie duplicada/);
  assert.throws(() => validateArticles([base, base]), /ID de artículo duplicado/);
  assert.throws(() => validateArticles([{ ...base, id: 'en/uno' }]), /ID o idioma/);
  assert.throws(() => validateArticles([{ ...base, id: 'es/Uno' }]), /ID o idioma/);
  assert.doesNotThrow(() => validateArticles([base, article('en/two', { lang: 'en', translationKey: 'clave', series: 'serie', seriesPart: 1 })]));
});

test('Traducción con slug distinto; ausente, borrador o futura llevan a portada', () => {
  const es = article('es/original', { translationKey: 'clave' });
  const en = article('en/different-slug', { lang: 'en', translationKey: 'clave', published: '2013-05-18' });
  assert.equal(articleUrl(es), '/es/articulos/original/');
  assert.equal(articleLanguageHref(es, [es, en], '2026-10-04'), '/en/articles/different-slug/');
  assert.equal(articleLanguageHref(en, [es, en], '2026-10-04'), '/es/articulos/original/');
  assert.equal(articleLanguageHref(es, [es], '2026-10-04'), '/en/');
  assert.equal(articleLanguageHref(es, [es, { ...en, data: { ...en.data, draft: true } }], '2026-10-04'), '/en/');
  assert.equal(articleLanguageHref(es, [es, en], '2013-05-17'), '/en/');
  assert.equal(articleLanguageHref(article('es/solo'), [en], '2026-10-04'), '/en/');
});

test('Series públicas ordenadas por parte, con huecos y traducciones parciales', () => {
  const entries = [
    article('es/tres', { series: 'serie', seriesPart: 3, published: '2013-05-16' }),
    article('es/uno', { series: 'serie', seriesPart: 1 }),
    article('es/dos', { series: 'serie', seriesPart: 2, draft: true }),
    article('en/one', { series: 'serie', seriesPart: 1, lang: 'en' }),
  ];
  assert.deepEqual(selectSeriesArticles(entries, 'serie', 'es', '2026-10-04').map((entry) => entry.id), ['es/uno', 'es/tres']);
});

test('Localización larga y día editorial de Madrid en horario de verano e invierno', () => {
  assert.equal(formatArticleDate('2013-05-17', 'es'), '17 de mayo de 2013');
  assert.equal(formatArticleDate('2013-05-17', 'en'), '17 May 2013');
  assert.equal(currentArticleDate(new Date('2026-10-03T22:30:00Z')), '2026-10-04');
  assert.equal(currentArticleDate(new Date('2026-12-03T22:30:00Z')), '2026-12-03');
  assert.equal(currentArticleDate(new Date('2026-12-03T23:30:00Z')), '2026-12-04');
});

test('Vecinos: dos entregas, extremos, única entrega y artículo sin serie', () => {
  const first = article('es/primero', { series: 'serie', seriesPart: 1 });
  const last = article('es/ultimo', { series: 'serie', seriesPart: 2 });
  const today = '2026-10-04';
  assert.deepEqual(selectSeriesNeighbors(first, [last, first], today), { previous: undefined, next: last });
  assert.deepEqual(selectSeriesNeighbors(last, [last, first], today), { previous: first, next: undefined });
  assert.deepEqual(selectSeriesNeighbors(first, [first], today), { previous: undefined, next: undefined });
  assert.deepEqual(selectSeriesNeighbors(article('es/sin-serie'), [first, last], today), { previous: undefined, next: undefined });
  assert.deepEqual(selectSeriesNeighbors(last, [first], today), { previous: undefined, next: undefined });
});

test('Vecinos: huecos, orden por parte, fecha inclusiva, aislamiento y sin mutaciones', () => {
  const today = '2026-10-04';
  const first = article('es/primero', { series: 'serie', seriesPart: 1, published: today });
  const middle = article('es/medio', { series: 'serie', seriesPart: 4, published: '2013-05-16' });
  const last = article('es/ultimo', { series: 'serie', seriesPart: 8 });
  const draft = article('es/borrador', { series: 'serie', seriesPart: 2, draft: true });
  const future = article('es/futuro', { series: 'serie', seriesPart: 6, published: '2026-10-05' });
  const enFirst = article('en/first', { lang: 'en', series: 'serie', seriesPart: 1 });
  const enLast = article('en/last', { lang: 'en', series: 'serie', seriesPart: 5 });
  const entries = [last, draft, enLast, first, future, middle, enFirst,
    article('es/otra', { series: 'otra-serie', seriesPart: 3 }), article('es/sin-serie')];
  const snapshot = structuredClone(entries);
  entries.forEach((entry) => { Object.freeze(entry.data); Object.freeze(entry); });
  Object.freeze(entries);
  assert.deepEqual(selectSeriesNeighbors(middle, entries, today), { previous: first, next: last });
  assert.deepEqual(selectSeriesNeighbors(first, entries, today), { previous: undefined, next: middle });
  assert.deepEqual(selectSeriesNeighbors(last, entries, today), { previous: middle, next: undefined });
  assert.deepEqual(selectSeriesNeighbors(enFirst, entries, today), { previous: undefined, next: enLast });
  assert.deepEqual(selectSeriesNeighbors(enLast, entries, today), { previous: enFirst, next: undefined });
  for (const hidden of [draft, future]) assert.deepEqual(selectSeriesNeighbors(hidden, entries, today), { previous: undefined, next: undefined });
  assert.deepEqual(selectSeriesNeighbors(first, entries, '2026-10-03'), { previous: undefined, next: undefined });
  assert.deepEqual(entries, snapshot);
});
