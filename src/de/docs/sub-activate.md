---
title: Abonnement aktivieren
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.8.2
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

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Gehen Sie zur Robonomics-dApp und navigieren Sie zur [Abonnementseite](https://robonomics.app/#/rws-buy). Klicken Sie dann auf `Konto verbinden` in der rechten Seitenleiste.

2. Verbinden Sie im folgenden Popup-Menü die Polkadot.js-Erweiterung. Sie sehen Ihre Kontoadresse zusammen mit dem Kontostand.

3. Stellen Sie vor dem Kauf sicher, dass Sie das `OWNER`-Konto ausgewählt haben. Klicken Sie auf das Adressprofil-Symbol, und Sie sollten das `OWNER`-Konto sehen.

4. Klicken Sie abschließend auf die Schaltfläche `ABONNEMENT KAUFEN` und geben Sie das Passwort für Ihr Konto ein. Warten Sie, bis der Aktivierungsprozess abgeschlossen ist. Sie sehen den Status Ihres Abonnements nach einer Weile.

## Richten Sie Ihr Abonnement ein

Jetzt müssen Sie Ihr Abonnement einrichten, indem Sie das `CONTROLLER`-Konto hinzufügen.

{% roboWikiPicture {src:"docs/home-assistant/sub-download-backup.png",alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Gehen Sie zur Robonomics dApp und navigieren Sie zur [Einrichtung einer Abonnementseite](https://robonomics.app/#/rws-setup). Navigieren Sie zum Abschnitt **Abonnementeinstellungen**.

2. Klicken Sie auf `BACKUP HERUNTERLADEN` und wählen Sie die Option `FÜR DEN SERVER`.

{% roboWikiNote {type: "warning", title: "Wichtige Information" }%} Diese Aktion erstellt einen neuen Controller für Ihr Abonnement. Vergessen Sie nicht, ihn dem Abonnement hinzuzufügen. {% endroboWikiNote %}

3. Erstellen Sie im Popup ein Passwort für das `CONTROLLER`-Konto.

{% roboWikiPicture {src:"docs/home-assistant/server-new-settings.png", alt:"Controller erstellen"} %}{% endroboWikiPicture %}

4. Im nächsten Popup sehen Sie die Adresse Ihres neuen Kontos und die mnemonische Seed-Phrase. Speichern Sie die mnemonische Seed-Phrase sicher. Im Download-Ordner finden Sie zwei JSON-Dateien: Die erste Datei ist `Controller-<Adresse>.json`, wobei `<Adresse>` die Adresse Ihres neu generierten Controllers ist. Die zweite Datei heißt `robonomics.app-settings-<Abonnement-Name>-server.json`, wobei `<Abonnement-Name>` der Name Ihres Abonnements ist. Speichern Sie diese Dateien sicher, da sie später für die Integrationseinrichtung benötigt werden. Darüber hinaus können Sie Ihren Controller importieren.Konto in Ihre Brieftasche importieren. Anweisungen zum Importieren in die Polkadot.js-Erweiterung finden Sie [hier](/docs/create-account-in-dapp/).

{% roboWikiPicture {src:"docs/home-assistant/controller-acc.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

5. (Optional) Sie können Anmeldeinformationen für den Pinning-Dienst Pinata oder ein anderes benutzerdefiniertes Gateway hinzufügen, um Ihre Daten breiter über das IPFS-Netzwerk zu verteilen.

{% roboWikiNote {title:"Hinweis", type: "Hinweis"}%} Im Abschnitt [Pinata Setup](/docs/pinata-setup) finden Sie ausführlichere Informationen zur Verwendung von Pinata.{% endroboWikiNote %}

6. Popup schließen und auf die Schaltfläche `SPEICHERN` klicken.

{% roboWikiPicture {src:"docs/home-assistant/save-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

## Controller-Konto zur Abonnement hinzufügen

Jetzt müssen Sie Ihr `CONTROLLER`-Konto zur **Zugriffsliste** hinzufügen.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. Gehen Sie zur Robonomics dApp undNavigieren Sie zur [Einrichten einer Abonnementseite](https://robonomics.app/#/rws-setup). Stellen Sie sicher, dass Sie das richtige Abonnement und das `OWNER`-Konto ausgewählt haben.

2. Kopieren Sie die `CONTROLLER`-Adresse: Öffnen Sie die Erweiterung und klicken Sie auf das Symbol neben dem Kontonamen oder kopieren Sie die Adresse aus dem Abschnitt **Abonnementeinstellungen**.

3. Fügen Sie diese Adresse in das Feld `Polkadot-Adresse` im Abschnitt **BENUTZER IM ABONNEMENT** ein und klicken Sie auf die Schaltfläche `+`.

4. Geben Sie das Passwort für Ihr `OWNER`-Konto im Popup-Fenster ein und warten Sie dann auf den Abschluss des Aktivierungsprozesses.

Das war's. Gehen Sie zum nächsten Artikel.