---
title: ホームアシスタントの初期化
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
---

**ホームアシスタントをインストールした後、初期化する必要があります。**

<robo-wiki-picture src="home-assistant/ha_init.png" />

ホームアシスタントのオーナーアカウントの作成を開始します。このアカウントは管理者であり、任意の変更を行うことができます。ェブブラウザを開き、`http://%RASPBERRY_IP_ADDRESS%:8123`にアクセスします。Raspberry PiのIPアドレスは、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用して確認できます。

<robo-wiki-note type="note">ルーターの設定により、Raspberry Piのアドレスは時間とともに変更される場合があります。</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type:'mp4'}]" />

1. 最初のページで、名前、ユーザー名、パスワードを入力し、「CREATE ACCOUNT」ボタンをクリックします。

2. 次の画面で、ホームの名前を入力し、場所と単位系を設定します。`DETECT`をクリックして場所を検出し、その場所に基づいてタイムゾーンと単位系を設定します。場所情報を送信したくない場合は、これらの値を手動で設定することもできます。

3. その後、ホームアシスタントはネットワーク上で検出したデバイスを表示します。以下に表示されるアイテムよりも少ないアイテムが表示されても心配しないでください。後でデバイスを手動で追加することができます。今は単に「FINISH」をクリックして、メインのホームアシスタント画面に移動します。

4. 最後に、ホームアシスタントのウェブインターフェースが表示され、すべてのデバイスが表示されます。 


## トラブルシューティング

1. ローカルユーザーのログインまたはパスワードを忘れた場合は、[この記事](https://www.home-assistant.io/docs/locked_out/)を確認して資格情報を復元してください。
