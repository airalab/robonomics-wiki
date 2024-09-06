---
title: Abonnement aktivieren
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp
    https://github.com/airalab/robonomics.app
---

In diesem Artikel werden Sie Robonomics-Parachain-Konten erstellen und ein IoT-Abonnement kaufen.

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Um Home Assistant mit Robonomics zu steuern, benötigen Sie 2 Konten auf der Robonomics-Parachain. Für eines der Konten (`OWNER`) werden Sie ein Robonomics-Abonnement kaufen. Das zweite Konto (`CONTROLLER`) wird alle Home Assistant-Prozesse steuern (wie Telemetrie) und anderen Benutzern Zugriff gewähren. Diese Konten bieten Sicherheit für Ihren Home Assistant.

{% roboWikiNote {title:"WARNUNG", type: "warning"}%}
Beide Konten müssen mit **ed25519**-Verschlüsselung erstellt werden. Daher müssen Sie ein Konto mit der erforderlichen Verschlüsselung über die Polkadot-JS UI erstellen.

Diese Funktion ist standardmäßig in der Polkadot-JS UI deaktiviert. Um sie zu aktivieren, navigieren Sie zu `Einstellungen` -> `Allgemein` -> `Kontooptionen` und wählen Sie `Lokale Speicherung von Konten im Browser zulassen` im Dropdown-Menü unter `Kontenerstellung im Browser zulassen`.
{% endroboWikiNote %}

## Eigentümer- und Controller-Konten erstellen

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Gehen Sie zur [Robonomics Parachain-App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) im Polkadot / Substrate-Portal. **Überprüfen Sie die obere linke Ecke, um sicherzustellen, dass Sie mit der Robonomics Parachain verbunden sind.**

2. Gehen Sie zu `Konten` -> `Konten` und klicken Sie auf die Schaltfläche `Konto hinzufügen`. Es wird ein Popup-Menü mit dem Kontoschlüssel angezeigt. Es hatzwei Formen: *Mnemonic* (menschlich lesbar) und *Raw* (eine Sequenz von Zahlen und Buchstaben).

3. Öffnen Sie `Erweiterte Erstellungsoptionen`, ändern Sie den Kryptotyp des zu erstellenden Kontos auf `Edwards - ed25519` und klicken Sie auf `Weiter`.

4. Speichern Sie den Mnemonic-Schlüssel sicher und klicken Sie auf `Weiter`.

5. Im nächsten Menü müssen Sie den Kontonamen und das Passwort festlegen. Nennen Sie es zur Vereinfachung `OWNER`. Klicken Sie auf `Weiter`.

6. Klicken Sie im abschließenden Fenster auf `Speichern`, um die Kontoerstellung abzuschließen. Dadurch werden auch Backup-JSON-Dateien generiert, die Sie sicher aufbewahren sollten. Sie können diese Datei später verwenden, um Ihr Konto wiederherzustellen, wenn Sie sich an das Passwort erinnern.

7. Wiederholen Sie diese Schritte, um ein Konto mit dem Namen `CONTROLLER` zu erstellen.


## Konten zu Polkadot.js hinzufügen

