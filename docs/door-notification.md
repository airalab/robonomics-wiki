---
title: Get Notified When Door Opens
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In this article you will install the Telegram bot notifier integration and configure an automation, which will send to your Telegram account notification when a door is open.

## Telegram Bot Notifications

First, you need to create a personal Telegram bot. For this go to the [special Telegram bot @BotFather](https://t.me/botfather) and follow instruction. 
Save your token for accessing the HTTP API.

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type:'mp4'}]" />

<robo-wiki-note type="warning">

Keep your token **secure** and store it **safely**, it can be used by anyone to control your bot 

</robo-wiki-note>

Next step is find your ***User Chat ID***. For this use the next [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type:'mp4'}]" />

Now let's install "Telegram broadcast" integration. This integration will send messages to your Telegram.

For Robonomics pre-installed image, Home Assistant Docker or Home Assistant Core you have to edit `configuration.yaml`. Connect to your Raspberry Pi via `ssh`:

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type:'mp4'}]" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

Paste next lines to the end of file. Insert your **bot API key** and **your User Chat ID**. Also create a name for your notify service:


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

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type:'mp4'}]" />

**Save configuration and reload Home Assistant.**


As result, in your Home Assistant service will be created service, which will send any message to the Telegram chat with you. 
You can check it in Developer Tools menu on Home Assistant web interface. 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type:'mp4'}]" />

##  Door Open Notification

Now it's time to create automation. First, you import blueprint to your Home Assistant from this link:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type:'mp4'}]" />

And create automation:

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type:'mp4'}]" />

Now you will receive message from Telegram bot every time the door is open.

<robo-wiki-note type="okay">
You can use this automation with any doors/windows in your home.
</robo-wiki-note>

