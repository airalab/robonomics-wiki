---
title: Supported Hardware
 
contributors: [adeptvin1]
translated: true
---
## List of supported hardware by systems
### Feecc Engineer Workbench
The choice of equipment for the "Feecc Engineer Workbench" is determined by the financial capabilities of the company operating the system and the specifics of the chosen architecture.

Figures 1 and 2 show the Feecc Engineer Workplace architecture with decentralized and centralized system organization topology in a corporate environment.
![architec1](../images/feecc-system-architecture/picture1.png)

<p align="center">
Picture 1 - Feecc Engineer Workbench architecture with decentralized system organization topology in a corporate environment.
</p>

![architec2](../images/feecc-system-architecture/picture2.png)

<p align="center">
Picture 2 - Feecc Engineer Workbench architecture with centralized system organization topology in a corporate environment.
</p>

> **It is worth noting that these are not all the architectures described, and there are more economical options: one printer per group of desks, a monitor without touch screen input or no monitor at all. But RFID and barcode scanners, a single board or desktop computer, and a camera on each desk are mandatory.** 

#### **RFID scanner**

> A USB RFID scanner is needed to authorize engineers in the field with their internal badges. Incoming information is processed using the [feecc-hid-reader-daemon](https://github.com/Multi-Agent-io/feecc-hid-reader-daemon).

Required technical specifications:

  - Operating frequency - 125kHz.

*You can buy it [here](https://aliexpress.ru/item/1005003579675742.html?spm=a2g2w.productlist.0.0.190ad16cWCptVr&sku_id=12000026804509353).*

#### **Barcode scanner**

> The USB barcode scanner is necessary for identifying products by barcodes, sending commands to services and for the correct assignment of certificates. It is also used to read QR codes to identify certificates. The incoming information is also processed with the [feecc-hid-reader-daemon](https://github.com/Multi-Agent-io/feecc-hid-reader-daemon).

Required technical specifications:

  - Reading in two dimensions (desirable, but not required).

*You can buy it [here](https://aliexpress.ru/item/32902727438.html?spm=a2g2w.productlist.0.0.263d68c5fTwi8J&sku_id=10000009784771593).*

#### **Work computer**

> A small single-board computer. It processes signals from external devices (barcode scanner, RFID scanner), sends requests for printing images on the printer, starting and stopping video recording, sending data to IPFS and the Robonomics platform. It runs the following services: [feecc-workbench-frontend](https://github.com/Multi-Agent-io/feecc-workbench-frontend), [feecc-workbench-daemon](https://github.com/Multi-Agent-io/feecc-workbench-daemon), [feecc-hid-reader-daemon](https://github.com/Multi-Agent-io/feecc-hid-reader-daemon). An Internet connection via Wi-Fi or LAN is required.

It is worth specifying that any computer can be used instead of a single-payer computer with a monitor. The operating system [GNU/LINUX](https://www.gnu.org/) must be installed on it natively or through a virtual machine.

Minimum technical specifications:

  - Raspberry Pi4 4 GB RAM, it is possible to use an analogue.

*You can buy it [here](https://www.cytron.io/p-raspberry-pi-4-model-b-4gb).*

#### **Touch screen**

> The monitor is used by the employee to enter and view information about the current production step. It also displays hints for the engineer on the current stage.

Required technical specifications:

  - Touch screen (desirable but not necessary. Other input devices can be used).

*You can buy it [here](https://www.asus.com/Displays-Desktops/Monitors/Touch/VT168H/).*

#### **Label printer**

> The label printer is used to print QR codes and bar codes for further placement of labels on the product for identification and verification purposes. Interaction with the printer is carried out with the help of the [feecc-print-server](https://github.com/Multi-Agent-io/feecc-print-server).

Required technical specifications:

  - This option uses Brother model QL-800 printers.

*You can buy it [here](https://www.brother-usa.com/products/ql800).*

#### **IP Camera**

> IP camera for capturing production processes for inclusion in the product certificate. Located above the assembly area of the product. Interaction with the camera is performed using the [feecc-cameraman](https://github.com/Multi-Agent-io/feecc-cameraman) service.

Required technical specifications:

  - PoE power supply.
  - RSTP data transfer protocol.
  - This option uses Hikvision HiWatch DS-i200d

*You can buy it [here](https://www.hi-watch.eu/en-us/product/1986/ip-camera/bullet-camera/2-0-mp-ir-network-bullet-camera).*

> **The latest version [feecc-cameraman](https://github.com/Multi-Agent-io/feecc-cameraman) supports WEB cameras, so pay attention to this detail when choosing equipment.**

<robo-wiki-note type="warning">
The equipment shown below is used for several tables at once.
</robo-wiki-note>

#### **Router or switch that supports PoE 802.3af**

> Router or switch with PoE 802.3af support for powering IP cameras and connecting them to the [feecc-cameraman](https://github.com/Multi-Agent-io/feecc-cameraman) service. 

Required technical specifications:

  - PoE power on the output ports.
  - This variant used MikroTik hEX PoE - one for 3-4 workplaces + power supply.

*You can buy it with the following links: [router](https://mikrotik.com/product/RB960PGS) and [power adapter](https://mikrotik.com/product/48POW).*

#### **Optional, Fixed Server**

> A more powerful server than the single board computers. It can run [feecc-ipfs-gateway](https://github.com/Multi-Agent-io/feecc-ipfs-gateway), [feecc-print-server](https://github.com/Multi-Agent-io/feecc-print-server), [feecc-cameraman](https://github.com/Multi-Agent-io/feecc-cameraman). Can be located in place of one of the computers of the engineers' workplaces. The connection to the Internet is LAN.

Required technical specifications:

  - Intel® Xeon® E-2200 processor or equivalent
  - RAM from 8 Gb
  - Hard drive from 1 Tb
  - LAN network interface from 1 Gbit/s

*You can buy it [here](https://www.dell.com/en-us/shop/cty/pdp/spd/poweredge-r240/pe_r240_tm_vi_vp_sb).*

### Feecc Analitics

The only hardware required for the module to work is a local or remote server (virtual machine) on which the "Feecc Analytics" web application will run. Each authorized employee can access the web application from his/her computer with a username and password.