---
title: Comment lancer le collateur Robonomics
contributors: [dergudzon, Leemo94]
outils:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"note", type: "note"}%} Dans la vidéo et les captures d'écran de cet article, nous avons utilisé la version 1.4.0 de Robonomics. Vous devez utiliser les mêmes commandes, mais remplacer la version de Robonomics par la version actuelle.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

Actuellement, le réseau Robonomics est principalement maintenu par les développeurs initiaux, mais n'importe qui peut soutenir le projet. Chaque nœud complet supplémentaire de la blockchain aide à la rendre plus durable et tolérante aux pannes. Les binaires des nœuds Robonomics sont disponibles dans les ressources de [publication](https://github.com/airalab/robonomics/releases) ou peuvent être [construits à partir de la source](/docs/how-to-build-collator-node/).

## Qu'est-ce qu'un collateur

Un collateur fait partie de la parachain Robonomics. Ce type de nœud crée de nouveaux blocs pour la chaîne Robonomics.

>Les collateurs maintiennent les parachains en collectant les transactions de parachain des utilisateurs et en produisant des preuves de transition d'état pour les validateurs de la chaîne de relais. En d'autres termes, les collateurs maintiennent les parachains en agrégeant les transactions de parachain en candidats de blocs de parachain et en produisant des preuves de transition d'état pour les validateurs basés sur ces blocs.

