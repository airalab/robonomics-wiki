---
title: Aktualisieren Sie Ihren Home Assistant Docker für Unix-ähnliche Betriebssysteme
contributors: [PaTara43]
tools:   
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics Home Assistant Integration 1.1.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.17.0
    https://docs.ipfs.tech/
---

**Dieser Artikel enthält Anweisungen zum Upgrade Ihres bestehenden Home Assistant Docker (auf einem Unix-ähnlichen Betriebssystem) mit der Robonomics-Integration.**

<robo-wiki-picture src="home-assistant/ha_docker.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. Es wird angenommen, dass die Standard-Docker-Images und der Container von Home Assistant mit dem Namen <u>homeassistant</u> verwendet werden.
  2. IPFS wird als <u>systemd</u>-Dienst auf dem Host-Computer installiert und ausgeführt.
  3. Es wird angenommen, dass Sie [Python3.9](https://www.python.org/downloads/) oder höher installiert haben.

</robo-wiki-note>

## Installierenieren

Laden Sie das Installationsskript herunter und führen Sie es im Terminal aus:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_docker.sh
bash install_integration_docker.sh
```

</code-helper>

Sie sehen die folgende Ausgabe:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

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

</code-helper>

<robo-wiki-note type="note" title="Error: `custom_components` exists">

  Es kann ein Fehler wie `mkdir: can't create directory 'custom_components': File exists` auftreten. Dies bedeutet, dass Sie bereits diesen Ordner mit einigen benutzerdefinierten Komponenten installiert haben. Ignorieren Sie einfach diese Meldung.

</robo-wiki-note>

Container neu starten:

<robo-wiki-tabs>
  <robo-wiki-tab title="Docker">
    <code-helper additionalLine="rasppi_username@rasppi_hostname">
    <pre>docker restart homeassistant</pre>
    </code-helper>
  </robo-wiki-tab>
  <robo-wiki-tab title="Docker Compose">
    <code-helper additionalLine="rasppi_username@rasppi_hostname">
    <pre>docker compose restart</pre>
    </code-helper>
  </robo-wiki-tab>
</robo-wiki-tabs>


## Überprüfen

Überprüfen Sie, ob der IPFS-Dienst aktiv und ausgeführt ist:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

Sie sehen die folgende Ausgabe:

<code-helper additionalLine="rasppi_username@rasppi_hostname">


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

</code-helper>
