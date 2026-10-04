import { z } from 'astro/zod';
import { articleCategoryIds } from '../data/article-categories.ts';
import { navigation, type Language } from '../data/navigation.ts';

const identifier = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const isoDate = z.iso.date();

export const articleSchema = z.strictObject({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1).max(300).regex(/^[^\r\n]+$/),
  published: isoDate,
  updated: isoDate.optional(),
  lang: z.enum(['es', 'en']),
  category: z.enum(articleCategoryIds),
  draft: z.boolean().default(true),
  translationKey: identifier.optional(),
  series: identifier.optional(),
  seriesPart: z.number().int().positive().optional(),
}).refine(
  ({ published, updated }) => updated === undefined || updated >= published,
  { path: ['updated'], message: 'updated no puede ser anterior a published' },
).refine(
  ({ series, seriesPart }) => (series === undefined) === (seriesPart === undefined),
  { path: ['seriesPart'], message: 'series y seriesPart deben aparecer juntos' },
);

export type ArticleData = z.infer<typeof articleSchema>;
export interface ArticleRecord { id: string; data: ArticleData }

const articleIdPattern = /^(es|en)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;

export function generateArticleId(entry: string, data: Record<string, unknown>): string {
  const normalized = entry.replaceAll('\\', '/');
  if (!normalized.endsWith('.md')) throw new Error(`Extensión de artículo inválida: ${entry}`);
  const id = normalized.slice(0, -3);
  const match = articleIdPattern.exec(id);
  if (!match) throw new Error(`Ruta de artículo inválida: ${entry}. Usa es/<slug>.md o en/<slug>.md.`);
  if (match[1] !== data.lang) throw new Error(`Carpeta e idioma no coinciden: ${entry}`);
  return id;
}

export function validateArticles(articles: readonly ArticleRecord[]): void {
  const ids = new Set<string>();
  const translations = new Set<string>();
  const parts = new Set<string>();
  for (const article of articles) {
    const { id, data } = article;
    const match = articleIdPattern.exec(id);
    if (!match || match[1] !== data.lang) throw new Error(`ID o idioma de artículo inválido: ${id}`);
    if (ids.has(id)) throw new Error(`ID de artículo duplicado: ${id}`);
    ids.add(id);
    if (data.translationKey !== undefined) {
      const key = `${data.translationKey}/${data.lang}`;
      if (translations.has(key)) throw new Error(`Traducción duplicada: ${key}`);
      translations.add(key);
    }
    if (data.series !== undefined) {
      const key = `${data.series}/${data.lang}/${data.seriesPart}`;
      if (parts.has(key)) throw new Error(`Parte de serie duplicada: ${key}`);
      parts.add(key);
    }
  }
}

// One editorial day for both languages, independent of the machine's time zone.
export function currentArticleDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const value = (type: string) => parts.find((part) => part.type === type)!.value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function isPublicArticle(article: ArticleRecord, today: string): boolean {
  return article.data.draft === false && article.data.published <= today;
}

export function selectPublicArticles<T extends ArticleRecord>(articles: readonly T[], today: string, lang?: Language): T[] {
  isoDate.parse(today);
  return articles.filter((article) => isPublicArticle(article, today) && (!lang || article.data.lang === lang))
    .sort((a, b) => b.data.published.localeCompare(a.data.published) || a.id.localeCompare(b.id));
}

export function articleSlug(article: ArticleRecord): string {
  const match = articleIdPattern.exec(article.id);
  if (!match || match[1] !== article.data.lang) throw new Error(`ID o idioma de artículo inválido: ${article.id}`);
  return match[2]!;
}

export function articleUrl(article: ArticleRecord): string {
  return `${navigation[article.data.lang].articles.href}${articleSlug(article)}/`;
}

export function articleLanguageHref(article: ArticleRecord, articles: readonly ArticleRecord[], today: string): string {
  const other = article.data.lang === 'es' ? 'en' : 'es';
  const translation = article.data.translationKey === undefined ? undefined : articles.find((candidate) =>
    candidate.data.lang === other && candidate.data.translationKey === article.data.translationKey && isPublicArticle(candidate, today),
  );
  return translation ? articleUrl(translation) : navigation[other].home.href;
}

export function selectSeriesArticles<T extends ArticleRecord>(articles: readonly T[], series: string, lang: Language, today: string): T[] {
  return selectPublicArticles(articles, today, lang).filter((article) => article.data.series === series)
    .sort((a, b) => a.data.seriesPart! - b.data.seriesPart!);
}

export function formatArticleDate(value: string, lang: Language): string {
  isoDate.parse(value);
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(`${value}T00:00:00Z`));
}
