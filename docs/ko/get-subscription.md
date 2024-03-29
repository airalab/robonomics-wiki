---
title: 구독 구매 방법

contributors: [LoSk-p, PaTara43]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**블록체인에서 거래에 대한 수수료를 지불하는 것은 귀찮은 일입니다. 5-10분마다 텔레메트리를 보내는 IoT 장치를 상상해보십시오. 이로 인해 한 달 동안 상당한 금액을 지불해야합니다. Robonomics Network의 주요 기능 중 하나는 RWS - Robonomics 웹 서비스 구독입니다. 매월 지불하고 거래 비용을 잊어 버리세요! 이론적 배경은 [여기](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) 기사를 참조하십시오.**

<robo-wiki-note type="warning" title="Parachain">

  Robonomics Kusama 파라체인에서 구독을 구매하는 튜토리얼을 주의 깊게 살펴보십시오. [로컬 노드](/docs/run-dev-node)에서도 동일한 단계를 수행 할 수 있습니다.

  시작하기 전에 한 가지 더. 이것은 구독을 구매하는 "어려운" 방법입니다. [Robonomics DApp](https://dapp.robonomics.network/#/)을 통해 이를 수행하는 전통적인 방법이 있습니다.

</robo-wiki-note>

## 경매에 입찰하기

Robonomics의 구독은 경매 모델로 판매됩니다. 구독을 얻으려면 경매에 입찰하고 이기면됩니다 (걱정하지 마세요, 빠릅니다).

`Developer/Chain state`에서 사용 가능한 경매를 볼 수 있습니다. 
`rws`와 `auctionQueue`를 선택하고 `+` 버튼을 누르면 사용 가능한 경매의 ID를 볼 수 있습니다:

![queue](../images/rws/queue.png)

경매에 대한 정보를 보려면 `rws` `경매`와 경매 ID를 사용하면 됩니다 (사진에서 경매 ID는 79입니다):

![auction](../images/rws/auction.png)

경매에 대한 정보에서 `winner` 필드를 볼 수 있습니다. 현재는 `null`이므로 아무도이 구독을 가지고 있지 않으며 가올 수 있습니다. 그러기 위해 `Developer/Extrinsic`로 이동하여 계정과 `rws -> bid`을 선택하십시오. 또한 경매 ID (79)와 입찰 할 단위 수를 설정하십시오 (1000000000 Wn 이상):

![bid](../images/rws/bid.png)

트랜잭션을 제출하고 ID 79의 경매에 대한 정보를 확인하십시오 (`Chain state`에서 `rws -> auction`를 선택하고 ID 79를 선택하십시오):

![win](../images/rws/auc_win.png)

이제 `winner` 필드에서 계정 주소를 볼 수 있으므로이 계정에는 구독 79가 있습니다. 경매는 첫 번째 입찰로 시작되며 몇 개의 블록 동안 지속됩니다. 따라서 다음 몇 개의 블록에서 당신보다 더 많은 토큰을 입찰하는 사람이 이길 것입니다.

이제 장치를 추가 할 수 있습니다. 장치는이 구독을 사용하고 수수료없이 외부를 제출 할 수있는 계정입니다.
테스트를 위해 토큰이없는 새 계정을 만들고 장치에 추가하십시오. 

`Developer/Extrinsic`에서 `rws -> setDevices`를 선택하여 장치를 추가하십시오. 그런 다음 `Add Item` 버튼을 누르고 토큰이없는 최근에 생성된 계정을 선택하십시오:

![set_devices](../images/rws/set_devices.png)

트랜잭션을 제출하십시오. 이제 `Chain state`에서 `rws -> devices`를 사용하여 장치 목록을 확인할 수 있습니다. 거기에서 토큰이없는 계정의 주소를 볼 수 있습다. 구독을 구매 한 계정을 선택하고 `+`를 누르십시오:

![devices](../images/rws/devices.png)

이제 구독을 사용하여 [발사](/docs/subscription-launch) 외부를 보내 볼 수 있습니다.