---
title: IR遥控器
contributors: [nakata5321]
---
本文将向您展示设置红外遥控器的过程。

{% roboWikiNote {type: "warning"}%} 所有来自Robonomics的设备都可以在官方[网站](https://robonomics.network/devices/)上购买。{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} 步骤1 — 刷写 {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} 所有来自Robonomics的设备都是预先刷写的。但是，由于所有设备都是开发套件，说明将涵盖从头开始刷写设备的选项。如果您现在不想这样做，请继续前往[**步骤2 - 接入点**](/docs/ir-controller/#step2)。{% endroboWikiNote %}

从包装盒中取出设备并将其连接到计算机。然后转到[webflasher.robonomics.network](https://webflasher.robonomics.network/)网站。这是Web刷写工具。

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} 注意！Web刷写工具仅适用于Google Chrome或Microsoft Edge浏览器。{% endroboWikiNote %}

在“固件”下拉框中选择**"IR REMOTE"**选项，然后在“选择芯片”中选择**"ESP32"**。按下**"CONNECT"**按钮。
将弹出一个窗口，您应该在其中选择设备连接的串行端口（通常为`/ttyUSB0`）。然后选择**"INSTALL IR-REMOTE_EN"**。
在下一个窗口中，您可以通过勾选**ERASE DEVICE**来进行**CLEAR INSTALLATION**。按下下一步，然后安装。等待固件上传到IR控制器。

安装过程完成后，将出现Wi-Fi配置弹出窗口。您有以下选项：

1) 您可以提供Wi-Fi凭据，跳过**步骤2 - 接入点**，并前往[**步骤3 - 配置**](/docs/ir-controller/#step3)。

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

设置完Wi-Fi后，您可以通过**VISIT DEVICE**按钮访问设备。稍后，您可以通过网络中的IP地址访问设备。要找到它，您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)。

2) 或将设备从计算机断开连接并连接到电源。IR遥控器将启动并创建一个Wi-Fi热点。要通过热点将IR遥控器连接到家庭Wi-Fi网络，请按照步骤2中的说明操作。

{% roboWikiTitle { type:'2', anchor: 'step2'} %} 步骤2 — 接入点 {% endroboWikiTitle %}

如果您从包装盒中取出IR遥控器并将其连接到电源，它将创建一个名为“tasmota-XXXXXXX”的热点。连接到该热点。配置窗口应该会打开。如果没有打开，请打开Web浏览器并转到`192.168.4.1`页面。

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

