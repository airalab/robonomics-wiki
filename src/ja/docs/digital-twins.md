---
title: デジタルツイン
contributors: [nakata5321, PaTara43]

tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**複雑なデバイスやシステムを持ち、複数のモジュールを維持し、使用するためにいくつかのアカウントが必要な場合、それらをすべて1か所に保持するか、別々のアカウントでいくつかの機能をエンコードするか、例えば、異なる情報フローに対して異なるデータログソースを設定するためには、デジタルツインモジュールを使用する必要があります。**

{% roboWikiNote {title:"Dev Node", type: "warning"}%} このチュートリアルおよび後続のチュートリアルは、Robonomics Nodeのローカルインスタンスでデモンストレーションされています。[これらの手順](/docs/run-dev-node)に従って自分のノードをセットアップしてください。
{% endroboWikiNote %}

## 理論概要
任意のアカウントはデジタルツインを作成および管理できます。ツインは次の内容を持つ表として考えることができます:

| DT id  | トピック名 	| ソース    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


ここで:
* **DT id** は符号なし整数で一意のデジタルツインインデックスです。
* **トピック名** は、32バイトの長さのhex `H256`またはASCIIデータであり、[`Launch`](/docs/launch) extrinsicパラメータと同じです。
例: `0x1234....FF`または`hello.parachain.robonomics.world`。
* **ソース** - いくつかのアカウントアドレスです。

{% roboWikiNote {title:"トピック", type: "note"}%} 以前にLaunch extrinsicの概要で議論されたように、`H256`はエンコードされたIPFS CIDとして表現できます（詳細は[Pythonツール](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)を参照）。
したがって、トピックは、例えば、ツインのモジュールの説明など、データストレージとしても使用できます。{% endroboWikiNote %}

## デジタルツインの作成

### 1. Developer -> Extrinsicsに移動

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. 可能なextrinsicsのドロップダウンリストからdigitalTwin -> createを選択

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

トランザクションを送信します。ここでは、ツインを作成するためにパラメータは必要ありません。ツインにはインデックスが付与され、これ以降、デジタルツインの所有者のみがツインのトピックを追加/変更できます。

ツインIDはエクスプローラの概要ページで見つけることができます。

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## トピックの追加

### 可能なextrinsicsのドロップダウンリストからdigitalTwin -> setSourceを選択

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - エクスプローラページで取得したデジタルツインID。
* `topic` - 以前に議論された`H256`トピック名。この画像では、32文字の文字列です。
* `source` - トピックに関連付けられるアカウントアドレス。

{% roboWikiNote {title:"上書き", type: "note"}%} 必要に応じて、トピックは別のソースアドレスで上書きできることに注意してください。{% endroboWikiNote %}

署名してextrinsicを送信します。

## 探索

`Developer -> Chain state`ストレージモジュール`digitalTwin`に存在するデジタルツインに関するすべての情報を見つけることができます。

- ツインの総数 - `total()`;
- デジタルツインの所有者 - `owner(u32)`;
- デジタルツインのトピックに関する情報 - `digitalTwin(u32)`。

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}