---
title: 로보노믹스 스마트 홈

contributors: [LoSk-p]
---

스마트폰으로 알림을 받을 수 있습니다. [notify](https://notify.events/)를 사용하세요. 먼저 거기에 등록하고 `Control Panel`에서 새로운 채널을 생성하세요:

![control_panel](../images/home-assistant/not_control_panel.png)

제목을 추가하고 `Save`을 누르세요:

![channel](../images/home-assistant/not_create_chanell.png)

그런 다음 `Add Source`를 누르고 `IoT and Smart Home` 탭에서 `Home Assistant`를 선택하세요:

![source](../images/home-assistant/not_add_source.png)

제목을 작성하고 `Next`을 누르세요:

![source_next](../images/home-assistant/not_add_source_next.png)

여기에서 홈 어시스턴트 구성 파일에 추가해야하는 토큰을 볼 수 있습니다. 어딘가에 저장하고 `Done`를 누르세요:

![token](../images/home-assistant/not_token.png)

그런 다음 구독자를 추가하려면 `Subscribe`을 누르세요:

![subscribe](../images/home-assistant/not_subscribe.png)

원하는 구독자를 선택하고 지침을 따르세요.

이제 홈 어시스턴트에서 컴퓨터의 구성을 편집해야합니다. `homeassistant` 사용자가 `configuration.yaml` 파일을 엽니다:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

다음 줄을 추가하세요:

```yaml
notify_events:
    token: <your token from notify>
```
`automation:` 라인 다음에 새로운 자동화를 추가하세요:
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
이 자동화는 `binary_sensor.contact_sensor_contact`의 상태가 `off`에서 `on`으로 변경될 때 메시지 `Door was changed to on/off`를 보냅니다.

그리고 홈 어시스턴트를 다시 시작하세요:
```bash
systemctl restart home-assistant@homeassistant.service
```