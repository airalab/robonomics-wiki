---
title: Connexioner le capteur

contributors: [LoSk-p, makyul]
---

Un exemple de travail est dans la vidéo:

https://youtu.be/jsaFCVAx2sA

## Exigences

* [Aqara Smart Plug](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (ou l'un des [pris en charge](https://www.zigbee2mqtt.io/dansformation/supported_adapters.html))

Le service fonctionne sur Raspberry Pi et contacte la prise intelligente via le protocole zigbee.

## Clé Zigbee

Si vous avez le JetHome USB JetStick Z2, il possède déjà le micrologiciel nécessaire, vous n'avez donc pas besoin de le flasher. Mais si vous avez un autre adaptateur, vous devez d'abord le flasher avec le logiciel zigbee2MQTT. Vous pouvez trouver des instructions pour votre appareil [ici](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Connectez l'adaptateur et vérifiez l'adresse de l'adaptateur (cela peut aussi être `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Vous devrez peut-être d'abord accéder au port USB. Ajoutez votre utilisateur à `dialout` groupe (cela fonctionne pour Ubuntu, mais le nom du groupe peut être différent sur d'autres systèmes d'exploitation).
Pour Ubuntu:
```bash
sudo usermod -a -G dialout $USER
```
Pour Arch:
```bash
sudo usermod -a -G uucp $USER
```
Ensuite, déconnectez-vous et reconnectez-vous ou redémarrez l'ordinateur.

## Installeration

Clonez le référentiel:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Configuration

Allez à `data/configuration.yaml` et définissez `permit_join: true`:

```
# Home Assistant integration (MQTT discovery)
homeassistant: false

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://172.17.0.1'
  # MQTT server authentication, uncomment if required:
  # user: my_user
  # password: my_password

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/ttyUSB0
```
Vous voudrez peut-être également remplir les champs `server` et `port` avec les informations correspondantes. Dans le champ `server` utilisez l'adresse IP du `docker0` pont pour établir la connexion: 

```bash
$ ip a                                                 127
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

...

5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:dff:feff:5fa3/64 scope link 
       valid_lft forever preferred_lft forever
```
Ici, votre adresse est `172.17.0.1`.

Ensuite, créez le fichier config/config.yaml avec les informations suivantes et définissez votre emplacement (vous pouvez vous référer à https://countrycode.org/ pour le code ISO à 3 lettres):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Connectez la prise

Première exécution:

```
docker-compose up     
```

Pour passer au mode d'appairage sur la prise, appuyez longuement sur le bouton d'alimentation pendant quelques secondes jusqu'à ce que le voyant commence à clignoter rapidement en bleu.

Dans les journaux, vous devriez voir maintenant que votre plug a commencé à publier sur mqtt.


## Après l'appariement

Si vous ne souhaitez pas autoriser d'autres appareils à s'associer à votre clé, vous devez maintenant aller à `data/configuration.yaml` et mettre `permit_join: false`. Redémarrez le service (utilisez 'Ctrl+C' et

```bash
docker-compose up     
```
encore une fois pour soumettre les modifications).

## En cours d'exécution
Lors du premier démarrage, un compte pour la prise sera créé. 
> Si vous avez déjà un compte, vous devez ajouter sa graine au fichier `config.config.yaml` dans la section `device_seed` :
>
> ```
> location: RUS
> service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
> twin_id: 5
> sending_timeout: 3600
> broker_address: "172.17.0.1"
> broker_port: 1883
> device_seed: <device_seed>
>```

Après la création du compte, vous verrez l'adresse dans les journaux (la graine sera ajoutée à `config/config.yaml`):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Vous devez transférer quelques jetons sur ce compte pour les frais de transaction, vous pouvez le faire sur [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts). 

Le service verra que vous avez suffisamment de jetons, dans les journaux vous verrez:
```
plug               | Balance is OK
```
Le service verra les messages MQTT de la prise et assurera une utilisation sûre de l'énergie. Toutes les heures (vous pouvez modifier le délai d'attente dans la section `config/config.yaml` in `sending_timeout` , le délai d'attente est en secondes), il créera un journal de données avec les informations suivantes:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
