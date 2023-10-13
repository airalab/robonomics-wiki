---
title: Як редагувати Wiki
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics Wiki є відкритим джерелом. Ласка, вносьте корективи: виправлення помилок, орфографічних помилок, деякої незрозумілої або застарілої інформації, переклад на будь-яку мову. Вам понадобиться [GitHub](https://github.com/) акаунт.**


## Як редагувати

Якщо вам потрібно редагувати документи Robonomics Wiki, будь ласка, дотримуйтесь цих кроків

Переконайтеся, що у вас є [Node.js](https://nodejs.org/en/download/package-manager/) та [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool) встановлені.

### 1. Клонуйте репозиторій

Спочатку вам потрібно склонувати репозиторій вікі:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Перейдіть до каталогу репозиторію та виконайте наступні команди:

`за допомогою npm`
```
cd robonomics-wiki
npm install 
```

`за допомогою yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Локальне обслуговування (develop, develop-m1)

Потім розгорніть проект локально: 

```
gridsome develop
```

> Якщо ви отримали помилку `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`, виконайте наступну команду:
```
gridsome develop-m1
```

### 3. Створити PR

[Створити запит на злиття](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) до [репозиторію вікі](https://github.com/airalab/robonomics-wiki)

## Компоненти

### Asciinema
Robonomics Wiki підтримує Asciinema. Щоб вставити Asciinema, будь ласка, дотримуйтесь цих інструкцій:
* Імпортуйте компонент після блоку frontmatter `import Asciinema from '~/components/Asciinema.vue'`
* Вставте як окремий абзац `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, де vid - це ID конкретного asciicast

> Ви можете отримати скрипт віджета для певного asciicast, натиснувши на посилання «Embed» на сторінці asciicast.
> Він виглядає так:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Документація Asciinema](https://asciinema.org/docs/embedding)

У вищезазначеному прикладі vid дорівнює 14.

### Код

You can add helpful extras to your code: 

`код з кнопкою копіювання`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

або `код із додатковим рядком`

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**Властивості для code-helper**

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
Документи в Robonomics Wiki містять блок frontmatter. Він повинен бути у верхній частині файлу Markdown і повинен мати форму дійсного YAML, розташованого між потрійними рисками. Між потрійними рисками ви можете встановити або редагувати наступні параметри:

```YAML
---
title: How to contribute # Заголовок сторінки, вам не потрібно дублювати його в тексті
contributors: [positivecrash] # Основні учасники (хто активно курує цю сторінку). Потрібен нікнейм GitHub, без будь-яких додаткових символів
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Встановитиation
    # Інструменти, які використовувалися для тестування технології
---
```

### Grid 
Допомагає додати сіткову компоновку до елементів:

- Спочатку використовуйте компонент обгортки сітки: 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- А потім використовуйте стільки компонентів елементів сітки, скільки вам потрібно всередині обгортки:

```c
  <robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_6.png" /> 
      <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
      <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Шлюз</a></p>
    </robo-wiki-grid-element/>
  </robo-wiki-grid-element-wrapper>
```

**Властивості для robo-wiki-grid-element-wrapper**

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


### Зображення

#### Як завантажити 
Завантажте зображення в папку `/docs/images/url-of-your-doc`
* Якщо зображення потрібно локалізувати, вставте їх всі в одну папку
* Використовуйте додаток локалізації в назві зображень, якщо воно локалізоване, наприклад, `image_en.jpg`
* Переконайтеся, що ваше зображення оптимізоване для вебу і водночас виглядає добре

#### Як вставити 

Є два способи вставити зображення в ваші документи:

<robo-wiki-note type="warning">

Рекомендується вставляти зображення з вбудованим тегом `<robo-wiki-picture>`, але ви також можете використовувати стандартний спосіб для файлів Markdown.

</robo-wiki-note>

`з підписом`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`або без підпису` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`або просте зображення` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`або просте зображення з підписом`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`зображення з альтернативним текстом`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**Властивості для robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### Примітки та попередження
Ви можете додавати примітки та надавати їм певні типи:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`примітка з заголовком`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`примітка з вмістом`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`примітка з заголовком та вмістом`

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

**Властивості для robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
Ви можете додавати вкладки до документа:

- Використовуйте компонент обгортки вкладок: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- А потім використовуйте стільки компонентів елементів вкладок, скільки вам потрібно всередині обгортки:

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


`горизонтальні вкладки`

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

`вертикальні вкладки`

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

`елемент вкладки з межею`

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

**Властивості для robo-wiki-tabs (обгортка)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**Властивості для robo-wiki-tab (елемент)**

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


### Заголовок з якорями
Ви можете створювати власні заголовки з якорями та надавати їм певне значення

`заголовок з якорем`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

або

`заголовок без прив'язки`

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**Властивості для robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### Відео

Є два способи вставити відео в ваші документи:

<robo-wiki-note type="warning">

Рекомендується вставляти відео з вбудованим тегом `<robo-wiki-video>`, але ви також можете використовувати стандартний спосіб для файлів Markdown.

</robo-wiki-note>

#### IPFS / Server
Вам потрібно вказати формат відео

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'https://cloudflare-ipfs.com/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### Властивості

- Якщо ви додаєте файл розміром більше <span style="color:#af1c1c">10MB</span>, будь ласка, завантажте його на сервер, а не в репо.

- Ви можете використовувати будь-які властивості для [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- Припустимі формати - mp4, webm, ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
Ви можете вставити будь-яке відео з YouTube в документ, вставивши посилання на спільний доступ як окремий абзац без будь-яких додаткових лапок або тегів, наприклад: `https://youtu.be/kQaSwNYHJQ8`

Однак, якщо вам потрібен автовідтворення, ви повинні використовувати спеціальний компонент:

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**Властивості для robo-wiki-youtube**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## Як редагувати бічну навігацію

Якщо вам потрібно відредагувати бічну навігацію Robonomics Wiki, будь ласка, дотримуйтесь цих кроків:

* Редагуйте файл `/data/sidebar_docs.yaml`.

* Вирішіть, куди помістити свій документ

* Використовуйте правильний YAML для `/data/sidebar_docs.yaml` та спирайтеся на існуючу структуру файлу

* **ВАЖЛИВА ЗАМІТКА:** якщо ви використовуєте той самий документ у різних розділах/підрозділах, наприклад: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Попередньо встановлене зображення для Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

ПЕРЕКОНАЙТЕСЯ, ЩО ДОДАЛИ ПАРАМЕТР `topic` ТАКОЮ ОСЬ ФОРМОЮ: 

(для правильної роботи навігації)

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

## Як додати спеціальну навігацію для документів

* Відредагуйте файл `/data/sidebar_docs.yaml`.

* Знайдіть потрібний документ і додайте параметри `prev` і `next` так:

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

* Якщо ви хочете повністю видалити навігацію, додайте параметр `withoutNav`:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* Якщо ви хочете видалити лише навігацію `попередня сторінка` або `наступна сторінка`, додайте параметр `withoutPrev` або `withoutNext`:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

або

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```