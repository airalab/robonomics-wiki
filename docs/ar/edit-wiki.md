---
title: How to Edit Wiki 
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**روبونوميكس ويكي هو مصدر مفتوح. أي تصحيحات مرحب بها: إصلاح الأخطاء والأخطاء الطباعية وبعض المعلومات غير الواضحة أو التي لم تعد صالحة ، والترجمة إلى أي لغة. سوف تحتاج إلى [GitHub](https://github.com/) حساب.**


## كيية التحرير

إذا كنت بحاجة إلى تحرير وثائق روبونوميكس ويكي ، يرجى اتباع هذه الخطوات

تأكد من أن لديك [Node.js](https://nodejs.org/en/download/package-manager/) و [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool) مثبتة.

### 1. استنساخ المستودع

في البداية ، تحتاج إلى استنساخ مستودع الويكي:

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

### 2. تقديم محليًا  (develop, develop-m1)

ثم نشر المشروع محليًا: 

```
gridsome develop
```

> إذا كان لديك خطأ `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS` ، قم بتشغيل الأمر التالي:
```
gridsome develop-m1
```

### 3. إجراء PR

[إجراء طلب سحب](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) إلى [مستودع الويكي](https://github.com/airalab/robonomics-wiki)

## مكونات

### Asciinema
روبونوميكس ويكي لديها دعم لـ Asciinema. لإدراج Asciinema ، يرجى اتباع هذه التعليمات:
* استيراد المكون بعد كتلة frontmatter `import Asciinema from '~/components/Asciinema.vue'`
* إدراج كفقرة منفصلة `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>` ، حيث يكون vid هو معرف asciicast المحدد

> يمكنك الحصول على نص الويدجت لـ asciicast محدد عن طريق النقر على رابط "تضمين" في صفحة asciicast.
> يبدو هذا على النحو التالي:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[وثائق Asciinema](https://asciinema.org/docs/embedding)

في المثال أعلاه ، يكون vid هو 14.

### شفرة

يمكنك إضافة إضافات مفيدة إلى التعليمات البرمجية الخاصة بك:

`شفرة مع زر النسخ`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

أو "رمز مع سطر إضافي".

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**خصائص code-helper**

<probs-table :items="[{ id: 0, items: [{ name: 'copy', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add a copy button for your code'}]}, { id: 1, items: [{ name: 'additional line', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `additional line for you code that will be displayed above`}]}]" />

<code-helper copy>

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>

<code-helper copy additionalLine="your@helper">

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>


### Frontmatter
تحتوي وثائق في روبونوميكس ويكي على كتلة frontmatter. يجب أن تكون في الجزء العلوي من ملف Markdown ، ويجب أن تأخذ شكل YAML صالح محاط بخطوط متعددة. بين الخطوط المتعددة ، يمكنك تعيين أو تحرير الخيارات التالية:

```YAML
---
title: How to contribute # عنوان الصفحة ، لا حاجة لتكراره في النص
contributors: [positivecrash] # المساهمون الرئيسيون (الذين يديرون هذه الصفحة بنشاط). مطلوب اسم المستخدم في GitHub ، بدون أي رموز إضافية
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/تثبيتation
    # الأدوات التي تم استخدامها لاختبار التكنولوجيا
---
```

### Grid 
يساعد في إضافة تخطيط الشبكة إلى العناصر:

- استخدم مكون تغليف الشبكة أولاً: 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- ثم استخدم قدر الاحتياج مكونات عناصر الشبكة داخل العناصر المغلفة:

```c
  <robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_6.png" /> 
      <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
      <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
    </robo-wiki-grid-element/>
  </robo-wiki-grid-element-wrapper>
```

**خصائص robo-wiki-grid-element-wrapper**

<probs-table :items="[{ id: 0, items: [{ name: 'columns', code: true}, {name: 'Number', code: true}, {name: false, code: true}, {name: 4, code: true}, {name: [{text: 'you can choose column number:'}, {text: `from`, codeText: ' 1 to 5'}]}]}, { id: 1, items: [{ name: 'align', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the block axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 2, items: [{ name: 'justify', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the inline axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 3, items: [{ name: 'textAlign', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'left', code: true}, {name: [{text: 'align text inside grid'}, {text: `options:`, codeText: 'left, center, right'}]}]}, ]" />


<robo-wiki-grid-element-wrapper textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_1.png" /> 
    <p><a href="https://www.home-assistant.io/">Home Assistant</a> as control system software</p> 
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_2.png" /> 
    <p>Raspberry Pi 4 (at least 2 GB RAM)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_3.png" /> 
    <p>SD card (minimum 16 GB)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_4.png" /> 
    <p>SD adapter</p>
  </robo-wiki-grid-element>
</robo-wiki-grid-element-wrapper>

<robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_5.png" />
    <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_6.png" /> 
    <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
    <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
  </robo-wiki-grid-element/>
</robo-wiki-grid-element-wrapper>


### الصور

#### كيفية تحميل 
تحميل اصورة في المجلد `/docs/images/url-of-your-doc`
* إذا كانت الصورة بحاجة إلى توطين ، فأدخلها جميعًا في مجلد واحد
* استخدم ملحق اللغة في اسم الصور إذا كانت مترجمة ، على سبيل المثال `image_en.jpg`
* تأكد من أن الصورة الخاصة بك محسنة للويب وفي نفس الوقت تبدو جيدة

#### كيفية إدراج 

هناك طريقتان لإدراج الصور في وثائقك:

<robo-wiki-note type="warning">

من المستحسن إدراج الصور باستخدام العلامة المدمجة `<robo-wiki-picture>` ، ومع ذلك يمكنك أيضًا استخدام الطريقة القياسية لملفات Markdown.

</robo-wiki-note>

`مع تسمية`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`أو بدون تسمية` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`أو صورة بسيطة` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`أو صورة بسيطة مع تسمية`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`صورة مع alt`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**خصائص robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### ملاحظات وتحذيرات
يمكنك إضافة ملاحظات وإعطائها أنواعًا محددة:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`ملاحظة بعنوان`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`ملاحظة بمحتوى`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`ملاحظة بعنوان ومحتوى`

```c
<robo-wiki-note type="okay" title="Robonomics for you">
  Fascinating information about robonomics here only
</robo-wiki-note>
```

<robo-wiki-note type="okay" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="note" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="warning" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

**خصائص robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
يمكنك إضافة علامات تبويب إلى الوثيقة:

- استخدم مكون تغليف علامات التبويب: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- ثم استخد قدر الاحتياج مكونات عناصر التبويب داخل العناصر المغلفة:

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```


`علامات تبويب أفقية`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`علامات تبويب عمودية`

```c
  <robo-wiki-tabs mode="vertical">
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      <pre>ifconfig</pre>
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`عنصر تبويب بحدود`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX" border>
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

**خصائص robo-wiki-tabs (المغلف)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**خصائص robo-wiki-tab (العنصر)**

<probs-table :items="[{ id: 0, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'title for the tab'}]}, { id: 1, items: [{ name: 'border', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add border to the content wrapper'}]}]" />


<robo-wiki-tabs>
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX" border >
      ifconfig 
  </robo-wiki-tab>
</robo-wiki-tabs>


<robo-wiki-tabs mode="vertical">
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX">
    <pre>ifconfig</pre>
  </robo-wiki-tab>
</robo-wiki-tabs>


### عنوان مع الأشارات
يمكنك إنشاء عناوين مخصصة مع الأشارات وإعطائها قيمة معينة

`عنوان مع الأشارة`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

or

`title without anchor`

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**خصائص robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### مقاطع الفيديو

هناك طريقتان لإدراج مقاطع الفيديو في وثائقك:

<robo-wiki-note type="warning">

من المستحسن إدراج مقاطع الفيديو باستخدام العلامة المدمجة `<robo-wiki-video>` ، ومع ذلك يمكنك أيضًا استخدام الطريقة القياسية لملفات Markdown.

</robo-wiki-note>

#### IPFS / Server
تحتاج إلى تحديد تنسيق الفيديو

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'https://cloudflare-ipfs.com/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### خصائص

- إذا كنت تضيف ملفًا بحجم أكبر من <span style="color:#af1c1c">10MB</span>, من فضلك قم برفعه على السيرفر وليس على الريبو.

- يمكنك استخدام أي خصائص لـ [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- التنسيقات المقبولة - mp4 و webm و ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
يمكنك تضمين أي فيديو YouTube في الوثيقة عن طريق إدراج رابط المشاركة كفقرة منفصلة بدون أي علامات أو علامات إضافية ، على سبيل المثال: `https://youtu.be/kQaSwNYHJQ8`

ومع ذلك، إذا كنت بحاجة إلى التشغيل التلقائي، فيجب عليك استخدام مكون خاص:

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**خصائص robo-wiki-youtube**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## كيفية تحرير تنقل الشريط الجانبي

إذا كنت بحاجة إلى تحرير تنقل الشريط الجانبي لروبونوميكس ويكي ، يرجى اتباع هذه الخطوات:

* تحرير الملف `/data/sidebar_docs.yaml`.

* قرر أين تضع الوثيقة الخاصة بك

* استخدم YAML صالح لـ `/data/sidebar_docs.yaml` واعتمد على هيكل الملف الحالي

* **ملاحظة مهمة:** إذا كنت تستخدم نفس الوثيقة في أقسام / فرع فرعي مختلفة مثل: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: صورة مثبتة مسبقًا لجهاز Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

تأكد من إضافة معلمة `topic` مثل هذا: 

(for navigation to work properly) 

```
    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Upgrade Home Assistant OS
    - title_en: Pre-installed Image For Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Pre-installed Image For Raspberry Pi

```

## كيفية إضافة التنقل المخصص للمستندات

* تعديل الملف `/data/sidebar_docs.yaml`.

* ابحث عن المستند الصحيح وأضف المعلمات "next" و"prev" مثل هذا:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      prev: 
        - title: title of the previous page
          link: /docs/prev_page_url
      next: 
        - title: title of the next page
          link: /docs/next_page_url

```

* إذا كنت ترغب في إزالة التنقل بالكامل ، فأضف معلمة `withoutNav`:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* إذا كنت ترغب في إزالة التنقل فقط لـ `الصفحة السابقة` أو `الصفحة التالية` ، فأضف معلمة `withoutPrev` أو `withoutNext`:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

or

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```