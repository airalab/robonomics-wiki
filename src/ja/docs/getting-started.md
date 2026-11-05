---
title: はじめに
contributors: [Vourhey, positivecrash, ensrationis]
---

このページでは、何もない状態から Robonomics ネットワークに最初の記録を書き込むまでを説明します。必要なのはブラウザ、ウォレット拡張機能、少量の XRT です。

## 1. アカウントを作成する

1. [Polkadot.js 拡張機能](https://polkadot.js.org/extension/)、またはカスタムネットワークに対応した別の Polkadot ウォレットをインストールします。
2. ウォレットでアカウントを作成します。リカバリーフレーズを書き留め、オフラインで保管してください。
3. 同じアカウントが Robonomics でも使えます。Robonomics は独自の形式 (SS58 プレフィックス 32) でアドレスを表示するため、アドレスは `4` で始まります。

アカウントがチェーン上に存在するのは、最低でも存在デポジットの 0.000001 XRT を保有している間だけです。

## 2. XRT を入手する

必要な量はごくわずかです。執筆時点では、datalog の記録 1 件の手数料は 0.001 XRT を大きく下回ります。

現在 XRT が取引されている場所:

- **Ethereum 上の Uniswap。** Ethereum 上の正規の XRT は、Polkadot から Snowbridge 経由でブリッジされた XRT です。コントラクトは `0x1F752250f518e419f2F03804E25728c5C6DfF73f` です。[Uniswap でスワップ](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f)。[Snowbridge](https://app.snowbridge.network/send) で Ethereum と Polkadot の間でトークンを移動できます。
- **Polkadot Asset Hub。** Asset Hub にも XRT があり、DOT–XRT のスワッププールがあります。

Asset Hub から Robonomics パラチェーン上のアカウントへ XRT を移すのは、クロスチェーン送金です。その手順書はまだ公開されていません。困ったときは Telegram グループ [XRT Traders](https://t.me/xrt_trade) で質問してください。

{% roboWikiNote {type: "warning", title: "古いリンク"}%} 古いページの一部には、すでに XRT を扱っていない取引所や、Ethereum 上のレガシートークン `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7` へのリンクが残っています。レガシートークンは正規の XRT ではありません。 {% endroboWikiNote %}

## 3. Polkadot.js Apps に接続する

[Robonomics の RPC で Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) を開きます。パブリックエンドポイント `wss://polkadot.rpc.robonomics.network/` に接続されます。アカウントが表示されるよう、ウォレット拡張機能でこのサイトを許可してください。

ブロック、アカウント、送金はブロックエクスプローラー [scan.robonomics.network](https://scan.robonomics.network) でも確認できます。

<a id="4-send-your-first-record"></a>

## 4. 最初の記録を送る

最も簡単な第一歩は datalog の記録です。これは、あなたのアカウントの下でチェーンに保存される短いデータです。

1. Polkadot.js Apps で **Developer → Extrinsics** を開きます。
2. アカウントを選び、`datalog` と `record` を選びます。
3. データを最大 512 バイトまで入力します。普通のテキストで構いません。
4. トランザクションを送信し、ウォレットで署名します。

読み出すには **Developer → Chain state** を開き、`datalog` と `datalogIndex` を選んで自分のアカウントを照会します。記録がどのスロットにあるかがわかります。次に、アカウントとスロット番号を指定して `datalogItem` を照会します。各記録にはタイムスタンプが付いています。

Datalog は [レガシーパレット](/docs/legacy-pallets/#datalog) の一つです。現在も動作し、最初のテストには向いていますが、新しいプロジェクトではデバイスツリーを使ってください。

## 5. 次に: デバイスを記述する

Robonomics の中核はデバイスツリーです。設備のノードを作り、その部分やデバイスのノードを追加し、誰が更新できるかを決めます。[デバイスツリー (CPS)](/docs/device-tree/)、続いて [デバイスの接続](/docs/connect-devices/) を参照してください。
