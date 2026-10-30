import { navigation } from './navigation.ts';

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

export const lighthouse = {
  "es": {
    "name": "El último farero: Los mundos del infinito",
    "href": "/es/proyectos/el-ultimo-farero/",
    "status": "En desarrollo · Primer prototipo funcional.",
    "description": "Una aventura isométrica de exploración y puzles desarrollada con ayuda de inteligencia artificial.",
    "subtitle": "Una aventura isométrica de exploración y puzles desarrollada con ayuda de inteligencia artificial.",
    "paragraphs": [
      "El último farero es un proyecto personal con un doble objetivo: crear un videojuego de exploración y experimentar hasta dónde puede llegar la inteligencia artificial cuando participa activamente en las decisiones creativas y técnicas.",
      "El juego está ambientado en un mundo de islas, con un faro como elemento central. Entre las mecánicas previstas se encuentran la exploración, la resolución de puzles, la reconstrucción de un puente y la generación procedimental de escenarios inspirados en conceptos matemáticos como los fractales.",
      "El desarrollo utiliza Godot y GDScript, con Windows como plataforma inicial. El primer prototipo permite mover al personaje, girar la cámara isométrica y comprobar las colisiones con obstáculos y límites del escenario."
    ],
    "note": "El proyecto se encuentra en una fase temprana. Las mecánicas y escenarios descritos como previstos todavía no forman parte de un videojuego completo."
  },
  "en": {
    "name": "The Last Lighthouse Keeper: Worlds of Infinity",
    "href": "/en/projects/the-last-lighthouse-keeper/",
    "status": "In development · First working prototype.",
    "description": "An isometric exploration and puzzle adventure developed with the help of artificial intelligence.",
    "subtitle": "An isometric exploration and puzzle adventure developed with the help of artificial intelligence.",
    "paragraphs": [
      "The Last Lighthouse Keeper is a personal project with two goals: creating an exploration video game and experimenting with how far artificial intelligence can go when it actively participates in creative and technical decisions.",
      "The game is set in a world of islands, with a lighthouse at its centre. Planned mechanics include exploration, puzzle-solving, rebuilding a bridge and procedurally generating environments inspired by mathematical concepts such as fractals.",
      "Development uses Godot and GDScript, with Windows as the initial target platform. The first prototype allows the character to move, the isometric camera to rotate and collisions with obstacles and level boundaries to be tested."
    ],
    "note": "The project is still at an early stage. The mechanics and environments described as planned are not yet part of a complete video game."
  }
} as const;

export const projectPairs = [
  { series: 'aldarte', es: { name: aldarte.name, ...aldarte.es }, en: { name: aldarte.name, ...aldarte.en } },
  { series: 'el-ultimo-farero', ...lighthouse },
] as const;

export const projects = {
  es: projectPairs.map((project) => project.es),
  en: projectPairs.map((project) => project.en),
};
