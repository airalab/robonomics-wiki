---
title: Lancer un robot depuis le cloud
contributors: [Fingerling42]
tools:   
  - Enveloppeur Robonomics ROS 2 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**Dans cet article, vous apprendrez comment utiliser la fonction de lancement de Robonomics dans ROS 2 à travers divers exemples**

La fonction clé de la parachain Robonomics pour envoyer des commandes aux appareils est l'extrinsèque de lancement. Cette fonction vous permet d'envoyer une chaîne contenant un paramètre (sous forme de valeur hexadécimale longue de 32 octets) à une adresse spécifiée dans la parachain. En général, la chaîne représente un hachage IPFS qui pointe vers un fichier contenant les paramètres nécessaires pour exécuter la commande. Vous pouvez trouver plus de détails sur la fonction de lancement [dans cet article](https://wiki.robonomics.network/docs/launch/).

Dans l'enveloppeur Robonomics ROS 2, la fonction de lancement est implémentée en tant que service pour envoyer des commandes et en tant que sujet pour recevoir des commandes.

## Envoi de lancement

Le service, appelé `robonomics/send_launch`, ressemble à ceci:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # Just param string or file name with parameters that need to be uploaded to IPFS
string  target_address          # Address to be triggered with launch
bool    is_file         True    # Is a launch param```un fichier qui doit être téléchargé sur IPFS (par défaut est True) ?
bool    encrypt_status  True    # Vérifie si le fichier de paramètres doit être chiffré avec l'adresse cible, par défaut est True
---
string  launch_hash             # Hachage de la transaction de lancement
```

{% endcodeHelper %}

Le service accepte les paramètres suivants dans le cadre de la demande : un paramètre de commande (soit une simple chaîne de caractères, soit le nom d'un fichier contenant les paramètres de commande), l'adresse cible dans la parachain Robonomics pour l'envoi du lancement, et deux indicateurs : l'un indiquant si le paramètre est un fichier, et l'autre spécifiant si le fichier doit être chiffré (tous deux sont définis sur true par défaut). Le fichier sera téléchargé sur IPFS, et son hachage sera transmis en tant que paramètre de lancement. Par conséquent, le fichier doit être placé dans le répertoire désigné pour les fichiers IPFS, tel que spécifié dans le fichier de configuration du nœud `robonomics_ros2_pubsub`.

Par défaut, le fichier est chiffré en utilisant l'adresse publique du destinataire du lancement. La méthode de chiffrement appliquée est le chiffrement à clé publique basé sur la cryptographie à courbe elliptique Curve25519. Dans l'implémentation actuelle, le chiffrement est uniquement pris en charge pour les adresses de compte de type ED25519 (Edwards) (vous pouvez en savoir plus à ce sujet dans [cet article](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

Après l'envoi du lancement, le service renvoie le hachage de la transaction.

## Réception du Lancement

RéceptionLe lancement est organisé sous la forme d'un sujet correspondant. Techniquement, le nœud utilise la fonctionnalité de l'interface robonomics pour s'abonner à l'état de son propre adresse et attend que l'événement `NewLaunch` apparaisse. Une fois l'événement survenu, le nœud publie un message sur le sujet `robonomics/received_launch`. Le format du message est le suivant:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # Adresse du compte ayant envoyé la commande de lancement
string  param                   # Chaîne avec paramètre ou nom du fichier avec les paramètres
```

{% endcodeHelper %}

Les champs du message contiennent l'adresse à partir de laquelle le lancement a été envoyé et le paramètre lui-même : soit une simple chaîne, soit le nom du fichier avec les paramètres qui a été téléchargé depuis IPFS et placé dans le répertoire de travail IPFS. Si le fichier était chiffré, il est déchiffré pendant ce processus.


## Exemple avec Turtlesim

Ensuite, nous allons démontrer comment utiliser la fonction de lancement avec [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) comme exemple. Turtlesim est un simulateur léger conçu pour apprendre ROS 2. Vous pouvez l'installer en utilisant la commande suivante:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

Le package Robonomics ROS 2 Wrapper comprend un package pré-construit appelé `turtlesim_robonomics`, spécifiquement adapté pour Turtlesim. Ce package vous permet de tester toutes les fonctionnalités de l'enveloppe. Essayons de l'exécuter.

{% roboWikiNote {type: "warning", title: "Avertissement"}%}

  Assurez-vous d'avoir un solde suffisant sur votre compte ou un abonnement actif pour effectuer des transactions.

{% endroboWikiNote %}

1. Pour commencer, créez un fichier de configuration pour l'instance pubsub de `turtlesim_robonomics` en utilisant le modèle `config/robonomics_pubsub_params_template.yaml`. Remplissez les champs appropriés avec vos identifiants Robonomics (graine de compte, type de cryptographie, adresse du propriétaire de l'abonnement). Spécifiez également un répertoire pour les fichiers IPFS. Une fois terminé, renommez le fichier, par exemple, `first_pubsub_params.yaml`.

2. Lancez le démon IPFS :

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. Exécutez le fichier de lancement ROS 2 suivant. Il démarrera tous les nœuds nécessaires : Turtlesim lui-même, l'implémentation de l'enveloppe pour Turtlesim et le pubsub Robonomics :

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params
```.yaml namespace:='turtlesim1'
```

{% endcodeHelper %}

Vous verrez le simulateur avec la tortue, ainsi que les journaux ROS 2 dans la console affichant l'ID IPFS, le chemin du répertoire avec les fichiers IPFS, l'adresse Robonomics, et d'autres informations pertinentes.

### Lancer Turtlesim depuis le portail Polkadot

