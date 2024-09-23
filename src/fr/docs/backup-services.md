---
title: Services de sauvegarde

contributors: [tubleronchik, LoSk-p]
tools:
  - Intégration Robonomics Home Assistant 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Dans cet article, vous apprendrez comment générer des sauvegardes de votre configuration Home Assistant et la restaurer en cas de besoin. Pour créer des sauvegardes, un service est appelé pour générer une archive sécurisée avec des fichiers de configuration. Le service ajoute également la configuration de Mosquitto broker et Zigbee2MQTT à la sauvegarde si elle existe. Ensuite, ce service ajoute l'archive à IPFS et stocke le CID résultant dans Robonomics Digital Twin.**
## Création d'une sauvegarde de la configuration Home Assistant

Créer une sauvegarde vous permet de restaurer facilement votre configuration Home Assistant en cas de panne.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "ATTENTION"}%}Pour sauvegarder et restaurer votre configuration, il est nécessaire d'utiliser une **passerelle IPFS personnalisée** telle que Pinata. Sans cela, votre sauvegarde sera stockée uniquement sur votre nœud IPFS local, ce qui pourrait vous empêcher de restaurer votre configuration Home Assistant en cas de défaillance du nœud local.
{% endroboWikiNote %}

1. Dans l'interface web de Home Assistant, allez dans `Outils de développement` -> `Services`. Recherchez `Robonomics: Enregistrer la sauvegarde dans Robonomics` et appuyez sur `APPELER LE SERVICE`.

2. Attendez de voir la notification `La sauvegarde a été mise à jour dans Robonomics` apparaître dans `Notification`.


{% roboWikiNote {type: "warning", title: "ATTENTION"}%} Ne tentez pas de créer une sauvegarde ou de restaurer la configuration immédiatement après le chargement de Home Assistant et de l'intégration Robonomics. Veuillez **attendre environ 5 minutes** pour permettre la finalisation de la configuration initiale. {% endroboWikiNote %}

Arguments du service :
- **Sauvegarde complète** (par défaut : False) - ajoute la base de données à la sauvegarde, de sorte que l'historique des états des entités soit également stocké.
- **Chemin vers le fichier de mot de passe mosquitto** (par défaut : `/etc/mosquitto`) - Si vous avez utilisé les méthodes d'installation Home Assistant Core ou Docker et que vous n'avez pas le chemin par défaut vers le courtier Mosquitto, vous devez modifier ce paramètre. *Non nécessaire pour Home Assistant OS ou Superviser*.

## Restauration de la configuration de Home Assistant à partir de la sauvegarde

Pour restaurer votre configuration, vous aurez besoin d'un Home Assistant installé et de l'intégration Robonomics.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Pour garantir le succès de la restauration de votre configuration dans Home Assistant Core et les méthodes d'installation Docker, vous devez effectuer des étapes de configuration supplémentaires telles que décrites à la fin de la page.
{% endroboWikiNote %}