Vous pouvez en apprendre davantage sur les collateurs sur la page wiki [Polkadot](https://wiki.polkadot.network/docs/learn-collator) associée.

Dans la parachain Robonomics, chaque collateur reçoit des récompenses de (**0,001598184 XRT**) pour chaque bloc construit par le collateur (les récompenses surviennent lorsque les blocs sont scellés dans la chaîne). De plus, le collateur qui construit le bloc reçoit **50 % des frais de transaction** contenus dans le bloc qu'il crée.

## Exigences

Il est recommandé de lancer un collateur en utilisant les **exigences matérielles standard** pour les [validateurs Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware) :
+ Compatible x86-64.
+ Intel Ice Lake, ou plus récent (série Xeon ou Core) ; AMD Zen3, ou plus récent (EPYC ou Ryzen).
+ 4 cœurs physiques @ 3,4 GHz.
+ Multithreading simultané désactivé (Hyper-Threading sur Intel, SMT sur AMD).
+ Stockage - Un SSD NVMe de 1 To (pour être raisonnablement dimensionné pour faire face à la croissance de la blockchain).
+ Mémoire - 32 Go DDR4 ECC


Dans cet article, nous utilisons les spécifications suivantes :
+ 4 vCPU
+ 700 Go d'espace NVMe pour les bases de données du collateur. La capacité d'étendre cet espace disque est requise.
+ 8 Go de RAM


## Informations importantes
1. Nous utilisons certaines variables dans ces instructions, et vous devrez remplacer les valeurs par les vôtres dans toutes les commandes :
    + **%NODE_NAME%** est le nom du nœud. Exemple : *mon-collateur-robonomics-kusama*
    + **%BASE_PATH%** est le chemin vers le volume monté. Exemple : */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** est l'adresse du compte dans l'écosystème Polkadot au format SS58. Exemple : *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Notez que vous devez inclure *--state-cache-size=0* dans le lancement du service du collateur. Ce paramètre est important pour la stabilité du collateur.
Vous pouvez consulter plus d'informations dans l'[issue](https://github.com/airalab/robonomics/issues/234) associée sur github.

## Lancer facilement un collateur Robonomics pour la première fois

Vous pouvez facilement lancer un collateur directement en ligne de commande pour vérifier les erreurs.
Après cela, il est fortement recommandé de lancer le collateur Robonomics en tant que service (suivez l'étape suivante).

```
root@collateur-robokusama-captures:~# robonomics \
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


## Lancer le collateur Robonomics en tant que service

1. Créez l'utilisateur pour le service avec un répertoire personnel
    ```
    root@collateur-robokusama-captures:~# useradd -m robonomics
    ```

2. Téléchargez, extrayez et déplacez le binaire Robonomics vers le répertoire */usr/local/bin/*. Vous devez remplacer *$ROBONOMICS_VERSION* par la version actuelle de Robonomics dans les commandes de cette section. Vous pouvez trouver la version actuelle sur la [page des publications du dépôt Robonomics sur github](https://github.com/airalab/robonomics/releases).
   ```
   root@collateur-robokusama-captures:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@collateur-robokusama-captures:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@collateur-robokusama-captures:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Télécharger le binaire Robonomics 1.4.0"} %}{% endroboWikiPicture %}


3. Créez le fichier de service systemd nommé *robonomics.service* :
    ```
    root@collateur-robokusama-captures:~# nano /etc/systemd/system/robonomics.service
    ```

    Et ajoutez les lignes suivantes dans le fichier de service :
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

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Créer le fichier de service Robonomics"} %}{% endroboWikiPicture %}


    ```
    root@collateur-robokusama-captures:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Enregistrez ce fichier, puis activez et démarrez le service :
    ```
    root@collateur-robokusama-captures:~# systemctl enable robonomics.service
    root@collateur-robokusama-captures:~# systemctl start robonomics.service
    ```

URL de télémétrie : https://telemetry.parachain.robonomics.network/#/Robonomics

Les journaux des collateurs peuvent être surveillés avec : `journalctl -u robonomics.service -f`

Une fois que le collateur Robonomics est lancé, il commencera à se synchroniser avec la chaîne de relais Kusama, ce qui peut prendre un certain temps, en fonction de la vitesse de votre réseau et des spécifications de votre système, nous vous recommandons donc de télécharger un instantané de Kusama.


## Accélérer le processus de synchronisation en utilisant un instantané de Kusama

Nous vous recommandons de le faire immédiatement après avoir créé et démarré le service Robonomics. Vous pouvez trouver plus d'informations sur les instantanés et les instructions d'utilisation sur la page suivante : https://ksm-rocksdb.polkashots.io/

Instructions :

1. Arrêtez le service Robonomics et supprimez le répertoire de base de données Kusama actuel :
    ```
    root@collateur-robokusama-captures:~# systemctl stop robonomics.service
    root@collateur-robokusama-captures:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Téléchargez l'instantané actuel et extrayez-le :
    ```
    root@collateur-robokusama-captures:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@collateur-robokusama-captures:~# tar -xf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Télécharger un instantané de Kusama"} %}{% endroboWikiPicture %}

    Vous pouvez supprimer l'archive téléchargée après le déballage réussi :
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Définir la bonne propriété pour le dossier de la base de données :
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Redémarrer le service Robonomics :
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Vérifier les journaux du service :
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Vérifier les journaux du service"} %}{% endroboWikiPicture %}

## Dépannage
### Erreur : "Erreur de la base de données d'état : Trop de blocs frères insérés"
Pour corriger cette erreur, vous pouvez simplement lancer votre collator en mode archive :

1) Tout d'abord, arrêtez le service Robonomics :
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service

2) Ensuite, ajoutez le paramètre `--state-pruning=archive` à la partie parachain du fichier de service. Exemple du fichier de service modifié :
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

3) Rechargez la configuration du gestionnaire systemd :
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Supprimez la base de données parachain existante :
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Démarrez le service robonomics :
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Après cela, il faut attendre la synchronisation de la base de données parachain.

### Erreur : "impossible de créer le module : les paramètres de compilation ne sont pas compatibles avec l'hôte natif"
Cette erreur est liée aux paramètres de virtualisation. Il est nécessaire d'utiliser le type "host-model" du processeur émulé. Vous pouvez configurer cela sur l'hôte de virtualisation.

Cependant, si vous rencontrez cette erreur sur un hébergement quelconque, vous devez contacter le support technique pour résoudre ce problème uniquement.