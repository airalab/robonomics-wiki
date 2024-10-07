---
title: Отримуйте сповіщення, коли відчиняється двері
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

У цій статті ви встановите інтеграцію з повідомленнями в Telegram боті та налаштуєте автоматизацію, яка буде надсилати вам сповіщення на ваш обліковий запис Telegram, коли двері відчиняються.

## Сповіщення від Telegram Bot

Спочатку вам потрібно створити особистого Telegram бота. Для цього перейдіть на [спеціального Telegram бота @BotFather](https://t.me/botfather) та дотримуйтесь інструкцій.
Збережіть свій токен для доступу до HTTP API.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Зберігайте свій токен **безпечно** та зберігайте його **надійно**, його може використовувати будь-хто для управління вашим ботом
{% endroboWikiNote %}

Наступним кроком є знаходження вашого ***ID чату користувача***. Для цього скористайтеся ботом [GetIdsBot](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Тепер давайте встановимо інтеграцію "Телеграм трансляція". Ця інтеграція буде надсилати повідомлення на ваш Telegram.

Для зображення Robonomics, Docker Home Assistant або Home Assistant Core вам потрібно відредагувати `configuration.yaml`. Підключіться до Raspberry Pi через `ssh`:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}


{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

Вставте наступні рядки в кінець файлу. Вставте свій **ключ API бота** та **ID чату користувача**. Також створіть назву для вашого сервісу повідомлень:


{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <ВАШ_КЛЮЧ_API>
    allowed_chat_ids:
      -  <ВАШ_ID_ЧАТУ_КОРИСТУВАЧА> # 123456789  приклад id користувача

notify:
  - platform: telegram
    name: <ІМ'Я_СПОВІЩЕННЯ>
    chat_id: <ВАШ_ID_ЧАТУ_КОРИСТУВАЧА>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**Збережіть конфігурацію та перезавантажте Home Assistant.**


В результаті у вашому сервісі Home Assistant буде створено сервіс, який буде надсилати будь-яке повідомлення в чат Telegram з вами.
Ви можете перевірити це в меню Інструменти розробника на веб-інтерфейсі Home Assistant.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

##  Сповіщення про відчинені двері

Тепер час створити автоматизацію. Спочатку ви імпортуєте шаблон до вашого Home Assistant за цим посиланням:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

І створіть автоматизацію:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Тепер ви будете отримувати повідомлення від Telegram бота кожного разу, коли двері відчиняються.

{% roboWikiNote {type: "okay"}%} Ви можете використовувати цю автоматизацію з будь-якими дверима/вікнами у вашому будинку.
{% endroboWikiNote %}