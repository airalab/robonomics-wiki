---
title: Wie man den Robonomics-Collator startet
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"Hinweis", type: "Hinweis"}%} In der Screencast und den Screenshots dieses Artikels haben wir die Version 1.4.0 von Robonomics verwendet. Sie müssen dieselben Befehle verwenden, aber die Version von Robonomics durch die aktuelle ersetzen.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

Aktuell wird das Robonomics-Netzwerk hauptsächlich von den ursprünglichen Entwicklern gewartet, aber jeder kann das Projekt unterstützen. Jeder zusätzliche vollständige Knoten des Blockchains hilft ihm, nachhaltiger und fehlertoleranter zu werden. Robonomics-Knoten-Binärdateien sind in [Release](https://github.com/airalab/robonomics/releases) Assets verfügbar oder können [aus Quellcode erstellt werden](/docs/how-to-build-collator-node/).

## Was ist ein Collator

Ein Collator ist Teil der Robonomics-Parachain. Diese Art von Knoten erstellt neue Blöcke für die Robonomics-Kette.

>Collators pflegen Parachains, indem sie Parachain-Transaktionen von Benutzern sammeln und Zustandsübergangs-Nachweise für Relay-Chain-Validatoren erstellen. Mit anderen Worten, Collators pflegen Parachains, indem sie Parachain-Transaktionen in Parachain-Blockkandidaten aggregieren und Zustandsübergangs-Nachweise für Validatoren basierend auf diesen Blöcken erstellen.

Weitere Informationen zu Collators finden Sie auf der entsprechenden [Polkadot-Wikiseite](https://wiki.polkadot.network/docs/learn-collator)

In der Robonomics-Parachain erhält jeder Collator Belohnungen von (**0,001598184 XRT**) für jeden Block, den der Collator erstellt (Belohnungen erfolgen, wenn Blöcke an die Kette versiegelt werden).
Außerdem erhält der Collator, der den Block erstellt, **50 % der Transaktionsgebühren**, die im von ihnen erstellten Block enthalten sind.

## Anforderungen

Es wird empfohlen, einen Collator gemäß den **Standard-Hardwareanforderungen** für [Polkadot-Validatoren](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware) zu starten:
+ x86-64 kompatibel.
+ Intel Ice Lake oder neuer (Xeon oder Core-Serie); AMD Zen3 oder neuer (EPYC oder Ryzen).
+ 4 physische Kerne @ 3,4 GHz.
+ Simultanes Multithreading deaktiviert (Hyper-Threading bei Intel, SMT bei AMD).
+ Speicher - Eine NVMe-SSD von 1 TB (da sie vernünftig dimensioniert sein sollte, um mit dem Wachstum der Blockchain umgehen zu können).
+ Speicher - 32 GB DDR4 ECC


In diesem Artikel verwenden wir folgende Spezifikationen:
+ 4 vCPU
+ 700 GB NVMe-Speicherplatz für die Datenbanken des Collators. Die Möglichkeit, diesen Festplattenspeicher zu erweitern, ist erforderlich.
+ 8 GB RAM


## Wichtige Informationen
1. Wir verwenden einige Variablen in diesen Anweisungen, und Sie müssen die Werte in allen Befehlen durch Ihre eigenen ersetzen:
    + **%NODE_NAME%** ist der Knotenname. Beispiel: *mein-robonomics-kusama-collator*
    + **%BASE_PATH%** ist der Pfad zum eingehängten Volume. Beispiel: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** ist die Kontoadresse im Polkadot-Ökosystem im SS58-Format. Beispiel: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Beachten Sie, dass Sie *--state-cache-size=0* beim Start des Collator-Dienstes angeben müssen. Dieser Parameter ist wichtig für die Stabilität des Collators.
Weitere Informationen finden Sie im entsprechenden [Problem](https://github.com/airalab/robonomics/issues/234) auf GitHub.

## Erstmaliges einfaches Starten eines Robonomics-Collators

Sie können einen Collator einfach direkt in der Befehlszeile starten, um Fehler zu überprüfen.
Nachdem dies erfolgt ist, wird dringend empfohlen, den Robonomics-Collator als Dienst zu starten (siehe nächsten Schritt).

```
root@robokusama-collator-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb
```


## Starten des Robonomics-Collators als Dienst

1. Erstellen Sie den Benutzer für den Dienst mit Heimverzeichnis
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Laden Sie das Robonomics-Binärpaket herunter, extrahieren Sie es und verschieben Sie es in das Verzeichnis */usr/local/bin/*. Ersetzen Sie in den Befehlen in diesem Abschnitt *$ROBONOMICS_VERSION* durch die aktuelle Version von Robonomics. Die aktuelle Version finden Sie auf der [Releases-Seite des Robonomics-Repositorys auf GitHub](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Robonomics 1.4.0-Binärdatei herunterladen"} %}{% endroboWikiPicture %}


3. Erstellen Sie die systemd-Service-Datei mit dem Namen *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    Fügen Sie die folgenden Zeilen in die Service-Datei ein:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Robonomics-Service-Datei erstellen"} %}{% endroboWikiPicture %}


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Speichern Sie diese Datei, aktivieren Sie dann den Dienst und starten Sie ihn:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

Telemetrie-URL: https://telemetry.parachain.robonomics.network/#/Robonomics

Die Collator-Logs können mit `journalctl -u robonomics.service -f` überwacht werden.

Sobald der Robonomics-Collator gestartet ist, beginnt er mit der Synchronisierung mit der Kusama-Relay-Chain. Dies kann je nach Netzwerkgeschwindigkeit und Systemspezifikationen eine beträchtliche Zeit in Anspruch nehmen, daher empfehlen wir, einen Kusama-Snapshot herunterzuladen.


## Beschleunigen des Synchronisierungsprozesses mithilfe eines Kusama-Snapshots

Wir empfehlen, dies unmittelbar nach dem Erstellen und Starten des Robonomics-Dienstes durchzuführen. Weitere Informationen zu Snapshots und Anweisungen zur Verwendung finden Sie auf der folgenden Seite: https://ksm-rocksdb.polkashots.io/

Anweisungen:

1. Stoppen Sie den Robonomics-Dienst und entfernen Sie das aktuelle Kusama-Datenbankverzeichnis:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Laden Sie den aktuellen Snapshot herunter und entpacken Sie ihn:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Kusama-Snapshot herunterladen"} %}{% endroboWikiPicture %}

    Nach erfolgreichem Entpacken können Sie das heruntergeladene Archiv entfernen:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Richten Sie die richtigen Besitzverhältnisse für den Datenbankordner ein:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Starten Sie den Robonomics-Dienst erneut:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Überprüfen Sie die Dienstprotokolle:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Dienstprotokolle überprüfen"} %}{% endroboWikiPicture %}

## Fehlerbehebung
### Fehler: "State Database error: Too many sibling blocks inserted"
Um diesen Fehler zu beheben, können Sie Ihren Collator einfach im Archivmodus starten:

1) Zuerst müssen Sie den Robonomics-Dienst stoppen:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) Fügen Sie dann den Parameter `--state-pruning=archive` zum Parachain-Teil der Dienstdatei hinzu. Beispiel für die bearbeitete Dienstdatei:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

3) Laden Sie die Systemd-Manager-Konfiguration neu:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Entfernen Sie die vorhandene Parachain-Datenbank:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Starten Sie den Robonomics-Dienst:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Danach müssen Sie auf die Synchronisierung der Parachain-Datenbank warten.

### Fehler: "cannot create module: compilation settings are not compatible with the native host"
Dieser Fehler hängt mit den Virtualisierungsparametern zusammen. Verwenden Sie den Typ "host-model" des emulierten Prozessors. Dies kann auf dem Virtualisierungshost eingerichtet werden.

Wenn Sie diesen Fehler jedoch auf einem beliebigen Hosting erhalten, wenden Sie sich nur an den technischen Support, um dieses Problem zu klären.