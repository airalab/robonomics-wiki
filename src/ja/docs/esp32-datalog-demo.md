---
title: ESP32からExtrinsicを送信する方法

contributors: [LoSk-p]
---

[robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp)を使用してESP32でRobonomics NetworkにDatalog extrinsicを送信します。デモのコードは[こちら](https://github.com/LoSk-p/esp32-datalog-demo)で見つけることができます。

### 必要なもの

* Platformio core（[インストール手順](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)）。
* お使いのOS用の任意のシリアルクライアント（Linuxの場合は`tio`など）。以下のコマンドで`tio`をインストールできます
```bash
sudo apt install tio
```
### インストール
リポジトリをクローンします：
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### 設定
`src`フォルダに`Private.h`ファイルを作成し、以下の内容を記述します：
```
#pragma once

// ダミーの値の代わりに実際のキーとアドレスを設定します
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
そして、RobonomicsアカウントとWiFiネットワークに関する情報を記入します。`PRIV_KEY`はRobonomicsアカウントの秘密鍵であり、`SS58_ADR`はそのアドレスです。

{% roboWikiNote {type: "warning"}%} このデモはED25519アカウントのみで動作します！
{% endroboWikiNote %}

アカウントのシードフレーズから秘密鍵を取得するには、[get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py)スクリプトを使用できます。スクリプトを実行して指示に従ってください：
```bash
python3 get-private-key.py
```

### アップロード
USBケーブルを使用してESP32をコンピュータに接続し、プロジェクトをビルドします：
```bash
cd esp32-datalog-demo
platformio run -t upload
```
このコマンドはESP用のバイナリファイルをビルドしてアップロードします。最終的に以下のように表示されます
```
Writing at 0x000b9def... (84 %)
Writing at 0x000bf4c2... (87 %)
Writing at 0x000c56bf... (90 %)
Writing at 0x000cc6df... (93 %)
Writing at 0x000d1dec... (96 %)
Writing at 0x000d71b0... (100 %)
Wrote 836160 bytes (538555 compressed) at 0x00010000 in 12.2 seconds (effective 548.7 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
=========================== [SUCCESS] Took 24.08 seconds ===========================
```

### 実行

アップロード後にESPをコンピュータに再接続し、シリアルクライアントを実行します（この例ではポート`/dev/ttyACM0`を使用したtio）：
```bash
tio /dev/ttyACM0
```
そして、Datalogレコードextrinsicのテキストを入力します。

前のセクションで`platformio run -t upload`コマンドを実行した後、ログでポートを確認できます。次のようなものを探してください：
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```