---
title: Substrat Cumulus Parachain Testsuite für Cross-Chain-Nachrichten

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


Das Hauptziel dieses Projekts ist die Vereinfachung der Entwicklung von Parachain-Runtime, wenn Cross-Chain-Nachrichten verwendet werden. Es ermöglicht die Entwicklung von Runtime-Code mit Integrations-Tests mit einem hohen Maß an Wiederholbarkeit und einfacher Verwendung. Es automatisiert den Aufbau, die Konstruktion einer voreingestellten Netzwerkkonfiguration (d.h. 1 Relay-Chain + 2 Parachains), richtet Nachrichtenkanäle zwischen Parachains ein und führt Messaging-Tests durch, sendet Nachrichten unter Verwendung von Aufrufen an die Runtime, alles konstruiert und zusammengesetzt in Python.

Das XCM-Testsuite wird für den Testzyklus der Robobank-Produktion verwendet - dem Satz von Substrat-Paletten, die es Robotern ermöglichen, sich auf externen Parachains zu registrieren, vorab bezahlte Bestellungen zu erhalten, sie auszuführen und Zahlungen unter Verwendung externer Token zu erhalten. Dies ermöglicht es Robotern, im Robonomics-Netzwerk mit der gesamten erforderlichen Infrastruktur zu arbeiten, aber gleichzeitig ihre Dienste auf jeder anderen Parachain anzubieten.

Ein Beispielvideo ist auf [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM) verfügbar.

Die Hauptschritte im Demoszenario sind:
- Starten der Relay-Chain und zweier Parachains in einem Paket von 6 Prozessen
- Einrichten von XCM-Nachrichtenkanälen zwischen Parachains
- Registrieren eines Roboters in beiden Parachains
- Erstellen einer Bestellung für diesen Roboter in der Client-Parachain (Reservierung der Zahlung für die Fertigstellung der Bestellung)
- Senden einer XCM-Nachricht an die Robonomics-Parachain
- Erstellen des "gespiegelten" Bestellungsdatensatzes auf der Robonomics-Parachain
- Roboter akzeptiert die Bestellung auf der Robonomics-Parachain
- Senden einer XCM-Nachricht über die Bestellannahme zurück an die Client-Parachain
- Bestellung in der Client-Parachain akzeptieren (Reservierung einer Strafgebühr für Nichterfüllung der Bestellung bis zum Bestellungszeitpunkt)
- Roboter führt die Bestellung auf der Robonomics-Parachain aus
- Senden einer XCM-Nachricht über die Bestellabschluss an die Client-Parachain
- Abwicklung aller Zahlungen (Zahlung des Kunden wird an den Roboter überwiesen, ebenso wie die ungenutzte Strafgebühr)
- Bestellung schließen


## Upstream
Dieses Projekt ist ein Fork des
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
Es enthält den Code der getesteten Runtime-Paletten.
Wie im OriginalDer Knotencode der Parachains befindet sich in den Verzeichnissen "./pallets", "./runtime" und "./node".

Unterschiede zum Original "substrate-node-template":
- Dieser Collator-Runtime verfügt über ein HRMP-Handler-Modul und kann Nachrichten von benachbarten Parachains verarbeiten.
- Mock-Test-Runtime, bereit für interne XCM-Tests.

## Erstellen & Ausführen
Empfohlen (sehr): 
```
Ubuntu 20, 16 GB RAM, 8 CPU, 120 GB SSD
```
[HINWEIS] Der erste Build kann auf suboptimalen Maschinen viel Zeit in Anspruch nehmen, bis zu mehreren Stunden.

[HINWEIS] Das Skript funktioniert mit den festen Versionen (Commit-Hashes) von Polkadot (Rococo) im Relay-Chain und den Parachains.

[HINWEIS] Standardmäßig erstellt das Skript bei jedem Start die gleiche Umgebung, indem es alle vorherigen Zustände entfernt. Dieses Verhalten kann in "config.sh" mit dem Parameter "PERSISTENT" geändert werden.

Führen Sie das Build- und Setup-Skript aus.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Grundlegende Aktionen des Skripts "init.sh":
 - Liest die Konfiguration (Datei "config.sh" mit Revisionsnummer, initialen Knotenschlüsseln und Identifikatoren, Chaindata-Persistenzparameter usw.).
 - Installiert OS-Pakete, Rust und Python.
 - Erstellt separate Binärdateien für die Relay-Chain und auch für beide Parachains.
    - Die Binärdateien werden im Unterverzeichnis ./bin generiert.
 - (Optional) Entfernt alle vorherigen Chain-Daten für alle Chains.
    - Deaktiviert, wenn "PERSISTENT=1" in "config.sh" gesetzt ist.
 - Führt als separate Prozesse aus (mit separaten PIDs und I/O-Pipes):
    - Validatoren der Relay-Chain (d.h. 4 Validatoren, die eine stabile Rococo-Revision ausführen)
    - Collators für Parachain-100 (d.h. ein einzelner Collator für die erste Parachain, an der Sie arbeiten)
    - Collators für Parachain-200 (d.h. ein einzelner Collator für die zweite Parachain, an der Sie arbeiten)
 - Gibt alle Endpunkte, Ports in der Konsole aus, sodass Sie jede Chain mit Frontend-Apps (Explorer, DApp) untersuchen können.
 - Gibt alle Ausgabedaten aller Chains kontinuierlich in der Konsole aus.

