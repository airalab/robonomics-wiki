---
title: Wie man ein Abonnement kauft

contributors: [LoSk-p, PaTara43]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Das Bezahlen von Provisionen für Transaktionen in der Blockchain ist lästig. Stellen Sie sich ein IoT-Gerät vor, das alle 5-10 Minuten Telemetrie sendet. Dadurch müssen Sie im Laufe des Monats ziemlich viel bezahlen. Eine der Hauptfunktionen des Robonomics-Netzwerks ist RWS - Robonomics Web Service-Abonnement. Zahlen Sie monatlich und vergessen Sie die Transaktionskosten! Für theoretische Hintergrundinformationen siehe [diesen](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) Artikel.**

<robo-wiki-note type="warning" title="Parachain">

  Beachten Sie, dass dieses Tutorial den Kauf eines Abonnements auf der Robonomics Kusama-Parachain demonstriert. Sie können auch alle Schritte auf Ihrem [lokalen Knoten](/docs/run-dev-node) durchführen.

  Noch eine Sache vor dem Start. Dies ist eine "schwierige" Art, ein Abonnement zu kaufen. Es gibt auch eine herkömmliche Möglichkeit, dies über [Robonomics DApp](https://dapp.robonomics.network/#/) zu tun.

</robo-wiki-note>

## Bieten Sie bei einer Auktion

Die Abonnements bei Robonomics werden nach dem Auktionsmodell verkauft. Um eins zu bekommen, müssen Sie bei einer Auktion bieten und gewinnen (keine Sorge, es geht schnell).

In `Developer/Chain state`  können Sie verfügbare Auktionen sehen. 
Wählen Sie `rws` und `auctionQueue` und drücken Sie die `+`-Taste, dann sehen Sie die IDs der verfügbaren Auktionen:

![queue](../images/rws/queue.png)

Sie können Informationen über ein beliebiges Abonnement mit `rws` `auction` und der ID der Auktion sehen (die ID der Auktion auf dem Bild ist 79):

![auction](../images/rws/auction.png)

In den Informationen über die Auktion sehen Sie das Feld `winner`, im Moment ist es `null`, also hat niemand dieses Abonnement und Sie können es bekommen. Gehen Sie dazu zu `Developer/Extrinsic`, wählen Sie Ihr Konto und `rws -> bid`. Setzen Sie auch die Auktions-ID (79) und die Anzahl der zu bietenden Einheiten (mehr als 1000000000 Wn):

![bid](../images/rws/bid.png)

Senden Sie die Transaktion ab und überprüfen Sie die Informationen über die Auktion mit der ID 79 (wählen Sie in `Chain state` `rws -> auction` und ID 79):

![win](../images/rws/auc_win.png)

Jetzt sehen Sie in dem Feld `winner` Ihre Kontoadresse, das bedeutet, dass dieses Konto das Abonnement 79 hat. Eine Auktion beginnt mit dem ersten Gebot und dauert einige Blöcke, also wenn jemand in den nächsten Blöcken mehr Token bietet als Sie, wird dieser das Abonnement erhalten und gewinnen.

Jetzt können Sie Geräte hinzufügen. Geräte sind Konten, die dieses Abonnement nutzen und Extrinsiken ohne Gebühr senden können.
Um es zu testen, erstellen Sie ein neues Konto ohne Token und fügen Sie es zu Geräten hinzu.

Um Geräte hinzuzufügen, wählen Sie `rws -> setDevices` in `Developer/Extrinsic`. Drücken Sie dann die Schaltfläche `Add Item` und wählen Sie das kürzlich erstellte Konto ohne Token aus:

![set_devices](../images/rws/set_devices.png)

Senden Sie die Transaktion ab. Jetzt können Sie die Liste der Geräte in `Chain state` mit `rws -> devices` überprüfen. Dort sehen Sie die Adresse Ihres Kontos ohne Token. Wählen Sie das Konto aus, das das Abonnement gekauft hat, und drücken Sie `+`:

![devices](../images/rws/devices.png)

Jetzt können Sie versuchen, eine [Start-Extrinsik](/docs/subscription-launch) mit dem Abonnement zu senden.