---
title: 디지털 트윈
contributors: [nakata5321, PaTara43]

도구:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**복잡한 장치나 시스템을 가지고 여러 모듈을 유지보수하고 몇 가지 계정을 사용해야 하는 상황을 상상해보세요. 이러한 모든 것들을 한 곳에 유지하거나 일부 기능을 별도의 계정으로 인코딩하거나 예를 들어 다른 정보 흐름에 대해 서로 다른 데이터 로그 소스를 설정하려면 디지털 트윈 모듈을 사용해야 합니다.**

{% roboWikiNote {title:"Dev Node", type: "warning"}%} 이와 이후의 튜토리얼은 로보노믹스 노드의 로컬 인스턴스에서 시연됩니다. 귀하의 노드를 [이 지침](/docs/run-dev-node)에 따라 설정하십시오.
{% endroboWikiNote %}

## 이론 개요
어떤 계정이든 디지털 트윈을 생성하고 관리할 수 있습니다. 트윈은 다음 내용을 가진 표로 상상할 수 있습니다:

| DT id  | 토픽 이름 	| 소스    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


여기서:
* **DT id**는 부호 없는 정수로 고유한 디지털 트윈 인덱스입니다.
* **토픽 이름**은 32바이트 길이의 hex `H256` 또는 ASCII 데이터로, [`Launch`](/docs/launch) extrinsic 매개변수와 동일합니다.
예: `0x1234....FF` 또는 `hello.parachain.robonomics.world`.
* **소스** - 어떤 계정 주소입니다.

{% roboWikiNote {title:"토픽", type: "note"}%} 이전에 논의된 대로 Launch extrinsic 개요에서 `H256`는 인코딩된 IPFS CID로 표현될 수 있습니다 ([Python 도구](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) 참조).
따라서 토픽은 트윈의 모듈 설명과 같이 데이터 저장소로 사용될 수 있습니다. {% endroboWikiNote %}


## 디지털 트윈 생성

### 1. 개발자 -> Extrinsics로 이동

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. 가능한 extrinsic 목록에서 digitalTwin -> create를 선택

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

트랜잭션을 제출합니다. 여기서 트윈을 생성하는 데 필요한 매개변수는 없습니다. 트윈은 인덱스가 부여되며 이후에는 디지털 트윈 소유자만 트윈의 토픽을 추가/수정할 수 있습니다.

트윈 ID는 Explorer 개요 페이지에서 찾을 수 있습니다.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## 토픽 추가

### 가능한 extrinsic 목록에서 digitalTwin -> setSource를 선택

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - Explorer 페이지에서 얻은 디지털 트윈 ID.
* `topic` - 이전에 논의된 `H256` 토픽 이름. 이 그림에서는 32자의 문자열입니다.
* `source` - 토픽과 연결될 계정 주소.

{% roboWikiNote {title:"덮어쓰기", type: "note"}%} 필요한 경우 토픽을 다른 소스 주소로 덮어쓸 수 있습니다.{% endroboWikiNote %}

서명하고 extrinsic을 제출합니다.

## 탐색

`개발자 -> Chain state` 저장소 모듈 `digitalTwin`에서 기존 디지털 트윈에 대한 모든 정보를 찾을 수 있습니다.

- 트윈 총 수 - `total()`;
- 디지털 트윈 소유자 - `owner(u32)`;
- 디지털 트윈의 토픽 정보 - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}