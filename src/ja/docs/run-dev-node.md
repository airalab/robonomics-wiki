---
title: 開発用ノードの実行
contributors: [LoSk-p, ensrationis]
---

開発用ノードは、コードをテストするためのローカルの単一ノード Robonomics チェーンです。ブロックはすぐに生成され、テスト用アカウントには資金があり、稼働中のネットワークには一切影響しません。

`robonomics --dev` バイナリはもうありません。[airalab/robonomics](https://github.com/airalab/robonomics) からランタイムをビルドし、そこからチェーンスペックを生成して、Parity の汎用 `polkadot-omni-node` をそのスペックで実行します。

## 1 コマンドで (Nix)

リポジトリのクローンから:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

スクリプトは必要に応じて `dev-runtime` フィーチャー付きでランタイムをビルドし、一時的なチェーンスペックを生成して、`polkadot-omni-node --chain <spec> --dev` を起動します。

## Nix を使わない場合

2 つのツールを Cargo でインストールしてから、同じスクリプトを実行します。

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## 手動で

チェーンスペックを残したい場合やノードのフラグを変えたい場合は、各手順を自分で実行します。

{% codeHelper {copy: true} %}

```bash
cargo build --release -p robonomics-runtime --features dev-runtime

chain-spec-builder -c ./chain_spec.json create \
  -n "Robonomics Dev" -i robonomics-dev -t development \
  -r ./target/release/wbuild/robonomics-runtime/robonomics_runtime.compact.compressed.wasm \
  --para-id 2000 --relay-chain westend-local \
  --properties tokenSymbol=XRT,tokenDecimals=9 \
  named-preset development

polkadot-omni-node --chain ./chain_spec.json --dev
```

{% endcodeHelper %}

組み込みの `--chain dev` はありません。常に生成したスペックと `--dev` を渡します。再起動してもチェーンの状態を残すには、`--base-path <dir>` を追加します。

## 得られる環境

- `ws://127.0.0.1:9944` の RPC と WebSocket。
- チェーン ID `robonomics-dev`、para ID 2000、リレーチェーン `westend-local`、小数点以下 9 桁のトークン XRT。
- 資金が入った開発用アカウント: Alice、Bob、Charlie など、よく知られたテスト用の鍵。
- Alice が Sudo です。Sudo は `dev-runtime` ビルドにだけ存在し、稼働中のネットワークには存在しません。
- `--base-path` を指定しない限り、起動のたびにまっさらな状態になります。

[Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) を `ws://127.0.0.1:9944` に接続すると、中身を確認できます。`cps` ツールでは `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` と `ROBONOMICS_SURI=//Alice` を使います。

## 開発用チェーンでの RWS

RWS オークションは Root が作成します。RWS のコードをテストするときにこの手順を省くため、`robonomics-interface` リポジトリには `scripts/devchain.sh` があります。これは RWS オークションを最初からジェネシスに含めた開発用チェーンを起動します。

Docker イメージなど、その他の方法は [開発者ガイド](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain) にあります。
