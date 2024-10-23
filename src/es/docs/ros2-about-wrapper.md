---
title: Acerca de Robonomics ROS 2 Wrapper
contributors: [Fingerling42]
tools:   
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**En este artículo, aprenderás sobre el paquete Robonomics ROS 2 Wrapper, que te permite utilizar todas las funciones de la paracadena Robonomics para cualquier robot compatible con ROS 2.**

La idea del paquete es envolver la API de la paracadena Robonomics proporcionada por [robonomics-interface](https://github.com/airalab/robonomics-interface) en nodos de ROS 2. El objetivo es proporcionar a los desarrolladores de ROS 2 una forma conveniente de integrar sus robots o dispositivos con las funciones de la paracadena. La lógica detrás de la integración de un dispositivo robótico es que se crea una dirección única para él en la paracadena Robonomics, que se utiliza para controlar el dispositivo o recibir su telemetría.

Las funciones disponibles incluyen:

* **Función de lanzamiento** — lanzar un dispositivo para ejecutar cualquier comando con un conjunto especificado de parámetros pasados como una cadena o un archivo.
* **Función de registro de datos** — publicar datos del dispositivotelemetría en forma de hash a la paracadena.
* **Uso de la suscripción a Robonomics** — la capacidad de enviar transacciones sin cargo.
* **Almacenamiento seguro de archivos** — para empaquetar y desempaquetar datos, se utiliza el [Sistema de Archivos Interplanetario](https://ipfs.tech/), que permite acceder a archivos mediante su hash único. Para un uso conveniente de IPFS, se incluye el soporte de [Pinata](https://www.pinata.cloud/), que permite fijar archivos IPFS para una descarga rápida.
* **Cifrado y descifrado de archivos** — protección de archivos con cifrado de clave pública.

Actualmente, el envoltorio está disponible en [implementación de Python](https://github.com/airalab/robonomics-ros2/).

## Arquitectura del Envoltorio

Arquitectónicamente, el envoltorio consta de un nodo trabajador (con los temas y servicios necesarios) y una clase de nodo básica que se puede utilizar para sus robots específicos.

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"Arquitectura del Envoltorio ROS 2"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — un nodo único para cada robot que sirve como punto de entrada a Web3. Envuelve los servicios para enviar registros de datos y recibir lanzamientos a través de Robonomics y permite descargar/subir archivos a IPFS. Este nodo está configurado por un archivo especial, que se describe a continuación. La afiliación de un nodo con un robot específico puede seres

especificado a través del espacio de nombres de ROS.
* `robonomics_ros2_robot_handler` — un nodo específico del robot basado en una clase básica `basic_robonomics_handler` para coordinar pubsub y el robot. Procesa lanzamientos y decide cuándo enviar registros de datos para controlar el robot.

## Instalando el Envoltorio

Para trabajar con el envoltorio, necesitas el siguiente software:

* Distribución del sistema operativo Linux (generalmente, Ubuntu)
* Distribución de ROS 2
* Nodo IPFS
* Python 3 (para la implementación en Python del envoltorio)

Por favor, sigue la guía de instalación disponible [aquí](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started) y verifica las versiones necesarias del software. Después de descargar los componentes requeridos, necesitarás [compilar](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#installation-and-building) el envoltorio como un paquete ROS 2 habitual utilizando la utilidad `colcon`.

## Configurando Conexiones a la Nube Web3

Antes de iniciar el envoltorio, necesitas configurar cómo se conectará tu robot a la nube descentralizada de Robonomics y a los servicios de soporte Web3. Para hacer esto, necesitas editar el archivo de configuración llamado `robonomics_pubsub_params_template.yaml`, el cual debe ser único para cada robot lanzado que necesite acceder a Robonomics.

El archivo contiene los siguientes campos de configuración:

| Campo                 | Descripción                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Semilla de cuenta de la paracadena de Robonomics                                                           |
| crypto_type           | Tipo de tu cuenta, `ED25519` o `SR25519`                                                                  |
| remote_node_url       | URL del nodo de Robonomics, el valor predeterminado es `wss://kusama.rpc.robonomics.network`, para un nodo local `ws://127.0.0.1:9944`|
| rws_owner_address     | Una dirección del propietario de la suscripción de Robonomics para usar el módulo RWS                     |
| ipfs_dir_path         | Una ruta de directorio para contener archivos IPFS                                                        |
| ipfs_gateway          | Puerta de enlace de IPFS para descargar archivos, por ejemplo, `https://ipfs.io`                           |
| pinata_api_key        | Clave API de [Pinata](https://www.pinata.cloud/) para el servicio de anclaje de IPFS                      |
| pinata_api_secret_key | Clave API secreta de [Pinata](https://www.pinata.cloud/) para el servicio de anclaje de IPFS              |

Para crear una cuenta en la paracadena de Robonomics, por favor utiliza [la siguiente guía](https://wiki.robonomics.network/docs/create-account-in-dapp/) en nuestra wiki. Por favor, presta atención al tipo de cuenta que creas, ya que las cuentas con tipo SR25519 no pueden usar cifrado de archivos.

{% roboWikiNote {type: "warning", title: "Advertencia"}%}

  La frase semilla es información sensible que permite a cualquier personaUtilice su cuenta. Asegúrese de no cargar un archivo de configuración con ella en GitHub o en cualquier otro lugar.
{% endroboWikiNote %}

Preste atención al campo `remote_node_url`, ya que le permite elegir cómo conectarse exactamente a la paracadena de Robonomics, incluso localmente. Puede implementar su instancia local de Robonomics para pruebas y desarrollo. Las instrucciones sobre cómo hacer esto están disponibles en [este artículo](https://wiki.robonomics.network/docs/run-dev-node/) en nuestra wiki.

Si tiene una suscripción a Robonomics que le permite enviar transacciones sin comisiones, inserte la dirección del propietario de la suscripción en el campo `rws_owner_address`. No olvide que su cuenta debe estar agregada a su suscripción. Las instrucciones sobre cómo activar su suscripción a Robonomics están disponibles en dos guías: a través de la [aplicación Robonomics](https://wiki.robonomics.network/docs/sub-activate/) con una interfaz fácil de usar o a través del [portal de sustrato de Robonomics](https://wiki.robonomics.network/docs/get-subscription/).

El parámetro `ipfs_gateway` le permite especificar la puerta de enlace a través de la cual se descargarán los archivos de IPFS. Estas pueden ser [puertas de enlace públicas](https://ipfs.github.io/public-gateway-checker/) o privadas especializadas (por ejemplo, las obtenidas en Pinata)