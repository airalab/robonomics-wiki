---
title: Robonomics 포털에서 계정에 자금 추가하기 

contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Robonomics 포털에서 계정을 성공적으로 생성한 후에는 거래를 시작할 수 있도록 자금을 추가해야 합니다.**

<robo-wiki-note type="warning" title="Dev Node">

  이 튜토리얼 및 다음 튜토리얼은 Robonomics 노드의 로컬 인스턴스에서 보여줍니다. [이 지침](/docs/run-dev-node)을 사용하여 자신의 인스턴스를 설정하세요.

</robo-wiki-note>

## 1. Robonomics 포털의 계정 섹션으로 이동합니다.

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. 자금을 이체하려는 계정 선택하기

개발 모드에서는 개발 네트워크에서 생성된 다른 계정으로 자금을 이체할 수 있는 10000 유닛 가치의 자금을 가진 여러 계정이 존재합니다. 이러한 계정은 옆에 렌치 표시 <img alt="wrench sign" src="../images/adding-funds/wrench.png" width="20" />로 표시됩니다.

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- 예를 들어 BOB에서 자금을 이체하려는 계정의 "send" 버튼을 클릭하세요.

## 3. 자금을 이체하려는 계정 선택하기
"send" 버튼을 클릭한 후에는 "send funds window"이 표시됩니다. 표시된 창에서:

- 사용 가능한 계정 목록에서 자금을 보내려는 계정을 선택하세요.
- 보내려는 유닛 수를 입력하세요.
- "make transfer"을 누르세요.

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. 거래 승인하기

이전 단계에서 "make transfer"을 누른 후에는  "authorize transaction window"이 표시됩니다.<br/>
거래의 세부 정보를 검토한 후에 "sign and submit" 버튼을 클릭하세요.

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")
이 예제에서는 "BOB"에서 "EMPLOYER"로 500 유닛의 자금을 이체했습니다. 초기에 자금이 없던 EMPLOYER의 계정에는 이제 500 유닛의 자금이 있음을 확인할 수 있습니다.

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**플레이그라운드에서 사용하려는 계정에 충분한 자금이 있는지 확인하세요.**