---
title: Suite de pruebas de Parachain de Cumulus Substrate para mensajería entre cadenas

contributors: [ddulesov, boogerwooger, tubleronchik] 
---

El objetivo principal de este proyecto es simplificar el desarrollo de tiempo de ejecución de parachain cuando se utilizan mensajes entre cadenas. Permite el desarrollo de código de tiempo de ejecución con pruebas de integración con un alto grado de repetibilidad y uso sencillo. Automatiza la construcción, la configuración de la red predefinida (es decir, 1 cadena de relé + 2 parachains), la configuración de canales de paso de mensajes entre parachains y la ejecución de pruebas de mensajería, envío de mensajes, utilizando llamadas al tiempo de ejecución, todo construido y compuesto en Python.

La Suite de Pruebas XCM se utiliza para probar el ciclo de producción de Robobank, el conjunto de paletas de Substrate que permiten a los robots registrarse en parachains externos, recibir pedidos prepagos, ejecutarlos y recibir pagos utilizando tokens externos. Esto permite que los robots operen dentro de la red de Robonomics con toda la infraestructura requerida, pero al mismo tiempo, ofrezcan sus servicios en cualquier otra parachain.

Un ejemplo de video está disponible en [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

Los principales pasos en el escenario de demostración son:
- lanzar la cadena de relé y dos parachains en un paquete de 6 procesos
- configurar canales de mensajes XCM entre parachains
- registrar un robot en ambos parachains
- crear un pedido para este robot en la parachain del cliente (reservando el pago para la finalización del pedido)
- enviar un mensaje XCM a la parachain de Robonomics
- crear el registro de pedido "reflejado" en la parachain de Robonomics
- el robot acepta el pedido en la parachain de Robonomics
- enviar un mensaje XCM sobre la aceptación del pedido de vuelta a la parachain del cliente
- aceptar el pedido en la parachain del cliente (reservando una tarifa de penalización por falta de finalización del pedido hasta la fecha límite del pedido)
- el robot completa el pedido en la parachain de Robonomics
- enviar un mensaje XCM sobre la finalización del pedido a la parachain del cliente
- liquidar todos los pagos (el pago del cliente se transfiere al robot, así como la tarifa de penalización no utilizada)
- cerrar el pedido

## Corriente arriba
Este proyecto es un fork de la
[Plantilla de Nodo del Centro de Desarrolladores de Substrate](https://github.com/substrate-developer-hub/substrate-node-template).
Contiene el código de las paletas de tiempo de ejecución que se están probando.
Como en el originalEl código de los parachains se encuentra en los directorios "./pallets", "./runtime", "./node".

Diferencias con el "substrate-node-template" original:
- este tiempo de ejecución del colador tiene un módulo manejador de HRMP y puede manejar mensajes de los parachains hermanos
- tiempo de ejecución de prueba simulado listo para pruebas internas de XCM

## Compilación y Ejecución
Configuración recomendada (altamente):
```
Ubuntu 20, 16 Gb de RAM, 8 CPU, 120 Gb de SSD
```
[NOTA] La primera compilación puede llevar mucho tiempo, hasta varias horas en máquinas subóptimas.

[NOTA] El script funciona con las versiones FIJAS (hashes de confirmación) de Polkadot(Rococo) en la cadena de retransmisión y los parachains.

[NOTA] Por defecto, el script recrea el mismo entorno en cada lanzamiento, eliminando todos los estados anteriores. Este comportamiento se puede cambiar en "config.sh" usando el parámetro "PERSISTENT".

Ejecutar el script de compilación y configuración.
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Acciones básicas del script "init.sh":
 - leer la configuración (archivo "config.sh" con número de revisión, claves e identificadores de nodos iniciales, parámetro de persistencia de datos de la cadena, etc.)
 - configurar paquetes del sistema operativo, Rust y Python
 - compilar binarios separados para la cadena de retransmisión y también para ambos parachains
    - los binarios se generarán en el subdirectorio ./bin.
 - (opcional) eliminar todos los datos de la cadena anteriores
    - deshabilitado si se establece "PERSISTENT=1" en "config.sh"
 - ejecutar como procesos separados (con PIDs y tuberías de E/S separadas):
    - validadores de la cadena de retransmisión (es decir, 4 validadores ejecutando una revisión estable de Rococo)
    - coladores para parachain-100 (es decir, un único colador para el primer parachain que estás desarrollando)
    - coladores para parachain-200 (es decir, un único colador para el segundo parachain que estás desarrollando)
 - imprimir todos los puntos finales, puertos en la consola, lo que te permite estudiar cualquier cadena utilizando aplicaciones frontend (explorador, DApp)
 - seguir imprimiendo todos los datos de salida de todas las cadenas en la consola

[ADVERTENCIA] Después de iniciar, espera hasta que la red esté activa, asegúrate de que la finalización del bloque haya comenzado y de que los parachains estén registrados. Estos procesos deberían.Se requieren aproximadamente 5 min (50 bloques x 6 seg).

## Verificación de que la configuración inicial funciona

Utilice el frontend estándar de Polkadot y los puntos finales generados "--ws-port" para conectarse con cada nodo.
Abra la [aplicación de Polkadot](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) para monitorear las cadenas.

### Ejemplo:
Localhost, 4 validadores de cadena de retransmisión, un colador de parachain-100, un colador de parachain-200:
- [Validador de retransmisión 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Validador de retransmisión 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Validador de retransmisión 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Validador de retransmisión 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Colador de Parachain-100](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Colador de Parachain-200](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)

Si todo funciona y el consenso ha comenzado, podemos proceder a ejecutar nuestros casos de prueba (en una nueva terminal).

### Prueba de paso de mensajes UMP
```bash
./scripts/init.sh ump
```
Crea un mensaje `Balance.transfer` en `parachain-100` y lo pasa a la cadena de retransmisión.
Cuando la cadena de retransmisión recibe el mensaje, transferirá 15 tokens de la cuenta `para 100` a la cuenta de Charlie.

### Prueba de paso de mensajes HRMP
```bash
./scripts/init.sh ump
```

Crea un mensaje `Balance.transfer` en `parachain-100` y lo pasa al `hermano 200`.
Antes de eso, dota a la cuenta `subl 100` con 1000 tokens y establece un canal de comunicación entre las parachains.
```bash
./scripts/init.sh hrmp
```
Los próximos mensajes se pueden enviar ejecutando el subcomando `hrmpm`. No crea un canal y, por lo tanto, se ejecuta más rápido.
```bash
./scripts/init.sh hrmpm
```

### Más opciones
```bash
./scripts/init.sh help
```

## Testnet Local### Crear especificación de cadena personalizada
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Edita rococo_local.json, reemplaza los parámetros de balances y autoridades con los tuyos.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

Dirección de Polkadot para //Alice//stash (criptografía sr25519).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
URI de clave secreta `//Alice//stash` es cuenta:
Semilla secreta:      

Clave pública (hex): 

ID de cuenta:       

Dirección SS58:     
```

Clave de sesión de grandpa de Polkadot para //Alice (criptografía ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
URI de clave secreta `//Alice` es cuenta:
Semilla secreta:      

Clave pública (hex): 

ID de cuenta:       

Dirección SS58:     
```

Dirección de Polkadot para //Alice (criptografía sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
URI de clave secreta `//Alice` es cuenta:
Semilla secreta:      

Clave pública (hex): 

ID de cuenta:       

Dirección SS58:     
```

Convertir rococo_local.json al formato crudo.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Para usar la nueva especificación de cadena, reemplaza el archivo rococo.json en el directorio ./config/ con este nuevo y vuelve a ejecutar la cadena.
```bash
./scripts/init.sh run
```
Puedes editar libremente el código. El comando anterior reconstruirá el proyecto y actualizará el nodo colador antes de comenzar.
Cumulus es un software de prelanzamiento que aún está en desarrollo intenso.
Estamos utilizando un commit específico de polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5)dbcd0987ed53f104e6e15)

Puedes usar versiones más recientes del software. Para hacerlo, cambia  POLKADOT_COMMIT  en ./scipt/config.sh
al último commit de la rama `rococo-v1`, elimina ./bin/polkadot, y ejecuta 
```bash
./scripts/init.sh run
```

Actualiza las dependencias del proyecto del recolector 
```bash
cargo update
./scripts/init.sh build
```
Probablemente algunas dependencias requieran nuevas características de la cadena de herramientas de Rust. Este proyecto se basa en Rust `nightly-2021-01-26`
Actualiza la versión de la cadena de herramientas de Rust en ./scripts/config.sh antes de compilar.

## Hack parachain
[Agregar paleta externa](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - ¿debería estar probablemente en "aprender más"?
## Aprender Más

Consulta el
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
para aprender más sobre la estructura de este proyecto, las capacidades que encapsula y la forma en
que esas capacidades están implementadas. Puedes aprender más sobre
[El Camino de un Bloque de Parachain](https://polkadot.network/the-path-of-a-parachain-block/) en el
blog oficial de Polkadot.
[Taller de Paridad Cumulus](https://substrate.dev/cumulus-workshop/#/)