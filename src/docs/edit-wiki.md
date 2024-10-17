---
title: How to Edit Wiki
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics Wiki is open source. Any corrections are welcome: fixing errors, typos, some unclear or outdated information, translation into any language. You'll need a [GitHub](https://github.com/) account.**


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

{% roboWikiNote {title:"CUSTOM COMPONENTS", type: "warning"}%} A **tip** when adding custom components:
If there is something wrong with the layout after adding a component you might want to check spaces. It should help to **REMOVE** spaces after opening tag and closing tag (like in example below){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Code

You can add helpful extras to your code:

`code with copy button`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

or `code with additional line`

```bash
{% raw %}{% codeHelper { additionalLine: "additional line"}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

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
Docs in Robonomics Wiki contain frontmatter block. It must be at the top of the Markdown file, and must take the form of valid YAML set between triple-dashed lines. Between the triple-dashed lines, you can set or edit folowing options:

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

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- And then use as many grid items components as you like inside wrapper:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} first element {% endroboWikiGrid %}
	{% roboWikiGrid %} second element {% endroboWikiGrid %}
	{% roboWikiGrid %} third element {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

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


### Images

#### How to upload
Upload image in folder `src/assets/docs/images/url-of-your-doc`
* If image needs to be localized, insert all of them in one folder
* Use locale appendix in name of images if it's localized, e.g. `image_en.jpg`
* Make sure your image is web optimized and at the same time it looks good

#### How to insert

There are two ways for inserting pictures in your documents:

{% roboWikiNote {type: 'warning'}%} It is recommended to insert pictures with built-in tag `<robo-wiki-picture>`, however you may also use standard way for Markdown files. {% endroboWikiNote %}

`with caption`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", link: '/docs/overview', caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`or without caption`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`or simple image`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`or simple image with caption`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Properties for robo-wiki-picture:**

| Property  | Type      | Required | Default | Description                                                                                                                                                                                                          |
|-----------|-----------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | path to the image:  <br/> - if you uploaded your image directly to the `/src/assets/images/docs/` use: `url-of-your-doc` <br/> - if you uploaded image in one of the folders than use: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | align items on the block axis:   <br/> - options: `start, center, end`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | align items on the inline axis:  <br/> - options: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | provides alternative information for an image if a user for some reason cannot view it                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | zoom image                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | there are two options: lazy and eager                                                                                                                                                                                |

### Notes & warnings
You can add notes and give them specific types:
* warning (<span style="color:#f08432">**with image**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`note with title`

```c
{% raw %} {% roboWikiNote {title:"EXAMPLE TITLE", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`note with content`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`note with title and content`

```c
{% raw %} {% roboWikiNote {title: "TITLE", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Join Discord", type: "okay"}%} [Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support. {% endroboWikiNote %}

{% roboWikiNote {title: "Join Discord"}%} [Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support. {% endroboWikiNote %}

{% roboWikiNote {title: "Join Discord", type: "warning"}%} [Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support. {% endroboWikiNote %}

**Properties for robo-wiki-note**

| Property | Type     | Required | Default | Description                                                 |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `false`  |         | - there are three types in total: `note`, `warning`, `okay` |
| `title`  | `String` | `false`  |         | adds title to your note                                     |


### Tabs
You can add tabs to the doc:

- Use tabs wrapper component:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- And then use as many tab items components as you like inside wrapper:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`horizontal tabs`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`vertical tabs`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
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

**Properties for robo-wiki-tabs (wrapper)**

| Property | Type     | Required | Default    | Description                                                       |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - Array with titles for each tab                                  |
| `mode`   | `String` | `false`  | horizontal | you can choose tabs mode: <br/> - `horizontal` <br/> - `vertical` |

**Properties for robo-wiki-tab (item)**

| Property | Type      | Required | Default | Description                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - add border to the content wrapper |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Title with anchors
You can create custom titles with anchors and give them certain value

`title with anchor`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

or `title without anchor`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (custom title) {% endroboWikiTitle %}

<br/>

**Properties for robo-wiki-title**

| Property | Type                   | Required | Default | Description          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Number (from 2 to 6)` | `true`   |         | choose heading level |
| `anchor` | `String`               | `false`  |         | value for the anchor |

### Videos

There are two ways for inserting videos in your documents:

{% roboWikiNote {type: "warning"}%} It is recommended to insert videos with built-in tag `<robo-wiki-video>`, however you may also use standard way for Markdown files. {% endroboWikiNote %}

#### IPFS / Server
You need to specify format of video

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"About gateways"}%} Gateway for the link is chosen automatically from config file - `src/_data/video_config.js`. You can add or remove some gateways by changing the file. {% endroboWikiNote %}


#### Local

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Properties

- If you adding a file with the size of more than <span style="color:#af1c1c">10MB</span>, please, upload it on server, not in repo.

- You may use any properties for [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- Acceptable formats - mp4, webm, ogg.

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | Array of objects [{src: `path to video`, type: `type of video`}] |


#### YouTube
You can embed any YouTube video in doc by inserting share link as separate paragraph without any additional quotes or tags, e.g.: `https://youtu.be/kQaSwNYHJQ8`

However, if you need an autoplay you must use special component:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**Properties for robo-wiki-youtube**

| Property | Type | Required | Default | Description |
|---|---|---|---|---|
| `link` | `String` | `true` |  | link to youtube video |
| `autoplay` | `Boolean` | `false` | `false` | autoplays youtube video |
| `loop` | `Boolean` | `false` | `false` | loops youtube video |


## How to edit sidebar navigation

If you need to edit sidebar navigation of Robonomics Wiki, please, follow these steps:

* Edit file `src/_data/sidebar_docs.json`.

* Decide where to place your doc

* Use valid JSON for `src/_data/sidebar_docs.json` and rely on the existing file structure

* You must add new lines to translation file `translations/pages/en.json` as well, if you are not translated new content before hand, e.g: 

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **IMPORTANT NOTE:** if you're using the same doc in different sections/subsections e.g:

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

MAKE SURE TO ADD `topic` PARAMETER LIKE THIS:

(for navigation to work properly)

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

## How to add custom navigation for docs

* Edit file `src/_data/sidebar_docs.json`.

* Find the right doc and add parameters `prev` and `next` like this:

```
	{
		"title": "Overview",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Add User",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Add User",
				"url": "/docs/add-user"
			}
		],
	},

```

* If you want to remove navigation completely than add `withoutNav` parameter:

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* If you want to remove just `previous page` or `next page` navigation than add `withoutPrev` or `withoutNext` parameter:

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

or

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## How to translate a document

{% roboWikiNote {title: 'Important', type: 'warning'}%} You must create **.env** file and add *OPENAI_KEY* variable with your key {% endroboWikiNote %}

If you wish to translate your md document you need to run the command: 
 
```bash
npm run translate-md
```

After running the command all you have to do is wait and maybe check the files (ai translations have some flaws).

### Translations troubleshooting

You may run into some troubles with translations.

1. Try to run the command again and see if it worked.

2. Sometimes tags in md files can be written incorrectly, for example: 

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

Then, you just need to fix the tag.