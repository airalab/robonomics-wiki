---
title: Receba notificações quando a porta abrir
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Neste artigo, você irá instalar a integração do bot do Telegram e configurar uma automação, que enviará uma notificação para sua conta do Telegram quando uma porta estiver aberta.

## Notificações do Bot do Telegram

Primeiro, você precisa criar um bot pessoal do Telegram. Para isso, vá para o [bot especial do Telegram @BotFather](https://t.me/botfather) e siga as instruções. 
Salve seu token para acessar a API HTTP.

<robo-wiki-video controls src="https://static.robonomics.network/wiki/bot-father.mp4" />

<robo-wiki-note type="warning">

Mantenha seu token **seguro** e armazene-o **em local seguro**, pois ele pode ser usado por qualquer pessoa para controlar seu bot 

</robo-wiki-note>

O próximo passo é encontrar o seu ***User Chat ID***. Para isso, use o seguinte [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/get-id-bot.mp4" />

Agora vamos instalar a integração de "Telegram broadcast". Essa integração enviará mensagens para o seu Telegram.

Para a imagem pré-instalada do Robonomics, Docker do Home Assistant ou Home Assistant Core, você precisa editar o `configuration.yaml`. Conecte-se ao seu Raspberry Pi via `ssh`:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/open-config.mp4" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

Cole as seguintes linhas no final do arquivo. Insira o seu **bot API key** e **your User Chat ID**. Também crie um nome para o seu serviço de notificação:


<code-helper copy >

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  example id of a user
      
notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-config.mp4" />

**Salve a configuração e recarregue o Home Assistant.**


Como resultado, no seu serviço do Home Assistant será criado um serviço, que enviará qualquer mensagem para o chat do Telegram com você. 
Você pode verificar isso no menu Ferramentas do Desenvolvedor na interface web do Home Assistant. 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/telegram-result.mp4" />

##  Notificação de Porta Aberta

Agora é hora de criar uma automação. Primeiro, importe o modelo para o seu Home Assistant a partir deste link:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-blue.mp4" />

E crie a automação:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/create-automation.mp4" />

Agora você receberá uma mensagem do bot do Telegram sempre que a porta estiver aberta.

<robo-wiki-note type="okay">
Você pode usar essa automação com qualquer porta/janela em sua casa.
</robo-wiki-note>

