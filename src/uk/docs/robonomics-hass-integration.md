---
title: Налаштування інтеграції Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Інтеграція Robonomics Home Assistant 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**У цій статті ви додасте Robonomics до Home Assistant. Це дозволить Home Assistant записувати журнали даних з зашифрованими даними на Robonomics Parachain та слухати команди запуску з parachain для управління розумними пристроями. Інтеграція використовує IPFS для зберігання даних та відправки хешів IPFS до функцій журналу даних або запуску.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'налаштування інтеграції'}%} {% endroboWikiPicture %}

Спочатку вам потрібно створити конфігурацію для вашої панелі керування. Для цього відкрийте свою панель керування Home Assistant і у правому верхньому куті натисніть кнопку "Редагувати панель" (олівець).
У відкритому вікні натисніть на іконку з трьома крапками та виберіть кнопку "Взяти керування":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'налаштування інтеграції'}%} {% endroboWikiPicture %}

Натисніть "Взяти керування" ще раз:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'налаштування інтеграції'}%} {% endroboWikiPicture %}

Тепер ви можете встановити інтеграцію Robonomics. Для цього виконайте наступні кроки:
 

1. У веб-інтерфейсі Home Assistant перейдіть до `Налаштування` -> `Пристрої та сервіси` та натисніть `ДОДАТИ ІНТЕГРАЦІЮ`. Знайдіть `Robonomics`.

2. Клацніть на Robonomics, завантажте ваш файл налаштувань (з назвою `robonomics.app-settings-<subscirption-name>-server.json`, де `<subscirption-name>` - це назва вашої підписки), та введіть пароль для облікового запису `CONTROLLER`. Інструкції зі створення файлу налаштувань можна знайти [тут](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"створення контролера"} %}{% endroboWikiPicture %}

3. Опціонально: Ви можете вибрати, яку мережу використовувати.

4. Натисніть `ПІДТВЕРДИТИ` після завершення налаштувань. Якщо ви все ввели правильно, ви побачите вікно успішного завершення. 

{% roboWikiNote {type: "okay", title: "" }%} Інсталяція може зайняти приблизно 10–15 хвилин, залежно від вашого Інтернет-з'єднання. {% endroboWikiNote %}

Це все! Ви повністю налаштували Інтеграцію Robonomics в Home Assistant. Тепер ви можете використовувати всі
веб-сервіси Robonomics. Щоб дізнатися більше про них, перейдіть до розділу ["Використання"](/docs/add-user).