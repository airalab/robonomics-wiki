---
title: How to edit WIKI 
contributors: [positivecrash]
description: Ways to help us improve our wiki
tools: 
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
---

**Robonomics WIKI is open source. Any corrections are welcome: fixing errors, typos, some unclear or outdated information, translation into any language. You'll need a [GitHub](https://github.com/) account.**

## Edit existing doc

1. Choose page
2. Click button "Edit page" marked with the Github logo on the page you want to edit
3. Clicking on the button will take you to the .md file.
4. Please, follow common rules for editing [Markdown files](https://en.wikipedia.org/wiki/Markdown), bearing in mind a few features of the WIKI stack:

### Frontmatter
Docs in Robonomics WIKI contain frontmatter block. It must be at the top of the Markdown file, and must take the form of valid YAML set between triple-dashed lines. Between the triple-dashed lines, you can set or edit folowing options:

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

### How to upload images
Upload image in folder `/docs/images/url-of-your-doc`
* If image needs to be localized, insert all of them in one folder
* Use locale appendix in name of images if it's localized, e.g. `image_en.jpg`
* Make sure your image is web optimized and at the same time it looks good

### How to insert images

There are two ways for inserting pictures in your documents:

<robo-wiki-note type="warning">

It is recommended to insert pictures with built-in tag `<robo-wiki-picture>`, however you may also use standard way for Markdown files.

</robo-wiki-note>

`with caption`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`or without caption` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`or simple image` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`or simple image with caption`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`image with alt`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**Properties for robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### How to insert videos

There are two ways for inserting videos in your documents:

<robo-wiki-note type="warning">

It is recommended to insert videos with built-in tag `<robo-wiki-video>`, however you may also use standard way for Markdown files.

</robo-wiki-note>

`local file`

```c
<robo-wiki-video local src="balena-robonomics-image-crop.mp4" />
```

`server file` 

```c
<robo-wiki-video src="https://static.robonomics.network/wiki/balena-robonomics-image-crop.mp4" />
```

`video with controls` 

```c
<robo-wiki-video controls src="https://static.robonomics.network/wiki/balena-robonomics-image-crop.mp4" />
```

**Properties for robo-wiki-video**

** <robo-wiki-note type="warning">
  IF YOU ADDING A FILE WITH THE SIZE OF MORE THAN <span style="color:#af1c1c">10MB</span>, PLEASE, ADD IT TO THE SERVER NOT A LOCAL FOLDER!
</robo-wiki-note> **

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the video:`}, {text: `if you uploaded your video directly to the /docs/videos/ use: `, codeText: `url-of-your-doc`}, {text: `and for the server just use the link:`, codeText:  `https://some_url_here/name_of_the_file.format`}]}]}, { id: 1, items: [{ name: 'local', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `helps to get the right path for the file.`}, {text: `If your video located in a local folder prop must be set to`, codeText: `true.`}]}]}, {id: 2, items: [{ name: 'controls', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: `add controls to your video`}]}, {id: 3, items: [{ name: 'muted', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: true, code: true}, {name: `mute the video`}]}, {id: 4, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: true, code: true}, {name: [{text: `use autoplay`}, {text: `only works with muted =`, codeText: `true in Chromium browsers`}]}]}, {id: 5, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: true, code: true}, {name: `loop the video`}]}, ]" />

### YouTube videos
You can embed any YouTube video in doc by inserting share link as separate paragraph without any additional quotes or tags, e.g.: `https://youtu.be/kQaSwNYHJQ8`

### Asciinema
Robonomics WIKI has support for Asciinema. To insert Asciinema, please, follow these instructions:
* Import component after frontmatter block `import Asciinema from '~/components/Asciinema.vue'`
* Insert as separate paragraph `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, where is vid is ID of specific asciicast

> You can get the widget script for a specific asciicast by clicking on “Embed” link on asciicast page.
> It looks like this:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Asciinema docs](https://asciinema.org/docs/embedding)

In the example above vid is 14.


### Notes & warnings
You can add notes and give them specific types:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`note with title`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`note with content`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`note with title and content`

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

**Properties for robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Custom title with anchors
You can create custom titles with anchors and give them certain value

`title with anchor`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics with AIRA :)
</robo-wiki-title>
```

or

`title without anchor`

```c
<robo-wiki-title :type="5"> 
  Learn Robonomics with AIRA :)
</robo-wiki-title>
```

**Properties for robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="2" anchor="I'm custom title :)">
  I'm custom title with anchor :)
</robo-wiki-title>

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>


### Feedback Form

You can add feedback form to the doc. Use component like that:

```c
<robo-wiki-feedback /> 
```

And it will look like that: 
<robo-wiki-feedback /> 


### Tabs
You can add tabs to the doc:

- Use tabs wrapper component: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- And then use as many tab items components as you like inside wrapper:

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


`horizontal tabs`

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

`vertical tabs`

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

`tab item with border`

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

**Properties for robo-wiki-tabs (wrapper)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**Properties for robo-wiki-tab (item)**

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


### Grid 
Helps to add grid layout to elements:

- Use grid wrapper component first: 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- And then use as many grid items components as you like inside wrapper:

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

**Properties for robo-wiki-grid-element-wrapper**

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


### Code Helper

You can add helpful extras to your code: 

`code with copy button`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

or

`code with additional line`

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**Properties for code-helper**

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



## Add new doc

If you need to add new page in docs of Robonomics WIKI, please, follow these steps:

1. Find the folder with the locale that matches the language of the article you are adding, e.g. `/docs/en/`
2. Create .md file, using in name latin characters and follow common rules for [url structure](https://developers.google.com/search/docs/advanced/guidelines/url-structure)
3. Edit file as described above
4. Add doc in menu:
* Open file `/data/sidebar_docs.yaml`
* Decide where to place your doc
* If you want to create new section, provide title with locale appendix, using only locales your section is translated
* Add doc with link. The link must be only one, and must not contain locale characters. Correct is `/docs/url-of-your-doc`, not correct is `/docs/en/url-of-your-doc`
* Use valid YAML for `/data/sidebar_docs.yaml` and rely on the existing file structure

## Submit Pull Request

[Make pull request](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) for any content you changed including typos, translations, outdated information or broken links.

Decisions about individual PRs made by Robonomics core team. Special grants in [XRT](https://robonomics.network/community#token) are also possible for extended contribution 🤖💙💛💚💎🍭🎉🔌