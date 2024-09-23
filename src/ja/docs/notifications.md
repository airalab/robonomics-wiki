---

title: Robonomics Smart Home

contributors: [LoSk-p]

---

スマートフォンで通知を受け取ることができます。[notify](https://notify.events/)にアクセスして登録し、`Control Panel`で新しいチャンネルを作成してください：

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

タイトルを追加して`Save`ボタンを押してください：

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

次に`Add Source`を押し、`IoT and Smart Home`タブで`Home Assistant`を選択してください：

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

タイトルを入力し、`Next`ボタンを押してください：

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

そこにはHome Assistantの構成ファイルに追加するトークンが表示されます。どこかに保存して`Done`ボタンを押してください：

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

次に`Subscribe`を押して購読者を追加してください：

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

希望する購読者を選択し、指示に従ってください。

次に、コンピューターでHome Assistantの構成を編集する必要があります。`homeassistant`ユーザーで`configuration.yaml`ファイルを開いてください：

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

そして、以下の行を追加してください：


```yaml
notify_events:
    token: <notifyから取得したトークン>
```
`automation:`の後に新しい自動化を追加してください：

{% codeHelper { copy: true}%}

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
      message: ドアが{{ '{{states("binary_sensor.contact_sensor_contact")}}' }}に変更されました
```

{% endcodeHelper %}

この自動化は、エンティティIDが`binary_sensor.contact_sensor_contact`のセンサーが`off`から`on`に変更された後に`ドアがon/offに変更されました`というメッセージを送信します。

そして、Home Assistantを再起動してください：
```bash
systemctl restart home-assistant@homeassistant.service
```