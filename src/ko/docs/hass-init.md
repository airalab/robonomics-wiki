---
title: 홈 어시스턴트 초기화
contributors: [nakata5321, PaTara43]
tools:
  - 홈 어시스턴트 2024.5.4
    https://github.com/home-assistant/core
---

**홈 어시스턴트를 설치한 후 초기화해야 합니다.**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

홈 어시스턴트의 소유자 계정을 생성하는 것으로 시작합니다. 이 계정은 관리자이며 모든 변경 사항을 가할 수 있습니다.
웹 브라우저를 열고 `http://%PC_IP_ADDRESS%:8123`로 이동합니다. 라즈베리 파이의 IP 주소는 [Fing 모바일 앱](https://www.fing.com/products)이나 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용하여 확인할 수 있습니다.
PC에서 모든 것을 설정했다면 `http://localhost:8123`을 사용합니다.

{% roboWikiNote {type: "note"}%} IP 주소는 시간이 지남에 따라 변경될 수 있습니다. 라우터 설정에 따라 다를 수 있습니다. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 첫 페이지에서 이름, 사용자 이름, 비밀번호를 입력하고 `계정 생성` 버튼을 클릭합니다.

2. 다음 화면에서 집 이름을 입력하고 위치 및 단위 시스템을 설정합니다. `DETECT`를 클릭하여 위치를 찾고 해당 위치를 기반으로 시간대와 단위 시스템을 설정합니다. 위치를 보내고 싶지 않다면 이 값을 수동으로 설정할 수 있습니다.

3. 그 후, 홈 어시스턴트는 네트워크에서 발견한 장치를 표시합니다. 아래에 표시된 것보다 적은 항목이 표시된다면 걱정하지 마세요. 나중에 수동으로 장치를 추가할 수 있습니다. 지금은 `완료`를 클릭하고 메인 홈 어시스턴트 화면으로 이동합니다.

4. 마지막으로, 홈 어시스턴트 웹 인터페이스가 표시되며 모든 장치가 표시됩니다.


## 문제 해결

1. 로컬 사용자의 로그인 또는 비밀번호를 잊어버린 경우, 자격 증명을 복원하려면 [이 문서](https://www.home-assistant.io/docs/locked_out/)를 확인하세요.