---
title: ローンチ
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Robonomicsパラチェーンのもう1つの基本的な機能は、Launchパレットです。これにより、アカウント/それらの背後にあるエンティティにコマンドを送信できます。これらのコマンドには、実行するタスクを指定するパラメータが含まれます。**

{% roboWikiNote {title:"Dev Node", type: "Warning"}%} このチュートリアルと後続のチュートリアルは、Robonomics Nodeのローカルインスタンスでデモンストレーションされています。[これらの手順](/docs/run-dev-node)に従って自分のものをセットアップしてください。
{% endroboWikiNote %}

## 1. Developer -> Extrinsicsに移動

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. 可能なエクストリンシックスのドロップダウンリストからlaunch -> launchを選択

また、エクストリンシックスを提出するアカウントを選択します。ターゲットアドレスとパラメータフィールドを入力します。

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"launch"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 byte", type: "note"}%}  Launchは、コマンドとして32バイトの長さの文字列をサポートしています（[ソース](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)）ので、ここで工夫する余地があります:
  - トグルなどの基本的なコマンドには、"0x0000000000000000000000000000000000000000000000000000000000000001"または
  "0x0000000000000000000000000000000000000000000000000000000000000000"を使用できます。
  - IPFS CIDを使用してjsonのような高度なコマンドを含める場合は、[IPFS](https://ipfs.tech/) CIDを適切な方法でフォーマットしたものを使用できます
  ([proper way](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)）。
{% endroboWikiNote %}

## 3. トランザクションを提出

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

## 4. イベントでのローンチを確認

これには、*Network -> Explorer*に移動し、右側にイベントのリストを見つけて展開するために三角形アイコンをクリックします。

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"event"} %}{% endroboWikiPicture %}
