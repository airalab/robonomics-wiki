---
title: Über Robonomics ROS 2 Wrapper
contributors: [Fingerling42]
tools:   
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**In diesem Artikel erfahren Sie mehr über das Robonomics ROS 2 Wrapper-Paket, das es Ihnen ermöglicht, alle Funktionen der Robonomics-Parachain für jeden ROS 2-kompatiblen Roboter zu nutzen.**

Die Idee des Pakets besteht darin, die von [robonomics-interface](https://github.com/airalab/robonomics-interface) bereitgestellte Robonomics-Parachain-API in Knoten von ROS 2 zu integrieren. Das Ziel ist es, ROS 2-Entwicklern eine bequeme Möglichkeit zu bieten, ihre Roboter oder Geräte mit Parachain-Funktionen zu integrieren. Die Logik hinter der Integration eines Robotikgeräts besteht darin, dass eine eindeutige Adresse für dieses Gerät in der Robonomics-Parachain erstellt wird, die zur Steuerung des Geräts oder zum Empfang seiner Telemetrie verwendet wird.

Verfügbare Funktionen sind:

* **Startfunktion** — Starten eines Geräts zur Ausführung eines beliebigen Befehls mit einem festgelegten Satz von Parametern, die als Zeichenfolge oder Datei übergeben werden.
* **Datenprotokollfunktion** — Veröffentlichen von Gerätedatentelemetrie in Form eines Hashes an die Parachain.
* **Nutzung des Robonomics-Abonnements** — die Möglichkeit, Transaktionen ohne Gebühr zu senden.
* **Sichere Dateispeicherung** — zum Verpacken und Entpacken von Daten wird das [InterPlanetary File System](https://ipfs.tech/) verwendet, das den Zugriff auf Dateien über ihren eindeutigen Hash ermöglicht. Zur bequemen Nutzung von IPFS ist die Unterstützung von [Pinata](https://www.pinata.cloud/) enthalten, die das Anheften von IPFS-Dateien für schnelles Herunterladen ermöglicht.
* **Dateiverschlüsselung und -entschlüsselung** — Schutz von Dateien mit Public-Key-Verschlüsselung.

Der Wrapper ist derzeit in der [Python-Implementierung](https://github.com/airalab/robonomics-ros2/) verfügbar.

## Architektur des Wrappers

Architektonisch besteht der Wrapper aus einem Worker-Knoten (mit den erforderlichen Themen und Diensten) und einer grundlegenden Knotenklasse, die für Ihre spezifischen Roboter verwendet werden kann.

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"ROS 2 Wrapper-Architektur"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — ein eindeutiger Knoten für jeden Roboter, der als Einstiegspunkt zu Web3 dient. Er umhüllt die Dienste zum Senden von Datalogs und zum Empfangen von Starts über Robonomics und ermöglicht das Herunterladen/Hochladen von Dateien auf IPFS. Dieser Knoten wird durch eine spezielle Datei konfiguriert, die unten beschrieben wird. Die Zugehörigkeit eines Knotens zu einem bestimmten Roboter kann sein.spezifiziert über den ROS-Namensraum.
* `robonomics_ros2_robot_handler` — ein roboterspezifischer Knoten basierend auf einer grundlegenden Klasse `basic_robonomics_handler` zur Koordination von Pubsub und dem Roboter. Es verarbeitet Starts und entscheidet, wann Datalogs zur Steuerung des Roboters gesendet werden sollen.

## Installation des Wrappers

Um mit dem Wrapper zu arbeiten, benötigen Sie die folgende Software:

* Linux-Betriebssystemverteilung (normalerweise Ubuntu)
* ROS 2-Verteilung
* IPFS-Knoten
* Python 3 (für die Python-Implementierung des Wrappers)

Bitte folgen Sie der Installationsanleitung, die [hier](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started) verfügbar ist, und überprüfen Sie die benötigten Versionen der Software. Nach dem Herunterladen der erforderlichen Komponenten müssen Sie [den Wrapper als übliches ROS 2-Paket mit dem `colcon`-Dienstprogramm](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#installation-and-building) erstellen.

## Konfigurieren von Verbindungen zur Web3-Cloud

Bevor Sie den Wrapper starten, müssen Sie festlegen, wie genau Ihr Roboter eine Verbindung zur dezentralen Robonomics-Cloud und den unterstützenden Web3-Diensten herstellen wird. Dazu müssen Sie die Datei einer Konfigurationsdatei namens `robonomics_pubsub_params_template.yaml` bearbeiten, die für jeden gestarteten Roboter, der auf Robonomics zugreifen muss, eindeutig sein muss.

Die Datei enthält die folgenden Konfigurationsfelder:

| Feld                 | Beschreibung                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Kontosamen der Robonomics-Parachain                                                                       |
| crypto_type           | Art Ihres Kontos, `ED25519` oder `SR25519`                                                               |
| remote_node_url       | Robonomics-Node-URL, Standardwert ist `wss://kusama.rpc.robonomics.network`, für lokalen Knoten `ws://127.0.0.1:9944`|
| rws_owner_address     | Eine Adresse des Robonomics-Abonnementbesitzers zur Verwendung des RWS-Moduls                                              |
| ipfs_dir_path         | Ein Pfad des Verzeichnisses, das IPFS-Dateien enthält                                                                  |
| ipfs_gateway          | IPFS-Gateway zum Herunterladen von Dateien, z. B. `https://ipfs.io`                                                     |
| pinata_api_key        | API-Schlüssel von [Pinata](https://www.pinata.cloud/) Pinning-Service für IPFS                                  |
| pinata_api_secret_key | Geheimer API-Schlüssel von [Pinata](https://www.pinata.cloud/) Pinning-Service für IPFS                           |

Um ein Konto auf der Robonomics-Parachain zu erstellen, verwenden Sie bitte [die folgende Anleitung](https://wiki.robonomics.network/docs/create-account-in-dapp/) in unserem Wiki. Achten Sie bitte auf den Typ des Kontos, den Sie erstellen, da Konten mit dem Typ SR25519 keine Dateiverschlüsselung verwenden können.

{% roboWikiNote {type: "warning", title: "Warnung"}%}

  Die Seed-Phrase ist eine sensible Information, die es jedem ermöglicht,Verwenden Sie Ihr Konto. Stellen Sie sicher, dass Sie keine Konfigurationsdatei damit auf GitHub oder an anderer Stelle hochladen.

{% endroboWikiNote %}

Achten Sie auf das `remote_node_url`-Feld, da es Ihnen ermöglicht, genau festzulegen, wie Sie sich mit der Robonomics-Parachain verbinden, einschließlich lokal. Sie können Ihre lokale Robonomics-Instanz für Tests und Entwicklung bereitstellen. Anleitungen dazu finden Sie in [diesem Artikel](https://wiki.robonomics.network/docs/run-dev-node/) in unserem Wiki.

Wenn Sie über ein Robonomics-Abonnement verfügen, das es Ihnen ermöglicht, Transaktionen ohne Gebühren zu senden, fügen Sie bitte die Adresse des Abonnementinhabers in das `rws_owner_address`-Feld ein. Vergessen Sie nicht, dass Ihr Konto zu Ihrem Abonnement hinzugefügt werden muss. Anleitungen dazu, wie Sie Ihr Robonomics-Abonnement aktivieren können, finden Sie in zwei Anleitungen: über die [Robonomics-Dapp](https://wiki.robonomics.network/docs/sub-activate/) mit benutzerfreundlicher Oberfläche oder über das [Robonomics-Substrat-Portal](https://wiki.robonomics.network/docs/get-subscription/).

Der Parameter `ipfs_gateway` ermöglicht es Ihnen, das Gateway anzugeben, über das IPFS-Dateien heruntergeladen werden. Diese können entweder [öffentliche Gateways](https://ipfs.github.io/public-gateway-checker/) oder spezialisierte private Gateways sein (zum Beispiel solche, die bei Pinata erhalten wurden).