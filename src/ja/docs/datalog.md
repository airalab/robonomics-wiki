---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**アカウントに一定の資金があるため、エクストリンシックを送信できるようになりました。最初に試すのはDatalogです。これにより、データをブロックチェーンに永続的に保存できます。分散型で暗号保護されたデータ用のストレージを想像してみてください。**

{% roboWikiNote {type: "warning", title: "Dev Node"}%}このチュートリアルおよび後続のチュートリアルは、Robonomics Nodeのローカルインスタンスでデモンストレーションされています。[これらの手順](/docs/run-dev-node)に従って自分のノードをセットアップしてください。
{% endroboWikiNote %}


## 1. Developer -> Extrinsicsに移動

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. datalog -> recordをドロップダウンリストから選択

送信するエクストリンシックに使用するアカウントも選択してください。recordフィールドに記入してください。

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "大量のデータ"}%} Datalogは最大512バイトの文字列をサポートしています。大量のデータを保存するには、[IPFS](https://ipfs.tech/)を使用することができます。
{% endroboWikiNote %}

## 3. トランザクションを送信

拡張機能またはDAppを使用して以前に作成したアカウントでトランザクションに署名して送信してください。

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "削除"}%} *datalog -> erase*を呼び出すことで、**すべて**のレコードを削除することもできます。
{% endroboWikiNote %}

## 4. ストレージ内のdatalogを確認

これには、*Developer -> Chain state*に移動し、*datalog -> datalogIndex*を選択し、アカウントを指定して"+"ボタンを押してアカウントのレコードのインデックスを取得し、必要なものを*datalog -> datalogItem*で探します。

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "エクスプローラー"}%} datalogレコードを含むすべてのイベントは、*エクスプローラー*のイベントフローで確認できます。
{% endroboWikiNote %}