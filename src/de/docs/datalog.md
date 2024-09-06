---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Jetzt, da Sie etwas Geld auf Ihrem Konto haben, können Sie Extrinsiken einreichen. Der erste Versuch ist ein Datalog. Es ermöglicht Ihnen, Daten dauerhaft in der Blockchain zu speichern. Stellen Sie sich einen verteilten und krypto-geschützten Speicher für Ihre Daten vor, und das ist es!**

{% roboWikiNote {type: "warning", title: "Dev Node"}%}Bitte beachten Sie, dass diese und die folgenden Tutorials an einer lokalen Instanz des Robonomics Node demonstriert werden. Richten Sie Ihre eigene mit [diesen Anweisungen](/docs/run-dev-node) ein.
{% endroboWikiNote %}


## 1. Navigieren Sie zu Entwickler -> Extrinsiken

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Wählen Sie datalog -> record aus der Dropdown-Liste der möglichen Extrinsiken

Wählen Sie auch ein Konto aus, mit dem Sie die Extrinsik einreichen möchten. Füllen Sie das Feld "record" aus.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Große Datenmenge"}%} Datalog unterstützt einen String mit maximal 512 Bytes. Um eine große Datenmenge zu speichern, kann man [IPFS](https://ipfs.tech/) verwenden.
{% endroboWikiNote %}

## 3. Transaktion einreichen

Unterzeichnen und reichen Sie die Transaktion mit einem zuvor erstellten Konto über die Erweiterung oder die DApp ein.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Löschen"}%} Sie können auch **ALLE** Ihre Datensätze mit dem Aufruf *datalog -> erase* löschen.
{% endroboWikiNote %}

## 4. Überprüfen Sie Ihren Datalog im Speicher

Navigieren Sie dazu zu *Entwickler -> Chain State*, wählen Sie *datalog -> datalogIndex*, geben Sie Ihr Konto an und drücken Sie die
"+"-Taste, um die Indizes der Datensätze Ihres Kontos zu erhalten, und erkunden Sie dann denjenigen, den Sie benötigen, mit *datalog -> datalogItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Explorer"}%} Alle Ereignisse, einschließlich des Datalog-Eintrags, können im Ereignisfluss im *Explorer* eingesehen werden.
{% endroboWikiNote %}