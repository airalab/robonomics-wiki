---
title: 시작하기
contributors: [Vourhey, positivecrash, ensrationis]
---

이 페이지에서는 아무것도 없는 상태에서 시작해 Robonomics 네트워크에 첫 기록을 남기기까지의 과정을 안내합니다. 브라우저, 지갑 확장 프로그램, 약간의 XRT가 필요합니다.

## 1. 계정 만들기

1. [Polkadot.js 확장 프로그램](https://polkadot.js.org/extension/) 또는 사용자 지정 네트워크를 지원하는 다른 Polkadot 지갑을 설치합니다.
2. 지갑에서 계정을 만듭니다. 복구 문구를 종이에 적어 오프라인으로 보관하세요.
3. 같은 계정을 Robonomics에서도 쓸 수 있습니다. Robonomics는 자체 주소 형식(SS58 prefix 32)으로 주소를 표시하므로, Robonomics에서는 주소가 `4`로 시작합니다.

계정은 최소한 존재 예치금(existential deposit)인 0.000001 XRT를 보유해야 체인에 존재하게 됩니다.

## 2. XRT 구하기

필요한 양은 아주 적습니다. 이 글을 쓰는 시점에 datalog 기록 하나의 수수료는 0.001 XRT보다 훨씬 적습니다.

현재 XRT를 거래할 수 있는 곳:

- **Ethereum의 Uniswap.** Ethereum의 정식 XRT는 Snowbridge를 통해 Polkadot에서 브리지된 XRT입니다. 컨트랙트 주소는 `0x1F752250f518e419f2F03804E25728c5C6DfF73f`입니다. [Uniswap에서 스왑하기](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). [Snowbridge](https://app.snowbridge.network/send)는 Ethereum과 Polkadot 사이에서 토큰을 옮겨 줍니다.
- **Polkadot Asset Hub.** Asset Hub에 XRT가 있고, DOT–XRT 스왑 풀도 있습니다.

Asset Hub에서 Robonomics 파라체인의 내 계정으로 XRT를 옮기는 것은 크로스체인 전송입니다. 아직 단계별 가이드는 공개되지 않았습니다. 막히면 Telegram 그룹 [XRT Traders](https://t.me/xrt_trade)에서 질문하세요.

{% roboWikiNote {type: "warning", title: "오래된 링크"}%} 일부 오래된 페이지는 더 이상 XRT를 상장하지 않는 거래소와, Ethereum의 레거시 토큰 `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`로 연결됩니다. 레거시 토큰은 정식 XRT가 아닙니다. {% endroboWikiNote %}

## 3. Polkadot.js Apps 연결하기

[Robonomics RPC로 Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer)를 엽니다. 공개 엔드포인트 `wss://polkadot.rpc.robonomics.network/`에 연결됩니다. 지갑 확장 프로그램에서 이 사이트를 허용하면 계정이 표시됩니다.

블록, 계정, 전송 내역은 블록 탐색기 [scan.robonomics.network](https://scan.robonomics.network)에서도 볼 수 있습니다.

<div id="4-send-your-first-record"></div>

## 4. 첫 기록 보내기

가장 간단한 첫 단계는 datalog 기록입니다. 내 계정 아래에 체인에 저장되는 짧은 데이터입니다.

1. Polkadot.js Apps에서 **Developer → Extrinsics**를 엽니다.
2. 계정을 고른 다음 `datalog`와 `record`를 선택합니다.
3. 데이터를 최대 512바이트까지 입력합니다. 일반 텍스트면 충분합니다.
4. 트랜잭션을 제출하고 지갑에서 서명합니다.

다시 읽으려면 **Developer → Chain state**를 열고 `datalog`와 `datalogIndex`를 선택한 뒤 내 계정으로 조회합니다. 어느 슬롯에 기록이 있는지 나옵니다. 그다음 내 계정과 슬롯 번호로 `datalogItem`을 조회합니다. 각 기록에는 타임스탬프가 붙어 있습니다.

Datalog는 [레거시 팔레트](/docs/legacy-pallets/#datalog) 중 하나입니다. 지금도 동작하고 첫 테스트로 좋지만, 새 프로젝트는 디바이스 트리를 사용하는 것이 좋습니다.

## 5. 다음 단계: 디바이스 설명하기

Robonomics의 핵심은 디바이스 트리입니다. 설비에 해당하는 노드를 만들고, 그 아래에 구성 요소와 디바이스 노드를 추가한 뒤, 누가 업데이트할 수 있는지 정합니다. [디바이스 트리(CPS)](/docs/device-tree/)를 읽고 이어서 [디바이스 연결](/docs/connect-devices/)을 참고하세요.
