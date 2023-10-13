---
title: 시작
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Robonomics 파라체인의 또 다른 기본 기능은 시작 팔레트입니다. 이를 통해 계정/그 뒤에 있는 모든 개체에 명령을 보낼 수 있습니다. 이 명령에는 실행할 작업을 지정하는 매개변수가 포함됩니다.**

<robo-wiki-note type="warning" title="Dev Node">

  이와 다음 튜토리얼은 Robonomics 노드의 로컬 스턴스에서 설명됩니다. [이 지침](/docs/run-dev-node)을 사용하여 자신의 인스턴스를 설정하세요.

</robo-wiki-note>

## 1. Developer -> Extrinsics 이동하세요

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. 가능한 엑스트린식 목록의 드롭다운 목록에서 launch -> launch 선택하세요

또한 엑스트린식을 제출할 계정을 선택하세요. 대상 주소와 매개변수 필드를 작성하세요.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  실행는 32바이트 길이의 문자열을 명령으로 지원합니다([출처](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)).
  그래서 여기서 즉흥적으로 할 수 있는 여지가 있습니다:
  - 토글과 같은 기본 명령의 경우 "0x000000000000000000000000000000000000000000000000000000000000001"을 사용할 수 있습니다.
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - json과 같은 고급 명령의 경우 [IPFS](https://ipfs.tech/) 형식의 CID를 사용할 수 있습니다.
  [적절한 방법](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).

</robo-wiki-note>

## 3. 거래 제출

<robo-wiki-picture src="launch/submit.jpg" />

## 4. 이벤트에서 시작 내용 검토

이를 위해 *Network -> 탐색하기r*로 이동하여 오른쪽에서 이벤트 목록을 찾으세요. 확장하려면 삼각형 아이콘을 클릭하세요.

<robo-wiki-picture src="launch/event.jpg" />
