---
title: Як редагувати вікі
contributors: [positivecrash]
description: Способи допомогти нам покращити нашу вікі
---

**Вікі Robonomics є відкритим джерелом. Будь-які виправлення вітаються: виправлення помилок, орфографічних помилок, деякої невиразної або застарілої інформації, переклад будь-якою мовою. Вам знадобиться обліковий запис [GitHub](https://github.com/).**


## Як редагувати

Якщо вам потрібно відредагувати документи вікі Robonomics, будь ласка, дотримуйтесь цих кроків

Переконайтеся, що у вас встановлені [Node.js](https://nodejs.org/en/download/package-manager/)

### 1. Клонувати репозиторій

Спочатку вам потрібно склонувати репозиторій вікі:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Перейдіть до каталогу репозиторію та виконайте наступні команди:

`використовуючи npm`
```
cd robonomics-wiki
npm install
```

`використовуючи yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Локальне обслуговування (розробка, розробка-m1)

`node повинен бути >= v18`

Потім розгорніть проект локально:

```
npm run start
```

### 3. Створити PR

[Створити запит на витяг](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)до [репозиторію вікі](https://github.com/airalab/robonomics-wiki)

## Компоненти

{% roboWikiNote {title:"СПЕЦІАЛЬНІ КОМПОНЕНТИ", type: "warning"}%} **Порада** при додаванні спеціальних компонентів:
Якщо щось пішло не так з макетом після додавання компонента, варто перевірити пробіли. Це повинно допомогти **ВИДАЛИТИ** пробіли після відкриваючого тегу та закриваючого тегу (як у прикладі нижче){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}

```

### Код

Ви можете додати корисні додатки до свого коду:

`код з кнопкою копіювання`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

або `код з додатковим рядком`

```bash
{% raw %}{% codeHelper { additionalLine: "додатковий рядок"}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Властивості для code-helper**

| Властивість      | Тип       | Обов'язково | За замовчуванням | Опис                                                     |
|------------------|-----------|-------------|------------------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`     | `false`          | додати кнопку копіювання для вашого коду                  |
| `additionalLine` | `String`  | `false`     | ''               | додатковий рядок для вашого коду, який буде відображатися вище |


{% codeHelper { additionalLine: "додатковий рядок", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}### Передмова
Документи в вікі Robonomics містять блок передмови. Він повинен бути у верхній частині файлу у форматі YAML, розділеному між тричірками. Між тричірками можна встановити або редагувати наступні параметри:

```YAML
---
title: Як внести внесок # Назва сторінки, вам не потрібно повторювати її в тексті
contributors: [positivecrash] # Основні учасники (хто активно кураторить цю сторінку). Потрібен нік GitHub, без будь-яких додаткових символів
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # Інструменти, які використовувалися для тестування технологій
---
```

### Сітка
Допомагає додати сітковий макет до елементів:

- Спочатку використовуйте компонент обгортки сітки:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- А потім використовуйте стільки компонентів елементів сітки, скільки потрібно всередині обгортки:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} перший елемент {% endroboWikiGrid %}
	{% roboWikiGrid %} другий елемент {% endroboWikiGrid %}
	{% roboWikiGrid %} третій елемент {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}{% endraw %}
```

<br/>

**Властивості для обгортки robo-wiki-grid-wrapper**

| Властивість | Тип      | Обов'язково | За замовчуванням | Опис                                                                 |
|-------------|----------|-------------|------------------|---------------------------------------------------------------------|
| `columns`   | `Number` | `false`     | 4                | ви можете вибрати кількість стовпців:   <br/> - від `1 до 5`        |
| `align`     | `String` | `false`     |                  | вирівнювати елементи по блочній вісі:   <br/> - варіанти: `start, center, end` |
| `justify`   | `String` | `false`     |                  | вирівнювати елементи по вбудованій вісі:  <br/> - варіанти: `start, center, end` |
| `textAlign` | `String` | `false`     | `left`           | вирівнювати текст всередині сітки:  <br/> - варіанти: `left, center, right` |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (принаймні 2 ГБ оперативної пам'яті)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-карта 16 ГБ</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Адаптер Zigbee (за бажанням) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Розумні пристрої Zigbee (за бажанням) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"потреба"} %}{% endroboWikiPicture %}
	<b>Робочий стіл для налаштування</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Зображення

#### Як завантажити
Завантажте зображення в папку `src/assets/docs/images/url-of-your-doc`
* Якщо зображення потрібно локалізувати, вставте їх у одну папку
* Використовуйте додаток локалізації в назві зображень, якщо вони локалізовані, наприклад, `image_en.jpg`
* Переконайтеся, що ваше зображення оптимізоване для вебу і водночас виглядає добре

#### Як вставити

Є два способи вставки зображень у ваші документи:

{% roboWikiNote {type: 'warning'}%} Рекомендується вставляти зображення з вбудованим тегом `<robo-wiki-picture>`, проте ви також можете використовувати стандартний спосіб для файлів Markdown. {% endroboWikiNote %}

`з підписом`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"досліджуйте вікі робономіки", link: '/docs/overview', caption: "ДОСЛІДЖУЙТЕ"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`або без підпису`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"досліджуйте вікі робономіки", посилання: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`або просте зображення`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"досліджуйте вікі робономіки"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`або просте зображення з підписом`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"досліджуйте вікі робономіки", caption: "ДОСЛІДЖУЙТЕ"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Властивості для robo-wiki-picture:**

| Властивість | Тип       | Обов'язково | За замовчуванням | Опис                                                                                                                                                                                                                 |
|-------------|-----------|-------------|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`       | `String`  | `true`      |                  | шлях до зображення:  <br/> - якщо ви завантажили своє зображення безпосередньо до `/src/assets/images/docs/`, використовуйте: `url-of-your-doc` <br/> - якщо ви завантажили зображення в одну з папок, використовуйте: `folder-name/url-of-your-doc` |
| `link`      | `String`  | `false`     |                  | вирівнювати елементи по блочній вісі:   <br/> - опції: `start, center, end`                                                                                                                                           |`підпис` | `Рядок` | `неправда` | | вирівнювати елементи на вбудованій вісі: <br/> - варіанти: `start, center, end`
| `альтернатива` | `Рядок` | `правда` | зображення | надає альтернативну інформацію для зображення, якщо користувач з якоїсь причини не може його переглянути
| `збільшення` | `Логічний` | `неправда` | | збільшити зображення
| `завантаження` | `Рядок` | `неправда` | лінивий | є два варіанти: лінивий та ретельний

### Примітки та попередження
Ви можете додати примітки та надати їм конкретні типи:
* попередження (<span style="color:#f08432">**з зображенням**</span>)
* добре (<span style="color:#3eaf7c">**зелений колір**</span>)
* примітка (<span style="color:#90a4b7">**сірий колір**</span>)

`примітка з заголовком`

```c
{% raw %} {% roboWikiNote {title:"ПРИКЛАД ЗАГОЛОВКА", type: "добре"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`примітка з вмістом`

```c
{% raw %} {% roboWikiNote {type: "добре"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br>/>

`нотатка з заголовком та вмістом`

```c
{% raw %} {% roboWikiNote {title: "TITLE", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Приєднуйтесь до Discord", type: "okay"}%} [Приєднуйтесь до Discord розробників Robonomics](https://discord.gg/jTxqGeF5Qy), щоб спілкуватися зі спільнотою та отримати технічну підтримку. {% endroboWikiNote %}

{% roboWikiNote {title: "Приєднуйтесь до Discord"}%} [Приєднуйтесь до Discord розробників Robonomics](https://discord.gg/jTxqGeF5Qy), щоб спілкуватися зі спільнотою та отримати технічну підтримку. {% endroboWikiNote %}

{% roboWikiNote {title: "Приєднуйтесь до Discord", type: "warning"}%} [Приєднуйтесь до Discord розробників Robonomics](https://discord.gg/jTxqGeF5Qy), щоб спілкуватися зі спільнотою та отримати технічну підтримку. {% endroboWikiNote %}

**Властивості для robo-wiki-note**

| Властивість | Тип      | Обов'язково | За замовчуванням | Опис                                                         |
|-------------|----------|-------------|------------------|-------------------------------------------------------------|
| `type`      | `String` | `false`     |                  | - всього є три типи: `note`, `warning`, `okay`               |
| `title`     | `String`` | `false`  |         | додає заголовок до вашої нотатки                                     |


### Вкладки
Ви можете додати вкладки до документа:

- Використовуйте компонент обгортки вкладок:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- А потім використовуйте стільки компонентів елементів вкладок, скільки вам потрібно всередині обгортки:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`горизонтальні вкладки`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`вертикальні вкладки`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],режим: 'вертикальний'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`вкладка з рамкою`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Властивості для robo-wiki-tabs (обгортка)**

| Властивість | Тип      | Обов'язково | За замовчуванням | Опис                                                               |
|------------|----------|-------------|------------------|--------------------------------------------------------------------|
| `tabs`     | `Масив`  | `true`      |                  | - Масив з заголовками для кожної вкладки                           |
| `mode`     | `Рядок`  | `false`     | горизонтальний    | ви можете вибрати режим вкладок: <br/> - `горизонтальний` <br/> - `вертикальний` |

**Властивості для robo-wiki-tab (елемент)**

| Властивість | Тип       | Обов'язково | За замовчуванням | Опис                         |
|------------|-----------|-------------|------------------|-----------------------------|
| `border`   | `Булевий` | `false`     | `false`          |хибно` | - додати рамку до обгортки вмісту |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Заголовок з якорями
Ви можете створювати власні заголовки з якорями та надавати їм певне значення

`заголовок з якорем`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

або `заголовок без якоря`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (власний заголовок) {% endroboWikiTitle %}%}

<br/>

**Властивості для robo-wiki-title**

| Властивість | Тип                     | Обов'язково | За замовчуванням | Опис                  |
|------------|-------------------------|-------------|------------------|----------------------|
| `type`     | `Число (від 2 до 6)`    | `true`      |                  | вибір рівня заголовка |
| `anchor`   | `Рядок`                 | `false`     |                  | значення для якоря    |

### Відео

Є два способи вставки відео у ваші документи:

{% roboWikiNote {type: "warning"}%} Рекомендується вставляти відео з вбудованим тегом `<robo-wiki-video>`, однак ви також можете використовувати стандартний спосіб для файлів Markdown. {% endroboWikiNote %}

#### IPFS / Сервер
Вам потрібно вказати формат відео

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"Про шлюзи"}%} Шлюз для посилання вибирається автоматично з файлу конфігурації - `src/_data/video_config.js`. Ви можете додати або видалити деякі шлюзи, змінившифайл. {% endroboWikiNote %}


#### Локальний

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Властивості

- Якщо ви додаєте файл розміром більше <span style="color:#af1c1c">10MB</span>, будь ласка, завантажте його на сервер, а не в репозиторій.

- Ви можете використовувати будь-які властивості для [HTML5 тегу відео](https://www.w3schools.com/tags/tag_video.asp).

- Прийнятні формати - mp4, webm, ogg.

| Властивість | Тип | Обов'язково | За замовчуванням | Опис |
|---|---|---|---|---|
| `videos` | `Масив` | `true` |  | Масив об'єктів [{src: `шлях до відео`, type: `тип відео`}] |


#### YouTube
Ви можете вбудувати будь-яке відео з YouTube в документ, вставивши посилання на спільний доступ як окремий абзац без будь-яких додаткових лапок або тегів, наприклад: `https://youtu.be/kQaSwNYHJQ8`

Однак, якщо вам потрібен автовідтвір, вам слід використовувати спеціальний компонент:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%endroboWikiYoutube %}{% endraw %}
```

**Властивості для robo-wiki-youtube**

| Властивість | Тип | Обов'язково | За замовчуванням | Опис |
|---|---|---|---|---|
| `посилання` | `Рядок` | `true` |  | посилання на відео на YouTube |
| `автовідтворення` | `Булеве` | `false` | `false` | автоматичне відтворення відео на YouTube |
| `петля` | `Булеве` | `false` | `false` | повторення відео на YouTube |


## Як редагувати бічну навігацію

Якщо вам потрібно відредагувати бічну навігацію вікі Robonomics, будь ласка, дотримуйтесь цих кроків:

* Відредагуйте файл `src/_data/sidebar_docs.json`.

* Вирішіть, куди помістити ваш документ

* Використовуйте дійсний JSON для `src/_data/sidebar_docs.json` та спирайтеся на існуючу структуру файлу

* **ВАЖЛИВО:** якщо ви використовуєте той самий документ у різних розділах/підрозділах, наприклад:

```

{
	"title": "Оновлення Home Assistant OS",
	"children": [
	{
		"title": "Активація підписки",
		"url": "/docs/sub-activate",
	}],
	"title": "Оновлення Home Assistant Docker для операційних систем подібних до Unix",
		"children": [
	{
		"title": "Активація підписки",
		"url": "/docs/sub-activate",
	}],
}

```

ОБОВ'ЯЗКОВО ДОДАЙТЕ ПАРАМЕТР `topic` ТАКИМ ЧИНОМ:

(для правильної роботи навігації)```
{
	"title": "Оновлення Home Assistant OS",
	"children": [
	{
		"title": "Активація підписки",
		"url": "/docs/sub-activate",
		"topic": "Оновлення Home Assistant OS"
	}],
	"title": "Оновлення Home Assistant Docker для операційних систем подібних до Unix",
		"children": [
	{
		"title": "Активація підписки",
		"url": "/docs/sub-activate",
		"topic": "Оновлення Home Assistant Docker для операційних систем подібних до Unix"
	}],
}

```

## Як додати власну навігацію для документів

* Редагуйте файл `src/_data/sidebar_docs.json`.

* Знайдіть відповідний документ та додайте параметри `prev` та `next` наступним чином:

```
	{
		"title": "Огляд",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Додати користувача",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Додати користувача",
				"url": "/docs/add-user"
			}
		],
	},

```

* Якщо ви хочете повністю видалити навігацію, додайте параметр `withoutNav`:

```
{
	"title": "Огляд",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Якщо ви хочете видалити
```лише навігація `попередня сторінка` або `наступна сторінка`, а потім додайте параметр `withoutPrev` або `withoutNext`:

```
{
	"title": "Огляд",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

або

```
{
	"title": "Огляд",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## Як перекласти документ

{% roboWikiNote {title: 'Важливо', type: 'warning'}%} Вам потрібно створити файл **.env** та додати змінну *OPENAI_KEY* з вашим ключем {% endroboWikiNote %}

Якщо ви хочете перекласти свій md-документ, вам потрібно виконати команду:

```bash
npm run translate-md
```

Після виконання команди все, що вам потрібно зробити, це зачекати і, можливо, перевірити файли (переклади ai мають деякі недоліки).

### Усунення неполадок з перекладами

Ви можете зіткнутися з деякими проблемами з перекладами.

1. Спробуйте виконати команду ще раз і подивіться, чи вона працює.

2. Іноді теги в файлах md можуть бути написані неправильно, наприклад:


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

Потім вам просто потрібно виправити тег.