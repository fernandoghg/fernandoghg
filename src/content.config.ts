import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { articleSchema, generateArticleId } from './lib/article-model';

const articles = defineCollection({
  loader: glob({
    base: './src/content/articles',
    pattern: '**/*.md',
    generateId: ({ entry, data }) => generateArticleId(entry, data),
  }),
  schema: articleSchema,
});

export const collections = { articles };
