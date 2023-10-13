---
title: Contrôle de caméra PTZ dans Home Assistant
contributors: [nakata5321]
---

Cet article couvre le processus de configuration d'une caméra PTZ dans Home Assistant. 
Le protocole ONVIF sera utilisé. Cela nécessite un compte de caméra local.

<robo-wiki-note type="warning">
Le processus de configuration du compte de caméra local n'est pas couvert dans cet article.
</robo-wiki-note>

Exigences:
- Caméra PTZ
- Compte de caméra local
- Adresse IP de la caméra
- Home Assistant configuré

## Intégration ONVIF

Commençons par l'installation de l'intégration **ONVIF**. 

Allez dans "Devices & Services" dans "Settings" et appuyez sur le bouton "ADD INTEGRATION".
Tapez "ONVIF" et choisissez l'intégration. Vous verrez la fenêtre suivante.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Appuyez sur le bouton "Submit". Il essaiera de rechercher automatiquement votre caméra. Si cela réussit, 
choisissez votre caméra dans la liste et remplissez les champs vides. 
Sinon, vous devrez remplir tous les champs manuellement. Vous verrez la fenêtre suivante.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Remplissez les espaces vides:
- Name - donnez un nom à votre caméra
- Host - fournissez l'adresse IP de votre caméra
- Port - le plus courant est 2020, mais votre fournisseur de caméra peut le changer
- Username - écrivez le nom d'utilisateur de votre compte de caméra local
  - Password - écrivez un mot de passe pour votre compte de caméra local

et appuyez sur "Submit". Choisissez une zone pour votre caméra et cliquez sur "Finish".

## Ajoutez le contrôle de la caméra au tableau de bord

Maintenant que vous avez entièrement configuré la caméra, vous pouvez ajouter son flux et ses boutons de contrôle au tableau de bord.

Accédez au tableau de bord et commencez par créer une nouvelle carte. Choisissez "Picture Glance".

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Remplissez les données:
- Title - choisissez le titre de l'image de la caméra
- Camera Entity - choisissez une entité de caméra dans la liste déroulante
- Camera View - choisissez "live" pour obtenir moins de retard

Ensuite, passez en mode "Code Editor" en appuyant sur le bouton en bas à gauche. Vous verrez le code suivant:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Remplacez le contenu de `entities: []` selon l'exemple ci-dessous (`<VOTRE_ENTITÉ_DE_CAMÉRA>` est identique au paramètre `camera_image`):

<code-helper copy>

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

</code-helper>

C'est tout. Maintenant, vous devriez voir la carte de caméra PTZ sur le tableau de bord avec les boutons de contrôle.

## Dépannage
Si vous utilisez Home Assistant Core et que vous ne voyez pas de flux provenant de la caméra, vous devriez installer les intégrations "stream" et "FFMPEG". 
Pour cela, vous devez ajouter les chaînes `stream: ` et `ffmpeg: ` à la fin de configuration.yaml.