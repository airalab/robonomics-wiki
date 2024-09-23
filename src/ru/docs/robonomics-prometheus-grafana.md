---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**Инструкция предоставлена [Hubo Bubo](https://github.com/hubobubo)**

**Оригинальная статья находится [здесь](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Введение
Для более эффективного мониторинга и обслуживания узлов Robonomics хорошо настроить мониторинг на основе сервера Prometheus и Grafana. В этом документе будет показано, как настроить каждый из них для полного мониторинга вашего узла.

##  Предварительные требования
* [Настройка сервера с Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [Установлен коллатор парачейна Robonomics](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Убедитесь, что на вашем компьютере работает служба robonomics.service и порт 9615 доступен

## Шаг 1 — Создание учетных записей службы

В целях безопасности начнем с создания двух новых учетных записей пользователей, prometheus и node_exporter. Создайте эти два пользователя, используя опции _--no-create-home_ и _--shell /bin/false_, чтобы эти пользователи не могли войти на сервер.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Прежде чем загружать бинарные файлы Prometheus, создайте необходимые каталоги для хранения файлов и данных Prometheus. Следуя стандартным конвенциям Linux, создадим каталог в _/etc_ для файлов конфигурации Prometheus и каталог в _/var/lib_ для его данных.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Теперь установите владельца пользователя и группы на новые каталоги на пользователя prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Шаг 2 — Загрузка Prometheus

Сначала загрузите и распакуйте текущую стабильную версию Prometheus в ваш домашний каталог. Последние бинарные файлы можно найти на [странице загрузки Prometheus.](https://prometheus.io/download/)

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Теперь распакуйте загруженный архив.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Это создаст каталог с именем prometheus-2.21.0.linux-amd64, содержащий два двоичных файла (prometheus и promtool), каталоги _consoles_ и _console_libraries_ с файлами веб-интерфейса, лицензию, уведомление и несколько примеров файлов.

Скопируйте двоичные файлы в каталог _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Установите владельца и группу для двоичных файлов на пользователя prometheus, созданного на Шаге 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Скопируйте каталоги consoles и _console_libraries_ в _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Установите владельца и группу для каталогов на пользователя prometheus. Использование флага -R гарантирует, что владелец будет установлен и для файлов внутри каталога.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Теперь, когда Prometheus установлен, мы создадим его файлы конфигурации и службы для подготовки к первому запуску.

## Шаг 3 — Настройка Prometheus

В каталоге _/etc/prometheus_ используйте nano или ваш текстовый редактор, чтобы создать файл конфигурации с именем _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
В глобальных настройках определите интервал сбора метрик по умолчанию. Обратите внимание, что Prometheus применит эти настройки ко всем экспортерам, если настройки собственного экспортера не переопределяют глобальные.

```
global:
  scrape_interval: 15с

```
Это значение scrape_interval говорит Prometheus собирать метрики от своих экспортеров каждые 15 секунд, что достаточно долго для большинства экспортеров.
Теперь добавьте сам Prometheus в список экспортеров для сбора данных с помощью следующей директивы scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus использует _job_name_ для маркировки экспортеров в запросах и на графиках, поэтому убедитесь, что выбрали что-то описательное.

И, поскольку Prometheus экспортирует важные данные о себе, которые можно использовать для мониторинга производительности и отладки, мы переопределили глобальную директиву scrape_interval с 15 секунд на 5 секунд для более частых обновлений.

Наконец, Prometheus использует директивы _static_configs_ и _targets_ для определения местоположения экспортеров. Поскольку данный экспортер работает на том же сервере, что и сам Prometheus, мы можем использовать localhost вместо IP-адреса вместе с портом по умолчанию, 9090.

Ваш файл конфигурации должен выглядеть следующим образом:

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

Теперь установите владельца и группу настройки файла конфигурации на пользователя prometheus, созданного на Шаге 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
После завершения настройки мы готовы протестировать Prometheus, запустив его впервые.

## Шаг 4 — Запуск Prometheus

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
_вывод лога_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:5553 robonomics prometheus[29488]: уровень=инфо ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="Не установлено время или размер хранения, поэтому используется время хранения по умолчанию" продолжительность=15d
Sep 14 17:55:53 robonomics prometheus[29488]: уровень=инфо ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Запуск Prometheus" версия="(версия=2.21.0, ветка=HEAD, ревизия=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: уровень=инфо ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: уровень=инфо ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: уровень=инфо ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: уровень=инфо ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
Sep 14 17:55:53 robonomics prometheus[29488]: уровень=инфо ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Запуск TSDB ..."
Sep 14 17:55:53 robonomics prometheus[29488]: уровень=инфо ts=2020-09-14T15:55:53.368Z caller=web.go:523 component=web msg="Начало прослушивания соединений" address=0.0.0.0:9090
14 сен 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="Воспроизведение сегментов памяти на диске, если они есть"
14 сен 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="Воспроизведение сегментов памяти на диске завершено" duration=12.659µs
14 сен 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="Воспроизведение WAL, это может занять некоторое время"
14 сен 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="Сегмент WAL загружен" segment=0 maxSegment=1
14 сен 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="Сегмент WAL загружен" segment=1 maxSegment=1
14 сен 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="Воспроизведение WAL завершено" checkpoint_replay_duration=48.125µs wal_replay_duration=8.253748ms total_replay_duration=8.343335ms
14 сен 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC
14 сен 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB started"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server is ready to receive web requests."

Если вы получили сообщение об ошибке, убедитесь, что вы использовали синтаксис YAML в вашем файле конфигурации, а затем следуйте инструкциям на экране, чтобы устранить проблему.

Теперь остановите Prometheus, нажав _CTRL+C_, а затем откройте новый файл службы _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Файл службы указывает _systemd_ запускать Prometheus от имени пользователя prometheus, с файлом конфигурации, расположенным в каталоге _/etc/prometheus/prometheus.yml_, и хранить данные в каталоге _/var/lib/prometheus_. Скопируйте следующее содержимое в файл:

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

[Установка]
Желаемый=multi-user.target
```

Наконец, сохраните файл и закройте текстовый редактор. Чтобы использовать вновь созданный сервис, перезагрузите systemd.

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
Вывод сообщает вам о статусе Prometheus, идентификаторе основного процесса (PID), использовании памяти и многом другом.

Если статус службы не активен, следуйте инструкциям на экране и повторите предыдущие шаги, чтобы устранить проблему перед продолжением обучения.

```
* prometheus.service - Prometheus
   Загружено: загружено (/etc/systemd/system/prometheus.service; включено; предустановлено: включено)
   Активно: активно (запущено) с пн 2020-09-14 17:59:48 CEST; 24 часа назад
 Основной PID: 29650 (prometheus)
    Задачи: 9 (лимит: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Когда будете готовы продолжить, нажмите _Q_, чтобы выйти из команды статуса. Наконец, включите службу для запуска при загрузке.

```
sudo systemctl enable prometheus

```

Теперь, когда Prometheus работает, мы можем установить дополнительный экспортер для генерации метрик о ресурсах нашего сервера.

## Шаг 5 — Загрузка Node Exporter

Чтобы расширить Prometheus за пределы метрик только о себе, мы установим дополнительный экспортер под названием Node Exporter. Node Exporter предоставляет подробную информацию о системе, включая использование ЦП, диска и памяти. Загрузите текущую стабильную версию Node Exporter в ваш домашний каталог. Вы можете найти последние бинарные файлы на [странице загрузки Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Теперь распакуйте загруженный архив.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Это создаст каталог с именем _node_exporter-1.0.1.linux-amd64_, содержащий двоичный файл с именем _node_exporter_, лицензию и уведомление.

Скопируйте двоичный файл в каталог _/usr/local/bin_ и установите владельца и группу пользователя на пользователя node_exporter, которого вы создали на шаге 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Теперь, когда вы установили Node Exporter, давайте протестируем его, запустив его перед созданием файла службы, чтобы он запускался при загрузке.

## Шаг 6 — Запуск Node Exporter

Шаги для запуска Node Exporter аналогичны запуску самого Prometheus. Начните с создания файла службы Systemd для Node Exporter.

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
Проверьте, что Node Exporter работает правильно с помощью команды status.

```
sudo systemctl status node_exporter

```
Как и ранее, эти выводы сообщают вам о статусе Node Exporter, основном идентификаторе процесса (PID), использовании памяти и многом другом. Если статус службы не активен, следуйте сообщениям на экране и повторите предыдущие шаги, чтобы устранить проблему перед продолжением.

```
_Вывод_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)
   Задачи: 7 (лимит: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

Наконец, включите Node Exporter для автоматического запуска при загрузке.

sudo systemctl enable node_exporter

После полной настройки Node Exporter и его успешного запуска мы скажем Prometheus начать сбор новых метрик.

## Шаг 7 — Настройка Prometheus для сбора данных от Node Exporter

Поскольку Prometheus собирает данные только от экспортеров, которые определены в разделе scrape_configs его конфигурационного файла, нам нужно добавить запись для Node Exporter, так же как мы это сделали для самого Prometheus. Откройте файл конфигурации.

sudo nano /etc/prometheus/prometheus.yml

В конце блока scrape_configs добавьте новую запись под названием node_exporter.

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

Поскольку этот экспортер также работает на том же сервере, что и сам Prometheus, мы можем снова использовать localhost вместо IP-адреса вместе с портом по умолчанию Node Exporter, 9100. Ваш весь файл конфигурации должен выглядеть так:

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

Сохраните файл и закройте текстовый редактор, когда будете готовы продолжить. Наконец, перезапустите Prometheus, чтобы внести изменения в действие.

sudo systemctl restart prometheus

Еще раз убедитесь, что все работает правильно с помощью команды status.

sudo systemctl status prometheus

Если статус службы не установлен как активный, следуйте инструкциям на экране и повторите предыдущие шаги перед продолжением.

Output
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (лимит: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Теперь у нас установлен, настроен и работает Prometheus и Node Exporter.

## Шаг 8 - Добавление встроенного в Node Exporter Robonomic

После успешной установки Prometheus и Node Exporter нам нужно будет использовать встроенный экспортер Prometheus в каждом проекте Substrate. Для этого нам нужно добавить дополнительную запись в _/etc/prometheus/prometheus.yml_.
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

Наконец, перезапустите Prometheus, чтобы внести изменения.

```
sudo systemctl restart prometheus

```
Еще раз убедитесь, что все работает правильно с помощью команды status.

```
sudo systemctl status prometheus

```
Теперь у нас установлен, настроен и работает _Prometheus_, _Node Exporter_, а также _Robonomic Exporter_. Теперь перейдем к Grafana.

## Шаг 9 - Настройка Grafana

Последний шаг - подключить Prometheus в качестве источника данных в Grafana. Для целей этого руководства мы будем использовать бесплатный облачный Grafana, который позволяет иметь до 5 панелей и выделенную [панель Robonomics](https://grafana.com/grafana/dashboards/13015). Просто перейдите на [grafana.com](https://grafana.com/) создайте новую учетную запись и войдите в свой новый экземпляр Grafana.

В начале нам нужно добавить в Grafana новый _**Источник данных**_, который в нашем случае будет сервером Prometheus.
Перейдите в Источник данных:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"Источник данных"} %}{% endroboWikiPicture %}

Затем нажмите **_Добавить источник данных_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"Источник данных"} %}{% endroboWikiPicture %}

Затем выберите _**Prometheus**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"Источник данных"} %}{% endroboWikiPicture %}

На новом экране введите **_IP-адрес вашего сервера Prometheus с портом 9090_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"Источник данных"} %}{% endroboWikiPicture %}

После этого _**Сохранить и проверить**_, если вы выполнили все шаги, вы должны увидеть зеленый цвет и быть готовыми к импорту панели инструментов. На главной странице нажмите на **+**, а затем **Импорт**, как показано на рисунке ниже:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Импорт панели инструментов"} %}{% endroboWikiPicture %}

Затем вы увидите страницу импорта:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Страница импорта"} %}{% endroboWikiPicture %}

В поле _URL или идентификатор панели инструментов Grafana.com_ напишите _**13015**_ (поскольку это идентификатор панели инструментов Robonomic):

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

После загрузки внешней панели у вас появится следующий экран:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"Импорт панели XRT 13015"} %}{% endroboWikiPicture %}

Последним шагом является выбор ранее созданного **_Источника данных_** и нажатие _**Импорт**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"Prometheus в качестве источника данных"} %}{% endroboWikiPicture %}

ВОТ И ВСЕ! На этом этапе вы должны увидеть импортированную панель.


## Ссылки

* [Как установить Prometheus на Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Создание мониторинговой панели с помощью Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Поддержка Grafana для Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Мониторинг метрик хоста Linux с помощью экспортера узла](https://prometheus.io/docs/guides/node-exporter/)
* [Запросы в Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Визуализация метрик узла](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Экспортер Prometheus для Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [Панель управления Polkadot](https://github.com/w3f/polkadot-dashboard)
* [Метрика узла Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Панель управления Node Exporter для Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Метрики Grafana ROBONOMICS (XRT)](https://grafana.com/grafana/dashboards/13015)