---
title: Konto für Robonomics Parachain erstellen 

contributors: [PaTara43, Fingerling42]
---

**Um mit Robonomics Parachain interagieren und arbeiten zu können, müssen Entwickler und Benutzer ein Konto auf dem Polkadot/Substrat-Portal erstellen. Das Konto führt grundlegende Funktionen für das Netzwerk aus: Ihre öffentliche Netzwerkadresse (der öffentliche Schlüssel), die Zugriffskontrolle auf die Adresse und Gelder (der private Schlüssel), das Senden von Transaktionen an das Netzwerk, die Anzeige Ihrer Token und deren Betrag usw. Nachfolgend finden Sie diese Es gibt zwei Hauptmethoden, um ein Konto für Robonomics Parachain zu erstellen.**

## 1. Verwendung der Polkadot{.js} Browser-Erweiterung

Die Polkadot-Erweiterung bietet einen Mechanismus zur Generierung des Kontos und zur Interaktion mit allen Polkadot / Kusama-Projekten, einschließlich Robonomics Parachain. Dies ist nicht der sicherste Weg, Ihr Konto zu verwalten, aber er ist in Bezug auf Sicherheit / Benutzerfreundlichkeit am bequemsten ausbalanciert.

## 1.1. Browser-Erweiterung installieren

