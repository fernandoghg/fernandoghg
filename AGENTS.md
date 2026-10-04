# Instrucciones para agentes

## Alcance y autorización

- Modifica archivos locales de este repositorio cuando el usuario lo solicite y dentro del alcance autorizado.
- La base mínima de Astro con TypeScript y npm ya está inicializada. La tarea actual autoriza únicamente actualizar README.md, AGENTS.md, docs/architecture.md, docs/development.md y docs/privacy.md. No modifiques código o configuración, no instales dependencias ni implementes páginas o contenido definitivo en esta tarea.
- No añadas frameworks de UI (React, Vue, Svelte u otros), Tailwind ni frameworks CSS. No añadas SSR ni configuración de despliegue o Cloudflare en esta fase.
- No hagas commit sin autorización explícita. No hagas push ni despliegues, ni modifiques infraestructura, DNS, dominios o servicios externos sin autorización explícita.
- No transfieras los dominios ni modifiques DNS en la fase actual. Están registrados en IONOS.
- Respeta los cambios del usuario y no incluyas archivos ajenos al trabajo solicitado.

## Decisiones y arquitectura

- El sitio es personal y principalmente estático, asociado a fernandoghg.com y fernandoghg.es.
- El dominio canónico será https://fernandoghg.com. Conserva fernandoghg.es; posteriormente se redirigirán permanentemente fernandoghg.es, www.fernandoghg.com y www.fernandoghg.es al dominio canónico.
- Astro es el framework/generador seleccionado. Utiliza TypeScript cuando sea necesario para desarrollo y lógica, prioriza HTML5 semántico y genera contenido estático siempre que sea posible.
- No introduzcas backend, base de datos ni procesamiento dinámico en servidor salvo necesidad funcional futura expresamente justificada.
- El sitio será bilingüe español/inglés, con URLs simétricas /es/ y /en/. Se prevé contenido principalmente en Markdown/MDX. No presupongas que todo contenido tiene traducción; permite relacionar versiones traducidas y contempla SEO multilingüe, canonical y hreflang. La raíz / redirigirá a /es/, sin cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. Las traducciones deberán relacionarse explícitamente; su modelo técnico sigue por decidir.
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
- No guardes secretos, credenciales ni datos personales privados en el repositorio. La identidad pública expresamente aprobada es Fernando Garcia-Herrera Gomez.

## Desarrollo

- Entorno previsto: Windows 11, VS Code y Codex; ruta local `C:\Desarrollo\fernandoghg`.
- Control de versiones con Git y GitHub; rama principal `main`.
- Repositorio remoto: `https://github.com/fernandoghg/fernandoghg.git`.
- Utiliza Conventional Commits cuando se autorice crear commits.
- No inventes herramientas, comandos de aplicación o comprobaciones aún no seleccionadas. Documenta los que se acuerden en `docs/development.md`.
- La base local utiliza npm y TypeScript estricto: `npm run check` comprueba tipos y archivos Astro; `npm run build` genera la salida estática en `dist/`.
- Al finalizar una tarea, resume los archivos modificados, las comprobaciones realizadas y las decisiones pendientes relevantes.

## Contenido, diseño y V1

- Sigue las decisiones detalladas en docs/architecture.md: Inicio / Home, Proyectos / Projects, Artículos / Articles y Sobre mí / About forman la navegación principal. Privacidad debe existir antes de publicar.
- Mantén Proyectos independiente de Artículos. Crea categorías/etiquetas solo cuando el contenido las justifique; Tecnología, Juegos, Viajes y Simulación no serán elementos permanentes del menú inicial. RSS/Atom no es requisito de V1.
- La portada no será un blog cronológico tradicional y debe funcionar sin publicaciones frecuentes. No inventes contenido definitivo.
- Migra únicamente los dos artículos de Top Eleven seleccionados en arquitectura, conservando carácter histórico y fecha original. Conserva las fotografías originales para evaluación posterior. Los temas técnicos antiguos son posibles inspiraciones para artículos nuevos revisados, no contenido pendiente de migración.
- Aldarte es solo un candidato futuro: no documentes información interna/confidencial ni presupongas qué información será pública.
- Diseña con sobriedad, legibilidad, espacio visual, pocos colores y un único acento inicialmente azul apagado, sin fijar aún valores CSS. Evita efectos innecesarios, animaciones gratuitas, glassmorphism y degradados llamativos.
- Prioriza fuentes del sistema en V1; no cargues Google Fonts ni fuentes externas. Si se incorpora una fuente personalizada en el futuro, prefiere alojamiento local.
- Aplica responsive/mobile-first y accesibilidad desde el inicio: HTML5 semántico, encabezados correctos, teclado, foco visible, contraste, textos alternativos pertinentes, lang correcto y enlaces descriptivos. No dependas exclusivamente del color ni de hover. No afirmes cumplimiento formal de WCAG sin verificarlo.
- V1 podrá respetar prefers-color-scheme; no añadas inicialmente selector manual que necesite JavaScript, cookies o localStorage. Respeta prefers-reduced-motion cuando corresponda.
- Presenta discretamente Fernando Garcia-Herrera Gomez. Los enlaces públicos previstos son https://github.com/fernandoghg y https://www.instagram.com/fernandoghg/; usa enlaces normales, sin feeds, widgets, scripts ni publicaciones incrustadas.
- V1 no tendrá publicidad, correo público ni formulario de contacto. No expongas el correo personal. La fotografía puede mencionarse como interés sin redactar aún Sobre mí.
- Antes de publicar, revisa privacidad, RGPD/ePrivacy, obligaciones legales, proveedor de alojamiento/CDN, logs, tratamiento técnico y necesidad de datos de contacto o información legal adicional; no afirmes cumplimiento absoluto.