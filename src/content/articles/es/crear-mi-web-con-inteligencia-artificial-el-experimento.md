---
title: "Crear mi web con inteligencia artificial: el experimento"
description: "Una experiencia desarrollando fernandoghg.com con ChatGPT y Codex: delegación técnica, elección de tecnologías, privacidad y primeros aprendizajes."
published: "2026-10-25"
lang: es
category: desarrollo
draft: true
translationKey: crear-mi-web-con-ia-el-experimento
series: fernandoghg-com
seriesPart: 2
---

Cuando decidí crear mi propia web, tenía claro lo que quería conseguir: un espacio sencillo donde compartir proyectos, experiencias y aprendizajes.

Lo que no tenía tan claro era qué tecnologías utilizar ni cómo abordar su desarrollo.

En lugar de empezar estudiando diferentes frameworks y herramientas para elegirlos e implementar personalmente toda la solución, decidí probar algo diferente: **delegar en la inteligencia artificial buena parte de las decisiones técnicas y del trabajo de programación**.

Quería comprobar hasta dónde podía llegar este enfoque, cuánto trabajo podía ahorrarme y qué limitaciones encontraría por el camino.

## Delegar el desarrollo sin perder el control

Aunque soy ingeniero informático, no conocía las tecnologías que finalmente terminaríamos utilizando para construir la web.

Precisamente por eso, uno de los primeros experimentos consistió en dejar que la inteligencia artificial evaluara las alternativas y propusiera una solución adecuada.

Mi responsabilidad sería establecer los objetivos y los requisitos: una web rápida, fácil de mantener, con un coste reducido, preparada para español e inglés y respetuosa con la privacidad.

Para desarrollar el proyecto decidí utilizar **ChatGPT como apoyo para analizar requisitos, estudiar alternativas y planificar el trabajo**, mientras que **Codex se encargaría de trabajar directamente sobre el código**.

Mi intención era concentrarme principalmente en los contenidos, las funcionalidades y determinadas decisiones de diseño y arquitectura, dejando buena parte de la implementación técnica en manos de estas herramientas.

Pero delegar no significaba aceptar cualquier propuesta.

Desde el principio quise mantener un proceso supervisado: definir qué necesitaba, revisar las alternativas, comprobar los resultados y aprobar los cambios antes de incorporarlos a la versión principal.

La idea no era demostrar que la IA podía hacerlo todo por sí sola, sino comprobar hasta dónde podía ayudarme a desarrollar un proyecto completo.

## La elección de las tecnologías

Una de las primeras decisiones fue evitar una arquitectura innecesariamente compleja.

Para una web personal con páginas y artículos, no parecía razonable mantener un servidor de aplicaciones, una base de datos o servicios que apenas iban a aportar valor.

Partiendo de los requisitos que había establecido, la solución propuesta fue utilizar **Astro y TypeScript** para generar una web estática, con **Cloudflare Pages** como plataforma de publicación.

No eran tecnologías que conociera previamente, pero encajaban con los objetivos del proyecto: buen rendimiento, mantenimiento sencillo, pocos recursos y un coste de funcionamiento reducido.

También incorporamos desde el principio soporte para español e inglés, evitando que la internacionalización se convirtiera en una complicación añadida cuando la web estuviera más avanzada.

En este caso, no necesitaba dominar todas las herramientas antes de empezar. Lo que necesitaba era entender suficientemente las decisiones propuestas para valorar si respondían a mis objetivos y comprobar que el resultado funcionaba.

## La privacidad como requisito desde el principio

Otro aspecto que consideré fundamental fue la protección de datos.

Cuando planteé el proyecto a la inteligencia artificial, indiqué expresamente que las soluciones propuestas debían respetar la normativa española y europea, especialmente el Reglamento General de Protección de Datos (RGPD), la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD) y las demás disposiciones aplicables.

No quería que la comodidad de incorporar una librería o un servicio externo terminara introduciendo mecanismos de seguimiento o recopilación innecesaria de datos personales.

Tampoco necesitaba analítica propia, publicidad personalizada ni herramientas para estudiar el comportamiento de los visitantes.

Por eso opté por una web sin rastreadores publicitarios y con las mínimas dependencias necesarias.

Naturalmente, que una web no incorpore herramientas de seguimiento propias no significa que los proveedores de alojamiento y otros servicios no realicen tratamientos técnicos de datos. Es necesario revisar esos aspectos y explicarlos con transparencia.

La privacidad, por tanto, no debía resolverse simplemente añadiendo un texto legal al terminar el desarrollo. **Tenía que formar parte de los requisitos que condicionaran las decisiones técnicas desde el primer momento.**

## Lo que he aprendido hasta ahora

Una de las primeras conclusiones de esta experiencia es que utilizar inteligencia artificial no elimina la necesidad de pensar en el diseño del software. Lo que cambia, en buena medida, es la forma de trabajar.

Al delegar en la IA la elección de herramientas y buena parte de la programación, he podido concentrarme más en definir qué quería conseguir, establecer requisitos, valorar propuestas y comprobar los resultados.

Esto no significa que desaparezca el trabajo. Algunas tareas se resuelven mucho más rápidamente, pero otras adquieren mayor importancia.

Es necesario explicar con claridad lo que se necesita, revisar las soluciones propuestas y detectar cuándo algo no funciona como debería.

También he comprobado que generar código con rapidez no garantiza que el resultado sea adecuado. Durante el desarrollo de esta web hemos tenido que prestar atención a cuestiones como la seguridad, la privacidad, la accesibilidad, la internacionalización y el despliegue.

En definitiva, **la inteligencia artificial no solo puede ahorrar tiempo de desarrollo; también permite dedicar más atención a las decisiones y a la calidad del resultado**.

Y hay otra conclusión importante: para un proyecto pequeño como este, mantener las cosas sencillas sigue siendo una buena estrategia, independientemente de quién escriba el código.

## Un experimento que continúa

La web ya tiene una base técnica funcional, pero la experiencia con inteligencia artificial no termina aquí.

Todavía quedan aspectos por mejorar, nuevos contenidos que incorporar y decisiones que tomar.

También quedan preguntas interesantes: ¿cuánto tiempo se ahorra realmente?, ¿qué tareas puede asumir la IA con autonomía?, ¿qué problemas aparecen cuando se trabaja con tecnologías que no se conocen previamente?

Me gustaría seguir explorando estas cuestiones y compartir ejemplos concretos de lo que funciona, lo que no funciona y las soluciones que vayamos encontrando.

Al final, el objetivo no era simplemente conseguir que la inteligencia artificial generara una página web.

**Era comprobar si podía ayudarme a convertir una idea en un proyecto real, dedicando mi tiempo a aquello en lo que más podía aportar.**
