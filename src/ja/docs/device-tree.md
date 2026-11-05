---
title: デバイスツリー (CPS)
contributors: [ensrationis]
---

デバイスツリーは、Robonomics クラウド上で設備を記述するものです。拠点、その中の部屋、部屋の中のデバイスを表します。それぞれの部分がノードです。チェーンは設備の構造と各ノードの最新の状態を保持します。大量のデータを保存するためのものではありません。

ランタイムでは、デバイスツリーは `CPS` パレット (cyber-physical systems、サイバーフィジカルシステム) です。技術的な詳細は [CPS パレットの README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md) にあります。

## ノード

- 各ノードには番号 (`NodeId`) があります。番号は 1 ずつ増え、再利用されません。
- ノードは親を持つことができます。親のないノードがルートノードです。
- ノードは 2 つのフィールドを持ちます。どちらも省略できます。
  - `meta`: ほとんど変わらない説明。最大 1 KiB。
  - `payload`: 現在の状態。最大 8 KiB。
- どちらのフィールドも単なるバイト列です。形式は自由に選べます。たとえば JSON です。
- ノードの親は変更できません。ノードを移動するには、新しいノードを作成して古いノードを削除します。
- 1 つのノードが持てる子は最大 100 個です。削除できるのは子のないノードだけです。

<!-- -->

