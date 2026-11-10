---
title: robonomics.app 사용하기
contributors: [vol4tim, positivecrash, ensrationis]
---

[robonomics.app](https://robonomics.app)은 Robonomics의 웹 앱입니다. 이 앱으로 구독을 구매하고, Home Assistant를 연결하고, 어느 브라우저에서든 집을 제어하고, 디바이스 트리와 센서 데이터를 볼 수 있습니다. 이 페이지는 화면별로 안내합니다.

Robonomics 계정이 들어 있는 Polkadot 지갑 확장 프로그램이 필요합니다. 무언가를 구매하거나 트랜잭션을 보내려면 그 계정에 약간의 XRT가 있어야 합니다. [시작하기](/docs/getting-started/)를 참고하세요.

## 지갑 연결하기

지갑 버튼은 오른쪽 위에 있습니다. 확장 프로그램에서 계정을 고르고, 사이트가 그 계정을 쓰도록 허용합니다. 같은 버튼으로 네트워크도 바꿀 수 있습니다. Polkadot을 사용하세요.

## 구독 구매하기

메뉴에서 **Buy/renew a subscription**을 엽니다.

- 페이지에는 가격, 활성화까지 걸리는 시간(약 2분), 지금 구매할 수 있는 구독 수가 표시됩니다.
- 잔액이 가격에 약간의 수수료를 더한 금액보다 많아야 합니다.
- 트랜잭션 하나로 빈 경매에 입찰하고 내 계정을 구독에 추가합니다.
- 구매할 수 있는 구독이 없으면, 새 구독은 거버넌스 투표를 거친 뒤에야 열립니다. [레거시 팔레트](/docs/legacy-pallets/#current-state)를 참고하세요.

구독에 등록된 계정은 수수료 없이 트랜잭션을 보낼 수 있습니다. Home Assistant는 이 방식으로 체인과 통신합니다. 자세한 내용: [RWS 구독](/docs/legacy-pallets/#rws-subscriptions).

## 설정 추가하기

설정(setup)은 앱이 보는 내 집입니다. 구독과 그 구독에 연결된 계정들로 이루어집니다. 메뉴의 **New setup**에서 세 가지 방법으로 추가할 수 있습니다.

- **소유자 주소로.** 구독을 보유한 주소를 붙여 넣습니다. 앱이 구독을 찾아 종료일을 보여 줍니다. 이미 만료된 구독도 보여 줍니다.
- **확장 프로그램으로.** 주소를 입력하는 대신 지갑에서 소유자 계정을 고릅니다.
- **파일에서.** 예전에 내보낸 백업 파일을 업로드합니다.

설정 목록은 내 브라우저에만 저장됩니다. 앱에서 설정을 삭제하면 그 목록에서만 빠지고, 체인에서는 아무것도 바뀌지 않습니다.

## Your setup

**Your setup**에는 구독 하나가 표시됩니다.

- **Active until.** 종료일입니다. 날짜가 지나면 빨간색으로 표시됩니다.
- **Owner.** 구독을 보유한 계정입니다.
- **Controller.** Home Assistant가 체인에 기록할 때 쓰는 계정입니다. Home Assistant 통합이 이 계정을 만들고, 사용자가 여기에 붙여 넣습니다.
- **Users.** 집을 제어할 수 있는 계정입니다. 사용자를 추가하거나 제거하는 것은 소유자가 보내는 트랜잭션입니다.
- **Subscription backup.** 설정을 파일로 내보냅니다. 다른 브라우저나 기기로 옮길 때는 그 파일을 **New setup**에서 업로드합니다.

## 디바이스와 제어

**Devices & Control**은 브라우저에서 Home Assistant 대시보드를 엽니다.

- 사용자를 고르고 그 사용자의 키 문구를 입력합니다. 앱은 이 문구로 Home Assistant에서 온 데이터를 복호화합니다. 키 문구는 브라우저 안에만 남습니다.
- **Keep me signed in**은 신뢰할 수 있는 기기에서만 선택하세요.
- 앱은 Home Assistant에 P2P로 직접 연결합니다. 직접 연결할 수 없으면 릴레이를 거칩니다. 데이터는 처음부터 끝까지 암호화됩니다.

이 페이지가 동작하려면 Home Assistant에 Robonomics 통합이 있어야 합니다. 어떤 통합이 있고 각각 얼마나 최신인지는 [디바이스 연결](/docs/connect-devices/#home-assistant)에 있습니다.

## 디바이스 트리

메뉴의 **Device tree**는 Robonomics 5.0의 [디바이스 트리](/docs/device-tree/)를 보여 줍니다.

- 첫 페이지에는 루트 노드와 그 소유자가 나열됩니다.
- 노드는 번호나 그 디바이스의 계정으로 열 수 있습니다.
- 노드 페이지에는 루트까지의 경로, 소유자, 디바이스 계정, `meta`와 `payload`(JSON과 텍스트는 텍스트로 표시), 자식 노드, 접근 항목이 표시됩니다.
- 계정을 연결하면 루트 노드를 만들고, 내가 소유한 노드에 자식을 추가하고, 내가 소유자이거나 `Write` 권한이 있는 노드의 `meta`와 `payload`를 수정할 수 있습니다. 트리의 모든 내용은 공개됩니다.

## Datalog

홈 페이지의 **Send your first record**를 누르면 Datalog 페이지가 열립니다.

- 최대 512바이트를 입력하고 보냅니다. 수수료는 0.001 XRT보다 훨씬 적습니다.
- 그 아래에서 어떤 계정의 기록이든 최신순으로 볼 수 있습니다. 체인은 계정마다 최근 기록 128개를 보관합니다.

Datalog는 [레거시 팔레트](/docs/legacy-pallets/#datalog) 중 하나입니다. 첫 테스트로 좋습니다. 디바이스에는 디바이스 트리를 사용하세요.

## 센서와 디지털 트윈

- **Altruist.** `robonomics.app/#/altruist/<sensor address>`를 열면 체인에 기록된 센서 측정값을 볼 수 있습니다. 미세먼지, 소음, 온도, 습도, 그리고 별도 축에 표시되는 hPa 단위 기압입니다. [Altruist와 sensors.social](/docs/altruist/)을 참고하세요.
- **에너지 모니터.** `robonomics.app/#/energy-monitor/<address>`를 열면 에너지 모니터에 대해 같은 내용을 볼 수 있습니다.
- **디지털 트윈.** 내 트윈과 각 토픽 뒤에 있는 계정을 나열합니다. [DigitalTwin](/docs/legacy-pallets/#digitaltwin)을 참고하세요.

주소에 측정값이 없으면, 페이지가 계속 로딩하는 대신 측정값이 없다고 알려 줍니다.

## 문제가 생겼을 때

- **앱이 잘못된 네트워크에 연결됩니다.** 앱은 예전에 링크로 받은 네트워크 주소를 기억합니다. 되돌리려면 `https://robonomics.app/?rpc=wss://polkadot.rpc.robonomics.network/`를 한 번 여세요.
- **Uniswap 링크에 다른 토큰이 표시됩니다.** Ethereum의 정식 XRT는 `0x1F752250f518e419f2F03804E25728c5C6DfF73f`입니다. 예전 토큰 `0x7dE9…1cb7`은 정식 XRT가 아닙니다. [다른 네트워크의 XRT](/docs/xrt-migration/)를 참고하세요.
- **Controller나 사용자가 저장되지 않거나, Kusama 구독을 관리할 수 없습니다.** 알려진 문제이며, [robonomics.app issues](https://github.com/airalab/robonomics.app/issues)의 #213과 #223에서 추적하고 있습니다.
- **그 밖의 문제.** [github.com/airalab/robonomics.app](https://github.com/airalab/robonomics.app/issues)에 이슈를 등록하세요. 브라우저 콘솔에 나오는 빌드 버전을 함께 적어 주세요. 버전은 앱이 시작될 때 출력됩니다.
