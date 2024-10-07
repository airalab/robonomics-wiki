---
title: كيفية تشغيل جامع Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"ملاحظة", type: "ملاحظة"}%} في الفيديو التوضيحي والصور لهذه المقالة، استخدمنا الإصدار 1.4.0 من Robonomics. يجب عليك استخدام نفس الأوامر، ولكن استبدال إصدار Robonomics بالإصدار الحالي.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

حاليًا، يتم الحفاظ على شبكة Robonomics بشكل أساسي من قبل المطورين الأصليين، ولكن يمكن لأي شخص دعم المشروع. كل عقدة كاملة إضافية في سلسلة الكتل تساعد على جعلها أكثر استدامة ومقاومة للأخطاء. تتوفر نسخ ثنائية لعقدات Robonomics في [الإصدارات](https://github.com/airalab/robonomics/releases) أو يمكن [بناؤها من المصدر](/docs/how-to-build-collator-node/).

## ما هو جامع

الجامع هو جزء من سلسلة كتل Robonomics. هذا النوع من العقدة ينشئ كتلًا جديدة لسلسلة Robonomics.

> يحافظ الجامعون على السلاسل الفرعية عن طريق جمع معاملات السلاسل الفرعية من المستخدمين وإنتاج دلائل انتقال الحالة لمحققي سلسلة الإرسال. بعبارة أخرى، يحافظ الجامعون على السلاسل الفرعية من خلال تجميع معاملات السلاسل الفرعية في مرشحات كتل السلاسل الفرعية وإنتاج دلائل انتقال الحالة للمحققين بناءً على تلك الكتل.

يمكنك معرفة المزيد عن الجامعين على الصفحة ذات الصلة في [ويكي Polkadot](https://wiki.polkadot.network/docs/learn-collator)

في سلسلة كتل Robonomics، يحصل كل جامع على مكافآت (**0.001598184 XRT**) لكل كتلة يبنيها الجامع (تحدث المكافآت عندما تُختم الكتل على السلسلة).
كما يحصل الجامع الذي يبني الكتلة على **50% من رسوم المعاملات** الموجودة داخل الكتلة التي ينشئونها.

## المتطلبات

يُوصى بتشغيل جامع باستخدام **متطلبات الأجهزة القياسية** لـ [محققي Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ متوافق مع x86-64.
+ Intel Ice Lake، أو أحدث (سلسلة Xeon أو Core)؛ AMD Zen3، أو أحدث (سلسلة EPYC أو Ryzen).
+ 4 أنوية فيزيائية @ 3.4 جيجاهرتز.
+ تعطيل التعدد المتزامن (Hyper-Threading على Intel، SMT على AMD).
+ تخزين - SSD NVMe بسعة 1 تيرابايت (يجب أن تكون بحجم مناسب للتعامل مع نمو سلسلة الكتل).
+ ذاكرة - 32 جيجابايت DDR4 ECC


في هذه المقالة، نستخدم المواصفات التالية:
+ 4 وحدات معالجة مركزية افتراضية (vCPU)
+ 700 جيجابايت من مساحة NVMe لقواعد بيانات الجامع. يتطلب القدرة على توسيع هذه المساحة القرصية.
+ 8 جيجابايت من الذاكرة العشوائية (RAM)


## معلومات مهمة
1. نستخدم بعض المتغيرات في هذه التعليمات، وستحتاج إلى استبدال القيم بالخاصة بك في جميع الأوامر:
    + **%NODE_NAME%** هو اسم العقدة. مثال: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** هو المسار إلى الحجم المركب. مثال: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** هو عنوان الحساب في نظام Polkadot في تنسيق SS58. مثال: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. يجب ملاحظة أنه يجب تضمين *--state-cache-size=0* في إطلاق خدمة الجامع. هذا المعلمة مهمة لاستقرار الجامع.
يمكنك رؤية المزيد من المعلومات في ال [مشكلة ذات الصلة](https://github.com/airalab/robonomics/issues/234) على github.

## إطلاق جامع Robonomics بسهولة للمرة الأولى

يمكنك بسهولة تشغيل جامع مباشرة في سطر الأوامر للتحقق من الأخطاء.
بعد ذلك، يُوصى بشدة بتشغيل جامع Robonomics كخدمة (انظر الخطوة التالية).

```
root@robokusama-collator-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb
```


## تشغيل جامع Robonomics كخدمة

1. إنشاء مستخدم للخدمة مع دليل المستخدم
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. قم بتنزيل واستخراج ونقل الثنائي Robonomics إلى دليل */usr/local/bin/*. يجب عليك استبدال *$ROBONOMICS_VERSION* بالإصدار الحالي لـ Robonomics في الأوامر في هذا القسم. يمكنك العثور على الإصدار الحالي على [صفحة الإصدارات لمستودع Robonomics على github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"تنزيل ثنائي Robonomics 1.4.0"} %}{% endroboWikiPicture %}


3. إنشاء ملف خدمة systemd بالاسم *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    وأضف الأسطر التالية في ملف الخدمة:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"إنشاء ملف خدمة Robonomics"} %}{% endroboWikiPicture %}


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. احفظ هذا الملف، ثم قم بتمكين وبدء الخدمة:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

رابط الرصد: https://telemetry.parachain.robonomics.network/#/Robonomics

يمكن مراقبة سجلات الجامعين باستخدام: `journalctl -u robonomics.service -f`

بمجرد أن يتم تشغيل جامع Robonomics، سيبدأ في مزامنة مع سلسلة الإرسال Kusama، ويمكن أن يستغرق ذلك وقتًا طويلاً، اعتمادًا على سرعة الشبكة الخاصة بك ومواصفات النظام، لذا نوصي بتنزيل لقطة Kusama.


## تسريع عملية المزامنة باستخدام لقطة Kusama

نوصي بالقيام بذلك على الفور بعد إنشاء وبدء خدمة Robonomics. يمكنك العثور على مزيد من المعلومات حول اللقطات وتعليمات الاستخدام على الصفحة التالية: https://ksm-rocksdb.polkashots.io/

التعليمات:

1. قفل خدمة Robonomics واحذف دليل قاعدة بيانات Kusama الحالي:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. قم بتنزيل اللقطة الفعلية واستخراجها:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# tar -xf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"تنزيل لقطة Kusama"} %}{% endroboWikiPicture %}

    يمكنك إزالة الأرشيف المُنزّل بعد فك الضغط بنجاح:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. ضبط الملكية الصحيحة لمجلد قاعدة البيانات:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. قم بتشغيل خدمة Robonomics مرة أخرى:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. تحقق من سجلات الخدمة:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"تحقق من سجلات الخدمة"} %}{% endroboWikiPicture %}

## حل المشكلات
### خطأ: "State Database error: Too many sibling blocks inserted"
لحل هذا الخطأ، يمكنك ببساطة تشغيل جهاز الاقتران الخاص بك في وضع الأرشيف:

1) أولاً، يجب إيقاف خدمة Robonomics:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) ثم أضف المعلمة `--state-pruning=archive` إلى جزء الباراشين في ملف الخدمة. مثال على ملف الخدمة المحرر:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

3) أعد تحميل تكوين مدير systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) قم بإزالة قاعدة بيانات الباراشين الموجودة:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) قم بتشغيل خدمة robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    بعد ذلك، يجب الانتظار لمزامنة قاعدة بيانات الباراشين.

### خطأ: "cannot create module: compilation settings are not compatible with the native host"
يتعلق هذا الخطأ بمعلمات الافتراض الخاصة بالتجازؤ. يجب استخدام نوع "host-model" من المعالج المحاكى. يمكنك تعيين هذا على مضيف الافتراض.

ومع ذلك، إذا واجهت هذا الخطأ على أي استضافة، يجب عليك طلب دعم فني حول هذه المشكلة فقط.