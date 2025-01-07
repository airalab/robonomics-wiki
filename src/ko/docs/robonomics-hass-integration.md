---
title: Robonomics 통합 설정

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**이 문서에서는 Home Assistant에 Robonomics를 추가하는 방법을 알아봅니다. 이를 통해 Home Assistant가 암호화된 데이터로 데이터 로그를 Robonomics Parachain에 기록하고, 파라체인으로부터 스마트 기기를 제어하기 위한 실행 명령을 수신할 수 있습니다. 이 통합은 데이터를 저장하고 데이터 로그 또는 실행 기능으로 IPFS 해시를 전송하는 데 IPFS를 사용합니다.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

먼저 대시보드를 위한 구성을 만들어야 합니다. Home Assistant 대시보드를 열고 오른쪽 상단 모서리에 있는 "대시보드 편집" 버튼(연필 모양)을 누릅니다.
열린 팝업에서 세 개의 점 아이콘을 클릭하고 "Take Control" 버튼을 선택합니다:

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

한 번 더 "Take Control"을 누릅니다:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

이제 Robonomics 통합을 설치할 수 있습니다. 다음 단계를 따라 진행하십시오:
 

1. Home Assistant 웹 인터페이스에서 `Settings` -> `Device & Services`로 이동하고 `ADD INTEGRATION`을 누릅니다. `Robonomics`를 검색합니다.

2. Robonomics를 클릭하고 설정 파일을 업로드합니다 (`robonomics.app-settings-<subscirption-name>-server.json`이라는 이름의 설정 파일, `<subscirption-name>`은 구독 이름입니다) 그리고 `CONTROLLER` 계정의 비밀번호를 입력합니다. 설정 파일을 만드는 방법은 [여기](/docs/sub-activate/?topic=smart-home#setup-your-subscription)에서 확인할 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"controller create"} %}{% endroboWikiPicture %}

3. 선택 사항: 사용할 네트워크를 선택할 수 있습니다.

4. 구성을 마친 후 `SUBMIT`을 누릅니다. 모든 항목을 올바르게 입력했다면 성공 창이 표시됩니다.

{% roboWikiNote {type: "okay", title: "" }%} 설치는 인터넷 연결 상태에 따라 약 10~15분이 소요될 수 있습니다. {% endroboWikiNote %}

이것으로 Robonomics 통합을 Home Assistant에 완전히 설정했습니다. 이제 모든 Robonomics 웹 서비스를 사용할 수 있습니다. 더 자세한 내용은 ["사용" 섹션](/docs/add-user)을 참조하십시오.