---
title: 크로스 체인 메시징을 위한 Substrate Cumulus Parachain Testsuite 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


이 프로젝트의 주요 목표는 크로스 체인 메시지를 사용할 때 파라체인 런타임 개발을 간소화하는 것입니다. 
이는 반복성이 높고 사용이 간단한 통합 테스트와 함께 런타임 코드의 개발을 능하게 합니다.
파이썬에서 구성 및 구성된 모든 것을 사용하여 릴레이 체인 + 2개의 파라체인으로 미리 설정된 네트워크 구성을 자동으로 빌드하고 구성하며, 파라체인 간의 메시지 전달 채널을 설정하고 메시징 테스트를 실행하여 메시지를 보내고 런타임에 대한 호출을 사용합니다.

XCM Testsuite는 로보뱅크의 생산 주기 테스트에 사용됩니다. 이는 로봇이 외부 파라체인에 등록하고 선결제 주문을 받아들이고 외부 토큰을 사용하여 결제를 받을 수 있게 하는 Substrate 팔렛트의 집합입니다. 이를 통해 로봇은 필요한 모든 인프라를 갖춘 로보노믹스 네트워크 내에서 작동할 수 있지만, 동시에 다른 어떤 파라체인에서도 서비스를 제공할 수 있습니다.

예제 비디오는 [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)에서 확인할 수 있습니다.

데모 시나리오의 주요 단계는 다음과 같습니다:
- 6개의 프로세스 팩에서 릴레이 체인과 두 개의 파라체인 시작
- 파라체인 간의 XCM 메시지 채널 설정
- 두 파라체인에 로봇 등록
- 클라이언트 파라체인에서 이 로봇을 위한 주문 생성(주문 완료를 위한 결제 예약)
- Robonomics 파라체인으로 XCM 메시지 전송
- Robonomics 파라체인에 "거울" 주문 기록 생성
- 로봇이 Robonomics 파라체인에서 주문 수락
- 주문 수락에 대한 XCM 메시지를 클라이언트 파라체인으로 다시 전송
- 주문 수락(주문 완료 부족에 대한 벌금 수수료 예약)
- 로봇이 Robonomics 파라체인에서 주문 완료
- 주문 완료에 대한 XCM 메시지를 클라이언트 파라체인으로 전송
- 모든 결제 정산(클라이언트 결제는 로봇에게, 사용되지 않은 벌금 수수료도 함께)
- 주문1 종료


## 상류
이 프로젝트는
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
테스트 중인 런타임 팔렛트의 코드를 포함합니다.
원래 노드 코드에서 파라체인의 코드는 "./pallets", "./runtime", "./node" 카탈로그에 있습니다.

"substrate-node-template"과의 차이점:
- 이 콜레이터 런타임에는 HRMP 핸들러 모듈이 있으며, 형제 파라체인으로부터의 메시지를 처리할 수 있습니다.
- 내부 XCM 테스트를 위해 준비된 모의 테스트 런타임

## 빌드 및 실행
권장(강력히) 설정: 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[참고] 첫 번째 빌드는 최적화되지 않은 기계에서 몇 시간까지 걸릴 수 있습니다.

[참고] 스크립트는 릴레이 체인 및 파라체인의 고정 버전(Polkadot(Rococo)의 커밋 해시)과 함께 작동합니다.

[참고] 기본적으로 스크립트는 모든 이전 상태를 제거하여 매번 동일한 환경을 재생성합니다. 이 동작은 "config.sh"에서 "PERSISTENT" 매개변수를 사용하여 변경할 수 있습니다.


빌드 및 설정 스크립트 실행  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

"init.sh" 스크립트의 기본 작업:
 - 구성 읽기(리비전 번호, 초기 노드 키 및 식별자, 체인 데이터 지속성 매개변수 등이 포함된 "config.sh" 파일)
 - OS 패키지, Rust 및 Python 설정
 - 릴레이 체인 및 두 개의 파라체인에 대한 별도의 이진 파일 빌드
    - 이진 파일은 ./bin 하위 디렉토리에 생성됩니다. 
 - (선택 사항) 모든 체인의 이전 체인 데이터 제거
    - "config.sh"에서 "PERSISTENT=1"로 설정된 경우 비활성화됩니다.
 - 별도의 프로세스로 실행됩니다(별도의 PID 및 I/O 파이프 사용):
    - 릴레이 체인의 검증자(안정적인 Rococo 리비전을 실행하는 4개의 검증자)
    - 파라체인-100의 콜레이터(개발 중인 첫 번째 파라체인의 단일 콜레이터)
    - 파라체인-200의 콜레이터(개발 중인 두 번째 파라체인의 단일 콜레이터)
 - 모든 체인의 모든 엔드포인트, 포트를 콘솔에 출력하여 프론트엔드 앱(탐색기, DApp)을 사용하여 모든 체인을 연구할 수 있습니다.
 - 모든 체인의 모든 출력 데이터를 계속해서 콘솔에 출력합니다.

