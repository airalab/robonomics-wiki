---
title: Robonomicsの統合セットアップ

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**この記事では、RobonomicsをHome Assistantに追加します。これにより、Home Assistantは暗号化されたデータをRobonomics Parachainに記録し、パラチェーンからの起動コマンドを受け取ってスマートデバイスを制御することができま。統合では、データを保存し、IPFSハッシュをデータログまたは起動関数に送信するためにIPFSを使用します。**

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. Home AssistantのWebインターフェースで、`Settings` -> `Device & Services` に移動し、`ADD INTEGRATION` をクリックします。Robonomicsを検索します。

2. Robonomicsをクリックし、設定を入力します。 

- 「SUB_CONTROLLER」アカウントのシードをコントローラーアカウントのシードに追加します。
- 「SUB_OWNER」アカウントの公開アドレスを購読所有者のアドレスに追加します。
- データ送信の間隔を設定します（デフォルトでは10分です）。
- （オプション）データをIPFSネットワーク全体に広げるために、ピニングサービスPinataや他のカスタムゲートウェイの資格情報を追加できます。

3. 設定を完了したら、`SUBMIT` を押します。すべて正しく入力した場合、成功ウィンドウが表示されます。

以上です！Robonomicsの統合をHome Assistantに完全にセットアップしました。これですべてのRobonomicsウェブサービスを使用できます。詳細については、[「使用」セクション](/docs/global-administration)をご覧ください。 
