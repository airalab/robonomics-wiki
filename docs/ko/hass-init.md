---
title: 홈 어시스턴트 초기화
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
---

**홈 어시스턴트를 설치한 후 초기화해야 합니다.**

<robo-wiki-picture src="home-assistant/ha_init.png" />

홈 어시스턴트의 소유자 계정 생성으로 시작합니다. 이 계정은 관리자이며 모든 변경 사항을 수행할 수 있습니다. 웹 브라우저를 열고 `http://%RASPBERRY_IP_ADDRESS%:8123`로 이동하세요. 라즈베리 파이의 IP 주소는 [Fing 모바일 앱](https://www.fing.com/products) 또는 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용하여 확인할 수 있습니다.

<robo-wiki-note type="note">라즈베리 파이 주소는 시간이 지남에 따라 라우터 설정에 따라 변경될 수 있습니다.</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type:'mp4'}]" />

1. 첫 페이지에서 이름, 사용자 이름, 비밀번호를 입력하고 `CREATE ACCOUNT` 버튼을 클릭하세요.

2. 다음 화면에서 집 이름을 입력하고 위치와 단위 시스템을 설정하세요. 위치를 찾고 해당 위치를 기반으로 시간대와 단위 시스템을 설정하려면 `DETECT`을 클릭하세요. 위치를 보내고 싶지 않은 경우 이 값을 수동으로 설정할 수 있습니다.

3. 그 후, 홈 어시스턴트는 네트워크에서 발견한 장치를 표시합니다. 아래에 표시된 것보다 적은 항목이 표시되더라도 걱정하지 마세요. 나중에 장치를 수동으로 추가할 수 있습니다. 지금은 `FINISH`를 클릭하고 주 홈 어시스턴트 화면으로 이동하세요.

4. 마지막으로, 홈 어시스턴트 웹 인터페이스가 표시되며 모든 장치가 표시됩니다. 


## 문제 해결

1. 로컬 사용자의 로그인 또는 비밀번호를 잊어버린 경우, [이 문서](https://www.home-assistant.io/docs/locked_out/)를 확인하여 자격 증명을 복원하세요.
