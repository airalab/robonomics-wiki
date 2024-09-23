---
title: Robonomics Dev ノードの実行方法
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Robonomicsでアプリケーションをテストする場合は、開発モードで実行したいかもしれません。この記事では、Robonomicsのローカルテストインスタンスを取得する手順をステップバイステップで説明します。**


## ノードバイナリを取得

1. まず、バイナリファイルが必要です。最新の[リリース](https://github.com/airalab/robonomics/releases)からそれを含むアーカイブをダウンロードしてください。

2. アーカイブフォルダに移動し、バイナリを展開して権限を変更します:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## 実行

次のコマンドでノードを実行します:

```bash
./robonomics --dev
```
以下の出力が表示されます:

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"ゼロから", type: "note"}%} 既存のブロックを削除したい場合は、`/tmp/substrate******/chains/dev/db/full`のRocksDBを削除してください。
起動時にログで表示される対応する識別子を`******`に置き換えてください。

毎回ノードをゼロから開始したい場合は、`--tmp`フラグを使用してください。
{% endroboWikiNote %}


## 接続

[Polkadot Portal](https://polkadot.js.org/apps/#/explorer)を介してローカルノードに接続できます。

左上隅のネットワークを「Local Node」に変更し、「Switch」を押してください。

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

Robonomicsのローカルインスタンスへようこそ！

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}