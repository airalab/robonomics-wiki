---
title: Guthaben auf Ihr Konto im Robonomics-Portal einzahlen

contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Nachdem Sie erfolgreich Ihre Konten im Robonomics-Portal erstellt haben, ist es an der Zeit, Geld auf diese Konten einzuzahlen, damit Sie Transaktionen initiieren können.**

<robo-wiki-note type="warning" title="Dev Node">

Bitte beachten Sie, dass diese und die folgenden Tutorials auf einer lokalen Instanz des Robonomics-Knotens demonstriert werden. Richten Sie Ihren eigenen mit [diesen Anweisungen](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navigieren Sie zum Abschnitt Konten im Robonomics-Portal. 

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. Wählen Sie das Konto aus, von dem aus Sie Geld überweisen möchten.

Im Entwicklungsmodus gibt es mehrere Konten mit jeweils 10000 Einheiten Guthaben, die verwendet werden können, um Geld auf sind. Diese Pfade können jedoch je nach Ihrer spezifischen Konfiguration variieren.ere Konten im Entwicklungsnetzwerk zu überweisen. Diese Konten sind durch Schraubenschlüssel-Symbole <img alt="wrench sign" src="../images/adding-funds/wrench.png" width="20" /> neben ihnen gekennzeichnet.

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- Klicken Sie auf die Schaltfläche "Senden" des Kontos, von dem aus Sie Geld überweisen möchten, zum Beispiel BOB.

## 3. Wählen Sie das Konto aus, auf das Sie Geld überweisen möchten.
Nach dem Klicken auf die Schaltfläche "Senden" werden Sie mit dem Fenster "Geld senden" aufgefordert. In dem angezeigten Fenster:

- Wählen Sie aus der Liste der verfügbaren Konten das Konto aus, auf das Sie Geld überweisen möchten.
- Geben Sie die Anzahl der Einheiten ein, die Sie senden möchten.
- Drücken Sie "Überweisung tätigen".

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. Autorisieren Sie die Transaktion.

Nach dem Drücken von "Überweisung tätigen" in der vorherigen Phase werden Sie mit dem Fenster "Transaktion autorisieren" aufgefordert.<br/>
Überprüfen Sie die Details der Transaktion und klicken Sie schließlich auf die Schaltfläche "Unterzeichnen und absenden".

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")
In diesem Beispiel haben wir 500 Einheiten Guthaben von "BOB" nach "EMPLOYER" überwiesen. Sie können sehen, dass das Konto von EMPLOYER, das anfangs kein Guthaben hatte, jetzt 500 Einheiten Guthaben hat.

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**Stellen Sie sicher, dass Sie genügend Guthaben auf den Konten haben, die Sie im Playground verwenden möchten.**