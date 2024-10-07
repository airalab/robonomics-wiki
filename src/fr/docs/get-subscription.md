---
title: Comment acheter un abonnement

contributors: [LoSk-p, PaTara43]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Payer des commissions pour les transactions sur la blockchain est ennuyeux. Imaginez un appareil IoT qui envoie des données de télémétrie toutes les 5 à 10 minutes. Cela vous fera payer beaucoup chaque mois. L'une des fonctionnalités clés du réseau Robonomics est l'abonnement au service Web Robonomics (RWS). Payez mensuellement et oubliez les coûts de transaction ! Pour des informations théoriques, consultez [cet](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) article.**


{% roboWikiNote {title:"Parachain", type: "warning"}%}   Faites attention, ce tutoriel montre comment acheter un abonnement sur la parachain Robonomics Kusama. Vous pouvez également effectuer les mêmes étapes sur votre [nœud local](/docs/run-dev-node).
Une chose à savoir avant de commencer. C'est une façon "difficile" d'acheter un abonnement. Il existe une méthode conventionnelle pour le faire via [Robonomics DApp](https://dapp.robonomics.network/#/).
{% endroboWikiNote %}

## Faire une offre aux enchères

Les abonnements sur Robonomics sont vendus selon un modèle d'enchères. Pour en obtenir un, vous devez faire une offre aux enchères et la remporter (ne vous inquiétez pas, c'est rapide).

Dans `Développeur/État de la chaîne`, vous pouvez voir les enchères disponibles.
Choisissez `rws` et `auctionQueue` et appuyez sur le bouton `+`, vous verrez les ID des enchères disponibles :

{% roboWikiPicture {src:"docs/rws/queue.png", alt:"queue"} %}{% endroboWikiPicture %}

Vous pouvez voir des informations sur n'importe quel abonnement avec `rws` `auction` et l'ID de l'enchère (l'ID de l'enchère sur l'image est 79) :

{% roboWikiPicture {src:"docs/rws/auction.png", alt:"auction"} %}{% endroboWikiPicture %}

Dans les informations sur l'enchère, vous pouvez voir le champ `winner`, pour le moment il est `null`, donc personne n'a cet abonnement et vous pouvez l'obtenir. Pour cela, allez dans `Développeur/Extrinsèque`, choisissez votre compte et `rws -> bid`. Définissez également l'ID de l'enchère (79) et le montant d'unités à enchérir (plus de 1000000000 Wn) :

{% roboWikiPicture {src:"docs/rws/bid.png", alt:"bid"} %}{% endroboWikiPicture %}

Soumettez la transaction et vérifiez les informations sur l'enchère avec l'ID 79 (dans `État de la chaîne`, choisissez `rws -> auction` et l'ID 79) :

{% roboWikiPicture {src:"docs/rws/auc_win.png", alt:"auc_win"} %}{% endroboWikiPicture %}

Maintenant, dans le champ `winner`, vous verrez l'adresse de votre compte, cela signifie que ce compte possède l'abonnement 79. Une enchère commence avec la première offre et dure quelques blocs, donc si quelqu'un offre plus de jetons que vous dans les prochains blocs, cette personne sera le gagnant et obtiendra l'abonnement.

Maintenant, vous pouvez ajouter des appareils. Les appareils sont des comptes capables d'utiliser cet abonnement et de soumettre des extrinsèques sans frais.
Pour tester, créez un nouveau compte sans jetons et ajoutez-le aux appareils.

Pour ajouter des appareils, choisissez `rws -> setDevices` dans `Développeur/Extrinsèque`. Ensuite, appuyez sur le bouton `Ajouter un élément` et choisissez le compte récemment créé sans jetons :

{% roboWikiPicture {src:"docs/rws/set_devices.png", alt:"set_devices"} %}{% endroboWikiPicture %}

Soumettez la transaction. Maintenant, vous pouvez vérifier la liste des appareils dans `État de la chaîne` avec `rws -> devices`. Vous y verrez l'adresse de votre compte sans jetons. Choisissez le compte qui a acheté l'abonnement et appuyez sur `+` :

{% roboWikiPicture {src:"docs/rws/devices.png", alt:"devices"} %}{% endroboWikiPicture %}

Maintenant, vous pouvez essayer d'envoyer une extrinsèque de [lancement](/docs/subscription-launch) en utilisant l'abonnement.