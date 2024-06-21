---
title: Настройка интеграции Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**В этой статье вы добавите Robonomics в Home Assistant. Это позволяет Home Assistant записывать журналы данных с зашифрованными данными в Robonomics Parachain и прослушивать команды запуска от парачейна для управления умными устройствами. Интеграция использует IPFS для хранения данных и отправки хэшей IPFS в функции журнала данных или запуска.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. В веб-интерфейсе Home Assistant перейдите в `Settings` -> `Device & Services` и нажмите `ADD INTEGRATION`. Найдите `Robonomics`.

2. Нажмите на Robonomics и заполните конфигурацию: 

- Добавьте seed из аккаунта `SUB_CONTROLLER` в seed аккаунта контроллера.
- Добавьте публичный адрес аккаунта `SUB_OWNER` в адрес владельца подписки.
- Установите интервал отправки данных (по умолчанию 10 минут).
- (По желанию) Вы можете добавить учетные данные для сервиса пиннинга Pinata или другого пользовательского шлюза, чтобы распространить свои данные шире по сети IPFS.

3. Нажмите `Отправить` после завершения конфигурации. Если вы заполнили все правильно, вы увидите окно успешного завершения.

Вот и все! Вы полностью настроили Интеграцию Робономики в Home Assistant. Теперь вы можете использовать все
веб-сервисы Robonomics. Чтобы узнать больше о них, перейдите в раздел ["Использование".](/docs/global-administration)
