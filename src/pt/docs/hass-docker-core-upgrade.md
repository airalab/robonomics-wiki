---
title: Atualize seu Home Assistant Docker ou Core para SO semelhante ao Unix
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Integração Robonomics Home Assistant 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**Este artigo contém instruções para atualizar seu Home Assistant Docker ou Core existente (em um SO semelhante ao Unix) com a integração Robonomics.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"AVISO LEGAL", type: "warning"}%}
  1. Pressupõe-se que o Docker esteja corretamente instalado.
  2. Pressupõe-se que as imagens e contêineres padrão do Docker do Home Assistant ou Home Assistant Core sejam usados.
  3. O IPFS e o Libp2p-ws-proxy serão instalados como contêineres do Docker.
{% endroboWikiNote %}


## Instalação

Baixe o script de instalação e execute-o no terminal:

{% codeHelper { additionalLine: "nome_de_usuário_do_rasppi@nome_do_host_do_rasppi"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Ele verificará se o Docker está corretamente instalado. Em seguida, tentará encontrar o IPFS e sugerirá verificar a configuração se o IPFS estiver instalado. Se o IPFS não for encontrado, o script instalará tanto o IPFS quanto o Libp2p-ws Proxy. Você verá a seguinte saída:

{% codeHelper { additionalLine: "nome_de_usuário_do_rasppi@nome_do_host_do_rasppi"}%}

```shell
Docker instalado
$Usuário pertence ao grupo docker.
Verificando se o IPFS está instalado... Pode levar alguns minutos. Por favor, aguarde
<...>
 ✔ Contêiner ipfs-daemon      Iniciado
 ✔ Contêiner lipb2p-ws-proxy  Iniciado
Tudo pronto!
``` install_integration_core.sh
```

{% endcodeHelper %}

Se o IPFS já estiver instalado, você verá a seguinte saída:
```shell
Docker instalado
$Usuário pertence ao grupo docker.
Verificando se o IPFS está instalado... Pode levar alguns minutos. Por favor, aguarde
A instância do IPFS foi encontrada. Certifique-se de que sua configuração esteja corretamente configurada com as seguintes definições:
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - As portas 4001, 5001 e 8080 estão disponíveis.
      Além disso, adicione os seguintes nós de inicialização:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      Sua configuração está correta? [sim/Não]:

```
Neste caso, você precisa ajustar o arquivo de configuração do IPFS e confirmá-lo.

{% roboWikiNote {title:"Atenção!", type: "warning"}%} A configuração adequada do IPFS é importante; não pule esta etapa!{% endroboWikiNote %}

## Baixar a Integração Robonomics

Vamos usar o [HACS](https://hacs.xyz/) para instalar a integração. Se o HACS ainda não estiver instalado no seu Home Assistant, você precisa [instalá-lo](https://hacs.xyz/docs/setup/download/) primeiro.

Em seguida, no seu Home Assistant, navegue até o HACS e procure por `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Abra e clique em `Download` no canto inferior direito. O download do repositório pode levar algum tempo.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Isso é tudo. Continue para o próximo artigo.