---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Introduction 

Robonomics a transféré le modèle de gouvernance de la parachain vers le mécanisme sophistiqué OpenGov de Polkadot qui permet à la chaîne d'évoluer avec le temps, selon la volonté ultime des détenteurs de jetons.
La transition de Robonomics vers OpenGov garantit que le DAO détenteur de jetons, qui contrôle la majorité des parts, peut toujours commander la direction de la parachain Robonomics, en mettant en œuvre tout changement du réseau qu'il juge approprié.

<robo-wiki-note title='Note:' type="warning">
  OpenGov s'applique uniquement à la parachain Robonomics, qui est une chaîne basée sur Substrate connectée à la chaîne de relais Kusama. OpenGov ne s'applique pas à la mise en œuvre Ethereum de Robonomics, car le réseau principal Ethereum ne prend pas en charge actuellement des systèmes de gouvernance sophistiqués tels que OpenGov.
</robo-wiki-note>

OpenGov modifie la manière dont les opérations quotidiennes et la prise de décision sont effectuées sur la parachain. Il offre une plus grande clarté quant à la portée des référendums et a le potentiel d'augmenter considérablement le débit des décisions prises sur la parachain.

OpenGov est en direct sur la chaîne de relais Kusama depuis quelques mois au moment de la rédaction, et il a prouvé qu'il augmente considérablement le nombre de décisions (référendums individuels et distincts) que le DAO détenteur de jetons peut proposer, voter et, grâce au vote, contrôler ultimement la direction du protocole.

**Le contenu suivant contenu dans cette section du wiki présentera les principes fondamentaux d'OpenGov sur la parachain Robonomics et vise à vous aider à mieux comprendre les concepts derrière OpenGov.**

*Il est important de noter que la gouvernance est un mécanisme en constante évolution dans le protocole, en particulier aux premiers stades de la mise en œuvre.*

Pour ceux qui s'intéressent uniquement aux paramètres de la piste Robonomics OpenGov, voir [ici](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## À propos des référendums

Les référendums sont des schémas de vote simples, inclusifs et basés sur les parts. Chaque référendum est associé à une proposition spécifique qui prend la forme d'un appel de fonction privilégiée dans l'exécution de la chaîne. Cela peut également inclure l'appel le plus puissant `set_code``, qui a la capacité de désactiver l'intégralité du code du runtime des chaînes - ceci est unique aux chaînes basées sur un substrat et supprime l'exigence d'un "hard fork" de la chaîne lors de la mise à jour de la logique métier des chaînes ( Durée).

Les référendums sont des événements distincts qui ont une période de vote fixe (plus d'informations sur les différentes périodes au cours du cycle de vie d'un référendum plus tard). Les détenteurs de jetons individuels peuvent voter de trois manières sur les référendums - AYE (d'accord/oui), NAY (désaccord/non) ou ABSTAIN (s'abstenir de voter entièrement).

Tous les référendums ont un délai d'application qui leur est associé. Il s'agit de la période entre la fin du référendum et, en supposant que le référendum ait été approuvé, la mise en œuvre des changements sur le réseau. 

<robo-wiki-note title='Note:' type="warning">

  Il existe une période d'application **minimum** spécifiquement définie pour chaque type d'Origine, mais l'initiateur d'un référendum particulier peut définir les tâches spécifiques de ce référendum pour qu'elles soient exécutées plusieurs blocs à l'avenir.

</robo-wiki-note>

Les référendums sont considérés comme "cuits" s'ils sont clos et que les votes sont comptabilisés. En supposant que le référendum ait été approuvé, il sera programmé pour être mis en œuvre (dans le planificateur de la chaîne). Les référendums sont considérés comme "non cuits" si le résultat est en attente - par exemple, si le référendum est toujours en cours de vote.

Avec l'ajout d'OpenGov, n'importe qui peut lancer un référendum à tout moment, et il peut le faire autant de fois qu'il le souhaite. OpenGov supprime la limitation d'un seul référendum pouvant être traité à la fois (notez que, dans Gov v1, un seul référendum peut être voté à la fois. La seule exception étant un référendum d'urgence supplémentaire par le comité technique accéléré qui peut également être voté simultanément par la communauté).

OpenGov introduit plusieurs nouvelles fonctionnalités / concepts appelés Origines et Pistes, et ceux-ci sont introduits pour aider à faciliter le flux et le traitement des référendums dans le protocole.