1. Installez Home Assistant avec l'intégration Robonomics (si ce n'est pas déjà fait), en suivant les étapes de l'article pour la [méthode d'installation souhaitée](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Configurez l'intégration Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) en utilisant **les mêmes seeds** que ceux utilisés dans la configuration Robonomics précédente. Si votre abonnement est arrivé à expiration, [réactivez-le](https://wiki.robonomics.network/docs/sub-activate).

3. Dans l'interface web de Home Assistant, allez dans `Outils de développement` -> `Services`. Recherchez `Robonomics: Restaurer à partir de la sauvegarde dans Robonomics` et appuyez sur `APPELER LE SERVICE`. Accédez à la page `Vue d'ensemble` pour vérifier l'état de votre sauvegarde.

4. Après la restauration, Home Assistant redémarrera automatiquement. Si pour une raison quelconque Home Assistant ne redémarre pas, vous pouvez vérifier l'état de la restauration en surveillant l'état de l'entité `robonomics.backup`. Si l'état est `restored`, vous devrez redémarrer manuellement Home Assistant en accédant à `Paramètres` > `Système` et en cliquant sur le bouton `REDÉMARRER` situé dans le coin supérieur droit.

5. Si votre sauvegarde inclut la configuration Zigbee2MQTT ou Mosquitto, vous devez redémarrer ces services pour activer la nouvelle configuration. Vous pouvez le faireManuellement en redémarrant les services individuellement, ou vous pouvez simplement redémarrer l'ordinateur Home Assistant pour vous assurer que tous les services sont redémarrés.

Arguments de service:
- **Chemin vers le fichier de mot de passe mosquitto** (par défaut : `/etc/mosquitto`) - Si vous avez utilisé les méthodes d'installation Home Assistant Core ou Docker et que vous n'avez pas le chemin par défaut vers le courtier Mosquitto, vous devez changer ce paramètre. *Non nécessaire pour Home Assistant OS ou Superviser*.
- **Chemin vers la configuration Zigbee2MQTT** (par défaut : `/opt/zigbee2mqtt`) - Si vous avez utilisé les méthodes d'installation Home Assistant Core ou Docker et que vous n'avez pas le chemin par défaut vers Zigbee2MQTT, vous devez changer ce paramètre. *Non nécessaire pour Home Assistant OS ou Superviser*.

## Restaurer la configuration de Mosquitto et Zigbee2MQTT pour la méthode d'installation Home Assistant Core

Si la sauvegarde inclut la configuration de Mosquitto ou Zigbee2MQTT, lors du processus de restauration, elles seront placées dans le chemin par défaut ou dans le chemin spécifié dans les arguments. Cependant, si vous avez installé l'intégration Robonomics dans un Home Assistant Core existant *(pas à partir de l'image Robonomics préinstallée)*, l'utilisateur `homeassistant` peut ne pas avoir accès à ce chemin.

Ainsi, pour restaurer la configuration de Mosquitto et Zigbee2MQTT, vous devez accorder les autorisations de lecture nécessaires à l'utilisateur `homeassistant` :

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Sauvegarder la configuration de Mosquitto et Zigbee2MQTT pour la méthode d'installation Home Assistant Docker

Pour sauvegarder les configurations de Mosquitto et Zigbee2MQTT à partir d'un conteneur Docker, vous devez créer des volumes pour leurs configurations respectives. Cela peut être réalisé en exécutant votre conteneur Home Assistant avec des arguments supplémentaires :

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /CHEMIN_VERS_VOTRE_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

ou apportez des modifications à votre fichier `compose.yaml` :

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /CHEMIN_VERS_VOTRE_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"Remarque"}%}Veuillez noter que les chemins par défaut pour les configurations de Mosquitto et Zigbee2MQTT sont respectivement `/etc/mosquitto` et `/opt/zigbee2mqtt`. Cependant, ces chemins peuvent varier en fonction de votre configuration spécifique.
{% endroboWikiNote %}

## Boutons de sauvegarde

En plus d'utiliser des services pour travailler avec les sauvegardes, vous pouvez simplifier le processus en utilisant les boutons `button.create_backup` et `button.restore_from_backup` de l'intégration Robonomics. Ces boutons invoquent les services respectifs avec des paramètres par défaut (le bouton de sauvegarde crée une sauvegarde sans historique).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Pour ajouter des boutons à votre tableau de bord, suivez ces étapes :

1. Cliquez sur les trois points dans le coin supérieur droit du tableau de bord.
2. Sélectionnez `Modifier le tableau de bord`.
3. Cliquez sur le bouton `Ajouter une carte` dans le coin inférieur droit.
4. Choisissez la carte `Entités`.
5. Dans le champ `Entités`, recherchez les entités button.create_backup et button.restore_from_backup.
6. Appuyez sur `Enregistrer` pour ajouter les entités à la carte.
7. Terminez l'édition en cliquant sur le bouton `Terminé` dans le coin supérieur droit.