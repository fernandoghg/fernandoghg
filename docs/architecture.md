# Arquitectura

## Decisiones actuales

- Sitio web personal, principalmente estático, asociado a fernandoghg.com y fernandoghg.es.
- Astro es el framework/generador seleccionado. TypeScript se utilizará cuando sea necesario para desarrollo y lógica. Priorizar HTML5 semántico y generación estática siempre que sea posible.
- La arquitectura inicial evitará backend, base de datos y procesamiento dinámico en servidor mientras no exista una necesidad funcional expresamente justificada.
- Los dominios están registrados actualmente en IONOS. No se transferirán ni se modificará DNS en esta fase.
- Contenido previsto principalmente en Markdown/MDX, en español e inglés. No todo el contenido tendrá necesariamente traducción.
- El sitio es bilingüe, con raíces /es/ y /en/. Las traducciones de artículos se relacionan mediante translationKey; canonical/hreflang multilingües quedan pendientes. La raíz redirige estáticamente a /es/, sin cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. SEO 3 prepara la regla nativa de Cloudflare Pages `/ /es/ 301` en public/_redirects, pendiente de autorización de publicación. Astro conserva sin cambios el meta refresh de dos segundos como respaldo HTML; no se añaden adaptadores ni procesamiento en servidor.
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

Estas decisiones no autorizan cambios externos: no se creará ni modificará Cloudflare, DNS, configuración de IONOS ni ningún servicio externo. El diseño visual local está aprobado y la infraestructura inicial de artículos está implementada, sin nuevas dependencias ni despliegue.

## Por decidir

| Tema | Estado y orientación actual |
| --- | --- |
| Publicación y configuración de producción | **Por decidir**: detalles de integración GitHub–Cloudflare Pages, configuración efectiva de HTTPS, certificados y redirecciones ya aprobadas, y transición desde Blogger. |
| Organización interna del contenido | Artículos Markdown y translationKey implementados según el modelo descrito abajo. Aldarte utiliza datos públicos localizados y componentes compartidos, sin colección de proyectos. **Por decidir**: eventual evolución del modelo de proyectos, MDX y SEO multilingüe completo. |
| Diseño concreto y contenido definitivo | Diseño visual inicial y presentación de Inicio aprobados e implementados. Presentación pública limitada de Aldarte aprobada en ES/EN. **Por decidir**: restantes textos definitivos, incorporación de otros proyectos y posible reutilización de fotografías históricas. |
| Herramientas y comprobaciones de desarrollo | Node.js v24.20.0 y npm 11.19.0; comandos de Astro y comprobación de tipos documentados en [desarrollo](development.md). Herramientas adicionales de pruebas **por decidir**. |
| Configuración y evaluación de privacidad | Política ES/EN publicada técnicamente con noindex. Antes de autorizar la indexación, revisar los pendientes de proveedores y tratamiento técnico de docs/privacy.md, sin declarar completada la revisión jurídica o contractual. |

La configuración futura del alojamiento deberá considerar coste, mantenimiento, privacidad, seguridad, rendimiento y compatibilidad con los dominios y HTTPS previstos. El proveedor está seleccionado, pero los costes efectivos y la configuración de infraestructura aún no están verificados ni definidos. Se mantiene el objetivo próximo a 0 EUR/mes. No se introducirán servicios AWS por su mera disponibilidad.

## Contenidos e idiomas

| Navegación en español | Navegación en inglés |
| --- | --- |
| Inicio | Home |
| Proyectos | Projects |
| Artículos | Articles |
| Sobre mí | About |

Las raíces de idioma son /es/ y /en/; / redirige estáticamente a /es/. No se usan cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. No se exige traducción de todo el contenido. translationKey relaciona los artículos traducidos para navegar entre versiones públicas; hreflang, canonical adecuado y SEO multilingüe completo quedan para una fase posterior.

