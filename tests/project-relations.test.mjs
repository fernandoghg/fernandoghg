import assert from 'node:assert/strict';
import test from 'node:test';
import { articleSchema } from '../src/lib/article-model.ts';
import { projectPairs } from '../src/data/projects.ts';
import { relatedArticlesForProject, relatedProjectForArticle, validateProjectRelations } from '../src/lib/project-relations.ts';

const today = '2026-10-30';
function article(id, extra = {}) {
  return { id, data: articleSchema.parse({
    title: id, description: 'Test', lang: id.slice(0, 2), category: 'proyectos',
    published: today, draft: false, series: 'aldarte', seriesPart: 2, ...extra,
  }) };
}

test('Asociaciones únicas y resolución inversa con nombre y URL del idioma del artículo', () => {
  validateProjectRelations(projectPairs);
  assert.throws(() => validateProjectRelations([projectPairs[0], { ...projectPairs[1], series: projectPairs[0].series }]), /Serie asociada a varios proyectos/);
  for (const pair of projectPairs) {
    for (const lang of ['es', 'en']) {
      const related = relatedProjectForArticle(article(`${lang}/test`, { series: pair.series }), today);
      assert.equal(related.href, pair[lang].href);
      assert.equal(related.name, pair[lang].name);
    }
  }
});

test('Selección por proyecto, idioma, visibilidad y orden de parte sin mutaciones', () => {
  const entries = [
    article('es/last', { seriesPart: 9, published: '2020-01-01' }),
    article('en/english'),
    article('es/draft', { draft: true, seriesPart: 3 }),
    article('es/future', { published: '2026-10-31', seriesPart: 4 }),
    article('es/other', { series: 'el-ultimo-farero' }),
    article('es/first'),
  ];
  const original = structuredClone(entries);
  const result = relatedArticlesForProject(entries, projectPairs[0].es.href, 'es', today);
  assert.deepEqual(result, [
    { title: 'es/first', href: '/es/articulos/first/' },
    { title: 'es/last', href: '/es/articulos/last/' },
  ]);
  assert.deepEqual(relatedArticlesForProject(entries, projectPairs[0].en.href, 'en', today), [
    { title: 'en/english', href: '/en/articles/english/' },
  ]);
  assert.deepEqual(entries, original);
  assert.deepEqual(relatedArticlesForProject(entries, projectPairs[0].es.href, 'en', today), []);
  assert.deepEqual(relatedArticlesForProject(entries, '/unknown/', 'es', today), []);
});

test('Sin enlaces de proyecto para Top Eleven, serie web, artículo sin serie, borradores o futuros', () => {
  for (const extra of [
    { series: 'top-eleven' }, { series: 'fernandoghg-com' },
    { series: undefined, seriesPart: undefined },
    { draft: true }, { published: '2026-10-31' },
  ]) assert.equal(relatedProjectForArticle(article('es/test', extra), today), undefined);
});

test('Una pareja solo con borradores o futuros no genera artículos relacionados', () => {
  const entries = [article('es/draft', { draft: true }), article('es/future', { published: '9999-12-31' })];
  for (const lang of ['es', 'en']) {
    assert.deepEqual(relatedArticlesForProject(entries, projectPairs[0][lang].href, lang, today), []);
  }
});
