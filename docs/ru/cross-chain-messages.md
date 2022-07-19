---
title: Межсетевой обмен сообщениями
locale: 'ru' 
contributors: [Vourhey, LoSk-p, katerina510]
translated: true
---

XCM (протокол межсетевого обмена) позволяет отправлять сообщения между парачейнами.Вы можете отправлять транзакцию launchXcm для запуска/остановки Вашего робота или транзакцию datalogXcm для сохранения данных в блокчейне.

https://www.youtube.com/watch?v=a6XrqoaYhK8&feature=emb_logo

## Создаем аккаунт

Давайте попробуем отправить сообщение с Земли на Марс.
Перейдите в [parachain.robonomics.network](https://parachain.robonomics.network/#/explorer) и выберите тестнет `Airalab Rococo`:

![тестнеты](../images/cross-chain/testnet.jpg)

В `Network/Parachains` Вы увидите два парачейна с их ID:

![id](../images/cross-chain/Parachains_id.jpg)

Далее перейдите к парачейну Earth и [создайте](https://wiki.robonomics.network/docs/ru/create-account-in-dapp/) два аккаунта (например, `ROBOT` и `EMPLOYER`). В новой вкладке перейдите к парачейну Mars.

## LaunchXcm

В парачейне Earth выберите `Developer/Extrinsics`, Ваш аккаунт `EMPLOYER` и launchXcm. Затем впишите ID парачейна Mars (2000) и выберите аккаунт `ROBOT`:

![launch](../images/cross-chain/launch.jpg)

Теперь нажмите `Submit Transaction`.

Чтобы увидеть Ваши транзакции в парачейне Mars, перейдите в `Network/Explorer` и посмотрите Recent Events.

![recent_launch](../images/cross-chain/recent_launch.jpg)

## DatalogXcm

В парачейне Earth перейдите в `Developer/Extrinsics`, выберите Ваш аккаунт `ROBOT` и datalogXcm. Напишите ID парачейна Mars (2000) и сообщение:

![datalog](../images/cross-chain/datalog.jpg)

Далее нажмите `Submit Transaction`.

Вы можете видеть Вашу транзакцию в Recent Events в парачейне Mars:

![recent_datalog](../images/cross-chain/recent_datalog.jpg)
