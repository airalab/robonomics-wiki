---
title: Как редактировать Wiki 
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics Wiki является открытым исходным кодом. Любые исправления приветствуются: исправление ошибок, опечаток, некоторой неясной или устаревшей информации, перевод на любой язык. Вам понадобится учетная запись [GitHub](https://github.com/).**


## Как редактировать

Если вам нужно отредактировать документацию Robonomics Wiki, пожалуйста, следуйте этим шагам

Убедитесь, что у вас установлены [Node.js](https://nodejs.org/en/download/package-manager/) и [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool).

### 1. Клонировать репозиторий

Сначала вам нужно склонировать репозиторий вики:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Перейдите в каталог репозитория и выполните следующие команды:

`используя npm`
```
cd robonomics-wiki
npm install 
```

`используя yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Локальное развертывание (develop, develop-m1)

Затем разверните проект локально: 

```
gridsome develop
```

> Если у вас возникла ошибка `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`, выполните следующую команду:
```
gridsome develop-m1
```

### 3. Создать запрос на включение изменений

[Создайте запрос на включение изменений](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) в [репозиторий вики](https://github.com/airalab/robonomics-wiki)

## Компоненты

### Asciinema
Robonomics Wiki поддерживает Asciinema. Чтобы вставить Asciinema, пожалуйста, следуйте этим инструкциям:
* Импортируйте компонент после блока frontmatter `import Asciinema from '~/components/Asciinema.vue'`
* Вставьте в отдельный параграф `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, где vid - это идентификатор конкретного asciicast

> Вы можете получить скрипт виджета для конкретного asciicast, нажав на ссылку «Embed» на странице asciicast.
> Это выглядит так:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Asciinema docs](https://asciinema.org/docs/embedding)

В приведенном выше примере vid равно 14.

### Код

Вы можете добавить полезные дополнения к своему коду: 

`код с кнопкой копирования`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

или `код с дополнительной строкой`

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**Свойства для code-helper**

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
Документация в Robonomics Wiki содержит блок frontmatter. Он должен находиться в верхней части файла Markdown и должен иметь форму допустимого YAML, заключенного между тремя черточками. Между тремя черточками вы можете установить или изменить следующие параметры:

```YAML
---
title: How to contribute # Заголовок страницы, вам не нужно дублировать его в тексте
contributors: [positivecrash] # Основные участники (кто активно курирует эту страницу). Требуется никнейм GitHub, без каких-либо дополнительных символов
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Установка
    # Инструменты, которые использовались для тестирования технологии
---
```

### Grid 
Помогает добавить сетку к элементам:

- Сначала используйте обертку компонента сетки: 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- А затем используйте внутри оболочки столько компонентов элементов сетки, сколько захотите:

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

**Свойства для обертки robo-wiki-grid-element-wrapper**

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


### Изображения

#### Как загрузить 
Загрузите изображение в папку `/docs/images/url-of-your-doc`
* Если изображение должно быть локализовано, вставьте все изображения в одну папку
* Используйте локализационное приложение в имени изображений, если оно локализовано, например, `image_en.jpg`
* Убедитесь, что ваше изображение оптимизировано для веба и в то же время выглядит хорошо

#### Как вставить 

Есть два способа вставить изображения в ваши документы:

<robo-wiki-note type="warning">

Рекомендуется вставлять изображения с помощью встроенного тега `<robo-wiki-picture>`, однако вы также можете использовать стандартный способ для файлов Markdown.

</robo-wiki-note>

`с подписью`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`или без подписи` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`или простое изображение` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`или простое изображение с подписью`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`изображение с альтернативным текстом`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**Свойства для robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### Примечания и предупреждения
Вы можете добавлять примечания и указывать им определенные типы:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`примечание с заголовком`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`примечание с содержимым`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`примечание с заголовком и содержимым`

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

**Свойства для robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
Вы можете добавлять tabs в документ:

- Используйте обертку компонента tabs: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- А затем используйте столько компонентов tab элементов, сколько вам нужно внутри обертки:

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


`горизонтальные tabs`

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

`вертикальные tabs`

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

`tab элемент с границей`

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

**Свойства для robo-wiki-tabs (обертка)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**Свойства для robo-wiki-tab (элемент)**

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


### Заголовок с якорями
Вы можете создавать пользовательские заголовки с якорями и присваивать им определенное значение

`заголовок с якорем`

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

**Свойства для robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### Видео

Есть два способа вставить видео в ваши документы:

<robo-wiki-note type="warning">

Рекомендуется вставлять видео с помощью встроенного тега `<robo-wiki-video>`, однако вы также можете использовать стандартный способ для файлов Markdown.

</robo-wiki-note>

#### IPFS / Сервер
Вам нужно указать формат видео

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'https://cloudflare-ipfs.com/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### Свойства

- Если вы добавляете файл размером более <span style="color:#af1c1c">10 МБ</span>, пожалуйста, загружайте его на сервер, а не в репозиторий.

- Вы можете использовать любые свойства для [тега видео HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Допустимые форматы - mp4, webm, ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
Вы можете вставить любое видео YouTube в документ, вставив ссылку на обмен в качестве отдельного абзаца без дополнительных кавычек или тегов, например: `https://youtu.be/kQaSwNYHJQ8`

Однако, если вам нужно автоматическое воспроизведение, вам необходимо использовать специальный компонент: 

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**Свойства для robo-wiki-youtube**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## Как редактировать sidebar navigation

Если вам нужно отредактировать боковую навигацию в Robonomics Wiki, пожалуйста, выполните следующие шаги:

* Отредактируйте файл `/data/sidebar_docs.yaml`.

* Решите, где разместить свой документ

* Используйте допустимый YAML для `/data/sidebar_docs.yaml` и полагайтесь на существующую структуру файла

* **ВАЖНОЕ ЗАМЕЧАНИЕ:** если вы используете один и тот же документ в разных разделах/подразделах, например: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Предустановленный образ для Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

УБЕДИТЕСЬ, ЧТО ДОБАВИЛИ ПАРАМЕТР `topic` ВОТ ТАК: 

(для правильной работы навигации) 

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

## Как добавить пользовательскую навигацию для документов 

* Отредактируйте файл `/data/sidebar_docs.yaml`.

* Найдите нужный документ и добавьте параметры `prev` и `next`, например:

```
    - title_en: Как редактировать Wiki
      link: /docs/edit-wiki
      prev: 
        - title: title of the previous page
          link: /docs/prev_page_url
      next: 
        - title: title of the next page
          link: /docs/next_page_url

```

* Если вы хотите полностью удалить навигацию, добавьте параметр `withoutNav`:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* Если вы хотите удалить только навигацию `previous page` или `next page`, добавьте параметр `withoutPrev` или `withoutNext`:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

или

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```