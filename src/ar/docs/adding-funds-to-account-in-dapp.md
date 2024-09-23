---
title: إضافة الأموال إلى حسابك على بوابة Robonomics

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**بعد إنشاء حساباتك بنجاح على بوابة Robonomics، حان الوقت لإضافة الأموال إليها حتى تتمكن من بدء المعاملات.**

{% roboWikiNote {title: 'Dev Node', type: "warning"} %}يرجى الانتباه إلى أن هذه الدروس والتعليمات التالية تُظهر على نسخة محلية من Robonomics Node. قم بإعداد الخاص بك باستخدام [هذه التعليمات](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. انتقل إلى قسم الحسابات على بوابة Robonomics

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. اختر الحساب الذي ترغب في تحويل الأموال منه

في وضع التطوير، هناك عدة حسابات، كل منها يحتوي على 10000 وحدة من الأموال، يمكن استخدامها لتحويل الأموال إلى حسابات أخرى تم إنشاؤها في الشبكة التطويرية. تُشار إلى هذه الحسابات برموز المفاتيح الرباعية <img src="/assets/images/docs/adding-funds/wrench.png" alt="wrench sign" width="20"/> بجانبها.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- انقر على زر "send" للحساب الذي ترغب في تحويل الأموال منه، على سبيل المثال BOB

## 3. اختر الحساب الذي ترغب في تحويل الأموال إليه
بعد النقر على زر "send"، ستظهر لك نافذة "send funds". في النافذة المظهرة:

- من قائمة الحسابات المتاحة، اختر الحساب الذي ترغب في تحويل الأموال إليه.
- أدخل عدد الوحدات التي ترغب في إرسالها.
- اضغط على "make transfer"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}


## 4. قم بتفويض المعاملة

بعد الضغط على "make transfer" في المرحلة السابقة، ستظهر لك نافذة "authorize transaction".<br/>
قم بمراجعة تفاصيل المعاملة وأخيرًا انقر على زر "sign and submit".

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

في هذا المثال، قمنا بتحويل 500 وحدة من الأموال من "BOB" إلى "EMPLOYER". يمكنك رؤية أن حساب EMPLOYER، الذي لم يكن يحتوي في البداية على أي أموال، يحتوي الآن على 500 وحدة من الأموال.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**تأكد من وجود ما يكفي من الأموال في الحسابات التي ترغب في استخدامها في اللعبة.**