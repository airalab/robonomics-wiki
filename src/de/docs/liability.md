---
title: Haftung
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Um Roboter in wirtschaftliche Akteure zu verwandeln, benötigt man ein Vertragstool dafür. Lernen Sie Liability kennen - das Robonomics-Paket, das Verträge zwischen Parachain-Konten implementiert!**

{% roboWikiNote {title:"Dev Node", type: "warning"}%} Bitte beachten Sie, dass dieses Tutorial an einer lokalen Instanz des Robonomics-Knotens demonstriert wird. Richten Sie Ihren eigenen mit [diesen Anweisungen](/docs/run-dev-node) ein.
{% endroboWikiNote %}

## Theorieüberblick

Früher auf Ethereum gab es eine ziemlich komplizierte Struktur der Haftungsinteraktion. Sie können sich damit vertraut machen
[hier](/docs/robonomics-how-it-works). Heutzutage ist es mit Kusama etwas einfacher!

### Verhandlungen

Um einen Vertrag zu unterzeichnen, müssen die beiden Seiten zuerst verhandeln. Dies kann auf verschiedene Arten geschehen, einschließlich
[IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) oder Robonomics PubSub. Ein Beispiel für Python-Code, der Robonomics PubSub verwendet, ist
hier präsentiert: [hier](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Angebot und Nachfrage sind Nachrichten, die zwei Hauptmerkmale eines Vertrags enthalten: **Jobbeschreibung** und **Preis**. Das Nachrichtenformat muss vom Benutzer für jede spezifische Anwendung entworfen werden. Es ist im Verhandlungsprozess nicht so wichtig, einer strengen Formatregel zu folgen. Der mögliche Ablauf ist im folgenden Bild dargestellt.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} Beachten Sie, dass PubSub ein offenes Protokoll ist, daher sollten keine sensiblen Daten übertragen werden. Verwenden Sie dafür andere Protokolle.
{% endroboWikiNote %}

### Signaturen

Wenn die Verhandlungen erfolgreich abgeschlossen sind, müssen beide Seiten ihre sogenannte Vereinbarung namens Signatur unterzeichnen. Dies ist eine Nachricht, die Jobbeschreibung und Preis **in einem spezifischen Format** enthält, die mit einem privaten Schlüssel des Kontos signiert sind. Dafür gibt es auch ein [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability).
 - Die Jobbeschreibung wird als **Technik** bezeichnet. Dies ist ein 32 Byte langer String, der einem IPFS CID entsprechen kann.
 - Der Preis wird als **Wirtschaft** bezeichnet. Dies ist ein XRT-Dezimalwert - Weiner. 1 Weiner = 10**-9 XRT.

