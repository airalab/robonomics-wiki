---
title: 글로벌 관리

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**이 문서에서는 Home Assistant에 새 사용자를 설정하는 방법을 안내합니다.**

## 구독에 사용자 추가하기

Home Assistant를 처음 시작할 때 생성한 계정은 `SUB_OWNER` 및 `SUB_CONTROLLER`가 보안을 제공하기 때문에 사용할 수 없습니다. Robonomics Parachain 계정이 없는 첫 번째 사용자니다.

1. [이전 문서](/docs/sub-activate/)에서와 같이 Robonomics Parachain에 계정을 생성하세요.

2. `SUB_OWNER` 계정을 사용하여 [dapp](https://dapp.robonomics.network/#/subscription/devices)에서 구독에 새 사용자 계정을 추가하세요. 이제 액세스 목록에는 `SUB_OWNER`, `SUB_CONTROLLER` 및 `USER` 세 개의 주소가 있어야 합니다.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## 사용자에게 액세스 권한 부여하기

1. [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant)라는 dapp 서비스로 이동하세요. 오른쪽 사이드바에서 방금 생성한 계정을 선택하세요 (프로필 아이콘을 눌러 의도한 계정을 선택했는지 확인하세요).

2. 필요한 필드에 `USER` 시드를 입력하세요. 관리자 크레딧 필드에 `SUB_OWNER` 및 `SUB_CONTROLLER` 주소를 추가하세요. 모든 것이 올바르면 확인 상태가 `VERIFIED`로 표시됩니다.

3. 방금 등록한 새 사용자를 위해 비밀번호를 생성한 다음 거래를 확인하세요. 이제 구독으로 인해 수수료가 없는 거래입니다. 나중에 복구 탭에서 비밀번호를 복원할 수 있습니다.

4. 등록 프로세스가 완료되면 새로 생성한 비밀번호로 Home Assistant에 로그인하세요.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

이제 Robonomics를 통해 집을 제어하기 위해 dapp을 사용할 수 있으며, [**"스마트 홈 텔레메트리 가져오기"**](/docs/smart-home-telemetry/) 문서를 확인하세요.

## 문제 해결

1. Robonomics 계정에서 홈어시스턴트 비밀번호를 잊어버린 경우 [Dapp을 확인하세요.](https://dapp.robonomics.network/#/home-assistant)
"Your Home Assistant password" 부분으로 이동하여 "Restore" 탭을 선택하세요.
