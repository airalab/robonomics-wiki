---
title: Robonomics 統合セットアップ

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant 統合 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**この記事では、Robonomics を Home Assistant に追加します。これにより、Home Assistant は暗号化されたデータを Robonomics Parachain に記録し、パラチェーンからの起動コマンドを受信してスマートデバイスを制御できるようになります。統合にはデータを保存し、IPFS ハッシュをデータログまたは起動関数に送信するために IPFS が使用されます。**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

まず最初に、ダッシュボードの設定を作成する必要があります。これには、Home Assistant ダッシュボードを開き、右上隅にある「ダッシュボードを編集」ボタン（鉛筆）を押します。
表示されたポップアップで、三点アイコンをクリックし、「コントロールを取る」ボタンを選択します：

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

もう一度「コントロールを取る」を押します：

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

次に、Robonomics 統合をインストールできます。以下の手順に従ってください：

1. Home Assistant のウェブインターフェースで `Settings` -> `Device & Services` に移動し、`ADD INTEGRATION` を押します。`Robonomics` を検索します。

2. Robonomics をクリックし、セットアップファイル（`robonomics.app-settings-<subscirption-name>-server.json` という名前のファイル、`<subscirption-name>` はサブスクリプションの名前です）をアップロードし、`CONTROLLER` アカウントのパスワードを入力します。セットアップファイルの作成方法については[こちら](/docs/sub-activate/?topic=smart-home#setup-your-subscription)を参照してください。

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"controller create"} %}{% endroboWikiPicture %}

3. オプション: 使用するネットワークを選択できます。

4. 構成を完了したら `SUBMIT` を押します。すべてを正しく入力した場合、成功ウィンドウが表示されます。

{% roboWikiNote {type: "okay", title: "" }%} インストールには、インターネット接続速度に応じて約 10～15 分かかる場合があります。 {% endroboWikiNote %}

以上です！Robonomics 統合を完全に Home Assistant にセットアップしました。これですべての Robonomics Web サービスを使用できます。詳細については、["Use" セクション](/docs/add-user)をご覧ください。