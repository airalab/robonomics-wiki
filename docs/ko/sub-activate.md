---
title: 구독 활성화
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

이 문서에서는 Robonomics 파라체인 계정을 생성하고 IoT 구독을 구매하는 방법에 대해 알아볼 것입니다. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Robonomics를 사용하여 Home Assistant를 제어하려면 Robonomics 파라체인에 2개의 계정이 필요합니다. 하나의 계정(`sub_owner`)에는 Robonomics 독을 구매해야 합니다. 두 번째 계정(`sub_controller`)은 Home Assistant의 모든 프로세스(예: 텔레메트리)를 제어하고 다른 사용자에게 액세스 권한을 부여할 것입니다. 이러한 계정들은 Home Assistant의 보안을 제공할 것입니다. 

<robo-wiki-note type="warning" title="WARNING">

두 계정 모두 **ed25519** 암호화로 생성되어야 합니다. 따라서 Polkadot-JS UI를 사용하여 계정을 생성하고 필요한 암호화를 선택해야 합니다. 

이 기능은 Polkadot-JS UI에서 기본적으로 비활성화되어 있습니다. 활성화하려면 `Settings` -> `General` -> `account options`로 이동하고 드롭다운 메뉴 `in-browser account creation`에서 `Allow local in-browser account storage`를 선택하십시오.

</robo-wiki-note>

## 소유자 및 컨트롤러 계정 생성

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. [Robonomics Parachain 앱](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)으로 이동하여 Polkadot / Substrate Portal에서 엽니다. **왼쪽 상단 모서리를 확인하여 Robonomics Parachain에 연결되었는지 확인하십시오.**

2. `Accounts` -> `Accounts`로 이동하고 `Add account` 버튼을 누릅니다. 계정 시드가 포함된 팝업 메뉴가 표시됩니다. 이 시드는 두 가지 형식으로 제공됩니다: *Mnemonic*(인간이 읽을 수 있는 형식)과 *Raw*(숫자와 문자의 연속). 

3. `Advanced creation options`를 열고 계정 생성의 암호화 유형을 `Edwards - ed25519`로 변경한 후 `Next`를 누릅니다.


4. 니모닉 시드 구문을 안전하게 저장하고 `Next`를 누니다.

5. 다음 메뉴에서 계정 이름과 비밀번호를 설정해야 합니다. 편의를 위해 `sub_owner`라는 이름을 지정하십시오. `Next`를 누릅니다.

6. 마지막 창에서 `Save`를 클릭하여 계정 생성을 완료합니다. 또한 계정을 안전하게 저장할 수 있는 백업 JSON 파일도 생성됩니다. 나중에 비밀번호를 기억한다면 이 파일을 사용하여 계정을 복구할 수 있습니다.

7. `sub_controller`라는 이름의 계정에 대해 이러한 단계를 반복합니다.


## Polkadot.js에 계정 추가

편의를 위해 [Polkadot.js 확장 프로그램](https://polkadot.js.org/extension/)을 사용하여 이러한 새로 생성된 계정을 추가해야 합니다. ed25519 계정의 경우 백업 JSON 파일만 사용할 수 있습니다. 계정을 생성할 때 저장한 파일을 사용할 수 있습니다.

계정의 백업 파일을 다시 얻으려면 계정의 세 개의 점을 클릭하고 `Create a backup file for this account`를 선택한 후 비밀번호를 입력하십시오.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. 확장 프로그램을 열고 오른쪽 상단에 있는 `+` 버튼을 누르고 `Restore account from backup JSON file`을 선택합니다.

2. 열린 창에서 JSON 파일을 업로드하고 비밀번호를 입력한 후 `Restore`를 누릅니다.

3. Polkadot.js 확장 프로그램에서 계정에 대해 Robonomics 네트워크가 선택되었는지 확인하십시오. Polkadot / Substrate Portal에서 `Setting` -> `Metadata`로 이동하고 `Update metadata` 버튼을 클릭하십시오. 

4. 팝업에서 메타데이터 업데이트를 확인하십시오. 이제 확장 프로그램에서 주소가 사용되는 네트워크의 레이블이 표시됩니다.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Robonomics 구독 활성화 

<robo-wiki-note type="okay">

이 단계에서는 `sub_owner` 계정에 충분한 양의 XRT 토큰(최소 2-3 XRT)이 있어야 합니다.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. [구독 페이지](https://dapp.robonomics.network/#/subscription)로 이동하여 Robonomics dapp에 접속하고 오른쪽 사이드바에서 계정에 연결 버튼을 누릅니다.

2. 팝업 메뉴에서 Polkadot.js 확장 프로그램에 연결합니다. 계정 주소와 잔액이 표시됩니다.

3. 구매 전에 `sub_owner` 계정을 선택했는지 확인하십시오. 주소 프로필 아이콘을 누르면 `Check owner account` 필드 아래에 `sub_owner` 계정이 표시되어야 합니다.

4. 마지막으로 `SUBMIT` 버튼을 누르고 계정의 비밀번호를 입력한 후 활성화 프로세스가 완료될 때까지 기다리십시오. 잠시 후 구독 상태가 표시됩니다.


## 구독에 계정 추가

이제 **액세스 목록**에 `sub_controller` 계정을 추가해야 합니다.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. 확장 프로그램을 열고 계정 이름 옆에 있는 아이콘을 클릭하십시오. 이렇게 하면 계정 주소가 복사됩니다.


2. 이 주소를 **Manage access** 부분의 `Robonomics parachain address` 필드에 붙여넣고 이름을 지정한 후 `+` 버튼을 누릅니다. 

3. `sub_owner` 계정에 대해 단계 1과 2를 반복합니다.

4. `Save`를 누릅니다. 팝업 창에서 `sub_owner` 비밀번호를 입력한 후 활성화 프로세스가 완료될 때까지 기다리십시오.
