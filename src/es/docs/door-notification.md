---
title: Recibe una notificación cuando se abre la puerta
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

En este artículo, instalarás la integración del bot notificador de Telegram y configurarás una automatización que enviará una notificación a tu cuenta de Telegram cuando se abra una puerta.

## Notificaciones del Bot de Telegram

Primero, necesitas crear un bot personal de Telegram. Para ello, ve al [bot especial de Telegram @BotFather](https://t.me/botfather) y sigue las instrucciones.
Guarda tu token para acceder a la API HTTP.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Mantén tu token **seguro** y guárdalo de forma **segura**, cualquiera puede usarlo para controlar tu bot
{% endroboWikiNote %}

El siguiente paso es encontrar tu ***ID de chat de usuario***. Para esto, utiliza el siguiente [GetIdsBot](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Ahora instalemos la integración de "Telegram broadcast". Esta integración enviará mensajes a tu Telegram.

Para la imagen preinstalada de Robonomics, Home Assistant Docker o Home Assistant Core, debes editar `configuration.yaml`. Conéctate a tu Raspberry Pi a través de `ssh`:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}


{% codeHelper { additionalLine: "nombre_usuario_rasppi@nombre_host_rasppi"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

Pega las siguientes líneas al final del archivo. Inserta tu **clave API del bot** y **tu ID de chat de usuario**. También crea un nombre para tu servicio de notificación:


{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <TU_CLAVE_API>
    allowed_chat_ids:
      -  <TU_ID_CHAT_USUARIO> # 123456789  ejemplo de id de usuario

notify:
  - platform: telegram
    name: <NOMBRE_NOTIFICADOR>
    chat_id: <TU_ID_CHAT_USUARIO>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**Guarda la configuración y recarga Home Assistant.**


Como resultado, en tu servicio de Home Assistant se creará un servicio que enviará cualquier mensaje al chat de Telegram contigo.
Puedes verificarlo en el menú de Herramientas para desarrolladores en la interfaz web de Home Assistant.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

## Notificación de Puerta Abierta

Ahora es el momento de crear la automatización. Primero, importa el blueprint a tu Home Assistant desde este enlace:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Y crea la automatización:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Ahora recibirás un mensaje del bot de Telegram cada vez que se abra la puerta.

{% roboWikiNote {type: "okay"}%} Puedes usar esta automatización con cualquier puerta/ventana en tu hogar.
{% endroboWikiNote %}