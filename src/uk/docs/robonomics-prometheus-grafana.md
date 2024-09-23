---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**Інструкцію надано [Hubo Bubo](https://github.com/hubobubo)**

**Оригінальна стаття розташована [тут](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Вступ
Для кращого моніторингу та підтримки вузлів Robonomics краще налаштувати моніторинг на основі сервера Prometheus та Grafana. Цей документ покаже, як налаштувати кожен з них для повного моніторингу вашого вузла.

##  Передумови
* [Налаштування сервера з Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [Встановлений коллатор парачейну Robonomics](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Переконайтеся, що robonomics.service працює на вашому пристрої та порт 9615 доступний

## Крок 1 — Створення облікових записів службовців

З метою безпеки ми почнемо з створення двох нових облікових записів користувачів, prometheus та node_exporter. Створіть цих двох користувачів та використовуйте параметри _--no-create-home_ та _--shell /bin/false_, щоб ці користувачі не могли увійти на сервер.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Перед тим як ми завантажимо бінарні файли Prometheus, створіть необхідні каталоги для зберігання файлів та даних Prometheus. Дотримуючись стандартних конвенцій Linux, ми створимо каталог у _/etc_ для конфігураційних файлів Prometheus та каталог у _/var/lib_ для його даних.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Тепер встановіть власника користувача та групи на нові каталоги для користувача prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Крок 2 — Завантаження Prometheus

Спочатку завантажте та розпакуйте поточну стабільну версію Prometheus у ваш домашній каталог. Ви можете знайти останні бінарні файли на [сторінці завантаження Prometheus.](https://prometheus.io/download/)

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Тепер розпакуйте завантажений архів.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Це створить каталог під назвою prometheus-2.21.0.linux-amd64, що містить два виконувані файли (prometheus та promtool), каталоги _consoles_ та _console_libraries_ з файлами веб-інтерфейсу, ліцензію, повідомлення та кілька прикладових файлів.

Скопіюйте два виконувані файли в каталог _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Встановіть власника та групу для виконуваних файлів на користувача prometheus, створеного на кроці 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Скопіюйте каталоги consoles та _console_libraries_ в _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Встановіть власника та групу для каталогів на користувача prometheus. Використання прапорця -R забезпечить встановлення власності для файлів всередині каталогу також.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Тепер, коли Prometheus встановлено, ми створимо його конфігураційні та службові файли для підготовки до першого запуску.

## Крок 3 — Налаштування Prometheus

У каталозі _/etc/prometheus_ використовуйте nano або ваш редактор тексту за замовчуванням, щоб створити файл конфігурації з ім'ям _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
У глобальних налаштуваннях визначте типовий інтервал для збору метрик. Зверніть увагу, що Prometheus застосує ці налаштування до кожного експортера, якщо власні налаштування окремого експортера не перевизначать глобальні.

```
global:
  scrape_interval: 15 с

```
Це значення scrape_interval вказує Prometheus збирати метрики від своїх експортерів кожні 15 секунд, що досить довго для більшості експортерів.
Тепер додайте сам Prometheus до списку експортерів для збору даних за допомогою наступної директиви scrape_configs:

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

На останок, Prometheus використовує директиви _static_configs_ та _targets_ для визначення місць роботи експортерів. Оскільки цей конкретний експортер працює на тому ж сервері, що й сам Prometheus, ми можемо використовувати localhost замість IP-адреси разом із типовим портом, 9090.

Ваш файл конфігурації повинен виглядати наступним чином:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Збережіть файл та вийдіть з текстового редактора.

Тепер встановіть власника та групу налаштувань файлу конфігурації на користувача prometheus, створеного на кроці 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
З конфігурацією завершено, ми готові випробувати Prometheus, запустивши його вперше.

## Крок 4 — Запуск Prometheus

Запустіть Prometheus як користувач _prometheus_, вказавши шлях до файлу конфігурації та каталогу даних.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

Вивід містить інформацію про прогрес завантаження Prometheus, файл конфігурації та пов'язані служби. Він також підтверджує, що Prometheus слухає порт _9090_.

```
_вивід журналу_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics prometheus[29488]: рівень=інформація ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="Не було встановлено часу або розміру зберігання, тому використовується типове зберігання за часом" тривалість=15д
14 вер 17:55:53 robonomics prometheus[29488]: рівень=інформація ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Запуск Prometheus" версія="(версія=2.21.0, гілка=HEAD, ревізія=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
14 вер 17:55:53 robonomics prometheus[29488]: рівень=інформація ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
14 вер 17:55:53 robonomics prometheus[29488]: рівень=інформація ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
14 вер 17:55:53 robonomics prometheus[29488]: рівень=інформація ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
14 вер 17:55:53 robonomics prometheus[29488]: рівень=інформація ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
14 вер 17:55:53 robonomics prometheus[29488]: рівень=інформація ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Запуск TSDB ..."
14 вер 17:55:53 robonomics prometheus[29488]: рівень=інформація ts=14 вер 2020 р. 17:55:53 robonomics prometheus[29488]: рівень=інф ts=2020-09-14T15:55:53.372Z викликач=head.go:644 компонент=tsdb повідомлення="Відтворення на диску пам'яті, які можна відобразити, якщо є"
14 вер 2020 р. 17:55:53 robonomics prometheus[29488]: рівень=інф ts=2020-09-14T15:55:53.373Z викликач=head.go:658 компонент=tsdb повідомлення="Відтворення на диску пам'яті, які можна відобразити, завершено" тривалість=12.659µs
14 вер 2020 р. 17:55:53 robonomics prometheus[29488]: рівень=інф ts=2020-09-14T15:55:53.373Z викликач=head.go:664 компонент=tsdb повідомлення="Відтворення WAL, це може зайняти деякий час"
14 вер 2020 р. 17:55:53 robonomics prometheus[29488]: рівень=інф ts=2020-09-14T15:55:53.380Z викликач=head.go:716 компонент=tsdb повідомлення="Сегмент WAL завантажено" сегмент=0 maxSegment=1
14 вер 2020 р. 17:55:53 robonomics prometheus[29488]: рівень=інф ts=2020-09-14T15:55:53.381Z викликач=head.go:716 компонент=tsdb повідомлення="Сегмент WAL завантажено" сегмент=1 maxSegment=1
14 вер 2020 р. 17:55:53 robonomics prometheus[29488]: рівень=інф ts=2020-09-14T15:55:53.381Z викликач=head.go:719 компонент=tsdb повідомлення="Відтворення WAL завершено" тривалість_відтворення_контрольної_точки=48.125µs тривалість_відтворення_wal=8.253748мс загальна_тривалість_відтворення=8.343335мс
14 вер 2020 р. 17:55:53 robonomics prometheus[29488]: рівень=інф ts=2020-09-14T15:55:53.383Z викликач=main.go:721 тип_fs=EXT4_SUPER_MAGIC53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB розпочато"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Завантаження файлу конфігурації" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Завершено завантаження файлу конфігурації" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Сервер готовий приймати веб-запити."

Якщо ви отримали повідомлення про помилку, перевірте, чи ви використали синтаксис YAML у файлі конфігурації, а потім дотримуйтесь інструкцій на екрані для вирішення проблеми.

Тепер зупиніть Prometheus, натиснувши _CTRL+C_, а потім відкрийте новий файл служби _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
Файл служби повідомляє _systemd_ запускати Prometheus як користувача prometheus, з файлом конфігурації, розташованим у каталозі _/etc/prometheus/prometheus.yml_, та зберігати дані у каталозі _/var/lib/prometheus_. Скопіюйте наступний вміст у файл:

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

[Встановлення]
Потрібно=multi-user.target
```

Нарешті, збережіть файл та закрийте текстовий редактор. Щоб використовувати новостворену службу, перезавантажте systemd.

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

Якщо статус служби не є активним, слідкуйте за інструкціями на екрані та повторіть попередні кроки, щоб вирішити проблему перед продовженням навчального посібника.

```
* prometheus.service - Prometheus
   Завантажено: завантажено (/etc/systemd/system/prometheus.service; увімкнено; вендорський налаштований: увімкнено)
   Активний: активний (запущено) з Mon 2020-09-14 17:59:48 CEST; 24 години тому
 Основний PID: 29650 (prometheus)
    Завдання: 9 (обмеження: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Коли ви будете готові продовжити, натисніть _Q_ для виходу з команди статусу. Нарешті, увімкніть службу для автоматичного запуску при завантаженні.

```
sudo systemctl enable prometheus

```

Тепер, коли Prometheus працює, ми можемо встановити додатковий експортер для генерації метрик про ресурси нашого сервера.

## Крок 5 — Завантаження експортера Node

Щоб розширити Prometheus поза метрики лише про себе, ми встановимо додатковий експортер під назвою Node Exporter. Node Exporter надає докладну інформацію про систему, включаючи використання CPU, диска та пам'яті. Завантажте поточну стабільну версію Node Exporter у ваш домашній каталог. Ви можете знайти останні бінарні файли на [сторінці завантаження Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Тепер розпакуйте завантажений архів.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Це створить каталог з назвою _node_exporter-1.0.1.linux-amd64_, що містить виконуваний файл з назвою _node_exporter_, ліцензію та повідомлення.

Скопіюйте виконуваний файл в каталог _/usr/local/bin_ та встановіть власника та групу користувачів на користувача node_exporter, якого ви створили на кроці 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Тепер, коли ви встановили Node Exporter, спробуйте його запустити перед створенням файлу служби, щоб він запускався при завантаженні.

## Крок 6 — Запуск Node Exporter

Кроки для запуску Node Exporter схожі з тими, що для запуску самого Prometheus. Почніть з створення файлу служби Systemd для Node Exporter.

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
Перевірте, що Node Exporter працює правильно за допомогою команди статусу.

```
sudo systemctl status node_exporter

```
Як і раніше, цей вивід показує статус Node Exporter, ідентифікатор основного процесу (PID), використання пам'яті та інше. Якщо статус служби не активний, слідкуйте за повідомленнями на екрані та повторіть попередні кроки для вирішення проблеми перед продовженням.

```
_Вивід_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)Завдання: 7 (обмеження: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

Нарешті, увімкніть Node Exporter для автоматичного запуску при завантаженні.

sudo systemctl enable node_exporter

Після повної настройки Node Exporter та успішного запуску ми скажемо Prometheus почати збирати нові метрики.

## Крок 7 — Налаштування Prometheus для збору даних від Node Exporter

Оскільки Prometheus збирає лише експортери, які визначені в частині конфігураційного файлу scrape_configs, нам потрібно додати запис для Node Exporter, так само, як ми це зробили для самого Prometheus. Відкрийте конфігураційний файл.

sudo nano /etc/prometheus/prometheus.yml

В кінці блоку scrape_configs додайте новий запис під назвою node_exporter.

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

Оскільки цей експортер також працює на тому ж сервері, що й сам Prometheus, ми можемо використовувати localhost замість IP-адреси разом із типовим портом Node Exporter, 9100. Ваш весь конфігураційний файл повинен виглядати так:

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

Збережіть файл та вийдіть з текстового редактора, коли будете готові продовжити. Нарешті, перезапустіть Prometheus, щоб внести зміни в дію.

sudo systemctl restart prometheus

Ще раз перевірте, що все працює правильно за допомогою команди статусу.

sudo systemctl status prometheus

Якщо статус служби не встановлено як активний, слідкуйте за інструкціями на екрані та перевірте ваші попередні кроки перед продовженням.

Вивід
* prometheus.service - Prometheus
   Завантажено: завантажено (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Активний: активний (запущено) з вівторок 2020-09-15 19:06:56 CEST; 2 секунди тому
 Основний PID: 19725 (prometheus)
    Завдання: 8 (обмеження: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Тепер у нас встановлено, налаштовано та працює Prometheus та Node Exporter.

## Крок 8 - Додавання вбудованого вузла експортера Robonomic

Після успішного встановлення Prometheus та node_exporter нам потрібно використовувати вбудований експортер Prometheus в кожному проекті підстроки. Щоб це стало можливим, нам потрібно додати додатковий запис до _/etc/prometheus/prometheus.yml_.
Відкрийте файл конфігурації.

```
sudo nano /etc/prometheus/prometheus.yml

```
В кінці блоку scrape_configs додайте новий запис під назвою robonomic_exporter.

```
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Збережіть файл і вийдіть з текстового редактора. Ваш весь файл конфігурації повинен виглядати так:

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

Наостанок, перезапустіть Prometheus, щоб внести зміни в дію.

```
sudo systemctl restart prometheus

```
Ще раз перевірте, що все працює правильно за допомогою команди статусу.

```
sudo systemctl status prometheus

```
Тепер у нас встановлено, налаштовано та працює _Prometheus_, _Node Exporter_, а також _Robonomic Exporter_. Тепер перейдіть до Grafana

## Крок 9 - Налаштування Grafana

Останнім кроком є підключення Prometheus як джерела даних у Grafana. Для цієї цілі ми використаємо безкоштовний хмарний сервіс Grafana, який дозволяє мати до 5 інформаційних панелей, а також присвячений [панель Robonomics](https://grafana.com/grafana/dashboards/13015). Просто перейдіть на [grafana.com](https://grafana.com/) створіть новий обліковий запис та увійдіть в свій новостворений екземпляр grafana.

На початку ми повинні додати до Grafana новий _**Джерело даних**_, яке в нашому випадку буде сервером Prometheus.
Перейдіть до Джерела даних:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"Джерело даних"} %}{% endroboWikiPicture %}

Потім клацніть **_Додати джерело даних_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"Джерело даних"} %}{% endroboWikiPicture %}

Далі виберіть _**Prometheus**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"Джерело даних"} %}{% endroboWikiPicture %}

На новому екрані введіть **_IP-адресу вашого сервера Prometheus з портом 9090_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"Джерело даних"} %}{% endroboWikiPicture %}

Після цього _**Зберегти та перевірити**_, якщо ви виконали всі кроки, ви повинні побачити зелене підтвердження готовності до імпортування панелі приладів. На головній сторінці клацніть на **+** а потім **Імпорт**, як показано на зображенні нижче:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Імпорт панелі приладів"} %}{% endroboWikiPicture %}

Потім ви повинні побачити сторінку Імпорту:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Сторінка імпорту"} %}{% endroboWikiPicture %}

У полі _URL або ідентифікатор панелі приладів Grafana.com_ напишіть _**13015**_ (оскільки це ідентифікатор панелі приладів Robonomic):

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

Після завантаження зовнішньої панелі керування ви побачите цей екран:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"Імпорт панелі керування XRT 13015"} %}{% endroboWikiPicture %}

Останнім кроком є вибір раніше створеного **_Джерела даних_** та натискання _**Імпорту**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"Prometheus як джерело даних"} %}{% endroboWikiPicture %}

ОТО І ВСЕ! На цьому етапі ви повинні побачити імпортовану панель керування.


## Посилання

* [Як встановити Prometheus на Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Побудова моніторингової панелі керування за допомогою Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Підтримка Grafana для Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Моніторинг метрик хоста Linux за допомогою експортера вузла](https://prometheus.io/docs/guides/node-exporter/)
* [Запити до Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Візуалізація метрик вузла](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Експортер Prometheus для Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [Панель керування Polkadot](https://github.com/w3f/polkadot-dashboard)
* [Метрика вузла Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Експортер вузла для панелі керування Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Метрика Grafana ROBONOMICS (XRT)](https://grafana.com/grafana/dashboards/13015)