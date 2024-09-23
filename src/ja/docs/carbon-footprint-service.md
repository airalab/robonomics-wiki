---
title: オフセットサービス

contributors: [tubleronchik]
---

作業例は次のビデオにあります：

https://youtu.be/Ha9wN6bjh64

Statemineネットワークでトークンを燃やすことによってCO2排出量をオフセットするサービス。
生成されたCO2は次のように計算されます：Whのデバイスからのデータを地域に応じた係数で乗算します。1トンのCO2は1つのトークンの消費でカバーされます。[こちら](/docs/carbon-footprint-sensor)はデバイスを接続するための手順です。

## シナリオ

1. Robonomicsネットワークのデジタルツインに新しいデバイスを登録する
2. 一定の間隔ですべてのデバイスから最新のデータを取得し、地域に応じた係数で乗算する
3. データを合計し、それらをCO2トンに変換する
4. 現在のデータから燃焼トークンの総数を差し引く
5. Statemineネットワークで整数個のトークンを燃やす
6. 燃焼トークンの総数をローカルDBとDatalogに保存する


## インストール

リポジトリをクローンして、設定ファイルを編集します。

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## 設定の説明

`config/config_template.yaml`を編集しないでください！

```
robonomics:
  seed: <Robonomics Networkのアカウントのシード（デジタルツインが作成される場所）>
statemine:
  seed: <Statemine Networkの緑のトークンを持つ管理アカウントのシード>
  endpoint: <statemineのエンドポイント>
  token_id: <燃やされるトークンのID>
  ss58_format: <Polkadotのアドレスのフォーマット（Statemine Networkの場合は2）>

service:
  interval: <デバイスからデータを収集する頻度>
```
再生可能エネルギーの係数は[Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg)から取得され、`utils/coefficients.py`に保存されています。

## 開始

```
docker-compose up
```