Die Browser-Erweiterung ist verfügbar für [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) and [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (plus Chromium-basierte Browser).

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. Robonomics Parachain-App öffnen

Gehe zu [Robonomics Parachain-App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) im Polkadot / Substrate-Portal. Wenn Sie zum ersten Mal das Portal betreten, wird es um Zugriff auf die Browser-Erweiterung bitten, also erlauben Sie den Zugriff. 

Nachdem Sie die App geöffnet haben, werfen Sie einen Blick in die obere linke Ecke. Darin werden der Name des Netzwerks, sein Symbol und die Nummer des letzten Blocks angezeigt. Wenn Sie auf diesen Bereich klicken, wird eine Liste aller Polkadot-/Kusama-Netzwerke geöffnet, einschließlich Testnetzwerke und lokaler Knoten. Sie können zwischen den Netzwerken wechseln, indem Sie das gewünschte Netzwerk auswählen  und klicken Sie aufing the `Switch` Taste drücken. **Stellen Sie sicher, dass Sie jetzt mit Robonomics Parachain verbunden sind**. 

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. Erweiterungsmetadaten aktualisieren

Es ist sehr wahrscheinlich, dass die App Sie auffordert, die Metadaten für die Erweiterung zu aktualisieren, um die korrekten Informationen über die mit Ihnen verbundene Kette anzuzeigen. Gehen Sie zu **Settings -> Metadata**, drücken Sie die `Update metadata` Taste und erlauben Sie dann in dem Popup-Fenster der Erweiterung, dies zu tun. 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. Konto in der Erweiterung erstellen

Öffnen Sie die Polkadot{.js} Browser-Erweiterung. Klicken Sie auf die große Plus-Taste oder wählen Sie `Create new account` aus dem kleinen Plus-Symbol oben rechts aus. Sie sollten das folgende Menü sehen, mit generiertem mnemonischen Seed in Form von zwölf Wörtern und der Adresse. 

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

Der Seed ist Ihr Schlüssel zum Konto. Wenn Sie den Seed kennen (oder jemand anderes, der den Seed kennt), können Sie die Kontrolle über dieses Konto übernehmen und es sogar neu erstellen, wenn Sie das Passwort vergessen. **Es ist sehr wichtig, ihn sicher aufzubewahren**, am besten auf Papier oder einem anderen nicht-digitalen Gerät, nicht in digitaler Speicherung oder auf einem Computer. 

Speichern Sie den Seed und drücken Sie `Next step`. Sie sollten das folgende Menü sehen.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* ermöglicht es Ihnen, auszuwählen, für welches Netzwerk dieses Konto ausschließlich verwendet werden soll. Sie können dieselbe Adresse in mehreren Netzwerken verwenden, es wird jedoch aus Datenschutzgründen empfohlen, für jedes verwendete Netzwerk eine neue Adresse zu erstellen. 
Wählen Sie das Robonomics-Netzwerk aus der Dropdown-Liste aus. Wenn Sie das Robonomics-Netzwerk nicht finden konnten, haben Sie wahrscheinlich die Metadaten nicht aktualisiert. Gehen Sie zurück und tun Sie dies.

    - Sie werden feststellen, dass sich das Format der Adresse und das Kontosymbol ändern - das ist normal. Unterschiedliche Netzwerkformate sind lediglich andere Darstellungen desselben öffentlichen Schlüssels. 

- *Name* ist nur der Kontoname für Ihren eigenen Gebrauch. Er wird nicht auf der Blockchain gespeichert und für andere Benutzer nicht sichtbar sein. 

- *Password* wird verwendet, um die Informationen Ihres Kontos zu verschlüsseln. Sie müssen es erneut eingeben, wenn Sie Transaktionen im Portal signieren. Erstellen Sie einen und merken Sie ihn sich.

Nach dem Erstellen eines Kontos sehen Sie es in der Liste der Konten in der Polkadot{.js}-Erweiterung. Durch Klicken auf drei Punkte können Sie das Konto umbenennen, exportieren, aus der Erweiterung entfernen und das für das Konto verwendete Netzwerk ändern. 

Außerdem wird das Konto in der **Accounts -> Accounts** Menü auf dem Portal, wo vermerkt wird, dass die Erweiterung unter Verwendung der gleichen Seeds injiziert wurde.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")


## 2. Direkt in der Robonomics Parachain App

Sie können die Benutzeroberfläche im Polkadot / Substrate Portal verwenden, um ein Konto zu erstellen. Es kann für Entwicklung und Tests verwendet werden. 

## 2.1. Öffnen Sie die Robonomics Parachain App

Gehe zu [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) im Polkadot / Substrate Portal. **Überprüfen Sie oben links, ob Sie mit Robonomics Parachain verbunden sind**.  

Gehe zu **Accounts -> Accounts** und klicken Sie auf die Schaltfläche „Konto hinzufügen“.

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. Konto erstellen

Sie sollten das folgende Popup-Menü mit dem Kontosamen sehen. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

Es hat zwei Formen: *Mnemonic* (lesbar für Menschen) und *Raw* (eine Sequenz von Zahlen und Buchstaben). Speichern Sie den Seed-Satz sicher und drücken Sie `Next`.

> Sie können auch den Kryptotyp für die Kontoerstellung ändern, indem Sie `Advanced creation options` öffnen und den Typ (`ed25519` auf dem Bild auswählen).

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

Im nächsten Menü müssen Sie den Kontonamen und das Passwort festlegen, ähnlich den oben beschriebenen Anweisungen für die Erweiterung.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

Durch Klicken auf die Schaltfläche `Next` gelangen Sie zum letzten Fenster. Klicken Sie auf `Save` um die Kontoerstellung abzuschließen. Es wird auch eine Sicherung der JSON-Dateien generiert, die Sie sicher aufbewahren sollten. Sie können diese Datei später verwenden, um Ihr Konto wiederherzustellen, wenn Sie sich an das Passwort erinnern.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 Fügen Sie dem Polkadot-Extension-Konto ein ed25519-Konto hinzu

Möglicherweise müssen Sie das erstellte Konto zur Polkadot.js-Erweiterung hinzufügen (für ein ed25519-Konto können Sie dies nur mit der Sicherungs-JSON-Datei tun). Dazu müssen Sie eine Sicherungsdatei des Kontos erstellen. Klicken Sie auf die drei Punkte neben Ihrem Konto und wählen Sie `Create a backup file for this account` und geben Sie Ihr Passwort ein.

![Backup file](../images/creating-an-account/backup-file.jpg)

Öffnen Sie dann eine Erweiterung und klicken Sie oben rechts auf die Schaltfläche `+` und wählen Sie `Restore account from backup JSON file`.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

Im geöffneten Fenster ziehen Sie die gespeicherte Datei, geben Sie das Passwort ein und klicken Sie auf `Restore`.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. Konto erfolgreich erstellt 

Jetzt können Sie vollständig mit Ihrem frisch erstellten Konto arbeiten. Senden und empfangen Sie Tokens, Nachrichten, schreiben Sie Datenprotokoll und vieles mehr. Erkunden Sie alle Funktionen der App. Um die Adresse Ihres Kontos zu kopieren, klicken Sie einfach auf das Symbol, die Adresse wird in die Zwischenablage kopiert. 

Wenn Sie mehr über Polkadot / Kusama-Konten und zusätzliche Möglichkeiten, sie zu erstellen, erfahren möchten, finden Sie weitere Informationen [hier](https://wiki.polkadot.network/docs/learn-accounts) und [hier](https://wiki.polkadot.network/docs/learn-account-generation).
