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

La fase actual implementa infraestructura de artículos, comprobaciones y documentación, sin instalar dependencias ni migrar contenido real. La base es estática, sin frameworks UI, Tailwind, frameworks CSS, backend, base de datos, SSR ni analítica. No se configura despliegue ni se crean commits o push sin autorización.

Entorno de inicio: Node.js v24.20.0, npm 11.19.0 y Git 2.55.0.windows.5. npm es el gestor de paquetes seleccionado. Las pruebas de artículos utilizan node:test y assert incluidos en Node 24, sin dependencias adicionales. Los detalles del flujo automatizado de publicación siguen **por decidir**.

## Comandos de la base mínima

- `npm ci`: instalar las dependencias reproducibles a partir de `package-lock.json`.
- `npm run dev`: iniciar el servidor local de desarrollo.
- `npm run check`: comprobar TypeScript y archivos `.astro` mediante `astro check`.
- `npm run build`: generar el sitio estático de producción en `dist/`.
- `npm run preview`: servir localmente el build para revisión, sin publicar.
- `node --test tests/articles.test.mjs`: probar esquema, fechas, visibilidad, IDs, traducciones y series, sin build ni archivos temporales.
- `node --test tests/articles-build.test.mjs`: probar la integración de Content Collections y rutas con builds reales y fixtures temporales. No ejecutar junto a otro build/dev: modifica temporalmente archivos fixture propios, los elimina en finally y reconstruye dist. No sobrescribe contenido existente.

Las dependencias directas de desarrollo siguen siendo `astro`, `typescript` y `@astrojs/check`. TypeScript utiliza `astro/tsconfigs/strict`. La configuración declara `output: 'static'` y el dominio canónico, sin adaptadores ni integraciones. El diseño bilingüe tiene layout y CSS compartidos, modo claro/oscuro del sistema y redirección estática de / a /es/ mediante meta refresh. Se mantiene noindex, sin JavaScript cliente ni recursos externos automáticos. Los textos definitivos y el SEO multilingüe completo siguen **por decidir**.

`node_modules/`, `.astro/` y `dist/` son salidas locales ignoradas por Git. Se conserva el archivo de bloqueo de npm para instalaciones reproducibles, sin cambios de dependencias para artículos.

Para desactivar la telemetría de la herramienta Astro en una sesión de PowerShell antes de ejecutar sus comandos: `$env:ASTRO_TELEMETRY_DISABLED='1'`. Esta variable afecta a la herramienta local; las páginas generadas no incluyen analítica.

Versiones instaladas: Astro 7.3.5, TypeScript 6.0.3 y `@astrojs/check` 0.9.10. El sitio actual genera 11 páginas HTML estáticas mientras no haya artículos públicos, sin JavaScript cliente ni recursos externos automáticos. El aviso inicial de npm sobre el script de instalación de esbuild no requirió cambios para las comprobaciones y el build.

## Flujo de trabajo local

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

## Infraestructura de artículos

La colección articles se declara en src/content.config.ts con defineCollection, glob y el esquema de src/lib/article-model.ts, usando Zod 4 de astro/zod. Astro 7 procesa Markdown con Sätteri; no se instala remark/rehype ni MDX. Los archivos son src/content/articles/es/<slug>.md y en/<slug>.md. El ID incluye idioma y slug; no existe campo slug en frontmatter y no se admiten subcarpetas adicionales.

Metadatos obligatorios: title, description (una línea, máximo 300 caracteres), published, lang (es/en) y category. draft tiene defecto true. updated, translationKey, series y seriesPart son opcionales; se omiten, nunca se escriben vacíos/null. El esquema es estricto y rechaza campos desconocidos. series y seriesPart aparecen juntos; la parte es entera positiva. La única categoría inicial es juegos, con IDs y etiquetas Juegos/Games en src/data/article-categories.ts.

Guarda published/updated como strings ISO YYYY-MM-DD entre comillas. updated no puede ser anterior a published y solo corresponde a una actualización sustancial explícita. Nunca se calcula desde migración, Git, build o fecha del archivo. Cada traducción conserva su propia publicación. formatArticleDate usa es-ES/en-GB, formato largo y UTC para conservar el día.

src/lib/articles.ts consulta getCollection, valida todas las entradas y centraliza getPublicArticles/getArticlePaths. Solo se publican artículos con draft === false y published <= día editorial de Europe/Madrid. El día se fija al evaluar el módulo y puede inyectarse en las funciones para pruebas; currentArticleDate también admite un reloj explícito. Sin scheduler, un build no cambia cuando avanza el calendario: hay que reconstruirlo. En dev, reiniciar el servidor al cambiar de día para renovar la referencia.

La carpeta/lang y los nombres se comprueban en generateId al cargar. Antes de consultar artículos públicos o crear rutas, se comprueban IDs, translationKey + lang y series + lang + seriesPart sobre toda la colección, incluidos drafts y futuros. Las comprobaciones entre entradas se ejecutan durante el build mediante las consultas, no se presupone que astro check por sí solo las ejecute.

Las rutas finas src/pages/es/articulos/[slug].astro y src/pages/en/articles/[slug].astro comparten getArticlePaths y ArticlePage.astro. Usan render(entry) y ArticleLayout.astro con ancho de lectura y CSS existentes. El selector enlaza a una traducción pública con slug propio; si falta o no es pública, lleva a la portada del otro idioma. Las series se pueden ordenar por parte mediante selectSeriesArticles; no hay navegación anterior/siguiente ni total de partes.

Portada y listados comparten la consulta pública; los listados agrupan por año original. Las pruebas de integración crean fixtures propios, verifican exclusión de drafts/futuros y traducciones, rechazan duplicados y restauran el build. No se han migrado artículos de Top Eleven. Antes de ejecutar estas pruebas, cerrar el servidor dev; una interrupción forzada puede requerir retirar los archivos fixture-* temporales y repetir el build.

No hay autor por artículo, tags, imagen destacada, RSS, sitemap ni colecciones de categorías/series. Los borradores de un repositorio público son visibles en GitHub aunque no generen páginas. No guardar información confidencial en ellos. El posible JavaScript futuro deberá aportar una mejora real justificada; navegación, idioma y tema siguen sin JavaScript cliente.
