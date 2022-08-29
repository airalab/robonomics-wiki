---
title: Sensor Setup

contributors: [LoSk-p, nakata]
translated: true
---

After assembling board, now it's time to set up it.

Robonomics firmware is extended version of the Sensor.Community firmware, with some sensors added and the data sending scheme changed. The source code can be found [at the link.](https://github.com/LoSk-p/sensors-software/tree/master/airrohr-firmware) 

## Requirements 

### Linux

First you need to add a user to the `dialout` group (for Ubuntu) to gain access to the USB port:

```bash
sudo usermod -a -G dialout $USER
```

After that, reboot the computer. 
Next, Download Robonomics  flasher `airrohr-flasher`. Download the executable from [releases](https://github.com/airalab/sensors-connectivity/releases). 

Then change the permissions of the file and run it:

```bash
chmod +x airrohr-flasher-linux
./airrohr-flasher-linux
```

### Windows

You need to install drivers for USB2serial (Windows 10 should start automatically):

* Drivers for NodeMCU v3 (CH340): [Windows](http://www.wch.cn/downloads/file/5.html), alternative ([mirror.](https://d.inf.re/luftdaten/CH341SER.ZIP))

Then download [Robonomics  flasher `airrohr-flasher`](https://github.com/airalab/sensors-connectivity/releases) and unzip the flasher and double-click to run it.

### MacOS

You need to install the drivers for USB2serial:
* Drivers for NodeMCU v3 (CH340): [macOS](http://www.wch.cn/downloads/file/178.html), alternative ([mirror](https://d.inf.re/luftdaten/CH341SER_MAC.ZIP))

Then download [Robonomics  flasher `airrohr-flasher`](https://github.com/airalab/sensors-connectivity/releases) and run it.



To flash the sensor you can use `airrohr-flasher`. Download the executable from [releases](https://github.com/airalab/sensors-connectivity/releases).
