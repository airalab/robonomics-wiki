---
title: Home AssistantでのPTZカメラ制御
contributors: [nakata5321]
---

この記事では、Home AssistantでのPTZカメラの設定プロセスについて説明します。
ONVIFプロトコルが使用されます。これにはローカルカメラアカウントが必要です。

{% roboWikiNote {title:"test", type: "warning"}%} ローカルカメラアカウントの設定手順はこの記事ではカバーされていません。
{% endroboWikiNote %}

必要なもの:
- PTZカメラ
- ローカルカメラアカウント
- カメラのIPアドレス
- 構成済みのHome Assistant

## ONVIF統合

まずは**ONVIF統合**のインストールから始めましょう。

「設定」の「デバイス＆サービス」に移動し、「統合の追加」ボタンを押します。
"ONVIF"と入力して統合を選択します。次のウィンドウが表示されます。

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

「送信」ボタンを押します。自動的にカメラを検索しようとします。成功した場合は、リストからカメラを選択して空白のフィールドを入力します。
それ以外の場合は、すべてのフィールドを手動で入力する必要があります。次のウィンドウが表示されます。

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

以下の項目を入力してください:
- 名前 - カメラに名前を付ける
- ホスト - カメラのIPアドレスを提供する
- ポート - 一般的には2020ですが、カメラの提供元によって異なる場合があります
- ユーザー名 - カメラのローカルアカウントのユーザー名を入力
  - パスワード - カメラのローカルアカウントのパスワードを入力

そして「送信」を押します。カメラのエリアを選択し、「完了」をクリックします。

## ダッシュボードにカメラ制御を追加

カメラの設定が完了したら、そのストリームと制御ボタンをダッシュボードに追加できます。

ダッシュボードに移動し、新しいカードを作成します。"Picture Glance"を選択します。

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

以下のデータを入力してください:
- タイトル - カメラ画像のタイトルを選択
- カメラエンティティ - ドロップダウンリストからカメラエンティティを選択
- カメラビュー - 遅延を少なくするために「ライブ」を選択

次に、左下のボタンを押して「コードエディター」モードに切り替えます。以下のコードが表示されます:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

`entities: []`の内容を以下の例に従って置き換えてください（`<YOUR_CAMERA_ENTITY>`は`camera_image`パラメータと同じです）:

{% codeHelper { copy: true}%}

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

以上です。これでダッシュボードにPTZカメラカードと制御ボタンが表示されるはずです。

## トラブルシューティング
Home Assistant Coreを使用しており、カメラからストリームが表示されない場合は、「stream」と「FFMPEG」の統合をインストールする必要があります。
これを行うには、`configuration.yaml`の末尾に`stream: `と`ffmpeg: `の文字列を追加する必要があります。