---
title: Активувати підписку
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

У цій статті ви створите облікові записи підприємств Robonomics та придбаєте підписку на Інтернет речей. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Для керування Home Assistant за допомогою Robonomics вам потрібно мати 2 облікові записи на підприємстві Robonomics. Для одного з облікових записів (`sub_owner`) ви придбаєте підписку Robonomics. Другий обліковий запис (`sub_controller`) буде керувати всіма процесами Home Assistant (такими як телеметрія) та надавати доступ іншим користувачам. Ці облікові записи забезпечать безпеку вашого Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Обидва облікові записи мають бути створені з шифруванням **ed25519**. Через це вам потрібно створити обліковий запис за допомогою інтерфейсу користувача Polkadot-JS і вибрати необхідне шифрування.

Ця функція за замовчуванням вимкнена в Polkadot-JS UI. Щоб увімкнути її, перейдіть до `Settings` -> `General` -> `account options` та виберіть  `Allow local in-browser account storage` у розкривному меню `in-browser account creation`.

</robo-wiki-note>

## Створення облікових записів власника та контролера

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. Перейдіть до [додатку Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) на порталі Polkadot / Substrate. **Перевірте верхній лівий кут, щоб переконатися, що ви підключені до Robonomics Parachain.**

2. Перейдіть до `Accounts` -> `Accounts` та натисніть кнопку `Add account`. Ви побачите спливаюче меню з насінням облікового запису. Воно має дві форми: *Мнемонічний* (зрозумілий для людини) та *Сире* (послідовність цифр і літер). 

3. Відкрийте `Advanced creation options`, змініть тип криптографії створення облікового запису на `Edwards - ed25519` та натисніть `Next`.


4. Безпечно збережіть мнемонічну фразу насіння та натисніть `Next`.

5. У наступному меню потрібно встановити ім'я облікового запису та пароль. Дайте йому ім'я `sub_owner` для зручності. Натисніть `Next`.

6. У останньому вікні натисніть `Save`, щоб завершити створення облікового запису. Воно також згенерує резервні JSON-файли, які ви повинні безпечно зберігати. Ви пізніше можете використовувати цей файл для відновлення облікового запису, якщо ви запам'ятаєте пароль.

7. Повторіть ці кроки для облікового запису з назвою `sub_controller`.


## Додавання облікових записів до Polkadot.js

Для зручності вам слід використовувати [розширення Polkadot.js](https://polkadot.js.org/extension/) та додати до нього ці новостворені облікові записи. Для облікового запису ed25519 ви можете зробити це лише за допомогою резервного JSON-файлу. Ви можете використовувати файли, збережені під час створення облікових записів.

Ви можете отримати ці файли знову, створивши резервну копію облікового запису. Натисніть на три крапки на своєму обліковому записі, виберіть `Create a backup file for this account`  та введіть свій пароль.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. Відкрийте розширення та натисніть кнопку `+` у правому верхньому куті, потім виберіть `Restore account from backup JSON file`.

2. У відкритому вікні завантажте JSON-файл, введіть пароль та натисніть `Restore`.

3. Переконайтеся, що для облікових записів у розширенні Polkadot.js вибрана мережа Robonomics. На порталі Polkadot / Substrate перейдіть до `Setting` -> `Metadata` та натисніть кнопку `Update metadata`.

4. Підтвердьте оновлення метаданих у спливаючому вікні. Тепер розширення буде показувати мітку мережі, для якої використовується адреса.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Активація підписки Robonomics 

<robo-wiki-note type="okay">

Для цього кроку вам потрібно мати достатню кількість токенів XRT (мінімум 2-3 XRT) на вашому обліковому записі `sub_owner`.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. Перейдіть до додатку Robonomics на [сторінку підписк](https://dapp.robonomics.network/#/subscription) та натисніть кнопку підключення облікового запису у правій бічній панелі.

2. У випливаючому меню підключіть розширення Polkadot.js. Ви побачите адресу вашого облікового запису з балансом.

3. Перед покупкою переконайтеся, що ви вибрали обліковий запис `sub_owner`. Натисніть значок профілю адреси, ви повинні побачити обліковий запис `sub_owner` у полі `Check owner account`.

4. Натисніть кнопку `SUBMIT` та введіть пароль для вашого облікового запису. Після цього зачекайте, поки процес активації завершиться. Через деякий час ви побачите стан вашої підписки.


## Додавання облікових записів до підписки

Тепер вам потрібно додати обліковий запис `sub_controller` до **списку доступу**.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. Відкрийте розширення та натисніть на значок поряд з ім'ям облікового запису. Він скопіює адресу облікового запису.


2. Вставте цю адресу в поле `Robonomics parachain address` в розділі **Керування доступом**. Дайте йому ім'я та натисніть кнопку `+`. 

3. Повторіть кроки 1 і 2 для облікового запису `sub_owner`.

4. Натисніть `Save`. У спливаючому вікні введіть пароль вашого облікового запису `sub_owner` та зачекайте, поки процес активації завершиться.
