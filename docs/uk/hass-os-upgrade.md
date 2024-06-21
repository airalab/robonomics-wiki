---
title: Оновіть вашу операційну систему Home Assistant
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**У цій статті містяться інструкції щодо оновлення вашої існуючої операційної системи Home Assistant з інтеграцією Robonomics.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Встановити IPFS Add-on


Інтеграція Robonomics зберігає дані за допомогою локального демона IPFS, тому спочатку вам потрібно встановити його. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. Існує [додаток IPFS для Home Assistant](https://github.com/airalab/ipfs-addon). Щоб встановити його, перейдіть до `Settings` -> `Add-ons` та натисніть кнопку `ADD-ON STORE` в нижньому правому куті.

2. Натисніть на три крапки в правому верхньому куті та виберіть `Repositories`. Додайте туди наступне посилання:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Натисніть кнопку `ADD`.

4. Закрийте менеджер репозиторіїв і оновіть сторінку. Тепер в кінці сторінки ви можете побачити додаток IPFS Daemon.

5. Відкрийте додаток і натисніть `INSTALL`. Після встановлення натисніть `START`.

## Встановіть HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) дозволяє встановлювати користувацькі інтеграції.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Перед початком вам потрібно встановити додаток для підключення до пристрою Home Assistant за допомогою SSH. У магазині додатків шукайте `ssh`. Рекомендуємо встановити додаток `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  Якщо додаток SSH не знайдено, спробуйте увімкнути розширений режим у налаштуваннях вашого користувацького профілю. Для цього натисніть на значок профілю в лівому нижньому куті та знайдіть опцію Розширений режим.

</robo-wiki-note>

2. Виберіть додаток і натисніть `INSTALL`. Після завершення встановлення перейдіть на вкладку `Конфігурація` та додайте `password` або `authorized_keys`. Не забудьте зберегти цю частину конфігурації.

3. На вкладці `Info` натисніть `START`. Якщо ви хочете побачити додаток у бічній панелі, не забудьте увімкнути `Show in sidebar`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Відкрийте додаток SSH і виконайте наступну команду:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Перезапустіть Home Assistant (це можна зробити в `Settings`->`System`). 

6. Тепер інтеграція HACS буде доступна для додавання в меню `Integrations`. Перейдіть до `Settings`->`Devices & Services`, натисніть `Add Integration` та знайдіть HACS.

<robo-wiki-note type="warning" title="Warning">

  Для використання HACS вам потрібен обліковий запис Github.

</robo-wiki-note>

7. Натисніть на нього та дотримуйтесь інструкцій щодо встановлення. 

## Встановіть інтеграцію Robonomics

Тепер ви можете встановити інтеграцію Robonomics за допомогою HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Відкрийте HACS із меню бічної панелі та перейдіть до `Integrations`. Натисніть `Explore & Download Repositories`, потім знайдіть `Robonomics` і натисніть кнопку `Download`, розташовану в нижньому правому куті. Після завершення завантаження перезапустіть Home Assistant.

