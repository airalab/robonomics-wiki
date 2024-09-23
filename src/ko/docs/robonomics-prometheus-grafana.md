---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**다음 지침은 [Hubo Bubo](https://github.com/hubobubo)에 의해 제공됩니다**

**원본 문서는 [여기](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)에서 확인할 수 있습니다**

## 소개
로보노믹스 노드를 더 잘 모니터링하고 유지하기 위해 프로메테우스 서버와 그라파나를 기반으로 모니터링을 설정하는 것이 좋습니다. 이 문서에서는 노드를 완전히 모니터링하기 위해 각각을 구성하는 방법을 보여줍니다.

## 전제 조건
* [Ubuntu 18.04에서 서버 설정](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [로보노믹스 파라체인 콜레이터 설치](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* 로보노믹스 서비스가 기기에서 작동하고 포트 9615에 접근 가능한지 확인하세요

## 단계 1 — 서비스 사용자 생성

보안 목적으로 두 개의 새 사용자 계정, prometheus와 node_exporter를 생성하여 시작합니다. 이 두 사용자를 생성하고 _--no-create-home_ 및 _--shell /bin/false_ 옵션을 사용하여 이 사용자가 서버에 로그인할 수 없도록 합니다.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

프로메테우스 바이너리를 다운로드하기 전에 프로메테우스 파일 및 데이터를 저장하기 위한 필요한 디렉토리를 생성합니다. 표준 리눅스 규칙을 따라 프로메테우스의 구성 파일을 저장할 _/etc_ 디렉토리와 데이터를 저장할 _/var/lib_ 디렉토리를 생성합니다.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
이제 새 디렉토리에 대한 사용자 및 그룹 소유권을 prometheus 사용자로 설정합니다.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## 단계 2 — 프로메테우스 다운로드

먼저 현재 안정 버전의 프로메테우스를 홈 디렉토리에 다운로드하고 풉니다. 최신 바이너리는 [프로메테우스 다운로드 페이지](https://prometheus.io/download/)에서 찾을 수 있습니다.

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
이제 다운로드한 아카이브를 해제합니다.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
이렇게 하면 prometheus 및 promtool이라는 두 개의 이진 파일, 웹 인터페이스 파일을 포함하는 _consoles_ 및 _console_libraries_ 디렉토리, 라이선스, 공지 및 여러 예제 파일이 포함된 prometheus-2.21.0.linux-amd64이라는 디렉토리가 생성됩니다.

두 이진 파일을 _/usr/local/bin_ 디렉토리로 복사합니다.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
바이너리 파일의 사용자 및 그룹 소유권을 Step 1에서 생성한 prometheus 사용자로 설정합니다.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
_consoles_ 및 _console_libraries_ 디렉토리를 _/etc/prometheus_로 복사합니다.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
디렉토리의 사용자 및 그룹 소유권을 prometheus 사용자로 설정합니다. -R 플래그를 사용하면 디렉토리 내의 파일에도 소유권이 설정됩니다.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Prometheus가 설치되었으므로 첫 실행을 준비하기 위해 구성 및 서비스 파일을 생성합니다.

## Step 3 — Prometheus 구성

_ /etc/prometheus_ 디렉토리에서 nano 또는 선호하는 텍스트 편집기를 사용하여 _prometheus.yml_이라는 구성 파일을 만듭니다.

```
sudo nano /etc/prometheus/prometheus.yml

```
전역 설정에서 메트릭 스크래핑의 기본 간격을 정의합니다. Prometheus는 개별 익스포터의 설정이 전역 설정을 무시하지 않는 한 이러한 설정을 모든 익스포터에 적용합니다.

```
global:
  scrape_interval: 15초

```
이 scrape_interval 값은 Prometheus에게 수집기에서 매 15초마다 메트릭을 수집하도록 지시합니다. 이는 대부분의 수집기에 대해 충분히 긴 시간입니다.
이제 다음 scrape_configs 지시문을 사용하여 Prometheus 자체를 수집 대상 수집기 목록에 추가하십시오.

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus는 _job_name_을 사용하여 쿼리 및 그래프에서 수집기를 레이블링하므로 여기에 설명적인 내용을 선택해야 합니다.

또한, Prometheus는 성능 모니터링 및 디버깅을 위해 사용할 수 있는 중요한 자체 데이터를 내보내므로 더 자주 업데이트하기 위해 전역 scrape_interval 지시문을 15초에서 5초로 재정의했습니다.

마지막으로, Prometheus는 수집기가 실행 중인 위치를 결정하기 위해 _static_configs_ 및 _targets_ 지시문을 사용합니다. 특정 수집기가 Prometheus 자체와 동일한 서버에서 실행 중이므로 IP 주소 대신 localhost와 기본 포트 9090을 사용할 수 있습니다.

이제 구성 파일은 다음과 같아야 합니다.

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
파일을 저장하고 텍스트 편집기를 종료합니다.

이제 구성 파일의 사용자 및 그룹 소유권을 Step 1에서 생성한 prometheus 사용자로 설정하십시오.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
구성이 완료되었으므로 Prometheus를 처음 실행하여 테스트할 준비가 되었습니다.

## Step 4 — Prometheus 실행

_prometheus_ 사용자로 Prometheus를 시작하고 구성 파일 및 데이터 디렉토리 경로를 제공합니다.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

출력에는 Prometheus의 로딩 진행 상황, 구성 파일 및 관련 서비스에 대한 정보가 포함되어 있습니다. 또한 Prometheus가 포트 _9090_에서 수신 대기 중임을 확인합니다.

```
_로그 출력_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="시간 또는 크기 보존이 설정되지 않았으므로 기본 시간 보존을 사용 중" duration=15d
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="프로메테우스 시작 중" version="(version=2.21.0, branch=HEAD, revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="TSDB 시작 중..."2020-09-14T15:55:53.368Z caller=web.go:523 component=web msg="연결 수신 대기 시작" 주소=0.0.0.0:9090
9월 14일 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="디스크 메모리 맵 가능한 청크 재생 중 (있는 경우)"
9월 14일 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="디스크 메모리 맵 가능한 청크 재생 완료" 지속시간=12.659µs
9월 14일 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="WAL 재생 중, 시간이 걸릴 수 있음"
9월 14일 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="WAL 세그먼트 로드됨" 세그먼트=0 최대세그먼트=1
9월 14일 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="WAL 세그먼트 로드됨" 세그먼트=1 최대세그먼트=1
9월 14일 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="WAL 재생 완료" 체크포인트_재생_지속시간=48.125µs wal_재생_지속시간=8.253748ms 총_재생_지속시간=8.343335ms
9월 14일 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB 시작됨"
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="구성 파일 로딩 중" filename=/etc/prometheus/prometheus.yml
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="구성 파일 로딩 완료" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
9월 14일 17:55:53 로보노믹스 프로메테우스[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="서버가 웹 요청을 받을 준비가 되었습니다."

에러 메시지가 표시되면 구성 파일에서 YAML 구문을 사용했는지 확인한 후 문제를 해결하기 위해 화면 안내에 따라 진행하십시오.

이제 _CTRL+C_를 눌러 프로메테우스를 중지하고 새로운 _systemd_ 서비스 파일을 엽니다.

```
sudo nano /etc/systemd/system/prometheus.service

```
서비스 파일은 _systemd_에게 프로메테우스를 prometheus 사용자로 실행하고, 구성 파일이 _/etc/prometheus/prometheus.yml_ 디렉토리에 있으며 데이터를 _/var/lib/prometheus_ 디렉토리에 저장하도록 지시합니다. 다음 내용을 파일에 복사합니다:

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

[설치]
WantedBy=multi-user.target
```

마지막으로 파일을 저장하고 텍스트 편집기를 닫습니다. 새로 만든 서비스를 사용하려면 systemd를 다시로드하십시오.

```
sudo systemctl daemon-reload

```
이제 다음 명령을 사용하여 Prometheus를 시작할 수 있습니다.

```
sudo systemctl start prometheus

```
Prometheus가 실행 중인지 확인하려면 서비스 상태를 확인하십시오.

```
sudo systemctl status prometheus

```
출력에서 Prometheus의 상태, 주 프로세스 식별자(PID), 메모리 사용량 등을 확인할 수 있습니다.

서비스 상태가 활성화되지 않은 경우 화면에 표시된 지침을 따르고 문제를 해결한 후 튜토리얼을 계속하기 전에 이전 단계를 다시 추적하십시오.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

계속하려면 _Q_를 눌러 상태 명령을 종료하십시오. 마지막으로 서비스를 부팅 시 자동으로 시작하도록 활성화하십시오.

```
sudo systemctl enable prometheus

```

이제 Prometheus가 실행 중이므로 서버 리소스에 대한 메트릭을 생성하는 추가 익스포터를 설치할 수 있습니다.

## 단계 5 — Node Exporter 다운로드

Prometheus를 자체 메트릭 이상으로 확장하기 위해 Node Exporter라는 추가 익스포터를 설치할 것입니다. Node Exporter는 CPU, 디스크 및 메모리 사용량을 포함한 시스템에 대한 상세한 정보를 제공합니다. 현재 안정 버전의 Node Exporter를 홈 디렉토리로 다운로드합니다. 최신 이진 파일은 [Prometheus 다운로드 페이지](https://prometheus.io/download/)에서 찾을 수 있습니다.

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
이제 다운로드한 아카이브를 해제하십시오.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
이 명령은 _node_exporter-1.0.1.linux-amd64_라는 디렉토리를 만들고 _node_exporter_라는 이진 파일, 라이선스 및 공지사항을 포함합니다.

이진 파일을 _/usr/local/bin_ 디렉토리로 복사하고 사용자 및 그룹 소유권을 Step 1에서 생성한 node_exporter 사용자로 설정합니다.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
이제 Node Exporter를 설치했으므로 부팅 시 시작되도록 서비스 파일을 만들기 전에 실행하여 테스트해 봅시다.

## 단계 6 — Node Exporter 실행

Node Exporter를 실행하는 단계는 Prometheus 자체를 실행하는 것과 유사합니다. 먼저 Node Exporter를 위한 Systemd 서비스 파일을 만들어 시작합니다.

```
sudo nano /etc/systemd/system/node_exporter.service

```
다음 내용을 서비스 파일에 복사합니다:

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

파일을 저장하고 텍스트 편집기를 닫습니다. 마지막으로 systemd를 다시로드하여 새로 만든 서비스를 사용합니다.

```
sudo systemctl daemon-reload

```
다음 명령을 사용하여 Node Exporter를 실행할 수 있습니다:

```
sudo systemctl start node_exporter

```
status 명령을 사용하여 Node Exporter가 올바르게 실행되는지 확인합니다.

```
sudo systemctl status node_exporter

```
이전과 마찬가지로 이 출력은 Node Exporter의 상태, 주요 프로세스 식별자 (PID), 메모리 사용량 등을 보여줍니다. 서비스 상태가 활성화되지 않은 경우 화면에 표시된 메시지를 따라가고 문제를 해결하기 위해 이전 단계를 다시 추적하십시오.

```
_출력_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)
   작업: 7 (제한: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

마지막으로 Node Exporter를 부팅 시 자동으로 시작하도록 설정합니다.

sudo systemctl enable node_exporter

Node Exporter가 완전히 구성되어 예상대로 실행되면, Prometheus에 새로운 메트릭을 스크래핑하도록 지시합니다.

## 단계 7 — Prometheus를 Node Exporter 스크래핑하도록 구성하기

Prometheus는 설정 파일의 scrape_configs 부분에 정의된 수출자만 스크래핑하므로, Prometheus 자체와 마찬가지로 Node Exporter에 대한 항목을 추가해야 합니다. 구성 파일을 엽니다.

sudo nano /etc/prometheus/prometheus.yml

scrape_configs 블록의 끝에 node_exporter라는 새 항목을 추가합니다.

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

이 수출자도 Prometheus 자체와 동일한 서버에서 실행 중이므로, Node Exporter의 기본 포트인 9100과 함께 다시 IP 주소 대신 localhost를 사용할 수 있습니다. 전체 구성 파일은 다음과 같아야 합니다.

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

변경 사항을 적용하려면 파일을 저장하고 텍스트 편집기를 종료합니다. 마지막으로 변경 사항을 적용하기 위해 Prometheus를 다시 시작합니다.

sudo systemctl restart prometheus

모든 것이 올바르게 실행되는지 다시 한 번 확인하려면 상태 명령을 사용합니다.

sudo systemctl status prometheus

서비스 상태가 활성 상태로 설정되지 않은 경우, 화면에 표시된 지침을 따르고 이전 단계를 다시 추적한 후 계속 진행하십시오.

출력
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (제한: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

이제 Prometheus와 Node Exporter가 설치되어 구성되고 실행 중입니다.

## 단계 8 - Robonomic 내장 node_exporter 추가

Prometheus와 node_exporter를 성공적으로 설치한 후, 모든 substrate 프로젝트에서 내장 prometheus exporter를 사용해야 합니다. 이를 위해 _/etc/prometheus/prometheus.yml_에 추가 항목을 추가해야 합니다.
구성 파일을 엽니다.

```
sudo nano /etc/prometheus/prometheus.yml

```
scrape_configs 블록의 끝에 robonomic_exporter라는 새 항목을 추가합니다.

```
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
파일을 저장하고 텍스트 편집기를 종료합니다. 전체 구성 파일은 다음과 같아야 합니다:

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

마지막으로, 변경 사항을 적용하기 위해 Prometheus를 다시 시작합니다.

```
sudo systemctl restart prometheus

```
다시 한 번 상태 명령어로 모든 것이 올바르게 실행되는지 확인합니다.

```
sudo systemctl status prometheus

```
이제 _Prometheus_, _Node Exporter_ 및 _Robonomic Exporter_가 설치되어 구성되고 실행 중입니다. 이제 Grafana로 이동하세요.

## 단계 9 - Grafana 설정

마지막 단계는 Grafana에서 Prometheus를 데이터 소스로 연결하는 것입니다. 이 튜토리얼에서는 최대 5개의 대시보드와 전용 [Robonomics 대시보드](https://grafana.com/grafana/dashboards/13015). [grafana.com](https://grafana.com/)에 가서 새 계정을 만들고 새로 만든 Grafana 인스턴스에 로그인하세요.

먼저 우리는 Grafana에 새로운 _**데이터 소스**_를 추가해야 합니다. 우리의 경우 Prometheus 서버가 될 것입니다.
데이터 소스로 이동하세요:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"데이터 소스"} %}{% endroboWikiPicture %}

그런 다음 **_데이터 소스 추가_**를 클릭하세요

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"데이터 소스"} %}{% endroboWikiPicture %}

다음으로 _**Prometheus**_를 선택하세요

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"데이터 소스"} %}{% endroboWikiPicture %}

