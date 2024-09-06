---
title: Ricevi una Notifica Quando la Porta si Apre
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In questo articolo installerai l'integrazione del bot notifier di Telegram e configurerai un'automazione che invierà una notifica al tuo account Telegram quando una porta si apre.

## Notifiche del Bot di Telegram

Prima di tutto, devi creare un bot personale su Telegram. Per farlo, vai al [bot speciale di Telegram @BotFather](https://t.me/botfather) e segui le istruzioni.
Salva il tuo token per accedere all'API HTTP.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Mantieni il tuo token **sicuro** e conservalo **in modo sicuro**, potrebbe essere utilizzato da chiunque per controllare il tuo bot
{% endroboWikiNote %}

Il passo successivo è trovare il tuo ***ID Chat Utente***. Per farlo, utilizza il [GetIdsBot](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Ora installiamo l'integrazione "Telegram broadcast". Questa integrazione invierà messaggi al tuo Telegram.

Per l'immagine preinstallata di Robonomics, Home Assistant Docker o Home Assistant Core, devi modificare `configuration.yaml`. Connettiti al tuo Raspberry Pi tramite `ssh`:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}


{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

Incolla le seguenti righe alla fine del file. Inserisci la tua **chiave API del bot** e il **tuo ID Chat Utente**. Crea anche un nome per il tuo servizio di notifica:


{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <LA_TUA_API_KEY>
    allowed_chat_ids:
      -  <IL_TUO_ID_CHAT_UTENTE> # 123456789  esempio di ID di un utente

notify:
  - platform: telegram
    name: <NOME_NOTIFICHE>
    chat_id: <IL_TUO_ID_CHAT_UTENTE>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**Salva la configurazione e ricarica Home Assistant.**


Come risultato, nel servizio Home Assistant verrà creato un servizio che invierà qualsiasi messaggio alla chat di Telegram con te.
Puoi controllarlo nel menu Strumenti per sviluppatori sull'interfaccia web di Home Assistant.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

##  Notifica di Apertura della Porta

Ora è il momento di creare un'automazione. Prima, importa il blueprint nel tuo Home Assistant da questo link:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

E crea l'automazione:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Ora riceverai un messaggio dal bot di Telegram ogni volta che la porta si apre.

{% roboWikiNote {type: "okay"}%} Puoi utilizzare questa automazione con qualsiasi porta/finestra nella tua casa.
{% endroboWikiNote %}