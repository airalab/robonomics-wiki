---
title: Cómo Conectar el Sensor SDS011

contributors: [tubleronchik]
---

**Aquí tienes una guía paso a paso sobre cómo conectar tu sensor a la Red de Sensores Robonomics y a Home Assistant. Nuestros sensores utilizan el firmware de Robonomics, que es una versión mejorada del firmware de sensor.community. Incluye sensores adicionales y tiene un mecanismo de envío de datos modificado.**

{% roboWikiNote {type: "warning"}%} Todos los dispositivos de Robonomics se pueden adquirir en la [página oficial](https://robonomics.network/devices/).
{% endroboWikiNote %}


## Configuración

1. Conecta el sensor al enchufe para encenderlo.
2. La placa creará una red Wi-Fi llamada `RobonomicsSensor-xxxxxxxxx`. Conéctate a ella desde tu teléfono o computadora: verás la ventana de autorización (si no, abre el navegador e ingresa a `192.168.4.1`).
3. Selecciona tu red Wi-Fi de la lista (o escríbela tú mismo si no está en la lista) y completa el campo de contraseña.
{% roboWikiNote {type: "warning", title: "INFO"}%} El sensor solo se puede conectar a una red Wi-Fi de 2.4GHz. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. Escribe las coordenadas del lugar donde se instalará el sensor. Puedes obtenerlas de cualquier mapa o obtenerlas desde la dirección utilizando [este enlace.](https://www.latlong.net/convert-address-to-lat-long.html)
{% roboWikiNote {type: "warning", title: "WARNING"}%} Las coordenadas del sensor se mostrarán en un mapa de acceso público. Si no deseas mostrar tu información privada, escribe coordenadas cercanas pero no exactas.
{% endroboWikiNote %}
5. Haz clic en `Guardar configuración y reiniciar`. La placa se reiniciará y se conectará a la red Wi-Fi especificada.
6. Abre el [mapa de sensores de Robonomics](https://sensors.robonomics.network/#/) y encuentra el lugar donde instalaste el sensor. En un par de minutos podrás ver tu sensor con datos en el mapa.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}ensor-map"} %}{% endroboWikiPicture %}

## Asistente de Inicio

Hay dos opciones de instalación disponibles:

### Opción 1: HACS

La forma más sencilla de agregar un Sensor Local Luftdaten es a través de HACS. [Aquí](https://hacs.xyz/docs/setup/download/) puedes encontrar una breve explicación sobre cómo configurar HACS.

Una vez instalado HACS, navega a HACS -> Integraciones y busca la integración `Local Luftdaten Sensor`. Haz clic en el botón de descarga y reinicia Home Assistant una vez que se haya descargado la integración.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### Opción 2: Instalación Manual

Bajo el usuario `homeassistant`, clona el repositorio del proyecto:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

</code-helper>

Si ya tienes integraciones personalizadas, copia el directorio `custom_components/local_luftdaten/` en tu directorio `custom_components`, por ejemplo:

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

Si no tienes integraciones personalizadas, copia todo el directorio `custom_components` en tu directorio de configuración de Home Assistant. Por ejemplo:

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Configuración

Crea una nueva entrada de sensor en tu `configuration.yaml` y ajusta el nombre del host o la dirección IP. Para encontrar la dirección IP local de tu sensor, puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). El nombre puede ser cualquiera.

|Parámetro              |Tipo    | Necesidad    | Descripción
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | requerido     | Dirección IP del sensor
|`scan_interval`        | número | por defecto: 180 | Frecuencia (en segundos) entre actualizaciones
|`name`                 | string | requerido    | Nombre del sensor
|`monitored_conditions` | lista   | requerido     | Lista de los sensores monitoreados


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Sensor de calidad del aire
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> Puede encontrar una lista de todos los sensores compatibles en el [repositorio](https://github.com/lichtteil/local_luftdaten).

Reinicie su Home Assistant.
Después de eso, puede agregar un sensor a su panel de control. El nombre de la entidad será el nombre que agregó a `configuration.yaml`.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}