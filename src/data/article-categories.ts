import type { Language } from './navigation.ts';

export const articleCategoryIds = ['juegos', 'desarrollo', 'proyectos'] as const;
export type ArticleCategory = (typeof articleCategoryIds)[number];

export const articleCategoryLabels: Record<ArticleCategory, Record<Language, string>> = {
  juegos: { es: 'Juegos', en: 'Games' },
  desarrollo: { es: 'Desarrollo', en: 'Development' },
  proyectos: { es: 'Proyectos', en: 'Projects' },
};
