# Instrucciones para agentes

## Alcance y autorización

- Modifica archivos locales de este repositorio cuando el usuario lo solicite y dentro del alcance autorizado.
- La fase documental inicial ha terminado. Está autorizada la implementación local de una base mínima de Astro con TypeScript y npm en este repositorio, incluida la instalación de dependencias necesarias y las comprobaciones y build. Mantén el alcance mínimo; no desarrolles todavía el diseño completo ni inventes contenido personal.
- No añadas frameworks de UI (React, Vue, Svelte u otros), Tailwind ni frameworks CSS. No añadas SSR ni configuración de despliegue o Cloudflare en esta fase.
- No hagas commit sin autorización explícita. No hagas push ni despliegues, ni modifiques infraestructura, DNS, dominios o servicios externos sin autorización explícita.
- No transfieras los dominios ni modifiques DNS en la fase actual. Están registrados en IONOS.
- Respeta los cambios del usuario y no incluyas archivos ajenos al trabajo solicitado.

## Decisiones y arquitectura

- El sitio es personal y principalmente estático, asociado a fernandoghg.com y fernandoghg.es.
- El dominio canónico será https://fernandoghg.com. Conserva fernandoghg.es; posteriormente se redirigirán permanentemente fernandoghg.es, www.fernandoghg.com y www.fernandoghg.es al dominio canónico.
- Astro es el framework/generador seleccionado. Utiliza TypeScript cuando sea necesario para desarrollo y lógica, prioriza HTML5 semántico y genera contenido estático siempre que sea posible.
- No introduzcas backend, base de datos ni procesamiento dinámico en servidor salvo necesidad funcional futura expresamente justificada.
- El sitio será bilingüe español/inglés, con URLs simétricas /es/ y /en/. Se prevé contenido principalmente en Markdown/MDX. No presupongas que todo contenido tiene traducción; permite relacionar versiones traducidas y contempla SEO multilingüe, canonical y hreflang. No inventes una política automática de detección o redirección por idioma.
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
- No uses localStorage, fingerprinting ni identificadores persistentes para seguimiento.
- No recopiles datos personales salvo necesidad futura expresamente aprobada. Considera también registros y datos tratados por proveedores de alojamiento.
- La primera versión se desarrollará sin analítica. No uses Google Analytics, Google Tag Manager, Cloudflare Web Analytics, píxeles publicitarios ni ningún otro sistema de seguimiento o analítica por ahora. La posible analítica futura respetuosa con la privacidad se evaluará separadamente.
- Evita recursos externos que permitan seguimiento de visitantes. Prefiere recursos autocontenidos y fuentes locales si se utilizan fuentes personalizadas.
- Exige HTTPS en producción y redirección de HTTP a HTTPS. Prefiere certificados TLS gratuitos con renovación automática siempre que sea posible.
- No guardes secretos, credenciales ni datos personales en el repositorio.

## Desarrollo

- Entorno previsto: Windows 11, VS Code y Codex; ruta local `C:\Desarrollo\fernandoghg`.
- Control de versiones con Git y GitHub; rama principal `main`.
- Repositorio remoto: `https://github.com/fernandoghg/fernandoghg.git`.
- Utiliza Conventional Commits cuando se autorice crear commits.
- No inventes herramientas, comandos de aplicación o comprobaciones aún no seleccionadas. Documenta los que se acuerden en `docs/development.md`.
- La base local utiliza npm y TypeScript estricto: `npm run check` comprueba tipos y archivos Astro; `npm run build` genera la salida estática en `dist/`.
- Al finalizar una tarea, resume los archivos modificados, las comprobaciones realizadas y las decisiones pendientes relevantes.
