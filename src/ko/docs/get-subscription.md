---
title: 구독 구매 방법

contributors: [LoSk-p, PaTara43]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**블록체인 거래 수수료를 지불하는 것은 귀찮은 일입니다. 매 5-10분마다 텔레메트리를 보내는 IoT 장치를 상상해보십시오. 이렇게 하면 한 달 동안 상당한 금액을 지불해야 합니다. Robonomics Network의 주요 기능 중 하나는 RWS - Robonomics 웹 서비스 구독입니다. 매월 지불하고 거래 비용을 잊어버리세요! 이론적 배경은 [여기](https://blog.aira.life/rws-overview-part-2-heterogeneous-tokenomics-afc209cc855) 기사를 참조하십시오.**


{% roboWikiNote {title:"패러체인", type: "warning"}%}   이 튜토리얼은 Robonomics Kusama 패러체인에서 구독을 구매하는 방법을 보여줍니다. [로컬 노드](/docs/run-dev-node)에서도 동일한 단계를 수행할 수 있습니다.
시작하기 전에 한 가지 더 알아두세요. 이것은 구독을 구매하는 "어려운" 방법입니다. [Robonomics DApp](https://dapp.robonomics.network/#/)을 통해 일반적인 방법으로도 할 수 있습니다.
{% endroboWikiNote %}

## 경매 입찰

Robonomics의 구독은 경매 모델로 판매됩니다. 구독을 얻으려면 경매에 입찰하고 낙찰해야 합니다 (걱정하지 마세요, 빠릅니다).

`Developer/Chain state`에서 사용 가능한 경매를 볼 수 있습니다.
`rws`와 `auctionQueue`를 선택하고 `+` 버튼을 누르면 사용 가능한 경매의 ID를 볼 수 있습니다:

{% roboWikiPicture {src:"docs/rws/queue.png", alt:"queue"} %}{% endroboWikiPicture %}

`rws` `auction` 및 경매 ID로 어떤 구독에 대한 정보를 볼 수 있습니다 (사진에서의 경매 ID는 79입니다):

{% roboWikiPicture {src:"docs/rws/auction.png", alt:"auction"} %}{% endroboWikiPicture %}

경매에 대한 정보에서 `winner` 필드를 볼 수 있습니다. 현재는 `null`이므로 아무도 이 구독을 소유하고 있지 않으며 구매할 수 있습니다. 이를 위해 `Developer/Extrinsic`로 이동하여 계정을 선택하고 `rws -> bid`를 선택하십시오. 또한 경매 ID(79)와 입찰할 단위 수(1000000000 Wn 이상)를 설정하십시오:

{% roboWikiPicture {src:"docs/rws/bid.png", alt:"bid"} %}{% endroboWikiPicture %}

거래를 제출하고 ID 79의 경매 정보를 확인하십시오 (`Chain state`에서 `rws -> auction` 및 ID 79를 선택하십시오):

{% roboWikiPicture {src:"docs/rws/auc_win.png", alt:"auc_win"} %}{% endroboWikiPicture %}

이제 `winner` 필드에 계정 주소가 표시됩니다. 이는 해당 계정이 구독 79를 소유하고 있다는 것을 의미합니다. 경매는 첫 입찰으로 시작하여 몇 블록 동안 지속되므로 다음 몇 블록 동안 다른 사람이 당신보다 더 많은 토큰을 입찰하면 그 사람이 승자가 되어 구독을 가져갑니다.

이제 장치를 추가할 수 있습니다. 장치는 이 구독을 사용하고 수수료 없이 extrinsic을 제출할 수 있는 계정입니다.
테스트를 위해 토큰이 없는 새 계정을 만들고 장치로 추가할 수 있습니다.

장치를 추가하려면 `Developer/Extrinsic`에서 `rws -> setDevices`를 선택하십시오. 그런 다음 `Add Item` 버튼을 누르고 토큰이 없는 최근에 생성된 계정을 선택하십시오:

{% roboWikiPicture {src:"docs/rws/set_devices.png", alt:"set_devices"} %}{% endroboWikiPicture %}

거래를 제출하십시오. 이제 `Chain state`에서 `rws -> devices`를 사용하여 장치 목록을 확인할 수 있습니다. 거기에는 토큰이 없는 계정의 주소가 표시됩니다. 구독을 구매한 계정을 선택하고 `+`를 누르십시오:

{% roboWikiPicture {src:"docs/rws/devices.png", alt:"devices"} %}{% endroboWikiPicture %}

이제 구독을 사용하여 [발사 extrinsic을 보낼](/docs/subscription-launch) 수 있습니다.