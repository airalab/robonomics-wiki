---
title: Sensor Setup

contributors: [LoSk-p, nakata]
translated: false
---

After assembling the board, now it's time to set up it.

Robonomics firmware is an extended version of the Sensor.Community firmware, with some sensors added and the data sending scheme changed. The source code can be found [at the link.](https://github.com/LoSk-p/sensors-software/tree/master/airrohr-firmware) 

If you receive Robonomics board, go to the ["Connect" section.](#robonomics-board)

## Requirements 

### Linux

First you need to add a user to the `dialout` group (for Ubuntu) to get access to the USB port:

```bash
sudo usermod -a -G dialout $USER
```

After that, reboot the computer. 
Next, download Robonomics  flasher `airrohr-flasher`. Download the executable from [releases](https://github.com/airalab/sensors-connectivity/releases). 

Then change the permissions of the file and run it:

```bash
chmod +x airrohr-flasher-linux
./airrohr-flasher-linux
```

### Windows

You need to install drivers for USB2serial (in Windows 10 should start automatically):

* Drivers for NodeMCU v3 (CH340): [Windows](http://www.wch.cn/downloads/file/5.html), alternative ([mirror.](https://d.inf.re/luftdaten/CH341SER.ZIP))

Then download [Robonomics  flasher `airrohr-flasher`](https://github.com/airalab/sensors-connectivity/releases), unzip the flasher and double-click to run it.

### MacOS

You need to install the drivers for USB2serial:
* Drivers for NodeMCU v3 (CH340): [macOS](http://www.wch.cn/downloads/file/178.html), alternative ([mirror](https://d.inf.re/luftdaten/CH341SER_MAC.ZIP))

Then download [Robonomics  flasher `airrohr-flasher`](https://github.com/airalab/sensors-connectivity/releases) and run it.

## Setup

Connect sensor to PC and run `airrohr-flasher` program. After opening program you will see the following:

![flasher](../images/sensors-connectivity/flasher.jpg)

**Board** field should automatically fill in. If not, choose the required port form the drop-down list.
 > If `airrohr-flasher` can not find your board, make sure you have done the **Requirements** part properly.

Next, select the firmware (in English or Russian) and click `Upload`. Uploading the firmware will take some time.

> If you later decide to change language or make "clear installation"(need to reset configuration), go to "Erase flash" page and press the button to erase the 
> flash memory of sensor. 

After downloading the firmware, reboot the ESP (just disconnect and reconnect the USB).

<robo-wiki-title :type="3" anchor="robonomics-board"> 
Connect
</robo-wiki-title>

A Some time after the reboot, ESP will create a Wi-Fi network named RobonomicsSensor-xxxxxxxxx. 
Connect to it from your phone or computer, then the authorization window will open (if it doesn't, open the browser and go to `192.168.4.1`). 
Select your Wi-Fi network from the list (or write it yourself if it's not on the list) and fill in the password field. Also write the coordinates of the place where the sensor will be installed in the field below:

![guest](../images/sensors-connectivity/guest.jpg)

Click `Save configuration and restart`.

The board will reboot and connect to the specified Wi-Fi network. Open [Robonomics sensors map](https://sensors.robonomics.network/#/) and find your home or other place where you installed the sensor. In a couple of minutes you will be able to see your sensor with data on map.

![map](../images/sensors-connectivity/14_map.jpg)

That's all with default installation. Here is a video with the full path of board assembling and setting up:

https://www.youtube.com/watch?v=OdTd1sacCso

For a more advanced setup - connecting additional sensors or sending data to your own server, read the next section.


## Additional configuration

First, you need to find the address of the sensor in your Wi-Fi network. To do this, you can use `airrohr-flasher` 
(your computer must be on the same network as the sensor). Start it and go to the `Discovery` tab, then press `Refresh`, 
wait a moment and your sensor address will appear.


![addr](../images/sensors-connectivity/disc_flaser.jpg)


Double-click on this address (or type it into your browser), you will get to the sensor menu:

![home](../images/sensors-connectivity/home.png)

### Add Sensor 

Under the `Configuration` tab you can configure the sensors:

![sensors](../images/sensors-connectivity/sensors.png)

Select the sensor you want to connect to the board and click `Save configuration and restart`.

### Custom API
You can also set up sending data to your own server. To do this, in the tab `APIs` check `Send to own API` and specify the server address and port (65 for sensors connectivity):

![apis](../images/sensors-connectivity/apis_en.png)

Click `Save and restart` to save the settings.
