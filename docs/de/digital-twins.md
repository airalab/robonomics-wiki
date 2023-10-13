---
title: Digitale Zwillinge
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**Stellen Sie sich vor, Sie haben ein kompliziertes Gerät oder System mit mehreren Modulen, die gewartet werden müssen und für die mehrere Konten verwendet werden müssen. Um alle an einem Ort zu halten oder bestimmte Funktionen mit separaten Konten zu codieren oder zum Beispiel unterschiedliche Datenspeicherquellen für unterschiedliche Informationsflüsse festzulegen, wird das Modul Digital Twin verwendet.**

<robo-wiki-note type="warning" title="Dev Node">

  Bitte beachten Sie, dass diese und die folgenden Tutorials an einer lokalen Instanz des Robonomics Node demonstriert werden. Richten Sie Ihre eigene mit [diesen Anweisungen](/docs/run-dev-node).

</robo-wiki-note>

## Theorieübersicht
Jedes Konto kann einen Digitalen Zwilling erstellen und verwalten. Der Zwilling kann als eine Art Tabelle mit folgendem Inhalt betrachtet werden:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Wo:
* **DT id** ist eine eindeutige Ganzzahl, die den Digitalen Zwilling indexiert.
* **Topic name** ist eine hexadezimale `H256` oder ASCII-Daten mit einer Länge von 32 Bytes, genauso wie [`Start`](/docs/launch) extrinsischer Parameter. 
Zum Beispiel: `0x1234....FF` oder `hello.parachain.robonomics.world`.
* **Source** - ist eine Kontoadresse.

<robo-wiki-note type="note" title="Topics">

  Wie bereits in der Übersicht über den Start-Extrinsik besprochen, kann die `H256` als codierte IPFS CID dargestellt werden (siehe
  [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) dafür).
  Daher können Themen auch als Datenspeicher verwendet werden, zum Beispiel eine Modulbeschreibung eines Zwillings.

</robo-wiki-note>


## Digitalen Zwilling erstellen

### 1. Gehe zu Developer -> Extrinsics

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. Wähle digitalTwin -> create aus der Dropdown-Liste der möglichen Extrinsiken

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

Sende die Transaktion ab. Hier sind keine Parameter erforderlich, um einen Zwilling zu erstellen. Ihm wird ein Index zugewiesen und nur der Besitzer des Digitalen Zwillings kann ab sofort Themen des Zwillings hinzufügen/ändern.

Die Zwilling-ID kann auf der Übersichtsseite des Erkundenrs gefunden werden.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## Thema hinzufügen

### Wähle digitalTwin -> setSource aus der Dropdown-Liste der möglichen Extrinsiken

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - Digital Twin ID, die auf der Explorer-Seite abgerufen wurde.
* `topic` - zuvor diskutierter `H256` Thema-Name. In diesem Bild ist es eine Zeichenkette mit 32 Symbolen.
* `source` - Kontoadresse, die mit dem Thema verknüpft werden soll.

<robo-wiki-note type="note" title="Overwrite">

  Beachten Sie, dass das Thema bei Bedarf mit einer anderen Quelladresse überschrieben werden kann.

</robo-wiki-note>

Unterschreiben und senden Sie den Extrinsik.

## Explore

Sie können alle Informationen über vorhandene Digitale Zwillinge im Speichermodul `digitalTwin` unter `Developer -> Chain State` finden.

- Gesamtzahl der Zwillinge - `total()`;
- Besitzer des Digitalen Zwillings - `owner(u32)`;
- Informationen zu Themen eines Digitalen Zwillings - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />