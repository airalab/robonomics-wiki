---
title: Robonomics 통합 설정

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**이 문서에서는 Robonomics를 Home Assistant에 추가합니다. 이를 통해 Home Assistant가 암호화된 데이터로 데이터 로그를 Robonomics Parachain에 기록하고, 파라체인으로부터 발사 명령을 수신하여 스마트 기기를 제어할 수 있습니다. 통합은 데터를 저장하고 IPFS 해시를 데이터 로그 또는 발사 기능으로 전송하기 위해 IPFS를 사용합니다.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. Home Assistant의 웹 인터페이스에서 `Settings` -> `Device & Services`로 이동하고 `ADD INTEGRATION`를 누릅니다. `Robonomics`를 검색합니다.

2. Robonomics를 클릭하고 구성을 입력합니다: 

- `SUB_CONTROLLER` 계정의 시드를 컨트롤러 계정 시드에 추가합니다.
- `SUB_OWNER` 계정의 공개 주소를 구독 소유자 주소에 추가합니다.
- 데이터 전송 간격을 설정합니다 (기본값은 10분입니다).
- (선택 사항) 데이터를 IPFS 네트워크 전체에 널리 퍼뜨리기 위해 핀 서비스 Pinata 또는 기타 사용자 정의 게이트웨이에 대한 자격 증명을 추가할 수 있습니다.

3. 구성을 완료한 후 `SUBMIT`을 누릅니다. 모든 항목을 올바르게 입력했다면 성공 창이 표시됩니다.

이제 Robonomics 통합을 Home Assistant에 완전히 설정했습니다. 이제 모든 Robonomics 웹 서비스를 사용할 수 있습니다. 자세한 내용은 ["사용" 섹션](/docs/global-administration)을 참조하십시오. 
