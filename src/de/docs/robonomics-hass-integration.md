---
title: Einrichtung der Robonomics-Integration

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In diesem Artikel fügen Sie Robonomics zu Home Assistant hinzu. Dadurch kann Home Assistant Datensätze mit verschlüsselten Daten an Robonomics Parachain senden und Startbefehle von der Parachain empfangen, um intelligente Geräte zu steuern. Die Integration verwendet IPFS, um Daten zu speichern und IPFS-Hashes an Datensatz- oder Startfunktionen zu senden.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'Einrichtung der Integration'}%} {% endroboWikiPicture %}

Zunächst müssen Sie eine Konfiguration für Ihr Dashboard erstellen. Öffnen Sie dazu Ihr Home Assistant-Dashboard und klicken Sie oben rechts auf die Schaltfläche "Dashboard bearbeiten" (ein Bleistift).
In dem geöffneten Popup-Fenster klicken Sie auf das Symbol mit den drei Punkten und wählen Sie die Schaltfläche "Steuerung übernehmen":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'Einrichtung der Integration'}%} {% endroboWikiPicture %}

Drücken Sie noch einmal auf "Steuerung übernehmen":

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'Einrichtung der Integration'}%} {% endroboWikiPicture %}

Nun können Sie die Robonomics-Integration installieren. Befolgen Sie dazu diese Schritte:
 

1. Gehen Sie im Webinterface von Home Assistant zu `Einstellungen` -> `Geräte & Dienste` und klicken Sie auf `INTEGRATION HINZUFÜGEN`. Suchen Sie nach `Robonomics`.

2. Klicken Sie auf Robonomics, laden Sie Ihre Einrichtungsdatei hoch (benannt `robonomics.app-settings-<subscirption-name>-server.json`, wobei `<subscirption-name>` der Name Ihres Abonnements ist) und geben Sie das Passwort für das `CONTROLLER`-Konto ein. Anleitungen zur Erstellung der Einrichtungsdatei finden Sie [hier](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"Controller erstellen"} %}{% endroboWikiPicture %}

3. Optional: Sie können auswählen, welches Netzwerk verwendet werden soll.

4. Drücken Sie nach Abschluss der Konfiguration `SENDEN`. Wenn Sie alles korrekt ausgefüllt haben, sehen Sie das Erfolgsfenster. 

{% roboWikiNote {type: "okay", title: "" }%} Die Installation kann je nach Internetverbindung etwa 10–15 Minuten dauern. {% endroboWikiNote %}

Das war's! Sie haben die Robonomics-Integration vollständig in Home Assistant eingerichtet. Jetzt können Sie alle Robonomics-Webdienste nutzen. Um mehr darüber zu erfahren, besuchen Sie den Abschnitt ["Verwendung"](docs/add-user).