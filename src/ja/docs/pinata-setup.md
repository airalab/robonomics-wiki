---
title: ピニャータのセットアップ

contributors: [tubleronchik, LoSk-p]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**この記事では、[Robonomics](https://www.pinata.cloud/)統合からファイルをピンするためのピニャータの設定方法を案内します。これにより、バックアップやテレメトリファイルへのアクセスが向上します。**

Pinataでファイルをピンするためには、まずアカウントを作成する必要があります。次に、`API Keys`セクションに移動し、以下の権限を持つ新しいキーを作成します：

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

次に、`API Key`と`API Secret`をコピーしてプライベートに保管してください。

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Robonomics統合をすでに設定している場合は、`Settings` -> `Devices & Services`に移動し、Robonomics統合で`configure`を押します。Pinataの資格情報を入力してください。

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}