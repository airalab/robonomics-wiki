---
title: Connecter le capteur

contributors: [LoSk-p, makyul]
---

Exemple de travail dans la vidéo :

https://youtu.be/jsaFCVAx2sA

## Exigences

* [Prise intelligente Aqara](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Adaptateur Zigbee [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (ou l'un des [pris en charge](https://www.zigbee2mqtt.io/information/supported_adapters.html))

Le service fonctionne sur Raspberry Pi et communique avec la prise intelligente via le protocole Zigbee.

## Clé Zigbee

Si vous avez le JetHome USB JetStick Z2, il possède déjà le micrologiciel nécessaire, vous n'avez donc pas besoin de le flasher. Mais si vous avez un autre adaptateur, vous devez d'abord le flasher avec le logiciel zigbee2MQTT. Vous pouvez trouver des instructions pour votre appareil [ici](https://www.zigbee2mqtt.io/information/supported_adapters.html).

Connectez l'adaptateur et vérifiez l'adresse de l'adaptateur (elle peut également être `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

Vous devrez peut-être d'abord accéder au port USB. Ajoutez votre utilisateur au groupe `dialout` (cela fonctionne pour Ubuntu, mais le nom du groupe peut être différent sur d'autres systèmes d'exploitation).
Pour Ubuntu :
```bash
sudo usermod -a -G dialout $USER
```
Pour Arch :
```bash
sudo usermod -a -G uucp $USER
```
Ensuite, déconnectez-vous et reconnectez-vous ou redémarrez l'ordinateur.

## Installation

Clonez le dépôt :

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## Configuration

Allez dans `data/configuration.yaml` et définissez `permit_join: true` :

```
# Intégration Home Assistant (découverte MQTT)
homeassistant: false

# autoriser les nouveaux appareils à se connecter
permit_join: true

# Paramètres MQTT
mqtt:
  # Sujet de base MQTT pour les messages MQTT zigbee2mqtt
  base_topic: zigbee2mqtt
  # URL du serveur MQTT
  server: 'mqtt://172.17.0.1'
  # Authentification du serveur MQTT, décommentez si nécessaire :
  # user: my_user
  # password: my_password

# Paramètres série
serial:
  # Emplacement du sniffer USB CC2531
  port: /dev/ttyUSB0
```
Vous voudrez peut-être également remplir les champs `server` et `port` avec les informations correspondantes. Dans le champ `server`, utilisez l'adresse IP du pont `docker0` pour établir la connexion :

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

Ensuite, créez le fichier config/config.yaml avec les informations suivantes et définissez votre emplacement (vous pouvez consulter https://countrycode.org/ pour le code ISO à 3 lettres) :

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## Connecter la prise

Commencez par exécuter :

```
docker-compose up     
```

Pour passer en mode d'appairage sur la prise, maintenez enfoncé le bouton d'alimentation pendant quelques secondes jusqu'à ce que la lumière clignote rapidement en bleu.

Dans les journaux, vous devriez maintenant voir que votre prise a commencé à publier sur MQTT.

## Après l'appairage

Si vous ne souhaitez pas autoriser d'autres appareils à s'appairer avec votre clé, vous devez maintenant aller dans `data/configuration.yaml` et définir `permit_join: false`. Redémarrez le service (utilisez 'Ctrl+C' et 

```bash
docker-compose up     
```
encore une fois pour appliquer les modifications).

## Exécution
Au premier démarrage, un compte pour la prise sera créé.
> Si vous avez déjà un compte, vous devez ajouter sa graine au fichier `config.config.yaml` dans la section `device_seed` :
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

Après la création du compte, vous verrez l'adresse dans les journaux (la graine sera ajoutée à `config/config.yaml`) :
```
plug               | Compte généré avec l'adresse : 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
Vous devez transférer quelques jetons sur ce compte pour les frais de transaction, vous pouvez le faire sur [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts).

Le service vérifiera que vous avez suffisamment de jetons, dans les journaux vous verrez :
```
plug               | Le solde est OK
```
Le service verra les messages MQTT de la prise et enregistrera la consommation d'énergie. Toutes les heures (vous pouvez modifier le délai dans `config/config.yaml` dans la section `sending_timeout`, le délai est en secondes), il créera un journal de données avec les informations suivantes :
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```