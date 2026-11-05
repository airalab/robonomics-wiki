---
title: 他のネットワークの XRT
contributors: [nakata5321, ensrationis]
---

正規の XRT は Polkadot 上の Robonomics パラチェーンにあります。このページでは、Kusama と Ethereum の XRT がどうなるか、そして Polkadot Asset Hub のどこに XRT があるかを説明します。

## Kusama

Kusama 上の Robonomics パラチェーンは停止しました。2026 年 9 月 28 日に最後のブロック #12,268,835 を生成しました。データベースのアーカイブは [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama) にあります。

公開された記事に書かれている Kusama の XRT の扱い:

- 最後のブロック時点の XRT 残高はすべて、**+20% のボーナス** 付きで Polkadot に移ります。
- Kusama 側での **買い戻しはありません**。
- 残高が Polkadot のどこに反映されるか、保有者に何か作業が必要かは、別の記事で説明されます。

その記事は [Robonomics ブログ](https://robonomics.network/blog/) で確認してください。出典: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) と [トークノミクスのページ](https://robonomics.network/tokenomics/)。

## Ethereum

Ethereum 上の旧 XRT トークン (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) は非推奨です。2026 年 2 月 5 日、その発行の仕組みが悪用され、無償でミントされました。Polkadot と Kusama の XRT は影響を受けていません。

スナップショット (Ethereum ブロック 24,390,081) 時点で旧トークンを保有していた人は移行できます。

1. 移行アプリを開きます: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/)。
2. 2026 年 2 月 5 日に XRT を保有していたウォレットを接続します。アプリにスナップショット時点の残高とボーナス込みの額が表示されます。
3. どちらか一方を選びます。各アドレスが選べるのは 1 回だけです。
   - **Accept**: Ethereum 上の正規の XRT を受け取ります。スナップショット時点の残高に 20% を加えた額です。
   - **Decline**: 代わりに買い戻しプログラムに参加します。参考価格は $2.20 で、12〜36 か月かけて、トレジャリーの資金が許す範囲で支払われます。

署名する前に、アプリがクレームコントラクト `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c` と通信していることを確認してください。ソースコードは [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts) にあります。

受け取るのは Ethereum 上の正規の XRT で、コントラクトは `0x1F752250f518e419f2F03804E25728c5C6DfF73f` です。これは Polkadot から [Snowbridge](https://app.snowbridge.network/send) 経由で 1:1 でブリッジされた XRT です。保有することも、Uniswap で取引することも、Polkadot にブリッジすることもできます。旧トークンから新トークンへのブリッジはありません。

記事では移行期間を 12 か月としています。期限内に請求されなかった XRT は、所有の証明を添えたオンチェーンのガバナンス投票によってのみ復元できます。正確な条件は記事で確認してください: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) と [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/)。

質問は Telegram グループ [XRT Traders](https://t.me/xrt_trade) へどうぞ。

## Polkadot Asset Hub

XRT は Polkadot Asset Hub に外部アセット (foreign asset) として存在し、DOT–XRT のスワッププールがあります。Asset Hub の手数料は XRT で支払えます。

Asset Hub と Robonomics パラチェーンの間で XRT を移動するためのユーザーガイドは、まだ公開されていません。
