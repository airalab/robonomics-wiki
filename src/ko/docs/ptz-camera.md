---
title: 홈 어시스턴트에서 PTZ 카메라 제어
contributors: [nakata5321]
---

이 문서는 홈 어시스턴트에서 PTZ 카메라 설정하는 과정을 다룹니다.
ONVIF 프로토콜을 사용할 것입니다. 이를 위해서는 로컬 카메라 계정이 필요합니다.

{% roboWikiNote {title:"test", type: "warning"}%} 이 문서에서는 로컬 카메라 계정 설정 과정을 다루지 않습니다.
{% endroboWikiNote %}


요구 사항:
- PTZ 카메라
- 로컬 카메라 계정
- 카메라 IP 주소
- 구성된 홈 어시스턴트

## ONVIF 통합

먼저 **ONVIF 통합** 설치부터 시작해봅시다.

"설정"에서 "장치 및 서비스"로 이동하여 "통합 추가" 버튼을 누릅니다.
"ONVIF"를 입력하고 해당 통합을 선택합니다. 다음 창이 표시됩니다.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

"제출" 버튼을 누릅니다. 자동으로 카메라를 검색하려고 시도합니다. 성공하면,
목록에서 카메라를 선택하고 빈 필드를 채웁니다.
그렇지 않으면 모든 필드를 수동으로 채워야 합니다. 다음 창이 표시됩니다.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

빈 칸을 채워주세요:
- 이름 - 카메라에 이름을 지정합니다.
- 호스트 - 카메라의 IP 주소를 제공합니다.
- 포트 - 대부분 2020이 일반적이지만, 카메라 제공업체에 따라 다를 수 있습니다.
- 사용자 이름 - 카메라 로컬 계정의 사용자 이름을 작성합니다.
  - 비밀번호 - 카메라 로컬 계정의 비밀번호를 작성합니다.

그리고 "제출"을 누릅니다. 카메라의 위치를 선택하고 "완료"를 클릭합니다.

## 대시보드에 카메라 제어 추가

이제 카메라를 완전히 설정했으므로, 해당 스트림과 제어 버튼을 대시보드에 추가할 수 있습니다.

대시보드로 이동하여 새 카드를 만들어 시작합니다. "사진 미리보기"를 선택합니다.

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

다음 데이터를 입력합니다:
- 제목 - 카메라 이미지 제목 선택
- 카메라 엔티티 - 드롭다운 목록에서 카메라 엔티티 선택
- 카메라 보기 - 지연 시간을 줄이기 위해 "실시간" 선택

다음으로, 왼쪽 하단의 버튼을 눌러 "코드 편집기" 모드로 전환합니다. 다음 코드가 표시됩니다:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

`entities: []` 내용을 아래 예시에 따라 교체합니다 (`<YOUR_CAMERA_ENTITY>`는 `camera_image` 매개변수와 동일합니다):

{% codeHelper { copy: true}%}

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

{% endcodeHelper %}

이제 대시보드에 PTZ 카메라 카드와 제어 버튼이 표시됩니다.

## 문제 해결
홈 어시스턴트 코어를 사용하고 카메라에서 스트림이 표시되지 않는 경우, "stream" 및 "FFMPEG" 통합을 설치해야 합니다.
이를 위해 configuration.yaml의 끝에 `stream: ` 및 `ffmpeg: ` 문자열을 추가해야 합니다.