---
title: レガシーパレット
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

以前のバージョンの Robonomics から引き継いだ 5 つのパレットが、今もランタイムに残っています。Datalog、Launch、RWS、DigitalTwin、Liability です。[ノードの README](https://github.com/airalab/robonomics#readme) では、これらを非推奨としています: "following pallets will be removed in near future"。削除の日程は発表されていません。

現在もチェーン上で動作しており、一部のアプリや連携機能が使っています。新しいプロジェクトは [デバイスツリー](/docs/device-tree/) から始めてください。

| パレット | 機能 | 後継 |
|---|---|---|
| Datalog | アカウントの下に短い記録を保存 | デバイスツリー。5.0 のストレージを計画中 |
| Launch | デバイスのアカウントに署名付きコマンドを送信 | — |
| RWS | 手数料なしのトランザクションのためのサブスクリプション | 5.0 のサブスクリプション (開発中) |
| DigitalTwin | デジタルツインのトピックをアカウントに対応付け | デバイスツリー |
| Liability | 当事者間の合意と、最後の報告 | — |

## Datalog

Datalog は、あなたのアカウントの下に短い記録をチェーン上で保存します。各記録にはタイムスタンプが付きます。

- `record(record)` は最大 512 バイトの記録を追加します。
- `erase()` は自分の記録をすべて削除します。
- 各アカウントには **直近 127 件の記録** が保持されます。それより古いものは上書きされます。(枠は 128 スロットで、1 スロットは常に空けてあります。)
- 大きなデータは IPFS に置き、その CID を記録してください。
- 読み出しにはストレージクエリ `datalog.datalogIndex(account)` (最初と最後のスロットを返します) と `datalog.datalogItem([account, slot])` を使います。イベントは `NewRecord` です。
- デポジットはなく、通常の手数料だけです。執筆時点では、512 バイトいっぱいの記録で約 0.0006 XRT です。
- RWS サブスクリプションがあれば、`rws.call` を通して手数料なしで記録を送れます。

現在の利用者: Home Assistant 向けの Robonomics Report Service、sensors.social の connectivity エージェント、robonomics.app の Altruist と電力モニターのグラフ。

最初の記録の手順は [はじめに](/docs/getting-started/#4-send-your-first-record) にあります。

## Launch

Launch はデバイスに署名付きコマンドを送ります。

- `launch(robot, param)`: `robot` はデバイスのアカウント、`param` は 32 バイトです。IPFS の CID のダイジェストを入れるのが一般的です。
- デバイスは、自分のアドレス宛ての `NewLaunch(sender, robot, param)` イベントを監視します。
- 誰でも任意のアドレスに launch を送れます。送信者の確認はデバイス側で行う必要があります。
- パレットは `param` を 1 つのグローバルな値 `Goal` にも書き込みますが、これは誰の launch でも上書きされます。このストレージ値ではなく、イベントを使ってください。
- 手数料は短い datalog の記録とほぼ同じです。RWS サブスクリプションがあれば、手数料なしで送れます。

robonomics.app は Home Assistant の操作に Launch を使っています。古い ROS 2 ラッパーはロボットの起動に使っていました。

<a id="rws-subscriptions"></a>

## RWS サブスクリプション

RWS (Robonomics Web Services) は、アカウントに手数料なしのトランザクションを提供します。

- 種類は 2 つです: `Daily { days }` と `Lifetime { tps }`。
- サブスクリプションに登録されたデバイスは `rws.call(subscription_owner, call)` で呼び出しを送り、手数料を払いません。無料の処理枠は時間とともに貯まります。Daily サブスクリプションでは 10,000 µTPS、つまり 1 秒あたり単純送金 0.01 回分の速さで貯まります。
- `set_devices(devices)` は、サブスクリプションを使えるデバイスのアカウントを最大 32 個まで登録します。リスト全体を置き換えます。`rws.call` を使えるのは登録されたデバイスだけです。
- `transfer(target)` は、サブスクリプションを持っていないアカウントに自分のサブスクリプションを移します。

### サブスクリプションの入手方法

- サブスクリプションはオークションで販売されます。`bid(index, amount)`: 最初の入札は 1 XRT より多くなければなりません。入札額はリザーブされます。入札のあるオークションは 10 ブロックごとに締め切られます。落札額はバーンされ、サブスクリプションが登録されます。
- [robonomics.app](https://robonomics.app) の **Buy a subscription** ページでは、空いているオークションへの入札と、自分のアカウントのデバイス登録を 1 つのトランザクションで行えます。価格に 0.01 XRT を加えた額より多い残高が必要です。空いているオークションがなければ、アプリは処理を断ります。

### 現在の状況

- 新しいオークションを開始できるのは Root だけです。Sudo がないため、オークションを新たに追加するたびに Root のリファレンダムが必要です。それが可決されるまでに、空きオークションがなくなる可能性があります。
- オラクルが発行するサブスクリプション (たとえば 2021 年の実験である Ethereum 上の RWS トークンによるもの) は接続されていません。オラクルのアカウントが設定されていないためです。トークノミクスのページによると、RWS は Kusama の XRT 残高が Polkadot に移った後に正規のネットワークに接続され、まず sensors.social のような非営利プロジェクトから対象になります。
- 後継は 5.0 の Subscription です。これにより、デバイス自身が XRT を持たなくてもネットワークを使えるようになります。開発中で、まだランタイムには入っていません。

## DigitalTwin

デジタルツインはトピックのリストで、各トピックはデータを提供するアカウントに紐付きます。

- `create()` でツインを作成します。
- `set_source(id, topic, source)` で 32 バイトのトピックをソースのアカウントに紐付けます。
- `remove_source(id)` でソースを削除します。

[デバイスツリー](/docs/device-tree/) がこれに代わります。

## Liability

Liability は当事者間の署名付き合意を記録します。

- `create(agreement)` は署名付きの合意を記録します。技術的な部分は IPFS を参照します。
- `finalize(report)` は報告を付けて合意を完了します。

パレットには、こうした合意のための簡単なマーケットも含まれています。後継は発表されていません。
