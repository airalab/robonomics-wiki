---
title: デバイスの接続
contributors: [Fingerling42, nakata5321, ensrationis]
---

Robonomics にデバイスを接続する方法は 2 つあります。Home Assistant を経由する方法と、トランザクションに署名できるデバイスやゲートウェイと通信できるデバイスを直接つなぐ方法です。

既製のハードウェアとスマートホームの設置は Pinout Limited が提供しています。製品とサービスは [pinout.cloud](https://pinout.cloud) をご覧ください。

## Home Assistant

Home Assistant 向けの連携機能は 3 つあります。それぞれ役割が異なり、保守の状況も同じではありません。

| 連携機能 | 機能 | 状況 |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Home Assistant の問題を監視します。エラーレポートを暗号化して IPFS にアップロードし、その CID をチェーンに記録します。レポートはインテグレーターのサポートチケットになります。毎日のハートビートも送ります。 | 保守されています。プレリリースとして公開されています。Home Assistant 2026.3.1 以降が必要で、HACS からカスタムリポジトリとしてインストールします。 |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | RWS サブスクリプションによる暗号化トランザクションを使った Home Assistant へのリモートアクセス。ユーザー管理とバックアップも含みます。 | 更新が止まっています。最新リリースは 2025 年 10 月の 2.2.1 です。古い `robonomics-interface` 1.6.3 を使い、ローカルの IPFS ノードが必要です。また、デフォルトのエンドポイントが停止済みの Kusama を指したままです。Polkadot のエンドポイントは選択できます。現在のランタイムでの動作は確認されていません。 |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | ローカルネットワーク経由で Altruist センサーを読み取ります。チェーンは使いません。 | 小規模で、ローカル専用です。 |

airalab の Robonomics integration は RWS サブスクリプションに依存しています。その現状は [レガシーパレット](/docs/legacy-pallets/#rws-subscriptions) を参照してください。

## 任意のデバイス

自分のデバイスを接続するための構成要素は次のとおりです。

1. **デバイスに専用のアカウントを持たせます。** 鍵はデバイスから出しません。
2. **トランザクションの費用を払います。** アカウントに少量の XRT を送るか (執筆時点で datalog の記録 1 件は 0.001 XRT の数分の一です)、`rws.set_devices` で RWS サブスクリプションに追加し (最大 32 デバイス)、`rws.call` 経由でトランザクションを送ります。
3. **デバイスツリーで設備を記述します。** 拠点のノードと、そのデバイスのノードを作成します。デバイスのアカウントを、そのノードのアイデンティティとして紐付けます。ゲートウェイがデバイスに代わって書き込む場合は、ゲートウェイに `Write` を付与します。[デバイスツリー (CPS)](/docs/device-tree/) を参照してください。
4. **データを書き込みます。** 現在の状態をノードの `payload` (最大 8 KiB) に入れるか、`datalog.record` で記録を書き込みます (最大 512 バイト、[レガシー](/docs/legacy-pallets/#datalog))。大きなデータは IPFS に置き、その CID を書き込みます。
5. **必要ならコマンドを送ります。** レガシーの `launch` 呼び出しで、デバイスのアカウントに署名付きのコマンドイベントを送れます。[Launch](/docs/legacy-pallets/#launch) を参照してください。

各ステップで使えるライブラリ: Python の `robonomics-interface`、JavaScript の `@polkadot/api`、Rust の `libcps` と `cps` ツール。[クライアントライブラリ](/docs/client-libraries/) を参照してください。

### 小型デバイス向けゲートウェイ

すべてのデバイスがチェーンと通信できるわけではありません。次のオープンソースのゲートウェイが間に入ります。

- **edge** ([airalab/robins](https://github.com/airalab/robins)): HTTP と Meshtastic で署名付きメッセージを受け取り、libp2p GossipSub で転送します。
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): MQTT メッセージをデバイスツリーの更新に変換します。
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): 署名付きのセンサー計測値を集め、IPFS pubsub とパラチェーンに渡します。[sensors.social](https://sensors.social) のセンサーを支えています。

公開リレーノードとその状態は [pubsub.robonomics.network](https://pubsub.robonomics.network) で確認できます。
