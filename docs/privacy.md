# Privacidad por diseño

La privacidad es un requisito de arquitectura y mantenimiento. El proyecto debe atender RGPD, LOPDGDD y ePrivacy y la normativa aplicable. Este documento distingue hechos confirmados y verificaciones pendientes; no constituye una afirmación de cumplimiento legal absoluto.

## Configuración actual confirmada por el titular

- fernandoghg.com es una web personal para compartir proyectos, artículos y experiencias, sin actividad comercial ni servicios profesionales actualmente.
- El sitio está publicado en https://fernandoghg.com mediante Cloudflare Pages. Cloudflare presta DNS, proxy/CDN y seguridad. El dominio sigue registrado en IONOS. No se presupone un mecanismo concreto de despliegue desde GitHub.
- El responsable es Fernando García-Herrera Gómez. La identidad pública general conserva la grafía Fernando Garcia-Herrera Gomez.
- El correo está contratado con IONOS Correo Básico (Mail Basic). contacto@fernandoghg.com es el contacto general y se reenvía al buzón privacidad@fernandoghg.com, canal específico de privacidad y ejercicio de derechos. Ambas direcciones funcionan.
- Email Address Obfuscation de Cloudflare está desactivado y se ha comprobado que los enlaces mailto funcionan sin JavaScript. Esta confirmación del titular no equivale a una auditoría de todas las funciones de Cloudflare.
- No se utiliza analítica propia, publicidad, formularios ni seguimiento de visitantes. No se ha confirmado la ausencia absoluta de cookies técnicas de Cloudflare en todas las circunstancias.
- El sitio mantiene noindex. Su publicación no autoriza retirar esta directiva: hace falta autorización expresa.

## Principios que se mantienen

- No añadir cookies salvo necesidad futura expresamente justificada. No añadir banners por precaución sin determinar antes si hay mecanismos que requieran consentimiento.
- No usar localStorage para preferencias o seguimiento, fingerprinting ni identificadores persistentes de seguimiento en V1.
- No incorporar recogida adicional de datos personales sin necesidad expresamente aprobada. La entrega técnica de páginas y las comunicaciones por correo sí implican tratamiento de datos.
- No utilizar Google Analytics, Google Tag Manager, Cloudflare Web Analytics, píxeles publicitarios ni otro sistema de analítica o seguimiento. La posible analítica futura se evaluará separadamente.
- Preferir recursos autocontenidos y fuentes del sistema. No cargar fuentes externas, feeds, widgets ni publicaciones incrustadas. GitHub e Instagram son enlaces normales; al seguirlos se accede a servicios externos y a sus políticas.
- Minimizar datos, dependencias y servicios. Mantener HTTPS, redirección de HTTP a HTTPS y las cabeceras de seguridad, incluida la CSP sin scripts.
- La raíz / redirige estáticamente a /es/. No se utilizan cookies, localStorage, geolocalización ni tracking para seleccionar o recordar idioma. El modo de color sigue el sistema sin selector manual persistente.
- No publicar DNI, domicilio particular ni correo personal. No configurar servicios externos, DNS o correo en tareas locales sin autorización expresa.

## Finalidades, bases jurídicas y conservación

La revisión mantiene y concreta las bases ya contempladas en la política: interés legítimo en entregar y proteger la web y responder a consultas recibidas (artículo 6.1.f RGPD), y cumplimiento de obligaciones legales para tramitar derechos (artículo 6.1.c RGPD). No se incorpora consentimiento ficticio por navegar o enviar correo ni una base contractual comercial que no corresponde a la finalidad actual. Queda pendiente documentar la ponderación de necesidad, proporcionalidad e impacto para los tratamientos basados en interés legítimo; no se presenta como realizada.

Los correos generales se revisarán periódicamente y se eliminarán cuando estén resueltos y ya no sean necesarios, salvo obligación legal o causa justificada de conservación. Las solicitudes de derechos se gestionarán diferenciadamente, conservando lo necesario para acreditar su atención durante los plazos aplicables. No se fija un número de años sin identificar la obligación o justificación correspondiente. Quedan por concretar el procedimiento de revisión y borrado, los plazos aplicables a la evidencia de atención de derechos y el efecto de las copias de seguridad del servicio.

