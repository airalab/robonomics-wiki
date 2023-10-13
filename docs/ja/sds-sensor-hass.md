---
title: Home AssistantへのSDS011センサーの追加方法

contributors: [tubleronchik]
---

この記事では、SDS空気品質センサーを[Luftdaten](https://github.com/opendata-stuttgart/sensors-software)＆[Robonomics](https://github.com/airalab/sensors-software)ファームウェアとHome Assistantに接続する方法について説明します。

## Installation 
2のインストールオプションがあります：

### オプション1：HACS

ローカルLuftdatenセンサーを追加する最も簡単な方法は、HACSを介して行うことです。[ここ](https://hacs.xyz/docs/setup/download/)で、HACSのセットアップ方法についての簡単な説明を見つけることができます。

HACSがインストールされたら、HACS->統合に移動し、`Local Luftdaten Sensor`統合を検索します。ダウンロードボタンをクリックし、統合がダウンロードされたらHome Assistantを再起動します。
<robo-wiki-picture src="sds-hacs.png"/>

### オプション2：手動インストール

homeassistantユーザーの下で、プロジェクトリポジトリをクローンします：

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

すでにカスタム統合がある場合は、`custom_components/local_luftdaten/`を`custom_components`ディレクトリにコピーします。例：

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
カスタム統合がない場合は、`custom_components`ディレクトリ全体をHome Assistantの設定ディレクトリにコピーします。例：

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## 設定

`configuration.yaml`に新しいセンサーエントリを作成し、ホスト名またはIPアドレスを調整します。センサーのローカルIPアドレスを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。名前は任意です。

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors

<code-helper copy>

  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Air quality sensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```
</code-helper>

> すべてのサポートされているセンサーのリストは、[リポジトリ](https://github.com/lichtteil/local_luftdaten)で見つけることができます。

Home Assistantを再起動します。
その後、ダッシュボードにセンサーを追加できます。エンティティの名前は、`configuration.yaml`に追加した名前になります。
<robo-wiki-picture src="sds-configuration-card.png"/>