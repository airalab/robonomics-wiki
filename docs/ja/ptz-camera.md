---
title: Home AssistantでのPTZカメラ制御
contributors: [nakata5321]
---

この記事では、Home AssistantでのPTZカメラのセットアップのプロセスについて説明します。 
ONVIFプロトコルが使用されます。これにはローカルカメラアカウントが必要です。

<robo-wiki-note type="warning">
ローカルカメラアカウントの設定手順は、この記事では説明されていません。
</robo-wiki-note>

要件:
- PTZカメラ
- ローカルカメラアカウント
- カメラのIPアドレス
- 設定済みのHome Assistant

## ONVIF統合

**ONVIF統合**のインストールから始めましょう。 

「Settings」の「Devices & Services」に移動し、「ADD INTEGRATION」ボタンを押します。
「ONVIF」と入力し、統合を選択します。次のウィンドウが表示されます。

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

「Submit」ボタンを押します。自動的にカメラを検索しようとします。成功した場合は、 
リストからカメラを選択し、空白のフィールドを入力します。 
それ以外の場合は、すべてのフィールドを手動で入力する必要があります。次のウィンドウが表示されます。

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

空白を埋める:
- Name - カメラに名前を付ける
- Host - カメラのIPアドレスを入力する
- Port - ほとんどの場合、2020年ですが、カメラの提供元によっては変更される場合があります
- Username - カメラのローカルアカウントのユーザー名を入力する
  - Password - カメラのローカルアカウントのパスワードを入力する

そして、「Submit」を押します。カメラのエリアを選択し、「Finish」をクリックします。

## ダッシュボードにカメラ制御を追加する

カメラの設定が完了したので、ストリームと制御ボタンをダッシュボードに追加できます。

ダッシュードに移動し、新しいカードを作成します。「Picture Glance」を選択します。

 <robo-wiki-picture src="home-assistant/glance.jpg" />

データを入力します:
- Title - カメラ画像のタイトルを選択します
- Camera Entity - ドロップダウンリストからカメラエンティティを選択します
- Camera View - 遅延を少なくするために「live」を選択します

次に、左下のボタンを押して「Code Editor」モードに切り替えます。次のコードが表示されます。
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

`entities: []`の内容を以下の例に従って置き換えます（`<YOUR_CAMERA_ENTITY>`は`camera_image`パラメータと同じです）:

<code-helper copy>

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

</code-helper>

以上です。ダッシュボードにPTZカメラカードと制御ボタンが表示されるはずです.

## トラブルシューティング
Home Assistant Coreを使用しており、カメラからのストリームが表示されない場合は、「stream」と「FFMPEG」の統合をインストールする必要があります。 
これを行うには、`stream: `と`ffmpeg: `の文字列をconfiguration.yamlの末尾に追加する必要があります。