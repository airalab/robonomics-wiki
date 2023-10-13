---
title: 責任
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**ロボットを経済主体にするには、そのための契約ツールが必要です。 Liability - Robonomicsパレットは、パラチェーンアカウント間の契約を実装します！**

<robo-wiki-note type="warning" title="Dev Node">

  このチュートリアルはRobonomics Nodeのローカルインスタンスでデモンストレーションれていることに注意してください。[こちらの手順](/docs/run-dev-node)で自分のものをセットアップしてください。

</robo-wiki-note>

## 理論の概要

Ethereumでは、責任の相互作用の構造がかなり複雑でした。[こちら](/docs/robonomics-how-it-works)で詳細をご覧いただけます。現在はKusamaで少し簡単になりました！

### 交渉

契約に署名するには、まず双方が交渉する必要があります。 これは、[IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) や Robonomics PubSub など、いくつかの方法で実行できます。 Robonomics PubSub を使用した Python コードのサンプルは次のとおりです。
[ここ](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub) で紹介されています。

オファーと需要は、契約の2つの主要な特性である「ジョブの説明」と「価格」を含むメッセージです。メッセージの形式は、各特定のアプリケーションごとにユーザーによって設計される必要があります。交渉プロセスでは、厳格な形式のルールに従うことはあまり重要ではありません。可能なフローは、以下の図に示されています。

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  PubSubはオープンなプロトコルであるため、機密データは転送されません。そのため、他のプロトコルを使用する必要があります。

</robo-wiki-note>


### 署名

交渉が無事に終わったら、双方は署名と呼ばれるいわゆる合意書に署名する必要があります。 これは、アカウントの秘密キーで署名された**特定の形式**の仕事の説明と価格を含むメッセージです。
[Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) も同様です。
 - ジョブの説明は「テクニック」と呼ばれます。これは、エンコードされたIPFS CIDである可能性のある32バイトの長さの文字列です。
 - 価格は「経済学」と呼ばれます。これはXRTの小数点以下の桁数です。1 Weiner = 10**-9 XRTです。

<robo-wiki-note type="note" title="32 bytes">

  [IPFS](https://ipfs.tech/) CIDを適切な形式で取得するには、[Pythonライブラリ](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)を使用できます。
  `sign_liability`関数を使用する場合、ハッシュを変換する必要はありません。自動的に行われます。

</robo-wiki-note>

コーヒーの例に従うと、

1. タスクはJSONです
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. IPFS CIDは`QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`です
3. したがって、**テクニック**（変換されたCID）は`0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`です 
4. **経済学**は`1.5 XRT`です。

署名が完了したら、責任を作成する時が来ました！これは、約束者または約束者または第三者のアカウントで行うことができます。

## 責任を作成する

### 準備

前述のように、少なくとも2つの側面が関与ています。この例では、3つの側面を使用して、それぞれにプロバイダを作成します。交渉はすでに何らかの形で行われたと仮定します。

### 1. 3つのアカウントを作成し、それらに資金を追加します

<robo-wiki-picture src="liability/balances.jpg" />

ここでは、プロバイダに100 XRTを提供して責任の外部性を署名し、約束者には作業の支払いに2 XRTを提供しました。
約束者には（少なくとも1 mXRTの存在保証金を除く）資金は与えられませんでした。

### 1. Developer -> Extrinsics に移動します

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. 可能な外部機能のドロップダウン リストから liability -> createate を選択します。

また、外部性を提出するアカウントも選択します。すべてのパラメータを入力します。

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  ここではプロバイダが使用されているため、参加者のシードを知る必要はありません。署名のみが必要です。

</robo-wiki-note>

### 3. トランザクションを送信します

<robo-wiki-picture src="liability/submit.jpg" />

### 4. イベントで責任を確認する

これには、`Network -> Explorer`に移動し、右側にイベントのリストを見つけます。三角形のアイコンをクリックして展開します。

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  ハッシュは、同じ [Python ツール](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash) を使用して IPFS CID に変換できます。

</robo-wiki-note>

### 5. ストレージの探索

ストレージモジュール`liability`で責任のいくつかの特性を探索することもできます。

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  `Next Index`ストレージ関数は、最新の責任インデックス+1を表示しますので、`1`であっても責任`0`が探索されます。

</robo-wiki-note>

## レポート

コーヒーが作られ、コーヒーマシンがなんらかの方法で報告する必要があると想像してください。それが責任報告が登場する場所です。労働の証拠として、アカウントは既存の責任を最終化する際に別のIPFS CIDを報告内容として追加します。これには再び約束者の署名が必要です。

<robo-wiki-note type="note" title="Report signature">

  署名されたメッセージには、既存の負債インデックスと32バイト表現でエンコードされたレポートIPFS CIDが含まれています。再度、[Pythonツール](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report)を使用してレポートに名することができます。

</robo-wiki-note>

コーヒーマシンの例に従って：

1. レポートはJSON形式です
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. IPFS CIDは`QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`です
3. したがって、**ペイロード** (変換された CID) は `0xf06f2394f55537a5f37d63fd72bbfef50e9f60ea9e0e34224e455afae27a97a2` になります。
4. **インデックス**は`0`で、既存の負債インデックスです。

### 1. extrinsicsに移動し、liability -> finalize(report)に移動します

パラメータを入力し、外部を送信します。 繰り返しますが、これはサードパーティのアカウントによって実行される可能性があります。

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  注意：約束者のアカウントは「死んでいない」ことに注意してください - 少なくとも1 mXRTの存在保証金を持っている必要があります。

</robo-wiki-note>

レポートに署名して送信します。完了したら、イベントでそれを確認できます。

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. レポートを探索する

ストレージでもレポートを確認できます。`Developer -> Storage`に移動し、ドロップダウンリストから`liability`を選択します。

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. 残高を確認する

画像では、約束者が「給料」を受け取ったことが示されています。経済的な関係が生まれました！

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  現時点では、ジョブが完了したかどうかを確認する方法はありませんので、約束者が報告するとトークンがそのアカウントに転送されます。 
  検証機能は将来追加される予定です。

</robo-wiki-note>