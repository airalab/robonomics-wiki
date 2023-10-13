---
title: Recevez une notification lorsque la porte s'ouvre
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Dans cet article, vous installerez l'intégration du bot de notification Telegram et configurerez une automatisation qui enverra une notification à votre compte Telegram lorsque la porte est ouverte.

## Notifications du bot Telegram

Tout d'abord, vous devez créer un bot Telegram personnel. Pour cela, allez sur le [bot Telegram spécial @BotFather](https://t.me/botfather) et suivez les instructions. 
Enregistrez votre jeton pour accéder à l'API HTTP.

<robo-wiki-video controls src="https://static.robonomics.network/wiki/bot-father.mp4" />

<robo-wiki-note type="warning">

Gardez votre jeton **en sécurité** et stockez-le **en toute sécurité**, il peut être utilisé par n'importe qui pour contrôler votre bot. 

</robo-wiki-note>

L'étape suivante consiste à trouver votre ***User Chat ID***. Pour cela, utilisez le [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/get-id-bot.mp4" />

Maintenant, installons l'intégration "Telegram broadcast". Cette intégration enverra des messages à votre Telegram.

Pour l'image préinstallée Robonomics, Docker Home Assistant ou Home Assistant Core, vous devez modifier `configuration.yaml`. Connexionez-vous à votre Raspberry Pi via `ssh`:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/open-config.mp4" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

Collez les lignes suivantes à la fin du fichier. Insérez votre **bot API key** et **your User Chat ID**. Créez également un nom pour votre service de notification:


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

**Enregistrez la configuration et rechargez Home Assistant.**


En conséquence, un service sera créé dans votre service Home Assistant, qui enverra n'importe quel message au chat Telegram avec vous. 
Vous pouvez le vérifier dans le menu Outils de développement de l'interface Web de Home Assistant. 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/telegram-result.mp4" />

##  Notification d'ouverture de porte

Maintenant, il est temps de créer une automatisation. Tout d'abord, importez le modèle dans votre Home Assistant à partir de ce lien:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-blue.mp4" />

Et créez une automatisation:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/create-automation.mp4" />

Maintenant, vous recevrez un message du bot Telegram chaque fois que la porte est ouverte.

<robo-wiki-note type="okay">
Vous pouvez utiliser cette automatisation avec n'importe quelle porte/fenêtre de votre maison.
</robo-wiki-note>

