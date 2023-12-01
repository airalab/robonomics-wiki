---
title: IR Remote
contributors: [nakata5321]
---

Congratulations on acquiring the innovative infrared remote control! We are pleased that you have chosen our device to 
enhance the comfort in your home. This device not only provides you with the ability to efficiently control air conditioners 
but also boasts a range of unique features, such as:

- **Open Source Firmware:** Our remote is equipped with open-source firmware, meaning you have complete control over the device's functionality. Customize and reprogram it to suit your needs, making it the perfect companion for your comfort.

- **Local Network Operation Only:** Our remote operates exclusively within your local network, ensuring the security of your data. You can rest assured that your information remains safe and protected.

- **Ease of Use:** Despite its advanced technologies, this remote is designed with your comfort in mind. An intuitive interface and easy setup make it ideal for users of all categories.

Get ready for a new level of air conditioner management with our remote, and may your home always be set to maximum comfort!

## Hardware specification:

- Viewing angle 360°
- CPU: ESP32 series of SoCs, Xtensa 32-­bit LX6 microprocessor, up to 240 MHz
- Memory: 448 KB ROM, 520 KB SRAM, 8 MB FLASH
- Wireless protocol: IEEE 802.11b/g/n (2.4 GHz Wi-Fi)
- Input voltage: DC 5V USB-C (QC2, QC3, PD)
- Standby consumption: 95mA
- Weight: 36g


## How to setup

