---
title: 起動
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Robonomicsパラチェーンのもう一つの基本的な機能は、起動パレットです。これにより、アカウント/それらの背後にあるエンティティにコマンドを送信することができます。これらのコマンドには、実行するタスクを指定するためのパラメータが含まれます。**

<robo-wiki-note type="warning" title="Dev Node">

  このチュートリアルおよび以下のチュートリアルは、Robonomics Nodeのローカルインスタンスでデモンストレーションされていることに注意してください。[これらの手順](/docs/run-dev-node)で自分自身のインスタンスをセットアップしてください。

</robo-wiki-note>

## 1. Developer -> Extrinsicsに移動します

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. 可能な外部機能のドロップダウン リストから launch -> launch を選択します。

また、エクストリンシックスを提出するアカウントも選択します。ターゲットアドレスとパラメータフィールドを入力します。

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  - Launch はコマンドとして 32 バイト長の文字列をサポートします ([ソース](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256))。
  ここには即興の余地があります:
  - 切り替えなどの基本的なコマンドの場合は、「0x00000000000000000000000000000000000000000000000000000000000001」または
  「0x000000000000000000000000000000000000000000000000000000000000」。
  - json のような高度なコマンドの場合は、[IPFS](https://ipfs.tech/) CID を使用できます [適切な方法](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)。

</robo-wiki-note>

## 3. トランザクションを送信します

<robo-wiki-picture src="launch/submit.jpg" />

## 4. イベントで起動を確認します

これには、*ネットワーク -> エクスプローラー*に移動し、右側にイベントのリストを見つけます。三角形のアイコンをクリックして展開します。

<robo-wiki-picture src="launch/event.jpg" />
