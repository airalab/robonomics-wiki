---
title: Wikiの編集方法
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**ロボノミクス Wiki はオープンソースです。 エラー、タイプミス、不明瞭または古い情報の修正、任意の言語への翻訳など、あらゆる修正を歓迎します。 [GitHub](https://github.com/) アカウントが必要です。**


## 編集方法

Robonomics Wiki のドキュメントを編集する必要がある場合は、次の手順に従ってください。

[Node.js](https://nodejs.org/en/download/package-manager/) と [Gridsome](https://gridsome.org/docs/#1-install-gridsome-) があることを確認してください。 cli-tool) がインストールされています。

### 1. リポジトリのクローンを作成する

まず、Wiki リポジトリのクローンを作成する必要があります。

```
git clone https://github.com/airalab/robonomics-wiki.git
```

リポジトリのディレクトリに移動し、次のコマンドを実行します。

`npmを使用して`
```
cd robonomics-wiki
npm install 
```

`yarnを使用して`
```
cd robonomics-wiki
yarn install
```

### 2. ローカルでサービスを提供する (develop、develop-m1)

次に、プロジェクトをローカルにデプロイします。

```
gridsome develop
```

> エラー `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`,が発生した場合は、次のコマンドを実行します。
```
gridsome develop-m1
```

### 3. PRを行う

[プル リクエストを作成](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) から [wiki リポジトリ](https://github.com/airalab/robonomics-wiki)

## コンポーネント

### Asciinema
Robonomics Wiki は Asciinema をサポートしています。 Asciinema を挿入するには、次の手順に従ってください。
* フロントマターブロックの後にコンポーネントをインポートします `import Asciinema from '~/components/Asciinema.vue'`
* 別の段落「<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>」として挿入します。ここで、vid は特定の asciicast の ID です

> asciicast ページの「Embed」リンクをクリックすると、特定の asciicast のウィジェット スクリプトを取得できます。
> 次のようになります。
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Asciinema docs](https://asciinema.org/docs/embedding)

上の例では、vid は 14 です。

### コード

コードに役立つ追加機能を追加できます。

`コピーボタンのあるコード`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

または `追加の行を含むコード`

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**code-helper のプロパティ**

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
Robonomics Wiki のドキュメントには、frontmatter ブロックが含まれています。 これは Markdown ファイルの先頭になければならず、三点鎖線の間にある有効な YAML セットの形式をとる必要があります。 三点鎖線の間で、次のオプションを設定または編集できます。

```YAML
---
title: How to contribute # ページのタイトル。テキスト内でそれを複製する必要はありません
contributors: [positivecrash] # 主な寄稿者 (このページを積極的にキュレーションしている人)。 GitHub ニックネームが必要です。追加の記号は不要です
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/インストールation
    # テクノロジーテストに使用されたツール
---
```

### Grid 
要素にグリッド レイアウトを追加するのに役立ちます。

- 最初にグリッド ラッパー コンポーネントを使用します。

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- そして、ラッパー内で好きなだけグリッド項目コンポーネントを使用します。

```c
  <robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_6.png" /> 
      <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
      <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS ゲートウェイ</a></p>
    </robo-wiki-grid-element/>
  </robo-wiki-grid-element-wrapper>
```

**robo-wiki-grid-element-wrapper のプロパティ**

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


### 画像

#### アップロード方法
画像をフォルダー「/docs/images/url-of-your-doc」にアップロードします
* 画像をローカライズする必要がある場合は、すべてを 1 つのフォルダーに挿入してください
* ローカライズされている場合は、画像の名前にロケールの付録を使用します。 `image_ja.jpg`
* 画像が Web に最適化されており、同時に見た目も良いことを確認してください

#### 挿入方法

ドキュメントに画像を挿入するには 2 つの方法があります。

<robo-wiki-note type="warning">

組み込みタグ `<robo-wiki-picture>` を使用して画像を挿入することをお勧めしますが、Markdown ファイルの標準的な方法を使用することもできます。

</robo-wiki-note>

`キャプション付き`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`またはキャプションなし` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`または単純なイメージ` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`またはキャプション付きの単純な画像`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`alt付きの画像`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**robo-wiki-picture のプロパティ:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### 注意事項と警告
メモを追加して特定の種類を指定できます。
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`タイトル付きのメモ`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`内容のあるメモ`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`タイトルと内容が記載されたメモ`

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

**robo-wiki-note のプロパティ**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
ドキュメントにタブを追加できます。

- タブラッパーコンポーネントを使用します。

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- 次に、ラッパー内でタブ項目コンポーネントを好きなだけ使用します。

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


`水平タブ`

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

`垂直タブ`

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

`枠線付きのタブ項目`

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

**robo-wiki-tabs (ラッパー) のプロパティ**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**robo-wiki-tab (アイテム) のプロパティ**

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


### アンカー付きタイトル
アンカーを使用してカスタム タイトルを作成し、それに特定の値を与えることができます

`アンカー付きタイトル`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

または

`アンカーなしのタイトル`

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**robo-wiki-title のプロパティ**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### 動画

ドキュメントにビデオを挿入するには 2 つの方法があります。

<robo-wiki-note type="warning">

組み込みタグ `<robo-wiki-video>` を使用してビデオを挿入することをお勧めしますが、Markdown ファイルの標準的な方法を使用することもできます。

</robo-wiki-note>

#### IPFS / Server
ビデオの形式を指定する必要があります

<robo-wiki-note type="warning" title="About gateways">

Gateway for the link is chosen automatically from config file - `data/video_config.yaml`. You can add or remove some gateways by changing the file.

</robo-wiki-note>

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### プロパティ

- <span style="color:#af1c1c">10MB</span> を超えるサイズのファイルを追加する場合は、リポジトリではなくサーバーにアップロードしてください。

- [HTML5 ビデオ タグ](https://www.w3schools.com/tags/tag_video.asp) には任意のプロパティを使用できます。

- 受け入れ可能な形式 - mp4、webm、ogg。

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
引用符やタグを追加せずに、共有リンクを別の段落として挿入することで、ドキュメントに YouTube ビデオを埋め込むことができます (例: `https://youtu.be/kQaSwNYHJQ8`)

ただし、自動再生が必要な場合は、特別なコンポーネントを使用する必要があります。

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**robo-wiki-youtube のプロパティ**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## サイドバーのナビゲーションを編集する方法

Robonomics Wiki のサイドバー ナビゲーションを編集する必要がある場合は、次の手順に従ってください。

* ファイル `/data/sidebar_docs.yaml` を編集します。

* ドキュメントを配置する場所を決定する

* `/data/sidebar_docs.yaml` に有効な YAML を使用し、既存のファイル構造に依存します

* **重要な注意:** 異なるセクション/サブセクションで同じドキュメントを使用している場合:

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Raspberry Piのためのプリインストールイメージ
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

次のように「topic」パラメータを必ず追加してください:

(ナビゲーションが正常に動作するため)

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

## ドキュメントにカスタム ナビゲーションを追加する方法

* ファイル「/data/sidebar_docs.yaml」を編集します。

* 適切なドキュメントを見つけて、次のようにパラメータ `prev` と `next` を追加します。

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

* `withoutNav` パラメータを追加するのではなく、ナビゲーションを完全に削除したい場合:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* `withoutPrev` または `withoutNext` パラメータを追加するのではなく、`前のページ` または `次のページ` ナビゲーションだけを削除したい場合:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

または

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```