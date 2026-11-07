---
title: "El último farero: ¿hasta dónde puede llegar la IA creando un videojuego?"
description: "El origen de El último farero: Los mundos del infinito, un experimento de creación de un videojuego con inteligencia artificial, Godot y supervisión humana."
published: "2026-10-25"
lang: es
category: desarrollo
draft: true
translationKey: el-ultimo-farero-ia-videojuego
series: el-ultimo-farero
seriesPart: 1
---

En los últimos tiempos he leído numerosos artículos sobre personas que, sin conocimientos de programación, consiguen crear aplicaciones, herramientas e incluso videojuegos utilizando inteligencia artificial.

Algunos ejemplos resultan sorprendentes. Proyectos que antes parecían requerir meses de trabajo y conocimientos especializados aparentemente pueden construirse ahora simplemente explicando a una IA lo que queremos conseguir.

Pero esas historias también me despertaban algunas dudas.

**¿Hasta qué punto es realmente posible? ¿Qué puede hacer la inteligencia artificial por sí sola? ¿Y dónde empiezan sus limitaciones?**

Me pareció que una buena forma de intentar responder a esas preguntas era ponerla a prueba.

Y así comenzó *El último farero: Los mundos del infinito*.

## Un experimento más que un videojuego

La idea inicial no era desarrollar el próximo gran videojuego independiente.

Lo que quería era experimentar con una forma diferente de crear software: dar a la inteligencia artificial un papel mucho más activo en las decisiones del proyecto y observar hasta dónde podíamos llegar.

Como ingeniero informático, podía participar directamente en la programación, pero eso habría cambiado el propósito del experimento.

Me interesaba comprobar qué ocurriría si mi papel se centraba principalmente en establecer objetivos, plantear preguntas, valorar alternativas, tomar decisiones importantes y supervisar los resultados.

La IA, por su parte, tendría un margen considerable para proponer ideas, elegir tecnologías, diseñar mecánicas y desarrollar las distintas partes del juego.

No se trataba de dejarla trabajar sin control, sino de comprobar qué podía conseguir con una autonomía mayor de la que normalmente le daría en un proyecto de software.

## ¿Puede una IA tener ideas originales?

Una de las cuestiones que me interesaba explorar era la creatividad.

Cuando pedimos a una inteligencia artificial que imagine un videojuego, sus propuestas parten de patrones y conocimientos adquiridos durante su entrenamiento. Es razonable esperar que muchas de sus ideas recuerden a juegos, géneros y mecánicas que ya conocemos.

Eso no significa necesariamente que el resultado tenga que ser una copia de otro juego.

La combinación de elementos conocidos puede dar lugar a experiencias interesantes, aunque no exista una mecánica completamente nueva.

Tampoco creo que la creatividad pueda reducirse a una simple comparación entre humanos e inteligencia artificial. Lo que quería observar era algo más concreto: **si una IA puede ayudarnos a encontrar una combinación de ideas que resulte coherente, atractiva y suficientemente interesante como para construir un juego alrededor de ella**.

Y, sobre todo, qué ocurre cuando esas ideas tienen que dejar de ser propuestas escritas y convertirse en algo que realmente funcione.

## De las primeras ideas a un faro

A partir de ese planteamiento comenzamos a explorar posibles conceptos.

La propuesta que terminó tomando forma fue una aventura de exploración y puzles, con una perspectiva isométrica y un faro como elemento central.

En *El último farero: Los mundos del infinito*, el jugador controla a un farero que explora un mundo formado por islas, descubre sus secretos y resuelve problemas para avanzar.

Entre las ideas del proyecto aparecen un puente que debe reconstruirse, islas generadas mediante procedimientos y la posibilidad de utilizar conceptos matemáticos relacionados con los fractales, como los conjuntos de Mandelbrot y Julia.

Son elementos que todavía deben evolucionar y demostrar que funcionan bien juntos.

