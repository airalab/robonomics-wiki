---
title: Benachrichtigt werden, wenn die Tür geöffnet wird
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In diesem Artikel installieren Sie die Integration des Telegram-Bot-Benachrichtigers und konfigurieren eine Automatisierung, die Ihnen eine Benachrichtigung auf Ihr Telegram-Konto sendet, wenn eine Tür geöffnet wird.

## Telegram Bot Benachrichtigungen

Zuerst müssen Sie einen persönlichen Telegram-Bot erstellen. Gehen Sie dazu zum [speziellen Telegram-Bot @BotFather](https://t.me/botfather) und folgen Sie den Anweisungen. 
Speichern Sie Ihren Token zum Zugriff auf die HTTP-API.

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type:'mp4'}]" />

<robo-wiki-note type="warning">

Bewahren Sie Ihren Token **sicher** auf und speichern Sie ihn **sicher**, er kann von jedem verwendet werden, um Ihren Bot zu steuern. 

</robo-wiki-note>

Der nächste Schritt besteht darin, Ihre ***User Chat ID***. Zu diesem Zweck verwenden Sie das folgende [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type:'mp4'}]" />

Installierenierenieren Sie nun die Integration "Telegram Broadcast". Diese Integration sendet Nachrichten an Ihr Telegram.

Für das vorinstallierte Robonomics-Image, Home Assistant Docker oder Home Assistant Core müssen Sie `configuration.yaml` bearbeiten. Verbinden Sie sich über `ssh` mit Ihrem Raspberry Pi:

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type:'mp4'}]" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

Fügen Sie die folgenden Zeilen am Ende der Datei ein. Geben Sie Ihre **bot API key** und **your User Chat ID** ein. Erstellen Sie auch einen Namen für Ihren Benachrichtigungsdienst:


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

**Speichern Sie die Konfiguration und laden Sie Home Assistant neu.**


Als Ergebnis wird in Ihrem Home Assistant-Dienst ein Dienst erstellt, der jede Nachricht an den Telegram-Chat mit Ihnen sendet. 
Sie können dies im Menü Entwicklertools auf der Home Assistant-Web-Oberfläche überprüfen. 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type:'mp4'}]" />

##  Benachrichtigung bei geöffneter Tür

Jetzt ist es an der Zeit, eine Automatisierung zu erstellen. Importieren Sie zuerst das Blueprint in Ihren Home Assistant von diesem Link:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type:'mp4'}]" />

Und erstellen Sie die Automatisierung:

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type:'mp4'}]" />

Jetzt erhalten Sie jedes Mal eine Nachricht vom Telegram-Bot, wenn die Tür geöffnet wird.

<robo-wiki-note type="okay">
Sie können diese Automatisierung mit beliebigen Türen/Fenstern in Ihrem Zuhause verwenden.
</robo-wiki-note>

