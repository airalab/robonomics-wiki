---
title: Árbol de dispositivos (CPS)
contributors: [ensrationis]
---

El árbol de dispositivos describe tu instalación en la nube de Robonomics: un sitio, sus salas y los dispositivos que hay en ellas. Cada parte es un nodo. La cadena guarda la forma de la instalación y el último estado de cada nodo. No está pensada para grandes volúmenes de datos.

En el runtime, el árbol de dispositivos es el pallet `CPS` (sistemas ciberfísicos). Referencia técnica completa: [README del pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md).

## Nodos

- Cada nodo tiene un número (`NodeId`). Los números aumentan de uno en uno y nunca se reutilizan.
- Un nodo puede tener un padre. Un nodo sin padre es un nodo raíz.
- Un nodo tiene dos campos, ambos opcionales:
  - `meta`: una descripción que cambia poco, de hasta 1 KiB.
  - `payload`: el estado actual, de hasta 8 KiB.
- Los dos campos son bytes sin más. Tú eliges el formato, por ejemplo JSON.
- El padre de un nodo nunca cambia. Para mover un nodo, crea uno nuevo y borra el antiguo.
- Un nodo puede tener como máximo 100 hijos. Solo se puede borrar un nodo sin hijos.

<!-- -->

{% roboWikiNote {type: "warning", title: "Los datos son públicos"}%} Cualquiera puede leer todo lo que hay en el árbol de dispositivos. Cifra los datos antes de escribirlos si deben ser privados. La herramienta `cps` de [airalab/robins](https://github.com/airalab/robins) puede cifrarlos por ti. {% endroboWikiNote %}

## Scope

Un Scope es la parte del árbol que pertenece a una cuenta.

- Al crear un nodo raíz, también creas un Scope, y es tuyo.
- Cada nodo pertenece a la raíz de Scope más cercana por encima de él, o a su propio Scope si él mismo es raíz de Scope.
- Puedes convertir un nodo de tu árbol en la raíz de un nuevo Scope anidado. Un Scope anidado es un límite estricto: el propietario exterior y los permisos de acceso exteriores no tienen efecto dentro de él. Hay una excepción: el propietario del Scope que lo rodea directamente puede reemplazarlo.
- El propietario de un Scope nunca cambia. Para traspasar un Scope, se reemplaza: una cuenta autorizada a crear un Scope en su nodo raíz llama a `create_scope`. Eso genera un nuevo ID de Scope, quien llama pasa a ser el propietario y se borran todas las entradas de acceso anteriores.
- Un Scope tiene como máximo 32 nodos de profundidad, contados desde un nodo hasta su raíz de Scope. El árbol completo puede ser más profundo.
- Un Scope solo desaparece cuando se borra su nodo raíz.

## Acceso

El propietario del Scope puede hacer cualquier cosa dentro de él. Las demás cuentas necesitan una entrada de acceso, y solo el propietario puede concederla.

| Permiso | Permite |
|---|---|
| `Write` | `set_meta` y `set_payload` |
| `CreateScope` | `create_scope` |

- Una entrada se aplica en uno de dos modos: `Node` (un nodo) o `Subtree` (el nodo y todo lo que hay debajo, salvo dentro de Scopes anidados).
- Un Scope admite como máximo 32 entradas de acceso.
- Crear hijos, borrar nodos y conceder o revocar acceso no se puede delegar. Solo puede hacerlo el propietario.

En la hoja de ruta de 5.0 hay más permisos planificados (para transacciones, almacenamiento y cómputo). Todavía no están en el runtime.

## Cuentas de nodo

Un nodo puede vincularse a una cuenta, su identidad. Normalmente es la clave propia del dispositivo. Una cuenta solo puede ser la identidad de un nodo, así que se puede encontrar un nodo por la cuenta de su dispositivo.

- Solo el propietario del Scope puede establecer o borrar una identidad. No basta con el acceso `Write`.
- Si la identidad no es quien llama, la cuenta de identidad tiene que firmar un permiso. El permiso es la codificación SCALE de `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)`, firmada como bytes en bruto sin el envoltorio `<Bytes>`.
- Un permiso es válido como máximo un día (14 400 bloques). No se consume: funciona dentro de su Scope hasta que caduca. Reemplazar el Scope invalida los permisos antiguos.
- Un nodo raíz nuevo solo acepta como identidad la propia cuenta de quien llama.
- Al borrar un nodo se elimina su identidad.

## Llamadas

Polkadot.js muestra estos nombres en camelCase, por ejemplo `cps.createNode`.

| Llamada | Argumentos | Quién puede llamarla |
|---|---|---|
| `create_node` | `parent_id` (opcional), `meta` (opcional), `payload` (opcional), `identity` (opcional: una cuenta y, si hace falta, un permiso) | Nodo raíz: cualquier cuenta, que pasa a ser propietaria del Scope. Nodo hijo: el propietario del Scope del padre. |
| `set_meta` | `node_id`, `meta` (`None` lo elimina) | Titular de `Write` |
| `set_payload` | `node_id`, `payload` (`None` lo elimina) | Titular de `Write` |
| `delete_node` | `node_id` | Propietario del Scope. El nodo no debe tener hijos. Borrar una raíz de Scope borra el Scope y sus entradas de acceso. |
| `create_scope` | `node_id` | Titular de `CreateScope`. En la raíz de un Scope anidado, también el propietario del Scope que lo rodea. |
| `grant_access` | `node_id`, `principal`, `capability` (`Write` o `CreateScope`), `mode` (`Node` o `Subtree`) | Propietario del Scope |
| `revoke_access` | `node_id`, `principal`, `capability` | Propietario del Scope |
| `set_identity` | `node`, `identity`, `permit` (opcional) | Propietario del Scope |
| `clear_identity` | `node` | Propietario del Scope |

Eventos: `NodeCreated`, `MetaSet`, `PayloadSet`, `NodeDeleted`, `ScopeCreated`, `ScopeDeleted`, `AccessGranted`, `AccessRevoked`, `IdentitySet`, `IdentityCleared`.

## Leer el árbol

- Las lecturas simples son consultas de almacenamiento: `cps.nodes`, `cps.meta`, `cps.payload`, `cps.children`.
- El pallet también tiene funciones de vista (necesitan metadatos V16, que la cadena ofrece):
  - por número de nodo: `resolve_scope`, `has_capability`, `identity_of`, `node_by_identity`;
  - por cuenta de dispositivo: `parent`, `children`, `meta`, `payload`, `scope_of`, `address_capability`. Fallan con `MissingProjectedIdentity` si algún nodo del resultado no tiene identidad.
- En JavaScript, las funciones de vista son `api.view.cps.*`, lo que requiere una versión de `@polkadot/api` que las admita. En Rust están en el crate tipado `robonomics-runtime-subxt-api`.

## Límites y comisiones

| Límite | Valor |
|---|---|
| Tamaño de `meta` | 1024 bytes |
| Tamaño de `payload` | 8192 bytes |
| Profundidad de un Scope | 32 nodos |
| Hijos por nodo | 100 |
| Entradas de acceso por Scope | 32 |
| Validez de un permiso de identidad | 1 día (14 400 bloques) |

Son constantes del runtime. Cambiarlas requiere una actualización del runtime.

El árbol de dispositivos no exige depósito de almacenamiento. Pagas la comisión de transacción normal, que crece con el tamaño de los datos. Por ejemplo, en el momento de escribir esto, un nodo raíz con 100 bytes de `meta` y 100 bytes de `payload` cuesta unos 0,0003 XRT.

## Herramientas

- La herramienta de línea de comandos `cps` y la biblioteca de Rust `libcps` cubren todo el árbol de dispositivos. Consulta [Bibliotecas cliente](/docs/client-libraries/#cps-command-line-tool).
- También sirve cualquier cliente que pueda enviar extrinsics, por ejemplo `@polkadot/api`.
- Para dispositivos que no pueden comunicarse directamente con la cadena, consulta [Conectar dispositivos](/docs/connect-devices/).

## Lo que viene

Con las suscripciones (5.0, en desarrollo), el propietario del Scope podrá pagar las transacciones de los dispositivos del árbol, de modo que un sensor pueda escribir sin tener XRT propio. Todavía no está en el runtime.
