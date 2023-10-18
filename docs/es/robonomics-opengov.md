---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Introducción

Robonomics ha cambiado el modelo de gobernanza de la parachain al sofisticado mecanismo OpenGov de Polkadot que permite que la cadena evolucione con el tiempo, bajo la voluntad final de los titulares de tokens.
La transición de Robonomics a OpenGov garantiza que el DAO de los titulares de tokens, que controla la mayoría de las participaciones, siempre pueda dirigir la dirección de la parachain de Robonomics, promoviendo cualquier cambio en la red que consideren adecuado.

<robo-wiki-note title='Note:' type="warning">
  OpenGov solo se aplica a la Parachain de Robonomics, que es una cadena basada en Substrate conectada a la Kusama Relay Chain. OpenGov no se aplica a la implementación de Robonomics Ethereum, ya que la mainnet de Ethereum actualmente no admite sistemas de gobernanza sofisticados como OpenGov.
</robo-wiki-note>

OpenGov cambia la forma en que se llevan a cabo las operaciones y la toma de decisiones diarias en la parachain. Proporciona una mayor claridad sobre el alcance de los referendos y tiene el potencial de aumentar drásticamente la capacidad de decisión en la parachain.

OpenGov ha estado activo en la Kusama Relay Chain durante algunos meses en el momento de escribir esto, y ha demostrado que aumenta drásticamente el número de decisiones (referendos individuales y discretos) que el DAO de los titulares de tokens puede proponer, votar y, a través de la votación, controlar en última instancia la dirección del protocolo.

**El siguiente contenido contenido en esta sección de la wiki explicará los principios fundamentales de OpenGov en la parachain de Robonomics y tiene como objetivo ayudarlo a comprender mejor los conceptos detrás de OpenGov.**

*Es importante tener en cuenta que la gobernanza es un mecanismo en constante evolución en el protocolo, especialmente en las etapas iniciales de implementación.*

