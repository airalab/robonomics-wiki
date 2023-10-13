---
title: Wie man den Robonomics-Collator startet
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  In der Screencast und den Screenshots dieses Artikels haben wir Version 1.4.0 von Robonomics verwendet. Sie müssen dieselben Befehle verwenden, aber die Version von Robonomics durch die aktuelle ersetzen.
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

Derzeit wird das Robonomics-Netzwerk hauptsächlich von den ursprünglichen Entwicklern gewartet, aber jeder kann das Projekt unterstützen. Jeder zusätzliche Vollknoten der Blockchain trägt dazu bei, dass sie nachhaltiger und fehlertoleranter wird. Robonomics-Knoten-Binärdateien sind in [Release](https://github.com/airalab/robonomics/releases) Assets verfügbar oder können aus dem Quellcode erstellt werden (/docs/how-to-build-collator-node/).

## Was ist ein Collator

Ein Collator ist Teil der Robonomics-Parachain. Diese Art von Knoten erstellt neue Blöcke für die Robonomics-Kette.

>Collators pflegen Parachains, indem sie Parachain-Transaktionen von Benutzern sammeln und Zustandsübergangsproben für Relay Chain-Validatoren erstellen. Mit anderen Worten, Collators pflegen Parachains, indem sie Parachain-Transaktionen zu Parachain-Blockkandidaten aggregieren und Zustandsübergangsproben für Validatoren basierend auf diesen Blöcken erstellen.

Weitere Informationen zu Collatoren finden Sie auf der entsprechenden [Polkadot-Wiki-Seite](https://wiki.polkadot.network/docs/learn-collator).

In der Robonomics-Parachain erhält jeder Collator eine Belohnung von (**0,001598184 XRT**) für jeden Block, den der Collator erstellt (Belohnungen treten auf, wenn Blöcke an die Kette gebunden werden).
Auch der Collator, der den Block erstellt, erhält **50% der Transaktionsgebühren**, die sich im von ihnen erstellten Block befinden.

## Anforderungen

Es wird empfohlen, einen Collator mit den **Standard-Hardwareanforderungen** für [Polkadot-Validatoren](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware) zu starten:
+ x86-64 kompatibel.
+ Intel Ice Lake oder neuer (Xeon oder Core-Serie); AMD Zen3 oder neuer (EPYC oder Ryzen).
+ 4 physische Kerne @ 3,4 GHz.
+ Simultaneous Multithreading deaktiviert (Hyper-Threading bei Intel, SMT bei AMD).
+ Speicher - Eine NVMe-SSD mit 1 TB (da sie vernünftig dimensioniert sein sollte, um mit dem Wachstum der Blockchain umzugehen).
+ Speicher - 32 GB DDR4 ECC


In diesem Artikel verwenden wir folgende Spezifikationen:
+ 4 vCPU
+ 700 GB NVMe-Speicherplatz für die Datenbanken des Collators. Die Möglichkeit, diesen Festplattenspeicher zu erweitern, ist erforderlich.
+ 8 GB RAM


## Wichtige Informationen
1. Wir verwenden einige Variablen in diesen Anweisungen, und Sie müssen die Werte in allen Befehlen durch Ihre eigenen ersetzen:
    + **%NODE_NAME%** ist der Knotenname. Beispiel: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** ist der Pfad zum eingebundenen Volume. Beispiel: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** ist die Kontoadresse im Polkadot-Ökosystem im SS58-Format. Beispiel: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Beachten Sie, dass Sie *--state-cache-size=0* in den Start des Collator-Dienstes aufnehmen müssen. Dieser Parameter ist wichtig für die Stabilität des Collators.
Weitere Informationen finden Sie in der entsprechenden [Issue](https://github.com/airalab/robonomics/issues/234) auf GitHub.

## Erstmaliges einfaches Starten eines Robonomics-Collators

Sie können einen Collator einfach direkt in der Befehlszeile starten, um nach Fehlern zu suchen.
Nachdem Sie dies getan haben, wird dringend empfohlen, den Robonomics-Collator als Dienst zu starten (siehe nächsten Schritt).

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


## Starten Sie den Robonomics-Collator als Dienst

1. Erstellen Sie den Benutzer für den Dienst mit dem Home-Verzeichnis
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Laden Sie das Robonomics-Binary herunter, extrahieren Sie es und verschieben Sie es in das Verzeichnis */usr/local/bin/*. Sie müssen *$ROBONOMICS_VERSION* in den Befehlen in diesem Abschnitt durch die aktuelle Version von Robonomics ersetzen. Die aktuelle Version finden Sie auf der [Releases-Seite des Robonomics-Repositorys auf GitHub](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


3. Erstellen Sie die systemd-Service-Datei mit dem Namen *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    Und fügen Sie die folgenden Zeilen in die Service-Datei ein:
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

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Speichern Sie diese Datei, aktivieren Sie dann den Dienst und starten Sie ihn:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

Telemetrie-URL: https://telemetry.parachain.robonomics.network/#/Robonomics

Collator-Protokolle können mit „journalctl -u robonomics.service -f“ überwacht werden

Sobald der Robonomics-Collator gestartet ist, beginnt er mit der Synchronisierung mit der Kusama-Relay-Kette. Dies kann je nach Netzwerkgeschwindigkeit und Systemspezifikationen eine beträchtliche Zeit in Anspruch nehmen. Wir empfehlen daher, einen Kusama-Snapshot herunterzuladen.


## Beschleunigen des Synchronisierungsprozesses mit einem Kusama-Snapshot

Wir empfehlen, dies unmittelbar nach Erstellung und Start des Robonomics-Dienstes durchzuführen. Weitere Informationen zu Snapshots und Anweisungen zur Verwendung finden Sie auf der folgenden Seite: https://ksm-rocksdb.polkashots.io/

Anweisungen:

1. Stoppen Sie den Robonomics-Dienst und entfernen Sie das aktuelle Kusama-Datenbankverzeichnis:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Laden Sie den aktuellen Snapshot herunter und extrahieren Sie ihn:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    Nach erfolgreichem Entpacken können Sie das heruntergeladene Archiv entfernen:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Setzen Sie das richtige Eigentum für den Datenbankordner:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Starten Sie den Robonomics-Dienst erneut:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Überprüfen Sie die Protokolle des Dienstes:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```    
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## Fehlerbehebung
### Fehler: "State Database error: Too many sibling blocks inserted"
Um diesen Fehler zu beheben, können Sie Ihren Collator einfach im Archivmodus starten:

1) Zunächst muss der Robonomics-Dienst gestoppt werden: 
    
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    

2) Fügen Sie dann den Parameter `--state-pruning=archive` zum Parachain-Teil der Service-Datei hinzu. Beispiel für die bearbeitete Service-Datei:
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

    Danach müssen Sie auf die Synchronisierung der Parahain-Datenbank warten.

### Fehler: "cannot create module: compilation settings are not compatible with the native host"
Dieser Fehler betrifft die Virtualisierungsparameter. Sie müssen den emulierten Prozessortyp "host-model" verwenden. Dies können Sie auf dem Virtualisierungshost einrichten.

Wenn Sie diesen Fehler jedoch bei einem beliebigen Hosting-Anbieter erhalten, müssen Sie den technischen Support nur nach diesem Problem fragen.
