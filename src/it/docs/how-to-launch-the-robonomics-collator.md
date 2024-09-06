---
title: Come lanciare il collator Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"nota", type: "nota"}%} Nel video e negli screenshot di questo articolo, abbiamo utilizzato la versione 1.4.0 di Robonomics. È necessario utilizzare gli stessi comandi, ma sostituire la versione di Robonomics con quella attuale.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

Attualmente la rete Robonomics è principalmente mantenuta dagli sviluppatori iniziali, ma chiunque può supportare il progetto. Ogni nodo completo aggiuntivo della blockchain aiuta a renderla più sostenibile e tollerante ai guasti. I binari del nodo Robonomics sono disponibili negli [asset di rilascio](https://github.com/airalab/robonomics/releases) o possono essere [compilati da sorgente](/docs/how-to-build-collator-node/).

## Cos'è un collator

Un Collator fa parte della parachain di Robonomics. Questo tipo di nodo crea nuovi blocchi per la catena Robonomics.

>I Collator mantengono le parachain raccogliendo le transazioni delle parachain dagli utenti e producendo prove di transizione di stato per i validatori della Relay Chain. In altre parole, i collator mantengono le parachain aggregando le transazioni delle parachain in candidati blocchi delle parachain e producendo prove di transizione di stato per i validatori basati su quei blocchi.

Puoi saperne di più sui collator nella relativa [pagina wiki di Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Nella parachain di Robonomics ogni collator riceve ricompense di (**0.001598184 XRT**) per ogni blocco che il collator costruisce (le ricompense avvengono quando i blocchi vengono sigillati alla catena).
Inoltre, il collator che costruisce il blocco riceve il **50% delle commissioni di transazione** contenute nel blocco che creano.

## Requisiti

Si consiglia di lanciare un collator utilizzando i **requisiti hardware standard** per i [validator di Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ Compatibile con x86-64.
+ Intel Ice Lake, o più recente (serie Xeon o Core); AMD Zen3, o più recente (EPYC o Ryzen).
+ 4 core fisici @ 3.4GHz.
+ Multithreading simultaneo disabilitato (Hyper-Threading su Intel, SMT su AMD).
+ Archiviazione - Un SSD NVMe da 1 TB (Dovrebbe essere dimensionato in modo ragionevole per gestire la crescita della blockchain).
+ Memoria - 32 GB DDR4 ECC


In questo articolo utilizziamo le seguenti specifiche:
+ 4 vCPU
+ 700 GB di spazio NVMe per i database del collator. È richiesta la possibilità di espandere questo spazio disco.
+ 8GB di RAM


## Informazioni importanti
1. Utilizziamo alcune variabili in queste istruzioni e dovrai sostituire i valori con i tuoi in tutti i comandi:
    + **%NODE_NAME%** è il nome del nodo. Esempio: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** è il percorso al volume montato. Esempio: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** è l'indirizzo dell'account nell'ecosistema Polkadot nel formato SS58. Esempio: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Nota che è necessario includere *--state-cache-size=0* nel lancio del servizio del collator. Questo parametro è importante per la stabilità del collator.
Puoi trovare ulteriori informazioni nella relativa [issue](https://github.com/airalab/robonomics/issues/234) su github.

## Lanciare facilmente un collator Robonomics per la prima volta

Puoi facilmente lanciare un collator direttamente dalla riga di comando per controllare gli errori.
Dopo averlo fatto, è fortemente consigliato lanciare il collator Robonomics come servizio (guarda il prossimo passaggio).

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


## Lanciare il collator Robonomics come servizio

1. Crea l'utente per il servizio con la directory home
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Scarica, estrai e sposta il binario Robonomics nella directory */usr/local/bin/*. Dovrai sostituire *$ROBONOMICS_VERSION* con la versione attuale di Robonomics nei comandi di questa sezione. Puoi trovare la versione attuale nella [pagina dei rilasci del repository Robonomics su github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Scarica il binario Robonomics 1.4.0"} %}{% endroboWikiPicture %}


3. Crea il file di servizio systemd chiamato *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    E aggiungi le seguenti righe nel file di servizio:
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

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Crea il file di servizio Robonomics"} %}{% endroboWikiPicture %}


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Salva questo file, quindi abilita e avvia il servizio:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

URL del telemetria: https://telemetry.parachain.robonomics.network/#/Robonomics

I log dei collator possono essere monitorati con: `journalctl -u robonomics.service -f`

Una volta lanciato il collator Robonomics, inizierà a sincronizzarsi con la Kusama Relay Chain, il che può richiedere un tempo considerevole, a seconda della velocità della tua rete e delle specifiche del sistema, quindi ti consigliamo di scaricare uno snapshot di Kusama.


## Accelerare il processo di sincronizzazione utilizzando uno snapshot di Kusama

Ti consigliamo di fare questo immediatamente dopo aver creato e avviato il servizio Robonomics. Puoi trovare ulteriori informazioni sugli snapshot e le istruzioni sull'uso nella seguente pagina: https://ksm-rocksdb.polkashots.io/

Istruzioni:

1. Interrompi il servizio Robonomics e rimuovi la directory del database Kusama attuale:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Scarica lo snapshot attuale ed estrailo:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# tar -xvf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Scarica lo snapshot di Kusama"} %}{% endroboWikiPicture %}

    Puoi rimuovere l'archivio scaricato dopo averlo estratto con successo:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Impostare la corretta proprietà della cartella del database:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Avvia nuovamente il servizio Robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Controlla i log del servizio:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Controlla i log del servizio"} %}{% endroboWikiPicture %}

## Risoluzione dei problemi
### Errore: "Errore del database di stato: Troppi blocchi fratelli inseriti"
Per risolvere questo errore, è sufficiente avviare il tuo collator in modalità archivio:

1) Prima di tutto, è necessario fermare il servizio Robonomics:
    
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service

2) Quindi aggiungi il parametro `--state-pruning=archive` alla parte parachain del file di servizio. Esempio del file di servizio modificato:
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

3) Ricarica la configurazione del gestore di sistema:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Rimuovi il database della parachain esistente:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Avvia il servizio robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Dopo questo, è necessario attendere la sincronizzazione del database della parachain.

### Errore: "impossibile creare il modulo: le impostazioni di compilazione non sono compatibili con l'host nativo"
Questo errore è correlato ai parametri di virtualizzazione. È necessario utilizzare il tipo "host-model" del processore emulato. Puoi impostarlo sull'host di virtualizzazione.

Tuttavia, se riscontri questo errore su qualsiasi hosting, è necessario chiedere supporto tecnico solo per questo problema.