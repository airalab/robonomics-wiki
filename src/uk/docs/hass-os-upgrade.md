---

title: Оновіть вашу операційну систему Home Assistant
contributors: [LoSk-p]
tools:
  - Home Assistant OS 12.1 для RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Додаток Libp2p <-> WS Proxy 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**У цій статті містяться інструкції щодо оновлення вашої існуючої операційної системи Home Assistant з інтеграцією Robonomics.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## Встановлення HACS

[Магазин спільноти Home Assistant (HACS)](https://hacs.xyz/) дозволяє встановлювати власні інтеграції.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Перед початком вам потрібно встановити додаток для підключення до пристрою Home Assistant за допомогою SSH. У магазині додатків знайдіть `ssh`. Ми рекомендуємо встановити додаток `SSH & Web Terminal`.

{% roboWikiNote {title:"Попередження", type: "warning"}%} Якщо додаток SSH не знайдено, спробуйте увімкнути Розширений режим у налаштуваннях вашого профілю користувача. Для цього натисніть на значок профілю в нижньому лівому куті та знайдіть опцію Розширений режим.{% endroboWikiNote %}

2. Виберіть додаток та натисніть `ВСТАНОВИТИ`. Після завершення встановлення перейдіть на вкладку `Конфігурація` та додайте `пароль` або `authorized_keys`. Не забудьте зберегти цю частину конфігурації.

3. На вкладці `Інформація` натисніть `СТАРТ`. Якщо ви хочете побачити додаток у бічній панелі, не забудьте увімкнути `Показати у бічній панелі`.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. Відкрийте додаток SSH та виконайте наступну команду:

{% codeHelper { additionalLine: "Командний рядок Home Assistant", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Перезапустіть Home Assistant (це можна зробити в `Налаштування`->`Система`).

6. Тепер інтеграція HACS буде доступна для додавання в меню `Інтеграції`. Перейдіть в `Налаштування`->`Пристрої та сервіси`, натисніть `Додати інтеграцію` та знайдіть HACS.

{% roboWikiNote {title:"Попередження", type: "warning"}%} Для використання HACS вам потрібен обліковий запис Github.{% endroboWikiNote %}

7. Натисніть на нього та слідуйте інструкціям для встановлення.

## Встановлення демона IPFS та додатку Libp2p - WS Proxy

Інтеграція Robonomics зберігає дані за допомогою локального демона IPFS та також використовує Libp2p для віддаленого керування, тому спочатку вам потрібно встановити це. Ви можете додати репозиторій додатків Robonomics, використовуючи цю кнопку

[![Відкрийте ваш екземпляр Home Assistant та покажіть діалогове вікно додавання додаткового репозиторію з попередньо заповненим URL-адресою конкретного репозиторію.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

Або вручну за допомогою наступних кроків:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Є [Репозиторій додатків Robonomics](https://github.com/PinoutLTD/robonomics-addons). Щоб встановити його, перейдіть в `Налаштування` -> `Додатки` та натисніть кнопку `ДОДАТИ ДОДАТОК` в правому нижньому куті.

2. Натисніть на три крапки в правому верхньому куті та виберіть `Репозиторії`. Додайте туди наступне посилання:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. Натисніть кнопку `ДОДАТИ`.

4. Закрийте менеджер репозиторіїв та оновіть сторінку. Тепер в кінці сторінки ви можете побачити додатки Robonomics.

Тепер ви можете встановити обидва додатки. Відкрийте їх та натисніть `ВСТАНОВИТИ`. Після встановлення натисніть `СТАРТ`.

## Встановлення інтеграції Robonomics

Тепер ви можете встановити інтеграцію Robonomics за допомогою HACS.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Відкрийте HACS з бічного меню та знайдіть `Robonomics`. Потім натисніть кнопку `Завантажити`, розташовану в правому нижньому куті. Після завершення завантаження перезапустіть Home Assistant.