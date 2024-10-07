---
title: Recevez une notification lorsque la porte s'ouvre
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Dans cet article, vous installerez l'intégration du bot notificateur Telegram et configurerez une automatisation qui enverra une notification à votre compte Telegram lorsque la porte est ouverte.

## Notifications du Bot Telegram

Tout d'abord, vous devez créer un bot Telegram personnel. Pour cela, rendez-vous sur le [bot Telegram spécial @BotFather](https://t.me/botfather) et suivez les instructions.
Sauvegardez votre jeton pour accéder à l'API HTTP.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Gardez votre jeton **sécurisé** et stockez-le **en toute sécurité**, il peut être utilisé par n'importe qui pour contrôler votre bot
{% endroboWikiNote %}

L'étape suivante consiste à trouver votre ***ID de chat utilisateur***. Pour cela, utilisez le [GetIdsBot suivant](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Maintenant, installons l'intégration "diffusion Telegram". Cette intégration enverra des messages à votre Telegram.

Pour l'image préinstallée de Robonomics, Home Assistant Docker ou Home Assistant Core, vous devez modifier `configuration.yaml`. Connectez-vous à votre Raspberry Pi via `ssh`:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}


{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

Collez les lignes suivantes à la fin du fichier. Insérez votre **clé API du bot** et **votre ID de chat utilisateur**. Créez également un nom pour votre service de notification:


{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <VOTRE_CLÉ_API>
    allowed_chat_ids:
      -  <VOTRE_ID_CHAT_UTILISATEUR> # 123456789  exemple d'ID d'utilisateur

notify:
  - platform: telegram
    name: <NOM_DU_NOTIFICATEUR>
    chat_id: <VOTRE_ID_CHAT_UTILISATEUR>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**Enregistrez la configuration et rechargez Home Assistant.**


En conséquence, un service sera créé dans votre service Home Assistant, qui enverra n'importe quel message au chat Telegram avec vous.
Vous pouvez le vérifier dans le menu Outils pour développeurs de l'interface web de Home Assistant.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

## Notification d'ouverture de porte

Il est maintenant temps de créer une automatisation. Tout d'abord, importez le modèle vers votre Home Assistant à partir de ce lien:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Et créez l'automatisation:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Maintenant, vous recevrez un message du bot Telegram chaque fois que la porte est ouverte.

{% roboWikiNote {type: "okay"}%} Vous pouvez utiliser cette automatisation avec n'importe quelle porte/fenêtre de votre maison.
{% endroboWikiNote %}