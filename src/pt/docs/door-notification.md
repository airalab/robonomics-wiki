---
title: Receba Notificações Quando a Porta Abrir
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Neste artigo, você irá instalar a integração do notificador de bot do Telegram e configurar uma automação que enviará uma notificação para a sua conta do Telegram quando uma porta for aberta.

## Notificações do Bot do Telegram

Primeiramente, você precisa criar um bot pessoal no Telegram. Para isso, acesse o [bot especial do Telegram @BotFather](https://t.me/botfather) e siga as instruções.
Salve o seu token para acessar a API HTTP.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Mantenha o seu token **seguro** e armazene-o **em segurança**, pois ele pode ser usado por qualquer pessoa para controlar o seu bot.
{% endroboWikiNote %}

O próximo passo é encontrar o seu ***ID de Chat de Usuário***. Para isso, utilize o [GetIdsBot](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Agora vamos instalar a integração "Telegram broadcast". Essa integração enviará mensagens para o seu Telegram.

Para a imagem pré-instalada do Robonomics, Docker do Home Assistant ou Home Assistant Core, você precisa editar o `configuration.yaml`. Conecte-se ao seu Raspberry Pi via `ssh`:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

Cole as seguintes linhas no final do arquivo. Insira a sua **chave de API do bot** e o **seu ID de Chat de Usuário**. Além disso, crie um nome para o seu serviço de notificação:

{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <SUA_CHAVE_API>
    allowed_chat_ids:
      -  <SEU_ID_CHAT_USUÁRIO> # 123456789  exemplo de ID de usuário

notify:
  - platform: telegram
    name: <NOME_NOTIFICADOR>
    chat_id: <SEU_ID_CHAT_USUÁRIO>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**Salve a configuração e recarregue o Home Assistant.**

Como resultado, no seu serviço do Home Assistant será criado um serviço que enviará qualquer mensagem para o chat do Telegram com você.
Você pode verificar isso no menu Ferramentas do Desenvolvedor na interface web do Home Assistant.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

## Notificação de Porta Aberta

Agora é hora de criar a automação. Primeiramente, importe o blueprint para o seu Home Assistant a partir deste link:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

E crie a automação:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Agora você receberá uma mensagem do bot do Telegram toda vez que a porta for aberta.

{% roboWikiNote {type: "okay"}%} Você pode usar essa automação com qualquer porta/janela em sua casa.
{% endroboWikiNote %}