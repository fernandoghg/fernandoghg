# Privacidad por diseño

La privacidad es un requisito de arquitectura desde el inicio. El proyecto debe atender RGPD/ePrivacy y la normativa aplicable durante su diseño y publicación. Este documento recoge principios y trabajo pendiente; no constituye una afirmación de cumplimiento legal absoluto.

## Principios actuales

- No usar cookies salvo necesidad futura expresamente justificada.
- No usar localStorage para seguimiento ni preferencias en V1, ni fingerprinting o identificadores persistentes para seguimiento.
- No recopilar datos personales salvo necesidad futura expresamente aprobada.
- La primera versión se desarrollará sin sistema de analítica. No utilizar Google Analytics, Google Tag Manager, Cloudflare Web Analytics, píxeles publicitarios ni ningún otro sistema de seguimiento o analítica por ahora.
- Evitar recursos externos que permitan seguimiento de visitantes; preferir recursos autocontenidos y fuentes del sistema en V1. No cargar Google Fonts ni otras fuentes externas. Si se utiliza una fuente personalizada en el futuro, preferir alojamiento local.
- Minimizar datos, dependencias y servicios externos.
- Proteger las comunicaciones de producción con HTTPS y redirigir HTTP a HTTPS.

Estos principios también deben guiar la configuración futura de Cloudflare Pages, el alojamiento seleccionado inicialmente, y su integración con GitHub. Todavía no existe cuenta/configuración de Cloudflare para este proyecto y esta fase no autoriza crear ni modificar servicios externos. Un sitio estático puede implicar tratamiento de direcciones IP y otros datos en registros del proveedor; no se debe asumir ausencia de tratamiento por el mero hecho de no incluir formularios o analítica.

## Evaluación pendiente antes de publicar

- Identificar los datos que trate la configuración efectiva, incluidos registros de acceso del alojamiento y servicios asociados.
- Revisar, según corresponda, finalidad, base jurídica, minimización, conservación, ubicación del tratamiento, encargados y posibles transferencias internacionales.
- Determinar la información de privacidad y demás obligaciones aplicables a la configuración final.
- Verificar el comportamiento real del sitio: cookies, almacenamiento del navegador, solicitudes externas y ausencia de mecanismos de seguimiento.

Si surge una necesidad de recoger datos personales, deberá obtenerse aprobación expresa antes de implementarla y documentarse su finalidad y tratamiento. Cualquier futura necesidad de cookies deberá justificarse expresamente y evaluarse conforme a la normativa aplicable antes de introducirlas.

La posibilidad de incorporar analítica respetuosa con la privacidad se evaluará separadamente en el futuro; no está aprobada para la primera versión.

## Idioma, preferencias y enlaces públicos

La raíz / redirigirá a /es/, con /es/ y /en/ como raíces de idioma. No se utilizarán cookies, localStorage, geolocalización ni tracking para seleccionar o recordar el idioma. V1 podrá seguir la preferencia del sistema mediante prefers-color-scheme, sin selector manual inicial que necesite JavaScript, cookies o localStorage. Se respetará prefers-reduced-motion cuando corresponda.

V1 no tendrá publicidad ni tracking. Los enlaces a [GitHub](https://github.com/fernandoghg) e [Instagram](https://www.instagram.com/fernandoghg/) serán enlaces web normales, sin feeds, widgets, scripts ni publicaciones incrustadas. Al seguirlos, el visitante accederá al servicio externo y a sus condiciones de privacidad.

La identidad pública aprobada es Fernando Garcia-Herrera Gomez. No se publicará dirección de correo electrónico ni se expondrá el correo personal; no habrá formulario de contacto. Si surge una necesidad futura, podrá evaluarse una dirección específica bajo fernandoghg.com.

## Revisión final y página pública de privacidad

Antes de publicar deberá existir una página de privacidad adaptada al funcionamiento real del sitio. Este documento interno no sustituye esa página ni la revisión final de privacidad, RGPD/ePrivacy y obligaciones legales aplicables.

La revisión incluirá la información del proveedor de alojamiento/CDN, logs y tratamiento técnico inevitable, así como la necesidad real de datos de contacto o información legal adicional. Se evaluarán estos puntos junto con los ya enumerados arriba, sin afirmar cumplimiento legal absoluto antes de la evaluación fundamentada. El alojamiento está seleccionado, pero su configuración efectiva aún no permite dar por verificados estos aspectos.