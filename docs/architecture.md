# Arquitectura

## Decisiones actuales

- Sitio web personal, principalmente estático, asociado a fernandoghg.com y fernandoghg.es.
- La arquitectura inicial evitará backend, base de datos y procesamiento dinámico en servidor mientras no exista una necesidad funcional expresamente justificada.
- Los dominios están registrados actualmente en IONOS. No se transferirán ni se modificará DNS en esta fase.
- Contenido previsto principalmente en Markdown/MDX, en español e inglés. No todo el contenido tendrá necesariamente traducción.
- Privacidad por diseño y atención a RGPD/ePrivacy y normativa aplicable como requisitos de primer nivel.
- Accesibilidad, SEO, rendimiento y seguridad como requisitos del proyecto.
- Recursos preferentemente autocontenidos; fuentes locales si se emplean fuentes personalizadas. Evitar recursos externos que permitan seguimiento.
- JavaScript únicamente cuando aporte funcionalidad real; minimizar dependencias y mantenimiento.
- HTTPS obligatorio en producción y redirección de HTTP a HTTPS. Certificados TLS preferentemente gratuitos y con renovación automática.
- Coste de infraestructura como criterio de primer nivel. Objetivo inicial de alojamiento próximo a 0 EUR/mes.
- Git y GitHub para control de versiones en el repositorio `fernandoghg/fernandoghg`, rama principal `main` y Conventional Commits.

## Por decidir

| Tema | Estado y orientación actual |
| --- | --- |
| Tecnología de la aplicación | **Por decidir**. Astro + TypeScript está en evaluación; no es una elección irreversible. |
| Dominio canónico | **Por decidir**. Previsiblemente fernandoghg.com. |
| Redirección de fernandoghg.es | **Por decidir**. Se prevé conservarlo y redirigirlo al .com. |
| Alojamiento | **Por decidir** tras evaluar AWS S3 + CloudFront, AWS Amplify, Cloudflare Pages y GitHub Pages. |
| Publicación y configuración de producción | **Por decidir** tras seleccionar alojamiento; incluye HTTPS, certificados y redirecciones. |
| Organización del contenido y URLs por idioma | **Por decidir**, contemplando publicaciones sin traducción. |
| Herramientas y comprobaciones de desarrollo | **Por decidir** junto con la tecnología. |

La evaluación del alojamiento deberá considerar coste, mantenimiento, privacidad, seguridad, rendimiento y compatibilidad con los dominios y HTTPS previstos. No hay proveedor elegido, presupuestos verificados ni configuración de infraestructura definida. No se introducirán servicios AWS por su mera disponibilidad.
