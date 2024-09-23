---
title: ホームアシスタントの初期化
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
---

**ホームアシスタントをインストールした後、初期化する必要があります。**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

ホームアシスタントのオーナーアカウントの作成から始めます。このアカウントは管理者であり、どんな変更も行うことができます。
Webブラウザを開き、`http://%PC_IP_ADDRESS%:8123`にアクセスします。Raspberry PiのIPアドレスは、[Fingモバイルアプリ](https://www.fing.com/products)や[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用して見つけることができます。
PC上ですべてを設定した場合は、`http://localhost:8123`を使用します。

{% roboWikiNote {type: "note"}%} IPアドレスは時間とともに変更される可能性があります。ルーターの設定によるものです。{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 最初のページで、名前、ユーザー名、パスワードを入力し、`CREATE ACCOUNT`ボタンをクリックします。

2. 次の画面で、自宅の名前を入力し、場所と単位システムを設定します。`DETECT`をクリックして、場所を見つけ、その場所に基づいてタイムゾーンと単位システムを設定します。場所情報を送信したくない場合は、これらの値を手動で設定できます。

3. その後、ホームアシスタントはネットワーク上で検出したデバイスを表示します。以下に表示されているアイテムよりも少ないアイテムしか表示されなくても心配しないでください。後でデバイスを手動で追加することができます。今は`FINISH`をクリックして、メインのホームアシスタント画面に移動します。

4. 最後に、ホームアシスタントのWebインターフェースが表示され、すべてのデバイスが表示されます。


## トラブルシューティング

1. ローカルユーザーのログイン情報やパスワードを忘れた場合は、[この記事](https://www.home-assistant.io/docs/locked_out/)をチェックして資格情報を復元してください。