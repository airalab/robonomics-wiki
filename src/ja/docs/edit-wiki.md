---
title: Wikiの編集方法
contributors: [positivecrash]
description: 当Wikiを改善する方法
---

**Robonomics Wikiはオープンソースです。修正は歓迎されます: エラーの修正、誤字脱字の修正、不明瞭または古い情報の修正、あらゆる言語への翻訳。[GitHub](https://github.com/)アカウントが必要です。**


## 編集方法

Robonomics Wikiのドキュメントを編集する必要がある場合は、以下の手順に従ってください。

[Node.js](https://nodejs.org/en/download/package-manager/)がインストールされていることを確認してください。

### 1. リポジトリをクローン

まず、Wikiリポジトリをクローンする必要があります:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

リポジトリのディレクトリに移動し、次のコマンドを実行します:

`npmを使用`
```
cd robonomics-wiki
npm install
```

`yarnを使用`
```
cd robonomics-wiki
yarn install
```

### 2. ローカルでサーブ（develop, develop-m1）

`nodeのバージョンは20 || >=22である必要があります`

次に、プロジェクトをローカルで展開します:

```
npm run start
```

> .envファイルを.env.exampleファイルと同じ変数で作成する必要があるかもしれません

### 3. PRを作成

[プルリクエストを作成](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) to [wiki repo](https://github.com/airalab/robonomics-wiki)

## コンポーネント

{% roboWikiNote {title:"カスタムコンポーネント", type: "warning"}%} カスタムコンポーネントを追加する際の**ヒント**：
コンポーネントを追加した後にレイアウトに問題がある場合は、スペースを確認してみてください。開始タグと終了タグの後にスペースを**削除**すると役立ちます（以下の例のように）{% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### コード

コードに便利な追加機能を追加できます：

`コピーボタン付きコード`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

または`追加行付きコード`

```bash
{% raw %}{% codeHelper { additionalLine: "additional line"}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**コードヘルパーのプロパティ**

| プロパティ         | タイプ| 必須 | デフォルト | 説明 |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | コードにコピー ボタンを追加します                           |
| `additionalLine` | `String`  | `false`  | ''       | コードの上に表示される追加行 |


{% codeHelper { additionalLine: "additional line", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}


### フロントマター
Robonomics Wikiのドキュメントには、フロントマターブロックが含まれています。Markdownファイルの先頭に配置する必要があり、トリプルダッシュで囲まれた有効なYAML形式である必要があります。トリプルダッシュの間に、以下のオプションを設定または編集できます:

```YAML
---
title: How to contribute # ページのタイトル、テキスト内で重複する必要はありません
contributors: [positivecrash] # メインの寄稿者（このページを積極的に管理している人）。追加の記号は不要で、GitHubのニックネームが必要です
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # テクノロジーテストに使用されたツール
---
```

### グリッド
要素にグリッドレイアウトを追加するのに役立ちます：

- まずグリッドラッパーコンポーネントを使用します：

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- 次に、ラッパー内に好きなだけグリッドアイテムコンポーネントを使用します：

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} 最初の要素 {% endroboWikiGrid %}
	{% roboWikiGrid %} 2番目の要素 {% endroboWikiGrid %}
	{% roboWikiGrid %} 3番目の要素 {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**robo-wiki-grid-wrapperのプロパティ**

| プロパティ  | タイプ     | 必須     | デフォルト | 説明                                                                    |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4       | 列数を選択できます：   <br/> - `1から5`の範囲から選択可能                  |
| `align`     | `String` | `false`  |         | ブロック軸上のアイテムの配置：   <br/> - オプション： `start, center, end` |
| `justify`   | `String` | `false`  |         | インライン軸上のアイテムを整列する:  <br/> - オプション: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | グリッド内のテキストを整列する:  <br/> - オプション: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (少なくとも2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SDカード16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbeeアダプタ（オプション） </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee スマートデバイス（オプション） </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>セットアップ用デスクトップ</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### 画像

#### アップロード方法
画像を `src/assets/docs/images/url-of-your-doc` フォルダにアップロードします
* 画像をローカライズする必要がある場合は、すべての画像を1つのフォルダに挿入します
* ローカライズされた場合は、画像の名前にロケールの付録を使用します。例：`image_en.jpg`
* 画像がウェブ最適化されており、同時に見栄えが良いことを確認してください

#### 挿入方法

ドキュメントに画像を挿入する方法は2つあります：

{% roboWikiNote {type: 'warning'}%} 画像を組み込みタグ `<robo-wiki` を使用して挿入することをお勧めします-画像>`を使用することもできますが、Markdownファイルの標準的な方法も使用できます。{% endroboWikiNote %}

`キャプション付き`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wikiを探索", link: '/docs/overview', caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`キャプションなし`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wikiを探索", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`またはシンプルな画像`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wikiを探索"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`またはキャプション付きのシンプルな画像`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wikiを探索", caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**robo-wiki-pictureのプロパティ:**

| プロパティ | タイプ | 必須 | デフォルト | 説明 ||----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | 画像へのパス:  <br/> - 画像を直接 `/src/assets/images/docs/` にアップロードした場合は、`url-of-your-doc` を使用します <br/> - 画像をフォルダのいずれかにアップロードした場合は、`folder-name/url-of-your-doc` を使用します |
| `link`    | `String`  | `false`  |         | ブロック軸上のアイテムの配置:   <br/> - オプション: `start, center, end`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | インライン軸上のアイテムの配置:  <br/> - オプション: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | 画像が何らかの理由で表示できない場合の代替情報を提供します                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | 画像を拡大表示します                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | lazy と eager の2つのオプションがあります                                                                                                                                                                                |

### ノートと警告
ノートを追加し、特定のタイプを指定できます:
* 警告 (<span style="color:#f08432">**画像付き**</span>)
* OK (<span style="color:#3eaf7c">**緑色**</span>)
* ノート (<span style="color:#90a4b7">**グレー色**</span>)

`タイトル付きのノート`

```c
{% raw %} {% roboWikiNote {title:"例のタイトル", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`内容付きのノート`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`タイトルと内容付きのノート`

```c
{% raw %} {% roboWikiNote {title: "タイトル", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Discordに参加", type: "okay"}%} [Robonomics Developers Discordに参加](https://discord.gg/jTxqGeF5Qy) コミュニティと技術サポートを受けるために参加してください。 {% endroboWikiNote %}

{% roboWikiNote {title: "Discordに参加"}%} [Robonomics Developers Discordに参加](https://discord.gg/jTxqGeF5Qy) コミュニティと技術サポートを受けるために参加してください。 {% endroboWikiNote %}

{% roboWikiNote {title: "```yaml
Join Discord", type: "warning"}%} [Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support. {% endroboWikiNote %}

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
{% endroboWikiTabs %}{% endraw %}
```

<br/>

`水平タブ`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`垂直タブ`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`境界線付きのタブアイテム`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**robo-wiki-tabs（ラッパー）のプロパティ**

| プロパティ | タイプ | 必須 | デフォルト | 説明 |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - 各タブのタイトルを含む配列                                  |
| `mode`   | `String` | `false`  | horizontal | タブのモードを選択できます: <br/> - `horizontal` <br/> - `vertical` |

**robo-wiki-tab（アイテム）のプロパティ**

| プロパティ | タイプ      | 必須 | デフォルト | 説明                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - コンテンツラッパーに境界線を追加する |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### アンカーを持つタイトル
アンカーを持つカスタムタイトルを作成し、特定の値を付けることができます`アンカー付きタイトル`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

または`アンカーなしのタイトル`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (カスタムタイトル) {% endroboWikiTitle %}

<br/>

**robo-wiki-titleのプロパティ**

| プロパティ | タイプ                   | 必須 | デフォルト | 説明          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Number (2から6まで)` | `true`   |         | 見出しレベルを選択 |
| `anchor` | `String`               | `false`  |         | アンカーの値 |

### 動画

ドキュメントに動画を挿入する方法は2つあります：

{% roboWikiNote {type: "warning"}%} ビデオは組み込みタグ `<robo-wiki-video>` を使用して挿入することをお勧めしますが、Markdownファイルの標準的な方法も使用できます。 {% endroboWikiNote %}

#### IPFS / サーバー
ビデオの形式を指定する必要があります

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"ゲートウェイについて"}%} リンクのゲートウェイは、`src/_data/video_config.js`ファイルから自動的に選択されます。ファイルを変更することで、いくつかのゲートウェイを追加または削除できます。 {% endroboWikiNote %}


#### ローカル

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### プロパティ

- <span style="color:#af1c1c">10MB</span> より大きいサイズのファイルを追加する場合は、リポジトリではなくサーバーにアップロードしてください。

- [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp)のために任意のプロパティを使用できます。

- 受け入れ可能なフォーマット - mp4、webm、ogg。

| プロパティ | タイプ | 必須 | デフォルト | 説明 |
|---|---|---|---|---|
| `videos` |`Array` | `true` |  | オブジェクトの配列 [{src: `ビデオのパス`, type: `ビデオの種類`}] |


#### YouTube
ドキュメントにYouTubeのビデオを埋め込むには、共有リンクを追加の引用符やタグなしで別々の段落として挿入します。例: `https://youtu.be/kQaSwNYHJQ8`

ただし、自動再生が必要な場合は、特別なコンポーネントを使用する必要があります:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**robo-wiki-youtubeのプロパティ**

| プロパティ | タイプ | 必須 | デフォルト | 説明 |
|---|---|---|---|---|
| `link` | `String` | `true` |  | YouTubeビデオへのリンク |
| `autoplay` | `Boolean` | `false` | `false` | YouTubeビデオを自動再生 |
| `loop` | `Boolean` | `false` | `false` | YouTubeビデオをループ再生 |


## サイドバーナビゲーションの編集方法

Robonomics Wikiのサイドバーナビゲーションを編集する必要がある場合は、次の手順に従ってください:

* ファイル `src/_data/sidebar_docs.json` を編集します。

* ドキュメントを配置する場所を決定します。

* `src/_data/sidebar_docs.json` に有効なJSONを使用し、それに依存します。既存のファイル構造

* 新しいコンテンツを翻訳する場合は、`translations/pages/en.json` ファイルにも新しい行を追加する必要があります。例:

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **重要な注意:** 同じドキュメントを異なるセクション/サブセクションで使用している場合、例:

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

`topic` パラメータを次のように追加してください:

(ナビゲーションが正しく機能するようにするため)

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

## ドキュメントにカスタムナビゲーションを追加する方法

* ファイルを編集`src/_data/sidebar_docs.json`。

* 適切なドキュメントを見つけ、次のように`prev`と`next`のパラメータを追加します：

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

* ナビゲーションを完全に削除したい場合は、`withoutNav`パラメータを追加します：

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* `前のページ`または`次のページ`のナビゲーションを削除したい場合は、`withoutPrev`または`withoutNext`パラメータを追加します：

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

または

```
{
	"title": "Overview",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## ドキュメントの翻訳方法

{% roboWikiNote {title: '重要', type: 'warning'}%} **を作成する必要があります.env**ファイルに、*OPENAI_KEY*変数をキーとともに追加してください {% endroboWikiNote %}

mdドキュメントを翻訳したい場合は、次のコマンドを実行してください：

```bash
npm run translate-md
```

{% roboWikiNote {title: '簡単に翻訳する', type: 'warning'}%} すべてを一度に翻訳するには、ページ内のすべての新しい行、新しいドキュメント、または変更されたドキュメントを翻訳するには、今は1つのコマンドだけが必要です {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> また、翻訳が必要な変更されたファイルのみを翻訳していることを確認してください。たとえば、5つのファイルを変更する必要があるとします。そのうち3つはテキストの変更と古い情報の削除が含まれております。残りの2つは、いくつかの画像のリンクを更新するか、外部リンクを変更する必要があるかだけです。この場合、最初の3つのファイルを変更して翻訳し、その後に他の2つのリンクを変更することが賢明です。

> 翻訳はすべての変更されたファイルに適用されますが、更新されたリンクには必要ありません。特にファイルが大きい場合は、翻訳に時間がかかるためです。

必要なコマンドを実行した後は、待つだけでよく、ファイルを確認することもできます（AI翻訳にはいくつかの欠陥があります）。ファイルをチェックするには、`npm run build` を実行し、エラーがないか確認します。

### 翻訳のトラブルシューティング

翻訳に関する問題が発生する可能性があります。

1. コマンドを再度実行してみて、うまくいくかどうかを確認してください。

2. 時々、タグが消えることがあります。mdファイルには、次のように間違って書かれることがあります：

```
{%raw %}
	[11ty] 1. Having trouble rendering njk template ./src/de/docs/edit-wiki.md (via TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Line 168, Column 96]
	[11ty]   unknown block tag: endroboWiki (via Template render error)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}
{% endraw %}
```

その後、タグを修正する必要があります。