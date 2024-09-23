---
title: Robonomics + Prometheus + Grafana

contributors: [Vourhey]
---

**تم توفير التعليمات التالية بواسطة [هوبو بوبو](https://github.com/hubobubo)**

**المقال الأصلي موجود [هنا](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## مقدمة
لمراقبة وصيانة أفضل لعقد Robonomics، من الجيد إعداد نظام مراقبة يعتمد على خادم Prometheus و Grafana. ستوضح هذه الوثيقة كيفية تكوين كل منهما لمراقبة عقدك بشكل كامل.

##  المتطلبات الأولية
* [إعداد الخادم باستخدام Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
* [تثبيت جمعية Robonomics parachain](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* تأكد من أن لديك robonomics.service يعمل على جهازك وأن المنفذ 9615 قابل للوصول

## الخطوة 1 — إنشاء حسابات مستخدمي الخدمة

لأغراض الأمان، سنبدأ بإنشاء حسابي مستخدم جديدين، prometheus و node_exporter. قم بإنشاء هذين المستخدمين، واستخدم الخيارات _--no-create-home_ و _--shell /bin/false_ حتى لا يتمكن هؤلاء المستخدمين من تسجيل الدخول إلى الخادم.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

قبل تنزيل برامج Prometheus، قم بإنشاء الدلائل اللازمة لتخزين ملفات Prometheus وبياناته. وفقًا لتقاليد Linux القياسية، سنقوم بإنشاء دليل في _/etc_ لملفات تكوين Prometheus ودليل في _/var/lib_ لبياناته.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
الآن، قم بتعيين ملكية المستخدم والمجموعة على الدلائل الجديدة للمستخدم prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## الخطوة 2 — تنزيل Prometheus

أولاً، قم بتنزيل وفك ضغط الإصدار الثابت الحالي من Prometheus إلى دليل الصفحة الرئيسية الخاص بك. يمكنك العثور على أحدث البرامج الثنائية على [صفحة تنزيل Prometheus.](https://prometheus.io/download/)

```wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
الآن، قم بفك الأرشيف الذي تم تنزيله.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
سيتم إنشاء دليل يسمى prometheus-2.21.0.linux-amd64 يحتوي على ملفين ثنائيين (prometheus و promtool)، ودليلين (_consoles_ و _console_libraries_) يحتويان على ملفات واجهة الويب، ورخصة، وإشعار، وعدة ملفات مثالية.

انسخ الملفين الثنائيين إلى الدليل _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
قم بتعيين مالكية المستخدم والمجموعة على الملفين الثنائيين لمستخدم prometheus الذي تم إنشاؤه في الخطوة 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
انسخ دليلي _consoles_ و _console_libraries_ إلى _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
قم بتعيين مالكية المستخدم والمجموعة على الدلائل لمستخدم prometheus. باستخدام العلم -R سيضمن أن يتم تعيين المالكية على الملفات داخل الدليل أيضًا.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
الآن بعد تثبيت Prometheus، سنقوم بإنشاء ملفات تكوينه وخدمته استعدادًا لتشغيله لأول مرة.

## الخطوة 3 — تكوين Prometheus

في الدليل _/etc/prometheus_، استخدم nano أو محرر النص المفضل لديك لإنشاء ملف تكوين يسمى _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
في الإعدادات العامة، قم بتحديد الفاصل الزمني الافتراضي لجمع المقاييس. لاحظ أن Prometheus سيطبق هذه الإعدادات على كل مصدّر بيانات ما لم تكون إعدادات المصدّر الفردية تغيّر الإعدادات العامة.

```
global:
  scrape_interval: 15s

```
قيمة scrape_interval هذه تخبر بروميثيوس بجمع البيانات من مصدريها كل 15 ثانية، وهو وقت كافٍ بما فيه الكفاية لمعظم مصدري البيانات.
الآن، أضف بروميثيوس نفسه إلى قائمة مصدري البيانات للجمع منهم باستخدام التوجيه التالي scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
بروميثيوس يستخدم _job_name_ لوسم المصدرين في الاستعلامات والرسوم البيانية، لذا تأكد من اختيار شيء وصفي هنا.

ونظرًا لأن بروميثيوس يصدر بيانات مهمة عن نفسه يمكنك استخدامها لرصد الأداء وتصحيح الأخطاء، لقد قمنا بتجاوز التوجيه العام للجمع بين البيانات من 15 ثانية إلى 5 ثوانٍ لتحديثات أكثر تكرارًا.

وأخيرًا، يستخدم بروميثيوس التوجيهات _static_configs_ و _targets_ لتحديد مواقع تشغيل المصدرين. نظرًا لأن هذا المصدر معين يعمل على نفس الخادم الذي يعمل عليه بروميثيوس نفسه، يمكننا استخدام localhost بدلاً من عنوان IP مع المنفذ الافتراضي 9090.

يجب أن يبدو ملف التكوين الخاص بك الآن على النحو التالي:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
احفظ الملف واخرج من محرر النصوص الخاص بك.

الآن، قم بتعيين مالكية المستخدم والمجموعة على ملف التكوين لمستخدم بروميثيوس الذي تم إنشاؤه في الخطوة 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
مع الانتهاء من التكوين، نحن جاهزون لاختبار بروميثيوس من خلال تشغيله للمرة الأولى.

## الخطوة 4 — تشغيل بروميثيوس

قم بتشغيل بروميثيوس كمستخدم _prometheus_، مقدمًا المسار إلى كل من ملف التكوين ودليل البيانات.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

يحتوي الإخراج على معلومات حول تقدم تحميل بروميثيوس، ملف التكوين، والخدمات ذات الصلة. كما يؤكد أن بروميثيوس يستمع على المنفذ _9090_.

```
_log output_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics بروميثيوس[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="لم يتم تعيين الاحتفاظ بالوقت أو الحجم لذا يتم استخدام الاحتفاظ الافتراضي بالوقت" المدة=15d
سبتمبر 14 17:55:53 robonomics بروميثيوس[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="بدء بروميثيوس" الإصدار="(الإصدار=2.21.0، الفرع=HEAD، التنقيح=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
سبتمبر 14 17:55:53 robonomics بروميثيوس[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2، user=root@a4d9bea8479e، date=20200911-11:35:02)"
سبتمبر 14 17:55:53 robonomics بروميثيوس[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
سبتمبر 14 17:55:53 robonomics بروميثيوس[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024، hard=4096)"
سبتمبر 14 17:55:53 robonomics بروميثيوس[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited، hard=unlimited)"
سبتمبر 14 17:55:53 robonomics بروميثيوس[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="بدء TSDB ..."
سبتمبر 14 17:55:53 robonomics بروميثيوس[29488]: المستوى=معلومات ts=14 17:55:53 robonomics prometheus[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="إعادة تشغيل شرائح الذاكرة على القرص إذا كانت موجودة"
14 17:55:53 robonomics prometheus[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="اكتمال إعادة تشغيل شرائح الذاكرة على القرص" duration=12.659µs
14 17:55:53 robonomics prometheus[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="إعادة تشغيل WAL، قد يستغرق بعض الوقت"
14 17:55:53 robonomics prometheus[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="تم تحميل قطعة WAL" segment=0 maxSegment=1
14 17:55:53 robonomics prometheus[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="تم تحميل قطعة WAL" segment=1 maxSegment=1
14 17:55:53 robonomics prometheus[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="اكتمال إعادة تشغيل WAL" checkpoint_replay_duration=48.125µs wal_replay_duration=8.253748ms total_replay_duration=8.343335ms
14 17:55:53 robonomics prometheus[29488]: المستوى=معلومات ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC
14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB started"
سبتمبر 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
سبتمبر 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
سبتمبر 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server is ready to receive web requests."

إذا حصلت على رسالة خطأ، تحقق مرتين من استخدامك لصيغة YAML في ملف التكوين الخاص بك، ثم اتبع التعليمات التي تظهر على الشاشة لحل المشكلة.

الآن، قم بإيقاف تشغيل Prometheus عن طريق الضغط على _CTRL+C_, ثم افتح ملف خدمة _systemd_ جديد.

```
sudo nano /etc/systemd/system/prometheus.service

```
يخبر ملف الخدمة _systemd_ بتشغيل Prometheus كمستخدم prometheus، مع ملف التكوين الموجود في الدليل _/etc/prometheus/prometheus.yml_ وتخزين بياناته في الدليل _/var/lib/prometheus_. قم بنسخ المحتوى التالي إلى الملف:

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

أخيرًا، احفظ الملف وأغلق محرر النصوص الخاص بك. لاستخدام الخدمة التي تم إنشاؤها حديثًا، أعد تحميل systemd.

```
sudo systemctl daemon-reload

```

يمكنك الآن تشغيل Prometheus باستخدام الأمر التالي:

```
sudo systemctl start prometheus

```

للتأكد من تشغيل Prometheus، قم بفحص حالة الخدمة.

```
sudo systemctl status prometheus

```

يخبرك الإخراج عن حالة Prometheus، ومعرف العملية الرئيسية (PID)، استخدام الذاكرة، والمزيد.

إذا كانت حالة الخدمة غير نشطة، اتبع التعليمات التي تظهر على الشاشة وأعد تتبع الخطوات السابقة لحل المشكلة قبل متابعة البرنامج التعليمي.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

عندما تكون جاهزًا للمتابعة، اضغط على _Q_ لإنهاء الأمر. أخيرًا، قم بتمكين الخدمة للبدء عند تشغيل النظام.

```
sudo systemctl enable prometheus

```

الآن بعد أن تم تشغيل Prometheus، يمكننا تثبيت مصدّر إضافي لإنشاء مقاييس حول موارد الخادم الخاص بنا.

## الخطوة 5 — تنزيل Node Exporter

لتوسيع Prometheus بما يتجاوز المقاييس حول نفسه فقط، سنقوم بتثبيت مصدّر إضافي يُسمى Node Exporter. يوفر Node Exporter معلومات مفصلة حول النظام، بما في ذلك استخدام وحدة المعالجة المركزية، والقرص، واستخدام الذاكرة. قم بتنزيل الإصدار الثابت الحالي من Node Exporter إلى دليل المستخدم الخاص بك. يمكنك العثور على أحدث الثنائيات على [صفحة تنزيل Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
الآن، قم بفك الأرشيف الذي تم تنزيله.

```
tar xvf node_exporter-1.0.1
```.linux-amd64.tar.gz

```
سينشئ هذا دليلاً يسمى _node_exporter-1.0.1.linux-amd64_ يحتوي على ملف ثنائي يسمى _node_exporter_، وترخيص، وإشعار.

انسخ الملف الثنائي إلى الدليل _/usr/local/bin_ وقم بتعيين ملكية المستخدم والمجموعة للمستخدم node_exporter الذي قمت بإنشائه في الخطوة 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
الآن بعد تثبيت Node Exporter، دعنا نقوم بتجربته عن طريق تشغيله قبل إنشاء ملف خدمة له حتى يبدأ عند التمهيد.

## الخطوة 6 — تشغيل Node Exporter

خطوات تشغيل Node Exporter مشابهة لتلك المتبعة لتشغيل Prometheus نفسه. ابدأ بإنشاء ملف خدمة Systemd لـ Node Exporter.

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

احفظ الملف وأغلق محرر النص الخاص بك. أعد تحميل systemd أخيرًا لاستخدام الخدمة التي تم إنشاؤها حديثًا.

```
sudo systemctl daemon-reload

```
يمكنك الآن تشغيل Node Exporter باستخدام الأمر التالي:

```
sudo systemctl start node_exporter

```
تحقق من أن Node Exporter يعمل بشكل صحيح باستخدام أمر الحالة.

```
sudo systemctl status node_exporter

```
مثلما كان الحال من قبل، يخبرك هذا الإخراج بحالة Node Exporter، ومعرف العملية الرئيسية (PID)، واستخدام الذاكرة، والمزيد. إذا لم تكن حالة الخدمة نشطة، فاتبع الرسائل التي تظهر على الشاشة وأعد تتبع الخطوات السابقة لحل المشكلة قبل المتابعة.

```
_الإخراج_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)المهام: 7 (الحد: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd

أخيرًا، قم بتمكين Node Exporter للبدء عند تشغيل النظام.

sudo systemctl enable node_exporter

بعد تكوين Node Exporter بالكامل وتشغيله كما هو متوقع، سنخبر Prometheus ببدء جمع البيانات الجديدة.

## الخطوة 7 — تكوين Prometheus لجمع بيانات Node Exporter

نظرًا لأن Prometheus يقوم بجمع البيانات فقط من المصدرين المحددين في جزء scrape_configs من ملف تكوينه، سنحتاج إلى إضافة إدخال لـ Node Exporter، تمامًا كما فعلنا لـ Prometheus نفسه. افتح ملف التكوين.

sudo nano /etc/prometheus/prometheus.yml

في نهاية كتلة scrape_configs، أضف إدخالًا جديدًا يسمى node_exporter.

...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']

نظرًا لأن هذا المصدر يعمل أيضًا على نفس الخادم الذي يعمل عليه Prometheus نفسه، يمكننا استخدام localhost بدلاً من عنوان IP مرة أخرى مع منفذ Node Exporter الافتراضي، 9100. يجب أن يبدو ملف التكوين الخاص بك كالتالي:

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

احفظ الملف واخرج من محرر النص عندما تكون جاهزًا للمتابعة. أعد تشغيل Prometheus أخيرًا لتطبيق التغييرات.

sudo systemctl restart prometheus

تحقق مرة أخرى من أن كل شيء يعمل بشكل صحيح باستخدام أمر الحالة.

sudo systemctl status prometheus

إذا لم يتم تعيين حالة الخدمة إلى نشطة، اتبع التعليمات التي تظهر على الشاشة وأعد تتبع الخطوات السابقة قبل المتابعة.

الناتج
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    المهام: 8 (الحد: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

لدينا الآن Prometheus و Node Exporter مثبتة ومكونة وتعمل.

## الخطوة 8 - إضافة Robonomic المدمج في node_exporter

بعد تثبيت Prometheus و node_exporter بنجاح، سيتعين علينا استخدام prometheus exporter المدمج في كل مشروع substrate. لتحقيق ذلك، علينا إضافة إدخال إضافي إلى _/etc/prometheus/prometheus.yml_.
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
احفظ الملف واخرج من محرر النصوص الخاص بك. يجب أن يبدو ملف التكوين الخاص بك كالتالي:

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

أعد تشغيل Prometheus أخيرًا لتطبيق التغييرات.

```
sudo systemctl restart prometheus

```
تحقق مرة أخرى من أن كل شيء يعمل بشكل صحيح باستخدام الأمر status.

```
sudo systemctl status prometheus

```
لدينا الآن _Prometheus_ و _Node Exporter_ بالإضافة إلى _Robonomic Exporter_ مثبتة ومكونة وتعمل. الآن توجه إلى Grafana

## الخطوة 9 - إعداد Grafana

آخر خطوة هي ربط Prometheus كمصدر بيانات في Grafana. لأغراض هذا البرنامج التعليمي، سنستخدم Grafana المجانية المستندة إلى السحابة التي تسمح بوجود ما يصل إلى 5 لوحات تحكم بالإضافة إلى [لوحة تحكم Robonomics المخصصة](https://grafana.com/grafana/dashboards/13015). ما عليك سوى الانتقال إلى [grafana.com](https://grafana.com/) وإنشاء حساب جديد وتسجيل الدخول إلى نسخة Grafana الجديدة التي أنشأتها.

في البداية يجب علينا إضافة مصدر بيانات جديد إلى Grafana والذي في حالتنا سيكون خادم Prometheus.
انتقل إلى مصدر البيانات:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

ثم انقر على **_إضافة مصدر بيانات_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

ثم حدد _**Prometheus**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

في الشاشة الجديدة، ضع عنوان IP الخاص بخادم **_Prometheus مع منفذ 9090_**

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png", alt:"DataSource"} %}{% endroboWikiPicture %}

بعد ذلك، انقر على _**حفظ واختبار**_ إذا قمت باتباع جميع الخطوات يجب أن تكون النتيجة خضراء وجاهزة للاستيراد لوحة التحكم. على الموقع الرئيسي، انقر على **+** ثم **استيراد** كما هو موضح في الصورة أدناه:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png", alt:"Import dashboard"} %}{% endroboWikiPicture %}

ثم يجب أن ترى صفحة الاستيراد:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png", alt:"Import page"} %}{% endroboWikiPicture %}

في _عنوان url أو id لوحة البيانات على Grafana.com_ اكتب _**13015**_ (لأن هذا هو معرف لوحة Robonomic):

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png", alt:"Import Robonomic dashboard"} %}{% endroboWikiPicture %}

بعد تحميل اللوحة التحكم الخارجية، ستحصل على هذه الشاشة:

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png", alt:"استيراد لوحة تحكم XRT 13015"} %}{% endroboWikiPicture %}

الخطوة الأخيرة هي اختيار **_مصدر البيانات_** الذي تم إنشاؤه مسبقًا والنقر على _**استيراد**_

{% roboWikiPicture {src:"docs/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png", alt:"Prometheus كمصدر بيانات"} %}{% endroboWikiPicture %}

هذا كل شيء! في هذه النقطة، يجب أن ترى اللوحة التحكم التي تم استيرادها.


## المراجع

* [كيفية تثبيت Prometheus على Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [بناء لوحة تحكم للمراقبة بواسطة Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [دعم Grafana لـ Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [مراقبة مقاييس مضيف Linux باستخدام node exporter](https://prometheus.io/docs/guides/node-exporter/)
* [استعلام Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [تصوير مقاييس العقدة](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [مصدر بيانات Prometheus Exporter لـ Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [لوحة تحكم Polkadot](https://github.com/w3f/polkadot-dashboard)
* [مقاييس عقدة Polkadot](https://grafana.com/grafana/dashboards/12425)
* [لوحة تحكم Node Exporter for Prometheus](https://grafana.com/grafana/dashboards/11074)
* [مقاييس Grafana ROBONOMICS (XRT)](https://grafana.com/grafana/dashboards/13015)