새 화면에서 **_Prometheus 서버 IP 주소와 9090 포트_**를 입력하세요

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"데이터 소스"} %}{% endroboWikiPicture %}

그 후 _**저장 및 테스트**_를 클릭하여 모든 단계를 완료했다면 초록색으로 표시되어 대시보드를 가져오기 위해 준비된 상태여야 합니다. 메인 사이트에서 **+**를 클릭한 다음 아래 사진에 표시된 대로 **가져오기**를 클릭하세요:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"대시보드 가져오기"} %}{% endroboWikiPicture %}

그런 다음 가져오기 페이지가 표시됩니다:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"가져오기 페이지"} %}{% endroboWikiPicture %}

_Grafana.com 대시보드 URL 또는 ID_란에 _**13015**_를 입력하세요 (이는 Robonomic 대시보드의 ID입니다):

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

외부 대시보드를 로드한 후에는 이 화면이 표시됩니다:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"XRT 13015 대시보드 가져오기"} %}{% endroboWikiPicture %}

마지막 단계는 이전에 생성한 **_데이터 소스_**를 선택하고 _**가져오기**_를 클릭하는 것입니다

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"데이터 소스로 Prometheus 선택"} %}{% endroboWikiPicture %}

여기까지입니다! 이 시점에서 가져온 대시보드를 볼 수 있어야 합니다.


## 참고 자료

* [Ubuntu 16.04에 Prometheus 설치하는 방법](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Prometheus + Grafana로 모니터링 대시보드 만들기](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Grafana에서 Prometheus 지원](https://prometheus.io/docs/visualization/grafana/)
* [노드 익스포터로 리눅스 호스트 메트릭 모니터링](https://prometheus.io/docs/guides/node-exporter/)
* [Prometheus 쿼리하기](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [노드 메트릭 시각화하기](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Substrate Prometheus 익스포터](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Polkadot 노드 메트릭](https://grafana.com/grafana/dashboards/12425)
* [Prometheus 대시보드용 노드 익스포터](https://grafana.com/grafana/dashboards/11074)
* [Grafana ROBONOMICS (XRT) 메트릭](https://grafana.com/grafana/dashboards/13015)