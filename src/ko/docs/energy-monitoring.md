---
title: 에너지 모니터링
contributors: [nakata5321]
---
이 기사에서는 에너지 모니터링 설정 과정을 안내합니다.

{% roboWikiNote {type: "warning"}%} Robonomics의 모든 장치는 공식 [웹사이트](https://robonomics.network/devices/)에서 구매할 수 있습니다.
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} 단계 1 — 플래싱 {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Robonomics의 모든 장치는 개봉 시 미리 플래싱되어 있습니다. 그러나 모든 장치가 개발 키트이므로 지침은 장치를 처음부터 플래싱하는 옵션을 다룰 것입니다. 지금 이 작업을 하고 싶지 않다면 [**단계 2 - 액세스 포인트**](/docs/ir-controller/#step2)로 이동하십시오.
{% endroboWikiNote %}

장치를 상자에서 꺼내 컴퓨터에 연결합니다. 그런 다음 [webflasher.robonomics.network](https://webflasher.robonomics.network/) 웹사이트로 이동합니다. 이것이 웹 플래셔입니다.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} 참고! 웹 플래셔는 구글 크롬 또는 마이크로소프트 엣지 브라우저에서만 작동합니다.
{% endroboWikiNote %}

"Firmware" 드롭박스에서 **"에너지 모니터"** 옵션을 선택하고, 다음으로 **"ESP32-S3"**를 선택합니다. **"CONNECT"** 버튼을 누릅니다.
팝업 창이 나타나면 장치가 연결된 시리얼 포트를 선택해야 합니다(보통 `/ttyUSB0`입니다). 그런 다음 **"INSTALL ENERGY-MONITOR_EN"**을 선택합니다.
다음 창에서 **ERASE DEVICE**를 선택하여 **CLEAR INSTALLATION**을 수행할 수 있습니다. 다음을 누르고 설치를 진행합니다. 에너지 모니터링 장치로 펌웨어 업로드가 완료될 때까지 기다립니다.

설치 프로세스가 완료되면 Wi-Fi 구성 팝업이 나타납니다. Wi-Fi 자격 증명을 제공합니다.

Wi-Fi 설정을 완료한 후 **VISIT DEVICE** 버튼을 통해 장치를 방문할 수 있습니다. 나중에는 네트워크에서 해당 장치의 IP 주소로 방문할 수 있습니다. 이를 찾기 위해 [Fing 모바일 앱](https://www.fing.com/products)이나 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용할 수 있습니다.

**단계 2 — 액세스 포인트**를 건너뛰고 [**단계 3 — 구성**](/docs/ir-controller/#step3)로 이동합니다.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} 단계 2 — 액세스 포인트 {% endroboWikiTitle %}

에너지 모니터를 상자에서 꺼내 전원 공급에 연결하면 "robonomics-XXXXXXX"라는 핫스팟이 생성됩니다. 해당 핫스팟에 연결합니다. 구성 창이 열릴 것입니다. 그렇지 않으면 웹 브라우저를 열고 `192.168.4.1` 페이지로 이동합니다.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Wi-Fi 자격 증명을 제공합니다. 그러면 에너지 모니터링 장치가 Wi-Fi 네트워크에 연결됩니다. 해당 장치를 네트워크에서 IP 주소로 확인합니다. 이를 찾기 위해 [Fing 모바일 앱](https://www.fing.com/products)이나 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용할 수 있습니다.

{% roboWikiTitle { type:'2', anchor: 'step3'} %} 단계 3 — 구성 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

**"Configuration"** -> **"Configure other"**로 이동합니다. **"Template"** 문자열에 다음을 삽입합니다:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

**"Activate"**와 **"MQTT Enable"** 확인란이 활성화되어 있는지 확인합니다. 그렇지 않다면 활성화하고 저장 버튼을 누릅니다.

"메인 메뉴"로 돌아가 **"Configuration"** -> **"Configure MQTT"**로 이동합니다.
여기에 MQTT 자격 증명을 제공합니다:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

지금은 ESP에 대한 모든 작업이 끝났습니다. 다음 단계는 Home Assistant 통합을 설치하는 것입니다.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} 단계 4 — 통합 설정 {% endroboWikiTitle %}

이 기사는 Home Assistant가 있다고 가정합니다. 에너지 모니터링 장치를 Home Assistant에 연결하려면 "Tasmota" 통합을 설치해야 합니다.

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

기본적으로 Home Assistant는 "Tasmota" 통합을 자동으로 감지합니다. 그러나 자동으로 감지되지 않으면 수동으로 추가하십시오.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

이제 모든 작업이 완료되었습니다. 이제 대시보드에 에너지 엔티티를 추가할 수 있습니다.

{% roboWikiNote {type: "warning"}%} Robonomics의 모든 장치는 공식 [웹사이트](https://robonomics.network/devices/)에서 구매할 수 있습니다.
{% endroboWikiNote %}