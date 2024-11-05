---
title: Как редактировать вики
contributors: [positivecrash]
description: Способы помочь нам улучшить нашу вики
---

**Вики Robonomics является открытым исходным кодом. Любые исправления приветствуются: исправление ошибок, опечаток, некоторой неясной или устаревшей информации, перевод на любой язык. Вам понадобится учетная запись [GitHub](https://github.com/).**


## Как редактировать

Если вам нужно отредактировать документы вики Robonomics, пожалуйста, следуйте этим шагам

Убедитесь, что у вас установлен [Node.js](https://nodejs.org/en/download/package-manager/).

### 1. Клонировать репозиторий

Сначала вам нужно клонировать репозиторий вики:

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

### 2. Запустить локально (develop, develop-m1)

`версия node должна быть 20 || >=22`

Затем разверните проект локально:

```
npm run start
```

> может потребоваться создать файл .env с теми же переменными, что и в файле .env.example

### 3. Создать PR

[Создать запрос на включение изменений](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) в [wiki-репозиторий](https://github.com/airalab/robonomics-wiki)

## Компоненты

{% roboWikiNote {title:"Пользовательские компоненты", type: "warning"}%} **Совет** при добавлении пользовательских компонентов:
Если после добавления компонента что-то не так с макетом, вам может потребоваться проверить пробелы. Это должно помочь **УДАЛИТЬ** пробелы после открывающего и закрывающего тегов (как в примере ниже){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"тест", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Код

Вы можете добавить полезные дополнения к своему коду:

`код с кнопкой копирования`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

некоторый текст кода
	еще одна тестовая строка
		что-то еще

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

или `код с дополнительной строкой`

```bash
{% raw %}{% codeHelper { additionalLine: "дополнительная строка"}%}{% endraw %}

некоторый текст кода
	еще одна тестовая строка
		что-то еще

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Свойства для помощника по коду**

| Свойство         | Тип| Required | Default  | Description                                               |
|------------------|-----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | добавить кнопку копирования для вашего кода               |
| `additionalLine` | `String`  | `false`  | ''       | дополнительная строка для вашего кода, которая будет отображаться выше |


{% codeHelper { additionalLine: "дополнительная строка", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}


### Frontmatter
Документация в вики Robonomics содержит блок frontmatter. Он должен находиться в верхней части файла Markdown и должен иметь форму допустимого YAML, заключенного между тремя тире. Между тремя тире вы можете установить или отредактировать следующие параметры:

```YAML
---
title: Как внести вклад # Заголовок страницы, в тексте его дублировать не нужно
contributors: [positivecrash] # Основные участники (активно курирующие эту страницу). Требуется ник GitHub, без дополнительных символов
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # Инструменты, которые использовались для тестирования технологий
---
```

### Сетка
Помогает добавить сеточную компоновку к элементам:

- Сначала используйте компонент обертки сетки:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Затем используйте столько компонентов элементов сетки, сколько вам нужно внутри обертки:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} первый элемент {% endroboWikiGrid %}
	{% roboWikiGrid %} второй элемент {% endroboWikiGrid %}
	{% roboWikiGrid %} третий элемент {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**Свойства для robo-wiki-grid-wrapper**

| Свойство    | Тип      | Обязательно | По умолчанию | Описание                                                               |
|-------------|----------|-------------|--------------|-------------------------------------------------------------------------|
| `columns`   | `Number` | `false`     | 4            | вы можете выбрать количество столбцов:   <br/> - от `1 до 5`            |
| `align`     | `String` | `false`     |              | выравнивание элементов по оси блока:   <br/> - варианты: `start, center, end` |
| `justify`   | `String` | `false`     |         | выравнивание элементов по встроенной оси:  <br/> - варианты: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | выравнивание текста внутри сетки:  <br/> - варианты: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (по крайней мере 2 ГБ ОЗУ)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-карта 16 Гб</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Адаптер Zigbee (по желанию) </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Умные устройства Zigbee (по желанию) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Настольный компьютер для настройки</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Изображения

#### Как загрузить
Загрузите изображение в папку `src/assets/docs/images/url-of-your-doc`
* Если изображение должно быть локализовано, поместите их все в одну папку
* Используйте локализационное приложение в названии изображений, если оно локализовано, например, `image_en.jpg`
* Убедитесь, что ваше изображение оптимизировано для веба и в то же время выглядит хорошо

#### Как вставить

Существуют два способа вставки изображений в ваши документы:

{% roboWikiNote {type: 'warning'}%} Рекомендуется вставлять изображения с встроенным тегом `<robo-wiki`-изображение>`, однако вы также можете использовать стандартный способ для файлов Markdown. {% endroboWikiNote %}

`с подписью`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"исследуйте вики робономики", link: '/docs/overview', caption: "ИССЛЕДОВАТЬ"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`или без подписи`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"исследуйте вики робономики", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`или простое изображение`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"исследуйте вики робономики"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`или простое изображение с подписью`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"исследуйте вики робономики", caption: "ИССЛЕДОВАТЬ"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Свойства для robo-wiki-picture:**

| Свойство  | Тип      | Обязательно | По умолчанию | Описание                                                                                                                                                                                                          |
|-----------|-----------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | путь к изображению:  <br/> - если вы загрузили изображение напрямую в `/src/assets/images/docs/`, используйте: `url-of-your-doc` <br/> - если вы загрузили изображение в одну из папок, используйте: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | выравнивание элементов по блочной оси:   <br/> - варианты: `start, center, end`                                                                                                                                      |
| `caption` | `String`  | `false`  |         | выравнивание элементов по инлайновой оси:  <br/> - варианты: `start, center, end`                                                                                                                                    |
| `alt`     | `String`  | `true`   | picture | предоставляет альтернативную информацию для изображения, если пользователь по какой-то причине не может его просмотреть                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | увеличение изображения                                                                                                                                  |
| `loading` | `String`  | `false`  | lazy    | есть два варианта: lazy и eager                                                                                                                        |

### Примечания и предупреждения
Вы можете добавлять примечания и указывать им конкретные типы:
* предупреждение (<span style="color:#f08432">**с изображением**</span>)
* окей (<span style="color:#3eaf7c">**зеленый цвет**</span>)
* примечание (<span style="color:#90a4b7">**серый цвет**</span>)

`примечание с заголовком`

```c
{% raw %} {% roboWikiNote {title:"ЗАГОЛОВОК ПРИМЕРА", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`примечание с содержанием`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`примечание с заголовком и содержанием`

```c
{% raw %} {% roboWikiNote {title: "ЗАГОЛОВОК", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Присоединяйтесь к Discord", type: "okay"}%} [Присоединяйтесь к Discord разработчиков Robonomics](https://discord.gg/jTxqGeF5Qy), чтобы связаться с сообществом и получить техническую поддержку. {% endroboWikiNote %}

{% roboWikiNote {title: "Присоединяйтесь к Discord"}%} [Присоединяйтесь к Discord разработчиков Robonomics](https://discord.gg/jTxqGeF5Qy), чтобы связаться с сообществом и получить техническую поддержку. {% endroboWikiNote %}

{% roboWikiNote {title: "Присоединяйтесь к Discord", type: "warning"}%} [Присоединиться к Discord Robonomics Developers](https://discord.gg/jTxqGeF5Qy), чтобы связаться с сообществом и получить техническую поддержку. {% endroboWikiNote %}

**Свойства для robo-wiki-note**

| Свойство | Тип       | Обязательно | По умолчанию | Описание                                                     |
|----------|-----------|-------------|--------------|--------------------------------------------------------------|
| `type`   | `String`  | `false`     |              | - всего три типа: `note`, `warning`, `okay`                   |
| `title`  | `String`  | `false`     |              | добавляет заголовок к вашей заметке                           |


### Вкладки
Вы можете добавить вкладки в документ:

- Используйте компонент обертки вкладок:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Затем используйте столько компонентов элементов вкладок, сколько вам нужно внутри обертки:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %} {% endraw %}
```

<br/>

`горизонтальные вкладки`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`вертикальные вкладки`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`элемент вкладки с границей`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Свойства для robo-wiki-tabs (обертка)**

| Свойство  | Тип      | Обязательное | По умолчанию | Описание                                                       |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `вкладки`   | `Массив`  | `true`   |            | - Массив с заголовками для каждой вкладки                                  |
| `режим`   | `Строка` | `false`  | горизонтальный | вы можете выбрать режим вкладок: <br/> - `горизонтальный` <br/> - `вертикальный` |

**Свойства для robo-wiki-tab (элемент)**

| Свойство | Тип      | Обязательно | По умолчанию | Описание                         |
|----------|-----------|----------|---------|-------------------------------------|
| `граница` | `Булево` | `false`  | `false` | - добавить границу к обертке содержимого |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Заголовок с якорями
Вы можете создавать пользовательские заголовки с якорями и присваивать им определенное значение`заголовок с якорем`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

или `заголовок без якоря`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (пользовательский заголовок) {% endroboWikiTitle %}

<br/>

**Свойства для robo-wiki-title**

| Свойство | Тип                    | Обязательно | По умолчанию | Описание              |
|----------|------------------------|-------------|--------------|-----------------------|
| `type`   | `Число (от 2 до 6)`    | `true`      |              | выберите уровень заголовка |
| `anchor` | `Строка`               | `false`     |              | значение для якоря |

### Видео

Существует два способа вставки видео в ваши документы:

{% roboWikiNote {type: "warning"}%} Рекомендуется вставлять видео с помощью встроенного тега `<robo-wiki-video>`, однако вы также можете использовать стандартный способ для файлов Markdown. {% endroboWikiNote %}

#### IPFS / Сервер
Вам необходимо указать формат видео

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"О шлюзах"}%} Шлюз для ссылки выбирается автоматически из файла конфигурации - `src/_data/video_config.js`. Вы можете добавлять или удалять некоторые шлюзы, изменяя файл. {% endroboWikiNote %}


#### Локальный

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Свойства

- Если вы добавляете файл размером более <span style="color:#af1c1c">10MB</span>, пожалуйста, загрузите его на сервер, а не в репозиторий.

- Вы можете использовать любые свойства для [тега видео HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Допустимые форматы - mp4, webm, ogg.

| Свойство | Тип | Обязательно | По умолчанию | Описание |
|---|---|---|---|---|
| `videos` | `Массив` | `true` |  | Массив объектов [{src: `путь к видео`, type: `тип видео`}] |


#### YouTube
Вы можете вставить любое видео с YouTube в документ, вставив ссылку на видео как отдельный параграф без дополнительных кавычек или тегов, например: `https://youtu.be/kQaSwNYHJQ8`

Однако, если вам нужно включить автовоспроизведение, вам необходимо использовать специальный компонент:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**Свойства для robo-wiki-youtube**

| Свойство | Тип | Обязательно | По умолчанию | Описание |
|---|---|---|---|---|
| `link` | `String` | `true` |  | ссылка на видео на YouTube |
| `autoplay` | `Boolean` | `false` | `false` | автовоспроизведение видео на YouTube |
| `loop` | `Boolean` | `false` | `false` | повтор видео на YouTube |


## Как отредактировать боковую навигацию

Если вам нужно отредактировать боковую навигацию в Robonomics Wiki, пожалуйста, выполните следующие шаги:

* Отредактируйте файл `src/_data/sidebar_docs.json`.

* Решите, куда поместить ваш документ.

* Используйте допустимый JSON для `src/_data/sidebar_docs.json` и полагайтесь насуществующая структура файлов

* Вы должны добавить новые строки в файл перевода `translations/pages/en.json`, если вы не перевели новое содержимое заранее, например:

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **ВАЖНО:** если вы используете тот же документ в разных разделах/подразделах, например:

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

УБЕДИТЕСЬ, ЧТО ДОБАВИЛИ ПАРАМЕТР `topic` ВОТ ТАК:

(для правильной работы навигации)

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

## Как добавить пользовательскую навигацию для документов

* Редактировать файл`src/_data/sidebar_docs.json`.

* Найдите правильный документ и добавьте параметры `prev` и `next` вот так:

```
	{
		"title": "Обзор",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Добавить пользователя",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Добавить пользователя",
				"url": "/docs/add-user"
			}
		],
	},

```

* Если вы хотите полностью удалить навигацию, добавьте параметр `withoutNav`:

```
{
	"title": "Обзор",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Если вы хотите удалить только навигацию `предыдущая страница` или `следующая страница`, добавьте параметр `withoutPrev` или `withoutNext`:

```
{
	"title": "Обзор",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

или

```
{
	"title": "Обзор",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## Как перевести документ

{% roboWikiNote {title: 'Важно', type: 'warning'}%} Необходимо создать **.env** файл и добавьте переменную *OPENAI_KEY* со своим ключом {% endroboWikiNote %}

Если вы хотите перевести свой md-документ, вам нужно выполнить команду:

```bash
npm run translate-md
```

{% roboWikiNote {title: 'Легкий перевод', type: 'warning'}%} Чтобы перевести все сразу, каждую новую строку на страницах, новый документ или измененный документ, вам теперь нужна всего одна команда {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> Также убедитесь, что вы переводите только измененные файлы, которые **нужно** перевести. Например, вам нужно изменить 5 файлов. В трех из них есть изменения текста и удаление устаревшей информации. А в двух других нужно обновить ссылки на некоторые изображения или просто изменить внешнюю ссылку. В этом случае разумно изменить первые три файла, перевести их, а затем изменить ссылки в других двух.

> Перевод происходит для всех измененных файлов, но это не обязательно для обновленных ссылок, особенно если файл большой и поэтому перевод занимает некоторое время.

После выполнения необходимой команды вам нужно просто подождать и, возможно, проверить файлы (переводы ИИ имеют некоторые недочеты). Для проверки файлов запустите `npm run build` и посмотрите, нет ли ошибок.

### Устранение проблем с переводом

Вы можете столкнуться с некоторыми проблемами при переводе.

1. Попробуйте выполнить команду снова и посмотрите, сработает ли она.

2. Иногда тегиВ файлах md могут быть написаны неправильно, например:

```
{%raw %}
	[11ty] 1. Проблема с отображением шаблона njk ./src/de/docs/edit-wiki.md (через TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Строка 168, Столбец 96]
	[11ty]   неизвестный блочный тег: endroboWiki (через ошибку рендеринга шаблона)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

Затем вам просто нужно исправить тег.