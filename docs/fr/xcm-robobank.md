---
title: Substrat Cumulus Parachain Testsuite pour la messagerie inter-chaînes 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


L'objectif principal de ce projet est la simplification du développement de l'exécution de parachain, lorsque des messages inter-chaînes sont utilisés. 
Il permet le développement de code d'exécution avec des tests d'intégration avec un degré élevé de répétabilité et une utilisation simple.
Il automatise la construction, la construction d'une configuration de réseau prédéfinie (c'est-à-dire 1 chaîne de relais + 2 parachains), la configuration de canaux de transmission de messages entre les parachains et l'exécution de tests de messagerie, l'envoi de messages, en utilisant l'appel à l'exécution, le tout construit et composé en Python.

XCM Testsuite est utilisé pour tester le cycle de production de Robobank - l'ensemble de palettes Substrate, qui permettent aux robots de s'enregistrer sur des parachains externes, de recevoir des commandes prépayées, de les exécuter et de recevoir des paiements en utilisant des jetons externes. Cela permet aux robots de fonctionner à l'intérieur du réseau Robonomics avec toute l'infrastructure requise, mais en même temps, d'offrir leurs services sur n'importe quel autre parachain.

Une vidéo d'exemple est disponible sur [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

Les principales étapes du scénario de démonstration sont:
- lancer une chaîne de relais et deux parachains dans un pack de 6 processus
- configurer les canaux de messages XCM entre les parachains
- enregistrer un robot dans les deux parachains
- créer une commande pour ce robot dans le parachain client (réservation du paiement pour l'achvement de la commande)
- envoyer un message XCM au parachain Robonomics
- créer l'enregistrement de commande "mirrored" sur le parachain Robonomics
- le robot accepte la commande sur le parachain Robonomics
- envoyer un message XCM sur l'acceptation de la commande au parachain client
- accepter la commande sur le parachain client (réservation d'une pénalité en cas de non-achèvement de la commande jusqu'à la date limite de la commande)
- le robot achève la commande sur le parachain Robonomics
- envoyer un message XCM sur l'achèvement de la commande au parachain client
- régler tous les paiements (le paiement du client est transféré au robot, ainsi que la pénalité non utilisée)
- fermer la commande1


## Amont
Ce projet est un fork du
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
Il contient le code des palettes d'exécution en cours de test.
Comme dans le code d'origine du nœud, les parachains se trouvent dans les catalogues "./pallets", "./runtime", "./node".

Différences avec le modèle de nœud "substrate-node-template" d'origine:
- cette exécution de collecteur a un module de gestionnaire HRMP et peut gérer les messages des parachains frères
- exécution de test fictive prête pour les tests internes XCM

## Build & Run
Configuration recommandée (fortement recommandée): 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[NOTE] La première construction peut prendre beaucoup de temps, jusqu'à plusieurs heures sur des machines suboptimales.

[NOTE] Le script fonctionne avec les versions FIXÉES (hachages de validation) de Polkadot(Rococo) dans la chaîne de relais et les parachains.

[NOTE] Par défaut, le script recrée le même environnement à chaque lancement, en supprimant tous les états précédents. Ce comportement peut être modifié dans "config.sh" en utilisant le paramètre "PERSISTENT".


Exécutez le script de construction et de configuration.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Actions de base du script "init.sh":
 - lire la configuration (fichier "config.sh" avec le numéro de révision, les clés et identifiants de nœud initiaux, le paramètre de persistance des données de chaîne, etc.)
 - configuration des paquets OS, Rust et Python
 - génère des binaires séparés pour la chaîne de relais et également pour les deux parachains
    - les binaires seront générés dans le sous-répertoire ./bin. 
 - (facultatif) supprime toutes les données de chaîne précédentes pour toutes les chaînes
    - désactivé si "PERSISTENT=1" est défini dans "config.sh"
 - s'exécute en tant que processus séparés (avec des PID et des tuyaux d'E/S séparés):
    - validateurs de la chaîne de relais (c'est-à-dire 4 validateurs d'une révision Rococo stable en cours d'exécution)
    - collecteurs pour le parachain-100 (c'est-à-dire un seul collecteur pour le premier parachain que vous développez)
    - collecteurs pour le parachain-200 (c'est-à-dire un seul collecteur pour le deuxième parachain que vous développez)
 - imprime tous les points de terminaison, les ports sur la console, vous permettant d'étudier n'importe quelle chaîne à l'aide d'applications frontales (explorateur, DApp)
 - continue d'imprimer toutes les données de sortie de toutes les chaînes sur la console

[WARNING] Après le lancement, attendez que le réseau soit opérationnel, assurez-vous que la finalisation des blocs a commencé et que les parachains sont enregistrés. Ces processus devraient prendre environ 5 minutes (50 blocs x 6 secondes).

## Vérification du bon fonctionnement de la configuration initiale 

Utilisez l'interface Polkdot standard et les points de terminaison "--ws-port" générés pour vous connecter à chaque nœud.
Ouvrez [l'application Polkadot](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) pour surveiller les chaînes. 

### Exemple:
Localhost, 4 validateurs de chaîne de relais, un collecteur de parachain-100, un collecteur de parachain-200:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


Si tout fonctionne et que le consensus a commencé, nous pouvons procéder à l'exécution de nos cas de test (dans un nouveau terminal).

### Test de passage de message UMP
```bash
./scripts/init.sh ump
```
Il crée un message `Balance.transfer` dans `parachain-100` et le transmet à la chaîne de relais.
Lorsque la chaîne de relais reçoit le message, elle transfère 15 jetons du compte `para 100` vers le compte Charlie.


### Test de passage de message HRMP
```bash
./scripts/init.sh ump
```

Il crée un message `Balance.transfer` dans `parachain-100` et le transmet à la chaîne `sibling 200`.
Avant cela, il dote le compte `subl 100` de 1000 jetons et établit un canal de communication entre les parachaines.
```bash
./scripts/init.sh hrmp
```
Les messages suivants peuvent être envoyés en exécutant la sous-commande `hrmpm`. Cela ne crée pas de canal et permet donc une exécution plus rapide.
```bash
./scripts/init.sh hrmpm
```

### Plus d'options
```bash
./scripts/init.sh help
```

## Testnet local

### Créer une spécification de chaîne personnalisée
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Modifier rococo_local.json, remplacer les paramètres de solde et d'autorités par les vôtres.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

Adresse Polkadot pour le compte //Alice//stash (cryptographie sr25519).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Clé de session grandpa Polkadot pour //Alice (cryptographie ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Adresse Polkadot pour le compte //Alice (cryptographie sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Convertir rococo_local.json au format brut.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Pour utiliser une nouvelle spécification de chaîne, remplacez le fichier rococo.json dans le répertoire ./config/ par celui-ci et relancez la chaîne.
```bash
./scripts/init.sh run
```
Vous pouvez librement modifier le code. La commande ci-dessus reconstruira le projet et mettra à jour le nœud collecteur avant de démarrer.
Cumulus est un logiciel préliminaire encore en cours de développement intensif.
Nous utilisons un commit spécifique de polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

Vous pouvez utiliser des versions plus récentes du logiciel. Pour ce faire, modifiez POLKADOT_COMMIT dans ./scipt/config.sh
par le dernier commit de la branche `rococo-v1`, supprimez ./bin/polkadot et exécutez 
```bash
./scripts/init.sh run
```

Mettre à jour les dépendances du projet collecteur 
```bash
cargo update
./scripts/init.sh build
```
Certaines dépendances nécessitent probablement de nouvelles fonctionnalités de la chaîne d'outils Rust. Ce projet est basé sur Rust `nightly-2021-01-26`
Mettez à jour la version de la chaîne d'outils Rust dans ./scripts/config.sh avant de construire.

## Pirater la parachaine
[Ajouter une palette externe](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - devrait probablement être dans "en savoir plus"?
## Learn More

Consultez le [Modèle de nœud du hub de développeurs Substrate](https://github.com/substrate-developer-hub/substrate-node-template) en amont pour en savoir plus sur la structure de ce projet, les capacités qu'il encapsule et la manière dont ces capacités sont mises en œuvre. Vous pouvez en savoir plus sur [Le chemin d'un bloc de parachaine](https://polkadot.network/the-path-of-a-parachain-block/) sur le blog officiel de Polkadot. [Atelier Parity Cumulus](https://substrate.dev/cumulus-workshop/#/)
