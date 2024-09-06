---
title: 責任
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**ロボットを経済主体に変えるには、そのための契約ツールが必要です。それがLiabilityです - パラチェーンアカウント間の契約を実装するRobonomicsパレットです！**

{% roboWikiNote {title:"Dev Node", type: "warning"}%} このチュートリアルは、Robonomics Nodeのローカルインスタンスでデモンストレーションされています。[これらの手順](/docs/run-dev-node)に従って自分のものをセットアップしてください。
{% endroboWikiNote %}

## 理論概要

Ethereum時代には、責任の相互作用の構造がかなり複雑でした。[こちら](/docs/robonomics-how-it-works)で詳細を確認できます。現在はKusamaでは少し簡単になりました！

### 交渉

契約を締結するためには、まず両者が交渉する必要があります。これは、[IPFS PubSub](https://blog.ipfs.tech/25-pubsub/)やRobonomics PubSubなど、複数の方法で行うことができます。Robonomics PubSubを使用したPythonコードのサンプルは[こちら](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub)に示されています。

オファーとデマンドは、契約の2つの主要な特性である**ジョブの説明**と**価格**を含むメッセージです。メッセージの形式は、各特定のアプリケーションごとにユーザーが設計する必要があります。交渉プロセスで厳密な形式ルールに従う必要はありません。可能なフローは以下の図に示されています。

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} PubSubはオープンプロトコルなので、機密データは転送しないでください。そのためには他のプロトコルを使用する必要があります。
{% endroboWikiNote %}

### 署名

交渉が成功裏に終了すると、各当事者はそれぞれ署名と呼ばれる合意書を署名する必要があります。これは、アカウントのプライベートキーで署名されたジョブの説明と価格を含む**特定の形式**のメッセージです。これには[Pythonツール](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability)もあります。
- ジョブの説明は**技術**と呼ばれます。これは、エンコードされたIPFS CIDである32バイトの長さの文字列です。
- 価格は**経済**と呼ばれます。これはXRTの小数 - ウィーナーです。1ウィーナー = 10**-9 XRT。

{% roboWikiNote {title:"32バイト", type: "note"}%} [IPFS](https://ipfs.tech/) CIDを適切な形式でフォーマットしたものは、[Pythonライブラリ](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)を使用して取得できます。`sign_liability`関数を使用する際は、ハッシュを変換する必要はありません。自動的に行われます。{% endroboWikiNote %}

コーヒーの例に従うと：

1. タスクはJSONです
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. そのIPFS CIDは`QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`です。
3. したがって、**技術**（変換されたCID）は`0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`です。
4. **経済**は`1.5 XRT`です。

署名が完了したら、責任を作成する時が来ました！これは、約束者または約束者のどちらか、またはいわゆるプロバイダのサードパーティアカウントによって行うことができます。

## 責任の作成

### 準備

前述のように、少なくとも2つの側面がプロセスに関与しています。この例では、3つの側面を使用して、それぞれに資金を追加してプロバイダを作成します。交渉はすでに何らかの方法で行われたと仮定します。

### 1. 3つのアカウントを作成し、それぞれに資金を追加します

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

ここでは、プロバイダに100 XRTを供給して責任のextrinsicsに署名し、約束者には作業の支払いに2 XRTを与えました。約束者には（少なくとも1 mXRTの存在保証金を除く）資金は与えられませんでした。

### 1. Developer -> Extrinsicsに移動

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. liability -> createをドロップダウンリストから選択

送信するアカウントを選択し、すべてのパラメータを入力します。

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"署名", type: "note"}%} ここではプロバイダが使用されているため、参加者のシードを知る必要はありません。彼らの署名だけが必要です。
{% endroboWikiNote %}

### 3. トランザクションを送信

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. イベントで責任を確認

これには、`Network -> Explorer`に移動し、右側にイベントのリストを見つけて、三角形アイコンをクリックします。

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"ハッシュ", type: "note"}%} ハッシュは同じ[Pythonツール](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash)を使用してIPFS CIDに変換できます。
{% endroboWikiNote %}

### 5. ストレージの探索

ストレージモジュール`liability`で責任の特性を調べることもできます。

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"次のインデックス", type: "note"}%} `Next Index`ストレージ関数は、最新の責任インデックス+1を示します。したがって、`1`であっても、責任`0`が探索されます。
{% endroboWikiNote %}

## レポート

コーヒーが作られたとしましょう。そして、コーヒーメーカーはどこかにそれを報告する必要があります。それが責任レポートが登場する場面です。労働の証拠として、既存の責任を終了する際に、アカウントは別のIPFS CIDをレポートコンテンツとして追加します。これには再び約束者の署名が必要です。

{% roboWikiNote {title:"レポート署名", type: "note"}%} 署名されたメッセージには、既存の責任インデックスと32バイト表現でエンコードされたレポートIPFS CIDが含まれます。再び、[Pythonツール](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report)がレポートに署名するのに役立ちます。
{% endroboWikiNote %}

コーヒーメーカーの例に従うと：

1. レポートはJSONです
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. そのIPFS CIDは`QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`です。
3. したがって、**ペイロード**（変換されたCID）は`0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`です。
4. **インデックス**は`0`で、既存の責任インデックスです。

### 1. Extrinsicsに移動し、liability -> finalize(report)を選択

パラメータを入力してextrinsicを送信します。再び、これはサードパーティアカウントによって行うことができます。

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"存在保証金", type: "warning"}%} 約束者アカウントが「死んでいない」ことに注意してください - 少なくとも1 mXRTの存在保証金を持っている必要があります。
{% endroboWikiNote %}

レポートに署名して送信します。完了したら、イベントで確認できます。

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. レポートを探索

ストレージでレポートを確認することもできます。`Developer -> Storage`に移動し、ドロップダウンリストから`liability`を選択します。

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}

### 3. 残高を確認する

写真では、保証人が「給与」を受け取ったことが示されています。経済的な関係が生じました！

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"検証", type: "note"}%} 現時点では、仕事が完了したかどうかを検証する方法はありません。ですので、保証人が報告するとすぐにトークンがそのアカウントに送金されます。
検証機能は将来追加される予定です。
{% endroboWikiNote %}