---
title: Télécommande infrarouge
contributors: [nakata5321]
---
Cet article vous montrera le processus de configuration de la télécommande infrarouge.

{% roboWikiNote {type: "warning"}%} Tous les appareils de Robonomics peuvent être achetés sur le site officiel [website](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Étape 1 — Flashage {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Tous les appareils de Robonomics sont pré-flashés en usine. Cependant, comme tous les appareils sont des kits de développement, les instructions couvriront l'option de flasher l'appareil à partir de zéro. Si vous ne souhaitez pas le faire maintenant, passez à [**Étape 2 - Point d'accès**](/docs/ir-controller/#step2). {% endroboWikiNote %}

Sortez l'appareil de la boîte et connectez-le à l'ordinateur. Ensuite, allez sur le site [webflasher.robonomics.network](https://webflasher.robonomics.network/). C'est le flasher web.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Remarque ! Le flasher web fonctionne uniquement avec le navigateur Google Chrome ou Microsoft Edge. {% endroboWikiNote %}

Dans la liste déroulante "Firmware", choisissez l'option **"IR REMOTE"** et ensuite dans "SELECT CHIP", choisissez **"ESP32"**. Appuyez sur le bouton **"CONNECT"**.
Une fenêtre contextuelle apparaîtra où vous devrez sélectionner le port série auquel l'appareil est connecté (généralement c'est `/ttyUSB0`). Ensuite, choisissez **"INSTALL IR-REMOTE_EN"**.
Sur la fenêtre suivante, vous pouvez effectuer une **INSTALLATION CLAIRE** en cochant **ERASE DEVICE**. Appuyez sur Suivant, puis sur Installer. Attendez que le firmware soit téléchargé sur le contrôleur infrarouge.

Après avoir terminé le processus d'installation, une fenêtre contextuelle de configuration Wi-Fi apparaîtra. Vous avez les options suivantes :

1) Vous pouvez fournir les informations d'identification Wi-Fi, passer à **Étape 3 - Configuration** et aller à [**Étape 3 - Configuration**](/docs/ir-controller/#step3).

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Après avoir configuré le Wi-Fi, vous pouvez visiter l'appareil via le bouton **VISIT DEVICE**. Plus tard, vous pourrez visiter l'appareil via son adresse IP dans le réseau. Pour le trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou
l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

2) Ou déconnectez l'appareil de l'ordinateur et connectez-le à l'alimentation. La télécommande infrarouge démarrera et créera un hotspot Wi-Fi. Pour connecter la télécommande infrarouge à votre réseau Wi-Fi domestique via un hotspot, suivez les instructions de l'Étape 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Étape 2 — Point d'accès {% endroboWikiTitle %}

Si vous prenez la télécommande infrarouge de la boîte et la connectez à l'alimentation, elle créera un hotspot avec le nom "tasmota-XXXXXXX". Connectez-vous à ce hotspot. Une fenêtre de configuration devrait s'ouvrir. Sinon, ouvrez un navigateur web et allez à la page `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Fournissez les informations d'identification Wi-Fi. Ensuite, la télécommande infrarouge se connectera au réseau Wi-Fi. Vérifiez l'appareil via son adresse IP dans le réseau. Pour le trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou
l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Étape 3 — Configuration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Allez à **"Configuration"**->**"Configurer autre"**. Dans la chaîne **"Template"**, insérez ce qui suit :

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Vérifiez que les cases à cocher **"Activer"** et **"MQTT Enable"** sont activées. Si ce n'est pas le cas, activez-les et appuyez sur le bouton Enregistrer.

Retournez au **"Menu principal"** et allez à **"Configuration"** -> **"Configurer MQTT"**.
Fournissez vos informations d'identification MQTT ici :

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

C'est tout pour l'ESP pour le moment. La prochaine étape consiste à installer l'intégration Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Étape 4 — Configuration de l'intégration {% endroboWikiTitle %}

Cet article suppose que vous avez Home Assistant et HACS. Allez dans HACS et ajoutez un dépôt personnalisé.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Pour ce faire, appuyez sur les trois points dans le coin supérieur droit, choisissez **REPOSITOIRES PERSONNALISÉS**
et insérez cette URL : `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. Dans la catégorie, choisissez "Intégration". Ensuite, trouvez-le dans la recherche et installez-le. N'oubliez pas de redémarrer Home Assistant après cela.

Ouvrez les journaux de la télécommande infrarouge. Pour ce faire, allez à l'URL locale appropriée, ou ouvrez à nouveau [webflasher.robonomics.network](https://webflasher.robonomics.network/) et choisissez "Tasmota IR" et "ESP32". Appuyez sur "Connect" et choisissez le port.
Appuyez sur **VISIT DEVICE**, et vous verrez la page principale de l'appareil. Allez dans "Consoles" -> "console".

Pointez votre télécommande infrarouge (par exemple, d'un climatiseur) vers la télécommande infrarouge Robonomics et appuyez sur les boutons de la télécommande. Vous obtiendrez le journal suivant dans la console :
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
Vous avez besoin d'informations du sujet `IRHVAC`.

Ouvrez le fichier `configuration.yaml` de notre instance Home Assistant et insérez ce qui suit :

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Nom quelconque ici>"
    command_topic: "cmnd/<votre_appareil_tasmota>/irhvac"
    # Choisissez l'une des options suivantes :
    # L'état est mis à jour lorsque l'appareil tasmota reçoit un signal IR (inclut sa propre transmission et la télécommande d'origine)
    # utile lorsque une télécommande normale est utilisée en parallèle avec l'appareil tasmota, peut être moins fiable que la deuxième option.
    state_topic: "tele/<votre_appareil_tasmota>/RESULT"
    # L'état est mis à jour lorsque l'appareil tasmota termine la transmission IR, devrait être assez fiable.
    #state_topic: "stat/<votre_appareil_tasmota>```>/RÉSULTAT"
    # Décommentez si les 'sujets disponibles' de l'appareil IR Tasmota sont différents (si l'appareil dans HA est désactivé)
    #availability_topic: "tele/<votre_appareil_tasmota>/LWT"
    temperature_sensor: <capteur de température dans la pièce> - # requis pour mesurer la température dans une pièce. par exemple capteur.cuisine_temperature
    humidity_sensor: Aucun #optionnel - par défaut Aucun (par exemple capteur.humidité_cuisine)
    power_sensor: Aucun #optionnel - par défaut Aucun (par exemple binary_sensor.alimentation_cuisine)
    vendor: "<Votre vendeur ici>" #trouvez votre vendeur dans les journaux.
    min_temp: 16 #optionnel - valeur int par défaut 16
    max_temp: 32 #optionnel - valeur int par défaut 32
    target_temp: 26 #optionnel - valeur int par défaut 26
    initial_operation_mode: "off" # optionnel - valeur de chaîne par défaut "off" (l'un des "supported_modes")
    away_temp: 24 #optionnel - valeur int par défaut 24
    precision: 1 #optionnel - valeur int ou flottante par défaut 1. Peut être défini sur 1, 0.5 ou 0.1
    supported_modes:
      - "chauffage"
      - "refroidissement"
      - "sec"
      - "ventilateur_seul" # Utilisez "ventilateur_seul" même si Tasmota montre "Mode":"Fan"
      - "auto"
      - "off" #Éteint la climatisation - Doit être entre guillemets
      # Certains appareils ont "auto" et "ventilateur_seul" inversés
      # Si les deux lignes suivantes sont décommentées, "auto" et "ventilateur" doivent être commentés
      #- "auto_ventilateur_seul" #si la télécommande montre un ventilateur mais que Tasmota dit auto
      #- "ventilateur_seul_auto" #si la télécommande montre auto mais que Tasmota dit ventilateur
    supported_fan_speeds:
      # Certains appareils disent max, mais c'est élevé, et auto qui est max
      # Si vous décommentez les deux suivants, vous devez commenter high et max
      # - "auto_max" #deviendrait max
      # - "max_high" #deviendrait élevé
      #- "allumé"
      #- "éteint"
      #- "faible"
      - "moyen"
      - "élevé"
      #- "milieu"
      #- "focus"
      #- "diffuser"
      - "min"
      - "max"
      #- "auto"
    supported_swing_list:
      - "off"
      - "vertical" #de haut en bas
      # - "horizontal" # De gauche à droite
      # - "les deux"
    default_quiet_mode: "Off" #optionnel - valeur de chaîne par défaut "Off"
    default_turbo_mode: "Off" #optionnel - valeur de chaîne par défaut "Off"
    default_econo_mode: "Off" #optionnel - valeur de chaîne par défaut "Off"
    hvac_model: "-1" #optionnel - valeur de chaîne par défaut "1"
    celsius_mode: "On" #optionnel - valeur de chaîne par défaut "On"
    default_light_mode: "Off" #optionnel - valeur de chaîne par défaut "Off"
    default_filter_mode: "Off" #optionnel - valeur de chaîne par défaut "Off"
    default_clean_mode: "Off" #optionnel - valeur de chaîne par défaut "Off"
    default_beep_mode: "Off" #optionnel - valeur de chaîne par défaut "Off"
    default_sleep_mode: "-1" #optionnel - valeur de chaîne par défaut "-1"
    default_swingv: "élevé" #optionnel - valeur de chaîne par défaut ""
    default_swingh: "gauche" #optionnel - valeur de chaîne par défaut ""
    keep_mode_when_off: True #optionnel - valeur booléenne par défaut False : Doit être True pour MITSUBISHI_AC, ECOCLIM, etc.
    toggle_list: #optionnel - par défaut []
      # La propriété basculée est un paramètre qui ne conserve pas l'état activé.
      # Définissez ceci si vos propriétés de climatisation sont des fonctions de bascule.
      #- Bip
      #- Nettoyer
      #- Econo
      #- Filtre
      #- Lumière
      #- Silencieux
      #- Sommeil
      #- SwingH
      #- SwingV
      #- Turbo
```

{% endcodeHelper %}

Modifiez toutes les déclarations nécessaires dans la partie insérée avec les valeurs du message de la console. En conséquence, une partie de votre fichier de configuration devrait ressembler à ceci
(dans l'exemple, la déclaration inutilisée a été supprimée) :
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "contrôle climatique de Bangkok"
    unique_id : "test climatique de Bangkok"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #optionnel - valeur int par défaut 16
    max_temp: 31 #optionnel - valeur int par défaut 32
    target_temp: 25 #optionnel - valeur int par défaut 26
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Utilisez "fan_only" même si Tasmota montre "Mode":"Fan"
      - "auto"
      - "off" #Éteint la climatisation - Doit être entre guillemets
      # Certains appareils ont "auto" et "fan_only" inversés
      # Si les deux lignes suivantes sont décommentées, "auto" et "fan" doivent être commentés
      #- "auto_fan_only" #si la télécommande montre un ventilateur mais que Tasmota dit auto
      #- "fan_only_auto" #si la télécommande montre auto mais que Tasmota dit ventilateur
    supported_fan_speeds:
      # Certains appareils disent max, mais c'est élevé, et auto qui est max
      # Si vous décommentez les deux suivants, vous devez commenter high et max
      # - "auto_max" #deviendrait max
      # - "max_high" #deviendrait élevé
      - "faible"
      - "moyen"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #de haut en bas

    hvac_model: "-1" #optionnel - valeur de chaîne par défaut "1"

    keep_mode_when_off: True #optionnel - valeur booléenne par défaut False : Doit être True pour MITSUBISHI_AC, ECOCLIM, etc.

```

Enregistrez `configuration.yaml` et redémarrez Home Assistant.
Après le redémarrage, vous pouvez ajouter une nouvelle carte thermostatique dans l'interface utilisateur et sélectionner le nouvel appareil intégré.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

Si vous rencontrez un problème avec le mode GUI, passez en mode "ÉDITEUR DE CODE" et écrivez ce qui suit :
```
type: thermostat
entity: climate.<votre nom de climat>
```

{% roboWikiNote { type: "warning"}%} Tous les appareils de Robonomics peuvent être achetés sur le site officiel [website](https://robonomics.network/devices/).{% endroboWikiNote %}