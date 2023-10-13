---
title: Robonomicsビデオサービス
contributors: [nakata5321]
---

この記事では、IPカメラをHome Assistantに追加し、ビデオをRobonomics Webサービスに送信する方法を説明します。

カメラをHome Assistantに接続するには、そのIPアドレスを知り、RTSPストリームに接続するためのローカルカメラカウントを作成する必要があります。

<robo-wiki-note type="warning">
これは各カメラごとに異なる方法で行われるため、この記事では考慮されていません。
</robo-wiki-note>

要件:
- IPカメラ
- 設定済みのローカルカメラアカウント
- カメラのIPアドレス
- 設定済みのHome Assistant

<robo-wiki-note type="note">

この記事では、RTZ（回転、傾斜、ズーム）オプションのない一般的なIPカメラを使用していることを前提としています。 
RTZカメラを使用している場合は、["RTZカメラ"の記事](/docs/ptz-camera)を確認してから、ここで2番目のステップに戻ってください。

</robo-wiki-note>

## カメラを接続する

まず、カメラの RTSP ストリームの URL を見つける必要があります。
それを行うには、インターネットで次のクエリを入力してみてください："<カメラ名> RTSPストリーム"。
ストリームURLは `rtsp://<IPアドレス>...` で始まる必要があります。 

この記事では「Tapo」カメラを使用し、ストリームパスは `rtsp://<IPアドレス>/stream1` です。

Home Assistantを開き、 "Settings"-> "Devices & Services" に移動します。"ADD INTEGRATION"ボタンを押して、
"Generic Camera"インテグレーションを入力し始めます。それを選択します。

 <robo-wiki-picture src="home-assistant/generic.jpg" />

構成ウィンドウで次の情報を入します：
- Stream Source URL - カメラのRTSPストリームのURL
- Username - ローカルカメラアカウントのユーザー名を入力します
- Password - ローカルカメラアカウントのパスワードを入力します

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

設定をスクロールダウンし、「Submit」ボタンを押します。

プレビューウィンドウで、「This image looks good.」のチェックボックスをアクティブにし、「Submit」ボタンを押します。その後、「Finish」を押します。

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### ダッシュボードに追加する

さらに、ストリームをダッシュボードに追加することもできます。これを行うには、ダッシュボードに移動し、新しいカードを作成します 
"Picture Glance"。以下の手順を実行します：
- 希望する"タイトル"を入力します
- "Image Path"からデータを削除します
- "Camera Entity"でカメラを選択します
- "Camera View"で"live"を選択し、遅延が少なくなるようにします

そして保存します。
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## メディアフォルダを確認する

Robonomics Video Service に送信される前に、ビデオをフォルダーに保存する必要があり、Home Assistant がこのフォルダーにアクセスできる必要があります。
この場合、最も簡単なオプションは、Home Assistantがすべてのメディアを保存するメディアパックを使用することです。

- HAOSまたはプリインストールイメージを使用している場合、Home Assistantにはすでにメディアフォルダがあります。
- Home Assistant Coreを使用している場合は、`.homeassistant`フォルダに移動し、その中に`media`フォルダを作成する必要があります。
- Home Assistant Dockerを使用している場合は、Dockerコマンドに` -v /PATH_TO_YOUR_MEDIA:/media \`の行を追加します。

すべてが正しく設定されているかどうかを確認するには、Home Assistantの “Media” -> “local media” タブに移動します。 
空のフォルダ（エラーなし）が表示されるはずです。

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## サービスコール

ビデオをRobonomicsに送信するには、Home Assistantで専用のサービスを呼び出す必要があります。 
この記事では手動で行っていますが、自動化することもできます。

これを行うには、"Developer tools" -> "Services" に移動し、「Robonomics: Save recording to Robonomics」を検索します。

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

"Targets"でカメラエンティティを選択します。
"Path to save the recording"には、Home Assistantがビデオを保存できるフォルダへの絶対パスを指定する必要があります。
プリインストールイメージの場合
- HA OSまたはHome Assistant Dockerの場合 - `/home/homeassistant/.homeassistant/media`;
- Home Assistant Coreの場合-以前に作成したメディアフォルダへのパス。- `/media`;
- さらに、録画の期間を選択することもできます。

データを入力し、「CALL SERVICE」ボタンでサービスを呼び出します。 


## DAPP

結果のビデオを表示するには、[Robonomics DAPP](https://vol4tim.github.io/videostream/)に移動します。

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

コントローラのアカウントアドレスを貼り付け、下のボタンをクリックします。"Search for Twins"プロセスを待ちます
結果として、すべての録画ビデオを含むIPFS CIDが表示されます。 

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

次に、ドロップダウンリストからコントローラアカウント（またはその他のアカウント）を選択し、Web3 IPFSゲートウェイで認証のためのメッセージに署名します。
その結果、スマートホームで録画されたすべてのビデオを取得できます。

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

フォルダ内のすべてのビデオはコントローラキーで暗号化されているため、復号化するためにそれを挿入する必要があります。

<robo-wiki-picture src="home-assistant/video-seed.jpg" />

その後、ビデオの再生ボタンがアクティブになります。クリックしてビデオをダウンロードします。
その後、ビデオ再生ボタンがアクティブになります。 それをクリックしてビデオをダウンロードします。



