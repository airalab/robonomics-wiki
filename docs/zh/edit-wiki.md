---
title: How to Edit Wiki 
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics Wiki是开源的。欢迎任何更正：修复错误，拼写错误，一些不清楚或过时的信息，翻译成任何语言。 您将需要一个 [GitHub](https://github.com/) 帐户。**


## 如何编辑

如果您需要编辑Robonomics Wiki的文档，请按照以下步骤进行操作

确保你有 [Node.js](https://nodejs.org/en/download/package-manager/) 和[Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool) 已安装。

### 1. 克隆存储库

首先，您需要克隆wiki存储库：

```
git clone https://github.com/airalab/robonomics-wiki.git
```

转到存储库目录并运行以下命令：

`使用npm`
```
cd robonomics-wiki
npm install 
```

`使用yarn`
```
cd robonomics-wiki
yarn install
```

### 2. 本地服务（开发，开发-m1）

然后在本地部署项目： 

```
gridsome develop
```

> 如果出现错误`node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`，请运行以下命令：
```
gridsome develop-m1
```

### 3. 创建PR

[创建拉取请求](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) 到[wiki repo](https://github.com/airalab/robonomics-wiki)

## 组件

### Asciinema
Robonomics Wiki支持Asciinema。要插入Asciinema，请按照以下说明操作：
* 在frontmatter块`import Asciinema from '~/components/Asciinema.vue'`之后导入组件
* 作为单独的段落插入`<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`，其中vid是特定asciicast的ID

> 您可以通过单击asciicast页面上的“嵌入”链接获取特定asciicast的小部件脚本。
> 它看起来像这样：
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Asciinema文档](https://asciinema.org/docs/embedding)

在上面的示例中，vid为14。

### 代码

您可以在代码中添加有用的附加功能：

`带有复制按钮的代码`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

或“带有附加行的代码”

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**code-helper 的属性**

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
Robonomics Wiki中的文档包含frontmatter块。它必须位于Markdown文件的顶部，并且必须采用三个破折号之间的有效YAML形式。在三个破折号之间，您可以设置或编辑以下选项：

```YAML
---
title: How to contribute # 页面标题，您不需要在文本中重复它
contributors: [positivecrash] # 主要贡献者（积极管理此页面的人）。需要GitHub昵称，不需要任何其他符号
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/安装ation
    # 用于技术测试的工具
---
```

### Grid 
帮助为元素添加网格布局：

- 首先使用网格包装器组件： 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- 然后在包装器内使用任意数量的网格项组件：

```c
  <robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_6.png" /> 
      <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
      <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS 网关</a></p>
    </robo-wiki-grid-element/>
  </robo-wiki-grid-element-wrapper>
```

**robo-wiki-grid-element-wrapper的属性**

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


### 图片

#### 如何上传 
在文件夹`/docs/images/url-of-your-doc`中上传图像
* 如果图像需要本地化，请将它们全部放在一个文件夹中
* 如果图像本地化，请在图像名称中使用区域附录，例如`image_en.jpg`
* 确保您的图像经过网络优化，同时看起来不错

#### 如何插入 

有两种方法可以在文档中插入图片：

<robo-wiki-note type="warning">

建议使用内置标签`<robo-wiki-picture>`插入图片，但您也可以使用Markdown文件的标准方式。

</robo-wiki-note>

`带标题`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`或不带标题` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`或简单图像` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`或带标题的简单图像`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`带alt的图像`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**robo-wiki-picture的属性：**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### 注释和警告
您可以添加注释并为其指定特定类型：
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`带标题的注释`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`带内容的注释`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`带标题和内容的注释`

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

**robo-wiki-note的属性**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
您可以向文档添加选项卡：

- 使用选项卡包装器组件： 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- 然后在包装器内使用任意数量的选项卡项组件：

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


`水平选项卡`

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

`垂直选项卡`

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

`带边框的选项卡项`

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

**robo-wiki-tabs（包装器）的属性**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**robo-wiki-tab（项）的属性**

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


### 带锚点的标题
您可以创建带锚点的自定义标题并为其指定特定值

`带锚点的标题`

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

**robo-wiki-title的属性**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### 视频

有两种方法可以在文档中插入视频：

<robo-wiki-note type="warning">

建议使用内置标签`<robo-wiki-video>`插入视频，但您也可以使用Markdown文件的标准方式。

</robo-wiki-note>

#### IPFS / Server
您需要指定视频的格式

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'https://cloudflare-ipfs.com/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### 属性

- 如果添加的文件大小超过 <span style="color:#af1c1c">10MB</span>, 请上传到服务器上，而不是存储库中.

- 您可以使用任何属性 [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- 可接受的格式-mp4，webm，ogg。

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
您可以通过将共享链接作为单独的段落插入文档中来嵌入任何YouTube视频，例如：`https://youtu.be/kQaSwNYHJQ8`

但是，如果您需要自动播放，则必须使用特殊组件：

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**robo-wiki-youtube的属性**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## 如何编辑侧边栏导航

如果您需要编辑Robonomics Wiki的侧边栏导航，请按照以下步骤操作：

* 编辑文件`/data/sidebar_docs.yaml`。

* 决定将您的文档放在哪里

* 对于`/data/sidebar_docs.yaml`使用有效的YAML，并依赖于现有的文件结构

* **重要提示**如果您在不同的部分/子部分中使用相同的文档，例如： 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: 树莓派预装镜像
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

请确保像这样添加`topic`参数： 

（导航正常工作）

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

## 如何为文档添加自定义导航

* 编辑文件“/data/sidebar_docs.yaml”。

* 找到正确的文档并添加参数“prev”和“next”，如下所示：

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

* 如果想完全删除导航，则添加`withoutNav`参数：

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* 如果您只想删除`上一页`或`下一页`导航，则添加`withoutPrev`或`withoutNext`参数：

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