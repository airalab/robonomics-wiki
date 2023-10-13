---
title: Datenprotokoll
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Jetzt, da Sie etwas Geld auf Ihrem Konto haben, können Sie Extrinsiken einreichen. Der erste Versuch ist ein Datalog. Es ermöglicht Ihnen, Daten dauerhaft in der Blockchain zu speichern. Stellen Sie sich einen verteilten und kryptogeschützten Speicher für Ihre Daten vor, und das ist es!**

<robo-wiki-note type="warning" title="Dev Node">

Bitte beachten Sie, dass dieses und die folgenden Tutorials auf einer lokalen Instanz von Robonomics Node demonstriert werden. Richten Sie Ihr eigenes mit ein [diesen Anweisungen](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navigieren Sie zu  Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. Wählen Sie datalog -> record aus der Dropdown-Liste der möglichen Extrinsics

Wählen Sie auch ein Konto aus, mit dem Sie den Extrinsischen übermitteln möchten. Füllen Sie das Feld record aus.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalog unterstützt einen String mit maximal 512 Bytes. Um eine große Menge an Daten zu speichern, kann man [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. Übermitteln Sie die Transaktion

Unterzeichnen und übermitteln Sie die Transaktion mit einem zuvor erstellten Konto über die Erweiterung oder die DApp.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  Sie können auch **ALLE** Ihre Aufzeichnungen mit *datalog -> erase* aufrufen.

</robo-wiki-note>

## 4. Überprüfen Sie Ihr Datalog im Speicher

Dazu navigieren Sie zu *Developer -> Chain state*, auswählen *datalog -> datalogIndex*, geben Sie Ihr Konto an und drücken Sie die 
"+" Taste, um die Indizes Ihrer Konten aufzurufen und dann denjenigen zu erkunden, den Sie benötigen mit *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="Erkundenr">

  Alle Ereignisse, einschließlich des Datalog-Eintrags, können im Ereignisfluss im *Explorer* gesehen werden..

</robo-wiki-note>