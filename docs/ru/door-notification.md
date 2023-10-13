---
title: Получайте уведомления, когда дверь открывается
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

В этой статье вы установите интеграцию с ботом Telegram и настроите автоматизацию, которая будет отправлять уведомление на ваш аккаунт Telegram, когда дверь открывается.

## Уведомления от бота Telegram

Для начала вам необходимо создать личного бота в Telegram. Для этого зайдите к [специальному Telegram-боту @BotFather](https://t.me/botfather) и следуйте инструкциям.
Сохраните свой токен для доступа к HTTP API.

<robo-wiki-video controls src="https://static.robonomics.network/wiki/bot-father.mp4" />

<robo-wiki-note type="warning">

Сохраняйте свой токен **безопасно** и храните его **надежно**, он может быть использован любым для управления вашим ботом. 

</robo-wiki-note>

Следующий шаг - найти ваш ***User Chat ID***. Для этого используйте следующего [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/get-id-bot.mp4" />

Теперь установим интеграцию "Telegram broadcast". Эта интеграция будет отправлять сообщения на ваш Telegram.

Для предустановленного образа Robonomics, Docker Home Assistant или Ядро Home Assistant вам нужно отредактировать `configuration.yaml`. Подключитесь к Raspberry Pi через `ssh`:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/open-config.mp4" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

Вставьте следующие строки в конец файла. Вставьте свой **ключ API бота** и **ваш User Chat ID**. Также создайте имя для вашего сервиса уведомлений:


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

**Сохраните конфигурацию и перезагрузите Home Assistant.**


В результате в вашем сервисе Home Assistant будет создан сервис, который будет отправлять любое сообщение в чат Telegram с вами. 
Вы можете проверить это в меню Инструменты разработчика на веб-интерфейсе Home Assistant. 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/telegram-result.mp4" />

##  Уведомление об открытии двери

Теперь пришло время создать автоматизацию. Сначала вы импортируете чертеж в свой Home Assistant по этой ссылке.

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-blue.mp4" />

И создайте автоматизацию.

<robo-wiki-video controls src="https://static.robonomics.network/wiki/create-automation.mp4" />

Теперь вы будете получать сообщение от Telegram бота каждый раз, когда дверь открывается.

<robo-wiki-note type="okay">
Вы можете использовать эту автоматизацию с любыми дверями/окнами в вашем доме
</robo-wiki-note>

