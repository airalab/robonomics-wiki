---
title: Abonnement aktivieren
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.7.0
    https://github.com/airalab/robonomics.app
---

**In diesem Artikel werden Sie Robonomics-Parachain-Konten erstellen und ein IoT-Abonnement kaufen.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Um Home Assistant mit Robonomics zu steuern, benötigen Sie 2 Konten auf der Robonomics-Parachain. Für eines der Konten (`OWNER`) werden Sie ein Robonomics-Abonnement kaufen. Das zweite Konto (`CONTROLLER`) wird alle Home Assistant-Prozesse steuern (wie Telemetrie) und anderen Benutzern Zugriff gewähren. Diese Konten bieten Sicherheit für Ihren Home Assistant.

Wenn Sie noch kein Konto haben, überprüfen Sie diesen Artikel und erstellen Sie [das OWNER-Konto](/docs/create-account-in-dapp/). Das Controller-Konto wird automatisch während der Einrichtung erstellt.

Im Artikel wird eine [Polkadot.js-Erweiterung](https://polkadot.js.org/extension/) Brieftasche verwendet, um mit Konten zu arbeiten, aber Sie können eine andere Brieftasche verwenden, die für Sie bequem ist.

## Robonomics-Abonnement aktivieren

{% roboWikiNote {type:"okay"} %}

Für diesen Schritt müssen Sie eine ausreichende Menge an XRT-Token (mindestens 2-3 XRT) auf Ihrem `OWNER`-Konto haben.

{% endroboWikiNote %}


{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['autoplay, loop, controls'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

1. Gehen Sie zur Robonomics dApp und navigieren Sie zur [Abonnementseite](https://robonomics.app/#/rws-buy). Klicken Sie dann auf `Konto verbinden` in der rechten Seitenleiste.

2. Verbinden Sie im folgenden Popup-Fenster die Polkadot.js-Erweiterung. Sie sehen Ihre Kontoadresse zusammen mit dem Kontostand.

3. Stellen Sie vor dem Kauf sicher, dass Sie das `OWNER`-Konto ausgewählt haben. Klicken Sie auf das Adressprofil-Symbol, und Sie sollten das `OWNER`-Konto sehen.

4. Klicken Sie abschließend auf die Schaltfläche `ABONNEMENT KAUFEN` und geben Sie das Passwort für Ihr Konto ein. Warten Sie, bis der Aktivierungsprozess abgeschlossen ist. Sie sehen den Status Ihres Abonnements nach einer Weile.

## Richten Sie Ihr Abonnement ein

Jetzt müssen Sie Ihr Abonnement einrichten, indem Sie das `CONTROLLER`-Konto hinzufügen.

{% roboWikiPicture {src:"docs/home-assistant/sub-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Gehen Sie zur Robonomics dApp und navigieren Sie zur [Einrichtung einer Abonnementseite](https://robonomics.app/#/rws-setup). Navigieren Sie zum Abschnitt **Abonnementeinstellungen**.

2. Drücken Sie im Feld `Controller's seed phrase` auf den Zauberstab, um ein neues `CONTROLLER`-Konto zu erstellen.

3. Erstellen Sie im Pop-up ein Passwort für das `CONTROLLER`-Konto.

4. Im nächsten Pop-up sehen Sie die Adresse Ihres neuen Kontos und die mnemonische Seed-Phrase. Speichern Sie die mnemonische Seed-Phrase sicher, da Sie sie später für die Integrationseinrichtung benötigen. Zusätzlich wird die JSON-Datei mit dem `CONTROLLER`-Konto heruntergeladen. Sie können sie in Ihre Brieftasche importieren. Wie das für die Polkadot.js-Erweiterung funktioniert, finden Sie [hier](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-create.jpg", alt:"controller create"} %}{% endroboWikiPicture %}

5. Schließen Sie das Pop-up und klicken Sie auf die Schaltfläche `SPEICHERN`.

## Fügen Sie das Controller-Konto dem Abonnement hinzu

Jetzt müssen Sie Ihr `CONTROLLER`-Konto zur **Zugriffsliste** hinzufügen.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay, loop, controls']} %}{% endroboWikiVideo %}

1. Gehe zur Robonomics dApp und navigiere zur [Einrichten einer Abonnementseite](https://robonomics.app/#/rws-setup). Stelle sicher, dass du das richtige Abonnement und das `OWNER`-Konto ausgewählt hast.

2. Kopiere die `CONTROLLER`-Adresse: Öffne die Erweiterung und klicke auf das Symbol neben dem Kontonamen oder kopiere die Adresse aus dem Abschnitt **Abonnementeinstellungen**.

3. Füge diese Adresse in das Feld `Polkadot-Adresse` im Abschnitt **BENUTZER IM ABONNEMENT** ein und klicke auf die `+`-Schaltfläche.

4. Gib das Passwort für dein `OWNER`-Konto im Popup-Fenster ein und warte dann auf den Abschluss des Aktivierungsprozesses.

Das war's. Gehe zum nächsten Artikel.