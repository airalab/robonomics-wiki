---
title: Налаштування інтеграції Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**У цій статті ви додасте Robonomics до Home Assistant. Це дозволяє Home Assistant записувати журнали даних з зашифрованими даними на Robonomics Parachain та слухати команди запску з parachain для керування розумними пристроями. Інтеграція використовує IPFS для зберігання даних та відправки хешів IPFS до функцій журналу даних або запуску.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. У веб-інтерфейсі Home Assistant перейдіть до `Settings` -> `Device & Services` та натисніть `ADD INTEGRATION`. Знайдіть `Robonomics`.

2. Клацніть на Robonomics та заповніть конфігурацію: 

- Додайте насіння з облікового запису `SUB_CONTROLLER` до насіння облікового запису контролера.
- Додайте публічну адресу облікового запису `SUB_OWNER` до адреси власника підписки.
- Встановіть інтервал відправки даних (за замовчуванням це 10 хвилин).
- (Необов'язково) Ви можете додати облікові дані для сервісу підтримки Pinata або іншого користувацького шлюзу, щоб розповсюджувати свої дані ширше по мережі IPFS.

3. Натисніть `SUBMIT` після завершення конфігурації. Якщо ви заповнили все правильно, ви побачите вікно успіху.

Ось і все! Ви повністю налаштували інтеграцію Robonomics в Home Assistant. Тепер ви можете використовувати всі 
Robonomics веб-сервіси. Щоб дізнатися більше про них, перейдіть до розділу ["Використання"](/docs/global-administration).