{% roboWikiNote {title:"32 Bytes", type: "note"}%} Man kann einen [IPFS](https://ipfs.tech/) CID in einem geeigneten Format mit der [Python-Bibliothek](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) erhalten. Bei Verwendung der Funktion `sign_liability` ist keine Transformation des Hashes erforderlich, dies wird automatisch erledigt.{% endroboWikiNote %}

Folgendes Beispiel mit Kaffee:

1. Die Aufgabe ist ein JSON
```json
{"task": "make_espresso", "description": "Eine Tasse Espresso zubereiten"}
```
2. Der IPFS CID lautet `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Also ist die **Technik** (transformierter CID) `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`
4. **Wirtschaft** beträgt `1,5 XRT`.

Wenn unterzeichnet, ist es an der Zeit, eine Haftung zu erstellen! Dies kann von einer der Seiten (entweder dem Versprechenden oder dem Verpflichtenden) oder von einem Drittanbieterkonto eines sogenannten Anbieters durchgeführt werden.

## Haftung erstellen

### Vorbereitungen

Wie bereits erwähnt, sind mindestens zwei Seiten am Prozess beteiligt. Für dieses Beispiel verwenden wir drei und erstellen
einen separaten Anbieter dafür. Nehmen wir an, die Verhandlungen haben bereits irgendwie stattgefunden.

### 1. Erstellen Sie drei Konten und fügen Sie Geld hinzu

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

Hier haben wir dem Anbieter 100 XRT zur Unterzeichnung von Haftungsextrinsiken zur Verfügung gestellt, dem Versprechenden wurden 2 XRT gegeben, um für die Arbeit zu bezahlen.
Der Verpflichtende erhielt keine Gelder (außer einer Existenzablagerung von mindestens 1 mXRT).

### 1. Navigieren Sie zu Entwickler -> Extrinsiken

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Wählen Sie Haftung -> Erstellen aus der Dropdown-Liste der möglichen Extrinsiken

Wählen Sie auch das Konto aus, mit dem Sie das Extrinsikum einreichen möchten. Füllen Sie alle Parameter aus.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Signaturen", type: "note"}%} Da hier ein Anbieter verwendet wird, müssen die Seeds der Teilnehmer nicht bekannt sein. Es werden nur ihre Signaturen benötigt.
{% endroboWikiNote %}

### 3. Transaktion einreichen

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. Überprüfen Sie Ihre Haftung in den Ereignissen

Navigieren Sie dazu zu `Netzwerk -> Explorer` und finden Sie eine Liste der Ereignisse auf der rechten Seite. Klicken Sie auf das Dreieckssymbol, um es zu erweitern.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Hash", type: "note"}%} Der Hash kann mit demselben [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash) in einen IPFS CID umgewandelt werden.
{% endroboWikiNote %}

### 5. Speichererkundung

Sie können auch einige Merkmale der Haftungen im Speichermodul `Haftung` erkunden.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Nächster Index", type: "note"}%} Die Speicherfunktion `Nächster Index` zeigt den neuesten Haftungsindex +1 an, daher wird auch wenn es `1` ist, Haftung `0` erkundet.
{% endroboWikiNote %}

## Berichte

Stellen Sie sich vor, dass ein Kaffee zubereitet wurde und die Kaffeemaschine dies nun irgendwie melden muss. Hier kommen Haftungsberichte ins Spiel. Als Arbeitsnachweis fügt das Konto einen weiteren IPFS CID als Berichtsinhalt hinzu, wenn die bestehende Haftung abgeschlossen wird. Auch hier ist die Unterschrift des Verpflichtenden erforderlich.

{% roboWikiNote {title:"Berichtssignatur", type: "note"}%} Die signierte Nachricht enthält den bestehenden Haftungsindex und den Berichts-IPFS CID, der in einer 32-Byte-Repräsentation codiert ist. Erneut kann das [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) helfen, den Bericht zu signieren.
{% endroboWikiNote %}

Im Einklang mit dem Beispiel der Kaffeemaschine:

1. Der Bericht ist ein JSON
```json
{"report": "Kaffee gemacht! Ausführungszeit - 80 Sekunden."}
```
2. Sein IPFS CID lautet `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. Also ist die **Nutlast** (transformierter CID) `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`
4. **Index** ist `0`, es ist der bestehende Haftungsindex.

### 1. Navigieren Sie zu Extrinsiken, Haftung -> abschließen(Bericht)

Füllen Sie die Parameter aus und reichen Sie das Extrinsikum ein. Auch dies kann von einem Drittanbieterkonto durchgeführt werden.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Existenzablagerung", type: "warning"}%} Beachten Sie, dass das Konto des Verpflichtenden nicht "tot" sein sollte - es sollte die Existenzablagerung von mindestens 1 mXRT haben.
{% endroboWikiNote %}

Unterschreiben und reichen Sie den Bericht ein. Wenn dies erledigt ist, können Sie ihn in den Ereignissen erkunden.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. Berichte erkunden

Sie können den Bericht auch im Speicher beobachten. Gehen Sie zu `Entwickler -> Speicher` und wählen Sie `Haftung` aus der Dropdown-Liste.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. Kontostände überprüfen

Auf dem Bild ist zu sehen, dass der Schuldner jetzt das "Gehalt" erhalten hat. Die wirtschaftliche Beziehung hat stattgefunden!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %} {% endroboWikiPicture %}

{% roboWikiNote {title:"Überprüfung", type: "note"} %} Aktuell gibt es keine Möglichkeit, zu überprüfen, ob die Arbeit erledigt wurde. Sobald der Schuldner berichtet, werden die Token auf sein Konto überwiesen. Die Überprüfungsfunktion wird in Zukunft hinzugefügt.
{% endroboWikiNote %}