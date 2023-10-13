---
title: Image pré-installée pour Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Bienvenue dans le guide d'installation de Home Assistant avec l'intégration Robonomics sur un Raspberry Pi. Home Assistant est un système domotique open-source qui fournit un hub centralisé pour contrôler les appareils intelligents de votre réseau domestique. En intégrant Robonomics, un service cloud décentralisé, vous pouvez améliorer les fonctionnalités et la sécurité de votre maison intelligente. Dans cet article, nous vous fournirons des instructions étape par étape sur l'installation de Home Assistant avec Robonomics sur un Raspberry Pi, vous permettant d'automatiser et de contrôler différents aspects de votre maison à l'aide d'une solution sécurisée et décentralisée. Commençons !**

## Matériel nécessaire pour l'installation

Si vous n'avez pas encore intégré Home Assistant à votre configuration de maison intelligente, il est important de connaître l'équipement dont vous aurez besoin pour établir un système domotique complet à partir de zéro.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Télécharger l'image pré-installée de Robonomics

L'image pré-installée de Robonomics contient :
- Home Assistant Core
- IPFS
- Courtier MQTT et intégration
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="https://crustipfs.info/ipfs/QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

Vous pouvez vérifier le code source et télécharger la dernière version de l'image sur [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. Configurer l'image

Installez [Raspberry Pi Imager](https://www.raspberrypi.com/software/) sur votre ordinateur. Ensuite, insérez la carte SD.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Exécutez le programme Raspberry Pi Imager. Choisissez l'image requise comme système d'exploitation et assurez-vous de sélectionner votre carte SD dans le menu déroulant de stockage.
Dans les paramètres :
- Définissez un nom d'utilisateur et un mot de passe (enregistrez le nom d'utilisateur par défaut "pi" pour qu'il soit facile à retenir),  
- fournissez le nom et le mot de passe de votre Wi-Fi, 
- choisissez votre pays dans la liste déroulante
puis `Écrire` l'image. 
                   
<robo-wiki-note type="note">Gardez précieusement le nom d'utilisateur et le mot de passe, car ces informations seront nécessaires en cas de dépannage</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

Vous pouvez trouver les codes de pays [ici](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

## 3. Premier démarrage

**Éjectez en toute sécurité la carte SD**, insérez-la dans le Raspberry Pi. Ensuite, **insérez l'adaptateur Zigbee** dans le Raspberry Pi.

<robo-wiki-note type="warning">Il est important d'insérer l'adaptateur Zigbee avant le premier démarrage du Raspberry Pi ! 
Il est nécessaire pour l'auto-configuration du réseau Zigbee.</robo-wiki-note>

**Si vous avez le [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (qui dispose de tous les micrologiciels nécessaires), vous pouvez simplement suivre ces instructions. Cependant, si vous avez un autre adaptateur, la première chose à faire est de le flasher avec le logiciel Zigbee2MQTT. Vous pouvez trouver des instructions pour votre appareil [ici](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

Ensuite, connectez le câble d'alimentation à votre appareil. Il devrait se connecter à votre réseau Wi-Fi. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Une fois votre Raspberry Pi connecté, la LED rouge s'allumera et la LED verte clignotera pendant un certain temps. Attendez jusqu'à 5 minutes que le Raspberry Pi démarre et s'enregistre sur le réseau.

Maintenant, trouvez l'adresse IP du Raspberry Pi. Pour la trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou 
l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Trouvez le nom `robots-home` (le nom optionnel peut être `Home(homeassistant)`) 
de la machine hôte dans la liste des adresses IP. 

Dans cet exemple, l'adresse est `192.168.43.56`. 

Pour vérifier que tout fonctionne, ouvrez un navigateur web et accédez à la page web `http://%RASPBERRY_IP_ADDRESS%:8123`. Dans cet exemple, ce sera `192.168.43.56:8123`.
Si tout va bien, vous verrez l'interface web de Home Assistant. Si la page web ne s'ouvre pas, attendez jusqu'à 5 minutes que le Raspberry Pi démarre et réessayez. 

<robo-wiki-video loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Dépannage

1. Pour modifier les paramètres Wi-Fi ultérieurement, vous devez vous connecter à votre Raspberry Pi via la commande `ssh`. Pour cela, ouvrez un terminal sur votre ordinateur
et saisissez la commande ssh avec votre nom d'utilisateur, que vous avez créé à l'étape "Configuration de l'image" (le nom par défaut est "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

puis utilisez la commande `sudo raspi-config`. Trouvez plus d'informations sur cette commande sur [le site officiel.](https://www.raspberrypi.com/documentation/computers/configuration.html)
