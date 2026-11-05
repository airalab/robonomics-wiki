---
title: 概要
contributors: [ensrationis]
---

Robonomics は Polkadot 上のデバイス向けクラウドです。デバイスの説明と現在の状態をクラウドに保存し、計測値を書き込み、コマンドを送ることができます。利用料はネットワークのトークンである XRT で支払います。このクラウドを運営する特定の企業はありません。独立したコレーターが運用し、XRT 保有者がオンチェーン投票でガバナンスを行います。

## 主な構成要素

- **デバイスツリー (CPS)。** 設備を表すノードのツリーです。建物、その中の部屋、部屋の中のデバイスを表します。各ノードは短い説明と現在の状態を持ちます。ツリーのどの部分に誰が書き込めるかは所有者が決めます。現在の Robonomics の中核です。[デバイスツリー (CPS)](/docs/device-tree/) を参照してください。
- **XRT。** トークンです。トランザクション手数料やサブスクリプションの支払いに使い、XRT 保有者はこれで投票します。[XRT とガバナンス](/docs/xrt-and-governance/) を参照してください。
- **ガバナンス。** 2 つのトラックを持つ標準的な Polkadot OpenGov です。Sudo キーはありません。ランタイムのアップグレードを含め、特権が必要な変更はすべてリファレンダムを通ります。
- **コレーター。** ブロックを生成するサーバーです。XRT をボンドすれば誰でも候補者になれます。[コレーターの運用](/docs/run-collator/) を参照してください。

以前の構成要素 (Datalog、Launch、RWS サブスクリプション、Digital Twin、Liability) は現在も動作しますが、非推奨です。[レガシーパレット](/docs/legacy-pallets/) を参照してください。

## ネットワーク

| | |
|---|---|
| ネットワーク | Polkadot 上の Robonomics パラチェーン |
| Para ID | 3388 |
| トークン | XRT、小数点以下 9 桁 |
| アドレス形式 | SS58 プレフィックス 32 (アドレスは `4` で始まります) |
| ブロック時間 | 6 秒 (目標値) |
| パブリック RPC | `wss://polkadot.rpc.robonomics.network/` |
| ブロックエクスプローラー | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [Robonomics の RPC で開く](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

現在稼働している Robonomics のネットワークは Polkadot だけです。Kusama 上のパラチェーンは停止しました。[他のネットワークの XRT](/docs/xrt-migration/) を参照してください。

## 開発中の機能

Robonomics 5.0 では、クラウドを層ごとに追加していきます。ガバナンスと、Scope と Access を備えたデバイスツリーはすでに稼働しています。サブスクリプションは開発中で、完成するとデバイス自身が XRT を持たなくてもネットワークを使えるようになります。ストレージとコンピュートは計画段階で、コードはまだありません。

詳しくはブログ記事 [Robonomics 5.0, part one](https://robonomics.network/blog/robonomics-5-0-runtime-first/) と [5.0 ロードマップ](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md) をご覧ください。

## ソフトウェアと運営

Robonomics のソフトウェアはすべてオープンソースです。

- [airalab/robonomics](https://github.com/airalab/robonomics): ランタイムとそのパレット。
- [airalab/robins](https://github.com/airalab/robins): ツール群。`cps` コマンドラインツールやデバイス用ゲートウェイを含みます。
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): Python ライブラリ。
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): [robonomics.app](https://robonomics.app) の Web アプリ。

Robonomics 専用のノードプログラムはありません。コレーターは Parity の汎用 `polkadot-omni-node` を Robonomics のチェーンスペックで実行します。

この Wiki を含む Robonomics の Web サイトは、赤城エンジニアリング株式会社 (Akagi Engineering Co., Ltd.、日本) が運営しています。ニュースとリリースノートは [Robonomics ブログ](https://robonomics.network/blog/) に掲載しています。
