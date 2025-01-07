---
title: Настройка интеграции Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**В этой статье вы добавите Robonomics в Home Assistant. Это позволит Home Assistant записывать журналы данных с зашифрованными данными в Robonomics Parachain и принимать команды на запуск с парачейна для управления умными устройствами. Интеграция использует IPFS для хранения данных и отправки хешей IPFS в функции журнала данных или запуска.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'настройка интеграции'}%} {% endroboWikiPicture %}

Прежде всего вам нужно создать конфигурацию для вашей панели управления. Для этого откройте свою панель управления Home Assistant и в правом верхнем углу нажмите кнопку "Редактировать панель" (карандаш).
В открывшемся всплывающем окне нажмите на значок трех точек и выберите кнопку "Взять контроль":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'настройка интеграции'}%} {% endroboWikiPicture %}

Нажмите "Взять контроль" еще раз:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'настройка интеграции'}%} {% endroboWikiPicture %}

Теперь вы можете установить интеграцию Robonomics. Для этого выполните следующие шаги:
 

1. В веб-интерфейсе Home Assistant перейдите в `Настройки` -> `Устройства и сервисы` и нажмите `ДОБАВИТЬ ИНТЕГРАЦИЮ`. Найдите `Robonomics`.

2. Нажмите на Robonomics, загрузите ваш файл настройки (названный `robonomics.app-settings-<subscirption-name>-server.json`, где `<subscirption-name>` - это название вашей подписки) и введите пароль для учетной записи `CONTROLLER`. Инструкции по созданию файла настройки можно найти [здесь](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"создание контроллера"} %}{% endroboWikiPicture %}

3. По желанию: Вы можете выбрать, какую сеть использовать.

4. Нажмите `ПОДТВЕРДИТЬ` после завершения конфигурации. Если вы все заполнили правильно, вы увидите окно успешного завершения. 

{% roboWikiNote {type: "okay", title: "" }%} Установка может занять примерно 10–15 минут, в зависимости от вашего интернет-соединения. {% endroboWikiNote %}

Вот и все! Вы полностью настроили интеграцию Robonomics в Home Assistant. Теперь вы можете использовать все
веб-сервисы Robonomics. Чтобы узнать больше о них, перейдите в раздел ["Использование"](/docs/add-user).