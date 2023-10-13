---
title: Comment mettre à jour la version du nœud Robonomics Collator

contributors: [Leemo94]
---

Il est recommandé de lire les articles suivants avant de lire ce post: ["Comment construire un nœud Collator"](/docs/how-to-build-collator-node) & ["Comment lancer le Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

Cet article contient les commandes nécessaires pour mettre à jour un nœud collator Robonomics (fonctionnant sous Ubuntu), et donne également un exemple par la suite.

## **Commandes requises**

0. Avant de commencer, il est recommandé d'être connecté en tant que `root`, sinon, je vous recommande d'utiliser:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Arrêtez le service Robonomics:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Supprimez la version précédente de Robonomics (assurez-vous d'être dans le répertoire correct):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Obtenez la [dernière version](https://github.com/airalab/robonomics/releases) de Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Extrayez le fichier:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Déplacez le fichier:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

Vous devez déplacer ce fichier dans le répertoire correct où vous avez installé le nœud Robonomics)

</robo-wiki-note>

6. Démarrez Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Exemple de mise à niveau du nœud collator vers Robonomics v1.8.4:

<code-helper>

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
</code-helper>

## **Modification de la base de données de la chaîne de relais Kusama sans chemin de base défini**

Il arrive parfois que certains instantanés de la chaîne de relais Kusama provoquent des erreurs sur votre nœud. Cela entraîne souvent l'arrêt de votre nœud. Exemple d'erreur causée par une base de données de chaîne de relais corrompue:

<code-helper>

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
</code-helper>

Pour résoudre cette erreur, vous devez supprimer votre base de données de chaîne de relais Kusama existante (probablement RocksDb) et la remplacer par une autre base de données telle que ParityDb. Exécutez les commandes suivantes:

1. Trouvez le répertoire du nœud Robonomics et vérifiez les fichiers:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Vérifiez que vous voyez le répertoire polkadot, puis accédez au répertoire chains:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Supprimez le répertoire `ksmcc3` :

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Créez un nouveau répertoire `ksmcc3`.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Maintenant, vous devez télécharger un nouvel instantané. Cet exemple utilise un instantané de chaîne de relais fortement élagué, mais vous pouvez le remplacer par n'importe quel instantané de votre choix.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Pendant que l'instantané se télécharge, ouvrez une nouvelle session et modifiez votre fichier de service:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Modifiez les lignes du fichier de service qui concernent la base de données et l'élagage:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Utilisez `Ctrl + S` puis `Ctrl + X` pour enregistrer et quitter le fichier de service.

7. Maintenant, vous devez recharger votre démon.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. À ce stade, dans votre autre session, espérons que la nouvelle base de données a été téléchargée, donc extrayez le fichier:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. Après la fin du déballage, exécutez ce qui suit:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Maintenant, vous pouvez démarrer le service, le surveiller pour détecter d'éventuelles erreurs et vérifier qu'il est en liaison à la fois avec la chaîne de relais et la parachaine:


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>