---
title: كيفية تحديث إصدار عقدة Robonomics Collator

contributors: [Leemo94]
---

يُوصى بقراءة المقالات التالية قبل قراءة هذا المنشور: ["كيفية بناء عقدة Collator"](/docs/how-to-build-collator-node) و ["كيفية تشغيل Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

يحتوي هذا المقال على الأوامر المطلوبة لتحديث عقدة Robonomics collator (التي تعمل على نظام Ubuntu)، ويقدم أيضًا مثالًا بعد ذلك.

## **الأوامر المطلوبة**

0. قبل البدء، يُوصى بتسجيل الدخول كـ `root`، إذا لم يكن الأمر كذلك، فأنصح بأن تستخدم:

```shell
sudo su -
```

1. قم بإيقاف خدمة Robonomics:

```shell
systemctl stop robonomics.service
```

2. قم بحذف الإصدار السابق من Robonomics (تأكد من أنك في المجلد الصحيح):

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

3. احصل على [أحدث إصدار](https://github.com/airalab/robonomics/releases) من Robonomics:

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

4. قم بفك الضغط عن الملف:

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

5. قم بنقل الملف:

```shell
mv robonomics /usr/local/bin/
```

{% roboWikiNote {type: "note"}%} يجب عليك نقل هذا الملف إلى المجلد الصحيح الذي قمت بتثبيت فيه عقدة Robonomics {% endroboWikiNote %}

6. قم بتشغيل Robonomics:

```shell
systemctl start robonomics.service
```

مثال لترقية عقدة الـ collator إلى Robonomics v1.8.4:

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service
```

## **تغيير قاعدة بيانات سلسلة Kusama Relay بدون تعيين مسار أساسي**

هناك أوقات تتسبب فيها بعض اللقطات من سلسلة Kusama Relay في حدوث أخطاء على عقدتك. يتسبب هذا في توقف عقدتك عن العمل في كثير من الأحيان. مثال على الخطأ الناتج عن قاعدة بيانات Relay Chain تالفة:

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

لحل هذا الخطأ، يجب عليك حذف قاعدة بيانات سلسلة Kusama Relay الحالية (على الأرجح RocksDb) واستبدالها بقاعدة بيانات أخرى مثل ParityDb. قم بتنفيذ الأوامر التالية:

1. ابحث عن مجلد عقدة Robonomics وتحقق من الملفات:

```shell
cd /home/robonomics/
ls -a
```

2. تأكد من رؤية مجلد polkadot، ثم انتقل إلى مجلد chains:

```shell
cd /polkadot/chains/
ls -a
```

3. احذف مجلد `ksmcc3`:

```shell
rm -r ksmcc3
```

4. قم بإنشاء مجلد `ksmcc3` جديد.

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

5. الآن عليك تنزيل لقطة جديدة. يستخدم هذا المثال لقطة مقصوصة بشكل كبير من سلسلة اللقطة، ولكن يمكنك استبدالها بأي لقطة تفضلها.

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

6. بينما يتم تنزيل اللقطة، افتح جلسة جديدة وقم بتحرير ملف الخدمة الخاص بك:

```shell
sudo nano /etc/systemd/system/robonomics.service
```

قم بتعديل الأسطر داخل ملف الخدمة التي تتعلق بقاعدة البيانات والتقليم:

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

استخدم `Ctrl + S` ثم `Ctrl + X` لحفظ والخروج من ملف الخدمة.

7. الآن عليك إعادة تحميل الديمون.

```shell
systemctl daemon-reload
```

8. في هذا الوقت، في الجلسة الأخرى، من المحتمل أن يكون قد تم تنزيل قاعدة البيانات الجديدة، لذا قم بفك الضغط عن الملف:

```shell
tar -xvzf ksm_pruned.tar.gz
```

9. بعد اكتمال فك الضغط، قم بتنفيذ الأمر التالي:

```shell
chown -R robonomics:robonomics paritydb
```

10. الآن يمكنك بدء الخدمة، ومراقبتها لأي أخطاء، والتحقق من أنها تتصل بكل من سلسلة اللقطة والباراشين:

```shell
systemctl start robonomics && journalctl -fu robonomics
```