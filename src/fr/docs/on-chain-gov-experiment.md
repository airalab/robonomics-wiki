---
title: Оn-chain Government Experiment

---

Currently, Polkadot is one of the largest DAOs in the world! Many interesting events are happening in the ecosystem as part of the on-chain governance experiment. Robonomics developers propose that hackathon participants enhance the level of Polkadot community involvement by incorporating events related to voting, new treasury requests, epoch changes, and more, into a typical smart home system.

---

This article discusses smart home management through the Robonomics Cloud following any event in the Polkadot ecosystem. Here is an example of how a lamp can be turned on when a new referendum is submitted in the Polkadot network.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Requirements

 - Installed Home Assistant instance with Robonomics integration. Installation methods can be found [here](/docs/install-smart-home).
 - Polkadot node or gateway for interaction. For example - `wss://polkadot.api.onfinality.io`
 - Robonomics node or gateway for interaction.
 - Created account in ED25519 format. Information can be found [here](/docs/sub-activate).
 - Having created account in a device list of the Robonomics subscription. Learn more [here](/docs/add-user).
 - Subscription owner and controller addresses.

Python libraries:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Creating a Polkadot Listener

First, you need to create a script that will listen for new events in the Polkadot network. In the example, we will track the creation of new Referenda.

For testing convenience, a local Polkadot node in dev mode was used. You may find deployment [manual here](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

To connect to a public node, change the "POLKADLa variable "POLKADOT_GATEWAY".

Exemple de code :

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Début du décompte des référendums :', data.value)
    if update_nr > 0:
        print('Nombre de référendums augmenté :', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

Ce script écoutera les changements dans le numéro de référendum actuel et affichera le numéro du dernier référendum.

### Test

Exécutez le programme et ouvrez [polkadot.js](https://polkadot.js.org/apps/#/explorer).
Pour passer au nœud de développement local, cliquez sur l'icône dans le coin supérieur gauche, un menu latéral apparaîtra. Sélectionnez "Development" et "Local Node" en bas, puis cliquez sur "Switch".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

Vous passerez au nœud local. Allez dans l'onglet "Gouvernance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

Créez une nouvelle préimage. Laissez une remarque dans le réseau. Signez et envoyez-la au réseau.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

Vous recevrez son hachage. Copiez-le et allez dans l'onglet "Gouvernance" -> "Referenda". Faites "Soumettre une proposition". Comme il s'agit d'un réseau de test, la plupart des champs configurables peuvent être laissés par défaut. Collez le hachage de la préimage et signez la proposition.

{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

Après l'avoir envoyé au réseau, le programme détectera la nouvelle proposition et produira les journaux suivants :

```
Début du décompte des référendums : 0
Nombre de référendums augmenté : 1## Connexion à la maison intelligente

Maintenant, nous devons ajouter une interaction avec la maison intelligente après avoir créé une nouvelle proposition.

Pour cela, nous devons connaître les éléments suivants :
- Domaine de service
- Nom du service
- Entité cible
- Données - devraient être de type "dict"

Voyons où les trouver. Ouvrez l'instance de Home Assistant installée. Allez dans "Outils de développement -> Services", sélectionnez n'importe quel service et passez en mode YAML. Considérons l'exemple d'un interrupteur.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"services"} %}{% endroboWikiPicture %}

La clé "service" contient le domaine de service et le nom. Tout ce qui précède le point est le domaine, et tout ce qui suit le point est le nom du service. Le champ de données est également nécessaire.

Pour trouver l'entité cible, allez dans "Paramètres -> Appareils et services -> Entités". Il y aura une colonne avec "ID de l'entité" - c'est le paramètre d'entité cible requis.

Maintenant que nous connaissons tous les paramètres, voyons ce qui se passera dans le script.

Le script se connectera au démon IPFS local. (Si vous avez suivi les instructions de configuration de la maison intelligente, vous avez déjà le démon IPFS en cours d'exécution.)

Tout d'abord, nous formerons une commande au format JSON. Ensuite, le message est crypté avec les clés de l'utilisateur et du contrôleur.
Ensuite, la commande cryptée est enregistrée dans un fichier et ajoutée à IPFS. Ensuite, le hash IPFS résultant est envoyé à la parachaine Robonomics via un extrinsèque `Launch` à l'adresse du contrôleur.
Lorsque le contrôleur reçoit le lancement, il téléchargera le fichier depuis IPFS, le déchiffrera et appellera le service spécifié à l'intérieur.

Le code complet est le suivant :

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# partie polkadot
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Partie Robonomics

# Informations d'identification Robonomics
# L'adresse de l'utilisateur doit être dans
```Dispositifs RWS
# L'adresse de l'utilisateur doit être ED25519
user_seed = "<PHRASE_SECRÈTE>"
controller_address = "<ADRESSE_DU_CONTROLEUR>"
sub_owner_address = "<ADRESSE_DU_PROPRIÉTAIRE>"

# Commande
service_domain = "<DOMAINE>"  # le domaine est ce qui se trouve avant le point dans le nom du service. Par exemple "switch"
service_name = "<NOM>"  # nom - ce qui vient après le point dans le nom du service. Par exemple "turn_on"
target_entity = "<ID_ENTITÉ>"  #  id_entité. Par exemple "switch.boiler"
data = {}  # Doit être un dictionnaire


def gestionnaire_abonnement(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Début du décompte des référendums :', data.value)

    if update_nr > 0:
        print('Augmentation du décompte des référendums :', data.value)
        # Envoyer le lancement à l'adresse du contrôleur avec le hachage ipfs
        lancement = Lancement(expéditeur, rws_sub_owner=sub_owner_address)
        res = lancement.lancer(controller_address, result_ipfs)
        print(f"Résultat de la transaction : {res}")

def encrypter_message(
        message, paire_de_clés_expéditeur: Keypair, clé_publique_destinataire: bytes
) -> str:
    """
    Chiffrer le message avec la clé privée de l'expéditeur et la clé publique du destinataire
    :param message: Message à chiffrer
    :param paire_de_clés_expéditeur: Paire de clés du compte expéditeur
    :param clé_publique_destinataire: Clé publique du destinataire
    :return: message chiffré
    """
    chiffré = paire_de_clés_expéditeur.encrypter_message(message, clé_publique_destinataire)
    return f"0x{chiffré.hex()}"

# Formater le message pour le lancement
data['entity_id'] = target_entity
commande = {'plateforme': service_domain, 'nom': service_name, 'params': data}

message = json.dumps(commande)
print(f"Message : {message}")
expéditeur = Compte(user_seed, type_crypto=KeypairType.ED25519)

# Chiffrer la commande
destinataire = Keypair(
    adresse_ss58=controller_address, type_crypto=KeypairType.ED25519
)
message = encrypter_message(message, expéditeur.paire_de_clés, destinataire.clé_publique)
print(f"Message chiffré : {message}")
nom_fichier = "fichier_temporaire"
with open(nom_fichier, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    résultat = client.add(nom_fichier, épingler=False)```python
result_ipfs  = result["Hash"]
    print(f"IPFS hash: {result_ipfs}")
    print(f"IPFS hash for launch {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

si vous avez tout fait correctement, vous verrez les journaux suivants:
```
Message: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
Ecrypted message: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
IPFS hash: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
IPFS hash for launch 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Referenda count start: 0
Referenda count increased: 1
Transaction result: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```