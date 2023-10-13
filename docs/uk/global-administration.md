---
title: Глобальне управління

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**У цій статті ви дізнаєтеся, як налаштувати нового користувача для вашого Home Assistant.**

## Додавання користувачів до підписки

Ви не можете використовувати раніше створені облікові записи, оскільки `SUB_OWNER` та `SUB_CONTROLLER` забезпечують безпеку, а перший користувач, якого ви створили, коли ви вперше запустили Home Assistant, не має облікового запису Robonomics Parachain.

1. Створіть обліковий запис на Robonomics parachain, як ви це зробили в [попередній статті](/docs/sub-activate/).

2. Використовуючи обліковий запис `SUB_OWNER`, додайте новий обліковий запис користувача до підписки в [dapp](https://dapp.robonomics.network/#/subscription/devices). Тепер у списку доступу повинно бути три адреси: `SUB_OWNER`, `SUB_CONTROLLER` та `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## Надання доступу користувачу

1. Перейдіть до служби dapp під назвою [Обліковий запис Home Assistant](https://dapp.robonomics.network/#/home-assistant). Виберіть обліковий запис, який ви щойно створили, у правій бічній панелі (перевірте, що ви вибрали потрібний обліковий запис, натиснувши значок профілю).

2. Введіть `USER` seed у відповідне поле. Додайте адреси `SUB_OWNER` та `SUB_CONTROLLER` у поля кредитів адміністратора. Якщо все вірно, ви побачите статус перевірки `ПЕРЕВІРЕНО`.

3. Створіть пароль для нового користувача, якого ви щойно зареєстрували, а потім підтвердіть транзакцію, яка тепер буде безкоштовною через підписку. Пізніше ви зможете відновити пароль у вкладці Відновлення.

4. Після процесу реєстрації увійдіть до Home Assistant за допомогою вашої адреси користувача як логіну та новоствореного пароля.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

Тепер ви можете використовувати dapp для керування вашим будинком через Robonomics, перегляньте статтю [**"Отримання телеметрії розумного будинку"**](/docs/smart-home-telemetry/).

## Усунення неполадок

1. Якщо ви забули пароль до домашнього помічника зі свого облікового запису Robonomics, [перевірте Dapp.](https://dapp.robonomics.network/#/home-assistant)
Перейдіть до частини "Your Home Assistant password" та виберіть вкладку "Restore".
