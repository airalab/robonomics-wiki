---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**Les instructions suivantes sont fournies par [Hubo Bubo](https://github.com/hubobubo)**

**L'article original se trouve [ici](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Introduction
Pour mieux surveiller et maintenir le(s) nœud(s) Robonomics, il est bon de mettre en place une surveillance basée sur le serveur Prometheus et Grafana. Ce document montrera comment configurer chacun d'eux pour surveiller pleinement votre nœud.

## Prérequis
* [Configuration du serveur avec Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [Collator parachain Robonomics installé](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Assurez-vous que le service robonomics.service fonctionne sur votre machine et que le port 9615 est accessible

## Étape 1 — Création des utilisateurs de service

Pour des raisons de sécurité, nous commencerons par créer deux nouveaux comptes d'utilisateur, prometheus et node_exporter. Créez ces deux utilisateurs et utilisez les options _--no-create-home_ et _--shell /bin/false_ afin que ces utilisateurs ne puissent pas se connecter au serveur.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Avant de télécharger les binaires de Prometheus, créez les répertoires nécessaires pour stocker les fichiers et les données de Prometheus. Suivant les conventions standard de Linux, nous allons créer un répertoire dans _/etc_ pour les fichiers de configuration de Prometheus et un répertoire dans _/var/lib_ pour ses données.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Maintenant, définissez la propriété de l'utilisateur et du groupe sur les nouveaux répertoires sur l'utilisateur prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Étape 2 — Téléchargement de Prometheus

Tout d'abord, téléchargez et décompressez la version stable actuelle de Prometheus dans votre répertoire personnel. Vous pouvez trouver les derniers binaires sur la [page de téléchargement de Prometheus.](https://prometheus.io/download/)

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Maintenant, décompressez l'archive téléchargée.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Cela créera un répertoire appelé prometheus-2.21.0.linux-amd64 contenant deux fichiers binaires (prometheus et promtool), des répertoires _consoles_ et _console_libraries_ contenant les fichiers d'interface web, une licence, un avis et plusieurs fichiers d'exemple.

Copiez les deux binaires dans le répertoire _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Définissez la propriété utilisateur et groupe sur les binaires pour l'utilisateur prometheus créé à l'étape 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Copiez les répertoires consoles et _console_libraries_ dans _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Définissez la propriété utilisateur et groupe sur les répertoires pour l'utilisateur prometheus. L'utilisation du drapeau -R garantira que la propriété est définie également sur les fichiers à l'intérieur du répertoire.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Maintenant que Prometheus est installé, nous allons créer ses fichiers de configuration et de service en préparation de son premier démarrage.

## Étape 3 — Configuration de Prometheus

Dans le répertoire _/etc/prometheus_, utilisez nano ou votre éditeur de texte préféré pour créer un fichier de configuration nommé _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
Dans les paramètres globaux, définissez l'intervalle par défaut pour le raclage des métriques. Notez que Prometheus appliquera ces paramètres à chaque exportateur à moins que les paramètres propres à chaque exportateur ne remplacent les paramètres globaux.

```
global:
  scrape_interval: 15s

```
Cette valeur scrape_interval indique à Prometheus de collecter des métriques de ses exportateurs toutes les 15 secondes, ce qui est suffisant pour la plupart des exportateurs.
Maintenant, ajoutez Prometheus lui-même à la liste des exportateurs à collecter avec la directive scrape_configs suivante :

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus utilise le _job_name_ pour étiqueter les exportateurs dans les requêtes et sur les graphiques, alors assurez-vous de choisir quelque chose de descriptif ici.

Et, comme Prometheus exporte des données importantes sur lui-même que vous pouvez utiliser pour surveiller les performances et le débogage, nous avons remplacé la directive globale scrape_interval de 15 secondes par 5 secondes pour des mises à jour plus fréquentes.

Enfin, Prometheus utilise les directives _static_configs_ et _targets_ pour déterminer où les exportateurs s'exécutent. Comme cet exportateur particulier s'exécute sur le même serveur que Prometheus lui-même, nous pouvons utiliser localhost au lieu d'une adresse IP avec le port par défaut, 9090.

Votre fichier de configuration devrait maintenant ressembler à ceci :

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Enregistrez le fichier et quittez votre éditeur de texte.

Maintenant, définissez la propriété de l'utilisateur et du groupe sur le fichier de configuration sur l'utilisateur prometheus créé à l'étape 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Avec la configuration terminée, nous sommes prêts à tester Prometheus en l'exécutant pour la première fois.

## Étape 4 — Exécution de Prometheus

Démarrez Prometheus en tant qu'utilisateur _prometheus_, en fournissant le chemin à la fois du fichier de configuration et du répertoire de données.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

La sortie contient des informations sur la progression du chargement de Prometheus, le fichier de configuration et les services associés. Il confirme également que Prometheus écoute sur le port _9090_.

```
_log output_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="Aucune rétention de temps ou de taille n'a été définie, donc l'utilisation de la rétention de temps par défaut" durée=15j
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Démarrage de Prometheus" version="(version=2.21.0, branche=HEAD, révision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, utilisateur=root@a4d9bea8479e, date=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=illimité, hard=illimité)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Démarrage de TSDB ..."2020-09-14T15:55:53.368Z appelant=web.go:523 composant=web msg="Commencer à écouter les connexions" adresse=0.0.0.0:9090
14 sept. 17:55:53 robonomics prometheus[29488]: niveau=info ts=2020-09-14T15:55:53.372Z appelant=head.go:644 composant=tsdb msg="Rejouer les fragments mappables en mémoire sur disque s'il y en a"
14 sept. 17:55:53 robonomics prometheus[29488]: niveau=info ts=2020-09-14T15:55:53.373Z appelant=head.go:658 composant=tsdb msg="Rejeu des fragments mappables en mémoire sur disque terminé" durée=12.659µs
14 sept. 17:55:53 robonomics prometheus[29488]: niveau=info ts=2020-09-14T15:55:53.373Z appelant=head.go:664 composant=tsdb msg="Rejouer le WAL, cela peut prendre un certain temps"
14 sept. 17:55:53 robonomics prometheus[29488]: niveau=info ts=2020-09-14T15:55:53.380Z appelant=head.go:716 composant=tsdb msg="Segment WAL chargé" segment=0 maxSegment=1
14 sept. 17:55:53 robonomics prometheus[29488]: niveau=info ts=2020-09-14T15:55:53.381Z appelant=head.go:716 composant=tsdb msg="Segment WAL chargé" segment=1 maxSegment=1
14 sept. 17:55:53 robonomics prometheus[29488]: niveau=info ts=2020-09-14T15:55:53.381Z appelant=head.go:719 composant=tsdb msg="Rejeu WAL terminé" durée_rejeu_checkpoint=48.125µs durée_rejeu_wal=8.253748ms durée_rejeu_totale=8.343335ms
14 sept. 17:55:53 robonomics prometheus[29488]: niveau=info ts=2020-09-14T15:55:53.383Z appelant=main.go:721 type_fs=EXT4_SUPER_MAGIC
14 sept. 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB démarré"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Chargement du fichier de configuration" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Chargement complet du fichier de configuration" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Le serveur est prêt à recevoir des requêtes web."

Si vous recevez un message d'erreur, vérifiez que vous avez utilisé la syntaxe YAML dans votre fichier de configuration, puis suivez les instructions à l'écran pour résoudre le problème.

Maintenant, arrêtez Prometheus en appuyant sur _CTRL+C_, puis ouvrez un nouveau fichier de service _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Le fichier de service indique à _systemd_ d'exécuter Prometheus en tant qu'utilisateur prometheus, avec le fichier de configuration situé dans le répertoire _/etc/prometheus/prometheus.yml_ et de stocker ses données dans le répertoire _/var/lib/prometheus_. Copiez le contenu suivant dans le fichier :

```
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

Enfin, enregistrez le fichier et fermez votre éditeur de texte. Pour utiliser le service nouvellement créé, rechargez systemd.

```
sudo systemctl daemon-reload

```
Vous pouvez maintenant démarrer Prometheus en utilisant la commande suivante :

```
sudo systemctl start prometheus

```
Pour vérifier que Prometheus fonctionne, vérifiez le statut du service.

```
sudo systemctl status prometheus

```
La sortie vous indique le statut de Prometheus, l'identifiant du processus principal (PID), l'utilisation de la mémoire, et plus encore.

Si le statut du service n'est pas actif, suivez les instructions à l'écran et retracez les étapes précédentes pour résoudre le problème avant de continuer le tutoriel.

```
* prometheus.service - Prometheus
   Chargé : chargé (/etc/systemd/system/prometheus.service; activé; préréglage du fournisseur : activé)
   Actif : actif (en cours d'exécution) depuis lun. 2020-09-14 17:59:48 CEST; il y a 24h
 PID principal : 29650 (prometheus)
    Tâches : 9 (limite : 4915)
   Groupe de contrôle : /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Lorsque vous êtes prêt à continuer, appuyez sur _Q_ pour quitter la commande de statut. Enfin, activez le service pour qu'il démarre au démarrage.

```
sudo systemctl enable prometheus

```

Maintenant que Prometheus est opérationnel, nous pouvons installer un exportateur supplémentaire pour générer des métriques sur les ressources de notre serveur.

## Étape 5 — Téléchargement de Node Exporter

Pour étendre Prometheus au-delà des métriques le concernant uniquement, nous allons installer un exportateur supplémentaire appelé Node Exporter. Node Exporter fournit des informations détaillées sur le système, y compris l'utilisation du CPU, du disque et de la mémoire. Téléchargez la version stable actuelle de Node Exporter dans votre répertoire personnel. Vous pouvez trouver les derniers binaires sur la [page de téléchargement de Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Maintenant, décompressez l'archive téléchargée.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Cela créera un répertoire appelé _node_exporter-1.0.1.linux-amd64_ contenant un fichier binaire nommé _node_exporter_, une licence et un avis.

Copiez le binaire dans le répertoire _/usr/local/bin_ et définissez la propriété de l'utilisateur et du groupe sur l'utilisateur node_exporter que vous avez créé à l'étape 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Maintenant que vous avez installé Node Exporter, testons-le en l'exécutant avant de créer un fichier de service pour qu'il démarre au démarrage.

## Étape 6 — Exécution de Node Exporter

Les étapes pour exécuter Node Exporter sont similaires à celles pour exécuter Prometheus lui-même. Commencez par créer le fichier de service Systemd pour Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Copiez le contenu suivant dans le fichier de service :

```
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter --collector.systemd

[Install]
WantedBy=multi-user.target
```

Enregistrez le fichier et fermez votre éditeur de texte. Enfin, rechargez systemd pour utiliser le service nouvellement créé.

```
sudo systemctl daemon-reload

```
Vous pouvez maintenant exécuter Node Exporter en utilisant la commande suivante :

```
sudo systemctl start node_exporter

```
Vérifiez que Node Exporter fonctionne correctement avec la commande status.

```
sudo systemctl status node_exporter

```
Comme précédemment, cette sortie vous indique l'état de Node Exporter, l'identifiant du processus principal (PID), l'utilisation de la mémoire, et plus encore. Si l'état du service n'est pas actif, suivez les messages à l'écran et retracez les étapes précédentes pour résoudre le problème avant de continuer.

```
_Output_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)
   Tâches : 7 (limite : 4915)
   CGroup : /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

Enfin, activez Node Exporter pour qu'il démarre au démarrage.

sudo systemctl enable node_exporter

Avec Node Exporter entièrement configuré et fonctionnant comme prévu, nous allons dire à Prometheus de commencer à collecter les nouvelles métriques.

## Étape 7 — Configuration de Prometheus pour collecter les données de Node Exporter

Comme Prometheus ne collecte que les exportateurs définis dans la partie scrape_configs de son fichier de configuration, nous devrons ajouter une entrée pour Node Exporter, tout comme nous l'avons fait pour Prometheus lui-même. Ouvrez le fichier de configuration.

sudo nano /etc/prometheus/prometheus.yml

À la fin du bloc scrape_configs, ajoutez une nouvelle entrée appelée node_exporter.

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

Étant donné que cet exportateur s'exécute également sur le même serveur que Prometheus lui-même, nous pouvons utiliser localhost au lieu d'une adresse IP, ainsi que le port par défaut de Node Exporter, 9100. Votre fichier de configuration complet devrait ressembler à ceci :

global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

Enregistrez le fichier et quittez votre éditeur de texte lorsque vous êtes prêt à continuer. Enfin, redémarrez Prometheus pour mettre les changements en vigueur.

sudo systemctl restart prometheus

Vérifiez à nouveau que tout fonctionne correctement avec la commande status.

sudo systemctl status prometheus

Si l'état du service n'est pas défini sur actif, suivez les instructions à l'écran et retracez vos étapes précédentes avant de passer à la suite.

Sortie
* prometheus.service - Prometheus
   Chargé : chargé (/etc/systemd/system/prometheus.service; activé; préréglage du fournisseur : activé)
   Actif : actif (en cours d'exécution) depuis Mar 2020-09-15 19:06:56 CEST; il y a 2s
 Main PID: 19725 (prometheus)
    Tâches: 8 (limite : 4915)
   CGroup : /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Nous avons maintenant installé, configuré et lancé Prometheus et Node Exporter.

## Étape 8 - Ajout de l'exportateur Robonomic intégré dans node_exporter

Après avoir installé avec succès Prometheus et node_exporter, nous devrons utiliser l'exportateur prometheus intégré dans chaque projet de substrat. Pour ce faire, nous devons ajouter une entrée supplémentaire à _/etc/prometheus/prometheus.yml_.
Ouvrez le fichier de configuration.

```
sudo nano /etc/prometheus/prometheus.yml

```
À la fin du bloc scrape_configs, ajoutez une nouvelle entrée appelée robonomic_exporter.

```
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Enregistrez le fichier et quittez votre éditeur de texte. Votre fichier de configuration complet devrait ressembler à ceci :

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```

Enfin, redémarrez Prometheus pour mettre les changements en vigueur.

```
sudo systemctl restart prometheus

```
Vérifiez à nouveau que tout fonctionne correctement avec la commande status.

```
sudo systemctl status prometheus

```
Nous avons maintenant _Prometheus_ et _Node Exporter_ ainsi que _Robonomic Exporter_ installés, configurés et en cours d'exécution. Passez maintenant à Grafana.

## Étape 9 - Configuration de Grafana

La dernière étape consiste à connecter Prometheus en tant que source de données dans Grafana. Pour les besoins de ce tutoriel, nous utiliserons Grafana basé sur le cloud gratuit qui permet d'avoir jusqu'à 5 tableaux de bord ainsi qu'un [tableau de bord Robonomics dédié](https://grafana.com/grafana/dashboards/13015). Il vous suffit de vous rendre sur [grafana.com](https://grafana.com/) pour créer un nouveau compte et vous connecter à votre nouvelle instance Grafana.

Au début, nous devons ajouter une nouvelle _**Source de données**_ à Grafana, qui dans notre cas sera le serveur Prometheus.
Allez dans Source de données :

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

Ensuite, cliquez sur **_Ajouter une source de données_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

Ensuite, sélectionnez _**Prometheus**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

Sur la nouvelle page, saisissez l'**_adresse IP de votre serveur Prometheus avec le port 9090_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

Après cela, cliquez sur _**Enregistrer et tester**_ ; si vous avez suivi toutes les étapes, vous devriez voir un indicateur vert et être prêt à importer le tableau de bord. Sur le site principal, cliquez sur **+** puis sur **Importer** comme indiqué sur l'image ci-dessous :

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Import dashboard"} %}{% endroboWikiPicture %}

Ensuite, vous devriez voir la page d'importation :

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Import page"} %}{% endroboWikiPicture %}

Dans l'_URL ou l'ID du tableau de bord Grafana.com_, écrivez _**13015**_ (car il s'agit de l'ID du tableau de bord Robonomic):

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

Après le chargement du tableau de bord externe, vous obtiendrez cet écran :

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"Importation du tableau de bord XRT 13015"} %}{% endroboWikiPicture %}

La dernière étape consiste à choisir le **_Source de données_** précédemment créé et cliquer sur _**Importer**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"Prometheus en tant que source de données"} %}{% endroboWikiPicture %}

C'EST TOUT ! À ce stade, vous devriez voir le tableau de bord importé.


## Références

* [Comment installer Prometheus sur Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Créer un tableau de bord de surveillance avec Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Support de Grafana pour Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Surveillance des métriques d'hôte Linux avec l'exportateur de nœuds](https://prometheus.io/docs/guides/node-exporter/)
* [Interrogation de Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Visualisation des métriques de nœud](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Exportateur Prometheus Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [Tableau de bord Polkadot](https://github.com/w3f/polkadot-dashboard)
* [Métrique de nœud Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Exportateur de nœud pour le tableau de bord Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Métriques Grafana ROBONOMICS (XRT)](https://grafana.com/grafana/dashboards/13015)