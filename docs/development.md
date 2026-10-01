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

El repositorio contiene documentación y `.gitignore`. No se ha inicializado Astro, instalado dependencias ni generado código de aplicación. Astro + TypeScript sigue en evaluación.

Las versiones de Node.js, el gestor de paquetes, los comandos de desarrollo y compilación, las herramientas de pruebas y el flujo automatizado de publicación están **por decidir**. Se documentarán cuando se seleccionen; por ahora no hay comandos de aplicación que ejecutar.

## Flujo previsto

1. Revisar `AGENTS.md` y la documentación antes de modificar el proyecto.
2. Acordar la tecnología y el alcance de la siguiente fase antes de inicializar la aplicación o instalar dependencias.
3. Realizar los cambios locales solicitados y mantener la documentación coherente con las decisiones aprobadas.
4. Revisar los cambios con Git y realizar las comprobaciones pertinentes a las herramientas que se hayan seleccionado.
5. Crear commits únicamente con autorización, siguiendo Conventional Commits, por ejemplo `docs: document initial project decisions`.
6. Hacer push o desplegar únicamente con autorización explícita.

Codex puede modificar los archivos locales cuando se le solicite. La autorización de trabajo local no autoriza push, despliegues ni cambios en infraestructura, DNS, dominios o servicios externos.

No se deben versionar credenciales ni secretos. `.gitignore` anticipa dependencias y salidas habituales de un posible proyecto Node.js/TypeScript/Astro, archivos de entorno y archivos locales de Windows/VS Code; no implica que estas herramientas ya estén seleccionadas o instaladas. Permite compartir configuraciones de VS Code si se incorporan de forma deliberada.
