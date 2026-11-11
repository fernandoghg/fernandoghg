import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import {
  articleSchema, generateArticleId, validateArticles, selectPublicArticles,
  articleTranslationHref, selectSeriesNeighbors,
} from '../src/lib/article-model.ts';
import { articleCategoryIds, articleCategoryLabels } from '../src/data/article-categories.ts';

const root = resolve(import.meta.dirname, '..');
const articles = ['es', 'en'].flatMap((lang) =>
  readdirSync(resolve(root, 'src/content/articles', lang)).filter((file) => file.endsWith('.md')).map((file) => {
    const source = readFileSync(resolve(root, 'src/content/articles', lang, file), 'utf8');
    const [, frontmatter, body] = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    const metadata = Object.fromEntries(frontmatter.split(/\r?\n/).map((line) => {
      const index = line.indexOf(':');
      const value = line.slice(index + 1).trim();
      return [line.slice(0, index), /^(?:"|true$|false$|\d+$)/.test(value) ? JSON.parse(value) : value];
    }));
    return { id: generateArticleId(`${lang}/${file}`, metadata), data: articleSchema.parse(metadata), body };
  }),
);
const editorial = articles.filter((article) => article.data.draft);

test('Catálogo ES/EN: categorías editoriales sin retirar Juegos', () => {
  assert.deepEqual(articleCategoryIds, ['juegos', 'desarrollo', 'proyectos']);
  assert.deepEqual(articleCategoryLabels.desarrollo, { es: 'Desarrollo', en: 'Development' });
  assert.deepEqual(articleCategoryLabels.proyectos, { es: 'Proyectos', en: 'Projects' });
  for (const category of articleCategoryIds) {
    assert.equal(articleSchema.safeParse({ title: 'Title', description: 'Description', published: '2026-10-25', lang: 'en', category }).success, true);
  }
});

test('Ocho borradores editoriales válidos, cuatro parejas y serie web de dos partes', () => {
  validateArticles(articles);
  assert.equal(editorial.length, 8);
  const groups = Map.groupBy(editorial, (article) => article.data.translationKey);
  assert.deepEqual([...groups.keys()].sort(), ['aldarte-como-se-siente-el-mundo', 'crear-mi-web-con-ia-el-experimento', 'el-ultimo-farero-ia-videojuego', 'por-que-mi-propia-web']);
  for (const group of groups.values()) {
    assert.deepEqual(group.map((article) => article.data.lang).sort(), ['en', 'es']);
    assert.equal(new Set(group.map((article) => article.data.series)).size, 1);
    for (const article of group) {
      assert.equal(article.data.seriesPart, article.data.translationKey === 'crear-mi-web-con-ia-el-experimento' ? 2 : 1);
      if (['por-que-mi-propia-web', 'crear-mi-web-con-ia-el-experimento'].includes(article.data.translationKey)) {
        assert.equal(article.data.series, 'fernandoghg-com');
      }
      assert.equal(article.data.published, '2026-10-25');
      assert.equal(article.data.updated, undefined);
      assert.doesNotMatch(article.body, /^# /m, 'El título solo aparece en frontmatter');
      assert.equal(articleTranslationHref(article, articles, '9999-12-31'), undefined);
    }
  }
  assert.deepEqual(selectPublicArticles(articles, '9999-12-31').map((article) => article.id).sort(), [
    'es/mi-experiencia-top-eleven', 'es/mi-experiencia-top-eleven-un-mes-despues',
  ]);
  // Exercise pair resolution without changing any on-disk draft or publishing it.
  const hypothetical = editorial.map((article) => ({ ...article, data: { ...article.data, draft: false } }));
  for (const article of hypothetical) {
    const target = articleTranslationHref(article, hypothetical, '2026-10-25');
    assert.ok(target?.startsWith(article.data.lang === 'es' ? '/en/articles/' : '/es/articulos/'));
    const otherPart = hypothetical.find((candidate) => candidate.data.lang === article.data.lang
      && candidate.data.series === 'fernandoghg-com' && candidate.data.seriesPart !== article.data.seriesPart);
    assert.deepEqual(selectSeriesNeighbors(article, hypothetical, '2026-10-25'), {
      previous: article.data.series === 'fernandoghg-com' && article.data.seriesPart === 2 ? otherPart : undefined,
      next: article.data.series === 'fernandoghg-com' && article.data.seriesPart === 1 ? otherPart : undefined,
    });
  }
});

test('Aldarte conserva el cierre colectivo y el videojuego su nombre inglés', () => {
  const es = editorial.find((article) => article.id === 'es/aldarte-como-se-siente-el-mundo-hoy');
  const en = editorial.find((article) => article.id === 'en/aldarte-how-is-the-world-feeling-today');
  assert.ok(es.body.includes('Aldarte no pretende ser un estudio sociológico ni una medición científica de la felicidad del mundo'));
  assert.ok(es.body.includes('pequeño experimento colectivo'));
  assert.ok(en.body.includes('small collective experiment'));
  for (const article of editorial.filter((article) => article.data.lang === 'en'
    && ['el-ultimo-farero-ia-videojuego', 'por-que-mi-propia-web'].includes(article.data.translationKey))) {
    assert.ok(article.body.includes('The Last Lighthouse Keeper: Worlds of Infinity'));
  }
});
