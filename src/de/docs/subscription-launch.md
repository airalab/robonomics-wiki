---
title: Wie man einen Start mit Abonnement sendet

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"Parachain", type: "warning"}%}Beachten Sie, dass dieses Tutorial die Verwendung eines Abonnements auf der Robonomics Kusama-Parachain demonstriert. Sie können auch alle Schritte auf Ihrem [lokalen Knoten](/docs/run-dev-node) durchführen. {% endroboWikiNote %}


Wenn Ihre Adresse ein aktives Abonnement hat, können alle Geräte, die mit dem geheimen Konto eingerichtet sind, Extrinsic senden, ohne Gebühren zu zahlen.
Lassen Sie uns versuchen, den Befehl `launch` zu senden.

Gehen Sie zur Seite `Entwickler/Extrinsics`, wählen Sie dann Ihr Konto (das aus der Geräteliste stammt) aus und wählen Sie `rws -> call(subscriptionId, call)`.
Geben Sie dann im Feld `subscriptionId` die Adresse des Besitzers des Abonnements ein (derjenige, der die Auktion geboten hat) und im nächsten Feld
wählen Sie `launch -> launch(robot, param)`. Geben Sie im Feld `robot` die Adresse ein, an die Sie die `launch`-Transaktion senden möchten,
und fügen Sie den Befehl ein (für eine Beschreibung des Startbefehls siehe [hier](/docs/launch)). Senden Sie dann die Transaktion ab:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}


Gehen Sie nun zur Seite `Netzwerk/Explorer`, und im Bereich `Neueste Ereignisse` sehen Sie zwei Ereignisse, die Sie erstellt haben; `rws.NewCall` und `launch.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}