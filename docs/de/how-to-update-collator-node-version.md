---
title: Wie man die Robonomics Collator Node Version aktualisiert

contributors: [Leemo94]
---

Es wird empfohlen, vor dem Lesen dieses Beitrags die folgenden Artikel gelesen zu haben: ["Wie man Collator Node erstellt"](/docs/how-to-build-collator-node) & ["Wie man den Robonomics Collator startet"](/docs/how-to-launch-the-robonomics-collator).

Dieser Artikel enthält die Befehle, die zum Aktualisieren einer Robonomics Collator Node (unter Ubuntu) erforderlich sind, und gibt anschließend ein Beispiel.

## **Erforderliche Befehle**

0. Bevor Sie beginnen, wird empfohlen, dass Sie als `root` angemeldet sind. Wenn nicht, empfehle ich Ihnen, folgendes zu verwenden:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Stoppen Sie den Robonomics-Dienst:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Entfernen Sie die vorherige Version von Robonomics (stellen Sie sicher, dass Sie sich im richtigen Verzeichnis befinden):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Holen Sie sich die [neueste Version](https://github.com/airalab/robonomics/releases) von Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Extrahieren Sie die Datei:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Verschieben Sie die Datei:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

Sie müssen diese Datei in das richtige Verzeichnis verschieben, in dem Sie die Robonomics-Node installiert haben)

</robo-wiki-note>

6. Starten Sie Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Beispiel zum Aktualisieren der Collator Node auf Robonomics v1.8.4:

<code-helper>

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
</code-helper>

## **Ändern der Kusama Relay Chain-Datenbank ohne festgelegten Basispfad**

Es gibt Zeiten, in denen bestimmte Snapshots der Kusama Relay Chain dazu führen, dass Ihre Node Fehler aufweist. Dies führt oft dazu, dass Ihre Node nicht mehr funktioniert. Beispiel für einen Fehler, der durch eine beschädigte Relay Chain-Datenbank verursacht wird:

<code-helper>

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
</code-helper>

Um diesen Fehler zu beheben, sollten Sie Ihre vorhandene Kusama Relay Chain-Datenbank (wahrscheinlich RocksDb) entfernen und durch eine andere Db wie ParityDb ersetzen. Führen Sie die folgenden Befehle aus:

1. Finden Sie das Verzeichnis der Robonomics-Node und überprüfen Sie die Dateien:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Bestätigen Sie, dass Sie das polkadot-Verzeichnis sehen, und navigieren Sie dann zum chains-Verzeichnis:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Löschen Sie das Verzeichnis `ksmcc3`:

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Erstellen Sie ein neues `ksmcc3`-Verzeichnis.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Jetzt müssen Sie einen neuen Snapshot herunterladen. In diesem Beispiel wird ein stark beschnittener Relay Chain-Snapshot verwendet, aber Sie können ihn gegen einen beliebigen Snapshot austauschen, den Sie bevorzugen.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Während der Snapshot heruntergeladen wird, öffnen Sie eine neue Sitzung und bearbeiten Sie Ihre Service-Datei:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Ändern Sie Zeilen in der Service-Datei, die sich auf die Datenbank und das Beschneiden beziehen:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Verwenden Sie `Strg + S` und dann `Strg + X`, um die Service-Datei zu speichern und zu verlassen.

7. Jetzt müssen Sie Ihren Daemon neu laden.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. Zu diesem Zeitpunkt sollte in Ihrer anderen Sitzung hoffentlich die neue Db heruntergeladen worden sein, also extrahieren Sie die Datei:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. Nach Abschluss des Entpackens führen Sie Folgendes aus:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Jetzt können Sie den Dienst starten, ihn auf Fehler überwachen und überprüfen, ob er sowohl mit der Relay Chain als auch mit der Parachain verbunden ist:


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>