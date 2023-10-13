---
title: Як використовувати шаблони
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

У цій статті ви дізнаєтеся, як додати автоматизаційні шаблони до вашого Home Assistant та налаштувати їх.

## Автоматизації на основі шаблонів

Деякі шаблони уже встановлені. Автоматизації на основі таких шаблонів потребують лише налаштування. У веб-інтерфейсі ви можете знайти попередньо встановлені шаблони в розділі `Settings/Automations & Scenes`. Відкрийте `Blueprints` та знайдіть шаблон, який ви хочете використовувати. У цьому прикладі буде використано `Motion-activated Light`.

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

Клацніть `Create Automation`,  щоб відкрити редактор автоматизацій. Вкажіть назву, виберіть шаблон для використання (`Motion-activated Light` у нашому випадку). Після цього вам потрібно вибрати датчик руху та лампу. Коли налаштування завершено, клацніть ``Save`.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation Конфігурація" />

Якщо ви хочете внести зміни, ви можете знайти їх, перейшовши до `Settings/Automations & Scenes`, а потім `Automations`. 

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## Імпорт шаблонів

Home Assistant мож імпортувати шаблони з форумів Home Assistant, GitHub та GitHub gists. Список всіх шаблонів розташований на [Біржі шаблонів](https://community.home-assistant.io/c/blueprints-exchange/53). Після вибору перейдіть до `Settings/Automations & Scenes` та відкрийте `Blueprints`. Клацніть `Import Blueprint` та вставте URL обраного шаблону. Потім клацніть `PREVIEW BLUEPRINT`. У цьому випадку ми використовуватимемо [Виявлення та сповіщення про низький рівень заряду батареї для всіх датчиків батареї](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

Це завантажить шаблон та покаже попередній перегляд у діалоговому вікні імпорту. Ви можете змінити назву та завершити імпорт. Клацніть `Create Automation`, щоб відкрити редактор автоматизацій. Тут ви можете налаштувати параметри автоматизації та додати дії для отримання сповіщень.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 