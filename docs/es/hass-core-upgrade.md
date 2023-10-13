---
title: Actualiza tu Home Assistant Core
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

**Este artículo contiene instrucciones para actualizar tu Home Assistant Core existente con la integración de Robonomics.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. Se asume que la instalación de tu Home Assistant Core se completó de acuerdo con las [instrucciones oficiales](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) y que hay un usuario <u>homeassistant</u> y el entorno `venv`. Si no es el caso, sigue las instrucciones a continuación, **pero edita el script en consecuencia**.
  2. IPFS se instalará y se ejecutará como un servicio <u>systemd</u> en la máquina host.
  3. Se supone que tiene instalado [Python3.9](https://www.python.org/downloads/) o superior.

</robo-wiki-note>

## Instalar

Descarga el script de instalación y ejecútalo en la terminal:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

Verás la siguiente salida:

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

Durante el proceso, se te pedirá que confirmes el reinicio de varios servicios. Navega con `tab` y selecciona la opción `yes`.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  Es posible que veas un error como `mkdir: can't create directory 'custom_components': File exists`. Esto significa que ya tienes esta carpeta con algunos componentes personalizados instalados. Simplemente ignora este mensaje.

</robo-wiki-note>
  
Después de terminar, reinicia tu Home Assistant.

## Verificar

Verifica que el servicio de IPFS esté en funcionamiento:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

Verás la siguiente salida:

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
