---
title: ホームアシスタントOSをアップグレードする
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**この記事には、Robonomics統合を使用して既存のHome Assistant OSをアップグレードする手順が含まれています。**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## インストール IPFS Add-on


Robonomics統合は、ローカルのIPFSデーモンを使用してデータを保存するため、まずインストールする必要があります。 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. [Home Assistant用のIPFSアドオン](https://github.com/airalab/ipfs-addon)があります。インストールするには、`Settings` -> `Add-ons`に移動し、右下の`ADD-ON STORE`ボタンを押します。

2. 右上の3つの点を押して、`Repositories`を選択します。以下のリンクを追加します。

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. `ADD`ボタンを押します。

4. リポジトリマネージャーを閉じて、ページを更新します。これでページの最後にIPFSデーモンアドオンが表示されます。

5. アドオンを開き、`INSTALL`を押します。インストール後に`START`を押します。

## HACSをインストールする

[Home Assistant Community Store（HACS）](https://hacs.xyz/)を使用すると、カスタムインテグレーションをインストールできます。

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. 開始する前に、SSHでHome Assistantデバイスに接続するためのアドオンをインストールする必要があります。アドオンストアで`ssh`を検索します。`SSH＆Web Terminal`アドオンをインストールすることをお勧めします。

<robo-wiki-note type="warning" title="Warning">

  SSHアドオンが見つからない場合は、ユーザープロファイル設定で高度なモードを有効にしてみてください。これを行うには、左下のプロファイルアイコンをクリックし、高度なモードオプションを見つけます。

</robo-wiki-note>

2. アドオンを選択し、`INSTALL`を押します。インストールが完了したら、`設定`タブに移動し、`password`または`authorized_keys`を追加します。この構成の一部を保存するのを忘れないでください。

3. `Info`タブで`START`を押します。サイドバーにアドオンを表示するには、`Show in sidebar`を有効にするのを忘れないでください。

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. SSHアドオンを開き、次のコマンドを実行します。

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. ホーム アシスタントを再起動します (`Settings`-> `System` で実行できます)。

6. これでHACS統合が`Integrations`メニューに追加されます。`Settings`->`Devices & Services`に移動し、`Add Integration`を押してHACSを見つけます。

<robo-wiki-note type="warning" title="Warning">

  HACSを使用するには、Githubアカウントが必要です。

</robo-wiki-note>

7. クリックしてインストール手順に従います。 

## Robonomics統合をインストールする

HACSを使用してRobonomics統合をインストールできます。

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

サイドバーメニューからHACSを開き、`Integrations`に移動します。`Explore & Download Repositories`をクリックし、`Robonomics`を検索して、右下の`Download`ボタンをクリックします。ダウンロードが完了したら、Home Assistantを再起動します。