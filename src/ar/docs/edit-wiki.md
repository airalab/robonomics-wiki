---
title: كيفية تحرير الويكي
contributors: [positivecrash]
description: طرق لمساعدتنا في تحسين ويكيبيديتا
---

**ويكي روبونوميكس مفتوح المصدر. أي تصحيحات مرحب بها: إصلاح الأخطاء، الأخطاء الإملائية، بعض المعلومات غير الواضحة أو القديمة، الترجمة إلى أي لغة. ستحتاج إلى حساب [GitHub](https://github.com/).**


## كيفية التحرير

إذا كنت بحاجة إلى تحرير وثائق ويكي روبونوميكس، يرجى اتباع هذه الخطوات

تأكد من أن لديك [Node.js](https://nodejs.org/en/download/package-manager/) مثبت.

### 1. استنساخ المستودع

أولاً، تحتاج إلى استنساخ مستودع الويكي:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

انتقل إلى دليل المستودع وقم بتشغيل الأوامر التالية:

`باستخدام npm`
```
cd robonomics-wiki
npm install
```

`باستخدام yarn`
```
cd robonomics-wiki
yarn install
```

### 2. تشغيل محليًا (develop, develop-m1)

`يجب أن تكون إصدار النود 20 || >=22`

ثم قم بنشر المشروع محليًا:

```
npm run start
```

> قد تحتاج إلى إنشاء ملف .env بنفس المتغيرات الموجودة في ملف .env.example

### 3. إنشاء طلب سحب

[إنشاء طلب سحب](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) to [wiki repo](https://github.com/airalab/robonomics-wiki)

## المكونات

{% roboWikiNote {title:"المكونات المخصصة", type: "تحذير"}%} **نصيحة** عند إضافة مكونات مخصصة:
إذا كان هناك خطأ في التخطيط بعد إضافة مكون، قد ترغب في التحقق من الفراغات. يجب أن تساعد في **إزالة** الفراغات بعد العلامة الافتتاحية والإغلاقية (مثل المثال أدناه){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"اختبار", type: "جيد"}%}{% endraw %} لوريم إيبسوم دولور سيت أميت.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### الكود

يمكنك إضافة مساعدات مفيدة لكودك:

`كود مع زر نسخ`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

بعض النصوص البرمجية
	سطر اختبار آخر
		شيء آخر

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

أو `كود مع سطر إضافي`

```bash
{% raw %}{% codeHelper { additionalLine: "سطر إضافي"}%}{% endraw %}

بعض النصوص البرمجية
	سطر اختبار آخر
		شيء آخر

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**خصائص لمساعد الكود**

| الخاصية         | النوع     | Required | Default  | Description                                               |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | إضافة زر نسخ لكودك                           |
| `additionalLine` | `String`  | `false`  | ''       | سطر إضافي لكودك سيتم عرضه أعلى |


{% codeHelper { additionalLine: "سطر إضافي", copy: true}%}

```bash
بعض نص الكود
	سطر اختبار آخر
		شيء آخر
```

{% endcodeHelper %}


### Frontmatter
تحتوي الوثائق في ويكي روبونوميكس على كتلة frontmatter. يجب أن تكون في أعلى ملف Markdown، ويجب أن تكون عبارة عن YAML صالحة موضوعة بين خطوط مزدوجة. بين الخطوط المزدوجة، يمكنك تعيين أو تحرير الخيارات التالية:

```YAML
---
title: كيفية المساهمة # العنوان للصفحة، لا داعي لتكراره في النص
contributors: [positivecrash] # المساهمون الرئيسيون (الذين يديرون هذه الصفحة بنشاط). مطلوب اسم المستخدم على جيثب، بدون أي رموز إضافية
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # الأدوات التي تم استخدامها لاختبار التكنولوجيا
---
```

### الشبكة
تساعد في إضافة تخطيط الشبكة للعناصر:

- استخدم مكون الشبكة الرئيسي أولاً:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- ثم استخدم قدر ما تريد من مكونات العناصر في داخل المكون الرئيسي:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} العنصر الأول {% endroboWikiGrid %}
	{% roboWikiGrid %} العنصر الثاني {% endroboWikiGrid %}
	{% roboWikiGrid %} العنصر الثالث {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**خصائص مكون robo-wiki-grid-wrapper**

| الخاصية    | النوع     | مطلوبة | الافتراضي | الوصف                                                            |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4       | يمكنك اختيار عدد الأعمدة:   <br/> - من `1 إلى 5`                  |
| `align`     | `String` | `false`  |         | محاذاة العناصر على محور الكتلة:   <br/> - الخيارات: `start, center, end` |
| `justify`   | `String` | `false`  |         | محاذاة العناصر على المحور السطري:  <br/> - الخيارات: `start، center، end` |
| `textAlign` | `String` | `false`  | `left`  | محاذاة النص داخل الشبكة:  <br/> - الخيارات: `left، center، right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (على الأقل 2 جيجابايت من ذاكرة الوصول العشوائي)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>بطاقة SD بسعة 16 جيجابايت</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> محول Zigbee (اختياري) </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee smart devices(Optionally) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Desktop for setup</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Images

#### How to upload
Upload image in folder `src/assets/docs/images/url-of-your-doc`
* If image needs to be localized, insert all of them in one folder
* Use locale appendix in name of images if it's localized, e.g. `image_en.jpg`
* Make sure your image is web optimized and at the same time it looks good

#### How to insert

There are two ways for inserting pictures in your documents:

{% roboWikiNote {type: 'warning'}%} من المُفضل إدراج الصور باستخدام العلامة المدمجة `<robo-wiki`-صورة>`, ومع ذلك يمكنك أيضًا استخدام الطريقة القياسية لملفات التحرير بتنسيق Markdown. {% endroboWikiNote %}

`مع تسمية`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"استكشاف ويكي روبونوميكس", link: '/docs/overview', caption: "استكشاف"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`أو بدون تسمية`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"استكشاف ويكي روبونوميكس", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`أو صورة بسيطة`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"استكشاف ويكي روبونوميكس"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`أو صورة بسيطة مع تسمية`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"استكشاف ويكي روبونوميكس", caption: "استكشاف"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**خصائص لـ robo-wiki-picture:**

| الخاصية  | النوع      | مطلوبة | الافتراضي | الوصف                                                                                                                                                                                                          |
|-----------|-----------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | مسار الصورة:  <br/> - إذا قمت بتحميل صورتك مباشرة إلى `/src/assets/images/docs/` استخدم: `url-of-your-doc` <br/> - إذا قمت بتحميل الصورة في أحد المجلدات، استخدم: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | محاذاة العناصر على محور الكتلة:   <br/> - الخيارات: `start, center, end`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | محاذاة العناصر على محور السطر:  <br/> - الخيارات: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | يوفر معلومات بديلة للصورة إذا لم يتمكن المستخدم لأي سبب من رؤيتها                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | تكبير الصورة                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | هناك خياران: lazy و eager                                                                                                                                                                                |

### ملاحظات وتحذيرات
يمكنك إضافة ملاحظات وإعطائها أنواعًا محددة:
* تحذير (<span style="color:#f08432">**مع صورة**</span>)
* جيد (<span style="color:#3eaf7c">**اللون الأخضر**</span>)
* ملاحظة (<span style="color:#90a4b7">**اللون الرمادي**</span>)

`ملاحظة بعنوان`

```c
{% raw %} {% roboWikiNote {title:"عنوان المثال", type: "جيد"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`ملاحظة بمحتوى`

```c
{% raw %} {% roboWikiNote {type: "جيد"}%} لوريم إيبسوم دولور سيت أميت.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`ملاحظة بعنوان ومحتوى`

```c
{% raw %} {% roboWikiNote {title: "العنوان", type: "جيد"}%} لوريم إيبسوم دولور سيت أميت.  {% endroboWikiNote %} {% endraw %}
```

<br/>

{% roboWikiNote {title: "انضم إلى ديسكورد", type: "جيد"}%} [انضم إلى ديسكورد مطوري Robonomics](https://discord.gg/jTxqGeF5Qy) للتواصل مع المجتمع والحصول على الدعم الفني. {% endroboWikiNote %}

{% roboWikiNote {title: "انضم إلى ديسكورد"}%} [انضم إلى ديسكورد مطوري Robonomics](https://discord.gg/jTxqGeF5Qy) للتواصل مع المجتمع والحصول على الدعم الفني. {% endroboWikiNote %}

{% roboWikiNote {title: "انضم إلى Discord", type: "warning"}%} [انضم إلى Discord لمطوري Robonomics](https://discord.gg/jTxqGeF5Qy) للتواصل مع المجتمع والحصول على الدعم الفني. {% endroboWikiNote %}

**خصائص لملاحظة ويكي روبو**

| الخاصية | النوع     | مطلوب | الافتراضي | الوصف                                                 |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `false`  |         | - هناك ثلاثة أنواع بالكلي: `note`, `warning`, `okay` |
| `title`  | `String` | `false`  |         | يضيف عنوانًا لملاحظتك                                     |


### علامات تبويب
يمكنك إضافة علامات تبويب إلى الوثيقة:

- استخدم مكون تغليف علامات التبويب:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- ثم استخدم مكونات عناصر التبويب بقدر ما تريد داخل المكون التالي:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}{% endraw %}
```

<br/>

`الألسنة الأفقية`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`الألسنة الرأسية`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`عنصر التبويب مع حدود`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**خصائص لـ robo-wiki-tabs (المحيط)**

| الخاصية | النوع     | مطلوب | الافتراضي    | الوصف                                                       |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - مصفوفة تحتوي على عناوين لكل علامة تبويب                                  |
| `mode`   | `String` | `false`  | horizontal | يمكنك اختيار وضع علامات التبويب: <br/> - `horizontal` <br/> - `vertical` |

**خصائص لـ robo-wiki-tab (عنصر)**

| الخاصية | النوع      | مطلوب | الافتراضي | الوصف                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - إضافة حد للمحتوى المحيط |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### عنوان مع مراسي
يمكنك إنشاء عناوين مخصصة مع مراسي وإعطائها قيمة معينة`عنوان مع مرجع`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

أو `عنوان بدون مرجع`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (عنوان مخصص) {% endroboWikiTitle %}

<br/>

**خصائص لعنوان الروبو-ويكي**

| الخاصية | النوع                   | مطلوب | الافتراضي | الوصف          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Number (من 2 إلى 6)` | `true`   |         | اختر مستوى العنوان |
| `anchor` | `String`               | `false`  |         | قيمة للمرجع |

### الفيديوهات

هناك طريقتان لإدراج الفيديوهات في مستنداتك:

{% roboWikiNote {type: "warning"}%} من المستحسن إدراج الفيديوهات باستخدام العلامة المضمنة `<robo-wiki-video>`، ومع ذلك يمكنك أيضًا استخدام الطريقة القياسية لملفات التحرير بتنسيق Markdown. {% endroboWikiNote %}

#### IPFS / الخادم
تحتاج إلى تحديد تنسيق الفيديو

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"حول البوابات"}%} يتم اختيار البوابة للرابط تلقائيًا من ملف التكوين - `src/_data/video_config.js`. يمكنك إضافة أو إزالة بعض البوابات عن طريق تغيير الملف. {% endroboWikiNote %}


#### محلي

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### الخصائص

- إذا كنت تقوم بإضافة ملف بحجم أكبر من <span style="color:#af1c1c">10 ميغابايت</span>، يرجى تحميله على الخادم، وليس في مستودع البيانات.

- يمكنك استخدام أي خصائص لـ [علامة الفيديو HTML5](https://www.w3schools.com/tags/tag_video.asp).

- الصيغ المقبولة - mp4، webm، ogg.

| الخاصية | النوع | مطلوب | الافتراضي | الوصف |
|---|---|---|---|---|
| `videos` |`Array` | `true` |  | Array of objects [{src: `path to video`, type: `type of video`}] |


#### YouTube
يمكنك تضمين أي فيديو من YouTube في الوثيقة عن طريق إدراج رابط المشاركة كفقرة منفصلة دون أي علامات أو اقتباسات إضافية، على سبيل المثال: `https://youtu.be/kQaSwNYHJQ8`

ومع ذلك، إذا كنت بحاجة إلى تشغيل تلقائي يجب عليك استخدام مكون خاص:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**خصائص robo-wiki-youtube**

| الخاصية | النوع | مطلوبة | الافتراضي | الوصف |
|---|---|---|---|---|
| `link` | `String` | `true` |  | رابط الفيديو على YouTube |
| `autoplay` | `Boolean` | `false` | `false` | تشغيل تلقائي للفيديو على YouTube |
| `loop` | `Boolean` | `false` | `false` | تكرار الفيديو على YouTube |


## كيفية تحرير شريط التنقل الجانبي

إذا كنت بحاجة إلى تحرير شريط التنقل الجانبي في ويكي روبونوميكس، يرجى اتباع هذه الخطوات:

* قم بتحرير الملف `src/_data/sidebar_docs.json`.

* قرر أين تضع وثيقتك

* استخدم JSON صالح لـ `src/_data/sidebar_docs.json` واعتمد علىهيكل الملفات الحالي

* يجب عليك إضافة أسطر جديدة إلى ملف الترجمة `translations/pages/en.json` أيضًا، إذا لم تكن قد قمت بترجمة محتوى جديد مسبقًا، على سبيل المثال:

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **ملاحظة هامة:** إذا كنت تستخدم نفس المستند في أقسام/فروع مختلفة مثل:

```

{
	"title": "Upgrade Home Assistant OS",
	"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
	}],
	"title": "Upgrade Home Assistant Docker for Unix-like OS",
		"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
	}],
}

```

تأكد من إضافة معلمة `topic` كما يلي:

(لضمان عمل التصفح بشكل صحيح)

```
{
	"title": "Upgrade Home Assistant OS",
	"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
		"topic": "Upgrade Home Assistant OS"
	}],
	"title": "Upgrade Home Assistant Docker for Unix-like OS",
		"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
		"topic": "Upgrade Home Assistant Docker for Unix-like OS"
	}],
}

```

## كيفية إضافة تصفح مخصص للمستندات

* تحرير الملف`src/_data/sidebar_docs.json`.

* العثور على الوثيقة المناسبة وإضافة المعلمات `prev` و `next` مثل هذا:

```
	{
		"title": "نظرة عامة",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "إضافة مستخدم",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "إضافة مستخدم",
				"url": "/docs/add-user"
			}
		],
	},

```

* إذا كنت ترغب في إزالة التنقل تمامًا ، فأضف معلمة `withoutNav`:

```
{
	"title": "نظرة عامة",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* إذا كنت ترغب في إزالة التنقل فقط لـ `الصفحة السابقة` أو `الصفحة التالية` ، فأضف معلمة `withoutPrev` أو `withoutNext`:

```
{
	"title": "نظرة عامة",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

أو

```
{
	"title": "نظرة عامة",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## كيفية ترجمة وثيقة

{% roboWikiNote {title: 'مهم', type: 'warning'}%} يجب عليك إنشاء **ملف **.env** وأضف متغير *OPENAI_KEY* مع مفتاحك {% endroboWikiNote %}

إذا كنت ترغب في ترجمة مستند md الخاص بك، يجب عليك تشغيل الأمر:

```bash
npm run translate-md
```

{% roboWikiNote {title: 'ترجمة بسهولة', type: 'warning'}%} لترجمة الكل دفعة واحدة، كل الأسطر الجديدة في الصفحات، المستند الجديد أو المستند المعدل، تحتاج فقط إلى أمر واحد الآن {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> كما تأكد من أنك تقوم بترجمة الملفات المعدلة التي تحتاج إلى الترجمة فقط. على سبيل المثال، إذا كنت بحاجة إلى تغيير 5 ملفات. ثلاثة منها تتضمن تغييرات في النصوص وإزالة بعض المعلومات القديمة. والاثنان الآخران يحتاجان إلى تحديث الروابط لبعض الصور أو تغيير رابط خارجي. في هذه الحالة، من الحكمة تغيير الثلاثة ملفات الأولى وترجمتها وبعد ذلك تغيير الروابط في الملفين الآخرين.

> يحدث الترجمة لجميع الملفات المعدلة، ولكن ليس من الضروري للروابط المحدثة، خاصة إذا كان الملف كبيرًا وبالتالي يستغرق الترجمة بعض الوقت.

بعد تشغيل الأمر اللازم، كل ما عليك فعله هو الانتظار وربما التحقق من الملفات (تحتوي الترجمات الذكية على بعض العيوب). لفحص الملفات قم بتشغيل `npm run build` ومعرفة ما إذا كان هناك أي أخطاء.

### حل مشكلات الترجمة

قد تواجه بعض المشاكل مع الترجمة.

1. حاول تشغيل الأمر مرة أخرى وانظر ما إذا كانت تعمل.

2. أحيانًا تظهر الوسومفي ملفات md يمكن أن يتم كتابتها بشكل غير صحيح، على سبيل المثال:

```
{%raw %}
	[11ty] 1. تواجه مشكلة في عرض قالب njk ./src/de/docs/edit-wiki.md (عبر TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [السطر 168، العمود 96]
	[11ty]   وسم كتلة غير معروف: endroboWiki (عبر خطأ في عملية التقديم للقالب)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

ثم، عليك فقط تصحيح الوسم.