---
title: Как использовать чертежи
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

В этой статье вы узнаете, как добавить автоматические чертежи в свой Home Assistant и настроить их.

## Автоматизация чертежей

Некоторые чертежи уже установлены. Автоматизации, основанные на таких чертежах, нужно только настроить. В веб-интерфейсе вы можете найти предустановленные чертежи в `Settings/Automations & Scenes`. Откройте `Blueprints` и найдите нужный вам чертеж. В этом примере будет использоваться `Motion-activated Light`. 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

Нажмите на `Create Automation`, чтобы открыть редактор автоматизации. Дайте имя, выберите чертеж для использования (`Motion-activated Light` в нашем случае). После этого вам нужно выбрать датчик движения и лампу. Когда конфигурация завершена, нажмите `Save`.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation Настройка" />

Если вы хотите внести изменения, вы можете найти их, перейдя в `Settings/Automations & Scenes`, а затем `Automations`. 

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## Импорт чертежей

Home Assistant может импортировать чертежи из  Home Assistant, GitHub и GitHub gists. Список всех чертежей находится на [Бирже чертежей](https://community.home-assistant.io/c/blueprints-exchange/53). После выбора перейдите в `Settings/Automations & Scenes` и откройте `Blueprints`. Нажмите на `Import Blueprint` и вставьте URL выбранного чертежа. Затем нажмите `PREVIEW BLUEPRINT`. В этом случае мы будем использовать [Обнаружение и уведомление о низком уровне заряда батареи для всех батарейных датчиков](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

Это загрузит чертеж и покажет предварительный просмотр в диалоговом окне импорта. Вы можете изменить имя и завершить импорт. Нажмите на `Create Automation`, чтобы открыть редактор автоматизации. Здесь вы можете настроить параметры автоматизации и добавить действия для получения уведомлений.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 