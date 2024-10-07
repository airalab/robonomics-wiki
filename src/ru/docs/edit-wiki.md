---
title: Как редактировать вики
contributors: [positivecrash]
description: Способы помочь нам улучшить нашу вики
---

**Вики Robonomics является открытым исходным кодом. Любые исправления приветствуются: исправление ошибок, опечаток, некоторой неясной или устаревшей информации, перевод на любой язык. Вам понадобится учетная запись [GitHub](https://github.com/).**


## Как редактировать

Если вам нужно отредактировать документы вики Robonomics, пожалуйста, следуйте этим шагам

Убедитесь, что у вас установлены [Node.js](https://nodejs.org/en/download/package-manager/)

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

### 2. Запустить локально (develop, develop-m1)

`node должен быть v20 || >=22`

Затем разверните проект локально:

```
npm run start
```

### 3. Создать PR

[Создать запрос на включение изменений](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)в [репозиторий вики](https://github.com/airalab/robonomics-wiki)

## Компоненты

{% roboWikiNote {title:"Пользовательские компоненты", type: "warning"}%} **Совет** при добавлении пользовательских компонентов:
Если после добавления компонента что-то не так с макетом, вам может потребоваться проверить пробелы. Это должно помочь **УДАЛИТЬ** пробелы после открывающего и закрывающего тегов (как в примере ниже){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}

### Код

Вы можете добавить полезные дополнения к своему коду:

`код с кнопкой копирования`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

некоторый текст кода
	еще одна строка теста
		что-то еще

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

или `код с дополнительной строкой`

```bash
{% raw %}{% codeHelper { additionalLine: "дополнительная строка"}%}{% endraw %}

некоторый текст кода
	еще одна строка теста
		что-то еще

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Свойства для помощника по коду**

| Свойство         | Тип       | Обязательно | По умолчанию | Описание                                                  |
|------------------|-----------|-------------|--------------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`     | `false`      | добавить кнопку копирования для вашего кода               |
| `additionalLine` | `String`  | `false`     | ''           | дополнительная строка для вашего кода, которая будет отображаться выше |


{% codeHelper { additionalLine: "дополнительная строка", copy: true}%}

```bash
некоторый текст кода
	еще одна строка теста
		что-то еще
```

{% endcodeHelper %}### Метаданные
Документы в вики Robonomics содержат блок метаданных. Он должен находиться в верхней части файла Markdown и должен иметь форму допустимого YAML, заключенного между тремя тире. Между тремя тире вы можете установить или изменить следующие параметры:

```YAML
---
title: Как внести вклад # Заголовок страницы, в тексте его дублировать не нужно
contributors: [positivecrash] # Основные участники (активно курирующие эту страницу). Требуется никнейм GitHub, без дополнительных символов
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # Инструменты, использованные для тестирования технологии
---
```

### Сетка
Помогает добавить сеточное расположение элементов:

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
{% endroboWikiGridWrapper %}{% endraw %}
```

<br/>

**Свойства для обертки robo-wiki-grid-wrapper**

| Свойство    | Тип      | Обязательно | По умолчанию | Описание                                                               |
|-------------|----------|-------------|--------------|-------------------------------------------------------------------------|
| `columns`   | `Number` | `false`     | 4            | можно выбрать количество столбцов:   <br/> - от `1 до 5`                 |
| `align`     | `String` | `false`     |              | выравнивание элементов по оси блока:   <br/> - варианты: `start, center, end` |
| `justify`   | `String` | `false`     |              | выравнивание элементов по оси в линию:  <br/> - варианты: `start, center, end` |
| `textAlign` | `String` | `false`     | `left`       | выравнивание текста внутри сетки:  <br/> - варианты: `left, center, right` |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (как минимум 2 ГБ ОЗУ)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-карта 16 ГБ</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Адаптер Zigbee (по желанию) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Умные устройства Zigbee (по желанию) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Рабочий стол для настройки</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Изображения

#### Как загрузить
Загрузите изображение в папку `src/assets/docs/images/url-of-your-doc`
* Если изображение нужно локализовать, поместите их все в одну папку
* Используйте локализацию в названии изображений, если они локализованы, например, `image_en.jpg`
* Убедитесь, что ваше изображение оптимизировано для веба и в то же время выглядит хорошо

#### Как вставить

Существуют два способа вставки изображений в ваши документы:

{% roboWikiNote {type: 'warning'}%} Рекомендуется вставлять изображения с встроенным тегом `<robo-wiki-picture>`, однако вы также можете использовать стандартный способ для файлов Markdown. {% endroboWikiNote %}

`с подписью`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", link: '/docs/overview', caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`или без подписи`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki",ссылка: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`или простое изображение`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`или простое изображение с подписью`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Свойства для robo-wiki-picture:**

| Свойство  | Тип       | Обязательно | По умолчанию | Описание                                                                                                                                                                                                          |
|-----------|-----------|-------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`      |              | путь к изображению:  <br/> - если вы загрузили изображение непосредственно в `/src/assets/images/docs/`, используйте: `url-of-your-doc` <br/> - если вы загрузили изображение в одну из папок, используйте: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`     |              | выравнивание элементов по оси блока:   <br/> - варианты: `start, center, end`                                                                                                                                      |`caption` | `String`  | `false`  |         | выравнивание элементов по встроенной оси:  <br/> - варианты: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | предоставляет альтернативную информацию для изображения, если по какой-то причине пользователь не может его просмотреть                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | увеличение изображения                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | есть два варианта: lazy и eager                                                                                                                                                                                |

### Примечания и предупреждения
Вы можете добавлять примечания и указывать им конкретные типы:
* предупреждение (<span style="color:#f08432">**с изображением**</span>)
* хорошо (<span style="color:#3eaf7c">**зеленый цвет**</span>)
* заметка (<span style="color:#90a4b7">**серый цвет**</span>)

`заметка с заголовком`

```c
{% raw %} {% roboWikiNote {title:"НАЗВАНИЕ ПРИМЕРА", type: "хорошо"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`заметка с содержанием`

```c
{% raw %} {% roboWikiNote {type: "хорошо"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br>/>

`заметка с заголовком и содержанием`

```c
{% raw %} {% roboWikiNote {title: "ЗАГОЛОВОК", type: "хорошо"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Присоединяйтесь к Discord", type: "хорошо"}%} [Присоединяйтесь к Discord разработчиков Robonomics](https://discord.gg/jTxqGeF5Qy), чтобы связаться с сообществом и получить техническую поддержку. {% endroboWikiNote %}

{% roboWikiNote {title: "Присоединяйтесь к Discord"}%} [Присоединяйтесь к Discord разработчиков Robonomics](https://discord.gg/jTxqGeF5Qy), чтобы связаться с сообществом и получить техническую поддержку. {% endroboWikiNote %}

{% roboWikiNote {title: "Присоединяйтесь к Discord", type: "предупреждение"}%} [Присоединяйтесь к Discord разработчиков Robonomics](https://discord.gg/jTxqGeF5Qy), чтобы связаться с сообществом и получить техническую поддержку. {% endroboWikiNote %}

**Свойства для robo-wiki-note**

| Свойство | Тип      | Обязательно | По умолчанию | Описание                                                   |
|----------|----------|-------------|--------------|------------------------------------------------------------|
| `type`   | `String` | `false`      |              | - всего три типа: `note`, `warning`, `okay`                |
| `title`  | `String`` | `false`  |         | добавляет заголовок к вашей заметке                                     |


### Вкладки
Вы можете добавить вкладки в документ:

- Используйте компонент-обертку для вкладок:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Затем используйте столько компонентов вкладок, сколько вам нужно внутри обертки:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
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
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`вкладка с границей`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Свойства для robo-wiki-tabs (обертка)**

| Свойство | Тип      | Обязательно | По умолчанию | Описание                                                       |
|----------|----------|-------------|--------------|---------------------------------------------------------------|
| `tabs`   | `Array`  | `true`      |              | - Массив с заголовками для каждой вкладки                      |
| `mode`   | `String` | `false`     | horizontal   | Вы можете выбрать режим вкладок: <br/> - `horizontal` <br/> - `vertical` |

**Свойства для robo-wiki-tab (элемент)**

| Свойство | Тип       | Обязательно | По умолчанию | Описание                         |
|----------|-----------|-------------|--------------|---------------------------------|
| `border` | `Boolean` | `false`     | `false`      |false` | - добавить границу к обертке контента |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Заголовок с якорями
Вы можете создавать пользовательские заголовки с якорями и присваивать им определенное значение

`заголовок с якорем`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

или `заголовок без якоря`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (пользовательский заголовок) {% endroboWikiTitle %}%}

<br/>

**Свойства для заголовка robo-wiki-title**

| Свойство | Тип                     | Обязательно | По умолчанию | Описание              |
|----------|-------------------------|-------------|--------------|-----------------------|
| `type`   | `Число (от 2 до 6)`     | `true`      |              | выберите уровень заголовка |
| `anchor` | `Строка`                | `false`     |              | значение для якоря     |

### Видео

Существуют два способа вставки видео в ваши документы:

{% roboWikiNote {type: "warning"}%} Рекомендуется вставлять видео с помощью встроенного тега `<robo-wiki-video>`, однако вы также можете использовать стандартный способ для файлов Markdown. {% endroboWikiNote %}

#### IPFS / Сервер
Вам необходимо указать формат видео

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"О шлюзах"}%} Шлюз для ссылки выбирается автоматически из файла конфигурации - `src/_data/video_config.js`. Вы можете добавлять или удалять некоторые шлюзы, изменяяфайл. {% endroboWikiNote %}


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
| `videos` | `Array` | `true` |  | Массив объектов [{src: `путь к видео`, type: `тип видео`}] |


#### YouTube
Вы можете вставить любое видео с YouTube в документ, вставив ссылку на публикацию как отдельный параграф без дополнительных кавычек или тегов, например: `https://youtu.be/kQaSwNYHJQ8`

Однако, если вам нужно автоматическое воспроизведение, вам необходимо использовать специальный компонент:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%```
endroboWikiYoutube %}{% endraw %}
```

**Свойства для robo-wiki-youtube**

| Свойство | Тип | Обязательно | По умолчанию | Описание |
|---|---|---|---|---|
| `link` | `String` | `true` |  | ссылка на видео на YouTube |
| `autoplay` | `Boolean` | `false` | `false` | автоматическое воспроизведение видео на YouTube |
| `loop` | `Boolean` | `false` | `false` | повторное воспроизведение видео на YouTube |


## Как отредактировать боковую навигацию

Если вам нужно отредактировать боковую навигацию в Robonomics Wiki, пожалуйста, выполните следующие шаги:

* Отредактируйте файл `src/_data/sidebar_docs.json`.

* Решите, куда поместить ваш документ.

* Используйте допустимый JSON для `src/_data/sidebar_docs.json` и опирайтесь на существующую структуру файла.

* **ВАЖНО:** если вы используете тот же документ в разных разделах/подразделах, например:

```

{
	"title": "Обновление Home Assistant OS",
	"children": [
	{
		"title": "Активация подписки",
		"url": "/docs/sub-activate",
	}],
	"title": "Обновление Home Assistant Docker для ОС, похожих на Unix",
		"children": [
	{
		"title": "Активация подписки",
		"url": "/docs/sub-activate",
	}],
}

```

УБЕДИТЕСЬ, ЧТО ДОБАВИЛИ ПАРАМЕТР `topic` ВОТ ТАК:

(для правильной работы навигации)
```
{
	"title": "Обновление Home Assistant OS",
	"children": [
	{
		"title": "Активация подписки",
		"url": "/docs/sub-activate",
		"topic": "Обновление Home Assistant OS"
	}],
	"title": "Обновление Home Assistant Docker для ОС, подобных Unix",
		"children": [
	{
		"title": "Активация подписки",
		"url": "/docs/sub-activate",
		"topic": "Обновление Home Assistant Docker для ОС, подобных Unix"
	}],
}

```

## Как добавить пользовательскую навигацию для документов

* Отредактируйте файл `src/_data/sidebar_docs.json`.

* Найдите нужный документ и добавьте параметры `prev` и `next` следующим образом:

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

* Если вы хотите удалитьПросто навигация `предыдущая страница` или `следующая страница`, а затем добавьте параметр `withoutPrev` или `withoutNext`:

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

{% roboWikiNote {title: 'Важно', type: 'warning'}%} Вы должны создать файл **.env** и добавить переменную *OPENAI_KEY* со своим ключом {% endroboWikiNote %}

Если вы хотите перевести свой md-документ, вам нужно выполнить команду:

```bash
npm run translate-md
```

После выполнения команды вам просто нужно подождать и, возможно, проверить файлы (переводы с помощью ИИ могут содержать некоторые недочеты).

### Устранение проблем с переводом

Вы можете столкнуться с некоторыми проблемами при переводе.

1. Попробуйте выполнить команду еще раз и посмотрите, сработает ли она.

2. Иногда теги в файлах md могут быть записаны неправильно, например:


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

Затем вам просто нужно исправить тег.