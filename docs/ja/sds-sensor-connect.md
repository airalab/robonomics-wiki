---
title: SDS011センサーの接続方法

contributors: [tubleronchik]
---

** 以下は、Robonomicsセンサーネットワークにセンサーを接続する手順のガイドです。当社のセンサーは、sensor.communityファームウェアの拡張バージョンであるRobonomicsファームウェアを使用しています。追加のセンサーが含れており、データ送信メカニズムが変更されています。 **

1. センサーをソケットに差し込んで電源を入れます。
2. ボードは`RobonomicsSensor-xxxxxxxxx`という名前のWi-Fiネットワークを作成します。携帯電話やコンピュータからそれに接続してください：認証ウィンドウが表示されます（表示されない場合は、ブラウザを開き、`192.168.4.1`にアクセスしてください）。
3. リストからWi-Fiネットワークを選択します（リストにない場合は自分で入力してください）そしてパスワード欄を入力します。
<robo-wiki-note type="okay" title="INFO">
センサーは 2.4GHz Wi-Fi ネットワークにのみ接続できます。
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. センサーを設置する場所の座標を入力します。地図から取得するか、[このリンク](https://www.latlong.net/convert-address-to-lat-long.html)を使用して住所から取得できます。
<robo-wiki-note type="warning" title="WARNING">
センサーの座標は公開されている地図に表示されます。個人情報を表示したくない場合は、近いが正確でない座標を入力してください。
</robo-wiki-note> 
5. `Save configuration and restart`をクリックします。ボードが再起動し、指定したWi-Fiネットワークに接続されます。
6. [Robonomicsセンサーマップ](https://sensors.robonomics.network/#/)を開き、センサーを設置した場所を見けます。数分後に、地図上でデータ付きのセンサーを表示できるようになります。
<robo-wiki-picture src="sds-sensor-map.png"/>

