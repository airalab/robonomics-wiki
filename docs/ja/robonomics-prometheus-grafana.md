---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**以下の指示は[Hubo Bubo](https://github.com/hubobubo)によって提供されています**

**元の記事は[こちら](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## はじめに
Robonomicsノードをより効果的に監視および維持するために、Prometheus ServerとGrafanaに基づいた監視を設定することが良いでしょう。このドキュメントでは、ノードを完全に監視するためにそれぞれの設定方法を示します。

##  前提条件
* [Ubuntu 18.04でのサーバーのセットアップ](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Robonomicsパラチェーンコレータのインストール](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* robonomics.serviceがマシンで動作しており、ポート9615に到達可能であることを確認してください。 

## ステップ1 — サービスユーザーの作成

セキュリティ上の理由から、まずprometheusとnode_exporterの2つの新しいユーザーアカウントを作成します。これらの2つのユーザーを作成し、_--no-create-home_と _--shell /bin/false_ オプションを使用して、これらのユーザーがサーバーにログインできないようにします。
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Prometheusのファイルとデータを保存するための必要なディレクトリをダウンロードする前に作成します。標準のLinuxの規則に従って、Prometheusの設定ファイルのために_/etc_にディレクトリを作成し、デーのために_/var/lib_にディレクトリを作成します。
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
次に、新しいディレクトリのユーザーとグループの所有権をprometheusユーザーに設定します。
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## ステップ2 — Prometheusのダウンロード

まず、現在の安定版のPrometheusをホームディレクトリにダウンロードして展開します。最新のバイナリは[Prometheusのダウンロードページ](https://prometheus.io/download/)で入手できます。

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
次に、ダウンロードしたアーカイブを展開します。

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
これにより、prometheus-2.21.0.linux-amd64というディレクトリが作成され、2つのバイナリファイル（prometheusとpromtool）、ウェブインターフェースファイルを含む_consoles_と_console_libraries_ディレクトリ、ライセンス、通知、およびいくつかのサンプルファイルが含まれます。

2つのバイナリを_/usr/local/bin_ディレクトリにコピーします。

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
バイナリにユーザーとグループの所有権をステップ1で作成したprometheusユーザーに設定します。

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
consolesと_console_libraries_ディレクトリを_/etc/prometheus_にコピーします。

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
ディレクトリにユーザーとグループの所有権をprometheusユーザーに設定します。-Rフラグを使用すると、ディレクトリ内のファイルにも所有権が設定されます。

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Prometheusがインストールされたので、最初の実行の準備として、その設定ファイルとサービスファイルを作成します。

## ステップ3 — Prometheusの設定

_/etc/prometheus_ディレクトリで、nanoまたはお気に入りのテキストエディタを使用して、_prometheus.yml_という名前の設定ファイルを作成します。

```
sudo nano /etc/prometheus/prometheus.yml

```
グローバル設定では、メトリクスのスクレイピングのデフォルト間隔を定義します。Prometheusは、個々のエクスポーターの設定がグローバル設定を上書きしない限り、これらの設定をすべてのエクスポーターに適用します。

```
global:
  scrape_interval: 15s

```
このscrape_interval値は、Prometheusがエクスポーターからメトリクスを15秒ごとに収集することを示しており、ほとんどのエクスポーターには十分な時間です。
次に、以下のscrape_configsディレクティブを使用して、Prometheus自体をスクレイピングするエクスポーターのリストに追加します。

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheusは、クエリやグラフ上でエクスポーターをラベル付けするために_job_name_を使用するため、ここで説明的なものを選択してください

また、Prometheusはパフォーマンスの監視とデバッグに使用できる重要なデータをエクスポートするため、より頻繁な更新のためにグローバルなscrape_intervalディレクティブを15秒から5秒に上書きしています。

最後に、Prometheusは_static_configs_と_targets_ディレクティブを使用して、エクスポーターが実行されている場所を特定します。この特定のエクスポーターはPrometheus自体と同じサーバー上で実行されているため、デフォルトのポート9090とともにIPアドレスの代わりにlocalhostを使用できます。

設定ファイルは以下のようになります。

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
ファイルを保存してテキストエディタを終了します。

設定ファイルのユーザーとグループの所有権をステップ1で作成したprometheusユーザーに設定します。

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
設定が完了したので、Prometheusを初めて実行してテストする準備が整いました。

## ステップ4 — Prometheusの実行

_prometheus_ユーザーとしてPrometheusを起動し、設定ファイルとデータディレクトリのパスを指定します。

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

出力には、Prometheusの読み込みの進行状況、設定ファイル、関連するサービスに関する情報が含れます。また、Prometheusがポート_9090_でリッスンしていることも確認されます。

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
エラーメッセージが表示された場合は、構成ファイルでYAML構文を使用していることを再確認し、問題を解決するための画面上の指示に従ってください。

次に、_CTRL+C_を押してPrometheusを停止し、新しい_systemd_サービスファイルを開きます。

```
sudo nano /etc/systemd/system/prometheus.service

```
サービスファイルは、_systemd_に対して、prometheusユーザーとしてPrometheusを実行し、構成ファイルを_ /etc/prometheus/prometheus.yml_ディレクトリに配置し、データを_ /var/lib/prometheus_ディレクトリに保存するように指示します。次のコンテンツをファイルにコピーします。

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

最後に、ファイルを保存してテキストエディタを閉じます。新しく作成したサービスを使用するには、systemdをリロードします。

```
sudo systemctl daemon-reload

```
次のコマンドを使用してPrometheusを起動できます。

```
sudo systemctl start prometheus

```
Prometheusが実行されていることを確認するには、サービスのステータスを確認します。

```
sudo systemctl status prometheus

```
出力には、Prometheusのステータス、メインプロセスID（PID）、メモリ使用量などが表示されます。

サービスのステータスがアクティブでない場合は、画面上の指示に従って前の手順を再確認し、問題を解決してからチュートリアルを続行してください。

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

次に進む準備ができたら、ステータスコマンドを終了するために_Q_を押します。最後に、サービスを起動時に開始するように有効にします。

```
sudo systemctl enable prometheus

```

Prometheusが起動して実行されているので、サーバーのリソースに関るメトリクスを生成するための追加のエクスポーターをインストールできます。

## ステップ5 - Node Exporterのダウンロード

Prometheus自体に関するメトリクスを超えてPrometheusを拡張するために、Node Exporterと呼ばれる追加のエクスポーターをインストールします。Node Exporterは、CPU、ディスク、メモリの使用状況を含むシステムの詳細な情報を提供します。最新のバイナリは[Prometheusのダウンロードページ]（https://prometheus.io/download/）で入手できます。

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
次に、ダウンロードしたアーカイブを展開します。

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
これにより、_node_exporter-1.0.1.linux-amd64_というディレクトリが作成され、バイナリファイルの_node_exporter_、ライセンス、および通知が含まれます。

バイナリを_ /usr/local/bin_ディレクトリにコピーし、所有者をステップ1で作成したnode_exporterユーザーに設定します。

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Node Exporterをインストールしたので、起動時にサービスファイルを作成する前に実行してテストしてみましょう。

## ステップ6 - Node Exporterの実行

Node Exporterを実行するための手順は、Prometheus自体を実行する手順と似ています。まず、Node ExporterのためのSystemdサービスファイルを作成しま。

```
sudo nano /etc/systemd/system/node_exporter.service

```
次のコンテンツをサービスファイルにコピーします。

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

ファイルを保存してテキストエディタを閉じます。最後に、新しく作成したサービスを使用するためにsystemdをリロードします。

```
sudo systemctl daemon-reload

```
次のコマンドを使用してNode Exporterを実行できます。

```
sudo systemctl start node_exporter

```
検証する that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
前と同様に、この出力にはNode Exporterのステータス、メインプロセスID（PID）、メモリ使用量などが表示されます。サービスのステータスがアクティブでない場合は、画面上のメッセージに従って前の手順を再確認し、問題を解決してから続行してください。

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
最後に、Node Exporterを起動時に開始するように有効にします。

```
sudo systemctl enable node_exporter

```
Node Exporterが正しく構成され、期待どおりに実行されていることを確認したら、新しいメトリクスをスクレイピングするようにPrometheusに指示します。

## ステップ7 - PrometheusのNode Exporterのスクレイピングを構成する

Prometheusは、構成ファイルのscrape_configsセクションで定義されているエクスポーターのみをスクレイピングするため、Prometheus自体と同様にNode Exporterのエントリを追加する必要があります。構成ファイルを開きます。

```
sudo nano /etc/prometheus/prometheus.yml

```
scrape_configsブロックの最後に、node_exporterという新しいエントリを追加します。

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
このエクスポーターもPrometheus自体と同じサーバーで実行されているため、IPアドレスの代わりにlocalhostを使用し、Node Exporterのデフォルトポートである9100を使用できます。構成ファイル全体は次のようになります。

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
ファイルを保存し、テキストエディタを終了します。変更を有効にするために最後にPrometheusを再起動します。

```
sudo systemctl restart prometheus

```
再度、ステータスコマンドを使用してすべてが正常に実行されていることを確認します。

```
sudo systemctl status prometheus

```
サービスのステータスがアクティブに設定されていない場合は、画面上の指示に従って前の手順を再確認してから続行してください。

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

PrometheusとNode Exporterがインストールされ、構成され、実行されていることが確認できました。

## ステップ8 - Robonomicビルドのnode_exporterの追加

Prometheusとnode_exporterを正常にインストールした後、すべてのsubstrateプロジェクトでビルドインのprometheusエクスポーターを使する必要があります。これを実現するには、_ /etc/prometheus/prometheus.yml_に追加のエントリを追加する必要があります。. 
構成ファイルを開きます。

```
sudo nano /etc/prometheus/prometheus.yml

```
scrape_configsブロックの最後に、robonomic_exporterという新しいエントリを追加します。

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
ファイルを保存してテキストエディタを終了します。設定ファイル全体は次のようになるはずです。

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

最後に、変更を有効にするためにPrometheusを再起動します。

```
sudo systemctl restart prometheus

```
再度、ステータスコマンドを使用してすべてが正常に実行されていることを確認します。

```
sudo systemctl status prometheus

```
今、_Prometheus_と_Node Exporter_、そして_Robonomic Exporter_がインストールされ、設定れ、実行されています。次にGrafanaに進んでください。

## ステップ9 - Grafanaの設定

最後のステップは、GrafanaでPrometheusをデータソースとして接続することです。このチュートリアルでは、最大5つのダッシュボードと専用の[Robonomicsダッシュボード](https://grafana.com/grafana/dashboards/13015)を使用できる無料のクラウドベースのGrafanaを使用します。[grafana.com](https://grafana.com/)にアクセスして新しいアカウントを作成し、新しく作成したGrafanaインスタンスにログインしてください。

最初に、Grafanaに新しい_**データソース**_を追加する必要があります。この場合、データソースはPrometheusサーバーになります。
データソースに移動します：

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

次に、**_データソースを追加_**をクリックします

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

次に、_**Prometheus**_を選択します

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

新しい画面で、**_PrometheusサーバーのIPアドレスと9090ポート_**を入力します

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

その後、すべての手順を実行した場合は、_**保存してテスト**_をクリックします。緑色になり、ダッシュボードのインポートに進む準備が整います。メインサイトで**+**をクリックし、以下の画像にすように**インポート**をクリックします：

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

次に、インポートページが表示されます：

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

_Grafana.comダッシュボードのURLまたはID_に_**13015**_と入力します（これはRobonomicダッシュボードのIDです）

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

外部ダッシュボードを読み込んだ後、この画面が表示されます：

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

最後のステップは、以前に作成した**_データソース_**を選択し、_**インポート**_をクリックすることです

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

以上です！この時点でインポートされたダッシュボードが表示されるはずです。 


## 参考文献

* [Ubuntu 16.04にPrometheusをインストールする方法](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Prometheus + Grafanaによる監視ダッシュボードの構築](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [PrometheusのGrafanaサポート](https://prometheus.io/docs/visualization/grafana/)
* [ノードエクスポーターを使用したLinuxホストメトリクスの監視](https://prometheus.io/docs/guides/node-exporter/)
* [Prometheusのクエリ](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [ノードメトリクスの可視化](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Substrate Prometheus Exporter](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Polkadotノードメトリクス](https://grafana.com/grafana/dashboards/12425)
* [Prometheusのノードエクスポーター用ダッシュボード](https://grafana.com/grafana/dashboards/11074)
* [Grafana ROBONOMICS（XRT）メトリクス](https://grafana.com/grafana/dashboards/13015)

