---
title: ИК-пульт
contributors: [nakata5321]
---
Эта статья покажет вам процесс настройки ИК-пульта.

{% roboWikiNote {type: "warning"}%} Все устройства от Robonomics можно приобрести на официальном [сайте](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Шаг 1 — Прошивка {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Все устройства от Robonomics поставляются с предустановленной прошивкой. Однако, поскольку все устройства являются наборами для разработки, инструкции охватывают вариант прошивки устройства с нуля. Если вы не хотите делать это сейчас, перейдите к [**Шагу 2 - Точка доступа**](/docs/ir-controller/#step2). {% endroboWikiNote %}

Извлеките устройство из коробки и подключите его к компьютеру. Затем перейдите на веб-сайт [webflasher.robonomics.network](https://webflasher.robonomics.network/). Это веб-прошивка.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Примечание! Веб-прошивка работает только в браузерах Google Chrome или Microsoft Edge. {% endroboWikiNote %}

В раскрывающемся списке "Прошивка" выберите опцию **"IR REMOTE"**, а затем в "SELECT CHIP" выберите **"ESP32"**. Нажмите кнопку **"CONNECT"**.
Появится всплывающее окно, где вам нужно выбрать последовательный порт, к которому подключено устройство (обычно это `/ttyUSB0`). Затем выберите **"INSTALL IR-REMOTE_EN"**.
На следующем окне вы можете выполнить **ОЧИСТКУ УСТАНОВКИ**, установив флажок **ERASE DEVICE**. Нажмите Далее, а затем Установить. Дождитесь завершения загрузки прошивки на ИК-контроллер.

После завершения процесса установки появится всплывающее окно конфигурации Wi-Fi. У вас есть два варианта:

1) Вы можете указать учетные данные Wi-Fi, пропустить **Шаг 2 - Точка доступа** и перейти к [**Шагу 3 - Конфигурация**](/docs/ir-controller/#step3).

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

После настройки Wi-Fi вы можете посетить устройство, нажав кнопку **VISIT DEVICE**. Позже вы сможете посещать устройство по его IP-адресу в сети. Чтобы найти его, вы можете использовать мобильное приложение [Fing](https://www.fing.com/products) или
инструмент командной строки [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

2) Или отключите устройство от компьютера и подключите его к источнику питания. ИК-пульт запустится и создаст точку доступа Wi-Fi. Чтобы подключить ИК-пульт к домашней сети Wi-Fi через точку доступа, следуйте инструкциям в Шаге 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Шаг 2 — Точка доступа {% endroboWikiTitle %}

Если вы извлекли ИК-пульт из коробки и подключили его к источнику питания, он создаст точку доступа с именем "tasmota-XXXXXXX". Подключитесь к нему. Должно открыться окно конфигурации. Если этого не произошло, откройте веб-браузер и перейдите на страницу `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Укажите учетные данные Wi-Fi. После этого ИК-пульт подключится к сети Wi-Fi. Проверьте устройство по его IP-адресу в сети. Чтобы найти его, вы можете использовать мобильное приложение [Fing](https://www.fing.com/products) или
инструмент командной строки [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Шаг 3 — Конфигурация {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Перейдите в **"Configuration"**->**"Configure other"**. В строку **"Template"** вставьте следующее:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Убедитесь, что включены флажки **"Activate"** и **"MQTT Enable"**. Если нет, включите их и нажмите кнопку Сохранить.

Вернитесь в **"Main Menu"** и перейдите в **"Configuration"** -> **"Configure MQTT"**.
Укажите здесь ваши учетные данные MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

На этом пока все с ESP. Следующим шагом будет установка интеграции с Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Шаг 4 — Настройка интеграции {% endroboWikiTitle %}

Эта статья предполагает, что у вас есть Home Assistant и HACS. Перейдите в HACS и добавьте пользовательский репозиторий.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Для этого нажмите три точки в правом верхнем углу, выберите **CUSTOM REPOSITORIES**
и вставьте этот URL: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. в категории выберите "Integration". После этого найдите его в поиске и установите. Не забудьте перезапустить Home Assistant после этого.

Откройте журналы ИК-пульта. Для этого перейдите по соответствующему локальному URL или снова откройте [webflasher.robonomics.network](https://webflasher.robonomics.network/) и выберите "Tasmota IR" и "ESP32". Нажмите "Connect" и выберите порт.
Нажмите **VISIT DEVICE**, и вы увидите главную страницу устройства. Перейдите в "Consoles" -> "console".

Наведите свой ИК-пульт (например, от кондиционера) на ИК-пульт Robonomics и нажимайте кнопки на пульте. Вы увидите следующий журнал в консоли:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
Вам понадобится информация из темы `IRHVAC`.

Откройте файл `configuration.yaml` вашего экземпляра Home Assistant и вставьте следующее:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # Выберите один из следующих вариантов:
    # Состояние обновляется, когда устройство tasmota получает ИК-сигнал (включая собственную передачу и оригинальный пульт)
    # полезно, когда обычный пульт используется наряду с устройством tasmota, может быть менее надежным, чем второй вариант.
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # Состояние обновляется, когда устройство tasmota завершает передачу ИК, должно быть довольно надежным.
    #state_topic: "stat/<your_tasmota_device> >/РЕЗУЛЬТАТ"
    # Раскомментируйте, если ваш 'доступный топик' устройства Tasmota IR отличается (если устройство в HA отключено)
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <датчик температуры в комнате> - # необходим для измерения температуры в комнате. например, sensor.kitchen_temperature
    humidity_sensor: None #опционально - по умолчанию None (например, sensor.kitchen_humidity)
    power_sensor: None #опционально - по умолчанию None (например, binary_sensor.kitchen_ac_power)
    vendor: "<Ваш поставщик здесь>" #найдите своего поставщика в логах.
    min_temp: 16 #опционально - по умолчанию 16 целочисленное значение
    max_temp: 32 #опционально - по умолчанию 32 целочисленное значение
    target_temp: 26 #опционально - по умолчанию 26 целочисленное значение
    initial_operation_mode: "off" # опционально - по умолчанию "off" строковое значение (один из "supported_modes")
    away_temp: 24 #опционально - по умолчанию 24 целочисленное значение
    precision: 1 #опционально - по умолчанию 1 целочисленное или дробное значение. Может быть установлено на 1, 0.5 или 0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Используйте "fan_only", даже если Tasmota показывает "Mode":"Fan"
      - "auto"
      - "off" #Выключает кондиционер - должен быть в кавычках
      # Некоторые устройства имеют "auto" и "fan_only" переключены
      # Если следующие две строки раскомментированы, "auto" и "fan" должны быть закомментированы
      #- "auto_fan_only" #если пульт показывает вентилятор, но tasmota говорит auto
      #- "fan_only_auto" #если пульт показывает auto, но tasmota говорит fan
    supported_fan_speeds:
      # Некоторые устройства говорят max, но это high, и auto, которое является max
      # Если вы раскомментируете следующие два, вам нужно закомментировать high и max
      # - "auto_max" #станет max
      # - "max_high" #станет high
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
      - "vertical" #сверху вниз
      # - "horizontal" # Слева направо
      # - "both"
    default_quiet_mode: "Off" #опционально - по умолчанию "Off" строковое значение
    default_turbo_mode: "Off" #опционально - по умолчанию "Off" строковое значение
    default_econo_mode: "Off" #опционально - по умолчанию "Off" строковое значение
    hvac_model: "-1" #опционально - по умолчанию "1" строковое значение
    celsius_mode: "On" #опционально - по умолчанию "On" строковое значение
    default_light_mode: "Off" #опционально - по умолчанию "Off" строковое значение
    default_filter_mode: "Off" #опционально - по умолчанию "Off" строковое значение
    default_clean_mode: "Off" #опционально - по умолчанию "Off" строковое значение
    default_beep_mode: "Off" #опционально - по умолчанию "Off" строковое значение
    default_sleep_mode: "-1" #опционально - по умолчанию "-1" строковое значение
    default_swingv: "high" #опционально - по умолчанию "" строковое значение
    default_swingh: "left" #опционально - по умолчанию "" строковое значение
    keep_mode_when_off: True #опционально - по умолчанию False логическое значение: Должно быть True для MITSUBISHI_AC, ECOCLIM и т. д.
    toggle_list: #опционально - по умолчанию []
      # Свойство переключения - это настройка, которая не сохраняет состояние Включено.
      # Установите это, если ваши свойства кондиционера являются функцией переключения.
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

Измените все необходимые утверждения во вставленной части на значения из сообщения консоли. В результате часть вашего файла конфигурации должна выглядеть примерно так
(в примере неиспользуемое утверждение было удалено):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "управление климатом в Бангкоке"
    unique_id : "тест климата в Бангкоке"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #опционально - по умолчанию 16 целочисленное значение
    max_temp: 31 #опционально - по умолчанию 32 целочисленное значение
    target_temp: 25 #опционально - по умолчанию 26 целочисленное значение
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Используйте "fan_only", даже если Tasmota показывает "Mode":"Fan"
      - "auto"
      - "off" #Выключает кондиционер - должен быть в кавычках
      # Некоторые устройства имеют "auto" и "fan_only" переключены
      # Если следующие две строки раскомментированы, "auto" и "fan" должны быть закомментированы
      #- "auto_fan_only" #если пульт показывает вентилятор, но tasmota говорит auto
      #- "fan_only_auto" #если пульт показывает auto, но tasmota говорит fan
    supported_fan_speeds:
      # Некоторые устройства говорят max, но это high, и auto, которое является max
      # Если вы раскомментируете следующие два, вам нужно закомментировать high и max
      # - "auto_max" #станет max
      # - "max_high" #станет high
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #сверху вниз

    hvac_model: "-1" #опционально - по умолчанию "1" строковое значение

    keep_mode_when_off: True #опционально - по умолчанию False логическое значение: Должно быть True для MITSUBISHI_AC, ECOCLIM и т. д.

```

Сохраните `configuration.yaml` и перезапустите Home Assistant.
После перезапуска вы можете добавить новую карту термостата в пользовательский интерфейс и выбрать только что интегрированное устройство.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

Если у вас возникли проблемы с режимом GUI, переключитесь на "РЕДАКТОР КОДА" и напишите следующее:
```
type: thermostat
entity: climate.<имя вашего климата>
```

{% roboWikiNote { type: "warning"}%} Все устройства от Robonomics можно приобрести на официальном [сайте](https://robonomics.network/devices/).{% endroboWikiNote %}