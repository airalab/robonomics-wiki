---
title: 공장 바닥과 안전하게 클라우드 AI 연결하기
contributors: [vitl2907]
---

로보노믹스 기술은 이미 산업 환경에서 실제 시나리오에 적용되어 있는 산업 4.0이 직면한 문제를 해결할 수 있습니다.

많은 AI 기업들이 공장 바닥의 프로세스를 최적화하는 솔루션을 개발하고 있어 공장이 더 적은 비용으로 더 많은 생산물을 생산할 수 있게 합니다. 그러나 대부분의 공장은 클라우드에 직접 인프라를 연결하는 것을 주저합니다. 왜냐하면 이는 잠재적인 사이버 보안 위험으로 이어질 수 있으며, 수백만 달러의 손실과 심지어 인명 피해를 초래할 수 있기 때문입니다.

[MerkleBot](https://merklebot.com)은 [로보노믹스 네트워크](https://robonomics.network)를 활용하여 공장을 클라우드 기반 AI에 안전하게 연결할 수 있는 솔루션을 개발했습니다.

본 문서는 [Veracity Protocol](https://www.veracityprotocol.org/)과의 실험을 통해 작성되었으며, 이 프로토콜은 모바일 기기의 사진을 기반으로 물리적 물품의 비침입적 보호를 만드는 알고리즘을 사용합니다.

이 사용 사례는 산업 부품을 로봇 팔을 사용하여 스캔하는 과정을 보여줍니다.

[데모 비디오](https://youtu.be/8AL70LFVX5w)

## 단계별 프로세스

### DApp을 사용한 사용자 인터페이스

{% roboWikiPicture {src:"docs/google-play-store.gif", alt:"/google-play-store"} %}{% endroboWikiPicture %}

DApp은 작업자를 위한 사용자 인터페이스로 작용합니다. 이는 로봇을 시작하여 사진을 수집하는 것을 요청하는 데 사용되며, 공장 환경과 클라우드 기반 AI 간의 안전한 통신을 허용하는 목적을 가지고 있습니다.

### 로봇 시작

{% roboWikiPicture {src:"docs/Veracity_Protocol_Transaction.gif", alt:"/Veracity_Protocol_Transaction"} %}{% endroboWikiPicture %}

작업자는 DApp에서 트랜잭션에 서명하여 로봇 스캔을 시작합니다. 이 단계는 공개 블록체인의 트랜잭션을 기반으로 한 공장 바닥의 프로세스가 시작될 수 있음을 보장합니다.

로봇은 로보노믹스 네트워크를 통해 블록체인으로부터 명령을 받아 스캔을 시작합니다. 로보노믹스 네트워크 기술을 통해 비즈니스 목표와 로봇 작업 간의 간극을 줄일 수 있습니다.

### 데이터 수집 및 클라우드 기반 AI로 전송

DApp에서 작업자는 확인을 보고, 로봇은 테이블에 놓인 항목을 스캔하기 시작합니다. 이러한 사용 사례에서처럼 또는 필요에 따라 공장 라인에 직접 놓인 항목을 스캔할 수 있습니다.

{% roboWikiPicture {src:"docs/Veracity_Protocol_Launch.gif", alt:"/Veracity_Protocol_Launch"} %}{% endroboWikiPicture %}

로봇이 데이터를 수집하면 로컬에 저장하고 IPFS 프로토콜을 통해 클라우드 기반 AI에 제공합니다. 데이터를 암호화하고 블록체인 트랜잭션을 통해 데이터 교환을 조직함으로써, 클라우드 기반 AI에 대한 액세스를 승인하면서 데이터가 안전하고 그 자리에 유지되도록 할 수 있습니다.

로보노믹스에 내장된 보안 메커니즘은 공개 블록체인의 공유 보안을 기반으로 하여 대부분의 공장이 자체적으로 조직하기에는 과도한 비용이 드는 수준의 보안 수준을 확보할 수 있게 합니다.

### 디지털 패스포트 생성

클라우드 기반 AI가 데이터를 분석하면 로그 파일과 권장 사항이 자동으로 [디지털 패스포트](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/)로 기록됩니다. 블록체인 레코드가 IPFS 프로토콜을 통해 모든 이러한 파일에 대한 해시를 가지고 있기 때문에 모든 작업과 스캔을 추적할 수 있습니다.

## 사용 사례에 대한 코멘트

이 사용 사례에서는 Universal Robot UR3 산업용 로봇 팔이 사용되었습니다. 그러나 ROS를 지원하는 로보노믹스 덕분에 KUKA, Fanuc, Yaskawa를 포함한 대부분의 주요 산업용 조작기를 안전하게 클라우드 기반 AI에 연결하여 사용할 수 있습니다.

클라우드 기반 AI 도구를 안전하게 배포하고 통합하는 데 관심이 있다면 [문의](mailto:v@merklebot.com)해 주세요.