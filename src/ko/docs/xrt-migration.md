---
title: 다른 네트워크의 XRT
contributors: [nakata5321, ensrationis]
---

정식 XRT는 Polkadot의 Robonomics 파라체인에 있습니다. 이 페이지에서는 Kusama와 Ethereum의 XRT가 어떻게 되는지, 그리고 Polkadot Asset Hub의 XRT는 어디에 있는지 설명합니다.

## Kusama

Kusama의 Robonomics 파라체인은 중단되었습니다. 2026년 9월 28일에 마지막 블록 #12,268,835를 생성했습니다. 데이터베이스 아카이브는 [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama)에 있습니다.

공개된 글에서 Kusama XRT에 대해 밝힌 내용:

- 마지막 블록 시점의 모든 XRT 잔액은 **+20% 보너스**와 함께 Polkadot으로 옮겨집니다.
- Kusama 쪽에서는 **바이백이 없습니다**.
- 잔액이 Polkadot의 어디에 나타나는지, 보유자가 따로 해야 할 일이 있는지는 별도의 글에서 안내합니다.

그 글은 [Robonomics 블로그](https://robonomics.network/blog/)에서 확인하세요. 출처: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/), [토크노믹스 페이지](https://robonomics.network/tokenomics/).

## Ethereum

Ethereum의 예전 XRT 토큰(`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`)은 지원이 중단되었습니다. 2026년 2월 5일, 이 토큰의 발행 메커니즘이 악용되어 토큰이 무단으로 발행되었습니다. Polkadot과 Kusama의 XRT는 영향을 받지 않았습니다.

스냅샷 시점(Ethereum 블록 24,390,081)에 예전 토큰을 보유한 사람은 마이그레이션할 수 있습니다.

1. 마이그레이션 앱을 엽니다: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. 2026년 2월 5일에 XRT를 보유하고 있던 지갑을 연결합니다. 앱에 스냅샷 잔액과 보너스를 더한 금액이 표시됩니다.
3. 옵션 하나를 고릅니다. 주소마다 한 번만 선택할 수 있습니다.
   - **Accept(수락)**: Ethereum에서 정식 XRT를 받습니다. 스냅샷 잔액에 20%를 더한 양입니다.
   - **Decline(거절)**: 대신 바이백 프로그램에 참여합니다. 기준 가격은 $2.20이며, 12–36개월에 걸쳐 트레저리 자금이 허락하는 범위에서만 지급됩니다.

서명하기 전에 앱이 클레임 컨트랙트 `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`와 통신하는지 확인하세요. 소스 코드는 [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts)에 있습니다.

받게 되는 것은 Ethereum의 정식 XRT이며, 컨트랙트는 `0x1F752250f518e419f2F03804E25728c5C6DfF73f`입니다. [Snowbridge](https://app.snowbridge.network/send)를 통해 Polkadot에서 1:1로 브리지된 XRT입니다. 그대로 보유하거나, Uniswap에서 거래하거나, Polkadot으로 브리지할 수 있습니다. 예전 토큰을 새 토큰으로 바꿔 주는 브리지는 없습니다.

글에서 정한 마이그레이션 기간은 12개월입니다. 기간 안에 청구하지 않은 XRT는 소유권 증명과 함께 온체인 거버넌스 투표를 거쳐야만 복구할 수 있습니다. 정확한 조건은 다음 글에서 확인하세요: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/), [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

문의: Telegram 그룹 [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

XRT는 Polkadot Asset Hub에 외부 자산(foreign asset)으로 존재하며, DOT–XRT 스왑 풀도 있습니다. Asset Hub의 수수료는 XRT로 낼 수 있습니다.

Asset Hub와 Robonomics 파라체인 사이에서 XRT를 옮기는 사용자 가이드는 아직 공개되지 않았습니다.
