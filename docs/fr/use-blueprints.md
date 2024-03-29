---
title: Comment utiliser les plans
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Dans cet article, vous apprendrez comment ajouter des plans d'automatisation à votre Home Assistant et les configurer.

## Automatisations de plan

Certains plans sont déjà installés. Les automatisations basées sur de tels plans doivent simplement être configurées. Dans l'interface web, vous pouvez trouver des plans préinstallés dans `Settings/Automations & Scenes`. Ouvrez `Blueprints` et trouvez le plan que vous souhaitez utiliser. Dans cet exemple, `Motion-activated Light` sera utilisée. 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

Cliquez sur `Create Automation` pour ouvrir l'éditeur d'automatisation. Donnez un nom, choisissez un plan à utiliser (`Motion-activated Light` dans notre cas). Ensuite, vous devez choisir un capteur de mouvement et une lampe. Lorsque la configuration est terminée, cliquez sur `Save`.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation Configuration" />

Si vous souhaitez apporter des modifications, vous pouvez le trouver en allant dans `Settings/Automations & Scenes`, puis `Automations`.

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## Importation de plans

Home Assistant peut importer des plans à partir des forums Home Assistant, de GitHub et de GitHub gists. La liste de tous les plans se trouve sur [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Après avoir fait votre choix, allez dans `Settings/Automations & Scenes` et ouvrez `Blueprints`. Cliquez sur `Import Blueprint` et insérez l'URL du plan choisi. Ensuite, cliquez sur `PREVIEW BLUEPRINT`. Dans ce cas, nous utiliserons [Détection et notification du niveau de batterie faible pour tous les capteurs de batterie](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

Cela chargera le plan et affichera un aperçu dans la boîte de dialogue d'importation. Vous pouvez changer le nom et terminer l'importation. Cliquez sur `Create Automation` pour ouvrir l'éditeur d'automatisation. Ici, vous pouvez configurer les paramètres de l'automatisation et ajouter des actions pour recevoir des notifications.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 