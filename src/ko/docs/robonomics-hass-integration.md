---
title: Robonomics 통합 설정

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
---

**이 문서에서는 Robonomics를 Home Assistant에 추가합니다. 이를 통해 Home Assistant가 암호화된 데이터로 데이터 로그를 Robonomics Parachain에 기록하고, 파라체인에서 스마트 기기를 제어하기 위해 발사 명령을 수신할 수 있습니다. 통합은 데이터를 저장하고 IPFS를 사용하여 데이터를 전송하고 IPFS 해시를 데이터 로그 또는 발사 기능에 보냅니다.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

먼저 대시보드를 위한 구성을 만들어야 합니다. Home Assistant 대시보드를 열고 오른쪽 상단 모서리에 있는 "대시보드 편집" 버튼(연필 모양)을 누릅니다.
열린 팝업에서 세 개의 점 아이콘을 클릭하고 "Take Control" 버튼을 선택합니다:

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

한 번 더 "Take Control"을 누릅니다:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

이제 Robonomics 통합을 설치할 수 있습니다. 다음 단계를 따라 진행하십시오:

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Home Assistant의 웹 인터페이스에서 `Settings` -> `Device & Services`로 이동하여 `ADD INTEGRATION`을 누릅니다. `Robonomics`를 검색합니다.

2. Robonomics를 클릭하고 구성을 입력합니다:

- `SUB_CONTROLLER` 계정의 시드를 컨트롤러 계정 시드에 추가합니다.
- `SUB_OWNER` 계정의 공개 주소를 구독 소유자 주소에 추가합니다.
- 데이터 전송 간격을 설정합니다 (기본값은 10분).
- (선택 사항) Pinata 또는 기타 사용자 정의 게이트웨이에 대한 자격 증명을 추가하여 데이터를 IPFS 네트워크 전체에 퍼뜨릴 수 있습니다.

{% roboWikiNote {title:"참고", type: "Note"}%} [Pinata 설정 섹션](/docs/pinata-setup)에서 Pinata 사용에 대한 자세한 정보를 찾을 수 있습니다.{% endroboWikiNote %}

3. 구성을 완료한 후 `SUBMIT`을 누릅니다. 모든 것을 올바르게 입력했다면 성공 창이 표시됩니다.

이것으로 Robonomics 통합을 Home Assistant에 완전히 설정했습니다. 이제 모든 Robonomics 웹 서비스를 사용할 수 있습니다. 더 자세한 정보를 알아보려면 ["사용" 섹션](/docs/add-user)으로 이동하세요.