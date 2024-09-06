---
title: Come Aggiornare la Versione del Nodo Collator di Robonomics

contributors: [Leemo94]
---

Si consiglia di leggere i seguenti articoli prima di leggere questo post: ["Come Costruire un Nodo Collator"](/docs/how-to-build-collator-node) e ["Come Avviare il Collator di Robonomics"](/docs/how-to-launch-the-robonomics-collator).

Questo articolo contiene i comandi necessari per aggiornare un nodo collator di Robonomics (in esecuzione su Ubuntu), e fornisce anche un esempio successivamente.

## **Comandi Necessari**

0. Prima di iniziare, si consiglia di essere loggati come `root`, altrimenti si consiglia di utilizzare:


{% codeHelper { copy: true} %}

```shell
sudo su -
```

{% endcodeHelper %}

1. Arrestare il servizio di Robonomics:

{% codeHelper { copy: true} %}

```shell
systemctl stop robonomics.service
```

{% endcodeHelper %}


2. Rimuovere la versione precedente di Robonomics (assicurarsi di essere nella directory corretta):

{% codeHelper { copy: true} %}

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

{% endcodeHelper %}

3. Ottenere l'[ultima versione rilasciata](https://github.com/airalab/robonomics/releases) di Robonomics:


{% codeHelper { copy: true}%}

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

{% endcodeHelper %}


4. Estrarre il file:

{% codeHelper { copy: true}%}

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

{% endcodeHelper %}


5. Spostare il file:

{% codeHelper { copy: true}%}

```shell
mv robonomics /usr/local/bin/
```

{% endcodeHelper %}

{% roboWikiNote {type: "note"}%} È necessario spostare questo file nella directory corretta in cui è stato installato il nodo Robonomics {% endroboWikiNote %}

6. Avviare Robonomics:

{% codeHelper { copy: true}%}

```shell
systemctl start robonomics.service
```

{% endcodeHelper %}

Esempio per l'aggiornamento del nodo collator a Robonomics v1.8.4:

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


## **Cambiare il Database della Catena di Rilievo Kusama senza Impostare un Percorso di Base**

Ci sono momenti in cui certi snapshot della Catena di Rilievo Kusama causano errori al tuo nodo. Questo spesso porta al blocco del nodo. Esempio di errore causato da un database della Catena di Rilievo corrotto:


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


Per risolvere questo errore, è necessario rimuovere il database esistente della Catena di Rilievo Kusama (probabilmente RocksDb) e sostituirlo con un altro Db come ParityDb. Eseguire i seguenti comandi:

1. Trovare la directory del nodo Robonomics e controllare i file:

{% codeHelper %}

```shell
cd /home/robonomics/
ls -a
```

{% endcodeHelper %}


2. Confermare di vedere la directory polkadot, e quindi navigare alla directory delle catene:


{% codeHelper %}

```shell
cd /polkadot/chains/
ls -a
```

{% endcodeHelper %}

3. Eliminare la directory `ksmcc3`:


{% codeHelper {copy: true} %}

```shell
rm -r ksmcc3
```

{% endcodeHelper %}


4. Creare una nuova directory `ksmcc3`.

{% codeHelper {copy: true} %}

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

{% endcodeHelper %}

5. Ora è necessario scaricare un nuovo snapshot. Questo esempio utilizza un snapshot della catena di rilievo fortemente potato, ma è possibile sostituirlo con qualsiasi snapshot preferito.


{% codeHelper {copy: true} %}

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

{% endcodeHelper %}

6. Mentre il snapshot si sta scaricando, aprire una nuova sessione e modificare il file di servizio:

{% codeHelper {copy: true} %}

```shell
sudo nano /etc/systemd/system/robonomics.service
```

{% endcodeHelper %}

Modificare le righe all'interno del file di servizio che si riferiscono al database e al potatura:


{% codeHelper {copy: true} %}

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

{% endcodeHelper %}


Usare `Ctrl + S` e poi `Ctrl + X` per salvare ed uscire dal file di servizio.

7. Ora è necessario ricaricare il tuo demone.

{% codeHelper {copy: true} %}

```shell
systemctl daemon-reload
```

{% endcodeHelper %}


8. A questo punto, nella tua altra sessione, sperabilmente il nuovo Db è stato scaricato, quindi estrarre il file:

{% codeHelper {copy: true} %}

```shell
tar -xvzf ksm_pruned.tar.gz
```

{% endcodeHelper %}


9. Dopo che l'estrazione è completata, eseguire quanto segue:

{% codeHelper {copy: true} %}

```shell
chown -R robonomics:robonomics paritydb
```

{% endcodeHelper %}

10. Ora puoi avviare il servizio, monitorarlo per eventuali errori e verificare che sia in fase di peer sia sulla catena di rilievo che sulla paracatena:

{% codeHelper {copy: true} %}

```shell
systemctl start robonomics && journalctl -fu robonomics
```

{% endcodeHelper %}