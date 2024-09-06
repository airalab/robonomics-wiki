---
title: バックアップサービス

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**この記事では、Home Assistant構成のバックアップを生成し、必要に応じて復元する方法を学びます。バックアップを作成するためには、構成ファイルを含む安全なアーカイブを生成するサービスが呼び出されます。また、サービスは存在する場合、MosquittoブローカーとZigbee2MQTT構成をバックアップに追加します。このサービスはその後、アーカイブをIPFSに追加し、結果のCIDをRobonomics Digital Twinに保存します。**
## Home Assistant構成のバックアップの作成

バックアップを作成することで、障害が発生した場合に簡単にHome Assistant構成を復元できます。

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "警告"}%}構成のバックアップと復元を行うには、Pinataなどの**カスタムIPFSゲートウェイ**を使用する必要があります。これを行わないと、バックアップはローカルIPFSノードにのみ保存され、ローカルノードの障害が発生した場合にHome Assistant構成を復元できなくなる可能性があります。
{% endroboWikiNote %}

1. Home AssistantのWebインターフェースで `Developer Tools` -> `Services` に移動します。 `Robonomics: Save Backup to Robonomics` を検索し、 `CALL SERVICE` を押します。

2. `Notification` に `Backup was updated in Robonomics` という通知が表示されるまで待ちます。


{% roboWikiNote {type: "warning", title: "警告"}%} Home AssistantとRobonomics Integrationを読み込んだ直後にバックアップを作成したり構成を復元しようとしないでください。初期設定が完了するのを待つために、**約5分間**待ってください。 {% endroboWikiNote %}

サービス引数:
- **フルバックアップ**（デフォルト：False） - データベースをバックアップに追加し、エンティティの状態の履歴も保存されます。
- **Mosquittoパスワードファイルへのパス**（デフォルト：`/etc/mosquitto`) - Home Assistant CoreやDockerインストール方法を使用しており、Mosquittoブローカーのデフォルトパスがない場合は、このパラメータを変更する必要があります。*Home Assistant OSやSuperviserの場合は必要ありません*。

## バックアップからHome Assistantの構成を復元する

構成を復元するには、インストールされたHome AssistantとRobonomics Integrationが必要です。

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Home Assistant CoreやDockerインストール方法での構成の正常な復元を確実にするには、ページの最後に記載されている追加のセットアップ手順を実行する必要があります。
{% endroboWikiNote %}

1. [希望のインストール方法](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home)の記事に従って、Robonomics Integrationを備えたHome Assisntantをインストールします（まだインストールされていない場合）。

2. [前回のRobonomics構成で使用した**同じシード**](https://wiki.robonomics.network/docs/robonomics-hass-integration)を使用してRobonomics Integrationを設定します。サブスクリプションが終了している場合は、[再アクティブ化](https://wiki.robonomics.network/docs/sub-activate)してください。

3. Home AssistantのWebインターフェースで `Developer Tools` -> `Services` に移動します。 `Robonomics: Restore from the Backup in Robonomics` を検索し、 `CALL SERVICE` を押します。バックアップの状態を確認するために `Overview` ページに移動します。

4. 復元後、Home Assistantは自動的に再起動します。何らかの理由でHome Assistantが再起動しない場合は、 `robonomics.backup` エンティティの状態を監視して復元の状態を確認できます。状態が `restored` の場合は、 `Settings` > `System` に移動し、右上隅にある `RESTART` ボタンをクリックしてHome Assistantを手動で再起動する必要があります。

5. バックアップにZigbee2MQTTやMosquittoの構成が含まれている場合、新しい構成を有効にするためにこれらのサービスを再起動する必要があります。これは以下のように行います。サービスを個別に再起動することもできますが、Home Assistantコンピュータ全体を再起動してすべてのサービスを再起動することもできます。

サービスの引数:
- **Mosquittoパスワードファイルへのパス**（デフォルト：`/etc/mosquitto`）- Home Assistant CoreまたはDockerインストール方法を使用し、Mosquittoブローカーのデフォルトパスでない場合は、このパラメータを変更する必要があります。*Home Assistant OSまたはSuperviserの場合は不要です*。
- **Zigbee2MQTT構成へのパス**（デフォルト：`/opt/zigbee2mqtt`）- Home Assistant CoreまたはDockerインストール方法を使用し、Zigbee2MQTTのデフォルトパスでない場合は、このパラメータを変更する必要があります。*Home Assistant OSまたはSuperviserの場合は不要です*。

## Home Assistant Coreインストール方法のMosquittoとZigbee2MQTT構成の復元

バックアップにMosquittoやZigbee2MQTTの構成が含まれている場合、復元プロセス中にそれらはデフォルトパスまたは引数で指定されたパスに配置されます。ただし、既存のHome Assistant CoreにRobonomics統合をインストールした場合（*Robonomicsイメージからではない*）、`homeassistant`ユーザーはこのパスにアクセスできない可能性があります。

したがって、MosquittoとZigbee2MQTTの構成を復元するには、ユーザー`homeassistant`に必要な読み取り権限を付与する必要があります:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Home Assistant Dockerインストール方法のMosquittoとZigbee2MQTT構成のバックアップ

DockerコンテナからMosquittoとZigbee2MQTTの構成をバックアップするには、それぞれの構成のためのボリュームを作成する必要があります。これは、Home Assistantコンテナを追加の引数で実行することで実現できます:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

または`compose.yaml`ファイルを変更することもできます:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"Note"}%}MosquittoとZigbee2MQTTのデフォルトパスはそれぞれ`/etc/mosquitto`と`/opt/zigbee2mqtt`です。ただし、これらのパスは特定のセットアップによって異なる場合があります。
{% endroboWikiNote %}

## バックアップボタン

バックアップを作成するためにサービスを使用するだけでなく、Robonomics統合から`button.create_backup`および`button.restore_from_backup`ボタンを使用することで、プロセスを簡素化できます。これらのボタンは、デフォルトパラメータ（バックアップボタンは履歴なしでバックアップを作成）で対応するサービスを呼び出します。

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

ダッシュボードにボタンを追加するには、次の手順に従ってください：

1. ダッシュボードの右上隅にある3つの点をクリックします。
2. `ダッシュボードを編集`を選択します。
3. 右下隅にある`カードを追加`ボタンをクリックします。
4. `Entities`カードを選択します。
5. `Entities`フィールドで、`button.create_backup`および`button.restore_from_backup`エンティティを検索します。
6. エンティティをカードに追加するために`保存`を押します。
7. 右上隅にある`完了`ボタンをクリックして編集を終了します。