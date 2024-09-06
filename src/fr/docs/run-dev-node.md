---
title: Comment exécuter un nœud de développement Robonomics
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Pour tester vos applications sur Robonomics, vous voudrez peut-être l'exécuter en mode développement. Cet article montre étape par étape comment obtenir votre propre instance de test locale de Robonomics.**


## Obtenir le binaire du nœud

1. Tout d'abord, vous avez besoin d'un fichier binaire, téléchargez l'archive avec celui-ci depuis la dernière [version](https://github.com/airalab/robonomics/releases).

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
Vous verrez la sortie suivante :

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"À partir de zéro", type: "note"}%} Si vous souhaitez purger les blocs existants, vous pouvez le faire en supprimant RocksDB à l'emplacement `/tmp/substrate******/chains/dev/db/full`.
Remplacez `******` par un identifiant correspondant affiché dans les journaux au lancement.

Si vous souhaitez démarrer le nœud à partir de zéro à chaque fois, utilisez le drapeau `--tmp`.
{% endroboWikiNote %}


## Connexion

Maintenant, vous pouvez vous connecter à votre nœud local via le [Portail Polkadot](https://polkadot.js.org/apps/#/explorer).

Changez le réseau en `Nœud Local` dans le coin supérieur gauche et appuyez sur `Basculer`.

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

Bienvenue dans l'instance locale de Robonomics !

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}