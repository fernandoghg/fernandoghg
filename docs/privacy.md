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

### Configuración de Cloudflare observada en la cuenta

Según la revisión del panel comunicada por el titular:

- El sitio utiliza Cloudflare Pages y el dominio se administra en Cloudflare con el plan Free; el registro del dominio permanece en IONOS.
- Cloudflare Web Analytics no está configurado.
- Bot Fight Mode, AI Labyrinth, Continuous Script Monitoring y Email Address Obfuscation están desactivados.
- Browser Integrity Check, Cloudflare Managed Ruleset, HTTP DDoS Protection y Replace Insecure JavaScript Libraries están activados.
- El panel muestra estadísticas técnicas de tráfico y seguridad, independientes del servicio Cloudflare Web Analytics. El periodo consultable de esas estadísticas no acredita la conservación interna de todos los registros o datos personales del proveedor.
- En una prueba con Chrome en modo incógnito no se observaron cookies de fernandoghg.com. El resultado corresponde a esa prueba y no acredita su ausencia en todos los escenarios, especialmente ante desafíos de seguridad.

Estos hechos proceden de la revisión de la cuenta comunicada por el titular; no se deducen del código del repositorio ni acreditan todas las operaciones internas de Cloudflare.

### Documentación pública de Cloudflare revisada

