---
title: Anleitung zum Aktualisieren der Robonomics Collator Node-Version

contributors: [Leemo94]
---

Es wird empfohlen, die folgenden Artikel vor dem Lesen dieses Beitrags zu lesen: ["Anleitung zum Erstellen einer Collator-Node"](/docs/how-to-build-collator-node) & ["Anleitung zum Starten des Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

Dieser Artikel enthält die Befehle, die erforderlich sind, um eine Robonomics Collator-Node (unter Ubuntu ausgeführt) zu aktualisieren, und gibt danach ein Beispiel.

## **Erforderliche Befehle**

0. Bevor Sie beginnen, wird empfohlen, dass Sie als `root` angemeldet sind. Andernfalls empfehle ich Ihnen, Folgendes zu verwenden:


{% codeHelper { copy: true} %}

```shell
sudo su -
```

{% endcodeHelper %}

1. Stoppen Sie den Robonomics-Dienst:

{% codeHelper { copy: true} %}

```shell
systemctl stop robonomics.service
```

{% endcodeHelper %}


2. Entfernen Sie die vorherige Version von Robonomics (stellen Sie sicher, dass Sie sich im richtigen Verzeichnis befinden):

{% codeHelper { copy: true} %}

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

{% endcodeHelper %}

3. Holen Sie sich die [neueste Version](https://github.com/airalab/robonomics/releases) von Robonomics:


{% codeHelper { copy: true}%}

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

{% endcodeHelper %}


4. Entpacken Sie die Datei:

{% codeHelper { copy: true}%}

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

{% endcodeHelper %}


5. Verschieben Sie die Datei:

{% codeHelper { copy: true}%}

```shell
mv robonomics /usr/local/bin/
```

{% endcodeHelper %}

{% roboWikiNote {type: "note"}%} Sie müssen diese Datei in das richtige Verzeichnis verschieben, in dem Sie die Robonomics-Node installiert haben {% endroboWikiNote %}

6. Starten Sie Robonomics:

{% codeHelper { copy: true}%}

```shell
systemctl start robonomics.service
```

{% endcodeHelper %}

Beispiel zum Aktualisieren der Collator-Node auf Robonomics v1.8.4:

{% codeHelper %}

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service

```

{% endcodeHelper %}


## **Ändern der Kusama Relay Chain-Datenbank ohne festgelegten Basispfad**

Manchmal führen bestimmte Snapshots der Kusama Relay Chain dazu, dass Ihre Node Fehler aufweist. Dies führt oft dazu, dass Ihre Node nicht mehr funktioniert. Beispiel für einen Fehler, der durch eine beschädigte Relay Chain-Datenbank verursacht wird:


{% codeHelper %}

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

{% endcodeHelper %}


Um diesen Fehler zu beheben, sollten Sie Ihre vorhandene Kusama Relay Chain-Datenbank (wahrscheinlich RocksDb) entfernen und durch eine andere Db wie ParityDb ersetzen. Führen Sie die folgenden Befehle aus:

1. Finden Sie das Verzeichnis der Robonomics-Node und überprüfen Sie die Dateien:

{% codeHelper %}

```shell
cd /home/robonomics/
ls -a
```

{% endcodeHelper %}


2. Bestätigen Sie, dass Sie das polkadot-Verzeichnis sehen, und navigieren Sie dann zum chains-Verzeichnis:


{% codeHelper %}

```shell
cd /polkadot/chains/
ls -a
```

{% endcodeHelper %}

3. Löschen Sie das `ksmcc3`-Verzeichnis:


{% codeHelper {copy: true} %}

```shell
rm -r ksmcc3
```

{% endcodeHelper %}


4. Erstellen Sie ein neues `ksmcc3`-Verzeichnis.

{% codeHelper {copy: true} %}

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

{% endcodeHelper %}

5. Jetzt müssen Sie einen neuen Snapshot herunterladen. In diesem Beispiel wird ein stark beschnittener Relay Chain-Snapshot verwendet, aber Sie können ihn gegen jeden bevorzugten Snapshot austauschen.


{% codeHelper {copy: true} %}

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

{% endcodeHelper %}

6. Während der Download des Snapshots läuft, öffnen Sie eine neue Sitzung und bearbeiten Sie Ihre Service-Datei:

{% codeHelper {copy: true} %}

```shell
sudo nano /etc/systemd/system/robonomics.service
```

{% endcodeHelper %}

Ändern Sie die Zeilen innerhalb der Service-Datei, die sich auf die Datenbank und das Pruning beziehen:


{% codeHelper {copy: true} %}

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

{% endcodeHelper %}


Verwenden Sie `Strg + S` und dann `Strg + X`, um die Service-Datei zu speichern und zu verlassen.

7. Jetzt müssen Sie Ihren Daemon neu laden.

{% codeHelper {copy: true} %}

```shell
systemctl daemon-reload
```

{% endcodeHelper %}


8. Zu diesem Zeitpunkt sollte in Ihrer anderen Sitzung hoffentlich die neue Db heruntergeladen worden sein. Entpacken Sie die Datei:

{% codeHelper {copy: true} %}

```shell
tar -xvzf ksm_pruned.tar.gz
```

{% endcodeHelper %}


9. Nach Abschluss des Entpackens führen Sie Folgendes aus:

{% codeHelper {copy: true} %}

```shell
chown -R robonomics:robonomics paritydb
```

{% endcodeHelper %}

10. Jetzt können Sie den Dienst starten, ihn auf Fehler überwachen und überprüfen, ob er sowohl mit der Relay Chain als auch mit der Parachain verbunden ist:

{% codeHelper {copy: true} %}

```shell
systemctl start robonomics && journalctl -fu robonomics
```

{% endcodeHelper %}