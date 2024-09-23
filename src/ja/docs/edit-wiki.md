---
title: Wikiの編集方法
contributors: [positivecrash]
description: 当Wikiを改善する方法
---

**Robonomics Wikiはオープンソースです。修正は歓迎します：エラーの修正、誤字脱字の修正、不明瞭または古い情報の修正、あらゆる言語への翻訳。[GitHub](https://github.com/)アカウントが必要です。**


## 編集方法

Robonomics Wikiのドキュメントを編集する必要がある場合は、以下の手順に従ってください。

[Node.js](https://nodejs.org/en/download/package-manager/)がインストールされていることを確認してください。

### 1. リポジトリをクローン

まず、Wikiリポジトリをクローンする必要があります：

```
git clone https://github.com/airalab/robonomics-wiki.git
```

リポジトリのディレクトリに移動し、次のコマンドを実行します：

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

`nodeはv18以上である必要があります`

次に、プロジェクトをローカルで展開します：

```
npm run start
```

### 3. PRを作成

[プルリクエストを作成](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)[wikiリポジトリ](https://github.com/airalab/robonomics-wiki)

## コンポーネント

{% roboWikiNote {title:"カスタムコンポーネント", type: "warning"}%} カスタムコンポーネントを追加する際の**ヒント**：
コンポーネントを追加した後にレイアウトに問題がある場合は、スペースを確認してみてください。開始タグと終了タグの後にスペースが**削除**されていることを確認すると役立ちます（以下の例のように）{% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### コード

コードに便利な追加機能を追加できます：

`コピー ボタン付きのコード`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

または `追加行付きのコード`

```bash
{% raw %}{% codeHelper { additionalLine: "additional line"}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**コードヘルパーのプロパティ**

| プロパティ         | タイプ      | 必須 | デフォルト  | 説明                                               |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | コードにコピー ボタンを追加する                           |
| `additionalLine` | `String`  | `false`  | ''       | コードに表示される追加行 |


{% codeHelper { additionalLine: "additional line", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}


### フロントマター
Robonomics Wikiのドキュメントには、フロントマターブロックが含まれています。Markdownファイルの先頭に配置する必要があり、有効なYAML形式でトリプルダッシュで囲まれた間に配置する必要があります。トリプルダッシュで囲まれた間には、以下のオプションを設定または編集できます：

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
    # テクノロジーテストに使用されたツール
---
```

### グリッド
要素にグリッドレイアウトを追加するのに役立ちます：

- まず、グリッドラッパーコンポーネントを使用します：

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- 次に、ラッパー内に好きなだけグリッドアイテムコンポーネントを使用します：

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} first element {% endroboWikiGrid %}
	{% roboWikiGrid %} second element {% endroboWikiGrid %}
	{% roboWikiGrid %} third element {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}{% endraw %}
```

<br/>

**robo-wiki-grid-wrapperのプロパティ**

| プロパティ    | タイプ     | 必須     | デフォルト | 説明                                                            |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4       | 列数を選択できます:   <br/> - `1 から 5`                  |
| `align`     | `String` | `false`  |         | ブロック軸上のアイテムの配置:   <br/> - オプション: `start, center, end` |
| `justify`   | `String` | `false`  |         | インライン軸上のアイテムの配置:  <br/> - オプション: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | グリッド内のテキストの配置:  <br/> - オプション: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4（少なくとも2 GB RAM）</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SDカード16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbeeアダプタ（オプション） </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbeeスマートデバイス（オプション） </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>セットアップ用デスクトップ</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### 画像

#### アップロード方法
画像を`src/assets/docs/images/url-of-your-doc`フォルダにアップロードします
* 画像をローカライズする必要がある場合は、すべてを1つのフォルダに挿入します
* ローカライズされた場合は、画像の名前にロケールの付録を使用してください。例：`image_en.jpg`
* 画像がウェブ最適化されており、同時に見栄えが良いことを確認してください

#### 挿入方法

ドキュメントに画像を挿入する方法は2つあります：

{% roboWikiNote {type: 'warning'}%} 画像は組み込みタグ `<robo-wiki-picture>` を使用して挿入することをお勧めしますが、Markdownファイルの標準的な方法も使用できます。 {% endroboWikiNote %}

`キャプション付き`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", link: '/docs/overview', caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`またはキャプションなし`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki",link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`またはシンプルな画像`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`またはキャプション付きのシンプルな画像`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**robo-wiki-pictureのプロパティ:**

| プロパティ | タイプ     | 必須     | デフォルト | 説明                                                                                                                                                   |
|-----------|-----------|----------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | 画像へのパス:  <br/> - 画像を直接 `/src/assets/images/docs/` にアップロードした場合は、`url-of-your-doc` を使用 <br/> - 画像をフォルダにアップロードした場合は、`folder-name/url-of-your-doc` を使用 |
| `link`    | `String`  | `false`  |         | ブロック軸上のアイテムの配置:   <br/> - オプション: `start, center, end`                                                                                   |`caption` | `String`  | `false`  |         | インライン軸上のアイテムを整列させます:  <br/> - オプション: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | 画像を何らかの理由で表示できない場合の代替情報を提供します                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | 画像を拡大します                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | lazy と eager の2つのオプションがあります                                                                                                                                                                                |

### ノートと警告
ノートを追加し、特定のタイプを指定できます:
* 警告 (<span style="color:#f08432">**画像あり**</span>)
* OK (<span style="color:#3eaf7c">**緑色**</span>)
* ノート (<span style="color:#90a4b7">**グレー**</span>)

`タイトル付きノート`

```c
{% raw %} {% roboWikiNote {title:"EXAMPLE TITLE", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`内容付きノート`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`タイトルと内容を持つノート`

```c
{% raw %} {% roboWikiNote {title: "TITLE", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Join Discord", type: "okay"}%} [Robonomics Developers Discordに参加](https://discord.gg/jTxqGeF5Qy) コミュニティと技術サポートを受けるために参加してください。 {% endroboWikiNote %}

{% roboWikiNote {title: "Join Discord"}%} [Robonomics Developers Discordに参加](https://discord.gg/jTxqGeF5Qy) コミュニティと技術サポートを受けるために参加してください。 {% endroboWikiNote %}

{% roboWikiNote {title: "Join Discord", type: "warning"}%} [Robonomics Developers Discordに参加](https://discord.gg/jTxqGeF5Qy) コミュニティと技術サポートを受けるために参加してください。 {% endroboWikiNote %}

**robo-wiki-noteのプロパティ**

| プロパティ | タイプ     | 必須 | デフォルト | 説明                                                 |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `false`  |         | - `note`, `warning`, `okay` の3つのタイプがあります |
| `title`  | `String``|`false`|` | ノートにタイトルを追加します。


### タブ
ドキュメントにタブを追加できます：

- タブラッパーコンポーネントを使用します：

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- そして、ラッパー内に好きなだけタブアイテムコンポーネントを使用します：

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
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
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],mode: 'vertical'} %}
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

**robo-wiki-tabs（ラッパー）のプロパティ**

| プロパティ | タイプ     | 必須     | デフォルト | 説明                                                             |
|------------|------------|----------|------------|------------------------------------------------------------------|
| `tabs`     | `Array`    | `true`   |            | - 各タブのタイトルを含む配列                                      |
| `mode`     | `String`   | `false`  | horizontal | タブモードを選択できます：<br/> - `horizontal` <br/> - `vertical` |

**robo-wiki-tab（アイテム）のプロパティ**

| プロパティ | タイプ      | 必須     | デフォルト | 説明                             |
|------------|-------------|----------|-----------|---------------------------------|
| `border`   | `Boolean`   | `false`  | `false`   |false` | - コンテンツラッパーにボーダーを追加します |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### アンカー付きタイトル
アンカーを持つカスタムタイトルを作成し、特定の値を付けることができます

`アンカー付きタイトル`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

または`アンカーなしのタイトル`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (カスタムタイトル) {% endroboWikiTitle %}%}

<br/>

**robo-wiki-titleのプロパティ**

| プロパティ | タイプ                   | 必須 | デフォルト | 説明          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Number (2から6まで)` | `true`   |         | 見出しレベルを選択します |
| `anchor` | `String`               | `false`  |         | アンカーの値 |

### 動画

ドキュメントに動画を挿入する方法は2つあります：

{% roboWikiNote {type: "warning"}%} 動画は組み込みタグ `<robo-wiki-video>` を使用して挿入することをお勧めしますが、Markdownファイルの標準的な方法も使用できます。 {% endroboWikiNote %}

#### IPFS / サーバー
動画の形式を指定する必要があります

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"ゲートウェイについて"}%} リンクのためのゲートウェイは、`src/_data/video_config.js` の設定ファイルから自動的に選択されます。いくつかのゲートウェイを追加または削除することで、file. {% endroboWikiNote %}


#### ローカル

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### プロパティ

- サイズが<span style="color:#af1c1c">10MB</span>を超えるファイルを追加する場合は、リポジトリではなくサーバーにアップロードしてください。

- [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp) には任意のプロパティを使用できます。

- 受け入れ可能なフォーマット - mp4、webm、ogg。

| プロパティ | タイプ | 必須 | デフォルト | 説明 |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | オブジェクトの配列 [{src: `ビデオのパス`, type: `ビデオの種類`}] |


#### YouTube
共有リンクを別の段落として挿入することで、任意のYouTubeビデオをドキュメントに埋め込むことができます。追加の引用符やタグは不要です。例: `https://youtu.be/kQaSwNYHJQ8`

ただし、自動再生が必要な場合は、特別なコンポーネントを使用する必要があります:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%endroboWikiYoutube %}{% endraw %}
```

**robo-wiki-youtubeのプロパティ**

| プロパティ | タイプ | 必須 | デフォルト | 説明 |
|---|---|---|---|---|
| `link` | `String` | `true` |  | YouTubeビデオへのリンク |
| `autoplay` | `Boolean` | `false` | `false` | YouTubeビデオを自動再生します |
| `loop` | `Boolean` | `false` | `false` | YouTubeビデオをループ再生します |


## サイドバーのナビゲーションを編集する方法

Robonomics Wikiのサイドバーのナビゲーションを編集する必要がある場合は、次の手順に従ってください：

* ファイル `src/_data/sidebar_docs.json` を編集します。

* ドキュメントを配置する場所を決定します。

* `src/_data/sidebar_docs.json` に有効なJSONを使用し、既存のファイル構造に依存します。

* **重要な注意:** 同じドキュメントを異なるセクション/サブセクションで使用している場合は、例えば：

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

ナビゲーションが正常に機能するようにするために、次のように `topic` パラメータを追加してください：```
{
	"title": "ホームアシスタントOSのアップグレード",
	"children": [
	{
		"title": "サブスクリプションの有効化",
		"url": "/docs/sub-activate",
		"topic": "ホームアシスタントOSのアップグレード"
	}],
	"title": "Unix系OS用のホームアシスタントDockerのアップグレード",
		"children": [
	{
		"title": "サブスクリプションの有効化",
		"url": "/docs/sub-activate",
		"topic": "Unix系OS用のホームアシスタントDockerのアップグレード"
	}],
}

```

## ドキュメントにカスタムナビゲーションを追加する方法

* ファイル `src/_data/sidebar_docs.json` を編集します。

* 適切なドキュメントを見つけ、次のように `prev` と `next` パラメータを追加します:

```
	{
		"title": "概要",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "ユーザーの追加",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "ユーザーの追加",
				"url": "/docs/add-user"
			}
		],
	},

```

* ナビゲーションを完全に削除したい場合は、`withoutNav` パラメータを追加します:

```
{
	"title": "概要",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* ナビゲーションを削除したい場合単に `前のページ` または `次のページ` ナビゲーションを追加するだけでなく、`withoutPrev` または `withoutNext` パラメータを追加します：

```
{
	"title": "概要",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

または

```
{
	"title": "概要",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## ドキュメントの翻訳方法

{% roboWikiNote {title: '重要', type: 'warning'}%} **.env** ファイルを作成し、*OPENAI_KEY* 変数にキーを追加する必要があります {% endroboWikiNote %}

md ドキュメントを翻訳したい場合は、次のコマンドを実行する必要があります：

```bash
npm run translate-md
```

コマンドを実行した後は待つだけで、ファイルを確認することもできます（AI 翻訳にはいくつかの欠陥があります）。

### 翻訳のトラブルシューティング

翻訳に問題が発生することがあります。

1. コマンドを再度実行してみて、うまくいくかどうかを確認してください。

2. 時々、md ファイル内のタグが正しく書かれていないことがあります。例えば：


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

その後、タグを修正する必要があります。