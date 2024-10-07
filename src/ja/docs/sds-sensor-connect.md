---
title: SDS011センサーの接続方法

contributors: [tubleronchik]
---

**ここでは、センサーをRobonomics Sensors NetworkとHome Assistantに接続する手順を紹介します。当社のセンサーは、sensor.communityファームウェアの拡張バージョンであるRobonomicsファームウェアを使用しています。追加のセンサーが含まれており、データ送信メカニズムが変更されています。**

{% roboWikiNote {type: "warning"}%} Robonomicsのすべてのデバイスは公式ウェブサイト（https://robonomics.network/devices/）で購入できます。
{% endroboWikiNote %}


## セットアップ

1. センサーを電源に差し込みます。
2. ボードは`RobonomicsSensor-xxxxxxxxx`というWi-Fiネットワークを作成します。携帯電話やコンピューターからそれに接続します。認証ウィンドウが表示されます（表示されない場合は、ブラウザを開いて`192.168.4.1`に移動します）。
3. リストからWi-Fiネットワークを選択します（リストにない場合は自分で入力します）。
{% roboWikiNote {type: "warning", title: "INFO"}%} センサーは2.4GHzのWi-Fiネットワークにのみ接続できます。 {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. センサーを設置する場所の座標を記入します。地図から取得するか、[このリンク](https://www.latlong.net/convert-address-to-lat-long.html)を使用して住所から取得できます。
{% roboWikiNote {type: "warning", title: "WARNING"}%} センサーの座標は公開される地図に表示されます。個人情報を表示したくない場合は、近似したが正確でない座標を記入してください。
{% endroboWikiNote %}
5. `設定を保存して再起動`をクリックします。ボードが再起動し、指定したWi-Fiネットワークに接続されます。
6. [Robonomicsセンサーマップ](https://sensors.robonomics.network/#/)を開き、センサーを設置した場所を見つけます。数分後に、地図上でデータ付きのセンサーが表示されます。
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}ensor-map"} %}{% endroboWikiPicture %}

## ホームアシスタント

利用可能なインストールオプションは2つあります：

### オプション1：HACS

ローカルルフトデータセンサーを追加する最も簡単な方法は、HACSを介して行うことです。[こちら](https://hacs.xyz/docs/setup/download/)で、HACSのセットアップ方法について簡単な説明が見つかります。

HACSをインストールしたら、HACS -> インテグレーションに移動し、`Local Luftdaten Sensor`インテグレーションを検索します。ダウンロードボタンをクリックして、インテグレーションがダウンロードされたら、Home Assistantを再起動します。
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### オプション2：手動インストール

`homeassistant`ユーザーの下で、プロジェクトリポジトリをクローンします：

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

</code-helper>

すでにカスタムインテグレーションがある場合は、`custom_components/local_luftdaten/`を`custom_components`ディレクトリにコピーします。例：

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

カスタムインテグレーションがない場合は、`custom_components`ディレクトリ全体をHome Assistantの構成ディレクトリにコピーします。例：

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## 設定

`configuration.yaml`に新しいセンサーエントリを作成し、ホスト名またはIPアドレスを調整します。センサーのローカルIPアドレスを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。名前は任意です。

|パラメーター          |タイプ   | 必須        | 説明
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | 必須        | センサーのIPアドレス
|`scan_interval`        | number | デフォルト: 180 | 更新間隔（秒単位）
|`name`                 | string | 必須        || センサーの名前
|`monitored_conditions` | リスト   | 必須     | 監視されるセンサーのリスト


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: 大気品質センサー
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> サポートされているすべてのセンサーのリストは[リポジトリ](https://github.com/lichtteil/local_luftdaten)で見つけることができます。

Home Assistantを再起動してください。
その後、ダッシュボードにセンサーを追加できます。エンティティの名前は、`configuration.yaml`に追加した名前になります。

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}