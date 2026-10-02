# Desarrollo

## Entorno previsto

- Windows 11.
- VS Code y Codex.
- Repositorio local: `C:\Desarrollo\fernandoghg`.
- Git y GitHub para control de versiones.
- Repositorio remoto: `https://github.com/fernandoghg/fernandoghg.git`.
- Rama principal: `main`.
- Mensajes de commit con Conventional Commits.

## Estado inicial

El repositorio permanece en fase de documentación. No se ha inicializado Astro, instalado dependencias ni generado código de aplicación. Astro es el framework/generador seleccionado; TypeScript se utilizará cuando sea necesario para desarrollo y lógica.

La selección de tecnología no autoriza su inicialización: durante esta tarea solo se modifican documentación y, si es necesario, `AGENTS.md`. Se mantiene la prohibición de inicializar Astro, instalar dependencias, ejecutar npm o generar código de aplicación hasta una tarea posterior expresamente autorizada.

Las versiones de Node.js, el gestor de paquetes, los comandos de desarrollo y compilación, las herramientas de pruebas y el flujo automatizado de publicación están **por decidir**. Se documentarán cuando se seleccionen; por ahora no hay comandos de aplicación que ejecutar.

## Flujo previsto

1. Revisar `AGENTS.md` y la documentación antes de modificar el proyecto.
2. Obtener autorización expresa para la siguiente fase antes de inicializar Astro o instalar dependencias, y acordar las herramientas aún pendientes.
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

No se deben versionar credenciales ni secretos. `.gitignore` anticipa dependencias y salidas habituales de Node.js/TypeScript/Astro, archivos de entorno y archivos locales de Windows/VS Code; no implica que las herramientas estén instaladas ni que Node.js o el gestor de paquetes estén seleccionados. Permite compartir configuraciones de VS Code si se incorporan de forma deliberada.
