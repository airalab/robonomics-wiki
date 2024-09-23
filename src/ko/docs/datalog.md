---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**이제 계정에 일부 자금이 있으므로 extrinsics를 제출할 수 있습니다. 먼저 시도해 볼 것은 Datalog입니다. 이를 통해 블록체인에 데이터를 영구적으로 저장할 수 있습니다. 분산 및 암호화된 데이터 저장소를 상상해보세요. 이것이 그것입니다!**

{% roboWikiNote {type: "warning", title: "Dev Node"}%}이와 다음 튜토리얼은 로보노믹스 노드의 로컬 인스턴스에서 보여집니다. [이 지침](/docs/run-dev-node)을 사용하여 자신의 노드를 설정하십시오.
{% endroboWikiNote %}


## 1. 개발자 -> Extrinsics로 이동

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. 가능한 extrinsics의 드롭다운 목록에서 datalog -> record를 선택

또한 extrinsic을 제출할 계정을 선택하십시오. 레코드 필드를 채우십시오.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "대량의 데이터"}%} Datalog은 최대 512바이트의 문자열을 지원합니다. 대량의 데이터를 저장하려면 [IPFS](https://ipfs.tech/)를 사용할 수 있습니다.
{% endroboWikiNote %}

## 3. 트랜잭션 제출

확장 프로그램이나 DApp을 사용하여 이전에 생성한 계정으로 트랜잭션을 서명하고 제출하십시오.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "삭제"}%} *datalog -> erase* 호출로 모든 레코드를 삭제할 수도 있습니다.
{% endroboWikiNote %}

## 4. 저장소에서 datalog 검토

이를 위해 *개발자 -> Chain state*로 이동하여 *datalog -> datalogIndex*를 선택하고 계정을 지정한 다음 "+" 버튼을 눌러 계정의 레코드 인덱스를 가져와 필요한 레코드를 *datalog -> datalogItem*으로 탐색하십시오.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "탐색기"}%} 모든 이벤트는 *탐색기*의 이벤트 플로우에서 볼 수 있으며 datalog 레코드도 확인할 수 있습니다.
{% endroboWikiNote %}