---
title: 홈 어시스턴트에서 PTZ 카메라 제어
contributors: [nakata5321]
---

이 기사는 홈 어시스턴트에서 PTZ 카메라 설정 과정을 다룹니다. 
ONVIF 프로토콜을 사용합니다. 이를 위해서는 로컬 카메라 계정이 필요합니다.

<robo-wiki-note type="warning">
로컬 카메라 계정 설정 과정은 이 문서에서 다루지 않습니다.
</robo-wiki-note>

요구 사항:
- PTZ 카메라
- 로컬 카메라 계정
- 카메라 IP 주소
- 설정된 홈 어시스턴트

## ONVIF 통합

**ONVIF 통합** 설치로 시작해 봅시다. 

"Settings"에서 "Devices & Services"로 이동하여 "ADD INTEGRATION" 버튼을 누르세요.
"ONVIF"를 입력하고 통합을 선택하세요. 다음 창이 표시됩니다.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

"Submit" 버튼을 누르세요. 카메라를 자동으로 검색하려고 시도합니다. 성공하면, 
목록에서 카메라를 선택하고 빈 필드를 채우세요. 
그렇지 않으면, 모든 필드를 수동으로 채워야 합니다. 다음 창이 표시됩니다.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

빈 칸을 채우세요:
- Name - 카메라에 이름을 지정하세요
- Host - 카메라의 IP 주소를 제공하세요
- Port - 일반적으로 2020년입니다만, 카메라 제조업체에 따라 다를 수 있습니다
- Username - 카메라 로컬 계정의 사용자 이름을 입력하세요
  - Password - 카메라 로컬 계정의 비밀번호를 입력하세요

그리고 "Submit"을 누르세요. 카메라의 위치를 선택하고 "Finish"를 클릭하세요.

## 대시보드에 카메라 제어 추가

카메라를 완전히 설정했으므로, 대시보드에 스트림과 제어 버튼을 추가할 수 있습니다.

대시보드로 이동하여 새 카드를 만드세요. "Picture Glance"를 선택하세요.

 <robo-wiki-picture src="home-assistant/glance.jpg" />

데이터를 입력하세요:
- Title - 카메라 이미지 제목을 선택하세요
- Camera Entity - 드롭다운 목록에서 카메라 엔티티를 선택하세요
- Camera View - 지연 시간을 줄이려면 "live"을 선택하세요

다음으로, 왼쪽 하단의 버튼을 눌러 "코드 편집기" 모드로 전환하세요. 다음 코드가 표시됩니다:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

`entities: []`의 내용을 아래 예시에 따라 바꾸세요 (`<YOUR_CAMERA_ENTITY>`는 `camera_image` 매개변수와 동일합니다):

<code-helper copy>

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

</code-helper>

이것으로 끝입니다. 이제 대시보드에 PTZ 카메라 카드와 제어 버튼이 표시됩니다.

## 문제 해결
만약 Home Assistant Core를 사용하고 카메라에서 스트림을 보지 못하는 경우, "stream" 및 "FFMPEG" 통합을 설치해야 합니다. 
이를 위해 `stream: `과 `ffmpeg: ` 문자열을 configuration.yaml의 끝에 추가해야 합니다.