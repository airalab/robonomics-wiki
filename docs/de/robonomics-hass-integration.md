---
title: Robonomics Integration Setup

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In diesem Artikel fügen Sie Robonomics zu Home Assistant hinzu. Dadurch kann Home Assistant Datalogs mit verschlüsselten Daten auf Robonomics Parachain aufzeichnen und Startbefehle von der Parachain empfangen, um intelligente Geräte zu steuern. Die Integration verwendet IPFS, um Daten zu speichern und IPFS-Hashes an Datalog- oder Startfunktionen zu senden.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. Gehen Sie im Webinterface von Home Assistant zu `Settings` -> `Device & Services` und klicken Sie auf `ADD INTEGRATION`. Suchen Sie nach `Robonomics`.

2. Klicken Sie auf Robonomics und füllen Sie die Konfiguration aus: 

- Fügen Sie den Seed des `SUB_CONTROLLER`-Kontos zum Controller-Kontoseed hinzu.
- Fügen Sie die öffentliche Adresse des `SUB_OWNER`-Kontos zur Abonnementbesitzeradresse hinzu.
- Legen Sie das Intervall für das Senden von Daten fest (standardmäßig 10 Minuten).
- (Optional) Sie können Anmeldeinformationen für den Pinning-Dienst Pinata oder ein anderes benutzerdefiniertes Gateway hinzufügen, um Ihre Daten breiter im IPFS-Netzwerk zu verteilen.

3. Drücken Sie nach Abschluss der Konfiguration `SUBMIT`. Wenn Sie alles korrekt ausgefüllt haben, sehen Sie das Erfolgsfenster.

Das ist alles! Sie haben Robonomics Integration vollständig in Home Assistant eingerichtet. Jetzt können Sie alle Robonomics-Webdienste nutzen. Um mehr darüber zu erfahren, gehen Sie zum ["Verwendung"-Abschnitt](/docs/global-administration). 
