# Arquitectura

## Decisiones actuales

- Sitio web personal, principalmente estático, asociado a fernandoghg.com y fernandoghg.es.
- Astro es el framework/generador seleccionado. TypeScript se utilizará cuando sea necesario para desarrollo y lógica. Priorizar HTML5 semántico y generación estática siempre que sea posible.
- La arquitectura inicial evitará backend, base de datos y procesamiento dinámico en servidor mientras no exista una necesidad funcional expresamente justificada.
- Los dominios están registrados actualmente en IONOS. No se transferirán ni se modificará DNS en esta fase.
- Contenido previsto principalmente en Markdown/MDX, en español e inglés. No todo el contenido tendrá necesariamente traducción.
- El sitio será bilingüe, con estructura de URLs simétrica /es/ y /en/. La arquitectura permitirá relacionar correctamente las versiones traducidas cuando existan y contemplará SEO multilingüe, canonical y hreflang al implementar las páginas. No se ha aprobado una política automática de detección o redirección por idioma.
- Privacidad por diseño y atención a RGPD/ePrivacy y normativa aplicable como requisitos de primer nivel.
- Accesibilidad, SEO, rendimiento y seguridad como requisitos del proyecto.
- Recursos preferentemente autocontenidos; fuentes locales si se emplean fuentes personalizadas. Evitar recursos externos que permitan seguimiento.
- Minimizar el JavaScript enviado al navegador y no incorporarlo cuando HTML/CSS sean suficientes; mantener las dependencias al mínimo razonable y minimizar mantenimiento.
- Mantener páginas ligeras y minimizar transferencia de datos. Minimizar y optimizar CSS, JavaScript, imágenes, fuentes y demás recursos; evitar recursos externos innecesarios y favorecer carga rápida y buen rendimiento también en conexiones y dispositivos modestos.
- Primera versión sin sistema de analítica ni seguimiento, incluido Cloudflare Web Analytics. Una posible analítica futura respetuosa con la privacidad se evaluará separadamente.
- HTTPS obligatorio en producción y redirección de HTTP a HTTPS. Certificados TLS preferentemente gratuitos y con renovación automática.
- Coste de infraestructura como criterio de primer nivel. Objetivo inicial de alojamiento próximo a 0 EUR/mes.
- Git y GitHub para control de versiones en el repositorio `fernandoghg/fernandoghg`, rama principal `main` y Conventional Commits.

## Alojamiento y dominios aprobados

Cloudflare Pages es el alojamiento seleccionado inicialmente. GitHub seguirá siendo el repositorio y sistema de control de versiones; se prevé integrar posteriormente el repositorio con Cloudflare Pages para despliegue. Todavía no existe cuenta/configuración de Cloudflare para este proyecto. AWS S3 + CloudFront, AWS Amplify y GitHub Pages quedan como alternativas no seleccionadas inicialmente, no como decisiones pendientes.

El dominio canónico será **https://fernandoghg.com**. Se conservará fernandoghg.es. Las redirecciones permanentes previstas son:

| Origen | Destino |
| --- | --- |
| https://fernandoghg.es | https://fernandoghg.com |
| https://www.fernandoghg.com | https://fernandoghg.com |
| https://www.fernandoghg.es | https://fernandoghg.com |

HTTP deberá redirigir siempre a HTTPS y HTTPS será obligatorio en producción. Los dominios permanecen registrados en IONOS y no se transferirán. Blogger debe seguir funcionando mientras se desarrolla la nueva web.

Estas decisiones no autorizan cambios externos en esta fase: no se creará ni modificará Cloudflare, DNS, configuración de IONOS ni ningún servicio externo. Tampoco se inicializará Astro; esa fase requiere una tarea posterior expresamente autorizada.

## Por decidir

| Tema | Estado y orientación actual |
| --- | --- |
| Publicación y configuración de producción | **Por decidir**: detalles de integración GitHub–Cloudflare Pages, configuración efectiva de HTTPS, certificados y redirecciones ya aprobadas, y transición desde Blogger. |
| Organización interna del contenido | **Por decidir**: modelo de contenido y mecanismo para relacionar traducciones, manteniendo /es/ y /en/ y permitiendo publicaciones sin traducción. |
| Comportamiento de la raíz y selección de idioma | **Por decidir**. No hay política automática de detección o redirección por idioma aprobada. |
| Herramientas y comprobaciones de desarrollo | **Por decidir**: versiones de Node.js, gestor de paquetes, comandos y herramientas de pruebas. |
| Configuración y evaluación de privacidad | **Pendiente** antes de publicar, incluidos registros y datos tratados por los proveedores. |

La configuración futura del alojamiento deberá considerar coste, mantenimiento, privacidad, seguridad, rendimiento y compatibilidad con los dominios y HTTPS previstos. El proveedor está seleccionado, pero los costes efectivos y la configuración de infraestructura aún no están verificados ni definidos. Se mantiene el objetivo próximo a 0 EUR/mes. No se introducirán servicios AWS por su mera disponibilidad.
