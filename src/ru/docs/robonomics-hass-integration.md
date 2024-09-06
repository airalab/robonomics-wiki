---
title: Настройка интеграции Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**В этой статье вы добавите Robonomics в Home Assistant. Это позволит Home Assistant записывать журналы данных с зашифрованными данными в Robonomics Parachain и принимать команды запуска с парачейна для управления умными устройствами. Интеграция использует IPFS для хранения данных и отправки хешей IPFS в функции журнала данных или запуска.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. В веб-интерфейсе Home Assistant перейдите в `Настройки` -> `Устройства и сервисы` и нажмите `ДОБАВИТЬ ИНТЕГРАЦИЮ`. Найдите `Robonomics`.

2. Нажмите на Robonomics и заполните конфигурацию:

- Добавьте seed из аккаунта `SUB_CONTROLLER` в seed управляющего аккаунта.
- Добавьте публичный адрес аккаунта `SUB_OWNER` в адрес владельца подписки.
- Установите интервал отправки данных (по умолчанию 10 минут).
- (По желанию) Вы можете добавить учетные данные для сервиса пиннинга Pinata или другого пользовательского шлюза, чтобы распространить свои данные шире по сети IPFS.

{% roboWikiNote {title:"Примечание", type: "Note"}%} В разделе [Настройка Pinata](/docs/pinata-setup) вы можете найти более подробную информацию об использовании Pinata.{% endroboWikiNote %}

3. Нажмите `ПОДТВЕРДИТЬ` после завершения конфигурации. Если вы все заполнили правильно, вы увидите окно успешного завершения.

Вот и все! Вы полностью настроили интеграцию Robonomics в Home Assistant. Теперь вы можете использовать все
веб-сервисы Robonomics. Чтобы узнать больше о них, перейдите в раздел ["Использование"](docs/add-user).