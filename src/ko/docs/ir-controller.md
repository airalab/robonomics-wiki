---
title: IR 원격 제어
contributors: [nakata5321]
---
이 기사에서는 IR 원격 제어 설정 과정을 안내합니다.

{% roboWikiNote {type: "warning"}%} Robonomics의 모든 장치는 공식 [웹사이트](https://robonomics.network/devices/)에서 구매할 수 있습니다. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} 단계 1 — 플래싱 {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Robonomics의 모든 장치는 기본적으로 프리플래시되어 있습니다. 그러나 모든 장치가 개발 키트이므로 지침은 장치를 처음부터 플래싱하는 옵션을 다룰 것입니다. 지금 이 작업을 수행하고 싶지 않다면 [**단계 2 - 액세스 포인트**](/docs/ir-controller/#step2)로 이동하십시오. {% endroboWikiNote %}

장치를 상자에서 꺼내 컴퓨터에 연결합니다. 그런 다음 [webflasher.robonomics.network](https://webflasher.robonomics.network/) 웹사이트로 이동합니다. 이것이 웹 플래셔입니다.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} 참고! 웹 플래셔는 구글 크롬 또는 마이크로소프트 엣지 브라우저에서만 작동합니다. {% endroboWikiNote %}

"Firmware" 드롭박스에서 **"IR REMOTE"** 옵션을 선택하고 다음으로 "SELECT CHIP"에서 **"ESP32"**를 선택합니다. **"CONNECT"** 버튼을 누릅니다.
장치가 연결된 시리얼 포트를 선택해야 하는 팝업 창이 나타납니다(보통 `/ttyUSB0`입니다). 그런 다음 **"INSTALL IR-REMOTE_EN"**을 선택합니다.
다음 창에서 **ERASE DEVICE**를 선택하여 **CLEAR INSTALLATION**을 수행할 수 있습니다. 다음을 누르고 설치를 진행합니다. IR 컨트롤러로 펌웨어 업로드가 완료될 때까지 기다립니다.

설치 프로세스가 완료되면 Wi-Fi 구성 팝업이 나타납니다. 여기에서 선택할 수 있는 옵션은 다음과 같습니다:

1) Wi-Fi 자격 증명을 제공하고 **단계 2 - 액세스 포인트**를 건너뛰고 [**단계 3 - 구성**](/docs/ir-controller/#step3)으로 이동할 수 있습니다.

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Wi-Fi 설정을 완료한 후 **VISIT DEVICE** 버튼을 통해 장치에 액세스할 수 있습니다. 나중에는 네트워크에서 해당 IP 주소를 통해 장치에 액세스할 수 있습니다. 이를 찾기 위해 [Fing 모바일 앱](https://www.fing.com/products)이나 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용할 수 있습니다.

2) 또는 장치를 컴퓨터에서 분리하고 전원 공급에 연결합니다. IR 원격은 시작되어 Wi-Fi 핫스팟을 생성합니다. 홈 Wi-Fi 네트워크에 IR 원격을 연결하려면 단계 2의 지침을 따르십시오.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} 단계 2 — 액세스 포인트 {% endroboWikiTitle %}

IR 원격을 상자에서 꺼내 전원 공급에 연결하면 "tasmota-XXXXXXX"라는 이름의 핫스팟이 생성됩니다. 해당 핫스팟에 연결합니다. 구성 창이 열릴 것입니다. 그렇지 않으면 웹 브라우저를 열고 `192.168.4.1` 페이지로 이동합니다.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Wi-Fi 자격 증명을 제공합니다. 그러면 IR 원격이 Wi-Fi 네트워크에 연결됩니다. 네트워크에서 해당 장치를 확인하려면 [Fing 모바일 앱](https://www.fing.com/products)이나 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용할 수 있습니다.

{% roboWikiTitle { type:'2', anchor: 'step3'} %} 단계 3 — 구성 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

**"Configuration"**->**"Configure other"**로 이동합니다. **"Template"** 문자열에 다음을 삽입합니다:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

**"Activate"**와 **"MQTT Enable"** 확인란이 활성화되어 있는지 확인합니다. 그렇지 않은 경우 활성화하고 저장 버튼을 누릅니다.

**"Main Menu"**으로 돌아가 **"Configuration"** -> **"Configure MQTT"**로 이동합니다.
여기에 MQTT 자격 증명을 제공합니다:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

지금까지 ESP에 대한 모든 작업이 완료되었습니다. 다음 단계는 Home Assistant 통합을 설치하는 것입니다.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} 단계 4 — 통합 설정 {% endroboWikiTitle %}

이 기사는 Home Assistant와 HACS가 설치되어 있다고 가정합니다. HACS로 이동하여 사용자 정의 저장소를 추가합니다.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

이를 위해 오른쪽 상단의 세 개의 점을 누르고 **CUSTOM REPOSITORIES**를 선택한 후 다음 URL을 입력합니다: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. 카테고리에서 "Integration"을 선택합니다. 그런 다음 검색하여 설치합니다. 그 후 Home Assistant를 다시 시작하는 것을 잊지 마십시오.

IR 원격의 로그를 엽니다. 이를 위해 적절한 로컬 URL로 이동하거나 다시 [webflasher.robonomics.network](https://webflasher.robonomics.network/)를 열고 "Tasmota IR" 및 "ESP32"를 선택한 후 "Connect"를 누르고 포트를 선택합니다.
**VISIT DEVICE**를 누르면 장치의 주요 페이지가 표시됩니다. "Consoles" -> "console"로 이동합니다.

IR 원격 제어기(예: 에어컨 리모컨)를 Robonomics IR 원격에 향해 가리키고 리모컨 버튼을 누릅니다. 콘솔에 다음 로그가 표시됩니다:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
`IRHVAC` 주제의 정보가 필요합니다.

Home Assistant 인스턴스의 `configuration.yaml` 파일을 열고 다음을 삽입합니다:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # 다음 중 하나 선택:
    # tasmota 장치가 IR 신호를 수신할 때 상태가 업데이트됩니다 (자체 전송 및 원본 리모컨 포함)
    # 일반 리모컨이 tasmota 장치와 함께 사용될 때 유용하며 두 번째 옵션보다 신뢰성이 낮을 수 있습니다.
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # tasmota 장치가 IR 전송을 완료할 때 상태가 업데이트됩니다. 상당히 신뢰할 수 있어야 합니다.
    #state_topic: "stat/<your_tasmota_device>/결과"
    # HA에서 장치가 비활성화된 경우 'Tasmota IR 장치의 사용 가능한 주제'가 다른 경우 주석 처리
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <방의 온도 센서> - # 방의 온도를 측정하는 데 필요합니다. 예: sensor.kitchen_temperature
    humidity_sensor: None #선택 사항 - 기본값 None (예: sensor.kitchen_humidity)
    power_sensor: None #선택 사항 - 기본값 None (예: binary_sensor.kitchen_ac_power)
    vendor: "<여기에 공급업체 입력>" #로그에서 공급업체 찾기.
    min_temp: 16 #선택 사항 - 기본값 16 정수 값
    max_temp: 32 #선택 사항 - 기본값 32 정수 값
    target_temp: 26 #선택 사항 - 기본값 26 정수 값
    initial_operation_mode: "off" # 선택 사항 - 기본값 "off" 문자열 값 ("supported_modes" 중 하나)
    away_temp: 24 #선택 사항 - 기본값 24 정수 값
    precision: 1 #선택 사항 - 기본값 1 정수 또는 부동 값. 1, 0.5 또는 0.1로 설정할 수 있음
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Tasmota가 "Mode":"Fan"을 표시해도 "fan_only" 사용
      - "auto"
      - "off" #AC를 끔 - 따옴표 안에 있어야 함
      # 일부 장치는 "auto"와 "fan_only"가 바뀐 경우가 있음
      # 다음 두 줄이 주석 처리되면 "auto"와 "fan"을 주석 처리해야 함
      #- "auto_fan_only" #리모컨에 팬이 표시되지만 tasmota가 auto라고 말하는 경우
      #- "fan_only_auto" #리모컨에 auto가 표시되지만 tasmota가 팬이라고 말하는 경우
    supported_fan_speeds:
      # 일부 장치는 max라고 하지만 실제로는 high이고 auto가 최대임
      # 다음 두 줄을 주석 처리하면 high와 max를 주석 처리해야 함
      # - "auto_max" #max가 됨
      # - "max_high" #high가 됨
      #- "on"
      #- "off"
      #- "low"
      - "medium"
      - "high"
      #- "middle"
      #- "focus"
      #- "diffuse"
      - "min"
      - "max"
      #- "auto"
    supported_swing_list:
      - "off"
      - "vertical" #위에서 아래로
      # - "horizontal" # 좌우
      # - "both"
    default_quiet_mode: "Off" #선택 사항 - 기본값 "Off" 문자열 값
    default_turbo_mode: "Off" #선택 사항 - 기본값 "Off" 문자열 값
    default_econo_mode: "Off" #선택 사항 - 기본값 "Off" 문자열 값
    hvac_model: "-1" #선택 사항 - 기본값 "1" 문자열 값
    celsius_mode: "On" #선택 사항 - 기본값 "On" 문자열 값
    default_light_mode: "Off" #선택 사항 - 기본값 "Off" 문자열 값
    default_filter_mode: "Off" #선택 사항 - 기본값 "Off" 문자열 값
    default_clean_mode: "Off" #선택 사항 - 기본값 "Off" 문자열 값
    default_beep_mode: "Off" #선택 사항 - 기본값 "Off" 문자열 값
    default_sleep_mode: "-1" #선택 사항 - 기본값 "-1" 문자열 값
    default_swingv: "high" #선택 사항 - 기본값 "" 문자열 값
    default_swingh: "left" #선택 사항 - 기본값 "" 문자열 값
    keep_mode_when_off: True #선택 사항 - 기본값 False 부울 값 : MITSUBISHI_AC, ECOCLIM 등에 대해 True여야 함
    toggle_list: #선택 사항 - 기본값 []
      # 토글된 속성은 On 상태를 유지하지 않는 설정입니다.
      # AC 속성이 토글 기능인 경우 설정하세요.
      #- Beep
      #- Clean
      #- Econo
      #- Filter
      #- Light
      #- Quiet
      #- Sleep
      #- SwingH
      #- SwingV
      #- Turbo
```

{% endcodeHelper %}

콘솔 메시지의 값으로 삽입된 부분의 필요한 문장을 모두 변경하십시오. 결과적으로 구성 파일의 일부는 다음과 유사해야 합니다
(예시에서 사용되지 않는 문장은 삭제되었습니다):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "방콕 기후 제어"
    unique_id : "방콕 테스트 기후"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #선택 사항 - 기본값 16 정수 값
    max_temp: 31 #선택 사항 - 기본값 32 정수 값
    target_temp: 25 #선택 사항 - 기본값 26 정수 값
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Tasmota가 "Mode":"Fan"을 표시해도 "fan_only" 사용
      - "auto"
      - "off" #AC를 끔 - 따옴표 안에 있어야 함
      # 일부 장치는 "auto"와 "fan_only"가 바뀐 경우가 있음
      # 다음 두 줄이 주석 처리되면 "auto"와 "fan"을 주석 처리해야 함
      #- "auto_fan_only" #리모컨에 팬이 표시되지만 tasmota가 auto라고 말하는 경우
      #- "fan_only_auto" #리모컨에 auto가 표시되지만 tasmota가 팬이라고 말하는 경우
    supported_fan_speeds:
      # 일부 장치는 max라고 하지만 실제로는 high이고 auto가 최대임
      # 다음 두 줄을 주석 처리하면 high와 max를 주석 처리해야 함
      # - "auto_max" #max가 됨
      # - "max_high" #high가 됨
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #위에서 아래로

    hvac_model: "-1" #선택 사항 - 기본값 "1" 문자열 값

    keep_mode_when_off: True #선택 사항 - 기본값 False 부울 값 : MITSUBISHI_AC, ECOCLIM 등에 대해 True여야 함

```

`configuration.yaml`을 저장하고 Home Assistant를 다시 시작하십시오.
다시 시작한 후 UI에 새로운 온도 조절기 카드를 추가하고 새로 통합된 장치를 선택할 수 있습니다.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

GUI 모드에서 문제가 발생하는 경우 "코드 편집기"로 전환하고 다음을 작성하십시오:
```
type: thermostat
entity: climate.<당신의 기후 이름>
```

{% roboWikiNote { type: "warning"}%} Robonomics의 모든 장치는 공식 웹사이트(https://robonomics.network/devices/)에서 구매할 수 있습니다. {% endroboWikiNote %}