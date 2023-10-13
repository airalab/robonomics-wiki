---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**다음 지침은 [Hubo Bubo](https://github.com/hubobubo)에서 제공됩니다**

**원본 문서는 [여기](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)에서 찾을 수 있습니다**

## 소개
로보노믹스 노드를 더 잘 모니터링하고 유지하기 위 프로메테우스 서버와 그라파나를 기반으로 모니터링을 설정하는 것이 좋습니다. 이 문서에서는 노드를 완전히 모니터링하기 위해 각각을 구성하는 방법을 보여줍니다.

##  전제 조건
* [Ubuntu 18.04에서 서버 설정](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [로보노믹스 파라체인 콜레이터 설치](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* 로보노믹스 서비스가 기기에서 작동하고 포트 9615에 접근 가능한지 확인하세요. 

## 1단계 - 서비스 사용자 생성

보안 목적으로 두 개의 새 사용자 계정인 prometheus와 node_exporter를 생성하여 서버에 로그인할 수 없도록 _--no-create-home_ 및 _--shell /bin/false_ 옵션을 사용하여 이 사용자를 생성합니다.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

프로메테우스 이진 파일을 다운로드하기 전에 프로메테우스 파일 및 데이터를 저장하기 위한 필요한 디렉토리를 생성하세요. 표준 Linux 규칙에 따라 프로메테우스의 구성 파일을 위해 _/etc_에 디렉토리를 생성하고 데이터를 위해 _/var/lib_에 디렉토리를 생성합니다.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
이제 새 디렉토리의 사용자 및 그룹 소유권을 prometheus 사용자 설정하세요.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## 2단계 - 프로메테우스 다운로드

먼저 현재 안정 버전의 프로메테우스를 홈 디렉토리에 다운로드하고 압축을 해제하세요. 최신 이진 파일은 [프로메테우스 다운로드 페이지](https://prometheus.io/download/)에서 찾을 수 있습니다.

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
이제 다운로드한 아카이브를 압축 해제하세요.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
이렇게 하면 _prometheus-2.21.0.linux-amd64_라는 디렉토리가 생성되며 두 개의 이진 파일 (prometheus 및 promtool), 웹 인터페이스 파일을 포함하는 _consoles_ 및 _console_libraries_ 디렉토리, 라이선스, 공지 및 여러 예제 파일이 포함됩니다.

두 개의 이진 파일을 _/usr/local/bin_ 디렉토리로 복사하세요.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
이진 파일의 사용자 및 그룹 소유권을 1단계에서 생성한 prometheus 사용자로 설정하세요.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
consoles 및 _console_libraries_ 디렉토리를 _/etc/prometheus_로 복사하세요.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
디렉토리의 사용자 및 그룹 소유권을 prometheus 사용자로 설정하세요. -R 플래그를 사용하면 디렉토리 내부의 파일에도 소유권이 설정됩니다.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
프로메테우스가 설치되었으므로 첫 번째 실행을 준비하기 위해 구성 및 서비스 파일을 생성합니다.

## 3단계 - 프로메테우스 구성

_etc/prometheus_ 렉토리에서 nano 또는 좋아하는 텍스트 편집기를 사용하여 _prometheus.yml_이라는 구성 파일을 생성하세요.

```
sudo nano /etc/prometheus/prometheus.yml

```
전역 설정에서 메트릭 스크래핑의 기본 간격을 정의하세요. 프로메테우스는 개별 수출자의 설정이 전역 설정을 덮어쓰지 않는 한 이러한 설정을 모든 수출자에 적용합니다.

```
global:
  scrape_interval: 15s

```
이 스크래핑 간격 값은 대부분의 수출자에 대해 충분한 15초마다 프로메테우스가 메트릭을 수집하도록 지정합니다.
이제 다음 스크래_configs 지시문을 사용하여 프로메테우스 자체를 스크래핑할 수출자 목록에 추가하세요:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
프로메테우스는 _job_name_을 사용하여 쿼리 및 그래프에서 수출자에 레이블을 지정하므로 여기에서 설명적인 내용을 선택하세요.

또한 프로메테우스는 성능 모니터링 및 디버깅에 사용할 수 있는 중요한 데이터를 내보내므로 더 자주 업데이트하기 위해 전역 스크래핑 간격 지시문을 15초에서 5초로 재정의했습니다.

마지막으로 프로메테우스는 _static_configs_ 및 _targets_ 지시문을 사용하여 수출자가 실행되는 위치를 결정합니다. 이 특정 수출자는 프로메테우스 자체와 동일한 서버에서 실행되므로 IP 주소 대신 로컬호스트와 기본 포트 9090을 사용할 수 있습니다.

구성 파일은 이제 다음과 같아야 합니다:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
파일을 저장하고 텍스트 편집기를 종료하세요.

이제 구성 파일의 사용자 및 그룹 소유권을 1단계에서 생성한 prometheus 사용자로 설정하세요.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
구성이 완료되었으므로 프로메테우스를 처음 실행하여 테스트할 준비가 되었습니다.

## 4단계 - 프로메테우스 실행

_prometheus_ 사용자로 프로메테우스를 시작하고 구성 파일 및 데이터 디렉토리의 경로를 제공하세요.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

출력에는 프로메테우스의 로딩 진행 상황, 구성 파일 및 관련 서비스에 대한 정보가 포함됩니다. 또한 프로메테우스가 포트 _9090_에서 수신 대기 중임을 확인합니다.

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
에러 메시지가 나오면 구성 파일에서 YAML 구문을 사용했는지 확인한 다음 문제를 해결하기 위해 화면 안내에 따르십시오.

이제 _CTRL+C_를 눌러 Prometheus를 중지하고 새로운 _systemd_ 서비스 파일을 엽니다.

```
sudo nano /etc/systemd/system/prometheus.service

```
서비스 파일은 _systemd_에게 prometheus 사용자로 Prometheus를 실행하고 _/etc/prometheus/prometheus.yml_ 디렉토리에 있는 구성 파일을 사용하며 데이터를 _/var/lib/prometheus_ 디렉토리에 저장하도록 지시합니다. 다음 내용을 파일에 복사하십시오.

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

마지막으로 파일을 저장하고 텍스트 편집기를 닫으십시오. 새로 생성된 서비스를 사용하려면 systemd를 다시로드하십시오.

```
sudo systemctl daemon-reload

```
이제 다음 명령을 사용하여 Prometheus를 시작할 수 있습니다.

```
sudo systemctl start prometheus

```
Prometheus가 실행 중인지 확인하려면 서비스의 상태를 확인하십시오.

```
sudo systemctl status prometheus

```
출력에서 Prometheus의 상태, 주 프로세스 식별자 (PID), 메모리 사용 등을 확인할 수 있습니다.

서비스의 상태가 활성 상태가 아닌 경우, 문제를 해결하기 전에 화면 안내에 따라 이전 단계를 다시 추적하십시오.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

계속 진행하기 전에 상태 명령을 종료하려면 _Q_를 누르십시오. 마지막으로 서비스를 부팅 시 시작하도록 활성화하십시오.

```
sudo systemctl enable prometheus

```

이제 Prometheus가 실행되고 작동 중이므로 서버 리소스에 대한 메트릭을 생성하기 위해 추가적인 익스포터를 설치할 수 있습니다.

## 단계 5 - Node Exporter 다운로드

Prometheus를 자체 메트릭을 넘어서기 위해 Node Exporter라는 추가 익스포터를 설치할 것니다. Node Exporter는 CPU, 디스크 및 메모리 사용량을 포함한 시스템에 대한 자세한 정보를 제공합니다. Node Exporter의 최신 안정 버전을 홈 디렉토리에 다운로드하십시오. 최신 이진 파일은 [Prometheus 다운로드 페이지](https://prometheus.io/download/)에서 찾을 수 있습니다.

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
이제 다운로드한 아카이브를 압축 해제하세요.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
이렇게 하면 _node_exporter-1.0.1.linux-amd64_라는 디렉토리가 생성되며, 그 안에 _node_exporter_라는 이진 파일, 라이선스 및 공지가 포함됩니다.

이진 파일을 _/usr/local/bin_ 디렉토리로 복사하고 사용자와 그룹 소유권을 Step 1에서 생성한 node_exporter 사용자로 설정하십시오.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
이제 Node Exporter를 설치했으므로 부팅 시 시작되도록 서비스 파일을 생성하기 전에 실행하여 테스트해 보겠습니다.

## 단계 6 - Node Exporter 실행

Node Exporter를 실행하는 단계는 Prometheus 자체를 실행하는 단계와 유사합니다. 먼저 Node Exporter를 위한 Systemd 서비스 파일을 생성하십시오.

```
sudo nano /etc/systemd/system/node_exporter.service

```
다음 내용을 서비스 파일에 복사하십시오.

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

파일을 저장하고 텍스트 편집기를 닫으십시오. 마지막으로 systemd를 다시로드하여 새로 생성된 서비스를 사용하십시오.

```
sudo systemctl daemon-reload

```
이제 다음 명령을 사용하여 Node Exporter를 실행할 수 있습니다.

```
sudo systemctl start node_exporter

```
확인 that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
이전과 마찬가지로 이 출력에서 Node Exporter의 상태, 주 프로세스 식별자 (PID), 메모리 사용 등을 확인할 수 있습니다. 서비스의 상태가 활성 상태가 아닌 경우, 화면 안내에 따라 이전 단계를 다시 추적하여 문제를 해결하십시오.

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
마지막으로 Node Exporter를 부팅 시 시작하도록 활성화하십시오.

```
sudo systemctl enable node_exporter

```
Node Exporter가 완전히 구성되고 예상대로 실행되면 Prometheus에 새로운 메트릭을 스크래핑하도록 지시할 수 있습니다.

## 단계 7 - Prometheus를 Node Exporter 스크래핑으로 구성하기

Prometheus는 구성 파일의 scrape_configs 부분에 정의된 익스포터만 스크래핑하므로 Prometheus 자체와 마찬가지로 Node Exporter에 대한 항목을 추가해야 합니다. 구성 파일을 엽니다.

```
sudo nano /etc/prometheus/prometheus.yml

```
scrape_configs 블록의 끝에 node_exporter라는 새 항목을 추가하십시오.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
이 익스포터도 Prometheus 자체와 동일한 서버에서 실행되므로 IP 주소 대신 localhost를 사용하고 Node Exporter의 기본 포트인 9100을 사용할 수 있습니다. 전체 구성 파일은 다음과 같아야 합니다:

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
파일을 저장하고 텍스트 편집기를 종료하십시오. 변경 사항을 적용하기 위해 Prometheus를 다시 시작하십시오.

```
sudo systemctl restart prometheus

```
다시 한 번 상태 명령으로 모든 것이 올바르게 실행되는지 확인하십시오.

```
sudo systemctl status prometheus

```
서비스의 상태가 활성 상태로 설정되지 않은 경우, 화면 안내에 따라 이전 단계를 다시 추적하십시오.

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

이제 Prometheus와 Node Exporter가 설치되고 구성되어 실행 중입니다.

## 단계 8 - Robonomic 빌드인 node_exporter 추가

Prometheus와 node_exporter를 성공적으로 설치한 후 모든 substrate 프로젝트에서 내장된 prometheus 익스포터를 사용해야 합니다. 이를 위해 _/etc/prometheus/prometheus.yml_에 추가 항목을 추가해야 합니다.. 
구성 파일을 엽니다.

```
sudo nano /etc/prometheus/prometheus.yml

```
scrape_configs 블록의 끝에 robonomic_exporter라는 새 항목을 추가하십시오.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
파일을 저장하고 텍스트 편집기를 종료하세요. 전체 구성 파일은 다음과 같아야 합니다:

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

마지막으로, 변경 사항을 적용하기 위해 Prometheus를 다시 시작하세요.

```
sudo systemctl restart prometheus

```
다시 한 번 상태 명령으로 모든 것이 올바르게 실행되는지 확인하십시오.

```
sudo systemctl status prometheus

```
이제 _Prometheus_, _Node Exporter_, 그리고 _Robonomic Exporter_가 설치되고 구성되어 실행 중입다. 이제 Grafana로 이동하세요.

## 9단계 - Grafana 설정

마지막 단계는 Grafana에서 Prometheus를 데이터 소스로 연결하는 것입니다. 이 튜토리얼에서는 최대 5개의 대시보드와 전용 [Robonomics 대시보드](https://grafana.com/grafana/dashboards/13015)를 사용할 수 있는 무료 클라우드 기반 grafana를 사용합니다. [grafana.com](https://grafana.com/)으로 이동하여 새 계정을 만들고 새로 생성된 grafana 인스턴스에 로그인하세요.

먼저, 우리의 경우 Prometheus 서버가 될 새로운 _**데이터 소스**_를 Grafana에 추가해야 합니다.
데이터 소스로 이동하세요:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

그런 다음 **_데이터 소스 추가_**를 클릭하세요.

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Next επιλέξτε _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

새로운 화면에서 **_Prometheus 서버 IP 주소와 9090 포트_**를 입력하세요.

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

그 후, 모든 단계를 완료했다면 _**저장 및 테스트**_를 클릭하세요. 그러면 녹색으로 표시되어 대시보드를 가져오기 준비가 완료됩니다. 메인 사이트에서 **+**를 클릭한 다음 아래 그림과 같이 **가져오기**를 클릭하세요.

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

그런 다음 가져오기 페이지가 표시됩니다.

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

_Grafana.com 대시보드 URL 또는 ID_란에 _**13015**_를 입력하세요 (이는 Robonomic 대시보드의 ID입니다).

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

외부 대시보드를 로드한 후에는 다음 화면이 표시됩니다.

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

마지막 단계는 이전에 생성한 **_데이터 소스_**를 선택하고 _**가져오기**_를 클릭하는 것입니다.

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

끝났습니다! 이 시점에서 가져온 대시보드가 표시됩니다. 


## 참고 자료

* [Ubuntu 16.04에 Prometheus 설치하는 방법](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Prometheus + Grafana로 모니터링 대시보드 만들기](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Prometheus를 위한 Grafana 지원](https://prometheus.io/docs/visualization/grafana/)
* [노드 익스포터로 Linux 호스트 메트릭 모니터링](https://prometheus.io/docs/guides/node-exporter/)
* [Prometheus 쿼리하기](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [노드 메트릭 시각화하기](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Substrate Prometheus Exporter](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Polkadot 노드 메트릭](https://grafana.com/grafana/dashboards/12425)
* [Prometheus 대시드를 위한 Node Exporter](https://grafana.com/grafana/dashboards/11074)
* [Grafana ROBONOMICS (XRT) 메트릭](https://grafana.com/grafana/dashboards/13015)

