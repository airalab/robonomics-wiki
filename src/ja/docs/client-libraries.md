---
title: クライアントライブラリ
contributors: [PaTara43, ensrationis]
---

ライブラリは言語と用途で選んでください。デバイスツリーには `@polkadot/api`、Rust のクレート、または `cps` ツールを使います。Python から datalog と RWS を使うなら `robonomics-interface` です。

| ライブラリ | 言語 | デバイスツリー | 備考 |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | ヘルパーなし | Datalog、RWS、アカウント、暗号化 |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | 対応 | 汎用の Substrate クライアント |
| npm `robonomics-interface` | JavaScript | 非対応 | robonomics.app で使用 |
| `robonomics-runtime-subxt-api` | Rust | 対応 (型付き) | ランタイムのバインディング |
| `libcps` と `cps` ツール | Rust、コマンドライン | 完全対応 | [airalab/robins](https://github.com/airalab/robins) から |

どれも `wss://polkadot.rpc.robonomics.network/` か、自分のノードに接続します。

## Python: robonomics-interface

現在のバージョンは 3.1.0 です。ランタイム 52 の開発用チェーンと、稼働中のネットワークでの読み取り専用のチェックでテストされています。バージョン 3.0 は書き直されたもので、2.x とは互換性がありません。`substrate-interface` にはもう依存していません。2.x から移行する場合は [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md) を読んでください。

対応している機能:

- 鍵: デフォルトは ED25519 です。Polkadot のウォレットのデフォルトである sr25519 を使うには、`[sr25519]` extra と `crypto_type=SR25519` が必要です。SS58 アドレス、ニーモニック、ウォレットのバックアップのインポートにも対応しています。
- エンドポイント間でフォールバックする非同期クライアントと、スクリプト向けの同期版 (`RobonomicsSync`)。
- ストレージクエリと、イベントやわかりやすいエラーを返すエクストリンシック。
- Datalog、RWS、System、Balances のヘルパー。
- メッセージの暗号化と、Robonomics Report Service が使うレポートのエンベロープ。

デバイスツリー用のヘルパーはありません。ただし、汎用の `compose_call` と `submit` でどのパレットでも呼び出せます。

インストール (Python 3.12 以降):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

README に沿った datalog の記録の例:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

ドキュメント: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/)。

## JavaScript

`@polkadot/api` は、デバイスツリーを含むすべてのパレットで使えます。[CPS パレットの README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage) にある例:

```javascript
// Read a node.
const info = await api.query.cps.nodes(nodeId);   // parent and Scope pointer
const meta = await api.query.cps.meta(nodeId);
const payload = await api.query.cps.payload(nodeId);

// Create a root node and a child.
await api.tx.cps.createNode(null, meta, payload, null).signAndSend(owner);
await api.tx.cps.createNode(parentId, meta, payload, null).signAndSend(owner);

// Let another account write to one node.
await api.tx.cps.grantAccess(nodeId, principal, 'Write', 'Node').signAndSend(owner);

// View functions (need a @polkadot/api version with view-function support).
const scope = await api.view.cps.resolveScope(nodeId);
```

npm パッケージの `robonomics-interface` (JavaScript) は robonomics.app が使っているものです。datalog、launch、RWS、digital twin、ユーティリティの呼び出しに対応していますが、デバイスツリーには対応していません。

## Rust

- `robonomics-runtime-subxt-api`: ランタイムの型付きバインディング。デバイスツリーのビュー関数も含みます。
- `libcps`: ライトクライアントを組み込んだデバイスツリー用ライブラリ。crates.io には公開されていないため、[airalab/robins](https://github.com/airalab/robins) から使ってください。

<a id="cps-command-line-tool"></a>

## cps コマンドラインツール

`cps` はターミナルからデバイスツリーを操作するツールです。独自のライトクライアントを実行できるので、ノードやパブリック RPC は必要ありません。

[airalab/robins](https://github.com/airalab/robins/releases) のナイトリーリリース (Linux と macOS、x86_64 と aarch64 向けのアーカイブ) からインストールするか、Nix で実行します。

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

robins の README には `cargo install libcps` とも書かれていますが、crates.io に `libcps` クレートはありません。

主なコマンド:

```bash
cps lc &                        # start the embedded light client on 127.0.0.1:9944
cps status                      # where am I connected
cps tree <NODE_ID> --depth 2    # look at a tree

export ROBONOMICS_SURI='<your seed phrase>'   # signs writes; keep it secret
cps create --meta '{"type":"building","name":"HQ"}' --payload '{"status":"online"}'
cps create --parent <NODE_ID> --meta '{"type":"room"}' --payload '{"temp":"22C"}'
cps meta set <NODE_ID> '{"type":"room","name":"Lab"}'
cps payload set <NODE_ID> 'temp=24C'
cps delete <NODE_ID>
```

詳しいガイドは [robins のドキュメント](https://github.com/airalab/robins/tree/master/docs/src/01-cli) にあります。

## レガシー

ROS 2 ラッパー (`robonomics-ros2`) と `robonomics-js` はレガシーで、現在のランタイム向けには保守されていません。
