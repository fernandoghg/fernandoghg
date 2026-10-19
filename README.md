# fernandoghg

Repositorio del sitio web personal asociado a **fernandoghg.com** y **fernandoghg.es**. El proyecto busca un sitio principalmente estático, con contenido en español e inglés, privacidad por diseño y especial atención a accesibilidad, SEO, rendimiento, seguridad, coste y mantenimiento.

## Estado actual

El repositorio contiene un sitio personal estático con Astro 7.3.5, TypeScript estricto y npm. Las versiones española e inglesa utilizan las raíces **/es/** y **/en/** e incluyen Inicio / Home, Sobre mí / About, Proyectos / Projects, Artículos / Articles y Privacidad / Privacy. La navegación principal tiene cuatro enlaces; Privacidad está accesible desde el pie.

El diseño visual, las portadas, Sobre mí y las políticas de privacidad ES/EN están incorporados. Aldarte tiene una presentación pública aprobada en ambos idiomas, con fichas en Inicio y Proyectos y páginas individuales. Los dos artículos históricos de Blogger, «Mi experiencia con Top Eleven» y «Mi experiencia con Top Eleven (1 mes más tarde)», están migrados en español, con sus fechas originales, imágenes locales y navegación de serie. El build actual genera 16 páginas HTML.

La base utiliza HTML5 semántico, componentes y CSS compartidos, fuentes del sistema y recursos autocontenidos. Funciona sin backend, base de datos, SSR, analítica, cookies propias ni JavaScript cliente. Las imágenes editoriales se optimizan durante el build. Privacidad, accesibilidad, seguridad, rendimiento, SEO, coste y mantenimiento son criterios del proyecto.

El sitio está publicado en **https://fernandoghg.com** mediante Cloudflare Pages, con DNS, proxy/CDN y seguridad de Cloudflare. El dominio está registrado en IONOS y GitHub es el repositorio y sistema de control de versiones. La finalidad actual es personal, sin actividad comercial ni servicios profesionales. El objetivo de coste del alojamiento sigue siendo próximo a **0 EUR/mes**; no se presupone un coste efectivo concreto.

El dominio canónico es **https://fernandoghg.com**. Se conservará fernandoghg.es y posteriormente se redirigirá permanentemente al .com, al igual que www.fernandoghg.com y www.fernandoghg.es. HTTP redirigirá siempre a HTTPS, obligatorio en producción. Los dominios permanecen en IONOS y no se transferirán. Esta actualización no modifica Blogger ni verifica las redirecciones de dominios alternativos.

El sitio es bilingüe español/inglés, con raíces **/es/** y **/en/** y redirección estática de / a /es/. Los artículos Markdown utilizan Content Collections, con traducciones opcionales relacionadas por translationKey y URLs /es/articulos/<slug>/ y /en/articles/<slug>/. No se usan cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. Canonical/hreflang están implementados para equivalentes reales; MDX queda para una fase posterior.

El sitio no utiliza analítica propia, publicidad, formularios ni seguimiento de visitantes, incluido Cloudflare Web Analytics. El correo está contratado con IONOS Correo Básico (Mail Basic): contacto@fernandoghg.com se reenvía al buzón privacidad@fernandoghg.com, reservado como canal específico de privacidad y derechos. Ambas direcciones funcionan, según confirmación del titular. Email Address Obfuscation está desactivado y los mailto funcionan sin JavaScript; no se afirma ausencia absoluta de cookies técnicas de Cloudflare. Las políticas ES/EN están publicadas técnicamente y conservan la fecha editorial **17 de octubre de 2026**. Esta publicación no autoriza el lanzamiento público ni la indexación. Los contratos, registros y posibles transferencias pendientes de verificar se detallan en [privacidad](docs/privacy.md), sin afirmar cumplimiento legal absoluto.

La infraestructura de artículos incluye metadatos validados, la categoría juegos, series, fechas históricas y exclusión de drafts y fechas futuras de todas las consultas y rutas públicas. Las decisiones aprobadas se detallan en [arquitectura](docs/architecture.md). El sitio está publicado y **mantiene noindex hasta que se autorice expresamente su retirada**. Canonical/hreflang multilingües están implementados para equivalentes reales. Estos cambios locales no configuran servicios externos ni publican la revisión.

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
