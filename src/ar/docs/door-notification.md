---
title: الحصول على إشعار عند فتح الباب
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

في هذا المقال، ستقوم بتثبيت تكامل إشعار الروبوت تيليجرام وتكوين أتمتة، التي سترسل إشعارًا إلى حساب تيليجرام الخاص بك عند فتح الباب.

## إشعارات روبوت تيليجرام

أولاً، تحتاج إلى إنشاء روبوت تيليجرام شخصي. للقيام بذلك، انتقل إلى [روبوت تيليجرام الخاص @BotFather](https://t.me/botfather) واتبع التعليمات.
احفظ الرمز الخاص بك للوصول إلى واجهة برمجة التطبيقات HTTP.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} حافظ على رمزك بأمان وقم بتخزينه بشكل آمن، يمكن لأي شخص استخدامه للتحكم في روبوتك
{% endroboWikiNote %}

الخطوة التالية هي العثور على ***معرف محادثة المستخدم*** الخاص بك. للقيام بذلك، استخدم [GetIdsBot التالي](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

الآن دعنا نقوم بتثبيت تكامل "بث تيليجرام". سيقوم هذا التكامل بإرسال رسائل إلى تيليجرام الخاص بك.

بالنسبة لصورة Robonomics المثبتة مسبقًا، Docker Home Assistant أو Home Assistant Core، يجب عليك تحرير `configuration.yaml`. اتصل بجهاز Raspberry Pi الخاص بك عبر `ssh`:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

الصق الأسطر التالية في نهاية الملف. أدخل مفتاح **API الروبوت** الخاص بك و**معرف محادثة المستخدم** الخاص بك. كما قم بإنشاء اسم لخدمة الإشعار الخاصة بك:

{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  مثال على معرف مستخدم

notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**احفظ التكوين وأعد تحميل Home Assistant.**

ونتيجة لذلك، سيتم إنشاء خدمة في Home Assistant، سترسل أي رسالة إلى محادثة تيليجرام معك.
يمكنك التحقق من ذلك في قائمة أدوات المطور على واجهة ويب Home Assistant.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

## إشعار فتح الباب

الآن حان الوقت لإنشاء أتمتة. أولاً، قم بإدخال النموذج الأساسي إلى Home Assistant الخاص بك من هذا الرابط:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

وأنشئ أتمتة:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

الآن ستتلقى رسالة من روبوت تيليجرام في كل مرة يتم فيها فتح الباب.

{% roboWikiNote {type: "okay"}%} يمكنك استخدام هذه الأتمتة مع أي أبواب/نوافذ في منزلك.
{% endroboWikiNote %}