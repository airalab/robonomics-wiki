---
title: ІК-пульт
contributors: [nakata5321]
---
У цій статті ви дізнаєтеся про процес налаштування ІК-пульта.

{% roboWikiNote {type: "warning"}%} Усі пристрої від Robonomics можна придбати на офіційному [веб-сайті](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Крок 1 — Прошивка {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Усі пристрої від Robonomics поставляються з попередньо встановленою прошивкою. Однак, оскільки всі пристрої є наборами для розробки, інструкції охоплюватимуть опцію прошивки пристрою з нуля. Якщо ви не бажаєте цього робити зараз, перейдіть до [**Крок 2 - Точка доступу**](/docs/ir-controller/#step2).{% endroboWikiNote %}

Вийміть пристрій з коробки та підключіть його до комп'ютера. Потім перейдіть на веб-сайт [webflasher.robonomics.network](https://webflasher.robonomics.network/). Це веб-прошивальник.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Зверніть увагу! Веб-прошивальник працює тільки з браузерами Google Chrome або Microsoft Edge. {% endroboWikiNote %}

У випадаючому списку "Firmware" оберіть опцію **"IR REMOTE"**, а потім у "SELECT CHIP" оберіть **"ESP32"**. Натисніть кнопку **"CONNECT"**.
З'явиться вікно, де вам слід вибрати послідовний порт, до якого підключений пристрій (зазвичай це `/ttyUSB0`). Потім оберіть **"INSTALL IR-REMOTE_EN"**.
На наступному вікні ви можете зробити **CLEAR INSTALLATION**, позначивши **ERASE DEVICE**. Натисніть Next, а потім Install. Зачекайте, поки прошивка завантажиться на ІК-контролер.

Після завершення процесу встановлення з'явиться вікно конфігурації Wi-Fi. Тут у вас є два варіанти:

1) Ви можете вказати дані для підключення до Wi-Fi, пропустити **Крок 2 - Точка доступу** і перейти до [**Крок 3 - Конфігурація**](/docs/ir-controller/#step3).

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Після налаштування Wi-Fi ви можете відвідати пристрій за допомогою кнопки **VISIT DEVICE**. Пізніше ви зможете відвідати пристрій за його IP-адресою в мережі. Щоб знайти його, ви можете використовувати додаток для мобільних пристроїв [Fing](https://www.fing.com/products) або
інструмент командного рядка [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

2) Або від'єднайте пристрій від комп'ютера та підключіть його до джерела живлення. ІК-пульт запуститься та створить точку доступу Wi-Fi. Щоб підключити ІК-пульт до домашньої мережі Wi-Fi через точку доступу, дотримуйтесь інструкцій у Кроці 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Крок 2 — Точка доступу {% endroboWikiTitle %}

Якщо ви виймаєте ІК-пульт з коробки та підключаєте його до джерела живлення, він створить точку доступу з назвою "tasmota-XXXXXXX". Підключіться до неї. Повинно відкритися вікно конфігурації. Якщо цього не сталося, відкрийте веб-браузер та перейдіть на сторінку `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Вкажіть дані для підключення до Wi-Fi. Після цього ІК-пульт підключиться до мережі Wi-Fi. Перевірте пристрій за його IP-адресою в мережі. Щоб знайти його, ви можете використовувати додаток для мобільних пристроїв [Fing](https://www.fing.com/products) або
інструмент командного рядка [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Крок 3 — Конфігурація {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Перейдіть до **"Configuration"**->**"Configure other"**. У рядку **"Template"** вставте наступне:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Переконайтеся, що прапорці **"Activate"** та **"MQTT Enable"** увімкнені. Якщо ні, увімкніть їх та натисніть кнопку Save.

Поверніться до **"Main Menu"** та перейдіть до **"Configuration"** -> **"Configure MQTT"**.
Вкажіть свої дані MQTT тут:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Це все щодо ESP наразі. Наступним кроком буде встановлення інтеграції з Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Крок 4 — Налаштування інтеграції {% endroboWikiTitle %}

У цій статті передбачається, що у вас є Home Assistant та HACS. Перейдіть до HACS та додайте власний репозиторій.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Для цього натисніть три крапки в правому верхньому куті, оберіть **CUSTOM REPOSITORIES**
та вставте цей URL: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. у категорії оберіть "Integration". Після цього знайдіть його у пошуку та встановіть. Не забудьте перезапустити Home Assistant після цього.

Відкрийте журнали ІК-пульта. Для цього перейдіть за відповідною локальною URL-адресою або відкрийте знову [webflasher.robonomics.network](https://webflasher.robonomics.network/) та оберіть "Tasmota IR" та "ESP32". Натисніть "Connect" та оберіть порт.
Натисніть **VISIT DEVICE**, і ви побачите головну сторінку пристрою. Перейдіть до "Consoles" -> "console".

Наведіть свій ІК-пульт (наприклад, від кондиціонера) на ІК-пульт Robonomics та натисніть кнопки на пульті. Ви побачите наступний журнал у консолі:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
Вам потрібна інформація з теми `IRHVAC`.

Відкрийте файл `configuration.yaml` нашого екземпляра Home Assistant та вставте наступне:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # Виберіть один із наступних варіантів:
    # Стан оновлюється, коли пристрій tasmota отримує ІК-сигнал (включає власну передачу та оригінальний пульт)
    # корисно, коли звичайний пульт використовується разом з пристроєм tasmota, може бути менш надійним, ніж другий варіант.
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # Стан оновлюється, коли пристрій tasmota завершує передачу ІК, повинно бути досить надійним.
    #state_topic: "stat/<your_tasmota_device>```>/РЕЗУЛЬТАТ"
    # Розкоментуйте, якщо ваші 'доступні теми' пристрою Tasmota IR відрізняються (якщо пристрій у HA вимкнено)
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <датчик температури в кімнаті> - # обов'язково для вимірювання температури в кімнаті. напр. sensor.kitchen_temperature
    humidity_sensor: None #необов'язково - за замовчуванням None (напр. sensor.kitchen_humidity)
    power_sensor: None #необов'язково - за замовчуванням None (напр. binary_sensor.kitchen_ac_power)
    vendor: "<Ваш вендор тут>" #знайдіть свого вендора в логах.
    min_temp: 16 #необов'язково - за замовчуванням 16 ціле значення
    max_temp: 32 #необов'язково - за замовчуванням 32 ціле значення
    target_temp: 26 #необов'язково - за замовчуванням 26 ціле значення
    initial_operation_mode: "off" # необов'язково - за замовчуванням "off" рядкове значення (один з "supported_modes")
    away_temp: 24 #необов'язково - за замовчуванням 24 ціле значення
    precision: 1 #необов'язково - за замовчуванням 1 ціле або десяткове значення. Може бути встановлено на 1, 0.5 або 0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Використовуйте "fan_only" навіть якщо Tasmota показує "Mode":"Fan"
      - "auto"
      - "off" #Вимикає кондиціонер - Повинно бути в лапках
      # Деякі пристрої мають "auto" та "fan_only" переплутані
      # Якщо наступні два рядки розкоментовані, "auto" та "fan" повинні бути закоментовані
      #- "auto_fan_only" #якщо пульт показує вентилятор, але tasmota каже auto
      #- "fan_only_auto" #якщо пульт показує auto, але tasmota каже fan
    supported_fan_speeds:
      # Деякі пристрої кажуть max, але це високо, і auto, яке є максимумом
      # Якщо ви розкоментуєте наступні два, вам потрібно закоментувати high та max
      # - "auto_max" #стане max
      # - "max_high" #стане high
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
      - "vertical" #від верху донизу
      # - "horizontal" # Зліва направо
      # - "both"
    default_quiet_mode: "Off" #необов'язково - за замовчуванням "Off" рядкове значення
    default_turbo_mode: "Off" #необов'язково - за замовчуванням "Off" рядкове значення
    default_econo_mode: "Off" #необов'язково - за замовчуванням "Off" рядкове значення
    hvac_model: "-1" #необов'язково - за замовчуванням "1" рядкове значення
    celsius_mode: "On" #необов'язково - за замовчуванням "On" рядкове значення
    default_light_mode: "Off" #необов'язково - за замовчуванням "Off" рядкове значення
    default_filter_mode: "Off" #необов'язково - за замовчуванням "Off" рядкове значення
    default_clean_mode: "Off" #необов'язково - за замовчуванням "Off" рядкове значення
    default_beep_mode: "Off" #необов'язково - за замовчуванням "Off" рядкове значення
    default_sleep_mode: "-1" #необов'язково - за замовчуванням "-1" рядкове значення
    default_swingv: "high" #необов'язково - за замовчуванням "" рядкове значення
    default_swingh: "left" #необов'язково - за замовчуванням "" рядкове значення
    keep_mode_when_off: True #необов'язково - за замовчуванням False булеве значення: Має бути True для MITSUBISHI_AC, ECOCLIM, тощо.
    toggle_list: #необов'язково - за замовчуванням []
      # Властивість toggle - це налаштування, яке не зберігає стану увімкнення.
      # Встановіть це, якщо ваші властивості кондиціонера є функцією перемикання.
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

Змініть всі необхідні заявки в вставленій частині на значення з повідомлення консолі. В результаті частина вашого файлу конфігурації повинна виглядати схоже на це
(у прикладі невикористана заявка була видалена):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "клімат-контроль бангкоку"
    unique_id : "клімат-тест бангкоку"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #необов'язково - за замовчуванням 16 ціле значення
    max_temp: 31 #необов'язково - за замовчуванням 32 ціле значення
    target_temp: 25 #необов'язково - за замовчуванням 26 ціле значення
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Використовуйте "fan_only" навіть якщо Tasmota показує "Mode":"Fan"
      - "auto"
      - "off" #Вимикає кондиціонер - Повинно бути в лапках
      # Деякі пристрої мають "auto" та "fan_only" переплутані
      # Якщо наступні два рядки розкоментовані, "auto" та "fan" shoud бути закоментовані
      #- "auto_fan_only" #якщо пульт показує вентилятор, але tasmota каже auto
      #- "fan_only_auto" #якщо пульт показує auto, але tasmota каже fan
    supported_fan_speeds:
      # Деякі пристрої кажуть max, але це високо, і auto, яке є максимумом
      # Якщо ви розкоментуєте наступні два, вам потрібно закоментувати high та max
      # - "auto_max" #стане max
      # - "max_high" #стане high
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #від верху донизу

    hvac_model: "-1" #необов'язково - за замовчуванням "1" рядкове значення

    keep_mode_when_off: True #необов'язково - за замовчуванням False булеве значення: Має бути True для MITSUBISHI_AC, ECOCLIM, тощо.

```

Збережіть `configuration.yaml` та перезапустіть Home Assistant.
Після перезапуску ви можете додати на UI нову картку термостата та вибрати відновлений пристрій.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

Якщо у вас виникли проблеми з режимом GUI, переключіться на "РЕДАКТОР КОДУ" та напишіть наступне:
```
type: thermostat
entity: climate.<your climate name>
```

{% roboWikiNote { type: "warning"}%} Усі пристрої від Robonomics можна придбати на офіційному [веб-сайті](https://robonomics.network/devices/).{% endroboWikiNote %}