Zur Vereinfachung sollten Sie die [Polkadot.js-Erweiterung](https://polkadot.js.org/extension/) verwenden und diese neu erstellten Konten hinzufügen. Für ein ed25519-Konto können Sie dies nur mit einer Backup-JSON-Datei tun. Sie können die Dateien verwenden, die beim Erstellen der Konten gespeichert wurden.

Sie können diese Dateien erneut erhalten, indem Sie eine Sicherungsdatei des Kontos erstellen. Klicken Sie auf die drei Punkte neben Ihrem Konto, wählen Sie `Erstellen Sie eine Sicherungsdatei für dieses Konto` und geben Sie Ihr Passwort ein.

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Öffnen Sie die Erweiterung und klicken Sie auf die `+`-Schaltfläche oben rechts, wählen Sie dann `Konto aus Backup-JSON-Datei wiederherstellen`.

2. Laden Sie in dem geöffneten Fenster die JSON-Datei hoch, geben Sie das Passwort ein und klicken Sie auf `Wiederherstellen`.

3. Stellen Sie sicher, dass das Robonomics-Netzwerk für Konten in der Polkadot.js-Erweiterung ausgewählt ist. Gehen Sie auf Polkadot / Substrate Portal zu `Einstellungen` -> `Metadaten` und klicken Sie auf die Schaltfläche `Metadaten aktualisieren`.

4. Bestätigen Sie das Metadaten-Update im Popup. Die Erweiterung zeigt nun das Label des Netzwerks an, für das die Adresse verwendet wird.
{% roboWikiVideo {videos:[{src: 'QmXVhu17Qkx8VkAAVfm5mUBzSTq1BvaAF7MNdXLgZSvZcR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Aktivieren Sie das Robonomics-Abonnement

{% roboWikiNote {type: "okay"}%} Für diesen Schritt müssen Sie eine ausreichende Menge an XRT-Token (mindestens 2-3 XRT) auf Ihrem `OWNER`-Konto haben. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Gehen Sie zur Robonomics-dApp und navigieren Sie zur [Abonnementseite](https://robonomics.app/#/rws-buy). Klicken Sie dann auf `Konto verbinden` in der rechten Seitenleiste.

2. Verbinden Sie im folgenden Popup-Menü die Polkadot.js-Erweiterung. Sie sehen Ihre Kontoadresse zusammen mit dem Kontostand.

3. Stellen Sie vor dem Kauf sicher, dass Sie das `OWNER`-Konto ausgewählt haben. Klicken Sie auf das Adressprofil-Symbol, und Sie sollten das `OWNER`-Konto sehen.

4. Klicken Sie abschließend auf die Schaltfläche `ABONNEMENT KAUFEN` und geben Sie das Passwort für Ihr Konto ein. Warten Sie, bis der Aktivierungsprozess abgeschlossen ist. Sie sehen den Status Ihres Abonnements nach einer Weile.

## Richten Sie Ihr Abonnement ein

Jetzt müssen Sie Ihr Abonnement einrichten, indem Sie das `CONTROLLER`-Konto hinzufügen.

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}


1. Gehen Sie zur Robonomics-dApp und navigieren Sie zur [Seite zur Einrichtung eines Abonnements](https://robonomics.app/#/rws-setup). Navigieren Sie zum Abschnitt **ALLGEMEINE EINSTELLUNGEN**.

2. Entfernen Sie die Seed-Phrase aus dem Feld `Seed-Phrase des Controllers` und geben Sie die Seed-Phrase des `CONTROLLER`-Kontos ein.

3. Kopieren Sie die Adresse des `CONTROLLER`: Öffnen Sie die Erweiterung und klicken Sie auf das Symbol nebender Kontoname.

4. Fügen Sie diese Adresse in das Feld `Controller` ein und klicken Sie auf die Schaltfläche `SPEICHERN`.

## Konten zur Abonnement hinzufügen

Jetzt müssen Sie Ihr `CONTROLLER`-Konto zur **Zugriffsliste** hinzufügen.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Gehen Sie zur Robonomics dApp und navigieren Sie zur [Einrichtung einer Abonnementseite](https://robonomics.app/#/rws-setup). Stellen Sie sicher, dass Sie das richtige Abonnement und das `OWNER`-Konto ausgewählt haben.

2. Kopieren Sie die `CONTROLLER`-Adresse: Öffnen Sie die Erweiterung und klicken Sie auf das Symbol neben dem Kontonamen.

3. Fügen Sie diese Adresse in das Feld `Polkadot-Adresse` im Abschnitt **BENUTZER IM ABONNEMENT** ein und klicken Sie auf die Schaltfläche `+`.

4. Geben Sie das Passwort für Ihr `OWNER`-Konto im Popup-Fenster ein und warten Sie dann auf den Abschluss des Aktivierungsprozesses.