---
title: Як редагувати вікі
contributors: [positivecrash]
description: Способи допомогти нам покращити нашу вікі
---

**Вікі Robonomics є відкритим джерелом. Будь-які виправлення вітаються: виправлення помилок, орфографічних помилок, деякої невиразної або застарілої інформації, переклад будь-якою мовою. Вам знадобиться обліковий запис [GitHub](https://github.com/).**


## Як редагувати

Якщо вам потрібно відредагувати документи вікі Robonomics, будь ласка, дотримуйтесь цих кроків

Переконайтеся, що у вас встановлено [Node.js](https://nodejs.org/en/download/package-manager/).

### 1. Клонуйте репозиторій

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

### 2. Запустіть локально (develop, develop-m1)

`версія node повинна бути 20 || >=22`

Потім розгорніть проект локально:

```
npm run start
```

> можливо знадобиться створити файл .env з такими ж змінними, як у файлі .env.example

### 3. Створіть PR

[Створити запит на витяг](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) до [вікі-репозиторію](https://github.com/airalab/robonomics-wiki)

## Компоненти

{% roboWikiNote {title:"СПЕЦІАЛЬНІ КОМПОНЕНТИ", type: "warning"}%} **Порада** при додаванні спеціальних компонентів:
Якщо щось не так з макетом після додавання компонента, вам може знадобитися перевірити пробіли. Це повинно допомогти **ВИДАЛИТИ** пробіли після відкриваючого тегу та закриваючого тегу (як у прикладі нижче){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"тест", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Код

Ви можете додати корисні додаткові елементи до свого коду:

`код з кнопкою копіювання`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

деякий текст коду
	інша тестова лінія
		ще щось

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

або `код з додатковою лінією`

```bash
{% raw %}{% codeHelper { additionalLine: "додаткова лінія"}%}{% endraw %}

деякий текст коду
	інша тестова лінія
		ще щось

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Властивості для допоміжника коду**

| Властивість         | Тип | Обов'язково | За замовчуванням | Опис                                                     |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | додати кнопку копіювання для вашого коду                  |
| `additionalLine` | `String`  | `false`  | ''       | додатковий рядок для вашого коду, який буде відображатися вище |


{% codeHelper { additionalLine: "додатковий рядок", copy: true}%}

```bash
деякий текст коду
	ще один тестовий рядок
		щось інше
```

{% endcodeHelper %}


### Frontmatter
Документація в Robonomics Wiki містить блок frontmatter. Він повинен бути у верхній частині файлу у форматі Markdown і повинен мати вигляд дійсного YAML, розташованого між потрійними тире. Між потрійними тире ви можете встановити або редагувати наступні параметри:

```YAML
---
title: Як внести внесок # Заголовок сторінки, вам не потрібно дублювати його в тексті
contributors: [positivecrash] # Основні учасники (хто активно кураторить цю сторінку). Потрібен нік GitHub, без будь-яких додаткових символів
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # Інструменти, які використовувалися для тестування технологій
---
```

### Сітка
Допомагає додати сітковий макет до елементів:

- Спочатку використовуйте компонент обгортки сітки:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Потім використовуйте стільки компонентів елементів сітки, скільки потрібно всередині обгортки:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} перший елемент {% endroboWikiGrid %}
	{% roboWikiGrid %} другий елемент {% endroboWikiGrid %}
	{% roboWikiGrid %} третій елемент {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**Властивості для robo-wiki-grid-wrapper**

| Властивість | Тип      | Обов'язково | За замовчуванням | Опис                                                                  |
|-------------|----------|-------------|------------------|-----------------------------------------------------------------------|
| `columns`   | `Number` | `false`     | 4                | ви можете вибрати кількість стовпців:   <br/> - від `1 до 5`          |
| `align`     | `String` | `false`     |                  | вирівнювати елементи по блочній вісі:   <br/> - варіанти: `start, center, end` |
| `justify`   | `String` | `false`     |         | вирівнювати елементи на вбудованій вісі:  <br/> - варіанти: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | вирівнювати текст всередині сітки:  <br/> - варіанти: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (принаймні 2 ГБ оперативної пам'яті)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-карта 16 ГБ</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Адаптер Zigbee (за бажанням) </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee розумні пристрої (за бажанням) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
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

{% roboWikiNote {type: 'warning'}%} Рекомендується вставляти зображення з вбудованим тегом `<robo-wiki`-зображення>`, однак ви також можете використовувати стандартний спосіб для файлів Markdown. {% endroboWikiNote %}

`з підписом`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"досліджуйте вікі робономіки", link: '/docs/overview', caption: "ДОСЛІДЖУЙТЕ"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`або без підпису`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"досліджуйте вікі робономіки", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
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

| Властивість | Тип       | Обов'язково | За замовчуванням | Опис                                                                                                                                                                                                                |
|------------|-----------|------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | шлях до зображення:  <br/> - якщо ви завантажили своє зображення безпосередньо до `/src/assets/images/docs/`, використовуйте: `url-of-your-doc` <br/> - якщо ви завантажили зображення в один з каталогів, використовуйте: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | вирівнювання елементів по блочній вісі:   <br/> - опції: `start, center, end`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | вирівнювання елементів по вбудованій вісі:  <br/> - опції: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | надає альтернативну інформацію для зображення, якщо користувач з якихось причин не може його переглянути                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | збільшити зображення                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | є дві опції: lazy та eager                                                                                                                                                                                |

### Примітки та попередження
Ви можете додавати примітки та надавати їм конкретні типи:
* попередження (<span style="color:#f08432">**з зображенням**</span>)
* добре (<span style="color:#3eaf7c">**зелений колір**</span>)
* примітка (<span style="color:#90a4b7">**сірий колір**</span>)

`примітка з заголовком`

```c
{% raw %} {% roboWikiNote {title:"ПРИКЛАД ЗАГОЛОВКА", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`примітка з вмістом`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`примітка з заголовком та вмістом`

```c
{% raw %} {% roboWikiNote {title: "ЗАГОЛОВОК", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Приєднуйтесь до Discord", type: "okay"}%} [Приєднуйтесь до Discord розробників Robonomics](https://discord.gg/jTxqGeF5Qy), щоб спілкуватися зі спільнотою та отримати технічну підтримку. {% endroboWikiNote %}

{% roboWikiNote {title: "Приєднуйтесь до Discord"}%} [Приєднуйтесь до Discord розробників Robonomics](https://discord.gg/jTxqGeF5Qy), щоб спілкуватися зі спільнотою та отримати технічну підтримку. {% endroboWikiNote %}

{% roboWikiNote {title: "Приєднуйтесь до Discord", type: "warning"}%} [Приєднуйтесь до Discord розробників Robonomics](https://discord.gg/jTxqGeF5Qy), щоб спілкуватися зі спільнотою та отримати технічну підтримку. {% endroboWikiNote %}

**Властивості для robo-wiki-note**

| Властивість | Тип       | Обов'язково | За замовчуванням | Опис                                                         |
|------------|-----------|-------------|------------------|-------------------------------------------------------------|
| `type`     | `String`  | `false`     |                  | - всього є три типи: `note`, `warning`, `okay`               |
| `title`    | `String`  | `false`     |                  | додає заголовок до вашої нотатки                             |


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
{% endroboWikiTabs %} {% endraw %}
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
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`елемент вкладки з межею`

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
|------------|----------|----------|------------|-------------------------------------------------------------------|
| `вкладки`   | `Масив`  | `true`   |            | - Масив з назвами для кожної вкладки                                  |
| `режим`   | `Рядок` | `false`  | горизонтальний | ви можете вибрати режим вкладок: <br/> - `горизонтальний` <br/> - `вертикальний` |

**Властивості для robo-wiki-tab (елемент)**

| Властивість | Тип      | Обов'язково | За замовчуванням | Опис                         |
|----------|-----------|----------|---------|-------------------------------------|
| `обрамлення` | `Логічний` | `false`  | `false` | - додати рамку до обгортки вмісту |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Заголовок з якорями
Ви можете створювати власні заголовки з якорями та надавати їм певне значення`заголовок з якорем`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

або `заголовок без якоря`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (власний заголовок) {% endroboWikiTitle %}

<br/>

**Властивості для robo-wiki-title**

| Властивість | Тип                    | Обов'язково | За замовчуванням | Опис                 |
|------------|------------------------|-------------|------------------|----------------------|
| `type`     | `Число (від 2 до 6)`   | `true`      |                  | вибір рівня заголовка |
| `anchor`   | `Рядок`                | `false`     |                  | значення для якоря   |

### Відео

Є два способи вставки відео у ваші документи:

{% roboWikiNote {type: "warning"}%} Рекомендується вставляти відео з вбудованим тегом `<robo-wiki-video>`, однак ви також можете використовувати стандартний спосіб для файлів Markdown. {% endroboWikiNote %}

#### IPFS / Сервер
Вам потрібно вказати формат відео

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {тип: "попередження", заголовок:"Про шлюзи"}%} Шлюз для посилання вибирається автоматично з файлу конфігурації - `src/_data/video_config.js`. Ви можете додавати або видаляти деякі шлюзи, змінивши файл. {% endroboWikiNote %}


#### Локально

```
{% raw %} {% roboWikiVideo {відео: [{src: '/videos/add-ext.mp4', тип:'mp4'}], атрибути: ['петля', 'керування']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Властивості

- Якщо ви додаєте файл розміром більше <span style="color:#af1c1c">10MB</span>, будь ласка, завантажте його на сервер, а не в репозиторій.

- Ви можете використовувати будь-які властивості для [HTML5 тегу відео](https://www.w3schools.com/tags/tag_video.asp).

- Прийнятні формати - mp4, webm, ogg.

| Властивість | Тип | Обов'язково | За замовчуванням | Опис |
|---|---|---|---|---|
| `відео` | `Масив` | `true` |  | Масив об'єктів [{src: `шлях до відео`, type: `тип відео`}] |


#### YouTube
Ви можете вбудувати будь-яке відео з YouTube у документ, вставивши посилання на спільний доступ як окремий абзац без будь-яких додаткових лапок або тегів, наприклад: `https://youtu.be/kQaSwNYHJQ8`

Однак, якщо вам потрібен автовідтвір, вам слід використовувати спеціальний компонент:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**Властивості для robo-wiki-youtube**

| Властивість | Тип | Обов'язково | За замовчуванням | Опис |
|---|---|---|---|---|
| `link` | `String` | `true` |  | посилання на відео на YouTube |
| `autoplay` | `Boolean` | `false` | `false` | автоматичне відтворення відео на YouTube |
| `loop` | `Boolean` | `false` | `false` | повторення відео на YouTube |


## Як редагувати бічну навігацію

Якщо вам потрібно відредагувати бічну навігацію вікі Robonomics, будь ласка, дотримуйтесь цих кроків:

* Відредагуйте файл `src/_data/sidebar_docs.json`.

* Вирішіть, куди помістити свій документ.

* Використовуйте дійсний JSON для `src/_data/sidebar_docs.json` та покладайтеся наіснуюча структура файлів

* Вам потрібно додати нові рядки до файлу перекладу `translations/pages/en.json`, якщо ви не перекладали новий вміст раніше, наприклад:

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **ВАЖЛИВО:** якщо ви використовуєте той самий документ у різних розділах/підрозділах, наприклад:

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

ДБАЙТЕ ПРО ДОДАВАННЯ ПАРАМЕТРУ `topic` ТАКИМ ЧИНОМ:

(для належної роботи навігації)

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

## Як додати власну навігацію для документів

* Редагуйте файл`src/_data/sidebar_docs.json`.

* Знайдіть правильний документ та додайте параметри `prev` та `next` наступним чином:

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

* Якщо ви хочете повністю видалити навігацію, то додайте параметр `withoutNav`:

```
{
	"title": "Огляд",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Якщо ви хочете видалити лише навігацію "попередня сторінка" або "наступна сторінка", то додайте параметр `withoutPrev` або `withoutNext`:

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

{% roboWikiNote {title: 'Важливо', type: 'warning'}%} Вам потрібно створити **.env** файл та додайте змінну *OPENAI_KEY* з вашим ключем {% endroboWikiNote %}

Якщо ви хочете перекласти свій md-документ, вам потрібно виконати команду:

```bash
npm run translate-md
```

{% roboWikiNote {title: 'Легко перекладайте', type: 'warning'}%} Щоб перекласти все одразу, кожен новий рядок на сторінках, новий документ або змінений документ, вам зараз потрібно лише одну команду {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> Також переконайтеся, що ви перекладаєте лише змінені файли, які **потрібно** перекласти. Наприклад, вам потрібно змінити 5 файлів. У трьох з них внесені зміни в текст та видалена застаріла інформація. Ще двом потрібно оновити посилання на деякі зображення або просто змінити зовнішнє посилання. У цьому випадку розумно змінити перші три файли, перекласти їх, а потім змінити посилання в інших двох.

> Переклад відбувається для всіх змінених файлів, але це не обов'язково для оновлених посилань, особливо якщо файл великий і тому переклад займає певний час.

Після виконання необхідної команди все, що вам залишається зробити, це зачекати і, можливо, перевірити файли (переклади штучного інтелекту мають деякі недоліки). Щоб перевірити файли, запустіть `npm run build` і подивіться, чи є якісь помилки.

### Усунення неполадок з перекладами

Ви можете зіткнутися з деякими проблемами з перекладами.

1. Спробуйте виконати команду ще раз і подивіться, чи вона працює.

2. Іноді тегиу файлах md можуть бути написані неправильно, наприклад:

```
{%raw %}
	[11ty] 1. Виникли проблеми з відтворенням шаблону njk ./src/de/docs/edit-wiki.md (через TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Рядок 168, Стовпець 96]
	[11ty]   невідомий блоковий тег: endroboWiki (через помилку відтворення шаблону)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

Потім вам просто потрібно виправити тег.