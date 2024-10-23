---
title: Upgrade Your Home Assistant Docker or Core for Unix-like OS
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

**This article contains instructions to upgrade your existing Home Assistant Docker or Core (on a Unix-like OS) with the Robonomics integration.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"DISCLAIMER", type: "warning"}%}
  1. It is assumed that Docker is properly installed.
  2. It is assumed that default Docker images and container of Home Assistant or Home Assitant Core are used.
  3. IPFS and Libp2p-ws-proxy will be installed as Docker containers.
{% endroboWikiNote %}


## Install

Download the installation script and run it in the terminal:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

It will check if Docker is properly installed. Then, it will then try to find IPFS and suggest checking the configuration if IPFS is installed. If IPFS is not found, the script will install both IPFS and the Libp2p-ws Proxy. You will see the following output:

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

If the IPFS is already installed, you will see the following output:
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
In this case, you need to adjust your IPFS configuration file and confirm it.

{% roboWikiNote {title:"Attention!", type: "warning"}%} Proper configuration of IPFS is important; do not skip this step!{% endroboWikiNote %}

## Download Robonomics Integration

We will use [HACS](https://hacs.xyz/) to install the integration. If HACS is not installed on your Home Assistant yet, you need to [install](https://www.hacs.xyz/docs/use/download/download) it first.

Next, in your Home Assistant, navigate to HACS and search for `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Open it and click `Download`  in the bottom right corner. Downloading the repository may take some time.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

That's all. Continue to the next article.