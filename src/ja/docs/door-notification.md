---
title: ドアが開いたときに通知を受け取る
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

この記事では、Telegramボット通知の統合をインストールし、ドアが開いたときにTelegramアカウントに通知を送信する自動化を設定します。

## Telegramボット通知

まず、個人用のTelegramボットを作成する必要があります。[特別なTelegramボット @BotFather](https://t.me/botfather) にアクセスして、指示に従ってください。
HTTP APIにアクセスするためのトークンを保存してください。

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} トークンを**安全に**保管し、**安全に**保存してください。誰でもボットを制御できる可能性があります
{% endroboWikiNote %}

次に、***ユーザーチャットID***を見つける必要があります。次の[GetIdsBot](https://t.me/getidsbot) を使用してください。

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

次に、「Telegram broadcast」統合をインストールしましょう。この統合は、Telegramにメッセージを送信します。

Robonomicsの事前インストールされたイメージ、Home Assistant Docker、またはHome Assistant Coreを使用している場合は、`configuration.yaml`を編集する必要があります。Raspberry Piに`ssh`で接続します：

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

次の行をファイルの末尾に貼り付けます。**ボットAPIキー**と**ユーザーチャットID**を挿入してください。また、通知サービスの名前を作成してください：

{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  ユーザーの例
notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**設定を保存して、Home Assistantを再読み込みしてください。**

結果として、Home Assistantサービスには、Telegramチャットにメッセージを送信するサービスが作成されます。
Home AssistantのWebインターフェースの開発者ツールメニューで確認できます。

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

## ドアが開いたときの通知

さて、自動化を作成する準備が整いました。まず、次のリンクからHome Assistantにブループリントをインポートします：

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

そして、自動化を作成します：

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

これで、ドアが開いたときにTelegramボットからメッセージを受け取るようになります。

{% roboWikiNote {type: "okay"}%} この自動化は、家の中のどのドア/窓でも使用できます。
{% endroboWikiNote %}