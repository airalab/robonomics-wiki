---
title: Unix-like OS 用の Home Assistant Docker または Core のアップグレード
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics Home Assistant Integration 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**この記事には、Robonomics 統合を使用して既存の Home Assistant Docker または Core (Unix-like OS 上) をアップグレードする手順が記載されています。**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"免責事項", type: "warning"}%}
  1. Docker が適切にインストールされていることが前提となります。
  2. Home Assistant または Home Assitant Core のデフォルトの Docker イメージとコンテナが使用されていることが前提となります。
  3. IPFS および Libp2p-ws-proxy が Docker コンテナとしてインストールされます。
{% endroboWikiNote %}


## インストール

インストールスクリプトをダウンロードしてターミナルで実行します:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

これにより、Docker が適切にインストールされているかどうかがチェックされます。次に、IPFS を見つけようとし、IPFS がインストールされている場合は構成を確認するように提案されます。IPFS が見つからない場合、スクリプトは IPFS と Libp2p-ws Proxy の両方をインストールします。次の出力が表示されます:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker installed
$User belongs to the docker group.
Checking if IPFS installed... It may take few minutes. Please wait
<...>
 ✔ Container ipfs-daemon      Started
 ✔ Container lipb2p-ws-proxy  Started
All set up!
``` install_integration_core.sh
```

{% endcodeHelper %}

IPFS がすでにインストールされている場合、次の出力が表示されます:
```shell
Docker installed
$User belongs to the docker group.
Checking if IPFS installed... It may take few minutes. Please wait
IPFS instance has been found. Make sure that your configuration is set up properly with the following settings:
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - Ports 4001, 5001, and 8080 are available.
      Also, add the following bootstrap nodes:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      Is your config set up properly? [yes/No]:

```
この場合、IPFS 構成ファイルを調整して確認する必要があります。

{% roboWikiNote {title:"注意！", type: "warning"}%} IPFS の適切な構成は重要です。このステップをスキップしないでください！{% endroboWikiNote %}

## Robonomics 統合のダウンロード

統合をインストールするために [HACS](https://hacs.xyz/) を使用します。Home Assistant に HACS がまだインストールされていない場合は、まず [インストール](https://hacs.xyz/docs/setup/download/) する必要があります。

次に、Home Assistant で HACS に移動し、`Robonomics` を検索します:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

それを開き、右下隅の `Download` をクリックします。リポジトリのダウンロードには時間がかかる場合があります。

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

以上です。次の記事に進んでください。