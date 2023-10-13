---
title: Comment exécuter un nœud de développement Robonomics
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Pour tester vos applications sur Robonomics, vous voudrez peut-être l'exécuter en mode développement. Cet article montre étape par étape
les instructions pour obtenir votre propre instance de test locale de Robonomics.**


## Obtenir le binaire du nœud

1. Tout d'abord, vous avez besoin d'un fichier binaire, téléchargez l'archive correspondante depuis la dernière [version](https://github.com/airalab/robonomics/releases).

2. Accédez au dossier de l'archive, décompressez le binaire et modifiez les autorisations :

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Exécution

Exécutez le nœud avec :

```bash
./robonomics --dev
```
Vous verrez la sortie suivante:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  Si vous souhaitez purger les blocs existants, vous pouvez le faire en supprimant RocksDB à l'emplacement `/tmp/substrate******/chains/dev/db/full`.
  Remplacez `******` par un identifiant correspondant affiché dans les journaux lors du lancement.

  Si vous souhaitez démarrer le nœud à partir de zéro à chaque fois, utilisez l'option `--tmp`.

</robo-wiki-note>

## Connexion

Maintenant, vous pouvez vous connecter à votre nœud local via le [Portail Polkadot](https://polkadot.js.org/apps/#/explorer).

Changez le réseau en `Local Node` dans le coin supérieur gauche et appuyez sur `Switch`.

![switch](../images/dev-node/portal.png)

Bienvenue dans l'instance locale de Robonomics !

![local_node](../images/dev-node/dev-portal.png)


