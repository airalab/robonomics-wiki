---
title: Wie man ein Abonnement kauft

contributors: [LoSk-p, PaTara43]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Es ist ärgerlich, Provisionen für Transaktionen in der Blockchain zu zahlen. Stellen Sie sich ein IoT-Gerät vor, das alle 5-10 Minuten Telemetrie sendet. Das wird Sie im Laufe des Monats ziemlich viel kosten lassen. Eine der Hauptfunktionen des Robonomics-Netzwerks ist das RWS - Robonomics Web Service-Abonnement. Zahlen Sie monatlich und vergessen Sie die Transaktionskosten! Für theoretische Hintergründe siehe [diesen](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) Artikel.**


{% roboWikiNote {title:"Parachain", type: "warning"}%}   Beachten Sie, dass dieses Tutorial den Kauf eines Abonnements auf der Robonomics Kusama-Parachain zeigt. Sie können alle Schritte auch auf Ihrem [lokalen Knoten](/docs/run-dev-node) durchführen.
Noch etwas, bevor wir beginnen. Dies ist ein "schwieriger" Weg, ein Abonnement zu kaufen. Es gibt auch einen herkömmlichen Weg, dies über die [Robonomics DApp](https://dapp.robonomics.network/#/) zu tun.
{% endroboWikiNote %}

## Bieten Sie bei einer Auktion

Die Abonnements in Robonomics werden nach dem Auktionsmodell verkauft. Um eins zu bekommen, müssen Sie an einer Auktion teilnehmen und sie gewinnen (keine Sorge, es geht schnell).

Im `Entwickler/Kettenzustand` können Sie verfügbare Auktionen sehen.
Wählen Sie `rws` und `auctionQueue` und drücken Sie die `+`-Taste, um die IDs der verfügbaren Auktionen zu sehen:

{% roboWikiPicture {src:"docs/rws/queue.png", alt:"queue"} %}{% endroboWikiPicture %}

Sie können Informationen zu einem beliebigen Abonnement mit `rws` `auction` und der ID der Auktion sehen (die ID der Auktion im Bild ist 79):

{% roboWikiPicture {src:"docs/rws/auction.png", alt:"auction"} %}{% endroboWikiPicture %}

In den Informationen zur Auktion sehen Sie das Feld `winner`, im Moment ist es `null`, also hat niemand dieses Abonnement und Sie können es bekommen. Gehen Sie dazu zu `Entwickler/Extrinsisch`, wählen Sie Ihr Konto und `rws -> bid`. Geben Sie auch die Auktions-ID (79) und die Anzahl der Einheiten ein, um zu bieten (mehr als 1000000000 Wn):

{% roboWikiPicture {src:"docs/rws/bid.png", alt:"bid"} %}{% endroboWikiPicture %}

Senden Sie die Transaktion ab und überprüfen Sie die Informationen zur Auktion mit der ID 79 (im `Kettenzustand` wählen Sie `rws -> auction` und ID 79):

{% roboWikiPicture {src:"docs/rws/auc_win.png", alt:"auc_win"} %}{% endroboWikiPicture %}

Jetzt sehen Sie in dem Feld `winner` Ihre Kontoadresse, das bedeutet, dass dieses Konto das Abonnement 79 hat. Eine Auktion beginnt mit dem ersten Gebot und dauert einige Blöcke, also wenn jemand in den nächsten Blöcken mehr Token bietet als Sie, wird dieser gewinnen und das Abonnement erhalten.

Nun können Sie Geräte hinzufügen. Geräte sind Konten, die dieses Abonnement nutzen können und Extrinsiken ohne Gebühr senden können.
Um dies zu testen, erstellen Sie ein neues Konto ohne Token und fügen Sie es zu den Geräten hinzu.

Um Geräte hinzuzufügen, wählen Sie `rws -> setDevices` in `Entwickler/Extrinsisch`. Drücken Sie dann die Schaltfläche `Element hinzufügen` und wählen Sie das kürzlich erstellte Konto ohne Token aus:

{% roboWikiPicture {src:"docs/rws/set_devices.png", alt:"set_devices"} %}{% endroboWikiPicture %}

Senden Sie die Transaktion ab. Jetzt können Sie die Liste der Geräte im `Kettenzustand` mit `rws -> devices` überprüfen. Dort sehen Sie die Adresse Ihres Kontos ohne Token. Wählen Sie das Konto aus, das das Abonnement gekauft hat, und drücken Sie `+`:

{% roboWikiPicture {src:"docs/rws/devices.png", alt:"devices"} %}{% endroboWikiPicture %}

Nun können Sie versuchen, einen [Startbefehl zu senden](/docs/subscription-launch) Extrinsik mit dem Abonnement zu verwenden.