[경고] 시작한 후에는 네트워크가 작동하기 시작하고 파라체인이 등록되었는지 확인하기 위해 대기하십시오. 이 프로세스는 약 5분(50개 블록 x 6초) 정도 소요됩니다.

## 초기 설정이 작동하는지 확인 

표준 Polkdot 프론트엔드 및 생성된 "--ws-port" 엔드포인트를 사용하여 각 노드에 연결합니다.
체인을 모니터링하기 위해 [Polkadot 애플리케이션](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)을 엽니다. 

### 예시:
로컬호스트, 4개의 릴레이 체인 검증자, 하나의 파라체인-100 콜레이터, 하나의 파라체인-200 콜레이터:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


모든 것이 작동하고 합의가 시작되면, 테스트 케이스를 실행할 수 있습니다 (새로운 터미널에서).

### UMP 메시지 전달 테스트
```bash
./scripts/init.sh ump
```
`parachain-100`에서 `Balance.transfer` 메시지를 생성하고 릴레이 체인으로 전달합니다.
릴레이 체인이 메시지를 받으면 `para 100` 계정에서 15 토큰을 Charlie 계정으로 이체합니다.


### HRMP 메시지 전달 테스트
```bash
./scripts/init.sh ump
```

`parachain-100`에서 `Balance.transfer` 메시지를 생성하고 `sibling 200`으로 전달합니다.
그 전에, `subl 100` 계정에 1000 토큰을 할당하고 파라체인 간에 통신 채널을 설정합니다.
```bash
./scripts/init.sh hrmp
```
다음 메시지는 `hrmpm` 하위 명령을 실행하여 전송할 수 있습니다. 채널을 생성하지 않으므로 더 빠르게 실행됩니다.
```bash
./scripts/init.sh hrmpm
```

### 추가 옵션
```bash
./scripts/init.sh help
```

## 로컬 테스트넷

### 사용자 정의 체인 스펙 생성
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

rococo_local.json을 편집하여 잔액 및 권한 매개변수를 사용자의 것으로 바꿉니다.
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
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

//Alice의 Polkadot grandpa 세션 키 (ed25519 암호화).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

//Alice의 Polkadot 주소 (sr25519 암호화).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

rococo_local.json을 원시 형식으로 변환합니다.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
새로운 체인 스펙을 사용하려면 ./config/ 디렉토리의 rococo.json 파일을 이 새로운 파일로 대체하고 체인을 다시 실행하십시오.
```bash
./scripts/init.sh run
```
코드를 자유롭게 편집할 수 있습니다. 위의 명령은 프로젝트를 다시 빌드하고 콜레이터 노드를 업데이트한 후 시작합니다.
Cumulus는 여전히 개발 중인 사전 릴리스 소프트웨어입니다.
우리는 정 커밋의 polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)을 사용하고 있습니다.

더 최신 버전의 소프트웨어를 사용할 수 있습니다. 이를 위해 ./scipt/config.sh의 POLKADOT_COMMIT을
 `rococo-v1` 브랜치의 최신 커밋으로 변경하고 ./bin/polkadot을 삭제한 다음 실행하십시오. 
```bash
./scripts/init.sh run
```

콜레이터 프로젝트 종속성 업데이트 
```bash
cargo update
./scripts/init.sh build
```
일부 종속성은 새로운 러스트 툴체인 기능을 요구할 수 있습니다. 이 프로젝트는 러스트 `nightly-2021-01-26`을 기반으로 합니다.
빌드하기 전에 ./scripts/config.sh에서 러스트 툴체인 버전을 업데이트하십시오.

## 파라체인 해킹
[외부 팔렛 추가](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - 아마도 "자세히 알아보기"에 있어야 할 것입니다.
## Learn More

이 프로젝트의 구조, 캡슐화된 기능 및 해당 기능이 구현된 방식에 대해 자세히 알아보려면 상위 [Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)을 참조하십시오. 공식 Polkadot 블로그에서 [파라체인 블록의 경로](https://polkadot.network/the-path-of-a-parachain-block/)에 대해 더 자세히 알아 수 있습니다. [Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)을 참조하십시오.
