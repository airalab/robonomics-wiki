---
title: Robonomics 통합 설정

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**이 문서에서는 Robonomics를 Home Assistant에 추가합니다. 이를 통해 Home Assistant가 암호화된 데이터로 데이터 로그를 Robonomics Parachain에 기록하고, 파라체인에서 스마트 기기를 제어하기 위해 발사 명령을 수신할 수 있습니다. 통합은 데이터를 저장하고 IPFS 해시를 데이터 로그 또는 발사 기능으로 전송하기 위해 IPFS를 사용합니다.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Home Assistant의 웹 인터페이스에서 `Settings` -> `Device & Services`로 이동하고 `ADD INTEGRATION`을 누릅니다. `Robonomics`를 검색합니다.

2. Robonomics를 클릭하고 구성을 입력합니다:

- `SUB_CONTROLLER` 계정에서 컨트롤러 계정 시드로 시드를 추가합니다.
- `SUB_OWNER` 계정의 공개 주소를 구독 소유자 주소로 추가합니다.
- 데이터 전송 간격을 설정합니다 (기본값은 10분입니다).
- (선택 사항) Pinata 또는 기타 사용자 정의 게이트웨이에 대한 자격 증명을 추가하여 데이터를 IPFS 네트워크 전체에 널리 퍼뜨릴 수 있습니다.

{% roboWikiNote {title:"Note", type: "Note"}%} [Pinata 설정 섹션](/docs/pinata-setup)에서 Pinata 사용에 대한 자세한 정보를 찾을 수 있습니다.{% endroboWikiNote %}

3. 구성을 완료한 후 `SUBMIT`을 누릅니다. 모든 것을 올바르게 입력했다면 성공 창이 표시됩니다.

이것으로 Robonomics 통합을 Home Assistant에 완전히 설정했습니다. 이제 모든 Robonomics 웹 서비스를 사용할 수 있습니다. 더 많은 정보를 알아보려면 ["Use" 섹션](/docs/add-user)으로 이동하세요.