---
title: Получение уведомлений при открытии двери
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

В этой статье вы установите интеграцию с уведомлениями Telegram бота и настроите автоматизацию, которая будет отправлять уведомление на ваш аккаунт Telegram при открытии двери.

## Уведомления от Telegram Бота

Сначала вам нужно создать персонального Telegram бота. Для этого перейдите к [специальному Telegram боту @BotFather](https://t.me/botfather) и следуйте инструкциям.
Сохраните свой токен для доступа к HTTP API.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Храните свой токен **в безопасности** и храните его **надежно**, он может быть использован кем угодно для управления вашим ботом.
{% endroboWikiNote %}

Следующим шагом является поиск вашего ***User Chat ID***. Для этого используйте бота [GetIdsBot](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Теперь установим интеграцию "Telegram broadcast". Эта интеграция будет отправлять сообщения на ваш Telegram.

Для предустановленного образа Robonomics, Home Assistant Docker или Home Assistant Core вам нужно отредактировать `configuration.yaml`. Подключитесь к вашему Raspberry Pi через `ssh`:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

Вставьте следующие строки в конец файла. Вставьте ваш **API ключ бота** и **ваш User Chat ID**. Также создайте имя для вашего сервиса уведомлений:

{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <ВАШ_API_КЛЮЧ>
    allowed_chat_ids:
      -  <ВАШ_USER_CHAT_ID> # 123456789  пример id пользователя

notify:
  - platform: telegram
    name: <ИМЯ_УВЕДОМЛЕНИЯ>
    chat_id: <ВАШ_USER_CHAT_ID>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**Сохраните конфигурацию и перезагрузите Home Assistant.**

В результате в вашем сервисе Home Assistant будет создан сервис, который будет отправлять любое сообщение в чат Telegram с вами.
Вы можете проверить это в меню Инструменты разработчика на веб-интерфейсе Home Assistant.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

##  Уведомление об открытой двери

Теперь пришло время создать автоматизацию. Сначала импортируйте чертеж в ваш Home Assistant по этой ссылке:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

И создайте автоматизацию:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Теперь вы будете получать сообщение от Telegram бота каждый раз, когда дверь открывается.

{% roboWikiNote {type: "okay"}%} Вы можете использовать эту автоматизацию с любыми дверьми/окнами в вашем доме.
{% endroboWikiNote %}