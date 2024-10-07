---

title: Robonomics Smart Home

contributors: [LoSk-p]

---

[notify](https://notify.events/)를 통해 스마트폰으로 알림을 받을 수 있습니다. 먼저 거기에 등록하고 `Control Panel`에서 새 채널을 만드세요:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

제목을 추가하고 `Save`를 누르세요:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

그런 다음 `Add Source`를 누르고 `IoT and Smart Home` 탭에서 `Home Assistant`를 선택하세요:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

제목을 작성하고 `Next`를 누르세요:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

여기에는 Home Assistant 구성 파일에 추가해야 하는 토큰이 표시됩니다. 어딘가에 저장하고 `Done`을 누르세요:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

그런 다음 구독자를 추가하려면 `Subscribe`를 누르세요:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

원하는 구독자를 선택하고 지시 사항을 따르세요.

이제 컴퓨터에서 Home Assistant의 구성을 편집해야 합니다. `homeassistant` 사용자로 `configuration.yaml` 파일을 열어보세요:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

다음 라인을 추가하세요:


```yaml
notify_events:
    token: <notify에서 받은 토큰>
```
`automation:` 라인 다음에 새 자동화를 추가하세요:

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
      message: 문이 {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}로 변경되었습니다.
```

{% endcodeHelper %}

이 자동화는 `binary_sensor.contact_sensor_contact` 엔티티 ID를 가진 센서가 `off`에서 `on`으로 상태가 변경될 때 `문이 on/off으로 변경되었습니다.` 메시지를 보냅니다.

그리고 Home Assistant를 다시 시작하세요:
```bash
systemctl restart home-assistant@homeassistant.service
```