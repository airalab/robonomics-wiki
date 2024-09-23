---
title: Passerelle Robonomics SLS

contributeurs: [LoSk-p, Fingerling42, nakata5321]
outils:
  - Firmware SLS 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**Dans cet article, vous allez configurer la Passerelle Robonomics SLS. Vous installerez le logiciel requis pour la passerelle, le configurerez et le connecterez à Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"passerelle sls"} %}{% endroboWikiPicture %}

## Firmware

Tout d'abord, vous devez installer le micrologiciel du microcontrôleur de la passerelle. Préparez la passerelle en réglant les commutateurs `1` et `3` dans la partie inférieure de la Passerelle SLS sur `ON`, les autres doivent être sur `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"passerelle sls 13"} %}{% endroboWikiPicture %}

Connectez la passerelle à votre Raspberry Pi via le port USB de type C sur la passerelle.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Clonez le dépôt avec le micrologiciel sur votre Raspberry Pi :

{% codeHelper { additionalLine: "nom_utilisateur_rasppi@nom_hôte_rasppi"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

Allez dans `robonomics-hass-utils/esp_firmware/linux`. Pour flasher la passerelle SLS, vous devez exécuter les scripts `Clear` et `Flash_16mb`.

{% codeHelper { additionalLine: "nom_utilisateur_rasppi@nom_hôte_rasppi"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Dépannage

Si vous rencontrez des problèmes lors de la mise à jour du firmware de la passerelle, vous devez suivre des étapes supplémentaires :

1. Assurez-vous d'avoir le module pySerial installé :

{% codeHelper { additionalLine: "nom_utilisateur_rasppi@nom_hôte_rasppi"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Donnez à votre utilisateur des droits d'accès au port USB et redémarrez l'ordinateur :

{% codeHelper { additionalLine: "nom_utilisateur_rasppi@nom_hôte_rasppi"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. Dans certains cas, il est nécessaire de modifier le paramètre de bande passante dans le script pour mettre à jour le firmware. Ouvrez le script `Flash_16mb.sh` avec l'éditeur `nano` etchangez le paramètre baud de `921600` à une valeur plus petite (par exemple, `115200`).

## Configuration

1. Déconnectez la passerelle SLS de l'ordinateur. Réglez les commutateurs à l'arrière de la passerelle à la position appropriée. Les commutateurs `5` (RX Zigbee vers ESP) et `6` (TX Zigbee vers ESP) doivent être en position `ON`, les autres doivent être en position `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Connectez le câble d'alimentation de type C. Le voyant lumineux au centre devrait devenir vert.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. Au premier démarrage, la passerelle commencera à partager le Wi-Fi avec le SSID `zgw****`. Connectez-vous à ce réseau. Gardez à l'esprit que le signal peut être assez faible, il est donc préférable de garder la passerelle SLS plus proche de votre ordinateur.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. Si la connexion réussit, l'interface web s'ouvrira (ou vous pouvez la trouver sur 192.168.1.1 adresse).

5. Vous verrez la page `Paramètres Wi-Fi`. Sélectionnez votre Wi-Fi et entrez le mot de passe. Appuyez sur le bouton `Appliquer`. La passerelle redémarrera et se connectera à votre réseau Wi-Fi.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Trouvez l'IP locale de la passerelle SLS pour accéder à l'interface web. Pour le trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Le nom de la passerelle devrait ressembler à ceci : `zgw****`. Ouvrez l'interface web de la passerelle en collant l'IP de la passerelle dans un navigateur.

7. Allez dans `Paramètres` -> `Matériel` et assurez-vous que les paramètres ressemblent à l'image. Corrigez les paramètres si nécessaire et cliquez sur le bouton `Enregistrer` : 

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

La table avec les valeurs requises :

| Champ                    | Valeur              |
|--------------------------|:-------------------|
| Module Zigbee            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Broche de réinitialisation Zigbee | 18                 |
| Broche BSL Zigbee        | 19                 |
| Broche du bouton de service | 33 (pullUP - true) |
| Nombre de leds adressables | 0                  |
| Led Rouge (ou addr)      | 21                 |
| Led Verte                | 5                  |
| Led Bleue                | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Ensuite, redémarrez la passerelle. Choisissez `Actions` -> `Redémarrer le système` dans le coin supérieur droit.

9. Assurez-vous que la passerelle fonctionne correctement dans la fenêtre d'informations Zigbee. DeviceState devrait être `OK`.

10. Configurez l'ajout automatique des appareils à Home Assistant. Allez à `Zigbee` -> `Config`, puis choisissez `Home Assistant MQTT Discovery` et `Clear States`. Enregistrez les modifications et redémarrez à nouveau la passerelle SLS.

{% roboWikiNote {type: "warning"}%} Si vous avez déjà une passerelle SLS active dans votre maison, et que vous configurez maintenant une autreun, alors ils entreront en conflit les uns avec les autres. Pour résoudre ce problème, vous devez changer le canal sur le nouveau périphérique. Pour ce faire, allez dans `Zigbee` -> `Config` et changez le canal pour un autre (par exemple, le canal 15). {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## Appariement de SLS à MQTT

Après avoir configuré la passerelle SLS, vous devez connecter la passerelle SLS à Home Assistant. Ouvrez l'interface web de la passerelle SLS et allez dans `Paramètres/Lien` -> `Configuration MQTT` :

Ajoutez l'adresse de votre courtier (adresse du Raspberry Pi avec Home Assistant dans le réseau local, que vous pouvez trouver avec l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), le port (par défaut `1883`), votre nom d'utilisateur et mot de passe du courtier (que vous avez créé précédemment) et le nom du sujet (vous pouvez en choisir un quelconque). De plus, l'adresse IP du Raspberry Pi doit être statique. Cliquez sur `Activer` et `Conserver les états`.Enregistrez les modifications. Désormais, les appareils seront automatiquement affichés dans Home Assistant.

## Connecter les appareils

Connectez vos appareils en allant dans `Zigbee` -> `Rejoindre`. Mettez vos capteurs en mode d'appariement, la manière la plus courante de passer un appareil en mode de connexion est de maintenir enfoncé son bouton d'alimentation ou de les allumer/éteindre 5 fois. Appuyez sur le bouton `Activer la connexion` pour commencer à rechercher des appareils Zigbee. Vous verrez des capteurs actifs.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Maintenant, vous pouvez aller à la section [**Abonnement IoT**](/docs/sub-activate) et commencer à activer l'abonnement Robonomics.