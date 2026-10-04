# fernandoghg

Repositorio del sitio web personal asociado a **fernandoghg.com** y **fernandoghg.es**. El proyecto busca un sitio principalmente estático, con contenido en español e inglés, privacidad por diseño y especial atención a accesibilidad, SEO, rendimiento, seguridad, coste y mantenimiento.

## Estado actual

La fase documental inicial ha terminado. El repositorio contiene una base mínima de Astro con TypeScript estricto y npm, con páginas provisionales en `/`, `/es/` y `/en/`. Los comandos locales se documentan en [desarrollo](docs/development.md).

Astro es el framework/generador seleccionado, con TypeScript cuando sea necesario para desarrollo y lógica. El sitio se generará principalmente como contenido estático, con HTML5 semántico, JavaScript mínimo y recursos optimizados para reducir tamaño, transferencia y tiempos de carga. Se mantendrán las dependencias al mínimo razonable, sin backend, base de datos ni procesamiento dinámico en servidor salvo necesidad funcional futura expresamente justificada.

Cloudflare Pages es el alojamiento seleccionado inicialmente; GitHub seguirá siendo el repositorio y sistema de control de versiones, con integración futura para despliegue. Todavía no existe cuenta/configuración de Cloudflare para este proyecto. El objetivo inicial de coste sigue siendo próximo a **0 EUR/mes**; la configuración y sus costes efectivos quedan pendientes de verificar.

El dominio canónico será **https://fernandoghg.com**. Se conservará fernandoghg.es y posteriormente se redirigirá permanentemente al .com, al igual que www.fernandoghg.com y www.fernandoghg.es. HTTP redirigirá siempre a HTTPS, obligatorio en producción. Los dominios permanecen en IONOS y no se transferirán. Blogger debe seguir funcionando mientras se desarrolla la nueva web.

El sitio será bilingüe español/inglés, con URLs simétricas **/es/** y **/en/**. Se prevé contenido principalmente en Markdown/MDX, sin exigir traducción de todas las publicaciones. La arquitectura permitirá relacionar traducciones y contemplará SEO multilingüe, canonical y hreflang. La raíz / redirigirá a /es/, sin cookies, localStorage, geolocalización ni tracking para seleccionar o recordar el idioma. Esta decisión aún no está implementada.

La primera versión no tendrá analítica ni seguimiento, incluido Cloudflare Web Analytics. Se mantienen los principios de privacidad por diseño y RGPD/ePrivacy.

La base mínima ya está inicializada. La tarea actual es exclusivamente documental: no autoriza cambios de código, instalación de dependencias, implementación de páginas ni cambios en servicios externos. Las decisiones aprobadas para V1 se detallan en [arquitectura](docs/architecture.md).

## Documentación

- [Instrucciones para agentes](AGENTS.md).
- [Arquitectura y decisiones pendientes](docs/architecture.md).
- [Principios de privacidad](docs/privacy.md).
- [Entorno y flujo de desarrollo](docs/development.md).

Repositorio remoto: <https://github.com/fernandoghg/fernandoghg.git>.

## Dirección de V1

La navegación principal será Inicio, Proyectos, Artículos y Sobre mí (Home, Projects, Articles y About). La V1 será deliberadamente pequeña e incluirá una página de privacidad antes de publicar. Se han seleccionado únicamente los dos artículos históricos de Top Eleven para migración, conservando sus fechas originales; no se migrará automáticamente el resto de Blogger.

La portada tendrá sentido sin publicaciones frecuentes y podrá combinar presentación, proyectos y artículos destacados. Proyectos será independiente de Artículos; las categorías se crearán cuando el contenido las justifique. RSS/Atom no es requisito de V1.

La identidad pública será **Fernando Garcia-Herrera Gomez**, presentada discretamente. GitHub e Instagram serán enlaces simples, sin contenido incrustado. V1 no tendrá correo público, formulario de contacto, publicidad ni localStorage para preferencias o seguimiento. El diseño será sobrio, legible y responsive/mobile-first, con fuentes del sistema y un único acento orientado a azul apagado, sin valores CSS definitivos. No se redacta ni implementa todavía contenido definitivo.