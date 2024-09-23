---
title: Benutzer hinzufügen

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**Dieser Artikel zeigt Ihnen, wie Sie einen neuen Benutzer zu Ihrem Home Assistant hinzufügen können.**

## Benutzer zur Abonnement hinzufügen

Sie können keine zuvor erstellten Konten verwenden, da `OWNER` und `CONTROLLER` Sicherheit bieten, und der erste Benutzer, den Sie erstellt haben, als Sie Home Assistant zum ersten Mal gestartet haben, hat kein Robonomics Parachain-Konto.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Erstellen Sie ein Konto auf der Robonomics-Parachain, wie Sie es im [vorherigen Artikel](/docs/sub-activate/) getan haben.

2. Verwenden Sie das `OWNER`-Konto, um das neue Benutzerkonto auf der `SETUP A SUBSCRIPTION`-Seite in der [Robonomics DApp](https://robonomics.app/#/rws-setup) zum Abonnement hinzuzufügen. Jetzt sollten in der `USERS IN SUBSCRIPTION`-Sektion drei Adressen in der Zugriffsliste stehen: `OWNER`, `CONTROLLER` und `USER`.


## RWS Setup JSON-Datei

Zunächst sollte der Benutzer die JSON-Datei mit den Informationen des RWS-Setups erhalten.

### RWS Setup JSON erstellen

Der Administrator kann auf der [SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)-Seite mit der Schaltfläche `Download import for other users` eine JSON-Datei für sein Setup erstellen.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### RWS Setup importieren

Nun kann der Benutzer mit dieser JSON-Datei das RWS-Setup mithilfe der Schaltfläche `IMPORT SETUP` importieren.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Zugriff für Benutzer gewähren

Auf derselben Seite ([SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)) können Sie das Passwort für den neuen Benutzer festlegen.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Wählen Sie das Konto aus, das Sie gerade auf der rechten Seite erstellt haben (überprüfen Sie, ob Sie das beabsichtigte Konto ausgewählt haben, indem Sie auf das Profilsymbol klicken).

2. Geben Sie die Adresse und den Seed-Phrase des `USER` in die erforderlichen Felder ein.

3. Geben Sie ein Passwort ein und bestätigen Sie die Transaktion mit der Schaltfläche `CREATE PASSWORD`, die aufgrund des Abonnements jetzt gebührenfrei ist.

4. Nach dem Registrierungsprozess melden Sie sich bei Home Assistant mit Ihrer Benutzeradresse als Login und einem neu erstellten Passwort an.

Jetzt können Sie die Dapp verwenden, um Ihr Zuhause über Robonomics zu steuern, überprüfen Sie den Artikel [**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/).