---
title: Installation de la maison intelligente
contributors: [nakata5321, PaTara43]
outils:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Intégration Robonomics Home Assistant 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Bienvenue dans le guide d'installation de Home Assistant avec l'intégration de Robonomics. Home Assistant est un système domotique open-source qui fournit un hub centralisé pour contrôler les appareils intelligents de votre réseau domestique. En intégrant Robonomics, un service cloud décentralisé, vous pouvez améliorer la fonctionnalité et la sécurité de votre maison intelligente. Dans cet article, nous vous fournirons des instructions étape par étape sur la manière d'installer Home Assistant avec Robonomics, vous donnant la possibilité d'automatiser et de contrôler divers aspects de votre maison à l'aide d'une solution sécurisée et décentralisée. Commençons !**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## Démo

Voiciest un exemple d'installation complète de l'intégration Smart Home et Robonomics. Gardez à l'esprit que le temps nécessaire peut varier en fonction de la connexion Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Matériel nécessaire pour l'installation

Si vous n'avez pas encore intégré Home Assistant dans votre configuration de maison intelligente, il est important de connaître l'équipement dont vous aurez besoin pour établir un système de maison intelligente complet à partir de zéro. L'équipe de Robonomics recommande d'utiliser Raspberry Pi 4 comme serveur domotique.

{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (au moins 2 Go de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Carte SD16 Go</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Appareils intelligents Zigbee (optionnel) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptateur Zigbee (optionnel) </b> </a>  {% endroboWikiGrid %}
	
{% endroboWikiGridWrapper %}


## 1. Installer les prérequis


{% roboWikiNote {type: "warning", title: "Informations importantes" }%} Toutes ces étapes doivent être effectuées sur un Raspberry Pi 4 avec le système Ubuntu. {% endroboWikiNote %}

Robonomics Docker contient :
- Home Assistant
- IPFS
- Courtier MQTT et intégration- Zigbee2MQTT
- Proxy libp2p
- Intégration Robonomics

Tout d'abord, vous devez installer les packages suivants:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Ensuite, vous devez installer Docker sur votre Raspberry Pi 4. Les instructions d'installation se trouvent sur [le site officiel](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Informations importantes" }%} Ajoutez votre utilisateur au groupe docker pour démarrer les conteneurs Docker sans autorisations root. Trouvez les [instructions ici](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Configurer

Téléchargez le dépôt GitHub et naviguez à l'intérieur :


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Ensuite, créez un fichier `.env` à partir du fichier `template.env` :


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

Ensuite, vous pouvez ouvrir le fichier `.env` et modifier les valeurs par défaut, telles que :
- le chemin du dépôt où tous les dossiers de configuration seront stockés.
- fuseau horaire dans ["nom de la base de données tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Démarrer

Exécutez le script bash et attendez qu'il installe tous les packages requis :

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Le script vérifiera que toutes les actions requises des étapes précédentes ont été effectuées et affichera une erreur en cas d'erreur.

Pendant le processus d'installation, les situations suivantes peuvent se produire :
- Si vous décidez de ne pas utiliser le coordinateur Zigbee, vous verrez une ligne de dialogue confirmant s'il faut continuer l'installation :

{% codeHelper %}

```
ce script créera tous les dépôts nécessaires et démarrera les conteneurs Docker
Impossible de trouver l'emplacement du coordinateur Zigbee. Veuillez l'insérer et exécuter à nouveau le script. Le répertoire /dev/serial/by-id/ n'existe pas
Voulez-vous continuer sans le coordinateur Zigbee ? Le conteneur Zigbee2MQTT ne sera pas démarré.
Voulez-vous continuer ? (O/n)
```

{% endcodeHelper %}


- S'il y a plusieurs appareils sur votre Raspberry Pi 4 qui utilisent des ports série, le script demandera quel appareil utiliser :

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/série/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Post-installation

Une fois que tout est lancé, vous pouvez utiliser le script `update.sh` pour mettre à jour la version des packages Docker : 
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
Ce script téléchargera de nouvelles versions, supprimera les anciennes versions des packages et redémarrera automatiquement tout, en sauvegardant toutes vos configurations.

Pour arrêter tout, utilisez le script `stop.sh` :
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}

C'est tout. Passez à l'article suivant.