---
title: グローバル管理

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**この記事では、Home Assistantに新しいユーザーを設定する方法を紹介します。**

## サブスクリプションへのユーザーの追加

以前に作成されたアカウントは使用できません。なぜなら、`SUB_OWNER`と`SUB_CONTROLLER`がセキュリティを提供し、最初にHome Assistantを起動したときに作成したユーザーにはRobonomics Parachainアカウントがないからです。

1. [前の記事](/docs/sub-activate/)で行ったように、Robonomicsパラチェーンでアカウントを作成します。

2. `SUB_OWNER`アカウントを使用して、[dapp](https://dapp.robonomics.network/#/subscription/devices)で新しいユーザーアカウントをサブスクリプションに追加します。アクセスリストには、`SUB_OWNER`、`SUB_CONTROLLER`、および`USER`の3つのアドレスが表示されるはずです。

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## ユーザーへのアクセスの付与

1. [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant)というdappサービスに移動します。右側のサイドバーで、さきほど作成したアカウントを選択します（プロファイルアイコンを押して、意図したアカウントを選択したことを確認してください）。

2. 必要なフィールドに`USER`のシードを入力します。管理者クレジットフィールドに`SUB_OWNER`と`SUB_CONTROLLER`のアドレスを追加します。すべてが正しい場合、検証ステータスが「VERIFIED」と表示されます。

3. さきほど登録した新しいユーザーのためにパスワードを作成、トランザクションを確認します。これはサブスクリプションのため手数料はかかりません。後でパスワードを「Restore」タブで復元することもできます。

4. 登録プロセスの後、ユーザーアドレスと新しく作成したパスワードを使用してHome Assistantにログインできます。

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

これで、Robonomicsを介して自宅を制御するためにdappを使用できます。[**「スマートホームテレメトリを取得する」**](/docs/smart-home-telemetry/)の記事を確認してください。

## トラブルシューティング

1. Robonomics アカウントから Home Assistant へのパスワードを忘れた場合は、[Dapp を確認してください。](https://dapp.robonomics.network/#/home-assistant)
「Your Home Assistant password」の部分に移動し、「Restore」タブを選択します。
