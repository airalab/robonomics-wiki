---
title: Surveillance de l'énergie
contributors: [nakata5321]
---
Cet article vous montrera le processus de configuration de la Surveillance de l'énergie.

{% roboWikiNote {type: "warning"}%} Tous les appareils de Robonomics peuvent être achetés sur le site officiel [website](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Étape 1 — Flashage {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Tous les appareils de Robonomics sont pré-flashés en sortie de boîte. Cependant, comme tous les appareils sont des kits de développement, les instructions couvriront l'option de flasher l'appareil à partir de zéro. Si vous ne souhaitez pas le faire maintenant, passez à [**Étape 2 - Point d'accès**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Sortez l'appareil de la boîte et connectez-le à l'ordinateur. Ensuite, allez sur le site [webflasher.robonomics.network](https://webflasher.robonomics.network/). C'est le flasher web.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Remarque ! Le flasher web fonctionne uniquement avec le navigateur Google Chrome ou Microsoft Edge.
{% endroboWikiNote %}

Dans la liste déroulante "Firmware", choisissez l'option **"ENERGY MONITOR"** et ensuite dans "SELECT CHIP", choisissez **"ESP32-S3"**. Appuyez sur le bouton **"CONNECT"**.
Une fenêtre contextuelle apparaîtra où vous devrez sélectionner le port série auquel l'appareil est connecté (généralement c'est `/ttyUSB0`). Ensuite, choisissez **"INSTALL ENERGY-MONITOR_EN"**.
Sur la fenêtre suivante, vous pouvez effectuer une **INSTALLATION CLAIRE** en cochant **ERASE DEVICE**. Appuyez sur Suivant, puis sur Installer. Attendez que le firmware soit téléchargé sur l'appareil de Surveillance de l'énergie.

Après avoir terminé le processus d'installation, une fenêtre contextuelle de configuration Wi-Fi apparaîtra. Fournissez les informations d'identification Wi-Fi.

Après avoir configuré le Wi-Fi, vous pouvez visiter l'appareil via le bouton **VISIT DEVICE**. Plus tard, vous pourrez visiter l'appareil via son adresse IP dans le réseau. Pour la trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Passez à l'**Étape 3 — Configuration** en sautant l'**Étape 2 — Point d'accès**.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Étape 2 — Point d'accès {% endroboWikiTitle %}

Si vous prenez le moniteur d'énergie de la boîte et le connectez à l'alimentation, il créera un hotspot portant le nom "robonomics-XXXXXXX". Connectez-vous à celui-ci. Une fenêtre de configuration devrait s'ouvrir. Sinon, ouvrez un navigateur web et allez à la page `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Fournissez les informations d'identification Wi-Fi. Après cela, l'appareil de Surveillance de l'énergie se connectera au réseau Wi-Fi. Vérifiez l'appareil via son adresse IP dans le réseau. Pour la trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Étape 3 — Configuration {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Allez à **"Configuration"** -> **"Configurer autre"**. Dans la chaîne **"Modèle"**, insérez ce qui suit :

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

Vérifiez que les cases à cocher **"Activer"** et **"MQTT Activer"** sont activées. Si ce n'est pas le cas, activez-les et appuyez sur le bouton Enregistrer.

Revenez au "menu principal" et allez à **"Configuration"** -> **"Configurer MQTT"**.
Fournissez vos informations d'identification MQTT ici :

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

C'est tout pour l'ESP pour le moment. La prochaine étape consiste à installer l'intégration Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Étape 4 — Configuration de l'intégration {% endroboWikiTitle %}

Cet article suppose que vous avez Home Assistant. Pour connecter l'appareil de Surveillance de l'énergie à Home Assistant, vous devez installer l'intégration "Tasmota".

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

En gros, Home Assistant découvrira automatiquement l'intégration "Tasmota". Mais si ce n'est pas le cas, ajoutez-la manuellement.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

C'est tout. Maintenant, vous pouvez ajouter des entités énergétiques au tableau de bord.

{% roboWikiNote {type: "warning"}%} Tous les appareils de Robonomics peuvent être achetés sur le site officiel [website](https://robonomics.network/devices/).
{% endroboWikiNote %}