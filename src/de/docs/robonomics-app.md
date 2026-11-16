---
title: robonomics.app nutzen
contributors: [vol4tim, positivecrash, ensrationis]
---

[robonomics.app](https://robonomics.app) ist die Web-App für Robonomics. Damit kaufen Sie ein Abonnement, verbinden Home Assistant, steuern Ihr Zuhause aus jedem Browser und sehen sich den Gerätebaum und Sensordaten an. Diese Seite geht die App Bildschirm für Bildschirm durch.

Sie brauchen eine Polkadot-Wallet-Erweiterung mit einem Konto auf Robonomics. Um etwas zu kaufen oder eine Transaktion zu senden, braucht das Konto etwas XRT. Siehe [Erste Schritte](/docs/getting-started/).

## Wallet verbinden

Die Wallet-Schaltfläche ist oben rechts. Wählen Sie ein Konto aus Ihrer Erweiterung und erlauben Sie der Seite, es zu nutzen. Mit derselben Schaltfläche wechseln Sie das Netzwerk. Nutzen Sie Polkadot.

## Abonnement kaufen

**Buy/renew a subscription** im Menü.

- Die Seite zeigt den Preis, die Aktivierungszeit (etwa zwei Minuten) und wie viele Abonnements gerade verfügbar sind.
- Ihr Guthaben muss den Preis plus eine kleine Gebühr decken.
- Eine Transaktion bietet auf eine freie Auktion und fügt Ihr Konto dem Abonnement hinzu.
- Sind keine Abonnements verfügbar, kommen neue erst nach einer Governance-Abstimmung hinzu. Siehe [Legacy-Pallets](/docs/legacy-pallets/#current-state).

Mit dem Abonnement können die darin eingetragenen Konten Transaktionen ohne Gebühren senden. So spricht Home Assistant mit der Chain. Details: [RWS-Abonnements](/docs/legacy-pallets/#rws-subscriptions).

## Setup hinzufügen

Ein Setup ist Ihr Zuhause aus Sicht der App: ein Abonnement und die damit verbundenen Konten. **New setup** im Menü bietet drei Wege, eines hinzuzufügen:

- **Über die Adresse des Eigentümers.** Fügen Sie die Adresse ein, die das Abonnement hält. Die App findet das Abonnement und zeigt sein Enddatum, auch wenn es schon abgelaufen ist.
- **Mit der Erweiterung.** Wählen Sie das Eigentümerkonto aus Ihrer Wallet, statt es einzutippen.
- **Aus einer Datei.** Laden Sie eine Sicherung hoch, die Sie früher exportiert haben.

Die Liste der Setups liegt nur in Ihrem Browser. Wenn Sie ein Setup aus der App entfernen, verschwindet es nur aus dieser Liste. On-chain ändert sich nichts.

## Your setup

**Your setup** zeigt ein Abonnement:

- **Active until.** Das Enddatum, rot, sobald es überschritten ist.
- **Owner.** Das Konto, das das Abonnement hält.
- **Controller.** Das Konto, mit dem Ihr Home Assistant in die Chain schreibt. Die Home-Assistant-Integration legt es an; Sie fügen es hier ein.
- **Users.** Die Konten, die das Zuhause steuern dürfen. Einen Nutzer hinzuzufügen oder zu entfernen ist eine Transaktion des Eigentümers.
- **Subscription backup.** Exportiert das Setup in eine Datei. Um in einen anderen Browser oder auf ein anderes Gerät umzuziehen, laden Sie diese Datei unter **New setup** hoch.

## Geräte und Steuerung

**Devices & Control** öffnet Ihr Home-Assistant-Dashboard im Browser.

- Wählen Sie einen Nutzer und geben Sie dessen Schlüsselphrase ein. Die App entschlüsselt damit die Daten von Home Assistant. Sie bleibt im Browser.
- Setzen Sie das Häkchen bei **Keep me signed in** nur auf einem Gerät, dem Sie vertrauen.
- Die App verbindet sich direkt mit Home Assistant, Peer-to-Peer. Ist keine direkte Verbindung möglich, läuft sie über ein Relay. Die Daten sind auf dem ganzen Weg verschlüsselt.

Damit diese Seite funktioniert, braucht Home Assistant die Robonomics-Integration. Unter [Geräte verbinden](/docs/connect-devices/#home-assistant) steht, welche Integrationen es gibt und wie aktuell sie sind.

## Gerätebaum

**Device tree** im Menü zeigt den [Gerätebaum](/docs/device-tree/) von Robonomics 5.0.

- Die Startseite listet die Wurzelknoten und ihre Eigentümer.
- Öffnen Sie einen Knoten über seine Nummer oder über das Konto seines Geräts.
- Eine Knotenseite zeigt den Pfad zur Wurzel, den Eigentümer, das Gerätekonto, `meta` und `payload` (JSON und Text werden als Text angezeigt), die Kinder und die Zugriffseinträge.
- Mit einem verbundenen Konto können Sie einen Wurzelknoten anlegen, Knoten, die Ihnen gehören, Kinder hinzufügen und `meta` und `payload` bearbeiten, wo Sie Eigentümer sind oder `Write`-Zugriff haben. Alles im Baum ist öffentlich.

## Datalog

**Send your first record** auf der Startseite öffnet die Datalog-Seite.

- Geben Sie bis zu 512 Byte ein und senden Sie ab. Die Gebühr liegt deutlich unter 0,001 XRT.
- Darunter sehen Sie die Einträge eines beliebigen Kontos, die neuesten zuerst. Die Chain behält die letzten 128 Einträge pro Konto.

Datalog ist ein [Legacy-Pallet](/docs/legacy-pallets/#datalog). Es eignet sich gut als erster Test. Für Geräte nutzen Sie den Gerätebaum.

## Sensoren und digitale Zwillinge

- **Altruist.** Öffnen Sie `robonomics.app/#/altruist/<sensor address>`, um die on-chain gespeicherten Messwerte des Sensors zu sehen: Feinstaub, Lärm, Temperatur, Luftfeuchtigkeit und Luftdruck in hPa auf einer eigenen Achse. Siehe [Altruist und sensors.social](/docs/altruist/).
- **Energiemonitor.** Öffnen Sie `robonomics.app/#/energy-monitor/<address>`, um dasselbe für einen Energiemonitor zu sehen.
- **Digitaler Zwilling.** Listet Ihre Zwillinge und die Konten hinter jedem Topic. Siehe [DigitalTwin](/docs/legacy-pallets/#digitaltwin).

Hat eine Adresse keine Messwerte, sagt die Seite das, statt endlos zu laden.

## Wenn etwas nicht funktioniert

- **Die App verbindet sich mit dem falschen Netzwerk.** Die App merkt sich eine Netzwerkadresse, die einmal in einem Link übergeben wurde. Öffnen Sie einmal `https://robonomics.app/?rpc=wss://polkadot.rpc.robonomics.network/`, um zurückzuwechseln.
- **Ein Uniswap-Link zeigt einen anderen Token.** Das produktive XRT auf Ethereum ist `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. Der alte Token `0x7dE9…1cb7` ist kein produktives XRT. Siehe [XRT in anderen Netzwerken](/docs/xrt-migration/).
- **Ein Kusama-Abonnement lässt sich nicht verwalten.** Robonomics auf Kusama wurde eingestellt, die App arbeitet nur mit Abonnements auf Polkadot. Siehe [XRT in anderen Netzwerken](/docs/xrt-migration/).
- **Alles andere.** Eröffnen Sie ein Issue unter [github.com/airalab/robonomics.app](https://github.com/airalab/robonomics.app/issues). Geben Sie die Build-Version aus der Browserkonsole an. Sie wird beim Start der App ausgegeben.
