---
title: ホームアシスタントコアをアップグレードする
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

**この記事には、Robonomics統合を使用して既存のホームアシスタントコアをアップグレードする手順が含まれています。**

<robo-wiki-picture src="home-assistant/ha_core.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. ホームアシスタントコアのインストールが[公式の手順](https://www.home-assistant.io/installation/raspberrypi#install-home-assistant-core)に従って完了しており、<u>homeassistant</u>ユーザーと`venv`環境が存在することを前提としています。そうでない場合は、以下の手順に従ってくださいが、スクリプトを適宜編集してください。
  2. IPFSはホストマシン上で<u>systemd</u>サービスとしてインストールおよび実行されます。
  3. [Python3.10](https://www.python.org/downloads/) 以降がインストールされていることが前提となります。

</robo-wiki-note>

## インストール

インストールスクリプトをダウンロードしてターミナルで実行します。

<code-helper additionalLine="rasppi_username@rasppi_hostname">

  
```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

</code-helper>

次の出力が表示されます。

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

プロセス中に、いくつかのサービスの再起動を確認するように求められます。`tab`キーで移動し、`yes`オプションを選択します。
  
<robo-wiki-note type="note" title="Error: `custom_components` exists">

  `mkdir: can't create directory 'custom_components': File exists`のようなエラーが表示される場合があります。これは、すでにいくつかのカスタムコンポーネントがインストールされたこのフォルダが存在することを意味します。このメッセージは無視してください。

</robo-wiki-note>
  
完了後、ホームアシスタントを再起動します。

## 確認する

IPFSサービスが起動していることを確認してください。

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
systemctl status ipfs-daemon.service 
```

</code-helper>

次の出力が表示されます。

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
