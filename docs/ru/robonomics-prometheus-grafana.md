---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**Следующая инструкция предоставлена [Hubo Bubo](https://github.com/hubobubo)**

**Оригинальная статья находится [здесь](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Введение
Для более эффективного мониторинга и поддержки узлов Robonomics рекомендуется настроить мониторинг на основе сервера Prometheus и Grafana. В этом документе будет показано, как настроить каждый из них для полного мониторинга вашего узла.

##  Предварительные требования
* [Server Setup with Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Установленный коллатор Robonomics parachain](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Убедитесь, что на вашем компьютере работает robonomics.service и порт 9615 доступен 

## Шаг 1 - Создание учетных записей службы

В целях безопасности мы начнем с создания двух новых учетных записей пользователей: prometheus и node_exporter. Создайте эти две учетные записи и используйте параметры _--no-create-home_ и _--shell /bin/false_, чтобы эти пользователи не могли войти на сервер.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Прежде чем мы загрузим двоичные файлы Prometheus, создайте необходимые каталоги для хранения файлов и данных Prometheus. Следуя стандартным соглашениям Linux, мы создадим каталог в _/etc_ для файлов конфигурации Prometheus и каталог в _/var/lib_ для его данных.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Теперь установите владельца пользователя и группы на новые каталоги для пользователя prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Шаг 2 - Загрузка Prometheus

Сначала загрузите и распакуйте текущую стабильную версию Prometheus в ваш домашний каталог. Последние двоичные файлы можно найти на [странице загрузки Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Теперь распакуйте загруженный архив.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Это создаст каталог с именем prometheus-2.21.0.linux-amd64, содержащий два двоичных файла (prometheus и promtool), каталоги _consoles_ и _console_libraries_ с файлами интерфейса веб-страницы, лицензией, уведомлением и несколькими примерами файлов.

Скопируйте два двоичных файла в каталог _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Установите владельца пользователя и группы на двоичные файлы для пользователя prometheus, созданного на шаге 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Скопируйте каталоги consoles и _console_libraries_ в _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Установите владельца пользователя и группы на каталоги для пользователя prometheus. Использование флага -R гарантирует, что владение будет установлено и для файлов внутри каталога.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Теперь, когда Prometheus установлен, мы создадим его файлы конфигурации и службы в предварительной подготовке к его первому запуску.

## Шаг 3 - Настройка Prometheus

В каталоге _/etc/prometheus_ используйте nano или ваш текстовый редактор, чтобы создать файл конфигурации с именем _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
В глобальных настройках определите интервал по умолчанию для сбора метрик. Обратите внимание, что Prometheus будет применять эти настройки ко всем экспортерам, если настройки самих экспортеров не переопределяют глобальные настройки.

```
global:
  scrape_interval: 15s

```
Это значение scrape_interval говорит Prometheus собирать метрики от своих экспортеров каждые 15 секунд, что достаточно для большинства экспортеров.
Теперь добавьте сам Prometheus в список экспортеров для сбора с помощью следующей директивы scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus использует _job_name_ для маркировки экспортеров в запросах и на графиках, поэтому выберите что-то описательное здесь.

И, поскольку Prometheus экспортирует важные данные о себе, которые можно использовать для мониторинга производительности и отладки, мы переопределили глобальную директиву scrape_interval с 15 секунд до 5 секунд для более частых обновлений.

Наконец, Prometheus использует директивы _static_configs_ и _targets_ для определения места работы экспортеров. Поскольку этот экспортер работает на том же сервере, что и сам Prometheus, мы можем использовать localhost вместо IP-адреса вместе с портом по умолчанию, 9090.

Ваш файл конфигурации должен выглядеть так:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Сохраните файл и закройте текстовый редактор.

Теперь установите владельца пользователя и группы на файл конфигурации для пользователя prometheus, созданного на шаге 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
С завершением настройки мы готовы протестировать Prometheus, запустив его в первый раз.

## Step 4 — Запуск Prometheus

Запустите Prometheus от имени пользователя _prometheus_, указав путь к файлу конфигурации и каталогу данных.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

Вывод содержит информацию о прогрессе загрузки Prometheus, файле конфигурации и связанных службах. Он также подтверждает, что Prometheus слушает порт _9090_.

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
Если вы получаете сообщение об ошибке, убедитесь, что вы использовали синтаксис YAML в файле конфигурации, а затем следуйте инструкциям на экране для устранения проблемы.

Теперь остановите Prometheus, нажав _CTRL+C_, а затем откройте новый файл службы _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Файл службы указывает _systemd_ запустить Prometheus от имени пользователя prometheus, с файлом конфигурации, расположенным в каталоге _/etc/prometheus/prometheus.yml_, и сохранить данные в каталоге _/var/lib/prometheus_. Скопируйте следующее содержимое в файл:

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

Наконец, сохраните файл и закройте текстовый редактор. Чтобы использовать только что созданную службу, перезагрузите systemd.

```
sudo systemctl daemon-reload

```
Теперь вы можете запустить Prometheus с помощью следующей команды:

```
sudo systemctl start prometheus

```
Чтобы убедиться, что Prometheus работает, проверьте статус службы.

```
sudo systemctl status prometheus

```
Вывод показывает статус Prometheus, идентификатор основного процесса (PID), использование памяти и многое другое.

Если статус службы неактивен, следуйте инструкциям на экране и повторите предыдущие шаг для устранения проблемы перед продолжением обучения.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Когда вы будете готовы продолжить, нажмите _Q_ для выхода из команды статуса. Наконец, включите службу для запуска при загрузке.

```
sudo systemctl enable prometheus

```

Теперь, когда Prometheus работает, мы можем установить дополнительный экспортер для генерации метрик о ресурсах нашего сервера.

## Шаг 5 — Загрузка Node Exporter

Чтобы расширить Prometheus за пределы метрик только о себе, мы установим дополнительный экспортер под названием Node Exporter. Node Exporter предоставляет подробную информацию о системе, включая использование ЦП, диска и памяти. Загрузите текущую стабильную версию Node Exporter в ваш домашний каталог. Последние бинарные файлы можно найти на [странице загрузки Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Теперь распакуйте скачанный архив.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Это создаст каталог с именем _node_exporter-1.0.1.linux-amd64_, содержащий двоичный файл с именем _node_exporter_, лицензию и уведомление.

Скопируйте двоичный файл в каталог _/usr/local/bin_ и установите владельца пользователя и группы на пользователя node_exporter, созданного на Шаге 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Теперь, когда вы установили Node Exporter, давайте проверим его работу, запустив его перед созданием файла службы, чтобы он запускался при загрузке.

## Step 6 — Запуск Node Exporter

Шаги для запуска Node Exporter аналогичны шагам для запуска самого Prometheus. Начните с создания файла службы Systemd для Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Скопируйте следующее содержимое в файл службы:

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

Сохраните файл и закройте текстовый редактор. Наконец, перезагрузите systemd, чтобы использовать только что созданную службу.

```
sudo systemctl daemon-reload

```
Теперь вы можете запустить Node Exporter с помощью следующей команды:

```
sudo systemctl start node_exporter

```
Проверка that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
Как и раньше, этот вывод показывает статус Node Exporter, идентификатор основного процесса (PID), использование памяти и многое другое. Если статус службы неактивен, следуйте инструкциям на экране и повторите предыдущие шаги для устранения проблемы перед продолжением.

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
Наконец, включите Node Exporter для запуска при загрузке.

```
sudo systemctl enable node_exporter

```
После полной настройки и успешного запуска Node Exporter мы скажем Prometheus начать сбор новых метрик.

## Шаг 7 — Настройка Prometheus для сбора метрик Node Exporter

Поскольку Prometheus собирает только экспортеры, которые определены в разделе scrape_configs его файла конфигурации, нам нужно добавить запись для Node Exporter, так же, как мы сделали для самого Prometheus. Откройте файл конфигурации.

```
sudo nano /etc/prometheus/prometheus.yml

```
В конце блока scrape_configs добавьте новую запись с именем node_exporter.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Поскольку этот экспортер также работает на том же сервере, что и сам Prometheus, мы можем использовать localhost вместо IP-адреса, а также порт по умолчанию Node Exporter, 9100. Весь ваш файл конфигурации должен выглядеть так:

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
Сохраните файл и закройте текстовый редактор, когда будете готовы продолжить. Наконец, перезапустите Prometheus, чтобы изменения вступили в силу.

```
sudo systemctl restart prometheus

```
Еще раз убедитесь, что все работает правильно с помощью команды статуса.

```
sudo systemctl status prometheus

```
Если статус службы не установлен как активный, следуйте инструкциям на экране и повторите предыдущие шаги перед продолжением.

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

Теперь у нас установлен, настроен и работает Prometheus и Node Exporter.

## Шаг 8 - Добавление встроенного в Robonomic node_exporter

После успешной установки Prometheus и node_exporter нам придется использовать встроенный экспортер Prometheus в каждом проекте подложки. Чтобы это произошло, нам нужно добавить дополнительную запись в _/etc/prometheus/prometheus.yml_.
Откройте файл конфигурации.

```
sudo nano /etc/prometheus/prometheus.yml

```
В конце блока scrape_configs добавьте новую запись с именем robonomic_exporter.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Сохраните файл и закройте текстовый редактор. Весь ваш файл конфигурации должен выглядеть так:

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

Наконец, перезапустите Prometheus, чтобы изменения вступили в силу.

```
sudo systemctl restart prometheus

```
Еще раз убедитесь, что все работает правильно, с помощью команды status.

```
sudo systemctl status prometheus

```
У нас теперь установлены, настроены и работают _Prometheus_, _Node Exporter_ и _Robonomic Exporter_. Теперь перейдите к Grafana

## Шаг 9 - Настройка Grafana

Последний шаг - подключить Prometheus в качестве источника данных в Grafana. В этом руководстве мы будем использовать бесплатную облачную версию Grafana, которая позволяет иметь до 5 панелей мониторинга, а также отдельную [панель Robonomics](https://grafana.com/grafana/dashboards/13015). Просто перейдите на [grafana.com](https://grafana.com/), создайте новую учетную запись и войдите в свою новую учетную запись Grafana.

Сначала мы должны добавить в Grafana новый _**источник данных**_, который в нашем случае будет сервером Prometheus.
Перейдите в раздел Источник данных:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

Затем нажмите **_Добавить источник данных_**

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Затем выберите _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

На новом экране введите **_IP-адрес вашего сервера Prometheus с портом 9090_**

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

После этого нажмите _**Сохранить и проверить**_, если вы выполнили все шаги, то должны увидеть зеленую галочку и быть готовыми к импорту панели мониторинга. На главной странице нажмите **+**, а затем **Импорт**, как показано на рисунке ниже:

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

Затем вы увидите страницу импорта:

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

В поле _URL или ID панели Grafana.com_ напишите _**13015**_ (так как это ID панели Robonomic)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

После загрузки внешней панели мониторинга вы увидите этот экран:

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

Последний шаг - выбрать ранее созданный **_источник данных_** и нажать _**Импорт**_

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

Вот и все! На этом этапе вы должны увидеть импортированную панель мониторинга. 


## Ссылки

* [Как установить Prometheus на Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Создание панели мониторинга с помощью Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Поддержка Grafana для Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Мониторинг метрик хоста Linux с помощью node exporter](https://prometheus.io/docs/guides/node-exporter/)
* [Запросы в Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Визуализация метрик узла](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Substrate Prometheus Exporter](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Метрики узла Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Панель мониторинга Node Exporter для Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Метрики ROBONOMICS (XRT) в Grafana](https://grafana.com/grafana/dashboards/13015)