{% roboWikiNote {type: "warning", title: "データは公開されます"}%} デバイスツリーの内容は誰でも読めます。非公開にしたいデータは、書き込む前に暗号化してください。[airalab/robins](https://github.com/airalab/robins) の `cps` ツールで暗号化できます。 {% endroboWikiNote %}

## Scope

Scope は、1 つのアカウントが所有するツリーの一部です。

- ルートノードを作成すると、同時に Scope も作成され、あなたがその所有者になります。
- 各ノードは、自分より上にある最も近い Scope ルートに属します。ノード自身が Scope ルートであれば、自分の Scope に属します。
- ツリー内のノードを、新しい入れ子の Scope のルートにできます。入れ子の Scope は強い境界です。外側の所有者や外側のアクセス権は、その内側では効力を持ちません。例外が 1 つあり、すぐ外側の Scope の所有者は入れ子の Scope を置き換えることができます。
- Scope の所有者は変わりません。Scope を引き渡すときは置き換えます。つまり、そのルートノードで Scope を作成できるアカウントが `create_scope` を呼び出します。新しい Scope ID が割り当てられ、呼び出し元が所有者になり、古いアクセスエントリーはすべて削除されます。
- Scope の深さは、ノードからその Scope ルートまで数えて最大 32 ノードです。ツリー全体はそれより深くできます。
- Scope が消えるのは、そのルートノードが削除されたときだけです。

## アクセス

Scope の所有者は、その Scope 内で何でもできます。他のアカウントにはアクセスエントリーが必要で、付与できるのは所有者だけです。

| 権限 | 許可される操作 |
|---|---|
| `Write` | `set_meta` と `set_payload` |
| `CreateScope` | `create_scope` |

- エントリーは 2 つのモードのどちらかで適用されます。`Node` (1 つのノード) か `Subtree` (そのノードと配下すべて。ただし入れ子の Scope の内側は除く) です。
- 1 つの Scope が持てるアクセスエントリーは最大 32 個です。
- 子の作成、ノードの削除、アクセスの付与と取り消しは委任できません。所有者だけが行えます。

5.0 ロードマップでは、さらに多くの権限 (トランザクション、ストレージ、コンピュート向け) が計画されています。まだランタイムには入っていません。

## ノードのアカウント

ノードには 1 つのアカウントを、そのアイデンティティとして紐付けられます。通常はデバイス自身の鍵です。1 つのアカウントがアイデンティティになれるノードは 1 つだけなので、デバイスのアカウントからノードを見つけられます。

- アイデンティティを設定・解除できるのは Scope の所有者だけです。`Write` 権限では足りません。
- アイデンティティが呼び出し元でない場合は、アイデンティティのアカウントが許可証 (permit) に署名する必要があります。許可証は `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)` を SCALE エンコードしたもので、`<Bytes>` ラッパーなしの生バイトとして署名します。
- 許可証の有効期間は最大 1 日 (14,400 ブロック) です。使っても消費されず、期限が切れるまでその Scope 内で有効です。Scope を置き換えると、古い許可証は無効になります。
- 新しいルートノードのアイデンティティにできるのは、呼び出し元自身のアカウントだけです。
- ノードを削除すると、そのアイデンティティも削除されます。

## 呼び出し

Polkadot.js では、これらの名前は camelCase で表示されます。たとえば `cps.createNode` です。

| 呼び出し | 引数 | 呼び出せるアカウント |
|---|---|---|
| `create_node` | `parent_id` (省略可)、`meta` (省略可)、`payload` (省略可)、`identity` (省略可: アカウントと、必要に応じて許可証) | ルートノード: 任意のアカウント。そのアカウントが Scope の所有者になります。子ノード: 親の Scope の所有者。 |
| `set_meta` | `node_id`、`meta` (`None` で削除) | `Write` の保有者 |
| `set_payload` | `node_id`、`payload` (`None` で削除) | `Write` の保有者 |
| `delete_node` | `node_id` | Scope の所有者。ノードに子があってはいけません。Scope ルートを削除すると、Scope とそのアクセスエントリーも削除されます。 |
| `create_scope` | `node_id` | `CreateScope` の保有者。入れ子の Scope のルートでは、外側の Scope の所有者も呼び出せます。 |
| `grant_access` | `node_id`、`principal`、`capability` (`Write` または `CreateScope`)、`mode` (`Node` または `Subtree`) | Scope の所有者 |
| `revoke_access` | `node_id`、`principal`、`capability` | Scope の所有者 |
| `set_identity` | `node`、`identity`、`permit` (省略可) | Scope の所有者 |
| `clear_identity` | `node` | Scope の所有者 |

イベント: `NodeCreated`、`MetaSet`、`PayloadSet`、`NodeDeleted`、`ScopeCreated`、`ScopeDeleted`、`AccessGranted`、`AccessRevoked`、`IdentitySet`、`IdentityCleared`。

## ツリーの読み取り

- 単純な読み取りはストレージクエリです: `cps.nodes`、`cps.meta`、`cps.payload`、`cps.children`。
- パレットにはビュー関数もあります (メタデータ V16 が必要で、チェーンはこれを提供しています)。
  - ノード番号で: `resolve_scope`、`has_capability`、`identity_of`、`node_by_identity`。
  - デバイスのアカウントで: `parent`、`children`、`meta`、`payload`、`scope_of`、`address_capability`。結果に含まれるノードにアイデンティティがない場合、これらは `MissingProjectedIdentity` で失敗します。
- JavaScript ではビュー関数は `api.view.cps.*` で、ビュー関数に対応したバージョンの `@polkadot/api` が必要です。Rust では型付きクレート `robonomics-runtime-subxt-api` に含まれています。

## 制限と手数料

| 制限 | 値 |
|---|---|
| `meta` のサイズ | 1,024 バイト |
| `payload` のサイズ | 8,192 バイト |
| Scope の深さ | 32 ノード |
| ノードあたりの子の数 | 100 |
| Scope あたりのアクセスエントリー数 | 32 |
| アイデンティティ許可証の有効期間 | 1 日 (14,400 ブロック) |

これらはランタイムの定数です。変更にはランタイムのアップグレードが必要です。

デバイスツリーにストレージデポジットはありません。支払うのは通常のトランザクション手数料で、データのサイズに応じて増えます。たとえば執筆時点では、`meta` 100 バイトと `payload` 100 バイトのルートノードで約 0.0003 XRT です。

## ツール

- `cps` コマンドラインツールと Rust ライブラリ `libcps` で、デバイスツリーのすべての操作ができます。[クライアントライブラリ](/docs/client-libraries/#cps-command-line-tool) を参照してください。
- エクストリンシックを送れるクライアントなら何でも使えます。たとえば `@polkadot/api` です。
- チェーンと直接通信できないデバイスについては、[デバイスの接続](/docs/connect-devices/) を参照してください。

## 今後

サブスクリプション (5.0、開発中) が入ると、Scope の所有者がツリー内のデバイスのトランザクション費用を払えるようになります。センサー自身が XRT を持たなくても書き込めるようになります。まだランタイムには入っていません。
