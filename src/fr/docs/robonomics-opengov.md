---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Introduction

Robonomics a déplacé le modèle de gouvernance de la parachain vers le mécanisme sophistiqué OpenGov de Polkadot qui permet à la chaîne d'évoluer avec le temps, ultimement sous l'autorité des détenteurs de jetons.
La transition de Robonomics vers OpenGov garantit que le DAO des détenteurs de jetons, qui contrôle la majorité des parts, peut toujours dicter la direction de la parachain de Robonomics, en mettant en œuvre tout changement sur le réseau qu'ils jugent approprié.

{% roboWikiNote {title:"Remarque:", type: "warning"}%} OpenGov s'applique uniquement à la parachain Robonomics qui est une chaîne basée sur Substrate connectée à la chaîne de relais Kusama. OpenGov n'est pas applicable à l'implémentation Ethereum de Robonomics, car le réseau principal Ethereum ne prend pas en charge actuellement des systèmes de gouvernance sophistiqués tels qu'OpenGov {% endroboWikiNote %}

OpenGov modifie la façon dont les opérations quotidiennes et la prise de décision sont effectuées sur la parachain. Il offre une plus grande clarté quant à la portée des référendums et a le potentiel d'augmenter considérablement le débit des décisions prises sur la parachain.

OpenGov est en direct sur la chaîne de relais Kusama depuis quelques mois au moment de la rédaction, et a prouvé qu'il augmente considérablement le nombre de décisions (référendums individuels et distincts) que le DAO des détenteurs de jetons peut proposer, voter et, par le vote - contrôler ultimement la direction du protocole.

**Le contenu suivant de cette section du wiki examinera les principes fondamentaux d'OpenGov sur la parachain Robonomics et vise à vous aider à mieux comprendre les concepts derrière OpenGov.**

*Il est important de noter que la gouvernance est un mécanisme en constante évolution dans le protocole, surtout aux premiers stades de sa mise en œuvre.*

Pour ceux qui s'intéressent uniquement aux paramètres de suivi de l'OpenGov de Robonomics, consultez [ici](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## À propos des référendums

Les référendums sont des schémas de vote simples, inclusifs et basés sur les parts. Chaque référendum est associé à une proposition spécifique qui prend la forme d'un appel de fonction privilégiée dans le runtime des chaînes. Cela peut également inclure l'appel le plus puissant `set_code`, qui a la capacité de remplacer l'intégralité du code dele temps d'exécution des chaînes - ceci est unique aux chaînes basées sur Substrate, et élimine le besoin d'un "hard fork" de la chaîne lors de la mise à jour de la logique métier des chaînes (temps d'exécution).

