---
title: Налаштування Pinata

contributors: [tubleronchik, LoSk-p]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Інтеграція Robonomics Home Assistant 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**У цій статті ви дізнаєтеся, як налаштувати [Pinata](https://www.pinata.cloud/) для закріплення файлів з інтеграцією Robonomics. Це покращує доступність файлів резервного копіювання та телеметрії.**

Щоб мати можливість закріплювати ваші файли на Pinata, спочатку вам потрібно створити обліковий запис. Потім перейдіть до розділу `Ключі API` та створіть новий ключ з наступними дозволами:

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

Потім скопіюйте `Ключ API` та `Секрет API` та зберігайте їх у приватності.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Якщо ви вже налаштували інтеграцію Robonomics, перейдіть до `Налаштування` -> `Пристрої та сервіси` та натисніть `налаштувати` в інтеграції Robonomics. Введіть ваші облікові дані Pinata.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}