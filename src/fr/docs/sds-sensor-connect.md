---
title: Comment connecter le capteur SDS011

contributors: [tubleronchik]
---

**Voici un guide étape par étape sur la façon de connecter votre capteur au réseau de capteurs Robonomics et à Home Assistant. Nos capteurs utilisent le micrologiciel Robonomics, qui est une version améliorée du micrologiciel sensor.community. Il inclut des capteurs supplémentaires et dispose d'un mécanisme de transmission de données modifié.**

{% roboWikiNote {type: "warning"}%} Tous les appareils de Robonomics peuvent être achetés sur le site officiel [website](https://robonomics.network/devices/).
{% endroboWikiNote %}


## Configuration

1. Branchez le capteur dans la prise pour l'alimenter.
2. La carte créera un réseau Wi-Fi nommé `RobonomicsSensor-xxxxxxxxx`. Connectez-vous à partir de votre téléphone ou ordinateur : vous verrez la fenêtre d'autorisation (sinon, ouvrez le navigateur et allez à `192.168.4.1`).
3. Sélectionnez votre réseau Wi-Fi dans la liste (ou écrivez-le vous-même s'il n'est pas dans la liste) et remplissez le champ du mot de passe.
{% roboWikiNote {type: "warning", title: "INFO"}%} Le capteur ne peut être connecté qu'à un réseau Wi-Fi 2,4 GHz. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. Écrivez les coordonnées de l'endroit où le capteur sera installé. Vous pouvez les obtenir à partir de n'importe quelle carte ou les obtenir à partir de l'adresse en utilisant [ce lien.](https://www.latlong.net/convert-address-to-lat-long.html)
{% roboWikiNote {type: "warning", title: "WARNING"}%} Les coordonnées du capteur seront ensuite affichées sur une carte publiquement disponible. Si vous ne souhaitez pas afficher vos informations privées, écrivez des coordonnées proches, mais pas exactes.
{% endroboWikiNote %}
5. Cliquez sur `Enregistrer la configuration et redémarrer`. La carte redémarrera et se connectera au réseau Wi-Fi spécifié.
6. Ouvrez [la carte des capteurs Robonomics](https://sensors.robonomics.network/#/) et trouvez l'endroit où vous avez installé le capteur. En quelques minutes, vous pourrez voir votre capteur avec des données sur la carte.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}ensor-map"} %}{% endroboWikiPicture %}

## Home Assistant

Il existe deux options d'installation disponibles :

### Option 1 : HACS

La manière la plus simple d'ajouter un capteur Local Luftdaten est via HACS. [Ici](https://hacs.xyz/docs/setup/download/), vous pouvez trouver une brève explication sur la façon de configurer HACS.

Une fois HACS installé, accédez à HACS -> Intégrations et recherchez l'intégration `Local Luftdaten Sensor`. Cliquez sur le bouton de téléchargement et redémarrez Home Assistant une fois l'intégration téléchargée.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### Option 2 : Installation Manuelle

Sous l'utilisateur `homeassistant`, clonez le dépôt du projet :

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

</code-helper>

Si vous avez déjà des intégrations personnalisées, copiez le répertoire `custom_components/local_luftdaten/` dans votre répertoire `custom_components`, par exemple :

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

Si vous n'avez pas d'intégrations personnalisées, copiez l'intégralité du répertoire `custom_components` dans votre répertoire de configuration Home Assistant, par exemple :

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Configuration

Créez une nouvelle entrée de capteur dans votre `configuration.yaml` et ajustez le nom d'hôte ou l'adresse IP. Pour trouver l'adresse IP locale de votre capteur, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Le nom peut être n'importe lequel.

|Paramètre              |Type    | Nécessité    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | requis       | Adresse IP du capteur
|`scan_interval`        | number | par défaut: 180 | Fréquence (en secondes) entre les mises à jour
|`name`                 | string | requis      | Nom du capteur
|`monitored_conditions` | liste   | requis     | Liste des capteurs surveillés


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Capteur de qualité de l'air
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> Une liste de tous les capteurs pris en charge peut être trouvée dans le [dépôt](https://github.com/lichtteil/local_luftdaten).

Redémarrez votre Home Assistant.
Après cela, vous pouvez ajouter un capteur à votre tableau de bord. Le nom de l'entité sera le nom que vous avez ajouté à `configuration.yaml`.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}