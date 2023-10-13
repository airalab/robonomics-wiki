---
title: كيفية بناء عقدة المجمع من المصدر
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  في الفيديو التعليمي ولقطات الشاشة لهذه المقالة، استخدمنا الإصدار 1.4.0 من Robonomics. تحتاج إلى استخدام نفس الأوامر، ولكن استبدل إصدار Robonomics بالإصدار الحلي.
</robo-wiki-note>

## ما هو المجمع

المجمع هو جزء من سلسلة Robonomics. يقوم هذا النوع من العقدات بإنشاء كتل جديدة للسلسلة..

>يقوم المجمعون بالحفاظ على سلاسل الجانب عن طريق جمع معاملات سلاسل الجانب من المستخدمين وإنتاج دلائل انتقال الحالة لمحققي سلسلة الإرسال. بعبارة أخرى، يقوم المجمعون بالحفاظ على سلاسل الجانب عن طريق تجميع معاملات سلاسل الجانب في مرشحات كتل سلاسل الجانب وإنتاج دلائل انتقال الحالة للمحققين بناءً على تلك الكتل.

يمكنك معرفة المزيد عن المجمع على صفحة الويكي المتعلقة [بولكادوت](https://wiki.polkadot.network/docs/learn-collator)

في سلسلة Robonomics المظلية، يحصل كل مُجمِّع على مكافآت (**0.000380520 XRT**) مقابل كل كتلة قام بإنشائها، إذا كانت هذه الكتلة مغلقة بالسلسلة.
يحصل المجمّع أيضًا على **رسوم معاملات بنسبة 50%** من هذه الكتلة.

## عملية البناء

https://youtu.be/wnAtD7w0Pxk

"تأكد من تثبيت Rust والبرامج الداعمة. سيطلب منك برنامج التثبيت الخاص بـ Rust حول خيارات التثبيت الحالية، يجب عليك اختيار الخيار `1) المتابعة مع التثبيت (الافتراضي)`.",


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![تثبيت Rust](../images/how-to-build-collator-node/install_rust.jpg)


قم بتثبيت سلسلة الأدوات الليلية المطلوبة والهدف wasm.
الأوامر التالية صالحة لـ Robonomics v2.6.0 أيضًا:

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


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
    # Install git https://git-scm.com/download/win
    # Install LLVM
    # Download and install the Pre Build Windows binaries
    # of LLVM  from http://releases.llvm.org/download.html
  ```
الآن يمكنك تثبيت عقدة robonomics من مصدر git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


بعد هذا الأمر، سيكون الملف الثنائي المترجم لـ robonomics في دليل `~/.cargo/bin`.

الخطوة التالية هي كيفية تشغيل عقدة المجمع. يمكنك قراءة المزيد عن ذلك في مقالة ["كيفية تشغيل عقدة المجمع Robonomics"](/docs/how-to-launch-the-robonomics-collator).