Chaque Origine est associée à une seule classe de référendum, et chaque classe est associée à une piste. La piste décrit le cycle de vie du référendum et est spécifique à cette Origine particulière à partir de laquelle le référendum provient. Le fait d'avoir des pistes avec leurs propres paramètres spécifiques permet au réseau de modifier dynamiquement le cycle de vie des référendums en fonction de leur niveau de privilège (vous pouvez considérer le niveau de privilège comme étant la puissance d'un référendum / les types de changements qu'il peut apporter au protocole).

*Pensez aux Origines comme au pouvoir associé à un référendum, et pensez aux Pistes comme aux paramètres de vote associés à un référendum, tels que la durée de ses périodes et les critères d'approbation et de soutien.*

Par exemple, une mise à niveau de l'exécution n'a pas les mêmes implications pour le protocole qu'un petit pourboire du trésor, et donc différentes origines sont nécessaires dans lesquelles différents taux de participation, approbations, dépôts et périodes d'application (Pistes) seront prédéterminés dans la palette de la chaîne.

## Proposition d'un référendum et cycle de vie du référendum 

### Période de préparation

Dans OpenGov, lorsqu'un référendum est créé initialement, il peut être immédiatement soumis au vote de la communauté des détenteurs de jetons. Cependant, il n'est pas immédiatement dans un état où il peut se terminer, ou avoir ses votes comptabilisés, être approuvé et promulgué sommairement. Au lieu de cela, les référendums doivent remplir un certain nombre de critères avant d'être déplacés dans la période de décision. Jusqu'à ce que les référendums entrent dans la période de décision, ils resteront indécis - et finiront par expirer après la période de cycle de vie globale spécifiée dans la piste individuelle.

<robo-wiki-picture src='robonomics-opengov/1.jpeg' alt="picture" />

Les critères pour qu'un référendum entre dans la période de décision sont les suivants:
1. Une période de préparation qui précise le laps de temps qui doit s'écouler avant que la période de décision puisse commencer. Cette période de préparation aide à atténuer la possibilité de "décision sniper" où un attaquant contrôlant une quantité importante de pouvoir de vote pourrait chercher à utiliser sa grande participation pour faire adopter un référendum immédiatement après sa proposition, contournant ainsi la possibilité pour les autres membres du DAO détenteur de jetons d'avoir suffisamment de temps pour examiner le référendum et participer au vote. C'est pourquoi les origines avec des niveaux de privilège plus élevés ont des périodes de préparation significativement plus longues.

2. Il doit y avoir de la place pour la décision. Chaque piste a ses propres limites pour le nombre de référendums qui peuvent être décidés simultanément (max_deciding). Les pistes qui ont des niveaux de privilège plus élevés auront des limites plus basses. Par exemple, l'origine de niveau Root aura un nombre significativement plus faible de référendums qui peuvent être décidés simultanément par rapport aux origines de niveau de privilège inférieur comme l'origine Small Tipper.

3. Le dépôt de décision doit être soumis. La création initiale d'un référendum est assez bon marché, et la valeur du dépôt de soumission (réservé lors de la création initiale du référendum) est assez faible, et est principalement constituée de la valeur qu'il coûte pour le stockage sur chaîne associé au référendum. Les dépôts de décision sont beaucoup plus élevés, ce qui est nécessaire pour lutter contre le spam, et joue dans le jeu économique qu'OpenGov apporte, que nous verrons plus tard.

Une fois que ces trois critères ci-dessus ont été remplis, le référendum passera à la période de décision. Les votes sur le référendum seront alors comptabilisés pour le résultat.

### Période de décision

