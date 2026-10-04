# Arquitectura

## Decisiones actuales

- Sitio web personal, principalmente estático, asociado a fernandoghg.com y fernandoghg.es.
- Astro es el framework/generador seleccionado. TypeScript se utilizará cuando sea necesario para desarrollo y lógica. Priorizar HTML5 semántico y generación estática siempre que sea posible.
- La arquitectura inicial evitará backend, base de datos y procesamiento dinámico en servidor mientras no exista una necesidad funcional expresamente justificada.
- Los dominios están registrados actualmente en IONOS. No se transferirán ni se modificará DNS en esta fase.
- Contenido previsto principalmente en Markdown/MDX, en español e inglés. No todo el contenido tendrá necesariamente traducción.
- El sitio será bilingüe, con estructura de URLs simétrica /es/ y /en/. La arquitectura permitirá relacionar correctamente las versiones traducidas cuando existan y contemplará SEO multilingüe, canonical y hreflang al implementar las páginas. La raíz / redirigirá a /es/, sin cookies, localStorage, geolocalización ni tracking para seleccionar o recordar el idioma. Esta decisión aún no está implementada.
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

Estas decisiones no autorizan cambios externos en esta fase: no se creará ni modificará Cloudflare, DNS, configuración de IONOS ni ningún servicio externo. La base local mínima de Astro con TypeScript y npm ya está inicializada. La tarea actual solo actualiza documentación, sin instalación de dependencias ni cambios de implementación o despliegue.

## Por decidir

| Tema | Estado y orientación actual |
| --- | --- |
| Publicación y configuración de producción | **Por decidir**: detalles de integración GitHub–Cloudflare Pages, configuración efectiva de HTTPS, certificados y redirecciones ya aprobadas, y transición desde Blogger. |
| Organización interna del contenido | **Por decidir**: modelo de contenido y mecanismo para relacionar traducciones, manteniendo /es/ y /en/ y permitiendo publicaciones sin traducción. |
| Diseño concreto y contenido definitivo | **Por decidir**: composición, valores CSS, textos e información de proyectos aprobada para publicar; posible reutilización de fotografías históricas. |
| Herramientas y comprobaciones de desarrollo | Node.js v24.20.0 y npm 11.19.0; comandos de Astro y comprobación de tipos documentados en [desarrollo](development.md). Herramientas adicionales de pruebas **por decidir**. |
| Configuración y evaluación de privacidad | **Pendiente** antes de publicar, incluidos registros y datos tratados por los proveedores. |

La configuración futura del alojamiento deberá considerar coste, mantenimiento, privacidad, seguridad, rendimiento y compatibilidad con los dominios y HTTPS previstos. El proveedor está seleccionado, pero los costes efectivos y la configuración de infraestructura aún no están verificados ni definidos. Se mantiene el objetivo próximo a 0 EUR/mes. No se introducirán servicios AWS por su mera disponibilidad.

## Contenidos e idiomas

| Navegación en español | Navegación en inglés |
| --- | --- |
| Inicio | Home |
| Proyectos | Projects |
| Artículos | Articles |
| Sobre mí | About |

Las raíces de idioma serán /es/ y /en/; / redirigirá a /es/. No se usarán cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. No se exige traducción de todo el contenido, incluidos los artículos. Las traducciones existentes deberán relacionarse explícitamente para navegación entre versiones, hreflang, canonical adecuado y SEO multilingüe. El modelo técnico de esa relación sigue **por decidir**; no se define en esta fase.

Artículos será una sección principal. Tecnología, Juegos, Viajes, Simulación y otras clasificaciones serán categorías/etiquetas creadas únicamente cuando el contenido las justifique, sin elementos permanentes en el menú inicial. RSS/Atom queda como posibilidad futura, sin ser requisito de V1 ni implementarse ahora.

La portada de cada idioma no será un blog cronológico tradicional. Podrá incluir presentación breve, proyectos destacados, artículos recientes o destacados y acceso a las áreas principales. La web debe seguir teniendo sentido aunque no se publiquen artículos frecuentemente. El contenido definitivo no se redacta todavía.

