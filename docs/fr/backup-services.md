---
title: Services de sauvegarde

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-danstegration
---

**Dans cet article, vous apprendrez comment générer des sauvegardes de votre configuration Home Assistant et la restaurer en cas de besoin. Pour créer des sauvegardes, un service est appelé pour générer une archive sécurisée avec les fichiers de configuration. Ce service ajoute également la configuration de Mosquitto brocker et Zigbee2MQTT à la sauvegarde si elle existe. Ce service ajoute ensuite l'archive à IPFS et stocke le CID résultant dans Robonomics Digital Twin.**
## Création d'une sauvegarde de la configuration Home Assistant

La création d'une sauvegarde vous permet de restaurer facilement votre configuration Home Assistant en cas de panne.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="AVERTISSEMENT">

Pour sauvegarder et restaurer votre configuration, il est nécessaire d'utiliser une **passerelle IPFS personnalisée** comme Pinata. Sans cela, votre sauvegarde sera stockée uniquement sur votre nœud IPFS local, ce qui peut vous empêcher de restaurer votre configuration Home Assistant en cas de défaillance du nœud local.

</robo-wiki-note>

1. Dans l'interface web de Home Assistant, allez à `Developer Tools` -> `Services`. Recherchez `Robonomics: Save Backup to Robonomics` et appuyez sur `CALL SERVICE`.

2. Attendez de voir la notification `Backup was updated in Robonomics` apparaître dans `Notification`.

<robo-wiki-note type="warning" title="AVERTISSEMENT">

N'essayez pas de créer une sauvegarde ou de restaurer la configuration immédiatement après avoir chargé Home Assistant et Robonomics Integration. Veuillez **attendre environ 5 minutes** pour permettre la configuration initiale de se terminer.

</robo-wiki-note>

Arguments du service:
- **Sauvegarde complète**  (default: False) - ajoute la base de données à la sauvegarde, de sorte que l'historique des états des entités soit également stocké.
- **Chemin vers le fichier de mot de passe de Mosquitto** (default: `/etc/mosquitto`) - Si vous avez utilisé les méthodes d'installation Home Assistant Core ou Docker et que vous n'avez pas le chemin par défaut vers Mosquitto brocker, vous devez modifier ce paramètre. *Non nécessaire pour Home Assistant OS ou Superviser*.

## Restauration de la configuration Home Assistant à partir de la sauvegarde

Pour restaurer votre configuration, vous aurez besoin d'un Home Assistant installé et de Robonomics Integration. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="AVERTISSEMENT">

Pour assurer une restauration réussie de votre configuration dans Home Assistant Core et les méthodes d'installation Docker, vous devez effectuer des étapes de configuration supplémentaires comme décrit à la fin de la page.

</robo-wiki-note>

1. Installerez Home Assisntant avec Robonomics Integration (si ce n'est pas encore installé), en suivant les étapes de l'article pour la [méthode d'installation souhaitée](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Configurer l'intégration Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) en utilisant **les mêmes clés** que celles utilisées dans la configuration précédente de Robonomics. Si votre abonnement est terminé, [réactivez-le](https://wiki.robonomics.network/docs/sub-activate).

3. Dans l'interface web de Home Assistant, allez à `Developer Tools` -> `Services`. Search for `Robonomics: Restore from the Backup in Robonomics` et appuyez sur le bouton `CALL SERVICE`. Accédez à la `Overview` page, pour vérifier l’état de votre sauvegarde.

4. Après la restauration, Home Assistant redémarrera automatiquement. Si pour une raison quelconque Home Assistant ne redémarre pas, vous pouvez vérifier l'état de la restauration en surveillant l'état de l' `robonomics.backup` entité. Si l'état est `restored` vous devrez redémarrer manuellement Home Assistant en accédant à `Settings` > `System` et en cliquant sur le `RESTART` bouton situé dans le coin supérieur droit.

5. Si votre sauvegarde inclut la configuration Zigbee2MQTT ou Mosquitto, vous devez redémarrer ces services pour activer la nouvelle configuration. Vous pouvez le faire manuellement en redémarrant les services individuellement, ou vous pouvez simplement redémarrer l'ordinateur Home Assistant pour vous assurer que tous les services sont redémarrés.

Arguments du service :
- **Chemin d'accès au fichier de mots de passe Mosquito** (default: `/etc/mosquitto`) - Si vous avez utilisé les méthodes d'installation Home Assistant Core ou Docker et que vous n'avez pas le chemin par défaut vers le courtier Mosquitto, vous devez modifier ce paramètre. *Non nécessaire pour Home Assistant OS ou Superviser*.
- **Chemin vers la configuration Zigbee2MQTT**  (default: `/opt/zigbee2mqtt`) - Si vous avez utilisé les méthodes d'installation Home Assistant Core ou Docker et que vous n'avez pas le chemin par défaut vers Zigbee2MQTT, vous devez modifier ce paramètre. *Non nécessaire pour Home Assistant OS ou Superviser*.

## Restaurer la configuration Mosquitto et Zigbee2MQTT pour la méthode d'installation Home Assistant Core

Si la sauvegarde inclut la configuration de Mosquitto ou Zigbee2MQTT, lors du processus de restauration, elles seront placées dans le chemin par défaut ou dans le chemin spécifié dans les arguments. Cependant, si vous avez installé l'intégration Robonomics dans un Home Assistant Core existant *(pas à partir de l'image Robonomics préinstallée)*, `homeassistant` l'utilisateur peut ne pas avoir accès à ce chemin.

Donc, pour restaurer la configuration de Mosquitto et Zigbee2MQTT, vous devez accorder les permissions de lecture nécessaires à l'utilisateur `homeassistant`:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Sauvegarder la configuration Mosquitto et Zigbee2MQTT pour la méthode d'installation Home Assistant Docker

Pour sauvegarder les configurations Mosquitto et Zigbee2MQTT à partir d'un conteneur Docker, vous devez créer des volumes pour leurs configurations respectives. Cela peut être réalisé en exécutant votre conteneur Home Assistant avec des arguments supplémentaires:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

ou apportez des modifications à votre `compose.yaml` fichier:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

Veuillez noter que les chemins par défaut pour les configurations Mosquitto et Zigbee2MQTT sont respectivement `/etc/mosquitto` et `/opt/zigbee2mqtt`, Cependant, ces chemins peuvent varier en fonction de votre configuration spécifique.

</robo-wiki-note>

## Boutons de sauvegarde

En plus d'utiliser des services pour travailler avec les sauvegardes, vous pouvez simplifier le processus en utilisant les `button.create_backup` and `button.restore_from_backup` boutons de l'intégration Robonomics. Ces boutons invoquent les services respectifs avec les paramètres par défaut (le bouton de sauvegarde crée une sauvegarde sans historique).

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

Pour ajouter des boutons à votre tableau de bord, suivez ces étapes:

1. Cliquez sur les trois points dans le coin supérieur droit du tableau de bord.
2. Sélectionnez `Edit Dashboard`.
3. Cliquez sur le `Add Card` bouton dans le coin inférieur droit.
4. Choisissez la carte `Entities`.
5. Dans le champ `Entities` recherchez les entités button.create_backup et button.restore_from_backup.
6. Appuyez sur `Save` pour ajouter les entités à la carte.
7. Terminez l'édition en cliquant sur le `Done` bouton dans le coin supérieur droit.