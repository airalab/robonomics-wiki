**Robonomics Wiki is open source. Any corrections are welcome: fixing errors, typos, some unclear or outdated information, translation into any language. You'll need a [GitHub](https://github.com/) account.**

Robonomics network is an open-source project built by core maintainers from Airalab and contributors. We want to make it easy for anyone to contribute. You may contribute to core, suggest changes, improve documentation or write a blog post. Please, read some rules and suggestions for contributing.

## How to edit

If you need to edit docs of Robonomics Wiki, please, follow these steps

Make sure, you have [Node.js](https://nodejs.org/en/download/package-manager/) installed.

### 1. Clone repo

At first, you need to clone the wiki repository:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Go to the directory of the repository and run the following commands:

`using npm`
```
cd robonomics-wiki
npm install
```

`using yarn`
```
cd robonomics-wiki
yarn install
```


### 2. Serve locally (develop, develop-m1)

`node version must be 20 || >=22`

Then deploy the project locally:

```
npm run start
```

> may need to create .env file with the same variables as in .env.example file


### 3. Make PR

[Make pull request](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) to [wiki repo](https://github.com/airalab/robonomics-wiki)



## Components

> A **tip** when adding custom components:
>
> If there is something wrong with the layout after adding a component you might want to check spaces. It should help to **REMOVE** spaces after opening tag and closing tag (like in example below)

```
{% roboWikiNote {title:"test", type: "okay"}%}Lorem ipsum dolor sit amet.{% endroboWikiNote %}
```

### Code

You can add helpful extras to your code:

`code with copy button`

```bash
{% codeHelper { copy: true}%}

some text code
	another test line
		something else

{% endcodeHelper %}
```

or `code with additional line`

```bash
{% codeHelper { additionalLine: "additional line"}%}

some text code
	another test line
		something else

{% endcodeHelper %}
```

**Properties for code-helper**

| Property         | Type      | Required | Default  | Description                                               |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | add a copy button for your code                           |
| `additionalLine` | `String`  | `false`  | ''       | additional line for you code that will be displayed above |


{% codeHelper { additionalLine: "additional line", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}


### Frontmatter

Docs in Robonomics Wiki contain frontmatter block. It must be at the top of the Markdown file, and must take the form of valid YAML set between triple-dashed lines. Between the triple-dashed lines, you can set or edit following options:

```YAML
---
title: How to contribute # Title for the page, you do not need to duplicate it in text
contributors: [positivecrash] # Main contributors (who actively curates this page). GitHub nickname required, without any additional symbols
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # Tools that were used for technology testing
---
```

### Grid
Helps to add grid layout to elements:

- Use grid wrapper component first:

```
{% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}
```


- And then use as many grid items components as you like inside wrapper:

```
{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} first element {% endroboWikiGrid %}
	{% roboWikiGrid %} second element {% endroboWikiGrid %}
	{% roboWikiGrid %} third element {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}
```

**Properties for robo-wiki-grid-wrapper**

| Property    | Type     | Required | Default | Description                                                            |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4       | you can choose column number:   <br/> - from `1 to 5`                  |
| `align`     | `String` | `false`  |         | align items on the block axis:   <br/> - options: `start, center, end` |
| `justify`   | `String` | `false`  |         | align items on the inline axis:  <br/> - options: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | align text inside grid:  <br/> - options: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (at least 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD card 16Gb</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee adapter(Optionally) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee smart devices(Optionally) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Desktop for setup</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}



