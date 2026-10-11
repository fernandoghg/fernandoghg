# Instrucciones para agentes

## Alcance y autorización

- Modifica archivos locales de este repositorio cuando el usuario lo solicite y dentro del alcance autorizado.
- La implementación visual, la infraestructura estática de artículos, los dos artículos históricos migrados de Blogger/Top Eleven y los textos de Inicio, Sobre mí, Privacidad y la presentación pública de Aldarte están incorporados y aprobados. El mantenimiento posterior se limita al alcance autorizado en cada tarea; no amplíes contenido ni implementes soluciones de la auditoría sin autorización.
- Realiza cambios pequeños, controlados y revisables. No introduzcas dependencias sin justificación y aprobación; no instales ni actualices dependencias sin autorización.
- No añadas frameworks de UI (React, Vue, Svelte u otros), Tailwind ni frameworks CSS. No añadas SSR ni configuración de despliegue o Cloudflare en esta fase.
- No hagas commit sin autorización explícita. No hagas push ni despliegues, ni modifiques infraestructura, DNS, dominios o servicios externos sin autorización explícita.
- No transfieras los dominios ni modifiques DNS en la fase actual. Están registrados en IONOS.
- Respeta los cambios del usuario y no incluyas archivos ajenos al trabajo solicitado. No modifiques contenidos, estilos o rutas fuera del alcance de cada tarea.

## Decisiones y arquitectura

- El sitio es personal y principalmente estático, asociado a fernandoghg.com y fernandoghg.es.
- El dominio canónico será https://fernandoghg.com. Conserva fernandoghg.es; posteriormente se redirigirán permanentemente fernandoghg.es, www.fernandoghg.com y www.fernandoghg.es al dominio canónico.
- Astro es el framework/generador seleccionado. Utiliza TypeScript cuando sea necesario para desarrollo y lógica, prioriza HTML5 semántico y genera contenido estático siempre que sea posible.
- No introduzcas backend, base de datos ni procesamiento dinámico en servidor salvo necesidad funcional futura expresamente justificada.
- El sitio es bilingüe español/inglés, con URLs /es/ y /en/. La raíz redirige estáticamente a /es/, sin cookies, localStorage, geolocalización ni tracking. Los artículos utilizan Markdown y Content Collections modernas de Astro: src/content.config.ts, glob y Zod 4 de astro/zod. translationKey relaciona traducciones explícitamente, sin exigirlas ni compartir slug. Canonical/hreflang multilingües están implementados para páginas equivalentes reales; MDX queda para una fase posterior. El sitemap se genera durante el build y excluye la raíz y la 404 bilingüe. Mantén noindex hasta que se autorice el lanzamiento.
- Marca como **por decidir** lo que no esté acordado y actualiza la documentación cuando el usuario tome decisiones.
- Minimiza dependencias y mantenimiento. Minimiza el JavaScript enviado al navegador y no lo incorpores cuando HTML/CSS sean suficientes.
- Mantén páginas ligeras: minimiza y optimiza CSS, JavaScript, imágenes, fuentes y demás recursos para reducir tamaño, transferencia y tiempos de carga. Evita recursos externos innecesarios y favorece buen rendimiento también en conexiones y dispositivos modestos.
- Trata accesibilidad, SEO, rendimiento y seguridad como requisitos del proyecto.
- Trata el coste de infraestructura como criterio de primer nivel; el objetivo inicial de alojamiento es próximo a 0 EUR/mes.
- Cloudflare Pages es el alojamiento seleccionado inicialmente. GitHub seguirá siendo el repositorio y sistema de control de versiones; su integración para despliegue será posterior. AWS S3 + CloudFront, AWS Amplify y GitHub Pages no están seleccionados inicialmente ni pendientes de elección.
- Todavía no existe cuenta/configuración de Cloudflare para este proyecto. No crees ni modifiques servicios externos en esta fase, ni DNS o configuración de IONOS. Blogger debe seguir funcionando mientras se desarrolla la nueva web.

## Privacidad y seguridad