Les référendums sont des événements distincts qui ont une période de vote fixe (plus d'informations sur les différentes périodes pendant le cycle de vie d'un référendum plus tard). Les détenteurs de jetons individuels peuvent voter de trois manières sur les référendums - OUI (d'accord/oui), NON (désaccord/non), ou S'ABSTENIR de voter entièrement.

Tous les référendums ont un délai d'entrée en vigueur associé. Il s'agit de la période entre la fin du référendum et, en supposant que le référendum a été approuvé, les changements étant promulgués sur le réseau.

{% roboWikiNote {title:"Note:", type: "warning"}%} Il y a une Période d'Entrée en Vigueur **Minimum** spécifiquement définie pour chaque type d'Origine différent, mais l'initiateur d'un référendum particulier peut définir les tâches spécifiques de ce référendum pour être exécutées plusieurs blocs dans le futur {% endroboWikiNote %}

Les référendums sont considérés comme "cuits" s'ils sont clos et que les votes sont comptabilisés. En supposant que le référendum a été approuvé, il sera programmé pour être promulgué (dans le planificateur de la chaîne). Les référendums sont considérés comme "non cuits" si le résultat est en attente - comme si le référendum était encore en cours de vote.

Avec l'ajout d'OpenGov, n'importe qui peut lancer un référendum à tout moment, et ce, autant de fois qu'il le souhaite. OpenGov supprime la limitation selon laquelle un seul référendum peut être traité à la fois (notez que, dans Gov v1, un seul référendum peut être voté à la fois. La seule exception étant un référendum d'urgence supplémentaire par le Comité Technique accéléré qui peut également être voté simultanément par la communauté).

OpenGov introduit plusieurs nouvelles fonctionnalités/concepts appelés Origines et Pistes, et ceux-ci sont introduits pour aider à faciliter le flux et le traitement des référendums dans le protocole.

Chaque Origine est associée à une seule classe de référendum, et chaque classe est associée à une piste. La piste décrit le cycle de vie du référendum et est spécifique à l'Origine particulière à partir de laquelle le référendum provient. Avoir des pistes avec leurs propres paramètres spécifiques permet au réseau de modifier dynamiquement le cycle de vie des référendums en fonction de leur niveau de privilège (vous pouvez penser au niveau de privilège comme étant la puissance qu'un référendum peut avoir / quels types de changements il peut apporter au protocole).

*Pensez aux Origines comme au pouvoir associé à un référendum, et pensez aux Pistes commeLes paramètres de vote associés à un référendum, tels que la durée de ses périodes, et les critères d'approbation et de soutien.*

Par exemple, une mise à niveau en cours d'exécution n'a pas les mêmes implications pour le protocole qu'un petit pourboire de trésorerie, et donc des origines différentes sont nécessaires dans lesquelles des taux de participation, des approbations, des dépôts et des périodes d'application (Tracks) différents seront prédéterminés dans le pallet des chaînes.

## Proposition d'un référendum & Cycle de vie du référendum

### Période de préparation

Dans OpenGov, lorsqu'un référendum est créé initialement, il peut être immédiatement voté par la communauté des détenteurs de jetons. Cependant, il n'est pas immédiatement dans un état où il peut se terminer, ou avoir ses votes comptabilisés, être approuvé et ensuite promulgué. Au lieu de cela, les référendums doivent remplir un certain nombre de critères avant d'être déplacés dans la Période de décision. Jusqu'à ce que les référendums entrent dans la Période de décision, ils resteront indécis - et finiront par expirer après la période de cycle de vie globale telle que spécifiée dans la piste individuelle.

{% roboWikiPicture {src:"docs/robonomics-opengov/1.jpeg", alt:"image"} %}{% endroboWikiPicture %}

Les critères pour qu'un référendum entre dans la Période de décision sont les suivants :
1. Une Période de préparation qui définit la durée qui doit s'écouler avant que la Période de décision puisse commencer. Cette Période de préparation aide à atténuer la possibilité de "sniping de décision" où un attaquant contrôlant une quantité substantielle de pouvoir de vote pourrait chercher à utiliser sa grande participation pour faire passer un référendum immédiatement après sa proposition, contournant ainsi la possibilité pour les autres membres du DAO détenteur de jetons d'avoir le temps nécessaire pour considérer le référendum et participer au vote. C'est pourquoi les Origines avec des niveaux de privilège plus élevés ont des Périodes de préparation significativement plus longues.

2. Il doit y avoir de la place pour la décision. Chaque piste a ses propres limites pour le nombre de référendums qui peuvent être décidés simultanément (max_deciding). Les pistes qui ont des niveaux de privilège plus élevés auront des limites plus basses. Par exemple, l'origine de niveau Root aura un nombre significativement plus faible de référendums qui peuvent être décidés simultanément par rapport aux origines de niveau de privilège inférieur comme l'origine de Small Tipper.

3. Le Dépôt de décision doit être soumis. Créer initialement un référendum est assez bon marché, et la valeur du Dépôt de soumission (réservé lors de la création initiale du référendum) est assez faible, et est principalement composée de la valeur qu'il en coûte pour le stockage sur chaîne associé au référendum. Les Dépôts de décision sont significativement plus élevés, ce qui est nécessaire pour lutter contre le spam., et participe au jeu économique qu'OpenGov apporte, que nous verrons plus tard.

Une fois que ces trois critères ci-dessus ont été remplis, le référendum passera à la Période de Décision. Les votes sur le référendum seront alors comptabilisés pour le résultat.

### Période de Décision

*Pour une démonstration vidéo rapide de la Période de Décision, consultez [cette vidéo](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Une fois qu'un référendum a rempli tous les critères détaillés dans la section ci-dessus, il entrera dans la Période de Décision.

La Période de Décision tourne autour de deux concepts principaux, à savoir les critères d'Approbation et de Soutien.

L'Approbation est définie comme la part du poids du vote d'approbation (OUI contre NON) par rapport au poids total du vote (tous les votes OUI et NON combinés). La conviction de chaque vote compte pour le poids global des votes OUI/NON (plus d'informations sur le vote de conviction / le verrouillage volontaire dans une section ultérieure).

Le Soutien est le nombre total de votes (jetons) qui ont participé au référendum (et n'est pas ajusté pour la conviction) par rapport au nombre total de votes possibles qui pourraient être effectués dans le système (pensez à cela comme l'émission totale de XRT sur la parachain - notamment, l'offre totale en circulation de XRT n'est pas le facteur principal ici, en raison du fait qu'une partie de ce nombre existe sur Ethereum sous forme de jetons ERC-20).

**Les votes qui vont dans la direction de l'ABSTENTION ne contribuent PAS aux critères d'Approbation, mais sont inclus / comptent pour les critères de Soutien**

Un référendum doit remplir les critères de Soutien ET d'Approbation pendant la Période de Décision afin de progresser vers la Période de Confirmation.

Pour les détails des critères individuels de Soutien et d'Approbation pour chaque piste, consultez ce [tableur](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Période de Confirmation

Chaque piste a sa propre durée spécifique pour sa Période de Confirmation. Les pistes qui ont des niveaux de privilège plus élevés (comme Root) ont des Périodes de Confirmation significativement plus longues que celles avec des niveaux de privilège plus bas (comme Small Tipper).

Les référendums doivent continuer à remplir les critères d'Approbation et de Soutien pendant toute la durée de la Période de Confirmation, sinon ils retourneront une fois de plus à la Période de Décision (note : la Période de Décision n'est pas suspendue pendant la Période de Confirmation, il est donc tout à fait possible queUn délai de décision peut expirer pendant la période de confirmation, ce qui signifie que si un référendum est exclu de la période de confirmation car il ne répond plus aux critères d'approbation et de soutien, il sera alors considéré comme un référendum échoué et non promulgué).

**Il est possible d'ajuster les critères d'approbation et de soutien pour des pistes individuelles via un référendum avec des privilèges d'origine racine.**

Les origines avec des niveaux de privilège plus bas ont des critères d'approbation et de soutien considérablement plus faciles à atteindre (définis par la piste) que ceux avec des niveaux de privilège plus élevés. De même, les origines avec des niveaux de privilège plus élevés ont des courbes moins abruptes que celles avec moins de privilèges (tel que défini dans la piste), afin de garantir que le DAO détenteur de jetons approuve effectivement le référendum et d'éviter le "sniping" de référendum pour les référendums d'origine à haut privilège.

Dans OpenGov, les référendums qui ne sont pas approuvés après l'expiration du délai de décision sont considérés comme rejetés par défaut, et les dépôts de soumission et de décision sont remboursés à leurs auteurs (note : le dépôt de décision peut être effectué par quelqu'un d'autre que l'auteur du référendum).

Si un référendum parvient à respecter continuellement les critères d'approbation et de soutien pour toute la période de confirmation, il est considéré comme approuvé et sera programmé pour être exécuté à partir de l'origine proposée, mais le référendum ne sera exécuté qu'après que la période minimale de promulgation se soit écoulée.

### Période de promulgation

La période de promulgation est spécifiée par l'auteur lorsque le référendum est proposé, mais elle est soumise à la période minimale de promulgation qui est spécifiée dans chaque piste. Les origines plus puissantes ont une période minimale de promulgation beaucoup plus longue que celles avec moins de privilèges. Cela garantit que le réseau dispose de suffisamment de temps pour se préparer à d'éventuels changements que pourrait imposer un référendum puissant.

## Verrouillage volontaire / Conviction

Robonomics utilise un concept appelé verrouillage volontaire, ou vote par conviction. Cela permet aux détenteurs de jetons d'augmenter leur pouvoir de vote en décidant pendant combien de temps ils sont prêts à verrouiller leurs jetons pour un référendum particulier. Ce mécanisme n'affecte que les critères d'approbation pour chaque référendum, et le vote par conviction n'affecte pas les critères de soutien.

Le vote par conviction peut être calculé en utilisant cette formule :

$$\text{Votes d'approbation} = \text{Jetons} * \text{Multiplicateur de conviction}$$

Ce tableau vous montre comment chaque niveau croissant de période de verrouillage multiplie votre vote pour les critères d'approbation :

| Périodes de verrouillage | Multiplicateur de vote | Jours de verrouillage |
|--------------------------|------------------------|----------------------|
| Aucun verrouillage       | 0,1x                   | 0                    |
| 1                        | 1                      | 1                    |x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


Le montant maximum de conviction qu'un détenteur de jetons peut utiliser est de 6x la conviction. Vous ne pouvez définir la conviction que selon le tableau ci-dessus, et vous ne pouvez pas, par exemple, utiliser une conviction de 5,5x.

Bien qu'un jeton soit verrouillé en raison d'un vote, il peut toujours être utilisé pour voter dans d'autres référendums, cependant, il ne fera pas partie de votre solde transférable (vous ne pouvez pas l'envoyer à un autre compte) - et le solde ne redeviendra transférable que lorsque la période de verrouillage entière aura expiré.

## Délégation de vote

Dans OpenGov, un mécanisme a été ajouté afin de permettre aux détenteurs de jetons qui n'ont pas nécessairement le temps de passer en revue chaque référendum de faire toujours utiliser leurs jetons dans le système de gouvernance, cela est connu sous le nom de délégation de vote.

Les détenteurs de jetons peuvent choisir de déléguer leur pouvoir de vote à un autre électeur du système (un autre compte). Les électeurs peuvent spécifier de déléguer leur pouvoir de vote de manière agile, leur permettant d'attribuer leur pouvoir de vote à un compte différent pour chaque Origine individuelle. Les électeurs peuvent également choisir d'attribuer une quantité différente de pouvoir de vote pour chaque Origine (nombre de jetons et niveau de conviction).

Cette fonction de délégation a un seul objectif, augmenter le taux de participation des électeurs, et aider à garantir que les taux de participation requis pour répondre aux critères d'approbation et de soutien sont atteints.

Pour déléguer votre pouvoir de vote, vous pouvez utiliser la fonction "Déléguer" que vous pouvez trouver dans la section Gouvernance -> Référendum du [Portail Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). Alternativement, les utilisateurs peuvent soumettre l'extrinsèque convictionVoting(Delegate) en utilisant la section Développeur -> Extrinsèques du Portail Robonomics, cependant, utiliser la fonction "Déléguer" de la section référendum du portail est bien plus simple.

## Annulation / Abandon du référendum et le jeu économique de gouvernance

Dans OpenGov, il existe des Origines dédiées à rejeter les référendums en cours, quel que soit leur statut. Ceux-ci sont connus sous le nom de Cancelleur de Gouvernance et Tueur de Gouvernance.pistes.

Ces Origines interviennent sur un référendum qui a déjà été voté. Ces Origines, si le référendum à l'origine d'elles est approuvé, rejetteront immédiatement un référendum en cours, quel que soit son statut.

L'annulation elle-même est un type de référendum qui doit être voté par les détenteurs de jetons pour être exécuté. L'annulation a sa propre origine et piste qui ont un délai de traitement plus court (Période de Décision, etc.), et ont des courbes d'Approbation et de Soutien avec une courbe plus raide (ce qui signifie que leurs critères sont beaucoup plus faciles à remplir au fil du temps) que les autres Origines. Cela est dû au fait que l'annulation d'un référendum est généralement associée à un sentiment d'urgence.

Le Canceller de Gouvernance vise à rejeter instantanément un référendum en cours. Lorsqu'un référendum est annulé par cette origine, à la fois le Dépôt de Soumission et de Décision sont remboursés à leurs initiateurs. Un exemple de cas où un référendum pourrait être considéré comme annulé est si l'initiateur a commis une erreur humaine dans le contenu de son référendum, sans nécessairement avoir cherché à faire quelque chose de malveillant.

Le Killer de Gouvernance vise à rejeter instantanément un référendum en cours. C'est là que le jeu économique de la gouvernance entre en jeu. Les Origines avec des niveaux de privilège élevés, tels que Root, ont un Dépôt de Décision qui nécessite une grande quantité de capital (jetons XRT) à déposer pour que le référendum entre dans la Période de Décision.

Si un acteur malveillant soumet un référendum, tel qu'un référendum avec des origines Root qui vise à `set_code` de l'exécution de la chaîne pour quelque chose qui arrêtera la production de blocs de la chaîne, alors le DAO des détenteurs de jetons peut soulever un contre-référendum Killer de Gouvernance pour punir cette action. Si le référendum malveillant est rejeté via l'origine Killer de Gouvernance, alors à la fois les dépôts de Soumission et de Décision sont réduits, ce qui signifie que l'initiateur (le ou les comptes qui ont posté ces dépôts) perdront ces fonds.

Cela signifie qu'il y a une conséquence économique grave pour les acteurs malveillants qui tentent de soulever un référendum qui aurait des impacts négatifs graves pour la chaîne, ce qui, en théorie, empêchera tout acteur malveillant de tenter de le faire.

Le Dépôt de Décision pour la piste Killer de Gouvernance lui-même est assez élevé, ceci afin d'empêcher des acteurs tout aussi malveillants de tenter de réduire les dépôts de référendums par ailleurs bons. **Un référendum Killer de Gouvernance existant peut être annulé par un référendum Killer de Gouvernance ultérieur.**

## Comité Technique Robonomics & Origine sur Liste Blanche

Ce groupe est un organe d'experts autogouverné dont l'objectif principal est de représenter les humains qui incarnent et possèdent les connaissances techniques du protocole réseau Robonomics.Le groupe (et seulement ce groupe) est capable d'initier des référendums à partir du module Whitelist. Ce module a une seule fonction, il permet à un Origine d'augmenter le niveau de privilège d'un autre Origine pour une certaine opération.

Ce groupe peut autoriser des référendums à partir d'une origine connue sous le nom de Whitelisted-Root, et ces référendums peuvent être exécutés avec des privilèges de niveau Root, mais ces référendums ne fonctionneront avec succès qu'avec certaines commandes spécifiées qui ont été autorisées par le groupe. Le module Whitelist vérifie deux choses :
1. L'Origine est vraiment le Whitelisted-Root (c'est-à-dire que le référendum est passé par cette piste d'Origine).
2. La proposition a effectivement été ajoutée à la liste blanche par le groupe.

Si les deux conditions sont remplies, l'opération sera exécutée avec des privilèges de niveau Root.

Ce système permet d'avoir une nouvelle piste parallèle (Origine Whitelisted-Root), dont les paramètres permettent un délai de vote plus court (les critères d'approbation et de soutien sont légèrement plus faciles à atteindre que pour Root). Ce processus ouvert et transparent permet à ce groupe d'experts du Protocole du Réseau Robonomics de proposer des référendums qu'ils ont jugés sûrs et urgents.

Il convient de noter que les critères de soutien pour les référendums initiés avec l'origine Whitelisted-Root ne tendent pas vers 0 comme c'est le cas pour de nombreuses autres origines/pistes. Cela garantit que ce groupe n'a pas un contrôle de facto sur l'ensemble du Protocole du Réseau Robonomics, et nécessite un niveau minimum de soutien (participation des électeurs) de l'ensemble des détenteurs de jetons DAO.

## Durées des Référendums

Il est important de comprendre que la durée de chaque référendum individuel n'est pas une chose concrète, elle n'est pas figée. Certains moments du cycle de vie du référendum, tels que la période minimale de promulgation, ont en effet une durée concrète, cependant - d'autres, y compris la période de décision, n'en ont pas. Par exemple, il n'est pas exact d'additionner les durées maximales des périodes de Préparation, de Décision, de Confirmation et de Promulgation Minimale et de déclarer que "chaque référendum prendra X jours", c'est beaucoup plus fluide que cela.

Penchons-nous sur cela à travers quelques référendums distincts, tous issus de la même Origine, dans ce cas, l'origine Root.

L'Origine Root a sa propre piste, où les durées de chaque période sont définies, ainsi que les courbes d'approbation et de soutien.

Il est important de se rappeler que les référendums ne passeront à la prochaine étape de leur cycle de vie que si certaines conditions sont remplies.{% roboWikiPicture {src:"docs/robonomics-opengov/2.jpeg", alt:"image"} %}{% endroboWikiPicture %}

Il faut supposer, dans les images suivantes, que pour qu'un référendum passe à la prochaine étape de son cycle de vie, les conditions décrites dans l'image ci-dessus doivent avoir été remplies (sauf indication contraire).

### Durée maximale possible avec très peu de participation des électeurs

L'image ci-dessous représente la chronologie maximale possible pour un référendum, pensez à un référendum qui :
1. A posté son Dépôt de Décision et est donc entré dans la Période de Décision.
2. A un seul vote, par exemple, 1 XRT, dans le sens AYE - cela signifiera qu'il ne répondra aux exigences de Support (participation des électeurs) qu'à la toute fin de la Période de Décision (puisque le Support global est extrêmement faible), mais a un taux d'Approbation de 100 %, il répondra donc éventuellement aux exigences pour entrer dans la Période de Confirmation.
3. Continue à remplir les critères susmentionnés pendant la Période de Confirmation.
4. La proposition soulevée par le référendum sera promulguée exactement au même bloc que la fin de la Période de Promulgation Minimale - techniquement, l'initiateur du référendum peut définir les changements réseau tels que détaillés dans le référendum pour promulguer de nombreux blocs à l'avenir, donc en réalité, le cycle de vie réel d'un référendum individuel pourrait s'étendre sur plusieurs jours, semaines, mois ou années.

{% roboWikiPicture {src:"docs/robonomics-opengov/3.jpeg", alt:"image"} %}{% endroboWikiPicture %}

Nous pouvons voir que dans cet exemple, le cycle de vie du référendum serait (approximativement) de 17 jours.

### Durée avec une forte participation des électeurs (avec un grand nombre de votes AYE)

Maintenant, regardons un référendum où le DAO détenteur de jetons XRT a exprimé beaucoup d'intérêt. Dans cet exemple, nous supposerons qu'environ 248 771 XRT de participation électorale globale ont eu lieu, et que tous les électeurs votent dans le sens AYE (note : techniquement, à ce stade d'un référendum Racine, selon la piste, seuls 60 % des votes doivent être dans le sens AYE pour qu'un référendum réponde aux critères d'Approbation).

{% roboWikiNote {title:"Remarque :", type: "avertissement"}%} Consultez toujours les informations de piste les plus à jour pour des informations précises concernant chaque Piste, plus d'informations peuvent être trouvées sur ce [tableur.](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).
{% endroboWikiNote %}

Dans cet exemple :
1. Le dépôt de décision a été publié pendant la période de préparation, et donc il a pu passer à la période de décision à la fin de la période de préparation.
2. De nombreux électeurs ont voté lors de ce référendum - obtenant un taux de participation des électeurs d'environ 248 771 XRT en peu de temps.
3. Les votes étaient majoritaires dans le sens du OUI (tout ce qui est au-dessus de 60 % de OUI).
4. Le référendum répond continuellement aux critères de la période de confirmation pour toute sa période de confirmation (Remarque : Si un référendum cesse de répondre aux critères de la période de confirmation, il est renvoyé à sa période de décision).
5. La proposition soulevée par le référendum sera promulguée exactement sur le même bloc que celui où la période minimale de promulgation se termine.

En raison du fait qu'il y a eu un taux de participation d'environ 248 771 XRT, le référendum répondra aux critères pour entrer dans sa période de confirmation après environ 168 heures (7 jours).

{% roboWikiPicture {src:"docs/robonomics-opengov/4.jpeg", alt:"image"} %}{% endroboWikiPicture %}

Nous pouvons voir que dans ce deuxième exemple, en raison du fait qu'il y a eu un bon taux de participation des électeurs, la période de décision s'est en fait terminée à mi-chemin de son temps maximum alloué. Résultant en un référendum qui peut être promulgué en environ 10 jours.


### Durée lorsque le dépôt de décision n'est jamais publié

Maintenant, regardons un référendum qui a été initié, mais dont le dépôt de décision n'a jamais été publié. De tels référendums se trouvent dans un état de "limbes", où leur période de préparation est terminée, mais comme le dépôt de décision n'a pas été publié, le référendum reste dans l'état de "Préparation".

{% roboWikiPicture {src:"docs/robonomics-opengov/5.jpeg", alt:"image"} %}{% endroboWikiPicture %}

Nous pouvons voir que dans ce troisième exemple, en raison du fait que le dépôt de décision n'a jamais été publié, le référendum n'entrera en fait jamais dans la période de décision, mais restera dans l'état de "Préparation". Cela signifie qu'à terme, si aucun dépôt de décision n'est jamais publié, le référendum expirera après la durée spécifiée dans la constante timeOut.Le délai de dépôt de la décision est écoulé.

Cela s'est déjà produit sur Kusama, où un référendum a été publié avec des origines Root, mais en raison des exigences en capital élevé pour déposer le Dépôt de Décision, le référendum n'a jamais atteint les dernières étapes de son cycle de vie. De tels référendums se terminent par le drapeau "timed out".

### Durée lorsque le Dépôt de Décision est posté en retard

Enfin, examinons un exemple où le Dépôt de Décision n'a pas été posté pendant un certain temps après l'origine du référendum. Cela s'est déjà produit sur Kusama où un référendum a été publié avec l'origine Root, mais l'initiateur a dû prendre du temps pour trouver quelqu'un disposant d'un montant élevé de capital pour déposer le Dépôt de Décision en son nom.

{% roboWikiPicture {src:"docs/robonomics-opengov/6.jpeg", alt:"image"} %}{% endroboWikiPicture %}

Dans cet exemple final, étant donné que le Dépôt de Décision a été posté après la fin de la Période de Préparation, mais avant que le référendum n'expire, le cycle de vie du référendum est en réalité beaucoup plus long que la normale, car il entre dans la Période de Décision après un laps de temps plus long.

Il est important de noter que le DAO des détenteurs de jetons peut voter AYE/NAY sur les référendums qui se trouvent dans la Période de Préparation, ou bloqués dans l'état de "Préparation".