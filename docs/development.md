# Desarrollo

## Entorno previsto

- Windows 11.
- VS Code y Codex.
- Repositorio local: `C:\Desarrollo\fernandoghg`.
- Git y GitHub para control de versiones.
- Repositorio remoto: `https://github.com/fernandoghg/fernandoghg.git`.
- Rama principal: `main`.
- Mensajes de commit con Conventional Commits.

## Base local existente y alcance actual

El repositorio contiene Astro con TypeScript estricto y npm, diseño visual inicial aprobado e infraestructura estática de artículos Markdown. No se ha creado otro repositorio Git ni un subdirectorio de proyecto.

La base incluye infraestructura de artículos, comprobaciones, documentación y los dos artículos históricos reales migrados, «Mi experiencia con Top Eleven» y «Mi experiencia con Top Eleven (1 mes más tarde)», publicados en español dentro del modelo de contenidos. Sus imágenes originales están almacenadas junto a los artículos y Astro genera las versiones optimizadas durante el build. Incluye también la presentación pública aprobada de Aldarte en español e inglés. Con ambos artículos públicos, las dos páginas individuales de Aldarte y la 404 bilingüe, el build genera 16 páginas HTML. La base es estática, sin frameworks UI, Tailwind, frameworks CSS, backend, base de datos, SSR ni analítica. No se instalan dependencias, se configura despliegue ni se crean commits o push sin autorización.

Entorno de inicio: Node.js v24.20.0, npm 11.19.0 y Git 2.55.0.windows.5. npm es el gestor de paquetes seleccionado. Las pruebas de artículos utilizan node:test y assert incluidos en Node 24, sin dependencias adicionales. Los detalles del flujo automatizado de publicación siguen **por decidir**.

## Comandos de la base mínima

- `npm ci`: instalar las dependencias reproducibles a partir de `package-lock.json`.
- `npm run dev`: iniciar el servidor local de desarrollo.
- `npm run check`: comprobar TypeScript y archivos `.astro` mediante `astro check`.
- `npm run build`: generar el sitio estático de producción en `dist/`.
- `npm run preview`: servir localmente el build para revisión, sin publicar.
- `node --test tests/articles.test.mjs`: probar esquema, fechas, visibilidad, IDs, traducciones y series, sin build ni archivos temporales.
- `node --test tests/articles-build.test.mjs`: probar la integración de Content Collections y rutas con builds reales y fixtures temporales, además de rutas, fichas, jerarquía y cambio de idioma de Aldarte. No ejecutar junto a otro build/dev: modifica temporalmente archivos fixture propios, los elimina en finally y reconstruye dist. No sobrescribe contenido existente.

Las dependencias directas de desarrollo siguen siendo `astro`, `typescript` y `@astrojs/check`. TypeScript utiliza `astro/tsconfigs/strict`. La configuración declara `output: 'static'` y el dominio canónico, sin adaptadores ni integraciones. El diseño bilingüe tiene layout y CSS compartidos, modo claro/oscuro del sistema y redirección estática de / a /es/ mediante meta refresh. Se mantienen noindex, las metadescripciones aprobadas y canonical/hreflang entre equivalentes reales, sin JavaScript cliente ni recursos externos automáticos. La retirada de noindex requiere autorización expresa, aunque el sitio ya esté publicado.

`node_modules/`, `.astro/` y `dist/` son salidas locales ignoradas por Git. Se conserva el archivo de bloqueo de npm para instalaciones reproducibles, sin cambios de dependencias para artículos.

Para desactivar la telemetría de la herramienta Astro en una sesión de PowerShell antes de ejecutar sus comandos: `$env:ASTRO_TELEMETRY_DISABLED='1'`. Esta variable afecta a la herramienta local; las páginas generadas no incluyen analítica.

Versiones instaladas: Astro 7.3.5, TypeScript 6.0.3 y `@astrojs/check` 0.9.10. El sitio actual genera 16 páginas HTML estáticas con los dos artículos públicos, las páginas ES/EN de Aldarte y la 404 bilingüe, sin JavaScript cliente ni recursos externos automáticos. El aviso inicial de npm sobre el script de instalación de esbuild no requirió cambios para las comprobaciones y el build.

## Revisión de dependencias de seguridad (2026-10-23)

