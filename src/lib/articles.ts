import { getCollection, type CollectionEntry } from 'astro:content';
import type { Language } from '../data/navigation';
import { articleLanguageHref, articleSlug, articleUrl, currentArticleDate, selectPublicArticles, selectSeriesNeighbors, validateArticles } from './article-model';

export type Article = CollectionEntry<'articles'>;
export interface ArticlePageProps {
  article: Article;
  languageHref: string;
  previous: { title: string; url: string } | undefined;
  next: { title: string; url: string } | undefined;
}

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
  return selectPublicArticles(articles, today, lang).map((article) => {
    const { previous, next } = selectSeriesNeighbors(article, articles, today);
    return {
      params: { slug: articleSlug(article) },
      props: {
        article, languageHref: articleLanguageHref(article, articles, today),
        previous: previous ? { title: previous.data.title, url: articleUrl(previous) } : undefined,
        next: next ? { title: next.data.title, url: articleUrl(next) } : undefined,
      } satisfies ArticlePageProps,
    };
  });
}
