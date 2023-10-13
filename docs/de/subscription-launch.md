---
title: Wie man einen Start mit Abonnement sendet

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  Beachten Sie, dass dieses Tutorial die Verwendung eines Abonnements auf der Robonomics Kusama Parachain demonstriert. Sie können alle Schritte auch auf Ihrem [lokalen Knoten](/docs/run-dev-node) durchführen.

</robo-wiki-note>

Wenn Ihre Adresse ein aktives Abonnement hat, können Geräte, die mit dem geheimen Konto eingerichtet sind, Extrinsiken ohne Gebühr senden. 
Lassen Sie uns versuchen, den Befehl `launch` zu senden.

Gehen Sie zur Seite `Developer/Extrinsics` , wählen Sie dann Ihr Konto (das aus der Geräteliste) aus und wählen Sie `rws -> call(subscriptionId, call)`. 
Geben Sie dann im Feld `subscriptionId` die Adresse des Besitzers des Abonnements ein (derjenige, der die Auktion geboten hat) und wählen Sie im nächsten Feld `launch -> launch(robot, param)`. Geben Sie im Feld `robot` die Adresse ein, an die Sie die `launch`-Transaktion senden möchten, und fügen Sie den Befehl ein (für eine Beschreibung des Startbefehls siehe [hier](/docs/launch)). Senden Sie dann die Transaktion ab:

![launch](../images/rws/launch.png)


Gehen Sie nun zur Seite `Network/Explorer`, und im Bereich `Recent Events` sehen Sie zwei Ereignisse, die Sie erstellt haben: `rws.NewCall` und `launch.NewLaunch`:

![events](../images/rws/events.png)