提供Wi-Fi凭据。之后，IR遥控器将连接到Wi-Fi网络。通过网络中的IP地址检查设备。要找到它，您可以使用[Fing移动应用](https://www.fing.com/products)或[nmap CLI工具](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)。

{% roboWikiTitle { type:'2', anchor: 'step3'} %} 步骤3 — 配置 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

转到**"Configuration"**->**"Configure other"**。在**"Template"**字符串中插入以下内容：

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

验证复选框**"Activate"**和**"MQTT Enable"**是否已启用。如果没有，请启用它并按保存按钮。

返回到**"Main Menu"**，然后转到**"Configuration"** -> **"Configure MQTT"**。
在此处提供您的MQTT凭据：

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

目前ESP的设置就到这里。下一步是安装Home Assistant集成。

{% roboWikiTitle { type:'2', anchor: 'step4'} %} 步骤4 — 集成设置 {% endroboWikiTitle %}

本文假设您已经安装了Home Assistant和HACS。转到HACS并添加自定义存储库。

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

要执行此操作，请按右上角的三个点，选择**CUSTOM REPOSITORIES**，并插入此URL：`https://github.com/hristo-atanasov/Tasmota-IRHVAC`。在类别中选择"Integration"。之后在搜索中找到它并安装。安装后不要忘记重新启动Home Assistant。

打开IR遥控器的日志。要执行此操作，请转到适当的本地URL，或再次打开[webflasher.robonomics.network](https://webflasher.robonomics.network/)，选择"Tasmota IR"和"ESP32"。按下"Connect"并选择端口。
按下**VISIT DEVICE**，您将看到设备的主页面。转到"Consoles" -> "console"。

将您的IR遥控器（例如空调遥控器）对准Robonomics IR遥控器并按下遥控器上的按钮。您将在控制台中获得以下日志：
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
您需要从`IRHVAC`主题中获取信息。

打开我们Home Assistant实例的`configuration.yaml`文件并插入以下内容：

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # 从以下选项中选择一个：
    # 当tasmota设备接收到IR信号时更新状态（包括自身传输和原始遥控器）
    # 当正常遥控器与tasmota设备一起使用时有用，可能不如第二个选项可靠。
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # 当tasmota设备完成IR传输时更新状态，应该相当可靠。
    #state_topic: "stat/<your_tasmota_device>/RESULT"
    # 如果您的Tasmota IR设备的“可用主题”不同（如果HA中的设备已禁用），请取消注释
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <房间中的温度传感器> - # 用于测量房间温度。例如 sensor.kitchen_temperature
    humidity_sensor: None #可选 - 默认为None（例如 sensor.kitchen_humidity）
    power_sensor: None #可选 - 默认为None（例如 binary_sensor.kitchen_ac_power）
    vendor: "<您的供应商名称>" #在日志中查找您的供应商。
    min_temp: 16 #可选 - 默认为16整数值
    max_temp: 32 #可选 - 默认为32整数值
    target_temp: 26 #可选 - 默认为26整数值
    initial_operation_mode: "off" # 可选 - 默认为“off”字符串值（“supported_modes”之一）
    away_temp: 24 #可选 - 默认为24整数值
    precision: 1 #可选 - 默认为1整数或浮点值。可以设置为1、0.5或0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # 即使Tasmota显示“Mode”：“Fan”，也要使用“fan_only”
      - "auto"
      - "off" #关闭空调 - 必须用引号括起来
      # 一些设备的“auto”和“fan_only”被调换了
      # 如果以下两行取消注释，“auto”和“fan”应该被注释掉
      #- "auto_fan_only" #如果遥控器显示风扇但Tasmota显示自动
      #- "fan_only_auto" #如果遥控器显示自动但Tasmota显示风扇
    supported_fan_speeds:
      # 一些设备显示最大，但实际是高，以及自动是最大
      # 如果取消以下两行注释，您必须注释掉high和max
      # - "auto_max" #将变为max
      # - "max_high" #将变为high
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
      - "vertical" #从上到下
      # - "horizontal" # 从左到右
      # - "both"
    default_quiet_mode: "Off" #可选 - 默认为“Off”字符串值
    default_turbo_mode: "Off" #可选 - 默认为“Off”字符串值
    default_econo_mode: "Off" #可选 - 默认为“Off”字符串值
    hvac_model: "-1" #可选 - 默认为“1”字符串值
    celsius_mode: "On" #可选 - 默认为“On”字符串值
    default_light_mode: "Off" #可选 - 默认为“Off”字符串值
    default_filter_mode: "Off" #可选 - 默认为“Off”字符串值
    default_clean_mode: "Off" #可选 - 默认为“Off”字符串值
    default_beep_mode: "Off" #可选 - 默认为“Off”字符串值
    default_sleep_mode: "-1" #可选 - 默认为“-1”字符串值
    default_swingv: "high" #可选 - 默认为“”字符串值
    default_swingh: "left" #可选 - 默认为“”字符串值
    keep_mode_when_off: True #可选 - 默认为False布尔值：对于MITSUBISHI_AC、ECOCLIM等，必须为True
    toggle_list: #可选 - 默认为[]
      # 切换属性是不保留开启状态的设置。
      # 如果您的空调属性是切换功能，请设置此项。
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

更改插入部分中的所有必要语句，使用控制台消息中的值。因此，您的配置文件的一部分应该类似于以下内容
（在示例中，未使用的语句已被删除）：
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "曼谷气候控制"
    unique_id : "曼谷测试气候"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #可选 - 默认为16整数值
    max_temp: 31 #可选 - 默认为32整数值
    target_temp: 25 #可选 - 默认为26整数值
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # 即使Tasmota显示“Mode”：“Fan”，也要使用“fan_only”
      - "auto"
      - "off" #关闭空调 - 必须用引号括起来
      # 一些设备的“auto”和“fan_only”被调换了
      # 如果以下两行取消注释，“auto”和“fan”应该被注释掉
      #- "auto_fan_only" #如果遥控器显示风扇但Tasmota显示自动
      #- "fan_only_auto" #如果遥控器显示自动但Tasmota显示风扇
    supported_fan_speeds:
      # 一些设备显示最大，但实际是高，以及自动是最大
      # 如果取消以下两行注释，您必须注释掉high和max
      # - "auto_max" #将变为max
      # - "max_high" #将变为high
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #从上到下

    hvac_model: "-1" #可选 - 默认为“1”字符串值

    keep_mode_when_off: True #可选 - 默认为False布尔值：对于MITSUBISHI_AC、ECOCLIM等，必须为True

```

保存`configuration.yaml`并重新启动Home Assistant。
重新启动后，您可以在UI中添加一个新的恒温器卡，并选择新集成的设备。

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

如果在GUI模式下遇到问题，请切换到“CODE EDITOR”并编写以下内容：
```
type: thermostat
entity: climate.<您的气候名称>
```

{% roboWikiNote { type: "warning"}%} 所有Robonomics的设备都可以在官方[网站](https://robonomics.network/devices/)上购买。{% endroboWikiNote %}