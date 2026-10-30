import type { Language } from '../data/navigation.ts';
import { projectPairs } from '../data/projects.ts';
import { articleUrl, isPublicArticle, selectSeriesArticles, type ArticleRecord } from './article-model.ts';

export interface ProjectLink { name: string; href: string }
interface ProjectSeriesPair { series: string; es: ProjectLink; en: ProjectLink }

export function validateProjectRelations(pairs: readonly ProjectSeriesPair[]): void {
  const series = new Set<string>();
  for (const pair of pairs) {
    if (series.has(pair.series)) throw new Error(`Serie asociada a varios proyectos: ${pair.series}`);
    series.add(pair.series);
  }
}

// Fail the build on ambiguous associations, even when every article is a draft.
validateProjectRelations(projectPairs);

export function relatedProjectForArticle(article: ArticleRecord, today: string): ProjectLink | undefined {
  if (!isPublicArticle(article, today)) return undefined;
  const pair = projectPairs.find((project) => project.series === article.data.series);
  return pair?.[article.data.lang];
}

export function relatedArticlesForProject(
  articles: readonly ArticleRecord[], projectHref: string, lang: Language, today: string,
): { title: string; href: string }[] {
  const pair = projectPairs.find((project) => project[lang].href === projectHref);
  if (!pair) return [];
  return selectSeriesArticles(articles, pair.series, lang, today)
    .map((article) => ({ title: article.data.title, href: articleUrl(article) }));
}
