---
title: Interrupteur intelligent 2 gangs
contributors: [nakata5321]
---
Cet article vous montrera le processus de configuration de l'interrupteur intelligent 2 gangs.

{% roboWikiNote {type: "warning"}%}Tous les appareils de Robonomics peuvent être achetés sur le site officiel [website](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmQiq21yPEJbysPgvv35uJmG9rHQqbUSySu8za8BqA1kcZ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Étape 1 — Flashage {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Tous les appareils de Robonomics sont pré-flashés en sortie de boîte. Cependant, comme tous les appareils sont des kits de développement, les instructions couvriront l'option de flasher l'appareil à partir de zéro. Si vous ne souhaitez pas le faire maintenant, passez à [**Étape 2 - Point d'accès**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Sortez l'appareil de la boîte et connectez-le à l'ordinateur. Ensuite, allez sur le site [webflasher.robonomics.network](https://webflasher.robonomics.network/). C'est le flasher web.

{% roboWikiVideo {videos:[{src: 'QQmZ6kYAusdjH3Yq7L9UzorZdfXAa4awD1twp5SB5z57z9R', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Remarque ! Le flasher web fonctionne uniquement avec le navigateur Google Chrome ou Microsoft Edge.{% endroboWikiNote %}

Dans la liste déroulante "Firmware", choisissez l'option **"SWS-2G-E-11-23"** puis dans "SÉLECTIONNER LA PUCE", choisissez **"ESP32"**. Appuyez sur le bouton **"CONNECTER"**.
Une fenêtre contextuelle apparaîtra où vous devrez sélectionner le port série auquel l'appareil est connecté (généralement c'est `/ttyUSB0`). Ensuite, choisissez **"INSTALLER SWS-2G-E-11-23"**.
Sur la fenêtre suivante, vous pouvez effectuer une **INSTALLATION CLAIRE** en cochant **EFFACER L'APPAREIL**. Appuyez sur Suivant, puis sur Installer. Attendez que le firmware soit téléchargé sur l'appareil de l'interrupteur intelligent.

Après avoir terminé le processus d'installation, une fenêtre contextuelle de configuration Wi-Fi apparaîtra. Fournissez les informations d'identification Wi-Fi.

Après avoir configuré le Wi-Fi, vous pouvez visiter l'appareil via le bouton **VISITER L'APPAREIL**. Plus tard, vous pourrez visiter l'appareil via son adresse IP dans le réseau. Pour le trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Passez à l'**Étape 3 — Configuration** et ignorez l'**Étape 2 — Point d'accès**.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Étape 2 — Point d'accès {% endroboWikiTitle %}

Si vous prenez l'interrupteur intelligent de la boîte et le connectez à l'alimentation, il créera un point d'accès avec le nom "robonomics-XXXXXXX". Connectez-vous à ce point d'accès.
Une fenêtre de configuration devrait s'ouvrir. Sinon, ouvrez un navigateur web et allez sur la page `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

Fournissez les informations d'identification Wi-Fi. Ensuite, l'appareil de l'interrupteur intelligent se connectera au réseau Wi-Fi. Vérifiez l'appareil via son adresse IP dans le réseau. Pour le trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Étape 3 — Configuration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

Allez dans **"Configuration"** -> **"Configurer autre"**. Dans la chaîne **"Modèle"**, insérez ce qui suit :

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-2L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,224,225,0,0,320,1,321,0,0,0,0,33,1,32,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Vérifiez que les cases à cocher **"Activer"** et **"Activer MQTT"** sont activées. Sinon, activez-les et appuyez sur le bouton Enregistrer.

Revenez au menu principal et allez dans **"Configuration"** -> **"Configurer MQTT"**.
Fournissez vos informations d'identification MQTT ici :

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

C'est tout pour l'ESP pour le moment. La prochaine étape consiste à installer l'intégration Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Étape 4 — Configuration de l'intégration {% endroboWikiTitle %}

Cet article suppose que vous avez Home Assistant. Pour connecter l'appareil de l'interrupteur intelligent à Home Assistant, vous devez installer l'intégration Tasmota.

{% roboWikiVideo {videos:[{src: 'QmXLSLSFJKrrEtQXVQbpeFAvsKFSgW15J9ZFaSH1pteMXR', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

En gros, Home Assistant découvrira automatiquement l'intégration Tasmota. Mais si ce n'est pas le cas, ajoutez-la manuellement.
C'est tout. Maintenant, vous pouvez ajouter l'entité de l'interrupteur au tableau de bord.

{% roboWikiNote {type: "warning"}%}Tous les appareils de Robonomics peuvent être achetés sur le site officiel [website](https://robonomics.network/devices/).
{% endroboWikiNote %}