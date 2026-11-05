---
title: Підключення пристроїв
contributors: [Fingerling42, nakata5321, ensrationis]
---

Підключити пристрої до Robonomics можна двома способами: через Home Assistant або напряму, з будь-яким пристроєм, який уміє підписувати транзакції чи спілкуватися зі шлюзом.

Готове обладнання та встановлення розумного дому пропонує Pinout Limited. Товари й послуги — на [pinout.cloud](https://pinout.cloud).

## Home Assistant

Для Home Assistant є три інтеграції. Вони роблять різне і підтримуються неоднаково.

| Інтеграція | Що робить | Стан |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Стежить за проблемами в Home Assistant. Шифрує звіт про помилку, завантажує його в IPFS і записує CID у блокчейн. Звіт стає заявкою в підтримку у вашого інтегратора. Раз на добу також надсилає сигнал «я живий». | Підтримується. Виходить у вигляді пре-релізів. Потрібен Home Assistant 2026.3.1 або новіший; встановлюється через HACS як користувацький репозиторій. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | Віддалений доступ до Home Assistant через зашифровані транзакції за підпискою RWS, а також користувачі та резервні копії. | Не оновлюється. Останній випуск — 2.2.1 від жовтня 2025. Використовує старий `robonomics-interface` 1.6.3, потребує локальної ноди IPFS, а точки підключення за замовчуванням досі ведуть у Kusama, яку зупинено. Можна вибрати точку підключення Polkadot. З поточним рантаймом не перевірялася. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | Читає датчик Altruist локальною мережею. Блокчейн не використовує. | Невелика, лише локальна. |

Інтеграція Robonomics від airalab залежить від підписок RWS. Їхній поточний стан описано в розділі [Застарілі палети](/docs/legacy-pallets/#rws-subscriptions).

## Будь-який пристрій

З цих кроків складається підключення вашого власного пристрою.

1. **Дайте пристрою власний акаунт.** Ключ лишається на пристрої.
2. **Оплачуйте його транзакції.** Або переведіть на акаунт трохи XRT (на момент написання запис datalog коштує частку тисячної XRT), або додайте його до підписки RWS через `rws.set_devices` (до 32 пристроїв) і надсилайте його транзакції через `rws.call`.
3. **Опишіть інсталяцію в дереві пристроїв.** Створіть вузол для об'єкта і вузли для його пристроїв. Прив'яжіть акаунт пристрою до його вузла як ідентичність вузла. Якщо за пристрій пише шлюз, видайте шлюзу `Write`. Див. [Дерево пристроїв (CPS)](/docs/device-tree/).
4. **Записуйте дані.** Кладіть поточний стан у `payload` вузла (до 8 КіБ) або пишіть записи через `datalog.record` (до 512 байтів, [застарілий палет](/docs/legacy-pallets/#datalog)). Великі дані покладіть в IPFS і запишіть їхній CID.
5. **Надсилайте команди, якщо потрібно.** Застарілий виклик `launch` надсилає на акаунт пристрою подію з підписаною командою. Див. [Launch](/docs/legacy-pallets/#launch).

Бібліотеки для кожного кроку: Python `robonomics-interface`, JavaScript `@polkadot/api` і Rust `libcps` з утилітою `cps`. Див. [Клієнтські бібліотеки](/docs/client-libraries/).

### Шлюзи для малих пристроїв

Не кожен пристрій може працювати з блокчейном. Посередині стають ці відкриті шлюзи:

- **edge** ([airalab/robins](https://github.com/airalab/robins)): приймає підписані повідомлення через HTTP і Meshtastic і передає їх далі через libp2p GossipSub.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): перетворює повідомлення MQTT на оновлення дерева пристроїв.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): збирає підписані вимірювання датчиків і передає їх в IPFS pubsub і парачейн. Обслуговує датчики на [sensors.social](https://sensors.social).

Публічні ретранслятори та їхній стан — на [pubsub.robonomics.network](https://pubsub.robonomics.network).
