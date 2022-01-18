---
title: Connect Vacuum Cleaner
contributors: [LoSk-p, dergudzon, Leemo94]
translated: false
---

## Connect to Home Assistant

You need your vacuum to be connected to Mi Home app. If you haven't done this yet press `+` button on the top right corner, find your vacuum (it must be in connecting mode via a long press of the power button) and follow instructions in the app. For more details look at the user manual of your vacuum.

Open Home Assistant web page with this address:
```
http://<raspberry_address>:8123
```

Go to `Integrations` tab, press `Add integration` and choose `Xiaomi Miio`:

![integration](../images/home-assistant/integration.png)

Then fill your username (or phone) and password from Mi Home account and choose your country server:

![auth](../images/home-assistant/auth.png)

Press `Submit` and choose your Vacuum (Robot vacuum in this example):

![vacuum](../images/home-assistant/vacuum_int.png)

Then we need to setup action to control Vacuum through Robonomics. For that open a configuration file on your raspberry pi:

```bash
nano ~/.homeassistant/configuration.yaml
```

And add following to the end of the file (full config file you can find [here](https://github.com/airalab/robonomics-smarthome/blob/main/configuration.yaml)):

```yaml
automation:
  - alias: "vacuum_start"
    trigger:
      platform: webhook
      webhook_id: "vacuum_start"
    action:
      service: vacuum.start
      target:
        entity_id:
          - vacuum.robot_vacuum

  - alias: "vacuum_pause"
    trigger:
      platform: webhook
      webhook_id: "vacuum_pause"
    action:
      service: vacuum.pause
      target:
        entity_id:
          - vacuum.robot_vacuum

  - alias: "vacuum_return_to_base"
    trigger:
      platform: webhook
      webhook_id: "vacuum_return_to_base"
    action:
      service: vacuum.return_to_base
      target:
        entity_id:
          - vacuum.robot_vacuum
```
And restart Home Assistant:
```bash
systemctl restart home-sistant@homeassistant.service
```

Now you can create datalog in your account to command robot to Start Cleaning, to Pause or to Return to Base. The message must be encrypted. you can send encrypted message with [send_datalog.py](https://github.com/airalab/robonomics-smarthome/blob/main/python_scripts/send_datalog.py) script that you used in [Raspberry Setup](/docs/raspberry_setup) page.
Run the script in a new terminal with message to start cleaning:
```bash
cd /srv/homeassistant/python_scripts
source /srv/homeassistant/bin/activate
python3 send_datalog.py "{ \"agent\" : \"vacuum_start\" }"
```
to pause:
```bash
cd /srv/homeassistant/python_scripts
source /srv/homeassistant/bin/activate
python3 send_datalog.py "{ \"agent\" : \"vacuum_pause\" }"
```
to return to base:
```bash
cd /srv/homeassistant/python_scripts
source /srv/homeassistant/bin/activate
python3 send_datalog.py "{ \"agent\" : \"vacuum_return_to_base\" }"
```
