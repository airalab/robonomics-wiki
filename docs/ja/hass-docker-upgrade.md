---
title: Unix-like OSでHome Assistant Dockerをアップグレードする
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

**この記事には、Robonomics統合を使用して既存のHome Assistant Docker（Unix-like OS上）をアップグレードする手順が記載されています。**

<robo-wiki-picture src="home-assistant/ha_docker.png" />

<robo-wiki-note type="warning" title="DISCLAIMER">

  1. デフォルトのDockerイメージとHome Assistantのコンテナの名前が<u>homeassistant</u>であることを前提としています。
  2. IPFSはホストマシン上で<u>systemd</u>サービスとしてインストールおよび実行されます。
  3. [Python3.9](https://www.python.org/downloads/)以上がインストールされていることを前提としています。

</robo-wiki-note>

## インストール

インストールスクリプトをダウンロードしてターミナルで実行します。

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_docker.sh
bash install_integration_docker.sh
```

</code-helper>

次の出力が表示されます。

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

  `mkdir: can't create directory 'custom_components': File exists`のようなエラーが表示される場合があります。これは、すでにいくつかのカスタムコンポーネントがインストールされたこのフォルダが存在することを意味します。このメッセージは無視してください。

</robo-wiki-note>

コンテナを再起動する：

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


## 検証する

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
