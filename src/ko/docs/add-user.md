---
title: 사용자 추가

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**이 문서에서는 홈 어시스턴트에 새 사용자를 설정하는 방법을 안내합니다.**

## 구독에 사용자 추가

이전에 생성된 계정을 사용할 수 없습니다. 왜냐하면 `OWNER`와 `CONTROLLER`가 보안을 제공하며, 홈 어시스턴트를 처음 시작할 때 만든 첫 번째 사용자는 Robonomics Parachain 계정이 없기 때문입니다.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. [이전 문서](/docs/sub-activate/)에서 한 것처럼 Robonomics 파라체인에 계정을 생성합니다.

2. `OWNER` 계정을 사용하여 [Robonomics DApp](https://robonomics.app/#/rws-setup)의 `SETUP A SUBSCRIPTION` 페이지에서 새 사용자 계정을 구독에 추가합니다. 이제 `USERS IN SUBSCRIPTION` 섹션에는 액세스 목록에 세 개의 주소가 있어야 합니다: `OWNER`, `CONTROLLER`, `USER`.


## RWS 설정 JSON 파일

먼저, 사용자는 RWS 설정 정보가 포함된 JSON 파일을 가져와야 합니다.

### RWS 설정 JSON 생성

관리자는 [SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup) 페이지에서 `Download import for other users` 버튼을 사용하여 자신의 설정에 대한 JSON 파일을 생성할 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### RWS 설정 가져오기

이제 이 JSON 파일을 사용자는 `IMPORT SETUP` 버튼을 사용하여 RWS 설정을 가져올 수 있습니다.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## 사용자에게 액세스 권한 부여

동일한 페이지([SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup))에서 새 사용자를 위한 비밀번호를 설정할 수 있습니다.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 오른쪽 사이드바에서 방금 생성한 계정을 선택합니다 (원하는 계정을 선택했는지 프로필 아이콘을 눌러 확인합니다).

2. 필요한 필드에 `USER`의 주소와 시드 구문을 입력합니다.

3. 비밀번호를 입력하고 이제 구독으로 인해 수수료가 없어진 `CREATE PASSWORD` 버튼을 눌러 트랜잭션을 확인합니다.

4. 등록 프로세스를 완료한 후, 사용자 주소로 로그인하고 새로 생성된 비밀번호로 홈 어시스턴트에 로그인합니다.

이제 Robonomics를 통해 집을 제어할 수 있는 dapp을 사용할 수 있으며, [**"스마트 홈 텔레메트리 가져오기"**](/docs/smart-home-telemetry/) 문서를 확인할 수 있습니다.