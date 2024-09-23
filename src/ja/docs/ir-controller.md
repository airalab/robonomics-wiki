---
title: IRリモート
contributors: [nakata5321]
---
この記事では、IRリモートコントロールの設定プロセスを紹介します。

{% roboWikiNote {type: "warning"}%} Robonomicsのすべてのデバイスは公式の[ウェブサイト](https://robonomics.network/devices/)で購入できます。{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} ステップ1 — フラッシング {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Robonomicsのすべてのデバイスは出荷時にプリフラッシュされています。ただし、すべてのデバイスが開発キットであるため、手順ではデバイスをゼロからフラッシュするオプションもカバーします。今すぐ行いたくない場合は、[**ステップ2 - アクセスポイント**](/docs/ir-controller/#step2)に進んでください。{% endroboWikiNote %}

デバイスを箱から取り出し、コンピューターに接続します。次に、[webflasher.robonomics.network](https://webflasher.robonomics.network/)にアクセスします。これがウェブフラッシャーです。

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} 注意！ウェブフラッシャーはGoogle ChromeまたはMicrosoft Edgeブラウザーでのみ動作します。{% endroboWikiNote %}

「ファームウェア」のドロップボックスで**"IR REMOTE"**オプションを選択し、次に「SELECT CHIP」で**"ESP32"**を選択します。**"CONNECT"**ボタンを押します。
ポップアップウィンドウが表示され、デバイスが接続されているシリアルポートを選択する必要があります（通常は`/ttyUSB0`です）。次に**"INSTALL IR-REMOTE_EN"**を選択します。
次のウィンドウでは、**ERASE DEVICE**をチェックして**CLEAR INSTALLATION**を行うことができます。次へ進み、インストールを押します。IRコントローラーにファームウェアがアップロードされるまで待ちます。

インストールプロセスが完了したら、Wi-Fi構成ポップアップが表示されます。そこで選択肢があります：

1) Wi-Fiの資格情報を提供し、**ステップ2 - アクセスポイント**をスキップして[**ステップ3 - 構成**](/docs/ir-controller/#step3)に進みます。

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Wi-Fiの設定が完了したら、**VISIT DEVICE**ボタンでデバイスにアクセスできます。後でデバイスにはネットワーク内のIPアドレスを使用してアクセスできます。これを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。

2) または、デバイスをコンピューターから切断して電源に接続します。IRリモートは起動し、Wi-Fiホットスポットを作成します。ホームWi-FiネットワークにIRリモートを接続するには、ステップ2の手順に従います。

{% roboWikiTitle { type:'2', anchor: 'step2'} %} ステップ2 — アクセスポイント {% endroboWikiTitle %}

