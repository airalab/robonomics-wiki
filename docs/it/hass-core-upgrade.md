---
title: Aggiorna il tuo Home Assistant Core
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

**Questo articolo contiene istruzioni per aggiornare il tuo Home Assistant Core esistente con l'integrazione di Robonomics.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. Si presume che l'installazione del tuo Home Assistant Core sia stata completata in conformità alle [istruzioni ufficiali](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) e che ci sia un utente <u>homeassistant</u> e l'ambiente `venv`. Se non è il caso, segui le istruzioni di seguito, **ma modifica lo script di conseguenza**.
  2. IPFS verrà installato ed eseguito come un servizio <u>systemd</u> sulla macchina host.
  3. Si presuppone che tu abbia [Python 3.9](https://www.python.org/downloads/) o versione successiva installata.

</robo-wiki-note>

## Installaare

Scarica lo script di installazione ed eseguilo nel terminale:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

Vedrai il seguente output:

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

Durante il processo, ti verrà chiesto di confermare il riavvio di diversi servizi. Navigando con `tab`, seleziona l'opzione `yes`.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  Potresti vedere un errore come `mkdir: can't create directory 'custom_components': File exists`. Questo significa che hai già questa cartella con alcuni componenti personalizzati installati. Ignora semplicemente questo messaggio.

</robo-wiki-note>
  
Dopo aver finito, riavvia il tuo Home Assistant.

## Verificare

Verifica che il servizio IPFS sia attivo e in esecuzione:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

Vedrai il seguente output:

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
