---
title: Responsabilidad
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Para convertir a los robots en agentes económicos se necesita una herramienta de contrato para esto. ¡Conozca Responsabilidad - Robonomics pallet que implementa contratos entre cuentas de parachain!**

<robo-wiki-note type="warning" title="Dev Node">

  Por favor, preste atención a que este tutorial se muestra en una instancia local de Robonomics Node. Configure la suya con [estas instrucciones](/docs/run-dev-node).

</robo-wiki-note>

## Resumen de la teoría

En Ethereum había una estructura bastante complicada de interacción de responsabilidad. Puede familiarizarse con ella [aquí](/docs/robonomics-how-it-works). ¡Hoy en día las cosas son un poco más fáciles con Kusama!

### Negociaciones

Para firmar un contrato, las dos partes primero deben negociar. Esto se puede hacer de varias maneras, incluido [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) o Robonomics PubSub. Un ejemplo de código Python usando Robonomics PubSub es presentado [aquí](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Oferta y demanda son mensajes que contienen dos características principales de un contrato: **descripción del trabajo** y **precio**. El formato del mensaje debe ser diseñado por el usuario para cada aplicación específica. No es tan importante en el proceso de negociación seguir una regla de formato estricta. El flujo posible se presenta en la imagen a continuación.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Tenga en cuenta que PubSub es un protocolo abierto, por lo que no se deben transferir datos sensibles. Para esto, debe utilizar otros protocolos.

</robo-wiki-note>


### Firmas

Cuando las negociaciones finalizan con éxito, cada parte debe firmar el llamado acuerdo denominado firma. Este es un mensaje que contiene la descripción del trabajo y el precio **en un formato específico** firmado con una clave privada de la cuenta.
También existe una [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) para eso.
 - La descripción del trabajo se llama **técnicas**. Es una cadena de 32 bytes de longitud similar a un lanzamiento que puede ser un CID de IPFS codificado.
 - El precio se llama **economía**. Es un decimal XRT - Weiner. 1 Weiner = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  Se puede obtener un CID de [IPFS](https://ipfs.tech/) formateado de manera adecuada con la [biblioteca de Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  Cuando se utiliza la función `sign_liability`, no es necesario transformar el hash, se hará automáticamente.

</robo-wiki-note>

Siguiendo el ejemplo del café:

1. La tarea es un JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Su CID de IPFS es `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Por lo tanto, las **técnicas** (CID transformado) son `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **Economía** es `1.5 XRT`.

Cuando esté firmado, ¡es hora de crear una responsabilidad! Esto puede ser hecho por una de las partes (ya sea el prometido o el promisor) o por una cuenta de terceros de un proveedor llamado.

## Crear responsabilidad

### Preparativos

Como se mencionó anteriormente, al menos dos partes están involucradas en el proceso. Para este ejemplo, usemos tres y hagamos un proveedor separado para esto. Supongamos que las negociaciones ya tuvieron lugar de alguna manera.

### 1. Cree tres cuentas y añada fondos a ellas

<robo-wiki-picture src="liability/balances.jpg" />

Aquí hemos suministrado al proveedor con 100 XRT para firmar extrínsecos de responsabilidad, al prometido se le dieron 2 XRT para pagar por el trabajo.
Al promisor no se le concedieron fondos (excepto por un depósito existencial de al menos 1 mXRT).

### 1. Navega a Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Elija liability -> create en la lista desplegable de extrínsecos posibles

También elija una cuenta con la que desee enviar el extrínseco. Rellene todos los parámetros.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Firmas">

  Dado que aquí se utiliza un proveedor, no es necesario conocer las semillas de los participantes. Solo se necesitan sus firmas.

</robo-wiki-note>

### 3. Envía la transacción

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Revise su responsabilidad en los eventos

Para esto, vaya a `Network -> Explorer` y encuentre una lista de eventos a la derecha. Haga clic en un icono de triángulo para expandir.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  El hash se puede transformar en un CID IPFS con la misma [herramienta Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. Exploración de almacenamiento

También puede explorar algunas características de las responsabilidades en el módulo de almacenamiento `liability`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  La función de almacenamiento `Next Index` muestra el último índice de responsabilidad +1, por lo que aunque sea `1`, se explora la responsabilidad `0`.

</robo-wiki-note>

## Informes

Imagínese que se ha hecho un café y ahora la máquina de café necesita informarlo de alguna manera. Ahí es donde entran en escena los informes de responsabilidad. Como prueba de trabajo, la cuenta agrega otro CID de IPFS como contenido del informe al finalizar la responsabilidad existente. Esto nuevamente requiere una firma del promisor.

<robo-wiki-note type="note" title="Report signature">

  El mensaje firmado contiene el índice de responsabilidad existente y el CID IPFS del informe codificado en una representación de 32 bytes. Una vez más, la [herramienta de Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) puede ayudar a firmar el informe.

</robo-wiki-note>

Siguiendo con el ejemplo de la máquina de café:

1. El informe es un JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Su CID IPFS es `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Entonces la **carga útil** (CID transformado) es `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Índice** es `0`, es el índice de responsabilidad existente.

### 1. Navega a extrinsics, liability -> finalize(report)

Complete los parámetros y envíe extrínseco. Nuevamente, esto se puede hacer mediante una cuenta de terceros. 

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Presta atención a que la cuenta del promisor no debe estar "muerta" - debe tener el depósito existencial de al menos 1 mXRT.

</robo-wiki-note>

Firma y envía el informe. Cuando hayas terminado, puedes explorarlo en los eventos.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Explora los informes

También puedes observar el informe en el almacenamiento. Ve a `Developer -> Storage` y elige `liability` de la lista desplegable.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Verifica los saldos

En la imagen se muestra que ahora el promisor ha recibido el "salario". ¡La relación económica ha ocurrido!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  Por ahora no hay forma de verificar que el trabajo esté hecho, así que tan pronto como el promisor informe, los tokens se transfieren a su cuenta. 
  La función de verificación se agregará en el futuro.

</robo-wiki-note>