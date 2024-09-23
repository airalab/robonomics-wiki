---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Introducción

Robonomics ha cambiado el modelo de gobernanza de la paracadena al sofisticado mecanismo OpenGov de Polkadot que permite que la cadena evolucione con el tiempo, bajo la última voluntad de los poseedores de tokens.
La transición de Robonomics a OpenGov garantiza que el DAO de los poseedores de tokens, que controla la mayoría de las participaciones, siempre pueda dirigir la dirección de la paracadena de Robonomics, promulgando cualquier cambio en la red que consideren adecuado.

{% roboWikiNote {title:"Nota:", type: "advertencia"}%} OpenGov solo es aplicable a la Paracadena de Robonomics, que es una cadena basada en Substrate conectada a la Cadena de Relevo de Kusama. OpenGov no es aplicable para la implementación de Robonomics en Ethereum, ya que la red principal de Ethereum actualmente no admite sistemas de gobernanza sofisticados como OpenGov {% endroboWikiNote %}

OpenGov cambia la forma en que se llevan a cabo las operaciones diarias y la toma de decisiones en la paracadena. Proporciona una mayor claridad sobre el alcance de los referendos y tiene el potencial de aumentar drásticamente la cantidad de decisiones que se toman en la paracadena.

OpenGov ha estado activo en la cadena de relevo de Kusama durante algunos meses en el momento de la escritura, y ha demostrado que aumenta drásticamente el número de decisiones (referendos individuales y discretos) que el DAO de los poseedores de tokens puede proponer, votar y, a través de la votación, controlar en última instancia la dirección del protocolo.

**El contenido siguiente contenido en esta sección de la wiki repasará los principios fundamentales de OpenGov en la paracadena de Robonomics y tiene como objetivo ayudarte a comprender mejor los conceptos detrás de OpenGov.**

*Es importante tener en cuenta que la gobernanza es un mecanismo en constante evolución en el protocolo, especialmente en las primeras etapas de implementación.*

