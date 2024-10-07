---
title: Robonomicsビデオサービス
contributors: [nakata5321]
---

この記事では、IPカメラをHome Assistantに追加し、ビデオをRobonomics Webサービスに送信する方法を示しています。

カメラをHome Assistantに接続するには、そのIPアドレスを知っている必要があり、RTSPストリームに接続するためのローカルカメラアカウントを作成する必要があります。

{% roboWikiNote {type: "warning"}%} これは各カメラで異なる方法で行われるため、このプロセスはこの記事では考慮されていません。
{% endroboWikiNote %}

必要なもの:
- IPカメラ
- 構成済みのローカルカメラアカウント
- カメラのIPアドレス
- 構成済みのHome Assistant

{% roboWikiNote {type: "warning"}%} この記事では、RTZ（回転、傾斜、ズーム）オプションのない一般的なIPカメラを想定しています。RTZカメラをお持ちの場合は、["RTZカメラ"記事](/docs/ptz-camera)を確認してから、ここに戻ってきてください。{% endroboWikiNote %}

## カメラを接続する

まず、カメラのRTSPストリームのURLを見つける必要があります。
これを行うには、インターネットで次のクエリを入力してみてください: "<CAMERA_NAME> RTSP stream"。
ストリームURLは`rtsp://<IP_Address>...`で始まる必要があります。

この記事では"Tapo"カメラを使用し、ストリームパスは`rtsp://<IP_Address>/stream1`です。

Home Assistantを開き、「設定」->「デバイス＆サービス」に移動します。 "ADD INTEGRATION"ボタンを押して、
"Generic Camera"統合を入力し始めます。それを選択します。

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

構成ウィンドウで次の情報を提供します:
- ストリームソースURL - カメラのRTSPストリームのURL
- ユーザー名 - ローカルカメラアカウントのユーザー名を入力
- パスワード - ローカルカメラアカウントのパスワードを入力

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

設定をスクロールダウンして、「送信」ボタンを押します。

プレビューウィンドウでチェックボックス「この画像は良いようです。」をアクティブにし、「送信」ボタンを押します。その後、「完了」を押します。

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"} %}{% endroboWikiPicture %}

### ダッシュボードに追加

さらに、ストリームをダッシュボードに追加することができます。これを行うには、ダッシュボードに移動して新しいカード「Picture Glance」を作成します。以下の手順に従ってください：
- 希望する「タイトル」を入力します
- 「画像パス」からデータを削除します
- 「カメラエンティティ」でカメラを選択します
- 「カメラビュー」で「ライブ」を選択して遅延を少なくします

そして保存します。
{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}


## メディアフォルダを確認

Robonomicsビデオサービスに送信する前に、ビデオをフォルダに保存し、Home Assistantがこのフォルダにアクセスできる必要があります。
この場合、最も簡単なオプションは、Home Assistantがすべてのメディアを保存するメディアパックを使用することです。

- HAOSまたは事前インストールされたイメージを使用している場合、Home Assistantにはすでにメディアフォルダがあります。
- Home Assistant Coreを使用している場合は、`.homeassistant`フォルダに移動し、その中に`media`フォルダを作成します。
- Home Assistant Dockerを使用している場合は、Dockerコマンドに ` -v /PATH_TO_YOUR_MEDIA:/media \` 行を追加します。

すべてが正しく設定されたかどうかを確認するには、Home Assistantの「メディア」->「ローカルメディア」タブに移動します。
空のフォルダ（エラーなし）が表示されるはずです：

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## サービスコール

ビデオをRobonomicsに送信するには、Home Assistantで専用のサービスを呼び出す必要があります。
この記事では手動で行いますが、自動化することもできます。

これを行うには、「開発者ツール」->「サービス」に移動し、「Robonomics: Save recording to Robonomics」を見つけます。

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

「Targets」でカメラエンティティを選択します。
「録画を保存するパス」には、Home Assistantがビデオを保存できるフォルダへの絶対パスを指定する必要があります：
- 事前インストールされたイメージの場合 - `/home/homeassistant/.homeassistant/media`;
- HA OSまたはHome Assistant Dockerの場合 - `/media`- Home Assistant Core - 以前に作成したメディアフォルダへのパス。

録画の期間を選択することもできます。

データを入力して、「CALL SERVICE」ボタンをクリックしてサービスを呼び出します。

## DAPP

結果のビデオを表示するには、[Robonomics DAPP](https://vol4tim.github.io/videostream/) に移動してください。

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

コントローラのアカウントアドレスを貼り付け、以下のボタンをクリックしてください。"Search for Twins" プロセスを待ちます。
その結果、すべての録画ビデオを含むIPFS CIDが表示されます。

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

次に、ドロップダウンリストからコントローラアカウント（またはその他のアカウント）を選択し、Web3 IPFSゲートウェイで認証のためのメッセージに署名します。
その結果、スマートホームによって録画されたすべてのビデオをダウンロードできます。

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

フォルダ内のすべてのビデオはコントローラキーで暗号化されているため、それを挿入してビデオを復号化する必要があります。
その後、ビデオ再生ボタンがアクティブになります。それをクリックしてビデオをダウンロードしてください。

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}