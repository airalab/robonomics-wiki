---
title: Suite de tests Substrate Cumulus Parachain pour la messagerie inter-chaînes

contributors: [ddulesov, boogerwooger, tubleronchik]
---

Le but principal de ce projet est de simplifier le développement du runtime de parachain lorsque des messages inter-chaînes sont utilisés.
Il permet le développement de code de runtime avec des tests d'intégration offrant un haut degré de reproductibilité et une utilisation simple.
Il automatise la construction, la mise en place d'une configuration réseau prédéfinie (c'est-à-dire 1 chaîne relais + 2 parachains), la configuration des canaux de passage de messages entre les parachains et l'exécution de tests de messagerie, l'envoi de messages, en utilisant l'appel au runtime, le tout construit et composé en Python.

XCM Testsuite est utilisé pour tester le cycle de production de Robobank - l'ensemble de palettes Substrate, qui permettent aux robots de s'enregistrer sur des parachains externes, de recevoir des commandes prépayées, de les exécuter et de recevoir des paiements en utilisant des jetons externes. Cela permet aux robots de fonctionner à l'intérieur du réseau Robonomics avec toute l'infrastructure requise, mais en même temps, d'offrir leurs services sur n'importe quelle autre parachain.

Une vidéo d'exemple est disponible sur [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