1. Turtlesim est contrôlé via le sujet `/cmd_vel`, vous devez donc préparer les messages correspondants et les inclure dans un fichier, qui sera utilisé comme paramètre de lancement. Pour plus de commodité, ces messages sont préparés dans un fichier JSON. Créez un fichier (par exemple, `turtle_cmd_vel.json`) et collez ce qui suit :

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

  Cet exemple JSON commandera à la tortue de se déplacer deux fois.

2. Ensuite, le fichier doit être téléchargé sur IPFS. Vous pouvez choisir n'importe quelle méthode, mais pour cet exemple, nous utiliserons IPFS Kubo. Ouvrez un terminal dans le répertoire où se trouve le fichier JSON et téléchargez-le sur IPFS :

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  Vous recevrez le hachage IPFS du fichier. Assurez-vous de le sauvegarder pour une utilisation ultérieure.

3. Avant d'envoyer le lancement, le hachage IPFS doit être converti en une chaîne de 32 octets. Cela peut être fait en utilisant quelques commandes Python. Ouvrez un terminal, lancez l'interpréteur Python 3 et exécutez les commandes suivantes :

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  Sauvegardez la chaîne résultante pour une utilisation ultérieure.

4. Ouvrez le portail Robonomics [Polkadot/Substrate](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) et naviguezVers les **Développeurs** -> onglet **Extrinsèques**. Sélectionnez l'extrinsèque `launch` -> `launch(robot, param)`. Dans le champ `robot`, insérez l'adresse de votre robot, et dans le champ `param`, insérez la chaîne avec le hachage IPFS converti. Soumettez la transaction.


5. Allez dans le simulateur Turtlesim. Après avoir envoyé avec succès la transaction, la tortue devrait commencer à bouger.


### Lancer Turtlesim à partir des outils en ligne de commande ROS 2

1. Essayons maintenant d'envoyer un lancement à Turtlesim à partir d'un autre nœud pubsub ROS 2. Tout d'abord, créez un autre fichier de configuration (par exemple, `second_pubsub_params.yaml`) avec des identifiants Robonomics différents et un répertoire IPFS distinct.

2. Dans un terminal séparé, exécutez un nouveau nœud `robonomics_ros2_pubsub` en utilisant le nouveau fichier de configuration :

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. Placez le fichier JSON contenant les commandes pour Turtlesim (`turtle_cmd_vel.json`) dans le répertoire IPFS du nouveau pubsub.

4. Avant d'envoyer le lancement, configurons une surveillance pour observer comment `turtlesim_robonomics` reçoit. données à l'arrivée. Pour ce faire, dans un terminal séparé, abonnez-vous au sujet correspondant :

  {% codeHelper { copy: true}%}

  ```shell
  ros2 topic echo /turtlesim1/robonomics/received_launch
  ```

  {% endcodeHelper %}

  {% roboWikiNote {type: "warning", title: "Paramètre de lancement en tant que chaîne de caractères"}%}

    Par défaut, le gestionnaire de lancement attend un hachage IPFS d'un fichier en tant que paramètre. Si vous avez besoin que le pubsub traite le paramètre comme une chaîne de caractères normale, vous devez modifier le paramètre de nœud ROS 2 correspondant `launch_is_ipfs` de `True` à `False`. Vous pouvez le faire en utilisant la commande `ros2 param set`.

  {% endroboWikiNote %}

5. Maintenant, nous devons appeler le service ROS 2 pour envoyer le lancement. Dans un terminal séparé, utilisez la commande suivante :

  {% codeHelper { copy: true}%}

  ```shell
  ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'VOTRE_ADRESSE_TURTLESIM'"}
  ```

  {% endcodeHelper %}

  Vous verrez les journaux pubsub afficher les détails de la soumission du lancement.

6. Allez dans le simulateur Turtlesim. Après avoir envoyé avec succès la transaction, la tortue devrait commencerDéplacer. De plus, dans les journaux du sujet abonné, vous devriez voir des informations sur les données reçues.

### Lancer Turtlesim à partir d'un autre nœud

1. Maintenant, essayons de créer un nœud de test qui attendra que le lancement arrive, puis le transmettra à Turtlesim. Vous pouvez utiliser le package de test prêt à l'emploi `test_robot_robonomics`. Copiez ce package dans votre espace de travail ROS 2.

2. Ouvrez le fichier du nœud situé à `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` dans n'importe quel éditeur de texte, et ajoutez le code suivant après la fonction `__init__` :

  {% codeHelper { copy: true}%}

  ```python
  def launch_file_subscriber_callback(self, msg) -> None:
      super().launch_file_subscriber_callback(msg)

      transaction_hash = self.send_launch_request(self.param, target_address='VOTRE_ADRESSE_TURTLESIM', is_file=True, encrypt_status=True)

      self.get_logger().info('Lancement envoyé à la tortue avec le hash : %s ' % str(transaction_hash))
  ```

  {% endcodeHelper %}

  Cette fonction traitera d'abord le lancement reçu, puis utilisera son paramètre pour envoyer un nouveau lancement à Turtlesim.

3. Construisez le package en utilisant `colcon`, puis sourcez ses fichiers de configuration.

4. Exécutez le fichier de lancement ROS 2 du package de test avec les deux identifiants pubsub :

  {% codeHelper { copy: true}%}

  ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```
  
  {% endcodeHelper %}

5. Maintenant, envoyez un lancement avec les paramètres `turtle_cmd_vel.json` à l'adresse du nœud de test, par exemple, via le portail Polkadot/Substrate. Avant de faire cela, assurez-vous que Turtlesim est toujours en cours d'exécution. Le nœud de test devrait recevoir le lancement, puis en envoyer un nouveau avec les mêmes paramètres, ce qui fera bouger la tortue dans Turtlesim.