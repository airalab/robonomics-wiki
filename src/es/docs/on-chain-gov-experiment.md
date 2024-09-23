---
title: Experimento de Gobierno en Cadena

---

¡En la actualidad, Polkadot es uno de los DAO más grandes del mundo! Hay muchos eventos interesantes ocurriendo en el ecosistema como parte del experimento de gobierno en cadena. Los desarrolladores de Robonomics sugieren que los participantes en el hackathon aumenten el nivel de inmersión en la comunidad de Polkadot integrando eventos relacionados con votaciones, nuevas solicitudes de tesorería, cambios de época y mucho más, en un sistema típico de hogar inteligente.


---

Este artículo discute la gestión del hogar inteligente a través de Robonomics Cloud como resultado de cualquier evento en el ecosistema de Polkadot. Aquí hay un ejemplo de cómo se puede encender una lámpara cuando se presenta una nueva propuesta en la red de Polkadot.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Requisitos

 - Instancia de Home Assistant instalada con integración de Robonomics. Los métodos de instalación se pueden encontrar [aquí](/docs/install-smart-home).
 - Nodo o gateway de Polkadot para la interacción. Por ejemplo - `wss://polkadot.api.onfinality.io`
 - Nodo o gateway de Robonomics para la interacción.
 - Cuenta creada en formato ED25519. La información se puede encontrar [aquí](/docs/sub-activate).
 - Haber creado una cuenta en una lista de dispositivos de la suscripción de Robonomics. Obtenga más información [aquí](/docs/add-user).
 - Direcciones del propietario y controlador de la suscripción.

Bibliotecas de Python:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Creando un Escucha de Polkadot

Primero, necesitas crear un script que escuche nuevos eventos en la red de Polkadot. En el ejemplo, seguiremos la creación de nuevas Propuestas.

Para mayor comodidad en las pruebas, se utilizó un nodo local de Polkadot en modo de desarrollo. Puedes encontrar el [manual de implementación aquí](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

Para conectarte a un nodo público, cambia el "POLKAD...La variable "POLKADOT_GATEWAY".

Código de ejemplo:


{% codeHelper {copy: true}%}

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Inicio del recuento de referendos:', data.value)
    if update_nr > 0:
        print('Recuento de referendos incrementado:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

Este script escuchará los cambios en el número actual de referendos y mostrará el número del último referendo.

### Pruebas

Ejecute el programa y abra [polkadot.js](https://polkadot.js.org/apps/#/explorer).
Para cambiar al nodo de desarrollo local, haga clic en el ícono en la esquina superior izquierda y aparecerá un menú lateral. Seleccione "Development" y "Local Node" en la parte inferior, luego haga clic en "Switch".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

Cambiará al nodo local. Vaya a la pestaña "Governance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

Cree una nueva preimagen. Deje un comentario en la red. Fírmelo y envíelo a la red.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

Recibirá su hash. Cópielo y vaya a la pestaña "Governance" -> "Referenda". Haga clic en "Submit Proposal". Dado que esta es una red de prueba, la mayoría de los campos configurables se pueden dejar como predeterminados. Pegue el hash de la preimagen y firme la propuesta.


{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

Después de enviarlo a la red, el programa detectará la nueva propuesta y mostrará los siguientes registros:

```
Inicio del recuento de referendos: 0
Recuento de referendos incrementado: 1## Conectando con el Hogar Inteligente

Ahora necesitamos agregar una interacción con el hogar inteligente después de crear una nueva propuesta.

Para esto, necesitamos conocer lo siguiente:
- Dominio del servicio
- Nombre del servicio
- Entidad objetivo
- Datos - deben ser de tipo "dict"

Veamos dónde encontrarlos. Abre la instancia instalada de Home Assistant. Ve a "Herramientas del Desarrollador -> Servicios", selecciona cualquier servicio y cambia al modo YAML. Consideremos el ejemplo de un interruptor.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"servicios"} %}{% endroboWikiPicture %}

La clave "service" contiene el dominio y el nombre del servicio. Todo antes del punto es el dominio, y todo después del punto es el nombre del servicio. También se necesita el campo de datos.

Para encontrar la entidad objetivo, ve a "Configuración -> Dispositivos y Servicios -> Entidades". Habrá una columna con "ID de entidad" - este es el parámetro de entidad objetivo requerido.

Ahora que conocemos todos los parámetros, veamos qué sucederá en el script.

El script se conectará al demonio IPFS local. (Si seguiste las instrucciones de configuración del hogar inteligente, ya tendrás el demonio IPFS en funcionamiento).

Primero, formaremos un comando en formato JSON. A continuación, el mensaje se cifra con las claves del usuario y del controlador.
Luego, el comando cifrado se guarda en un archivo y se agrega a IPFS. Después de eso, el hash IPFS resultante se envía a la paracadena de Robonomics a través de un extrínseco `Launch` a la dirección del controlador.
Cuando el controlador recibe el lanzamiento, descargará el archivo de IPFS, lo descifrará y llamará al servicio especificado en su interior.

El código completo es el siguiente:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# parte de polkadot
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# parte de Robonomics

# Credenciales de Robonomics
# La dirección del usuario debe estar en
```Dispositivos RWS
# La dirección del usuario debe ser ED25519
user_seed = "<FRASE_SECRETA>"
controller_address = "<DIRECCIÓN_CONTROLADOR>"
sub_owner_address = "<DIRECCIÓN_PROPIETARIO>"

# Comando
service_domain = "<DOMINIO>"  # El dominio es lo que está antes del punto en el nombre del servicio. Por ejemplo, "interruptor"
service_name = "<NOMBRE>"  # nombre: lo que viene después del punto en el nombre del servicio. Por ejemplo, "encender"
target_entity = "<ID_ENTIDAD>"  #  entity_id. Por ejemplo, "interruptor.caldera"
data = {}  # Debe ser un diccionario


def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Inicio del recuento de referendos:', data.value)

    if update_nr > 0:
        print('Aumento del recuento de referendos:', data.value)
        # Enviar lanzamiento a la dirección del controlador con el hash de IPFS
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"Resultado de la transacción: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    Encriptar mensaje con la clave privada del remitente y la clave pública del destinatario
    :param message: Mensaje a encriptar
    :param sender_keypair: Par de claves de la cuenta del remitente
    :param recipient_public_key: Clave pública del destinatario
    :return: mensaje encriptado
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# Formatear mensaje para lanzamiento
data['entity_id'] = target_entity
command = {'plataforma': service_domain, 'nombre': service_name, 'params': data}

message = json.dumps(command)
print(f"Mensaje: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# Encriptar comando
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"Mensaje encriptado: {message}")
filename = "archivo_temporal"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```python
result_ipfs  = result["Hash"]
    print(f"Hash de IPFS: {result_ipfs}")
    print(f"Hash de IPFS para el lanzamiento {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

si todo se hizo correctamente, verás los siguientes registros:
```
Mensaje: {"plataforma": "switch", "nombre": "encender", "parámetros": {"entity_id": "switch.boiler"}}
Mensaje encriptado: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
Hash de IPFS: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
Hash de IPFS para el lanzamiento 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Inicio del recuento de referendos: 0
Aumento del recuento de referendos: 1
Resultado de la transacción: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```