La intención no es incorporar mecánicas simplemente porque resulten llamativas, sino descubrir si podemos construir una experiencia entretenida a partir de ellas.

## Elegir las herramientas también forma parte del experimento

Una vez definido el concepto inicial, había que empezar a tomar decisiones técnicas.

¿Qué motor utilizar? ¿Qué lenguaje de programación? ¿Cómo organizar el proyecto? ¿Qué partes conviene desarrollar primero?

Quise que la inteligencia artificial participara también en estas decisiones, proponiendo alternativas y explicando sus ventajas e inconvenientes.

Finalmente elegimos **Godot**, utilizando GDScript para el desarrollo del juego y GitHub para mantener el código y registrar su evolución.

La plataforma inicial es Windows. No porque descarte otras posibilidades en el futuro, sino porque prefiero comenzar con un entorno de desarrollo y pruebas bien definido.

También decidimos avanzar mediante pequeños incrementos, comprobando cada uno antes de continuar.

Este punto me parece especialmente importante: una IA puede generar mucho código rápidamente, pero eso no significa que todo funcione correctamente ni que el proyecto avance en la dirección adecuada.

## Del papel a un primer prototipo

Una de las diferencias entre imaginar un videojuego y desarrollarlo es que las ideas tienen que superar pruebas muy concretas.

No basta con decidir que el personaje se moverá por un escenario isométrico. Hay que conseguir que los controles respondan correctamente, que la cámara acompañe al jugador y que las colisiones funcionen.

En las primeras etapas del proyecto hemos preparado una escena básica y un personaje que puede desplazarse utilizando el teclado.

La cámara sigue al personaje y puede girar en incrementos de 90 grados. El movimiento se adapta a su orientación, y hemos incorporado obstáculos y límites para comprobar las colisiones.

Son funcionalidades bastante sencillas comparadas con las de un videojuego completo, pero tienen un valor importante para el experimento: **ya podemos ejecutar y probar una parte del juego, en lugar de limitarnos a describir cómo debería funcionar**.

Todavía queda mucho por hacer. El faro, los puzles, el puente y los mundos procedimentales forman parte del desarrollo que tenemos por delante.

## Trabajar con una IA no significa dejar de tomar decisiones

Una de las primeras cosas que estoy comprobando es que dar más autonomía a la inteligencia artificial no elimina la necesidad de supervisión.

Las propuestas pueden parecer razonables sobre el papel y presentar problemas cuando se ejecutan.

También pueden surgir decisiones que, aun siendo técnicamente válidas, no encajen con lo que buscamos para el juego.

Por eso, mi participación sigue siendo necesaria: probar los resultados, valorar las alternativas y decidir cuándo una parte del proyecto está suficientemente terminada para avanzar.

La diferencia es que intento no intervenir en cada detalle técnico si la IA puede resolverlo adecuadamente.

Me interesa encontrar ese equilibrio entre autonomía y supervisión.

## ¿Hasta dónde podremos llegar?

Todavía es pronto para saber si *El último farero* terminará convirtiéndose en un videojuego completo, divertido y suficientemente pulido como para compartirlo con otras personas.

Pero precisamente esa incertidumbre forma parte del interés del proyecto.

Quiero comprobar cómo se comporta la inteligencia artificial cuando tiene que mantener la coherencia de un desarrollo que crece, resolver problemas inesperados, corregir errores y trabajar sobre decisiones tomadas anteriormente.

También quiero descubrir qué tareas puede asumir con bastante independencia y cuáles siguen necesitando una intervención humana importante.

En próximos artículos contaré cómo elegimos Godot, cómo construimos el primer prototipo y qué dificultades vamos encontrando.

No pretendo demostrar que cualquiera puede crear cualquier videojuego simplemente pidiéndoselo a una IA.

**Quiero descubrir qué podemos construir juntos, cuánto trabajo requiere realmente y qué aprendemos durante el proceso.**

Y, si además conseguimos crear un videojuego entretenido, mucho mejor.
