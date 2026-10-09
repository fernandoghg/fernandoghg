# fernandoghg

Repositorio del sitio web personal asociado a **fernandoghg.com** y **fernandoghg.es**. El proyecto busca un sitio principalmente estático, con contenido en español e inglés, privacidad por diseño y especial atención a accesibilidad, SEO, rendimiento, seguridad, coste y mantenimiento.

## Estado actual

El repositorio contiene Astro 7.3.5 con TypeScript estricto y npm, diseño visual bilingüe aprobado e infraestructura inicial de artículos Markdown. Las portadas, navegación y páginas secundarias son estáticas; aún no se ha migrado contenido real. Los comandos locales y las pruebas se documentan en [desarrollo](docs/development.md).

Astro es el framework/generador seleccionado, con TypeScript cuando sea necesario para desarrollo y lógica. El sitio se generará principalmente como contenido estático, con HTML5 semántico, JavaScript mínimo y recursos optimizados para reducir tamaño, transferencia y tiempos de carga. Se mantendrán las dependencias al mínimo razonable, sin backend, base de datos ni procesamiento dinámico en servidor salvo necesidad funcional futura expresamente justificada.

Cloudflare Pages es el alojamiento seleccionado inicialmente; GitHub seguirá siendo el repositorio y sistema de control de versiones, con integración futura para despliegue. Todavía no existe cuenta/configuración de Cloudflare para este proyecto. El objetivo inicial de coste sigue siendo próximo a **0 EUR/mes**; la configuración y sus costes efectivos quedan pendientes de verificar.

El dominio canónico será **https://fernandoghg.com**. Se conservará fernandoghg.es y posteriormente se redirigirá permanentemente al .com, al igual que www.fernandoghg.com y www.fernandoghg.es. HTTP redirigirá siempre a HTTPS, obligatorio en producción. Los dominios permanecen en IONOS y no se transferirán. Blogger debe seguir funcionando mientras se desarrolla la nueva web.

El sitio es bilingüe español/inglés, con raíces **/es/** y **/en/** y redirección estática de / a /es/. Los artículos Markdown utilizan Content Collections, con traducciones opcionales relacionadas por translationKey y URLs /es/articulos/<slug>/ y /en/articles/<slug>/. No se usan cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. SEO multilingüe completo y MDX quedan para una fase posterior.

La primera versión no tendrá analítica ni seguimiento, incluido Cloudflare Web Analytics. Se mantienen los principios de privacidad por diseño y RGPD/ePrivacy.

La infraestructura de artículos incluye metadatos validados, categorías, series, fechas históricas y exclusión de drafts y fechas futuras de todas las consultas y rutas públicas. Las decisiones aprobadas se detallan en [arquitectura](docs/architecture.md). No se han configurado servicios externos ni despliegue.

## Documentación

- [Instrucciones para agentes](AGENTS.md).
- [Arquitectura y decisiones pendientes](docs/architecture.md).
- [Principios de privacidad](docs/privacy.md).
- [Entorno y flujo de desarrollo](docs/development.md).

Repositorio remoto: <https://github.com/fernandoghg/fernandoghg.git>.

## Dirección de V1

La navegación principal será Inicio, Proyectos, Artículos y Sobre mí (Home, Projects, Articles y About). La V1 será deliberadamente pequeña e incluirá una página de privacidad antes de publicar. Se han seleccionado únicamente los dos artículos históricos de Top Eleven para migración, conservando sus fechas originales; no se migrará automáticamente el resto de Blogger.

La portada tendrá sentido sin publicaciones frecuentes y podrá combinar presentación, proyectos y artículos destacados. Proyectos será independiente de Artículos; las categorías se crearán cuando el contenido las justifique. RSS/Atom no es requisito de V1.

La identidad pública será **Fernando**, presentada discretamente. GitHub e Instagram son enlaces simples, sin contenido incrustado. V1 no tendrá correo público, formulario de contacto, publicidad ni localStorage para preferencias o seguimiento. El diseño inicial aprobado es sobrio, legible y responsive/mobile-first, con fuentes del sistema y acento azul apagado; respeta el modo claro/oscuro del sistema. No se redacta todavía contenido definitivo y se conserva noindex hasta la revisión de publicación.
