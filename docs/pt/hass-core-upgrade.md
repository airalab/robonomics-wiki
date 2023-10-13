---
title: Atualize o seu Home Assistant Core
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

**Este artigo contém instruções para atualizar o seu Home Assistant Core existente com a integração Robonomics.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. Pressupõe-se que a instalação do seu Home Assistant Core tenha sido concluída de acordo com as [instruções oficiais](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core) e que exista um usuário <u>homeassistant</u> e o ambiente `venv`. Se não for o caso, siga as instruções abaixo, **mas edite o script de acordo**.
  2. O IPFS será instalado e executado como um serviço <u>systemd</u> na máquina hospedeira.
  3. Presume-se que você tenha o [Python3.9](https://www.python.org/downloads/) ou superior instalado.

</robo-wiki-note>

## Instalar

Baixe o script de instalação e execute-o no terminal:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

Você verá a seguinte saída:

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

Durante o processo, você será solicitado a confirmar a reinicialização de vários serviços. Navegue com `tab` e selecione a opção `yes`.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  Você pode ver um erro como `mkdir: can't create directory 'custom_components': File exists`. Isso significa que você já possui essa pasta com alguns componentes personalizados instalados. Apenas ignore esta mensagem.

</robo-wiki-note>
  
Após a conclusão, reinicie o seu Home Assistant.

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
