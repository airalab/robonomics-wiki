---
title: Substrate Cumulus Parachain Testsuite para mensajería entre cadenas 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


El objetivo principal de este proyecto es simplificar el desarrollo de tiempo de ejecución de parachain cuando se utilizan mensajes entre cadenas. 
Permite el desarrollo de código de tiempo de ejecución con pruebas de integración con un alto grado de repetibilidad y uso sencillo.
Automatiza la construcción, la construcción de una configuración de red predefinida (es decir, 1 cadena de relé + 2 parachains), la configuración de canales de envío de mensajes entre parachains y la ejecución de pruebas de mensajería, el envío de mensajes, utilizando llamadas al tiempo de ejecución, todo construido y compuesto en Python.

XCM Testsuite se utiliza para probar el ciclo de producción de Robobank, el conjunto de paletas de Substrate que permiten a los robots registrarse en parachains externos, recibir pedidos prepagos, ejecutarlos y recibir pagos utilizando tokens externos. Esto permite que los robots operen dentro de la red Robonomics con toda la infraestructura requerida, pero al mismo tiempo, ofrezcan sus servicios en cualquier otra parachain.

Un ejemplo de video está disponible en [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

Los principales pasos en el escenario de demostración son:
- lanzar la cadena de relé y dos parachains en un paquete de 6 procesos
- configurar canales de mensajes XCM entre parachains
- registrar un robot en ambos parachains
- crear un pedido para este robot en el parachain del cliente (reservando el pago para la finalización del pedido)
- enviar un mensaje XCM al parachain de Robonomics
- crear el registro de pedido "reflejado" en el parachain de Robonomics
- el robot acepta el pedido en el parachain de Robonomics
- enviar un mensaje XCM sobre la aceptación del pedido de vuelta al parachain del cliente
- aceptar el pedido en el parachain del cliente (reservando una tarifa de penalización por falta de finalización del pedido hasta la fecha límite del pedido)
- el robot completa el pedido en el parachain de Robonomics
- enviar un mensaje XCM sobre la finalización del pedido al parachain del cliente
- liquidar todos los pagos (el pago del cliente se transfiere al robot, así como la tarifa de penalización no utilizada)
- cerrar el pedido1


## Corriente ascendente
Este proyecto es un fork de
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
Contiene el código de las paletas de tiempo de ejecución que se están probando.
Al igual que en el código de nodo original, los parachains se encuentran en los catálogos "./pallets", "./runtime", "./node".

Diferencias con el "substrate-node-template" original:
- este tiempo de ejecución del recolector tiene un módulo de controlador HRMP y puede manejar mensajes de parachains hermanos
- tiempo de ejecución de prueba simulado listo para pruebas internas de XCM

## Construir y ejecutar
Configuración recomendada (altamente): 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[NOTA] La primera compilación puede llevar mucho tiempo, hasta varias horas en máquinas subóptimas.

[NOTA] El script funciona con las versiones FIJAS (hashes de confirmación) de Polkadot (Rococo) en la cadena de relé y parachains.

[NOTA] Por defecto, el script recrea el mismo entorno en cada lanzamiento, eliminando todos los estados anteriores. Este comportamiento se puede cambiar en "config.sh" utilizando el parámetro "PERSISTENT".


Ejecutar script de compilación y configuración.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Acciones básicas del script "init.sh":
 - leer la configuración (archivo "config.sh" con número de revisión, claves e identificadores de nodo iniciales, parámetro de persistencia de datos de cadena, etc.)
 - configurar paquetes del sistema operativo, Rust y Python
 - generar binarios separados para la cadena de relé y también para ambos parachains
    - los binarios se generarán en el subdirectorio ./bin. 
 - (opcional) eliminar todos los datos de cadena anteriores para todas las cadenas
    - desactivado si "PERSISTENT=1" está configurado en "config.sh"
 - se ejecuta como procesos separados (con PID y tuberías de E/S separadas):
    - validadores de la cadena de relé (es decir, 4 validadores de una revisión estable de Rococo en ejecución)
    - recolectores para parachain-100 (es decir, un solo recolector para el primer parachain que estás desarrollando)
    - recolectores para parachain-200 (es decir, un solo recolector para el segundo parachain que estás desarrollando)
 - imprime todos los puntos finales, puertos en la consola, lo que te permite estudiar cualquier cadena utilizando aplicaciones frontend (explorador, DApp)
 - sigue imprimiendo todos los datos de salida de todas las cadenas en la consola

[ADVERTENCIA] Después de iniciar, espera hasta que la red esté activa, asegúrate de que la finalización del bloque haya comenzado y de que los parachains estén registrados. Estos procesos deberían tardar aproximadamente 5 minutos (50 bloques x 6 segundos).

## Comprobando que la configuración inicial funciona 

Utiliza el frontend estándar de Polkdot y los puntos finales generados "--ws-port" para conectarte con cada nodo.
Abre [Polkadot application](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) para monitorear las cadenas. 

### Ejemplo:
Localhost, 4 validadores de cadena de relé, un recolector de parachain-100, un recolector de parachain-200:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


Si todo funciona y el consenso comienza, podemos proceder a ejecutar nuestros casos de prueba (en una nueva terminal).

### Prueba de paso de mensajes UMP
```bash
./scripts/init.sh ump
```
Crea un mensaje `Balance.transfer` en `parachain-100` y lo pasa a la cadena de relé.
Cuando la cadena de relé recibe el mensaje, transferirá 15 tokens de la cuenta `para 100` a la cuenta de Charlie.


### Prueba de paso de mensajes HRMP
```bash
./scripts/init.sh ump
```

Crea un mensaje `Balance.transfer` en `parachain-100` y lo pasa al `sibling 200`.
Antes de eso, dota a la cuenta `subl 100` con 1000 tokens y establece un canal de comunicación entre las parachains.
```bash
./scripts/init.sh hrmp
```
Los mensajes siguientes se pueden enviar ejecutando el subcomando `hrmpm`. No crea un canal y, por lo tanto, se ejecuta más rápido.
```bash
./scripts/init.sh hrmpm
```

### Más opciones
```bash
./scripts/init.sh help
```

## Testnet local

### Crear especificación de cadena personalizada
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Editar rococo_local.json, reemplazar los parámetros de saldos y autoridades con los tuyos.
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
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Clave de sesión de Polkadot grandpa para //Alice (criptografía ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Dirección de Polkadot para //Alice (criptografía sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Convertir rococo_local.json al formato sin procesar.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Para usar una nueva especificación de cadena, reemplaza el archivo rococo.json en el directorio ./config/ con este nuevo y vuelve a ejecutar la cadena.
```bash
./scripts/init.sh run
```
Puedes editar libremente el código. El comando anterior reconstruirá el proyecto y actualizará el nodo del colador antes de comenzar.
Cumulus es un software de prelanzamiento que aún está en desarrollo intenso.
Estamos utilizando un compromiso específico de polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15 18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

Puedes usar versiones más recientes del software. Para hacer esto, cambia POLKADOT_COMMIT en ./scipt/config.sh
al último compromiso de la rama `rococo-v1`, elimina ./bin/polkadot y ejecuta 
```bash
./scripts/init.sh run
```

Actualizar dependencias del proyecto del colador 
```bash
cargo update
./scripts/init.sh build
```
Es probable que algunas dependencias requieran nuevas características de la cadena de herramientas de Rust. Este proyecto se basa en Rust `nightly-2021-01-26`
Actualiza la versión de la cadena de herramientas de Rust en ./scripts/config.sh antes de compilar.

## Hackear parachain
[Agregar paleta externa](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - ¿debería estar probablemente en "más información"?
## Learn More

Consulta la [Plantilla de Nodo del Hub de Desarrolladores de Substrate](https://github.com/substrate-developer-hub/substrate-node-template) para obtener más información sobre la estructura de este proyecto, las capacidades que encapsula y la forma en que se implementan esas capacidades. Puedes obtener más información sobre [El camino de un bloque de parachain](https://polkadot.network/the-path-of-a-parachain-block/) en el blog oficial de Polkadot. [Taller de Paridad Cumulus](https://substrate.dev/cumulus-workshop/#/)
