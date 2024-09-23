---
title: Konto für Robonomics Parachain erstellen

contributors: [PaTara43, Fingerling42]
---

**Um mit dem Robonomics Parachain interagieren und arbeiten zu können, müssen Entwickler und Benutzer ein Konto im Polkadot / Substrate-Portal erstellen. Das Konto erfüllt grundlegende Funktionen für das Netzwerk: Ihre öffentliche Netzwerkadresse (der öffentliche Schlüssel), die Zugriffskontrolle auf die Adresse und die Mittel (der private Schlüssel), das Senden von Transaktionen an das Netzwerk, das Anzeigen Ihrer Token und deren Betrag usw. Im Folgenden sind zwei Hauptmethoden aufgeführt, um ein Konto für den Robonomics Parachain zu erstellen.**

## 1. Verwendung der Polkadot{.js} Browser-Erweiterung

Die Polkadot-Erweiterung bietet einen Mechanismus zum Generieren des Kontos und zur Interaktion mit allen Polkadot / Kusama-Projekten, einschließlich des Robonomics Parachain. Dies ist nicht der sicherste Weg, um Ihr Konto zu verwalten, aber er ist in Bezug auf Sicherheit / Benutzerfreundlichkeit am bequemsten.

## 1.1. Browser-Erweiterung installieren

Die Browser-Erweiterung ist verfügbar für [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) und [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (plus Chromium-basierte Browser).

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"Browser-Erweiterung"} %}{% endroboWikiPicture %}

## 1.2. Robonomics Parachain-App öffnen

Gehen Sie zur [Robonomics Parachain-App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) im Polkadot / Substrate-Portal. Wenn Sie zum ersten Mal in das Portal eingetreten sind, wird der Zugriff auf die Browser-Erweiterung angefordert, also erlauben Sie den Zugriff.

Sobald Sie die App geöffnet haben, werfen Sie einen Blick in die obere linke Ecke. Dort werden der Name des Netzwerks, sein Symbol und die Nummer des letzten Blocks angezeigt. Ein Klick auf diesen Bereich öffnet eine Liste aller Polkadot / Kusama-Netzwerke, einschließlich Testnetzwerken und lokalen Knoten. Sie können zwischen den Netzwerken wechseln, indem Sie das erforderliche auswählen und die `Switch`-Schaltfläche drücken. **Stellen Sie sicher, dass Sie**sind jetzt mit dem Robonomics Parachain verbunden**.

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"Robonomics Parachain-App"} %}{% endroboWikiPicture %}

## 1.3. Aktualisierung der Erweiterungsmetadaten und Erstellung von Konten im Browser

Es ist sehr wahrscheinlich, dass die App Sie auffordert, die Metadaten für die Erweiterung zu aktualisieren, um die korrekten Informationen über die Kette anzuzeigen, mit der Sie verbunden sind. Gehen Sie zu **Einstellungen -> Metadaten**, drücken Sie die Schaltfläche `Metadaten aktualisieren` und erlauben Sie dann in dem Popup-Fenster der Erweiterung, dies zu tun.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"Metadaten aktualisieren"} %}{% endroboWikiPicture %}

Standardmäßig funktioniert die Webanwendung nur mit externen Konten. Um die Erstellung neuer Konten direkt im Browser zu ermöglichen, gehen Sie zu **Einstellungen -> Allgemein -> Kontooptionen -> Kontoerstellung im Browser**, wählen Sie `Lokale Kontoerstellung im Browser zulassen` und drücken Sie die Schaltfläche `Speichern`.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"Aktualisierung der Kontenerstellung im Browser"} %}{% endroboWikiPicture %}

## 1.4. Konto in der Erweiterung erstellen

Öffnen Sie die Polkadot{.js}-Browsererweiterung. Klicken Sie auf die große Plus-Schaltfläche oder wählen Sie `Neues Konto erstellen` aus dem kleinen Plus-Symbol oben rechts. Sie sollten das folgende Menü sehen, mit einem generierten mnemonischen Seed in Form von zwölf Wörtern und der Adresse.

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"Kontoerstellung, Schritt eins"} %}{% endroboWikiPicture %}

Der Seed ist Ihr Schlüssel zum Konto. Wenn Sie den Seed kennen (oder jemand anderes den Seed kennt), können Sie die Kontrolle über dieses Konto übernehmen und es sogar neu erstellen, wenn Sie das Passwort vergessen. **Es ist sehr wichtig, ihn sicher aufzubewahren**, am besten auf Papier oder einem anderen nicht digitalen Gerät, nicht in digitaler Speicherung oder auf einem Computer.

Speichern Sie den Seed und drücken Sie `Nächster Schritt`. Sie sollten das folgende Menü sehen.

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"Kontoerstellung, Schritt zwei"} %}{% endroboWikiPicture %}


- *Netzwerk* ermöglicht es Ihnen, auszuwählen, für welche der Netzwerke dieses Konto ausschließlich verwendet werden soll. Sie können dieselbe Adresse auf mehreren Netzwerken verwenden, jedoch wird aus Datenschutzgründen empfohlen, für jedes verwendete Netzwerk eine neue Adresse zu erstellen.
Wählen Sie das Robonomics-Netzwerk aus der Dropdown-Liste aus. Wenn Sie das Robonomics-Netzwerk nicht finden konnten, haben Sie wahrscheinlich die Metadaten nicht aktualisiert. Gehen Sie zurück und tun Sie dies.

	`Sie werden feststellen, dass sich das Format der Adresse und das Kontosymbol ändern - das ist normal. Verschiedene Netzwerkformate sind lediglich andere Darstellungen des gleichen öffentlichen Schlüssels.`

