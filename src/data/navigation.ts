export type Language = 'es' | 'en';
export type Page = 'home' | 'projects' | 'articles' | 'about' | 'privacy';
// Explicit translation pairs for provisional pages only.
export const navigation = {
  es: {
    home: { label: 'Inicio', href: '/es/' },
    projects: { label: 'Proyectos', href: '/es/proyectos/' },
    articles: { label: 'Artículos', href: '/es/articulos/' },
    about: { label: 'Sobre mí', href: '/es/sobre-mi/' },
    privacy: { label: 'Privacidad', href: '/es/privacidad/' },
  },
  en: {
    home: { label: 'Home', href: '/en/' },
    projects: { label: 'Projects', href: '/en/projects/' },
    articles: { label: 'Articles', href: '/en/articles/' },
    about: { label: 'About', href: '/en/about/' },
    privacy: { label: 'Privacy', href: '/en/privacy/' },
  },
} as const;
export const primaryPages: Page[] = ['home', 'projects', 'articles', 'about'];
