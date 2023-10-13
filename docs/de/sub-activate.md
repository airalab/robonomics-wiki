---
title: Abonnement aktivieren
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

In diesem Artikel erstellen Sie Robonomics Parachain-Konten und kaufen ein IoT-Abonnement. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Um Home Assistant mit Robonomics zu steuern, benötigen Sie 2 Konten auf der Robonomics Parachain. Für eines der Konten (`sub_owner`) kaufen Sie ein Robonomics-Abonnement. Das zweite Konto (`sub_controller`) steuert alle Home Assistant-Prozesse (wie Telemetrie) und gewährt anderen Benutzern Zugriff. Diese Konten bieten Sicherheit für Ihren Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Beide Konten müssen mit **ed25519**-Verschlüsselung erstellt werden. Aus diesem Grund müssen Sie über die Polkadot-JS-Benutzeroberfläche ein Konto erstellen und die erforderliche Verschlüsselung auswählen. 

Diese Funktion ist standardmäßig in der Polkadot-JS-Benutzeroberfläche deaktiviert. Um sie zu aktivieren, navigieren Sie zu `Settings` -> `General` -> `account options` und wählen Sie `Allow local in-browser account storage` im Dropdown-Menü `in-browser account creation`.

</robo-wiki-note>

## Erstellen Sie Eigentümer- und Controller-Konten

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. Gehen Sie zur [Robonomics Parachain-App](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) auf dem Polkadot / Substrate-Portal. ** Überprüfen Sie die linke obere Ecke, um sicherzustellen, dass Sie mit Robonomics Parachain verbunden sind. **

2. Gehen Sie zu `Accounts` -> `Accounts` und klicken Sie auf die Schaltfläche `Konto hinzufügen`. Es wird das Popup-Menü mit dem Kontoschlüssel angezeigt. Es hat zwei Formen: *Mnemonic* (lesbar für Menschen) und *Raw* (eine Folge von Zahlen und Buchstaben). 

3. Öffnen Sie `Advanced creation options`, ändern Sie den Kryptotyp zur Kontoerstellung in `Edwards - ed25519` und klicken Sie auf `Next`.


4. Speichern Sie den mnemonischen Seed-Satz sicher und klicken Sie auf `Next`.

5. Geben Sie im nächsten Menü den Kontonamen und das Passwort ein. Geben Sie ihm aus Bequemlichkeit den Namen `sub_owner`. Klicken Sie auf `Next`.

6. Klicken Sie im letzten Fenster auf `Save`, um die Kontenerstellung abzuschließen. Es wird auch eine Sicherungskopie der JSON-Dateien generiert, die Sie sicher aufbewahren sollten. Sie können diese Datei später verwenden, um Ihr Konto wiederherzustellen, wenn Sie das Passwort kennen.

7. Wiederholen Sie diese Schritte für ein Konto mit dem Namen `sub_controller`.


## Fügen Sie Konten zu Polkadot.js hinzu

Für Ihre Bequemlichkeit sollten Sie die [Polkadot.js-Erweiterung](https://polkadot.js.org/extension/) verwenden und diese neu erstellten Konten hinzufügen. Für ein ed25519-Konto können Sie dies nur mit einer Sicherungs-JSON-Datei tun. Sie können die Dateien verwenden, die beim Erstellen der Konten gespeichert wurden.

Sie können diese Dateien erneut erhalten, indem Sie eine Sicherungsdatei des Kontos erstellen. Klicken Sie auf drei Punkte neben Ihrem Konto, wählen Sie `Create a backup file for this account` und geben Sie Ihr Passwort ein.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. Öffnen Sie eine Erweiterung und klicken Sie oben rechts auf die Schaltfläche `+`, wählen Sie dann `Restore account from backup JSON file`.

2. Laden Sie in einem geöffneten Fenster die JSON-Datei hoch, geben Sie das Passwort ein und klicken Sie auf `Restore`.

3. Stellen Sie sicher, dass das Robonomics-Netzwerk für Konten in der Polkadot.js-Erweiterung ausgewählt ist. Gehen Sie auf dem Polkadot / Substrate-Portal zu `Setting` -> `Metadata` und klicken Sie auf die Schaltfläche `Update metadata`.

4. Bestätigen Sie die Metadatenaktualisierung im Popup. Die Erweiterung zeigt nun das Netzwerketikett an, für das die Adresse verwendet wird.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Robonomics-Abonnement aktivieren 

<robo-wiki-note type="okay">

Für diesen Schritt müssen Sie über ausreichend XRT-Token (mindestens 2-3 XRTs) auf Ihrem `sub_owner`-Konto verfügen.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. Gehen Sie zur Robonomics-Dapp zur [Abonnementseite](https://dapp.robonomics.network/#/subscription) und klicken Sie auf der rechten Seitenleiste auf `Konto verbinden`.

2. Verbinden Sie in dem folgenden Popup-Menü die Polkadot.js-Erweiterung. Sie sehen Ihre Kontoadresse mit Guthaben.

3. Überprüfen Sie vor dem Kauf, ob Sie das `sub_owner`-Konto ausgewählt haben. Klicken Sie auf das Adressprofil-Symbol, Sie sollten das `sub_owner`-Konto unter dem Feld `Check owner account` sehen.

4. Drücken Sie abschließend die Schaltfläche `SUBMIT` und geben Sie das Passwort für Ihr Konto ein. Warten Sie dann, bis der Aktivierungsprozess abgeschlossen ist. Sie sehen den Status Ihres Abonnements nach einer Weile.


## Fügen Sie Konten zum Abonnement hinzu

Jetzt müssen Sie der **Zugriffsliste** ein `sub_controller`-Konto hinzufügen.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. Öffnen Sie die Erweiterung und klicken Sie auf das Symbol neben dem Kontonamen. Dadurch wird die Kontoadresse kopiert.


2. Fügen Sie diese Adresse in das Feld `Robonomics parachain address` im Abschnitt **Zugriff verwalten** ein. Geben Sie ihm einen Namen und klicken Sie auf die Schaltfläche `+`. 

3. Wiederholen Sie die Schritte 1 und 2 für das `sub_owner`-Konto.

4. Drücken Sie `Save`. Geben Sie Ihr `sub_owner`-Passwort im Popup-Fenster ein und warten Sie, bis der Aktivierungsprozess abgeschlossen ist.
