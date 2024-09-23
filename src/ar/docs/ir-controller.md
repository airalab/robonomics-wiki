---
title: جهاز التحكم عن بعد بالأشعة تحت الحمراء
contributors: [nakata5321]
---
هذه المقالة ستوضح لك عملية إعداد جهاز التحكم عن بعد بالأشعة تحت الحمراء.

{% roboWikiNote {type: "warning"}%} يمكن شراء جميع الأجهزة من Robonomics من الموقع الرسمي [هنا](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} الخطوة 1 — تفليش {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} جميع الأجهزة من Robonomics تأتي مفلشة مسبقًا. ومع ذلك، نظرًا لأن جميع الأجهزة هي أطقم تطوير، ستغطي التعليمات خيار تفليش الجهاز من البداية. إذا كنت لا ترغب في القيام بذلك الآن، فانتقل إلى [**الخطوة 2 - نقطة الوصول**](/docs/ir-controller/#step2). {% endroboWikiNote %}

خذ الجهاز من الصندوق وقم بتوصيله بالكمبيوتر. ثم اذهب إلى موقع الويب [webflasher.robonomics.network](https://webflasher.robonomics.network/). هذا هو موقع تفليش الويب.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} ملاحظة! موقع تفليش الويب يعمل فقط مع متصفحي Google Chrome أو Microsoft Edge. {% endroboWikiNote %}

في قائمة السقوط "Firmware"، اختر الخيار **"IR REMOTE"** ثم في "SELECT CHIP" اختر **"ESP32"**. اضغط على زر **"CONNECT"**.
سيظهر نافذة منبثقة حيث يجب عليك اختيار المنفذ التسلسلي الذي يتصل به الجهاز (عادةً ما يكون `/ttyUSB0`). ثم اختر **"INSTALL IR-REMOTE_EN"**.
في النافذة التالية، يمكنك إجراء **CLEAR INSTALLATION** عن طريق تحديد **ERASE DEVICE**. اضغط على Next ثم Install. انتظر حتى يتم تحميل البرنامج الثابت إلى جهاز التحكم بالأشعة تحت الحمراء.

بعد الانتهاء من عملية التثبيت، ستظهر نافذة منبثقة لتكوين الواي فاي. لديك خيارات:

1) يمكنك تقديم بيانات اعتماد الواي فاي، تخطي **الخطوة 2 - نقطة الوصول** والانتقال إلى [**الخطوة 3 - التكوين**](/docs/ir-controller/#step3).

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

بعد إعداد الواي فاي، يمكنك زيارة الجهاز عبر زر **VISIT DEVICE**. في وقت لاحق، يمكنك زيارة الجهاز عبر عنوان IP الخاص به في الشبكة. للعثور عليه، يمكنك استخدام تطبيق [Fing mobile app](https://www.fing.com/products) أو
أداة سطر الأوامر [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

2) أو قم بفصل الجهاز عن الكمبيوتر وقم بتوصيله بمصدر الطاقة. سيبدأ جهاز التحكم بالأشعة تحت الحمراء وينشئ نقطة اتصال واي فاي. للاتصال بجهاز التحكم بالأشعة تحت الحمراء بشبكة الواي فاي المنزلية من خلال نقطة اتصال، اتبع التعليمات في الخطوة 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} الخطوة 2 — نقطة الوصول {% endroboWikiTitle %}

إذا أخذت جهاز التحكم بالأشعة تحت الحمراء من الصندوق وقمت بتوصيله بمصدر الطاقة، سينشئ نقطة اتصال بالاسم "tasmota-XXXXXXX". اتصل به. يجب فتح نافذة التكوين. إذا لم يحدث ذلك، افتح متصفح الويب وانتقل إلى صفحة `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

قدم بيانات اعتماد الواي فاي. بعد ذلك، سيتصل جهاز التحكم بالأشعة تحت الحمراء بشبكة الواي فاي. تحقق من الجهاز عبر عنوان IP الخاص به في الشبكة. للعثور عليه، يمكنك استخدام تطبيق [Fing mobile app](https://www.fing.com/products) أو
أداة سطر الأوامر [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} الخطوة 3 — التكوين {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

انتقل إلى **"Configuration"**->**"Configure other"**. في سلسلة **"Template"**، أدخل ما يلي:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

تحقق من تفعيل خانة الاختيار **"Activate"** و **"MQTT Enable"**. إذا لم يكن مفعلًا، قم بتفعيله واضغط على زر Save.

ارجع إلى **"Main Menu"** وانتقل إلى **"Configuration"** -> **"Configure MQTT"**.
قدم بيانات اعتماد MQTT الخاصة بك هنا:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

هذا كل شيء بالنسبة لـ ESP حاليًا. الخطوة التالية هي تثبيت تكامل Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} الخطوة 4 — إعداد التكامل {% endroboWikiTitle %}

تفترض هذه المقالة أن لديك Home Assistant و HACS. انتقل إلى HACS وأضف مستودعًا مخصصًا.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

للقيام بذلك، اضغط على النقاط الثلاث في الزاوية العلوية اليمنى، اختر **CUSTOM REPOSITORIES**
وأدخل هذا الرابط: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. في الفئة اختر "Integration". بعد ذلك، ابحث عنه وقم بتثبيته. لا تنسى إعادة تشغيل Home Assistant بعد ذلك.

افتح سجلات جهاز التحكم بالأشعة تحت الحمراء. للقيام بذلك، انتقل إلى عنوان URL المحلي المناسب، أو افتح مرة أخرى [webflasher.robonomics.network](https://webflasher.robonomics.network/) واختر "Tasmota IR" و "ESP32". اضغط على "Connect" واختر المنفذ.
اضغط على **VISIT DEVICE**، وسترى صفحة الجهاز الرئيسية. انتقل إلى "Consoles" -> "console".

حدد جهاز التحكم بالأشعة تحت الحمراء الخاص بك (على سبيل المثال، من مكيف الهواء) إلى Robonomics IR Remote واضغط على الأزرار على جهاز التحكم عن بعد. ستحصل على سجل المعلومات التالي في الكونسول:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
تحتاج إلى معلومات من موضوع `IRHVAC`.

افتح ملف `configuration.yaml` لمثيل Home Assistant الخاص بنا وأدخل ما يلي:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Some Name Here>"
    command_topic: "cmnd/<your_tasmota_device>/irhvac"
    # اختر واحدة من الخيارات التالية:
    # يتم تحديث الحالة عندما يتلقى الجهاز tasmota إشارة IR (تشمل الإرسال الخاص والريموت الأصلي)
    # مفيد عند استخدام ريموت عادي بجانب جهاز tasmota، قد يكون أقل موثوقية من الخيار الثاني.
    state_topic: "tele/<your_tasmota_device>/RESULT"
    # يتم تحديث الحالة عندما يكتمل جهاز tasmota إرسال IR، يجب أن يكون موثوقًا تمامًا.
    #state_topic: "stat/<your_tasmota_device>/RESULT"
    # إلغاء تعليق إذا كانت 'موضوع الاتصال' لجهاز Tasmota IR مختلفة (إذا كان الجهاز في HA معطل)
    #availability_topic: "tele/<your_tasmota_device>/LWT"
    temperature_sensor: <مستشعر الحرارة في الغرفة> - # مطلوب لقياس درجة الحرارة في الغرفة. على سبيل المثال sensor.kitchen_temperature
    humidity_sensor: None #اختياري - الافتراضي None (على سبيل المثال sensor.kitchen_humidity)
    power_sensor: None #اختياري - الافتراضي None (على سبيل المثال binary_sensor.kitchen_ac_power)
    vendor: "<اسم البائع الخاص بك>" #ابحث عن بائعك في السجلات.
    min_temp: 16 #اختياري - الافتراضي قيمة صحيحة 16
    max_temp: 32 #اختياري - الافتراضي قيمة صحيحة 32
    target_temp: 26 #اختياري - الافتراضي قيمة صحيحة 26
    initial_operation_mode: "off" # اختياري - الافتراضي قيمة سلسلة "off" (واحدة من "supported_modes")
    away_temp: 24 #اختياري - الافتراضي قيمة صحيحة 24
    precision: 1 #اختياري - الافتراضي قيمة صحيحة أو عشرية 1. يمكن تعيينها إلى 1، 0.5 أو 0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # استخدم "fan_only" حتى لو أظهر Tasmota "Mode":"Fan"
      - "auto"
      - "off" #يوقف تشغيل مكيف الهواء - يجب أن يكون بين علامتي اقتباس
      # بعض الأجهزة لديها "auto" و "fan_only" مبدلة
      # إذا تم إلغاء تعليق السطرين التاليين، يجب تعليق "auto" و "fan"
      #- "auto_fan_only" #إذا أظهر الريموت المروحة ولكن Tasmota يقول auto
      #- "fan_only_auto" #إذا أظهر الريموت auto ولكن Tasmota يقول fan
    supported_fan_speeds:
      # بعض الأجهزة تقول max، لكنها عالية، و auto هو الحد الأقصى
      # إذا قمت بإلغاء تعليق السطرين التاليين، يجب عليك تعليق high و max
      # - "auto_max" #سيصبح max
      # - "max_high" #سيصبح high
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
      - "vertical" #من أعلى إلى أسفل
      # - "horizontal" # من اليسار إلى اليمين
      # - "both"
    default_quiet_mode: "Off" #اختياري - الافتراضي قيمة سلسلة "Off"
    default_turbo_mode: "Off" #اختياري - الافتراضي قيمة سلسلة "Off"
    default_econo_mode: "Off" #اختياري - الافتراضي قيمة سلسلة "Off"
    hvac_model: "-1" #اختياري - الافتراضي قيمة سلسلة "1"
    celsius_mode: "On" #اختياري - الافتراضي قيمة سلسلة "On"
    default_light_mode: "Off" #اختياري - الافتراضي قيمة سلسلة "Off"
    default_filter_mode: "Off" #اختياري - الافتراضي قيمة سلسلة "Off"
    default_clean_mode: "Off" #اختياري - الافتراضي قيمة سلسلة "Off"
    default_beep_mode: "Off" #اختياري - الافتراضي قيمة سلسلة "Off"
    default_sleep_mode: "-1" #اختياري - الافتراضي قيمة سلسلة "-1"
    default_swingv: "high" #اختياري - الافتراضي قيمة سلسلة ""
    default_swingh: "left" #اختياري - الافتراضي قيمة سلسلة ""
    keep_mode_when_off: True #اختياري - الافتراضي قيمة منطقية خاطئة: يجب أن تكون True لـ MITSUBISHI_AC، ECOCLIM، إلخ.
    toggle_list: #اختياري - الافتراضي []
      # الخاصية المقلوبة هي إعداد لا يحتفظ بالحالة التشغيلية.
      # ضع هذا إذا كانت خصائص مكيف الهواء لديك وظيفة تبديل.
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

قم بتغيير جميع البيانات اللازمة في الجزء المدرج بالقيم من رسالة الوحدة. وبناءً على ذلك، يجب أن يبدو جزء من ملف التكوين الخاص بك مشابهًا لهذا
(في المثال تم حذف البيانات غير المستخدمة):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "تحكم مناخ بانكوك"
    unique_id : "اختبار مناخ بانكوك"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #اختياري - الافتراضي قيمة صحيحة 16
    max_temp: 31 #اختياري - الافتراضي قيمة صحيحة 32
    target_temp: 25 #اختياري - الافتراضي قيمة صحيحة 26
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # استخدم "fan_only" حتى لو أظهر Tasmota "Mode":"Fan"
      - "auto"
      - "off" #يوقف تشغيل مكيف الهواء - يجب أن يكون بين علامتي اقتباس
      # بعض الأجهزة لديها "auto" و "fan_only" مبدلة
      # إذا تم إلغاء تعليق السطرين التاليين، "auto" و "fan" يجب أن يتم تعليقهما
      #- "auto_fan_only" #إذا أظهر الريموت المروحة ولكن Tasmota يقول auto
      #- "fan_only_auto" #إذا أظهر الريموت auto ولكن Tasmota يقول fan
    supported_fan_speeds:
      # بعض الأجهزة تقول max، لكنها عالية، و auto هو الحد الأقصى
      # إذا قمت بإلغاء تعليق السطرين التاليين، يجب عليك تعليق high و max
      # - "auto_max" #سيصبح max
      # - "max_high" #سيصبح high
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #من أعلى إلى أسفل

    hvac_model: "-1" #اختياري - الافتراضي قيمة سلسلة "1"

    keep_mode_when_off: True #اختياري - الافتراضي قيمة منطقية خاطئة: يجب أن تكون True لـ MITSUBISHI_AC، ECOCLIM، إلخ.

```

احفظ `configuration.yaml` وأعد تشغيل Home Assistant.
بعد إعادة التشغيل، يمكنك إضافة بطاقة ترموستات جديدة في واجهة المستخدم وتحديد الجهاز المدمج حديثًا.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

إذا كنت تواجه مشكلة في وضع الواجهة الرسومية، قم بالتبديل إلى "CODE EDITOR" واكتب ما يلي:
```
type: thermostat
entity: climate.<اسم مناخك>
```

{% roboWikiNote { type: "warning"}%} يمكن شراء جميع الأجهزة من Robonomics على الموقع الرسمي [هنا](https://robonomics.network/devices/).{% endroboWikiNote %}