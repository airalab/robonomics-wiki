---
title: Haftung
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Um Roboter zu wirtschaftlichen Akteuren zu machen, benötigt man ein Vertragstool dafür. Hier ist Haftung - Robonomics-Palette, die Verträge zwischen Parachain-Konten implementiert!**

<robo-wiki-note type="warning" title="Dev Node">

  Bitte beachten Sie, dass dieses Tutorial auf einer lokalen Instanz von Robonomics Node demonstriert wird. Richten Sie Ihre eigene mit [diesen Anweisungen](/docs/run-dev-node) ein.

</robo-wiki-note>

## Theorieüberblick

Auf Ethereum gab es eine ziemlich komplizierte Struktur der Haftungsinteraktion. Sie können sich [hier](/docs/robonomics-how-it-works) damit vertraut machen. Heutzutage ist es mit Kusama etwas einfacher!

### Verhandlungen

Um einen Vertrag zu unterzeichnen, müssen die beiden Seiten zunächst verhandeln. Dies kann auf verschiedene Weise erfolgen, einschließlich [IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) oder Robonomics PubSub. Ein Beispiel für Python-Code mit Robonomics PubSub wird [hier] vorgestellt (https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub).

Angebot und Nachfrage sind Nachrichten, die zwei Hauptmerkmale eines Vertrags enthalten: **Jobbeschreibung** und **Preis**. Das Nachrichtenformat muss vom Benutzer für jede spezifische Anwendung entworfen werden. Es ist nicht so wichtig, im Verhandlungsprozess eine strikte Formatregel zu befolgen. Der mögliche Ablauf wird im folgenden Bild dargestellt.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Beachten Sie, dass PubSub ein offenes Protokoll ist, daher sollten keine sensiblen Daten übertragen werden. Dafür sollten Sie andere Protokolle verwenden.

</robo-wiki-note>


### Signaturen

When negotiations are successfully over, each side needs to sign its so-called agreement named a signature. This is a message containing job description and price **in a specific format** signed with a private key of the Konto brauchen. 
Auch dafür gibt es ein [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability).
 - Die Jobbeschreibung wird als **Technik** bezeichnet. Dies ist ein 32 Byte langer String, der wie ein IPFS CID codiert sein kann.
 - Der Preis wird als **Wirtschaft** bezeichnet. Dies ist eine XRT-Dezimalzahl - Weiner. 1 Weiner = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  Mit der [Python-Bibliothek](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) kann man einen IPFS CID in einem geeigneten Format erhalten.
  Bei Verwendung der Funktion `sign_liability` ist keine Transformation des Hash-Werts erforderlich, dies wird automatisch erledigt.

</robo-wiki-note>

Nachfolgend das Beispiel mit Kaffee:

1. Die Aufgabe ist ein JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Der IPFS CID lautet `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. Die **Technik** (transformierter CID) lautet also `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **Wirtschaft** beträgt `1,5 XRT`.

Wenn es unterschrieben ist, ist es an der Zeit, eine Haftung zu erstellen! Dies kann von einer der Seiten (entweder dem Versprechenden oder dem Verpflichteten) oder von einem Drittkonto eines sogenannten Anbieters durchgeführt werden.

## Haftung erstellen

### Vorbereitungen

Wie bereits erwähnt, sind mindestens zwei Seiten am Prozess beteiligt. Für dieses Beispiel verwenden wir drei und machen einen separaten Anbieter dafür. Nehmen Sie an, dass die Verhandlungen bereits irgendwie stattgefunden haben.

### 1. Erstellen Sie drei Konten und fügen Sie ihnen Geld hinzu

<robo-wiki-picture src="liability/balances.jpg" />

Hier haben wir dem Anbieter 100 XRT zur Unterzeichnung von Haftungsextrinsiken zur Verfügung gestellt, dem Verpflichteten wurden 2 XRT gegeben, um für die Arbeit zu bezahlen.
Dem Versprechenden wurden keine Geldmittel gewährt (außer einer existenziellen Einzahlung von mindestens 1 mXRT).

### 1. Navigieren Sie zu Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Wählen Sie liability -> create aus der Dropdown-Liste der möglichen Extrinsiken

Wählen Sie auch ein Konto aus, mit dem Sie das Extrinsische einreichen möchten. Füllen Sie alle Parameter aus.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signaturen">

  Da hier ein Anbieter verwendet wird, müssen die Seeds der Teilnehmer nicht bekannt sein. Es werden nur ihre Signaturen benötigt.

</robo-wiki-note>

### 3. Übermitteln Sie die Transaktion

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Überprüfen Sie Ihre Haftung in den Ereignissen

Hierzu navigieren Sie zu `Network -> Explorer` und finden eine Liste der Ereignisse auf der rechten Seite. Klicken Sie auf ein Dreieckssymbol, um es zu erweitern.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  Der Hash kann mit demselben [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash) in eine IPFS-CID umgewandelt werden.

</robo-wiki-note>

### 5. Speichererkundung

Sie können auch einige Merkmale der Haftungen im Speichermodul `liability` erkunden.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  Die Speicherfunktion `Next Index` zeigt den neuesten Haftungsindex +1 an, daher wird auch dann, wenn er `1` ist, Haftung `0` erkundet.

</robo-wiki-note>

## Berichte

Stellen Sie sich vor, dass ein Kaffee zubereitet wurde und die Kaffeemaschine ihn irgendwie melden muss. Hier kommen Haftungsberichte ins Spiel. Als Arbeitsnachweis fügt das Konto einen weiteren IPFS CID als Berichtsinhalt hinzu, wenn die bestehende Haftung abgeschlossen wird. Dafür ist erneut eine Unterschrift des Verpflichteten erforderlich.

<robo-wiki-note type="note" title="Report signature">

  Die signierte Nachricht enthält den vorhandenen Haftungsindex und die IPFS CID des Berichts, die in einer 32-Byte-Darstellung codiert sind. Noch einmal, das [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) kann helfen, den Bericht zu signieren.

</robo-wiki-note>

Im Beispiel mit der Kaffeemaschine:

1. Der Bericht ist ein JSON.
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Seine IPFS CID lautet `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`.
3. Die **Nutzlast** (transformierte CID) ist also „0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2“.
4. **Index** ist `0`, es handelt sich um den vorhandenen Haftungsindex.

### 1. Navigieren Sie zu Extrinsics, Haftung -> abschließen(Bericht).

Geben Sie die Parameter ein und senden Sie extrinsisch. Auch dies kann über ein Drittanbieterkonto erfolgen.

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Beachten Sie, dass das Versprechenskonto nicht "tot" sein darf - es sollte eine Existenzablagerung von mindestens 1 mXRT haben.

</robo-wiki-note>

Den Bericht signieren und einreichen. Wenn Sie fertig sind, können Sie ihn in den Ereignissen erkunden.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Berichte erkunden

Sie können den Bericht auch im Speicher beobachten. Gehen Sie zu `Developer -> Storage` und wählen Sie `liability` aus der Dropdown-Liste.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Kontostände überprüfen

Auf dem Bild ist zu sehen, dass der Versprecher jetzt das "Gehalt" erhalten hat. Die wirtschaftliche Beziehung ist entstanden!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  Derzeit gibt es keine Möglichkeit, die erledigte Arbeit zu überprüfen, daher werden die Token sofort auf das Konto des Versprechers übertragen, sobald dieser berichtet. 
  Die Überprüfungsfunktion wird in Zukunft hinzugefügt werden.

</robo-wiki-note>