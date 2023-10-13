---
title: SDS011 센서 연결 방법

contributors: [tubleronchik]
---

** 로보노믹스 센서 네트워크에 센서를 연결하는 방법에 대한 단계별 안내서입니다. 저희 센서는 sensor.community 펌웨어의 향상된 버전인 로보노믹스 펌웨어를 사용합니다. 추가적인 센서가 포함되어 있으며 수정된 데이터 전송 메커니즘을 갖고 있습니다. **

1. 센서를 소켓에 연결하여 전원을 공급합니다.
2. 보드는 `RobonomicsSensor-xxxxxxxxx`라는 Wi-Fi 네트워크를 생성합니다. 휴대폰이나 컴퓨터에서 해당 네트워크에 연결하세요. 인증 창이 표시됩니다 (표시되지 않으면 브라우저를 열고 `192.168.4.1`로 이동하세요).
3. 목록에서 Wi-Fi 네트워크를 선택하거나 목록에 없는 경우 직접 입력하고 암호 필드를 작성하세요.
<robo-wiki-note type="okay" title="INFO">
센서는 2.4GHz Wi-Fi 네트워크에만 연결할 수 있습니다.
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. 센서를 설치할 위치의 좌표를 작성하세요. 지도에서 얻을 수 있거나 [이 링크](https://www.latlong.net/convert-address-to-lat-long.html)를 사용하여 주소에서 얻을 수 있습니다.
<robo-wiki-note type="warning" title="WARNING">
센서 좌표는 공개적으로 사용 가능한 지도에 표시됩니다. 개인 정보를 공개하지 않으려면 정확하지 않은 좌표를 작성하세요.
</robo-wiki-note> 
5. `Save configuration and restart`을 클릭하세요. 보드가 재부팅되고 지정된 Wi-Fi 네트워크에 연결됩니다.
6. [로보노믹스 센서 맵](https://sensors.robonomics.network/#/)을 열고 센서를 설치한 위치를 찾으세요. 몇 분 후에 지도에서 데이터와 함께 센서를 확인할 수 있습니다.
<robo-wiki-picture src="sds-sensor-map.png"/>

