---
title: Atualize seu Home Assistant Docker para sistemas operacionais semelhantes ao Unix
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

**Este artigo contém instruções para atualizar seu Home Assistant Docker existente (em um sistema operacional semelhante ao Unix) com a integração Robonomics.**

<robo-wiki-picture src="home-assistant/ha_docker.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. É assumido que as imagens e o contêiner padrão do Docker do Home Assistant chamados <u>homeassistant</u> estão sendo usados.
  2. O IPFS será instalado e executado como um serviço <u>systemd</u> na máquina hospedeira.
  3. É assumido que você tem o [Python3.9](https://www.python.org/downloads/) ou uma versão superior instalada.

</robo-wiki-note>

## Instalar

Baixe o script de instalação e execute-o no terminal:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_docker.sh
bash install_integration_docker.sh
```

</code-helper>

Você verá a seguinte saída:

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

  Você pode ver um erro como `mkdir: can't create directory 'custom_components': File exists`. Isso significa que você já possui essa pasta com alguns componentes personalizados instalados. Apenas ignore esta mensagem.

</robo-wiki-note>

Reinicie o contêiner:

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


## Verificar

Verifique se o serviço IPFS está em execução:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

Você verá a seguinte saída:

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