Artículos será una sección principal. Tecnología, Juegos, Viajes, Simulación y otras clasificaciones serán categorías/etiquetas creadas únicamente cuando el contenido las justifique, sin elementos permanentes en el menú inicial. RSS/Atom queda como posibilidad futura, sin ser requisito de V1 ni implementarse ahora.

La portada de cada idioma no será un blog cronológico ni un CV. Su estructura conceptual será cabecera, presentación personal breve, accesos a Proyectos y Artículos, proyectos destacados, artículos recientes o destacados y footer. La web debe seguir teniendo sentido aunque no se publiquen artículos frecuentemente. La presentación podrá comenzar con una fórmula como «Hola, soy Fernando.», sin fijar el copy definitivo. El nombre completo no dominará visualmente la portada. Los accesos principales podrán ser enlaces claramente visibles, sin requerir grandes botones propios de una aplicación.

Proyectos es independiente de Artículos. Aldarte tiene una presentación pública aprobada como proyecto personal en desarrollo relacionado con el bienestar emocional, la sencillez y la privacidad. Aparece en Inicio y Proyectos, con páginas propias en /es/proyectos/aldarte/ y /en/projects/aldarte/. Se muestra únicamente el contenido público aprobado: nombre, estado, descripción breve, subtítulo, dos párrafos y nota final. No se publican funcionalidades concretas, arquitectura, tecnologías, fechas, detalles internos, imágenes, logotipos ni enlaces externos a Aldarte.

## Selección histórica de Blogger

Se ha revisado una exportación histórica de los dos Blogger anteriores. Se migrarán únicamente como contenido histórico:

- «Mi experiencia con Top Eleven».
- «Mi experiencia con Top Eleven (1 mes más tarde)».

Al migrarlos se conservarán su carácter histórico y fecha original. No habrá migración automática del resto del contenido. Las fotografías originales de la exportación se conservarán para evaluar después su posible reutilización.

EC2 y swap, SSH a través de proxy, gestión/pruning de mensajes y SMTP Sender con adjuntos en Mirth Connect / Open Integration Engine podrán inspirar artículos nuevos. No son contenido pendiente de migración: si se publican, deberán escribirse/revisarse con información actual, sin copiar los tutoriales antiguos.

## Dirección visual y accesibilidad

- Estilo sobrio, moderno, limpio y atemporal, con carácter personal y tecnológico sin resultar excesivamente corporativo.
- Contenido y legibilidad como protagonistas, mucho espacio visual, pocos colores y un único acento azul discreto/apagado. La paleta y los tokens iniciales de src/styles/global.css están aprobados e implementados; se mantienen 68rem de ancho máximo, 65ch de lectura y breakpoint principal de 48rem.
- Todas las páginas comparten .editorial-container de 56rem y el mismo eje izquierdo para H1 y cuerpo. Artículos individuales y Aldarte aprovechan los 56rem completos también en subtítulos, metadatos y párrafos, sin límites interiores de 65ch u 80ch. El texto permanece alineado a la izquierda y las imágenes pequeñas conservan su tamaño natural. Las demás páginas mantienen sus límites interiores de lectura, alineados al borde izquierdo. La introducción de Inicio aprovecha todo el ancho editorial. Cabecera y pie conservan 68rem. Proyectos y Artículos comparten filas editoriales con separadores horizontales; el proyecto muestra nombre enlazado, descripción y estado secundario, sin enlaces redundantes. Se conservan 80px superiores, 32px entre encabezado y contenido cuando corresponde, 24px entre H1 y descripción, 80px entre secciones de Inicio y 24px entre párrafos. Se reserva espacio estable para la barra vertical para evitar desplazamientos horizontales entre páginas.
- Evitar efectos innecesarios, animaciones gratuitas, glassmorphism, degradados llamativos y tendencias que envejezcan rápidamente.
- Artículos con diseño editorial: legibilidad, columna de lectura cómoda, jerarquía tipográfica, código legible, imágenes bien integradas y ausencia de distracciones. Los proyectos podrán tener una presentación algo más visual.
- Diseño responsive/mobile-first, sin depender de hover para funciones importantes.
- Fuentes del sistema prioritarias en V1. No cargar Google Fonts ni otras fuentes externas; preferir alojamiento local si se usa una fuente personalizada en el futuro.
- Minimizar CSS, JavaScript, imágenes, fuentes, dependencias, peticiones externas y ancho de banda.
- V1 podrá respetar la preferencia del sistema mediante prefers-color-scheme. No se implementará inicialmente un selector manual que necesite JavaScript, cookies o localStorage; podrá evaluarse posteriormente.
- Accesibilidad desde el principio: HTML5 semántico, jerarquía correcta de encabezados, navegación por teclado, foco visible, contraste adecuado, textos alternativos cuando correspondan, atributo lang correcto, enlaces descriptivos y adaptación responsive.
- No depender exclusivamente del color y respetar prefers-reduced-motion cuando sea aplicable. No afirmar cumplimiento formal de WCAG hasta verificarlo.

