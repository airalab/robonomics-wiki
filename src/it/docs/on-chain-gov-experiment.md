---
title: Esperimento di governo on-chain

---

Attualmente, Polkadot è uno dei più grandi DAO al mondo! Ci sono molti eventi interessanti che si svolgono nell'ecosistema come parte dell'esperimento di governance on-chain. Gli sviluppatori di Robonomics suggeriscono ai partecipanti all'hackathon di aumentare il livello di coinvolgimento della comunità di Polkadot integrando eventi legati al voto, nuove richieste di tesoreria, cambi di epoca e molto altro, in un tipico sistema smart home.

---

Questo articolo discute la gestione della smart home attraverso il Robonomics Cloud come risultato di qualsiasi evento nell'ecosistema di Polkadot. Ecco un esempio di come una lampada possa essere accesa quando viene presentato un nuovo referendum nella rete di Polkadot.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Requisiti

 - Istanza di Home Assistant installata con integrazione Robonomics. I metodi di installazione possono essere trovati [qui](/docs/install-smart-home).
 - Nodo Polkadot o gateway per l'interazione. Ad esempio - `wss://polkadot.api.onfinality.io`
 - Nodo o gateway Robonomics per l'interazione.
 - Account creato in formato ED25519. Le informazioni possono essere trovate [qui](/docs/sub-activate).
 - Aver creato un account in un elenco di dispositivi della sottoscrizione Robonomics. Per saperne di più [qui](/docs/add-user).
 - Indirizzi del proprietario e del controller della sottoscrizione.

Librerie Python:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Creazione di un Ascoltatore Polkadot

Innanzitutto, è necessario creare uno script che ascolterà i nuovi eventi nella rete Polkadot. Nell'esempio, tracceremo la creazione di nuovi Referendum.

