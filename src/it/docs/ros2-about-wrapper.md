---
title: Informazioni su Robonomics ROS 2 Wrapper
contributors: [Fingerling42]
strumenti:   
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**In questo articolo, imparerai a conoscere il pacchetto Robonomics ROS 2 Wrapper, che ti consente di utilizzare tutte le funzionalità della parachain Robonomics per qualsiasi robot compatibile con ROS 2.**

L'idea del pacchetto è quella di avvolgere l'API della parachain Robonomics fornita da [robonomics-interface](https://github.com/airalab/robonomics-interface) in nodi di ROS 2. L'obiettivo è fornire ai developer di ROS 2 un modo comodo per integrare i loro robot o dispositivi con le funzionalità della parachain. La logica dietro l'integrazione di un dispositivo robotico è che viene creato un indirizzo univoco per esso nella parachain Robonomics, che viene utilizzato per controllare il dispositivo o ricevere la sua telemetria.

Le funzionalità disponibili includono:

* **Funzione di lancio** — avviare un dispositivo per eseguire qualsiasi comando con un insieme specifico di parametri passati come stringa o file.
* **Funzione di registrazione dati** — pubblicazione dei dati del dispositivotelemetria in forma di hash alla parachain.
* **Utilizzo dell'abbonamento a Robonomics** — la capacità di inviare transazioni senza commissioni.
* **Archiviazione sicura dei file** — per comprimere e decomprimere i dati, viene utilizzato [InterPlanetary File System](https://ipfs.tech/), che consente di accedere ai file tramite il loro hash univoco. Per un utilizzo comodo di IPFS, è inclusa il supporto di [Pinata](https://www.pinata.cloud/), che consente di fissare i file IPFS per un download veloce.
* **Crittografia e decrittografia dei file** — protezione dei file con crittografia a chiave pubblica.

Attualmente, il wrapper è disponibile nell'[implementazione Python](https://github.com/airalab/robonomics-ros2/).

## Architettura del Wrapper

Dal punto di vista architetturale, il wrapper è composto da un nodo lavoratore (con i topic e i servizi necessari) e una classe di base del nodo che può essere utilizzata per i vostri robot specifici.

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"Architettura del Wrapper ROS 2"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — un nodo unico per ogni robot che funge da punto di ingresso a Web3. Avvolge i servizi per l'invio di datalog e la ricezione di lanci tramite Robonomics e consente di scaricare/caricare file su IPFS. Questo nodo è configurato da un file speciale, che viene descritto di seguito. L'affiliazione di un nodo a un robot specifico può esserespecificato tramite lo spazio dei nomi ROS.
* `robonomics_ros2_robot_handler` — un nodo specifico del robot basato su una classe di base `basic_robonomics_handler` per coordinare pubsub e il robot. Elabora i lanci e decide quando inviare i datalog per controllare il robot.

## Installazione dell'incapsulamento

Per lavorare con l'incapsulamento è necessario il seguente software:

* Distribuzione del sistema operativo Linux (di solito, Ubuntu)
* Distribuzione ROS 2
* Nodo IPFS
* Python 3 (per l'implementazione in Python dell'incapsulamento)

Si prega di seguire la guida all'installazione disponibile [qui](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started) e controllare le versioni necessarie del software. Dopo aver scaricato i componenti richiesti, sarà necessario [compilare](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#installation-and-building) l'incapsulamento come un normale pacchetto ROS 2 utilizzando l'utilità `colcon`.

## Configurazione delle connessioni al cloud Web3

Prima di avviare l'incapsulamento, è necessario configurare come esattamente il tuo robot si collegherà al cloud decentralizzato di Robonomics e ai servizi Web3 di supporto. Per fare ciò, è necessario modificare il file di configurazione chiamato `robonomics_pubsub_params_template.yaml`, che deve essere univoco per ogni robot avviato che ha bisogno di accedere a Robonomics.

Il file contiene i seguenti campi di configurazione:

| Campo                 | Descrizione                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Seme dell'account della parachain di Robonomics                                                            |
| crypto_type           | Tipo del tuo account, `ED25519` o `SR25519`                                                               |
| remote_node_url       | URL del nodo Robonomics, di default è `wss://kusama.rpc.robonomics.network`, per il nodo locale `ws://127.0.0.1:9944`|
| rws_owner_address     | Un indirizzo del proprietario della sottoscrizione Robonomics da utilizzare per il modulo RWS             |
| ipfs_dir_path         | Un percorso della directory in cui contenere i file IPFS                                                 |
| ipfs_gateway          | Gateway IPFS per scaricare i file, ad es. `https://ipfs.io`                                               |
| pinata_api_key        | Chiave API da [Pinata](https://www.pinata.cloud/) servizio di pinning per IPFS                           |
| pinata_api_secret_key | Chiave API segreta da [Pinata](https://www.pinata.cloud/) servizio di pinning per IPFS                   |

Per creare un account sulla parachain di Robonomics, utilizza [la seguente guida](https://wiki.robonomics.network/docs/create-account-in-dapp/) sul nostro wiki. Presta attenzione al tipo di account che crei, poiché gli account con tipo SR25519 non possono utilizzare la crittografia dei file.

{% roboWikiNote {type: "warning", title: "Attenzione"}%}

  La frase seed è un'informazione sensibile che consente a chiunque diUsa il tuo account. Assicurati di non caricare un file di configurazione su GitHub o in qualsiasi altro posto.
{% endroboWikiNote %}

Presta attenzione al campo `remote_node_url`, poiché ti consente di scegliere come connetterti esattamente alla parachain di Robonomics, anche localmente. Puoi distribuire la tua istanza locale di Robonomics per test e sviluppo. Le istruzioni su come fare ciò sono disponibili in [questo articolo](https://wiki.robonomics.network/docs/run-dev-node/) sul nostro wiki.

Se hai un abbonamento a Robonomics che ti consente di inviare transazioni senza commissioni, inserisci l'indirizzo del proprietario dell'abbonamento nel campo `rws_owner_address`. Non dimenticare che il tuo account deve essere aggiunto al tuo abbonamento. Le istruzioni su come attivare il tuo abbonamento a Robonomics sono disponibili in due guide: tramite [Robonomics dapp](https://wiki.robonomics.network/docs/sub-activate/) con un'interfaccia utente amichevole o tramite [portale Robonomics Substrate](https://wiki.robonomics.network/docs/get-subscription/).

Il parametro `ipfs_gateway` ti consente di specificare il gateway attraverso il quale verranno scaricati i file IPFS. Questi possono essere sia [gateway pubblici](https://ipfs.github.io/public-gateway-checker/) che privati specializzati (ad esempio, quelli ottenuti su Pinata)