---
title: Обзор
contributors: [ensrationis]
---

Robonomics — это облако для устройств на Polkadot. В облаке хранится описание ваших устройств и их текущее состояние. Туда можно записывать измерения и через него отправлять команды. Платите вы в XRT, токене сети. Облаком не управляет одна компания: его поддерживают независимые коллаторы, а решения принимают держатели XRT голосованием в блокчейне.

## Основные части

- **Дерево устройств (CPS).** Дерево узлов, которое описывает вашу установку: здание, комнаты в нём, устройства в комнатах. Каждый узел хранит короткое описание и текущее состояние. Владелец решает, кто и в какую часть дерева может писать. Сегодня это основа Robonomics. См. [Дерево устройств (CPS)](/docs/device-tree/).
- **XRT.** Токен сети. Им оплачивают комиссии и подписки, им же голосуют держатели. См. [XRT и управление](/docs/xrt-and-governance/).
- **Управление.** Стандартный OpenGov из Polkadot с двумя треками. Ключа Sudo нет: любое привилегированное изменение, включая обновление рантайма, проходит через референдум.
- **Коллаторы.** Серверы, которые производят блоки. Стать кандидатом может любой, кто внесёт залог в XRT. См. [Запуск коллатора](/docs/run-collator/).

Старые компоненты (Datalog, Launch, подписки RWS, Digital Twin, Liability) по-прежнему работают, но признаны устаревшими. См. [Устаревшие паллеты](/docs/legacy-pallets/).

## Сеть

| | |
|---|---|
| Сеть | Парачейн Robonomics в Polkadot |
| Para ID | 3388 |
| Токен | XRT, 9 знаков после запятой |
| Формат адреса | Префикс SS58 32 (адреса начинаются с `4`) |
| Время блока | 6 секунд (целевое) |
| Публичный RPC | `wss://polkadot.rpc.robonomics.network/` |
| Обозреватель блоков | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [открыть с RPC Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Polkadot — единственная действующая сеть Robonomics. Парачейн в Kusama остановлен. См. [XRT в других сетях](/docs/xrt-migration/).

## Что сейчас разрабатывается

Robonomics 5.0 добавляет облако по слоям. Управление и дерево устройств со Scope и Access уже работают. Подписки в разработке: устройство сможет пользоваться сетью, не держа XRT само. Хранилище и вычисления запланированы, кода для них пока нет.

Подробнее — в статье блога [Robonomics 5.0, часть первая](https://robonomics.network/blog/robonomics-5-0-runtime-first/) и в [дорожной карте 5.0](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Программы и сопровождение

Все программы Robonomics открыты:

- [airalab/robonomics](https://github.com/airalab/robonomics): рантайм и его паллеты.
- [airalab/robins](https://github.com/airalab/robins): инструменты, в том числе консольная утилита `cps` и шлюзы для устройств.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): библиотека для Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): веб-приложение [robonomics.app](https://robonomics.app).

Отдельной программы-ноды Robonomics нет. Коллаторы запускают универсальный `polkadot-omni-node` от Parity со спецификацией цепи Robonomics.

Сайты Robonomics, включая эту вики, поддерживает Akagi Engineering Co., Ltd. (Япония). Новости и заметки о выпусках публикуются в [блоге Robonomics](https://robonomics.network/blog/).