Proyectos será independiente de Artículos y permitirá fichas o páginas propias de proyectos personales. Aldarte es un candidato futuro; no está decidido qué información se publicaría y no se documentará información interna o confidencial.

## Selección histórica de Blogger

Se ha revisado una exportación histórica de los dos Blogger anteriores. Se migrarán únicamente como contenido histórico:

- «Mi experiencia con Top Eleven».
- «Mi experiencia con Top Eleven (1 mes más tarde)».

Al migrarlos se conservarán su carácter histórico y fecha original. No habrá migración automática del resto del contenido. Las fotografías originales de la exportación se conservarán para evaluar después su posible reutilización.

EC2 y swap, SSH a través de proxy, gestión/pruning de mensajes y SMTP Sender con adjuntos en Mirth Connect / Open Integration Engine podrán inspirar artículos nuevos. No son contenido pendiente de migración: si se publican, deberán escribirse/revisarse con información actual, sin copiar los tutoriales antiguos.

## Dirección visual y accesibilidad

- Estilo sobrio, moderno, limpio y atemporal, con carácter personal y tecnológico sin resultar excesivamente corporativo.
- Contenido y legibilidad como protagonistas, mucho espacio visual, pocos colores y un único acento orientado inicialmente a azul discreto/apagado. Los valores CSS definitivos siguen **por decidir**.
- Evitar efectos innecesarios, animaciones gratuitas, glassmorphism, degradados llamativos y tendencias que envejezcan rápidamente.
- Artículos con diseño editorial y columna de lectura cómoda; los proyectos podrán tener una presentación algo más visual.
- Diseño responsive/mobile-first, sin depender de hover para funciones importantes.
- Fuentes del sistema prioritarias en V1. No cargar Google Fonts ni otras fuentes externas; preferir alojamiento local si se usa una fuente personalizada en el futuro.
- Minimizar CSS, JavaScript, imágenes, fuentes, dependencias, peticiones externas y ancho de banda.
- V1 podrá respetar la preferencia del sistema mediante prefers-color-scheme. No se implementará inicialmente un selector manual que necesite JavaScript, cookies o localStorage; podrá evaluarse posteriormente.
- Accesibilidad desde el principio: HTML5 semántico, jerarquía correcta de encabezados, navegación por teclado, foco visible, contraste adecuado, textos alternativos cuando correspondan, atributo lang correcto, enlaces descriptivos y adaptación responsive.
- No depender exclusivamente del color y respetar prefers-reduced-motion cuando sea aplicable. No afirmar cumplimiento formal de WCAG hasta verificarlo.

## Identidad pública y contacto

El nombre público será **Fernando Garcia-Herrera Gomez** y aparecerá discretamente, sin obligación de convertirlo en protagonista visual. La fotografía puede mencionarse como afición/interés; el contenido definitivo de Sobre mí no se redacta todavía.

Se prevén enlaces web normales a [GitHub](https://github.com/fernandoghg) e [Instagram](https://www.instagram.com/fernandoghg/), sin feeds, widgets, scripts ni publicaciones incrustadas, evitando dependencias externas, tracking adicional y coste de rendimiento.

V1 no publicará dirección de correo, no expondrá el correo personal ni tendrá formulario de contacto. GitHub e Instagram serán inicialmente los enlaces públicos. Si surge una necesidad futura, podrá evaluarse un correo específico bajo fernandoghg.com.

## Alcance conceptual de V1

La primera versión pública será deliberadamente pequeña: Inicio, Sobre mí, Proyectos, Artículos, Privacidad y los dos artículos históricos seleccionados de Top Eleven. Los proyectos públicos solo se incorporarán cuando se decida expresamente qué información mostrar. La página de privacidad debe existir antes de publicar, junto con la revisión final indicada en [privacidad](privacy.md).

Estas decisiones documentan la dirección aprobada, sin implementar ahora páginas, diseño, migración ni contenido definitivo. RSS/Atom, un selector manual de tema y un posible correo público son posibilidades futuras, no requisitos pendientes de V1.
