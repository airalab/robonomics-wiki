---
title: Robonomics 統合のセットアップ

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant 統合 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**この記事では、Robonomics を Home Assistant に追加します。これにより、Home Assistant は暗号化されたデータを Robonomics Parachain に記録し、パラチェーンからの起動コマンドを受信してスマートデバイスを制御できるようになります。統合では、データを保存し、IPFS ハッシュをデータログまたは起動関数に送信するために IPFS を使用します。**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Home Assistant のウェブインターフェースで `Settings` -> `Device & Services` に移動し、`ADD INTEGRATION` を選択します。`Robonomics` を検索します。

2. Robonomics をクリックして、次の設定を入力します:

- `SUB_CONTROLLER` アカウントからコントローラーアカウントのシードを追加します。
- `SUB_OWNER` アカウントの公開アドレスを購読所有者のアドレスに追加します。
- データ送信の間隔を設定します（デフォルトでは 10 分）。
- （オプション）Pinata や他のカスタムゲートウェイの認証情報を追加して、データを IPFS ネットワーク全体に広げることができます。

{% roboWikiNote {title:"Note", type: "Note"}%} [Pinata Setup section](/docs/pinata-setup) では、Pinata の使用に関する詳細情報を見つけることができます。{% endroboWikiNote %}

3. 設定を完了したら `SUBMIT` を押します。すべてを正しく入力した場合、成功ウィンドウが表示されます。

以上です！Robonomics 統合を Home Assistant に完全にセットアップしました。これで Robonomics Web サービスをすべて利用できます。詳細については、["Use" section](/docs/add-user) にアクセスしてください。