---
title: Sichere Verbindung von Cloud-KI zur Fabrikhalle
contributors: [vitl2907]
---

Robonomics-Technologien können bereits die Herausforderungen lösen, denen die Industrie 4.0 gegenübersteht, und sie werden bereits in realen Szenarien in der industriellen Umgebung angewendet.

Eine große Anzahl von KI-Unternehmen entwickelt Lösungen zur Optimierung der Prozesse auf der Fabrikhalle, um den Pflanzen zu ermöglichen, mehr mit geringeren Kosten zu produzieren. Die meisten Pflanzen zögern jedoch, ihre Infrastruktur direkt mit der Cloud zu verbinden, da dies zu potenziellen Cybersicherheitsrisiken führt, die zu Millionenschäden und sogar zum Verlust von Menschenleben führen könnten.

[MerkleBot](https://merklebot.com) hat [Robonomics Network](https://robonomics.network) verwendet, um eine Lösung für industrielle Kunden zu entwickeln, um ihre Fabrik auf sichere Weise mit der Cloud-basierten KI zu verbinden.

Dieser Artikel wurde im Anschluss an ein Experiment verfasst, das wir mit [Veracity Protocol](https://www.veracityprotocol.org/) durchgeführt haben, das Algorithmen verwendet, um einen nicht-invasiven Schutz eines physischen Objekts auf der Grundlage von Fotos von einem mobilen Gerät zu erstellen.

Dieser Anwendungsfall zeigt den Prozess des Scannens von industriellen Teilen mithilfe eines Roboterarms.

[Demo video](https://youtu.be/8AL70LFVX5w)

## Schritt-für-Schritt-Prozess

### DApp als Benutzeroberfläche

<!-- ![](../images/google-play-store.gif) -->
<!-- <img src="../images/google-play-store.gif" /> -->
<robo-wiki-picture src="google-play-store.gif" />

DApp fungiert als Benutzeroberfläche für den Bediener. Sie wird verwendet, um den Start des Roboters zur Erfassung der Fotos anzufordern, und ihr Zweck besteht darin, eine sichere Kommunikation zwischen der Fabrikumgebung und der Cloud-basierten KI zu ermöglichen.

### Starten des Roboters

<!-- ![](../images/Veracity_Protocol_Transaction.gif) -->
<!-- <img src="../images/Veracity_Protocol_Transaction.gif" /> -->
<robo-wiki-picture src="Veracity_Protocol_Transaction.gif" />

Der Bediener startet den robotischen Scan, indem er die Transaktion in der DApp signiert. Dieser Schritt garantiert, dass der Prozess auf der Fabrikhalle nur auf der Grundlage der Transaktion in der öffentlichen Blockchain gestartet werden kann.

Der Roboter erhält einen Befehl von der Blockchain über das Robonomics Network und beginnt den Scan. Die Technologien des Robonomics Network ermöglichen es uns, die Lücke zwischen dem Geschäftsziel und dem Robotikbetrieb zu schließen.

### Datensammlung und Übermittlung an die Cloud-basierte KI

In der DApp sieht der Bediener die Bestätigung und der Roboter beginnt mit dem Scannen der auf dem Tisch platzierten Gegenstände, wie in diesem Anwendungsfall, oder direkt auf der Fabriklinie, wenn es erforderlich ist.

<!-- ![](../images/Veracity_Protocol_Launch.gif) -->
<!-- <img src="../images/Veracity_Protocol_Launch.gif" /> -->
<robo-wiki-picture src="Veracity_Protocol_Launch.gif" />


Wenn der Roboter die Daten sammelt, speichert er sie lokal und stellt sie über das IPFS-Protokoll der Cloud-basierten KI zur Verfügung. Durch die Verschlüsselung der Daten und die Organisation des Datenaustauschs über eine Blockchain-Transaktion können wir den Zugriff auf die Cloud-basierte KI autorisieren und gleichzeitig sicherstellen, dass die Daten sicher und an ihrem Platz bleiben.

Der in Robonomics eingebaute Sicherheitsmechanismus, der auf der gemeinsamen Sicherheit öffentlicher Blockchains basiert, ermöglicht es, das Sicherheitsniveau zu erreichen, das für die meisten Fabriken zu teuer ist, um es selbst zu organisieren.

### Erstellung eines digitalen Passports

Wenn die Cloud-basierte KI die Daten analysiert, werden das Protokoll und die Empfehlungen automatisch als [Digitaler Reisepass](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/) aufgezeichnet. Jeder Vorgang und Scan kann zurückverfolgt werden, da der Blockchain-Eintrag den Hash zu all diesen Dateien über das IPFS-Protokoll enthält.

## Kommentare zum Anwendungsfall

In diesem Anwendungsfall wurde der Universal Robot UR3 Industriearm verwendet. Dank der Unterstützung von Robonomics für ROS können jedoch die meisten großen Industriemanipulatoren sicher mit der Cloud-basierten KI verbunden werden, einschließlich KUKA, Fanuc und Yaskawa.

Wenn Sie mehr über die Bereitstellung und Integration von Cloud-basierten KI-Instrumenten auf sichere Weise erfahren möchten, kontaktieren Sie uns bitte unter [reach out](mailto:v@merklebot.com)
