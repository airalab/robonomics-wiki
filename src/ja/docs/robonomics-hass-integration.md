---
title: Robonomics 統合のセットアップ

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant 統合 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
---

**この記事では、Robonomics を Home Assistant に追加します。これにより、Home Assistant は暗号化されたデータを Robonomics Parachain に記録し、パラチェーンからの起動コマンドを受信してスマートデバイスを制御できるようになります。統合では、データを保存し、IPFS ハッシュをデータログまたは起動関数に送信するために IPFS を使用します。**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

まず最初に、ダッシュボードの設定を作成する必要があります。これには、Home Assistant ダッシュボードを開き、右上隅にある「ダッシュボードを編集」ボタン（鉛筆）を押します。
表示されたポップアップで、3つの点のアイコンをクリックし、「Take Control」ボタンを選択します：

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

もう一度「Take Control」を押します：

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

これで Robonomics 統合をインストールできます。以下の手順に従ってください：

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Home Assistant の Web インターフェースで `Settings` -> `Device & Services` に移動し、`ADD INTEGRATION` を押します。`Robonomics` を検索します。

2. Robonomics をクリックして、次の設定を入力します：

- `SUB_CONTROLLER` アカウントからコントローラーアカウントのシードを追加します。
- `SUB_OWNER` アカウントの公開アドレスを購読所有者のアドレスに追加します。
- データ送信の間隔を設定します（デフォルトでは 10 分）。
- （オプション）Pinata や他のカスタムゲートウェイの認証情報を追加して、データを IPFS ネットワーク全体に広げるためのピニングサービスを使用できます。

{% roboWikiNote {title:"Note", type: "Note"}%} [Pinata Setup section](/docs/pinata-setup) で Pinata の使用に関する詳細情報を見つけることができます。{% endroboWikiNote %}

3. 設定を完了したら `SUBMIT` を押します。すべて正しく入力した場合、成功ウィンドウが表示されます。

以上です！Robonomics 統合を Home Assistant に完全にセットアップしました。これですべての Robonomics Web サービスを使用できます。詳細については、["Use" section](/docs/add-user) にアクセスしてください。