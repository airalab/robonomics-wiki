---
title: Rüsten Sie Ihren Home Assistant Core auf
contributors: [PaTara43, makyul]
tools:   
  - Ubuntu Server 22.04.2 LTS for RaspPi
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2023.1.7
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.2.0
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.17.0
    https://docs.ipfs.tech/
---

**Dieser Artikel enthält Anweisungen zum Upgrade Ihres bestehenden Home Assistant Core mit der Robonomics-Integration.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. Es wird angenommen, dass die Installierenierenation Ihres Home Assistant Core gemäß den [offiziellen Anweisungen](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) abgeschlossen wurde und ein <u>homeassistant</u>-Benutzer sowie die `venv`-Umgebung vorhanden sind. Falls dies nicht der Fall ist, befolgen Sie die Anweisungen unten, **aber bearbeiten Sie das Skript entsprechend**.
  2. IPFS wird als <u>systemd</u>-Dienst auf dem Host-Computer installiert und ausgeführt.
  3. Es wird davon ausgegangen, dass Sie [Python3.10](https://www.python.org/downloads/) oder höher installiert haben.

</robo-wiki-note>

## Installieren

Laden Sie das Installationsskript herunter und führen Sie es im Terminal aus:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

Sie sehen die folgende Ausgabe:

<code-helper additionalLine="rasppi_username@rasppi_hostname">


```shell
<...>
https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_ipfs_arc_dependent.sh
<...>
IPFS daemon installed and launched, use ipfs-daemon.service to manage.
<...>
A    robonomics/utils.py
Checked out revision 125.
Integration downloaded!
```

</code-helper>

Während des Vorgangs werden Sie aufgefordert, die Neustartbestätigung für mehrere Dienste zu bestätigen. Navigieren Sie mit `Tab` zur Option `yes`.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  Es kann ein Fehler wie `mkdir: can't create directory 'custom_components': File exists` auftreten. Dies bedeutet, dass Sie bereits diesen Ordner mit einigen benutzerdefinierten Komponenten installiert haben. Ignorieren Sie einfach diese Meldung.

</robo-wiki-note>
  
Nach Abschluss starten Sie Ihren Home Assistant neu.

## Verifizieren

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
