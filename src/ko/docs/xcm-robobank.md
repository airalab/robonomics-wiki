---
title: Substrate Cumulus Parachain Testsuite for cross-chain messaging 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


이 프로젝트의 주요 목표는 크로스 체인 메시지를 사용할 때 파라체인 런타임 개발을 간소화하는 것입니다.
이를 통해 높은 반복성과 간단한 사용법을 갖춘 통합 테스트를 통해 런타임 코드를 개발할 수 있습니다.
파이썬에서 구축 및 구성된 모든 것을 사용하여 메시지 전달 채널을 설정하고 메시지 테스트를 실행하며 메시지를 보내는 것을 자동화합니다.

XCM Testsuite는 Robobank의 생산 주기를 테스트하는 데 사용됩니다. 이는 로봇이 외부 파라체인에 등록하고 선결제 주문을 받아 실행하고 외부 토큰을 사용하여 결제를 받을 수 있게 하는 Substrate 팔렛의 집합입니다. 이를 통해 로봇은 필요한 모든 인프라를 갖춘 Robonomics 네트워크 내에서 운영할 수 있지만 동시에 다른 어떤 파라체인에서도 서비스를 제공할 수 있습니다.

예제 비디오는 [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)에서 확인할 수 있습니다.

데모 시나리오의 주요 단계는 다음과 같습니다:
- 6개의 프로세스 팩에 릴레이 체인 및 두 개의 파라체인 시작
- 파라체인 간 XCM 메시지 채널 설정
- 두 파라체인에 로봇 등록
- 클라이언트 파라체인에서 이 로봇을 위한 주문 생성 (주문 완료를 위한 결제 예약)
- Robonomics 파라체인으로 XCM 메시지 전송
- Robonomics 파라체인에 "거울" 주문 레코드 생성
- 로봇이 Robonomics 파라체인에서 주문 수락
- 주문 수락에 대한 XCM 메시지를 클라이언트 파라체인으로 다시 전송
- 클라이언트 파라체인에서 주문 수락 (주문 마감 시간까지 주문 완료 부족에 대한 벌금 예약)
- 로봇이 Robonomics 파라체인에서 주문 완료
- 주문 완료에 대한 XCM 메시지를 클라이언트 파라체인으로 전송
- 모든 결제 처리 (클라이언트 결제가 로봇에게 이체되고 사용되지 않은 벌금도 이체됨)
- 주문1 종료


## 상류
이 프로젝트는 [Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)의 포크입니다.
테스트 중인 런타임 팔렛의 코드가 포함되어 있습니다.
원본과 마찬가지로파라체인의 노드 코드는 "./pallets", "./runtime", "./node" 디렉토리에 있습니다.

"substrate-node-template"과의 차이점:
- 이 콜레이터 런타임에는 HRMP 핸들러 모듈이 있어서 형제 파라체인으로부터 메시지를 처리할 수 있습니다.
- 내부 XCM 테스트용으로 미리 제작된 목 테스트 런타임

## 빌드 및 실행
권장(매우) 설정:
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[주의] 첫 번째 빌드는 최적화되지 않은 기계에서 최대 몇 시간이 걸릴 수 있습니다.

[주의] 이 스크립트는 Polkadot(Rococo)의 고정 버전(커밋 해시)과 함께 작동합니다.

[주의] 기본적으로 스크립트는 모든 이전 상태를 제거하여 매번 동일한 환경을 재생성합니다. 이 동작은 "config.sh"에서 "PERSISTENT" 매개변수를 사용하여 변경할 수 있습니다.


빌드 및 설정 스크립트 실행:
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

"init.sh" 스크립트의 기본 작업:
 - 설정 파일("config.sh" 파일)을 읽어들임(리비전 번호, 초기 노드 키 및 식별자, 체인 데이터 지속성 매개변수 등)
 - OS 패키지, Rust 및 Python 설정
 - 릴레이 체인 및 두 파라체인을 위한 별도의 이진 파일 빌드
    - 이진 파일은 ./bin 하위 디렉토리에 생성됨
 - (선택 사항) 모든 체인의 이전 체인 데이터 제거
    - "config.sh"에서 "PERSISTENT=1"로 설정된 경우 비활성화됨
 - 별도의 프로세스로 실행(별도의 PID 및 I/O 파이프 사용):
    - 릴레이 체인의 밸리데이터(안정적인 Rococo 리비전을 실행하는 4개의 밸리데이터)
    - 파라체인-100의 콜레이터(개발 중인 첫 번째 파라체인을 위한 단일 콜레이터)
    - 파라체인-200의 콜레이터(개발 중인 두 번째 파라체인을 위한 단일 콜레이터)
 - 콘솔에 모든 엔드포인트, 포트를 출력하여 프론트엔드 앱(탐색기, DApp)을 사용하여 모든 체인을 연구할 수 있도록 함
 - 모든 체인의 출력 데이터를 계속해서 콘솔에 출력함

