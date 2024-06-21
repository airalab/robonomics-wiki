---
title: バックアップサービス

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-オフセットサービスtegration
---

**この記事では、Home Assistantの設定をバックアップし、必要な場合に復元する方法について説明します。バックアップを作成するためには、設定ファイルを含む安全なアーカイブを生成するサービスが呼び出されます。またサービスはMosquittoブローカーとZigbee2MQTTの設定をバックアップに追加します（存在する場合）。このサービスはアーカイブをIPFSに追加し、結果のCIDをRobonomics Digital Twinに保存します。**
## Home Assistantの設定のバックアップを作成する

バックアップを作成することで、障害が発生した場合に簡単にHome Assistantの設定を復元することができます。

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="警告">

設定のバックアップと復元を行うには、 **カスタムのIPFSゲートウェイ** （Pinataなど）を使用する必要があります。これがない場合、バックアップはローカルのIPFSノードにのみ保存されるため、ローカルノードの障害が発生した場合にHome Assistantの設定を復元することができなくなる可能性があります。

</robo-wiki-note>

1. Home AssistantのWebインターフェースに移動し、 `Developer Tools` -> `Services`. 検索して `Robonomics: Save Backup to Robonomics` を押します。 `CALL SERVICE`.

2. 通知が表示されるまで待ちます。 `Backup was updated in Robonomics` 警告 `Notification`.

<robo-wiki-note type="warning" title="警告">

Home Assistant と Robonomics Integration をロードした直後に、バックアップを作成したり、設定を復元しようとしないでください。 初期セットアップが完了するまで、**約 5 分間お待ちください**。

</robo-wiki-note>

サービスの引数：
- **Mosquittoパスワードファイルへのパス**  (default: False) - Home Assistant CoreまたはDockerのインストール方法を使用し、デフォルトのMosquittoブローカーのパスがない場合は、このパラメータを変更する必要があります。
- **Home Assistant OSまたはSuperviserでは必要ありません。** (default: `/etc/mosquitto`) - バックアップからHome Assistantの設定を復元する *設定を復元するには、インストールされたHome AssistantとRobonomics Integrationが必要です。*.

## ホームアシスタント設定をバックアップから復元する

構成を復元するには、ホーム アシスタントとロボノミクス統合がインストールされている必要があります。 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="警告">

Home Assistant Core および Docker のインストール方法で構成を正常に復元するには、ページの最後に説明されている追加のセットアップ手順を実行する必要があります。

</robo-wiki-note>

1. ホーム アシスタントと Robonomics 統合をインストールします (まだインストールされていない場合) [希望の取り付け方法](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2.  以前のロボノミクス構成で使用した **同じシード** を使用して、[ロボノミクス統合をセットアップ](https://wiki.robonomics.network/docs/robonomics-hass-integration)します。 サブスクリプションが終了した場合は、[再アクティブ化](https://wiki.robonomics.network/docs/sub-activate)してください。

3. ホーム アシスタントの Web インターフェイスで、Developer Tools` -> `Services` に移動します。 `「Robonomics: Restore from the Backup in Robonomics` を検索し、`「CALL SERVICE」` を押します。 `「概要」` ページに移動して、バックアップのステータスを確認します。

4. 復元後、ホーム アシスタントが自動的に再起動します。 何らかの理由で Home Assistant が再起動しない場合は、`robonomics.backup` エンティティの状態を監視することで復元ステータスを確認できます。 ステータスが `restored` の場合は、`Settings` > `System` に移動し、右上隅にある `RESTART` ボタンをクリックして、Home Assistant を手動で再起動する必要があります。

5. バックアップに Zigbee2MQTT または Mosquitto 構成が含まれている場合は、これらのサービスを再起動して新しい構成を有効にする必要があります。 これは、サービスを個別に再起動して手動で行うことも、ホーム アシスタント コンピュータを再起動してすべてのサービスを確実に再起動することもできます。

サービス引数:
- **mosquitto パスワード ファイルへのパス** (default: `/etc/mosquitto`) - Home Assistant Core または Docker インストール方法を使用し、Mosquitto ブロッカーへのデフォルトのパスがない場合は、このパラメータを変更する必要があります。 *ホーム アシスタント OS またはスーパーバイザーには必要ありません*。
- **Zigbee2MQTT 構成へのパス**  (default: `/opt/zigbee2mqtt`) - Home Assistant Core または Docker インストール方法を使用し、Zigbee2MQTT へのデフォルトのパスがない場合は、このパラメータを変更する必要があります。 *ホーム アシスタント OS またはスーパーバイザーには必要ありません*。

## Home Assistant Core インストール用の Mosquitto および Zigbee2MQTT 構成を復元する方法

バックアップに Mosquitto または Zigbee2MQTT の構成が含まれている場合、復元プロセス中にそれらはデフォルトのパスまたは引数で指定されたパスに配置されます。 ただし、既存の Home Assistant Core *(プリインストールされた Robonomics イメージからではなく)* に Robonomics 統合をインストールした場合、`「homeassistant` ユーザーはこのパスにアクセスできない可能性があります。

したがって、Mosquitto と Zigbee2MQTT の設定を復元するには、必要な読み取り権限をユーザー `homeassistant` に付与する必要があります。
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Home Assistant Docker インストール方法用のバックアップ Mosquitto および Zigbee2MQTT 構成

Mosquitto および Zigbee2MQTT 構成を Docker コンテナーからバックアップするには、それぞれの構成にボリュームを作成する必要があります。 これは、追加の引数を指定して Home Assistant コンテナを実行することで実現できます。

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

または、変更を加える `compose.yaml` ファイル：

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

なお、MosquittoとZigbee2MQTTのデフォルトのパスは `/etc/mosquitto` と `/opt/zigbee2mqtt`, です。ただし、これらのパスは特定のセットアップによって異なる場合があります。

</robo-wiki-note>

## バックアップボタン

バックアップを行うためのサービスを使用するだけでなく、Robonomics統合のボタンを使用することでプロセスを簡素化することができます。これらのボタンは、デフォルトのパラメータ（バックアップボタンは履歴なしでバックアップを作成）で対応するサービスを呼び出します。 `button.create_backup` と `button.restore_from_backup` ダッシュボードにボタンを追加するには、次の手順に従ってください。

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

1. ダッシュボードの右上隅にある3つの点をクリックします。
2. 選択します `Edit Dashboard`.
3. 右下隅にある `Add Card` ボタンをクリックします。
4. `Entities` カードを選択します。
5. `Entities` フィールドで、button.create_backup エンティティと button.restore_from_backup エンティティを検索します。
6. `Save` を押してエンティティをカードに追加します。
7. 右上隅の `Done` ボタンをクリックして編集を終了します。