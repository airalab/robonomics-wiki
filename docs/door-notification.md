---
title: Get Notified When Door Opens
contributors: [nakata 5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In this article you will install the Telegram bot notifier integration and configure an automation, which will send to your telegram account notification when a door is open.

## Telegram bot notifications

First, you need to create a personal telegram bot. For this go to the [special telegram bot @BotFather](https://t.me/botfather) and follow instruction.  

<robo-wiki-video local src="bot-father.mp4" />

<robo-wiki-note type="warning"> 
Keep your token **secure** and store it **safely**, it can be used by anyone to control your bot 
</robo-wiki-note>

Next step is find your ***telegram user id***. For this use the next [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video local src="get-id-bot.mp4" />

Now let's install "Telegram broadcast" integration. This integration will send messages to your telegram.

For "pre-installed image", docker container or home assistant core you have to edit `configuration.yaml`. Connect to your Raspberry Pi via `ssh`:

<robo-wiki-video local src="open-config.mp4" />
 
Paste next to the end of file. Insert your **bot api key** and **your telegram id**. Also create a name for your notify service:

<code-helper copy >

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_CHAD_ID> # 123456789  example id of a user
      
notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_CHAD_ID>
```

</code-helper >

<robo-wiki-video local src="insert-config.mkv" />

**Save configuration and reload Home Assistant.**

#### Result

As result, in your Home assistant will be created service, which will send any message to the telegram chat with you.

<robo-wiki-video local src="telegram-result.mp4" />

##  Door Open Notification

Now it's time to create automation. First, you import blueprint to your Home Assistant from this link:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video local src="insert-blue.mp4" />

And create automation:

<robo-wiki-video local src="create-automation.mp4" />

That's all. Now you will receive message from telegram bot every time the door is open.

<robo-wiki-note type="okay">
You can use this automation with any doors/windows in your home.
</robo-wiki-note>

