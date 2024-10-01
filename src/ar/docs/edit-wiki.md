---
title: كيفية تحرير الويكي
contributors: [positivecrash]
description: طرق لمساعدتنا في تحسين ويكيبيديا الروبوتات
---

**ويكيبيديا روبونوميكس مفتوحة المصدر. أي تصحيحات مرحب بها: إصلاح الأخطاء، الأخطاء الإملائية، بعض المعلومات غير الواضحة أو القديمة، الترجمة إلى أي لغة. ستحتاج إلى [حساب GitHub](https://github.com/).**


## كيفية التحرير

إذا كنت بحاجة إلى تحرير وثائق ويكيبيديا روبونوميكس، يرجى اتباع هذه الخطوات

تأكد من أن لديك [Node.js](https://nodejs.org/en/download/package-manager/) مثبتين.

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

`يجب أن يكون الإصدار من node v20 || >=22` 

ثم قم بنشر المشروع محليًا:

```
npm run start
```

### 3. إنشاء طلب سحب

[إنشاء طلب سحب](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)إلى [مستودع الويكي](https://github.com/airalab/robonomics-wiki)

## المكونات

{% roboWikiNote {title:"مكونات مخصصة", type: "warning"}%} **نصيحة** عند إضافة مكونات مخصصة:
إذا كان هناك خطأ في التخطيط بعد إضافة مكون، قد ترغب في التحقق من الفراغات. يجب أن تساعد في **إزالة** الفراغات بعد العلامة الافتتاحية والإغلاقية (مثل المثال أدناه){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} لوريم ايبسوم دولور سيت اميت.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### الكود

يمكنك إضافة مساعدات مفيدة لكودك:

`كود مع زر نسخ`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

أو `كود مع سطر إضافي`

```bash
{% raw %}{% codeHelper { additionalLine: "additional line"}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**خصائص لمساعد الكود**

| الخاصية         | النوع      | مطلوبة | الافتراضي  | الوصف                                               |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | إضافة زر نسخ لكودك                           |
| `additionalLine` | `String`  | `false`  | ''       | سطر إضافي لكودك سيتم عرضه أعلى |


{% codeHelper { additionalLine: "additional line", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}### الجزء الأمامي
تحتوي الوثائق في ويكي روبونوميكس على كتلة الجزء الأمامي. يجب أن تكون في أعلى ملف Markdown، ويجب أن تكون على شكل YAML صالح موضوع بين خطوط مزدوجة. بين الخطوط المزدوجة، يمكنك تعيين أو تحرير الخيارات التالية:

```YAML
---
title: كيفية المساهمة # عنوان الصفحة، لا داعي لتكراره في النص
contributors: [positivecrash] # المساهمون الرئيسيون (الذين يديرون هذه الصفحة بنشاط). اسم المستخدم على GitHub مطلوب، بدون أي رموز إضافية
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # الأدوات التي تم استخدامها لاختبار التقنية
---
```

### الشبكة
تساعد في إضافة تخطيط الشبكة للعناصر:

- استخدم مكون الشبكة الأول:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- ثم استخدم العديد من مكونات عناصر الشبكة داخل المحيط:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} العنصر الأول {% endroboWikiGrid %}
{% roboWikiGrid %} العنصر الثاني {% endroboWikiGrid %}
	{% roboWikiGrid %} العنصر الثالث {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**خصائص لـ robo-wiki-grid-wrapper**

| الخاصية    | النوع     | مطلوب   | الافتراضي | الوصف                                                            |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4       | يمكنك اختيار عدد الأعمدة:   <br/> - من `1 إلى 5`                  |
| `align`     | `String` | `false`  |         | محاذاة العناصر على محور الكتلة:   <br/> - الخيارات: `start, center, end` |
| `justify`   | `String` | `false`  |         | محاذاة العناصر على محور الخط:  <br/> - الخيارات: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | محاذاة النص داخل الشبكة:  <br/> - الخيارات: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b> Raspberry Pi 4 (على الأقل 2 غيغابايت من الذاكرة)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b> بطاقة SD بسعة 16 جيجابايت</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> محول Zigbee (اختياري) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> أجهزة Zigbee الذكية (اختياري) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>سطح المكتب للإعداد</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### الصور

#### كيفية رفع الصور
قم بتحميل الصورة في المجلد `src/assets/docs/images/url-of-your-doc`
* إذا كانت الصورة بحاجة إلى تعريب، ضعها جميعًا في مجلد واحد
* استخدم إضافة اللغة في اسم الصور إذا كانت معربة، على سبيل المثال `image_en.jpg`
* تأكد من أن الصورة الخاصة بك محسنة للويب وفي نفس الوقت تبدو جيدة

#### كيفية إدراج

هناك طريقتان لإدراج الصور في مستنداتك:

{% roboWikiNote {type: 'warning'}%} من المستحسن إدراج الصور باستخدام العلامة المدمجة `<robo-wiki-picture>`، ومع ذلك يمكنك أيضًا استخدام الطريقة القياسية لملفات التخطيط. {% endroboWikiNote %}

`مع تسمية`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", link: '/docs/overview', caption: "استكشف"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`أو بدون تسمية`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki",```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"استكشاف ويكي روبونوميكس"} %}{% endroboWikiPicture %} {% endraw %}
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
| `src`     | `String`  | `true`   |         | مسار الصورة:  <br/> - إذا قمت بتحميل الصورة مباشرة إلى `/src/assets/images/docs/` استخدم: `url-of-your-doc` <br/> - إذا قمت بتحميل الصورة في أحد المجلدات، استخدم: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | محاذاة العناصر على محور الكتلة:   <br/> - الخيارات: `start, center, end`                                                                                                                                               |
````caption` | `String`  | `false`  |         | محاذاة العناصر على المحور الأفقي:  <br/> - الخيارات: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | يوفر معلومات بديلة لصورة إذا لم يتمكن المستخدم لأي سبب من رؤيتها                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | تكبير الصورة                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | هناك خياران: lazy و eager                                                                                                                                                                                |

### ملاحظات وتحذيرات
يمكنك إضافة ملاحظات وتحديد أنواع معينة لها:
* تحذير (<span style="color:#f08432">**مع صورة**</span>)
* جيد (<span style="color:#3eaf7c">**لون أخضر**</span>)
* ملاحظة (<span style="color:#90a4b7">**لون رمادي**</span>)

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

`ملاحظة مع عنوان ومحتوى`

```c
{% raw %} {% roboWikiNote {title: "TITLE", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "انضم إلى ديسكورد", type: "okay"}%} [انضم إلى ديسكورد مطوري Robonomics](https://discord.gg/jTxqGeF5Qy) للتواصل مع المجتمع والحصول على الدعم الفني. {% endroboWikiNote %}

{% roboWikiNote {title: "انضم إلى ديسكورد"}%} [انضم إلى ديسكورد مطوري Robonomics](https://discord.gg/jTxqGeF5Qy) للتواصل مع المجتمع والحصول على الدعم الفني. {% endroboWikiNote %}

{% roboWikiNote {title: "انضم إلى ديسكورد", type: "warning"}%} [انضم إلى ديسكورد مطوري Robonomics](https://discord.gg/jTxqGeF5Qy) للتواصل مع المجتمع والحصول على الدعم الفني. {% endroboWikiNote %}

**خصائص لملاحظة ويكي روبو**

| الخاصية | النوع     | مطلوب | الافتراضي | الوصف                                                 |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `سلسلة` | `خطأ`  |         | - هناك ثلاثة أنواع بالكلي: `ملاحظة`, `تحذير`, `جيد` |
| `title`  | `سلسلة``|`false`|         | يضيف عنوانًا إلى ملاحظتك                                     |


### علامات تبويب
يمكنك إضافة علامات تبويب إلى المستند:

- استخدم مكون تغليف العلامات التبويب:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- ثم استخدم قطع تبويب داخل المكون الرئيسي بقدر ما تريد:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`علامات تبويب أفقية`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`علامات تبويب رأسية`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],```yaml
mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`tab item with border`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**خصائص لـ robo-wiki-tabs (المحيط)**

| الخاصية | النوع     | مطلوب   | الافتراضي    | الوصف                                                       |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - مصفوفة بعناوين لكل علامة                                  |
| `mode`   | `String` | `false`  | horizontal | يمكنك اختيار وضع علامات: <br/> - `horizontal` <br/> - `vertical` |

**خصائص لـ robo-wiki-tab (العنصر)**

| الخاصية | النوع      | مطلوب | الافتراضي | الوصف                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | ``false` | - إضافة حدود للمحتوى الخارجي |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### عنوان مع مراسي
يمكنك إنشاء عناوين مخصصة مع مراسي وإعطائها قيمة معينة

`عنوان مع مرساة`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

أو `عنوان بدون مرساة`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (عنوان مخصص) {% endroboWikiTitle %}%}

<br/>

**خصائص لعنوان ويكي الروبوت**

| الخاصية | النوع                   | مطلوبة | الافتراضي | الوصف          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Number (من 2 إلى 6)` | `true`   |         | اختر مستوى العنوان |
| `anchor` | `String`               | `false`  |         | قيمة للرابط |

### الفيديوهات

هناك طريقتان لإدراج الفيديوهات في مستنداتك:

{% roboWikiNote {type: "warning"}%} من المستحسن إدراج الفيديوهات باستخدام العلامة المدمجة `<robo-wiki-video>`، ومع ذلك يمكنك أيضًا استخدام الطريقة القياسية لملفات التحرير بتنسيق Markdown. {% endroboWikiNote %}

#### IPFS / الخادم
تحتاج إلى تحديد تنسيق الفيديو

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"حول البوابات"}%} يتم اختيار البوابة للرابط تلقائيًا من ملف التكوين - `src/_data/video_config.js`. يمكنك إضافة بوابات أو إزالتها عن طريق تغييرها file. {% endroboWikiNote %}


#### محلي

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### الخصائص

- إذا كنت تقوم بإضافة ملف بحجم أكبر من <span style="color:#af1c1c">10 ميغابايت</span>، يرجى تحميله على الخادم، وليس في المستودع.

- يمكنك استخدام أي خصائص لـ [علامة الفيديو HTML5](https://www.w3schools.com/tags/tag_video.asp).

- الصيغ المقبولة - mp4، webm، ogg.

| الخاصية | النوع | مطلوب | الافتراضي | الوصف |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | مصفوفة من الكائنات [{src: `مسار الفيديو`, type: `نوع الفيديو`}] |


#### يوتيوب
يمكنك تضمين أي فيديو من يوتيوب في المستند عن طريق إدراج رابط المشاركة كفقرة منفصلة دون أي اقتباسات أو علامات إضافية، على سبيل المثال: `https://youtu.be/kQaSwNYHJQ8`

ومع ذلك، إذا كنت بحاجة إلى تشغيل تلقائي يجب عليك استخدام مكون خاص:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%```yaml
endroboWikiYoutube %}{% endraw %}
```

**خصائص لروبو-ويكي-يوتيوب**

| الخاصية | النوع | مطلوبة | الافتراضي | الوصف |
|---|---|---|---|---|
| `link` | `String` | `true` |  | رابط الفيديو على يوتيوب |
| `autoplay` | `Boolean` | `false` | `false` | تشغيل تلقائي للفيديو على يوتيوب |
| `loop` | `Boolean` | `false` | `false` | تكرار تشغيل الفيديو على يوتيوب |


## كيفية تحرير شريط التنقل الجانبي

إذا كنت بحاجة إلى تحرير شريط التنقل الجانبي في ويكي روبونوميكس، يرجى اتباع هذه الخطوات:

* قم بتحرير الملف `src/_data/sidebar_docs.json`.

* قرر أين تريد وضع مستندك

* استخدم JSON صالح لـ `src/_data/sidebar_docs.json` واعتمد على هيكل الملف الحالي

* **ملاحظة مهمة:** إذا كنت تستخدم نفس المستند في أقسام/فرعيات مختلفة مثل:

```

{
	"title": "ترقية نظام Home Assistant",
	"children": [
	{
		"title": "تنشيط الاشتراك",
		"url": "/docs/sub-activate",
	}],
	"title": "ترقية Home Assistant Docker لأنظمة تشبه Unix",
		"children": [
	{
		"title": "تنشيط الاشتراك",
		"url": "/docs/sub-activate",
	}],
}

```

تأكد من إضافة معلمة `topic` كما يلي:

(لضمان عمل التنقل بشكل صحيح)```
{
	"title": "ترقية Home Assistant OS",
	"children": [
	{
		"title": "تنشيط الاشتراك",
		"url": "/docs/sub-activate",
		"topic": "ترقية Home Assistant OS"
	}],
	"title": "ترقية Home Assistant Docker لأنظمة تشغيل شبيهة بيونكس",
		"children": [
	{
		"title": "تنشيط الاشتراك",
		"url": "/docs/sub-activate",
		"topic": "ترقية Home Assistant Docker لأنظمة تشغيل شبيهة بيونكس"
	}],
}

```

## كيفية إضافة تنقل مخصص للمستندات

* تحرير الملف `src/_data/sidebar_docs.json`.

* العثور على المستند المناسب وإضافة المعلمات `prev` و `next` مثل هذا:

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

* إذا كنت ترغب في إزالةفقط تنقل بين "الصفحة السابقة" أو "الصفحة التالية" ثم أضف المعلمة "withoutPrev" أو "withoutNext":

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


## كيفية ترجمة مستند

{% roboWikiNote {title: 'مهم', type: 'تحذير'}%} يجب عليك إنشاء ملف **.env** وإضافة متغير *OPENAI_KEY* مع مفتاحك {% endroboWikiNote %}

إذا كنت ترغب في ترجمة مستند md الخاص بك، عليك تشغيل الأمر:

```bash
npm run translate-md
```

بعد تشغيل الأمر، كل ما عليك فعله هو الانتظار وربما التحقق من الملفات (تحتوي الترجمات الذكية على بعض العيوب).

### حل مشكلات الترجمة

قد تواجه بعض المشاكل مع الترجمات.

1. حاول تشغيل الأمر مرة أخرى وانظر ما إذا كانت تعمل.

2. أحيانًا يمكن أن تكتب العلامات في ملفات md بشكل غير صحيح، على سبيل المثال:


```
{%raw %}
	[11ty] 1. Having trouble rendering njk template ./src/de/docs/edit-wiki.md (via TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Line 168, Column 96]
	[11ty]   unknown block tag: endroboWiki (via Template render error)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

ثم، عليك فقط إصلاح الوسم.