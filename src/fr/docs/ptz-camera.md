---
title: Contrôle de caméra PTZ dans Home Assistant
contributors: [nakata5321]
---

Cet article couvre le processus de configuration d'une caméra PTZ dans Home Assistant.
Le protocole ONVIF sera utilisé. Cela nécessite un compte de caméra local.

{% roboWikiNote {title:"test", type: "warning"}%} Le processus de configuration du compte de caméra local n'est pas couvert dans cet article.
{% endroboWikiNote %}


Exigences:
- Caméra PTZ
- Compte de caméra local
- Adresse IP de la caméra
- Home Assistant configuré

## Intégration ONVIF

Commençons par l'installation de l'**intégration ONVIF**.

Allez dans "Appareils & Services" dans "Paramètres" et appuyez sur le bouton "AJOUTER UNE INTÉGRATION".
Tapez "ONVIF" et choisissez l'intégration. Vous verrez la fenêtre suivante.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

Appuyez sur le bouton "Soumettre". Il essaiera de rechercher automatiquement votre caméra. Si cela réussit,
choisissez votre caméra dans la liste et remplissez les champs vides.
Sinon, vous devrez remplir tous les champs manuellement. Vous verrez la fenêtre suivante.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

Remplissez les espaces :
- Nom - donnez un nom à votre caméra
- Hôte - fournissez l'adresse IP de votre caméra
- Port - le plus commun est 2020, mais votre fournisseur de caméra peut le changer
- Nom d'utilisateur - écrivez un nom d'utilisateur de votre compte de caméra local
  - Mot de passe - écrivez un mot de passe pour votre compte de caméra local

et appuyez sur "Soumettre". Choisissez une Zone pour votre caméra et cliquez sur "Terminer".

## Ajouter le contrôle de la caméra au tableau de bord

Maintenant que vous avez entièrement configuré la caméra, vous pouvez ajouter son flux et ses boutons de contrôle au tableau de bord.

Allez sur le tableau de bord et commencez par créer une nouvelle carte. Choisissez celle de "Vue d'ensemble d'image".

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

Remplissez les données :
- Titre - choisissez le titre de l'image de la caméra
- Entité de la caméra - choisissez une entité de caméra dans la liste déroulante
- Vue de la caméra - choisissez "live" pour avoir moins de retard

Ensuite, passez en mode "Éditeur de code" en appuyant sur le bouton en bas à gauche. Vous verrez le code suivant :
```shell
camera_view: live
type: picture-glance
title: Cuisine
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Remplacez le contenu de `entities: []` selon l'exemple ci-dessous (`<VOTRE_ENTITÉ_DE_CAMÉRA>` est le même que le paramètre `camera_image`):

{% codeHelper { copy: true}%}

```
entities:
  - entity: <VOTRE_ENTITÉ_DE_CAMÉRA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <VOTRE_ENTITÉ_DE_CAMÉRA>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Panoramique à gauche
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <VOTRE_ENTITÉ_DE_CAMÉRA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <VOTRE_ENTITÉ_DE_CAMÉRA>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Inclinaison vers le haut
    icon: 'mdi:arrow-up'
  - entity: <VOTRE_ENTITÉ_DE_CAMÉRA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <VOTRE_ENTITÉ_DE_CAMÉRA>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Inclinaison vers le bas
    icon: 'mdi:arrow-down'
  - entity: <VOTRE_ENTITÉ_DE_CAMÉRA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <VOTRE_ENTITÉ_DE_CAMÉRA>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Panoramique à droite
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

C'est tout. Vous devriez maintenant voir la carte de la caméra PTZ sur le tableau de bord avec les boutons de contrôle.

## Dépannage
Si vous utilisez Home Assistant Core et que vous ne voyez pas de flux de la caméra, vous devriez installer les intégrations "stream" et "FFMPEG".
Pour ce faire, vous devez ajouter les chaînes `stream: ` et `ffmpeg: ` à la fin de configuration.yaml.