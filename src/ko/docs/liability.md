---
title: 책임
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**로봇을 경제 주체로 전환하려면 이를 위한 계약 도구가 필요합니다. Liability를 만나보세요 - 파라체인 계정 간의 계약을 구현하는 Robonomics 팔렛입니다!**

{% roboWikiNote {title:"개발 노드", type: "warning"}%} 이 튜토리얼은 로컬 Robonomics 노드에서 시연됩니다. [이 지침](/docs/run-dev-node)을 따라 자신의 노드를 설정하세요.
{% endroboWikiNote %}

## 이론 개요

이더리움 시절에는 책임 상호작용의 복잡한 구조가 있었습니다. [여기](/docs/robonomics-how-it-works)에서 확인할 수 있습니다. 요즘은 쿠사마에서 좀 더 간단해졌습니다!

### 협상

계약을 체결하려면 두 당사자가 먼저 협상해야 합니다. 이는 [IPFS PubSub](https://blog.ipfs.tech/25-pubsub/) 또는 Robonomics PubSub을 통해 수행될 수 있습니다. Robonomics PubSub을 사용한 Python 코드 샘플은 [여기](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub)에서 제공됩니다.

제안과 수요는 계약의 두 가지 주요 특성인 **작업 설명**과 **가격**을 포함하는 메시지입니다. 메시지 형식은 각 특정 응용 프로그램에 대해 사용자가 설계해야 합니다. 협상 과정에서 엄격한 형식 규칙을 따르는 것은 그다지 중요하지 않습니다. 가능한 흐름은 아래 그림에 나와 있습니다.

{% roboWikiPicture {src:"docs/liability/negotiations.jpg", alt:"negotiations"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"PubSub", type: "warning"}%} PubSub은 공개 프로토콜이므로 중요한 데이터는 전송해서는 안 됩니다. 이를 위해 다른 프로토콜을 사용해야 합니다.
{% endroboWikiNote %}

### 서명

협상이 성공적으로 완료되면 각 당사자는 서명이라는 합의서를 서명해야 합니다. 이는 계정의 개인 키로 서명된 작업 설명과 가격을 포함하는 메시지입니다. 이를 위한 [Python 도구](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability)도 있습니다.
 - 작업 설명은 **기술**이라고 불립니다. 이는 인코딩된 IPFS CID일 수 있는 32바이트 길이의 문자열입니다.
 - 가격은 **경제학**이라고 불립니다. 이는 XRT 소수 - 위너입니다. 1 위너 = 10**-9 XRT입니다.

{% roboWikiNote {title:"32 바이트", type: "note"}%} [IPFS](https://ipfs.tech/) CID를 올바른 방식으로 포맷팅된 상태로 얻을 수 있습니다. `sign_liability` 함수를 사용할 때는 해시를 변환할 필요가 없습니다. 이 작업은 자동으로 수행됩니다.{% endroboWikiNote %}

커피 예시를 따라가면:

1. 작업은 JSON입니다.
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. 해당 IPFS CID는 `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`입니다.
3. 따라서 **기술**(변환된 CID)은 `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9`입니다.
4. **경제학**은 `1.5 XRT`입니다.

서명이 완료되면 책임을 생성할 차례입니다! 이는 약속받은 측 또는 약속한 측 중 하나 또는 이른바 제공자라 불리는 3자 계정에 의해 수행될 수 있습니다.

## 책임 생성

### 준비

이 프로세스에는 적어도 두 당사자가 관여합니다. 이 예시에서는 세 명을 사용하고 별도의 제공자를 만들어 보겠습니다. 이미 어떤 식으로든 협상이 이미 진행되었다고 가정합니다.

### 1. 세 개의 계정을 생성하고 자금을 추가합니다

{% roboWikiPicture {src:"docs/liability/balances.jpg", alt:"balances"} %}{% endroboWikiPicture %}

여기서 제공자에게는 책임 extrinsic를 서명하기 위해 100 XRT를 제공했고, 약속받은 측에는 작업 비용으로 2 XRT를 지불할 수 있도록 했습니다. 약속한 측에는 (적어도 1 mXRT의 존재 보증금을 제외한) 자금이 부여되지 않았습니다.

### 1. 개발자 -> Extrinsics로 이동

{% roboWikiPicture {src:"docs/liability/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. liability -> create를 드롭다운 목록에서 선택

또한 extrinsic을 제출할 계정을 선택하고 모든 매개변수를 채웁니다.

{% roboWikiPicture {src:"docs/liability/create.jpg", alt:"create"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"서명", type: "note"}%} 여기서는 제공자를 사용하므로 참여자의 시드를 알 필요가 없습니다. 그들의 서명만 필요합니다.
{% endroboWikiNote %}

### 3. 트랜잭션 제출

{% roboWikiPicture {src:"docs/liability/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

### 4. 이벤트에서 책임 검토

이를 위해 `네트워크 -> 탐색기`로 이동하고 오른쪽에 이벤트 목록을 찾습니다. 삼각형 아이콘을 클릭하여 확장합니다.

{% roboWikiPicture {src:"docs/liability/new-liability.jpg", alt:"new-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"해시", type: "note"}%} 해당 해시는 동일한 [Python 도구](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash)를 사용하여 IPFS CID로 변환할 수 있습니다.
{% endroboWikiNote %}

### 5. 저장소 탐색

저장소 모듈 `liability`에서 책임의 일부 특성을 살펴볼 수도 있습니다.

{% roboWikiPicture {src:"docs/liability/storage-liability.jpg", alt:"storage-liability"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"다음 인덱스", type: "note"}%} `다음 인덱스` 저장소 함수는 최신 책임 인덱스 +1을 표시합니다. 따라서 `1`이라고 해도 `0`번 책임이 살펴볼 수 있습니다.
{% endroboWikiNote %}

## 보고서

커피가 만들어졌고 이제 커피 머신이 어떻게 보고해야 할지 생각해 봅시다. 여기서 책임 보고서가 등장합니다. 노동의 증거로 계정은 기존 책임을 완료할 때 보고서 내용으로 다른 IPFS CID를 추가합니다. 이는 다시 약속한 측의 서명이 필요합니다.

{% roboWikiNote {title:"보고서 서명", type: "note"}%} 서명된 메시지에는 기존 책임 인덱스와 32바이트 표현으로 인코딩된 보고서 IPFS CID가 포함됩니다. 다시 한 번 [Python 도구](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report)가 보고서 서명에 도움이 될 수 있습니다.
{% endroboWikiNote %}

커피 머신 예시를 따라가면:

1. 보고서는 JSON입니다.
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. 해당 IPFS CID는 `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`입니다.
3. 따라서 **페이로드**(변환된 CID)는 `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2`입니다.
4. **인덱스**는 `0`이며 기존 책임 인덱스입니다.

### 1. extrinsics로 이동, liability -> finalize(report)

매개변수를 채우고 extrinsic을 제출합니다. 다시 한 번, 이는 3자 계정에 의해 수행될 수 있습니다.

{% roboWikiPicture {src:"docs/liability/report.jpg", alt:"report"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"존재 보증금", type: "warning"}%} 약속한 측 계정이 "죽은" 상태가 아니어야 합니다 - 적어도 1 mXRT의 존재 보증금이 있어야 합니다.
{% endroboWikiNote %}

보고서를 서명하고 제출하세요. 완료되면 이를 이벤트에서 확인할 수 있습니다.

{% roboWikiPicture {src:"docs/liability/new-report.jpg", alt:"new-report"} %}{% endroboWikiPicture %}

### 2. 보고서 탐색

저장소에서 보고서를 확인할 수도 있습니다. `개발자 -> 저장소`로 이동하고 드롭다운 목록에서 `liability`를 선택하세요.

{% roboWikiPicture {src:"docs/liability/storage-report.jpg", alt:"storage-report"} %}{% endroboWikiPicture %}%}

### 3. 잔액 확인

사진에서 약속자가 "월급"을 받았음을 확인할 수 있습니다. 경제적 관계가 발생했습니다!

{% roboWikiPicture {src:"docs/liability/balances-2.jpg", alt:"balances-2"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"확인 중", type: "note"}%} 현재 작업이 완료되었는지 확인할 방법이 없으므로, 약속자가 보고하면 토큰이 해당 계정으로 이체됩니다.
확인 기능은 나중에 추가될 예정입니다.
{% endroboWikiNote %}