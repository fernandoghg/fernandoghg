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

La base incluye infraestructura de artículos, comprobaciones, documentación y los dos artículos históricos reales migrados, «Mi experiencia con Top Eleven» y «Mi experiencia con Top Eleven (1 mes más tarde)», publicados en español dentro del modelo de contenidos. Sus imágenes originales están almacenadas junto a los artículos y Astro genera las versiones optimizadas durante el build. Incluye también la presentación pública aprobada de Aldarte en español e inglés. Con ambos artículos públicos y las dos páginas individuales de Aldarte, el build genera 15 páginas HTML. La base es estática, sin frameworks UI, Tailwind, frameworks CSS, backend, base de datos, SSR ni analítica. No se instalan dependencias, se configura despliegue ni se crean commits o push sin autorización.

Entorno de inicio: Node.js v24.20.0, npm 11.19.0 y Git 2.55.0.windows.5. npm es el gestor de paquetes seleccionado. Las pruebas de artículos utilizan node:test y assert incluidos en Node 24, sin dependencias adicionales. Los detalles del flujo automatizado de publicación siguen **por decidir**.

## Comandos de la base mínima

- `npm ci`: instalar las dependencias reproducibles a partir de `package-lock.json`.
- `npm run dev`: iniciar el servidor local de desarrollo.
- `npm run check`: comprobar TypeScript y archivos `.astro` mediante `astro check`.
- `npm run build`: generar el sitio estático de producción en `dist/`.
- `npm run preview`: servir localmente el build para revisión, sin publicar.
- `node --test tests/articles.test.mjs`: probar esquema, fechas, visibilidad, IDs, traducciones y series, sin build ni archivos temporales.
- `node --test tests/articles-build.test.mjs`: probar la integración de Content Collections y rutas con builds reales y fixtures temporales, además de rutas, fichas, jerarquía y cambio de idioma de Aldarte. No ejecutar junto a otro build/dev: modifica temporalmente archivos fixture propios, los elimina en finally y reconstruye dist. No sobrescribe contenido existente.

Las dependencias directas de desarrollo siguen siendo `astro`, `typescript` y `@astrojs/check`. TypeScript utiliza `astro/tsconfigs/strict`. La configuración declara `output: 'static'` y el dominio canónico, sin adaptadores ni integraciones. El diseño bilingüe tiene layout y CSS compartidos, modo claro/oscuro del sistema y redirección estática de / a /es/ mediante meta refresh. Se mantiene noindex, sin JavaScript cliente ni recursos externos automáticos. Los textos definitivos y el SEO multilingüe completo siguen **por decidir**.

`node_modules/`, `.astro/` y `dist/` son salidas locales ignoradas por Git. Se conserva el archivo de bloqueo de npm para instalaciones reproducibles, sin cambios de dependencias para artículos.

Para desactivar la telemetría de la herramienta Astro en una sesión de PowerShell antes de ejecutar sus comandos: `$env:ASTRO_TELEMETRY_DISABLED='1'`. Esta variable afecta a la herramienta local; las páginas generadas no incluyen analítica.

Versiones instaladas: Astro 7.3.5, TypeScript 6.0.3 y `@astrojs/check` 0.9.10. El sitio actual genera 15 páginas HTML estáticas con los dos artículos públicos y las páginas ES/EN de Aldarte, sin JavaScript cliente ni recursos externos automáticos. El aviso inicial de npm sobre el script de instalación de esbuild no requirió cambios para las comprobaciones y el build.

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
- Mantener /es/ y /en/ y la redirección estática de / a /es/, sin cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. Las traducciones de artículos están relacionadas por translationKey; canonical y hreflang multilingües quedan para una fase posterior.
- Mantener la primera versión sin analítica ni seguimiento conforme a [los principios de privacidad](privacy.md).

## Publicación futura

Cloudflare Pages es el alojamiento seleccionado inicialmente. Se prevé integrar posteriormente el repositorio GitHub para despliegue; todavía no existe cuenta/configuración de Cloudflare para este proyecto. Quedan pendientes los detalles del flujo de publicación y la configuración efectiva de HTTPS, certificados y redirecciones aprobadas en [arquitectura](architecture.md).

Blogger debe seguir funcionando durante el desarrollo. Los dominios permanecen registrados en IONOS y no se transferirán. Esta fase no autoriza cambios de DNS, configuración de IONOS o Cloudflare, ni ningún servicio externo.

No se deben versionar credenciales ni secretos. `.gitignore` excluye dependencias y salidas de Node.js/TypeScript/Astro, archivos de entorno y archivos locales de Windows/VS Code. Permite compartir configuraciones de VS Code si se incorporan de forma deliberada.

## Aplicación posterior de las decisiones de V1

