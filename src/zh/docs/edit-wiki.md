---
title: 如何编辑维基
contributors: [positivecrash]
description: 帮助我们改进维基的方法
---

**Robonomics维基是开源的。欢迎任何更正：修复错误、拼写错误、一些不清楚或过时的信息，以及翻译成任何语言。您需要一个[GitHub](https://github.com/)账户。**


## 如何编辑

如果您需要编辑Robonomics维基的文档，请按照以下步骤操作

确保您已安装[Node.js](https://nodejs.org/en/download/package-manager/)和[Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool)。

### 1. 克隆仓库

首先，您需要克隆维基仓库：

```
git clone https://github.com/airalab/robonomics-wiki.git
```

进入仓库目录并运行以下命令：

`使用 npm`
```
cd robonomics-wiki
npm install
```

`使用 yarn`
```
cd robonomics-wiki
yarn install
```

### 2. 本地服务（develop, develop-m1）

`node 必须 >= v18`

然后在本地部署项目：

```
npm run start
```

### 3. 创建 PR

[创建拉取请求](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)到[wiki repo](https://github.com/airalab/robonomics-wiki)

## 组件

### Asciinema
Robonomics Wiki支持Asciinema。要插入Asciinema，请按照以下说明操作：
* 在frontmatter块之后导入组件 `import Asciinema from '~/components/Asciinema.vue'`
* 作为单独的段落插入 `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`，其中vid是特定asciicast的ID

> 您可以通过单击asciicast页面上的“嵌入”链接获取特定asciicast的小部件脚本。
> 它看起来像这样：
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Asciinema文档](https://asciinema.org/docs/embedding)

在上面的示例中，vid是14。

{% roboWikiNote {title:"自定义组件", type: "warning"}%} **添加自定义组件时的提示**：
如果在添加组件后布局出现问题，您可能需要检查空格。应该帮助**删除**打开标签和关闭标签后的空格（如下面的示例）{% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### 代码

您可以为您的代码添加一些有用的额外功能：

`带复制按钮的代码`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

一些文本代码
	另一行测试
		其他内容

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

或者`带额外行的代码`

```bash
{% raw %}{% codeHelper { additionalLine: "额外行"}%}{% endraw %}

一些文本代码
	另一行测试
		其他内容

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**代码助手的属性**

| 属性             | 类型       | 必需     | 默认值   | 描述                                                     |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `布尔值`   | `false`  | `false`  | 为您的代码添加一个复制按钮                                |
| `additionalLine` | `字符串`   | `false`  | ''       | 为您的代码添加一个将显示在上方的额外行                     |


{% codeHelper { additionalLine: "额外行", copy: true}%}

```bash
一些文本代码
	另一行测试
		其他内容
```

{% endcodeHelper %}### Frontmatter
Robonomics Wiki中的文档包含frontmatter块。它必须位于Markdown文件的顶部，并且必须采用有效的YAML格式，位于三个虚线之间。在三个虚线之间，您可以设置或编辑以下选项：

```YAML
---
title: 如何贡献 # 页面标题，您无需在文本中重复
contributors: [positivecrash] # 主要贡献者（积极管理此页面的人）。需要GitHub昵称，不需要任何额外符号
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # 用于技术测试的工具
---
```

### Grid
帮助将网格布局添加到元素中：

- 首先使用网格包装组件：

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- 然后在包装器内使用尽可能多的网格项组件：

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} 第一个元素 {% endroboWikiGrid %}
	{% ro...```html
{% roboWikiGridWrapper %}
	{% roboWikiGrid %} 第二个元素 {% endroboWikiGrid %}
	{% roboWikiGrid %} 第三个元素 {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}
```

<br/>

**robo-wiki-grid-wrapper的属性**

| 属性        | 类型      | 必需     | 默认值   | 描述                                                                   |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4       | 您可以选择列数：   <br/> - 从 `1 到 5`                                |
| `align`     | `String` | `false`  |         | 在块轴上对齐项目：   <br/> - 选项：`start, center, end`                |
| `justify`   | `String` | `false`  |         | 在内联轴上对齐项目：  <br/> - 选项：`start, center, end`                |
| `textAlign` | `String` | `false`  | `left`  | 对齐网格内的文本：  <br/> - 选项：`left, center, right`                |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4（至少2GB RAM）</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD卡16Gb</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee适配器（可选） </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee智能设备（可选） </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>设置桌面</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### 图片

#### 如何上传
将图片上传到文件夹 `/docs/images/url-of-your-doc`
* 如果需要本地化图片，请将它们全部放在一个文件夹中
* 如果图片需要本地化，请在图片名称中使用区域附录，例如 `image_en.jpg`
* 确保您的图片在网页优化的同时看起来也很好

#### 如何插入

在文档中插入图片有两种方式：

{% roboWikiNote {type: 'warning'}%} 建议使用内置标签 `<robo-wiki-picture>` 插入图片，但您也可以使用 Markdown 文件的标准方式。 {% endroboWikiNote %}

`带标题`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", link: '/docs/overview', caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`或者不带标题`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki",链接：'/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`或简单图片`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"探索robomomics wiki"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`或带标题的简单图片`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"探索robomomics wiki", caption: "探索"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**robo-wiki-picture的属性:**

| 属性      | 类型       | 必需     | 默认值   | 描述                                                                                                                                                                                                          |
|-----------|-----------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `字符串`  | `true`   |         | 图像路径:  <br/> - 如果您直接上传图像到`/src/assets/images/docs/`，请使用：`url-of-your-doc` <br/> - 如果您将图像上传到其中一个文件夹中，请使用：`folder-name/url-of-your-doc` |
| `link`    | `字符串`  | `false`  |         | 在块轴上对齐项目:   <br/> - 选项：`start, center, end`                                                                                                                                               |`caption` | `String`  | `false`  |         | 在内联轴上对齐项目:  <br/> - 选项: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | 如果用户由于某种原因无法查看图像，则为图像提供替代信息                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | 放大图像                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | 有两个选项: lazy 和 eager                                                                                                                                                                                |

### 注意事项和警告
您可以添加注释并为其指定特定类型:
* 警告 (<span style="color:#f08432">**带有图像**</span>)
* 正确 (<span style="color:#3eaf7c">**绿色**</span>)
* 注释 (<span style="color:#90a4b7">**灰色**</span>)

`带标题的注释`

```c
{% raw %} {% roboWikiNote {title:"EXAMPLE TITLE", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`带内容的注释`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`带标题和内容的注释`

```c
{% raw %} {% roboWikiNote {title: "标题", type: "好的"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "加入Discord", type: "好的"}%} [加入Robonomics开发者Discord](https://discord.gg/jTxqGeF5Qy) 以与社区联系并获得技术支持。 {% endroboWikiNote %}

{% roboWikiNote {title: "加入Discord"}%} [加入Robonomics开发者Discord](https://discord.gg/jTxqGeF5Qy) 以与社区联系并获得技术支持。 {% endroboWikiNote %}

{% roboWikiNote {title: "加入Discord", type: "警告"}%} [加入Robonomics开发者Discord](https://discord.gg/jTxqGeF5Qy) 以与社区联系并获得技术支持。 {% endroboWikiNote %}

**robo-wiki-note的属性**

| 属性     | 类型      | 必需     | 默认值   | 描述                                                       |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `字符串` | `否`     |         | - 总共有三种类型：`note`，`warning`，`okay`                 |
| `title`  | `字符串``|`false`|` | 添加标题到您的笔记中 |


### 标签
您可以向文档中添加标签：

- 使用标签包装组件：

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- 然后在包装器内使用尽可能多的标签项组件：

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`水平标签`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`垂直标签`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],模式：'垂直'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`带边框的选项卡`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**robo-wiki-tabs（包装器）的属性**

| 属性     | 类型      | 必需     | 默认值     | 描述                                                         |
|----------|----------|----------|------------|-------------------------------------------------------------|
| `tabs`   | `数组`   | `true`   |            | - 每个选项卡的标题的数组                                    |
| `mode`   | `字符串` | `false`  | horizontal | 您可以选择选项卡模式：<br/> - `horizontal` <br/> - `vertical` |

**robo-wiki-tab（项目）的属性**

| 属性     | 类型       | 必需     | 默认值  | 描述                   |
|----------|-----------|----------|---------|-----------------------|
| `border` | `布尔值`  | `false`  | `false` | 是否带边框             |false` | - 为内容包装器添加边框 |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### 带锚点的标题
您可以创建带锚点的自定义标题，并为它们赋予特定值

`带锚点的标题`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

或 `不带锚点的标题`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki（自定义标题）{% endroboWikiTitle %}%}

<br/>

**robo-wiki-title的属性**

| 属性     | 类型                   | 必填     | 默认值 | 描述               |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `数字 (从2到6)`         | `true`   |         | 选择标题级别       |
| `anchor` | `字符串`               | `false`  |         | 锚点的值           |

### 视频

在文档中插入视频有两种方式：

{% roboWikiNote {type: "warning"}%} 建议使用内置标签 `<robo-wiki-video>` 插入视频，但也可以使用标准的 Markdown 文件方式。 {% endroboWikiNote %}

#### IPFS / 服务器
您需要指定视频的格式

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"关于网关"}%} 链接的网关会根据配置文件自动选择 - `src/_data/video_config.js`。您可以通过更改配置文件来添加或删除一些网关。文件。{% endroboWikiNote %}

#### 本地

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### 属性

- 如果您要添加的文件大小超过 <span style="color:#af1c1c">10MB</span>，请将其上传到服务器，而不是存储库中。

- 您可以为[HTML5视频标签](https://www.w3schools.com/tags/tag_video.asp)使用任何属性。

- 可接受的格式 - mp4、webm、ogg。

| 属性 | 类型 | 必需 | 默认 | 描述 |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | 对象数组 [{src: `视频路径`, type: `视频类型`}] |


#### YouTube
您可以通过将共享链接作为单独的段落插入文档中来嵌入任何YouTube视频，无需任何额外的引号或标记，例如：`https://youtu.be/kQaSwNYHJQ8`

但是，如果您需要自动播放，您必须使用特殊组件：

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%endroboWikiYoutube %}{% endraw %}
```

**robo-wiki-youtube的属性**

| 属性 | 类型 | 必需 | 默认值 | 描述 |
|---|---|---|---|---|
| `link` | `String` | `true` |  | 指向YouTube视频的链接 |
| `autoplay` | `Boolean` | `false` | `false` | 自动播放YouTube视频 |
| `loop` | `Boolean` | `false` | `false` | 循环播放YouTube视频 |


## 如何编辑侧边栏导航

如果您需要编辑Robonomics Wiki的侧边栏导航，请按照以下步骤操作：

* 编辑文件 `src/_data/sidebar_docs.json`。

* 决定在哪里放置您的文档

* 使用有效的JSON格式编辑 `src/_data/sidebar_docs.json`，并依赖现有的文件结构

* **重要提示：** 如果您在不同部分/子部分中使用相同的文档，例如：

```

{
	"title": "升级Home Assistant OS",
	"children": [
	{
		"title": "激活订阅",
		"url": "/docs/sub-activate",
	}],
	"title": "升级Home Assistant Docker for Unix-like OS",
		"children": [
	{
		"title": "激活订阅",
		"url": "/docs/sub-activate",
	}],
}

```

请确保像这样添加 `topic` 参数：

（为了使导航正常工作）```
{
	"title": "升级 Home Assistant OS",
	"children": [
	{
		"title": "订阅激活",
		"url": "/docs/sub-activate",
		"topic": "升级 Home Assistant OS"
	}],
	"title": "升级 Unix-like OS 的 Home Assistant Docker",
		"children": [
	{
		"title": "订阅激活",
		"url": "/docs/sub-activate",
		"topic": "升级 Unix-like OS 的 Home Assistant Docker"
	}],
}

```

## 如何为文档添加自定义导航

* 编辑文件 `src/_data/sidebar_docs.json`。

* 找到正确的文档，并像这样添加 `prev` 和 `next` 参数：

```
	{
		"title": "概览",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "添加用户",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "添加用户",
				"url": "/docs/add-user"
			}
		],
	},

```

* 如果要完全删除导航，则添加 `withoutNav` 参数：

```
{
	"title": "概览",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* 如果您想要删除只需`上一页`或`下一页`导航，然后添加`withoutPrev`或`withoutNext`参数：

```
{
	"title": "概览",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

或者

```
{
	"title": "概览",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## 如何翻译文档

{% roboWikiNote {title: '重要', type: 'warning'}%} 您必须创建 **.env** 文件，并添加 *OPENAI_KEY* 变量及您的密钥 {% endroboWikiNote %}

如果您希望翻译您的md文档，您需要运行以下命令：

```bash
npm run translate-md
```

运行命令后，您只需等待，可能需要检查文件（AI翻译可能存在一些缺陷）。

### 翻译故障排除

您可能会遇到一些翻译问题。

1. 尝试再次运行命令，看看是否有效。

2. 有时md文件中的标签可能被错误地书写，例如：


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

然后，您只需要修复标签。