Desde main `a0b6226e3917713a07841ae7696298435b9c695f`, se actualiza únicamente la entrada transitiva de Vite en el lockfile: 8.3.2 → 8.3.3 (versión, URL e integridad contrastadas con npm). Astro 7.3.5 admite `vite: ^8.0.13` y vitefu 1.1.3 admite Vite 8; las dependencias y el requisito de Node de esta versión no requieren cambios adicionales. Se mantienen package.json, Astro, TypeScript y el resto del árbol. No se utiliza npm audit fix. La instalación se verifica con `npm ci --ignore-scripts --no-audit --no-fund`.

`npm ls vite http-cache-semantics` y `npm explain` confirman que ambos paquetes llegan por Astro. Tras el cambio, npm audit deja de señalar Vite y conserva un aviso alto: [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp), para http-cache-semantics 4.2.0. El aviso describe reutilización de respuestas de usuarios en una caché compartida mediante max-stale; el [mantenedor lo disputa y cerró el informe sin plan de corrección](https://github.com/kornelski/http-cache-semantics/issues/56#issuecomment-5975759591). La ficha consultada no identifica una versión parcheada. npm publica 4.3.0, compatible con el rango `^4.2.0` de Astro, y audit indica fixAvailable; esto no acredita por sí solo una corrección del comportamiento denunciado. Se conserva 4.2.0 para evitar una actualización sin corrección de seguridad confirmada.

Aplicabilidad revisada: Astro importa CachePolicy en `astro/dist/assets/build/remote.js`, para cargar/revalidar imágenes remotas y calcular su TTL. El sitio actual solo procesa imágenes locales, genera archivos estáticos y no tiene servidor Astro, sesiones ni caché compartida de respuestas privadas. No se identifica una vía de explotación del aviso en este proyecto actual. El aviso residual sigue visible: no se silencia ni se declara resuelto. Reevaluar si se incorporan imágenes remotas, SSR, autenticación o cachés compartidas, o si se publica una corrección confirmada o cambia el estado del aviso.

## Cabeceras de seguridad HTTP

`public/_headers` prepara las cabeceras para los recursos estáticos de Cloudflare Pages y se copia a `dist/_headers`: CSP con recursos denegados por defecto, solo CSS e imágenes locales, sin scripts ni estilos inline; `nosniff`, `no-referrer`, restricciones de capacidades y prohibición de incrustar las páginas. No se activa HSTS: se evaluará después de comprobar HTTPS en producción. No hay servicios externos configurados por este archivo. La generación local no verifica las cabeceras HTTP del alojamiento; `astro preview` no aplica necesariamente `_headers`.

Astro 7.3.5 utiliza `build.inlineStylesheets: 'never'`. La tabla del segundo artículo de Top Eleven conserva sus alineaciones mediante CSS limitado a `.top-eleven-complex-table`, aplicado solo al ID español de ese artículo: columnas 2/3 centradas y 4/5 a la izquierda, tanto encabezados como celdas; la columna 1 conserva su comportamiento anterior. La fila delimitadora Markdown ya no solicita alineación, evitando los atributos `style` generados por Sätteri. No cambia el contenido editorial ni se transforman otras tablas.

Las pruebas de integración comprueban ausencia de estilos inline y scripts, hojas CSS locales, alineación declarada de la tabla y copia exacta de las cabeceras sin `unsafe-inline`, `unsafe-eval` ni HSTS, además de las comprobaciones existentes de rutas, SEO y recursos externos. Pages aplica `_headers` a recursos estáticos, no a respuestas de Functions; las comprobaciones locales no sustituyen la validación HTTP del servicio publicado ni verifican redirecciones de dominios alternativos.

Los fixtures temporales de código conservan la cobertura de Shiki y permiten exclusivamente su atributo de colores en `pre`; las páginas reales no tienen esta excepción. Antes de publicar artículos con bloques de código habrá que adaptar el resaltado, que genera estilos inline incompatibles con esta CSP.

## Sitemap, rastreo y página 404

`src/pages/sitemap.xml.ts` genera `dist/sitemap.xml` durante el build, sin SSR ni dependencias nuevas. Reutiliza las rutas de navegación, Aldarte y getArticlePaths para incluir solo artículos públicos y sus traducciones reales. Actualmente contiene 14 URL canónicas absolutas con relaciones ES/EN equivalentes a las del HTML. Excluye la raíz y la 404; no inventa lastmod. Las nuevas páginas generales o de proyecto deberán incorporarse a esta fuente de rutas y a las pruebas.

`public/robots.txt` se copia a dist y referencia el sitemap. Permite rastreo ordinario para que los buscadores puedan leer noindex y permite los agentes identificados de búsqueda o navegación por petición del usuario. Solicita excluir GPTBot, ClaudeBot, Google-Extended y CCBot. La exclusión de Google-Extended acepta limitar algunos usos de Gemini/Vertex. Son reglas voluntarias, no protección absoluta frente a entrenamiento ni control de acceso contra bots abusivos; no se verifica aquí la configuración de controles específicos de Cloudflare frente a estos rastreadores.

`src/pages/404.astro` genera una única `dist/404.html`, con bloques ES/EN, enlaces a sus portadas, layout/CSS compartidos y noindex. No tiene canonical ni hreflang porque es una respuesta de error global, no una página de contenido traducida. Cloudflare Pages utiliza el 404.html superior para rutas inexistentes; el código HTTP y el contenido deben verificarse también en el alojamiento real al revisar cambios de publicación. No se añaden redirecciones ni detección de idioma.

Las pruebas de integración existentes comprueban también sitemap/rutas/hreflang, robots.txt, la 404 y ausencia de JavaScript y recursos externos en cada build con fixtures, y restauran al terminar las 16 páginas reales y el sitemap de 14 URL. `npm run preview -- --host 127.0.0.1 --port 4327` permite revisar HTTP local; no equivale a validar Cloudflare Pages.

## Flujo de trabajo local

### Pruebas visuales con Edge

1. Crear un directorio temporal externo y exclusivo por ejecución bajo la carpeta temporal del usuario de Windows, por ejemplo mediante `Join-Path ([System.IO.Path]::GetTempPath()) ('fernandoghg-visual-' + [guid]::NewGuid().ToString('N'))` en PowerShell.
2. Crear dentro los subdirectorios `browser-profile` y `screenshots`. Al iniciar Edge, pasar la ruta absoluta de `browser-profile` mediante `--user-data-dir` y guardar las capturas en `screenshots`.
3. Cerrar el navegador de pruebas antes de limpiar sus archivos temporales y comprobar que ningún proceso sigue utilizando el perfil. No borrar perfiles que estén siendo utilizados.

Mantener estos archivos fuera del repositorio evita que el watcher de Astro/Vite intente vigilar archivos bloqueados del navegador. No utilizar `.astro/`, `src/`, `public/` ni otras carpetas del proyecto para perfiles o artefactos temporales de estas pruebas.

### Pasos habituales

1. Revisar `AGENTS.md` y la documentación antes de modificar el proyecto.
2. Mantener la implementación dentro del alcance autorizado y acordar las herramientas aún pendientes cuando sean necesarias.
3. Realizar los cambios locales solicitados y mantener la documentación coherente con las decisiones aprobadas.
4. Revisar los cambios con Git y realizar las comprobaciones pertinentes a las herramientas que se hayan seleccionado.
5. Crear commits únicamente con autorización, siguiendo Conventional Commits, por ejemplo `docs: document initial project decisions`.
6. Hacer push o desplegar únicamente con autorización explícita.

Codex puede modificar los archivos locales cuando se le solicite. La autorización de trabajo local no autoriza push, despliegues ni cambios en infraestructura, DNS, dominios o servicios externos.

## Criterios de implementación aprobados

- Priorizar HTML5 semántico y generación estática siempre que sea posible.
- Minimizar JavaScript en el navegador; no añadirlo cuando HTML/CSS sean suficientes.
- Mantener páginas ligeras y dependencias al mínimo razonable. Minimizar y optimizar CSS, JavaScript, imágenes, fuentes y demás recursos para reducir transferencia y tiempos de carga, también en conexiones y dispositivos modestos.
- Evitar recursos externos innecesarios y favorecer recursos autocontenidos.
- No introducir backend, base de datos ni procesamiento dinámico en servidor salvo necesidad funcional futura expresamente justificada.
- Mantener /es/ y /en/ y la redirección estática de / a /es/, sin cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. Las traducciones de artículos están relacionadas por translationKey; canonical es autorreferente y hreflang se emite solo para traducciones públicas reales.
- Mantener la primera versión sin analítica ni seguimiento conforme a [los principios de privacidad](privacy.md).

## Publicación y mantenimiento

El sitio está publicado en https://fernandoghg.com mediante Cloudflare Pages. Cloudflare presta DNS, proxy/CDN y seguridad; el dominio sigue registrado en IONOS. GitHub es el repositorio y sistema de control de versiones; no se presupone un mecanismo concreto de despliegue. Mantener noindex hasta autorización expresa de su retirada. No desplegar estos cambios locales.

Los dominios permanecen registrados en IONOS y no se transferirán. El mantenimiento local no autoriza cambios de Blogger, DNS, configuración de IONOS o Cloudflare, ni de ningún servicio externo.

No se deben versionar credenciales ni secretos. `.gitignore` excluye dependencias y salidas de Node.js/TypeScript/Astro, archivos de entorno y archivos locales de Windows/VS Code. Permite compartir configuraciones de VS Code si se incorporan de forma deliberada.

## Aplicación posterior de las decisiones de V1

Las decisiones de navegación, selección histórica de Blogger, identidad y diseño se recogen en [arquitectura](architecture.md). Documentarlas no implementa las páginas ni autoriza redactar contenido definitivo.

La implementación utiliza fuentes del sistema, recursos autocontenidos, cero JavaScript cliente y diseño responsive/mobile-first. No se incorporarán frameworks UI, Tailwind ni frameworks CSS sin una decisión futura justificada, ni backend, base de datos o SSR sin requisito futuro explícito. Privacidad, rendimiento, accesibilidad, seguridad, coste y mantenibilidad son criterios de primer nivel.

La accesibilidad se revisará desde el diseño: semántica HTML5, encabezados, teclado, foco visible, contraste, alternativas textuales, lang, enlaces descriptivos y ausencia de funciones dependientes solo de color o hover. Se respetará prefers-reduced-motion cuando corresponda. No se afirmará cumplimiento formal de WCAG sin verificación.

V1 podrá seguir prefers-color-scheme; no se añadirá inicialmente un selector manual que necesite JavaScript, cookies o localStorage. No se cargarán fuentes externas ni feeds, widgets, scripts o publicaciones de redes sociales. No habrá formulario de contacto ni se expondrá el correo personal. Los contactos públicos operativos son contacto@fernandoghg.com (general, reenviado al buzón de privacidad) y privacidad@fernandoghg.com (privacidad y derechos), mediante IONOS Mail Basic. Según confirmación del titular, Email Address Obfuscation está desactivado y los mailto funcionan sin JavaScript. No se presume ausencia absoluta de cookies técnicas de Cloudflare; los pendientes contractuales están en docs/privacy.md.

Para una actualización exclusivamente documental, revisar el diff, ejecutar git diff --check, git diff --stat y git status, y resumir archivos modificados, contradicciones resueltas y decisiones realmente pendientes. No es necesario instalar dependencias ni ejecutar comprobaciones de Astro o build para estos cambios. No hacer git add, commit ni push sin autorización.

## Presentación pública de proyectos

src/data/projects.ts contiene únicamente los datos públicos aprobados de Aldarte, localizados en ES/EN: nombre, estado, descripción breve, subtítulo, dos párrafos, nota final y rutas. Las rutas se forman a partir de navigation y el segmento estable aldarte. No hay Content Collection de proyectos, validadores adicionales ni campos para funcionalidades, tecnologías, fechas o información interna.

ProjectCard.astro comparte la ficha de Inicio (h3) y Proyectos (h2), como fila editorial con nombre enlazado, descripción y estado secundario, sin enlaces redundantes. Home.astro conserva los textos aprobados y los artículos recientes automáticos. src/pages/[lang]/[page].astro conserva el listado de artículos, muestra los cuatro párrafos aprobados de Sobre mí / About me e incorpora PrivacyContent.astro únicamente para Privacidad / Privacy.

PrivacyContent.astro renderiza estáticamente las políticas ES/EN ya publicadas técnicamente, con fecha editorial fija 2026-10-17 (17 de octubre de 2026 / 17 October 2026), introducción y ocho H2. La publicación técnica no autoriza el lanzamiento público ni la indexación; los cambios posteriores requieren aprobación independiente. Describe la finalidad personal, Cloudflare Pages/DNS/proxy/CDN/seguridad, registro del dominio y correo IONOS Mail Basic, ambos correos, bases jurídicas y conservación diferenciada. Reutiliza .article-body dentro del contenedor editorial de 56rem; no añade CSS ni JavaScript cliente. Correo, Cloudflare, IONOS y AEPD son enlaces normales, sin solicitudes automáticas a servicios externos. No incorpora cookies ni banner ni afirma ausencia absoluta de cookies técnicas del proveedor. Se mantienen los metadatos existentes, noindex y las cabeceras; los contratos y transferencias sin verificar se documentan en docs/privacy.md.

AldartePage.astro comparte una única estructura entre src/pages/es/proyectos/aldarte.astro y src/pages/en/projects/aldarte.astro. Reutiliza BaseLayout con page="projects", descripción breve como meta description y languageHref hacia la otra página de Aldarte. El contenido visible se limita a estado, H1, subtítulo, dos párrafos, nota y regreso a Proyectos. Se mantiene noindex, sin imágenes, logotipos, enlaces externos a Aldarte, nuevas dependencias ni JavaScript cliente.

Todas las páginas comparten .editorial-container de 56rem y el mismo eje izquierdo para H1 y cuerpo. Se elimina .reading-container. Las páginas individuales de artículos y Aldarte utilizan todo el ancho editorial también en subtítulos, metadatos y párrafos, sin límites interiores de 65ch u 80ch. .project-page delimita el ajuste de .lead de Aldarte; .article-page delimita el de artículos. ArticleLayout conserva su estructura. No se justifican textos ni se estiran imágenes pequeñas; se mantienen max-width: 100%, height: auto y el desplazamiento interior de tablas y código. Las demás páginas conservan sus límites de lectura y presentación; la introducción de Inicio sigue aprovechando todo el ancho editorial. Cabecera y pie mantienen 68rem.

.editorial-row comparte separadores, espaciado, enlaces y adaptación responsive entre Artículos y ProjectCard (h3 en Inicio, h2 en Proyectos). En escritorio, Artículos utiliza fecha de 4.5rem, título flexible y categoría; Proyectos utiliza nombre y descripción flexibles con estado secundario a la derecha. En móvil se apilan sin columnas vacías. .page-start conserva 80px superiores; .page-content 32px entre encabezado y contenido; .section-stack 80px entre secciones de Inicio y .prose-stack 24px entre párrafos. Se mantienen tokens, breakpoint de 48rem y scrollbar-gutter: stable para evitar desplazamientos entre páginas cortas y largas. Textos y metadatos existentes permanecen sin cambios, incluida la descripción provisional de Proyectos. La revisión de esa descripción sigue pendiente; canonical/hreflang entre equivalentes reales ya están implementados.

La prueba de integración verifica las dos rutas nuevas, enlaces desde Inicio y Proyectos, cambio de idioma, sección activa, regreso al listado, jerarquía de encabezados y retirada de la ficha ficticia. La comprobación de recursos generados sigue rechazando JavaScript cliente y recursos externos automáticos en todo dist. Al finalizar, elimina sus fixtures, reconstruye dist y comprueba 16 páginas HTML.

## Infraestructura de artículos

La colección articles se declara en src/content.config.ts con defineCollection, glob y el esquema de src/lib/article-model.ts, usando Zod 4 de astro/zod. Astro 7 procesa Markdown con Sätteri; no se instala remark/rehype ni MDX. Los archivos son src/content/articles/es/<slug>.md y en/<slug>.md. El ID incluye idioma y slug; no existe campo slug en frontmatter y no se admiten subcarpetas adicionales.

Metadatos obligatorios: title, description (una línea, máximo 300 caracteres), published, lang (es/en) y category. draft tiene defecto true. updated, translationKey, series y seriesPart son opcionales; se omiten, nunca se escriben vacíos/null. El esquema es estricto y rechaza campos desconocidos. series y seriesPart aparecen juntos; la parte es entera positiva. La única categoría inicial es juegos, con IDs y etiquetas Juegos/Games en src/data/article-categories.ts.

Guarda published/updated como strings ISO YYYY-MM-DD entre comillas. updated no puede ser anterior a published y solo corresponde a una actualización sustancial explícita. Nunca se calcula desde migración, Git, build o fecha del archivo. Cada traducción conserva su propia publicación. formatArticleDate mantiene el formato largo es-ES/en-GB en artículos individuales. formatArticleListDate muestra día y mes abreviado: ES (8 oct., 7 sept.) con abreviaturas editoriales explícitas para evitar variaciones de ICU; EN (Oct 8, Sep 7) con en-US. Ambas funciones usan UTC para conservar el día; el año completo permanece en el encabezado del grupo del listado.

src/lib/articles.ts consulta getCollection, valida todas las entradas y centraliza getPublicArticles/getArticlePaths. Solo se publican artículos con draft === false y published <= día editorial de Europe/Madrid. El día se fija al evaluar el módulo y puede inyectarse en las funciones para pruebas; currentArticleDate también admite un reloj explícito. Sin scheduler, un build no cambia cuando avanza el calendario: hay que reconstruirlo. En dev, reiniciar el servidor al cambiar de día para renovar la referencia.

La carpeta/lang y los nombres se comprueban en generateId al cargar. Antes de consultar artículos públicos o crear rutas, se comprueban IDs, translationKey + lang y series + lang + seriesPart sobre toda la colección, incluidos drafts y futuros. Las comprobaciones entre entradas se ejecutan durante el build mediante las consultas, no se presupone que astro check por sí solo las ejecute.

Las rutas finas src/pages/es/articulos/[slug].astro y src/pages/en/articles/[slug].astro comparten getArticlePaths y ArticlePage.astro. Usan render(entry) y ArticleLayout.astro con ancho de lectura y CSS existentes. El selector enlaza a una traducción pública con slug propio; si falta o no es pública, lleva a la portada del otro idioma. selectSeriesNeighbors reutiliza selectSeriesArticles para obtener las entregas anterior y siguiente disponibles, sin exigir partes consecutivas. getArticlePaths usa la misma fecha editorial de publicación y pasa solo título y URL de los vecinos al layout. La navegación estática se omite si no hay vecinos; no hay total de partes.

Portada y listados comparten la consulta pública; los listados agrupan por año original. Las pruebas de integración crean fixtures propios, verifican exclusión de drafts/futuros y traducciones, rechazan duplicados y restauran el build. Antes de ejecutar estas pruebas, comprobar que no hay dev/build activos y no cerrar procesos ajenos sin autorización; una interrupción forzada puede requerir retirar los archivos fixture-* temporales y repetir el build.

No hay autor por artículo, tags, imagen destacada, RSS ni colecciones de categorías/series. El sitemap incluye los artículos públicos. Los borradores de un repositorio público son visibles en GitHub aunque no generen páginas. No guardar información confidencial en ellos. El posible JavaScript futuro deberá aportar una mejora real justificada; navegación, idioma y tema siguen sin JavaScript cliente.

## Imágenes editoriales y archivos descargables

- Las imágenes editoriales se almacenan junto al contenido dentro de `src/content/articles/`, en una carpeta con el slug del artículo junto a su Markdown, para que Astro pueda procesarlas y optimizarlas. Utilizar nombres descriptivos, cortos, en minúsculas y sin espacios.
- Los originales no deben modificarse innecesariamente; Astro genera los recursos optimizados durante el build.
- `public/downloads/` queda reservado para archivos que deban ofrecerse directamente para descarga sin transformación, como PDF, ZIP, XML, JSON, CSV u otros recursos estáticos. No crear subdirectorios de downloads hasta que exista contenido real que los necesite.
- Antes de publicar archivos descargables, comprobar que no contienen secretos, credenciales, datos personales, datos sanitarios ni información privada o corporativa.
- No incorporar recursos externos cuando podamos servirlos localmente.

## Regresión SEO previa al lanzamiento

`tests/articles-build.test.mjs` comprueba todos los HTML de cada build válido, incluidos los fixtures y la 404: un único título no vacío, una única descripción no vacía, lang coherente con /es/ o /en/, un único viewport con width=device-width e initial-scale=1, y una única directiva robots con noindex. Comprueba también que los metadatos estén en head. La 404 conserva lang=es con sus bloques bilingües, sin canonical ni hreflang. La raíz index.html es la excepción explícita de descripción, lang y viewport porque es HTML de redirección generado por Astro; sí debe tener título no vacío, noindex y canonical a /es/. Se mantienen las pruebas de canonical, reciprocidad de hreflang, exclusión de traducciones inexistentes y correspondencia del sitemap con las páginas generadas.

Se comprueban los href de los enlaces a archivos locales, tanto relativos como absolutos del dominio canónico, y sus fragmentos HTML mediante id o el atributo name de anclas. Se resuelven consultas, entidades HTML comunes y numéricas, fragmentos codificados y rutas de directorio; los enlaces externos y mailto no se consultan. Los fragmentos de recursos no HTML, como páginas de PDF, y las directivas de selección de texto no se validan. No es un parser HTML general: se valida el HTML generado por Astro con los atributos entre comillas dobles que utiliza actualmente. Hay casos negativos en memoria para comprobar que las validaciones rechazan errores sin modificar páginas reales.

SEO 3 prepara public/_redirects con la única regla `/ /es/ 301`, pendiente de autorización de publicación. Astro copia el archivo a dist/_redirects; Cloudflare Pages interpreta la regla antes de servir el HTML de la raíz. src/pages/index.astro permanece intacto y genera el respaldo HTML diferido de dos segundos a /es/, con noindex y canonical a https://fernandoghg.com/es/. No se modifican las rutas de idioma, robots, sitemap, _headers ni CSP. Las pruebas comprueban la regla exacta sin reglas adicionales, su copia y la coherencia de su destino con el refresh y canonical del respaldo en cada build válido. Se conservan las 16 páginas HTML y las 14 URL reales del sitemap.

Las pruebas locales verifican archivos de dist, pero no demuestran que Pages responda HTTP 301. astro preview sirve para revisar el respaldo y las páginas, no para acreditar la aplicación de _redirects. No se consultan servicios externos ni se añaden dependencias. Se mantienen noindex y todas las restricciones de publicación.

Después de una autorización independiente para crear una publicación de prueba de esta rama en Pages (sin integrar ni publicar producción), comprobar GET y HEAD de la raíz de esa URL sin seguir redirecciones: deben devolver 301 y Location a /es/ del mismo entorno. Seguir el traslado y comprobar un único salto hasta /es/ con 200; /en/ debe responder 200 directamente. Revisar también consultas en la raíz, recursos y una ruta inexistente para descartar reglas demasiado amplias o bucles. Verificar noindex, canonical/hreflang y cabeceras de seguridad en las respuestas HTML de destino; los canonical deben seguir apuntando al dominio público aprobado. Las reglas de redirección tienen precedencia sobre _headers: no se presupone que el 301 incluya esas cabeceras o un meta robots. Conservar noindex del respaldo y de todos los destinos. Revisar en navegador con caché limpia por la posible persistencia del 301. No se ha creado todavía ninguna publicación de prueba; la comprobación de producción requerirá una autorización posterior.

## Metadatos sociales (SEO 4)

BaseLayout centraliza Open Graph y Twitter Cards en las páginas de contenido ES/EN, con el mismo título HTML completo, descripción y canonical existentes. socialType es website por defecto; ArticleLayout pasa article únicamente para artículos individuales. La raíz y la 404 no emiten etiquetas sociales. src/data/social.ts reúne el recurso general, sus dimensiones, tipo PNG, alternativas localizadas y locales es_ES/en_GB. No se añaden fechas sociales, locales alternativos ni campos al esquema de artículos. Se mantienen noindex, hreflang, sitemap, robots y CSP, sin scripts ni recursos remotos automáticos.

La imagen general es public/social/site.png, de 1200 × 630px, RGB opaco. Su fuente autocontenida docs/design/social-site.svg reutiliza exactamente el rectángulo y los trazados de public/favicon.svg en un grupo con escala uniforme 4.5 (288px) situado en (456, 120). El fondo es #FAF9F6; el dominio aparece debajo en #253B52, centrado, convertido a trazados desde Segoe UI local de Windows a 36 unidades. No necesita fuentes instaladas para abrirse o exportarse y no modifica el monograma original. El PNG se exporta con sharp ya disponible en la instalación de Astro, sin dependencias nuevas, retirando el alfa del fondo opaco y con compresión PNG sin pérdidas de nivel 9 y filtrado adaptativo.

Para reproducir la exportación desde la raíz del repositorio: `node --input-type=module -e "import sharp from 'sharp'; await sharp('docs/design/social-site.svg').removeAlpha().png({compressionLevel:9,adaptiveFiltering:true}).toFile('public/social/site.png');"`. Revisar visualmente la imagen antes de aprobar cualquier nueva exportación. Los metadatos declaran una URL absoluta bajo Astro.site; en vistas previas siguen apuntando a producción, donde el recurso nuevo solo existirá después de una publicación autorizada. No se crean peticiones del navegador a redes sociales; las plataformas pueden solicitar HTML e imagen al compartir y mantener su propia caché.

Las pruebas de build verifican las 16 etiquetas sociales, unicidad, localización, coincidencia con HTML/canonical, tipo de página, exclusión de raíz/404, imagen copiada, formato y dimensiones, y geometría original del favicon en la fuente editable. Incluyen artículos temporales ES/EN y conservan las comprobaciones SEO y de seguridad existentes. No garantizan el recorte ni la representación final de tarjetas por servicios externos. La revisión inicial se hace abriendo PNG/SVG localmente; la validación de tarjetas externas requiere autorización de publicación independiente.

## Favicon FG

El original aprobado es `docs/design/favicon-fg.svg`. `public/favicon.svg` es una copia exacta, autocontenida, con letras trazadas y los mismos colores en temas claro y oscuro. `public/favicon.ico` contiene tres imágenes PNG internas de 16, 32 y 48px. `public/apple-touch-icon.png` es RGB de 180 × 180px, sin transparencia, con el fondo azul extendido hasta los bordes; conserva los trazados del monograma. No hay manifiesto web.

Los rásteres se generaron con `sharp`, ya disponible como dependencia de la instalación de Astro, sin modificar package.json ni el lockfile. Se rasterizó el SVG con densidad 384 y se redujo a cada tamaño. El ICO utiliza un directorio de tres entradas de 32 bits que referencia los PNG. Para Apple se retiró únicamente rx del rectángulo en una copia en memoria y se exportó como PNG RGB sobre #253B52. El SVG aprobado no se modificó.

BaseLayout declara los tres recursos con rutas absolutas locales para ES/EN y 404. La raíz sigue siendo una redirección estática. Se mantienen noindex, CSP y cabeceras. Las pruebas comprueban referencias, recursos copiados sin cambios, igualdad del SVG aprobado, tamaños internos del ICO y dimensiones/formato RGB del PNG.

Para revisar antes de publicar, ejecutar `npm run build` y `npm run preview -- --host 127.0.0.1 --port 4327`. Abrir en Chrome y Firefox las portadas /es/ y /en/, un artículo y /404.html; revisar pestañas en temas claro y oscuro. Comprobar en la pestaña de red que los iconos responden correctamente y no hay errores CSP; abrir los tres recursos directamente. La elección entre SVG e ICO depende del navegador: no se exige que descargue ambos. Revisar opcionalmente un marcador nuevo y el acceso guardado en un dispositivo Apple real.

Los navegadores mantienen cachés propias de favicons y la recarga normal puede no actualizar pestañas o marcadores. Ante un icono antiguo, probar primero con un perfil limpio o una sesión privada nueva. En futuras revisiones puede versionarse la URL declarada, sin cambiar la configuración de Cloudflare. No se han modificado cabeceras de caché.

## Incremento visual 1

El contenedor .article-table-scroll tiene width: 100% y contain: inline-size para que su tamaño horizontal dependa del padre y no de la anchura intrínseca de la tabla. overscroll-behavior-x: contain evita encadenar el gesto horizontal al alcanzar los extremos. No se oculta el overflow global. La estructura inspeccionada es body (flex en columna) > main.container > article.editorial-container.article-page > .article-body > .article-table-scroll > table. La necesidad de contain: inline-size no está demostrada en esta estructura; se conserva la versión validada manualmente. Su retirada requeriría repetir la comprobación visual.

Las tablas Markdown se envuelven durante la generación mediante el plugin local src/lib/markdown-tables.mjs del procesador Sätteri incluido en Astro. .article-table-scroll limita el desplazamiento horizontal y permite foco con teclado; table conserva su presentación nativa, una anchura mínima de 40rem y ajuste normal de palabras, sin heredar overflow-wrap: anywhere. Esto sustituye el anterior display: block y overflow sobre table. No se modifican datos, encabezados ni alineaciones históricas, ni se añaden dependencias o JavaScript cliente. A 320, 375 y 393px se prevé desplazamiento interior; a 768px dependerá del ancho intrínseco del contenido.

El titular confirmó que el desbordamiento persistía porque el servidor Astro seguía sirviendo Markdown sin el envoltorio tras cambiar astro.config.mjs. Reiniciar el servidor de desarrollo cargó la integración y resolvió el problema. Después de cambiar la configuración o el plugin Markdown, detener el servidor local de esta tarea y volver a ejecutar npm run dev; comprobar que el DOM contiene .article-table-scroll antes de diagnosticar el CSS. La validación manual comunicada fue satisfactoria en portada a 320 y 393px, modo oscuro a 320px, desplazamiento de tabla sin desplazar el documento y navegación de tabla mediante teclado. No se dispone de una medición manual comunicada a 375 y 768px.

Este incremento sustituye los espaciados principales fijos descritos anteriormente: .page-start, .article-page, .section-stack y el espacio inferior de main utilizan --page-space (3rem bajo 48rem; 5rem desde 48rem). .container utiliza --page-gutter (1rem bajo 48rem; 1.5rem desde 48rem). Se mantienen las anchuras máximas, la paleta y la tipografía principal. La 404 bilingüe utiliza .not-found-page para separar sus elementos internos con 1rem. Privacidad utiliza .privacy-content con margen superior de 2rem, sin cambiar el margen de los artículos. Los hr de .article-body tienen borde superior de 1px con --border y márgenes verticales de 2rem. H4 tiene margen inicial cero, tamaño 1.05rem, interlineado 1.35 y peso 650; conserva la separación editorial existente de 3rem. No cambia el espaciado de H2/H3 ni se añade JavaScript cliente.
