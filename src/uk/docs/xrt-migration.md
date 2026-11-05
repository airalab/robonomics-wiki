---
title: XRT в інших мережах
contributors: [nakata5321, ensrationis]
---

Робочий XRT живе в парачейні Robonomics у Polkadot. На цій сторінці — що відбувається з XRT у Kusama та Ethereum і де XRT є в Polkadot Asset Hub.

## Kusama

Парачейн Robonomics у Kusama зупинено. Останній блок, #12,268,835, він виробив 28 вересня 2026 року. Архів бази даних лежить на [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

Що сказано про XRT у Kusama в опублікованих постах:

- Усі баланси XRT на останньому блоці переносяться в Polkadot з **бонусом +20%**.
- **Викупу** на боці Kusama **немає**.
- Де баланси з'являться в Polkadot і чи потрібно власникам щось робити, розкажуть в окремому пості.

Стежте за цим постом у [блозі Robonomics](https://robonomics.network/blog/). Джерела: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) і [сторінка токеноміки](https://robonomics.network/tokenomics/).

## Ethereum

Старий токен XRT в Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) застарів. 5 лютого 2026 року через вразливість у механізмі його емісії токени випускали безкоштовно. XRT у Polkadot і Kusama це не зачепило.

Власники старого токена на момент знімка (блок Ethereum 24,390,081) можуть перейти на новий:

1. Відкрийте застосунок міграції: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Підключіть гаманець, на якому був XRT 5 лютого 2026 року. Застосунок покаже баланс на момент знімка і суму з бонусом.
3. Виберіть один варіант. Кожна адреса обирає лише один раз.
   - **Accept**: отримати робочий XRT в Ethereum — баланс на момент знімка плюс 20%.
   - **Decline**: натомість узяти участь у програмі викупу за орієнтовною ціною $2.20. Виплати йдуть 12–36 місяців і лише в межах коштів скарбниці.

Перед підписом перевірте, що застосунок працює з контрактом видачі `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. Його вихідний код — у [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

Ви отримуєте робочий XRT в Ethereum, контракт `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. Це XRT, переведений 1:1 із Polkadot через [Snowbridge](https://app.snowbridge.network/send). Його можна зберігати, продавати на Uniswap або перевести в Polkadot. Мосту зі старого токена на новий немає.

Пости відводять на міграцію 12 місяців. XRT, не отриманий вчасно, можна відновити лише голосуванням у блокчейні з доказом володіння. Точні умови — у постах: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) і [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Питання — у Telegram-групі [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

XRT є в Polkadot Asset Hub як зовнішній актив (foreign asset), і там працює пул обміну DOT–XRT. Комісії в Asset Hub можна сплачувати в XRT.

Інструкції для користувачів щодо переказу XRT між Asset Hub і парачейном Robonomics поки немає.
