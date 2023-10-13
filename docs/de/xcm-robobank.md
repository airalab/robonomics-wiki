---
title: Substrate Cumulus Parachain Testsuite für Cross-Chain-Messaging 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


Das Hauptziel dieses Projekts ist die Vereinfachung der Entwicklung von Parachain-Laufzeitumgebungen bei Verwendung von Cross-Chain-Nachrichten. 
Es ermöglicht die Entwicklung von Laufzeitcode mit Integrationstests mit hoher Wiederholbarkeit und einfacher Verwendung.
Es automatisiert den Aufbau, die Konstruktion einer voreingestellten Netzwerkkonfiguration (d. h. 1 Relay-Chain + 2 Parachains), die Einrichtung von Nachrichtenkanälen zwischen Parachains und die Durchführung von Messaging-Tests, das Senden von Nachrichten unter Verwendung eines Aufrufs an die Laufzeitumgebung, alles in Python konstruiert und zusammengesetzt.

Die XCM-Testsuite wird zur Prüfung des Produktionszyklus von Robobank verwendet - der Satz von Substrate-Paletten, die es Robotern ermöglichen, sich auf externen Parachains zu registrieren, vorab bezahlte Bestellungen zu erhalten, diese auszuführen und Zahlungen unter Verwendung externer Token zu erhalten. Dies ermöglicht es Robotern, innerhalb des Robonomics-Netzwerks mit der gesamten erforderlichen Infrastruktur zu arbeiten, gleichzeitig aber ihre Dienste auf jedem anderen Parachain anzubieten.

Ein Beispielvideo ist auf [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM) verfügbar.

Die wichtigsten Schritte im Demo-Szenario sind:
- Starten Sie Relay-Chain und zwei Parachains in einem Paket von 6 Prozessen.
- Richten Sie XCM-Nachrichtenkanäle zwischen Parachains ein.
- Registrieren Sie einen Roboter in beiden Parachains.
- Erstellen Sie eine Bestellung für diesen Roboter im Client-Parachain (Reservierung der Zahlung für die Fertigstellung der Bestellung).
- Senden Sie eine XCM-Nachricht an das Robonomics-Parachain.
- Erstellen des "gespiegelten" Bestellungsdatensatzes auf dem Robonomics-Parachain.
- Der Roboter akzeptiert die Bestellung auf dem Robonomics-Parachain.
- Senden Sie eine XCM-Nachricht über die Bestellannahme zurück an das Client-Parachain.
- Akzeptieren Sie die Bestellung auf dem Client-Parachain (Reservierung einer Strafgebühr für die Nichterfüllung der Bestellung bis zum Bestellungsdeadline).
- Der Roboter erfüllt die Bestellung auf dem Robonomics-Parachain.
- Senden Sie eine XCM-Nachricht über die Bestellfertigstellung an das Client-Parachain.
- Abwicklung aller Zahlungen (Kundenzahlung wird an den Roboter übertragen sowie die ungenutzte Strafgebühr).
- Schließen Sie die Bestellung1 ab.


## Upstream
Dieses Projekt ist ein Fork des
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
Es enthält den Code der getesteten Laufzeitpaletten.
Wie im Originalknotencode befinden sich die Parachain-Codes in den Verzeichnissen "./pallets", "./runtime", "./node".

Unterschiede zum Original "substrate-node-template":
- Diese Collator-Laufzeitumgebung verfügt über ein HRMP-Handlermodul und kann Nachrichten von benachbarten Parachains verarbeiten.
- Mock-Test-Laufzeitumgebung, die für interne XCM-Tests bereit ist.

## Build & Run
Empfohlene (sehr) Einrichtung: 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[HINWEIS] Der erste Build kann viel Zeit in Anspruch nehmen, bis zu mehreren Stunden auf suboptimalen Maschinen.

[HINWEIS] Das Skript funktioniert mit den festen Versionen (Commit-Hashes) von Polkadot(Rococo) in der Relay-Chain und den Parachains.

[HINWEIS] Standardmäßig erstellt das Skript bei jedem Start die gleiche Umgebung, indem es alle vorherigen Zustände entfernt. Dieses Verhalten kann in "config.sh" mit dem Parameter "PERSISTENT" geändert werden.


