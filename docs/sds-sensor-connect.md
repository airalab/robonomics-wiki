---
title: How to Connect SDS011 Sensor

contributors: [tubleronchik]
---

** Here is a step-by-step guide on how to connect your sensor to the Robonomics Sensors Network. Our sensors utilize the Robonomics firmware, which is an enhanced version of the sensor.community firmware. It includes additional sensors and has a modified data sending mechanism. **

1. Plug in the sensor into the socket to power it.
2. The board will create a Wi-Fi network named `RobonomicsSensor-xxxxxxxxx`. Connect to it from your phone or computer: you will see the authorization window (if not, open the browser and go to `192.168.4.1`).
3. Select your Wi-Fi network from the list (or write it yourself if it's not on the list) and fill in the password field.
<robo-wiki-note type="okay" title="INFO">
The sensor can only be connected to a 2.4GHz Wi-Fi network. 
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Write the coordinates of the place, where the sensor will be installed. You can obtain them from any maps or obtain it from the address using [this link.](https://www.latlong.net/convert-address-to-lat-long.html)
<robo-wiki-note type="warning" title="WARNING">
The sensor coordinates will then be displayed on a publicly available map. If you do not want to show your private information, write close, but not exact coordinates.
</robo-wiki-note> 
5. Click on `Save configuration and restart`. The board will reboot and connect to the specified Wi-Fi network.
6. Open [Robonomics sensors map](https://sensors.robonomics.network/#/) and find your place where you installed the sensor. In a couple of minutes you will be able to see your sensor with data on map.
<robo-wiki-picture src="sds-sensor-map.png"/>