- Aplica privacidad por diseño y considera RGPD/ePrivacy y normativa aplicable como requisitos de primer nivel. No afirmes cumplimiento legal absoluto sin evaluación fundamentada.
- No uses cookies salvo necesidad futura expresamente justificada.
- No uses localStorage para seguimiento ni preferencias en V1, ni fingerprinting o identificadores persistentes para seguimiento.
- No recopiles datos personales salvo necesidad futura expresamente aprobada. Considera también registros y datos tratados por proveedores de alojamiento.
- La primera versión se desarrollará sin analítica. No uses Google Analytics, Google Tag Manager, Cloudflare Web Analytics, píxeles publicitarios ni ningún otro sistema de seguimiento o analítica por ahora. La posible analítica futura respetuosa con la privacidad se evaluará separadamente.
- Evita recursos externos que permitan seguimiento de visitantes. Prefiere recursos autocontenidos y fuentes locales si se utilizan fuentes personalizadas.
- Exige HTTPS en producción y redirección de HTTP a HTTPS. Prefiere certificados TLS gratuitos con renovación automática siempre que sea posible.
- No guardes secretos, credenciales, datos personales privados ni información corporativa privada en el repositorio. La identidad pública expresamente aprobada es Fernando Garcia-Herrera Gomez; las políticas de privacidad aprobadas utilizan la grafía Fernando García-Herrera Gómez.

## Política de agentes de inteligencia artificial

- Bloquea los rastreadores destinados al entrenamiento de modelos de IA y los bots abusivos o maliciosos.
- Permite buscadores tradicionales, buscadores con IA y agentes que navegan por petición del usuario, siempre que sea posible distinguir sus finalidades.
- En casos de finalidades compartidas, prioriza evitar el entrenamiento, aceptando las limitaciones correspondientes para búsqueda o recuperación con IA.
- La decisión actual para Google-Extended es bloquearlo, aceptando las limitaciones para ciertos usos de Gemini/Vertex; no bloquees Googlebot por esta decisión.
- Las reglas aprobadas están implementadas en public/robots.txt: permite buscadores y agentes iniciados por usuarios, y solicita excluir GPTBot, ClaudeBot, Google-Extended y CCBot. robots.txt no impone control de acceso ni garantiza protección frente a bots abusivos. Los controles de Cloudflare siguen pendientes y requieren autorización expresa.

## Desarrollo

- Entorno previsto: Windows 11, VS Code y Codex; ruta local `C:\Desarrollo\fernandoghg`.
- Control de versiones con Git y GitHub; rama principal `main`.
- Repositorio remoto: `https://github.com/fernandoghg/fernandoghg.git`.
- Utiliza Conventional Commits cuando se autorice crear commits.
- No inventes herramientas, comandos de aplicación o comprobaciones aún no seleccionadas. Documenta los que se acuerden en `docs/development.md`.
- La base local utiliza npm y TypeScript estricto: `npm run check` comprueba tipos y archivos Astro; `npm run build` genera la salida estática en `dist/`.
- Guarda los perfiles de navegadores automatizados y sus artefactos temporales (capturas, sesiones, cachés, etc.) fuera del directorio del proyecto, en un directorio temporal exclusivo por ejecución, preferentemente bajo la carpeta temporal del usuario de Windows. No utilices `.astro/`, `src/`, `public/` ni otras carpetas del repositorio para perfiles de navegador.
- Al finalizar una tarea, resume los archivos modificados, las comprobaciones realizadas y las decisiones pendientes relevantes.

## Contenido, diseño y V1