- *Name* ist lediglich der Kontoname für Ihren eigenen Gebrauch. Er wird nicht auf der Blockchain gespeichert und anderen Benutzern nicht angezeigt.

- *Passwort* wird verwendet, um die Informationen Ihres Kontos zu verschlüsseln. Sie müssen es erneut eingeben, wenn Sie Transaktionen im Portal signieren. Erstellen Sie ein Passwort und merken Sie es sich.

Nachdem Sie ein Konto erstellt haben, sehen Sie es in der Liste der Konten in der Polkadot{.js}-Erweiterung. Durch Klicken auf drei Punkte können Sie das Konto umbenennen, exportieren, aus der Erweiterung entfernen und das für das Konto verwendete Netzwerk ändern.

Außerdem wird das Konto im **Accounts -> Accounts**-Menü auf dem Portal angezeigt, wo vermerkt wird, dass es unter Verwendung der Erweiterung eingefügt wurde.

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"Erfolgreiche Kontoerstellung"} %}{% endroboWikiPicture %}


## 2. Direkt in der Robonomics-Parachain-App

Sie können die Benutzeroberfläche auf dem Polkadot / Substrate-Portal verwenden, um ein Konto zu erstellen. Es kann für Entwicklung und Tests verwendet werden.

## 2.1. Öffnen Sie die Robonomics-Parachain-App

Gehen Sie zur [Robonomics Parachain-App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) auf dem Polkadot / Substrate-Portal. **Überprüfen Sie oben links, ob Sie mit der Robonomics-Parachain verbunden sind**.

Gehen Sie zu **Accounts -> Accounts** und klicken Sie auf die Schaltfläche `Konto hinzufügen`.

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"Robonomics Parachain-App"} %}{% endroboWikiPicture %}WikiPicture %}

## 2.2. Konto erstellen

Sie sollten das folgende Popup-Menü mit dem Kontoschlüssel sehen.

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"Kontoschlüssel generieren"} %}{% endroboWikiPicture %}

Es gibt zwei Formen: *Mnemonic* (menschlich lesbar) und *Raw* (eine Sequenz von Zahlen und Buchstaben). Speichern Sie die Schlüsselphrase sicher und klicken Sie auf `Weiter`.

> Sie können auch den Kryptotyp für die Kontoerstellung ändern, indem Sie `Erweiterte Erstellungsoptionen` öffnen und den Typ auswählen (`ed25519` auf dem Bild).

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"Konto mit ed25519 Kryptotyp"} %}{% endroboWikiPicture %}

Im nächsten Menü müssen Sie den Kontonamen und das Passwort festlegen, ähnlich wie in den obigen Anweisungen für die Erweiterung beschrieben.

{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"Kontoname und Passwort generieren"} %}{% endroboWikiPicture %}

Durch Klicken auf die Schaltfläche `Weiter` gelangen Sie zum letzten Fenster. Klicken Sie auf `Speichern`, um die Kontoerstellung abzuschließen. Es wird auch Sicherungs-JSON-Dateien generieren, die Sie sicher aufbewahren sollten. Sie können diese Datei später verwenden, um Ihr Konto wiederherzustellen, wenn Sie sich an das Passwort erinnern.

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"Erfolgreiche Kontoerstellung"} %}{% endroboWikiPicture %}

## 2.3 Fügen Sie das ed25519-Konto zur Polkadot-Erweiterung hinzu

Möglicherweise müssen Sie das erstellte Konto zur Polkadot.js-Erweiterung hinzufügen (für ein ed25519-Konto können Sie dies nur mit der Sicherungs-JSON-Datei tun). Dazu müssen Sie eine Sicherungsdatei des Kontos erstellen. Klicken Sie auf die drei Punkte neben Ihrem Konto und wählen Sie `Erstellen Sie eine Sicherungsdatei für dieses Konto` und geben Sie Ihr Passwort ein.

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"Sicherungsdatei"} %}{% endroboWikiPicture %}

Öffnen Sie dann die Erweiterung und klicken Sie auf die `+`-Schaltfläche oben rechts, wählen Sie dann `Konto aus Sicherungs-JSON-Datei wiederherstellen`.

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"Sicherung in der Erweiterung wiederherstellen"} %}{% endroboWikiPicture %}

Im geöffneten Fenster ziehen Sie die gespeicherte Datei, geben Sie das Passwort ein und drücken Sie `Wiederherstellen`.

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"Backup wiederherstellen in Erweiterung 2"} %}{% endroboWikiPicture %}

## 3. Konto erfolgreich erstellt

Jetzt können Sie vollständig mit Ihrem frisch erstellten Konto arbeiten. Senden und empfangen Sie Token, Nachrichten, schreiben Sie Datalog und mehr. Erkunden Sie alle Funktionen der App. Um die Adresse Ihres Kontos zu kopieren, klicken Sie einfach auf das Symbol, die Adresse wird in die Zwischenablage kopiert.

Wenn Sie mehr über Polkadot / Kusama-Konten und zusätzliche Möglichkeiten zu deren Erstellung erfahren möchten, finden Sie weitere Informationen [hier](https://wiki.polkadot.network/docs/learn-accounts) und [hier](https://wiki.polkadot.network/docs/learn-account-generation).