---
title: احصل على إشعار عند فتح الباب
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

في هذه المقالة، ستقوم بتثبيت تكامل مُنبه الروبوت في تيليجرام وتكوين أتمتة، ستُرسل إشعارًا إلى حساب تيليجرام الخاص بك عند فتح الباب.

## إشعارات روبوت تيليجرام

أولاً، تحتاج إلى إنشاء روبوت تيليجرام شخصي. لهذا، انتقل إلى [روبوت تيليجرام الخاص @BotFather](https://t.me/botfather) واتبع التعليمات. 
احفظ الرمز الخاص بك للوصول إلى واجهة برمجة التطبيقات HTTP.

<robo-wiki-video controls src="https://static.robonomics.network/wiki/bot-father.mp4" />

<robo-wiki-note type="warning">

احتفظ برمزك **بأمان** وقم بتخزينه **بشكل آمن**، يمكن لأي شخص استخدامه للتحكم في روبوتك 

</robo-wiki-note>

الخطوة التالية هي العثور على ***User Chat ID***. لهذا استخدم الخطوة التالية [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/get-id-bot.mp4" />

الآن دعنا نقوم بتثبيت تكامل "Telegram broadcast". سيقوم هذا التكامل بإرسال رسائل إلى تيليجرام الخاص بك.

بالنسبة لصورة Robonomics المثبتة مسبقًا، أو Docker Home Assistant أو Home Assistant Core، يجب عليك تحرير `configuration.yaml`. قم بالاتصال بجهاز Raspberry Pi الخاص بك عبر `ssh`:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/open-config.mp4" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

قم بلصق الأسطر التالية في نهاية الملف. أدخل **bot API key** و **your User Chat ID**. أيضًا قم بإنشاء اسم لخدمة الإشعار الخاصة بك:


<code-helper copy >

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  example id of a user
      
notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-config.mp4" />

**احفظ التكوين وأعد تحميل Home Assistant.**


كنتيجة، سيتم إنشاء خدمة في Home Assistant، ستُرسل أي رسالة إلى محادثة تيليجرام معك. 
يمكنك التحقق من ذلك في قائمة أدوات المطور في واجهة Home Assistant على الويب. 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/telegram-result.mp4" />

##  إشعار فتح الباب

الآن حان الوقت لإنشاء أتمتة. أولاً، قم بإستيراد النموذج إلى Home Assistant الخاص بك من هذا الرابط:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-blue.mp4" />

ثم قم بإنشاء أتمتة:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/create-automation.mp4" />

الآن ستتلقى رسالة من روبوت تيليجرام في كل مرة يتم فيها فتح الباب.

<robo-wiki-note type="okay">
يمكنك استخدام هذه الأتمتة مع أي أبواب / نوافذ في منزلك.
</robo-wiki-note>

