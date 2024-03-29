---
title: 책임
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

로봇을 경제 주체로 전환하기 위해서는 이를 위한 계약 도구가 필요합니다. Liability - Robonomics 팔렛은 파라체인 계정 간의 계약을 구현합니다!

<robo-wiki-note type="warning" title="Dev Node">

  이 튜토리얼은 Robonomics Node의 로컬 인스턴스에서 설명됩니다. [이 지침](/docs/run-dev-node)을 사용하 자체 인스턴스를 설정하세요.

</robo-wiki-note>

## 이론 개요

Ethereum에서는 책임 상호작용의 복잡한 구조가 있었습니다. [여기](/docs/robonomics-how-it-works)에서 확인할 수 있습니다. 하지만 Kusama에서는 조금 더 간단해졌습니다!

### 협상

계약을 체결하려면 양측이 먼저 협상해야 합니다. 이는 [IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) 또는 Robonomics PubSub를 포함한 여러 가지 방법으로 수행될 수 있습니다. Robonomics PubSub를 사용하는 Python 코드 샘플은 다음과 같습니다.
[여기](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub)에 제시되어 있습니다.

제안과 수요는 계약의 두 가지 주요 특성인 **작업 설명**과 **가격**을 포함하는 메시지입니다. 메시지 형식은 각 특정 응용 프로그램에 대해 사용자가 설계해야 합니다. 협상 과정에서 엄격한 형식 규칙을 따르는 것은 그다지 중요하지 않습니다. 가능한 흐름은 아래 그림에 나와 있습니다.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  PubSub은 개방형 프로토콜이므로 중요한 데이터를 전송해서는 안 됩니다. 이를 위해 다른 프로토콜을 사용해야 합니다.

</robo-wiki-note>


### 서명

협상이 성공적으로 끝나면 양측은 소위 서명이라는 합의에 서명해야 합니다. 계정의 개인 키로 서명된 **특정 형식**의 직무 설명 및 가격이 포함된 메시지입니다. 
이를 위한 [Python-Tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability)도 있습니다.
 - 작업 설명은 **기술**이라고 합니다. 이는 인코딩된 IPFS CID일 수 있는 32바이트 길이의 문자열입다.
 - 가격은 **경제학**이라고 합니다. 이는 XRT 소수점 - Weiner입니다. 1 Weiner = 10**-9 XRT입니다.

<robo-wiki-note type="note" title="32 bytes">

  [IPFS](https://ipfs.tech/) CID를 올바른 방식으로 포맷팅된 상태로 얻으려면 [Python 라이브러리](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)를 사용할 수 있습니다.
  `sign_liability` 함수를 사용할 때 해시를 변환할 필요가 없으며, 자동으로 수행됩니다.

</robo-wiki-note>

커피 예제를 따라하면서:

1. 작업은 JSON입니다.
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. 해당 작업의 IPFS CID는 `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`입니다.
3. 따라서 **기술** (변환된 CID)은 `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`입니다. 
4. **경제학**은 `1.5 XRT`입니다.

서명이 완료되면 책임을 생성할 시간입니다! 이는 약속자 또는 약속받은 측 또는 이를 위한 제3자 계정에 의해 수행될 수 있습니다.

## 책임 생성

### 준비

이전에 언급했듯이, 이 과정에는 적어도 두 가지 측이 관련됩니다. 이 예제에서는 세 가지 측을 사용하고 이를 위한 별도의 제공자를 만들어 보겠습니다. 협상이 이미 어떤 방식으로든 진행되었다고 가정합니다.

### 1. 세 개의 계정을 생성하고 자금을 추가하세요.

<robo-wiki-picture src="liability/balances.jpg" />

여기에서는 제공자에게 100 XRT를 책임 서명을 위해 제공하고, 약속받은 측에게는 작업에 대한 지불을 위해 2 XRT를 제공했습니다.
약속자에게는 자금이 부여되지 않았습니다 (최소 1 mXRT의 존재 예치금을 제외하고).

### 1. Developer -> Extrinsics로 이동하세요

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. 가능한 외부 항목 드롭다운 목록에서 liability -> create를 선택합니다.

또한 extrinsic을 제출할 계정을 선택하세요. 모든 매개변수를 입력하세요.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  여기에서는 제공자를 사용하므로 참가자의 시드를 알 필요가 없습니다. 그들의 서명만 필요합니다.

</robo-wiki-note>

### 3. 거래 제출

<robo-wiki-picture src="liability/submit.jpg" />

### 4. 이벤트에서 책임을 검토하세요.

이를 위해 `Network -> 탐색하기r`로 이동하여 오른쪽에 이벤트 목록을 찾으세요. 삼각형 아이콘을 클릭하여 확장하세요.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  해시는 동일한 [Python 도구](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash)를 사용하여 IPFS CID로 변환될 수 있습니다.

</robo-wiki-note>

### 5. 스토리지 탐색

스토리지 모듈 `liability`에서 책임의 일부 특성을 탐색할 수도 있습니다.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  `Next Index` 스토리지 함수는 최신 책임 인덱스 +1을 표시합니다. 따라서 `1`이지만 책임 `0`이 탐색됩니다.

</robo-wiki-note>

## 보고서

커피가 만들어졌고 이제 커피 머신이 어떻게 보고해야 할지 생각해보세요. 이때 책임 보고서가 등장합니다. 노동의 증거로 계정은 기존 책임을 최화할 때 다른 IPFS CID를 보고 내용으로 추가합니다. 이는 다시 약속자의 서명이 필요합니다.

<robo-wiki-note type="note" title="Report signature">

  서명된 메시지는 기존의 책임 지수와 32바이트 표현으로 인코딩된 보고서 IPFS CID를 포함합니다. 다시 말해서, [Python 도구](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report)를 사용하여 보고서에 서명하는 데 도움을 받을 수 있습니다.

</robo-wiki-note>

커피 머신 예제를 계속 사용하면서:

1. 보고서는 JSON 형식입니다.
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. 보고서의 IPFS CID는 `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`입니다.
3. 따라서 **페이로드**(변환된 CID)는 `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`입니다.
4. **인덱스**는 `0`이며, 기존의 책임 지수입니다.

### 1. extrinsics로 이동하여 liability -> finalize(report)로 이동합니다.

매개변수를 입력하고 외부 항목을 제출합니다. 이 작업은 제3자 계정을 통해 수행될 수도 있습니다.

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  promisor 계정이 "죽은" 상태가 아니어야 함에 유의하세요 - 최소 1 mXRT의 존재 예치금이 있어야 합니다.

</robo-wiki-note>

보고서에 서명하고 제출하세요. 완료되면 이벤트에서 확인할 수 있습니다.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. 보고서 탐색

저장소에서 보고서를 확인할 수도 있습니다. `Developer -> Storage`로 이동하고 드롭다운 목록에서 `liability`를 선택하세요.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. 잔액 확인

사진에서 보듯이, 현재 promisor가 "급여"를 받았습니다. 경제적인 관계가 형성되었습니다!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  현재 작업이 완료되었는지 확인할 방법은 없으므로, promisor가 보고서를 제출하면 토큰이 해당 계정으로 이체됩니다. 
  검증 기능은 향후 추가될 예정입니다.

</robo-wiki-note>