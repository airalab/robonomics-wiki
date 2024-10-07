---
title: Мониторинг энергии
contributors: [nakata5321]
---
Эта статья покажет вам процесс настройки мониторинга энергии.

{% roboWikiNote {type: "warning"}%} Все устройства от Robonomics можно приобрести на официальном [сайте](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Шаг 1 — Прошивка {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Все устройства от Robonomics поставляются с предустановленной прошивкой. Однако, поскольку все устройства являются наборами для разработки, инструкции охватывают вариант прошивки устройства с нуля. Если вы не хотите делать это сейчас, перейдите к [**Шагу 2 - Точка доступа**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Извлеките устройство из коробки и подключите его к компьютеру. Затем перейдите на веб-сайт [webflasher.robonomics.network](https://webflasher.robonomics.network/). Это веб-прошивка.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Примечание! Веб-прошивка работает только в браузерах Google Chrome или Microsoft Edge.
{% endroboWikiNote %}

В выпадающем списке "Прошивка" выберите опцию **"ENERGY MONITOR"**, а затем в "SELECT CHIP" выберите **"ESP32-S3"**. Нажмите кнопку **"CONNECT"**.
Появится всплывающее окно, где вам нужно выбрать последовательный порт, к которому подключено устройство (обычно это `/ttyUSB0`). Затем выберите **"INSTALL ENERGY-MONITOR_EN"**.
На следующем окне вы можете выполнить **CLEAR INSTALLATION**, установив флажок **ERASE DEVICE**. Нажмите Далее, а затем Установить. Дождитесь завершения загрузки прошивки на устройство мониторинга энергии.

После завершения процесса установки появится всплывающее окно конфигурации Wi-Fi. Укажите учетные данные Wi-Fi.

После настройки Wi-Fi вы можете посетить устройство, нажав кнопку **VISIT DEVICE**. Позже вы сможете посетить устройство по его IP-адресу в сети. Чтобы найти его, вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или
[инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Пропустите **Шаг 2 — Точка доступа** и перейдите к [**Шагу 3 — Конфигурация**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Шаг 2 — Точка доступа {% endroboWikiTitle %}

Если вы извлекли монитор энергии из коробки и подключили его к источнику питания, он создаст точку доступа с именем "robonomics-XXXXXXX". Подключитесь к ней. Должно открыться окно конфигурации. Если этого не произошло, откройте веб-браузер и перейдите на страницу `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Укажите учетные данные Wi-Fi. После этого устройство мониторинга энергии подключится к сети Wi-Fi. Проверьте устройство по его IP-адресу в сети. Чтобы найти его, вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или
[инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Шаг 3 — Конфигурация {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Перейдите в **"Configuration"**->**"Configure other"**. В строку **"Template"** вставьте следующее:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

Убедитесь, что флажок **"Activate"** и **"MQTT Enable"** включены. Если нет, включите и нажмите кнопку Сохранить.

Вернитесь в "главное меню" и перейдите в **"Configuration"** -> **"Configure MQTT"**.
Укажите здесь свои учетные данные MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

На этом пока все с ESP. Следующим шагом будет установка интеграции с Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Шаг 4 — Настройка интеграции {% endroboWikiTitle %}

В этой статье предполагается, что у вас есть Home Assistant. Чтобы подключить устройство мониторинга энергии к Home Assistant, вам нужно установить интеграцию "Tasmota".

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

По сути, Home Assistant автоматически обнаружит интеграцию "Tasmota". Но если этого не произошло, добавьте ее вручную.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

Вот и все. Теперь вы можете добавить сущности энергии на панель управления.

{% roboWikiNote {type: "warning"}%} Все устройства от Robonomics можно приобрести на официальном [сайте](https://robonomics.network/devices/).
{% endroboWikiNote %}