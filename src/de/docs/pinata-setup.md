---
title: Piñata Setup

contributors: [tubleronchik, LoSk-p]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Dieser Artikel führt Sie durch den Prozess der Konfiguration von [Piñata](https://www.pinata.cloud/) zum Anheften von Dateien aus der Robonomics-Integration. Dies verbessert die Zugänglichkeit von Backup- und Telemetriedateien.**

Um Ihre Dateien auf Piñata anheften zu können, müssen Sie zunächst ein Konto erstellen. Navigieren Sie dann zum Abschnitt `API-Schlüssel` und erstellen Sie einen neuen Schlüssel mit den folgenden Berechtigungen:

1. `Datei an IPFS anheften`
2. `Lösen`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

Kopieren Sie dann den `API-Schlüssel` und das `API-Geheimnis` und bewahren Sie sie privat auf.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Wenn Sie die Robonomics-Integration bereits eingerichtet haben, navigieren Sie zu `Einstellungen` -> `Geräte & Dienste` und klicken Sie in der Robonomics-Integration auf `konfigurieren`. Geben Sie Ihre Piñata-Anmeldeinformationen ein.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}