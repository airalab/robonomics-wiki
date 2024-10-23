---
title: Lanciare Robot da Cloud
contributors: [Fingerling42]
strumenti:   
  - Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**In questo articolo imparerai come utilizzare la funzione di lancio di Robonomics in ROS 2 attraverso vari esempi**

La caratteristica chiave del parachain di Robonomics per l'invio di comandi ai dispositivi è l'estrinseco di lancio. Questa funzione ti consente di inviare una stringa contenente un parametro (sotto forma di valore esadecimale lungo 32 byte) a un indirizzo specifico all'interno del parachain. Tipicamente, la stringa rappresenta un hash IPFS che punta a un file con i parametri necessari per eseguire il comando. Puoi trovare ulteriori dettagli sulla funzione di lancio [in questo articolo](https://wiki.robonomics.network/docs/launch/).

Nel Robonomics ROS 2 Wrapper, la funzione di lancio è implementata come un servizio per l'invio di comandi e come un topic per ricevere comandi.

## Invio del Lancio

Il servizio, chiamato `robonomics/send_launch`, appare come segue:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # Solo stringa di parametro o nome file con parametri da caricare su IPFS
string  target_address          # Indirizzo da attivare con il lancio
bool    is_file         True    # È un parametro di lancioun file che deve essere caricato su IPFS (impostazione predefinita è True)?
bool    encrypt_status  True    # Verifica se il file parametro deve essere crittografato con l'indirizzo di destinazione, impostazione predefinita è True
---
string  launch_hash             # Hash della transazione di lancio
```

{% endcodeHelper %}

Il servizio accetta i seguenti parametri come parte della richiesta: un parametro di comando (sia una stringa semplice che il nome di un file contenente i parametri del comando), l'indirizzo di destinazione nella parachain Robonomics per l'invio del lancio e due flag: uno che indica se il parametro è un file e l'altro che specifica se il file dovrebbe essere crittografato (entrambi impostati su true per impostazione predefinita). Il file verrà caricato su IPFS e il suo hash verrà passato come parametro di lancio. Pertanto, il file deve essere posizionato nella directory designata per i file IPFS, come specificato nel file di configurazione per il nodo `robonomics_ros2_pubsub`.

Per impostazione predefinita, il file viene crittografato utilizzando l'indirizzo pubblico del destinatario del lancio. Il metodo di crittografia applicato è la crittografia a chiave pubblica basata sulla crittografia ellittica della curva Curve25519. Nell'implementazione attuale, la crittografia è supportata solo per gli indirizzi degli account di tipo ED25519 (Edwards) (puoi leggere di più su questo in [questo articolo](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

Dopo aver inviato il lancio, il servizio restituisce l'hash della transazione.

## Ricezione del Lancio

RicezioneIl lancio è organizzato sotto forma di argomento corrispondente. Tecnicamente, il nodo utilizza la funzionalità dell'interfaccia robonomics per iscriversi allo stato del proprio indirizzo e attende che l'evento `NewLaunch` appaia. Una volta verificatosi l'evento, il nodo pubblica un messaggio sull'argomento `robonomics/received_launch`. Il formato del messaggio è il seguente:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # Indirizzo dell'account che ha inviato il comando di lancio
string  param                   # Stringa con parametro o nome del file con i parametri
```

{% endcodeHelper %}

I campi del messaggio contengono l'indirizzo da cui è stato inviato il lancio e il parametro stesso: o una semplice stringa o il nome del file con i parametri che è stato scaricato da IPFS e posizionato nella directory di lavoro di IPFS. Se il file era criptato, viene decifrato durante questo processo.


## Esempio con Turtlesim

Successivamente, mostreremo come utilizzare la funzione di lancio con [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) come esempio. Turtlesim è un simulatore leggero progettato per apprendere ROS 2. Puoi installarlo utilizzando il seguente comando:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

Il pacchetto Robonomics ROS 2 Wrapper include un pacchetto pre-costruito chiamato `turtlesim_robonomics`, appositamente adattato per Turtlesim. Questo pacchetto ti consente di testare tutte le funzionalità del wrapper. Proviamolo e facciamolo girare.

{% roboWikiNote {type: "warning", title: "Attenzione"}%}

  Assicurati di avere un saldo sufficiente nel tuo account o una sottoscrizione attiva per effettuare transazioni.

{% endroboWikiNote %}

1. Per iniziare, crea un file di configurazione per l'istanza pubsub di `turtlesim_robonomics` utilizzando il modello `config/robonomics_pubsub_params_template.yaml`. Compila i campi appropriati con le tue credenziali Robonomics (seed dell'account, tipo di crittografia, indirizzo del proprietario della sottoscrizione). Specifica anche una directory per i file IPFS. Una volta completato, rinomina il file, ad esempio, `first_pubsub_params.yaml`.

2. Avvia il demone IPFS:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. Esegui il seguente file di lancio ROS 2. Avvierà tutti i nodi necessari: Turtlesim stesso, l'implementazione del wrapper per Turtlesim e il Robonomics pubsub:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params
```.yaml namespace:='turtlesim1'
```

{% endcodeHelper %}

Vedrai il simulatore con la tartaruga, insieme ai log di ROS 2 nella console che mostrano l'ID IPFS, il percorso della directory con i file IPFS, l'indirizzo Robonomics e altre informazioni rilevanti.

