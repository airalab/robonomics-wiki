---
title: Puerta de Robonomics SLS

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - Firmware SLS 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**En este artículo configurarás la Puerta de Robonomics SLS. Instalarás el software necesario para la puerta, lo configurarás y lo conectarás a Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"puerta sls"} %}{% endroboWikiPicture %}

## Firmware

Primero necesitas instalar el firmware del microcontrolador de la puerta. Prepara la puerta configurando los interruptores `1` y `3` en la parte inferior de la Puerta SLS en `ON`, los demás deben estar en `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"puerta sls 13"} %}{% endroboWikiPicture %}

Conecta la puerta a tu Raspberry Pi a través del puerto USB tipo C en la puerta.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Clona el repositorio con el firmware en tu Raspberry Pi:

{% codeHelper { additionalLine: "nombre_usuario_rasppi@nombre_host_rasppi"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

Ve a `robonomics-hass-utils/esp_firmware/linux`. Para flashear la puerta SLS, necesitas ejecutar los scripts `Clear` y `Flash_16mb`.

{% codeHelper { additionalLine: "nombre_de_usuario_rasppi@nombre_de_host_rasppi"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Solución de problemas

Si tienes problemas al actualizar el firmware de la puerta, necesitas seguir estos pasos adicionales:

1. Asegúrate de tener instalado el módulo pySerial:

{% codeHelper { additionalLine: "nombre_de_usuario_rasppi@nombre_de_host_rasppi"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Da permisos de acceso al puerto USB a tu usuario y reinicia la computadora:

{% codeHelper { additionalLine: "nombre_de_usuario_rasppi@nombre_de_host_rasppi"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. En algunos casos, es necesario cambiar la configuración de ancho de banda en el script para actualizar el firmware. Abre el script `Flash_16mb.sh` con el editor `nano` y...Cambie el parámetro de baudios de `921600` a un valor más pequeño (por ejemplo, `115200`).

## Configuración

1. Desconecte la Puerta de enlace SLS de la computadora. Coloque los interruptores en la parte posterior de la puerta de enlace en la posición correcta. Los interruptores `5` (RX Zigbee a ESP) y `6` (TX Zigbee a ESP) deben estar en la posición `ON`, los demás deben estar en `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Conecte el cable de alimentación tipo C. La luz indicadora en el centro debería ponerse verde.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. En el primer arranque, la puerta de enlace comenzará a compartir Wi-Fi con el SSID `zgw****`. Conéctese a esta red. Tenga en cuenta que la señal puede ser bastante débil, por lo que es mejor mantener la puerta de enlace SLS más cerca de su computadora.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. Si la conexión es exitosa, se abrirá la interfaz web (o puede encontrarla en 192.168.1.1 dirección).

5. Verás la página de `Configuración de Wi-Fi`. Selecciona tu Wi-Fi e introduce la contraseña. Presiona el botón `Aplicar`. El gateway se reiniciará y se conectará a tu red Wi-Fi.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Encuentra la IP local del gateway SLS para acceder a la interfaz web. Para encontrarla, puedes usar la [aplicación móvil Fing](https://www.fing.com/products) o la [herramienta de línea de comandos nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). El nombre del gateway debería lucir así: `zgw****`. Abre la interfaz web del gateway pegando la IP del gateway en un navegador.

7. Ve a `Configuración` -> `Hardware` y asegúrate de que la configuración se vea como en la imagen. Corrige la configuración si es necesario y haz clic en el botón `Guardar`:

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

La tabla con los valores requeridos:

| Campo                    | Valor              |
|--------------------------|:-------------------|
| Módulo Zigbee            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Pin de reinicio Zigbee   | 18                 |
| Pin BSL Zigbee           | 19                 |
| Pin de botón de servicio  | 33 (pullUP - true) |
| Número de LEDs direccionables | 0                  |
| LED Rojo (o addr)        | 21                 |
| LED Verde                | 5                  |
| LED Azul                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Luego reinicia la puerta de enlace. Elige `Acciones` -> `Reiniciar sistema` en la esquina superior derecha.

9. Asegúrate de que la puerta de enlace funcione correctamente en la ventana de información de Zigbee. El estado del dispositivo debe ser `OK`.

10. Configura la adición automática de dispositivos a Home Assistant. Ve a `Zigbee` -> `Configuración` y luego elige `Descubrimiento MQTT de Home Assistant` y `Borrar estados`. Guarda los cambios y nuevamente **reinicia** la puerta de enlace SLS.

{% roboWikiNote {type: "warning"}%} Si ya tienes una puerta de enlace SLS activa en tu hogar y ahora estás configurando otrauno, entonces entrarán en conflicto entre sí. Para resolver este problema, necesitas cambiar el canal en el nuevo dispositivo. Para hacerlo, ve a `Zigbee` -> `Configuración` y cambia el canal a otro (por ejemplo, canal 15). {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## Emparejando SLS con MQTT

Después de configurar la Puerta de enlace SLS, necesitas conectarla a Home Assistant. Abre la interfaz web de la Puerta de enlace SLS y ve a `Configuración/Enlace` -> `Configuración MQTT`:

Agrega la dirección de tu broker (dirección del Raspberry Pi con Home Assistant en la red local, puedes encontrarla con la [aplicación móvil Fing](https://www.fing.com/products) o la [herramienta de línea de comandos nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), el puerto (por defecto es `1883`), tu nombre de usuario y contraseña del broker (que creaste anteriormente) y el nombre del tema (puedes elegir cualquiera). Además, la dirección IP del Raspberry Pi debe ser estática. Haz clic en `Habilitar` y `Retener estados`..

Guardar cambios. Ahora los dispositivos se mostrarán automáticamente en Home Assistant.

## Conectar Dispositivos

Conecta tus dispositivos yendo a `Zigbee` -> `Unirse`. Pon tus sensores en modo de emparejamiento, la forma más común de cambiar un dispositivo al modo de conexión es mantener presionado su botón de encendido o encenderlos/apagarlos 5 veces. Presiona el botón `Habilitar Unirse` para comenzar a buscar dispositivos Zigbee. Verás sensores activos.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Ahora puedes ir a la sección de [**Suscripción IoT**](/docs/sub-activate) y comenzar a activar la suscripción de Robonomics.