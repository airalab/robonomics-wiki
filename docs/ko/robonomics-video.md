---
title: Robonomics 비디오 서비스
contributors: [nakata5321]
---

이 문서에서는 IP 카메라를 Home Assistant에 추가하고 Robonomics 웹 서비스로 비디오를 보내는 방법을 보여줍니다.

Home Assistant에 카메라를 연결하려면 해당 카메라의 IP 주소를 알아야하며 RTSP 스트림에 연결하기 위해 로컬 카메라 계정을 생성해야합니다.

<robo-wiki-note type="warning">
각 카메라마다이 작업이 다르게 수행되므로이 프로세스는이 문서에서 고려되지 않습니다.
</robo-wiki-note>

요구 사항:
- IP 카메라
- 구성된 로컬 카메라 계정
- 카메라의 IP 주소
- 설정된 홈 어시스턴트

<robo-wiki-note type="note">

이 문서는 RTZ (회전, 기울기, 확대) 옵션이없는 일반 IP 카메라를 가정합니다. 
RTZ 카메라가있는 경우 ["RTZ 카메라"문서](/docs/ptz-camera)를 확인하십시오. 그런 다음 여기에서 두 번째 단계로 돌아갑니다.

</robo-wiki-note>

## 카메라 연결

먼저 카메라의 RTSP 스트림에 대한 URL을 찾아야 합니다.
이를 위해 다음 쿼리를 인터넷에 입력해보십시오: "<카메라 이름> RTSP 스트림".
스트림 URL은 `rtsp://<IP_주소>...`로 시작해야합니다. 

이 문서에서는 "Tapo" 카메라를 사용하고 스트림 경로는 `rtsp://<IP_주소>/stream1`입니다.

Home Assistant를 열고 "Settings"-> "Devices & Services"로 이동하십시오. "ADD INTEGRATION" 버튼을 누르고
"Generic Camera"통합을 입력하십시오.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

구성 창에서 다음 정보를 제공하십시오:
- Stream Source URL - 카메라의 RTSP 스트림 URL
- Username - 로컬 카메라 계정의 사용자 이름 작성
- Password - 로컬 카메라 계정의 비밀번호 작성

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

설정을 아래로 스크롤하고 "Submit"버튼을 누릅니다.

미리보기 창에서 "This image looks good." 확인란을 활성화하고 "Submit"버튼을 누릅니다. 그런 다음 - "Finish".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### 대시 보드에 추가

또한 스트림을 대시 보드에 추가 할 수 있습니다. 이를 위해 대시 보드로 이동하여 새 카드를 만듭니다 
"Picture Glance". 추가 단계:
- 원하는 "Title"을 입력하십시오
- "Image Path"에서 데이터 삭제
- "Camera Entity"에서 카메라를 선택하십시오.
- "Camera View"에서 지연이 적도록 "live"을 선택하십시오

그리고 저장하십시오.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## 미디어 폴더 확인

Robonomics Video Service로 전송되기 전에 비디오는 폴더에 저장되어야 하며 홈어시스턴트가 이 폴더에 접근할 수 있어야 합니다.
이 경우 가장 쉬운 옵션은 Home Assistant가 모든 미디어를 저장하는 미디어 팩을 사용하는 것입니다.

- HAOS 또는 사전 설치된 이미지를 사용하는 경우 Home Assistant에는 이미 미디어 폴더가 있습니다.
- Home Assistant Core를 사용하는 경우 `.homeassistant` 폴더로 이동하고 그 안에 `media` 폴더를 생성해야합니다.
- Home Assistant Docker를 사용하는 경우 Docker 명령에 ` -v /PATH_TO_YOUR_MEDIA:/media \` 줄을 추가하십시오.

모든 것이 올바르게 설정되었는지 확인하려면 Home Assistant에서 “Media” -> “local media” 탭으로 이동하십시오. 
빈 폴더 (오류 없음)가 표시되어야합니다:

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## 서비스 호출

Robonomics에 비디오를 보내려면 Home Assistant에서 전용 서비스를 호출해야합니다. 
이 문서에서는이 작업을 수동으로 수행하지만 자동화를 만들 수 있습니다.

이를 위해 "Developer tools" -> "Services"로 이동하여  "Robonomics: Save recording to Robonomics"을 찾으십시오.

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

"Targets"에서 카메라 엔티티를 선택하십시오.
"Path to save the recording"에서 폴더의 절대 경로를 제공해야 합니다.
홈어시스턴트가 비디오를 저장할 수 있는 위치:
- 사전 설치된 이미지의 경우 - `/home/homeassistant/.homeassistant/media`;
- HA OS 또는 Home Assistant Docker의 경우- `/media`;
- Home Assistant Core의 경우 - 이전에 생성된 미디어 폴더의 경로입니다.

또한 녹화 기간을 선택할 수 있습니다.

데이터를 입력하고 "CALL SERVICE" 버튼을 눌러 서비스를 호출하세요.

## DAPP

결과 비디오를 보려면 [Robonomics DAPP](https://vol4tim.github.io/videostream/)로 이동하십시오. 

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

컨트롤러의 계정 주소를 붙여넣고 아래 버튼을 클릭하세요. "Search for Twins" 과정을 기다립니다.
결과적으로 녹화된 모든 비디오와 함께 IPFS CID를 받게 됩니다.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

다음으로, 드롭다운 목록에서 컨트롤러 계정(또는 기타 계정)을 선택하고 인증을 위한 메시지에 서명하세요.
Web3 IPFS 게이트웨이를 사용하여 모든 비디오를 다운로드하세요. 결과적으로 스마트 홈에서 녹화한 모든 비디오를 얻을 수 있습니다.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

폴더 안의 모든 영상은 컨트롤러 키로 암호화되어 있으므로, 영상을 복호화하려면 컨트롤러 키를 삽입해야 합니다.
그 후 비디오 재생 버튼이 활성화됩니다. 클릭하시면 영상을 다운로드 받으실 수 있습니다.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






