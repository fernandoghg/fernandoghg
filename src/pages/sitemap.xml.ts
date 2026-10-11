import type { APIRoute } from 'astro';
import { navigation, type Language } from '../data/navigation';
import { aldarte } from '../data/projects';
import { getArticlePaths } from '../lib/articles';
import { articleUrl } from '../lib/article-model';

interface SitemapPage { lang: Language; href: string; translationHref?: string }
const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!);

// Astro calls this endpoint at build time; production serves only sitemap.xml.
export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('El sitemap requiere el dominio canónico en Astro.site');
  const pages: SitemapPage[] = [];
  for (const lang of ['es', 'en'] as const) {
    const other = lang === 'es' ? 'en' : 'es';
    for (const page of Object.keys(navigation[lang]) as (keyof typeof navigation.es)[]) {
      pages.push({ lang, href: navigation[lang][page].href, translationHref: navigation[other][page].href });
    }
    pages.push({ lang, href: aldarte[lang].href, translationHref: aldarte[other].href });
    for (const { props } of await getArticlePaths(lang)) {
      pages.push({ lang, href: articleUrl(props.article), translationHref: props.translationHref });
    }
  }
  const absolute = (href: string) => escapeXml(new URL(href, site).href);
  const entries = pages.map(({ lang, href, translationHref }) => {
    const other = lang === 'es' ? 'en' : 'es';
    const alternates = translationHref ? `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${absolute(href)}" />\n    <xhtml:link rel="alternate" hreflang="${other}" href="${absolute(translationHref)}" />` : '';
    return `  <url>\n    <loc>${absolute(href)}</loc>${alternates}\n  </url>`;
  });
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
