# fernandoghg

Repositorio del sitio web personal asociado a **fernandoghg.com** y **fernandoghg.es**. El proyecto busca un sitio principalmente estático, con contenido en español e inglés, privacidad por diseño y especial atención a accesibilidad, SEO, rendimiento, seguridad, coste y mantenimiento.

## Estado inicial

El repositorio contiene únicamente documentación inicial y reglas de trabajo. No se ha inicializado la aplicación ni instalado dependencias.

Astro es el framework/generador seleccionado, con TypeScript cuando sea necesario para desarrollo y lógica. El sitio se generará principalmente como contenido estático, con HTML5 semántico, JavaScript mínimo y recursos optimizados para reducir tamaño, transferencia y tiempos de carga. Se mantendrán las dependencias al mínimo razonable, sin backend, base de datos ni procesamiento dinámico en servidor salvo necesidad funcional futura expresamente justificada.

Cloudflare Pages es el alojamiento seleccionado inicialmente; GitHub seguirá siendo el repositorio y sistema de control de versiones, con integración futura para despliegue. Todavía no existe cuenta/configuración de Cloudflare para este proyecto. El objetivo inicial de coste sigue siendo próximo a **0 EUR/mes**; la configuración y sus costes efectivos quedan pendientes de verificar.

El dominio canónico será **https://fernandoghg.com**. Se conservará fernandoghg.es y posteriormente se redirigirá permanentemente al .com, al igual que www.fernandoghg.com y www.fernandoghg.es. HTTP redirigirá siempre a HTTPS, obligatorio en producción. Los dominios permanecen en IONOS y no se transferirán. Blogger debe seguir funcionando mientras se desarrolla la nueva web.

El sitio será bilingüe español/inglés, con URLs simétricas **/es/** y **/en/**. Se prevé contenido principalmente en Markdown/MDX, sin exigir traducción de todas las publicaciones. La arquitectura permitirá relacionar traducciones y contemplará SEO multilingüe, canonical y hreflang. No se ha aprobado una política automática de detección o redirección por idioma.

La primera versión no tendrá analítica ni seguimiento, incluido Cloudflare Web Analytics. Se mantienen los principios de privacidad por diseño y RGPD/ePrivacy.

Esta fase sigue limitada a documentación: no se inicializará Astro, instalarán dependencias, ejecutará npm ni generará código de aplicación hasta una tarea posterior expresamente autorizada. No se modificará ningún servicio externo, DNS ni configuración de IONOS o Cloudflare.

## Documentación

- [Instrucciones para agentes](AGENTS.md).
- [Arquitectura y decisiones pendientes](docs/architecture.md).
- [Principios de privacidad](docs/privacy.md).
- [Entorno y flujo de desarrollo](docs/development.md).

Repositorio remoto: <https://github.com/fernandoghg/fernandoghg.git>.
