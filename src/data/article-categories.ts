import type { Language } from './navigation.ts';

export const articleCategoryIds = ['juegos'] as const;
export type ArticleCategory = (typeof articleCategoryIds)[number];

export const articleCategoryLabels: Record<ArticleCategory, Record<Language, string>> = {
  juegos: { es: 'Juegos', en: 'Games' },
};
