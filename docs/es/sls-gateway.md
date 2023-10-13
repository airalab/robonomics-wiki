---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**En este artículo configurarás Robonomics SLS Gateway. Instalarás el software necesario para la puerta de enlace, lo configurarás y lo conectarás a Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Firmware

Primero debes instalar el firmware del microcontrolador de la puerta de enlace. Prepara la puerta de enlace configurando los interruptores `1` y `3` en la parte inferior de SLS Gateway en `ON`, los demás deben estar en `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

Conecta la puerta de enlace a tu Raspberry Pi a través del puerto USB tipo C en la puerta de enlace.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Clona el repositorio con el firmware en tu Raspberry Pi:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

Ve a `robonomics-hass-utils/esp_firmware/linux`. Para flashear la puerta de enlace SLS, debes ejecutar los scripts `Clear` y `Flash_16mb`.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### Solución de problemas

Si tienes problemas al actualizar el firmware de la puerta de enlace, debes seguir estos pasos adicionales:

1. Asegúrate de tener instalado el módulo pySerial:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. Otorga derechos de acceso al puerto USB a tu usuario y reinicia la computadora:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. En algunos casos, es necesario cambiar la configuración de ancho de banda en el script para actualizar el firmware. Abre el script `Flash_16mb.sh` con el editor `nano` y cambia el parámetro de velocidad de transmisión (`baud`) de `921600` a un valor más bajo (por ejemplo, `115200`).

## Configuración

1. Desconecta la puerta de enlace SLS de la computadora. Configura los interruptores en la parte posterior de la puerta de enlace en la posición correcta. Los interruptores `5` (RX Zigbee a ESP) y `6` (TX Zigbee a ESP) deben estar en la posición `ON`, los demás deben estar en `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Conecta el cable de alimentación tipo C. La luz indicadora en el centro debe ponerse verde.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. En el primer inicio, la puerta de enlace comenzará a compartir Wi-Fi con el SSID `zgw****`. Conéctate a esta red. Ten en cuenta que la señal puede ser bastante débil, por lo que es mejor mantener la puerta de enlace SLS más cerca de tu computadora. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. Si la conexión es exitosa, se abrirá la interfaz web (o puedes encontrarla en la dirección 192.168.1.1). 

5. Verás la página `Wi-Fi Settings`. Selecciona tu Wi-Fi e ingresa la contraseña. Presiona el botón `Apply`. La puerta de enlace se reiniciará y se conectará a tu red Wi-Fi. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. Encuentra la IP local de la puerta de enlace SLS para acceder a la interfaz web. Puedes usar la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) para encontrarla. El nombre de la puerta de enlace debe verse así: `zgw****`. Abre la interfaz web de la puerta de enlace pegando la IP de la puerta de enlace en un navegador.

7. Ve a `Setting` -> `Hardware` y asegúrate de que la configuración se vea como en la imagen. Corrige la configuración si es necesario y haz clic en el botón `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

La tabla con los valores requeridos:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Luego reinicia la puerta de enlace. Elige `Actions` -> `Reboot system` en la esquina superior derecha.

9. Asegúrate de que la puerta de enlace funcione correctamente en la ventana de información de Zigbee. El estado del dispositivo (`DeviceState`) debe ser `OK`.

10. Configura la adición automática de dispositivos a Home Assistant. Ve a `Zigbee` -> `Config` y elige `Home Assistant MQTT Discovery` y `Clear States`. Guarda los cambios y **reinicia** la puerta de enlace SLS.

<robo-wiki-note type="warning">

Si ya tienes una puerta de enlace SLS activa en tu hogar y ahora estás configurando otra, entrarán en conflicto entre sí. Para resolver este problema, debes cambiar el canal en el nuevo dispositivo. Para hacer esto, ve a `Zigbee` -> `Config` y cambia el canal a otro (por ejemplo, canal 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## Emparejamiento de SLS con MQTT

Después de configurar la puerta de enlace SLS, debes conectarla a Home Assistant. Abre la interfaz web de la puerta de enlace SLS y ve a `Settings/Link` -> `MQTT Setup`:


Agrega la dirección de tu broker (dirección de la Raspberry Pi con Home Assistant en la red local, puedes encontrarla con la aplicación móvil [Fing](https://www.fing.com/products) o la herramienta de línea de comandos [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), el puerto (por defecto es `1883`), tu nombre de usuario y contraseña del broker (que creaste anteriormente) y el nombre del tema (puedes elegir cualquier nombre). Además, la dirección IP de la Raspberry Pi debe ser estática. Haz clic en `Enable` y `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

Guarda los cambios. Ahora los dispositivos se mostrarán automáticamente en Home Assistant.

## Conectar Dispositivos

Conecta tus dispositivos yendo a `Zigbee` -> `Join`. Pon tus sensores en modo de emparejamiento, la forma más común de cambiar un dispositivo al modo de conexión es mantener presionado su botón de encendido o encender/apagarlos 5 veces. Presiona el botón `Enable Join`  para comenzar a buscar dispositivos Zigbee. Verás sensores activos.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


Ahora puedes ir a la sección [**Suscripción IoT**](/docs/sub-activate) y comenzar a activar la suscripción de Robonomics.
