---
title: Zigbee Adapter with Zigbee2MQTT Addon for Home Assistant OS

contributors: [Fingerling42]
tools:
  - Home Assistant OS 64-9.5 for RaspPi
    https://github.com/home-assistant/operating-system/releases/tag/9.5
  - Zigbee2MQTT Home Assistant Addon 1.30.2-1
    https://github.com/zigbee2mqtt/hassio-zigbee2mqtt/releases/tag/v1.30.2-1
---

**In this article you will set up your Zigbee adapter for HassOS.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

**If you have the [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (which has all of the necessary firmware), you can simply proceed with these instructions. However, if you have another adapter, the first thing you need to do is to flash it with Zigbee2MQTT software. You can find instructions for your device [here](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

## Zigbee2MQTT Addon Install

1. Go to the Add-on store, click ⋮ on the upper right corner and choose `Repositories`. Paste there the following link and press `ADD`:
```
https://github.com/zigbee2mqtt/hassio-zigbee2mqtt
```
2. Close the repository manager and refresh the page. Find `Zigbee2MQTT` addon and `INSTAL` it (do not confuse with Zigbee2MQTT Edge).

## Configuration and Run

1. Connect the Zigbee adapter to Raspberry Pi.

<robo-wiki-picture src="home-assistant/connect-stick.gif" />

2. Find the location of the adapter. For this open SSH Add-on and run the following command:

<code-helper copy additionalLine="Hass Command Line">

```bash
ha hardware info
```

</code-helper>

In output find the strings like this:

<code-helper additionalLine="Hass Command Line">

```bash
- attributes:
    DEVLINKS: /dev/serial/by-id/usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_0001-if00-port0
       /dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.1:1.0-port0
    DEVNAME: /dev/ttyUSB0
    DEVPATH: /devices/platform/scb/fd500000.pcie/pci0000:00/0000:00:00.0/0000:01:00.0/usb1/1-1/1-1.1/1-1.1:1.0/ttyUSB0/tty/ttyUSB0
    ID_BUS: usb
    ID_MODEL: CP2102_USB_to_UART_Bridge_Controller
    ID_MODEL_ENC: CP2102\x20USB\x20to\x20UART\x20Bridge\x20Controller
    ID_MODEL_ID: ea60
    ID_PATH: platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.1:1.0
    ID_PATH_TAG: platform-fd500000_pcie-pci-0000_01_00_0-usb-0_1_1_1_0
    ID_REVISION: "0100"
    ID_SERIAL: Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_0001
    ID_SERIAL_SHORT: "0001"
    ID_TYPE: generic
    ID_USB_DRIVER: cp210x
    ID_USB_INTERFACE_NUM: "00"
    ID_USB_INTERFACES: ':ff0000:'
    ID_VENDOR: Silicon_Labs
    ID_VENDOR_ENC: Silicon\x20Labs
    ID_VENDOR_ID: 10c4
    MAJOR: "188"
    MINOR: "0"
    SUBSYSTEM: tty
    TAGS: ':systemd:'
    USEC_INITIALIZED: "10937474053"
by_id: /dev/serial/by-id/usb-Silicon_Labs_CP2102_USB_to_UART_Bridge_Controller_0001-if00-port0
children: []
dev_path: /dev/ttyUSB0
name: ttyUSB0
subsystem: tty
sysfs: /sys/devices/platform/scb/fd500000.pcie/pci0000:00/0000:00:00.0/0000:01:00.0/usb1/1-1/1-1.1/1-1.1:1.0/ttyUSB0/tty/ttyUSB0
```

</code-helper>

In this example device connection directory is `/dev/ttyUSB0`.

3. Before starting Zigbee2MQTT you need to configure it. Click on `Configuration` in the Zigbee2MQTT addon. The basic options needs a few adjustments, change the following statements:

<robo-wiki-picture src="home-assistant/hassos-zigbee2mqtt-config.png" />

- In `serial` field add the device connection directory:

<code-helper copy>

```yaml
port: /dev/ttyUSB0
```

</code-helper>

- Leave `mqtt` field **empty when using the Mosquitto** broker addon, otherwise add in your MQTT details in the [proper format](https://www.zigbee2mqtt.io/guide/configuration/mqtt.html#server-connection).

4. Start the addon by going to `Info` and click `START`.

5. Wait till Zigbee2MQTT starts and press `OPEN WEB UI` to verify Zigbee2MQTT started correctly.

<robo-wiki-note type="warning">

  If you already have an active Zigbee adapter or gateway in your home, and you are now configuring another adapter, then they will conflict with each other. To solve this problem you need to change the channel on the new device.

  To do that you need to open Zigbee2MQTT Web UI, go to `Settings` → `Advanced` and change `ZigBee channel` field.

  You also will need to delete `coordinator_backup.json` to refresh channel on the adapter. To do this, open the SSH Add-on and find location of the zigbee2mqtt config and after that, restart Zigbee2MQTT addon:

</robo-wiki-note>

<code-helper additionalLine="Hass Command Line">

```bash
cd config/zigbee2mqtt
rm coordinator_backup.json
```

</code-helper>

## Pairing Device

1. Open Zigbee2MQTT Web UI and click on the `Permit join` button.

2. The most common way to switch a device to connect mode is to hold its power button or switch them on/off 5 times.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

3. When the device connects, you should see the it in the Zigbee2MQTT Web UI.

<robo-wiki-picture src="home-assistant/zigbee-2-mqtt-addon-ui.png" />

4. Now you should see the device with the same IEEE Address in your Home Assistant Web UI. Go to `Settings` -> `Devices & Services` -> `Devices`.

Now you can go to the [**IoT Subscription**](/docs/sub-activate) section and start activating the Robonomics subscription.