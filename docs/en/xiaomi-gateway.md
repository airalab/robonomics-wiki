---
title: Connect Sensors with Xiaomi Gateway
contributors: [LoSk-p, dergudzon, Leemo94]
translated: true
---

You need your Xiaomi gateway along with all the sensors to be connected to the Mi Home app. If you haven't done this yet press `+` button on the top right corner, find your hub (it must be in connecting mode which is achieved via a long press of the power button) and follow instructions in the app. After you add the gateway, you need to add sensors: press on your gateway, then go to `Child device` and press `+`. Find required device and follow the instructions on the screen. For more details refer to the user manual of your Xiaomi Gateway hub.

## Add Gateway to Home Assistant
Be sure that you're logged in you raspberry as `homeassistant` user, if not do the following:
```bash
sudo -u homeassistant -H -s
```

In your Home Assistant:
```
http://<raspberry_address>:8123
```
Go to `Configuration/Integrations` and press `Add Intagration`. There you need to Find `Xiaomi Miio`:

![integration](../images/home-assistant/integration.png)

Then fill your username (or phone) and password from Mi Home account and choose your country server:

![auth](../images/home-assistant/auth.png)

Press `Submit` and choose your Hub (Aqara Hub in this example):

![hub](../images/home-assistant/hub.png)

Press `Submit` and you will be able to see your gateway in Integrations page.

## Add Gateway to Home Assistant using Homekit Controller integration

You can also connect your hub to Aqara Home app on ios and then add it to Home Assistant through Homekit Controller integration. 

Add your hub to the app using `add device` or `+` button. Right after your hub added to Aqara Home app you will be proposed to bind it with your Homekit account. 

![homekit](../images/home-assistant/homekit.png)

When you see a menu like the picture, open your Home Assistant page:

```
http://<raspberry_address>:8123
```
Go to `Configuration/Integrations`. Here you can find your device discovered and click `Configure` button to add it by Homekit Controller integration. You have to enter pairing code of your device, which you can find on the sticker on your device.

![configure1](../images/home-assistant/configure1.png)

![configure2](../images/home-assistant/configure2.png)


## Configuration file

Then we need to setup action to send data to Robonomics. For that open a configuration file:

```bash
nano ~/.homeassistant/configuration.yaml
```

And add following to the end of the file (full config file you can find [here](https://github.com/airalab/robonomics-smarthome/blob/main/configuration.yaml)):

```
automation:
  - alias: "send_datalog_temperature_sensor"
    trigger:
      platform: time_pattern
      minutes: "/5"
    action:
      service: shell_command.send_datalog_temperature_sensor

  - alias: "send_datalog_contact_sensor"
    trigger:
      platform: state
      entity_id:
        - binary_sensor.contact_sensor
    action:
      service: shell_command.send_datalog_contact_sensor

shell_command:
  send_datalog_temperature_sensor: 'python3 python_scripts/send_datalog.py sensor_humidity={{ states("sensor.temperature_sensor_humidity") }} sensor_temp={{ states("sensor.temperature_sensor_temperature") }} sensor_battery={{ states("sensor.temperature_sensor_battery") }}'
  send_datalog_contact_sensor: 'python3 python_scripts/send_datalog.py sensor_contact={{ states("binary_sensor.contact_sensor") }}'
```

You can choose how often you want to send data with changing the value in `minutes: "/5"`.

>The names of the data in `shell_command` and `entity_id` like `sensor.temperature_sensor_humidity` or `binary_sensor.contact_sensor` may be different. You can find your option in `Configuration/Entities`. Find your sensor and copy Entity ID.
>
>![entity_id](../images/home-assistant/entity_id.png)

And restart Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```
 You can add the data from sensors to your homepage like in `Home Assistant setup` in the description to [Method 1](/docs/zigbee2MQTT/).

You can see the data in [subscan](https://robonomics.subscan.io/), find your account and you will see datalog transactions. Data looks like this:

![datalog_data](../images/home-assistant/datalog_data.png)

You can decrypt it with script [decrypt.py](https://github.com/airalab/robonomics-smarthome/blob/main/python_scripts/decrypt.py), download it:

```bash
cd /srv/homeassistant/python_scripts
wget https://raw.githubusercontent.com/airalab/robonomics-smarthome/main/python_scripts/decrypt.py
```
And run with the data from datalog:
```bash
cd /srv/homeassistant/
source bin/activate
python3 python_scripts/decrypt.py <data>
```