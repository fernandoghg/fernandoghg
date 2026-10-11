# fernandoghg

Repositorio del sitio web personal asociado a **fernandoghg.com** y **fernandoghg.es**. El proyecto busca un sitio principalmente estático, con contenido en español e inglés, privacidad por diseño y especial atención a accesibilidad, SEO, rendimiento, seguridad, coste y mantenimiento.

## Estado actual

El repositorio contiene un sitio personal estático con Astro 7.3.5, TypeScript estricto y npm. Las versiones española e inglesa utilizan las raíces **/es/** y **/en/** e incluyen Inicio / Home, Sobre mí / About, Proyectos / Projects, Artículos / Articles y Privacidad / Privacy. La navegación principal tiene cuatro enlaces; Privacidad está accesible desde el pie.

El diseño visual, las portadas, Sobre mí y las políticas de privacidad ES/EN están incorporados. Aldarte tiene una presentación pública aprobada en ambos idiomas, con fichas en Inicio y Proyectos y páginas individuales. Los dos artículos históricos de Blogger, «Mi experiencia con Top Eleven» y «Mi experiencia con Top Eleven (1 mes más tarde)», están migrados en español, con sus fechas originales, imágenes locales y navegación de serie. El build actual genera 15 páginas HTML.

La base utiliza HTML5 semántico, componentes y CSS compartidos, fuentes del sistema y recursos autocontenidos. Funciona sin backend, base de datos, SSR, analítica, cookies propias ni JavaScript cliente. Las imágenes editoriales se optimizan durante el build. Privacidad, accesibilidad, seguridad, rendimiento, SEO, coste y mantenimiento son criterios del proyecto.

Cloudflare Pages es el alojamiento seleccionado inicialmente; GitHub seguirá siendo el repositorio y sistema de control de versiones, con integración futura para despliegue. Todavía no existe cuenta/configuración de Cloudflare para este proyecto. El objetivo inicial de coste sigue siendo próximo a **0 EUR/mes**; la configuración y sus costes efectivos quedan pendientes de verificar.

El dominio canónico será **https://fernandoghg.com**. Se conservará fernandoghg.es y posteriormente se redirigirá permanentemente al .com, al igual que www.fernandoghg.com y www.fernandoghg.es. HTTP redirigirá siempre a HTTPS, obligatorio en producción. Los dominios permanecen en IONOS y no se transferirán. Blogger debe seguir funcionando mientras se desarrolla la nueva web.

El sitio es bilingüe español/inglés, con raíces **/es/** y **/en/** y redirección estática de / a /es/. Los artículos Markdown utilizan Content Collections, con traducciones opcionales relacionadas por translationKey y URLs /es/articulos/<slug>/ y /en/articles/<slug>/. No se usan cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. SEO multilingüe completo y MDX quedan para una fase posterior.

La primera versión se desarrolla sin analítica ni seguimiento, incluido Cloudflare Web Analytics. Se aplica privacidad por diseño y se considera RGPD/ePrivacy, sin afirmar cumplimiento legal absoluto. Las políticas incluyen privacidad@fernandoghg.com como contacto específico aprobado; el buzón está **pendiente de configurar y verificar**. Su fecha de actualización y la revisión del tratamiento efectivo por alojamiento y correo también están pendientes antes de publicar.

La infraestructura de artículos incluye metadatos validados, la categoría juegos, series, fechas históricas y exclusión de drafts y fechas futuras de todas las consultas y rutas públicas. Las decisiones aprobadas se detallan en [arquitectura](docs/architecture.md). El proyecto está en preparación para Cloudflare Pages, **sin despliegue público todavía**. Se conserva noindex hasta la revisión de publicación; canonical/hreflang multilingües siguen pendientes. No se han configurado servicios externos.

## Desarrollo local

El entorno documentado utiliza Node.js 24.20.0 y npm 11.19.0. Desde la raíz del repositorio, los comandos existentes son:

| Comando | Finalidad |
| --- | --- |
| `npm ci` | Instalar las dependencias reproducibles desde `package-lock.json`. |
| `npm run dev` | Iniciar el servidor local de desarrollo. |
| `npm run check` | Comprobar TypeScript y archivos Astro. |
| `node --test tests/articles.test.mjs` | Ejecutar las pruebas unitarias del modelo de artículos, sin build ni fixtures. |
| `node --test tests/articles-build.test.mjs` | Ejecutar las pruebas de integración con builds y fixtures temporales. |
| `npm run build` | Generar el sitio estático en `dist/`. |
| `npm run preview` | Servir localmente el build generado, sin publicar. |

Las pruebas de integración no deben ejecutarse junto a otro proceso dev/build: crean fixtures propios, los retiran en finally y reconstruyen `dist/` al terminar. Las pruebas utilizan `node:test` y `assert` de Node, sin dependencias adicionales ni un script npm de pruebas. Los detalles y precauciones están en [desarrollo](docs/development.md). Estos comandos documentan el flujo local; las instalaciones y cambios de dependencias requieren la autorización correspondiente.

## Documentación

- [Instrucciones para agentes](AGENTS.md).
- [Arquitectura y decisiones pendientes](docs/architecture.md).
- [Principios de privacidad](docs/privacy.md).
- [Entorno y flujo de desarrollo](docs/development.md).

Repositorio remoto: <https://github.com/fernandoghg/fernandoghg.git>.

## Dirección de V1

La V1 mantiene Inicio, Proyectos, Artículos y Sobre mí (Home, Projects, Articles y About) como navegación principal y Privacidad en el pie. La migración histórica se limita a los dos artículos de Top Eleven ya incorporados; no se migrará automáticamente el resto de Blogger.

La portada combina presentación, proyectos y artículos recientes y tiene sentido sin publicaciones frecuentes. Proyectos es independiente de Artículos; nuevas categorías solo se crearán cuando el contenido las justifique. RSS/Atom no es requisito de V1.

La identidad pública es **Fernando Garcia-Herrera Gomez**, con «Fernando» en contextos informales y fernandoghg.com como identificador discreto de cabecera. GitHub e Instagram son enlaces simples, sin contenido incrustado. No se expone el correo personal ni hay formulario de contacto, publicidad o localStorage para preferencias o seguimiento. El diseño aprobado es sobrio, legible y responsive/mobile-first, con acento azul apagado y modo claro/oscuro del sistema. Los cambios de contenido requieren autorización dentro de cada tarea.
