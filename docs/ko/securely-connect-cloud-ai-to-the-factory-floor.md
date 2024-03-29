---
title: 클라우드 AI를 공장 바닥에 안전하게 연결합니다
contributors: [vitl2907]
---

로보노믹스 기술은 이미 4차 산업혁명이 직면한 문제를 해결할 수 있으며, 이미 산업 환경에서 실제 시나리오에 적용되고 있습니다.

대부분의 AI 기업들은 공장 바닥의 프로세스를 최적화하기 위한 솔루션을 구축하고 있으며, 이를 통해 공장은 더 적은 비용으로 더 많은 생산을 할 수 있습니다. 그러나 대부분의 공장은 인프라를 클라우드에 직접 연결하는 것에 주저하고 있습니다. 이는 잠재적인 사이버 보안 위험으로 이어질 수 있으며, 수백만 달러의 손실과 심지어 인명 피해로 이어질 수 있습니다.

[MerkleBot](https://merklebot.com)은 [Robonomics Network](https://robonomics.network)을 사용하여 공장을 클라우드 기반 AI에 안전하게 연결하는 솔루션을 구축했습니다.

본 문서는 [Veracity Protocol](https://www.veracityprotocol.org/)과의 실험을 통해 작성되었으며, 이는 모바일 기기의 사진을 기반으로 물리적인 항목의 비침입적인 보호를 생성하는 알고리즘을 사용합니다.

이 사용 사례에서는 로봇 팔을 사용하여 산업 부품을 스캔하는 과정을 보여줍니다.

[Demo video](https://youtu.be/8AL70LFVX5w)

## 단계별 프로세스

### DApp은 사용자 인터페이스로 작동합니다

<!-- ![](../images/google-play-store.gif) -->
<!-- <img src="../images/google-play-store.gif" /> -->
<robo-wiki-picture src="google-play-store.gif" />

DApp은 운영자를 위한 사용자 인터페이스로 작동합니다. 로봇의 실행을 요청하고 공장 환경과 클라우드 기반 AI 간의 안전한 통신을 허용하는 데 사용됩니다.

### 로봇 실행

<!-- ![](../images/Veracity_Protocol_Transaction.gif) -->
<!-- <img src="../images/Veracity_Protocol_Transaction.gif" /> -->
<robo-wiki-picture src="Veracity_Protocol_Transaction.gif" />

운영자는 DApp에서 트랜잭션에 서명하여 로봇 스캔을 시작합니다. 이 단계는 공개 블록체인의 트랜잭션을 기반으로 공장 바닥의 프로세스가 시작될 수 있도록 보장합니다.

로봇은 Robonomics Network를 통해 블록체인으로부터 명령을 받고 스캔을 시작합니다. Robonomics Network 기술을 통해 비즈니스 목표와 로봇 운영 간의 격차를 줄일 수 있습니다.

### 데이터 수집 및 클라우드 기반 AI로의 전송

DApp에서 운영자는 확인을 보고 로봇이 테이블에 배치된 항목을 스캔하기 시작합니다. 이와 같은 사용 사례에서는 공장 라인에 직접 배치될 수도 있습니다.

<!-- ![](../images/Veracity_Protocol_실행.gif) -->
<!-- <img src="../images/Veracity_Protocol_실행.gif" /> -->
<robo-wiki-picture src="Veracity_Protocol_Launch.gif" />


로봇이 데이터를 수집하면 로컬에 저장하고 IPFS 프로토콜을 통해 클라우드 기반 AI에 제합니다. 데이터를 암호화하고 블록체인 트랜잭션을 통해 데이터 교환을 조직함으로써 클라우드 기반 AI에 대한 액세스를 승인하면서 데이터가 안전하고 그대로 유지되도록 할 수 있습니다.

공공 블록체인의 공유 보안을 기반으로 한 Robonomics에 내장된 보안 메커니즘을 통해 대부분의 공장이 직접 구축하기 어려운 수준의 보안을 확보할 수 있습니다.

### 디지털 패스포트 생성

클라우드 기반 AI가 데이터를 분석하면 로그 파일과 권장 사항이 자동으로 [디지털 패스포트](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/)로 기록됩니다. 블록체인 레코드는 IPFS 프로토콜을 통해 이러한 파일들에 대한 해시를 가지고 있으므로 모든 작업과 스캔을 추적할 수 있습니다.

## 사용 사례에 대한 의견

이 사용 사례에서는 Universal Robot UR3 산업 로봇 팔이 사용되었습니다. 그러나 ROS를 지원하는 Robonomics 덕분에 KUKA, Fanuc 및 Yaskawa를 포함한 대부분의 주요 산업 조작기를 안전하게 클라우드 기반 AI에 연결하여 사용할 수 있습니다.

클라우드 기반 AI 도구의 배포 및 통합에 대해 더 자세히 알고 싶다면 [문의](mailto:v@merklebot.com)주세요.
