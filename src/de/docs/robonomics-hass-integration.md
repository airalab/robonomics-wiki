---
title: Einrichtung der Robonomics-Integration

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In diesem Artikel fügen Sie Robonomics zu Home Assistant hinzu. Dadurch kann Home Assistant Datensätze mit verschlüsselten Daten an Robonomics Parachain senden und Startbefehle von der Parachain empfangen, um intelligente Geräte zu steuern. Die Integration verwendet IPFS, um Daten zu speichern und IPFS-Hashes an Datensatz- oder Startfunktionen zu senden.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Gehen Sie im Webinterface von Home Assistant zu `Einstellungen` -> `Geräte & Dienste` und klicken Sie auf `INTEGRATION HINZUFÜGEN`. Suchen Sie nach `Robonomics`.

2. Klicken Sie auf Robonomics und füllen Sie die Konfiguration aus:

- Fügen Sie den Seed des `SUB_CONTROLLER`-Kontos zum Seed des Controller-Kontos hinzu.
- Fügen Sie die öffentliche Adresse des `SUB_OWNER`-Kontos zur Abonnementbesitzeradresse hinzu.
- Legen Sie das Intervall für den Datenversand fest (standardmäßig alle 10 Minuten).
- (Optional) Sie können Anmeldeinformationen für den Pinning-Dienst Pinata oder ein anderes benutzerdefiniertes Gateway hinzufügen, um Ihre Daten breiter im IPFS-Netzwerk zu verteilen.

{% roboWikiNote {title:"Hinweis", type: "Hinweis"}%} Im Abschnitt [Pinata-Einrichtung](/docs/pinata-setup) finden Sie weitere detaillierte Informationen zur Verwendung von Pinata.{% endroboWikiNote %}

3. Klicken Sie nach Abschluss der Konfiguration auf `SENDEN`. Wenn Sie alles korrekt ausgefüllt haben, sehen Sie das Erfolgsfenster.

Das war's! Sie haben die Robonomics-Integration in Home Assistant vollständig eingerichtet. Jetzt können Sie alle Robonomics-Webdienste nutzen. Um mehr darüber zu erfahren, gehen Sie zum Abschnitt ["Verwendung"](docs/add-user).