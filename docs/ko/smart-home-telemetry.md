---
title: 스마트 홈 텔레메트리 가져오기

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**이 문서에서는 스마트 홈 장치의 텔레메트리를 조회하는 Robonomics 서비스를 사용합니다.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmao9RoWcKo2qs4PAGtm5gqHzyAHJcpDqNLgciU35FJeVm', type:'mp4'}]" />

1. Dapp으로 이동하여 [스마트홈 텔레메트리](https://dapp.robonomics.network/#/smarthome-telemetry) 서비스를 선택하십시오.

2. 컨트롤러 필드에 `SUB_CONTROLLER` 주소를 입력하십시오. 데이터를 암호화하기 위해 시드 구문을 삽입하십시오.

3. `Get telemetry` 블록에서 드롭다운 목록에서 타임스탬프를 선택하고 `DOWNLOAD TELEMETRY` 버튼을 누르십시오.

4. 텔레메트리 다운로드에는 시간이 걸릴 수 있습니다. 완료 후 장치 및 센서에서 정보를 확인할 수 있습니다.


<!---
## 시작 devices

Go back and  choose service ["SmartHome Telemetry"](https://dapp.robonomics.network/#/services). You will forward to DApp website. In first login give permission to website to use polkadot{.js} extension. You will see next:

<robo-wiki-picture src="home-assistant/telemetry-start.jpg" />

Find address of your `user` account and press blue button:

<robo-wiki-picture src="home-assistant/datalog-start.jpg" />

And you will see popup "실행" window:

<robo-wiki-picture src="home-assistant/launch-window.jpg" />

실행 command calls HomeAssistant service, first two fields are **service name** - "Platform" and **service function** - "Name". Let's find them.

For this go to your Home Assistant interface in browser -> `Developer tools` -> `SERVICES` and turn on `YAML mode`.

<robo-wiki-picture src="home-assistant/ha-services.jpg" />

Find a service you need using a search field or choose from a drop-down list there.

<robo-wiki-picture src="home-assistant/ha-light.jpg" />

Let's find a `light` service. You will see available functions(`turn_on`, `turn_off`, `toggle`). Choose `turn_on` function.

<robo-wiki-picture src="home-assistant/ha-light-on.jpg" />

On the picture you see **service name** - `light` and **service function** - `turn_on`. Write these statements to popup window of DApp.

<robo-wiki-picture src="home-assistant/light-window.jpg" />

Next you need to find the sensor ID. For this go to `Overview` on the HA page. Find sensor, which you want to turn on(in this example it is the light) and press on it. 

<robo-wiki-picture src="home-assistant/light-name.jpg" />

You will see a popup window and with a "settings" button on it the top-right corner. Press on it. The popup window will change. In the new window you will find required `entity_id`:

<robo-wiki-picture src="home-assistant/entity-ha.jpg" />

Copy it and paste to field in our dapp:

<robo-wiki-picture src="home-assistant/dapp-entity.jpg" />

Finally, press `SEND` button and sign transaction with your password. Wait until transaction is in block and check your light. It should be turned on (sometimes it takes a bit more time).

Congratulations, You have fully installed and set up Your Home Assistant with Robonomics!
-->