1) Take the device from the box and connect it to the computer. Then go the website [webflasher.robonomics.network](https://webflasher.robonomics.network/). You will see next:

<robo-wiki-picture src="ir-controller/web-interface.jpg" />

<robo-wiki-note type="warning"> Note! web flasher is working only with Google Chrome or Microsoft Edge browser.</robo-wiki-note>

In "Firmware" drop-box choose "IR REMOTE" option and next in "SELECT CHIP" choose "ESP32". Press "CONNECT" button.
A popup window will appear where you should select the serial port to which the device is connected. Then choose "INSTALL IR-REMOTE_EN". 
On next window you can make "clear installation" by check "erase device". Next and install. Wait until firmware will be uploaded to the IR controller.

## Configuration

After finishing the installation process Wi-Fi configuration popup will appear. Provide your wi-fi credentials, for connect the device to your wi-fi network. 

After setting up wi-fi you can visit device via "visit device" button. Later you can visit device via it's IP address in network. To find it you can use [Fing mobile app](https://www.fing.com/products) or 
[nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

<robo-wiki-picture src="ir-controller/tasmota.jpg" />

Go to "Configuration"->"Configure other". In "Template" string insert next:
```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```
If box "Activate" is disabled, enable it and press Save button.

Return to "main menu" and go to "Configuration" -> "Configure MQTT".
Provide your MQTT credentials here:

<robo-wiki-picture src="ir-controller/mqtt.jpg" />

That's all with ESP for now. Next step is install Home Assistant integration.

## Integration setup

This article assumes that you have Home Assistant and HACS. Go to HACS and add custom repository. For this press three dots in upper right corner, choose "custom repositories"
and insert this URL - `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. in Category choose "Integration". After that find it in search and install it. Don't forget to restart Home Assistant after all.

Let's open logs of the IR remote. For this go to proper local URL, or open again [webflasher.robonomics.network](https://webflasher.robonomics.network/) and choose "Tasmota IR" and "ESP32". Press "Connect", choose port.
Press visit device, and you will provide to device main page. Go to "Consoles" -> "console".

Point your IR remote control to the Robonomics IR remote and press buttons on your remote. You will get next log in console:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
You need information from "IRHVAC" topic. 

Open `configuration.yaml` file of our Home Assistant instance and insert next:
```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # Pick one of the following:
    # State is updated when the tasmota device receives an IR signal (includes own transmission and original remote)
    # useful when a normal remote is in use alongside the tasmota device, may be less reliable than the second option.
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # State is updated when the tasmota device completes IR transmission, should be pretty reliable.
    #state_topic: "stat/<your_tasmota_device>/RESULT"
    # Uncomment if your 'available topic' of Tasmota IR device are different (if device in HA is disabled)
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <temperature sensor in room> - # required to measure temperature in a room. e.x. sensor.kitchen_temperature
    humidity_sensor: None #optional - default None (e.x. sensor.kitchen_humidity)
    power_sensor: None #optional - default None (e.x. binary_sensor.kitchen_ac_power)
    vendor: "<Your vendor here>" #find your vendor in logs.
    min_temp: 16 #optional - default 16 int value
    max_temp: 32 #optional - default 32 int value
    target_temp: 26 #optional - default 26 int value
    initial_operation_mode: "off" # optional - default "off" string value (one of the "supported_modes")
    away_temp: 24 #optional - default 24 int value
    precision: 1 #optional - default 1 int or float value. Can be set to 1, 0.5 or 0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Use "fan_only" even if Tasmota shows "Mode":"Fan"
      - "auto"
      - "off" #Turns the AC off - Should be in quotes
      # Some devices have "auto" and "fan_only" switched
      # If the following two lines are uncommented, "auto" and "fan" should be commented out
      #- "auto_fan_only" #if remote shows fan but tasmota says auto
      #- "fan_only_auto" #if remote shows auto but tasmota says fan
    supported_fan_speeds:
      # Some devices say max,but it is high, and auto which is max
      # If you uncomment the following two, you have to comment high and max
      # - "auto_max" #woud become max
      # - "max_high" #would become high
      #- "on"
      #- "off"
      #- "low"
      - "medium"
      - "high"
      #- "middle"
      #- "focus"
      #- "diffuse"
      - "min"
      - "max"
      #- "auto"
    supported_swing_list:
      - "off"
      - "vertical" #up to down
      # - "horizontal" # Left to right
      # - "both"
    default_quiet_mode: "Off" #optional - default "Off" string value
    default_turbo_mode: "Off" #optional - default "Off" string value
    default_econo_mode: "Off" #optional - default "Off" string value
    hvac_model: "-1" #optional - default "1" string value
    celsius_mode: "On" #optional - default "On" string value
    default_light_mode: "Off" #optional - default "Off" string value
    default_filter_mode: "Off" #optional - default "Off" string value
    default_clean_mode: "Off" #optional - default "Off" string value
    default_beep_mode: "Off" #optional - default "Off" string value
    default_sleep_mode: "-1" #optional - default "-1" string value
    default_swingv: "high" #optional - default "" string value
    default_swingh: "left" #optional - default "" string value 
    keep_mode_when_off: True #optional - default False boolean value : Must be True for MITSUBISHI_AC, ECOCLIM, etc.
    toggle_list: #optional - default []
      # The toggled property is a setting that does not retain the On state.
      # Set this if your AC properties are toggle function.
      #- Beep
      #- Clean
      #- Econo
      #- Filter
      #- Light
      #- Quiet
      #- Sleep
      #- SwingH
      #- SwingV
      #- Turbo
```

Change all necessary statements in inserted part with values from console message. 

as result part of your configuration file should look similar to this
(in example unused statement was deleted):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "bangkok climate control"
    unique_id : "bangkok test climate"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #optional - default 16 int value
    max_temp: 31 #optional - default 32 int value
    target_temp: 25 #optional - default 26 int value
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Use "fan_only" even if Tasmota shows "Mode":"Fan"
      - "auto"
      - "off" #Turns the AC off - Should be in quotes
      # Some devices have "auto" and "fan_only" switched
      # If the following two lines are uncommented, "auto" and "fan" shoud be commented out
      #- "auto_fan_only" #if remote shows fan but tasmota says auto
      #- "fan_only_auto" #if remote shows auto but tasmota says fan
    supported_fan_speeds:
      # Some devices say max,but it is high, and auto which is max
      # If you uncomment the following two, you have to comment high and max
      # - "auto_max" #woud become max
      # - "max_high" #would become high
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #up to down

    hvac_model: "-1" #optional - default "1" string value

    keep_mode_when_off: True #optional - default False boolean value : Must be True for MITSUBISHI_AC, ECOCLIM, etc.

```

Save "configuration.yaml" and restart Home Assistant.
Once restarted you can add in LovelaceUI a new thermostat card and select the newly integrated AC.

<robo-wiki-picture src="ir-controller/thermo.jpg" />

If you have problem with GUI mode, switch to "CODE EDITOR" and write next:
```
type: thermostat
entity: climate.<your climate name>
```
