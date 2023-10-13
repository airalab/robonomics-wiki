---
title: Come lanciare il collatore Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  Nello screencast e negli screenshot di questo articolo, abbiamo utilizzato la versione 1.4.0 di Robonomics. È necessario utilizzare gli stessi comandi, ma sostituire la versione di Robonomics con quella attuale.
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

Attualmente la rete Robonomics è principalmente mantenuta dagli sviluppatori iniziali, ma chiunque può supportare il progetto. Ogni nodo completo aggiuntivo della blockchain aiuta a renderla più sostenibile e tollerante agli errori. I binari del nodo Robonomics sono disponibili in [release](https://github.com/airalab/robonomics/releases) o possono essere [costruiti da zero](/docs/how-to-build-collator-node/).

## Cos'è un collator

Un Collator fa parte della parachain Robonomics. Questo tipo di nodo crea nuovi blocchi per la catena Robonomics.

>I collator mantengono le parachain raccogliendo le transazioni delle parachain dagli utenti e producendo prove di transizione di stato per i validatori della Relay Chain. In altre parole, i collator mantengono le parachain aggregando le transazioni delle parachain in candidati di blocco delle parachain e producendo prove di transizione di stato per i validatori basate su quei blocchi.

Puoi saperne di più sui collator nella relativa [pagina wiki di Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Nella paracatena Robonomics ogni raccoglitore riceve ricompense di (**0.001598184 XRT**) per ogni blocco costruito dal raccoglitore (le ricompense si verificano quando i blocchi sono sigillati alla catena).
Inoltre, il collator che costruisce il blocco riceve **il 50% delle commissioni di transazione** contenute nel blocco che creano.

## Requisiti

Si consiglia di lanciare un collator utilizzando i **requisiti hardware standard** per i [validatori Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ Compatibile con x86-64.
+ Intel Ice Lake o successivo (serie Xeon o Core); AMD Zen3 o successivo (EPYC o Ryzen).
+ 4 core fisici @ 3.4GHz.
+ Multithreading simultaneo disabilitato (Hyper-Threading su Intel, SMT su AMD).
+ Archiviazione: un SSD NVMe da 1 TB (in quanto dovrebbe avere una dimensione ragionevole per gestire la crescita della blockchain).
+ Memoria: 32 GB DDR4 ECC


In questo articolo utilizziamo le seguenti specifiche:
+ 4 vCPU
+ 700 GB di spazio NVMe per i database del collator. È necessaria la possibilità di espandere questo spazio su disco.
+ 8 GB di RAM


## Informazioni importanti
1. Utilizziamo alcune variabili in queste istruzioni e dovrai sostituire i valori con i tuoi in tutti i comandi:
    + **%NODE_NAME%** è il nome del nodo. Esempio: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** è il percorso del volume montato. Esempio: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** è l'indirizzo dell'account nell'ecosistema Polkadot nel formato SS58. Esempio: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Nota che è necessario includere *--state-cache-size=0* nel lancio del servizio del collator. Questo parametro è importante per la stabilità del collator.
Puoi vedere ulteriori informazioni nella relativa [issue](https://github.com/airalab/robonomics/issues/234) su github.

## Per la prima volta, lancia facilmente un collator Robonomics

Puoi lanciare facilmente un collator direttamente dalla riga di comando per verificare gli errori.
Dopo aver fatto ciò, è vivamente consigliato lanciare il collator Robonomics come servizio (vedi il passaggio successivo).

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


## Lancia il collator Robonomics come servizio

1. Crea l'utente per il servizio con la directory home
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Scarica, estrai e sposta il binario Robonomics nella directory */usr/local/bin/*. Dovrai sostituire *$ROBONOMICS_VERSION* con la versione corrente di Robonomics nei comandi di questa sezione. Puoi trovare la versione corrente nella [pagina delle versioni del repository Robonomics su github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


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

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Salva questo file, quindi abilita e avvia il servizio:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

URL di telemetria: https://telemetry.parachain.robonomics.network/#/Robonomics

I registri dei raccoglitori possono essere monitorati con: `journalctl -u robonomics.service -f`

Una volta avviato, il raccoglitore Robonomics inizierà a sincronizzarsi con la Kusama Relay Chain, ciò può richiedere molto tempo, a seconda della velocità della rete e delle specifiche del sistema, quindi ti consigliamo di scaricare uno snapshot di Kusama.


## Accelerare il processo di sincronizzazione utilizzando uno snapshot di Kusama

Consigliamo di fare ciò immediatamente dopo aver creato e avviato il servizio Robonomics. Puoi trovare ulteriori informazioni sugli snapshot e le istruzioni per l'uso nella seguente pagina: https://ksm-rocksdb.polkashots.io/

Istruzioni:

1. Arresta il servizio Robonomics e rimuovi la directory del database Kusama corrente:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Scarica lo snapshot attuale ed estrailo:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    È possibile rimuovere l'archivio scaricato dopo aver decompresso con successo:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Imposta la proprietà corretta per la cartella del database:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Avvia nuovamente il servizio Robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Verifica i log del servizio:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```    
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## Risoluzione dei problemi
### Errore: "State Database error: Too many sibling blocks inserted"
Per correggere questo errore puoi semplicemente avviare il raccoglitore in modalità archivio:

1) Prima di tutto, è necessario arrestare il servizio Robonomics: 
    
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

3) Ricarica la configurazione del gestore di sistema systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Rimuovi il database parachain esistente:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Avvia il servizio robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Dopo di ciò è necessario attendere la sincronizzazione del database parahain.

### Errore: ""cannot create module: compilation settings are not compatible with the native host"
Questo errore è correlato ai parametri di virtualizzazione. È necessario utilizzare il tipo "host-model" del processore emulato. È possibile impostarlo sull'host di virtualizzazione.

Tuttavia, se si riscontra questo errore su qualsiasi hosting, è necessario chiedere supporto tecnico solo per questo problema.
