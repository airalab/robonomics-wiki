---
title: 디지털 트윈
contributors: [nakata5321, PaTara43]

tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---
  
**여러 모듈을 유지 관리하고 몇 가지 계정 사용해야 하는 복잡한 장치나 시스템을 상상해보세요. 이 모든 것을 한 곳에 유지하거나 별도의 계정으로 일부 기능을 인코딩하거나 예를 들어 다른 정보 흐름에 대해 다른 데이터로그 소스를 설정하려면 디지털 트윈 모듈을 사용해야 합니다.**

<robo-wiki-note type="warning" title="Dev Node">

  이 튜토리얼 및 다음 튜토리얼은 Robonomics 노드의 로컬 인스턴스에서 보여줍니다. [이 지침](/docs/run-dev-node)을 사용하여 자신의 인스턴스를 설정하세요.

</robo-wiki-note>

## 이론 개요
어떤 계정이든 디지털 트윈을 생성하고 관리할 수 있습니다. 트윈은 다음 내용을 포함하는 테이블로 상상할 수 있습니다:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


여기서:
* **DT id**는 부호 없는 정수로 고유한 디지털 트윈 인덱스입니다.
* **Topic name** is a hex `H256` or ASCII data of 32 bytes length, same as [`실행`](/docs/launch) extrinsic parameter. 
예를 들어: `0x1234....FF` 또는 `hello.parachain.robonomics.world`입니다.
* **Source** - 는 어떤 계정 주소입니다.

<robo-wiki-note type="note" title="Topics">

  이전에 외부 개요 실행에서 논의한 대로 `H256`은 인코딩된 IPFS CID로 표시될 수 있습니다([Python 도구](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)). 따라서 주제는 Twin의 모듈 설명과 같은 일부 데이터 저장소로도 사용될 수 있습니다.

</robo-wiki-note>


## 디지털 트윈 생성하기

### 1. 개발자 -> Extrinsics로 이동하기

<robo-wiki-picture src="digital-twin/extrinsics.jpg" />

### 2. 드롭다운 목록에서 digitalTwin -> create를 선택하기

<robo-wiki-picture src="digital-twin/twin-create.jpg" />

트랜잭션 제출하기. 여기서는 트윈을 생성하기 위해 매개변수가 필요하지 않습니다. 트윈은 인덱스가 부여되며 이후로는 디지털 트윈 소유자만 트윈의 주제를 추가/수정할 수 있습니다.

트윈 ID는 탐색기 개요 페이지에서 찾을 수 있습니다.

<robo-wiki-picture src="digital-twin/create-log.jpg" />

## 주제 추가하기

### 드롭다운 목록에서 digitalTwin -> setSource를 선택하기

<robo-wiki-picture src="digital-twin/set-topic.jpg" />

* `id` - 탐색기 페이지에서 얻은 디지털 트윈 ID.
* `topic` - 이전에 논의한 `H256` 주제 이름입니다. 이 그림에서는 32자리 문자열입니다.
* `source` - 주제와 연결할 계정 주소입니다.

<robo-wiki-note type="note" title="Overwrite">

  주제가 필요한 경우 다른 소스 주소로 덮어쓸 수 있습니다.

</robo-wiki-note>

extrinsic에 서명하고 제출하세요.

## 탐색하기

`Developer -> Chain state` 스토리지 모듈 `digitalTwin`에서 기존 디지털 트윈에 대한 모든 정보를 찾을 수 있습니다.

- 총 트윈 수 - `total()`;
- 디지털 트윈 소유자 - `owner(u32)`;
- 디지털 트윈의 주제에 대한 정보 - `digitalTwin(u32)`.

<robo-wiki-picture src="digital-twin/chain-state.jpg" />