## Identidad pública y contacto

El nombre público será **Fernando Garcia-Herrera Gomez**. En contextos informales de la interfaz podrá utilizarse «Fernando». La cabecera utilizará discretamente **fernandoghg.com** como identificador y enlace a la portada del idioma correspondiente; el nombre completo no será un gran logotipo ni un elemento protagonista permanente.

Sobre mí será breve y personal, no un CV exhaustivo. Podrá incluir nombre público, presentación breve, intereses y los enlaces públicos previstos. La fotografía puede mencionarse como afición/interés y no será obligatorio publicar una fotografía personal. El contenido definitivo no se redacta todavía.

Se prevén enlaces web normales a [GitHub](https://github.com/fernandoghg) e [Instagram](https://www.instagram.com/fernandoghg/), sin feeds, widgets, scripts ni publicaciones incrustadas, evitando dependencias externas, tracking adicional y coste de rendimiento.

V1 no expondrá el correo personal ni tendrá formulario de contacto. GitHub e Instagram son los enlaces públicos aprobados. La política de privacidad publicada incorpora contacto@fernandoghg.com y privacidad@fernandoghg.com, operativos según confirmación del titular, mediante IONOS Mail Basic. El correo general se reenvía al buzón de privacidad; las solicitudes de derechos se gestionan diferenciadamente, según docs/privacy.md.

## Alcance conceptual de V1

La primera versión pública será deliberadamente pequeña: Inicio, Sobre mí, Proyectos, Artículos, Privacidad y los dos artículos históricos seleccionados de Top Eleven. Los proyectos públicos solo se incorporarán cuando se decida expresamente qué información mostrar. La política de privacidad ES/EN ya está publicada técnicamente; antes de autorizar la indexación deben revisarse los pendientes indicados en [privacidad](privacy.md).

El diseño inicial, la presentación de Inicio, la presentación pública bilingüe de Aldarte y la infraestructura de artículos están implementados, con los dos artículos históricos de Top Eleven migrados. Sobre mí / About me y Privacidad / Privacy contienen sus textos aprobados; la política está publicada técnicamente con fecha editorial 2026-10-17, sin autorización de lanzamiento público ni indexación. Los metadatos de las páginas existentes se conservan, incluida la descripción provisional de Proyectos; las páginas nuevas de Aldarte usan su descripción breve aprobada y mantienen noindex. Se mantienen pendientes las verificaciones de privacidad de proveedores y tratamiento técnico antes de autorizar la indexación, sin declarar completada la revisión jurídica o contractual. RSS/Atom y un selector manual de tema son posibilidades futuras, no requisitos pendientes de V1.

## Cabecera y navegación responsive

El orden del DOM es identificador, navegación principal y enlace de idioma. Bajo 48rem la cabecera utiliza Flexbox con flex-wrap: el identificador ocupa la primera fila y navegación e idioma comparten la siguiente cuando caben a su anchura natural. Si no caben, el idioma pasa debajo de la navegación y permanece alineado a la derecha. La lista de navegación puede ocupar varias líneas si necesita más espacio. Desde 48rem se conserva Grid en una sola fila: identificador, navegación e idioma. Se mantienen fuentes, separaciones y tamaños de objetivos interactivos. No se utiliza tabindex positivo, posicionamiento absoluto ni la propiedad order para alterar la secuencia.

En escritorio, la navegación principal será Inicio · Proyectos · Artículos · Sobre mí y sus equivalentes en inglés indicados arriba. Debe ser visible, sencilla y accesible. El enlace de idioma será discreto: EN desde español y ES desde inglés, sin banderas.

En V1 no habrá menú hamburguesa. Los cuatro elementos permanecerán directamente accesibles también en móvil; en pantallas estrechas podrán distribuirse en varias líneas o reorganizarse mediante CSS. El diseño será mobile-first y no se añadirá JavaScript para gestionar la navegación.

En artículos, el enlace de idioma lleva a la traducción pública relacionada por translationKey, si existe. Si no existe o es draft/futura, lleva a la portada del otro idioma. Las páginas de sección mantienen sus parejas explícitas ES/EN. No se crean traducciones inexistentes.

En las páginas individuales de Aldarte, el enlace de idioma lleva directamente a su página equivalente mediante languageHref de BaseLayout. Proyectos sigue marcado como sección activa y existe un enlace de regreso al listado del idioma actual.

## Modelo de artículos implementado

- Colección articles en src/content.config.ts mediante defineCollection, glob y esquema Zod 4 estricto de astro/zod. Consulta con getCollection y renderizado con render(entry), sin JavaScript cliente ni dependencias adicionales.
- Markdown en src/content/articles/es/<slug>.md y en/<slug>.md. Slug derivado del archivo e ID es/<slug> o en/<slug>, sin campo slug en frontmatter. Solo ASCII minúsculo, números y guiones; sin subdirectorios adicionales. Después de publicar, cambiar el nombre requiere revisar la URL y preparar redirección.
- Campos obligatorios: title, description, published, lang y category. description tiene una sola línea y máximo 300 caracteres. draft es boolean con defecto true. Opcionales: updated, translationKey, series y seriesPart; se omiten si no se usan, nunca se dejan vacíos/null.
- published y updated son strings ISO válidos YYYY-MM-DD entre comillas. updated >= published; solo se añade por actualización sustancial explícita. Migración, build, Git y fecha del archivo no alteran las fechas. Cada traducción conserva su propia published.
- Fechas largas con es-ES/en-GB en artículos individuales; día y mes abreviado en filas (ES: 8 oct., 7 sept.; EN: Oct 8, Sep 7), con año completo en el encabezado del grupo. Conversión UTC para conservar el día. El día de referencia pública es el día editorial de Europe/Madrid; las funciones aceptan una fecha explícita para pruebas deterministas.
- Público significa draft === false y published <= día de referencia. Portada, listados, rutas y traducciones utilizan la misma regla central. No hay scheduler: cambiar de día no altera un build ya generado, hace falta reconstruirlo.
- Rutas finas ES/EN: /es/articulos/<slug>/ y /en/articles/<slug>/, con getStaticPaths y utilidades compartidas. No se añade año/mes a la URL. El listado agrupa por año de published; la portada muestra hasta tres artículos públicos recientes. Sin artículos públicos, ambos muestran un estado vacío.
- translationKey es identificador ASCII minúsculo/números/guiones, opcional. Máximo una entrada por clave e idioma; una traducción puede faltar o tener slug distinto.
- series y seriesPart aparecen juntos o se omiten juntos. seriesPart es entero positivo; no se permiten partes duplicadas por serie e idioma. Se admiten huecos y traducciones parciales. La navegación anterior/siguiente enlaza las entregas públicas disponibles de la misma serie e idioma, ordenadas por parte. Se genera en el build, sin total ni colección de series.
- Única categoría inicial juegos, con enum y etiquetas Juegos/Games centralizados. Sin tags, colección de categorías, autor por artículo ni imagen destacada.
- Carpeta/lang y formato de ID se validan al cargar. Duplicados se comprueban sobre todas las entradas, incluidos drafts y futuros, antes de cada consulta pública o generación de rutas; un fallo impide el build.
- Las pruebas de integración generan y retiran fixtures temporales y reconstruyen dist al terminar. Los dos artículos históricos de Top Eleven están migrados, conservando las fechas originales y con navegación anterior/siguiente de serie.

## Presentación de proyectos y artículos

La ficha de Aldarte sustituye el proyecto ficticio de Inicio y se reutiliza en Proyectos. Muestra nombre enlazado, descripción breve y estado secundario en una fila editorial con un único enlace. No incorpora tecnologías, fechas ni imágenes. ProjectCard utiliza h3 en Inicio y h2 en Proyectos para conservar la jerarquía de encabezados.

src/data/projects.ts centraliza exclusivamente los datos públicos aprobados y las rutas localizadas de Aldarte. AldartePage comparte la estructura visual entre idiomas; dos entradas estáticas generan sus rutas. No se añade una colección, un esquema rígido de proyectos, dependencias ni JavaScript cliente.

Las páginas de proyecto tendrán una estructura flexible: podrán incluir título, descripción, imágenes/capturas opcionales, explicación, tecnologías, estado y enlaces públicos. No todos los proyectos deberán utilizar los mismos apartados; no se define todavía un esquema técnico rígido.

Para los artículos en portada se preferirá una lista editorial limpia frente a una cuadrícula de tarjetas. Cada entrada podrá mostrar fecha, título, categoría y enlace. Debe existir acceso al listado completo de artículos.

El listado de Artículos favorecerá una presentación cronológica/editorial sencilla y permitirá agrupar por año. Así, el contenido histórico podrá convivir con contenido reciente sin aparentar una publicación reciente. Los dos artículos de Top Eleven conservarán sus fechas originales al migrarse, conforme a la selección histórica anterior.

## Fotografías y footer

La arquitectura visual permitirá fotografías propias ocasionales al ancho normal de lectura, algo más anchas que la columna o panorámicas cuando el contenido lo justifique. No se fijan clases CSS ni nombres de componentes. Se optimizarán para web, con dimensiones adecuadas y sin descargas innecesariamente grandes; tendrán texto alternativo cuando corresponda y podrán ser decorativas cuando semánticamente proceda. No se creará por ahora una galería fotográfica ni se integrará el feed de Instagram.

El footer será discreto y podrá contener GitHub, Instagram, Privacidad y copyright/año cuando corresponda. Se mantendrán los enlaces normales ya aprobados, sin widgets ni scripts sociales.

## JavaScript y diseño propio

V1 intentará funcionar con cero JavaScript de cliente para la estructura básica del sitio. No es una prohibición absoluta para el futuro: cualquier funcionalidad que lo necesite deberá justificarse por una mejora real de funcionalidad o experiencia. No se añadirá para menú móvil, selector automático de idioma, animaciones decorativas ni modo oscuro automático.

La implementación será propia, sin copiar diseños, código, identidad visual ni textos de otros sitios. No es necesario registrar nombres de webs externas utilizadas como inspiración.

## Incremento visual 1

Este incremento sustituye los espaciados principales fijos descritos anteriormente: --page-space utiliza 3rem bajo 48rem y 5rem desde 48rem para el inicio de página, separación de secciones y espacio inferior de main. --page-gutter utiliza 1rem bajo 48rem y 1.5rem desde 48rem para los márgenes laterales. Se mantienen las anchuras máximas, la paleta y la tipografía principal. La 404 bilingüe separa sus elementos internos con 1rem. Privacidad tiene margen superior de 2rem. Los hr de los artículos tienen borde superior de 1px con --border y márgenes verticales de 2rem. H4 tiene margen inicial cero, tamaño 1.05rem, interlineado 1.35 y peso 650; conserva la separación editorial existente de 3rem. No cambia el espaciado de H2/H3 ni se añade JavaScript cliente.
