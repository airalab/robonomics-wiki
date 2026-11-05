---
title: コレーターの運用
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

コレーターは Robonomics パラチェーンのブロックを生成します。このガイドでは、Linux サーバーにコレーターを構築してチェーンに登録する手順と、報酬の仕組みを説明します。

このガイドの元になっているのは、ランタイムのリポジトリにある [コレーターガイド](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) です。

## 必要なもの

- サーバー: 8 コア CPU、64 GB RAM、2 TB NVMe。このようなサーバーの費用は月 $120–150 程度です。
- ディスク: パラチェーンと Polkadot リレーチェーンを合わせて約 1.1 TB を使い、今も増え続けています。少なくとも 2 TB を用意してください。
- 自由残高が 32 XRT を超える Robonomics のアカウント。

## 1. ノードをインストールする

Robonomics 専用のノードバイナリはありません。コレーターは Parity の汎用 `polkadot-omni-node` を Robonomics のチェーンスペックで実行します。このガイドでは、ホームディレクトリが `/var/lib/robonomics/`、ベースパスが `/var/lib/robonomics/base/` の `robonomics` ユーザーを想定しています。

[Polkadot SDK のリリース](https://github.com/paritytech/polkadot-sdk/releases) から `polkadot-omni-node` をダウンロードします。最新の `polkadot-stable*` リリースを使ってください。以下のコマンドでは `polkadot-stable2609` を使っています。

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

チェーンスペックをダウンロードします。

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. ネットワークキーを生成する

ネットワークキーがないとコレーターは起動しません。

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

キーは `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519` に書き込まれます。バックアップを取ってください。

## 3. ノードを起動する

systemd サービスの推奨 `ExecStart`:

{% codeHelper {copy: true} %}

```
ExecStart=/usr/local/bin/polkadot-omni-node \
  --name "YOUR_NODE_NAME" \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json \
  --base-path /var/lib/robonomics/base/ \
  --collator \
  --sync warp \
  --telemetry-url "wss://telemetry.parachain.robonomics.network/submit/ 0" \
  -- \
  --sync warp
```

{% endcodeHelper %}

- 最初の `--sync warp` はパラチェーン用、`--` の後のものは組み込みのリレーチェーン用です。後者がないと、リレーチェーンの同期に数週間かかることがあります。
- チェーンスペックにはテレメトリーのエンドポイントがないため、`--telemetry-url` でテレメトリーを有効にします。

## 4. セッションキーを生成する

セッションキーは Aura (sr25519) のキーです。一時的に `--rpc-methods unsafe` を付けてノードを起動し、コレーターのアカウントを指定して `author_rotateKeysWithOwner` を呼び出します。

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

結果には `keys` と `proof` の 2 つのフィールドがあります。両方を保存してください。ノードがキーを持っているか確認します。

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

その後、`--rpc-methods unsafe` を外してノードを再起動します。

## 5. チェーンに登録する

コレーターのアカウントから、たとえば [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics) で次のエクストリンシックを送ります。

1. 前の手順で得た 2 つの値を指定して `session.setKeys(keys, proof)`。proof を空にしないでください。proof がキーとアカウントを結び付けます。
2. `collatorSelection.registerAsCandidate()`。これで **32 XRT** がボンドされます。

ノードはセッションが切り替わった後にコレーターセットに加わります。ランタイムでは 1 セッションが 3,600 ブロックで、6 秒ブロックなら約 6 時間です。

候補者になれたかどうかは、ノードの稼働状態だけでなくチェーン上で確認してください。**Developer → Chain state** で `collatorSelection.candidateList` と `collatorSelection.invulnerables` を見ます。

ボンドと候補者数の上限はランタイムの設定です。変更には Root のリファレンダムが必要です。[XRT とガバナンス](/docs/xrt-and-governance/) を参照してください。

## 報酬の仕組み

コレーターの収入源は 2 つです。

1. **ブロック報酬。** ブロックごとに固定の 0.0042 XRT が、ブロック作成者に直接ミントされます。ランタイム 43 から導入されています。
2. **手数料とチップ。** 手数料とチップはすべてコレーターのプールに入ります。ブロック作成者はプールから分配を受け取ります。

ブロック報酬は、サーバー費用を余裕を持って賄えるように設定されています。

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

前提は、年間 $2,040 のサーバー、7 台のコレーター、30% のマージン、XRT 価格 $1 です。前提が変われば、ランタイムのアップグレードで報酬を見直します。

収入はブロック全体に占める自分の割合で決まります。コレーターが多いほど、1 台あたりの生成ブロック数は減ります。背景と計測結果: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/)。