El [DPA público de Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/), versión 6.4, efectiva desde el 3 de abril de 2026, contempla tratamientos por cuenta del cliente y acuerdos de autoservicio. Las [condiciones públicas de autoservicio](https://www.cloudflare.com/terms/), en su apartado 6.1, incorporan el DPA por referencia para los tratamientos comprendidos en su ámbito.

Esta información describe la documentación publicada por el proveedor. No acredita por sí sola las condiciones ni la versión contractualmente aplicables a esta cuenta. Permanecen pendientes las verificaciones contractuales, de conservación técnica y de transferencias indicadas más abajo. El criterio operativo del correo y su justificación inicial se documentan a continuación, sin declarar completada la revisión jurídica.

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

La revisión mantiene y concreta las bases ya contempladas en la política: interés legítimo en entregar y proteger la web y responder a consultas recibidas (artículo 6.1.f RGPD), y cumplimiento de obligaciones legales para tramitar derechos (artículo 6.1.c RGPD). No se incorpora consentimiento ficticio por navegar o enviar correo ni una base contractual comercial que no corresponde a la finalidad actual.

Para las consultas, el interés es responder a comunicaciones iniciadas voluntariamente por quien escribe. Utilizar la dirección de respuesta y el contenido pertinente del mensaje es necesario para atender esa comunicación, una finalidad razonablemente esperable en este contexto. Se limita el uso a los datos necesarios para gestionar y responder la consulta, sin publicidad, perfilado ni cesiones comerciales; se pide evitar información innecesaria y se eliminan los mensajes cuando dejan de ser necesarios. Estas limitaciones reducen el impacto sobre quien escribe, que conserva sus derechos, incluida la oposición. Esta es una justificación inicial y proporcionada, no una declaración de revisión jurídica completa. Deben reconsiderarse la base jurídica y la información pública si cambian las finalidades o el uso de los datos. La evaluación del interés legítimo del tratamiento técnico de la web permanece pendiente.

### Criterio operativo del correo confirmado por el propietario

IONOS Mail Basic se utiliza para recibir consultas y responderlas. El propietario confirma que revisará habitualmente el buzón y eliminará los mensajes cuando la consulta esté resuelta y ya no sean necesarios, salvo obligación legal o causa justificada de conservación. No se fija un plazo uniforme de conservación ni una frecuencia de revisión no acordada.

Las solicitudes de derechos se identificarán y gestionarán diferenciadamente, aunque compartan buzón con las consultas generales, conforme a los plazos legales aplicables. Se conservará únicamente la información necesaria para acreditar su atención durante el tiempo que corresponda a esa finalidad. El propietario asume esta operativa; no se atribuye al proveedor una eliminación automática ni inmediata de todas las copias.

Quedan pendientes de concretar los plazos o criterios aplicables a la evidencia de atención de derechos y de verificar la conservación técnica, la eliminación y el efecto de las copias de seguridad del servicio. El criterio operativo no resuelve las verificaciones contractuales o de transferencias de Cloudflare e IONOS.

La política no atribuye un plazo único inventado a los registros técnicos de los proveedores. Deben identificarse los registros efectivos, finalidades, accesos y plazos o criterios de conservación antes de dar por cerrada la revisión de transparencia.

## Verificaciones contractuales y técnicas pendientes

Estos puntos no se dan por acreditados por la disponibilidad de documentación pública ni por el resultado de un build:

- Cloudflare: identificar la entidad contratada, condiciones aceptadas y versión del DPA contractualmente aplicable. No se ha acreditado su aplicación concreta a esta cuenta; la revisión del DPA público indicada arriba no cierra este pendiente. Revisar el alcance de los tratamientos por cuenta del titular y los fines propios del proveedor y subencargados, teniendo en cuenta las funciones ya confirmadas en el panel.
- IONOS: confirmar la entidad y condiciones del producto Mail Basic y el contrato de encargo aplicable. IONOS ofrece documentación sobre contratos de tratamiento, pero no se ha confirmado la aplicabilidad del contrato consultado a este producto.
- Ambos proveedores: comprobar ubicaciones de procesamiento y almacenamiento, posibles transferencias internacionales y el mecanismo o garantías efectivamente aplicables. No se han verificado ubicaciones concretas ni garantías específicas. No afirmar alojamiento exclusivamente europeo, adhesiones, cláusulas contractuales o decisiones de adecuación sin evidencia aplicable al servicio contratado.
- Cloudflare: completar el inventario de registros y métricas operativas y sus criterios de conservación, y comprobar el comportamiento de las funciones de seguridad y posibles cookies técnicas según las circunstancias, incluidos desafíos. Las funciones confirmadas y la prueba de incógnito constan arriba; esta prueba y la ausencia de Set-Cookie en una consulta no acreditan ausencia de cookies en todos los escenarios.
- IONOS: verificar retención, eliminación y copias de mensajes y metadatos, y si existen otros destinatarios o reenvíos adicionales. Solo está confirmado el reenvío de contacto@ al buzón privacidad@.
- Completar con los resultados la información pública de destinatarios, transferencias y conservación que corresponda conforme al artículo 13 RGPD. Los enlaces a políticas de proveedores y la redacción prudente no sustituyen esta verificación ni acreditan cumplimiento completo.

Fuentes de referencia, sin presuponer su incorporación al contrato concreto:

- [RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=es), especialmente artículos 5, 6, 12, 13, 21, 28 y 44 y siguientes.
- [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673).
- [DPA público de Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/).
- [Información de IONOS sobre el contrato de tratamiento](https://www.ionos.es/ayuda/proteccion-de-datos/informacion-general-sobre-el-rgpd/contrato-de-tratamiento-de-datos/).

## Política ES/EN publicada y estado de indexación

PrivacyContent.astro genera /es/privacidad/ y /en/privacy/ con contenido equivalente, ocho secciones, ambos correos y enlaces a Cloudflare, IONOS y AEPD. Los derechos se mantienen, incluida la oposición al interés legítimo y la reclamación ante la AEPD. Los enlaces no cargan automáticamente servicios externos.

Las políticas ES/EN están publicadas técnicamente. Conservan la fecha editorial **17 de octubre de 2026 / 17 October 2026**, con datetime 2026-10-17; no deriva de build, Git ni fecha del archivo y no se actualiza automáticamente. El incremento sobre estadísticas técnicas de Cloudflare se integró en main en el commit 4c4364df1edddf50335fd30bdd48b50021d42a5b. Los cambios posteriores requieren su propia aprobación antes de publicarse.

La publicación técnica no equivale a autorización de lanzamiento público o indexación. Todas las páginas deben conservar noindex hasta autorización expresa. Este cierre operativo no declara completadas la revisión jurídica ni las verificaciones contractuales, de conservación técnica y de transferencias de los proveedores.

## Valoración del aviso legal independiente

Con la finalidad personal confirmada y la ausencia actual de actividad comercial o servicios profesionales, no se identifica por ahora una necesidad acreditada de crear una página independiente de aviso legal por el artículo 10 LSSI. La definición de servicios de la sociedad de la información del anexo de la [LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758) vincula su alcance a una actividad económica, también cuando el destinatario no paga. Esta es una valoración limitada al contexto actual, no una exención general de otras obligaciones ni del RGPD/LOPDGDD.

No se crea esa página sin autorización. Reevaluar si se incorporan promoción comercial o profesional, servicios, publicidad, afiliación, ventas o monetización, incluida una eventual evolución de Aldarte. No publicar datos identificativos adicionales sin determinar antes la obligación aplicable.
