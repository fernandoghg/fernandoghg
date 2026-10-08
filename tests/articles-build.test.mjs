import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, writeFileSync, unlinkSync, mkdirSync, rmdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
function build() {
  return spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], {
    cwd: root, env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }, encoding: 'utf8',
  });
}
function expectBuild() {
  const result = build();
  assert.equal(result.status, 0, result.error?.message ?? result.stdout + result.stderr);
  checkGeneratedResources();
}
function output(file) { return readFileSync(resolve(root, 'dist', file), 'utf8'); }

function checkGeneratedResources() {
  const dist = resolve(root, 'dist');
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = resolve(directory, entry.name);
      if (entry.isDirectory()) { visit(file); continue; }
      assert.doesNotMatch(entry.name, /\.(?:[cm]?js)$/i, `JavaScript cliente: ${file}`);
      if (entry.name.endsWith('.html')) {
        const html = readFileSync(file, 'utf8');
        assert.doesNotMatch(html, /<script\b/i, `Script inesperado: ${file}`);
        for (const tag of html.match(/<[^>]+>/g) ?? []) {
          const resource = /^<(?:img|iframe|audio|video|source|embed|object)\b/i.test(tag)
            || (/^<link\b/i.test(tag) && /\brel\s*=\s*["'][^"']*\b(?:stylesheet|icon|preload|modulepreload|prefetch|preconnect|dns-prefetch)\b/i.test(tag));
          if (resource) assert.doesNotMatch(tag, /\b(?:src|srcset|href|data|poster)\s*=\s*["']\s*(?:https?:)?\/\//i, `Recurso externo: ${file} ${tag}`);
        }
      } else if (entry.name.endsWith('.css')) {
        const css = readFileSync(file, 'utf8');
        assert.doesNotMatch(css, /(?:url\(\s*["']?\s*|@import\s*["']\s*)(?:https?:)?\/\//i, `Recurso CSS externo: ${file}`);
      }
    }
  }
  visit(dist);
}

test('Build real: Markdown, traducciones públicas, exclusión de drafts/futuros y validación global', () => {
  const names = ['es/fixture-publico.md', 'en/fixture-public.md', 'es/fixture-draft.md', 'en/fixture-future.md', 'es/fixture-duplicate.md'];
  const owned = [];
  const createdDirectories = [];
  function ensureDirectory(directory) {
    if (existsSync(directory)) return;
    ensureDirectory(dirname(directory));
    mkdirSync(directory);
    createdDirectories.push(directory);
  }
  function fixture(name, { lang, draft = false, published = '2013-05-17', translationKey, series, seriesPart } = {}) {
    const file = resolve(root, 'src/content/articles', name);
    if (!owned.includes(file)) {
      assert.equal(existsSync(file), false, `No sobrescribir contenido existente: ${file}`);
      ensureDirectory(dirname(file));
      owned.push(file);
    }
    const frontmatter = [
      '---', `title: "Fixture temporal ${name}"`,
      'description: "Contenido técnico temporal, no publicar."',
      `published: "${published}"`,
      `updated: "${published > '2015-05-17' ? published : '2015-05-17'}"`,
      `lang: ${lang}`, 'category: juegos', `draft: ${draft}`,
      ...(translationKey ? [`translationKey: ${translationKey}`] : []),
      ...(series ? [`series: ${series}`, `seriesPart: ${seriesPart}`] : []), '---',
    ];
    const body = ['## Cuerpo técnico', '', 'Texto **Markdown**.', '', '- Una lista', '', '```text', 'Sin scripts', '```'];
    writeFileSync(file, frontmatter.join('\n') + '\n\n' + body.join('\n') + '\n');
  }
  try {
    fixture(names[0], { lang: 'es', translationKey: 'fixture' });
    fixture(names[1], { lang: 'en', published: '2013-05-18', translationKey: 'fixture' });
    fixture(names[2], { lang: 'es', draft: true });
    fixture(names[3], { lang: 'en', published: '9999-12-31' });
    expectBuild();
    const es = output('es/articulos/fixture-publico/index.html');
    const en = output('en/articles/fixture-public/index.html');
    assert.match(es, /<strong>Markdown<\/strong>/);
    assert.match(es, /17 de mayo de 2013/);
    assert.match(en, /18 May 2013/);
    assert.match(es, /Actualizado:/);
    assert.match(es, /href="\/en\/articles\/fixture-public\/"/);
    assert.match(en, /href="\/es\/articulos\/fixture-publico\/"/);
    for (const file of ['es/articulos/fixture-draft/index.html', 'en/articles/fixture-future/index.html']) {
      assert.equal(existsSync(resolve(root, 'dist', file)), false, file);
    }
    for (const file of ['es/index.html', 'en/index.html', 'es/articulos/index.html', 'en/articles/index.html']) {
      const html = output(file);
      assert.doesNotMatch(html, /fixture-draft|fixture-future/);
      const publicHref = file.startsWith('es/') ? '/es/articulos/fixture-publico/' : '/en/articles/fixture-public/';
      assert.ok(html.includes(`href="${publicHref}"`), `Artículo público ausente: ${file}`);
      const publicTitle = file.startsWith('es/') ? 'Fixture temporal es/fixture-publico.md' : 'Fixture temporal en/fixture-public.md';
      assert.ok(html.includes(publicTitle), `Título público ausente: ${file}`);
    }
    assert.match(output('es/articulos/index.html'), /id="year-2013"/);
    assert.doesNotMatch(es + en, /<script\b/);

    // Published sequences share an identifier across languages, but never links.
    fixture(names[0], { lang: 'es', translationKey: 'fixture', series: 'fixture-series', seriesPart: 1 });
    fixture(names[1], { lang: 'en', translationKey: 'fixture', series: 'fixture-series', seriesPart: 1 });
    fixture(names[2], { lang: 'es', draft: true, series: 'fixture-series', seriesPart: 2 });
    fixture(names[3], { lang: 'en', published: '9999-12-31', series: 'fixture-series', seriesPart: 2 });
    fixture('es/fixture-middle.md', { lang: 'es', series: 'fixture-series', seriesPart: 4, published: '2012-05-17' });
    fixture('es/fixture-last.md', { lang: 'es', series: 'fixture-series', seriesPart: 8, published: '2011-05-17' });
    fixture('es/fixture-series-future.md', { lang: 'es', series: 'fixture-series', seriesPart: 6, published: '9999-12-31' });
    fixture('en/fixture-last.md', { lang: 'en', series: 'fixture-series', seriesPart: 4 });
    fixture('es/fixture-single.md', { lang: 'es', series: 'fixture-single', seriesPart: 1 });
    fixture('es/fixture-single-draft.md', { lang: 'es', series: 'fixture-single', seriesPart: 2, draft: true });
    fixture('es/fixture-no-series.md', { lang: 'es' });
    expectBuild();
    function checkSeries(file, label, links) {
      const html = output(file);
      const nav = html.match(/<nav class="series-navigation"[\s\S]*?<\/nav>/)?.[0];
      if (!links.length) { assert.equal(nav, undefined, file); return; }
      assert.ok(nav, file);
      assert.ok(nav.includes(`aria-label="${label}"`));
      const actual = [...nav.matchAll(/<a href="([^"]+)"/g)].map((match) => match[1]);
      assert.deepEqual(actual, links.map(([href]) => href));
      for (const [href, direction, title] of links) {
        assert.ok(nav.includes(direction), nav);
        assert.ok(nav.includes(title), nav);
        assert.ok(existsSync(resolve(root, 'dist', `.${href}index.html`)), href);
      }
    }
    checkSeries('es/articulos/fixture-publico/index.html', 'Navegación de la serie', [
      ['/es/articulos/fixture-middle/', 'Siguiente artículo', 'Fixture temporal es/fixture-middle.md'],
    ]);
    checkSeries('es/articulos/fixture-middle/index.html', 'Navegación de la serie', [
      ['/es/articulos/fixture-publico/', 'Artículo anterior', 'Fixture temporal es/fixture-publico.md'],
      ['/es/articulos/fixture-last/', 'Siguiente artículo', 'Fixture temporal es/fixture-last.md'],
    ]);
    checkSeries('es/articulos/fixture-last/index.html', 'Navegación de la serie', [
      ['/es/articulos/fixture-middle/', 'Artículo anterior', 'Fixture temporal es/fixture-middle.md'],
    ]);
    checkSeries('en/articles/fixture-public/index.html', 'Series navigation', [
      ['/en/articles/fixture-last/', 'Next article', 'Fixture temporal en/fixture-last.md'],
    ]);
    checkSeries('en/articles/fixture-last/index.html', 'Series navigation', [
      ['/en/articles/fixture-public/', 'Previous article', 'Fixture temporal en/fixture-public.md'],
    ]);
    for (const slug of ['fixture-single', 'fixture-no-series']) checkSeries(`es/articulos/${slug}/index.html`, '', []);
    checkSeries('es/articulos/mi-experiencia-top-eleven/index.html', 'Navegación de la serie', [
      ['/es/articulos/mi-experiencia-top-eleven-un-mes-despues/', 'Siguiente artículo', 'Mi experiencia con Top Eleven (1 mes más tarde)'],
    ]);
    checkSeries('es/articulos/mi-experiencia-top-eleven-un-mes-despues/index.html', 'Navegación de la serie', [
      ['/es/articulos/mi-experiencia-top-eleven/', 'Artículo anterior', 'Mi experiencia con Top Eleven'],
    ]);
    for (const file of readdirSync(resolve(root, 'dist'), { recursive: true }).filter((file) => file.endsWith('.html'))) {
      const html = output(file);
      assert.doesNotMatch(html, /href="[^"]*fixture-(?:draft|future|series-future|single-draft)\//);
      for (const nav of html.matchAll(/<nav class="series-navigation"[\s\S]*?<\/nav>/g)) {
        for (const link of nav[0].matchAll(/<a href="([^"]+)"/g)) {
          assert.ok(existsSync(resolve(root, 'dist', `.${link[1]}index.html`)), link[1]);
          assert.notEqual(link[1].slice(1) + 'index.html', file.replaceAll('\\', '/'));
        }
      }
    }

    fixture(names[1], { lang: 'en', draft: true, translationKey: 'fixture' });
    expectBuild();
    assert.match(output('es/articulos/fixture-publico/index.html'), /class="language-link" href="\/en\/"/);
    assert.equal(existsSync(resolve(root, 'dist/en/articles/fixture-public/index.html')), false);

    fixture(names[1], { lang: 'en', published: '9999-12-31', translationKey: 'fixture' });
    expectBuild();
    assert.match(output('es/articulos/fixture-publico/index.html'), /class="language-link" href="\/en\/"/);

    fixture(names[4], { lang: 'es', draft: true, translationKey: 'fixture' });
    const invalid = build();
    assert.notEqual(invalid.status, 0);
    assert.match(invalid.stdout + invalid.stderr, /Traducción duplicada/);
  } finally {
    for (const file of owned) if (existsSync(file)) unlinkSync(file);
    // Remove only directories created by this test, and only if still empty.
    for (const directory of createdDirectories.reverse()) {
      if (existsSync(directory) && readdirSync(directory).length === 0) rmdirSync(directory);
    }
    // Restore dist to the actual repository content even after a failed assertion.
    expectBuild();
    const restoredHtml = readdirSync(resolve(root, 'dist'), { recursive: true }).filter((file) => file.endsWith('.html'));
    assert.equal(restoredHtml.length, 13);
    assert.ok(restoredHtml.every((file) => !file.includes('fixture-')));
  }
});
