---
title: كيفية إطلاق مجمع Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  في الفيديو التعليمي ولقطات الشاشة لهذه المقالة، استخدمنا الإصدار 1.4.0 من Robonomics. تحتاج إلى استخدام نفس الأوامر، ولكن استبدل إصدار Robonomics بالإصدار الحلي.
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

حاليًا، يتم الحفاظ على شبكة Robonomics بشكل أساسي من قبل المطورين الأصليين، ولكن يمكن لأي شخص دعم المشروع. كل عقدة كاملة إضافية في سلسلة الكتل تساعد في جعلها أكثر ستدامة ومقاومة للأخطاء. تتوفر برامج تشغيل عقدة Robonomics في [الإصدارات](https://github.com/airalab/robonomics/releases) أو يمكن [بناؤها من المصدر](/docs/how-to-build-collator-node/).

## ما هو المجمع

Collator هو جزء من Robonomics parachain. هذا النوع من العقدة ينشئ كتل جديدة لسلسلة Robonomics.

>يقوم المجمعون بالحفاظ على سلاسل الجانب عن طريق جمع معاملات سلاسل الجانب من المستخدمين وإنتاج دلائل انتقال الحالة لمحققي سلسلة الإرسال. بعبارة أخرى، يقوم المجمعون بالحفاظ على سلاسل الجانب عن طريق تجميع معاملات سلاسل الجانب في مرشحات كتل سلاسل الجانب وإنتاج دلائل انتقال الحالة للمحققين بناءً على تلك الكتل.

يمكنك معرفة المزيد عن collators على صفحة الويكي المتعلقة [Polkadot](https://wiki.polkadot.network/docs/learn-collator)

في سلسلة Robonomics المظلية، يحصل كل مُجمِّع على مكافآت قدرها (**0.001598184 XRT**) لكل كتلة يبنيها المُجمِّع (تحدث المكافآت عندما يتم إغلاق الكتل بالسلسلة).
أيضًا، يحصل المجمع الذي يبني الكتلة على **50% من رسوم المعاملات** الموجودة في الكتلة التي ينشئها.

## المتطلبات

يُوصَى بأن تطلق مجمعًا باستخدام **متطلبات الأجهزة القياسية** لـ [مُصَادِقِيَّةِ Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ متوافق مع x86-64.
+ Intel Ice Lake، أو أحدث (Xeon أو سلسلة Core)؛ AMD Zen3، أو أحدث (EPYC أو Ryzen).
+ 4 أنوية فيزيائية بتردد 3.4 جيجاهرتز.
+ تعطيل التعدد المتزامن للمواضيع (Hyper-Threading على Intel، SMT على AMD).
+ التخزين - قرص NVMe SSD بسعة 1 تيرابايت (حيث يجب أن يكون بحجم مناسب للتعامل مع نمو سلسلة الكتل).
+ الذاكرة - 32 جيجابايت DDR4 ECC


في هذه المقالة نستخدم المواصفات التالية:
+ 4 vCPU
+ 700 جيجابايت من مساحة NVMe لقواعد بيانات المجمع. يتطلب القدرة على توسيع مساحة القرص هذه.
+ 8 جيجابايت من ذاكرة الوصول العشوائي


## معلومات هامة
1. نستخدم بعض المتغيرات في هذه التعليمات، وسيتعين عليك استبدال القيم بقيمك الخاصة في جميع الأوامر:
    + **%NODE_NAME%** هو اسم العقدة. مثال: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** هو المسار إلى الحجم المركب. مثال: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** هو عنوان الحساب في نظام Polkadot في تنسيق SS58. مثال: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. لاحظ أنه يجب عليك تضمين *--state-cache-size=0* في إطلاق خدمة المجمع. هذا المعلمة مهمة لاستقرار المجمع.
يمكنك رؤية مزيد من المعلومات في [المشكلة ذات الصلة](https://github.com/airalab/robonomics/issues/234) على github.

## أطلق مجمع Robonomics بسهولة للمرة الأولى

يمكنك بسهولة إطلاق مجمع مباشرة في سطر الأوامر للتحقق من الأخطاء.
بعد القيام بذلك، يُوصَى بشدة بإطلاق مجمع Robonomics كخدمة (انظر الخطوة التالية).

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


## قم بتشغيل أداة تجميع Robonomics كخدمة

1. قم بإنشاء المستخدم للخدمة مع دليل المستخدم الرئيسي
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. قم بتنزيل واستخراج ونقل البرنامج الثنائي لـ Robonomics إلى الدليل */usr/local/bin/*. يجب عليك استبدال *$ROBONOMICS_VERSION* بالإصدار الحالي لـ Robonomics في الأوامر في هذا القسم. يمكنك العثور على الإصدار الحالي على [صفحة الإصدارات في مستودع Robonomics على github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


3. قم بإنشاء ملف الخدمة systemd بالاسم *robonomics.service*:
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

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. احفظ هذا الملف، ثم قم بتمكين وبدء الخدمة:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

عنوان الرصد: https://telemetry.parachain.robonomics.network/#/Robonomics

يمكن مراقبة سجلات المُجمعين باستخدام: `journalctl -u robonomics.service -f`

بمجرد إطلاق أداة تجميع Robonomics، ستبدأ في المزامنة مع سلسلة Kusama Relay Chain، وقد يستغرق ذلك وقتًا طويلاً، اعتمادًا على سرعة الشبكة لديك ومواصفات النظام، لذلك نوصي بتنزيل لقطة Kusama. 


## تسريع عملية المزامنة باستخدام لقطة Kusama

نوصي بالقيام بذلك فور إنشاء الخدمة وبدء تشغيلها. يمكنك العثور على مزيد من المعلومات حول اللقطات وتعليمات الاستخدام على الصفحة التالية: https://ksm-rocksdb.polkashots.io/

التعليمات:

1. قم بإيقاف خدمة Robonomics وإزالة دليل قاعدة بيانات Kusama الحالي:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. قم بتنزيل اللقطة الفعلية واستخراجها:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    يمكنك إزالة الأرشيف الذي تم تنزيله بعد التفريغ الناجح:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. تعيين الملكية الصحيحة لمجلد قاعدة البيانات:
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
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## حل المشاكل
### خطأ: "State Database error: Too many sibling blocks inserted"
لإصلاح هذا الخطأ، يمكنك فقط تشغيل أداة التجميع في وضع الأرشيف:

1) أولاً، يجب أن تقوم بإيقاف خدمة Robonomics: 
    
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

5) قم بتشغي خدمة الروبونوميكس:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    بعد ذلك يجب الانتظار لمزامنة قاعدة بيانات الباراشين.

### خطأ: "cannot create module: compilation settings are not compatible with the native host" 
هذا الخطأ متعلق بمعلمات الافتراضية. يجب استخدام نوع "host-model" للمعالج المحاكى. يمكنك ضبط ذلك على مضيف الافتراضية.

ولكن إذا واجهت هذا الخطأ على أي استضافة، فيجب عليك طلب الدعم الفني حول هذه المشكلة فقط.
