---
title: Control Remoto IR
contributors: [nakata5321]
---
Este artículo te mostrará el proceso de configuración del control remoto IR.

{% roboWikiNote {type: "warning"}%} Todos los dispositivos de Robonomics se pueden adquirir en la página web oficial [website](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Paso 1 — Flasheo {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Todos los dispositivos de Robonomics vienen pre-flasheados de fábrica. Sin embargo, dado que todos los dispositivos son kits de desarrollo, las instrucciones cubrirán la opción de flashear el dispositivo desde cero. Si no deseas hacerlo ahora, continúa a [**Paso 2 - Punto de Acceso**](/docs/ir-controller/#step2). {% endroboWikiNote %}

Saca el dispositivo de la caja y conéctalo a la computadora. Luego ve al sitio web [webflasher.robonomics.network](https://webflasher.robonomics.network/). Este es el flasheador web.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} ¡Atención! El flasheador web solo funciona con los navegadores Google Chrome o Microsoft Edge. {% endroboWikiNote %}

En el menú desplegable "Firmware" elige la opción **"IR REMOTE"** y luego en "SELECT CHIP" elige **"ESP32"**. Presiona el botón **"CONNECT"**.
Aparecerá una ventana emergente donde debes seleccionar el puerto serie al que está conectado el dispositivo (generalmente es `/ttyUSB0`). Luego elige **"INSTALL IR-REMOTE_EN"**.
En la siguiente ventana, puedes hacer una **INSTALACIÓN LIMPIA** marcando **ERASE DEVICE**. Presiona Siguiente y luego Instalar. Espera hasta que el firmware se cargue en el controlador IR.

Después de finalizar el proceso de instalación, aparecerá una ventana emergente de configuración de Wi-Fi. Allí tienes opciones:

1) Puedes proporcionar las credenciales de Wi-Fi, omitir **Paso 2 - Punto de Acceso** y pasar a [**Paso 3 - Configuración**](/docs/ir-controller/#step3).

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Después de configurar el Wi-Fi, puedes visitar el dispositivo presionando el botón **VISIT DEVICE**. Más tarde, puedes visitar el dispositivo a través de su dirección IP en la red. Para encontrarla, puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

2) O desconecta el dispositivo de la computadora y conéctalo a la fuente de alimentación. El Control Remoto IR se iniciará y creará un punto de acceso Wi-Fi. Para conectar el Control Remoto IR a tu red Wi-Fi doméstica a través de un punto de acceso, sigue las instrucciones en el Paso 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Paso 2 — Punto de Acceso {% endroboWikiTitle %}

Si sacas el Control Remoto IR de la caja y lo conectas a la fuente de alimentación, creará un punto de acceso con el nombre "tasmota-XXXXXXX". Conéctate a él. Debería abrirse la ventana de configuración. Si no, abre un navegador web e ingresa a la página `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Proporciona las credenciales de Wi-Fi. Después de eso, el Control Remoto IR se conectará a la red Wi-Fi. Verifica el dispositivo a través de su dirección IP en la red. Para encontrarla, puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Paso 3 — Configuración {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Ve a **"Configuración"** -> **"Configurar otro"**. En la cadena **"Template"** inserta lo siguiente:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Control Remoto IR de Robonomics","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Verifica que estén habilitadas las casillas de verificación **"Activar"** y **"Habilitar MQTT"**. Si no lo están, actívalas y presiona el botón Guardar.

Regresa al **"Menú Principal"** y ve a **"Configuración"** -> **"Configurar MQTT"**.
Proporciona aquí tus credenciales MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Eso es todo por ahora con ESP. El siguiente paso es instalar la integración con Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Paso 4 — Configuración de la Integración {% endroboWikiTitle %}

Este artículo asume que tienes Home Assistant y HACS. Ve a HACS y agrega un repositorio personalizado.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Para hacer esto, presiona los tres puntos en la esquina superior derecha, elige **REPOSITORIOS PERSONALIZADOS**
e inserta esta URL: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. En Categoría elige "Integración". Después encuéntralo en la búsqueda e instálalo. No olvides reiniciar Home Assistant después.

Abre los registros del control remoto IR. Para hacerlo, ve a la URL local adecuada, o abre nuevamente [webflasher.robonomics.network](https://webflasher.robonomics.network/) y elige "Tasmota IR" y "ESP32". Presiona "Conectar" y elige el puerto.
Presiona **VISIT DEVICE**, y verás la página principal del dispositivo. Ve a "Consolas" -> "consola".

Apunta tu control remoto IR (por ejemplo, de un aire acondicionado) al Control Remoto IR de Robonomics y presiona los botones en el control remoto. Obtendrás el siguiente registro en la consola:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
Necesitarás la información del tema `IRHVAC`.

Abre el archivo `configuration.yaml` de tu instancia de Home Assistant e inserta lo siguiente:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Nombre Aquí>"
    command_topic: "cmnd/<tu_dispositivo_tasmota>/irhvac"
    # Elige una de las siguientes opciones:
    # El estado se actualiza cuando el dispositivo tasmota recibe una señal IR (incluye su propia transmisión y el control remoto original)
    # útil cuando se usa un control remoto normal junto con el dispositivo tasmota, puede ser menos confiable que la segunda opción.
    state_topic: "tele/<tu_dispositivo_tasmota>/RESULT"
    # El estado se actualiza cuando el dispositivo tasmota completa la transmisión IR, debería ser bastante confiable.
    #state_topic: "stat/<tu_dispositivo_tasmota>```>/RESULT"
    # Descomenta si los 'temas disponibles' de tu dispositivo IR Tasmota son diferentes (si el dispositivo en HA está deshabilitado)
    #availability_topic: "tele/<tu_dispositivo_tasmota>/LWT"
    temperature_sensor: <sensor de temperatura en la habitación> - # necesario para medir la temperatura en una habitación. p. ej. sensor.kitchen_temperature
    humidity_sensor: None #opcional - predeterminado None (p. ej. sensor.kitchen_humidity)
    power_sensor: None #opcional - predeterminado None (p. ej. binary_sensor.kitchen_ac_power)
    vendor: "<Tu proveedor aquí>" #encuentra tu proveedor en los registros.
    min_temp: 16 #opcional - valor predeterminado 16 entero
    max_temp: 32 #opcional - valor predeterminado 32 entero
    target_temp: 26 #opcional - valor predeterminado 26 entero
    initial_operation_mode: "off" # opcional - valor predeterminado "off" (uno de los "supported_modes")
    away_temp: 24 #opcional - valor predeterminado 24 entero
    precision: 1 #opcional - valor predeterminado 1 entero o flotante. Puede ser configurado en 1, 0.5 o 0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Usa "fan_only" incluso si Tasmota muestra "Mode":"Fan"
      - "auto"
      - "off" #Apaga el aire acondicionado - Debe estar entre comillas
      # Algunos dispositivos tienen "auto" y "fan_only" intercambiados
      # Si las siguientes dos líneas están descomentadas, "auto" y "fan" deberían estar comentados
      #- "auto_fan_only" #si el control remoto muestra ventilador pero Tasmota dice auto
      #- "fan_only_auto" #si el control remoto muestra auto pero Tasmota dice ventilador
    supported_fan_speeds:
      # Algunos dispositivos dicen max, pero es alto, y auto que es el máximo
      # Si descomentas los siguientes dos, debes comentar high y max
      # - "auto_max" #se convertiría en max
      # - "max_high" #se convertiría en high
      #- "on"
      #- "off"
      #- "low"
      - "medium"
      - "high"
      #- "middle"
      #- "focus"
      #- "diffuse"
      - "min"
      - "max"
      #- "auto"
    supported_swing_list:
      - "off"
      - "vertical" #de arriba abajo
      # - "horizontal" # De izquierda a derecha
      # - "both"
    default_quiet_mode: "Off" #opcional - valor predeterminado "Off"
    default_turbo_mode: "Off" #opcional - valor predeterminado "Off"
    default_econo_mode: "Off" #opcional - valor predeterminado "Off"
    hvac_model: "-1" #opcional - valor predeterminado "1"
    celsius_mode: "On" #opcional - valor predeterminado "On"
    default_light_mode: "Off" #opcional - valor predeterminado "Off"
    default_filter_mode: "Off" #opcional - valor predeterminado "Off"
    default_clean_mode: "Off" #opcional - valor predeterminado "Off"
    default_beep_mode: "Off" #opcional - valor predeterminado "Off"
    default_sleep_mode: "-1" #opcional - valor predeterminado "-1"
    default_swingv: "high" #opcional - valor predeterminado ""
    default_swingh: "left" #opcional - valor predeterminado ""
    keep_mode_when_off: True #opcional - valor predeterminado False: Debe ser True para MITSUBISHI_AC, ECOCLIM, etc.
    toggle_list: #opcional - valor predeterminado []
      # La propiedad alternada es una configuración que no conserva el estado de encendido.
      # Establece esto si las propiedades de tu aire acondicionado son de función alternada.
      #- Beep
      #- Clean
      #- Econo
      #- Filter
      #- Light
      #- Quiet
      #- Sleep
      #- SwingH
      #- SwingV
      #- Turbo
```

{% endcodeHelper %}

Cambia todas las declaraciones necesarias en la parte insertada con los valores del mensaje de la consola. Como resultado, una parte de tu archivo de configuración debería verse similar a esto
(en el ejemplo se eliminó la declaración no utilizada):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "control climático de Bangkok"
    unique_id : "prueba de clima de Bangkok"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #opcional - valor predeterminado 16 entero
    max_temp: 31 #opcional - valor predeterminado 32 entero
    target_temp: 25 #opcional - valor predeterminado 26 entero
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Usa "fan_only" incluso si Tasmota muestra "Mode":"Fan"
      - "auto"
      - "off" #Apaga el aire acondicionado - Debe estar entre comillas
      # Algunos dispositivos tienen "auto" y "fan_only" intercambiados
      # Si las siguientes dos líneas están descomentadas, "auto" y "fan" deberían estar comentados
      #- "auto_fan_only" #si el control remoto muestra ventilador pero Tasmota dice auto
      #- "fan_only_auto" #si el control remoto muestra auto pero Tasmota dice ventilador
    supported_fan_speeds:
      # Algunos dispositivos dicen max, pero es alto, y auto que es el máximo
      # Si descomentas los siguientes dos, debes comentar high y max
      # - "auto_max" #se convertiría en max
      # - "max_high" #se convertiría en high
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #de arriba abajo

    hvac_model: "-1" #opcional - valor predeterminado "1"

    keep_mode_when_off: True #opcional - valor predeterminado False: Debe ser True para MITSUBISHI_AC, ECOCLIM, etc.

```

Guarda `configuration.yaml` y reinicia Home Assistant.
Después de reiniciar, puedes agregar en la interfaz de usuario una nueva tarjeta de termostato y seleccionar el dispositivo recién integrado.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

Si tienes problemas con el modo GUI, cambia a "EDITOR DE CÓDIGO" y escribe lo siguiente:
```
type: thermostat
entity: climate.<nombre de tu clima>
```

{% roboWikiNote { type: "warning"}%} Todos los dispositivos de Robonomics se pueden comprar en el sitio web oficial [website](https://robonomics.network/devices/).{% endroboWikiNote %}