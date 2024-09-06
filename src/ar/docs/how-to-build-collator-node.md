---
title: كيفية بناء عقدة جامعة من المصدر
contributors: [dergudzon, Leemo94]
tools:
  - أوبونتو 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - سلسلة أدوات Rust nightly-2022-08-05
---


{% roboWikiNote {title:"ملاحظة", type: "ملاحظة"}%} في الفيديو التوضيحي والصور لهذه المقالة، استخدمنا الإصدار 1.4.0 من Robonomics. يجب عليك استخدام نفس الأوامر، ولكن استبدال إصدار Robonomics بالإصدار الحالي.{% endroboWikiNote %}

## ما هي الجامعة

الجامعة هي جزء من سلسلة الكتل Robonomics. هذا النوع من العقد ينشئ كتلًا جديدة للسلسلة.

> تحافظ الجامعات على سلاسل جانبية من خلال جمع معاملات السلسلة الجانبية من المستخدمين وإنتاج دلائل انتقال الحالة لمحققي سلسلة الإرسال. بعبارة أخرى، تحافظ الجامعات على سلاسل جانبية من خلال تجميع معاملات السلسلة الجانبية في مرشحات كتل السلسلة الجانبية وإنتاج دلائل انتقال الحالة للمحققين بناءً على تلك الكتل.

يمكنك معرفة المزيد عن الجامعة على الصفحة ذات الصلة في [ويكي بولكادوت](https://wiki.polkadot.network/docs/learn-collator)

في سلسلة الكتل Robonomics، تحصل كل جامعة على مكافآت (**0.000380520 XRT**) لكل كتلة تقوم ببنائها، إذا تم ختم هذه الكتلة على السلسلة.
كما تحصل الجامعة على **50% من رسوم المعاملات** من هذه الكتلة.

## عملية البناء

https://youtu.be/wnAtD7w0Pxk

تأكد من تثبيت Rust والبرامج الداعمة. سيطلب منك برنامج التثبيت Rust خيارات التثبيت الحالية، يجب عليك اختيار الخيار `1) Proceed with installation (default)`.

```
  curl https://sh.rustup.rs -sSf | sh
  # على نظام Windows، قم بتنزيل وتشغيل rustup-init.exe
  # من https://rustup.rs بدلاً من ذلك
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"install rust"} %}{% endroboWikiPicture %}

قم بتثبيت سلسلة الأدوات الليلية المطلوبة والهدف wasm.
الأوامر التالية صالحة لـ Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"install nightly"} %}{% endroboWikiPicture %}

```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```

سيتعين عليك أيضًا تثبيت الحزم التالية:

  1. Linux:

  ```
    sudo apt install cmake git clang libclang-dev
  ```
  2. Mac:

  ```
    brew install cmake pkg-config git llvm
  ```
  3. Windows (PowerShell):

  ```
    # قم بتثبيت git https://git-scm.com/download/win
    # قم بتثبيت LLVM
    # قم بتنزيل وتثبيت الإصدارات الثنائية السابقة لـ LLVM
    # من http://releases.llvm.org/download.html
  ```

الآن يمكنك تثبيت عقدة Robonomics من مصدر git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Start build Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"End build Robonomics"} %}{% endroboWikiPicture %}

بعد هذا الأمر، سيكون الملف التنفيذي لـ robonomics المُترجم في دليل `~/.cargo/bin`.

الخطوة التالية هي كيفية تشغيل عقدة الجامعة. يمكنك قراءة حول ذلك في مقالة ["كيفية تشغيل جامعة Robonomics"](/docs/how-to-launch-the-robonomics-collator).