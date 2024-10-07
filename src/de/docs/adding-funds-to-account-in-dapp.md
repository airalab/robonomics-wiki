---
title: Hinzufügen von Geldern auf Ihrem Konto im Robonomics-Portal

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Nachdem Sie erfolgreich Ihre Konten im Robonomics-Portal erstellt haben, ist es an der Zeit, Gelder darauf hinzuzufügen, damit Sie Transaktionen initiieren können.**

{% roboWikiNote {title: 'Dev Node', type: "warning"} %}Bitte beachten Sie, dass diese und die folgenden Tutorials auf einer lokalen Instanz des Robonomics-Knotens demonstriert werden. Richten Sie Ihren eigenen mit [diesen Anweisungen](/docs/run-dev-node) ein.
{% endroboWikiNote %}

## 1. Navigieren Sie zum Abschnitt "Konten" im Robonomics-Portal

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. Wählen Sie das Konto aus, von dem Sie Gelder überweisen möchten

Im Entwicklungsmodus gibt es mehrere Konten mit jeweils 10000 Einheiten an Geldern, die verwendet werden können, um Gelder an andere Konten im Entwicklungsnetzwerk zu überweisen. Diese Konten sind durch Schraubenschlüssel-Symbole <img src="/assets/images/docs/adding-funds/wrench.png" alt="Schraubenschlüssel-Symbol" width="20"/> neben ihnen gekennzeichnet.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- Klicken Sie auf die Schaltfläche "send" des Kontos, von dem Sie Gelder überweisen möchten, z. B. BOB

## 3. Wählen Sie das Konto aus, auf das Sie Gelder überweisen möchten
Nachdem Sie auf die Schaltfläche "send" geklickt haben, werden Sie mit dem "Geld senden-Fenster" aufgefordert. In dem aufgeforderten Fenster:

- Wählen Sie aus der Liste der verfügbaren Konten das Konto aus, auf das Sie Gelder überweisen möchten.
- Geben Sie die Anzahl der Einheiten ein, die Sie senden möchten.
- Drücken Sie "Überweisung tätigen"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}

## 4. Autorisieren Sie die Transaktion

Nachdem Sie in der vorherigen Phase "Überweisung tätigen" gedrückt haben, werden Sie mit dem "Transaktion autorisieren-Fenster" aufgefordert.<br/>
Überprüfen Sie die Details der Transaktion und klicken Sie schließlich auf die Schaltfläche "Unterschreiben und absenden".

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

In diesem Beispiel haben wir 500 Einheiten Geld von "BOB" nach "ARBEITGEBER" überwiesen. Sie können sehen, dass das Konto des ARBEITGEBERS, das anfangs keine Gelder hatte, jetzt 500 Einheiten Geld hat.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**Stellen Sie sicher, dass Sie genügend Gelder auf den Konten haben, die Sie im Spielplatz verwenden möchten.**