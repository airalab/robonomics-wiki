---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**以下の手順は[Hubo Bubo](https://github.com/hubobubo)によって提供されています**

**元の記事は[こちら](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)にあります**

## はじめに
Robonomicsノードをより効果的に監視および維持するために、Prometheus ServerとGrafanaに基づいた監視をセットアップすることが良いでしょう。この文書では、ノードを完全に監視するためにそれぞれをどのように構成するかを示します。

## 前提条件
* [Ubuntu 18.04を使用したサーバーのセットアップ](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [Robonomics parachain collatorのインストール](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* robonomics.serviceがマシンで動作しており、ポート9615に到達できることを確認してください

## ステップ1 — サービスユーザーの作成

セキュリティ上の理由から、まずprometheusとnode_exporterという2つの新しいユーザーアカウントを作成します。これらの2つのユーザーを作成し、_--no-create-home_および_--shell /bin/false_オプションを使用して、これらのユーザーがサーバーにログインできないようにします。
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Prometheusのバイナリをダウンロードする前に、Prometheusのファイルとデータを保存するための必要なディレクトリを作成します。標準のLinuxの規則に従い、Prometheusの設定ファイル用に_ /etc_にディレクトリを作成し、データ用に_ /var/lib_にディレクトリを作成します。
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
新しいディレクトリのユーザーとグループの所有権をprometheusユーザーに設定します。
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## ステップ2 — Prometheusのダウンロード

最初に、最新の安定版のPrometheusをホームディレクトリにダウンロードして展開します。最新のバイナリは[Prometheusのダウンロードページ](https://prometheus.io/download/)で見つけることができます。

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
今、ダウンロードしたアーカイブを展開します。

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
これにより、prometheusとpromtoolの2つのバイナリファイル、Webインターフェースファイルを含む_consoles_と_console_libraries_ディレクトリ、ライセンス、通知、およびいくつかのサンプルファイルが含まれたprometheus-2.21.0.linux-amd64というディレクトリが作成されます。

これらの2つのバイナリファイルを/usr/local/binディレクトリにコピーします。

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
バイナリファイルの所有者をStep 1で作成したprometheusユーザーに設定します。

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
consolesと_console_libraries_ディレクトリを/etc/prometheusにコピーします。

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
ディレクトリの所有者をprometheusユーザーに設定します。-Rフラグを使用すると、ディレクトリ内のファイルの所有権も設定されます。

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Prometheusがインストールされたので、最初の実行に備えて、構成ファイルとサービスファイルを作成します。

## Step 3 — Prometheusの設定

/etc/prometheusディレクトリで、nanoまたはお気に入りのテキストエディタを使用して、_prometheus.yml_という構成ファイルを作成します。

```
sudo nano /etc/prometheus/prometheus.yml

```
グローバル設定で、メトリクスのスクレイピングのデフォルト間隔を定義します。Prometheusは、個々のエクスポーターの設定がグローバル設定を上書きしない限り、これらの設定をすべてのエクスポーターに適用します。

```
global:
  scrape_interval: 15秒

```
この scrape_interval 値は、Prometheusに対してエクスポータからのメトリクスを15秒ごとに収集するよう指示します。これは、ほとんどのエクスポータにとって十分な時間です。
次に、以下の scrape_configs ディレクティブを使用して、Prometheus自体をスクレイプ対象のエクスポータリストに追加します。

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheusは _job_name_ を使用して、クエリやグラフでエクスポータをラベル付けするため、ここで説明的なものを選択するようにしてください。

また、Prometheusは自身に関する重要なデータをエクスポートし、パフォーマンスの監視やデバッグに使用できるため、より頻繁な更新のために、グローバル scrape_interval ディレクティブを15秒から5秒にオーバーライドしました。

最後に、Prometheusはエクスポータが実行されている場所を決定するために _static_configs_ と _targets_ ディレクティブを使用します。この特定のエクスポータはPrometheus自体と同じサーバーで実行されているため、IPアドレスの代わりに localhost とデフォルトポートである 9090 を使用できます。

設定ファイルは以下のようになります:

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

次に、設定ファイルのユーザーとグループの所有権を、ステップ1で作成した prometheus ユーザーに設定します。

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
設定が完了したら、Prometheusを初めて実行してテストする準備が整いました。

## ステップ 4 — Prometheusの実行

_prometheus_ ユーザーとして、設定ファイルとデータディレクトリのパスを指定して、Prometheusを起動します。

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

出力には、Prometheusの読み込み進捗、設定ファイル、関連サービスに関する情報が含まれます。また、Prometheusがポート _9090_ でリスニングしていることも確認されます。

```
_log output_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics prometheus[29488]: レベル=情報 ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="時間またはサイズの保持期間が設定されていないため、デフォルトの時間保持期間を使用しています" duration=15d
Sep 14 17:55:53 robonomics prometheus[29488]: レベル=情報 ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Prometheusの起動" version="(version=2.21.0, branch=HEAD, revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: レベル=情報 ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: レベル=情報 ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: レベル=情報 ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: レベル=情報 ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
Sep 14 17:55:53 robonomics prometheus[29488]: レベル=情報 ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="TSDBの起動中..."
Sep 14 17:55:53 robonomics prometheus[29488]: レベル=情報 ts=2020-09-14T15:55:53.368Z caller=web.go:523 component=web msg="接続のリスニングを開始" address=0.0.0.0:9090
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="必要に応じてディスク上のメモリマップ可能なチャンクを再生"
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="ディスク上のメモリマップ可能なチャンクの再生が完了しました" duration=12.659µs
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="WAL の再生中、しばらく時間がかかる場合があります"
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="WAL セグメントがロードされました" segment=0 maxSegment=1
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="WAL セグメントがロードされました" segment=1 maxSegment=1
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="WAL の再生が完了しました" checkpoint_replay_duration=48.125µs wal_replay_duration=8.253748ms total_replay_duration=8.343335ms
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB started"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server is ready to receive web requests."

エラーメッセージが表示された場合は、構成ファイルでYAML構文を使用していることを再確認し、画面の指示に従って問題を解決してください。

次に、_CTRL+C_を押してPrometheusを停止し、新しい_systemd_サービスファイルを開きます。

```
sudo nano /etc/systemd/system/prometheus.service

```
サービスファイルには、_systemd_にPrometheusをprometheusユーザーとして実行し、構成ファイルが_ /etc/prometheus/prometheus.yml_ディレクトリにあり、データを_ /var/lib/prometheus_ディレクトリに保存するよう指示します。次の内容をファイルにコピーしてください：

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
    --web.console.libraries```plaintext
/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

最後に、ファイルを保存してテキストエディタを閉じます。新しく作成したサービスを使用するには、systemd をリロードします。

```bash
sudo systemctl daemon-reload
```

次のコマンドを使用して Prometheus を起動できます。

```bash
sudo systemctl start prometheus
```

Prometheus が実行されていることを確認するには、サービスのステータスを確認します。

```bash
sudo systemctl status prometheus
```

出力には、Prometheus のステータス、メインプロセス識別子（PID）、メモリ使用量などが表示されます。

サービスのステータスがアクティブでない場合は、画面の指示に従い、問題を解決するために前の手順を再確認してからチュートリアルを続行してください。

```plaintext
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

次に進む準備ができたら、ステータスコマンドを終了するには _Q_ を押します。最後に、サービスを起動時に開始するように有効にします。

```bash
sudo systemctl enable prometheus
```

Prometheus が起動しているので、サーバーのリソースに関するメトリクスを生成するために追加のエクスポーターをインストールできます。

## ステップ 5 — Node Exporter のダウンロード

Prometheusを自身に関するメトリクスのみでなく拡張するために、Node Exporter と呼ばれる追加のエクスポーターをインストールします。Node Exporter は、CPU、ディスク、メモリ使用量などのシステムに関する詳細な情報を提供します。ホームディレクトリに現在の安定版の Node Exporter をダウンロードします。最新のバイナリは [Prometheus ダウンロードページ](https://prometheus.io/download/) で入手できます。

```bash
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz
```

次に、ダウンロードしたアーカイブを展開します。

```bash
tar xvf node_exporter-1.0.1
```.linux-amd64.tar.gz

```
これにより、_node_exporter-1.0.1.linux-amd64_というディレクトリが作成され、バイナリファイルの _node_exporter_、ライセンス、および通知が含まれます。

バイナリファイルを _/usr/local/bin_ ディレクトリにコピーし、所有者を Step 1 で作成した node_exporter ユーザーに設定します。

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Node Exporter をインストールしたので、起動時に自動的に開始するためのサービスファイルを作成する前に、動作テストを行いましょう。

## Step 6 — Node Exporter の実行

Node Exporter を実行する手順は、Prometheus 自体を実行する手順と似ています。まず、Node Exporter のための Systemd サービスファイルを作成します。

```
sudo nano /etc/systemd/system/node_exporter.service

```
以下の内容をサービスファイルにコピーします:

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

ファイルを保存してテキストエディタを閉じます。最後に、新しく作成したサービスを使用するために systemd をリロードします。

```
sudo systemctl daemon-reload

```
次のコマンドを使用して Node Exporter を実行できます:

```
sudo systemctl start node_exporter

```
status コマンドを使用して Node Exporter が正常に実行されているか確認します。

```
sudo systemctl status node_exporter

```
前述のように、この出力には Node Exporter のステータス、メインプロセス識別子（PID）、メモリ使用量などが表示されます。サービスのステータスがアクティブでない場合は、画面のメッセージに従って問題を解決するために前の手順を再確認してください。

```
_Output_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)
   タスク: 7 (制限: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

最後に、Node Exporterを起動時に開始するように設定します。

```
sudo systemctl enable node_exporter

```
Node Exporterが完全に構成され、期待どおりに実行されている場合、新しいメトリクスをスクレイピングするようPrometheusに指示します。

## ステップ 7 — Prometheusの設定を変更してNode Exporterをスクレイプする

Prometheusは、スクレイピングするエクスポーターがその設定ファイルのscrape_configs部分で定義されているため、Prometheus自体と同様にNode Exporterのエントリを追加する必要があります。設定ファイルを開きます。

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
このエクスポーターもPrometheus自体と同じサーバーで実行されているため、IPアドレスの代わりにlocalhostを使用し、Node Exporterのデフォルトポートである9100を使用できます。設定ファイル全体は次のようになります。

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
ファイルを保存し、テキストエディタを終了して、変更を有効にします。

```
sudo systemctl restart prometheus

```
再度、すべてが正しく実行されていることを確認するために、ステータスコマンドを使用します。

```
sudo systemctl status prometheus

```
サービスのステータスがアクティブに設定されていない場合は、画面の指示に従い、以前の手順を再確認してから次に進んでください。

```
出力
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    タスク```
: 8 (制限: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

PrometheusとNode Exporterがインストールされ、設定され、実行されています。

## ステップ8 - Robonomicビルトインnode_exporterの追加

Prometheusとnode_exporterが正常にインストールされた後、すべてのsubstrateプロジェクトでビルトインのprometheusエクスポーターを使用する必要があります。これを実現するには、_ /etc/prometheus/prometheus.yml_ に追加のエントリを追加する必要があります。
設定ファイルを開きます。

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
ファイルを保存してテキストエディタを終了します。完全な構成ファイルは次のようになります。

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
再度、すべてが正常に実行されていることを確認するためにstatusコマンドを使用します。

```
sudo systemctl status prometheus

```
Prometheus、Node Exporter、Robonomic Exporterがインストールされ、設定され、実行されています。次にGrafanaに移動します。

## ステップ9 - Grafanaの設定

最後のステップは、GrafanaでPrometheusをデータソースとして接続することです。このチュートリアルでは、最大5つのダッシュボードと専用の[Robonomicsダッシュボード](https://grafana.com/grafana/dashboards/13015)。単に[grafana.com](https://grafana.com/)にアクセスして新しいアカウントを作成し、新しく作成したGrafanaインスタンスにログインします。

最初に、Grafanaに新しい**データソース**を追加する必要があります。この場合、データソースはPrometheusサーバーになります。
データソースに移動します：

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

次に**_データソースを追加_**をクリックします

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

次に**_Prometheus_**を選択します

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

新しい画面で**_PrometheusサーバーのIPアドレスと9090ポート_**を入力します

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

その後、すべての手順を実行した場合は**_保存してテスト_**をクリックして、緑色になり、ダッシュボードのインポートに進む準備が整います。メインサイトで**+**をクリックして、次に以下の画像に示すように**インポート**をクリックします：

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Import dashboard"} %}{% endroboWikiPicture %}

その後、インポートページが表示されます：

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Import page"} %}{% endroboWikiPicture %}

_Grafana.comのダッシュボードURLまたはID_に_**13015**_と入力します（これはRobonomicダッシュボードのIDです）

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Robonomicダッシュボードのインポート"} %}{% endroboWikiPicture %}

外部ダッシュボードを読み込んだ後、この画面が表示されます：

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"XRT 13015ダッシュボードのインポート"} %}{% endroboWikiPicture %}

最後のステップは、以前に作成した**_データソース_**を選択し、_**インポート**_をクリックすることです。

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"データソースとしてのPrometheus"} %}{% endroboWikiPicture %}

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
* [Prometheusダッシュボードのノードエクスポーター](https://grafana.com/grafana/dashboards/11074)
* [Grafana ROBONOMICS（XRT）メトリクス](https://grafana.com/grafana/dashboards/13015)