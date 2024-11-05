---
title: 如何编辑维基
contributors: [positivecrash]
description: 帮助我们改进维基的方法
---

**Robonomics维基是开源的。欢迎任何更正：修复错误、拼写错误、一些不清楚或过时的信息，以及任何语言的翻译。您需要一个[GitHub](https://github.com/)账户。**


## 如何编辑

如果您需要编辑Robonomics维基的文档，请按照以下步骤操作

确保您已安装[Node.js](https://nodejs.org/en/download/package-manager/)。

### 1. 克隆存储库

首先，您需要克隆维基存储库：

```
git clone https://github.com/airalab/robonomics-wiki.git
```

转到存储库的目录并运行以下命令：

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

`node版本必须是20 || >=22`

然后在本地部署项目：

```
npm run start
```

> 可能需要创建一个与.env.example文件中相同变量的.env文件

### 3. 创建PR

[创建拉取请求](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) 到[wiki repo](https://github.com/airalab/robonomics-wiki)

## 组件

{% roboWikiNote {title:"自定义组件", type: "warning"}%} 添加自定义组件时的**提示**：
如果在添加组件后布局出现问题，您可能需要检查空格。应该有助于**删除**打开标签和关闭标签之后的空格（就像下面的示例中一样）{% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"测试", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### 代码

您可以为您的代码添加有用的额外内容：

`带有复制按钮的代码`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

一些文本代码
	另一行测试
		其他内容

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

或者`带有额外行的代码`

```bash
{% raw %}{% codeHelper { additionalLine: "额外行"}%}{% endraw %}

一些文本代码
	另一行测试
		其他内容

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**代码助手的属性**

| 属性         | 类型| 必需 | 默认 | 描述 |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `布尔值` | `false`  | `false`  | 为您的代码添加一个复制按钮                           |
| `additionalLine` | `字符串`  | `false`  | ''       | 将显示在您的代码上方的附加行 |


{% codeHelper { additionalLine: "additional line", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}


### 前言
Robonomics Wiki中的文档包含前言块。它必须位于Markdown文件的顶部，并且必须采用三个破折号之间的有效YAML形式。在三个破折号之间，您可以设置或编辑以下选项：

```YAML
---
title: 如何贡献 # 页面标题，您无需在文本中重复
contributors: [positivecrash] # 主要贡献者（积极管理此页面的人）。需要GitHub昵称，不需要任何其他符号
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # 用于技术测试的工具
---
```

### 网格
帮助为元素添加网格布局：

- 首先使用网格包装组件：

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- 然后在包装器内部使用尽可能多的网格项组件：

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} 第一个元素 {% endroboWikiGrid %}
	{% roboWikiGrid %} 第二个元素 {% endroboWikiGrid %}
	{% roboWikiGrid %} 第三个元素 {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**robo-wiki-grid-wrapper 的属性**

| 属性        | 类型      | 必需     | 默认值   | 描述                                                                  |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4       | 您可以选择列数：   <br/> - 从 `1 到 5`                                |
| `align`     | `String` | `false`  |         | 在块轴上对齐项目：   <br/> - 选项：`start, center, end`               |
| `justify`   | `String` | `false`  |         | 对齐内联轴上的项目:  <br/> - 选项: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | 对齐网格内的文本:  <br/> - 选项: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4（至少2 GB RAM）</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD 卡 16Gb</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee 适配器（可选） </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee 智能设备（可选） </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>用于设置的桌面</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### 图片

#### 如何上传
在文件夹 `src/assets/docs/images/url-of-your-doc` 中上传图片
* 如果需要本地化图片，请将它们全部放在一个文件夹中
* 如果图片是本地化的，请在图片名称中使用区域附录，例如 `image_en.jpg`
* 确保您的图片经过了网络优化，同时看起来也很好

#### 如何插入

在文档中插入图片有两种方法：

{% roboWikiNote {type: 'warning'}%} 建议使用内置标签 `<robo-wiki` 插入图片-图片>`，但您也可以使用Markdown文件的标准方式。{% endroboWikiNote %}

`带标题`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"探索robomomics wiki", link: '/docs/overview', caption: "探索"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`或者不带标题`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"探索robomomics wiki", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`或者简单图片`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"探索robomomics wiki"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`或者带标题的简单图片`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"探索robomomics wiki", caption: "探索"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**robo-wiki-picture的属性:**

| 属性      | 类型      | 必需     | 默认值   | 描述                                                                                                                                                   |
|-----------|-----------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | 图像路径：<br/> - 如果您直接将图像上传到 `/src/assets/images/docs/` 中，请使用：`url-of-your-doc` <br/> - 如果您将图像上传到其中一个文件夹中，请使用：`folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | 在块轴上对齐项目：<br/> - 选项：`start, center, end`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | 在内联轴上对齐项目：<br/> - 选项：`start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | 如果用户由于某种原因无法查看图像，则为图像提供替代信息                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | 放大图像                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | 有两个选项：lazy 和 eager                                                                                                                                                                                |

### 注意事项和警告
您可以添加注释并为它们指定特定类型：
* 警告 (<span style="color:#f08432">**带有图像**</span>)
* 正确 (<span style="color:#3eaf7c">**绿色**
* 注释（**灰色**）

`带标题的注释`

```c
{% raw %} {% roboWikiNote {title:"示例标题", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`带内容的注释`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`带标题和内容的注释`

```c
{% raw %} {% roboWikiNote {title: "标题", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "加入Discord", type: "okay"}%} [加入Robonomics开发者Discord](https://discord.gg/jTxqGeF5Qy) 与社区联系并获得技术支持。 {% endroboWikiNote %}

{% roboWikiNote {title: "加入Discord"}%} [加入Robonomics开发者Discord](https://discord.gg/jTxqGeF5Qy) 与社区联系并获得技术支持。 {% endroboWikiNote %}

{% roboWikiNote {title: "加入Discord", type: "warning"}%} [加入Robonomics开发者Discord](https://discord.gg/jTxqGeF5Qy) 与社区联系并获取技术支持。 {% endroboWikiNote %}

**robo-wiki-note的属性**

| 属性     | 类型      | 必需     | 默认值   | 描述                                                         |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `false`  |         | - 总共有三种类型：`note`，`warning`，`okay`                   |
| `title`  | `String` | `false`  |         | 为您的注释添加标题                                           |


### 选项卡
您可以向文档添加选项卡：

- 使用选项卡包装组件：

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- 然后在包装器内使用尽可能多的选项卡项组件：

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}{% endraw %}
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
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
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

| 属性     | 类型   | 必需   | 默认值 | 描述             |
|----------|--------|--------|----------|------------------||----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - 包含每个选项卡标题的数组                                  |
| `mode`   | `String` | `false`  | horizontal | 您可以选择选项卡模式：<br/> - `horizontal` <br/> - `vertical` |

**robo-wiki-tab（项目）的属性**

| 属性 | 类型      | 必需 | 默认值 | 描述                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - 为内容包装器添加边框 |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### 带锚点的标题
您可以创建带有锚点的自定义标题，并为它们指定特定值`带锚点的标题`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

或者`不带锚点的标题`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki（自定义标题）{% endroboWikiTitle %}

<br/>

**robo-wiki-title的属性**

| 属性     | 类型                   | 必填     | 默认值   | 描述                 |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `数字（从2到6）`       | `true`   |         | 选择标题级别         |
| `anchor` | `字符串`               | `false`  |         | 锚点的值             |

### 视频

在文档中插入视频有两种方式：

{% roboWikiNote {type: "warning"}%} 建议使用内置标签`<robo-wiki-video>`插入视频，但您也可以使用Markdown文件的标准方式。 {% endroboWikiNote %}

#### IPFS / 服务器
您需要指定视频的格式

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"关于网关"}%} 网关链接会根据配置文件自动选择 - `src/_data/video_config.js`。您可以通过更改文件来添加或删除一些网关。 {% endroboWikiNote %}


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
| `videos` |`Array` | `true` |  | 包含对象的数组 [{src: `视频路径`, type: `视频类型`}] |


#### YouTube
您可以通过将共享链接作为单独的段落插入文档中来嵌入任何 YouTube 视频，例如：`https://youtu.be/kQaSwNYHJQ8`

但是，如果您需要自动播放，您必须使用特殊组件：

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**robo-wiki-youtube 的属性**

| 属性 | 类型 | 必需 | 默认 | 描述 |
|---|---|---|---|---|
| `link` | `String` | `true` |  | YouTube 视频链接 |
| `autoplay` | `Boolean` | `false` | `false` | 自动播放 YouTube 视频 |
| `loop` | `Boolean` | `false` | `false` | 循环播放 YouTube 视频 |


## 如何编辑侧边栏导航

如果您需要编辑 Robonomics Wiki 的侧边栏导航，请按照以下步骤操作：

* 编辑文件 `src/_data/sidebar_docs.json`。

* 决定在何处放置您的文档

* 使用有效的 JSON 格式编辑 `src/_data/sidebar_docs.json` 并依赖于现有文件结构

* 如果您之前没有翻译新内容，您必须在翻译文件 `translations/pages/en.json` 中添加新行，例如：

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **重要提示：** 如果您在不同部分/子部分中使用相同的文档，例如：

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

请确保像这样添加 `topic` 参数：

（为了使导航正常工作）

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

## 如何为文档添加自定义导航

* 编辑文件`src/_data/sidebar_docs.json`。

* 找到正确的文档，像这样添加参数 `prev` 和 `next`：

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

* 如果要完全删除导航，则添加 `withoutNav` 参数：

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* 如果只想删除 `上一页` 或 `下一页` 导航，则添加 `withoutPrev` 或 `withoutNext` 参数：

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

或者

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## 如何翻译文档

{% roboWikiNote {title: '重要', type: 'warning'}%} 您必须创建 **.env** 文件并添加 *OPENAI_KEY* 变量与您的密钥 {% endroboWikiNote %}

如果您希望翻译您的 md 文档，您需要运行以下命令：

```bash
npm run translate-md
```

{% roboWikiNote {title: '轻松翻译', type: 'warning'}%} 要一次性翻译所有内容，每个页面中的新行、新文档或更改的文档，现在只需要一个命令 {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> 另外，请确保您只翻译需要翻译的已更改文件。例如，您需要更改 5 个文件。其中三个包括文本更改和删除一些过时信息。另外两个需要更新一些图片的链接或只是更改外部链接。在这种情况下，最好先更改前三个文件并翻译它们，然后再更改其他两个文件中的链接。

> 翻译会应用于所有更改的文件，但对于更新的链接并不是必要的，特别是如果文件很大，因此翻译需要一些时间。

运行所需的命令后，您只需等待，也许检查一下文件（AI 翻译可能存在一些缺陷）。要檢查文件，請執行`npm run build`並查看是否有任何錯誤。

### 翻译故障排除

您可能会在翻译过程中遇到一些问题。

1. 尝试重新运行命令，看看是否有效。

2. 有时标签在md文件中可能会写错，例如：

```
{%raw %}
	[11ty] 1. 在渲染njk模板./src/de/docs/edit-wiki.md时遇到问题（通过TemplateContentRenderError）
	[11ty] 2. (./src/de/docs/edit-wiki.md) [第168行，第96列]
	[11ty]   未知的块标签：endroboWiki（通过模板渲染错误）
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}
{% endraw %}
```

然后，您只需要修复标签。