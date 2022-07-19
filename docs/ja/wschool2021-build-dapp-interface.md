---
title: Lesson 6.2, Dapp インターフェースの構築 
locale: 'ja' 
contributors: [KiichiSugihara]
translated: true
---

<!-- ![Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot](../images/build-dapp-interface/sum.gif "Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot") -->
<img alt="Building User Interface for Decentralized Applications, on top of Robonomics and Polkadot" src="../images/build-dapp-interface/sum.gif" />

## はじめに

このチュートリアルは前回の続きで、すでにシンプルなアプリケーションを構築し、アカウントとノードの接続、トランザクションの送信など、アプリの重要な機能に焦点を当てていました。今度は、このアプリケーションのために、**ユーザーフレンドリーなインターフェースを構築**します。

## 前提条件

このチュートリアルは、**HTML、CSS、JavaScript**に少し慣れていて、これらのスキルを分散型アプリケーションに適用する方法を学びたい方を対象としています。


アプリのインターフェイスを構築するために、自分にとって快適なJavaScriptフレームワークを選ぶことができますし、フレームワークなしでインターフェイスを構築することもできます。Robonomics2021では、スケーラブルで使いやすい[Vue.js](https://vuejs.org) を使用しています。

## このチュートリアルのための設定

このステップから始めて、**実際にやってみて学びたい**という方は、以下のTo-Doリストに従って、前のレッスンで作成したdappを起動してください。

1.あなたのOSに合ったRobonomics v0.22のローカルノードを[リリースページ](https://github.com/airalab/robonomics/releases/tag/v0.22.0) からダウンロードしてください。もしあなたのシステムが最新のリリースにない場合は、過去のリリースから最新のバージョンを探してください。

2.ターミナルで `./robonomics --dev --tmp` と入力して、ロボノミクスノードを開発者モードで起動します。

3.ChromeまたはFirefox用のPolkadot Extensionをダウンロードしてください。[Polkadot Extension](https://polkadot.js.org/extension/)

4. [このリポジトリ](https://github.com/vol4tim/example-robonomics-dapp/)をクローンします。

5. [Yarn](https://yarnpkg.com)をインストールします。

6. [@vue/cli](https://cli.vuejs.org/guide/installation.html)をインストールします。

7. ターミナルで コマンドを実行して、dappの開発を開始します。
```shell
cp src/config.template.json src/config.json
yarn
yarn serve
```


**ブラウザにこのような画面が表示されるはずです。:**

![Dapp Start](../images/build-dapp-interface/dapp-start.png "Dapp Start")


<details>

  <summary>起動のためのいくつかの追加のヒント</summary>

  - **ノードが起動している**ことを確認します:
    ![Example of running a Robonomics node](../images/build-dapp-interface/robonomics-node-launch.png "Example of running Robonomics node")

  - **macOS**の場合、**アクセス権**を変更する必要があるかもしれません`chmod +x robonomics`
  - **Polkadot Extensionへのアクセスが許可**されていることを確認してください:
    ![Polkadot Extension giving access](../images/build-dapp-interface/polkadot-permission.png "Polkadot Extension giving access")

  - 実行中のノードのログにエラーがあり、dappが正しくロードされていない場合、devチェーンのデータベースを削除してみてください: `sudo rm -rf <YOUR LOCAL PATH>/robonomics/chains/dev/db/` そしてノードを再起動してください。それでもだめな場合は、マシンを再起動してください。


</details>

## コードの確認

UIを変更するために、何をどこで修正すればよいかを明確にするために、dappの構造を確認してみましょう。

```
.
├── public/
│   ├── favicon.ico           # dappのアイコンです
│   └── index.html            #  テンプレートファイル（アプリのアイコンのリンク、JavaScript、CSSファイルを注入します
├── src/
│   ├── assets/               # 画像やグローバルスタイルのフォルダ
│   ├── components/           # コンポーネントを格納するフォルダ
│   │   ├── Datalog.vue       # dapp内のDatalogタブ
│   │   ├── Demo.vue          #  dappの中のDemoタブ
│   │   ├── Launch.vue        # dappの中のLaunchタブ
│   ├── utils/                # アプリ用の重要な機能が入ったフォルダ (このチュートリアルでは api.js を触ります)
│   ├── App.vue               # アプリのルートであり、ページ全体のHTML、CSS、JSを含む。実際にはVueコンポーネントでもあります
│   ├── main.js               # アプリのエントリーファイル、ここでグローバルスタイルをインポートします
├── ...                       # 設定ファイルや依存関係のファイルがありますが、通常は変更しません
├── README.md                 # ここには、アプリの説明を書くことができます。

```

> **このチュートリアルのコードは、[このリポジトリ](https://github.com/positivecrash/wscool21-ui-dapp)にあります。**

## CSS-IN-JS VS. グローバルスタイルシート

このチュートリアルでは、UIコンポーネントの安定したライブラリがなくても、小さなdappのインターフェースをゼロから変更する方法を紹介します。そこで、さまざまなVueコンポーネントをインポートして作成するだけでなく、独自のスタイルも作成します。


もしあなたのアプリケーションが大きかったり、プロジェクトにたくさんのdappsがある場合は、UIをより整理して効率的にするために、将来的にはあなたのプロジェクトに特化したコンポーネントのライブラリを探した方がいいでしょう（[例えば、コンポーネントを整理するためのツール](https://storybook.js.org)があります）。また、標準的なインターフェイスのテーマで良いのであれば、[サードパーティ製のUIライブラリ](https://vuetifyjs.com/)を利用することもできます。
## 最初のインポート、どこから始めるか


このアプリのための特別なデザインはありませんが、[ブランドブック](https://static.robonomics.network/assets/Robonomics-Visual-Identity.pdf)があり、[タイポグラフィ、フォント、ボタンのスタイルなどが確立](https://robonomics.network/community#assets)されています。そこで、まずは以下のcssファイルをグローバルにインポートします。
```
...
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── reset.css         # 目的は、ブラウザの不整合を減らすことです。
│   │   │   ├── variables.css     # 色、フォント名、スペース値など、再利用する特定の値を含む
│   │   │   ├── typography.css    #  dapp全体のグローバルなタイポグラフィ
│   │   │   ├── animation.css     # dapp全体で使われるキーフレームアニメーション
...

```

これらのファイルの内容は、あなたの認識に合うのであれば、代わりにApp.vueに書くことができます。しかし、この例では、App.vueを少しでもわかりやすくするために、いくつかのCSSファイルをグローバルにインポートすることをお勧めします。


これらのCSSファイルをアプリにインポートするには、**main.js**ファイルを編集します:

![VueアプリにグローバルなCSSをインポートする](../images/build-dapp-interface/import-css-vue-1.png "Import global CSS in Vue app")

```JS
import './assets/styles/reset.css'
import './assets/styles/variables.css'
import './assets/styles/typography.css'
import './assets/styles/animation.css'
```

**dappでフォントが変更されているかどうかを確認:**

![Dapp Interface changing step 1](../images/build-dapp-interface/dapp-1.png "Dapp Interface changing step 1")


## レイアウトの変更とタイトルの装飾


アプリケーションのレイアウトを変更してみましょう。先に述べたように、App.vueに直接スタイルを書くこともできますが、今回の例では、このプロセスを分けて考えたいと思います。

- **App.vue**の`<style>`タグからスタイルをコメントまたは削除する

- このアプリケーションのstylesフォルダにcssファイル**app.css**を作成し、**main.js**にインポートします。

```JS
import './assets/styles/app.css'
```

<details>

<summary>app.cssにアプリの最初の基本スタイルを記述します。:</summary>

```css
#app {
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: stretch;

  text-align: center;
}

body {
  background-color: var(--color-gray-light);
}
```

</details>


<details>

<summary>アプリのタイトルを変更する [app.vue]</summary>

```html
<div class="top">
    <h1>dApp Robonomics Demo</h1>
    <i>Winter School 2021</i>
    <img class="label" alt="" src="./assets/images/robonomics-winter-school-2021-logo.png"/>
</div>
```

</details>



<details>

<summary>タイトル用のスタイルを書く [app.css]</summary>

```css
.top {
  position: relative;
  padding-top: var(--space);
  padding-bottom: calc(var(--space)*2);

  border-bottom: 2px solid var(--color-dark);
  background-color: var(--color-light);
}

.top h1 {
  font-size: 1.8rem;
}

.top i {
  display: block;
}

.top .loader-label {
  display: block;
  margin: calc(var(--space)/3) auto;
  max-width: 150px;

  visibility: hidden;
  opacity: 0;
  animation: 0.5s FadeIn 0.3s ease forwards, 0.5s ScaleDown 0.1s ease forwards;
}

.top .label {
  position: absolute;
  width: 100px;
  bottom: -50px;
  left: calc(50% - 50px);
  display: block;

  transform: translateY(1rem);
  visibility: hidden;
  opacity: 0;
  animation: 0.7s FadeIn 0.5s ease forwards, 1s ScaleUp 0.5s ease forwards;
}
```

</details>

- ロボノミクスウィンタースクール2021のロゴが入ったファイルを、**./src/assets/images**フォルダに置く。

**次のような画面が表示されます:**
![Dapp Interface changing step 2](../images/build-dapp-interface/dapp-2.png "Dapp Interface changing step 2")

## dappのデータに合わせてスタイルを定義する

ここで、アプリのコンテンツを`<div>`要素で囲みます。また、アプリの状態（ロードされている、されていない）に応じて、異なるスタイルが必要です。

- **App.vue**を開いて、ラッピング要素を書きます。:
```html
<div class="content">
  <!--here is everything going after the title-->
</div>
```
- `<script>`で定義されている変数`load`を見つけます。
- オブジェクトを`v-bind:class`に渡して、クラスを動的に切り替えます（私は短縮版の`:class`を使っています）。

```html
<div class="content" :class="{ load: load }">
  <!--here is everything going after the title-->
</div>
```
このようにして、取得したデータに応じてアプリのスタイルを簡単に切り替えることができます。このクラスの使い方は以下の通りです。

## dappのデータに応じてビューを定義する

アプリのローダを変更しましょう。
- この目的のために、別のRobonomicsプロジェクトからコンポーネントをインポートします。


<details>

<summary>./src/components/AnimatedRobonomicsLogo.vue</summary>

```HTML
<template>
  <div class="logo-animated" :style="{transform: 'scale('+scale+')'}">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="196.9px" height="170.3px" viewBox="0 0 196.9 170.3" style="enable-background:new 0 0 196.9 170.3;" xml:space="preserve">
		<g transform="translate(2530 155)">
            <path class="line" d="M-2523.4,7.9l184.2,0.5l-91.7-158.1L-2523.4,7.9z"/>

            <circle class="dot" cx="-2339.7" cy="8.7" r="6.6"/>
            <circle class="dot" cx="-2523.4" cy="8.2" r="6.6"/>
            <circle class="dot" cx="-2430.8" cy="-148.4" r="6.6"/>
            
            <path class="triangle-1" d="M-2477.3-18.3l92.1,0.3l-45.8-79L-2477.3-18.3z"/>
            <path class="triangle-2" d="M-2431.2-18.1l46,0.1l-45.8-79L-2431.2-18.1z"/>
            <path class="triangle-3" d="M-2477.3-18.3l92.1,0.3l-46-20.3L-2477.3-18.3z"/>
          </g>
	</svg>
  </div>
</template>

<script>

export default {

  props: {
    scale: {
      type: String,
      default: '1'
    },
  },

};
</script>

<style scoped>
    /*
    Global styles required:
    FadeIn - keyframe animation from animation: .css
    all --color- variables from variables.css
    */

    .logo-animated {
        transform-origin: 0 0;
    }

    .logo-animated .dot {
        fill: var(--color-blue);
        visibility: hidden;
        opacity: 0;
        animation: 1s FadeIn 0.3s ease forwards;
    }

    .logo-animated .line {
        fill: transparent;
        stroke: var(--color-blue);
        stroke-miterlimit:10;
        stroke-dasharray: 700;
        stroke-dashoffset: 700;
        animation: 1s DrawSvgPath 0.5s ease-in-out forwards; 
    }

    .logo-animated .triangle-1 {
        fill: var(--color-blue);
        visibility: hidden;
        opacity: 0;
        animation: 0.5s FadeIn 0.3s ease forwards, 5s logo-triangle-1 0.1s linear infinite;
    }

    .triangle-2 {
        fill: var(--color-violet-light);
        visibility: hidden;
        opacity: 0;
        animation: 0.5s FadeIn 0.3s ease forwards, 5s logo-triangle-2 0.1s linear infinite;
    }

    .triangle-3 {
        fill: var(--color-violet-mid);
        visibility: hidden;
        opacity: 0;
        animation: 0.5s FadeIn 0.3s ease forwards, 5s logo-triangle-3 0.1s linear infinite;
    }


    @keyframes DrawSvgPath
        {
        to {
            stroke-dashoffset: 0;
        }
        }

    @keyframes logo-triangle-1
    {
        0% { fill: var(--color-blue); }
        25% { fill: var(--color-blue); }
        50% { fill: var(--color-blue); }
        75% { fill: var(--color-violet-light); }
        100% { fill: var(--color-blue); }
    }

    @keyframes logo-triangle-2
    {
        0% { fill: var(--color-violet-light); }
        25% { fill: #E0BDED; }
        50% { fill: var(--color-blue); }
        75% { fill: var(--color-blue); }
        100% { fill: var(--color-violet-light); }
    }

    @keyframes logo-triangle-3
    {
        0% { fill: var(--color-violet-mid); }
        25% { fill: var(--color-violet-light); }
        50% { fill: var(--color-violet-light); }
        75% { fill: var(--color-violet-dark); }
        100% { fill: var(--color-violet-mid); }
    }
</style>
```

</details>

- このコンポーネントを**App.vue**に登録します。
```JS
export default {
  components: {
    Loader: () => import("./components/AnimatedRobonomicsLogo")
  }
}
```
- 既に知られている変数`load`を使って、条件付きのVueディレクティブ`v-if`で挿入します。
```HTML
<div class="content" :class="{ load: load }">
  <Loader v-if="load" />
  <template v-else>
    <!-- ここがロードされたDAPのメインコンテンツになります -->
  </template>
</div>
```
- ブラウザで結果を見てみましょう。いくつかの問題がありますが、これから修正していきます:

1. ローダーがタイトルまでポップアップしています（中央にあるべきです）。以下の行を**app.css**に挿入してみましょう。

```css
body, html, #app {
  height: 100%;
  position: relative;
}
```
2. 通信速度が速すぎると、一瞬、ローダーが点滅するだけになります。混乱してしまうかもしれません。そこで、アプリからの応答にタイムアウトを設定してみましょう。そのためには、**api.js**を開き、関数`initAccount`の中に以下のコードを見つけます:

```JS
const timeout = new Promise(resolve => {
  setTimeout(resolve, 300);
});
```
`300`の代わりに`1700`を設定して、結果を確認します:

<!-- ![Dappインターフェース変更ステップ3](../images/build-dapp-interface/dapp-3.gif "Dappインターフェース変更ステップ3") -->
<img alt="Dappインターフェース変更ステップ3" src="../images/build-dapp-interface/dapp-3.gif" />


## 再利用可能なコンポーネントの使用

コンポーネントを登録して使用する方法は、前回のLoaderの項ですでに見ていますが、今回はもっと注意深く注目してみたいと思います。

Accountの部分を変えてみましょう。ここでは、自分で書いたコンポーネント（ボックス、ボタン、アイコン）とサードパーティのコンポーネント（[Vue Polkadot Libraryのもの](https://vue-polkadot.js.org/vue-ui/vue-identicon/#vue-polkadot-vue-identicon )）を使います。

### ボックスの追加

<details>

<summary>./src/components/Box.vueファイルにBoxコンポーネントを作成します。</summary>

```HTML
<template>
    <section class="box" :class="classList">
        <slot />
    </section>
</template>

<script>

export default {

  props: {
    classList: {
      type: String
    },
  },

};
</script>

<style>
    /*
    Global styles required for css variables from variables.css
    */

    .box {
        background-color: var(--color-light);
        border: 1px solid var(--color-dark);
        padding: calc(var(--space)*0.5) var(--space);
        box-shadow: 2px 2px 0 var(--color-dark);
        margin-bottom: calc(var(--space)*1.5);
    }
</style>
```
</details>

これで、Dappの中で何度も使うことができます。これをAccountセクションの例で見てみましょう:

- コンポーネントを登録 (**App.vue**):

```JS
export default {
  components: {
    Box: () => import("./components/Box")
  }
}
```

- これをAccountセクションに使用し、prop `classList`で追加のクラスを渡します:

```HTML
<Box :classList="'account'">
  Account: <b>{{ account }}</b> {{ balance }} |
  <button @click="faucet">
    faucet
  </button>
</Box>
```

**結果の確認:**
![Dapp Interface changing step 4](../images/build-dapp-interface/dapp-4.png "Dapp Interface changing step 4")

### ボタンの追加

追加したボックス内のボタンに気づかないこともあるかもしれません。このアプリにはボタンが1つしかないわけではないので、修正してボタン用のコンポーネントを追加しましょう。

<details>

<summary>./src/components/Button.vueファイルにButtonコンポーネントを作成します。</summary>

```HTML
<template>
  <button type="button" :class="classList" @click="onClick" :disabled="disabled" class="inline-block">
    {{ label }}
  </button>
</template>

<script>

export default {

  components: {
    Icon: () => import("./Icon")
  },

  props: {
    label: {
      type: String,
    },
    type: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary'].indexOf(value) !== -1;
      }
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      }
    }
  },

  computed: {
    classList() {
      return {
        'button': true,
        [`${this.type}`]: true,
        [`button__${this.size}`]: true,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },

};
</script>

<style>
    /*
    Global styles required for css variables from variables.css
    */

    .button {
        appearance: none;
        -webkit-appearance: none;
        outline: 0;
        border: 0;

        transition: 0.1s all linear;

        padding: .15rem 0.6rem;
        border-width: 1px;
        border-style: solid;
        border-radius: .25rem;
  
        cursor: pointer;

        font-family: var(--font-family);
        font-size: calc(var(--font-size)*0.9);
        line-height: 1;
        font-weight: 500;

        text-transform: uppercase;
        letter-spacing: 1px;
    }   

    .button:not([disabled]):hover {
    filter: saturate(1.5);
    }

    .button[disabled] {
        cursor: default;
        opacity: 0.6;
    }

    button.primary {
        border-color: var(--color-green);
        background-color: var(--color-green);
        color: var(--color-light);
    }

    button.secondary {
        border-color: var(--color-blue);
        color: var(--color-blue);
    }

    button.secondary:not([disabled]):hover {
        background-color: var(--color-blue);
        color: var(--color-light);
    }

    .button__small {
        font-size: .85rem;
        padding: .1rem 0.45rem;
    }

    .button__large {
        font-size: 1.2rem;
        padding: .5rem 1.7rem;
    }

</style>
```
</details>


- コンポーネントの登録 (**App.vue**):

```JS
export default {
  components: {
    Button: () => import("./components/Button")
  }
}
```

- `Button`コンポーネントで定義されたプロップを持つ`Faucet`ボタンに使用します。

```HTML
<Box :classList="'account'">
  Account: <b>{{ account }}</b> {{ balance }}
  <Button label="Faucet" size="large" @onClick="faucet" />
</Box>
```

**次のようなビューが得られます:**
![Dapp Interface changing step 5](../images/build-dapp-interface/dapp-5.png "Dapp Interface changing step 5")

Buttonコンポーネントでは、`@onClick`でpropからクリックイベントを発火していますので、faucet機能が正しく動作しているかどうか（クリックで残高が変化するはず）に注目します。


<!-- ![Dapp Interface changing step 6](../images/build-dapp-interface/dapp-6.gif "Dapp Interface changing step 6") -->
<img alt="Dappインターフェース変更ステップ6" src="../images/build-dapp-interface/dapp-6.gif" />

### アイコンの追加

このボタンにアイコンを追加して、インターフェイスのこの要素に注目させましょう。ユーザーは、このボタンをユニット化してクリックしないと、Dappを正しく操作できないからです。

この目的のために、アイコンのためのVueライブラリを使用することができますが、私はアイコンを持つ独自のコンポーネントを作成します。

- [アイコンの大きなオンライン・アーカイブ](https://www.flaticon.com)で適切なアイコンを見つけました。
- .svgファイルをダウンロードして、ベクター・グラフィックス・エディターで編集し、適切なサイズにします。

- Icon.vueコンポーネントにsvgをテキストとして挿入しました。

<details>

<summary>これで、Icon.vueコンポーネントの出来上がりです。</summary>

```JS
<template>
  <div class="icon inline-block" :class="classList">
    <svg v-if="icon == 'faucet'" class="icon-fill" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" :width="SvgWidth(20)"  viewBox="0 0 20 24.9" style="enable-background:new 0 0 20 24.9;" xml:space="preserve">
      <path d="M2.7,24.9c0.2,0,2.4,0,2.4-2.4c0-2-2.2-5.2-2.2-5.2s-2.5,3.3-2.5,5.3C0.4,24.6,2.4,24.9,2.7,24.9z M20,10.8V7.2V3.1h-2.6v2.6h-3.1V1.5h2.6c0.4,0,0.8-0.3,0.8-0.8S17.3,0,16.9,0h-6.7C9.8,0,9.5,0.3,9.5,0.8s0.3,0.8,0.8,0.8h2.6v4.1H7.9c-4.7,0-6.2,3.2-6.3,4.8c0,0,0,0.1,0,0.1v2.8H0v2.1h6.2v-2.1H4.6v-2.7c0-0.3,0.4-1.9,3.3-1.9h9.6v2.1L20,10.8L20,10.8z"/>
    </svg>

  </div>
</template>

<script>

export default {
  props: {
    icon: {
      type: String
    },
    classList: {
      type: String
    },
    scale: {
      type: String,
      default: '1'
    },
  },

  methods: {
    SvgWidth(SvgWidth) {
      return `${SvgWidth * this.scale}px`;
    }
  }
};
</script>

<style>
.icon {
    line-height: 1;
}
</style>

```

</details>

これをボタンで使うには、Buttonコンポーネントを編集します。

Iconを**Button.vue**にインポートします:

```JS
components: {
    Icon: () => import("./Icon")
}
```

propを登録:

```JS
props: {
  icon: {
    type: String,
    default: 'none'
  }
}
```

アイコンをボタンに追加します（`v-if`条件で異なるテンプレートを指定できます）。

```HTML
<template v-if="icon != 'none'">
  <Icon :icon="icon" />
  <span v-if="label != ''" class="inline-block">{{ label }}</span>
</template>
<template v-if="icon == 'none' & label != ''">
  {{ label }}
</template>
```

スタイルを追加:

```CSS
.button .icon-fill path {
  fill: var(--color-light);
}

.button > *:not(:last-child) {
  margin-right: calc(var(--space)/2);
}

```

**App.vue**でアイコンプロップをボタンに追加:

```HTML
<Button label="Faucet" size="large" icon="faucet" @onClick="faucet" />
```

**確認:**

![Dapp Interface changing step 7](../images/build-dapp-interface/dapp-7.png "Dapp Interface changing step 7")

### ポルカドットのアバターを追加する

- インストール [@vue-polkadot/vue-identicon](https://vue-polkadot.js.org/vue-ui/vue-identicon/#vue-polkadot-vue-identicon)

- App.vueにインポート:
```JS
components: {
    Identicon: () => import("@vue-polkadot/vue-identicon")
}
```

- `Account`という単語の代わりにアバターを挿入し、ドキュメントにしたがってpropsを渡し、value propとして`account`データを使用します:

```HTML
<Identicon
  :value="account"
  :theme="'polkadot'"
  :size="40"
  :class="'inline-block'"
/>
```

**確認:**

![Dapp Interface changing step 8](../images/build-dapp-interface/dapp-8.png "Dapp Interface changing step 8")

## 見やすいようにデータを操作する

アカウントのアドレスをカットしてみましょう:

- 変数`account`をcomputedプロパティでラップします。

```JS
computed: {
  AccountAddress() {
    return this.account.slice(0, 6) + "..." + this.account.slice(-4);
  }
}
```

- テンプレート内の変数 `account` を `AccountAddress` に置き換えてください。

**確認:**

![Dapp Interface changing step 9](../images/build-dapp-interface/dapp-9.png "Dapp Interface changing step 9")

## CSS magic

アカウントセクションをもう少し可愛くしてみましょう:

<details>

<summary>Template</summary>

```HTML
<Box :classList="'account'">
              
  <div class="account__address">
    <Identicon
      :value="account"
      :theme="'polkadot'"
      :size="40"
      :class="'inline-block'"
    />

    <code class="inline-block">{{ AccountAddress }}</code>
  </div>
  
  <div class="account__balance">{{ balance }}</div>

  <Button label="Faucet" size="large" @onClick="faucet" />
  
</Box>
```

</details>


<details>

<summary>Styles (in app.css)</summary>

```CSS
.account {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: stretch;
  column-gap: var(--space);
}

.account__balance {
    font-size: 150%;
    font-weight: 500;
    font-family: var(--font-family-code);
    white-space: nowrap;
}

.account__address > *:not(:last-child) {
    margin-right: calc(var(--space)/2);
}
```

</details>

<!-- ![Dapp Interface changing step 10](../images/build-dapp-interface/dapp-10.gif "Dapp Interface changing step 10") -->
<img alt="Dappインターフェース変更ステップ10" src="../images/build-dapp-interface/dapp-10.gif" />

タブのスタイルを編集しましょう:

<details>

<summary>Styles (in app.css)</summary>

```CSS
.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: calc(var(--space)*2.5);
}

.tabs button {
  text-transform: uppercase;
  letter-spacing: 1px;
  border-width: 0 0 1px;
  font-family: var(--font-family);
  font-size: calc(var(--font-size)*1.5);
  font-weight: 300;
  cursor: pointer;
  transition: 0.2s all linear;
}

.tabs button:not(.active) {
  opacity: 0.5;
  border-color: var(--color-gray)
}

.tabs-content {
  padding-top: var(--space);
}
```

</details>

<details>

<summary>テンプレートの変更は最小限に</summary>

```HTML
<div class="tabs-content">
  <Demo v-if="tab === 'demo'" :api="api" :account="account" />
  <Launch v-if="tab === 'launch'" :api="api" :account="account" />
  <Datalog v-if="tab === 'datalog'" :api="api" :account="account" /> 
</div>
```

</details>

<!-- ![Dapp Interface changing step 11](../images/build-dapp-interface/dapp-11.gif "Dapp Interface changing step 11") -->
<img alt="Dappインターフェース変更ステップ11" src="../images/build-dapp-interface/dapp-11.gif" />

> このチュートリアルの完成したコードは、[このリポジトリ](https://github.com/positivecrash/wscool21-ui-dapp)にあることを覚えておいてください。そして、次のステップに進みましょう :)

## Datalog

まず、dapp で既に知られている UI 要素であるボタンを修正することから始めましょう（`Faucet`で行ったのと同じですが、異なるプロップを使用しています）。

次に、これらの要素を`<fieldset>`で囲み、意味ごとに分離します。そして、fieldsetとinputの要素に自分のスタイルを書きます。

<details>

<summary>Datalog.vueのテンプレート:</summary>

```HTML
<div class="tools">
  <fieldset>
    <Button label="Read data" size="large" type="secondary" @onClick="read" />
  </fieldset>

  <fieldset>
    <input v-model="data" :disabled="isWrite" class="large" />
    <Button label="Write" :disabled="isWrite" size="large" type="secondary" @onClick="write" />
  </fieldset>
</div>
```

</details>


<details>

<summary>app.cssのinput要素のスタイル - グローバルなものになるはず:</summary>

```CSS
input, select{
  padding: .3rem 0.6rem;
  border: 1px solid var(--color-gray);
  background-color: var(--color-light);
  border-radius: var(--radius);
  font-size: var(--font-size);
  font-family: var(--font-family-code);
  border-radius: .25rem;
  transition: 0.2s ease all;
}

input:focus {
  border-color: var(--color-dark);
}

input.large, select.large {
  font-size: 1.2rem;
  padding: .35rem 1rem;
}


.tools *, .tools fieldset:not(:last-child):after {
  display: inline-block;
  vertical-align: middle;
  vertical-align: -moz-middle-with-baseline;
  vertical-align: -webkit-baseline-middle;
}

.tools fieldset {
  border: 0;
}

.tools fieldset:not(:last-child):after {
  content: "•";
}

.tools fieldset > *,  .tools > * {
  margin-right: calc(var(--space)/2)
}
```

</details>

**アップデート後にすべてが問題なく動作することを確認してみましょう。:**

<!-- ![Dapp Interface changing step 12](../images/build-dapp-interface/dapp-12.gif "Dapp Interface changing step 12") -->
<img alt="Dappインターフェース変更ステップ12" src="../images/build-dapp-interface/dapp-12.gif" />

dappの中にはdatalogセクションがあるので、そのためのコンポーネントを作ります。

<details>

<summary>新しいコンポーネントDatalogSection.vueのコードは以下のとおりです。</summary>

```HTML
<template>
    <div v-if="log" class="log">
        <h4 class="log-title">Datalog</h4>

        <div class="log-content">

          <p v-if="log.length === 0" class="error">Not found</p>

          <details v-for="(item, k) in log" :key="k" class="box" :open="k === 0">
              <summary>{{ item[0] }}</summary>
              <pre>{{ item[1] }}</pre>
          </details>
        </div>
    </div>
</template>

<script>

export default {

  props: {
    log: {
      type: Array
    }
  },

}

</script>

<style>

.log {
  text-align: left;
  margin: var(--space) auto;
  width: 100%;
}

.log-content {
  border: 1px solid var(--color-gray);
  max-height: 500px;
  overflow-y: auto;
  padding: var(--space);
  background-color: var(--color-gray-middark);
  outline: 1px solid #fff;
  box-shadow: 0 0 60px 20px #fff inset;
}

.log-title {
  color: var(--color-gray-dark);
  font-weight: 300;
  font-family: var(--font-family-code);

  border-bottom: 1px solid var(--color-gray);
}

.log .box {
  margin-bottom: var(--space);
}

details {
  transition: 0.2s all ease;
}

details summary {
  cursor: pointer;
}

details.box {
  padding-top: 0;
  padding-bottom: 0;
}

details.box[open] {
  padding-bottom: calc(var(--space)*0.5);
}

details.box:focus {
  box-shadow: 0 0 5px var(--color-gray)
}

details.box summary {
  padding-top: calc(var(--space)*0.5);
  padding-bottom: calc(var(--space)*0.5);
}

details.box[open] summary {
  border-bottom: 1px solid var(--color-dark);
  margin-bottom: calc(var(--space)*0.5);
  font-weight: 500;
}

.log details.box summary {
  font-family: var(--font-family-code);
}

</style>
```

</details>


ここで注意しなければならないのは、prop `log`を配列として渡していることです。この多次元配列にはエントリーのログが含まれていて、すべてのエントリーにはタイトル（dappのすべてのログには日付を書いています）とコンテンツがあると仮定しています。**Datalog.vue**と**Launch.vue**のコンポーネントで配列を再フォーマットする必要があります。

次に**Datalog.vue**を編集します。ログを取得するFindメソッドを編集します:
```JS
async read() {
  this.log = (await this.api.query.datalog.datalog(this.account)).toArray();
}
```

次に、**Datalog.vue**でデータをフォーマットして、**DatalogSection.vue**にログの配列を渡す必要があります。そこで、ログの配列をマッピングしてみましょう:
```JS
async read() {
  this.log = (await this.api.query.datalog.datalog(this.account)).toArray().map((item) => {
    return [new Date(Number(item[0])).toLocaleString(), u8aToString(item[1])]
  });
}
```

このコードはもう必要ありません。:
```JS
filters: {
  dateFormat: function(v) {
    return new Date(Number(v)).toLocaleString();
  },
  dataFormat: function(v) {
    return u8aToString(v);
  }
}
```

**DatalogタブのDatalogセクションを確認してみましょう:**

<!-- ![Dapp Interface changing step 13](../images/build-dapp-interface/dapp-13.gif "Dapp Interface changing step 13") -->
<img alt="Dappインターフェース変更ステップ13" src="../images/build-dapp-interface/dapp-13.gif" />

## 起動

このステップでは、ほとんどの改善点がすでに完了しているので、テンプレートに適用するだけです。ButtonとDatalogコンポーネントをインポートし、過剰なタイトルを削除します:

<!-- ![Dapp Interface changing step 14](../images/build-dapp-interface/dapp-14.gif "Dapp Interface changing step 14") -->
<img alt="Dappインターフェース変更ステップ14" src="../images/build-dapp-interface/dapp-14.gif" />

`select`コントロール要素を`checkbox`に置き換えてみましょう。

これの代わりに:
```HTML
<select v-model="parameter" :disabled="isWrite">
  <option value="ON">ON</option>
  <option value="OFF">OFF</option>
</select>
```

これを書く:
```HTML
<div class="toggler inline-block">
  <input v-model="parameter" :disabled="isWrite" type="checkbox" id="robot-switch" />
  <label for="robot-switch"><span></span></label>
</div>
```

<details>

<summary>Styles in app.css:</summary>

```CSS
.toggler input { display: none; }
.toggler label {
  position: relative;
  display: block;
  width: 60px;
  height: 40px;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  background-color: var(--color-gray);
  color: var(--color-light);
  text-align: center;
}

.toggler label:before {
  content: 'Off';
  width: 100%;
  text-align: center;
  line-height: 40px;
}

.toggler label:after {
  content: '';
  display: block;
  width: 6px;
  height: 100%;
  border-radius: 10px;
  background-color: var(--color-gray-dark);

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  transition: 0.3s ease-out all;
}

.toggler input:checked + label {
  background-color: var(--color-green);
}

.toggler input:checked + label:before {
  content: 'On';
}

.toggler input:checked + label:after {
  transform: translateX(54px);
  background-color: #007038;
}
```

</details>

<!-- ![Dapp Interface changing step 15](../images/build-dapp-interface/dapp-15.gif "Dapp Interface changing step 15") -->
<img alt="Dappインターフェース変更ステップ15" src="../images/build-dapp-interface/dapp-15.gif" />

インターフェイスについて明確にしておきたいことがあります。これらの要素を使って、いくつかのデバイスを開始します。それをイメージしてみましょう。ここではドローンを選んだので、`item.parameter`に応じてクラスを切り替えます。

`data`に新しいプロパティを作成します:
```JS
data() {
  status: false
}
```

ボタンがクリックされ、ブロックにtxが送られた後、`parameter`の値を`status`に代入します:
```JS
methods: {
    async launch() {
      try {
        this.error = "";
        this.isWrite = true;

        const tx = await this.api.tx.launch
          .launch(this.robot, this.parameter === "ON")
          .signAsync(this.account);

        await tx.send(result => {
          if (result.status.isInBlock) {
            this.isWrite = false;
            this.status = this.parameter; // new line here
          }
        });
      } catch (error) {
        this.error = error.message;
        this.isWrite = false;
      }
    }
  }
```

**Launch.vue**にドローンのスタイルを書きます。このコンポーネントだけにスタイルを適用するために、`<style>`タグの`スコープ`を忘れないように。

<details>

<summary>drone用のCSS:</summary>

```CSS
<style scoped>
.tools {
  position: relative;
  padding-left: 120px;
  text-align: left;
  display: inline-block;
}

.launch-drone {
  position: absolute;
  width: 100px;
  left: 0;
  filter: grayscale(1);
  transition: 1s all ease-in;
}

.launch-drone.on {
  filter: grayscale(0);
  animation: DroneLaunch 10s linear infinite;
}

@keyframes DroneLaunch {
  0%, 20%, 40%, 60%, 80%, 100% {
    transform: translateY(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateY(-20%);
  }
}
</style>
```

</details>

<!-- ![Dapp Interface changing step 16](../images/build-dapp-interface/dapp-16.gif "Dapp Interface changing step 16") -->
<img alt="Dappインターフェース変更ステップ16" src="../images/build-dapp-interface/dapp-16.gif" />

それでは、**DatalogSection.vue**コンポーネントを追加しましょう。
```JS
components: {
  DatalogSection: () => import("./DatalogSection")
}
```

ログの配列を再構築:

```JS
this.log.push({
  sender,
  robot,
  parameter
});
```


 `[["entry 1 date", "entry 1 content"], ["entry 2 date", "entry 2 content"]]`のような構造の場合:

```JS
this.log.push([new Date().toLocaleString(), {
  sender,
  robot,
  parameter
}]);
```

テンプレートからコードを置き換えます:

```HTML
<div v-if="log.length > 0" class="log">
  <div v-for="(item, k) in log" :key="k" class="row">
    sender: <b>{{ item.sender }}</b>
    <br />
    robot: <b>{{ item.robot }}</b>
    <br />
    parameter: <b>{{ item.parameter ? "ON" : "OFF" }}</b>
  </div>
</div>
```

こちらに置き換え:

```HTML
<DatalogSection :log="log"/>
```

**確認:**
<!-- ![Dapp Interface changing step 17](../images/build-dapp-interface/dapp-17.gif "Dapp Interface changing step 17") -->
<img alt="Dappインターフェース変更ステップ17" src="../images/build-dapp-interface/dapp-17.gif" />

時々、いくつかのエラーが出ることがあります。接続がうまくいかなかったり、何か他のことが起こる可能性があります。そこで、Dappの中にエラーメッセージ付きのフォールバックを用意しました。

```HTML
<div v-if="error" class="error">{{ error }}</div>
```

インターフェースでは、エラーはこのようになっています。:

![Dapp Interface changing step 18](../images/build-dapp-interface/dapp-18.png "Dapp Interface changing step 18")

**app.css**に`.error`のスタイルを追加します:

```CSS
.error {
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-red);
}
```

そして、`.tools`の部分と他のコンテンツの間のスペースを、**app.css**でも下から修正します。

```CSS
.tools {
  margin-bottom: var(--space);
}
```

以下のようになります:

![Dapp Interface changing step 19](../images/build-dapp-interface/dapp-19.png "Dapp Interface changing step 19")

このページでは、ボタンを「primary」にしています。技術的には問題ありませんが、上記のユーザーエクスペリエンスからすると、これは問題ありません。画面上に複数のプライマリ・ボタンを使用しない方が良いでしょう。そこで、**Launch.vue**に`type="secondary "`のプロパティを持つ`ボタン`を追加して、この問題を解決しましょう。

![Dapp Interface changing step 20](../images/build-dapp-interface/dapp-20.png "Dapp Interface changing step 20")

良い感じ、次はノードの問題を解決して、デモのステップに進みましょう。

## デモ

はじめに、タブを入れ替えて、最も関連性の高いものに注意を払うようにしたいのですが、これは練習のために行う最初のステップではありません。**App.vue**でタブを反転させます。

デフォルトのデータの入れ替えも忘れずに:

```JS
data() {
    return {
      ...
      tab: "demo"
    };
},
```

![Dapp Interface changing step 21](../images/build-dapp-interface/dapp-21.png "Dapp Interface changing step 21")

いつものように、すでにあるものを変更することから始めましょう。

- 前のステップで行ったように、タイトル`<h2>Demo</h2>`を削除します。
- データログ、ボタン、アカウントアドレスなど、すでに学んだUI要素を見つけます。しかし、そうはいきません。ここでは、データログだけを変更します。

**Demo.vue**にコンポーネントを追加します:

```JS
components: {
  DatalogSection: () => import("./DatalogSection")
}
```

```HTML
<DatalogSection :log="log"/>
```

ログには生のデータが入っているので、前のステップのようにコンポーネントで描画しやすいデータを渡すために、ログで配列を再構成する必要があります。`async created() `の中の`return [item[0], item[1]];`という行を探して、次のように置き換えます。

```JS
return [new Date(Number(item[0])).toLocaleString(), JSON.parse(u8aToString(item[1]))];
```

使用していないコードをログから削除します。:

```HTML
<div v-if="log" class="log">
  <p v-if="log.length === 0" class="error">Not found</p>
  <div v-for="(item, k) in log" :key="k" class="row">
    <b>{{ item[0] | dateFormat }}</b>
    <pre>{{ item[1] | dataFormat }}</pre>
  </div>
</div>
```

こちらも:

```JS
filters: {
  dateFormat: function(v) {
    return new Date(Number(v)).toLocaleString();
  },
  dataFormat: function(v) {
    return JSON.parse(u8aToString(v));
  }
},
```

**確認:**
![Dapp Interface changing step 22](../images/build-dapp-interface/dapp-22.png "Dapp Interface changing step 22")

今回のロボット起動のデモ例をカスタマイズするには、自由にアイデアを出すことができます。個人的にはこの街から始めました。

<!-- ![Dapp Interface changing step 23](../images/build-dapp-interface/dapp-23.gif "Dapp Interface changing step 23") -->
<img alt="Dappインターフェース変更ステップ23" src="../images/build-dapp-interface/dapp-23.gif" />

混乱しないように全体のコードは示しませんが、概略的には次のようなものになります。

```HTML
<div class="demo" :class="[robot.state ? 'play' : 'stop']">
  <div class="demo-back"></div>
  <div class="demo-city"></div>
  <div class="demo-car"></div>
</div>
```

`.demo.play`という要素の中に、街を後ろに動かしたり、車を前に動かしたりするスタイルを書いています。

この作業をしているうちに、サイバーパンクの街を実現することを思いつきました。特別な作業なしで、車はタクシーになり、ドライバーは乗客になり、インターフェイスにはAIロボットのホログラムが乗客を迎えてくれるようになりました（これらはすべて、CSSとグラフィックの調整とトリックに過ぎません）

**Cyberpunk cityデモのコード:**

<details>

<summary>Template</summary>

```HTML
<div class="demo" :class="[robot.state ? 'play' : 'stop']">
  <div class="demo-back-1"></div>
  <div class="demo-back-2"></div>
  <div class="demo-city-1"></div>
  <div class="demo-car"></div>

  <div class="demo-data">
    <div class="demo-data-driver inline-block">
      <img alt="Driver's avatar" src="../assets/images/cabman.png" v-if="robot.state"/>
    </div>
    <div class="demo-data-lines inline-block">
      <div class="demo-data-line">
          <div>Robot</div>
          <div>[ {{ addressShort(robot.address) }} ]</div>
      </div>

      <div class="demo-data-line" v-if="robot.state">
          <div>Passenger</div>
          <div>[ {{ addressShort(robot.driver) }} ]</div>
      </div>

      <div class="demo-data-welcome" v-if="robot.state">
          <span>Hello, passenger. </span>
          <span>I've linked to the vehicle. </span>
          <span>Your ride begins, congrats! </span>
      </div>
    </div>

  </div>

  <Button :label="robot.state ? 'stop' : 'run'" :disabled="isWrite" size="large" @onClick="run" />
</div>
```

</details>

短縮されるべきハッシュアドレスが複数あるので、メソッドを追加しました。
```JS
methods: {
  addressShort(address) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }
}
```

Buttonコンポーネントの登録も忘れずに

```JS
components: {
  Button: () => import("./Button")
}
```

<details>

<summary>Styles</summary>

```CSS
<style scoped>
.demo {
    --h: 120px;
    --color-yellow: #F2F209;

    background-color: #AFCCD3;

    background: linear-gradient(#010123, #4baac7);

    position: relative;
    height: 500px;
    overflow: hidden;

    border-width: 2px 2px 2px 15px;
    border-style: solid;
    border-color: var(--color-yellow);
    
}

.demo:before {
    content: '[ Delamain cabs rental DEMO ]';
    background-color: var(--color-yellow);
    color: #000;

    position: absolute;
    top: 0;
    left: 0;
    padding: .5rem 1rem;

    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 300;

    border-width: 0 6px 2px 0;
    border-style: solid;
    border-color: #7B186E;
}

div[class^=demo-back-], div[class^=demo-city-] {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 2;
}

div[class^=demo-back-]{
    border-top: 1px solid #364444;
}

div[class^=demo-city-] {
    background-repeat: repeat-x;
    background-size: cover;
    background-position: 100% 0;

    height: 300px;
    bottom: var(--h);

    animation: 50s MoveCity infinite linear 1.5s;
}

div.demo-back-1 {
    background-color: #060236;
    background: linear-gradient(#7B186E, #060236);
    height: var(--h);
    bottom: 0;
}

div.demo-back-2 {
    background-color: #c515ae;
    border-width: 2px 0;
    border-style: solid;
    border-color: #69045c;

    height: 20px;
    bottom: var(--h);
    z-index: 10;
}

div.demo-city-1 {
    background-image: url(../assets/images/city-1.png);
}

.demo-car {
    background-image: url(../assets/images/car.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 100% 0;

    width: calc(508px * 0.5);
    height: calc(257px * 0.5);
    position: absolute;
    bottom: calc(var(--h) + 4px);
    z-index: 10;

    transform: translateX(-100px);
    animation: MoveCar 50s infinite 1.5s linear;
}

.demo.play div[class^=demo-city-], .demo.play .demo-car { animation-play-state: running; }
.demo.stop div[class^=demo-city-], .demo.stop .demo-car { animation-play-state: paused; }

.demo.play .demo-car {
    background-image: url(../assets/images/car-ride.png);
}


.demo button {
    background-color: var(--color-yellow);
    border-color: var(--color-yellow);
    color: #000;

    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
}

.demo-data {
    position: absolute;
    bottom: 30px;
    left: 30px;
    z-index: 1000;

    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    padding: .5rem;
    font-family: var(--font-family-code);

    transition: 0.2s all ease;
}

.demo-data-lines {
    max-width: 400px;
}

.demo-data-line {
    display: grid;
    grid-template-columns: 100px auto;
    gap: .5rem;
    text-align: left;
}

.demo-data-line div:first-child {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
}

.demo-data-driver {
    margin-right: 1rem;
}

.demo-data-driver img {
    display: block;
    max-width: 100px;

    visibility: hidden;
    opacity: 0;
    animation: FadeInBlink .3s cubic-bezier(0.075, 0.82, 0.165, 1) 0.6s forwards;
}

.demo-data-welcome {
    text-align: left;
    padding-top: .5rem;
}

.demo-data-welcome span {
    visibility: hidden;
    opacity: 0;

    animation-name: FadeIn;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-duration: 0.6s;
    animation-fill-mode: forwards;
}

.demo-data-welcome span:nth-child(1) { animation-delay: 1.5s; }
.demo-data-welcome span:nth-child(2) { animation-delay: 2.5s; }
.demo-data-welcome span:nth-child(3) { animation-delay: 3.2s; }


@keyframes MoveCity
{
  100% {
    background-position: -1000px 0;
  }
}

@keyframes MoveCar
{
    0% {
        transform: translateX(-100px);
    }
    100% {
        transform: translateX(960px);
    }
}
</style>

```

</details>

**結果:**

<!-- ![Dapp Interface changing step 25](../images/build-dapp-interface/dapp-25.gif "Dapp Interface changing step 25") -->
<img alt="Dappインターフェース変更ステップ25" src="../images/build-dapp-interface/dapp-25.gif" />

## Conclusion

おめでとうございます！これで、Dappのデザインを変更し、アプリケーションのインターフェイスの構築を開始する方法がわかりました。

### Checkout links

- [このチュートリアルの全コード](https://github.com/positivecrash/wscool21-ui-dapp)
- [Discordで話し合う](https://discord.gg/5UWNGNaAUf)
- [ロボノミクスウィンタースクール2021のスケジュールと概要を見る](https://robonomics.network/blog/winter-robonomics-school/)
- [Github of contributor](https://github.com/positivecrash)

### 実践

もし時間が余っていたり、スキルを練習したい場合は、このデモで行える改善アイデアがあります:

- UIを狭い画面に適応させ、モバイルフレンドリーなdappにする
- dappの**_variables.scss**ファイルとテンプレートファイルを編集して、「ライト/ダーク」モードを追加する
- アドレスに「クリップボードにコピー」ボタンを追加
- 繊細なポップアップを作成して、ユーザーに変更を通知する（例：「Faucet」ボタンをクリックした後にユニットを受け取ったというメッセージをポップアップで表示したり、「起動」セクションで発生したエラーをポップアップで移動させることができます）。


質問や結果の共有は[Discord](https://discord.gg/5UWNGNaAUf)で行ってください。メッセージに `@positivecrash`をつけてください。






