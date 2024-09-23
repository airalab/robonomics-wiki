---
title: Responsabilidad
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Para convertir robots en agentes económicos se necesita una herramienta de contrato para esto. ¡Conoce Liability - la paleta de Robonomics que implementa contratos entre cuentas de paracadena!**

{% roboWikiNote {title:"Nodo de Desarrollo", type: "warning"}%} Por favor, presta atención de que este tutorial se muestra en una instancia local de Robonomics Node. Configura la tuya con [estas instrucciones](/docs/run-dev-node).
{% endroboWikiNote %}

## Resumen de la Teoría

En Ethereum, existía una estructura bastante complicada de interacción de responsabilidad. Puedes familiarizarte con ella [aquí](/docs/robonomics-how-it-works). ¡Hoy en día las cosas son un poco más fáciles con Kusama!

### Negociaciones

Para firmar un contrato, las dos partes necesitan negociar primero. Esto puede hacerse de varias maneras, incluyendo [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) o Robonomics PubSub. Se presenta un ejemplo de código en Python que utiliza Robonomics PubSub [aquí](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

La oferta y la demanda son mensajes que contienen dos características principales de un contrato: **descripción del trabajo** y **precio**. El formato del mensaje debe ser diseñado por el usuario para cada aplicación específica. No es tan importante seguir una regla estricta de formato en el proceso de negociación. El flujo posible se presenta en la imagen a continuación.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} Ten en cuenta que PubSub es un protocolo abierto, por lo que no se deben transferir datos sensibles. Para esto, debes usar otros protocolos.
{% endroboWikiNote %}

### Firmas

Cuando las negociaciones han concluido con éxito, cada parte necesita firmar su acuerdo llamado firma. Este es un mensaje que contiene la descripción del trabajo y el precio **en un formato específico** firmado con la clave privada de la cuenta. También hay una [herramienta en Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) para eso.
 - La descripción del trabajo se llama **técnicas**. Es una cadena de 32 bytes de longitud similar a un lanzamiento que puede ser un CID de IPFS codificado.
 - El precio se llama **economía**. Es un decimal XRT - Weiner. 1 Weiner = 10**-9 XRT.

{% roboWikiNote {title:"32 bytes", type: "note"}%} Se puede obtener un CID de [IPFS](https://ipfs.tech/) formateado de manera adecuada con la [biblioteca de Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes). Al usar la función `sign_liability`, no es necesario transformar el hash, se hará automáticamente.{% endroboWikiNote %}

Siguiendo el ejemplo del café:

1. La tarea es un JSON
```json
{"task": "hacer_espresso", "descripción": "Hacer una taza de espresso"}
```
2. Su CID de IPFS es `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Entonces las **técnicas** (CID transformado) son `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. La **economía** es `1.5 XRT`.

Una vez firmado, ¡es hora de crear una responsabilidad! Esto puede ser hecho por una de las partes (ya sea el prometedor o el promisor) o por una cuenta de un tercero llamado proveedor.

## Crear Responsabilidad

### Preparativos

Como se mencionó anteriormente, en el proceso participan al menos dos partes. Para este ejemplo, usemos tres y creemos un proveedor separado para esto. Supongamos que las negociaciones ya tuvieron lugar de alguna manera.

### 1. Crea tres cuentas y añade fondos a ellas

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

Aquí hemos suministrado al proveedor con 100 XRT para firmar extrínsecos de responsabilidad, al prometedor se le dio 2 XRT para pagar por el trabajo. Al promisor no se le otorgaron fondos (excepto por un depósito existencial de al menos 1 mXRT).

### 1. Ve a Desarrollador -> Extrínsecos

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Elige responsabilidad -> crear en la lista desplegable de extrínsecos posibles

También elige la cuenta con la que deseas enviar el extrínseco. Rellena todos los parámetros.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Firmas", type: "note"}%} Dado que se utiliza un proveedor aquí, no es necesario conocer las semillas de los participantes. Solo se necesitan sus firmas.
{% endroboWikiNote %}

### 3. Envía la transacción

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. Revisa tu responsabilidad en los eventos

Para esto, ve a `Red -> Explorador` y encuentra una lista de eventos a la derecha. Haz clic en un ícono de triángulo para expandir.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Hash", type: "note"}%} El hash se puede transformar en un CID de IPFS con la misma [herramienta en Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).
{% endroboWikiNote %}

### 5. Exploración de almacenamiento

También puedes explorar algunas características de las responsabilidades en el módulo de almacenamiento `liability`.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Próximo Índice", type: "note"}%} La función de almacenamiento `Próximo Índice` muestra el último índice de responsabilidad +1, por lo que aunque sea `1`, se explora la responsabilidad `0`.
{% endroboWikiNote %}

## Informes

Imagina que se ha hecho un café y ahora la máquina de café necesita informarlo de alguna manera. Aquí es donde entran en escena los informes de responsabilidad. Como prueba de trabajo, la cuenta agrega otro CID de IPFS como contenido de informe al finalizar la responsabilidad existente. Esto nuevamente requiere una firma del promisor.

{% roboWikiNote {title:"Firma del informe", type: "note"}%} El mensaje firmado contiene el índice de responsabilidad existente y el CID de IPFS del informe codificado en una representación de 32 bytes. Una vez más, la [herramienta en Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) puede ayudar a firmar el informe.
{% endroboWikiNote %}

Siguiendo con el ejemplo de la máquina de café:

1. El informe es un JSON
```json
{"informe": "¡Café hecho! Tiempo de ejecución - 80 segundos."}
```
2. Su CID de IPFS es `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Entonces el **carga** (CID transformado) es `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. El **índice** es `0`, es el índice de responsabilidad existente.

### 1. Ve a extrínsecos, responsabilidad -> finalizar(informe)

Rellena los parámetros y envía el extrínseco. Nuevamente, esto puede ser hecho por una cuenta de un tercero.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Depósito existencial", type: "warning"}%} Presta atención de que la cuenta del promisor no debe estar "muerta" - debe tener el depósito existencial de al menos 1 mXRT.
{% endroboWikiNote %}

Firma y envía el informe. Cuando esté listo, puedes explorarlo en los eventos.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. Explora los informes

También puedes observar el informe en el almacenamiento. Ve a `Desarrollador -> Almacenamiento` y elige `responsabilidad` en la lista desplegable.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. Verificar saldos

En la imagen se muestra que ahora el promisor ha recibido el "salario". ¡La relación económica ha ocurrido!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %} {% endroboWikiPicture %}

{% roboWikiNote {title:"Verificación", type: "nota"}%} Por ahora no hay forma de verificar que el trabajo se haya completado, por lo que tan pronto como el promisor informe, los tokens se transfieren a su cuenta. La función de verificación se agregará en el futuro.
{% endroboWikiNote %}