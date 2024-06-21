---
title: Отримуйте сповіщення, коли двері відкриті
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

У цій статті ви встановите інтеграцію з ботом Telegram та налаштуєте автоматизацію, яка буде надсилати вам сповіщення на ваш обліковий запис Telegram, коли двері відкриті.

## Сповіщення від бота Telegram

Спочатку вам потрібно створити особистого бота Telegram. Для цього перейдіть на [спеціального бота Telegram @BotFather](https://t.me/botfather) та слідуйте інструкціям. 
Збережіть свій токен для доступу до HTTP API.

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type:'mp4'}]" />

<robo-wiki-note type="warning">

Зберігайте свій токен **безпечно** і зберігайте його **надійно**, його може використовувати будь-хто для керування вашим ботом 

</robo-wiki-note>

Наступним кроком є знаходження вашого ***User Chat ID***. Для цього використовуйте наступне [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type:'mp4'}]" />

Тепер давайте встановимо інтеграцію "Telegram broadcast". Ця інтеграція буде надсилати повідомлення на ваш Telegram.

Для попередньо встановленого зображення Robonomics, Docker Home Assistant або Home Assistant Core вам потрібно відредагувати `configuration.yaml`. Підключіться до Raspberry Pi через `ssh`:

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type:'mp4'}]" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

Вставте наступні рядки в кінець файлу. Вставте ваш **bot API key** та **your User Chat ID**. Також створіть назву для вашого сервісу повідомлень:


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

**Збережіть конфігурацію та перезавантажте Home Assistant.**


В результаті в сервісі Home Assistant буде створено сервіс, який буде надсилати будь-яке повідомлення в чат Telegram з вами. 
Ви можете перевірити це в меню Інструменти розробника на веб-інтерфейсі Home Assistant. 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type:'mp4'}]" />

##  Сповіщення про відкриття дверей

Тепер час створити автоматизацію. Спочатку імпортуйте шаблон до вашого Home Assistant з цього посилання:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type:'mp4'}]" />

І створіть автоматизацію:

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type:'mp4'}]" />

Тепер ви будете отримувати повідомлення від бота Telegram кожного разу, коли двері відкриті.

<robo-wiki-note type="okay">
Ви можете використовувати цю автоматизацію з будь-якими дверима/вікнами у вашому домі.
</robo-wiki-note>

