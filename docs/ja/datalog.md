---
title: データログ
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**アカウントにいくらかの資金があるので、外部機能を送信できます。 最初に試してみるのは Datalog です。 それはあなたを可能にします
データをブロックチェーンに永続的に保存します。 データを暗号化で保護された分散ストレージを想像してみてください。これがまさにそれです。**

<robo-wiki-note type="warning" title="Dev Node">

このチュートリアルと次のチュートリアルは、ロボノミクス ノードのローカル インスタンスでデモンストレーションされることに注意してください。 セットアップしてください [これらの指示](/docs/run-dev-node).

</robo-wiki-note>

## 1. Developer -> Extrinsics に移動します。

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. 可能な外部機能のドロップダウン リストから datalog -> record を選択します。

また、外部ファイルを送信するアカウントを選択します。 記録フィールドに記入します。

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalog は、最大 512 バイトの文字列をサポートします。 大量のデータを保存するために使用される可能性がある [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. トランザクションを送信する

拡張機能または DApp を使用して以前に作成したアカウントでトランザクションに署名し、送信します。

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  次の方法であなたの記録の**すべて**を消去することもできます *datalog -> erase* 呼び出し。

</robo-wiki-note>

## 4. ストレージ内のデータログを確認する

このためには、次の場所に移動してください *Developer -> Chain state*, 選択する *datalog -> datalogIndex*,アカウントを指定して、
「+」ボタンをクリックしてアカウントのレコードのインデックスを取得し、必要なレコードを検索します。 *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="探索するr">

  データログ レコードを含むすべてのイベントは、*Explorer* のイベント フローで確認できます。

</robo-wiki-note>