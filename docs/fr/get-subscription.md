---
title: Comment acheter un abonnement

contributors: [LoSk-p, PaTara43]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Payer des commissions pour les transactions sur la blockchain est ennuyeux. Imaginez un appareil IoT qui envoie des données de télémétrie toutes les 5 à 10 minutes. Cela vous fera payer beaucoup chaque mois. L'une des principales caractéristiques du réseau Robonomics est le RWS - l'abonnement au service Web Robonomics. Payez mensuellement et oubliez les frais de transaction ! Pour des informations théoriques, consultez [cet](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) article.**

<robo-wiki-note type="warning" title="Parachain">

  Veuillez noter que ce tutoriel montre comment acheter un abonnement sur la parachain Robonomics Kusama. Vous pouvez également effectuer les mêmes étapes sur votre [nœud local](/docs/run-dev-node).

  Une dernière chose avant de commencer. Il s'agit d'une façon "difficile" d'acheter un abonnement. Il existe une méthode conventionnelle pour le faire via [Robonomics DApp](https://dapp.robonomics.network/#/).

</robo-wiki-note>

## Faire une offre aux enchères

Les abonnements sur Robonomics sont vendus selon un modèle d'enchères. Pour en obtenir un, vous devez faire une offre aux enchères et la remporter (ne vous inquiétez pas, c'est rapide).

Dans `Developer/Chain state`, vous pouvez voir les enchères disponibles. 
Choisissez `rws` et `auctionQueue` et appuyez sur le bouton `+`, vous verrez les identifiants des enchères disponibles :

![queue](../images/rws/queue.png)

Vous pouvez obtenir des informations sur n'importe quel abonnement avec `rws` `auction` et l'identifiant de l'enchère (l'identifiant de l'enchère sur l'image est 79) :

![auction](../images/rws/auction.png)

Dans les informations sur l'enchère, vous pouvez voir le champ `winner`, pour le moment il est `null`, ce qui signifie que personne n'a cet abonnement et que vous pouvez l'obtenir. Pour cela, allez dans `Developer/Extrinsic`, choisissez votre compte et `rws -> bid`. Définissez également l'identifiant de l'enchère (79) et le montant d'unités à enchérir (plus de 1000000000 Wn) :

![bid](../images/rws/bid.png)

Soumettez la transaction et vérifiez les informations sur l'enchère avec l'identifiant 79 (dans `Chain state`, choisissez `rws -> auction` et l'identifiant 79) :

![win](../images/rws/auc_win.png)

Maintenant, dans le champ `winner`, vous verrez l'adresse de votre compte, ce qui signifie que ce compte possède l'abonnement 79. Une enchère commence avec la première offre et dure quelques blocs, donc si quelqu'un offre plus de jetons que vous dans les prochains blocs, cette personne sera le gagnant et obtiendra l'abonnement.

Maintenant, vous pouvez ajouter des appareils. Les appareils sont des comptes qui peuvent utiliser cet abonnement et soumettre des extrinsèques sans frais.
Pour le tester, créez un nouveau compte sans jetons et ajoutez-le aux appareils

Pour ajouter des appareils, choisissez `rws -> setDevices` dans `Developer/Extrinsic`. Ensuite, appuyez sur le bouton `Ajouter un élément` et choisissez le compte récemment créé sans jetons :

![set_devices](../images/rws/set_devices.png)

Soumettez la transaction. Maintenant, vous pouvez vérifier la liste des appareils dans `Chain state` avec `rws -> devices`. Vous verrez l'adresse de votre compte sans jetons. Choisissez le compte qui a acheté l'abonnement et appuyez sur `+` :

![devices](../images/rws/devices.png)

Maintenant, vous pouvez essayer d'envoyer une extrinsèque de [lancement](/docs/subscription-launch) en utilisant l'abonnement.