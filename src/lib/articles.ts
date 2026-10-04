import { getCollection, type CollectionEntry } from 'astro:content';
import type { Language } from '../data/navigation';
import { articleLanguageHref, articleSlug, currentArticleDate, selectPublicArticles, validateArticles } from './article-model';

export type Article = CollectionEntry<'articles'>;
export interface ArticlePageProps { article: Article; languageHref: string }

// A single day per module evaluation/build; callers can inject a day in tests.
const publicationDate = currentArticleDate();

async function getValidatedArticles(): Promise<Article[]> {
  const articles = await getCollection('articles');
  // Check every entry, including drafts and future articles, before filtering.
  validateArticles(articles);
  return articles;
}

export async function getPublicArticles(lang?: Language, today = publicationDate): Promise<Article[]> {
  return selectPublicArticles(await getValidatedArticles(), today, lang);
}

export async function getArticlePaths(lang: Language, today = publicationDate) {
  const articles = await getValidatedArticles();
  return selectPublicArticles(articles, today, lang).map((article) => ({
    params: { slug: articleSlug(article) },
    props: { article, languageHref: articleLanguageHref(article, articles, today) } satisfies ArticlePageProps,
  }));
}
