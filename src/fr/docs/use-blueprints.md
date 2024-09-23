---
title: Comment utiliser les plans
contributors: [tubleronchik]
outils:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Dans cet article, vous apprendrez comment ajouter des plans d'automatisation à votre Home Assistant et les configurer.

## Automatisations de plan

Certains plans sont déjà installés. Les automatisations basées sur ces plans doivent simplement être configurées. Dans l'interface web, vous pouvez trouver des plans préinstallés dans `Paramètres/Automatisations & Scènes`. Ouvrez `Plans` et trouvez le plan que vous souhaitez utiliser. Dans cet exemple, `Lumière activée par le mouvement` sera utilisée.

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"Paramètres du plan"} %}{% endroboWikiPicture %}

Cliquez sur `Créer une automatisation` pour ouvrir l'éditeur d'automatisation. Donnez un nom, choisissez un plan à utiliser (`Lumière activée par le mouvement` dans notre cas). Ensuite, vous devez choisir le capteur de mouvement et la lampe. Lorsque la configuration est terminée, cliquez sur `Enregistrer`.

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"Configuration de l'automatisation"} %}{% endroboWikiPicture %}

Si vous souhaitez apporter des modifications, vous pouvez le trouver en allant dans `Paramètres/Automatisations & Scènes`, puis `Automatisations`.

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"Liste des automatisations"} %}{% endroboWikiPicture %}

## Importation de plans

Home Assistant peut importer des plans à partir des forums Home Assistant, de GitHub et des gists GitHub. La liste de tous les plans se trouve sur [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Après avoir fait votre choix, allez dans `Paramètres/Automatisations & Scènes` et ouvrez `Plans`. Cliquez sur `Importer un plan` et insérez l'URL du plan choisi. Ensuite, cliquez sur `APERÇU DU PLAN`. Dans ce cas, nous utiliserons [Détection et notification du niveau de batterie faible pour tous les capteurs de batterie](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664).

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"Importation du plan"} %}{% endroboWikiPicture %}

Cela chargera le plan et affichera un aperçu dans la boîte de dialogue d'importation. Vous pouvez changer le nom et terminer l'importation. Cliquez sur `Créer une automatisation` pour ouvrir l'éditeur d'automatisation. Ici, vous pouvez configurer les paramètres de l'automatisation et ajouter des actions pour recevoir des notifications.

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"Configurer le plan de batterie"} %}{% endroboWikiPicture %}