Per comodità di test, è stato utilizzato un nodo Polkadot locale in modalità dev. Puoi trovare il manuale di distribuzione [qui](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

Per connettersi a un nodo pubblico, cambiare il "POLKAD"La variabile "POLKADOT_GATEWAY".

Codice di esempio:


{% codeHelper {copy: true}%}

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Inizio conteggio Referendum:', data.value)
    if update_nr > 0:
        print('Aumento conteggio Referendum:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

Questo script ascolterà i cambiamenti nel numero del referendum attuale e visualizzerà il numero dell'ultimo referendum.

### Test

Esegui il programma e apri [polkadot.js](https://polkadot.js.org/apps/#/explorer).
Per passare al nodo di sviluppo locale, fai clic sull'icona nell'angolo in alto a sinistra e comparirà un menu laterale. Seleziona "Sviluppo" e "Nodo Locale" in basso, quindi fai clic su "Cambia".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

Passerai al nodo locale. Vai alla scheda "Governance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

Crea una nuova preimmagine. Lascia un commento nella rete. Firmalo e invialo alla rete.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

Riceverai il suo hash. Copialo e vai alla scheda "Governance" -> "Referenda". Fai "Invia Proposta". Poiché si tratta di una rete di test, la maggior parte dei campi configurabili può essere lasciata come predefinita. Incolla l'hash della preimmagine e firma la proposta.


{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

Dopo averlo inviato alla rete, il programma rileverà la nuova proposta e produrrà i seguenti log:

```
Inizio conteggio Referendum: 0
Aumento conteggio Referendum: 1## Collegamento alla Casa Intelligente

Ora dobbiamo aggiungere un'interazione con la casa intelligente dopo aver creato una nuova proposta.

Per fare ciò, dobbiamo conoscere quanto segue:
- Dominio del servizio
- Nome del servizio
- Entità di destinazione
- Dati - dovrebbero essere di tipo "dict"

Vediamo dove trovarli. Apri l'istanza di Home Assistant installata. Vai su "Strumenti per sviluppatori -> Servizi", seleziona un qualsiasi servizio e passa alla modalità YAML. Consideriamo l'esempio di uno switch.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"servizi"} %}{% endroboWikiPicture %}

La chiave "service" contiene il dominio e il nome del servizio. Tutto ciò che precede il punto è il dominio, e tutto ciò che segue il punto è il nome del servizio. Anche il campo dati è necessario.

Per trovare l'entità di destinazione, vai su "Impostazioni -> Dispositivi e Servizi -> Entità". Ci sarà una colonna con "ID entità" - questo è il parametro entità di destinazione richiesto.

Ora che conosciamo tutti i parametri, vediamo cosa succederà nello script.

Lo script si collegherà al demone IPFS locale. (Se hai seguito le istruzioni di configurazione della casa intelligente, hai già il demone IPFS in esecuzione.)

Innanzitutto, formeremo un comando in formato JSON. Successivamente, il messaggio viene crittografato con le chiavi dell'utente e del controller.
Poi il comando crittografato viene salvato su un file e aggiunto a IPFS. Dopo di che, l'hash IPFS risultante viene inviato alla parachain Robonomics tramite un estrinseco `Launch` all'indirizzo del controller.
Quando il controller riceve il lancio, scaricherà il file da IPFS, lo decrittograferà e chiamerà il servizio specificato all'interno.

Il codice completo è il seguente:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# parte polkadot
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# parte Robonomics

# Credenziali Robonomics
# L'indirizzo dell'utente deve essere inDispositivi RWS
# L'indirizzo dell'utente deve essere ED25519
user_seed = "<FRASE_SEMILLA>"
controller_address = "<INDIRIZZO_CONTROLLER>"
sub_owner_address = "<INDIRIZZO_PROPRIETARIO>"

# Comando
service_domain = "<DOMINIO>"  # il dominio è ciò che si trova prima del punto nel nome del servizio. Ad esempio "switch"
service_name = "<NOME>"  # nome - ciò che viene dopo il punto nel nome del servizio. Ad esempio "turn_on"
target_entity = "<ID_ENTITÀ>"  # id_entità. Ad esempio "switch.boiler"
data = {}  # Deve essere un dizionario


def gestore_sottoscrizioni(data, numero_aggiornamento, id_sottoscrizione):
    if numero_aggiornamento == 0:
        print('Inizio conteggio Referendum:', data.value)

    if numero_aggiornamento > 0:
        print('Aumento conteggio Referendum:', data.value)
        # Invia il lancio all'indirizzo del controller con l'hash ipfs
        lancio = Lancio(mittente, rws_sub_owner=sub_owner_address)
        res = lancio.lancio(controller_address, risultato_ipfs)
        print(f"Risultato transazione: {res}")

def crittografa_messaggio(
        messaggio, coppia_chiavi_mittente: CoppiaChiavi, chiave_pubblica_destinatario: bytes
) -> str:
    """
    Crittografa il messaggio con la chiave privata del mittente e la chiave pubblica del destinatario
    :param messaggio: Messaggio da crittografare
    :param coppia_chiavi_mittente: Coppia di chiavi dell'account mittente
    :param chiave_pubblica_destinatario: Chiave pubblica del destinatario
    :return: messaggio crittografato
    """
    crittografato = coppia_chiavi_mittente.crittografa_messaggio(messaggio, chiave_pubblica_destinatario)
    return f"0x{crittografato.hex()}"

# Formatta il messaggio da lanciare
data['id_entità'] = target_entity
comando = {'piattaforma': service_domain, 'nome': service_name, 'parametri': data}

messaggio = json.dumps(comando)
print(f"Messaggio: {messaggio}")
mittente = Account(user_seed, tipo_crypto=CoppiaChiaviTipo.ED25519)

# Crittografa il comando
destinatario = CoppiaChiavi(
    indirizzo_ss58=controller_address, tipo_crypto=CoppiaChiaviTipo.ED25519
)
messaggio = crittografa_messaggio(messaggio, mittente.coppia_chiavi, destinatario.chiave_pubblica)
print(f"Messaggio crittografato: {messaggio}")
nome_file = "file_temporaneo"
with open(nome_file, "w") as f:
    f.write(messaggio)
with ipfshttpclient2.connect() as client:
    risultato = client.add(nome_file, pin=False)```python
result_ipfs  = result["Hash"]
    print(f"IPFS hash: {result_ipfs}")
    print(f"IPFS hash for launch {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

se hai fatto tutto correttamente, vedrai i seguenti log:
```
Messaggio: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
Messaggio crittografato: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
IPFS hash: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
IPFS hash for launch 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Conteggio Referendum inizia: 0
Conteggio Referendum aumentato: 1
Risultato transazione: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```