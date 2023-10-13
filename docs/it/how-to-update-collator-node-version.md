---
title: Come aggiornare la versione del nodo collatore Robonomics

contributors: [Leemo94]
---

Si consiglia di leggere i seguenti articoli prima di leggere questo post: ["Come costruire un nodo collatore"](/docs/how-to-build-collator-node) e ["Come avviare il collatore Robonomics"](/docs/how-to-launch-the-robonomics-collator).

Questo articolo contiene i comandi necessari per aggiornare un nodo collatore Robonomics (in esecuzione su Ubuntu) e fornisce anche un esempio successivo.

## **Comandi richiesti**

0. Prima di iniziare, si consiglia di accedere come `root`, se non lo si è, allora si consiglia di utilizzare:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Arrestare il servizio Robonomics:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Rimuovere la versione precedente di Robonomics (assicurarsi di essere nella directory corretta):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Ottenere la [versione più recente](https://github.com/airalab/robonomics/releases) di Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Estrarre il file:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Spostare il file:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

È necessario spostare questo file nella directory corretta in cui è stato installato il nodo Robonomics)

</robo-wiki-note>

6. Avviare Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Esempio per l'aggiornamento del nodo collatore a Robonomics v1.8.4:

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

## **Modifica del database della catena di rilancio Kusama senza impostare un percorso di base**

Ci sono momenti in cui determinati snapshot della catena di rilancio Kusama causano errori al tuo nodo. Questo spesso provoca l'arresto del nodo. Esempio di errore causato da un database della catena di rilancio corrotto:

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

Per risolvere questo errore, è necessario rimuovere il database esistente della catena di rilancio Kusama (probabilmente RocksDb) e sostituirlo con un altro Db come ParityDb. Eseguire i seguenti comandi:

1. Trova la directory del nodo Robonomics e controlla i file:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Conferma di vedere la directory polkadot e quindi passa alla directory chains:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Elimina la directory "ksmcc3":

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Crea una nuova directory `ksmcc3`.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Ora è necessario scaricare un nuovo snapshot. Questo esempio utilizza uno snapshot della catena di rilancio fortemente potato, ma è possibile sostituirlo con qualsiasi snapshot preferito.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Mentre lo snapshot viene scaricato, apri una nuova sessione e modifica il tuo file di servizio:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Modifica le righe all'interno del file di servizio che si riferiscono al database e alla potatura:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Utilizza `Ctrl + S` e poi `Ctrl + X` per salvare ed uscire dal file di servizio.

7. Ora è necessario ricaricare il tuo demone.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. A questo punto, nella tua altra sessione, sperabilmente il nuovo Db è stato scaricato, quindi estrai il file:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. Dopo il completamento dell'estrazione, eseguire quanto segue:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Ora è possibile avviare il servizio, monitorarlo per eventuali errori e verificare che sia in collegamento sia con la catena di rilancio che con la parachain.


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>