---
title: Comment mettre à jour la version du nœud collator Robonomics

contributors: [Leemo94]
---

Il est recommandé d'avoir lu les articles suivants avant de lire ce post : ["Comment construire un nœud collator"](/docs/how-to-build-collator-node) & ["Comment lancer le collator Robonomics"](/docs/how-to-launch-the-robonomics-collator).

Cet article contient les commandes nécessaires pour mettre à jour un nœud collator Robonomics (fonctionnant sous Ubuntu), et donne également un exemple par la suite.

## **Commandes Requises**

0. Avant de commencer, il est recommandé d'être connecté en tant que `root`, sinon, je recommanderais d'utiliser :

```shell
sudo su -
```

1. Arrêtez le service Robonomics :

```shell
systemctl stop robonomics.service
```

2. Supprimez la version précédente de Robonomics (assurez-vous d'être dans le répertoire correct) :

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

3. Obtenez la [dernière version](https://github.com/airalab/robonomics/releases) de Robonomics :

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

4. Extrayez le fichier :

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

5. Déplacez le fichier :

```shell
mv robonomics /usr/local/bin/
```

{% roboWikiNote {type: "note"}%} Vous devez déplacer ce fichier vers le répertoire correct où vous avez installé le nœud Robonomics {% endroboWikiNote %}

6. Démarrez Robonomics :

```shell
systemctl start robonomics.service
```

Exemple pour mettre à jour le nœud collator vers Robonomics v1.8.4 :

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service
```

## **Changer la Base de Données de la Chaîne de Relais Kusama sans Chemin de Base Défini**

Il arrive parfois que certains instantanés de la Chaîne de Relais Kusama provoquent des erreurs sur votre nœud. Cela entraînera souvent l'arrêt de votre nœud. Exemple d'erreur causée par une base de données de Chaîne de Relais corrompue :

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

Pour corriger cette erreur, vous devez supprimer votre base de données existante de la Chaîne de Relais Kusama (probablement RocksDb) et la remplacer par une autre base de données telle que ParityDb. Exécutez les commandes suivantes :

1. Trouvez le répertoire du nœud Robonomics et vérifiez les fichiers :

```shell
cd /home/robonomics/
ls -a
```

2. Confirmez que vous voyez le répertoire polkadot, puis accédez au répertoire chains :

```shell
cd /polkadot/chains/
ls -a
```

3. Supprimez le répertoire `ksmcc3` :

```shell
rm -r ksmcc3
```

4. Créez un nouveau répertoire `ksmcc3`.

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

5. Maintenant, vous devez télécharger un nouvel instantané. Cet exemple utilise un instantané de chaîne de relais fortement élagué, mais vous pouvez le remplacer par n'importe quel instantané que vous préférez.

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

6. Pendant que l'instantané se télécharge, ouvrez une nouvelle session et modifiez votre fichier de service :

```shell
sudo nano /etc/systemd/system/robonomics.service
```

Modifiez les lignes dans le fichier de service qui concernent la base de données et l'élagage :

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

Utilisez `Ctrl + S` puis `Ctrl + X` pour enregistrer et quitter le fichier de service.

7. Maintenant, vous devez recharger votre démon.

```shell
systemctl daemon-reload
```

8. À ce stade, dans votre autre session, espérons que la nouvelle base de données a été téléchargée, extrayez alors le fichier :

```shell
tar -xvzf ksm_pruned.tar.gz
```

9. Après que le déballage soit terminé, exécutez ce qui suit :

```shell
chown -R robonomics:robonomics paritydb
```

10. Maintenant, vous pouvez démarrer le service, le surveiller pour toute erreur, et vérifier qu'il est en communication à la fois avec la chaîne de relais et la parachaine :

```shell
systemctl start robonomics && journalctl -fu robonomics
```