Para aquellos interesados únicamente en los parámetros de seguimiento de Robonomics OpenGov, consulte [aquí](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## Acerca de los Referendos

Los referendos son esquemas de votación simples, inclusivos y basados en participaciones. Cada referendo tiene una propuesta específica asociada que toma la forma de una llamada de función privilegiada en el tiempo de ejecución de las cadenas. Esto también puede incluir la llamada más poderosa `set_code`, que tiene la capacidad de cambiar todo el código deEl tiempo de ejecución de las cadenas: esto es único para las cadenas basadas en Substrate, y elimina la necesidad de una "bifurcación dura" de la cadena al actualizar la lógica empresarial de las cadenas (tiempo de ejecución).

Las referendas son eventos discretos que tienen un período de votación fijo (más sobre los diferentes períodos durante el ciclo de vida de una referenda más adelante). Los titulares individuales de tokens pueden votar de una de tres maneras en las referendas: AYE (de acuerdo/sí), NAY (en desacuerdo/no) o ABSTENERSE de votar por completo.

Todas las referendas tienen un retraso de promulgación asociado. Este es el período entre el final de la referenda y, suponiendo que la referenda fue aprobada, los cambios se promulgan en la red.

{% roboWikiNote {title:"Nota:", type: "advertencia"}%} Existe un Período Mínimo de Promulgación específicamente establecido para cada tipo diferente de Origen, pero el originador de una referenda en particular puede establecer que las tareas específicas de esa referenda se ejecuten muchos bloques en el futuro {% endroboWikiNote %}

Las referendas se consideran "cocinadas" si están cerradas y los votos están contabilizados. Suponiendo que la referenda fue aprobada, se programará para su promulgación (en el programador de las cadenas). Las referendas se consideran "crudas" si el resultado está pendiente, como si la referenda aún se estuviera votando actualmente.

Con la adición de OpenGov, cualquiera puede iniciar una referenda en cualquier momento, y pueden hacerlo tantas veces como deseen. OpenGov elimina la limitación de que solo se pueda procesar una referenda a la vez (tenga en cuenta que, en Gov v1, solo se puede votar en una referenda a la vez. La única excepción es una referenda de emergencia adicional por el Comité Técnico acelerado que también puede ser votada simultáneamente por la comunidad).

OpenGov introduce varias nuevas características/conceptos conocidos como Orígenes y Pistas, y estos se introducen para ayudar en el flujo y procesamiento de referendas en el protocolo.

Cada Origen está asociado con una sola clase de referenda, y cada clase está asociada con una pista. La pista describe el ciclo de vida de la referenda y es específica para ese Origen particular del cual la referenda se origina. Tener pistas con sus propios parámetros específicos permite a la red modificar dinámicamente el ciclo de vida de las referendas según su nivel de privilegio (puede pensar en el nivel de privilegio como lo poderoso que puede ser una referenda / qué tipos de cambios puede hacer en el protocolo).

*Piense en los Orígenes como el poder asociado con una referenda, y piense en las Pistas comoLos parámetros de votación asociados con un referéndum, como la duración de sus períodos, y los criterios de Aprobación y Apoyo.*

Por ejemplo, una actualización en tiempo de ejecución no tiene las mismas implicaciones para el protocolo que una pequeña propina del tesoro, por lo tanto se necesitan orígenes diferentes en los cuales se predeterminarán diferentes participaciones, aprobaciones, depósitos y períodos de promulgación (Tracks) en los paquetes de las cadenas.

## Proponiendo un Referéndum y Ciclo de Vida del Referéndum

### Período de Preparación

En OpenGov, cuando se crea inicialmente un referéndum, la comunidad de titulares de tokens puede votar de inmediato sobre él. Sin embargo, no está inmediatamente en un estado donde pueda finalizar, o de otra manera tener sus votos contados, ser aprobado y promulgado sumariamente. En cambio, los referendos deben cumplir con una serie de criterios antes de ser trasladados al Período de Decisión. Hasta que los referendos entren en el Período de Decisión, permanecerán sin decidir y eventualmente expirarán después del período de ciclo de vida general especificado en la pista individual.

{% roboWikiPicture {src:"docs/robonomics-opengov/1.jpeg", alt:"imagen"} %}{% endroboWikiPicture %}

Los criterios para que un referéndum entre en el Período de Decisión son los siguientes:
1. Un Período de Preparación que establece la cantidad de tiempo que debe transcurrir antes de que pueda comenzar el Período de Decisión. Este Período de Preparación ayuda a mitigar la posibilidad de "sniping de decisión" donde un atacante que controla una cantidad sustancial de poder de voto podría intentar usar su gran participación para que un referéndum sea aprobado inmediatamente después de ser propuesto, evitando la posibilidad de que los demás miembros del DAO de titulares de tokens tengan tiempo adecuado para considerar el referéndum y participar en la votación. Por eso, los Orígenes con niveles de privilegio más altos tienen Períodos de Preparación significativamente más largos.

2. Debe haber espacio para la decisión. Cada pista tiene sus propios límites para la cantidad de referendos que pueden decidirse simultáneamente (max_deciding). Las pistas que tienen niveles de privilegio más poderosos tendrán límites más bajos. Por ejemplo, el origen de nivel Raíz tendrá una cantidad significativamente menor de referendos que pueden decidirse simultáneamente en comparación con orígenes de nivel de privilegio más bajo como el origen de Pequeña Propina.

3. El Depósito de Decisión debe ser presentado. Inicialmente, crear un referéndum es bastante económico, y el valor del Depósito de Presentación (reservado cuando se crea inicialmente el referéndum) es bastante bajo, y está compuesto principalmente por el valor que cuesta el almacenamiento en cadena asociado con el referéndum. Los Depósitos de Decisión son significativamente más altos, lo cual es necesario para combatir el spam., y se integra en el juego económico que OpenGov trae, lo cual veremos más adelante.

Una vez que se hayan cumplido los tres criterios anteriores, el referéndum pasará al Período de Decisión. Los votos en el referéndum se contarán hacia el resultado.

### Período de Decisión

*Para una demostración rápida en video del Período de Decisión, vea [este video](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Una vez que un referéndum haya cumplido todos los criterios detallados en la sección anterior, entrará en el Período de Decisión.

El Período de Decisión gira en torno a dos conceptos principales, que son los criterios de Aprobación y Apoyo.

La Aprobación se define como la proporción del peso del voto de aprobación (SÍes vs NOes) en comparación con el peso total de los votos (todos los votos de SÍ y NO combinados). La convicción de cada voto cuenta hacia el peso total de los votos de SÍ/NO (más sobre la votación por convicción / bloqueo voluntario en una sección posterior).

El Apoyo es el número total de votos (tokens) que han participado en el referéndum (y no se ajusta por convicción) en comparación con el total de votos posibles que podrían realizarse en el sistema (piense en esto como la emisión total de XRT en la paracadena, notablemente, el suministro circulante total de XRT no es el factor principal aquí, debido al hecho de que una parte de ese número existe en Ethereum como tokens ERC-20).

**Los votos que están en la dirección de ABSTENCIÓN NO contribuyen a los criterios de Aprobación, pero se incluyen/cuentan hacia los criterios de Apoyo**

Un referéndum debe cumplir los criterios de Apoyo Y Aprobación durante el Período de Decisión para avanzar al Período de Confirmación.

Para obtener detalles de los criterios individuales de Apoyo y Aprobación para cada pista, consulte esta [hoja de cálculo](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Período de Confirmación

Cada pista tiene su propia duración específica para su Período de Confirmación. Las pistas que tienen niveles de privilegio más altos (como Root) tienen Períodos de Confirmación significativamente más largos que aquellos con niveles de privilegio más bajos (como Small Tipper).

Los referendos deben seguir cumpliendo los criterios de Aprobación y Apoyo durante toda la duración del Período de Confirmación, de lo contrario volverán nuevamente al Período de Decisión (nota: el Período de Decisión no se pausa durante el Período de Confirmación, por lo que es totalmente posible queUn Período de Decisión puede expirar durante el Período de Confirmación, lo que significa que si un referéndum es sacado del Período de Confirmación debido a que ya no cumple con los criterios de Aprobación y Apoyo, entonces se considerará como un referéndum fallido y no promulgado).

**Es posible ajustar los criterios de Aprobación y Apoyo para pistas individuales a través de un referéndum con privilegios de Origen Raíz.**

Los Orígenes con niveles de privilegio más bajos tienen criterios de aprobación y apoyo significativamente más fáciles de cumplir (establecidos por la pista) que aquellos con niveles de privilegio más altos. De manera similar, los Orígenes con niveles de privilegio más altos tienen curvas menos pronunciadas que aquellos con menos privilegios (como se define en la pista), para asegurar que el DAO titular del token realmente apruebe el referéndum y evitar el "sniping" de referéndums de origen de alto privilegio.

En OpenGov, los referéndums que no son aprobados después de que expire el Período de Decisión se consideran rechazados por defecto, y tanto los depósitos de presentación como de decisión se reembolsan a sus originadores (nota: el depósito de decisión puede ser realizado por alguien que no sea el originador del referéndum).

Si un referéndum logra cumplir continuamente con los criterios de Aprobación y Apoyo durante todo el Período de Confirmación, entonces se considera aprobado y se programará para ejecutarse desde el origen propuesto, pero el referéndum solo se ejecutará después de que haya transcurrido el período mínimo de promulgación.

### Período de Promulgación

El Período de Promulgación es especificado por el originador cuando se propone el referéndum, pero está sujeto al Período Mínimo de Promulgación que se especifica en cada pista. Los Orígenes más poderosos tienen un período mínimo de promulgación mucho más alto que aquellos con menos privilegios. Esto asegura que la red tenga tiempo suficiente para prepararse para cualquier cambio que un referéndum poderoso pueda imponer.

## Bloqueo Voluntario / Convicción

Robonomics utiliza un concepto conocido como bloqueo voluntario, o votación por convicción. Esto permite a los titulares de tokens aumentar su poder de voto decidiendo por cuánto tiempo están dispuestos a bloquear sus tokens para un referéndum en particular. Este mecanismo solo afecta los criterios de Aprobación para cada referéndum, y la votación por convicción no afecta los criterios de Apoyo.

La votación por convicción se puede calcular utilizando esta fórmula:

$$\text{Votos de Aprobación} = \text{Tokens} * \text{Multiplicador de Convicción}$$

Esta tabla muestra cómo cada nivel creciente de período de bloqueo multiplica tu voto para los criterios de aprobación:

| Períodos de Bloqueo | Multiplicador de Voto | Días de Bloqueo |
|---------------------|-----------------------|-----------------|
| Sin Bloqueo         | 0.1x                  | 0               |
| 1                   | 1                     | 1               || 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


El máximo de convicción que un titular de token puede usar es de 6x convicción. Solo puedes establecer la convicción según la tabla anterior, y no puedes, por ejemplo, usar 5.5x de convicción.

Mientras un token está bloqueado debido a una votación, aún se puede utilizar para votar en otros referendos, sin embargo, no formará parte de tu saldo transferible (no se puede enviar a otra cuenta) y el saldo solo será transferible nuevamente una vez que haya expirado todo el período de bloqueo.

## Delegación de Votos

En OpenGov, se añadió un mecanismo para permitir a los titulares de tokens que no tienen suficiente tiempo para revisar cada referendo que sus tokens se utilicen como parte del sistema de gobernanza, esto se conoce como delegación de votos.

Los titulares de tokens pueden optar por delegar su poder de voto a otro votante en el sistema (otra cuenta). Los votantes pueden especificar delegar su poder de voto de manera ágil, lo que les permite asignar su poder de voto a una cuenta diferente para cada Origen individual. Los votantes también pueden establecer asignar una cantidad diferente de poder de voto para cada Origen (número de tokens y nivel de convicción).

Esta función de delegación tiene un objetivo, aumentar la participación de los votantes y ayudar a garantizar que se cumplan los criterios de Aprobación y Apoyo requeridos.

Para delegar tu poder de voto, puedes utilizar la función "Delegar" que puedes encontrar en la sección de Referendos de Gobierno del [Portal de Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). Alternativamente, los usuarios pueden enviar el extrínseco convictionVoting(Delegate) utilizando la sección de Desarrollador -> Extrínsecos del Portal de Robonomics, sin embargo, usar la función "Delegar" de la sección de referendos del portal es mucho más fácil.

## Cancelación / Anulación de Referendos y el Juego Económico de Gobernanza

En OpenGov, existen Orígenes dedicados a rechazar referendos en curso, independientemente de su estado. Estos se conocen como el Cancelador de Gobernanza y el Asesino de Gobernanza.pistas.

Estos Orígenes intervienen en un referéndum que ya ha sido votado. Estos Orígenes, si el referéndum que proviene de ellos es aprobado, rechazarán inmediatamente un referéndum en curso independientemente de su estado.

La cancelación en sí misma es un tipo de referéndum que debe ser votado por los titulares de tokens para ser ejecutado. La cancelación viene con su propio origen y pista que tienen un tiempo de liderazgo más bajo (Período de Decisión, etc.), y tienen curvas de Aprobación y Soporte con una curva más pronunciada (lo que significa que sus criterios son mucho más fáciles de cumplir con el tiempo) que otros Orígenes. Esto se debe al hecho de que la cancelación de un referéndum generalmente vendrá con un sentido de urgencia.

El Cancelador de Gobernanza tiene como objetivo rechazar instantáneamente un referéndum en curso. Cuando un referéndum es cancelado por este origen, tanto el Depósito de Presentación como el Depósito de Decisión se reembolsan a sus originadores. Un ejemplo de cuándo se podría considerar que se cancela un referéndum es si el originador ha cometido algún error humano en el contenido de su referéndum, y no necesariamente ha intentado hacer algo malicioso.

El Asesino de Gobernanza tiene como objetivo rechazar instantáneamente un referéndum en curso. Aquí es donde entra en juego el juego económico de gobernanza. Los Orígenes con altos niveles de privilegio, como Root, tienen un Depósito de Decisión que requiere una gran cantidad de capital (tokens XRT) para ser publicado para que el referéndum entre en el Período de Decisión.

Si un actor malicioso presenta un referéndum, como un referéndum con orígenes de Root que tiene como objetivo `set_code` del tiempo de ejecución de las cadenas a algo que detendrá la producción de bloques de la cadena, entonces el DAO de titulares de tokens puede plantear un referéndum de Contragolpe de Gobernanza para castigar esta acción. Si el referéndum malicioso es rechazado a través del origen de Asesino de Gobernanza, entonces tanto el Depósito de Presentación como el Depósito de Decisión son recortados, lo que significa que el originador (la(s) cuenta(s) que publicaron estos depósitos) perderán esos fondos.

Esto significa que hay una consecuencia económica severa para los actores maliciosos que intenten plantear un referéndum que tendría impactos negativos severos para la cadena, lo que en teoría evitará que cualquier actor malicioso intente hacer esto.

El Depósito de Decisión para la pista de Asesino de Gobernanza en sí mismo es bastante alto, esto es para evitar que actores igualmente maliciosos intenten recortar depósitos de referéndums buenos. **Un referéndum existente de Asesino de Gobernanza puede ser anulado por un referéndum posterior de Asesino de Gobernanza.**

## Comité Técnico de Robonomics y Origen en Lista Blanca

Este grupo es un cuerpo de expertos autogobernado que tiene como objetivo principal representar a los humanos que encarnan y poseen el conocimiento técnico del protocolo de red de Robonomics.El grupo (y solo este grupo) puede originar referendos desde el palet de Lista Blanca. Este palet hace una sola cosa, permite que un Origen ascienda el nivel de privilegio de otro Origen para una operación específica.

Este grupo puede autorizar referendos desde un origen conocido como Origen de Lista Blanca, y estos referendos pueden ejecutarse con privilegios de nivel Raíz, pero solo funcionarán con ciertos comandos especificados que hayan sido autorizados por el grupo. El palet de Lista Blanca verifica dos cosas:
1. Que el Origen realmente sea el Origen de Lista Blanca (es decir, que el referendo haya pasado por la pista de este Origen).
2. Que la propuesta haya sido realmente incluida en la lista blanca por el grupo.

Si ambas condiciones son verdaderas, entonces la operación se ejecutará con privilegios de nivel Raíz.

Este sistema permite tener una nueva Pista paralela (Origen de Lista Blanca), cuyos parámetros permiten un proceso de votación más corto (los criterios de Aprobación y Soporte son ligeramente más fáciles de cumplir que los de Raíz). Este proceso abierto y transparente permite a este grupo de expertos del Protocolo de Red Robonomics proponer referendos que han determinado que son seguros y críticos en tiempo.

Cabe destacar que los Criterios de Soporte para referendos iniciados con el origen de Lista Blanca no tienden hacia 0 como en muchos otros orígenes/pistas. Esto asegura que este grupo no tenga un control de facto sobre todo el Protocolo de Red Robonomics, y requiere un nivel mínimo de Soporte (participación de votantes) de todos los poseedores de tokens DAO en general.


## Duraciones de Referendos

Es importante entender que la duración de cada referendo individual no es algo concreto, no está establecido de antemano. Algunos períodos dentro del ciclo de vida del referendo, como el período mínimo de promulgación, sí tienen una duración concreta, sin embargo, otros, incluido el período de decisión, no la tienen. Por ejemplo, no es preciso sumar las duraciones máximas de los períodos de Preparación, Decisión, Confirmación y Mínimo de Promulgación y afirmar que "cada referendo tomará X cantidad de días", es mucho más flexible que eso.

Veamos esto a través de algunos referendos separados, todos los cuales se originan desde el mismo Origen, en este caso, el origen Raíz.

El Origen Raíz tiene su propia pista, donde se establecen las duraciones para cada período, así como las curvas de Aprobación y Soporte.

Es importante recordar que los referendos solo avanzarán a la siguiente etapa en su ciclo de vida si se cumplen ciertas condiciones.{% roboWikiPicture {src:"docs/robonomics-opengov/2.jpeg", alt:"imagen"} %}{% endroboWikiPicture %}

Deberías asumir en las siguientes imágenes que, para que un referéndum ascienda a la siguiente etapa de su ciclo de vida, las condiciones descritas en la imagen anterior tendrían que haber sido cumplidas (a menos que se indique lo contrario).

### Duración máxima posible con muy poca participación de votantes

La siguiente imagen es una representación del cronograma máximo posible para un referéndum, piensa en esto como un referéndum que:
1. Ha publicado su Depósito de Decisión, y por lo tanto ha entrado en el Período de Decisión.
2. Tiene un solo voto, por ejemplo, 1 XRT, en la dirección AYE; esto significará que solo cumplirá con el Apoyo requerido (participación de votantes) al final del Período de Decisión (ya que el Apoyo general es extremadamente bajo), pero tiene un 100% de Aprobación, por lo que eventualmente cumplirá con los requisitos para entrar en el Período de Confirmación.
3. Continúa cumpliendo con los criterios mencionados durante el Período de Confirmación.
4. La propuesta planteada por el referéndum se promulgará exactamente en el mismo bloque en el que finaliza el Período de Promulgación Mínima; técnicamente, el originador del referéndum puede establecer los cambios en la red según lo detallado en el referéndum para promulgar muchos bloques en el futuro, por lo que realísticamente el ciclo de vida real de un referéndum individual podría abarcar muchos días, semanas, meses o años.

{% roboWikiPicture {src:"docs/robonomics-opengov/3.jpeg", alt:"imagen"} %}{% endroboWikiPicture %}

Podemos ver que en este ejemplo, el ciclo de vida del referéndum sería (aproximadamente) de 17 días.

### Duración con mucha participación de votantes (con una gran cantidad de votos AYE)

Ahora veamos un referéndum en el que los titulares de tokens XRT DAO han mostrado mucho interés. En este ejemplo, asumiremos que ha ocurrido una participación total de aproximadamente 248,771 XRT, y todos los votantes están votando en la dirección AYE (nota: técnicamente en esta etapa de un referéndum Root, según la pista, solo el 60% de los votos deben estar en la dirección AYE para que un referéndum cumpla con los criterios de Aprobación).

{% roboWikiNote {title:"Nota:", type: "advertencia"}%}  Siempre consulta la información más actualizada de la pista para obtener información precisa sobre cada Pista, más información se puede encontrar en esta [hoja de cálculo.](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).
{% endroboWikiNote %}

En este ejemplo:
1. El Depósito de Decisión se publicó durante el Período de Preparación, por lo que pudo pasar al Período de Decisión al final del Período de Preparación.
2. Muchos votantes votaron en este referéndum, obteniendo una participación de votantes de ~248,771 XRT en un período relativamente corto.
3. Los votos fueron mayoritarios en la dirección AYE (cualquier cosa por encima del 60% AYE).
4. El referéndum cumple continuamente con los criterios del Período de Confirmación durante todo su Período de Confirmación (Nota: Si un referéndum deja de cumplir con los criterios del Período de Confirmación, entonces se retrocede a su Período de Decisión).
5. La propuesta planteada por el referéndum se promulgará exactamente en el mismo bloque en el que finaliza el Período Mínimo de Promulgación.

Debido al hecho de que hubo una participación de ~248,771 XRT, el referéndum cumplirá con los criterios para entrar en su Período de Confirmación después de ~168 horas (7 días).

{% roboWikiPicture {src:"docs/robonomics-opengov/4.jpeg", alt:"imagen"} %}{% endroboWikiPicture %}

Podemos ver que en este segundo ejemplo, debido al hecho de que hubo una buena cantidad de participación de votantes, el Período de Decisión en realidad terminó a la mitad de su tiempo máximo asignado. Resultando en un referéndum que puede promulgarse en ~10 días.


### Duración cuando el Depósito de Decisión nunca se publica

Ahora, veamos un referéndum que se originó, pero nunca tuvo su Depósito de Decisión publicado. Estos referéndums se encuentran en una especie de estado de "limbo", donde su Período de Preparación ha terminado, pero como el Depósito de Decisión no se publicó, el referéndum permanece en el "Estado de Preparación".

{% roboWikiPicture {src:"docs/robonomics-opengov/5.jpeg", alt:"imagen"} %}{% endroboWikiPicture %}

Podemos ver que en este tercer ejemplo, debido al hecho de que el Depósito de Decisión nunca se publicó, el referéndum en realidad nunca entrará en el Período de Decisión, en cambio, permanece en el "Estado de Preparación". Esto significa que eventualmente, si nunca se publica un Depósito de Decisión, el referéndum expirará después de la duración especificada en la constante timeOut.del palé ha transcurrido.

Esto ha ocurrido anteriormente en Kusama, donde se publicó un referéndum con orígenes en Root, pero debido a los altos requisitos de capital para publicar el Depósito de Decisión, el referéndum nunca llegó a las etapas posteriores de su ciclo de vida. Dichos referéndums concluyen con la bandera de "caducado".

### Duración cuando se publica tarde el Depósito de Decisión

Finalmente, veamos un ejemplo en el que el Depósito de Decisión no se publicó durante bastante tiempo después de que se originó el referéndum. Esto ha ocurrido anteriormente en Kusama, donde se publicó un referéndum con el origen en Root, pero el originador tuvo que dedicar tiempo a encontrar a alguien con una gran cantidad de capital para publicar el Depósito de Decisión en su nombre.

{% roboWikiPicture {src:"docs/robonomics-opengov/6.jpeg", alt:"imagen"} %}{% endroboWikiPicture %}

En este último ejemplo, debido a que el Depósito de Decisión se publicó después de que hubiera finalizado el Período de Preparación, pero antes de que el referéndum haya caducado, el ciclo de vida del referéndum es en realidad mucho más largo de lo normal, ya que entra en el Período de Decisión después de un período de tiempo más largo.

Es importante tener en cuenta que el DAO de titulares de tokens puede votar AYE/NAY en referéndums que se encuentran en el Período de Preparación, o atascados en el "Estado de Preparación".