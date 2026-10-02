# Desarrollo

## Entorno previsto

- Windows 11.
- VS Code y Codex.
- Repositorio local: `C:\Desarrollo\fernandoghg`.
- Git y GitHub para control de versiones.
- Repositorio remoto: `https://github.com/fernandoghg/fernandoghg.git`.
- Rama principal: `main`.
- Mensajes de commit con Conventional Commits.

## Fase de implementación local

La fase documental inicial ha terminado. Se ha autorizado inicializar una base mínima de Astro con TypeScript y npm en el repositorio actual, sin crear otro repositorio Git ni un subdirectorio de proyecto. Astro es el framework/generador seleccionado; TypeScript se utilizará cuando sea necesario para desarrollo y lógica.

Está autorizada la instalación de dependencias necesarias, la ejecución de comprobaciones y el build de producción. La base será estática, sin frameworks de UI, Tailwind, frameworks CSS, backend, base de datos, SSR ni analítica. No se desarrollará todavía el diseño completo ni contenido personal. Se preservan README.md, AGENTS.md, .gitignore, .gitattributes y docs/.

Entorno de inicio: Node.js v24.20.0, npm 11.19.0 y Git 2.55.0.windows.5. npm es el gestor de paquetes seleccionado. Las herramientas adicionales de pruebas y los detalles del flujo automatizado de publicación siguen **por decidir**; no se configura despliegue en esta fase.

## Comandos de la base mínima

- `npm ci`: instalar las dependencias reproducibles a partir de `package-lock.json`.
- `npm run dev`: iniciar el servidor local de desarrollo.
- `npm run check`: comprobar TypeScript y archivos `.astro` mediante `astro check`.
- `npm run build`: generar el sitio estático de producción en `dist/`.
- `npm run preview`: servir localmente el build para revisión, sin publicar.

Las dependencias directas de desarrollo son `astro`, `typescript` y `@astrojs/check`. TypeScript utiliza `astro/tsconfigs/strict`. La configuración declara `output: 'static'` y el dominio canónico, sin adaptadores ni integraciones. Las páginas `/`, `/es/` y `/en/` son provisionales, con `noindex`, sin JavaScript cliente, estilos, recursos externos ni redirecciones de idioma. El contenido, diseño y SEO multilingüe definitivo siguen **por decidir**.

`node_modules/`, `.astro/` y `dist/` son salidas locales ignoradas por Git. Se conserva el archivo de bloqueo de npm para instalaciones reproducibles. No se añaden herramientas de pruebas adicionales en esta fase.

Para desactivar la telemetría de la herramienta Astro en una sesión de PowerShell antes de ejecutar sus comandos: `$env:ASTRO_TELEMETRY_DISABLED='1'`. Esta variable afecta a la herramienta local; las páginas generadas no incluyen analítica.

Validación de la base: `npm run check` sin errores, advertencias ni sugerencias; `npm run build` genera tres páginas HTML estáticas en `dist/`, sin archivos JavaScript ni recursos externos. Versiones instaladas: Astro 7.3.5, TypeScript 6.0.3 y `@astrojs/check` 0.9.10. npm avisó de un script de instalación pendiente de aprobación para `esbuild`; las comprobaciones y el build funcionaron sin aprobarlo.

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
- Implementar en una fase posterior /es/ y /en/, relaciones entre traducciones, canonical y hreflang, sin asumir traducciones para todo el contenido ni una política automática de redirección por idioma.
- Mantener la primera versión sin analítica ni seguimiento conforme a [los principios de privacidad](privacy.md).

## Publicación futura

Cloudflare Pages es el alojamiento seleccionado inicialmente. Se prevé integrar posteriormente el repositorio GitHub para despliegue; todavía no existe cuenta/configuración de Cloudflare para este proyecto. Quedan pendientes los detalles del flujo de publicación y la configuración efectiva de HTTPS, certificados y redirecciones aprobadas en [arquitectura](architecture.md).

Blogger debe seguir funcionando durante el desarrollo. Los dominios permanecen registrados en IONOS y no se transferirán. Esta fase no autoriza cambios de DNS, configuración de IONOS o Cloudflare, ni ningún servicio externo.

No se deben versionar credenciales ni secretos. `.gitignore` excluye dependencias y salidas de Node.js/TypeScript/Astro, archivos de entorno y archivos locales de Windows/VS Code. Permite compartir configuraciones de VS Code si se incorporan de forma deliberada.
