---
title: Benachrichtigung erhalten, wenn die Tür geöffnet wird
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In diesem Artikel installieren Sie die Telegram-Bot-Benachrichtigungsintegration und konfigurieren eine Automatisierung, die eine Benachrichtigung an Ihr Telegram-Konto sendet, wenn eine Tür geöffnet wird.

## Telegram Bot Benachrichtigungen

Zuerst müssen Sie einen persönlichen Telegram-Bot erstellen. Gehen Sie dazu zum [speziellen Telegram-Bot @BotFather](https://t.me/botfather) und folgen Sie den Anweisungen.
Speichern Sie Ihr Token zum Zugriff auf die HTTP-API.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Bewahren Sie Ihr Token **sicher** auf und speichern Sie es **sorgfältig**, da es von jedem verwendet werden kann, um Ihren Bot zu steuern.
{% endroboWikiNote %}

Der nächste Schritt ist das Finden Ihrer ***Benutzer-Chat-ID***. Verwenden Sie dazu den [GetIdsBot](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Installieren Sie nun die Integration "Telegram broadcast". Diese Integration sendet Nachrichten an Ihr Telegram.

Für das vorinstallierte Robonomics-Image, Home Assistant Docker oder Home Assistant Core müssen Sie die `configuration.yaml` bearbeiten. Verbinden Sie sich über `ssh` mit Ihrem Raspberry Pi:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

Fügen Sie die folgenden Zeilen am Ende der Datei ein. Geben Sie Ihren **Bot-API-Schlüssel** und **Ihre Benutzer-Chat-ID** ein. Erstellen Sie auch einen Namen für Ihren Benachrichtigungsdienst:

{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <IHR_API-SCHLÜSSEL>
    allowed_chat_ids:
      -  <IHRE_BENUTZER_CHAT_ID> # 123456789  Beispiel-ID eines Benutzers

notify:
  - platform: telegram
    name: <BENACHRICHTIGUNGSNAME>
    chat_id: <IHRE_BENUTZER_CHAT_ID>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**Speichern Sie die Konfiguration und laden Sie Home Assistant neu.**

Als Ergebnis wird in Ihrem Home Assistant-Dienst ein Dienst erstellt, der jede Nachricht an den Telegram-Chat mit Ihnen sendet.
Sie können dies im Menü "Entwicklerwerkzeuge" der Benutzeroberfläche von Home Assistant überprüfen.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

## Benachrichtigung bei geöffneter Tür

Jetzt ist es an der Zeit, eine Automatisierung zu erstellen. Importieren Sie zunächst das Blueprint in Ihren Home Assistant von diesem Link:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Und erstellen Sie die Automatisierung:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Jetzt erhalten Sie jedes Mal eine Nachricht von Ihrem Telegram-Bot, wenn die Tür geöffnet wird.

{% roboWikiNote {type: "okay"}%} Sie können diese Automatisierung mit beliebigen Türen/Fenstern in Ihrem Zuhause verwenden.
{% endroboWikiNote %}