IRリモートを箱から取り出し、電源に接続すると、"tasmota-XXXXXXX"という名前のホットスポットが作成されます。それに接続します。構成ウィンドウが開くはずです。開かない場合は、Webブラウザーを開いて`192.168.4.1`ページに移動します。

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Wi-Fiの資格情報を入力します。その後、IRリモートがWi-Fiネットワークに接続されます。デバイスをネットワーク内のIPアドレスで確認します。これを見つけるには、[Fingモバイルアプリ](https://www.fing.com/products)または[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用できます。

{% roboWikiTitle { type:'2', anchor: 'step3'} %} ステップ3 — 構成 {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

**"Configuration"**->**"Configure other"**に移動します。**"Template"**文字列に次の内容を挿入します：

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

チェックボックス**"Activate"**と**"MQTT Enable"**が有効になっていることを確認します。有効でない場合は、有効にして保存ボタンを押します。

**"Main Menu"**に戻り、**"Configuration"** -> **"Configure MQTT"**に移動します。
ここでMQTTの資格情報を提供します：

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

これでESPに関する作業は終了です。次のステップはHome Assistantの統合をインストールすることです。

{% roboWikiTitle { type:'2', anchor: 'step4'} %} ステップ4 — 統合の設定 {% endroboWikiTitle %}

この記事では、Home AssistantとHACSがあることを前提としています。HACSに移動し、カスタムリポジトリを追加します。

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

これを行うには、右上隅の3つの点を押し、**CUSTOM REPOSITORIES**を選択し、このURLを挿入します：`https://github.com/hristo-atanasov/Tasmota-IRHVAC`。カテゴリーで"Integration"を選択します。その後、検索してインストールします。その後、Home Assistantを再起動することを忘れないでください。

IRリモートのログを開きます。これを行うには、適切なローカルURLに移動するか、再度[webflasher.robonomics.network](https://webflasher.robonomics.network/)を開いて、"Tasmota IR"と"ESP32"を選択します。"Connect"を押し、ポートを選択します。
**VISIT DEVICE**を押し、デバイスのメインページが表示されます。"Consoles" -> "console"に移動します。

IRリモートコントロール（たとえばエアコンから）をRobonomics IRリモートに向け、リモコンのボタンを押します。コンソールに次のログが表示されます：
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
`IRHVAC`トピックから情報が必要です。

Home Assistantインスタンスの`configuration.yaml`ファイルを開き、次の内容を挿入します：

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # 以下のいずれかを選択してください：
    # State is updated when the tasmota device receives an IR signal (includes own transmission and original remote)
    # useful when a normal remote is in use alongside the tasmota device, may be less reliable than the second option.
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # State is updated when the tasmota device completes IR transmission, should be pretty reliable.
    #state_topic: "stat/<your_tasmota_device>```>/RESULT"
    # '利用可能なトピック'がTasmota IRデバイスの場合と異なる場合（HAのデバイスが無効の場合）はコメントを外してください
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <部屋の温度センサー> - # 部屋の温度を測定するために必要です。例：sensor.kitchen_temperature
    humidity_sensor: None #オプション - デフォルトはNone（例：sensor.kitchen_humidity）
    power_sensor: None #オプション - デフォルトはNone（例：binary_sensor.kitchen_ac_power）
    vendor: "<ここにベンダーを入力>" #ログからベンダーを見つけてください。
    min_temp: 16 #オプション - デフォルトは16の整数値
    max_temp: 32 #オプション - デフォルトは32の整数値
    target_temp: 26 #オプション - デフォルトは26の整数値
    initial_operation_mode: "off" # オプション - デフォルトは"off"の文字列値（"supported_modes"の1つ）
    away_temp: 24 #オプション - デフォルトは24の整数値
    precision: 1 #オプション - デフォルトは1の整数または浮動小数点値。1、0.5、または0.1に設定できます
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Tasmotaが"Mode":"Fan"を表示していても、"fan_only"を使用してください
      - "auto"
      - "off" #ACをオフにします - 引用符で囲む必要があります
      # 一部のデバイスでは"auto"と"fan_only"が入れ替わっている場合があります
      # 次の2行がコメント解除されている場合、"auto"と"fan"はコメントアウトする必要があります
      #- "auto_fan_only" #リモコンがファンを表示しているが、tasmotaがオートと言っている場合
      #- "fan_only_auto" #リモコンがオートを表示しているが、tasmotaがファンと言っている場合
    supported_fan_speeds:
      # 一部のデバイスは最大と表示されていますが、実際は高く、自動が最大です
      # 次の2つをコメント解除すると、highとmaxをコメントアウトする必要があります
      # - "auto_max" #最大になります
      # - "max_high" #高くなります
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
      - "vertical" #上から下へ
      # - "horizontal" # 左から右へ
      # - "both"
    default_quiet_mode: "Off" #オプション - デフォルトは"Off"の文字列値
    default_turbo_mode: "Off" #オプション - デフォルトは"Off"の文字列値
    default_econo_mode: "Off" #オプション - デフォルトは"Off"の文字列値
    hvac_model: "-1" #オプション - デフォルトは"1"の文字列値
    celsius_mode: "On" #オプション - デフォルトは"On"の文字列値
    default_light_mode: "Off" #オプション - デフォルトは"Off"の文字列値
    default_filter_mode: "Off" #オプション - デフォルトは"Off"の文字列値
    default_clean_mode: "Off" #オプション - デフォルトは"Off"の文字列値
    default_beep_mode: "Off" #オプション - デフォルトは"Off"の文字列値
    default_sleep_mode: "-1" #オプション - デフォルトは"-1"の文字列値
    default_swingv: "high" #オプション - デフォルトは""の文字列値
    default_swingh: "left" #オプション - デフォルトは""の文字列値
    keep_mode_when_off: True #オプション - デフォルトはFalseのブール値：MITSUBISHI_AC、ECOCLIMなどの場合はTrueである必要があります
    toggle_list: #オプション - デフォルトは[]
      # トグルされたプロパティはOn状態を保持しない設定です。
      # ACのプロパティがトグル機能である場合はこれを設定してください。
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

挿入された部分の必要なステートメントをコンソールメッセージからの値に変更してください。結果として、設定ファイルの一部は次のようになるはずです（例では未使用のステートメントが削除されました）：
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "bangkok climate control"
    unique_id : "bangkok test climate"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #オプション - デフォルトは16の整数値
    max_temp: 31 #オプション - デフォルトは32の整数値
    target_temp: 25 #オプション - デフォルトは26の整数値
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Tasmotaが"Mode":"Fan"を表示していても、"fan_only"を使用してください
      - "auto"
      - "off" #ACをオフにします - 引用符で囲む必要があります
      # 一部のデバイスでは"auto"と"fan_only"が入れ替わっている場合があります
      # 次の2行がコメント解除されている場合、"auto"と"fan"はコメントアウトする必要があります
      #- "auto_fan_only" #リモコンがファンを表示しているが、tasmotaがオートと言っている場合
      #- "fan_only_auto" #リモコンがオートを表示しているが、tasmotaがファンと言っている場合
    supported_fan_speeds:
      # 一部のデバイスは最大と表示されていますが、実際は高く、自動が最大です
      # 次の2つをコメント解除すると、highとmaxをコメントアウトする必要があります
      # - "auto_max" #最大になります
      # - "max_high" #高くなります
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #上から下へ

    hvac_model: "-1" #オプション - デフォルトは"1"の文字列値

    keep_mode_when_off: True #オプション - デフォルトはFalseのブール値：MITSUBISHI_AC、ECOCLIMなどの場合はTrueである必要があります

```

`configuration.yaml`を保存してHome Assistantを再起動してください。
再起動後、UIに新しいサーモスタットカードを追加し、新しく統合されたデバイスを選択できます。

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

GUIモードで問題が発生した場合は、「CODE EDITOR」に切り替えて次のように記述してください：
```
type: thermostat
entity: climate.<your climate name>
```

{% roboWikiNote { type: "warning"}%} Robonomicsのすべてのデバイスは公式ウェブサイト（https://robonomics.network/devices/）で購入できます。{% endroboWikiNote %}