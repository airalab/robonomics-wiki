---
title: Mettez à niveau votre Home Assistant Core
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

**Cet article contient des instructions pour mettre à niveau votre Home Assistant Core existant avec l'intégration Robonomics.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. Il est supposé que l'installation de votre Home Assistant Core a été effectuée conformément aux [instructions officielles](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) et qu'il existe un utilisateur <u>homeassistant</u> et l'environnement `venv`. Si ce n'est pas le cas, suivez les instructions ci-dessous, **mais modifiez le script en conséquence**.
  2. IPFS sera installé et exécuté en tant que service <u>systemd</u> sur la machine hôte.
  3. Il est supposé que vous avez installé [Python3.9](https://www.python.org/downloads/) ou une version ultérieure.

</robo-wiki-note>

## Installerer

Téléchargez le script d'installation et exécutez-le dans le terminal:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

Vous verrez la sortie suivante:

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

Au cours du processus, il vous sera demandé de confirmer le redémarrage de plusieurs services. En naviguant avec `tab`, sélectionnez l'option `yes`.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  Vous pouvez voir une erreur comme `mkdir: can't create directory 'custom_components': File exists`. Cela signifie que vous avez déjà ce dossier avec certains composants personnalisés installés. Ignorez simplement ce message.

</robo-wiki-note>
  
Après avoir terminé, redémarrez votre Home Assistant.

## Vérifier

Vérifiez que le service IPFS est en cours d'exécution:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

Vous verrez le résultat suivant :

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
