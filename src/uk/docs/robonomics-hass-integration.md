---
title: Налаштування інтеграції Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**У цій статті ви додасте Robonomics до Home Assistant. Це дозволить Home Assistant записувати журнали даних з зашифрованими даними на Robonomics Parachain та слухати команди запуску з парачейну для керування розумними пристроями. Інтеграція використовує IPFS для зберігання даних та відправки хешів IPFS до функцій журналу даних або запуску.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. У веб-інтерфейсі Home Assistant перейдіть до `Налаштування` -> `Пристрої та сервіси` та натисніть `ДОДАТИ ІНТЕГРАЦІЮ`. Знайдіть `Robonomics`.

2. Клацніть на Robonomics та заповніть конфігурацію:

- Додайте seed з облікового запису `SUB_CONTROLLER` до seed облікового запису контролера.
- Додайте публічну адресу облікового запису `SUB_OWNER` до адреси власника підписки.
- Встановіть інтервал відправлення даних (за замовчуванням це 10 хвилин).
- (Необов'язково) Ви можете додати облікові дані для сервісу підтримки Pinata або іншого користувацького шлюзу, щоб розповсюдити ваші дані ширше по мережі IPFS.

{% roboWikiNote {title:"Примітка", type: "Note"}%} У розділі [Налаштування Pinata](/docs/pinata-setup) ви знайдете більш детальну інформацію про використання Pinata.{% endroboWikiNote %}

3. Натисніть `НАДІСЛАТИ` після завершення налаштування. Якщо ви все заповнили правильно, ви побачите вікно успіху.

Ось і все! Ви повністю налаштували інтеграцію Robonomics у Home Assistant. Тепер ви можете використовувати всі веб-сервіси Robonomics. Щоб дізнатися більше про них, перейдіть до розділу ["Використання"](docs/add-user).