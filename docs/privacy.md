# Privacidad por diseño

La privacidad es un requisito de arquitectura desde el inicio. El proyecto debe atender RGPD/ePrivacy y la normativa aplicable durante su diseño y publicación. Este documento recoge principios y trabajo pendiente; no constituye una afirmación de cumplimiento legal absoluto.

## Principios actuales

- No usar cookies salvo necesidad futura expresamente justificada.
- No usar localStorage, fingerprinting ni identificadores persistentes para seguimiento.
- No recopilar datos personales salvo necesidad futura expresamente aprobada.
- No utilizar Google Analytics, Google Tag Manager ni píxeles publicitarios.
- Evitar recursos externos que permitan seguimiento de visitantes; preferir recursos autocontenidos y fuentes locales si se utilizan fuentes personalizadas.
- Minimizar datos, dependencias y servicios externos.
- Proteger las comunicaciones de producción con HTTPS y redirigir HTTP a HTTPS.

Estos principios también deben guiar la selección del alojamiento. Un sitio estático puede implicar tratamiento de direcciones IP y otros datos en registros del proveedor; no se debe asumir ausencia de tratamiento por el mero hecho de no incluir formularios o analítica.

## Evaluación pendiente antes de publicar

- Identificar los datos que trate la configuración efectiva, incluidos registros de acceso del alojamiento y servicios asociados.
- Revisar, según corresponda, finalidad, base jurídica, minimización, conservación, ubicación del tratamiento, encargados y posibles transferencias internacionales.
- Determinar la información de privacidad y demás obligaciones aplicables a la configuración final.
- Verificar el comportamiento real del sitio: cookies, almacenamiento del navegador, solicitudes externas y ausencia de mecanismos de seguimiento.

Si surge una necesidad de recoger datos personales, deberá obtenerse aprobación expresa antes de implementarla y documentarse su finalidad y tratamiento. Cualquier futura necesidad de cookies deberá justificarse expresamente y evaluarse conforme a la normativa aplicable antes de introducirlas.
