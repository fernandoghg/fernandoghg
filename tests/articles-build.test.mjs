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
  checkNavigationFiles();
  checkSecurityHeadersAndTable();
}
function output(file) { return readFileSync(resolve(root, 'dist', file), 'utf8'); }

const canonicalOrigin = 'https://fernandoghg.com';
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, name, value]) => [name, value.replace(/&(?:amp|quot|apos|#39|lt|gt);/g, (entity) => ({ '&amp;': '&', '&quot;': '"', '&apos;': "'", '&#39;': "'", '&lt;': '<', '&gt;': '>' })[entity])]));
}
function seo(file) {
  const html = output(file);
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const canonicals = links.filter((link) => link.rel === 'canonical');
  const errorPage = file === '404.html';
  assert.equal(canonicals.length, errorPage ? 0 : 1, `Canonical de contenido: ${file}`);
  const pathname = file === 'index.html' ? '/es/' : `/${file.replaceAll('\\', '/').replace(/index\.html$/, '')}`;
  if (!errorPage) assert.equal(canonicals[0].href, `${canonicalOrigin}${pathname}`, file);
  const robots = metas.filter((meta) => meta.name === 'robots');
  assert.deepEqual(robots.map((meta) => meta.content), ['noindex'], file);
  const alternates = links.filter((link) => link.hreflang !== undefined);
  if (errorPage) assert.deepEqual(alternates, [], file);
  assert.ok(alternates.every((link) => link.rel === 'alternate' && ['es', 'en'].includes(link.hreflang)), file);
  assert.equal(new Set(alternates.map((link) => link.hreflang)).size, alternates.length, file);
  if (file !== 'index.html') {
    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0];
    assert.ok(head, file);
    for (const tag of html.match(/<link\b[^>]*>/g) ?? []) {
      if (/rel="canonical"|hreflang=/.test(tag)) assert.ok(head.includes(tag), file);
    }
    assert.equal(metas.filter((meta) => meta.name === 'description').length, 1, file);
  }
  return { canonical: canonicals[0]?.href, alternates, description: metas.find((meta) => meta.name === 'description')?.content };
}

function checkNavigationFiles() {
  const xml = output('sitemap.xml');
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9" xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml">/);
  assert.match(xml, /<\/urlset>\s*$/);
  assert.doesNotMatch(xml, /<lastmod>|<priority>|<changefreq>|x-default/);
  const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>((?:\s*<xhtml:link\b[^>]*\/>)*\s*)<\/url>/g)];
  assert.equal(entries.length, [...xml.matchAll(/<url>/g)].length);
  const urls = entries.map(([, loc]) => loc);
  assert.equal(new Set(urls).size, urls.length);
  const files = readdirSync(resolve(root, 'dist'), { recursive: true }).filter((file) => file.endsWith('.html') && !['index.html', '404.html'].includes(file));
  assert.deepEqual([...urls].sort(), files.map((file) => seo(file).canonical).sort());
  assert.ok(!urls.includes(`${canonicalOrigin}/`));
  assert.ok(!urls.some((url) => /\/404(?:\.html|\/)?$/.test(url)));
  for (const [, loc, links] of entries) {
    const url = new URL(loc);
    assert.equal(url.origin, canonicalOrigin);
    assert.equal(url.search + url.hash, '');
    const metadata = seo(`${url.pathname.slice(1)}index.html`);
    const alternates = [...links.matchAll(/<xhtml:link\b[^>]*\/>/g)].map(([tag]) => attributes(tag));
    assert.deepEqual(alternates, metadata.alternates, loc);
  }

  const robots = output('robots.txt');
  assert.equal(robots, readFileSync(resolve(root, 'public/robots.txt'), 'utf8'));
  const groups = [];
  const sitemaps = [];
  let group;
  for (const line of robots.split(/\r?\n/).map((line) => line.replace(/#.*$/, '').trim()).filter(Boolean)) {
    const match = line.match(/^(User-agent|Allow|Disallow|Sitemap):\s*(\S+)$/i);
    assert.ok(match, `Directiva robots inválida: ${line}`);
    const [, name, value] = match;
    if (name.toLowerCase() === 'sitemap') { sitemaps.push(value); continue; }
    if (name.toLowerCase() === 'user-agent') {
      if (!group || group.rules.length) { group = { agents: [], rules: [] }; groups.push(group); }
      group.agents.push(value.toLowerCase());
    } else {
      assert.ok(group);
      group.rules.push([name.toLowerCase(), value]);
    }
  }
  assert.deepEqual(sitemaps, [`${canonicalOrigin}/sitemap.xml`]);
  function rules(agent) {
    return (groups.find((group) => group.agents.includes(agent.toLowerCase())) ?? groups.find((group) => group.agents.includes('*')))?.rules;
  }
  for (const agent of ['*', 'Googlebot', 'Bingbot', 'OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User']) {
    assert.deepEqual(rules(agent), [['allow', '/']], agent);
  }
  for (const agent of ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot']) assert.deepEqual(rules(agent), [['disallow', '/']], agent);
  assert.deepEqual(groups.filter((group) => group.rules.some(([name]) => name === 'disallow')).flatMap((group) => group.agents).sort(), ['gptbot', 'claudebot', 'google-extended', 'ccbot'].sort());

  const error = output('404.html');
  assert.match(error, /<html lang="es"/);
  assert.match(error, /<meta name="robots" content="noindex"/);
  assert.doesNotMatch(error, /http-equiv="refresh"|aria-current="page"|rel="canonical"|hreflang=/);
  assert.match(error, /class="skip-link" href="#main"/);
  assert.match(error, /<main id="main"[^>]*tabindex="-1"/);
  const main = error.match(/<main\b[\s\S]*?<\/main>/)?.[0];
  assert.ok(main);
  assert.deepEqual([...main.matchAll(/<h([1-6])\b/g)].map((match) => match[1]), ['1', '2']);
  for (const [lang, id, title, text, label, href] of [
    ['es', 'not-found-es', 'Página no encontrada', 'La dirección que buscas no existe o ha cambiado.', 'Volver al inicio', '/es/'],
    ['en', 'not-found-en', 'Page not found', "The page you're looking for doesn't exist or may have moved.", 'Back to home', '/en/'],
  ]) {
    const section = main.match(new RegExp(`<section lang="${lang}" aria-labelledby="${id}">[\\s\\S]*?<\\/section>`))?.[0];
    assert.ok(section, lang);
    assert.ok(section.includes(`id="${id}">${title}</h`));
    assert.ok(section.includes(`<p>${text}</p>`));
    assert.ok(section.includes(`<a href="${href}">${label}</a>`));
  }
}
function checkSeo(file, description, alternates) {
  const actual = seo(file);
  assert.equal(actual.description, description, file);
  assert.deepEqual(Object.fromEntries(actual.alternates.map((link) => [link.hreflang, link.href])), alternates, file);
}
function checkSeoPages() {
  for (const [es, en, esDescription, enDescription] of [
    ['/es/', '/en/', 'Una web personal sobre tecnología, proyectos, videojuegos, simulación y experiencias que merece la pena compartir.', 'A personal website about technology, projects, video games, simulation, and experiences worth sharing.'],
    ['/es/proyectos/', '/en/projects/', 'Proyectos personales relacionados con la tecnología, el desarrollo de aplicaciones y nuevas ideas.', 'Personal projects exploring technology, app development, and new ideas.'],
    ['/es/articulos/', '/en/articles/', 'Artículos sobre tecnología, videojuegos, simulación y otras experiencias, ideas y aprendizajes.', "Articles about technology, video games, simulation, and other experiences, ideas, and things I've learned."],
    ['/es/sobre-mi/', '/en/about/', 'Conoce un poco más sobre Fernando, su relación con la informática y sus aficiones, desde la tecnología hasta la simulación de vuelo.', 'Learn more about Fernando, his background in computing, and his interests, from technology to flight simulation.'],
    ['/es/privacidad/', '/en/privacy/', 'Información sobre la privacidad de fernandoghg.com, el tratamiento de datos personales y los derechos de los visitantes.', "Information about privacy at fernandoghg.com, personal data processing, and visitors' data protection rights."],
    ['/es/proyectos/aldarte/', '/en/projects/aldarte/', 'Un proyecto personal relacionado con el bienestar emocional, con especial atención a la sencillez y la privacidad.', 'A personal project related to emotional wellbeing, with a particular focus on simplicity and privacy.'],
  ]) {
    const alternates = { es: `${canonicalOrigin}${es}`, en: `${canonicalOrigin}${en}` };
    checkSeo(`${es.slice(1)}index.html`, esDescription, alternates);
    checkSeo(`${en.slice(1)}index.html`, enDescription, alternates);
  }
  for (const [slug, title, description, published] of [
    ['mi-experiencia-top-eleven', 'Mi experiencia con Top Eleven', 'Mi experiencia con Top Eleven tras años jugando de forma intermitente: gestión, progresión, anuncios, recursos y el nuevo Complejo Deportivo.', '2025-09-07'],
    ['mi-experiencia-top-eleven-un-mes-despues', 'Mi experiencia con Top Eleven (1 mes más tarde)', 'Balance de una temporada de Top Eleven: plantilla, resultados, costes del Complejo Deportivo y pérdida de calidad al comenzar una nueva temporada.', '2025-10-08'],
  ]) {
    const file = `es/articulos/${slug}/index.html`;
    checkSeo(file, description, {});
    const html = output(file);
    assert.ok(html.includes(`<title>${title} — fernandoghg.com</title>`), file);
    assert.ok(html.includes(`<time datetime="${published}">`), file);
    assert.match(html, /class="language-link" href="\/en\/"/);
    assert.equal(existsSync(resolve(root, `dist/en/articles/${slug}/index.html`)), false);
  }
  checkSeo('index.html', undefined, {});
  assert.match(output('index.html'), /http-equiv="refresh" content="2;url=\/es\/"/);
}

function checkPrivacyPages() {
  const sections = {
    es: ['Responsable del tratamiento', 'Qué datos se tratan', 'Finalidades y bases jurídicas', 'Cookies y seguimiento', 'Alojamiento y servicios externos', 'Conservación de los datos', 'Derechos de protección de datos', 'Cambios en esta política'],
    en: ['Data controller', 'What data is processed', 'Purposes and legal bases', 'Cookies and tracking', 'Hosting and external services', 'Data retention', 'Your data protection rights', 'Changes to this policy'],
  };
  for (const [lang, page, title, date, intro] of [
    ['es', 'privacidad', 'Privacidad', '[fecha de publicación]', 'La privacidad es importante para mí.'],
    ['en', 'privacy', 'Privacy', '[publication date]', 'Privacy matters to me.'],
  ]) {
    const html = output(`${lang}/${page}/index.html`);
    const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.ok(main);
    assert.match(html, /<meta name="robots" content="noindex"/);
    assert.match(main, new RegExp(`<h1>${title}</h1>`));
    assert.deepEqual([...main.matchAll(/<h2>([^<]+)<\/h2>/g)].map((match) => match[1]), sections[lang]);
    assert.equal([...main.matchAll(/<p\b/g)].length, 24);
    assert.ok(main.includes(date));
    assert.ok(main.includes(intro));
    assert.ok(main.indexOf(intro) < main.indexOf('<h2>'));
    assert.ok(main.includes('<strong>Fernando García-Herrera Gómez</strong>'));
    assert.equal([...main.matchAll(/href="mailto:privacidad@fernandoghg.com"/g)].length, 2);
    assert.ok(main.includes('href="https://www.cloudflare.com/privacypolicy/"'));
    assert.ok(main.includes('href="https://www.aepd.es/"'));
    assert.doesNotMatch(main, /Contenido provisional|Temporary content|Página provisional|Temporary page/);
  }
}

function checkProjectPages() {
  for (const [lang, section, other, otherSection, status, back] of [
    ['es', 'proyectos', 'en', 'projects', 'En desarrollo', 'Volver a Proyectos'],
    ['en', 'projects', 'es', 'proyectos', 'In development', 'Back to Projects'],
  ]) {
    const href = `/${lang}/${section}/aldarte/`;
    const detail = output(`${lang}/${section}/aldarte/index.html`);
    assert.match(detail, new RegExp(`<html lang="${lang}"`));
    assert.match(detail, /<title>Aldarte — fernandoghg\.com<\/title>/);
    assert.match(detail, /<meta name="robots" content="noindex"/);
    assert.ok(detail.includes(`class="language-link" href="/${other}/${otherSection}/aldarte/"`));
    assert.ok(detail.includes(`href="/${lang}/${section}/" aria-current="page"`));
    const main = detail.match(/<main\b[\s\S]*?<\/main>/)?.[0];
    assert.ok(main);
    assert.deepEqual([...main.matchAll(/<h([1-6])\b/g)].map((match) => match[1]), ['1']);
    assert.match(main, /<h1>Aldarte<\/h1>/);
    assert.ok(main.includes(status));
    assert.ok(main.includes(`href="/${lang}/${section}/">${back}</a>`));
    assert.doesNotMatch(main, /<(?:img|svg|iframe)\b|href="(?:https?:)?\/\//i);
    const description = detail.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(description);
    for (const [file, level] of [[`${lang}/index.html`, '3'], [`${lang}/${section}/index.html`, '2']]) {
      const html = output(file);
      const card = html.match(/<article class="editorial-row project">[\s\S]*?<\/article>/)?.[0];
      assert.ok(card, file);
      assert.match(card, new RegExp(`<h${level}><a href="${href}">Aldarte</a></h${level}>`));
      assert.ok(card.includes(description), file);
      assert.ok(card.includes(status), file);
      assert.equal([...card.matchAll(/<a\b/g)].length, 1, file);
      assert.match(card, /class="project-status"/);
      assert.doesNotMatch(card, /class="technologies"/);
      assert.doesNotMatch(html, /Ejemplo ficticio|Fictional example|Proyecto de ejemplo|Example project/);
      if (level === '2') {
        const listing = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
        assert.ok(listing);
        assert.deepEqual([...listing.matchAll(/<h([1-6])\b/g)].map((match) => match[1]), ['1', '2']);
        assert.doesNotMatch(listing, /Contenido provisional|Temporary content|Página provisional|Temporary page/);
      }
    }
  }
}

function checkGeneratedResources() {
  const dist = resolve(root, 'dist');
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = resolve(directory, entry.name);
      if (entry.isDirectory()) { visit(file); continue; }
      assert.doesNotMatch(entry.name, /\.(?:[cm]?js)$/i, `JavaScript cliente: ${file}`);
      if (entry.name.endsWith('.html')) {
        const html = readFileSync(file, 'utf8');
        const metadata = seo(file.slice(dist.length + 1));
        if (metadata.alternates.length) {
          assert.equal(metadata.alternates.length, 2, file);
          const lang = html.match(/<html lang="(es|en)"/)?.[1];
          assert.equal(metadata.alternates.find((link) => link.hreflang === lang)?.href, metadata.canonical, file);
          for (const link of metadata.alternates) {
            const url = new URL(link.href);
            assert.equal(url.origin, canonicalOrigin, file);
            assert.equal(url.search + url.hash, '', file);
            const target = `${url.pathname.slice(1)}index.html`;
            const reciprocal = seo(target);
            assert.deepEqual(Object.fromEntries(reciprocal.alternates.map((item) => [item.hreflang, item.href])), Object.fromEntries(metadata.alternates.map((item) => [item.hreflang, item.href])), file);
          }
        }
        assert.doesNotMatch(html, /<script\b/i, `Script inesperado: ${file}`);
        assert.doesNotMatch(html, /<style\b/i, `Bloque style inline: ${file}`);
        // Existing temporary code fixtures exercise Shiki, whose pre has inline colors.
        // Keep that Markdown coverage; the CSP contract applies to every real page.
        const styleCheck = /[\\/]fixture-[^\\/]+[\\/]index\.html$/.test(file)
          ? html.replace(/(<pre\b[^>]*?)\sstyle="background-color:#[0-9a-f]+;color:#[0-9a-f]+; overflow-x: auto;"/gi, '$1')
          : html;
        assert.doesNotMatch(styleCheck, /\sstyle\s*=/i, `Estilo inline: ${file}`);
        const stylesheets = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((link) => link.rel === 'stylesheet');
        if (file !== resolve(dist, 'index.html')) assert.ok(stylesheets.length > 0, `CSS ausente: ${file}`);
        for (const stylesheet of stylesheets) {
          assert.match(stylesheet.href, /^\/_astro\/[^?#]+\.css$/, file);
          assert.ok(existsSync(resolve(dist, stylesheet.href.slice(1))), file);
        }
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

function checkSecurityHeadersAndTable() {
  const headers = output('_headers');
  assert.equal(headers, readFileSync(resolve(root, 'public/_headers'), 'utf8'));
  const lines = headers.trim().split(/\r?\n/);
  assert.deepEqual(lines, [
    '/*',
    "  Content-Security-Policy: default-src 'none'; script-src 'none'; style-src 'self'; img-src 'self'; font-src 'none'; connect-src 'none'; media-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; manifest-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
    '  X-Content-Type-Options: nosniff',
    '  Referrer-Policy: no-referrer',
    '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=()',
    '  X-Frame-Options: DENY',
  ]);
  assert.doesNotMatch(headers, /unsafe-inline|unsafe-eval|Strict-Transport-Security/i);
  assert.ok(lines.every((line) => line.length <= 2000));

  const article = output('es/articulos/mi-experiencia-top-eleven-un-mes-despues/index.html');
  assert.match(article, /class="article-body top-eleven-complex-table"/);
  const table = article.match(/<table>[\s\S]*?<\/table>/)?.[0];
  assert.ok(table);
  const rows = [...table.matchAll(/<tr>[\s\S]*?<\/tr>/g)];
  assert.equal(rows.length, 7);
  for (const [row] of rows) assert.equal([...row.matchAll(/<t[hd]\b/g)].length, 5);
  assert.deepEqual([...table.matchAll(/<th>([^<]+)<\/th>/g)].map(([, text]) => text), ['Instalación', 'Nivel', 'Estado (%)', 'Mantenimiento/Reparación', 'Genera']);
  const cssHref = [...article.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).find((link) => link.rel === 'stylesheet').href;
  const css = output(cssHref.slice(1));
  for (const [columns, alignment] of [[[2, 3], 'center'], [[4, 5], 'left']]) {
    assert.ok(css.includes(columns.map((column) => `.top-eleven-complex-table :is(th,td):nth-child(${column})`).join(',') + `{text-align:${alignment}}`));
  }
  assert.doesNotMatch(output('es/articulos/mi-experiencia-top-eleven/index.html'), /top-eleven-complex-table/);
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
    const fixtureAlternates = { es: `${canonicalOrigin}/es/articulos/fixture-publico/`, en: `${canonicalOrigin}/en/articles/fixture-public/` };
    checkSeo('es/articulos/fixture-publico/index.html', 'Contenido técnico temporal, no publicar.', fixtureAlternates);
    checkSeo('en/articles/fixture-public/index.html', 'Contenido técnico temporal, no publicar.', fixtureAlternates);
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
      const date = file.startsWith('es/') ? '17 may.' : 'May 18';
      const iso = file.startsWith('es/') ? '2013-05-17' : '2013-05-18';
      assert.ok(html.includes(`<time datetime="${iso}">${date}</time>`), file);
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
    for (const slug of ['fixture-single', 'fixture-no-series']) {
      checkSeries(`es/articulos/${slug}/index.html`, '', []);
      checkSeo(`es/articulos/${slug}/index.html`, 'Contenido técnico temporal, no publicar.', {});
    }
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
    checkSeo('es/articulos/fixture-publico/index.html', 'Contenido técnico temporal, no publicar.', {});

    fixture(names[1], { lang: 'en', published: '9999-12-31', translationKey: 'fixture' });
    expectBuild();
    assert.match(output('es/articulos/fixture-publico/index.html'), /class="language-link" href="\/en\/"/);

    checkSeo('es/articulos/fixture-publico/index.html', 'Contenido técnico temporal, no publicar.', {});
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
    assert.equal(restoredHtml.length, 16);
    assert.ok(restoredHtml.every((file) => !file.includes('fixture-')));
    const expectedUrls = [
      '/es/', '/en/', '/es/proyectos/', '/en/projects/', '/es/articulos/', '/en/articles/',
      '/es/sobre-mi/', '/en/about/', '/es/privacidad/', '/en/privacy/',
      '/es/proyectos/aldarte/', '/en/projects/aldarte/',
      '/es/articulos/mi-experiencia-top-eleven/', '/es/articulos/mi-experiencia-top-eleven-un-mes-despues/',
    ].map((path) => `${canonicalOrigin}${path}`);
    assert.deepEqual([...output('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort(), expectedUrls.sort());
    checkProjectPages();
    checkPrivacyPages();
    checkSeoPages();
  }
});
