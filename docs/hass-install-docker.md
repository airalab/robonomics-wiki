---
title: Home Assistant Docker for Unix-like OS
contributors: [PaTara43]
tools:   
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics integration 1.1.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.14.0
    https://docs.ipfs.tech/
---

**This article contains instructions to upgrade your existing Home Assistant Docker (on a Unix-like OS) with Robonomics Integration.**

<robo-wiki-note type="warning" title="DISCLAIMER">

  Here, Robonomics integration and IPFS are to be installed along with existing Home Assistant Docker.

  1. This section is designed with an assumption that default Docker images and container of Home Assistant named 
  <u>homeassistant</u> are used.
  2. IPFS will be installed and run as a <u>systemd</u> service on the host machine.
  3. It is assumed that you have Python3.9 or higher installed.

</robo-wiki-note>

## Install

Download the installation script and run it with bash:

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_docker.sh
sudo bash install_integration_docker.sh
```

You will see the following output:

```shell
<...>
added /dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw
<...>
IPFS daemon installed and launched, use ipfs-daemon.service to manage.
<...>
Executing subversion-1.14.2-r1.pre-install
Executing busybox-1.35.0-r17.trigger
OK: 157 MiB in 165 packages
<...>
A    robonomics/utils.py
Checked out revision 120.
Integration downloaded!
```

<robo-wiki-note type="note" title="`custom_components` exists.">

  You may see an error like `mkdir: can't create directory 'custom_components': File exists`. This
  means that you have already installed some custom components and the folder exists. Ignore this message.

</robo-wiki-note>

Restart the container:

<robo-wiki-tabs>
  <robo-wiki-tab title="Docker">
    <pre>docker restart homeassistant</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="Docker Compose">
    <pre>docker compose restart</pre>
  </robo-wiki-tab>
</robo-wiki-tabs>


## Verify

Check that IPFS service is up and running:
```shell
systemctl status ipfs-daemon.service 
```

You will see the following output:

```
● ipfs-daemon.service - IPFS Daemon Service
     Loaded: loaded (/etc/systemd/system/ipfs-daemon.service; enabled; preset: enabled)
     Active: active (running) since Thu 2022-11-03 11:30:39 UTC; 14min ago
   Main PID: 4400 (ipfs)
      Tasks: 12 (limit: 4416)
     Memory: 141.9M
        CPU: 3min 5.031s
     CGroup: /system.slice/ipfs-daemon.service
             └─4400 /usr/local/bin/ipfs daemon
```

You will see the integration available while going through further steps of this tutorial.

Now that the integration is added to the folder of custom components of Home Assistant, you have two options:

- Whether you have MQTT integration installed and some Zigbee devices connected by either Zigbee2MQTT or any other hardware,
proceed to [Robonomics subscription activation](/docs/sub-activate) and Robonomics Integration configuration.
- Otherwise, navigate to [MQTT Broker](/docs/mqtt-setup/) installation where you also add MQTT integration to your Home
Assistant and connect your Zigbee devices to your Home Assistant via preferred hardware.
