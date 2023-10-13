---
title: Create Account for Robonomics Parachaв 

contributors: [PaTara43, Fвgerlвg42]
---

**Для взаємодії та роботи з Robonomics Parachain розробникам та користувачам потрібно створити обліковий запис на порталі Polkadot / Substrate. Обліковий запс виконує основні функції для мережі: ваша публічна адреса мережі (публічний ключ), контроль доступу до адреси та коштів (приватний ключ), відправка транзакцій в мережу, відображення ваших токенів та їх кількості і т.д. Нижче наведено два основних способи створення облікового запису для Robonomics Parachain.**

## 1. Використання розширення Polkadot{.js} Browser

Розширення Polkadot надає механізм для генерації облікового запису та взаємодії з усіма проектами Polkadot / Kusama, включаючи Robonomics Parachain. Це не найбезпечніший спосіб керування вашим обліковим записом, але він найзручніший з точки зору балансу безпеки / зручності.

## 1.1. Встановлення розширення браузера

Розширення браузера доступне для [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) and [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (плюс браузери на основі Chromium).

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. Відкриття додатку Robonomics Parachain

Перейдіть до [Додаток Robonomics Parachain](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) на порталі Polkadot / Substrate. Якщо це ваш перший вхід на портал, він запросить доступ до розширення браузера, тому дозвольте доступ. 

Після відкриття додатку подивіться в верхньому лівому куті. Там відображаються назва мережі, її значок та номер останнього блоку. Клацнувши на цю область, ви відкриєте список усіх мереж Polkadot / Kusama, включаючи тестові мережі та локальні вузли. Ви можете перемикатися між мережами, вибравши потрібну та натиснувши кнопку `Switch` **Переконайтеся, що ви підключені до Robonomics Parachain зараз**. 

![Додаток Robonomics Parachain](../images/creating-an-account/1.2-robonomics-app.png "Додаток Robonomics Parachain")

## 1.3. Оновлення метаданих розширення

Дуже ймовірно, що додаток попросить вас оновити метадані розширення, щоб відображати правильну інформацію про підключену вами мережу. Перейдіть до натисніть кнопку **Settings -> Metadata**, а потім у спливаючому вікні дозвольте розширенню це зробити. 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. Створення облікового запису в розширенні  

Відкрийте розширення браузера Polkadot{.js}. Клацніть велику кнопку плюс або виберіть `Create new account` з маленької кнопки плюс у верхньому правому куті. Ви повинні побачити наступне меню зі згенерованим мнемонічним насінням у вигляді дванадцяти слів та адресою. `Create new account` Насіння - це ваш ключ до облікового запису. Знання насіння дозволяє вам (або будь-кому, хто знає насіння) отримати контроль над цим обліковим записом і навіть перестворити його, якщо ви забудете пароль. 

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

Дуже важливо зберігати його в надійному місці **найкраще на папері або іншому недігітальному пристрої, а не в цифровому сховищі або на комп'ютері**, Збережіть насіння та натисніть. 

Збережіть насіння та натисніть `Next step`. Ви повинні побачити наступне меню.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* дозволяє вам вибрати, для якої мережі цей обліковий запис буде використовуватися виключно. Ви можете використвувати одну й ту саму адресу на кількох мережах, проте з міркувань конфіденційності рекомендується створити нову адресу для кожної мережі, яку ви використовуєте. 
Виберіть мережу Robonomics зі списку. Якщо ви не знайшли мережу Robonomics, то, ймовірно, ви не оновили метадані, поверніться назад і зробіть це.

    - Ви помітите, що формат адреси та піктограми облікового запису зміняться - це нормально. Різні формати мережі є лише іншими представленнями одного й того ж публічного ключа. 

- *Name* - це лише ім'я облікового запису, яке використовується виключно вами. Воно не зберігається в блокчейні і не буде видно іншим користувачам. 

- *Password* використовується для шифрування інформації вашого облікового запису. Вам потрібно буде ввести його повторно при підписанні транзакцій на порталі. Створіть його і запам'ятайте.

В результаті після створення облікового запису ви побачите його в списку облікових записів у розширенні Polkadot{.js}. Натиснувши на три крапки, ви можете перейменувати обліковий запис, експортувати його, видалити його з розширення та змінити мережу, яка використовується для облікового запису. 

Also, the account will з'явиться в the **Accounts -> Accounts** menu on the portal, wтут it will be noted that it was injected за допомогою the extension.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")

## 2. Прямо на додатку Robonomics Parachain

Ви можете використовувати користувацький інтерфейс на порталі Polkadot / Substrate для створення облікового запису. Його можна використовувати для розробки та тестування. 

## 2.1. Відкрийте додаток Robonomics Parachain

Перейдіть до [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) на порталі Polkadot / Substrate. **Перевірте вгорі лівому куті, що ви підключені до Robonomics Parachain**.  

Перейдіть до **Accounts -> Accounts** та натисніть `Add account` Переконайтеся, що ви підключені до Robonomics Parachain зараз 

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. Створення облікового запису

Ви повинні побачити наступне спливаюче меню з насінним фразом облікового запису. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

Він має дві форми: *Mnemonic* (зручна для читання) і *Raw* (послідовність цифр і літер). Збережіть фразу-сід безпечно і натисніть `Next`.

> Також ви можете змінити тип криптовалюти для створення облікового запису, для цього відкрийте `Advanced creation options` і виберіть тип (`ed25519` на зображенні).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

У наступному меню потрібно встановити ім'я облікового запису та пароль, аналогічно до інструкцій розширення, описаних вище.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

Натискання на кнопку `Next` перенесе вас до останнього вікна. Натисніть `Save` щоб завершити створення облікового запису. Він також згенерує резервні JSON-файли, які ви повинні безпечно зберігати. Ви можете використовувати цей файл пізніше, щоб відновити свій обліковий запис, якщо ви пам'ятаєте пароль.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 Додати обліковий запис ed25519 до розширення Polkadot

Можливо, вам знадобиться додати створений обліковий запис до розширення Polkadot.js (для облікового запису ed25519 ви можете зробити це лише з резервним JSON-файлом). Для цього вам потрібно створити резервну копію облікового запису. Натисніть на три крапки на своєму обліковому записі та виберіть `Create a backup file for this account` і введіть свій пароль.

![Backup file](../images/creating-an-account/backup-file.jpg)

Потім відкрийте розширення та натисніть кнопку `+` в правому верхньому куті, потім виберіть `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

У відкритому вікні перетягніть збережений файл, введіть пароль і натисніть `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. Обліковий запис успішно створено 

Тепер ви можете повністю користуватися своїм свіжоствореним обліковим записом. Надсилайте та отримуйте токени, повідомлення, пишіть даталог та багато іншого. Вільно досліджуйте всі можливості додатку. Щоб скопіювати адресу свого облікового запису, просто натисніть на його значок, адреса буде скопійована в буфер обміну. 

Якщо ви бажаєте дізнатися більше про облікові записи Polkadot / Kusama та додаткові способи їх створення, додаткову інформацію можна знайти [тут](https://wiki.polkadot.network/docs/learn-accounts) i [тут](https://wiki.polkadot.network/docs/learn-account-generation).