- Sigue las decisiones detalladas en docs/architecture.md: Inicio / Home, Proyectos / Projects, Artículos / Articles y Sobre mí / About forman la navegación principal. Privacidad / Privacy ya existe en ambos idiomas y está enlazada desde el pie; su revisión final sigue pendiente antes de publicar.
- Mantén Proyectos independiente de Artículos. Crea categorías/etiquetas solo cuando el contenido las justifique; Tecnología, Juegos, Viajes y Simulación no serán elementos permanentes del menú inicial. RSS/Atom no es requisito de V1.
- La portada no será un blog cronológico tradicional y debe funcionar sin publicaciones frecuentes. No inventes contenido definitivo.
- Los dos artículos de Top Eleven seleccionados en arquitectura ya están migrados en español, con carácter histórico, fechas originales, imágenes locales y navegación de serie. Conserva las fotografías originales para evaluación posterior. No migres otros artículos sin autorización. Los temas técnicos antiguos son posibles inspiraciones para artículos nuevos revisados, no contenido pendiente de migración.
- Aldarte tiene una presentación pública aprobada en ES/EN, con fichas en Inicio y Proyectos y páginas individuales. Limítate a los datos públicos de src/data/projects.ts; no documentes información interna/confidencial ni presupongas que otras funcionalidades, tecnologías o detalles serán públicos.
- Conserva el diseño visual aprobado: sobriedad, legibilidad, espacio visual, pocos colores y azul apagado. Los tokens actuales, 68rem de ancho máximo, 65ch de lectura y breakpoint de 48rem están implementados. Evita efectos innecesarios, animaciones gratuitas, glassmorphism y degradados llamativos.
- Prioriza fuentes del sistema en V1; no cargues Google Fonts ni fuentes externas. Si se incorpora una fuente personalizada en el futuro, prefiere alojamiento local.
- Aplica responsive/mobile-first y accesibilidad desde el inicio: HTML5 semántico, encabezados correctos, teclado, foco visible, contraste, textos alternativos pertinentes, lang correcto y enlaces descriptivos. No dependas exclusivamente del color ni de hover. No afirmes cumplimiento formal de WCAG sin verificarlo.
- V1 podrá respetar prefers-color-scheme; no añadas inicialmente selector manual que necesite JavaScript, cookies o localStorage. Respeta prefers-reduced-motion cuando corresponda.
- Usa discretamente fernandoghg.com en la cabecera como identificador y enlace a la portada del idioma actual. El nombre público sigue siendo Fernando Garcia-Herrera Gomez; puede utilizarse Fernando informalmente. No conviertas el nombre completo en un gran logotipo permanente. Los enlaces públicos previstos son https://github.com/fernandoghg y https://www.instagram.com/fernandoghg/; usa enlaces normales, sin feeds, widgets, scripts ni publicaciones incrustadas.
- V1 no tendrá publicidad ni formulario de contacto. No expongas el correo personal. El único correo público aprobado es privacidad@fernandoghg.com para consultas de privacidad y ejercicio de derechos; está pendiente de configurar y verificar antes del despliegue conforme a docs/privacy.md. Sobre mí / About me ya contiene los textos aprobados; no los amplíes ni incorpores fotografías sin autorización.
- Antes de publicar, revisa privacidad, RGPD/ePrivacy, obligaciones legales, proveedor de alojamiento/CDN, logs, tratamiento técnico y necesidad de datos de contacto o información legal adicional; no afirmes cumplimiento absoluto.
- Mantén los cuatro enlaces principales visibles y directamente accesibles en móvil, sin menú hamburguesa ni JavaScript para navegación. Reorganízalos con CSS cuando sea necesario. El enlace de idioma será EN o ES, sin banderas: llevará a la traducción relacionada o, si no existe, a la portada del otro idioma.
- Sigue la estructura visual conceptual de arquitectura, sin convertir las páginas de proyecto en un esquema rígido. Prefiere listas editoriales para artículos, con agrupación por año en el listado y fechas históricas originales. Las imágenes de proyecto y la fotografía personal son opcionales; no crees una galería fotográfica por ahora.
- Intenta que la estructura básica de V1 funcione con cero JavaScript cliente. No lo añadas para menú móvil, selector automático de idioma, animaciones decorativas o modo oscuro automático. Una necesidad futura deberá justificarse por una mejora real de funcionalidad o experiencia.
- Realiza una implementación propia, sin copiar diseños, código, identidad visual ni textos de otros sitios.

## Artículos

- Sigue el modelo detallado en docs/architecture.md y docs/development.md. Usa src/content/articles/es/<slug>.md y en/<slug>.md; nombres ASCII en minúsculas, números y guiones, sin subdirectorios adicionales ni slug en frontmatter. El nombre es estable después de publicar.
- Guarda published y updated como strings ISO entre comillas. Conserva published original; updated solo corresponde a una actualización sustancial explícita, nunca a migración, build, Git o fecha del archivo. Cada traducción tiene su propia fecha de publicación.
- draft tiene valor por defecto true. Reutiliza getPublicArticles/getArticlePaths: solo draft === false y published <= día editorial de Europe/Madrid. No implementes publicación programada.
- Valida todos los artículos, incluidos drafts: carpeta/lang, IDs, translationKey + lang y series + lang + seriesPart. series y seriesPart se omiten juntos o aparecen juntos; no añadas total de partes.
- La única categoría inicial es juegos, con etiquetas Juegos/Games centralizadas. No añadas tags, autor por artículo, imagen destacada ni colecciones de categorías/series sin necesidad aprobada.
- Las pruebas de build deben retirar sus fixtures temporales y reconstruir dist al terminar.
