---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**تم توفير التعليمات التالية بواسطة [Hubo Bubo](https://github.com/hubobubo)**

**المقال الأصلي موجود [هنا](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## مقدمة
لمراقبة وصيانة أفضل للعقد الوبونوميكس ، من الجيد إعداد مراقبة استنادًا إلى خادم بروميثيوس وجرافانا. ستوضح هذه الوثيقة كيفية تكوين كل منهما لمراقبة العقد الخاص بك بشكل كامل.

##  الشروط المسبقة
* [إعداد الخادم باستخدام Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [تم تثبيت مجمع Robonomics parachain](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* تأكد من أن robonomics.service يعمل على جهازك ويمكن الوصول إلى المنفذ 9615 

## الخطوة 1 - إنشاء حسابات المستخدمين

لأغراض الأمان ، سنبدأ بإنشاء حسابين جديدين للمستخدمين ، prometheus و node_exporter. قم بإنشاء هاتين الحسابين ، واستخدم الخيارات _--no-create-home_ و _--shell /bin/false_ حتى لا يتمكن هؤلاء المستخدمين من تسجيل الدخول إلى الخادم.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

قبل تنزيل برامج Prometheus ، قم بإنشاء الدلائل اللازمة لتخزين ملفات وبيانات Prometheus. وفقًا لتقاليد Linux القياسية ، سنقوم بإنشاء دليل في _/etc_ لملفات تكوين Prometheus ودليل في _/var/lib_ لبياناته.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
الآن ، قم بتعيين مالكية المستخدم والمجموعة على الدلائل الجديدة للمستخدم prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## الخطوة 2 - تنزيل برنامج Prometheus

أولاً ، قم بتنزيل وفك حزمة الإصدار الثابت الحالي من Prometheus في دليل المستخدم الخاص بك. يمكنك العثور على أحدث البرامج الثنائية على [صفحة تنزيل Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
الآن ، قم بفك الأرشيف المحمل.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
سيتم إنشاء دليل يسمى prometheus-2.21.0.linux-amd64 يحتوي على ملفين ثنائيين (prometheus و promtool) ، ودلائل _consoles_ و _console_libraries_ التي تحتوي على ملفات واجهة الويب ، وترخيصًا ، وإشعارًا ، وعدة ملفات مثالية.

انسخ الملفين الثنائيين إلى الدليل _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
قم بتعيين مالكية المستخدم والمجموعة على الملفين الثنائيين للمستخدم prometheus الذي تم إنشاؤه في الخطوة 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
انسخ الدلائل consoles و _console_libraries_ إلى _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
ق بتعيين مالكية المستخدم والمجموعة على الدلائل للمستخدم prometheus. باستخدام العلامة -R سيضمن أن يتم تعيين المالكية على الملفات داخل الدليل أيضًا.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
الآن بعد تثبيت Prometheus ، سنقوم بإنشاء ملفات التكوين والخدمة الخاصة به في استعداد لتشغيله للمرة الأولى.

## الخطوة 3 - تكوين Prometheus

في الدليل _/etc/prometheus_ ، استخدم nano أو محرر النص المفضل لديك لإنشاء ملف تكوين يسمى _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
في الإعدادات العامة ، قم بتعريف الفاصل الزمني الافتراضي لجمع المقاييس. يجب أن يعمل Prometheus بهذه الإعدادات على كل مصدر بيانات ما لم تكون إعدادات المصدر الفردي تلغي الإعدادات العامة.

```
global:
  scrape_interval: 15s

```
قيمة الفاصل الزمني للجمع هذه تخبر Prometheus بجمع المقاييس من المصدر بيانات كل 15 ثانية ، وهو وقت كافٍ لمعظم المصدرين.
الآن ، أضف Prometheus نفسه إلى قائمة المصدرين للجمع من خلال التوجيهة التالية لـ scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
يستخدم Prometheus _job_name_ لوصف المصدرين في الاستعلامات وعلى الرسوم البيانية ، لذا تأكد من اختيار شيء وصفي هنا.

وبما أن Prometheus يصدر بيانات مهمة عن نفسه يمكنك استخدامها لمراقبة الأداء وتصحيح الأخطاء ، فقد قمنا بتجاوز التوجيهة العامة للفاصل الزمني للجمع من 15 ثانية إلى 5 ثوانٍ للحصول على تحديثات أكثر تواترًا.

أخيرًا ، يستخدم Prometheus التوجيهات _static_configs_ و _targets_ لتحديد مواقع تشغيل المصدرين. نظرًا لأن هذا المصدر يعمل على نفس الخادم الذي يعمل عليه Prometheus نفسه ، يمكننا استخدام localhost بدلاً من عنوان IP مع المنفذ الافتراضي 9090.

يجب أن يبدو ملف التكوين الخاص بك الآن على هذا النحو:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
احفظ الملف وأغلق محرر النص الخاص بك.

الآن ، قم بتعيين مالكية المستخدم والمجموعة على ملف التكوين للمستخدم prometheus الذي تم إنشاؤه في الخطوة 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
مع الانتهاء من التكوين ، نحن جاهزون لاختبار Prometheus عن طريق تشغيله للمرة الأولى.

## الخطوة 4 - تشغيل Prometheus

قم بتشغيل Prometheus كمستخدم _prometheus_ ، وقدم المسار إلى كل من ملف التكوين ودليل البيانات.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

يحتوي الإخراج على معلومات حول تقدم تحميل Prometheus وملف التكوين والخدمات ذات الصلة. كما يؤكد أن Prometheus يستمع على المنفذ _9090_.

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
إذا حصلت على رسالة خطأ، تحقق مرتين من استخدامك لصيغة YAML في ملف التكوين الخاص بك ثم اتبع التعليمات المعروضة على الشاشة لحل المشكلة.

الآن، أوقف Prometheus عن طريق الضغط على _CTRL+C_، ثم افتح ملف خدمة _systemd_ جديد.

```
sudo nano /etc/systemd/system/prometheus.service

```
يخبر ملف الخدمة _systemd_ بتشغيل Prometheus كمستخدم prometheus، مع ملف التكوين الموجود في الدليل _/etc/prometheus/prometheus.yml_ وتخزين البيانات في الدليل _/var/lib/prometheus_. قم بنسخ المحتوى التالي إلى الملف:

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

أخيرًا، احفظ الملف وأغلق محرر النص الخاص بك. لاستخدام الخدمة الجديدة التي تم إنشاؤها، قم بإعادة تحميل systemd.

```
sudo systemctl daemon-reload

```
يمكنك الآن تشغيل Prometheus باستخدام الأمر التالي:

```
sudo systemctl start prometheus

```
للتأكد من تشغيل Prometheus، تحقق من حالة الخدمة.

```
sudo systemctl status prometheus

```
يخبرك الإخراج بحالة Prometheus ومعرف العملية الرئيسية (PID) واستخدام الذاكرة والمزيد.

إذا لم تكن حالة الخدمة نشطة، اتبع التعليمات المعروضة على الشاشة وأعد تتبع الخطوات السابقة لحل المشكلة قبل متابعة البرنامج التعليمي.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

عندما تكون جاهزًا للمتابعة، اضغط على _Q_ لإنهاء الأمر الحالي. أخيرًا، قم بتمكين الخدمة للبدء عند التمهيد.

```
sudo systemctl enable prometheus

```

الآن بعد أن تم تشغيل Prometheus ويعمل، يمكننا تثبيت مصدر بيانات إضافي لإنشاء مقاييس حول موارد الخادم الخاص بنا.

## الخطوة 5 - تنزيل Node Exporter

لتوسيع Prometheus ليشمل مقاييس حول نفسه فقط، سنقوم بتثبيت مصدر بيانات إضافي يسمى Node Exporter. يوفر Node Exporter معلومات مفصلة حول النظام، بما في ذلك استخدام وحدة المعالجة المركزية والقرص والذاكرة. قم بتنزيل الإصدار الثابت الحالي من Node Exporter إلى دليل المستخدم الخاص بك. يمكنك العثور على أحدث الثنائيات على [صفحة تنزيل Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
الآن قم بفك ضغط الأرشيف الذي تم تنزيله.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
سيتم إنشاء دليل يسمى _node_exporter-1.0.1.linux-amd64_ يحتوي على ملف ثنائي يسمى _node_exporter_، وترخيص، وإشعار.

انسخ الملف الثنائي إلى الدليل _/usr/local/bin_ وقم بتعيين مالكية المستخدم والمجموعة للمستخدم node_exporter الذي قمت بإنشائه في الخطوة 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
الآن بعد تثبيت Node Exporter، دعنا نقم بتجربته عن طريق تشغيله قبل إنشاء ملف خدمة له حتى يبدأ عند التمهيد.

## الخطوة 6 - تشغيل Node Exporter

إجراءات تشغيل Node Exporter مشابهة لتلك المتبعة لتشغيل Prometheus نفسه. ابدأ بإنشاء ملف خدمة Systemd لـ Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
انسخ المحتوى التالي إلى ملف الخدمة:

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

احفظ الملف وأغلق محرر النص الخاص بك. أخيرًا، قم بإعادة تحميل systemd لاستخدام الخدمة الجديدة التي تم إنشاؤها.

```
sudo systemctl daemon-reload

```
يمكنك الآن تشغيل Node Exporter باستخدام الأمر التالي:

```
sudo systemctl start node_exporter

```
تحقق من تشغيل Node Exporter بشكل صحيح باستخدام الأمر status.

```
sudo systemctl status node_exporter

```
مثلما كان الحال من قبل، يخبرك هذا الإخراج بحالة Node Exporter ومعرف العملية الرئيسية (PID) واستخدام الذاكرة والمزيد. إذا لم تكن حالة الخدمة نشطة، اتبع التعليمات المعروضة على الشاشة وأعد تتبع الخطوات السابقة لحل المشكلة قبل المتابعة.

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
أخيرًا، قم بتمكين Node Exporter للبدء عند التمهيد.

```
sudo systemctl enable node_exporter

```
بعد تكوين Node Exporter بالكامل وتشغيله كما هو متوقع، سنخبر Prometheus ببدء جمع المقاييس الجديدة.

## الخطوة 7 - تكوين Prometheus لجمع مقاييس Node Exporter

نظرًا لأن Prometheus يجمع فقط المصدرين التي تم تعريفها في جزء scrape_configs من ملف التكوين الخاص به، سنحتاج إلى إضافة إدخال جديد لـ Node Exporter، تمامًا كما فعلنا لـ Prometheus نفسه. افتح ملف التكوين.

```
sudo nano /etc/prometheus/prometheus.yml

```
في نهاية كتلة scrape_configs، أضف إدخالًا جديدًا يسمى node_exporter.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
نظرًا لأن هذا المصدر يعمل أيضًا على نفس الخادم الذي يعمل عليه Prometheus نفسه، يمكننا استخدام localhost بدلاً من عنوان IP مرة أخرى مع منفذ Node Exporter الافتراضي، 9100. يجب أن يبدو ملف التكوين الخاص بك كالتالي:

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
احفظ الملف وأغلق محرر النص الخاص بك عندما تكون جاهزًا للمتابعة. أخيرًا، أعد تشغيل Prometheus لتطبيق التغييرات.

```
sudo systemctl restart prometheus

```
مرة أخرى، تحقق من أن كل شيء يعمل بشكل صحيح باستخدام الأمر status.

```
sudo systemctl status prometheus

```
إذا لم يتم تعيين حالة الخدمة على نشطة، اتبع التعليمات المعروضة على الشاشة وأعد تتبع الخطوات السابقة قبل المتابعة.

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

الآن لدينا Prometheus و Node Exporter مثبتان ومكونان ويعملان.

## الخطوة 8 - إضافة Robonomic build في node_exporter

بعد تثبيت Prometheus و node_exporter بنجاح، سيتعين علينا استخدام مصدر بيانات Prometheus المضمن في كل مشروع substrate. لتحقيق ذلك، يجب علينا إضافة إدخال إضافي إلى _/etc/prometheus/prometheus.yml_. 
افتح ملف التكوين.

```
sudo nano /etc/prometheus/prometheus.yml

```
في نهاية كتلة scrape_configs، أضف إدخالًا جديدًا يسمى robonomic_exporter.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
احفظ الملف وأغلق محرر النص. يجب أن يبدو ملف التكوين الخاص بك كما يلي:

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

أخيرًا ، قم بإعادة تشغيل بروميثيوس لتطبيق التغييرات.

```
sudo systemctl restart prometheus

```
مرة أخرى، تحقق من أن كل شيء يعمل بشكل صحيح باستخدام أمر الحالة.

```
sudo systemctl status prometheus

```
الآن لدينا بروميثيوس ومصدر العقدة ومصدر Robonomic مثبتة ومونة وجارية. الآن انتقل إلى Grafana

## الخطوة 9 - إعداد Grafana

آخر خطوة هي ربط بروميثيوس كمصدر بيانات في Grafana. لأغراض هذا البرنامج التعليمي ، سنستخدم Grafana المستندة إلى السحابة المجانية التي تسمح بوجود ما يصل إلى 5 لوحات تحكم بالإضافة إلى لوحة Robonomics المخصصة. انتقل ببساطة إلى grafana.com ، قم بإنشاء حساب جديد وقم بتسجيل الدخول إلى حالة Grafana الجديدة الخاصة بك.

في البداية ، يجب علينا إضافة مصدر بيانات جديد إلى Grafana والذي سيكون في حالتنا خادم Prometheus.
انتقل إلى مصدر البيانات:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

ثم انقر على إضافة مصدر بيانات

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

حدد بروميثيوس

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

في الشاشة الجديدة ، ضع عنوان IP الخاص بخادم Prometheus مع منفذ 9090

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

بعد ذلك ، احفظ واختبر إذا قمت بجميع الخطوات يجب أن تكون النتيجة خضراء وجاهزة للاستيراد. في الموقع الرئيسي ، انقر على + ثم استيراد كما هو موضح في الصورة أدناه:

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

ثم يجب أن ترى صفحة الاستيراد:

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

في عنوان URL أو معرف لوحة القيادة في Grafana.com ، اكتب 13015 (حيث يعد هذا هو معرف لوحة Robonomic)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

بعد تحميل لوحة القيادة الخارجية ، ستحصل على هذه الشاشة:

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

آخر خطوة هي اختيار مصدر البيانات الذي تم إنشاؤه مسبقًا والنقر فوق استيراد

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

هذا كل شيء! في هذه النقطة ، يجب أن ترى لوحة القيادة المستوردة. 


## المراجع

* [كيفية تثبيت بروميثيوس على أوبونتو 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [إنشاء لوحة مراقبة بواسطة بروميثيوس + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [دعم Grafana لـ Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [رصد مقاييس مضيف Linux باستخدام مصدر العقدة](https://prometheus.io/docs/guides/node-exporter/)
* [استعلام بروميثيوس](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [تصور مقاييس العقدة](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [مصدر بروميثيوس للعقدة](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [لوحة القيادة polkadot](https://github.com/w3f/polkadot-dashboard)
* [مقياس العقدة Polkadot](https://grafana.com/grafana/dashboards/12425)
* [لوحة القيادة Node Exporter لـ Prometheus](https://grafana.com/grafana/dashboards/11074)
* [مقاييس Grafana ROBONOMICS (XRT)](https://grafana.com/grafana/dashboards/13015)

