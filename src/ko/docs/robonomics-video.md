---
title: Robonomics 비디오 서비스
contributors: [nakata5321]
---

이 기사에서는 IP 카메라를 Home Assistant에 추가하고 비디오를 Robonomics 웹 서비스로 보내는 방법을 보여줍니다.

카메라를 Home Assistant에 연결하려면 해당 카메라의 IP 주소를 알아야하며 RTSP 스트림에 연결하기 위해 로컬 카메라 계정을 만들어야 합니다.

{% roboWikiNote {type: "warning"}%} 각 카메라마다이 프로세스가 다르게 수행되므로이 기사에서는 고려되지 않습니다.
{% endroboWikiNote %}

요구 사항:
- IP 카메라
- 구성된 로컬 카메라 계정
- 카메라의 IP 주소
- 구성된 Home Assistant

{% roboWikiNote {type: "warning"}%} 이 기사는 RTZ(회전, 기울기, 줌) 옵션이없는 일반 IP 카메라를 사용한다고 가정합니다. RTZ 카메라를 사용하는 경우 ["RTZ 카메라" 기사](/docs/ptz-camera)를 확인하십시오. 그런 다음 여기로 돌아와 두 번째 단계를 수행하십시오. {% endroboWikiNote %}

## 카메라 연결

먼저 카메라의 RTSP 스트림을위한 URL을 찾아야합니다.
이를 위해 인터넷에서 다음 쿼리를 입력해보십시오: "<카메라 이름> RTSP 스트림".
스트림 URL은 `rtsp://<IP 주소>...`로 시작해야합니다.

이 기사에서는 "Tapo" 카메라를 사용하며 스트림 경로는 `rtsp://<IP 주소>/stream1`입니다.

Home Assistant를 열고 "설정"-> "장치 및 서비스"로 이동합니다. "ADD INTEGRATION" 버튼을 누르고
"일반 카메라" 통합을 입력하여 선택합니다.

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

구성 창에서 다음 정보를 제공하십시오:
- 스트림 소스 URL - 카메라의 RTSP 스트림 URL
- 사용자 이름 - 로컬 카메라 계정의 사용자 이름 작성
- 비밀번호 - 로컬 카메라 계정의 비밀번호 작성

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

설정을 아래로 스크롤하여 "제출" 버튼을 누릅니다.

미리보기 창에서 "이 이미지가 좋아 보입니다." 확인란을 활성화하고 "제출" 버튼을 누릅니다. 그런 다음 - "완료".

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"} %}"} %}{% endroboWikiPicture %}

### 대시보드에 추가

또한, 스트림을 대시보드에 추가할 수 있습니다. 이를 위해 대시보드로 이동하여 "Picture Glance"라는 새 카드를 만듭니다.
다음 단계:
- 원하는 "제목"을 입력합니다
- "이미지 경로"에서 데이터를 삭제합니다
- "카메라 엔티티"에서 카메라를 선택합니다
- "카메라 보기"에서 "실시간"을 선택하여 지연이 적도록 설정합니다

그리고 저장합니다.
{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}


## 미디어 폴더 확인

로보노믹스 비디오 서비스로 전송되기 전에 비디오를 폴더에 저장해야 하며, Home Assistant가 이 폴더에 액세스해야 합니다.
이 경우 가장 쉬운 옵션은 Home Assistant가 모든 미디어를 저장하는 미디어 팩을 사용하는 것입니다.

- HAOS 또는 사전 설치된 이미지를 사용하는 경우 Home Assistant에는 **이미 미디어 폴더가 있습니다**.
- Home Assistant Core를 사용하는 경우 `.homeassistant` 폴더로 이동하여 그 안에 `media` 폴더를 만들어야 합니다.
- Home Assistant Docker를 사용하는 경우 Docker 명령에 ` -v /PATH_TO_YOUR_MEDIA:/media \` 라인을 추가합니다.

모든 것이 올바르게 설정되었는지 확인하려면 Home Assistant에서 "미디어" -> "로컬 미디어" 탭으로 이동합니다.
빈 폴더(오류 없음)가 표시되어야 합니다:

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## 서비스 호출

비디오를 로보노믹스로 전송하려면 Home Assistant에서 전용 서비스를 호출해야 합니다.
이 기사에서는 이를 수동으로 수행하지만 자동화를 만들 수도 있습니다.

이를 위해 "개발자 도구" -> "서비스"로 이동하여 "Robonomics: Save recording to Robonomics"를 찾습니다.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

"대상"에서 카메라 엔티티를 선택합니다.
"녹화 저장 경로"에는 Home Assistant가 비디오를 저장할 수 있는 폴더의 절대 경로를 제공해야 합니다:
- 사전 설치된 이미지의 경우 - `/home/homeassistant/.homeassistant/media`;
- HA OS 또는 Home Assistant Docker의 경우 - `/media`- Home Assistant Core에 대한 경로 - 이전에 생성된 미디어 폴더의 경로입니다.

또한 녹화 기간을 선택할 수 있습니다.

데이터를 입력하고 "CALL SERVICE" 버튼을 클릭하여 서비스를 호출하십시오.

## DAPP

결과 비디오를 보려면 [Robonomics DAPP](https://vol4tim.github.io/videostream/)로 이동하십시오.

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

컨트롤러의 계정 주소를 붙여넣고 아래 버튼을 클릭하십시오. "Twins 검색" 프로세스를 기다리십시오.
결과적으로 모든 녹화된 비디오와 함께 IPFS CID를 받게 됩니다.

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

다음으로 드롭다운 목록에서 컨트롤러 계정(또는 다른 계정)을 선택하고 Web3 IPFS 게이트웨이에서 권한 부여를 위해 메시지에 서명하십시오.
결과적으로 스마트 홈에서 녹화된 모든 비디오를 다운로드할 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

폴더에 있는 모든 비디오가 컨트롤러 키로 암호화되어 있기 때문에 비디오를 해독하기 위해 키를 입력해야 합니다.
그 후 비디오 재생 버튼이 활성화됩니다. 클릭하여 비디오를 다운로드하십시오.

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}