Las decisiones de navegación, selección histórica de Blogger, identidad y diseño se recogen en [arquitectura](architecture.md). Documentarlas no implementa las páginas ni autoriza redactar contenido definitivo.

La implementación utiliza fuentes del sistema, recursos autocontenidos, cero JavaScript cliente y diseño responsive/mobile-first. No se incorporarán frameworks UI, Tailwind ni frameworks CSS sin una decisión futura justificada, ni backend, base de datos o SSR sin requisito futuro explícito. Privacidad, rendimiento, accesibilidad, seguridad, coste y mantenibilidad son criterios de primer nivel.

La accesibilidad se revisará desde el diseño: semántica HTML5, encabezados, teclado, foco visible, contraste, alternativas textuales, lang, enlaces descriptivos y ausencia de funciones dependientes solo de color o hover. Se respetará prefers-reduced-motion cuando corresponda. No se afirmará cumplimiento formal de WCAG sin verificación.

V1 podrá seguir prefers-color-scheme; no se añadirá inicialmente un selector manual que necesite JavaScript, cookies o localStorage. No se cargarán fuentes externas ni feeds, widgets, scripts o publicaciones de redes sociales. No habrá correo público ni formulario de contacto.

Para una actualización exclusivamente documental, revisar el diff, ejecutar git diff --check, git diff --stat y git status, y resumir archivos modificados, contradicciones resueltas y decisiones realmente pendientes. No es necesario instalar dependencias ni ejecutar comprobaciones de Astro o build para estos cambios. No hacer git add, commit ni push sin autorización.

## Presentación pública de proyectos

src/data/projects.ts contiene únicamente los datos públicos aprobados de Aldarte, localizados en ES/EN: nombre, estado, descripción breve, subtítulo, dos párrafos, nota final y rutas. Las rutas se forman a partir de navigation y el segmento estable aldarte. No hay Content Collection de proyectos, validadores adicionales ni campos para funcionalidades, tecnologías, fechas o información interna.

ProjectCard.astro comparte la ficha de Inicio (h3) y Proyectos (h2), como fila editorial con nombre enlazado, descripción y estado secundario, sin enlaces redundantes. Home.astro conserva los textos aprobados y los artículos recientes automáticos. src/pages/[lang]/[page].astro muestra contenido real solo en la rama de Proyectos; Artículos, Sobre mí y Privacidad mantienen su funcionamiento anterior.

AldartePage.astro comparte una única estructura entre src/pages/es/proyectos/aldarte.astro y src/pages/en/projects/aldarte.astro. Reutiliza BaseLayout con page="projects", descripción breve como meta description y languageHref hacia la otra página de Aldarte. El contenido visible se limita a estado, H1, subtítulo, dos párrafos, nota y regreso a Proyectos. Se mantiene noindex, sin imágenes, logotipos, enlaces externos a Aldarte, nuevas dependencias ni JavaScript cliente.

Todas las páginas comparten .editorial-container de 56rem y el mismo eje izquierdo para H1 y cuerpo. Se elimina .reading-container. Las páginas individuales de artículos y Aldarte utilizan todo el ancho editorial también en subtítulos, metadatos y párrafos, sin límites interiores de 65ch u 80ch. .project-page delimita el ajuste de .lead de Aldarte; .article-page delimita el de artículos. ArticleLayout conserva su estructura. No se justifican textos ni se estiran imágenes pequeñas; se mantienen max-width: 100%, height: auto y el desplazamiento interior de tablas y código. Las demás páginas conservan sus límites de lectura y presentación; la introducción de Inicio sigue aprovechando todo el ancho editorial. Cabecera y pie mantienen 68rem.

.editorial-row comparte separadores, espaciado, enlaces y adaptación responsive entre Artículos y ProjectCard (h3 en Inicio, h2 en Proyectos). En escritorio, Artículos utiliza fecha de 4.5rem, título flexible y categoría; Proyectos utiliza nombre y descripción flexibles con estado secundario a la derecha. En móvil se apilan sin columnas vacías. .page-start conserva 80px superiores; .page-content 32px entre encabezado y contenido; .section-stack 80px entre secciones de Inicio y .prose-stack 24px entre párrafos. Se mantienen tokens, breakpoint de 48rem y scrollbar-gutter: stable para evitar desplazamientos entre páginas cortas y largas. Textos y metadatos existentes permanecen sin cambios, incluida la descripción provisional de Proyectos. Su revisión y el SEO multilingüe completo siguen pendientes.

La prueba de integración verifica las dos rutas nuevas, enlaces desde Inicio y Proyectos, cambio de idioma, sección activa, regreso al listado, jerarquía de encabezados y retirada de la ficha ficticia. La comprobación de recursos generados sigue rechazando JavaScript cliente y recursos externos automáticos en todo dist. Al finalizar, elimina sus fixtures, reconstruye dist y comprueba 15 páginas HTML.

