---
title: Digitale Zwillinge
contributors: [nakata5321, PaTara43]

tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Stellen Sie sich vor, Sie haben ein kompliziertes Gerät oder System mit mehreren Modulen zur Wartung und benötigen einige Konten zur Verwendung. Um alles an einem Ort zu halten oder einige Funktionen mit separaten Konten zu codieren oder beispielsweise verschiedene Datensatzquellen für verschiedene Informationsflüsse festzulegen, wird das Digital Twin-Modul verwendet.**

{% roboWikiNote {title:"Dev Node", type: "warning"}%} Bitte beachten Sie, dass diese und die folgenden Tutorials an einer lokalen Instanz des Robonomics Node demonstriert werden. Richten Sie Ihre eigene mit [diesen Anweisungen](/docs/run-dev-node) ein.
{% endroboWikiNote %}

## Theorieübersicht
Jedes Konto kann einen Digitalen Zwilling erstellen und verwalten. Der Zwilling kann als eine Art Tabelle mit folgendem Inhalt vorgestellt werden:

| DT id  | Thema Name 	| Quelle    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Wo:
* **DT id** ist eine vorzeichenlose Ganzzahl, die einen eindeutigen Index des Digitalen Zwillings darstellt.
* **Thema Name** ist eine hexadezimale `H256` oder ASCII-Daten mit einer Länge von 32 Bytes, genauso wie der [`Launch`](/docs/launch) extrinsischer Parameter.
Zum Beispiel: `0x1234....FF` oder  `hello.parachain.robonomics.world`.
* **Quelle** - ist eine Kontoadresse.

{% roboWikiNote {title:"Themen", type: "note"}%} Wie bereits in der Übersicht des Launch-Extrinsischen besprochen wurde, kann das `H256` als ein codierter IPFS CID dargestellt werden (siehe [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) dafür).
Daher können Themen auch als Datenspeicher verwendet werden, beispielsweise als Modulbeschreibung eines Zwillings. {% endroboWikiNote %}


## Digitalen Zwilling erstellen

### 1. Navigieren Sie zu Entwickler -> Extrinsische

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Wählen Sie digitalTwin -> erstellen aus der Dropdown-Liste der möglichen Extrinsischen

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

Senden Sie die Transaktion ab. Hier sind keine Parameter erforderlich, um einen Zwilling zu erstellen. Ihm wird ein Index zugewiesen, und nur der Besitzer des Digitalen Zwillings kann von nun an Themen des Zwillings hinzufügen/ändern.

Die Twin-ID kann auf der Übersichtsseite des Explorers gefunden werden.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## Thema hinzufügen

### Wählen Sie digitalTwin -> setSource aus der Dropdown-Liste der möglichen Extrinsischen

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - Digitale Zwilling-ID, die auf der Explorer-Seite erhalten wurde.
* `thema` - zuvor diskutierter `H256` Thema-Name. In diesem Bild ist es eine Zeichenfolge von 32 Symbolen.
* `quelle` - Kontoadresse, die mit dem Thema verknüpft werden soll.

{% roboWikiNote {title:"Überschreiben", type: "note"}%} Beachten Sie, dass das Thema bei Bedarf mit einer anderen Quelladresse überschrieben werden kann.{% endroboWikiNote %}

Unterschreiben und senden Sie den Extrinsischen.

## Erkunden

Sie finden alle Informationen zu vorhandenen Digitalen Zwillingen im Speichermodul `digitalTwin` unter `Entwickler -> Chain State`.

- Gesamtzahl der Zwillinge - `total()`;
- Besitzer des Digitalen Zwillings - `owner(u32)`;
- Informationen zu Themen eines Digitalen Zwillings - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}