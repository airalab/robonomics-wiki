---
title: デジタルツイン
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**複雑なデバイスやシステムを持ち、いくつかのモジュールを維持する必要があり、使用するためにいくつかのアカウントが必要な場合、それらをすべて1つの場所に保持するか、別々のアカウントでいくつかの機能をエンコードるか、例えば、異なる情報フローに対して異なるデータログソースを設定するために、デジタルツインモジュールを使用する必要があります。**

<robo-wiki-note type="warning" title="Dev Node">

  このチュートリアルと次のチュートリアルは、ロボノミクス ノードのローカル インスタンスでデモンストレーションされることに注意してください。 セットアップしてください [これらの指示](/docs/run-dev-node).

</robo-wiki-note>

## 理論の概要
どのアカウントでもデジタルツインを作成および管理することができます。ツインは以下の内容を持つテーブルのようなものと考えることができます:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


ここで:
* **DT id** は符号なし整数で一意のデジタルツインインデックスです。
* **Topic name** は32バイトの長さの16進数の`H256`またはASCIIデータであり、 [`起動`](/docs/launch) 外部パラメータと同じです。 
例: `0x1234....FF`または`hello.parachain.robonomics.world`。
* **Source** - はいくつかのアカウントアドレスです。

<robo-wiki-note type="note" title="Topics">

  以前に起動外部パラメータの概要で説明したように、`H256`はエンコードされたIPFS CIDとして表現することができます（詳細は
  [Pythonツール](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) を参照）。
  したがって、トピックはデータストレージとしても使用できます。例えば、ツインのモジュールの説明です。

</robo-wiki-note>


## デジタルツインの作成

### 1. Developer -> Extrinsicsに移動します

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. digitalTwin -> create ドロップダウンリストからを選択します

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

トランザクションを送信します。ここではインを作成するためにパラメータは必要ありません。ツインにはインデックスが付与され、以降はデジタルツインの所有者のみがツインのトピックを追加/変更できます。

ツインIDはエクスプローラの概要ページで見つけることができます。

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## トピックの追加

### digitalTwin -> setSource ドロップダウンリストからを選択します

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - Explorer ページで取得した Digital Twin ID。
* `topic` - 以前に説明した`H256`トピック名。この画像では32文字の文字列です。
* `source` - トピックに関連付けるアカウントアドレスです。

<robo-wiki-note type="note" title="Overwrite">

  必要に応じて、トピックは別のソースアドレスで上書きすることができますので、注意してください。

</robo-wiki-note>

エクストリンシックに署名して送信します。

## Explore

`Developer -> Chain state`ストレージモジュール`digitalTwin`には、既存のデジタルツインに関するすべての情報が含まれています。

- ツインの総数 - `total()`;
- デジタルツインの所有者 - `owner(u32)`;
- デジタルツインのトピックに関する情報 - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />