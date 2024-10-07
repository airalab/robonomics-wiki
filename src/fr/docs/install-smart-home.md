---
title: Installation de la maison intelligente
contributors: [nakata5321, PaTara43]
outils:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
  - Intégration Robonomics Home Assistant 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt
---

**Bienvenue dans le guide d'installation de Home Assistant avec l'intégration de Robonomics. Home Assistant est un système domotique open-source qui fournit un hub centralisé pour contrôler les appareils intelligents de votre réseau domestique. En intégrant Robonomics, un service cloud décentralisé, vous pouvez améliorer la fonctionnalité et la sécurité de votre maison intelligente. Dans cet article, nous vous fournirons des instructions étape par étape sur la manière d'installer Home Assistant avec Robonomics, vous donnant la possibilité d'automatiser et de contrôler divers aspects de votre maison en utilisant une solution sécurisée et décentralisée. Commençons !**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## Démo

Voici un exemple d'installation complète de la maison intelligente et de l'intégration de Robonomics. Gardez à l'esprit que le temps nécessaire peut varier en fonction de Connexion Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Matériel nécessaire pour l'installation

Si vous n'avez pas encore intégré Home Assistant dans votre configuration de maison intelligente, il est important de connaître l'équipement dont vous aurez besoin pour établir un système domotique complet à partir de zéro. L'équipe Robonomics recommande d'utiliser Raspberry Pi 4 comme serveur domotique. **Mais il est possible de tout configurer sur votre PC.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (au moins 2 Go de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Carte SD 16 Go</b> {% endroboWikiGrid %} 
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"besoin"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptateur Zigbee (optionnel) </b> </a>  {%endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"besoin"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Appareils intelligents Zigbee (optionnel) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"besoin"} %}{% endroboWikiPicture %}
	<b>Bureau pour la configuration</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. Installer les prérequis

Robonomics Docker contient :
- Home Assistant
- IPFS
- Courtier MQTT et intégration- Zigbee2MQTT
- proxy libp2p
- Intégration Robonomics

Cet article montrera le processus d'installation sur un système Ubuntu. Tout d'abord, vous devez installer les packages suivants :

{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Ensuite, vous devez installer Docker sur votre PC. Les instructions d'installation se trouvent sur [le site officiel](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Information importante" }%} Ajoutez votre utilisateur au groupe docker pour démarrer les conteneurs Docker sans autorisations root. Trouvez les [instructions ici](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Configuration

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

Après cela, vous pouvez ouvrir le fichier `.env` et modifier les valeurs par défaut telles que :
- le chemin du dépôt où seront stockés tous les dossiers de configuration.
- le fuseau horaire en ["nom de la base de données tz"](https://en.wikipedia.org/wiki[List_of_tz_database_time_zones).

## 3. Commencer

Exécutez le script bash et attendez qu'il installe tous les packages requis :

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Le script vérifiera toutes les actions requises que vous avez accomplies lors des étapes précédentes et affichera une erreur s'il y a un problème.

Pendant le processus d'installation, les situations suivantes peuvent se produire :
- Si vous décidez de ne pas utiliser le coordinateur Zigbee, vous verrez une ligne de dialogue confirmant si vous souhaitez continuer l'installation :

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (Y/n)
```

{% endcodeHelper %}


- S'il y a plusieurs appareils sur votre PC qui utilisent des ports série, le script demandera quel appareil utiliser :

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Post-installation

Une fois que tout est lancé, vous pouvez utiliser le script `update.sh` pour mettre à jour la version des packages Docker. Ce script téléchargera de nouvelles versions, supprimera les anciennes versions des packages et redémarrera automatiquement tout, en sauvegardant toutes vos configurations.

Pour arrêter tout, utilisez le script `stop.sh`.

C'est tout. Passez à l'article suivant.