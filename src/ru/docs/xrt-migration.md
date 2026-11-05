---
title: XRT в других сетях
contributors: [nakata5321, ensrationis]
---

Рабочий XRT живёт в парачейне Robonomics в Polkadot. На этой странице — что происходит с XRT в Kusama и Ethereum и где XRT есть в Polkadot Asset Hub.

## Kusama

Парачейн Robonomics в Kusama остановлен. Последний блок, #12,268,835, он произвёл 28 сентября 2026 года. Архив базы данных лежит на [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

Что сказано о XRT в Kusama в опубликованных постах:

- Все балансы XRT на последнем блоке переносятся в Polkadot с **бонусом +20%**.
- **Выкупа** на стороне Kusama **нет**.
- Где балансы появятся в Polkadot и нужно ли держателям что-то делать, расскажут в отдельном посте.

Следите за этим постом в [блоге Robonomics](https://robonomics.network/blog/). Источники: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) и [страница токеномики](https://robonomics.network/tokenomics/).

## Ethereum

Старый токен XRT в Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) устарел. 5 февраля 2026 года через уязвимость в механизме его эмиссии токены выпускали бесплатно. XRT в Polkadot и Kusama это не затронуло.

Держатели старого токена на момент снимка (блок Ethereum 24,390,081) могут перейти на новый:

1. Откройте приложение миграции: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Подключите кошелёк, на котором был XRT 5 февраля 2026 года. Приложение покажет баланс на момент снимка и сумму с бонусом.
3. Выберите один вариант. Каждый адрес выбирает только один раз.
   - **Accept**: получить рабочий XRT в Ethereum — баланс на момент снимка плюс 20%.
   - **Decline**: вместо этого участвовать в программе выкупа по ориентировочной цене $2.20. Выплаты идут 12–36 месяцев и только в пределах средств казны.

Перед подписью проверьте, что приложение работает с контрактом выдачи `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`. Его исходный код — в [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

Вы получаете рабочий XRT в Ethereum, контракт `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. Это XRT, переведённый 1:1 из Polkadot через [Snowbridge](https://app.snowbridge.network/send). Его можно хранить, продавать на Uniswap или перевести в Polkadot. Моста со старого токена на новый нет.

Посты отводят на миграцию 12 месяцев. XRT, не полученный вовремя, можно восстановить только голосованием в блокчейне с доказательством владения. Точные условия — в постах: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) и [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Вопросы — в Telegram-группе [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

XRT есть в Polkadot Asset Hub как внешний актив (foreign asset), и там работает пул обмена DOT–XRT. Комиссии в Asset Hub можно платить в XRT.

Инструкции для пользователей по переводу XRT между Asset Hub и парачейном Robonomics пока нет.
