---
title: Как отправить Launch с помощью подписки
locale: 'ru' 
contributors: [LoSk-p, katerina510]
translated: true
---

Если Ваш адрес относится к устройствам с любой подпиской, Вы можете отправлять экстринсики без комиссии. Давайте попробуем отправить `launch`.

Перейдите в `Developer/Extrinsics`, выберите Ваш аккаунт (`MAIN` на картинке) и `rws -> call`. Затем в поле `subscriptionID` впишите адрес владельца подписки (`SUBSCRIPTION OWNER` на картинке) и в следующем поле выберите `launch -> launch`. В поле `robot` впишите адрес, куда Вы хотите отправить транзакцию `launch` (`LIGHTBULB (EXTENTION)` на картинке) и выберите параметр `Yes` или `No`. Чтобы совершить транзакцию:

![launch](../images/dev-node/launch.png)


Перейдите в `Network/Explorer`. В `Recent Events` вы увидите два события - `rws.NewCall` и `launch.NewLaunch`:

![события](../images/dev-node/events.png)