### Avvia Turtlesim dal portale Polkadot

1. Turtlesim è controllato tramite il topic `/cmd_vel`, quindi è necessario preparare i messaggi corrispondenti e includerli in un file, che verrà utilizzato come parametro di avvio. Per comodità, questi messaggi sono preparati in un file JSON. Crea un file (ad esempio, `turtle_cmd_vel.json`) e incolla quanto segue:

  {% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
```    }
  ]
  ```

  {% endcodeHelper %}

  Questo esempio JSON comanderà alla tartaruga di muoversi due volte.

2. Successivamente, il file deve essere caricato su IPFS. Puoi scegliere qualsiasi metodo, ma per questo esempio utilizzeremo IPFS Kubo. Apri un terminale nella directory in cui si trova il file JSON e caricalo su IPFS:

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  Riceverai l'hash IPFS del file. Assicurati di salvarlo per un uso futuro.

3. Prima di inviare il lancio, l'hash IPFS deve essere convertito in una stringa lunga 32 byte. Questo può essere fatto utilizzando alcuni comandi Python. Apri un terminale, avvia l'interprete Python 3 e esegui i seguenti comandi:

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  Salva la stringa risultante per un uso futuro.

4. Apri il portale Robonomics [Polkadot/Substrate](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) e navigaVai alla scheda **Sviluppatori** -> **Estrinseci**. Seleziona l'estrinseco `launch` -> `launch(robot, param)`. Nel campo `robot`, inserisci l'indirizzo del tuo robot e nel campo `param`, inserisci la stringa con l'hash IPFS convertito. Invia la transazione.

5. Vai al simulatore Turtlesim. Dopo aver inviato con successo la transazione, la tartaruga dovrebbe iniziare a muoversi.

### Avvia Turtlesim dai Strumenti a Linea di Comando di ROS 2

1. Ora proviamo a inviare un lancio a Turtlesim da un altro nodo pubsub di ROS 2. Per prima cosa, crea un altro file di configurazione (ad esempio, `second_pubsub_params.yaml`) con credenziali Robonomics diverse e una directory IPFS separata.

2. In un terminale separato, esegui un nuovo nodo `robonomics_ros2_pubsub` utilizzando il nuovo file di configurazione:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. Posiziona il file JSON contenente i comandi per Turtlesim (`turtle_cmd_vel.json`) nella directory IPFS del nuovo pubsub.

4. Prima di inviare il lancio, impostiamo il monitoraggio per osservare come `turtlesim_robonomics` riceve. dati all'arrivo. Per farlo, in un terminale separato, iscriviti al topic corrispondente:

{% codeHelper { copy: true}%}

```shell
ros2 topic echo /turtlesim1/robonomics/received_launch
```

{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"} %}
Modifica predefinita, il gestore di lancio si aspetta un hash IPFS di un file come parametro. Se hai bisogno che il pubsub gestisca il parametro come una stringa regolare, devi modificare il parametro del nodo ROS 2 corrispondente `launch_is_ipfs` da `True` a `False`. Puoi farlo utilizzando il comando `ros2 param set`.
{% endroboWikiNote %}


5. Ora, dobbiamo chiamare il servizio ROS 2 per inviare il lancio. In un terminale separato, utilizza il seguente comando:

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'IL TUO INDIRIZZO TURTLESIM'"}
```

{% endcodeHelper %}

Vedrai i log del pubsub che mostrano i dettagli dell'invio del lancio.

6. Vai al simulatore Turtlesim. Dopo aver inviato con successo la transazione, la tartaruga dovrebbe iniziare.

### Avviare Turtlesim da un Altro Nodo

1. Ora, proviamo a creare un nodo di test che aspetterà che il lancio arrivi e poi lo inoltrerà a Turtlesim. Puoi utilizzare il pacchetto di test predefinito `test_robot_robonomics`. Copia questo pacchetto nel tuo spazio di lavoro ROS 2.

2. Apri il file del nodo situato in `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` in un qualsiasi editor di testo, e aggiungi il seguente codice dopo la funzione `__init__`:

  {% codeHelper { copy: true}%}

  ```python
  def launch_file_subscriber_callback(self, msg) -> None:
      super().launch_file_subscriber_callback(msg)

      transaction_hash = self.send_launch_request(self.param, target_address='INDIRIZZO_TURTLESIM', is_file=True, encrypt_status=True)

      self.get_logger().info('Inviato il lancio alla tartaruga con hash: %s ' % str(transaction_hash))
  ```

  {% endcodeHelper %}

  Questa funzione elaborerà prima il lancio ricevuto e poi utilizzerà il suo parametro per inviare un nuovo lancio a Turtlesim.

3. Costruisci il pacchetto utilizzando `colcon`, e poi sorgente i suoi file di configurazione.

4. Esegui il file di lancio ROS 2 del pacchetto di test con le credenziali pubsub del secondo:

  {% codeHelper { copy: true}%}
  
  ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```

  {% endcodeHelper %}

5. Ora, invia un lancio con i parametri `turtle_cmd_vel.json` all'indirizzo del nodo di test, ad esempio, tramite il portale Polkadot/Substrate. Prima di farlo, assicurati che Turtlesim sia ancora in esecuzione. Il nodo di test dovrebbe ricevere il lancio e quindi inviarne uno nuovo con gli stessi parametri, facendo in modo che la tartaruga in Turtlesim inizi a muoversi.