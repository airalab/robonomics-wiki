---
title: Robonomics Smart Home

contributors: [LoSk-p]
---

スマートホームのRobonomics

![control_panel](../images/home-assistant/not_control_panel.png)

あなたは[notify](https://notify.events/)でスマートフォンに通知を受け取ることができます。まずそこで登録し、`Control Panel`で新しいチャンネルを作成してください。

![channel](../images/home-assistant/not_create_chanell.png)

タイトルを追加して`Save`を押してください。

![source](../images/home-assistant/not_add_source.png)

次に`Add Source`を押して、`IoT and Smart Home`タブで`Home Assistant`を選択してください。 

![source_next](../images/home-assistant/not_add_source_next.png)

タイトルを書いて`Next`を押してください。

![token](../images/home-assistant/not_token.png)

そこにはHome Assistantの設定ファイルに追加する必要のあるトークンが表示されます。どこかに保存して`Done`を押してください。

![subscribe](../images/home-assistant/not_subscribe.png)

次に`Subscribe`を押して購読者を追加してください。

希望する購読者を選択し、指示に従ってください。

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

今度はHome Assistantでコンピュータの設定を編集する必要があります。`homeassistant`ユーザーで`configuration.yaml`ファイルを開いてください。

```yaml
notify_events:
    token: <your token from notify>
```
そして、以下の行を追加してください。
```yaml
- alias: notifications
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: Door was changed to {{ states("binary_sensor.contact_sensor_contact") }}
```
`automation:`の後に新しい自動化を追加してください。

この自動化は、エンティティIDが`binary_sensor.contact_sensor_contact`で状態が`off`から`on`に変わったときにメッセージ`Door was changed to on/off`を送信します。
```bash
systemctl restart home-assistant@homeassistant.service
```