*Pour une démonstration vidéo rapide de la période de décision, voir [cette vidéo](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Une fois qu'un référendum a rempli tous les critères détaillés dans la section ci-dessus, il entrera dans la période de décision.

La période de décision tourne autour de deux concepts principaux, à savoir les critères d'approbation et de soutien. 

L'approbation est définie comme la part du poids du vote d'approbation (OUI contre NON) par rapport au poids total du vote (tous les votes OUI et NON combinés). La conviction de chaque vote compte pour le poids global des votes OUI/NON (plus d'informations sur le vote de conviction / blocage volontaire dans une section ultérieure).

Le soutien est le nombre total de votes (jetons) qui ont participé au référendum (et n'est pas ajusté en fonction de la conviction) par rapport au total des votes possibles qui pourraient être effectués dans le système (pensez à cela comme l'émission totale de XRT sur la parachain - notamment, l'offre totale en circulation de XRT n'est pas le facteur principal ici, en raison du fait qu'une partie de ce nombre existe sur Ethereum sous forme de jetons ERC-20).

**Les votes qui sont dans la direction ABSTENTION ne contribuent PAS aux critères d'approbation, mais sont inclus / comptent pour les critères de soutien**

Un référendum doit remplir les critères de soutien ET d'approbation pendant la période de décision afin de progresser vers la période de confirmation.

Pour plus de détails sur les critères de soutien et d'approbation individuels pour chaque piste, consultez cette [feuille de calcul](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Période de confirmation

Chaque piste a sa propre durée spécifique pour sa période de confirmation. Les pistes qui ont des niveaux de privilège plus élevés (comme Root) ont des périodes de confirmation significativement plus longues que celles avec des niveaux de privilège inférieurs (comme Small Tipper).

Les référendums doivent continuer à remplir les critères d'approbation et de soutien pendant toute la durée de la période de confirmation, sinon ils retourneront une fois de plus dans la période de décision (note: la période de décision n'est pas suspendue pendant la période de confirmation, il est donc tout à fait possible qu'une période de décision puisse expirer pendant la période de confirmation, ce qui signifie que si un référendum est exclu de la période de confirmation parce qu'il ne remplit plus les critères d'approbation et de soutien, il sera alors considéré comme un référendum échoué et non promulgué).

**Il est possible d'ajuster les critères d'approbation et de soutien pour chaque piste individuelle grâce à un référendum avec les privilèges d'origine racine.**

Les origines avec des niveaux de privilège inférieurs ont des critères d'approbation et de soutien considérablement plus faciles (fixés par la piste) à remplir que ceux avec des niveaux de privilège plus élevés. De même, les origines avec des niveaux de privilège plus élevés ont des courbes moins abruptes que celles avec moins de privilèges (tel que défini dans la piste), afin de garantir que le DAO détenteur de jetons approuve effectivement le référendum et d'éviter les attaques de référendum pour les origines à privilèges élevés.

Dans OpenGov, les référendums qui ne sont pas approuvés après l'expiration de la période de décision sont considérés comme rejetés par défaut, et les dépôts de soumission et de décision sont remboursés à leurs auteurs (note : le dépôt de décision peut être effectué par quelqu'un d'autre que l'auteur du référendum).

Si un référendum parvient à remplir continuellement les critères d'approbation et de soutien pendant toute la période de confirmation, alors il est considéré comme approuvé et sera programmé pour s'exécuter à partir de l'origine proposée, mais le référendum ne s'exécutera qu'après que la période minimale de mise en vigueur se soit écoulée.

### Période de mise en vigueur

La période de mise en vigueur est spécifiée par l'auteur lorsque le référendum est proposé, mais elle est soumise à la période minimale de mise en vigueur qui est spécifiée dans chaque piste. Les origines plus puissantes ont une période minimale de mise en vigueur beaucoup plus longue que celles avec moins de privilèges. Cela garantit que le réseau dispose d'un temps suffisant pour se préparer à d'éventuels changements que le référendum puissant peut imposer.

## Verrouillage volontaire / Conviction

Robonomics utilise un concept appelé verrouillage volontaire, ou vote par conviction. Cela permet aux détenteurs de jetons d'augmenter leur pouvoir de vote en décidant pendant combien de temps ils sont prêts à verrouiller leurs jetons pour un référendum particulier. Ce mécanisme n'affecte que les critères d'approbation de chaque référendum, et le vote par conviction n'affecte pas les critères de soutien.

Le vote par conviction peut être calculé à l'aide de cette formule :

$$\text{Approval Votes} = \text{Tokens} * \text{Conviction\_Multiplier}$$


Ce tableau vous montre comment chaque niveau croissant de période de verrouillage multiplie votre vote pour les critères d'approbation :

| Lock Periods | Vote Multiplier | Lock Up Days |
|--------------|-----------------|--------------|
| No Lock      | 0.1x            | 0          |
| 1            | 1x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


Le montant maximum de conviction qu'un détenteur de jetons peut utiliser est de 6x conviction. Vous ne pouvez définir la conviction que selon le tableau ci-dessus, et vous ne pouvez pas, par exemple, utiliser une conviction de 5,5x.

Pendant que les jetons sont verrouillés en raison d'un vote, ils peuvent toujours être utilisés pour voter dans d'autres référendums, cependant, ils ne feront pas partie de votre solde transférable (vous ne pouvez pas les envoyer à un autre compte) - et le solde ne redeviendra transférable que lorsque la période de verrouillage entière aura expiré.

## Délégation de vote

Dans OpenGov, un mécanisme a été ajouté pour permettre aux détenteurs de jetons qui n'ont pas nécessairement assez de temps pour examiner chaque référendum de faire quand même utiliser leurs jetons dans le système de gouvernance, cela s'appelle la délégation de vote.

Les détenteurs de jetons peuvent choisir de déléguer leur pouvoir de vote à un autre électeur du système (un autre compte). Les électeurs peuvent spécifier de déléguer leur pouvoir de vote de manière agile, ce qui leur permet d'attribuer leur pouvoir de vote à un compte différent pour chaque Origine individuelle. Les électeurs peuvent également choisir d'attribuer une quantité différente de pouvoir de vote pour chaque Origine (nombre de jetons et niveau de conviction).

Cette fonction de délégation a un objectif, augmenter la participation des électeurs et aider à garantir que les critères d'approbation et de soutien requis sont respectés.

Pour déléguer votre pouvoir de vote, vous pouvez utiliser la fonction "Déléguer" que vous pouvez trouver dans la section Gouvernance -> Référendum du [Portail Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). Alternativement, les utilisateurs peuvent soumettre l'extrinsèque convictionVoting(Déléguer) en utilisant la section Développeur -> Extrinsèques du Portail Robonomics, cependant, utiliser la fonction "Déléguer" de la section référendum du portail est beaucoup plus facile.

## Annulation / Suppression de référendum et jeu économique de gouvernance

Dans OpenGov, il existe des Origines qui sont dédiées à la suppression des référendums en cours, quel que soit leur statut. Il s'agit des pistes de l'Annulateur de gouvernance et du Tueur de gouvernance.

Ces Origines interviennent sur un référendum qui a déjà été voté. Ces Origines, si le référendum provenant d'elles est approuvé, rejetteront immédiatement un référendum en cours, quel que soit son statut. 

L'annulation elle-même est un type de référendum qui doit être voté par les détenteurs de jetons pour être exécuté. L'annulation a sa propre origine et piste qui ont un délai de mise en œuvre plus court (période de décision, etc.), et ont des courbes d'approbation et de soutien avec une courbe plus raide (ce qui signifie que leurs critères sont beaucoup plus faciles à atteindre au fil du temps) que les autres Origines. Cela est dû au fait que l'annulation d'un référendum est généralement accompagnée d'un sentiment d'urgence.

L'Annulateur de gouvernance vise à rejeter instantanément un référendum en cours. Lorsqu'un référendum est annulé par cette origine, le dépôt de soumission et de décision est remboursé à leurs auteurs. Un exemple de situation où un référendum pourrait être considéré comme annulé est si l'auteur a commis une erreur humaine dans le contenu de son référendum, sans nécessairement avoir cherché à faire quelque chose de malveillant.

Le Tueur de gouvernance vise à rejeter instantanément un référendum en cours. C'est là que le jeu économique de gouvernance entre en jeu. Les Origines avec des niveaux de privilège élevés, tels que Root, ont un dépôt de décision qui nécessite un montant élevé de capital (jetons XRT) à déposer pour que le référendum entre dans la période de décision. 

Si un acteur malveillant soumet un référendum, tel qu'un référendum avec des origines Root qui vise à `set_code` du runtime de la chaîne pour quelque chose qui arrêtera la production de blocs de la chaîne, alors le DAO des détenteurs de jetons peut soulever un contre-référendum du Tueur de gouvernance pour punir cette action. Si le référendum malveillant est rejeté via l'origine du Tueur de gouvernance, alors les dépôts de soumission et de décision sont confisqués, ce qui signifie que l'auteur (le(s) compte(s) qui ont posté ces dépôts) perdra ces fonds. 

Cela signifie qu'il y a une conséquence économique grave pour les acteurs malveillants qui tentent de soulever un référendum qui aurait des impacts négatifs graves pour la chaîne, ce qui théoriquement empêchera tout acteur malveillant de tenter de le faire.

Le dépôt de décision pour la piste Governance Killer elle-même est assez élevé, cela afin d'empêcher les acteurs tout aussi malveillants de tenter de réduire les dépôts d'un référendum par ailleurs bon. **Un référendum existant de Governance Killer peut être tué par un référendum ultérieur de Governance Killer.**

## Comité technique Robonomics & Origine autorisée

Ce groupe est un organisme d'experts autonome dont le but principal est de représenter les humains qui incarnent et possèdent les connaissances techniques du protocole réseau Robonomics. 

Ce groupe (et seulement ce groupe) est capable d'initier des référendums à partir de la palette Whitelist. Cette palette ne fait qu'une chose, elle permet à une Origine d'augmenter le niveau de privilège d'une autre Origine pour une certaine opération. 

Ce groupe peut autoriser un référendum à partir d'une origine connue sous le nom de Whitelisted-Root, et ces référendums peuvent être exécutés avec des privilèges de niveau Root, mais ces référendums ne fonctionneront avec succès qu'avec certaines commandes spécifiées qui ont été autorisées par le groupe. La palette Whitelist vérifie deux choses :
1. L'Origine est vraiment la Whitelisted-Root (c'est-à-dire que le référendum est passé par cette piste d'Origine).
2. La proposition a effectivement été ajoutée à la liste blanche par le groupe.

Si les deux conditions sont vraies, alors l'opération s'exécutera avec des privilèges de niveau Root.

Ce système permet d'avoir une nouvelle piste parallèle (Origine Whitelisted-Root), dont les paramètres permettent un délai de vote plus court (les critères d'approbation et de soutien sont légèrement plus faciles à atteindre que pour Root). Ce processus ouvert et transparent permet à ce groupe d'experts du protocole réseau Robonomics de proposer des référendums qu'ils ont jugés sûrs et urgents.

Il convient de noter que les critères de soutien pour les référendums initiés avec l'origine Whitelisted-Root ne tendent pas vers 0 comme beaucoup d'autres origines/pistes. Cela garantit que ce groupe n'a pas le contrôle de facto sur l'ensemble du protocole réseau Robonomics et nécessite un niveau minimum de soutien (participation des électeurs) de l'ensemble des détenteurs de jetons.


## Durée des référendums 

Il est important de comprendre que la durée de chaque référendum individuel n'est pas une chose concrète, elle n'est pas gravée dans le marbre. Certaines périodes du cycle de vie du référendum, telles que la période minimale de mise en œuvre, ont effectivement une durée concrète, mais d'autres, y compris la période de décision, ne l'ont pas. Par exemple, il n'est pas exact d'additionner les durées maximales des périodes de préparation, de décision, de confirmation et de mise en œuvre minimale et de déclarer que « chaque référendum prendra X jours », c'est beaucoup plus fluide que cela.

Prenons cela à travers le prisme de quelques référendums distincts, tous originaires de la même Origine, dans ce cas, l'origine Root. 

L'Origine Root a sa propre piste, où les durées de chaque période sont fixées, ainsi que les courbes d'approbation et de soutien.

Il est important de se rappeler que les référendums ne passeront à la prochaine étape de leur cycle de vie que si certaines conditions sont remplies. 

![](https://i.imgur.com/v9jwqGE.jpg)

Vous devriez supposer dans les images suivantes que, pour qu'un référendum passe à la prochaine étape de son cycle de vie, les conditions décrites dans l'image ci-dessus doivent avoir été remplies (sauf indication contraire).


### Durée maximale possible avec très peu de participation des électeurs

L'image ci-dessous représente la chronologie maximale possible pour un référendum, pensez à cela comme à un référendum qui :
1. A eu son dépôt de décision publié, et est donc entré dans la période de décision.
2. A un seul vote, par exemple, 1 XRT, dans la direction AYE - cela signifie qu'il ne répondra aux exigences de soutien requises (participation des électeurs) qu'à la fin de la période de décision (puisque le soutien global est extrêmement faible), mais a une approbation de 100 %, donc finira par répondre aux exigences pour entrer dans la période de confirmation.
3. Continue à répondre aux critères mentionnés pendant la période de confirmation.
4. La proposition soulevée par le référendum sera promulguée exactement au même bloc que la fin de la période de mise en œuvre minimale - techniquement, l'initiateur du référendum peut fixer les changements réseau tels que détaillés dans le référendum pour promulguer de nombreux blocs dans le futur, donc en réalité, le cycle de vie réel d'un référendum individuel pourrait s'étendre sur plusieurs jours, semaines, mois ou années.

![](https://i.imgur.com/CUwX3kf.jpg)

Nous pouvons voir que dans cet exemple, le cycle de vie du référendum serait (approximativement) de 17 jours.


### Durée avec beaucoup de participation des électeurs (avec un grand nombre de votes AYE)

Jetons maintenant un coup d'œil à un référendum au cours duquel le détenteur du jeton XRT, DAO, a exprimé beaucoup d'intérêt. Dans cet exemple, nous supposerons qu'environ 248 771 XRT de participation électorale globale ont eu lieu et que tous les électeurs votent dans la direction AYE (remarque : techniquement, à ce stade d'un référendum racine, selon la piste, seuls 60 % des votes doivent être dans la direction AYE pour qu'un référendum réponde aux critères d'approbation).

<robo-wiki-note title="Note:" type="warning">

 Consultez toujours les informations les plus récentes sur les pistes pour obtenir des informations précises sur chaque piste. Plus d'informations peuvent être trouvées sur cette [feuille de calcul](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

</robo-wiki-note>

Dans cet exemple :
1. Le dépôt de décision a été affiché pendant la période de préparation et a donc pu passer à la période de décision à la fin de la période de préparation.
2. De nombreux électeurs ont voté lors de ce référendum, obtenant un taux de participation d'environ 248 771 XRT dans un laps de temps relativement court.
3. Les votes étaient majoritaires dans le sens AYE (tout ce qui dépasse 60 % AYE).
4. Le référendum répond continuellement aux critères de la période de confirmation pendant toute sa période de confirmation (Remarque : si un référendum s'arrête pour répondre aux critères de la période de confirmation, il est alors renvoyé à sa période de décision).
5. La proposition soulevée par le référendum sera adoptée exactement sur le même bloc que celui où se termine la période minimale de promulgation.

Étant donné qu'il y a eu environ 248 771 XRT, le référendum remplira les critères pour entrer dans sa période de confirmation après environ 168 heures (7 jours).

![](https://i.imgur.com/Y8Qf2ib.jpg)

Nous pouvons voir que dans ce deuxième exemple, en raison d'une forte participation électorale, la période de décision s'est en fait terminée à mi-chemin de son temps maximum imparti. Il en résulte un référendum qui peut être promulgué dans environ 10 jours.


### Durée pendant laquelle le dépôt de décision n'est jamais affiché

Jetons maintenant un coup d'œil à un référendum qui a été organisé, mais dont le dépôt de décision n'a jamais été publié. De tels référendums se trouvent dans une sorte de « limbes », où leur période de préparation est terminée, mais comme le dépôt de décision n'a pas été déposé, le référendum reste dans « l'État de préparation ».

![](https://i.imgur.com/UK3RsGf.jpg)

Nous pouvons voir que dans ce troisième exemple, du fait que le dépôt de décision n'a jamais été affiché, le référendum n'entrera en réalité jamais dans la période de décision, mais restera dans « l'état de préparation ». Cela signifie qu'à terme, si aucun dépôt de décision n'est jamais enregistré, le référendum expirera une fois la durée spécifiée dans la constante timeOut de la palette écoulée.

Cela s'est déjà produit à Kusama, où un référendum a été publié avec des origines racines, mais en raison des exigences élevées en capital pour publier le dépôt de décision, le référendum n'est jamais entré dans les dernières étapes de son cycle de vie. Un tel référendum se termine par le drapeau « expiration du délai ».


### Durée pendant laquelle le dépôt de décision est posté en retard

Enfin, examinons un exemple dans lequel le dépôt de décision n'a pas été affiché pendant un certain temps après le déclenchement du référendum. Cela s'est déjà produit à Kusama, où un référendum a été publié avec l'origine racine, mais l'initiateur a dû passer du temps à trouver quelqu'un disposant d'un capital élevé pour publier le dépôt de décision en son nom.

![](https://i.imgur.com/egVeaUh.jpg)

Dans ce dernier exemple, étant donné que le dépôt de décision a été publié après la fin de la période de préparation, mais avant la fin du référendum, le cycle de vie du référendum est en réalité beaucoup plus long que la normale, car il entre dans la période de décision après une durée plus longue.

Il est important de noter que le détenteur du jeton DAO est en mesure de voter AYE/NAY sur les référendums qui sont en période de préparation, ou bloqués dans « l'État de préparation ».
