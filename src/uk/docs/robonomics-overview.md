---
title: Огляд
contributors: [ensrationis]
---

Robonomics — це хмара для пристроїв на Polkadot. У хмарі зберігається опис ваших пристроїв і їхній поточний стан. Туди можна записувати вимірювання і через неї надсилати команди. Платите ви в XRT, токені мережі. Хмарою не керує одна компанія: її підтримують незалежні колатори, а рішення ухвалюють власники XRT голосуванням у блокчейні.

## Основні частини

- **Дерево пристроїв (CPS).** Дерево вузлів, яке описує вашу інсталяцію: будівлю, кімнати в ній, пристрої в кімнатах. Кожен вузол зберігає короткий опис і поточний стан. Власник вирішує, хто і в яку частину дерева може писати. Сьогодні це основа Robonomics. Див. [Дерево пристроїв (CPS)](/docs/device-tree/).
- **XRT.** Токен мережі. Ним сплачують комісії та підписки, ним же голосують власники. Див. [XRT та управління](/docs/xrt-and-governance/).
- **Управління.** Стандартний OpenGov із Polkadot із двома треками. Ключа Sudo немає: будь-яка привілейована зміна, зокрема оновлення рантайму, проходить через референдум.
- **Колатори.** Сервери, які виробляють блоки. Стати кандидатом може будь-хто, хто внесе заставу в XRT. Див. [Запуск колатора](/docs/run-collator/).

Старі компоненти (Datalog, Launch, підписки RWS, Digital Twin, Liability) досі працюють, але визнані застарілими. Див. [Застарілі палети](/docs/legacy-pallets/).

## Мережа

| | |
|---|---|
| Мережа | Парачейн Robonomics у Polkadot |
| Para ID | 3388 |
| Токен | XRT, 9 знаків після коми |
| Формат адреси | Префікс SS58 32 (адреси починаються з `4`) |
| Час блоку | 6 секунд (цільовий) |
| Публічний RPC | `wss://polkadot.rpc.robonomics.network/` |
| Оглядач блоків | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [відкрити з RPC Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Polkadot — єдина робоча мережа Robonomics. Парачейн у Kusama зупинено. Див. [XRT в інших мережах](/docs/xrt-migration/).

## Що зараз розробляється

Robonomics 5.0 додає хмару шарами. Управління та дерево пристроїв зі Scope і Access уже працюють. Підписки в розробці: пристрій зможе користуватися мережею, не тримаючи XRT сам. Сховище та обчислення заплановані, коду для них поки немає.

Докладніше — у статті блогу [Robonomics 5.0, частина перша](https://robonomics.network/blog/robonomics-5-0-runtime-first/) і в [дорожній карті 5.0](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Програми та супровід

Усі програми Robonomics відкриті:

- [airalab/robonomics](https://github.com/airalab/robonomics): рантайм і його палети.
- [airalab/robins](https://github.com/airalab/robins): інструменти, зокрема консольна утиліта `cps` і шлюзи для пристроїв.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): бібліотека для Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): вебзастосунок [robonomics.app](https://robonomics.app).

Окремої програми-ноди Robonomics немає. Колатори запускають універсальний `polkadot-omni-node` від Parity зі специфікацією ланцюга Robonomics.

Сайти Robonomics, зокрема цю вікі, підтримує Akagi Engineering Co., Ltd. (Японія). Новини та нотатки до випусків публікуються в [блозі Robonomics](https://robonomics.network/blog/).
