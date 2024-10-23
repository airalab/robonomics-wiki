---
title: Lanzar Robot desde la Nube
contributors: [Fingerling42]
tools:   
  - Envoltorio Robonomics ROS 2 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**En este artículo, aprenderás cómo utilizar la función de lanzamiento de Robonomics en ROS 2 a través de varios ejemplos**

La característica clave de la paracadena de Robonomics para enviar comandos a dispositivos es el extrínseco de lanzamiento. Esta función te permite enviar una cadena que contiene un parámetro (en forma de valor hexadecimal de 32 bytes de longitud) a una dirección especificada dentro de la paracadena. Normalmente, la cadena representa un hash de IPFS que apunta a un archivo con los parámetros necesarios para ejecutar el comando. Puedes encontrar más detalles sobre la función de lanzamiento [en este artículo](https://wiki.robonomics.network/docs/launch/).

En el Envoltorio Robonomics ROS 2, la función de lanzamiento se implementa como un servicio para enviar comandos y como un tema para recibir comandos.

## Enviando Lanzamiento

El servicio, llamado `robonomics/send_launch`, se ve de la siguiente manera:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"} %}

```YAML
string  param                   # Solo cadena de parámetros o nombre de archivo con parámetros que deben cargarse en IPFS
string  target_address          # Dirección que se activará con el lanzamiento
bool    is_file         True    # Es un parámetro de lanzamientoun archivo que necesita ser cargado en IPFS (predeterminado es Verdadero)?
bool    encrypt_status  Verdadero    # Verificar si el archivo de parámetros necesita ser encriptado con la dirección objetivo, predeterminado es Verdadero
---
cadena  launch_hash  # Hash de la transacción de lanzamiento
```

{% endcodeHelper %}

El servicio acepta los siguientes parámetros como parte de la solicitud: un parámetro de comando (ya sea una cadena simple o el nombre de un archivo que contiene los parámetros del comando), la dirección objetivo en la paracadena de Robonomics para enviar el lanzamiento, y dos indicadores: uno que indica si el parámetro es un archivo, y el otro especificando si el archivo debe ser encriptado (ambos están establecidos en verdadero de forma predeterminada). El archivo se cargará en IPFS, y su hash se pasará como parámetro de lanzamiento. Por lo tanto, el archivo debe colocarse en el directorio designado para archivos IPFS, como se especifica en el archivo de configuración para el nodo `robonomics_ros2_pubsub`.

Por defecto, el archivo se encripta utilizando la dirección pública del destinatario del lanzamiento. El método de encriptación aplicado es encriptación de clave pública basada en criptografía de curva elíptica Curve25519. En la implementación actual, la encriptación solo es compatible con direcciones de cuenta del tipo ED25519 (Edwards) (puedes leer más al respecto en [este artículo](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

Después de enviar el lanzamiento, el servicio devuelve el hash de la transacción.

## Recibiendo Lanzamiento

RecibiendoEl lanzamiento se organiza en forma de un tema correspondiente. Técnicamente, el nodo utiliza la funcionalidad de la interfaz de robonomics para suscribirse al estado de su propia dirección y espera a que aparezca el evento `NewLaunch`. Una vez que ocurre el evento, el nodo publica un mensaje en el tema `robonomics/received_launch`. El formato del mensaje es el siguiente:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # Dirección de la cuenta que envió el comando de lanzamiento
string  param                   # Cadena con parámetro o nombre del archivo con parámetros
```

{% endcodeHelper %}

Los campos del mensaje contienen la dirección desde la cual se envió el lanzamiento y el parámetro en sí: ya sea una cadena simple o el nombre del archivo con parámetros que se descargó de IPFS y se colocó en el directorio de trabajo de IPFS. Si el archivo estaba encriptado, se descifra durante este proceso.


## Ejemplo con Turtlesim

A continuación, demostraremos cómo utilizar la función de lanzamiento con [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) como ejemplo. Turtlesim es un simulador ligero diseñado para aprender ROS 2. Puedes instalarlo utilizando el siguiente comando:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

El paquete Robonomics ROS 2 Wrapper incluye un paquete preconstruido llamado `turtlesim_robonomics`, específicamente adaptado para Turtlesim. Este paquete te permite probar todas las funciones del envoltorio. Vamos a intentarlo y ejecutarlo.

{% roboWikiNote {type: "warning", title: "Advertencia"}%}

  Por favor, asegúrate de tener suficiente saldo en tu cuenta o una suscripción activa para realizar transacciones.

{% endroboWikiNote %}

1. Para empezar, crea un archivo de configuración para la instancia pubsub de `turtlesim_robonomics` utilizando la plantilla `config/robonomics_pubsub_params_template.yaml`. Completa los campos apropiados con tus credenciales de Robonomics (semilla de cuenta, tipo de criptomoneda, dirección del propietario de la suscripción). Además, especifica un directorio para los archivos de IPFS. Una vez completado, renombra el archivo, por ejemplo, `first_pubsub_params.yaml`.

2. Inicia el Demonio de IPFS:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. Ejecuta el siguiente archivo de lanzamiento de ROS 2. Iniciará todos los nodos necesarios: Turtlesim en sí, la implementación del envoltorio para Turtlesim y el pubsub de Robonomics:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params```.yaml namespace:='turtlesim1'
```

{% endcodeHelper %}

Verás el simulador con la tortuga, junto con los registros de ROS 2 en la consola que muestran la ID de IPFS, la ruta al directorio con archivos IPFS, la dirección de Robonomics y otra información relevante.

### Iniciar Turtlesim desde el portal de Polkadot

1. Turtlesim se controla a través del tema `/cmd_vel`, por lo que necesitas preparar los mensajes correspondientes e incluirlos en un archivo, que se utilizará como parámetro de inicio. Para mayor comodidad, estos mensajes se preparan en un archivo JSON. Crea un archivo (por ejemplo, `turtle_cmd_vel.json`) y pega lo siguiente:

  {% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
```    }
  ]
  ```

  {% endcodeHelper %}

  Este ejemplo JSON ordenará a la tortuga que se mueva dos veces.

2. A continuación, el archivo debe ser cargado en IPFS. Puedes elegir cualquier método, pero para este ejemplo, utilizaremos IPFS Kubo. Abre una terminal en el directorio donde se encuentra el archivo JSON y cárgalo en IPFS:

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  Recibirás el hash de IPFS del archivo. Asegúrate de guardarlo para usarlo más tarde.

3. Antes de enviar el lanzamiento, el hash de IPFS debe convertirse en una cadena de 32 bytes de longitud. Esto se puede hacer usando algunos comandos de Python. Abre una terminal, inicia el intérprete de Python 3 y ejecuta los siguientes comandos:

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('HASH_DEL_ARCHIVO_IPFS')
  ```

  {% endcodeHelper %}

  Guarda la cadena resultante para usarla más tarde.

4. Abre el portal de Robonomics [Polkadot/Substrate](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) y navegaDirígete a la pestaña **Desarrolladores** -> **Extrínsecos**. Selecciona el extrínseco `launch` -> `launch(robot, param)`. En el campo `robot`, inserta la dirección de tu robot, y en el campo `param`, inserta la cadena con el hash de IPFS convertido. Envía la transacción.

5. Ve al simulador Turtlesim. Después de enviar con éxito la transacción, la tortuga debería comenzar a moverse.

### Iniciar Turtlesim desde las Herramientas de Línea de Comandos de ROS 2

1. Ahora intentemos enviar un lanzamiento a Turtlesim desde otro nodo pubsub de ROS 2. Primero, crea otro archivo de configuración (por ejemplo, `second_pubsub_params.yaml`) con credenciales de Robonomics diferentes y un directorio IPFS separado.

2. En una terminal separada, ejecuta un nuevo nodo `robonomics_ros2_pubsub` utilizando el nuevo archivo de configuración:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. Coloca el archivo JSON que contiene los comandos para Turtlesim (`turtle_cmd_vel.json`) en el directorio IPFS del nuevo pubsub.

4. Antes de enviar el lanzamiento, configuremos la monitorización para observar cómo `turtlesim_robonomics` recibe. datos al llegar. Para hacer esto, en un terminal separado, suscríbete al tema correspondiente:

{% codeHelper { copy: true}%}

```shell
ros2 topic echo /turtlesim1/robonomics/received_launch
```

{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"} %}El manejador de lanzamiento espera, por defecto, un hash de IPFS de un archivo como parámetro. Si necesitas que el pubsub maneje el parámetro como una cadena regular, debes cambiar el parámetro del nodo ROS 2 correspondiente `launch_is_ipfs` de `True` a `False`. Puedes hacer esto usando el comando `ros2 param set`.
{% endroboWikiNote %}

5. Ahora, necesitamos llamar al servicio ROS 2 para enviar el lanzamiento. En un terminal separado, usa el siguiente comando:

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'TU_DIRECCIÓN_TURTLESIM'"}
```

{% endcodeHelper %}

Verás los registros del pubsub mostrando detalles del envío del lanzamiento.

6. Ve al simulador de Turtlesim. Después de enviar la transacción con éxito, la tortuga debería comenzar.

### Lanzar Turtlesim desde Otro Nodo

1. Ahora, intentemos crear un nodo de prueba que esperará a que llegue el lanzamiento y luego lo enviará a Turtlesim. Puedes utilizar el paquete de prueba predefinido `test_robot_robonomics`. Copia este paquete a tu espacio de trabajo de ROS 2.

2. Abre el archivo del nodo ubicado en `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` en cualquier editor de texto, y agrega el siguiente código después de la función `__init__`:

  {% codeHelper { copy: true}%}

  ```python
  def launch_file_subscriber_callback(self, msg) -> None:
      super().launch_file_subscriber_callback(msg)

      transaction_hash = self.send_launch_request(self.param, target_address='TU_DIRECCIÓN_DE_TURTLESIM', is_file=True, encrypt_status=True)

      self.get_logger().info('Se envió el lanzamiento a la tortuga con hash: %s ' % str(transaction_hash))
  ```

  {% endcodeHelper %}

  Esta función primero procesará el lanzamiento recibido y luego usará su parámetro para enviar un nuevo lanzamiento a Turtlesim.

3. Construye el paquete usando `colcon`, y luego fuentea sus archivos de configuración.

4. Ejecuta el archivo de lanzamiento de ROS 2 del paquete de prueba con las credenciales de pubsub secundarias:

{% codeHelper { copy: true}%}

```shell
ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
```

{% endcodeHelper %}

5. Ahora, envía un lanzamiento con los parámetros `turtle_cmd_vel.json` a la dirección del nodo de prueba, por ejemplo, a través del portal de Polkadot/Substrate. Antes de hacer esto, asegúrate de que Turtlesim siga en funcionamiento. El nodo de prueba debería recibir el lanzamiento y luego enviar uno nuevo con los mismos parámetros, haciendo que la tortuga en Turtlesim comience a moverse.