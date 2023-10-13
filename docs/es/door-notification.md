---
title: Recibir una notificación cuando se abre la puerta
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

En este artículo instalarás la integración del bot de Telegram y configurarás una automatización que enviará una notificación a tu cuenta de Telegram cuando se abra una puerta.

## Notificaciones del bot de Telegram

Primero, necesitas crear un bot personal de Telegram. Para ello, ve a [el bot de Telegram especial @BotFather](https://t.me/botfather) y sigue las instrucciones. 
Guarda tu token para acceder a la API de HTTP.

<robo-wiki-video controls src="https://static.robonomics.network/wiki/bot-father.mp4" />

<robo-wiki-note type="warning">

Mantén tu token **seguro** y guárdalo **de forma segura**, cualquiera puede usarlo para controlar tu bot. 

</robo-wiki-note>

El siguiente paso es encontrar tu ***User Chat ID***. Para ello, utiliza el siguiente [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/get-id-bot.mp4" />

Ahora vamos a instalar la integración de "Telegram broadcast". Esta integración enviará mensajes a tu Telegram.

Para la imagen preinstalada de Robonomics, Docker de Home Assistant o Home Assistant Core, debes editar `configuration.yaml`. Conéctate a tu Raspberry Pi a través de `ssh`:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/open-config.mp4" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

Pega las siguientes líneas al final del archivo. Inserta tu **bot API key** y **your User Chat ID**. También crea un nombre para tu servicio de notificación:


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

**Guarda la configuración y reinicia Home Assistant.**


Como resultado, se creará un servicio en tu Home Assistant que enviará cualquier mensaje al chat de Telegram contigo. 
Puedes comprobarlo en el menú Herramientas para desarrolladores en la interfaz web de Home Assistant. 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/telegram-result.mp4" />

##  Notificación de puerta abierta

Ahora es el momento de crear una automatización. Primero, importa el modelo a tu Home Assistant desde este enlace:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-blue.mp4" />

Y crea la automatización:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/create-automation.mp4" />

Ahora recibirás un mensaje del bot de Telegram cada vez que se abra la puerta.

<robo-wiki-note type="okay">
Puedes utilizar esta automatización con cualquier puerta/ventana de tu hogar.
</robo-wiki-note>

