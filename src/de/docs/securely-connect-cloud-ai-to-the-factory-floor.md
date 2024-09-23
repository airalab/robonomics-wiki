---
title: Sicher verbinden Sie Cloud-KI sicher mit dem Fabrikboden
contributors: [vitl2907]
---

Die Technologien von Robonomics können bereits die Herausforderungen lösen, denen die Industrie 4.0 gegenübersteht, und sie werden bereits in realen Szenarien in der industriellen Umgebung eingesetzt.

Eine große Anzahl von KI-Unternehmen entwickelt Lösungen, um die Prozesse auf dem Fabrikboden zu optimieren, was den Anlagen ermöglicht, mehr mit weniger Kosten zu produzieren. Die meisten Anlagen zögern jedoch, ihre Infrastruktur direkt mit der Cloud zu verbinden, da dies zu potenziellen Cybersicherheitsrisiken führt, die zu Millionenschäden und sogar zum Verlust von Menschenleben führen könnten.

[MerkleBot](https://merklebot.com) hat [Robonomics Network](https://robonomics.network) genutzt, um eine Lösung für industrielle Kunden zu entwickeln, um ihre Fabrik sicher mit der cloudbasierten KI zu verbinden.

Dieser Artikel wurde im Anschluss an ein Experiment verfasst, das wir mit [Veracity Protocol](https://www.veracityprotocol.org/) durchgeführt haben, das Algorithmen verwendet, um einen nicht-invasiven Schutz eines physischen Gegenstands auf der Grundlage von Fotos von einem mobilen Gerät zu erstellen.

Dieser Anwendungsfall zeigt den Prozess des Scannens von Industrieteilen mithilfe eines Roboterarms.

[Demo-Video](https://youtu.be/8AL70LFVX5w)

## Schritt-für-Schritt-Prozess

### DApp als Benutzeroberfläche

{% roboWikiPicture {src:"docs/google-play-store.gif", alt:"/google-play-store"} %}{% endroboWikiPicture %}

Die DApp fungiert als Benutzeroberfläche für den Bediener. Sie wird verwendet, um den Start des Roboters zur Erfassung der Fotos anzufordern, und ihr Zweck besteht darin, eine sichere Kommunikation zwischen der Fabrikumgebung und der cloudbasierten KI zu ermöglichen.

### Starten des Roboters

{% roboWikiPicture {src:"docs/Veracity_Protocol_Transaction.gif", alt:"/Veracity_Protocol_Transaction"} %}{% endroboWikiPicture %}

Der Bediener startet den robotergesteuerten Scan, indem er die Transaktion in der DApp signiert. Dieser Schritt garantiert, dass der Prozess auf dem Fabrikboden nur auf der Grundlage der Transaktion in der öffentlichen Blockchain gestartet werden kann.

Der Roboter erhält einen Befehl von der Blockchain über das Robonomics-Netzwerk und beginnt mit dem Scan. Die Technologien des Robonomics-Netzwerks ermöglichen es uns, die Lücke zwischen dem Geschäftsziel und dem Robotikbetrieb zu schließen.

### Datensammlung und Übermittlung an die cloudbasierte KI

In der DApp sieht der Bediener die Bestätigung, und der Roboter beginnt mit dem Scannen der auf dem Tisch platzierten Gegenstände, wie in diesem Anwendungsfall, oder direkt auf der Fabriklinie, wenn es erforderlich ist.

{% roboWikiPicture {src:"docs/Veracity_Protocol_Launch.gif", alt:"/Veracity_Protocol_Launch"} %}{% endroboWikiPicture %}

Wenn der Roboter die Daten sammelt, speichert er sie lokal und stellt sie über das IPFS-Protokoll der cloudbasierten KI zur Verfügung. Durch die Verschlüsselung der Daten und die Organisation des Datenaustauschs über eine Blockchain-Transaktion können wir den Zugriff auf die cloudbasierte KI autorisieren und gleichzeitig sicherstellen, dass die Daten sicher und an ihrem Platz bleiben.

Der in Robonomics eingebaute Sicherheitsmechanismus, der auf der gemeinsamen Sicherheit öffentlicher Blockchains basiert, ermöglicht es, das Sicherheitsniveau zu erreichen, das für die meisten Fabriken zu teuer ist, um es selbst zu organisieren.

### Erstellung des digitalen Passes

Wenn die cloudbasierte KI die Daten analysiert, werden das Protokoll und die Empfehlungen automatisch als [Digitaler Pass](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/) aufgezeichnet. Jeder Vorgang und Scan kann zurückverfolgt werden, da der Blockchain-Eintrag den Hash zu all diesen Dateien über das IPFS-Protokoll hat.

## Kommentare zum Anwendungsfall

In diesem Anwendungsfall wurde der Universal Robot UR3 Industriearm verwendet. Dank der Unterstützung von Robonomics für ROS können die meisten großen Industriemanipulatoren sicher mit cloudbasierter KI verbunden werden, einschließlich KUKA, Fanuc und Yaskawa.

Wenn Sie mehr über die Bereitstellung und Integration von cloudbasierten KI-Instrumenten sicher erfahren möchten, kontaktieren Sie uns bitte unter [v@merklebot.com](mailto:v@merklebot.com)