Para aquellos interesados ​​únicamente en los parámetros de seguimiento de Robonomics OpenGov, consulte [aquí](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## Acerca de los referendos

Los referendos son esquemas de votación simples, inclusivos y basados ​​en participaciones. Cada referendo tiene una propuesta específica asociada que toma la forma de una llamada de función privilegiada en el tiempo de ejecución de las cadenas. Esto también puede incluir la llamada más poderosa `set_code`, que tiene la capacidad de cambiar todo el código del tiempo de ejecución de las cadenas; esto es exclusivo de las cadenas basadas en Substrate y elimina el requisito de una "bifurcación dura" de la cadena al actualizar la lógica empresarial de las cadenas ( tiempo de ejecución).

Los referendos son eventos discretos que tienen un período de votación fijo (más sobre los diferentes períodos durante el ciclo de vida de un referendo más adelante). Los titulares individuales de tokens pueden votar de tres formas en los referendos: AYE (acuerdo/sí), NAY (desacuerdo/no) o ABSTENERSE de votar por completo.

Todos los referendos tienen un retraso de promulgación asociado. Este es el período entre el final del referendo y, suponiendo que el referendo haya sido aprobado, la promulgación de los cambios en la red. 

<robo-wiki-note title='Note:' type="warning">

  Existe un Período de Promulgación **Mínimo** específicamente establecido para cada tipo diferente de Origen, pero el originador de un referendo en particular puede establecer que las tareas específicas de ese referendo se ejecuten en muchos bloques en el futuro

</robo-wiki-note>

Los referendos se consideran "baked" si están cerrados y los votos se cuentan. Suponiendo que el referendo haya sido aprobado, se programará su promulgación (en el programador de las cadenas). Los referendos se consideran "unbaked" si el resultado está pendiente, como si el referendo aún se estuviera votando actualmente.

Con la adición de OpenGov, cualquier persona puede iniciar un referendo en cualquier momento y puede hacerlo tantas veces como desee. OpenGov elimina la limitación de que solo se pueda procesar 1 referendo a la vez (tenga en cuenta que, en Gov v1, solo se puede votar en 1 referendo a la vez. La única excepción es un referendo de emergencia adicional por parte del Comité Técnico acelerado que también puede ser votado simultáneamente por la comunidad).

OpenGov introduce varias características / conceptos nuevos conocidos como Orígenes y Tracks, y estos se introducen para ayudar en el flujo y procesamiento de referendos en el protocolo.

Cada Origen está asociado con una sola clase de referendo, y cada clase está asociada con un track. El track describe el ciclo de vida del referendo y es específico para ese Origen particular desde el cual se origina el referendo. Tener tracks con sus propios parámetros específicos permite que la red modifique dinámicamente el ciclo de vida de los referendos según su nivel de privilegio (puede pensar en el nivel de privilegio como el poder de un referendo / qué tipos de cambios puede realizar en el protocolo).

*Piense en los Orígenes como el poder asociado con un referendo y piense en los Tracks como los parámetros de votación asociados con un referendo, como la duración de sus períodos y los criterios de aprobación y apoyo.*

Por ejemplo, una actualización de tiempo de ejecución no tiene las mismas implicaciones para el protocolo que una pequeña propina del tesoro, por lo que se necesitan orígenes diferentes en los que se predeterminarán diferentes participaciones, aprobaciones, depósitos y períodos de promulgación (Tracks) en la paleta de las cadenas.

## Proponiendo un Referéndum y Ciclo de Vida del Referéndum 

### Período de Preparación

En OpenGov, cuando se crea inicialmente un referéndum, puede ser votado inmediatamente por la comunidad de poseedores de tokens. Sin embargo, no está inmediatamente en un estado en el que pueda finalizar, o de otra manera tener sus votos contados, ser aprobado y promulgado sumariamente. En cambio, los referendos deben cumplir una serie de criterios antes de ser trasladados al Período de Decisión. Hasta que los referendos entren en el Período de Decisión, permanecerán sin decidir, y eventualmente expirarán después del período de ciclo de vida general especificado en la pista individual.

<robo-wiki-picture src='robonomics-opengov/1.jpeg' alt="picture" />

Los criterios para que un referéndum entre en el Período de Decisión son los siguientes:
1. Un Período de Preparación que establece la cantidad de tiempo que debe transcurrir antes de que pueda comenzar el Período de Decisión. Este Período de Preparación ayuda a mitigar la posibilidad de "ataques de decisión" en los que un atacante que controla una cantidad sustancial de poder de voto podría intentar utilizar su gran participación para que un referéndum sea aprobado inmediatamente después de proponerlo, evitando así la posibilidad de que los demás miembros del DAO de poseedores de tokens tengan tiempo suficiente para considerar el referéndum y participar en la votación. Por eso, las Orígenes con niveles de privilegio más altos tienen Períodos de Preparación significativamente más largos.

2. Debe haber espacio para la decisión. Cada pista tiene sus propios límites para la cantidad de referendos que se pueden decidir simultáneamente (max_deciding). Las pistas que tienen niveles de privilegio más altos tendrán límites más bajos. Por ejemplo, el origen de nivel Raíz tendrá una cantidad significativamente menor de referendos que se pueden decidir simultáneamente en comparación con los orígenes de nivel de privilegio más bajo, como el origen de Small Tipper.

3. Se debe presentar el Depósito de Decisión. La creación inicial de un referéndum es bastante económica, y el valor del Depósito de Presentación (reservado cuando se crea inicialmente el referéndum) es bastante bajo, y está compuesto principalmente por el valor que cuesta el almacenamiento en cadena asociado con el referéndum. Los Depósitos de Decisión son significativamente más altos, lo cual es necesario para combatir el spam, y juegan en el juego económico que OpenGov trae, que veremos más adelante.

Una vez que se hayan cumplido estos tres criterios anteriores, el referéndum pasará al Período de Decisión. Los votos sobre el referéndum luego se contarán para el resultado.

### Período de Decisión

*Para una demostración rápida en video del Período de Decisión, vea [este video](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Una vez que un referéndum haya cumplido todos los criterios detallados en la sección anterior, entrará en el Período de Decisión.

El Período de Decisión gira en torno a dos conceptos principales, que son los criterios de Aprobación y Soporte. 

La Aprobación se define como la proporción del peso del voto de aprobación (AYEs vs NAYs) en comparación con el peso total del voto (todos los votos AYE y NAY combinados). La convicción de cada voto cuenta para el peso total de los votos AYE/NAY (más sobre la votación por convicción / bloqueo voluntario en una sección posterior).

El Soporte es el número total de votos (tokens) que han participado en el referéndum (y no se ajusta por convicción) en comparación con el total de votos posibles que se pueden realizar en el sistema (piense en esto como la emisión total de XRT en la parachain - notablemente, el suministro circulante total de XRT no es el factor principal aquí, debido al hecho de que una parte de ese número existe en Ethereum como tokens ERC-20).

**Los votos que están en la dirección de ABSTENCIÓN NO contribuyen a los criterios de Aprobación, pero se incluyen / cuentan hacia los criterios de Soporte**

Un referéndum debe cumplir los criterios de Soporte y Aprobación durante el Período de Decisión para avanzar al Período de Confirmación.

Para obtener detalles de los criterios de Soporte y Aprobación individuales para cada pista, consulte esta [hoja de cálculo](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Período de Confirmación

Cada pista tiene su propia duración específica para su Período de Confirmación. Las pistas que tienen niveles de privilegio más altos (como Root) tienen Períodos de Confirmación significativamente más largos que aquellos con niveles de privilegio más bajos (como Small Tipper).

Los referendos deben seguir cumpliendo los criterios de Aprobación y Soporte durante toda la duración del Período de Confirmación, de lo contrario volverán al Período de Decisión (nota: el Período de Decisión no se pausa durante el Período de Confirmación, por lo que es completamente posible que un Período de Decisión expire durante el Período de Confirmación, lo que significa que si un referéndum es expulsado del Período de Confirmación debido a que ya no cumple los criterios de Aprobación y Soporte, entonces se considerará como un referéndum fallido y no promulgado).

**Es posible ajustar los criterios de aprobación y soporte para pistas individuales a través de un referéndum con privilegios de Root Origin.**

Los orígenes con niveles de privilegios más bajos tienen criterios de aprobación y soporte significativamente más fáciles de cumplir (establecidos por la pista) que aquellos con niveles de privilegios más altos. De manera similar, los orígenes con niveles de privilegios más altos tienen curvas menos pronunciadas que aquellos con menos privilegios (como se define en la pista), para garantizar que el poseedor del token DAO realmente apruebe el referéndum y evitar ataques de referéndum por referendos de origen con altos privilegios.

En OpenGov, los referendos que no se aprueban después de que expire el Período de Decisión se consideran rechazados por defecto, y tanto los depósitos de presentación como de decisión se reembolsan a sus originadores (nota: el depósito de decisión puede ser publicado por alguien que no sea el originador del referéndum) .

Si un referéndum logra cumplir continuamente con los criterios de Aprobación y Respaldo durante todo el Período de Confirmación, entonces se considera aprobado y se programará su ejecución desde el origen propuesto, pero el referéndum solo se ejecutará después de que haya transcurrido el período mínimo de promulgación.

### Período de promulgación

El período de promulgación lo especifica quien lo origina cuando se propone el referéndum, pero está sujeto al período mínimo de promulgación que se especifica en cada vía. Los Orígenes más poderosos tienen un período mínimo de promulgación mucho más alto que aquellos con menos privilegios. Esto asegura que la red tenga tiempo suficiente para prepararse para cualquier cambio que un poderoso referéndum pueda imponer.

## Bloqueo voluntario / Condena

Robonomics utiliza un concepto conocido como bloqueo voluntario o votación por convicción. Esto permite a los poseedores de tokens aumentar su poder de voto al decidir durante cuánto tiempo están dispuestos a guardar sus tokens para un referéndum en particular. Este mecanismo sólo afecta los criterios de Aprobación de cada referéndum, y la votación de convicción no afecta los criterios de Apoyo.

La votación por condena se puede calcular utilizando esta fórmula:

$$\text{Approval Votes} = \text{Tokens} * \text{Conviction\_Multiplier}$$


Esta tabla muestra cómo cada nivel creciente de período de bloqueo multiplica su voto para los criterios de aprobación:

| Lock Periods | Vote Multiplier | Lock Up Days |
|--------------|-----------------|--------------|
| No Lock      | 0.1x            | 0          |
| 1            | 1x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


La cantidad máxima de convicción que puede utilizar un poseedor de tokens es 6 veces la convicción. Solo puede establecer la convicción según la tabla anterior y no puede, por ejemplo, utilizar una convicción de 5,5x.

Si bien un token está bloqueado debido a la votación, aún se puede usar para votar en otros referendos; sin embargo, no formará parte de su saldo transferible (no puede enviarlo a otra cuenta) y el saldo solo volverá a ser transferible una vez. todo el período de bloqueo ha expirado.

## Delegación de Voto

En OpenGov, se agregó un mecanismo para permitir que los poseedores de tokens que no necesariamente tienen tiempo suficiente para revisar cada referéndum puedan seguir usando sus tokens como parte del sistema de gobernanza, esto se conoce como delegación de voto.

Los poseedores de tokens pueden optar por delegar su poder de voto a otro votante en el sistema (otra cuenta). Los votantes pueden especificar delegar su poder de voto de forma ágil, lo que les permite asignar su poder de voto a una cuenta diferente para cada Origen individual. Los votantes también pueden configurar la asignación de una cantidad diferente de poder de voto para cada Origen (número de tokens y nivel de convicción).

Esta función de delegación tiene un objetivo: aumentar la participación de votantes y ayudar a garantizar que se cumplan los criterios de aprobación y apoyo necesarios.

Para delegar su poder de voto, puede utilizar la función "Delegar" que puede encontrar en la sección Gobernanza -> Referéndum del [Portal de Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). Alternativamente, los usuarios pueden enviar el extrínseco de votación de convicción (delegado) usando la sección Desarrollador -> Extrínsecos del Portal Robonomics; sin embargo, usar la función "Delegar" de la sección de referéndum del portal es mucho más fácil.

## Cancelar/matar el referéndum y el juego económico de la gobernanza

En OpenGov, hay Origins que se dedican a rechazar referendos en curso, independientemente de su estado. Estos se conocen como las pistas Governance Canceller y Governance Killer.

Estos Orígenes intervienen en un referéndum que ya ha sido votado. Estos Orígenes, si se aprueba el referéndum que se origina en ellos, rechazarán inmediatamente un referéndum en curso independientemente de su estado. 

La cancelación en sí es un tipo de referéndum que los poseedores del token deben votar para poder ejecutarse. La cancelación viene con su propio origen y seguimiento, que tienen un tiempo de entrega más bajo (período de decisión, etc.) y tienen curvas de aprobación y soporte con una curva más pronunciada (lo que significa que sus criterios son mucho más fáciles de cumplir con el tiempo) que otros orígenes. Esto se debe al hecho de que la cancelación de un referéndum suele venir acompañada de un sentido de urgencia.

Governance Canceller tiene como objetivo rechazar instantáneamente un referéndum que ya está en curso. Cuando un referéndum es cancelado por este origen, tanto la Presentación como el Depósito de Decisión son reembolsados a sus originadores. Un ejemplo de cuándo se podría considerar cancelado un referéndum es si el autor ha cometido algún error humano en el contenido del referéndum y no necesariamente ha intentado hacer nada malicioso.

Governance Killer tiene como objetivo rechazar instantáneamente un referéndum que ya está en curso. Aquí es donde entra en juego el juego de la gobernanza económica. Los orígenes con altos niveles de privilegio, como Root, tienen un depósito de decisión que requiere la publicación de una gran cantidad de capital (tokens XRT) para que el referéndum entre en el período de decisión.

Si un actor malintencionado presenta un referéndum, como un referéndum con orígenes de raíz que tiene como objetivo "establecer código" del tiempo de ejecución de las cadenas en algo que detendrá la producción de bloques de la cadena, entonces el poseedor del token DAO puede plantear un referéndum contrario a Governance Killer para castigar. esta acción. Si el referéndum malicioso es rechazado a través del origen Governance Killer, entonces tanto los depósitos de Presentación como de Decisión se reducen drásticamente, lo que significa que el originador (las cuentas que registraron estos depósitos) perderá esos fondos.

Esto significa que existe una consecuencia económica grave para que actores malintencionados intenten convocar un referéndum, lo que tendría graves impactos negativos para la cadena, lo que en teoría impedirá que cualquier actor malintencionado intente hacerlo.

El depósito de decisión para la pista Governance Killer en sí es bastante alto, esto es para evitar que actores igualmente maliciosos intenten recortar los depósitos de referéndum que de otro modo sería bueno. **Un referendo existente sobre Governance Killer puede ser anulado por un referéndum posterior sobre Governance Killer.**

## Comité técnico de Robonomics y origen incluido en la lista blanca

Este grupo es un organismo de expertos autónomo que tiene el objetivo principal de representar a los humanos que encarnan y poseen el conocimiento técnico del protocolo de red Robonomics.

Este grupo (y sólo este grupo) puede generar referendos desde la paleta de la Lista blanca. Esta paleta hace una cosa: permite que un Origen escale el nivel de privilegio de otro Origen para una determinada operación. 

Este grupo puede autorizar referéndum desde un origen conocido como Whitelisted-Root, y estos referéndums se pueden ejecutar con privilegios de nivel raíz, pero estos referéndums solo funcionarán exitosamente con ciertos comandos específicos que hayan sido autorizados por el grupo. La paleta Whitelist verifica dos cosas:
1. El Origen realmente es la Raíz de la Lista Blanca (es decir, ese referéndum pasó por la pista de este Origen).
2. De hecho, la propuesta ha sido incluida en la lista blanca del grupo.

Si ambas condiciones son verdaderas, la operación se ejecutará con privilegios de nivel raíz.

Este sistema permite tener una nueva vía paralela (origen raíz en lista blanca), cuyos parámetros permiten un plazo de votación más corto (los criterios de aprobación y soporte son un poco más fáciles de cumplir que los de raíz). Este proceso abierto y transparente permite a este cuerpo de expertos del Protocolo de Red Robonomics proponer referendos que han determinado que son seguros y urgentes.

Cabe señalar que los criterios de apoyo para el referéndum iniciado con el origen de raíz en la lista blanca no tienden a 0 como muchos otros orígenes/pistas. Esto garantiza que este grupo no tenga control de facto sobre todo el protocolo de red Robonomics y requiere un nivel mínimo de apoyo (participación de votantes) por parte del titular general del token DAO.


## Duraciones del referéndum

Es importante entender que la duración de cada referéndum individual no es algo concreto, no está escrita en piedra. Sin embargo, algunos períodos dentro del ciclo de vida del referéndum, como el período mínimo de promulgación, sí tienen una duración concreta; otros, incluido el período de decisión, no la tienen. Por ejemplo, no es exacto sumar las duraciones máximas de Preparación, Decisión, Confirmación y Min. Períodos de promulgación y afirman que "cada referéndum tomará X días", es mucho más fluido que eso.

Miremos esto a través del lente de algunos referendos separados, todos los cuales se originan en el mismo Origen, en este caso, el Origen Raíz.

El Origen Raíz tiene su propio track, donde se fijan las duraciones de cada periodo, así como las curvas de Aprobación y Soporte.

Es importante recordar que los referendos sólo pasarán a la siguiente etapa de su ciclo de vida si se cumplen ciertas condiciones.

<robo-wiki-picture src='robonomics-opengov/2.jpeg' alt="picture" />

Debe asumir en las siguientes imágenes que, para que un referéndum pase a la siguiente etapa de su ciclo de vida, se tendrían que haber cumplido las condiciones descritas en la imagen de arriba (a menos que se indique lo contrario).


### Máxima duración posible con muy poca participación electoral

La siguiente imagen es una representación del cronograma máximo posible para un referéndum. Piense en esto como un referéndum que:
1. Ha publicado su Depósito de Decisión y, por lo tanto, ha entrado en el Período de Decisión.
2. Tiene un solo voto, por ejemplo, 1 XRT, en la dirección AYE; esto significará que solo cumplirá con el apoyo requerido (participación de votantes) al final del período de decisión (ya que el apoyo general es extremadamente bajo). , pero tiene un 100% de Aprobación, por lo que eventualmente cumplirá con los requisitos para ingresar al Período de Confirmación.
3. Continúe cumpliendo con los criterios antes mencionados durante el Período de Confirmación.
4. La propuesta planteada por el referéndum se promulgará exactamente en el mismo bloque cuando finalice el Período Mínimo de Promulgación; técnicamente, el iniciador del referéndum puede establecer los cambios en la red como se detalla en el referéndum para promulgar muchos bloques en el futuro, por lo que, de manera realista, la propuesta real El ciclo de vida de un referéndum individual podría abarcar muchos días, semanas, meses o años.

<robo-wiki-picture src='robonomics-opengov/3.jpeg' alt="picture" />

Podemos ver que en este ejemplo, el ciclo de vida del referéndum sería (aproximadamente) 17 días.


### Duración con mucha participación electoral (con una gran cantidad de votos AYE)

Ahora echemos un vistazo a un referéndum en el que el poseedor del token XRT, DAO, ha expresado mucho interés. En este ejemplo, asumiremos que se han producido ~248,771 XRT en la participación electoral general, y que todos los votantes están votando en la dirección AYE (nota: técnicamente en esta etapa de un referéndum raíz, según el track, solo el 60% de los votos debe estar en la dirección AYE para que un referéndum cumpla con los criterios de aprobación).

<robo-wiki-note title="Note:" type="warning">

 Consulte siempre la información de pista más actualizada para obtener información precisa con respecto a cada pista; puede encontrar más información en esta [hoja de cálculo](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

</robo-wiki-note>

En este ejemplo:
1. El Depósito de Decisión se publicó durante el Período de Preparación y, por lo tanto, pudo pasar al Período de Decisión al final del Período de Preparación.
2. Muchos votantes votaron en este referéndum, obteniendo una participación electoral de ~248,771 XRT en un período de tiempo relativamente corto.
3. Los votos fueron mayoritarios en la dirección AYE (cualquier valor superior al 60% AYE).
4. El referéndum cumple continuamente con los criterios del Período de Confirmación durante todo su Período de Confirmación (Nota: si un referéndum deja de cumplir con los criterios del Período de Confirmación, entonces regresa a su Período de Decisión).
5. La propuesta planteada por el referéndum se promulgará exactamente en el mismo bloque en que finalice el Plazo Mínimo de Sanción.

Debido al hecho de que hubo una participación de ~248,771 XRT, el referéndum cumplirá con los criterios para ingresar a su Período de Confirmación después de ~168 horas (7 días).

<robo-wiki-picture src='robonomics-opengov/4.jpeg' alt="picture" />

Podemos ver que en este segundo ejemplo, debido al hecho de que hubo una buena cantidad de participación electoral, el Período de Decisión en realidad terminó a la mitad de su tiempo máximo asignado. Resultando en un referéndum que puede promulgarse en ~10 días.


### Duración en la que el depósito de decisión nunca se publica

Ahora, echemos un vistazo a un referéndum que se originó, pero nunca se publicó su depósito de decisión. Dichos referendos se encuentran en una especie de estado de "limbo", donde su Período de Preparación ha finalizado, pero como el Depósito de Decisión no fue publicado, el referéndum permanece en el "Estado de Preparación".

<robo-wiki-picture src='robonomics-opengov/5.jpeg' alt="picture" />

Podemos ver que en este tercer ejemplo, debido al hecho de que el Depósito de Decisión nunca se publicó, el referéndum en realidad nunca entrará en el Período de Decisión, sino que permanecerá en el "Estado de Preparación". Esto significa que eventualmente, si nunca se publica un Depósito de Decisión, el referéndum expirará después de que haya transcurrido la duración especificada en la constante timeOut de la paleta.

Esto sucedió anteriormente en Kusama, donde se publicó un referéndum con orígenes de Root, pero debido a los altos requisitos de capital para publicar el Depósito de Decisión, el referéndum nunca entró en las últimas etapas de su ciclo de vida. Dicho referéndum concluye con la bandera de "tiempo agotado".


### Duración cuando el depósito de decisión se publica tarde

Finalmente, echemos un vistazo a un ejemplo en el que el depósito de decisión no se publicó durante bastante tiempo después de que se originó el referéndum. Esto sucedió anteriormente en Kusama, donde se publicó un referéndum con el origen Root, pero el creador tuvo que dedicar tiempo a encontrar a alguien con una gran cantidad de capital para publicar el Depósito de Decisión en su nombre.

<robo-wiki-picture src='robonomics-opengov/6.jpeg' alt="picture" />

En este último ejemplo, debido al hecho de que el Depósito de Decisión se publicó después de que finalizó el Período de Preparación, pero antes de que expirara el tiempo del referéndum, el ciclo de vida del referéndum es en realidad mucho más largo de lo normal, ya que entra en el Período de Decisión después una cantidad de tiempo más larga.

Es importante tener en cuenta que el poseedor del token DAO puede votar SÍ/NO en referendos que se encuentran en el Período de Preparación o estancados en el "Estado de Preparación".
