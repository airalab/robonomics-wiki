---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**Наступна інструкція надана [Hubo Bubo](https://github.com/hubobubo)**

**Оригінальна стаття розташована [тут](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Вступ
Для кращого моніторингу та підтримки вузлів Robonomics бажано налаштувати моніторинг на основі сервера Prometheus та Grafana. Цей документ покаже, як налаштувати кожен з них для повного моніторингу вашого вузла.

##  Передумови
* [Налаштування сервера з Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Встановлений коллатор Robonomics parachain](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Переконайтеся, що на вашому комп'ютері працює robonomics.service і порт 9615 доступний 

## Крок 1 — Створення користувачів служби

З метою безпеки ми почнемо з створення двох нових облікових записів користувачів, prometheus та node_exporter. Створіть цих двох користувачів і використовуйте параметри _--no-create-home_ та _--shell /bin/false_, щоб ці користувачі не могли увійти на сервер.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Перед тим, як ми завнтажимо бінарні файли Prometheus, створимо необхідні каталоги для зберігання файлів та даних Prometheus. Відповідно до стандартних конвенцій Linux, ми створимо каталог у _/etc_ для файлів конфігурації Prometheus та каталог у _/var/lib_ для його даних.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Тепер встановіть власника користувача та групи для нових каталогів на користь користувача prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Крок 2 — Завантаження Prometheus

Спочатку завантажте та розпакуйте поточну стабільну версію Prometheus у ваш домашній каталог. Ви можете знайти останні бінарні файли на [сторінці завантаження Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Тепер розпакуйте завантажений архів.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Це створить каталог з назвою prometheus-2.21.0.linux-amd64, що містить два бінарних файли (prometheus та promtool), каталоги _consoles_ та _console_libraries_ з файлами інтерфейсу веб-сторінки, ліцензию, повідомлення та кілька прикладових файлів.

Скопіюйте два бінарних файли в каталог _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Встановіть власника користувача та групи для бінарних файлів на користь користувача prometheus, створеного на кроці 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Скопіюйте каталоги consoles та _console_libraries_ в _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Встановіть власника користувача та групи для каталогів на користь користувача prometheus. Використання прапорця -R забезпечить встановлення власності для файлів всередині каталогу.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Тепер, коли Prometheus встановлено, ми створимо його конфігураційні та службові файли в підготовці до першого запуску.

## Крок 3 — Налаштування Prometheus

У каталозі _/etc/prometheus_ використовуйте nano або ваш текстовий редактор, щоб створити файл конфігурації з назвою _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
У глобальних налаштуваннях визначте типовий інтервал для збору метрик. Зверніть увагу, що Prometheus застосовуватиме ці налаштування до кожного експортера, якщо власні налаштування експортера не перевизначають глобальні.

```
global:
  scrape_interval: 15s

```
Це значення scrape_interval вказує Prometheus збирати метрики з його експортерів кожні 15 секунд, що достатньо для більшості експортерів.
Тепер додайте самого Prometheus до списку експортерів для збору з директивою scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus використовує _job_name_ для позначення експортерів у запитах та на графіках, тому оберіть щось описове тут.

І, оскільки Prometheus експортує важливі дані про себе, які можна використовувати для моніторингу продуктивності та налагодження, ми перевизначили глобальну директиву scrape_interval з 15 секунд на 5 секунд для більш частого оновлення.

Нарешті, Prometheus використовує директиви _static_configs_ та _targets_ для визначення місця розташування експортерів. Оскільки цей експортер працює на тому ж сервері, що й сам Prometheus, ми можемо використовувати localhost замість IP-адреси разом з типовим портом, 9090.

Ваш файл конфігурації тепер повинен виглядати так:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Збережіть файл і закрийте текстовий редактор.

Тепер встановіть власника користувача та групи для файлу конфігурації на користь користувача prometheus, створеного на кроці 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Завершивши налаштування, ми готові протестувати Prometheus, запустивши його вперше.

## Крок 4 — Запуск Prometheus

Запустіть Prometheus як користувач _prometheus_, вказавши шлях до файлу конфігурації та каталогу даних.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

Вивід містить інформацію про прогрес завантаження Prometheus, файл конфігурації та пов'язані служби. Він також підтверджує, що Prometheus прослуховує порт _9090_.

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
Якщо ви отримуєте повідомлення про помилку, перевірте, чи використовуєте ви синтаксис YAML у своєму файлі конфігурації, а потім дотримуйтесь інструкцій на екрані, щоб вирішити проблеу.

Тепер зупиніть Prometheus, натиснувши _CTRL+C_, а потім відкрийте новий файл служби _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Файл служби повідомляє _systemd_, щоб запустити Prometheus як користувача prometheus, з файлом конфігурації, розташованим у каталозі _/etc/prometheus/prometheus.yml_, і зберігати дані у каталозі _/var/lib/prometheus_. Скопіюйте наступний вміст у файл:

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

Наостанок, збережіть файл і закрийте текстовий редактор. Щоб використовувати новостворену службу, перезавантажте systemd.

```
sudo systemctl daemon-reload

```
Тепер ви можете запустити Prometheus за допомогою наступної команди:

```
sudo systemctl start prometheus

```
Щоб переконатися, що Prometheus працює, перевірте статус служби.

```
sudo systemctl status prometheus

```
Вивід показує статус Prometheus, ідентифікатор основного процесу (PID), використання пам'яті та інше.

Якщо статус служби не є активним, дотримуйтесь інструкцій на екрані та повторно пройдіть попередні кроки, щоб вирішити проблему перед продовженням навчального посібника.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Коли ви будете готові перейти далі, натисніть _Q_, щоб вийти з команди статусу. Нарешті, активуйте службу, щоб вона запускалася при завантаженні.

```
sudo systemctl enable prometheus

```

Тепер, коли Prometheus працює, ми можемо встановити додатковий експортер для генерації метрик про ресурси нашого сервера.

## Крок 5 — Завантаження Node Exporter

Щоб розширити Prometheus поза метриками лише про себе, ми встановимо додатковий експортер під назвою Node Exporter. Node Exporter надає детальну інформацію про систему, включаючи використання процесора, диска та пам'яті. Завантажте поточну стабільну версію Node Exporter у ваш домашній каталог. Останні бінарні файли можна знайти на [сторінці завантаження Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Тепер розпакуйте завантажений архів.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Це створить каталог під назвою _node_exporter-1.0.1.linux-amd64_, що містить бінарний файл з назвою _node_exporter_, ліцензію та повідомлення.

Скопіюйте бінарний файл до каталогу _/usr/local/bin_ та встановіть власника та групу користувачів на користувача node_exporter, якого ви створили на кроці 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Тепер, коли ви встановили Node Exporter, давайте спробуємо його запустити, виконавши його перед створенням файлу служби, щоб він запускався при завантаженні.

## Крок 6 — Запуск Node Exporter

Кроки для запуску Node Exporter схожі на кроки для запуску самого Prometheus. Спочатку створіть файл служби Systemd для Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Скопіюйте наступний вміст у файл служби:

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

Збережіть файл і закрийте текстовий редактор. Нарешті, перезавантажте systemd, щоб використовувати новостворену службу.

```
sudo systemctl daemon-reload

```
Тепер ви можете запустити Node Exporter за допомогою наступної команди:

```
sudo systemctl start node_exporter

```
Перевірити that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
Як і раніше, цей вивід показує статус Node Exporter, ідентифікатор основного процесу (PID), використання пам'яті та інше. Якщо статус служби не є активним, дотримуйтесь інструкцій на екрані та повторно пройдіть попередні кроки, щоб вирішити проблему перед продовженням.

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
Нарешті, активуйте Node Exporter, щоб він запускався при завантаженні.

```
sudo systemctl enable node_exporter

```
З Node Exporter повністю налаштованим і працюючим, ми скажемо Prometheus почати збирати нові метрики.

## Крок 7 — Налаштування Prometheus для збору метрик Node Exporter

Оскільки Prometheus збирає лише експортери, які визначені в частині scrape_configs його файлу конфігурації, нам потрібно додати запис для Node Exporter, так само, як ми це зробили для самого Prometheus. Відкрийте файл конфігурації.

```
sudo nano /etc/prometheus/prometheus.yml

```
В кінці блоку scrape_configs додайте новий запис з назвою node_exporter.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Оскільки цей експортер також працює на тому самому сервері, що й сам Prometheus, ми можемо використовувати localhost замість IP-адреси разом зі стандартним портом Node Exporter, 9100. Весь ваш файл конфігурації повинен виглядати так:

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
Збережіть файл і закрийте текстовий редактор, коли будете готові продовжити. Нарешті, перезапустіть Prometheus, щоб зміни набули чинності.

```
sudo systemctl restart prometheus

```
Знову перевірте, що все працює правильно за допомогою команди статусу.

```
sudo systemctl status prometheus

```
Якщо статус служби не встановлено як активний, дотримуйтесь інструкцій на екрані та повторно пройдіть попередні кроки перед продовженням.

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

Тепер у нас встановлені, налаштовані та працюють Prometheus та Node Exporter.

## Крок 8 - Додавання вбудованого експортера Robonomic до node_exporter

Після успішного встановлення Prometheus та node_exporter нам потрібно використовувати вбудований експортер prometheus в кожному проекті підстрати. Щоб це зробити, ми повинні додати додатковий запис до _/etc/prometheus/prometheus.yml_. 
Відкрийте файл конфігурації.

```
sudo nano /etc/prometheus/prometheus.yml

```
В кінці блоку scrape_configs додайте новий запис з назвою robonomic_exporter.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Збережіть файл і вийдіть з текстового редактора. Ваш файл конфігурації повинен виглядати так:

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

Наостанку, перезапустіть Prometheus, щоб зробити зміни дійсними.

```
sudo systemctl restart prometheus

```
Знову перевірте, що все працює правильно за допомогою команди статусу.

```
sudo systemctl status prometheus

```
Тепер у нас встановлені, налаштовані та працюють _Prometheus_, _Node Exporter_ та _Robonomic Exporter_. Тепер перейдіть до Grafana.

## Крок 9 - Налаштування Grafana

Останнім кроком є підключення Prometheus як джерела даних у Grafana. Для цієї підручника ми використовуватимемо безкоштовну хмарну версію Grafana, яка дозволяє мати до 5 панелей і спеціальну [панель Robonomics](https://grafana.com/grafana/dashboards/13015). Просто перейдіть на [grafana.com](https://grafana.com/), створіть новий обліковий запис і увійдіть до свого новоствореного екземпляру Grafana.

Спочатку нам потрібно додати до Grafana нове _**Джерело даних**_, яким у нашому випадку буде сервер Prometheus.
Перейдіть до Джерела даних:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

Потім натисніть **_Додати джерело даних_**

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Next виберіть _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

На новому екрані введіть вашу **_IP-адресу сервера Prometheus з портом 9090_**

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

Після цього натисніть _**Зберегти та перевірити**_, якщо ви виконали всі кроки, то все повинно бути зеленим і готовим до імпорту панелі. На головній сторінці натисніть **+**, а потім **Імпортувати**, як показано на зображенні нижче:

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

Потім ви повинні побачити сторінку Імпорту:

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

У полі _URL або ідентифікатор панелі Grafana.com_ введіть _**13015**_ (це ID панелі Robonomic)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

Після завантаження зовнішньої панелі ви побачите цей екран:

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

Останнім кроком є вибір раніше створеного **_Джерела даних_** і натискання _**Імпортувати**_

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

Це все! На цьому етапі ви повинні побачити імпортовану панель. 


## Посилання

* [Як встановити Prometheus на Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Створення моніторингової панелі за допомогою Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Підтримка Grafana для Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Моніторинг метрик хоста Linux за допомогою експортера вузла](https://prometheus.io/docs/guides/node-exporter/)
* [Запити до Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Візуалізація метрик вузла](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Експортер Prometheus для Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Метрика вузла Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Панель експортера вузла для Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Метрики ROBONOMICS (XRT) Grafana](https://grafana.com/grafana/dashboards/13015)

