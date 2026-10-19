import type { Language, Page } from './navigation';

export const pageDescriptions: Record<Language, Record<Page, string>> = {
  es: {
    home: 'Una web personal sobre tecnología, proyectos, videojuegos, simulación y experiencias que merece la pena compartir.',
    projects: 'Proyectos personales relacionados con la tecnología, el desarrollo de aplicaciones y nuevas ideas.',
    articles: 'Artículos sobre tecnología, videojuegos, simulación y otras experiencias, ideas y aprendizajes.',
    about: 'Conoce un poco más sobre Fernando, su relación con la informática y sus aficiones, desde la tecnología hasta la simulación de vuelo.',
    privacy: 'Información sobre la privacidad de fernandoghg.com, el tratamiento de datos personales y los derechos de los visitantes.',
  },
  en: {
    home: 'A personal website about technology, projects, video games, simulation, and experiences worth sharing.',
    projects: 'Personal projects exploring technology, app development, and new ideas.',
    articles: 'Articles in English will be published here as they become available.',
    about: 'Learn more about Fernando, his background in computing, and his interests, from technology to flight simulation.',
    privacy: "Information about privacy at fernandoghg.com, personal data processing, and visitors' data protection rights.",
  },
};
