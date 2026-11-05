---
title: Початок роботи
contributors: [Vourhey, positivecrash, ensrationis]
---

Ця сторінка проведе вас від нуля до першого запису в мережі Robonomics. Знадобляться браузер, розширення-гаманець і трохи XRT.

## 1. Створіть акаунт

1. Встановіть [розширення Polkadot.js](https://polkadot.js.org/extension/) або інший гаманець Polkadot, який уміє працювати з довільною мережею.
2. Створіть у гаманці акаунт. Запишіть фразу відновлення і зберігайте її офлайн.
3. Цей самий акаунт працює і в Robonomics. Robonomics показує адреси у своєму форматі (префікс SS58 32), тому там ваша адреса починається з `4`.

Акаунт з'являється в блокчейні, лише коли на ньому є хоча б екзистенційний депозит — 0.000001 XRT.

## 2. Отримайте XRT

Потрібно зовсім небагато. На момент написання комісія за запис datalog значно менша за 0.001 XRT.

Де зараз торгується XRT:

- **Uniswap в Ethereum.** Робочий XRT в Ethereum — це XRT, переведений із Polkadot через Snowbridge. Його контракт — `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [Обміняти на Uniswap](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). [Snowbridge](https://app.snowbridge.network/send) переводить токени між Ethereum і Polkadot.
- **Polkadot Asset Hub.** XRT є в Asset Hub, і там працює пул обміну DOT–XRT.

Переказ XRT з Asset Hub на ваш акаунт у парачейні Robonomics — це міжланцюговий переказ. Покрокової інструкції для нього поки немає. Якщо застрягли, запитайте в Telegram-групі [XRT Traders](https://t.me/xrt_trade).

{% roboWikiNote {type: "warning", title: "Старі посилання"}%} Деякі старі сторінки досі ведуть на біржі, де XRT більше немає, і на застарілий токен в Ethereum `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. Застарілий токен — це не робочий XRT. {% endroboWikiNote %}

## 3. Підключіть Polkadot.js Apps

Відкрийте [Polkadot.js Apps з RPC Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). Застосунок підключиться до публічної точки `wss://polkadot.rpc.robonomics.network/`. Дозвольте сайту доступ у розширенні-гаманці, щоб з'явився ваш акаунт.

Блоки, акаунти та перекази можна переглядати й в оглядачі блоків [scan.robonomics.network](https://scan.robonomics.network).

<a id="4-send-your-first-record"></a>

## 4. Надішліть перший запис

Найпростіше почати із запису datalog: це короткий фрагмент даних, який зберігається в блокчейні під вашим акаунтом.

1. У Polkadot.js Apps відкрийте **Developer → Extrinsics**.
2. Виберіть свій акаунт, потім `datalog` і `record`.
3. Введіть дані, до 512 байтів. Підійде звичайний текст.
4. Надішліть транзакцію і підпишіть її в гаманці.

Щоб прочитати запис, відкрийте **Developer → Chain state**, виберіть `datalog` і `datalogIndex` та запитайте свій акаунт. Ви побачите, в яких слотах лежать ваші записи. Потім запитайте `datalogItem` зі своїм акаунтом і номером слота. Кожен запис має мітку часу.

Datalog — один із [застарілих палетів](/docs/legacy-pallets/#datalog). Він працює і годиться для першої перевірки, але нові проєкти краще будувати на дереві пристроїв.

## 5. Далі: опишіть свої пристрої

Основа Robonomics — дерево пристроїв. Ви створюєте вузол для своєї інсталяції, додаєте вузли для її частин і пристроїв та вирішуєте, хто може їх оновлювати. Див. [Дерево пристроїв (CPS)](/docs/device-tree/), потім [Підключення пристроїв](/docs/connect-devices/).
