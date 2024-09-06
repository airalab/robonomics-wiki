---
title: 구독과 함께 발사 명령 보내는 방법

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"패러체인", type: "warning"}%}이 튜토리얼은 Robonomics Kusama 패러체인에서 구독을 사용하는 방법을 보여줍니다. [로컬 노드](/docs/run-dev-node)에서도 동일한 단계를 수행할 수 있습니다. {% endroboWikiNote %}


만약 귀하의 주소에 활성 구독이 있다면, 해당 계정의 시크릿을 사용하여 설정된 장치는 수수료 없이 extrinsics를 보낼 수 있습니다.
`launch` 명령을 보내보겠습니다.

`개발자/Extrinsics` 페이지로 이동한 다음, 귀하의 계정(장치 목록에서 선택한 계정)을 선택하고 `rws -> call(subscriptionId, call)`을 선택합니다.
그런 다음 `subscriptionId` 필드에 구독 소유자 주소(경매에 입찰한 사람)를 붙여넣고 다음 필드에
`launch -> launch(robot, param)`을 선택합니다. `robot` 필드에는 `launch` 트랜잭션을 보내고 싶은 주소를 입력하고 명령을 삽입합니다 (launch 명령 설명은 [여기](/docs/launch)를 참조하십시오). 그런 다음 트랜잭션을 제출하십시오:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}


이제 `네트워크/탐색기` 페이지로 이동하면 `최근 이벤트` 영역에 생성한 두 가지 이벤트인 `rws.NewCall`과 `launch.NewLaunch`이 표시됩니다.

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}