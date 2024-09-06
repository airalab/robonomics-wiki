---
title: Launch
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**로보노믹스 파라체인의 또 다른 기본 기능은 런치 팔렛입니다. 이를 통해 계정/그 뒤에 숨겨진 엔티티에 명령을 보낼 수 있습니다. 이 명령에는 실행할 작업을 지정하는 매개변수가 포함됩니다.**

{% roboWikiNote {title:"개발 노드", type: "경고"}%} 이와 다음 튜토리얼은 로보노믹스 노드의 로컬 인스턴스에서 시연됩니다. [이 지침](/docs/run-dev-node)을 따라 자신의 노드를 설정하세요.
{% endroboWikiNote %}

## 1. 개발자 -> 엑스트린직스로 이동

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. 런치 -> 런치를 가능한 엑스트린직스의 드롭다운 목록에서 선택

또한 엑스트린직스를 제출할 계정을 선택하세요. 대상 주소와 매개변수 필드를 채워 넣으세요.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"launch"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32바이트", type: "노트"}%}   런치는 32바이트 길이의 문자열을 명령으로 지원합니다 ([출처](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  따라서 여기에 창의성을 발휘할 수 있습니다:
  - 토글링과 같은 기본 명령에는 "0x0000000000000000000000000000000000000000000000000000000000000001" 또는
  "0x0000000000000000000000000000000000000000000000000000000000000000"을 사용할 수 있습니다.
  - IPFS CID 형식으로 포맷된 [올바른 방법](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes)으로 구성된 json과 같은 고급 명령에는 IPFS를 사용할 수 있습니다.
{% endroboWikiNote %}

## 3. 트랜잭션 제출

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

## 4. 이벤트에서 런치 검토

이를 위해 *네트워크 -> 탐색기*로 이동하여 오른쪽에 이벤트 목록을 찾으세요. 확장하려면 삼각형 아이콘을 클릭하세요.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"event"} %}{% endroboWikiPicture %}