Les principales étapes du scénario de démonstration sont :
- lancer la chaîne relais et deux parachains dans un ensemble de 6 processus
- configurer les canaux de messages XCM entre les parachains
- enregistrer un robot dans les deux parachains
- créer une commande pour ce robot dans le parachain client (réservation de paiement pour l'achèvement de la commande)
- envoyer un message XCM à la parachain Robonomics
- créer l'enregistrement de commande "mirroir" sur la parachain Robonomics
- le robot accepte la commande sur la parachain Robonomics
- envoyer un message XCM sur l'acceptation de la commande à la parachain client
- accepter la commande sur la parachain client (réservation d'une pénalité en cas de non-achèvement de la commande jusqu'à la date limite de la commande)
- le robot achève la commande sur la parachain Robonomics
- envoyer un message XCM sur l'achèvement de la commande à la parachain client
- régler tous les paiements (le paiement du client est transféré au robot, ainsi que la pénalité non utilisée)
- clôturer la commande

## Amont
Ce projet est un fork du
[Modèle de nœud du Hub des développeurs Substrate](https://github.com/substrate-developer-hub/substrate-node-template).
Il contient le code des palettes de runtime en cours de test.
Comme dans l'originalLe code des parachains se trouve dans les répertoires "./pallets", "./runtime", "./node".

Différences avec le modèle original "substrate-node-template":
- ce runtime de collator possède un module gestionnaire HRMP et peut gérer les messages des parachains frères
- un runtime de test fictif prêt pour les tests XCM internes

## Construction & Exécution
Configuration recommandée (fortement) :
```
Ubuntu 20, 16 Go de RAM, 8 CPU, 120 Go de SSD
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

Actions de base du script "init.sh" :
 - lire la configuration (fichier "config.sh" avec le numéro de révision, les clés et identifiants de nœuds initiaux, le paramètre de persistance des données de la chaîne, etc.)
 - configurer les paquets OS, Rust et Python
 - construire des binaires séparés pour la chaîne de relais et également pour les deux parachains
    - les binaires seront générés dans le sous-répertoire ./bin.
 - (optionnel) supprimer toutes les données de chaîne précédentes pour toutes les chaînes
    - désactivé si "PERSISTENT=1" est défini dans "config.sh"
 - s'exécute en tant que processus séparés (avec des PID et des tuyaux d'E/S séparés) :
    - validateurs de la chaîne de relais (c'est-à-dire 4 validateurs en cours d'exécution sur une révision Rococo stable)
    - collateurs pour la parachain-100 (c'est-à-dire un seul collateur pour la première parachain que vous développez)
    - collateurs pour la parachain-200 (c'est-à-dire un seul collateur pour la deuxième parachain que vous développez)
 - affiche tous les points de terminaison, ports sur la console, vous permettant d'étudier n'importe quelle chaîne à l'aide d'applications frontend (explorateur, DApp)
 - continue d'afficher toutes les données de sortie de toutes les chaînes sur la console

[AVERTISSEMENT] Après le lancement, attendez que le réseau soit opérationnel, assurez-vous que la finalisation des blocs a commencé et que les parachains sont enregistrées. Ces processus devraientNécessite environ 5 min (50 blocs x 6 sec).

## Vérification du bon fonctionnement de la configuration initiale

Utilisez l'interface standard de Polkadot et les points de terminaison "--ws-port" générés pour vous connecter à chaque nœud.
Ouvrez l'[application Polkadot](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) pour surveiller les chaînes.

### Exemple :
Localhost, 4 validateurs de chaîne de relais, un collateur de parachain-100, un collateur de parachain-200 :
- [Validateur de relais 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Validateur de relais 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Validateur de relais 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Validateur de relais 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Collateur de parachain-100](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Collateur de parachain-200](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)

Si tout fonctionne et que le consensus est établi, nous pouvons passer à l'exécution de nos cas de test (dans un nouveau terminal).

### Test de passage de message UMP
```bash
./scripts/init.sh ump
```
Cela crée un message `Balance.transfer` dans `parachain-100` et le transmet à la chaîne de relais.
Lorsque la chaîne de relais reçoit le message, elle transfère 15 jetons du compte `para 100` au compte Charlie.

### Test de passage de message HRMP
```bash
./scripts/init.sh ump
```

Cela crée un message `Balance.transfer` dans `parachain-100` et le transmet à `sibling 200`.
Avant cela, il dote le compte `subl 100` de 1000 jetons et établit un canal de communication entre les parachains.
```bash
./scripts/init.sh hrmp
```
Les messages suivants peuvent être envoyés en exécutant la sous-commande `hrmpm`. Cela ne crée pas de canal et s'exécute donc plus rapidement.
```bash
./scripts/init.sh hrmpm
```

### Plus d'options
```bash
./scripts/init.sh help
```

## Testnet Local### Créer une spécification de chaîne personnalisée
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Modifiez rococo_local.json, remplacez les paramètres des soldes et des autorités par les vôtres.
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

Adresse Polkadot pour le //Alice//stash (cryptographie sr25519).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
URI de clé secrète `//Alice//stash` est le compte :
Graine secrète :      

Clé publique (hex) : 

ID de compte :       

Adresse SS58 :     
```

Clé de session grandpa Polkadot pour //Alice (cryptographie ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
URI de clé secrète `//Alice` est le compte :
Graine secrète :      

Clé publique (hex) : 

ID de compte :       

Adresse SS58 :     
```

Adresse Polkadot pour //Alice (cryptographie sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
URI de clé secrète `//Alice` est le compte :
Graine secrète :      

Clé publique (hex) : 

ID de compte :       

Adresse SS58 :     
```

Convertir rococo_local.json au format brut.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Pour utiliser la nouvelle spécification de chaîne, remplacez le fichier rococo.json dans le répertoire ./config/ par celui-ci et relancez la chaîne.
```bash
./scripts/init.sh run
```
Vous pouvez librement modifier le code. La commande ci-dessus reconstruira le projet et mettra à jour le nœud collator avant de démarrer.
Cumulus est un logiciel préliminaire encore en développement intensif.
Nous utilisons un commit spécifique de polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

Vous pouvez utiliser des versions plus récentes du logiciel. Pour ce faire, modifiez  POLKADOT_COMMIT  dans ./scipt/config.sh
à la dernière validation de la branche `rococo-v1`, supprimez ./bin/polkadot, et exécutez 
```bash
./scripts/init.sh run
```

Mettez à jour les dépendances du projet collator 
```bash
cargo update
./scripts/init.sh build
```
Certaines dépendances nécessitent probablement de nouvelles fonctionnalités de la chaîne d'outils Rust. Ce projet est basé sur Rust `nightly-2021-01-26`
Mettez à jour la version de la chaîne d'outils Rust dans ./scripts/config.sh avant de construire.

## Pirater la parachain
[Ajouter une palette externe](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - devrait probablement être dans "en savoir plus"?
## En savoir plus

Consultez l'amont
[Modèle de nœud du Hub de développement Substrate](https://github.com/substrate-developer-hub/substrate-node-template)
pour en savoir plus sur la structure de ce projet, les capacités qu'il encapsule et la manière dont elles sont mises en œuvre. Vous pouvez en apprendre davantage sur
[Le Chemin d'un Bloc Parachain](https://polkadot.network/the-path-of-a-parachain-block/) sur le
blog officiel de Polkadot.
[Atelier Parity Cumulus](https://substrate.dev/cumulus-workshop/#/)