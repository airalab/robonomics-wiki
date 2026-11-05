---
title: Contribuer
contributors: [positivecrash, ensrationis]
---

Robonomics est un projet open source, et nous voulons que chacun puisse y contribuer facilement. Vous pouvez signaler un problème, proposer une modification, améliorer le code ou cette documentation. Ouvrez une issue ou une pull request dans le dépôt concerné par la modification.

## Dépôts principaux

- [airalab/robonomics](https://github.com/airalab/robonomics) : le runtime et ses pallets. Il a ses propres CONTRIBUTING.md et SECURITY.md.
- [airalab/robins](https://github.com/airalab/robins) : des outils, dont l'outil en ligne de commande `cps` et les passerelles pour appareils.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface) : la bibliothèque Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app) : l'application web [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki) : ce wiki.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network) : le site principal.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy) : le site de la Robonomics Academy.

## Signaler un problème

1. Choisissez le dépôt concerné par le problème.
2. S'il s'agit d'un bug, vérifiez qu'il n'a pas déjà été signalé.
3. Donnez un titre et une description clairs, avec autant d'informations utiles que possible.
4. Pour ce wiki, utilisez le modèle d'issue et indiquez la page à corriger.

Ne signalez pas de failles de sécurité dans des issues publiques. Suivez le SECURITY.md de [airalab/robonomics](https://github.com/airalab/robonomics) : il prévoit un signalement privé via les GitHub Security Advisories.

## Proposer des modifications du réseau

Les modifications du runtime et de ses paramètres sont décidées par les détenteurs de XRT. Décrivez d'abord l'idée dans une issue sur [airalab/robonomics](https://github.com/airalab/robonomics/issues), puis portez-la en référendum. Voir [XRT et gouvernance](/docs/xrt-and-governance/#how-to-propose-a-change).

## Pull requests

1. Pour les petites corrections, comme les fautes de frappe, une pull request vaut mieux qu'une issue.
2. Décrivez le problème et la solution dans la pull request. Liez l'issue correspondante s'il y en a une.
3. N'envoyez pas de pull requests qui ne corrigent que des espaces ou la mise en forme.
4. Respectez le style, la langue et la structure du texte environnant.

## Modifier ce wiki

Le wiki est construit avec Eleventy. Il vous faut Node.js 20, ou 22 et plus récent.

1. Clonez [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki), puis lancez `npm install` et `npm run start` pour le servir en local.
2. Les pages sont des fichiers Markdown dans `src/docs/`. Chacune commence par un frontmatter : `title`, `contributors` (noms d'utilisateur GitHub) et, en option, `tools`.
3. La barre latérale est définie dans `src/_data/sidebar_docs.json`. Quand vous ajoutez une entrée, ajoutez aussi son titre dans `translations/pages/en.json`.

Le [README](https://github.com/airalab/robonomics-wiki#readme) explique les composants de page et le processus de traduction.
