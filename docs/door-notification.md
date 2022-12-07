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

<robo-wiki-video local src="bot-father.mkv" />

<robo-wiki-note type="warning"> 
Keep your token **secure** and store it **safely**, it can be used by anyone to control your bot 
</robo-wiki-note>

Next step is find your ***telegram user id***. For this use the next [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video local src="get-id-bot.mkv" />

Now let's install "Telegram broadcast" integration. This integration will send messages to your telegram.

For "pre-installed image", docker container or home assistant core you have to edit `configuration.yaml`.

