---
title: 로보노믹스 포털에서 계정에 자금 추가하기

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**로보노믹스 포털에 계정을 성공적으로 생성한 후에는 거래를 시작할 수 있도록 자금을 추가해야 합니다.**

{% roboWikiNote {title: 'Dev Node', type: "warning"} %}이와 이후의 튜토리얼은 로보노믹스 노드의 로컬 인스턴스에서 시연됩니다. [이 지침](/docs/run-dev-node)을 따라 자신의 노드를 설정하세요.
{% endroboWikiNote %}

## 1. 로보노믹스 포털의 계정 섹션으로 이동

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. 자금 이체를 원하는 계정 선택

개발 모드에서는 개발 네트워크에서 생성된 다수의 계정이 있으며 각각 10000 단위의 자금이 있어 다른 계정으로 자금을 이체할 수 있습니다. 이러한 계정은 옆에 렌치 표시 <img src="/assets/images/docs/adding-funds/wrench.png" alt="wrench sign" width="20"/>이 표시됩니다.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- 예를 들어 BOB에서 자금을 이체하려는 경우 "send" 버튼을 클릭하세요.

## 3. 자금을 이체할 계정 선택

"send" 버튼을 클릭한 후 "자금 이체 창"이 표시됩니다. 이 창에서:

- 사용 가능한 계정 목록에서 자금을 이체하려는 계정을 선택하세요.
- 보내려는 단위 수를 입력하세요.
- "이체 생성"을 누르세요.

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}

## 4. 거래 승인

이전 단계에서 "이체 생성"을 누른 후 "거래 승인 창"이 표시됩니다.<br/>
거래 세부 정보를 검토한 후 "서명 및 제출" 버튼을 클릭하세요.

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

이 예에서는 "BOB"에서 "EMPLOYER"로 500 단위의 자금을 이체했습니다. 초기에 자금이 없던 EMPLOYER의 계정에는 이제 500 단위의 자금이 있는 것을 확인할 수 있습니다.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**플레이그라운드에서 사용하려는 계정에 충분한 자금이 있는지 확인하세요.**