Führen Sie das Build- und Setup-Skript aus.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Grundlegende Aktionen des Skripts "init.sh":
 - Konfiguration lesen (Datei "config.sh" mit Revisionsnummer, initialen Knotenschlüsseln und -identifikatoren, Chaindata-Persistenzparameter usw.)
 - Setup von OS-Paketen, Rust und Python
 - Erstellen separater Binärdateien für die Relay-Chain sowie für beide Parachains
    - Die Binärdateien werden im Unterverzeichnis ./bin generiert. 
 - (optional) Entfernen aller vorherigen Chain-Daten für alle Chains
    - Deaktiviert, wenn "PERSISTENT=1" in "config.sh" festgelegt ist
 - Als separate Prozesse ausführen (mit separaten PIDs und I/O-Pipes):
    - Validatoren der Relay-Chain (d. h. 4 Validatoren, die eine stabile Rococo-Revision ausführen)
    - Collatoren für Parachain-100 (d. h. ein einzelner Collator für den ersten Parachain, den Sie entwickeln)
    - Collatoren für Parachain-200 (d. h. ein einzelner Collator für den zweiten Parachain, den Sie entwickeln)
 - Alle Endpunkte und Ports werden in der Konsole gedruckt, sodass Sie jede Chain mit Frontend-Apps (Explorer, DApp) untersuchen können.
 - Alle Ausgabedaten aller Chains werden weiterhin in der Konsole gedruckt.

[WARNUNG] Warten Sie nach dem Starten, bis das Netzwerk hochgefahren ist, stellen Sie sicher, dass die Blockfinalisierung begonnen hat und die Parachains registriert sind. Diese Prozesse sollten etwa 5 Minuten dauern (50 Blöcke x 6 Sekunden).

## Überprüfen, ob die anfängliche Einrichtung funktioniert 

Verwenden Sie das Standard-Polkadot-Frontend und die generierten "--ws-port"-Endpunkte, um eine Verbindung zu jedem Knoten herzustellen.
Öffnen Sie [Polkadot-Anwendung](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/), um die Chains zu überwachen. 

### Beispiel:
Localhost, 4 Relay-Chain-Validatoren, ein Parachain-100-Collator, ein Parachain-200-Collator:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


Wenn alles funktioniert und der Konsens gestartet ist, können wir mit dem Ausführen unserer Testfälle fortfahren (in einem neuen Terminal).

### UMP-Nachrichtenübermittlungstest
```bash
./scripts/init.sh ump
```
Es erstellt eine `Balance.transfer`-Nachricht in `Parachain-100` und leitet sie an die Relay-Kette weiter.
Wenn die Relay-Kette die Nachricht empfängt, werden 15 Token vom Konto `Para 100` auf das Konto von Charlie übertragen.


### HRMP-Nachrichtenübermittlungstest
```bash
./scripts/init.sh ump
```

Es erstellt eine `Balance.transfer`-Nachricht in `Parachain-100` und leitet sie an die `Sibling 200` weiter.
Davor stattet es das Konto `Subl 100` mit 1000 Token aus und richtet eine Kommunikationsverbindung zwischen den Parachains ein.
```bash
./scripts/init.sh hrmp
```
Weitere Nachrichten können gesendet werden, indem der Befehl `hrmpm` ausgeführt wird. Es erstellt keinen Kanal und läuft daher schneller.
```bash
./scripts/init.sh hrmpm
```

### Weitere Optionen
```bash
./scripts/init.sh help
```

## Lokales Testnetz

### Erstellen einer benutzerdefinierten Ketten-Spezifikation
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Bearbeiten Sie die Datei rococo_local.json und ersetzen Sie die Parameter für Guthaben und Behörden durch Ihre eigenen.
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

Polkadot-Adresse für //Alice//Stash (sr25519-Kryptographie).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Polkadot-Grandpa-Sitzungsschlüssel für //Alice (ed25519-Kryptographie).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Polkadot-Adresse für //Alice (sr25519-Kryptographie).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Konvertieren Sie rococo_local.json in das Rohformat.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Um die neue Ketten-Spezifikation zu verwenden, ersetzen Sie die Datei rococo.json im Verzeichnis ./config/ durch diese neue und führen Sie die Kette erneut aus.
```bash
./scripts/init.sh run
```
Sie können den Code frei bearbeiten. Der obige Befehl erstellt das Projekt neu und aktualisiert den Collator-Knoten vor dem Start.
Cumulus ist eine Vorabversion der Software, die sich noch in der intensiven Entwicklung befindet.
Wir verwenden einen bestimmten Commit von Polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18. März 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

Sie können neuere Versionen der Software verwenden. Ändern Sie dazu POLKADOT_COMMIT in ./scipt/config.sh
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
Aktualisieren Sie die Version der Rust-Toolchain in ./scripts/config.sh vor dem Build.

## Parachain hacken
[Externe Palette hinzufügen](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - sollte es wahrscheinlich in "Weitere Informationen" sein?
## Learn More

Weitere Informationen zur Struktur dieses Projekts, den darin enthaltenen Fähigkeiten und der Art und Weise, wie diese Fähigkeiten implementiert sind, finden Sie im Upstream [Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template). Weitere Informationen zum [Pfad eines Parachain-Blocks](https://polkadot.network/the-path-of-a-parachain-block/) finden Sie im offiziellen Polkadot-Blog. [Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)
