---
title: Install Integration in Home Assistant Docker
contributors: [PaTara43]
translated: false
tools:   
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2022.8.2
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics integration 1.1.0
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.14.0
    https://docs.ipfs.tech/
---

** This page is for those users who have Home Assistant Docker installed and running. Here will be a concise walk-through
the Robonomics Integration and IPFS installation process. After these instructions the user may proceed to [configuration part](/docs/iot-sub-setup)
of this manual.**

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. This script is intended to be used with default Docker images and container of Home Assistant named `homeassistant`.
  2. This script installs IPFS to the host machine and runs it as a `systemd` service. 
  3. It is assumed that you have Python3.9 or higher installed.

</robo-wiki-note>

## Install

Download the installation script and run it with bash:

```bash
wget https://raw.githubusercontent.com/LoSk-p/robonomics-hass-utils/main/raspberry_pi/install_integration_docker.sh
sudo bash install_integration_docker.sh
```

You will see the following output:

```
<...>
added /dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8
added /dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9
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
```bash
ubuntu@ubuntu:~$ systemctl status ipfs-daemon.service 
● ipfs-daemon.service - IPFS Daemon Service
     Loaded: loaded (/etc/systemd/system/ipfs-daemon.service; enabled; preset: enabled)
     Active: active (running) since Thu 2022-11-03 11:30:39 UTC; 14min ago
   Main PID: 4400 (ipfs)
      Tasks: 12 (limit: 4416)
     Memory: 141.9M
        CPU: 3min 5.031s
     CGroup: /system.slice/ipfs-daemon.service
             └─4400 /usr/local/bin/ipfs daemon

Nov 03 11:30:40 ubuntu ipfs[4400]: Swarm announcing /ip4/127.0.0.1/tcp/4001
Nov 03 11:30:40 ubuntu ipfs[4400]: Swarm announcing /ip4/127.0.0.1/udp/4001/quic
Nov 03 11:30:40 ubuntu ipfs[4400]: Swarm announcing /ip4/192.168.31.45/tcp/4001
Nov 03 11:30:40 ubuntu ipfs[4400]: Swarm announcing /ip4/192.168.31.45/udp/4001/quic
Nov 03 11:30:40 ubuntu ipfs[4400]: Swarm announcing /ip6/::1/tcp/4001
Nov 03 11:30:40 ubuntu ipfs[4400]: Swarm announcing /ip6/::1/udp/4001/quic
Nov 03 11:30:40 ubuntu ipfs[4400]: API server listening on /ip4/127.0.0.1/tcp/5001
Nov 03 11:30:40 ubuntu ipfs[4400]: WebUI: http://127.0.0.1:5001/webui
Nov 03 11:30:40 ubuntu ipfs[4400]: Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
Nov 03 11:30:40 ubuntu ipfs[4400]: Daemon is ready
```

You will see the integration available while going through further steps of this tutorial.


Now that the integration is added to the folder of custom components of Home Assistant, you may proceed to [configuration steps](/docs/iot-sub-setup).