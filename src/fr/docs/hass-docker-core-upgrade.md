---
title: Mettez à niveau votre Docker Home Assistant ou Core pour un système d'exploitation de type Unix
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Intégration Robonomics Home Assistant 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - Interface robonomics 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**Cet article contient des instructions pour mettre à niveau votre Docker Home Assistant existant ou Core (sur un système d'exploitation de type Unix) avec l'intégration Robonomics.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"AVERTISSEMENT", type: "warning"}%}
  1. Il est supposé que Docker est correctement installé.
  2. Il est supposé que les images et conteneurs Docker par défaut de Home Assistant ou Home Assitant Core sont utilisés.
  3. IPFS et Libp2p-ws-proxy seront installés en tant que conteneurs Docker.
{% endroboWikiNote %}


## Installation

Téléchargez le script d'installation et exécutez-le dans le terminal :

{% codeHelper { additionalLine: "nom_utilisateur_rasppi@nom_hôte_rasppi"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Il vérifiera si Docker est correctement installé. Ensuite, il essaiera de trouver IPFS et suggérera de vérifier la configuration si IPFS est installé. Si IPFS n'est pas trouvé, le script installera à la fois IPFS et le proxy Libp2p-ws. Vous verrez la sortie suivante :

{% codeHelper { additionalLine: "nom_utilisateur_rasppi@nom_hôte_rasppi"}%}

```shell
Docker installé
$Utilisateur appartient au groupe docker.
Vérification de l'installation d'IPFS... Cela peut prendre quelques minutes. Veuillez patienter
<...>
 ✔ Conteneur ipfs-daemon      Démarré
 ✔ Conteneur lipb2p-ws-proxy  Démarré
Tout est prêt !
``` install_integration_core.sh
```

{% endcodeHelper %}

Si IPFS est déjà installé, vous verrez la sortie suivante :
```shell
Docker installé
$Utilisateur appartient au groupe docker.
Vérification de l'installation d'IPFS... Cela peut prendre quelques minutes. Veuillez patienter
Instance IPFS trouvée. Assurez-vous que votre configuration est correctement définie avec les paramètres suivants :
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - Les ports 4001, 5001 et 8080 sont disponibles.
      Ajoutez également les nœuds d'amorçage suivants :
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      Votre configuration est-elle correctement définie ? [oui/Non]:

```
Dans ce cas, vous devez ajuster votre fichier de configuration IPFS et le confirmer.

{% roboWikiNote {title:"Attention !", type: "warning"}%} La configuration correcte d'IPFS est importante ; ne sautez pas cette étape !{% endroboWikiNote %}

## Téléchargement de l'intégration Robonomics

Nous utiliserons [HACS](https://hacs.xyz/) pour installer l'intégration. Si HACS n'est pas encore installé sur votre Home Assistant, vous devez d'abord [l'installer](https://hacs.xyz/docs/setup/download/).

Ensuite, dans votre Home Assistant, accédez à HACS et recherchez `Robonomics` :

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Ouvrez-le et cliquez sur `Télécharger` dans le coin inférieur droit. Le téléchargement du dépôt peut prendre un certain temps.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

C'est tout. Passez à l'article suivant.