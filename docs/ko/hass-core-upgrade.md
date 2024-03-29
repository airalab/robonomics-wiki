---
title: 홈 어시스턴트 코어 업그레이드하기
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

**이 문서에는 Robonomics 통합을 사용하여 기존 홈 어시스턴트 코어를 업그레이드하는 지침이 포함되어 있습니다.**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. 홈 어시스턴트 코어 설치가 [공식 지침](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core)에 따라 완료되었으며 <u>homeassistant</u> 사용자와 `venv` 환경이 있다고 가정합니다. 그렇지 않은 경우 아래 지침을 따르되, **스크립트를 적절히 편집**하십시오.
  2. IPFS가 호스트 머신에서 <u>systemd</u> 서비스로 설치되고 실행됩니다.
  3. [Python3.9](https://www.python.org/downloads/) 이상이 설치되어 있다고 가정합니다.

</robo-wiki-note>

## 설치하다

설치 스크립트를 다운로드하고 터미널에서 실행하십시오:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

다음 출력이 표시됩니다:

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

이 과정에서 여러 서비스의 다시 시작을 확인하라는 메시지가 표시됩니다. 'tab'을 사용하여 탐색하면 `yes` 옵션이 선택됩니다.
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  `mkdir: can't create directory 'custom_components': File exists`와 같은 오류가 표시될 수 있습니다. 이는 이미 일부 사용자 정의 구성 요소가 있는 이 폴더가 이미 존재한다는 것을 의미합니다. 이 메시지를 무시하십시오.

</robo-wiki-note>
  
완료 후 홈 어시스턴트를 재시작하십시오.

## 확인하다

IPFS 서비스가 실행 중인지 확인하십시오.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

다음과 같은 출력이 표시됩니다.

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
