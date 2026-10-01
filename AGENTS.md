# Instrucciones para agentes

## Alcance y autorización

- Modifica archivos locales de este repositorio cuando el usuario lo solicite y dentro del alcance autorizado.
- En la fase inicial, crea y mantén únicamente documentación y `.gitignore`. No instales dependencias, inicialices Astro, ejecutes npm ni generes código de aplicación hasta recibir una solicitud que autorice esa fase.
- No hagas commit sin autorización explícita. No hagas push ni despliegues, ni modifiques infraestructura, DNS, dominios o servicios externos sin autorización explícita.
- No transfieras los dominios ni modifiques DNS en la fase actual. Están registrados en IONOS.
- Respeta los cambios del usuario y no incluyas archivos ajenos al trabajo solicitado.

## Decisiones y arquitectura

- El sitio es personal y principalmente estático, asociado a fernandoghg.com y fernandoghg.es.
- fernandoghg.com es el candidato a dominio canónico principal; se prevé conservar fernandoghg.es y redirigirlo al .com. Estas decisiones siguen pendientes de confirmación.
- Astro + TypeScript está en evaluación y no es una decisión irreversible. No lo presentes como tecnología seleccionada.
- Se prevé contenido principalmente en Markdown/MDX y en español e inglés. No presupongas que todo contenido tiene traducción.
- Marca como **por decidir** lo que no esté acordado y actualiza la documentación cuando el usuario tome decisiones.
- Minimiza dependencias y mantenimiento. Usa JavaScript únicamente cuando aporte funcionalidad real.
- Trata accesibilidad, SEO, rendimiento y seguridad como requisitos del proyecto.
- Trata el coste de infraestructura como criterio de primer nivel; el objetivo inicial de alojamiento es próximo a 0 EUR/mes.
- Evalúa AWS S3 + CloudFront, AWS Amplify, Cloudflare Pages y GitHub Pages antes de decidir alojamiento. No introduzcas servicios AWS simplemente porque estén disponibles.

## Privacidad y seguridad

- Aplica privacidad por diseño y considera RGPD/ePrivacy y normativa aplicable como requisitos de primer nivel. No afirmes cumplimiento legal absoluto sin evaluación fundamentada.
- No uses cookies salvo necesidad futura expresamente justificada.
- No uses localStorage, fingerprinting ni identificadores persistentes para seguimiento.
- No recopiles datos personales salvo necesidad futura expresamente aprobada. Considera también registros y datos tratados por proveedores de alojamiento.
- No uses Google Analytics, Google Tag Manager ni píxeles publicitarios.
- Evita recursos externos que permitan seguimiento de visitantes. Prefiere recursos autocontenidos y fuentes locales si se utilizan fuentes personalizadas.
- Exige HTTPS en producción y redirección de HTTP a HTTPS. Prefiere certificados TLS gratuitos con renovación automática siempre que sea posible.
- No guardes secretos, credenciales ni datos personales en el repositorio.

## Desarrollo

- Entorno previsto: Windows 11, VS Code y Codex; ruta local `C:\Desarrollo\fernandoghg`.
- Control de versiones con Git y GitHub; rama principal `main`.
- Repositorio remoto: `https://github.com/fernandoghg/fernandoghg.git`.
- Utiliza Conventional Commits cuando se autorice crear commits.
- No inventes herramientas, comandos de aplicación o comprobaciones aún no seleccionadas. Documenta los que se acuerden en `docs/development.md`.
- Al finalizar una tarea, resume los archivos modificados, las comprobaciones realizadas y las decisiones pendientes relevantes.
