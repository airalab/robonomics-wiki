---
title: XRT와 거버넌스
contributors: [Leemo94, ensrationis]
---

XRT는 Robonomics 네트워크의 토큰입니다. 클라우드 이용료를 내고, 네트워크를 어떻게 바꿀지 투표할 때 XRT를 사용합니다. 이 페이지에서는 두 가지를 모두 다룹니다.

## XRT의 용도

- **수수료.** 모든 트랜잭션은 XRT로 수수료를 냅니다. 수수료와 팁은 모두 콜레이터 풀로 들어갑니다.
- **구독.** 현재의 구독(RWS)은 경매로 얻으며, 낙찰된 입찰 금액은 소각됩니다. [레거시 팔레트](/docs/legacy-pallets/#rws-subscriptions)를 참고하세요.
- **투표.** XRT 보유자가 국민투표의 결과를 정합니다.
- **콜레이터 본드.** 콜레이터 후보는 XRT를 본딩합니다. [콜레이터 운영](/docs/run-collator/)을 참고하세요.

## 단위와 공급량

- XRT는 소수점 9자리입니다. 1 XRT = 1,000 Glushkov (mXRT) = 1,000,000 Coase (µXRT).
- 존재 예치금은 1 Coase, 즉 0.000001 XRT입니다.
- 런타임은 블록마다 블록 생성자에게 콜레이터 보상으로 0.0042 XRT를 발행합니다. 토크노믹스는 콜레이터 발행량을 연간 최대 25,000 XRT로 제한합니다.
- 토크노믹스상 총 공급량 상한은 5,100,000 XRT입니다. 배분과 토큰의 생애 주기는 [토크노믹스 페이지](https://robonomics.network/tokenomics/)에 있습니다.

XRT는 Ethereum과 Polkadot Asset Hub에도 있습니다. [다른 네트워크의 XRT](/docs/xrt-migration/)를 참고하세요.

## 거버넌스

Robonomics는 표준 Polkadot OpenGov를 사용합니다. Sudo 키는 없습니다. 런타임 52(2026년 10월)부터 런타임 업그레이드를 포함한 모든 특권 변경에는 국민투표가 필요합니다. Sudo 자체도 국민투표로 제거되었습니다. 카운슬, 펠로우십, 트레저리 트랙은 없습니다.

국민투표는 두 가지 기준을 동시에 충족해야 통과합니다.

- **Approval(찬성률)**: 행사된 표 중 "찬성"의 비율.
- **Support(지지율)**: 전체 XRT 중 "찬성"에 투표한 XRT의 비율.

두 기준 모두 높게 시작해서 결정 기간 동안 점점 낮아집니다. 국민투표가 통과하고 확인 기간 동안 그 상태를 유지하면 호출이 실행됩니다.

### 트랙

| | Root | Whitelisted Caller |
|---|---|---|
| 용도 | 런타임 업그레이드와 그 밖의 모든 특권 호출: 콜레이터 본드와 제한, RWS 경매, 설정 | Core Team이 화이트리스트에 올린 특정 호출 하나를 위한 빠른 트랙 |
| 동시에 결정 중인 국민투표 수 | 1 | 10 |
| 결정 예치금 | 5,000 XRT | 1 XRT |
| 준비 기간 | 12시간 | 5분 |
| 결정 기간 | 14일 | 3일 |
| 확인 기간 | 24시간 | 20분 |
| 최소 실행 지연 | 1시간 | 5분 |
| 찬성률 | 결정 기간 동안 90% → 51% | 99% → 80% |
| 지지율 | 50% → 15% | 2% → 1% |

현재 런타임의 값입니다. 바꾸려면 Root 국민투표가 필요합니다.

### 기타 예치금

- **제출 예치금:** 10 XRT. 어떤 계정이든 국민투표를 제출할 수 있습니다.
- **프리이미지(preimage) 예치금:** 100 XRT에 호출 1바이트당 0.00001 XRT가 더해집니다. 런타임 코드에서 이 값은 임시값으로 표시되어 있으므로 바뀔 수 있습니다.
- 14일 안에 결정 단계에 들어가지 못한 국민투표는 시간 초과로 종료됩니다.

### Core Team과 화이트리스트

Core Team은 최대 7명으로 구성된 작은 그룹입니다. 구성원은 Root 국민투표로만 바꿀 수 있습니다.

화이트리스트는 다음과 같이 동작합니다.

1. Core Team이 특정 호출 하나의 해시를 화이트리스트에 올리는 투표를 합니다. 전체 구성원의 절반 이상이 동의해야 합니다. Core Team 발의는 3일 동안 유지됩니다.
2. 화이트리스트에 올린다고 무언가 실행되지는 않습니다. 그 호출은 여전히 Whitelisted Caller 트랙의 국민투표를 거쳐야 합니다.
3. 화이트리스트에 없는 호출은 빠른 트랙으로 통과할 수 없습니다. Root 트랙으로는 여전히 진행할 수 있습니다.

따라서 특권 변경을 하는 방법은 두 가지입니다. Root 국민투표, 또는 화이트리스트에 오른 호출과 빠른 국민투표입니다. 어느 쪽이든 마지막은 XRT 보유자의 투표입니다.

<div id="how-to-propose-a-change"></div>

## 변경 제안 방법

팀이 공개한 절차:

1. [airalab/robonomics](https://github.com/airalab/robonomics/issues)에 이슈를 열어 아이디어를 설명합니다.
2. Robonomics 네트워크에 연결한 Polkadot.js Apps의 Governance 섹션에서 국민투표를 제출합니다.
3. 커뮤니티에 알립니다.

온체인에서 일어나는 일:

1. 호출이 프리이미지로 저장됩니다(프리이미지 예치금).
2. 국민투표가 트랙에 제출됩니다(제출 예치금 10 XRT).
3. 누군가 결정 예치금을 냅니다. Root는 5,000 XRT, Whitelisted Caller는 1 XRT입니다. 누구나 낼 수 있습니다.
4. 준비 기간이 지나고, 결정 예치금이 들어와 있고, 트랙에 빈자리가 있으면 국민투표가 결정 단계에 들어갑니다. 그다음 결정 기간 안에 투표로 결과가 정해집니다.

## 투표 방법

- XRT를 Robonomics 네트워크의 본인 지갑에 보관하세요. 거래소에 있는 토큰으로는 투표할 수 없습니다.
- 확신도(conviction)를 걸어 투표하세요. XRT를 더 오래 잠글수록 표의 가중치가 커집니다.

| 잠금 기간 | 투표 가중치 |
|---|---|
| 잠금 없음 | 0.1× |
| 7일 | 1× |
| 14일 | 2× |
| 28일 | 3× |
| 56일 | 4× |
| 112일 | 5× |
| 224일 | 6× |

- 직접 투표하는 대신 투표권을 다른 계정에 위임할 수도 있습니다.

진행 중인 국민투표와 지난 국민투표는 [Robonomics RPC](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer)에 연결한 Polkadot.js Apps의 Governance 섹션에서 볼 수 있습니다.

## 더 읽어보기

- [Robonomics 5.0: XRT 보유자에게 열쇠를 넘기다](https://robonomics.network/blog/robonomics-5-0-governance/)
- [Sudo 제거: 이제 Robonomics 클라우드는 커뮤니티가 운영합니다](https://robonomics.network/blog/robonomics-5-0-sudo-removed/)
- [두 트랙 설계에 대한 포럼 토론](https://forum.polkadot.network/t/robonomics-replacing-sudo-with-a-two-track-opengov-sized-for-a-small-community/18719)
