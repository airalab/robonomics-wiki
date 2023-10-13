---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**L'instruction suivante est fournie par [Hubo Bubo](https://github.com/hubobubo)**

**L'article original se trouve [ici](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Introduction
Pour mieux surveiller et maintenir le(s) nœud(s) Robonomics, il est bon de configurer une surveillance basée sur Prometheus Server et Grafana. Ce document vous montrera comment configurer chacun d'entre eux pour surveiller pleinement votre nœud.

##  Prérequis
* [Configuration du serveur avec Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Collateur parachain Robonomics installé](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Assurez-vous que robonomics.service fonctionne sur votre machine et que le port 9615 est accessible 

## Étape 1 - Création des utilisateurs de service

Pour des raisons de sécurité, nous commencerons par créer deux nouveaux comptes d'utilisateur, prometheus et node_exporter. Créez ces deux utilisateurs et utilisez les options _--no-create-home_ et _--shell /bin/false_ afin que ces utilisateurs ne puissent pas se connecter au serveur.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Avant de télécharger les binaires de Prometheus, créez les répertoires nécessaires pour stocker les fichiers et les données de Prometheus. Suivant les conventions standard de Linux, nous créerons un répertoire dans _/etc_ pour les fichiers de configuration de Prometheus et un répertoire dans _/var/lib_ pour ses données.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Maintenant, définissez la propriété de l'utilisateur et du groupe sur les nouveaux répertoires pour l'utilisateur prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Étape 2 - Téléchargement de Prometheus

Tout d'abord, téléchargez et décompressez la version stable actuelle de Prometheus dans votre répertoire personnel. Vous pouvez trouver les derniers binaires sur la [page de téléchargement de Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Maintenant, décompressez l'archive téléchargée.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Cela créera un répertoire appelé prometheus-2.21.0.linux-amd64 contenant deux fichiers binaires (prometheus et promtool), des répertoires _consoles_ et _console_libraries_ contenant les fichiers d'interface web, une licence, une notice et plusieurs fichiers d'exemple.

Copiez les deux binaires dans le répertoire _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Définissez la propriété de l'utilisateur et du groupe sur les binaires pour l'utilisateur prometheus créé à l'étape 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Copiez les répertoires consoles et _console_libraries_ dans _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Définissez la propriété de l'utilisateur et du groupe sur les répertoires pour l'utilisateur prometheus. L'utilisation du drapeau -R garantira que la propriété est définie sur les fichiers à l'intérieur du répertoire également.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Maintenant que Prometheus est installé, nous allons créer sa configuration et ses fichiers de service en préparation de sa première exécution.

## Étape 3 - Configuration de Prometheus

Dans le répertoire _/etc/prometheus_, utilisez nano ou votre éditeur de texte préféré pour créer un fichier de configuration nommé _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
Dans les paramètres globaux, définissez l'intervalle par défaut pour la collecte des métriques. Notez que Prometheus appliquera ces paramètres à chaque exportateur à moins que les paramètres propres de chaque exportateur ne remplacent les paramètres globaux.

```
global:
  scrape_interval: 15s

```
Cette valeur scrape_interval indique à Prometheus de collecter les métriques de ses exportateurs toutes les 15 secondes, ce qui est suffisamment long pour la plupart des exportateurs.
Maintenant, ajoutez Prometheus lui-même à la liste des exportateurs à collecter avec la directive scrape_configs suivante:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus utilise le _job_name_ pour étiqueter les exportateurs dans les requêtes et sur les graphiques, assurez-vous donc de choisir quelque chose de descriptif ici.

Et, comme Prometheus exporte des données importantes sur lui-même que vous pouvez utiliser pour surveiller les performances et le débogage, nous avons remplacé la directive globale scrape_interval de 15 secondes à 5 secondes pour des mises à jour plus fréquentes.

Enfin, Prometheus utilise les directives _static_configs_ et _targets_ pour déterminer où les exportateurs s'exécutent. Étant donn que cet exportateur particulier s'exécute sur le même serveur que Prometheus lui-même, nous pouvons utiliser localhost au lieu d'une adresse IP avec le port par défaut, 9090.

Votre fichier de configuration devrait maintenant ressembler à ceci:

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

Maintenant, définissez la propriété de l'utilisateur et du groupe sur le fichier de configuration pour l'utilisateur prometheus créé à l'étape 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Avec la configuration terminée, nous sommes prêts à tester Prometheus en l'exécutant pour la première fois.

## Étape 4 - Exécution de Prometheus

Démarrez Prometheus en tant qu'utilisateur _prometheus_, en fournissant le chemin vers le fichier de configuration et le répertoire de données.

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
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="No time or size retention was set so using the default time retention" duration=15d
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Starting Prometheus" version="(version=2.21.0, branch=HEAD, revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Starting TSDB ..."
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.368Z caller=web.go:523 component=web msg="Start listening for connections" address=0.0.0.0:9090
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="Replaying on-disk memory mappable chunks if any"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="On-disk memory mappable chunks replay completed" duration=12.659µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="Replaying WAL, this may take a while"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="WAL segment loaded" segment=0 maxSegment=1
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="WAL segment loaded" segment=1 maxSegment=1
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="WAL replay completed" checkpoint_replay_duration=48.125µs wal_replay_duration=8.253748ms total_replay_duration=8.343335ms
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB started"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server is ready to receive web requests."
```
Si vous obtenez un message d'erreur, vérifiez que vous avez utilisé la syntaxe YAML dans votre fichier de configuration, puis suivez les instructions à l'écran pour résoudre le problème.

Maintenant, arrêtez Prometheus en appuyant sur _CTRL+C_, puis ouvrez un nouveau fichier de service _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Le fichier de service indique à _systemd_ d'exécuter Prometheus en tant qu'utilisateur prometheus, avec le fichier de configuration situé dans le répertoire _/etc/prometheus/prometheus.yml_ et de stocker ses données dans le répertoire _/var/lib/prometheus_. Copiez le contenu suivant dans le fichier:

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
Vous pouvez maintenant démarrer Prometheus en utilisant la commande suivante:

```
sudo systemctl start prometheus

```
Pour vous assurer que Prometheus fonctionne, vérifiez l'état du service.

```
sudo systemctl status prometheus

```
La sortie vous indique l'état de Prometheus, l'identifiant du processus principal (PID), l'utilisation de la mémoire, et plus encore.

Si l'état du service n'est pas actif, suivez les instructions à l'écran et retracez les étapes précédentes pour résoudre le problème avant de continuer le tutoriel.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Lorsque vous êtes prêt à passer à l'étape suivante, appuyez sur _Q_ pour quitter la commande d'état. Enfin, activez le service pour qu'il démarre au démarrage.

```
sudo systemctl enable prometheus

```

Maintenant que Prometheus est opérationnel, nous pouvons installer un exportateur supplémentaire pour générer des métriques sur les ressources de notre serveur.

## Étape 5 - Téléchargement de Node Exporter

Pour étendre Prometheus au-delà des métriques sur lui-même uniquement, nous installerons un exportateur supplémentaire appelé Node Exporter. Node Exporter fournit des informations détaillées sur le système, y compris l'utilisation du CPU, du disque et de la mémoire. Téléchargez la version stable actuelle de Node Exporter dans votre répertoire personnel. Vous pouvez trouver les derniers binaires sur [la page de téléchargement de Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Maintenant, décompressez l'archive téléchargée.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Cela créera un répertoire appelé _node_exporter-1.0.1.linux-amd64_ contenant un fichier binaire nommé _node_exporter_, une licence et un avis.

Copiez le binaire dans le répertoire _/usr/local/bin_ et définissez l'utilisateur et le groupe propriétaires sur l'utilisateur node_exporter que vous avez créé à l'étape 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Maintenant que vous avez installé Node Exporter, testez-le en l'exécutant avant de créer un fichier de service pour qu'il démarre au démarrage.

## Étape 6 - Exécution de Node Exporter

Les étapes pour exécuter Node Exporter sont similaires à celles pour exécuter Prometheus lui-même. Commencez par créer le fichier de service Systemd pour Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Copiez le contenu suivant dans le fichier de service:

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
Vous pouvez maintenant exécuter Node Exporter en utilisant la commande suivante:

```
sudo systemctl start node_exporter

```
Vérifier that Node Exporter’s running correctly with the status command.

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
    Tasks: 7 (limit: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd
```
Enfin, activez Node Exporter pour qu'il démarre au démarrage.

```
sudo systemctl enable node_exporter

```
Avec Node Exporter entièrement configuré et fonctionnant comme prévu, nous allons dire à Prometheus de commencer à collecter les nouvelles métriques.

## Étape 7 - Configuration de Prometheus pour collecter Node Exporter

Parce que Prometheus ne collecte que les exportateurs qui sont définis dans la partie scrape_configs de son fichier de configuration, nous devrons ajouter une entrée pour Node Exporter, tout comme nous l'avons fait pour Prometheus lui-même. Ouvrez le fichier de configuration.

```
sudo nano /etc/prometheus/prometheus.yml

```
À la fin du bloc scrape_configs, ajoutez une nouvelle entrée appelée node_exporter.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Comme cet exportateur s'exécute également sur le même serveur que Prometheus lui-même, nous pouvons utiliser localhost au lieu d'une adresse IP, ainsi que le port par défaut de Node Exporter, 9100. Votre fichier de configuration complet devrait ressembler à ceci:

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
```
Enregistrez le fichier et quittez votre éditeur de texte lorsque vous êtes prêt à continuer. Enfin, redémarrez Prometheus pour mettre les modifications en œuvre.

```
sudo systemctl restart prometheus

```
Vérifiez une fois de plus que tout fonctionne correctement avec la commande d'état.

```
sudo systemctl status prometheus

```
Si l'état du service n'est pas défini sur actif, suivez les instructions à l'écran et retracez vos étapes précédentes avant de passer à la suite.

```
Output
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Nous avons maintenant installé, configuré et exécuté Prometheus et Node Exporter.

## Étape 8 - Ajout de Robonomic build in node_exporter

Après avoir installé avec succès Prometheus et node_exporter, nous devrons utiliser l'exportateur Prometheus intégré dans chaque projet de substrat. Pour cela, nous devons ajouter une entrée supplémentaire à _/etc/prometheus/prometheus.yml_. 
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
Enregistrez le fichier et quittez votre éditeur de texte. Your whole configuration file should look like this:

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

Enfin, redémarrez Prometheus pour appliquer les modifications.

```
sudo systemctl restart prometheus

```
Vérifiez une fois de plus que tout fonctionne correctement avec la commande d'état.

```
sudo systemctl status prometheus

```
Nous avons maintenant _Prometheus_ et _Node Exporter_ ainsi que _Robonomic Exporter_ installés, configurés et exécutés. Passons maintenant à Grafana

## Étape 9 - Configuration de Grafana

La dernière étape consiste à connecter Prometheus en tant que source de données dans Grafana. Pour les besoins de ce didacticiel, nous utiliserons un grafana gratuit basé sur le cloud qui permet d'avoir jusqu'à 5 tableaux de bord ainsi qu'un [tableau de bord Robonomics](https://grafana.com/grafana/dashboards/13015). Allez simplement sur [grafana.com](https://grafana.com/), créez un nouveau compte et connectez-vous à votre instance grafana nouvellement créée.

Au début, nous devons ajouter à Grafana une nouvelle _**Data Source**_ qui dans notre cas sera le serveur Prometheus.
Accédez à la source de données :

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

Cliquez ensuite sur **Ajouter une source de données**

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Next sélectionnez _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

Dans le nouvel écran, indiquez votre **adresse IP du serveur Prometheus avec le port 9090**

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

Après cela _**Enregistrer et tester**_, si vous avez suivi toutes les étapes, vous devriez être vert et prêt à importer le tableau de bord. Sur le site principal, cliquez sur **+** puis sur **Importer** comme indiqué sur la photo ci-dessous :

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

Ensuite, vous devriez voir la page Importer :

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

Dans l'URL ou l'identifiant du tableau de bord _Grafana.com, écrivez _**13015**_ (car il s'agit de l'ID du tableau de bord Robonomic)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

Après avoir chargé le tableau de bord externe, vous obtiendrez cet écran :

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

La dernière étape consiste à choisir la **_Source de données_** créée précédemment et à cliquer sur _**Importer**_.

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

C'EST ÇA ! À ce stade, vous devriez voir le tableau de bord importé.


## Les références


* [Comment installer Prometheus sur Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Créer un tableau de bord de surveillance par Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Prise en charge de Grafana pour Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Surveillance des métriques de l'hôte Linux avec l'exportateur de nœuds](https://prometheus.io/docs/guides/node-exporter/)
* [Interrogation de Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Visualisation des métriques de nœud](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Exportateur de substrat Prometheus](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Métrique du nœud Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Exportateur de nœuds pour le tableau de bord Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Métriques Grafana ROBONOMICS (XRT)](https://grafana.com/grafana/dashboards/13015)
