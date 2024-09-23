---
title: Настройка Pinata

contributors: [tubleronchik, LoSk-p]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Эта статья проведет вас через процесс настройки [Pinata](https://www.pinata.cloud/) для закрепления файлов из интеграции Robonomics. Это улучшает доступность резервных копий и файлов телеметрии.**

Чтобы иметь возможность закреплять ваши файлы на Pinata, сначала вам нужно создать учетную запись. Затем перейдите в раздел `API Keys` и создайте новый ключ с следующими разрешениями:

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

Затем скопируйте `API Key` и `API Secret` и храните их в тайне.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Если вы уже настроили интеграцию Robonomics, перейдите в `Settings` -> `Devices & Services` и нажмите `configure` в интеграции Robonomics. Введите ваши учетные данные Pinata.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}