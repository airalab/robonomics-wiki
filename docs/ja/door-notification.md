---
title: ドアが開いたときに通知を受け取る
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

この記事では、Telegramボットの通知統合をインストールし、ドアが開いたときにTelegramアカウントに通知を送信する自動化を設定します。

## Telegramボットの通知

最初に、個人用のTelegramボットを作成する必要があります。これには、 [特別なTelegramボット @BotFather](https://t.me/botfather) にアクセスし、指示に従ってください。 
HTTP APIにアクセスするためのトークンを保存してください。

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type:'mp4'}]" />

<robo-wiki-note type="warning">

トークンを**安全に**保管し、**安全に**保してください。誰でもボットを制御するために使用できます 

</robo-wiki-note>

次のステップは、***User Chat ID*** を見つけることです。 これには次のものを使用します [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type:'mp4'}]" />

次に、「Telegram broadcast」統合をインストールしましょう。 この統合により、メッセージが Telegram に送信されます。

Robonomics のプリインストール イメージ、Home Assistant Docker または Home Assistant Core の場合は、`configuration.yaml` を編集する必要があります。 `ssh` 経由で Raspberry Pi に接続します。

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type:'mp4'}]" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

次の行をファイルの末尾に貼り付けます。 **bot API key**  と **your User Chat ID** を入力します。 通知サービスの名前も作成します。


<code-helper copy >

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  example id of a user
      
notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

</code-helper >

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type:'mp4'}]" />

**設定を保存し、ホーム アシスタントをリロードします。**

その結果、Home Assistant サービスに、あらゆるメッセージを Telegram チャットに送信するサービスが作成されます。
ホーム アシスタント Web インターフェイスの 開発者ツール メニューで確認できます。

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type:'mp4'}]" />

## ドアオープン通知

今度は自動化を作成します。 まず、このリンクからブループリントをホーム アシスタントにインポートします:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type:'mp4'}]" />

そして自動化を作成します:

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type:'mp4'}]" />

これで、ドアが開くたびに Telegram ボットからメッセージを受信できるようになります。

<robo-wiki-note type="okay">
この自動化は、家のどのドア/窓でも使用できます。
</robo-wiki-note>

