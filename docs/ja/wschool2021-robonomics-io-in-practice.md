---
title: Lesson 3, Robonomics IOの実践
locale: 'ja' 
contributors: [KiichiSugihara]
translated: true
---
import Asciinema from '~/components/Asciinema.vue'

## 必要なもの

* Dockerが必要です、最初に[install](https://docs.docker.com/engine/install/)してください。
* [Nova SDS011](https://aqicn.org/sensor/sds011) センサーは*オプション*です。

### SDS011の確認 (オプション)

SDS011センサーを接続した場合、それが`/dev`に表示され、正しいアクセス権を持っていることを確認してください。

<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>

## クイックスタート

Dockerのインストールが完了したら、公式リポジトリから[robonomicsのdockerイメージ](https://hub.docker.com/r/robonomics/robonomics)を起動します。このレッスンでは `winter-school `タグを使用します。

<Asciinema vid="wM43jozIVfcRmt52ENrJ6yPlH"/>

Dockerイメージの準備ができたら、`robonomics io`コマンド（SDS011デバイスを持っている場合はoptionで指定）を使ってデータを読み込んでみましょう。

<Asciinema vid="iztt22tKGaV8wq3cMXY1oUEYv"/>

SDS011センサーがない場合は、`vsds011.sh`を使って同じDockerコンテナ内にある仮想のSDS011センサーを自由に使うことができます。続くコマンドの中では、物理的なセンサーの代わりに透過的に使用してください。


<Asciinema vid="GCkSiJBA1DgpLAAHiMhIOSpgG"/>

Robonomics IO サブシステムには2種類のコマンドがあります:

* `read` - 読み込みアクセスをサポートするデバイスからデータを取得する。
* `write` - 書き込みアクセスをサポートするデバイスにデータを書き込む。

デバイスによっては両方をサポートしているものもあり、その場合には両方のコマンドの引数にデバイスが表示されます。

> 例えば、仮想デバイス `ipfs` は、ハッシュによる IPFS からのデータの`read`(読み取り)と、IPFS へのデータの`write`(書き込み)をサポートしています。

サポートされているデバイスの全リストは、引数なしで `robonomics io read`または `robonomics io write` を実行することで得られます。

## IPFSへのアクセス
次のステップでは、IPFSデーモンの起動が必要です。そのためには、`ipfs init`を実行し、専用のターミナルタブでデーモンを起動します。

<Asciinema vid="ir6ziXSBUDrRltTmNxg7sdXVY"/>

デーモンが起動すると、別のタブでdockerイメージを接続し、`robonomics io`を使ってデータを読み書きできるようになります。

<Asciinema vid="ZtwcmpB9Lhum2Sc221QmNwHG4"/>

SDS011センサーのデータをIPFSに転送するには、コンソールの`｜`(パイプ)シンボルを使います。実際にやってみましょう。


<Asciinema vid="XS0QESWG7f8ELsQe1bGQllb9O"/>

SDS011からのJSONデータがIPFS書き込みの入力として転送され、その結果が標準出力に出力されます。

For virtual sensor use:
```
vsds011.sh | robonomics io write ipfs
```

この方法を使えば `robonomics io`ツールのプリミティブな読み取りと書き込みを組み合わせるだけで、簡単なプログラムを簡単に作ることができます。


```bash
robonomics io read sds011 | gz | robonomics io write pubsub my-sensor-data
```

## Robonomics のデータログ

> Robonomics[Datalog](https://crates.robonomics.network/pallet_robonomics_datalog/index.html) のターゲットはデータのブロックチェーン化です。このパレットは、カスタムデータをブロックチェーンに保存して、将来変更できないようにする機能を提供します。

このレッスンの最後の部分では、robonomicsノードを実行する必要があります。ブロックタイムが短く、あらかじめ設定された口座にすでに残高が分散されているため、開発モードが好まれます。同じコンテナ内の別のターミナルタブで起動してみましょう。

<Asciinema vid="QnN9l0sdaZZOyK9ah0DntvCXt"/>


また、`datalog`デバイスの引数としてprivateなシード値が必要です。このシード値は、取引に署名するために使用され、アカウントを送信者として提示します。組み込まれている`robonomics key`コマンドを使って生成してみましょう。


<Asciinema vid="4Cdfl9F0GgjNWv1c1ZcTBBktF"/>

生成したアドレスとシード値は安全な場所に保存しておいてください。

現在、アドレスの残高はゼロで、ネットワークはこのアドレスからの取引の送信を許可していません。この問題を解決するために、`Alice`アカウントからトークンを送金しましょう。https://parachain.robonomics.network の Robonomics Portal を使って、 `ws://127.0.0.1:9944`というアドレスのローカルノードに接続してみましょう。


![portal transfer](../images/ws_lesson3/tran.jpg)


そして、任意のデータをブロックチェーンに保存するために、`datalog`デバイスを使用することができます。`-s`keyは、アカウントの秘密シード値を設定するために使用されます。取引を行うためには、口座の残高がゼロでないことが必要です。

<Asciinema vid="FzERH9TmFB8oRuas8ZU202Pv8"/>

すべてが正しく行われていれば、Robonomicsポータルの`Explorer`ページに`Datalog`イベントが表示されます。


![portal datalog](../images/ws_lesson3/datalog.jpg)


最後のステップは少し複雑ですが、このレッスンのすべての知識を使ってみるのもいいでしょう。SDS011センサー（またはファイル）からデータを収集し、それをIPFSに格納し、`datalog`トランザクションを送信してブロックチェーンにハッシュを保存する簡単なプログラムを作ってみましょう。


```
SDS011 -> IPFS -> Blockchain
```

Robonomics IOを使って簡単に実装できますので、やってみましょう。


<Asciinema vid="MTpiawGo8DKEn081OozbYb5mU"/>

For virtual sensor use:
```
vsds011.sh | robonomics io write ipfs | robonomics io write datalog -s <private_key>
```


うまくいけば、IPFSのハッシュを含む`Datalog`イベントが提示されるはずです。

![portal datalog complex](../images/ws_lesson3/datalog_complex.jpg)