[WARNUNG] Warten Sie nach dem Start, bis das Netzwerk aktiv ist, stellen Sie sicher, dass die Blockfinalisierung begonnen hat und dass die Parachains registriert sind. Diese Prozesse sollten...Benötigt ungefähr 5 Minuten (50 Blöcke x 6 Sekunden).

## Überprüfen, ob das anfängliche Setup funktioniert

Verwenden Sie das Standard-Polkdot-Frontend und generierte "--ws-port"-Endpunkte, um sich mit jedem Knoten zu verbinden.
Öffnen Sie die [Polkadot-Anwendung](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/), um die Ketten zu überwachen.

### Beispiel:
Localhost, 4 Relay-Chain-Validatoren, ein Parachain-100-Collator, ein Parachain-200-Collator:
- [Relay-Validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay-Validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay-Validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay-Validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100-Collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200-Collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)

Wenn alles funktioniert und der Konsens gestartet ist, können wir mit dem Ausführen unserer Testfälle fortfahren (in einem neuen Terminal).

### UMP-Nachrichtenübermittlungstest
```bash
./scripts/init.sh ump
```
Es erstellt eine `Balance.transfer`-Nachricht in `Parachain-100` und leitet sie an die Relay-Chain weiter.
Wenn die Relay-Chain die Nachricht empfängt, werden 15 Token vom Konto `Para 100` auf das Konto von Charlie übertragen.

### HRMP-Nachrichtenübermittlungstest
```bash
./scripts/init.sh ump
```

Es erstellt eine `Balance.transfer`-Nachricht in `Parachain-100` und leitet sie an das `Sibling 200` weiter.
Davor stattet es das Konto `Subl 100` mit 1000 Token aus und richtet einen Kommunikationskanal zwischen den Parachains ein.
```bash
./scripts/init.sh hrmp
```
Weitere Nachrichten können gesendet werden, indem der `hrmpm`-Unterbefehl ausgeführt wird. Es erstellt keinen Kanal und läuft daher schneller.
```bash
./scripts/init.sh hrmpm
```

### Weitere Optionen
```bash
./scripts/init.sh help
```

## Lokales Testnetzwerk### Erstellen einer benutzerdefinierten Chain-Spezifikation
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Bearbeiten Sie rococo_local.json und ersetzen Sie die Parameter für Salden und Behörden durch Ihre eigenen.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

Polkadot-Adresse für //Alice//stash (sr25519-Kryptografie).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Geheimer Schlüssel-URI `//Alice//stash` ist Konto:
Geheimer Seed:      

Öffentlicher Schlüssel (hex): 

Kontonummer:       

SS58-Adresse:     
```

Polkadot-Grandpa-Sitzungsschlüssel für //Alice (ed25519-Kryptografie).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Geheimer Schlüssel-URI `//Alice` ist Konto:
Geheimer Seed:      

Öffentlicher Schlüssel (hex): 

Kontonummer:       

SS58-Adresse:     
```

Polkadot-Adresse für //Alice (sr25519-Kryptografie).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Geheimer Schlüssel-URI `//Alice` ist Konto:
Geheimer Seed:      

Öffentlicher Schlüssel (hex): 

Kontonummer:       

SS58-Adresse:     
```

Konvertieren Sie rococo_local.json in das Rohformat.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Um die neue Chain-Spezifikation zu verwenden, ersetzen Sie die Datei rococo.json im Verzeichnis ./config/ durch diese neue und starten Sie die Chain erneut.
```bash
./scripts/init.sh run
```
Sie können den Code frei bearbeiten. Der obige Befehl wird das Projekt neu erstellen und den Collator-Knoten aktualisieren, bevor es gestartet wird.
Cumulus ist eine Vorabversion, die sich noch in der intensiven Entwicklung befindet.
Wir verwenden einen spezifischen Commit von Polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18. März 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5)de

Sie können neuere Versionen der Software verwenden. Ändern Sie dazu  POLKADOT_COMMIT  in ./scipt/config.sh
auf den neuesten Commit des `rococo-v1`-Zweigs, löschen Sie ./bin/polkadot und führen Sie aus
```bash
./scripts/init.sh run
```

Aktualisieren Sie die Abhängigkeiten des Collator-Projekts
```bash
cargo update
./scripts/init.sh build
```
Einige Abhängigkeiten erfordern wahrscheinlich neue Funktionen der Rust-Toolchain. Dieses Projekt basiert auf Rust `nightly-2021-01-26`
Aktualisieren Sie die Rust-Toolchain-Version in ./scripts/config.sh vor dem Build.

## Hack parachain
[Fügen Sie ein externes Pallet hinzu](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - sollte es wahrscheinlich unter "Weitere Informationen" sein?
## Weitere Informationen

Konsultieren Sie die Upstream
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
um mehr über die Struktur dieses Projekts, die darin verkörperten Fähigkeiten und die Art und Weise zu erfahren, wie diese Fähigkeiten implementiert sind. Sie können mehr über
[Der Weg eines Parachain-Blocks](https://polkadot.network/the-path-of-a-parachain-block/) auf dem
offiziellen Polkadot-Blog erfahren.
[Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)