---
title: オフセットサービス

contributors: [tubleronchik]
---

作業例はビデオにあります:

https://youtu.be/Ha9wN6bjh64

Statemine ネットワークでトークンを燃やすことで CO2 排出量を相殺するサービス。
生成される CO2 は次のように計算されます。Wh 単位のデバイスからのデータに地域に応じた係数を掛けます。 1 トンの C02 が 1 トークンの消費でカバーされます [ここ](/docs/carbon-footprint-sensor) デバイスの接続手順です。

## シナリオ

1. ロボノミクスネットワークのデジタルツインに新しいデバイスを登録する
2. 一定間隔で 1 回、すべてのデバイスから最後のデータを取得し、地域に応じた係数を乗算します。
3. データを合計し、CO2 トンに変換します
4. 現在のデータから書き込み中のトークンの総数を減算します。
5. Statemine ネットワークで整数のトークンを書き込みます
6. ローカル DB とデータログに保存された書き込みトークンの総数 

## インストール中

リポジトリのクローンを作成し、構成ファイルを編集します。

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## 構成の説明

編集しないでください `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network wでご確認いただけます。 Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
非再生可能エネルギーの係数は、Eurostatから取得され、保存されています [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) および保存されています `utils/coefficients.py`. 

## 打ち上げ

```
docker-compose up
```