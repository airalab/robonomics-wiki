---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**以下说明由[Hubo Bubo](https://github.com/hubobubo)提供**

**原始文章位于[此处](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## 简介
为了更好地监控和维护Robonomics节点，最好设置基于Prometheus服务器和Grafana的监控。本文将展示如何配置每个组件以完全监控您的节点。

## 先决条件
* [使用Ubuntu 18.04设置服务器](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [已安装Robonomics parachain collator](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* 确保您的机器上正在运行robonomics.service，并且端口9615是可访问的

## 步骤1 — 创建服务用户

出于安全考虑，我们将首先创建两个新用户帐户，prometheus和node_exporter。创建这两个用户，并使用 _--no-create-home_ 和 _--shell /bin/false_ 选项，以便这些用户无法登录到服务器。
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

在下载Prometheus二进制文件之前，创建用于存储Prometheus文件和数据的必要目录。遵循标准的Linux约定，我们将在 _/etc_ 中为Prometheus的配置文件创建一个目录，在 _/var/lib_ 中为其数据创建一个目录。
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
现在，在新目录上设置用户和组所有权为prometheus用户。
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## 步骤2 — 下载Prometheus

首先，下载并解压缩当前稳定版本的Prometheus到您的主目录。您可以在[Prometheus下载页面](https://prometheus.io/download/)找到最新的二进制文件。

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
现在，解压下载的存档文件。

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
这将创建一个名为prometheus-2.21.0.linux-amd64的目录，其中包含两个二进制文件（prometheus和promtool），包含Web界面文件的_consoles_和_console_libraries_目录，一个许可证，一个通知以及几个示例文件。

将这两个二进制文件复制到_/usr/local/bin_目录。

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
将二进制文件的用户和组所有权设置为在第1步中创建的prometheus用户。

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
将_consoles_和_console_libraries_目录复制到_/etc/prometheus_。

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
将目录的用户和组所有权设置为prometheus用户。使用-R标志将确保文件夹内的文件的所有权也被设置。

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
现在Prometheus已安装，我们将在准备第一次运行之前创建其配置和服务文件。

## 步骤3 —— 配置Prometheus

在_/etc/prometheus_目录中，使用nano或您喜欢的文本编辑器创建一个名为_prometheus.yml_的配置文件。

```
sudo nano /etc/prometheus/prometheus.yml

```
在全局设置中，定义抓取指标的默认间隔。请注意，Prometheus将这些设置应用于每个导出器，除非单个导出器的设置覆盖全局设置。

```
global:
  scrape_interval: 15s

```
此 `scrape_interval` 值告诉 Prometheus 每 15 秒从其出口收集指标，这对大多数出口来说已经足够长了。
现在，将 Prometheus 本身添加到要从中抓取的出口商列表中，使用以下 `scrape_configs` 指令：

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus 使用 `job_name` 在查询和图表中标记出口商，因此在此处选择一些描述性的内容。

而且，由于 Prometheus 导出有关自身的重要数据，您可以用于监控性能和调试，我们已将全局 `scrape_interval` 指令从 15 秒覆盖为 5 秒，以获得更频繁的更新。

最后，Prometheus 使用 `static_configs` 和 `targets` 指令来确定出口商的运行位置。由于此特定出口商在与 Prometheus 本身相同的服务器上运行，因此我们可以使用 localhost 而不是 IP 地址以及默认端口 9090。

您的配置文件现在应如下所示：

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
保存文件并退出文本编辑器。

现在，将配置文件的用户和组所有权设置为第 1 步中创建的 prometheus 用户。

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
配置完成后，我们准备通过首次运行 Prometheus 来测试它。

## 第 4 步 — 运行 Prometheus

以 _prometheus_ 用户身份启动 Prometheus，提供配置文件和数据目录的路径。

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

输出包含有关 Prometheus 加载进度、配置文件和相关服务的信息。它还确认 Prometheus 正在监听端口 _9090_。

```
_log output_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="未设置时间或大小保留，因此使用默认时间保留" duration=15d
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="启动 Prometheus" version="(version=2.21.0, branch=HEAD, revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="启动 TSDB ..."2020-09-14T15:55:53.368Z 调用者=web.go:523 组件=web 消息="开始监听连接" 地址=0.0.0.0:9090
9月14日 17:55:53 robonomics prometheus[29488]: 级别=信息 时间戳=2020-09-14T15:55:53.372Z 调用者=head.go:644 组件=tsdb 消息="如果有的话，重放磁盘内存映射块"
9月14日 17:55:53 robonomics prometheus[29488]: 级别=信息 时间戳=2020-09-14T15:55:53.373Z 调用者=head.go:658 组件=tsdb 消息="磁盘内存映射块重放完成" 持续时间=12.659µs
9月14日 17:55:53 robonomics prometheus[29488]: 级别=信息 时间戳=2020-09-14T15:55:53.373Z 调用者=head.go:664 组件=tsdb 消息="重放WAL，这可能需要一段时间"
9月14日 17:55:53 robonomics prometheus[29488]: 级别=信息 时间戳=2020-09-14T15:55:53.380Z 调用者=head.go:716 组件=tsdb 消息="WAL段已加载" 段=0 最大段=1
9月14日 17:55:53 robonomics prometheus[29488]: 级别=信息 时间戳=2020-09-14T15:55:53.381Z 调用者=head.go:716 组件=tsdb 消息="WAL段已加载" 段=1 最大段=1
9月14日 17:55:53 robonomics prometheus[29488]: 级别=信息 时间戳=2020-09-14T15:55:53.381Z 调用者=head.go:719 组件=tsdb 消息="WAL重放完成" 检查点重放持续时间=48.125µs wal重放持续时间=8.253748ms 总重放持续时间=8.343335ms
9月14日 17:55:53 robonomics prometheus[29488]: 级别=信息 时间戳=2020-09-14T15:55:53.383Z 调用者=main.go:721 fs类型=EXT4_SUPER_MAGIC
9月14日 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB started"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server is ready to receive web requests."

如果收到错误消息，请仔细检查您的配置文件中是否使用了YAML语法，然后按照屏幕上的说明解决问题。

现在，通过按下_CTRL+C_ 来停止Prometheus，然后打开一个新的_systemd_服务文件。

```
sudo nano /etc/systemd/system/prometheus.service

```
服务文件告诉_systemd_以prometheus用户身份运行Prometheus，配置文件位于_/etc/prometheus/prometheus.yml_目录中，并将数据存储在_/var/lib/prometheus_目录中。将以下内容复制到文件中：

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

最后，保存文件并关闭文本编辑器。要使用新创建的服务，请重新加载systemd。

```
sudo systemctl daemon-reload

```
现在，您可以使用以下命令启动Prometheus：

```
sudo systemctl start prometheus

```
要确保Prometheus正在运行，请检查服务的状态。

```
sudo systemctl status prometheus

```
输出会告诉您Prometheus的状态、主进程标识符（PID）、内存使用情况等。

如果服务的状态不是活动的，请按照屏幕上的说明重新跟踪前面的步骤，解决问题后再继续本教程。

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

当您准备好继续时，请按_Q_退出状态命令。最后，启用服务以在启动时启动。

```
sudo systemctl enable prometheus

```

现在，Prometheus已经启动运行，我们可以安装一个额外的导出器来生成关于服务器资源的指标。

## 第 5 步 — 下载 Node Exporter

为了将Prometheus扩展到仅有关于自身的指标之外，我们将安装一个名为Node Exporter的额外导出器。Node Exporter提供有关系统的详细信息，包括CPU、磁盘和内存使用情况。将当前稳定版本的Node Exporter下载到您的主目录中。您可以在[Prometheus下载页面](https://prometheus.io/download/)上找到最新的二进制文件。

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
现在，解压下载的存档。

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
这将创建一个名为_node_exporter-1.0.1.linux-amd64_的目录，其中包含一个名为_node_exporter_的二进制文件，一个许可证和一个通知。

将二进制文件复制到 _/usr/local/bin_ 目录，并将用户和组所有权设置为您在第1步中创建的node_exporter用户。

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
现在您已经安装了Node Exporter，让我们在创建服务文件之前运行它，以便在启动时启动它。

## 第6步 — 运行Node Exporter

运行Node Exporter的步骤与运行Prometheus本身的步骤类似。首先创建Node Exporter的Systemd服务文件。

```
sudo nano /etc/systemd/system/node_exporter.service

```
将以下内容复制到服务文件中：

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

保存文件并关闭文本编辑器。最后，重新加载systemd以使用新创建的服务。

```
sudo systemctl daemon-reload

```
现在，您可以使用以下命令运行Node Exporter：

```
sudo systemctl start node_exporter

```
使用状态命令验证Node Exporter是否正常运行。

```
sudo systemctl status node_exporter

```
与之前一样，此输出会告诉您Node Exporter的状态、主进程标识符（PID）、内存使用情况等。如果服务的状态不是活动的，请遵循屏幕上的消息并重新跟踪前面的步骤以解决问题，然后继续。任务：7（限制：4915）
   CGroup：/system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

最后，启用Node Exporter以在启动时启动。

sudo systemctl enable node_exporter

配置完全配置并按预期运行的Node Exporter后，我们将告诉Prometheus开始抓取新的指标。

## 步骤 7 —— 配置 Prometheus 抓取 Node Exporter

因为Prometheus仅抓取在其配置文件的scrape_configs部分中定义的导出器，我们需要为Node Exporter添加一个条目，就像我们为Prometheus本身所做的那样。打开配置文件。

sudo nano /etc/prometheus/prometheus.yml

在scrape_configs块的末尾，添加一个名为node_exporter的新条目。

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

因为这个导出器也在与Prometheus本身相同的服务器上运行，所以我们可以再次使用localhost而不是IP地址，以及Node Exporter的默认端口9100。您的整个配置文件应该如下所示：

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

保存文件并在准备继续时退出文本编辑器。最后，重新启动Prometheus以使更改生效。

sudo systemctl restart prometheus

再次使用状态命令验证一切是否正常运行。

sudo systemctl status prometheus

如果服务的状态未设置为活动状态，请按照屏幕上的说明进行操作，并在继续之前重新跟踪之前的步骤。: 8 (限制: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

我们现在已经安装、配置并运行了Prometheus和Node Exporter。

## 步骤 8 - 添加内置的Robonomic node_exporter

成功安装Prometheus和node_exporter后，我们将不得不在每个substrate项目中使用内置的prometheus导出器。为了实现这一点，我们必须向 _/etc/prometheus/prometheus.yml_ 添加额外的条目。
打开配置文件。

```
sudo nano /etc/prometheus/prometheus.yml

```
在scrape_configs块的末尾，添加一个名为robonomic_exporter的新条目。

```
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
保存文件并退出文本编辑器。您的整个配置文件应如下所示：

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

最后，重新启动Prometheus以使更改生效。

```
sudo systemctl restart prometheus

```
再次使用status命令验证一切是否正常运行。

```
sudo systemctl status prometheus

```
我们现在已经安装、配置并运行了_Prometheus_、_Node Exporter_以及_Robonomic Exporter_。现在继续到Grafana

## 步骤 9 - 设置Grafana

最后一步是在Grafana中将Prometheus连接为数据源。为了本教程的目的，我们将使用免费的基于云的Grafana，允许最多拥有5个仪表板以及专用的[Robonomics仪表板](https://grafana.com/grafana/dashboards/13015)。只需访问[grafana.com](https://grafana.com/)创建新帐户并登录到您新创建的Grafana实例。

首先，我们必须向Grafana添加新的**数据源**，在我们的情况下将是Prometheus服务器。
转到数据源：

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

然后点击**_添加数据源_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

接下来选择**Prometheus**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

在新屏幕上，输入您的**_带有9090端口的Prometheus服务器IP地址_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

之后，点击**_保存并测试_**，如果您完成了所有步骤，您应该会看到绿色并准备好导入仪表板。在主站点上点击**+**，然后点击**导入**，如下图所示：

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Import dashboard"} %}{% endroboWikiPicture %}

然后您应该看到导入页面：

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Import page"} %}{% endroboWikiPicture %}

在_Grafana.com仪表板URL或ID_中写入_**13015**_（因为这是Robonomic仪表板的ID）:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

加载外部仪表板后，您将看到此屏幕：

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"XRT 13015 仪表板导入"} %}{% endroboWikiPicture %}

最后一步是选择之前创建的**_数据源_**，然后点击_**导入**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"Prometheus作为数据源"} %}{% endroboWikiPicture %}

就是这样！此时您应该看到已导入的仪表板。


## 参考资料

* [如何在Ubuntu 16.04上安装Prometheus](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [通过Prometheus + Grafana构建监控仪表板](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Grafana对Prometheus的支持](https://prometheus.io/docs/visualization/grafana/)
* [使用节点导出器监控Linux主机指标](https://prometheus.io/docs/guides/node-exporter/)
* [查询Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [可视化节点指标](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Substrate Prometheus导出器](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Polkadot节点指标](https://grafana.com/grafana/dashboards/12425)
* [用于Prometheus仪表板的节点导出器](https://grafana.com/grafana/dashboards/11074)
* [Grafana ROBONOMICS（XRT）指标](https://grafana.com/grafana/dashboards/13015)