La política no atribuye un plazo único inventado a los registros técnicos de los proveedores. Deben identificarse los registros efectivos, finalidades, accesos y plazos o criterios de conservación antes de dar por cerrada la revisión de transparencia.

## Verificaciones contractuales y técnicas pendientes

Estos puntos no se dan por acreditados por la disponibilidad de documentación pública ni por el resultado de un build:

- Cloudflare: identificar la entidad contratada, condiciones aceptadas y versión del DPA contractualmente aplicable. No se ha verificado esa versión. Revisar el alcance de los tratamientos por cuenta del titular y los fines propios del proveedor, servicios activos y subencargados.
- IONOS: confirmar la entidad y condiciones del producto Mail Basic y el contrato de encargo aplicable. IONOS ofrece documentación sobre contratos de tratamiento, pero no se ha confirmado la aplicabilidad del contrato consultado a este producto.
- Ambos proveedores: comprobar ubicaciones de procesamiento y almacenamiento, posibles transferencias internacionales y el mecanismo o garantías efectivamente aplicables. No se han verificado ubicaciones concretas ni garantías específicas. No afirmar alojamiento exclusivamente europeo, adhesiones, cláusulas contractuales o decisiones de adecuación sin evidencia aplicable al servicio contratado.
- Cloudflare: inventariar registros, métricas operativas, funciones de seguridad y posibles cookies técnicas según las circunstancias, incluidos desafíos. La ausencia de Set-Cookie en una consulta no acredita ausencia de cookies en todos los escenarios.
- IONOS: verificar retención, eliminación y copias de mensajes y metadatos, y si existen otros destinatarios o reenvíos adicionales. Solo está confirmado el reenvío de contacto@ al buzón privacidad@.
- Completar con los resultados la información pública de destinatarios, transferencias y conservación que corresponda conforme al artículo 13 RGPD. Los enlaces a políticas de proveedores y la redacción prudente no sustituyen esta verificación ni acreditan cumplimiento completo.

Fuentes de referencia, sin presuponer su incorporación al contrato concreto:

- [RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=es), especialmente artículos 5, 6, 12, 13, 21, 28 y 44 y siguientes.
- [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673).
- [DPA público de Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/).
- [Información de IONOS sobre el contrato de tratamiento](https://www.ionos.es/ayuda/proteccion-de-datos/informacion-general-sobre-el-rgpd/contrato-de-tratamiento-de-datos/).

## Política ES/EN y aprobación pendiente

PrivacyContent.astro genera /es/privacidad/ y /en/privacy/ con contenido equivalente, ocho secciones, ambos correos y enlaces a Cloudflare, IONOS y AEPD. Los derechos se mantienen, incluida la oposición al interés legítimo y la reclamación ante la AEPD. Los enlaces no cargan automáticamente servicios externos.

La fecha editorial fija preparada es **17 de octubre de 2026 / 17 October 2026**, con datetime 2026-10-17, condicionada a la aprobación y publicación de estos cambios. No deriva de build, Git ni fecha del archivo. La revisión está preparada localmente: no está aprobada ni desplegada por el hecho de editar el componente. Si la aprobación o publicación exige otra fecha, deberá acordarse expresamente; no actualizarla automáticamente.

README.md, docs/development.md y AGENTS.md recogen el contexto confirmado. docs/architecture.md conserva referencias de una fase anterior al despliegue y al correo pendiente; no se modifica en esta actualización. Para el estado operativo actual debe consultarse este documento. Queda pendiente armonizar esas referencias cuando se autorice actualizar arquitectura.

## Valoración del aviso legal independiente

Con la finalidad personal confirmada y la ausencia actual de actividad comercial o servicios profesionales, no se identifica por ahora una necesidad acreditada de crear una página independiente de aviso legal por el artículo 10 LSSI. La definición de servicios de la sociedad de la información del anexo de la [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) vincula su alcance a una actividad económica, también cuando el destinatario no paga. Esta es una valoración limitada al contexto actual, no una exención general de otras obligaciones ni del RGPD/LOPDGDD.

No se crea esa página sin autorización. Reevaluar si se incorporan promoción comercial o profesional, servicios, publicidad, afiliación, ventas o monetización, incluida una eventual evolución de Aldarte. No publicar datos identificativos adicionales sin determinar antes la obligación aplicable.
