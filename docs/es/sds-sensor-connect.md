---
title: Cómo conectar el sensor SDS011

contributors: [tubleronchik]
---

** Aquí hay una guía paso a paso sobre cómo conectar su sensor a la Red de Sensores Robonomics. Nuestros sensores utilizan el firmware de Robonomics, que es una versión mejorada del firmware de sensor.community. Incluye sensores adicionales y tiene un mecanismo de envío de datos modificado. **

1. Conecte el sensor al enchufe para alimentarlo.
2. La placa creará una red Wi-Fi llamada `RobonomicsSensor-xxxxxxxxx`. Conéctese a ella desde su teléfono o computadora: verá la ventana de autorización (si no, abra el navegador e vaya a `192.168.4.1`).
3. Seleccione su red Wi-Fi de la lista (o escríbala usted mismo si no está en la lista) y complete el campo de contraseña.
<robo-wiki-note type="okay" title="INFO">
El sensor sólo se puede conectar a una red Wi-Fi de 2,4 GHz.
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Escriba las coordenadas del lugar donde se instalará el sensor. Puede obtenerlas de cualquier mapa o obtenerlas de la dirección utilizando [este enlace.](https://www.latlong.net/convert-address-to-lat-long.html)
<robo-wiki-note type="warning" title="WARNING">
Las coordenadas del sensor se mostrarán en un mapa de acceso público. Si no desea mostrar su información privada, escriba cerca, pero no coordenadas exactas.
</robo-wiki-note> 
5. Haga clic en `Save configuration and restart`. La placa se reiniciará y se conectará a la red Wi-Fi especificada.
6. Abra [el mapa de sensores de Robonomics](https://sensors.robonomics.network/#/) y encuentre el lugar donde instaló el sensor. En un par de minutos podrá ver su sensor con datos en el mapa.
<robo-wiki-picture src="sds-sensor-map.png"/>

