---
title: Robonomics Dev Nodeの実行方法
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Robonomicsでアプリケーションをテストする場合、開発モードで実行することができます。この記事では、Robonomicsのローカルテストインスタンスを取得するためのステップバイステップの手順を説明します。**


## ノードイナリの取得

1. まず、バイナリファイルが必要です。最新の[リリース](https://github.com/airalab/robonomics/releases)からアーカイブをダウンロードしてください。

2. アーカイブフォルダに移動し、バイナリを展開して権限を変更します。

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## 実行

次のコマンドでノードを実行します。

```bash
./robonomics --dev
```
次の出力が表示されます。

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  既存のブロックを削除する場合は、`/tmp/substrate******/chains/dev/db/full`でRocksDBを削除してください。
  `******`を起動時のログに表示される対応する識別子で置き換えてください。

  ノードを毎回ゼロから開始する場合は、`--tmp`フラグを使用してください。

</robo-wiki-note>

## 接続

ローカルノードには、[Polkadot Portal](https://polkadot.js.org/apps/#/explorer)を介して接続できます。

左上隅のネットワークを「Local Node」に変更し、「Switch」を押してください。

![switch](../images/dev-node/portal.png)

Robonomicsのローカルインスタンスへようこそ！

![local_node](../images/dev-node/dev-portal.png)


