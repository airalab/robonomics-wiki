---
title: Gemelos Digitales
contributors: [nakata5321, PaTara43]

herramientas:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Imagina tener un dispositivo o sistema complicado que tiene varios módulos para mantener y requiere algunas cuentas para usar. Para mantener todos ellos en un solo lugar o para codificar alguna funcionalidad con cuentas separadas o, por ejemplo, para establecer diferentes fuentes de datos para diferentes flujos de información, se debe utilizar el módulo de Gemelos Digitales.**

{% roboWikiNote {title:"Nodo de Desarrollo", type: "warning"}%} Por favor, presta atención a que estos y los siguientes tutoriales se demuestran en una instancia local de Robonomics Node. Configura la tuya con [estas instrucciones](/docs/run-dev-node).
{% endroboWikiNote %}

## Resumen de la teoría
Cualquier cuenta puede crear y gestionar un Gemelo Digital. El Gemelo puede ser imaginado como una especie de tabla con el siguiente contenido:

| ID del GD | Nombre del Tema | Fuente    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Donde:
* **ID del GD** es un índice único de Gemelo Digital sin signo.
* **Nombre del Tema** es un dato hex `H256` o ASCII de longitud de 32 bytes, igual que el parámetro extrínseco [`Launch`](/docs/launch).
Por ejemplo: `0x1234....FF` o  `hello.parachain.robonomics.world`.
* **Fuente** - es alguna dirección de cuenta.

{% roboWikiNote {title:"Temas", type: "note"}%} Como se ha discutido anteriormente en la descripción general del extrínseco de Lanzamiento, el `H256` puede ser representado como un CID de IPFS codificado (ver [herramienta de Python](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) para eso).
Por lo tanto, los temas pueden ser utilizados como un almacenamiento de datos, por ejemplo, la descripción de un módulo de un Gemelo. {% endroboWikiNote %}


## Crear Gemelo Digital

### 1. Navega a Desarrollador -> Extrínsecos

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Elige digitalTwin -> crear en la lista desplegable de extrínsecos posibles

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

Envía la transacción. Aquí, no se necesitan parámetros para crear un Gemelo. Se le asignará un índice y solo el propietario del Gemelo Digital podrá agregar/modificar temas del Gemelo a partir de ahora.

El ID del Gemelo se puede encontrar en la página de descripción general del Explorador.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## Agregar Tema

### Elige digitalTwin -> setSource en la lista desplegable de extrínsecos posibles

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - ID del Gemelo Digital, que se ha obtenido en la página del Explorador.
* `tema` - nombre de tema `H256` previamente discutido. En esta imagen es una cadena de 32 símbolos.
* `fuente` - dirección de cuenta a asociar con el tema.

{% roboWikiNote {title:"Sobrescribir", type: "note"}%} Presta atención a que el tema puede ser sobrescrito con otra dirección de fuente si es necesario.{% endroboWikiNote %}

Firma y envía el extrínseco.

## Explorar

Puedes encontrar toda la información sobre Gemelos Digitales existentes en el módulo de almacenamiento `digitalTwin` de `Desarrollador -> Estado de la cadena`.

- Número total de Gemelos - `total()`;
- Propietario del Gemelo Digital - `owner(u32)`;
- Información sobre los temas de un Gemelo Digital - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}