## Infraestructura de artículos

La colección articles se declara en src/content.config.ts con defineCollection, glob y el esquema de src/lib/article-model.ts, usando Zod 4 de astro/zod. Astro 7 procesa Markdown con Sätteri; no se instala remark/rehype ni MDX. Los archivos son src/content/articles/es/<slug>.md y en/<slug>.md. El ID incluye idioma y slug; no existe campo slug en frontmatter y no se admiten subcarpetas adicionales.

Metadatos obligatorios: title, description (una línea, máximo 300 caracteres), published, lang (es/en) y category. draft tiene defecto true. updated, translationKey, series y seriesPart son opcionales; se omiten, nunca se escriben vacíos/null. El esquema es estricto y rechaza campos desconocidos. series y seriesPart aparecen juntos; la parte es entera positiva. La única categoría inicial es juegos, con IDs y etiquetas Juegos/Games en src/data/article-categories.ts.

Guarda published/updated como strings ISO YYYY-MM-DD entre comillas. updated no puede ser anterior a published y solo corresponde a una actualización sustancial explícita. Nunca se calcula desde migración, Git, build o fecha del archivo. Cada traducción conserva su propia publicación. formatArticleDate mantiene el formato largo es-ES/en-GB en artículos individuales. formatArticleListDate muestra día y mes abreviado: ES (8 oct., 7 sept.) con abreviaturas editoriales explícitas para evitar variaciones de ICU; EN (Oct 8, Sep 7) con en-US. Ambas funciones usan UTC para conservar el día; el año completo permanece en el encabezado del grupo del listado.

src/lib/articles.ts consulta getCollection, valida todas las entradas y centraliza getPublicArticles/getArticlePaths. Solo se publican artículos con draft === false y published <= día editorial de Europe/Madrid. El día se fija al evaluar el módulo y puede inyectarse en las funciones para pruebas; currentArticleDate también admite un reloj explícito. Sin scheduler, un build no cambia cuando avanza el calendario: hay que reconstruirlo. En dev, reiniciar el servidor al cambiar de día para renovar la referencia.

La carpeta/lang y los nombres se comprueban en generateId al cargar. Antes de consultar artículos públicos o crear rutas, se comprueban IDs, translationKey + lang y series + lang + seriesPart sobre toda la colección, incluidos drafts y futuros. Las comprobaciones entre entradas se ejecutan durante el build mediante las consultas, no se presupone que astro check por sí solo las ejecute.

Las rutas finas src/pages/es/articulos/[slug].astro y src/pages/en/articles/[slug].astro comparten getArticlePaths y ArticlePage.astro. Usan render(entry) y ArticleLayout.astro con ancho de lectura y CSS existentes. El selector enlaza a una traducción pública con slug propio; si falta o no es pública, lleva a la portada del otro idioma. selectSeriesNeighbors reutiliza selectSeriesArticles para obtener las entregas anterior y siguiente disponibles, sin exigir partes consecutivas. getArticlePaths usa la misma fecha editorial de publicación y pasa solo título y URL de los vecinos al layout. La navegación estática se omite si no hay vecinos; no hay total de partes.

Portada y listados comparten la consulta pública; los listados agrupan por año original. Las pruebas de integración crean fixtures propios, verifican exclusión de drafts/futuros y traducciones, rechazan duplicados y restauran el build. Antes de ejecutar estas pruebas, comprobar que no hay dev/build activos y no cerrar procesos ajenos sin autorización; una interrupción forzada puede requerir retirar los archivos fixture-* temporales y repetir el build.

No hay autor por artículo, tags, imagen destacada, RSS, sitemap ni colecciones de categorías/series. Los borradores de un repositorio público son visibles en GitHub aunque no generen páginas. No guardar información confidencial en ellos. El posible JavaScript futuro deberá aportar una mejora real justificada; navegación, idioma y tema siguen sin JavaScript cliente.

## Imágenes editoriales y archivos descargables

- Las imágenes editoriales se almacenan junto al contenido dentro de `src/content/articles/`, en una carpeta con el slug del artículo junto a su Markdown, para que Astro pueda procesarlas y optimizarlas. Utilizar nombres descriptivos, cortos, en minúsculas y sin espacios.
- Los originales no deben modificarse innecesariamente; Astro genera los recursos optimizados durante el build.
- `public/downloads/` queda reservado para archivos que deban ofrecerse directamente para descarga sin transformación, como PDF, ZIP, XML, JSON, CSV u otros recursos estáticos. No crear subdirectorios de downloads hasta que exista contenido real que los necesite.
- Antes de publicar archivos descargables, comprobar que no contienen secretos, credenciales, datos personales, datos sanitarios ni información privada o corporativa.
- No incorporar recursos externos cuando podamos servirlos localmente.
