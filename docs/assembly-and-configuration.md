# Connecting sensors to robonomics network
## Requiremets
* ESP8266 Node MCU v3
* particle sensor SDS011
* micro USB cable
* connecting wires
---
## Assembly
### Connection diagram

![scheme](./docs/images/sensors-connectivity/schema.jpg)

### Connecting SDS011

* Pin 1 (TX) -> (RX) Pin D1 (GPIO5)
* Pin 2 (RX) -> (TX) Pin D2 (GPIO4)
* Pin 3 (GND) -> GND
* Pin 4 (2.5m) -> unused
* Pin 5 (5V) -> VU
* Pin 6 (1m) -> unused

Sensor is sold with USB adapter and connection wires. You don't need USB adapter, so disconnect wires from it.

![disconnect](./docs/images/sensors-connectivity/2_assembly_usb.jpg)

You may connect it to ESP via connecting wires "Female-Male":

![f-m](./docs/images/sensors-connectivity/3_conn.jpg)

And connect them to your ESP according to the connection diagram.

Or you can use wires from USB adapter. Disconnect one wire: push on it with some sharp object and carefully pull the wire:

![extreme_con](./docs/images/sensors-connectivity/4_assembly_wires.jpg)

Insert it to last connector:

![extr](./docs/images/sensors-connectivity/5_wires1.jpg)

Then cut connector in the middle:

![cut](./docs/images/sensors-connectivity/6_assembly_wires2.jpg)

And connect them to ESP accoding to the connection diagram:

![esp_con](./docs/images/sensors-connectivity/6_esp_con.jpg)

---
## Device firmware
Download `airrohr-flasher` from the latest release for your OS. Releases you can find [here](https://github.com/airalab/sensors-connectivity/releases).
Connect ESP to computer via micro-USB and run flasher. 

### For Linux:
Firstly you need to get permission to USB port:
```bash
sudo usermod -a -G dialout $USER
```
Then restart computer.

Now you can run flasher (don't forget to give it permission to execute):
```bash
chmod +x airrohr-flasher-linux
./airrohr-flasher-linux
```
---
### For windows:
Unpack flasher and run it with double click.

---
Choose firmware (english or russian) and press upload. It will take a few minutes.

![flasher](./docs/images/sensors-connectivity/7_flasher.jpg)

---
## Configuration
Reboot your ESP (just reconnect USB to computer).
Then connect to airRohr--xxxxxxx wi-fi network and in your browser write address 192.168.4.1:

![menu](./docs/images/sensors-connectivity/8_menu1.jpg)

Go to Configuration and in Wi-Fi Settings add information about your wi-fi network:

![config](./docs/images/sensors-connectivity/9_W-fi.jpg)

Then press "Save configuration and restart" and ESP will connect to your wi-fi.

![save](./docs/images/sensors-connectivity/10_save.jpg)

---
Then you need to find ESP in local network (for that your computer and ESP must be in one network). You can do it using airrohr-flasher. Run it and go to Discovery and press Refresh, then you'll be able to see the address.

![addr](./docs/images/sensors-connectivity/11_flaser2.jpg)

---

Write in your browser ESP local address, go to Configuration and tick 'API Robonomics'. 

![robonomics](./docs/images/sensors-connectivity/12_APIrobonomics.jpg)

Then enable GPS and all sensors that you use and write your coordinates:

![gps](./docs/images/sensors-connectivity/13_gps.jpg)

Then press "Save configuration and restart".

---

## Results
Go to [sensors.robonomics.network](https://sensors.robonomics.network/#/), and you will see your sensor on the map.
![map](./docs/images/sensors-connectivity/14_map.jpg)
