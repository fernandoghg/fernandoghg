import { navigation } from './navigation';

// Only the information approved for public presentation belongs here.
export const aldarte = {
  name: 'Aldarte',
  es: {
    href: `${navigation.es.projects.href}aldarte/`,
    status: 'En desarrollo',
    description: 'Un proyecto personal relacionado con el bienestar emocional, con especial atención a la sencillez y la privacidad.',
    subtitle: 'Bienestar emocional, sencillez y privacidad.',
    paragraphs: [
      'Aldarte es un proyecto personal en desarrollo relacionado con el bienestar emocional.',
      'La idea es crear una aplicación sencilla y respetuosa con la privacidad, que invite a prestar más atención a cómo nos sentimos.',
    ],
    note: 'Proyecto en desarrollo. Compartiré más información cuando esté preparado.',
  },
  en: {
    href: `${navigation.en.projects.href}aldarte/`,
    status: 'In development',
    description: 'A personal project related to emotional wellbeing, with a particular focus on simplicity and privacy.',
    subtitle: 'Emotional wellbeing, simplicity and privacy.',
    paragraphs: [
      'Aldarte is a personal project in development related to emotional wellbeing.',
      'The idea is to create a simple, privacy-conscious app that encourages us to pay more attention to how we feel.',
    ],
    note: "Project in development. I'll share more information when it's ready.",
  },
} as const;
