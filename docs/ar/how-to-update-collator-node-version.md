---
title: كيفية تحديث إصدار نود روبونوميكس كولاتور

contributors: [Leemo94]
---

من المستحسن قراءة المقالات التالية قبل قراءة هذا المنشور: ["كيفية بناء نود كولاتور"](/docs/how-to-build-collator-node) و ["كيفية تشغيل روبونوميكس كولاور"](/docs/how-to-launch-the-robonomics-collator).

يحتوي هذا المقال على الأوامر المطلوبة لتحديث نود روبونوميكس كولاتور (العامل على نظام أوبونتو)، ويعطي أيضًا مثالًا بعد ذلك.

## **الأوامر المطلوبة**

0. قبل أن تبدأ، من المستحسن أن تكون مسجل الدخول كـ `root`، إذا لم يكن الأمر كذلك، فأوصيك بأن تستخدم:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. قم بإيقاف خدمة روبونوميكس:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. قم بإزالة الإصدار السابق من روبونوميكس (تأكد من أنك في المجلد الصحيح):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. احصل على [أحدث إصدار](https://github.com/airalab/robonomics/releases) من روبونوميكس:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. قم بفك الضغط عن الملف:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. قم بنقل الملف:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

يجب عليك نقل هذا الملف إلى المجلد الصحيح الذي قمت بتثبيت نود روبونوميكس فيه)

</robo-wiki-note>

6. قم بتشغيل روبونوميكس:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

مثال لترقية نود الكولاتور إلى روبونوميكس v1.8.4:

<code-helper>

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
</code-helper>

## **تغيير قاعدة بيانات سلسلة ريلي كوساما بدون تعيين مسار أساسي**

في بعض الأحيان، تتسبب بعض اللقطات الفورية لسلسلة ريلي كوساما في حدوث أخطاء في نودك. وهذا غالبًا ما يتسبب في توقف عمل النود. مثال على الخطأ الناجم عن قاعدة بيانات سلسلة ريلي معطوبة:

<code-helper>

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
</code-helper>

لحل هذا الخطأ، يجب عليك إزالة قاعدة بيانات سلسلة ريلي كوساما الحالية (على الأرجح RocksDb) واستبدالها بقاعدة بيانات أخرى مثل ParityDb. قم بتنفيذ الأوامر التالية:

1. ابحث عن مجلد نود روبونوميكس وتحقق من الملفات:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. تأكد من رؤية مجلد polkadot، ثم انتقل إلى مجلد chains:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. احذف الدليل "ksmcc3":

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. قم بإنشاء مجلد جديد بالاسم `ksmcc3`.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. الآن تحتاج إلى تنزيل لقطة فورية جديدة. يستخدم هذا المثال لقطة فورية لسلسلة ريلي مقطوعة بشكل كبير، ولكن يمكنك استبدالها بأي لقطة فورية تفضلها.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. أثناء تنزيل اللقطة الفورية، افتح جلسة جديدة وقم بتحرير ملف الخدمة الخاص بك:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

قم بتعديل الأسطر داخل ملف الخدمة التي تتعلق بقاعدة البيانات والتقليم:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
استخدم `Ctrl + S` ثم `Ctrl + X` لحفظ والخروج من ملف الخدمة.

7. الآن تحتاج إلى إعادة تحميل الخدمة الخاصة بك.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. في هذا الوقت، في الجلسة الأخرى، نأمل أن يكون قد تم تنزيل قاعدة البيانات الجديدة، لذا قم بفك الضغط عن الملف:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. بعد اكتمال عملية فك الضغط، قم بتنفيذ الأمر التالي:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. الآن يمكنك بدء الخدمة، ومراقبتها للتحقق من عدم وجود أخطاء، والتحقق من أنها تتصل بكل من سلسلة ريلي وباراتشين.


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>