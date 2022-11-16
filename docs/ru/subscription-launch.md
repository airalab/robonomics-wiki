---
title: Как отправить Launch с помощью подписки
 
contributors: [LoSk-p, katerina510]
translated: true
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Dev Node">

  Обратите внимание, что этот туториал демонстрируется на парачейне Робономики в сети Кусама. Вы также можете повторить все эти
  шаги на [локлаьной ноде](/docs/run-dev-node).

</robo-wiki-note>

Если Ваш адрес относится к устройствам с любой подпиской, Вы можете отправлять экстринсики без комиссии. Давайте попробуем отправить `launch`.

Перейдите в `Developer/Extrinsics`, выберите Ваш аккаунт (тот, что был добавлен в список устройств) и `rws -> call`. 
Затем в поле `subscriptionID` впишите адрес владельца подписки (тот, что приобретал ее через аукцион) и в следующем поле
выберите `launch -> launch`. В поле `robot` впишите адрес, куда Вы хотите отправить транзакцию `launch` и 
введите команду (подробнее о командах Launch [здесь](/docs/launch)). Совершите транзакцию:

![launch](../images/rws/launch.png)


Перейдите в `Network/Explorer`. В `Recent Events` вы увидите два события - `rws.NewCall` и `launch.NewLaunch`:

![события](../images/rws/events.png)
