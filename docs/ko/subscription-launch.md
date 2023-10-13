---
title: 구독으로 시작하는 발사 방법

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  이 튜토리얼은 Robonomics Kusama 파라체인에서 구독을 사용하는 방법을 보여줍니다. [로컬 노드](/docs/run-dev-node)에서도 동일한 단계를 수행할 수 있습니다.

</robo-wiki-note>

활성 구독이 있는 경우 해당 계정의 비밀번호로 설정된 장치는 수료 없이 extrinsic을 보낼 수 있습니다. 
'launch' 명령을 보내는 방법을 시도해 봅시다.

`Developer/Extrinsics` 페이지로 이동한 다음 계정(장치 목록에서 선택한 계정)을 선택하고 `rws -> call(subscriptionId, call)`을 선택합니다. 
그런 다음 `subscriptionId` 필드에 구독의 소유자 주소(경매에 입찰한 주소)를 붙여 넣고 다음 필드에서 `launch -> launch(robot, param)`을 선택합니다. `robot` 필드에는 `launch` 트랜잭션을 보낼 주소를 입력하고 명령을 삽입합니다 (launch 명령에 대한 설명은 [여기](/docs/launch)를 참조하십시오). 그런 다음 트랜잭션을 제출하십시오:

![launch](../images/rws/launch.png)


이제 `Network/탐색하기r` 페이지로 이동하면 생성한 두 개의 이벤트인 `rws.NewCall`과 `launch.New실행`이(가) 표시됩니다.

![events](../images/rws/events.png)
