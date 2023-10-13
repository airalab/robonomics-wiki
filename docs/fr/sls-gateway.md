---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**Dans cet article, vous configurerez la passerelle Robonomics SLS. Vous installerez le logiciel requis pour la passerelle, le configurerez et le connecterez à Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Firmware

Tout d'abord, vous devez installer le micrologiciel du microcontrôleur de la passerelle. Préparez la passerelle en réglant les commutateurs `1` et `3` dans la partie inférieure de la passerelle SLS sur `ON`, les autres doivent être `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

Connectez la passerelle à votre Raspberry Pi via le port USB de type C sur la passerelle.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Clonez le référentiel avec le micrologiciel sur votre Raspberry Pi:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

Accédez à `robonomics-hass-utils/esp_firmware/linux`. Pour flasher la passerelle SLS, vous devez exécuter les scripts `Clear` et `Flash_16mb`.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### Dépannage

Si vous rencontrez des problèmes lors de la mise à jour du micrologiciel de la passerelle, vous devez effectuer des étapes supplémentaires:

1. Assurez-vous d'avoir installé le module pySerial:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. Accordez à votre utilisateur les droits d'accès au port USB et redémarrez l'ordinateur:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. Dans certains cas, il est nécessaire de modifier le paramètre de bande passante dans le script pour mettre à jour le micrologiciel. Ouvrez le script `Flash_16mb.sh` avec l'éditeur `nano` et modifiez le paramètre de baud de `921600` à une valeur plus petite (par exemple, `115200`).

## Configuration

1. Déconnectez la passerelle SLS de l'ordinateur. Réglez les commutateurs à l'arrière de la passerelle sur la position appropriée. Les commutateurs `5` (RX Zigbee vers ESP) et `6` (TX Zigbee vers ESP) doivent être en position `ON`, les autres doivent être `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Connectez le câble d'alimentation de type C. Le voyant lumineux au centre doit devenir vert.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. Au premier démarrage, la passerelle commencera à partager le Wi-Fi avec le SSID `zgw****`. Connectez-vous à ce réseau. Gardez à l'esprit que le signal peut être assez faible, il est donc préférable de garder la passerelle SLS plus près de votre ordinateur. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. Si la connexion est réussie, l'interface Web s'ouvrira (ou vous pouvez la trouver à l'adresse 192.168.1.1). 

5. Vous verrez la page `Wi-Fi Settings`. Sélectionnez votre Wi-Fi et entrez le mot de passe. Appuyez sur le bouton `Apply`. La passerelle redémarrera et se connectera à votre réseau Wi-Fi. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. Trouvez l'adresse IP locale de la passerelle SLS pour accéder à l'interface Web. Pour le trouver, vous pouvez utiliser l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Le nom de la passerelle doit ressembler à ceci: `zgw****`. Ouvrez l'interface Web de la passerelle en collant l'adresse IP de la passerelle dans un navigateur.

7. Allez dans `Setting` -> `Hardware` et assurez-vous que les paramètres ressemblent à l'image. Corrigez les paramètres si nécessaire et cliquez sur le bouton `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

Le tableau avec les valeurs requises:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Ensuite, redémarrez la passerelle. Choisissez `Actions` -> `Reboot system` dans le coin supérieur droit.

9. Assurez-vous que la passerelle fonctionne correctement dans la fenêtre d'informations Zigbee. L'état de l'appareil doit être `OK`.

10. Configurez l'ajout automatique des appareils à Home Assistant. Allez dans `Zigbee` -> `Config`, puis choisissez `Home Assistant MQTT Discovery` et `Clear States`. Enregistrez les modifications et **redémarrez** la passerelle SLS.

<robo-wiki-note type="warning">

Si vous avez déjà une passerelle SLS active chez vous et que vous configurez maintenant une autre passerelle, elles entreront en conflit. Pour résoudre ce problème, vous devez changer le canal sur le nouveau périphérique. Pour ce faire, allez dans `Zigbee` -> `Config` et changez le canal pour un autre (par exemple, le canal 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## Association de SLS à MQTT

Après avoir configuré la passerelle SLS, vous devez connecter la passerelle SLS à Home Assistant. Ouvrez l'interface Web de la passerelle SLS et allez dans `Settings/Link` -> `MQTT Setup`:


Ajoutez l'adresse de votre courtier (adresse du Raspberry Pi avec Home Assistant dans le réseau local, vous pouvez la trouver avec l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), le port (par défaut est `1883`), votre nom d'utilisateur et mot de passe du courtier (que vous avez créé précédemment) et le nom du sujet (vous pouvez choisir n'importe lequel). De plus, l'adresse IP du Raspberry Pi doit être statique. Cliquez sur `Enable` et `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

Enregistrez les modifications. Maintenant, les appareils seront automatiquement affichés dans Home Assistant.

## Connectez les appareils

Connectez vos appareils en allant dans `Zigbee` -> `Join`. Mettez vos capteurs en mode d'appairage, la manière la plus courante de passer un appareil en mode de connexion est de maintenir enfoncé son bouton d'alimentation ou de les allumer/éteindre 5 fois. Appuyez sur le bouton `Enable Join` pour commencer la recherche des appareils Zigbee. Vous verrez les capteurs actifs.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


Maintenant, vous pouvez vous rendre dans la section [**Abonnement IoT**](/docs/sub-activate) et commencer à activer l'abonnement Robonomics.