[경고] 실행 후 네트워크가 활성화될 때까지 기다리고, 블록 최종화가 시작되었는지 확인하고, 파라체인이 등록되었는지 확인하세요. 이러한 프로세스들은...약 5분 정도 소요됩니다 (50개 블록 x 6초).

## 초기 설정이 작동하는지 확인

표준 Polkdot 프론트엔드 및 생성된 "--ws-port" 엔드포인트를 사용하여 각 노드에 연결합니다.
체인을 모니터링하기 위해 [Polkadot 애플리케이션](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)을 엽니다.

### 예시:
로컬호스트, 4개의 릴레이 체인 검증자, 1개의 파라체인-100 콜레이터, 1개의 파라체인-200 콜레이터:
- [릴레이 검증자 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [릴레이 검증자 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [릴레이 검증자 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [릴레이 검증자 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [파라체인-100 콜레이터](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [파라체인-200 콜레이터](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)

모든 것이 작동하고 합의가 시작되면, 테스트 케이스를 실행할 수 있습니다 (새 터미널에서).

### UMP 메시지 전달 테스트
```bash
./scripts/init.sh ump
```
`파라체인-100`에서 `Balance.transfer` 메시지를 생성하고 릴레이 체인으로 전달합니다.
릴레이 체인이 메시지를 수신하면 `para 100` 계정에서 Charlie 계정으로 15토큰을 이체합니다.

### HRMP 메시지 전달 테스트
```bash
./scripts/init.sh ump
```

`파라체인-100`에서 `Balance.transfer` 메시지를 생성하고 `sibling 200`로 전달합니다.
이전에 `subl 100` 계정에 1000토큰을 부여하고 파라체인 간의 통신 채널을 설정합니다.
```bash
./scripts/init.sh hrmp
```
다음 메시지는 `hrmpm` 하위 명령을 실행하여 전송할 수 있습니다. 채널을 생성하지 않으므로 더 빠르게 실행됩니다.
```bash
./scripts/init.sh hrmpm
```

### 더 많은 옵션
```bash
./scripts/init.sh help
```

## 로컬 테스트넷### 사용자 정의 체인 스펙 만들기
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

rococo_local.json을 편집하여 잔액 및 권한 매개변수를 사용자의 것으로 대체합니다.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

//Alice//stash의 Polkadot 주소 (sr25519 암호화).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash`는 계정입니다:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 주소:     
```

//Alice의 Polkadot 그랜드파 세션 키 (ed25519 암호화).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice`는 계정입니다:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 주소:     
```

//Alice의 Polkadot 주소 (sr25519 암호화).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice`는 계정입니다:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 주소:     
```

rococo_local.json을 원시 형식으로 변환합니다.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
새로운 체인 스펙을 사용하려면 ./config/ 디렉토리의 rococo.json 파일을 이 새 파일로 교체하고 체인을 다시 실행합니다.
```bash
./scripts/init.sh run
```
코드를 자유롭게 편집할 수 있습니다. 위 명령은 프로젝트를 다시 빌드하고 콜레이터 노드를 업데이트한 후 시작합니다.
Cumulus는 여전히 개발 중인 사전 릴리스 소프트웨어입니다.
우리는 특정 커밋의 polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  2021년 3월 18일](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5)를 사용하고 있습니다.dbcd0987ed53f104e6e15)

소프트웨어의 최신 버전을 사용할 수 있습니다. 이를 위해 `rococo-v1` 브랜치의 최신 커밋으로 `./scipt/config.sh`의 `POLKADOT_COMMIT`를 변경하고, `./bin/polkadot`을 삭제한 후에 다음을 실행하세요.
```bash
./scripts/init.sh run
```

콜레이터 프로젝트 의존성 업데이트
```bash
cargo update
./scripts/init.sh build
```
일부 의존성은 새로운 러스트 툴체인 기능이 필요할 수 있습니다. 이 프로젝트는 러스트 `nightly-2021-01-26`을 기반으로 합니다.
빌드하기 전에 `./scripts/config.sh`에서 러스트 툴체인 버전을 업데이트하세요.

## 패러체인 해킹
[외부 팔렛 추가](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - 아마도 "더 알아보기"에 있어야 할 것입니다.
## 더 알아보기

이 프로젝트의 구조, 포함된 기능 및 해당 기능이 구현된 방식에 대해 더 알아보려면
상위 [Substrate 개발자 허브 노드 템플릿](https://github.com/substrate-developer-hub/substrate-node-template)을 참조하세요.
공식 Polkadot 블로그에서 [패러체인 블록의 경로](https://polkadot.network/the-path-of-a-parachain-block/)에 대해 더 알아볼 수 있습니다.
[Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)