---
title: Gemelos digitales
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**Imagina tener un dispositivo o sistema complicado que tiene varios módulos para mantener y requiere algunas cuentas para usar. Para mantenerlos todos en un solo lugar o codificar alguna funcionalidad con cuentas separadas o, por ejemplo, establecer diferentes fuentes de registro de datos para diferentes flujos de información, se debe utilizar el módulo de Gemelo Digital.**

<robo-wiki-note type="warning" title="Dev Node">

  Por favor, preste atención de que estos tutoriales se demuestran en una instancia local de Robonomics Node. Configure la suya con [estas instrucciones](/docs/run-dev-node).

</robo-wiki-note>

## Resumen de la teoría
Cualquier cuenta puede crear y gestionar un Gemelo Digital. El Gemelo se puede imaginar como una especie de tabla con el siguiente contenido:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Donde:
* **DT id** es un índice de Gemelo Digital único sin firmar.
* **Topic name** es un dato hex `H256` o ASCII de longitud de 32 bytes, igual que [`Lanzamiento`](/docs/launch) parámetro extrínseco. 
Por ejemplo: `0x1234....FF` o `hello.parachain.robonomics.world`.
* **Source** - es alguna dirección de cuenta.

<robo-wiki-note type="note" title="Topics">

  Como se ha discutido anteriormente en la descripción general del extrínseco de lanzamiento, el `H256` se puede representar como un CID de IPFS codificado (ver
  [herramienta de Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) para eso).
  Por lo tanto, los temas también se pueden utilizar como almacenamiento de datos, por ejemplo, una descripción del módulo de un Gemelo.

</robo-wiki-note>


## Crear Gemelo Digital

### 1. Ir a Developer -> Extrinsics

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. Elegir digitalTwin -> create en la lista desplegable de posibles extrínsecos

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

Enviar la transacción. Aquí no se necesitan parámetros para crear un Gemelo. Se le otorgará un índice y solo el propietario del Gemelo Digital podrá agregar/modificar temas del Gemelo a partir de ahora.

El ID del Gemelo se puede encontrar en la página de descripción general del Explorador.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## Agregar Tema

### Elegir digitalTwin -> setSource en la lista desplegable de posibles extrínsecos

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - Digital Twin ID, que se ha obtenido en la página de Esplorar.
* `topic` - nombre del tema `H256` discutido anteriormente. En esta imagen es una cadena de 32 símbolos.
* `source` - dirección de cuenta para asociar con el tema.

<robo-wiki-note type="note" title="Overwrite">

  Presta atención a que el tema se puede sobrescribir con otra dirección de origen si es necesario.

</robo-wiki-note>

Firmar y enviar el extrínseco.

## Explore

Puedes encontrar toda la información sobre los Gemelos Digitales existentes en el módulo de almacenamiento `digitalTwin` del estado de la cadena en `Developer -> Chain state`.

- Número total de Gemelos - `total()`;
- Propietario del Gemelo Digital - `owner(u32)`;
- Información sobre los temas de un Gemelo Digital - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />