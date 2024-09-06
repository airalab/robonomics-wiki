---
title: Как отправить запуск с подпиской

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"Парачейн", type: "warning"}%}Обратите внимание, что в этом руководстве показано, как использовать подписку на парачейне Robonomics Kusama. Вы также можете выполнить все те же шаги на вашем [локальном узле](/docs/run-dev-node). {% endroboWikiNote %}

Если у вашего адреса есть активная подписка, то любые устройства, настроенные с использованием секрета этого аккаунта, могут отправлять экстрансиксы без комиссии.
Давайте попробуем отправить команду `launch`.

Перейдите на страницу `Developer/Extrinsics`, затем выберите свой аккаунт (тот, что из списка устройств) и выберите `rws -> call(subscriptionId, call)`.
Затем в поле `subscriptionId` вставьте адрес владельца подписки (того, кто сделал ставку на аукционе), а в следующем поле выберите `launch -> launch(robot, param)`. В поле `robot` введите адрес, на который хотите отправить транзакцию `launch`, и вставьте команду (для описания команды `launch` см. [здесь](/docs/launch)). Затем отправьте транзакцию:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}

Теперь перейдите на страницу `Network/Explorer`, и в области `Recent Events` вы увидите два события, которые вы создали: `rws.NewCall` и `launch.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}