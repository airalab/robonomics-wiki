---

title: ホームアシスタントOSをアップグレードする
contributors: [LoSk-p]
tools:
  - Raspberry Pi向けHome Assistant OS 12.1
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy Add-on 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**この記事には、Robonomics統合を使用して既存のホームアシスタントOSをアップグレードする手順が記載されています。**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## HACSのインストール

[Home Assistant Community Store (HACS)](https://hacs.xyz/)を使用すると、カスタム統合をインストールできます。

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 開始する前に、SSHでホームアシスタントデバイスに接続するためのアドオンをインストールする必要があります。アドオンストアで`ssh`を検索します。`SSH & Web Terminal`アドオンをインストールすることをお勧めします。

{% roboWikiNote {title:"警告", type: "warning"}%} SSHアドオンが見つからない場合は、ユーザープロファイル設定で高度なモードを有効にしてみてください。これを行うには、左下隅のプロファイルアイコンをクリックし、高度なモードオプションを見つけてください。{% endroboWikiNote %}

2. アドオンを選択して`INSTALL`を押します。インストールが完了したら、`Configuration`タブに移動して`password`または`authorized_keys`を追加します。この構成の一部を保存するのを忘れないでください。

3. `Info`タブで`START`を押します。サイドバーにアドオンを表示したい場合は、`Show in sidebar`を有効にするのを忘れないでください。

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. SSHアドオンを開き、次のコマンドを実行します:

{% codeHelper { additionalLine: "Home Assistant Command Line", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Home Assistantを再起動します（`Settings`->`System`で行えます）。

6. これでHACS統合が`Integrations`メニューに追加されます。`Settings`->`Devices & Services`に移動し、`Add Integration`を押してHACSを見つけます。

{% roboWikiNote {title:"警告", type: "warning"}%} HACSを使用するには、Githubアカウントが必要です。{% endroboWikiNote %}

7. クリックしてインストール手順に従います。

## IPFSデーモンとLibp2p - WS Proxyアドオンのインストール

Robonomics Integrationは、ローカルIPFSデーモンを使用してデータを保存し、リモート制御にLibp2pを使用するため、まずそれらをインストールする必要があります。このボタンを使用してRobonomics Add-Onsリポジトリを追加できます

[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

または、次の手順を使用して手動で行うこともできます:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. [Robonomics Addons Repository](https://github.com/PinoutLTD/robonomics-addons)があります。`Settings` -> `Add-Ons`に移動し、右下隅の`ADD-ON STORE`ボタンを押します。

2. 右上隅の3つの点を押し、`Repositories`を選択します。以下のリンクを追加します:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. `ADD`ボタンを押します。

4. リポジトリマネージャを閉じ、ページを更新します。ページの最後にRobonomics Add-Onsが表示されるようになります。

これで両方のアドオンをインストールできます。それらを開き、`INSTALL`を押した後、`START`を押します。

## Robonomics Integrationのインストール

HACSを使用してRobonomics Integrationをインストールできます。

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

サイドバーメニューからHACSを開き、`Robonomics`を検索します。その後、右下隅にある`Download`ボタンをクリックします。ダウンロードが完了したら、Home Assistantを再起動します。