---
title: Altruist と sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist はオープンソースの環境センサーです。計測値はオープンなデータセットに入り、誰でも [sensors.social](https://sensors.social) で見ることができます。

## センサー

- 屋外版 (Urban)、屋内版 (Insight)、組み立てキットがあります。
- センサーはすべての計測値に署名するため、途中で値を改ざんすることはできません。
- 計測値は Wi-Fi で送れます。Wi-Fi がない場所では、LoRa 無線や Meshtastic のメッシュネットワークも使えます。
- 所有者は計測値を暗号化することもできます。その場合、sensors.social で値を見られるのは、自分の鍵を持つ所有者だけです。

Altruist センサーは Pinout Limited が製造しています。[cyberpunks.shop](https://cyberpunks.shop/) と EU の Amazon で購入できます。設定とサポートについては、そこの製品ページと [pinout.cloud](https://pinout.cloud) をご覧ください。

## sensors.social

[sensors.social](https://sensors.social) は、独立した大気質センサーのマップです。100 台以上のセンサーの計測値を表示しており、プロジェクトのニュースを載せる独自のブログもあります。

ローカルネットワーク上の Home Assistant でセンサーを使うには、[Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) があります。

## ソースコード

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): ファームウェア。
- [airalab/webflasher](https://github.com/airalab/webflasher): ブラウザからファームウェアを書き込むツール。
- [airalab/sensors.social](https://github.com/airalab/sensors.social): マップ。
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): 計測値を集めるサービス。
