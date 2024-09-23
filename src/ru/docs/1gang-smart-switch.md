---
title: 1 Ганговый Смарт-выключатель
contributors: [nakata5321]
---
Эта статья покажет вам процесс настройки 1 Гангового Смарт-выключателя.

{% roboWikiNote {type: "warning"}%}Все устройства от Robonomics можно приобрести на официальном [сайте](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTWhDu1PdQgR1ZuLuGpEtYG8uMm8eiWLziK1zLupQwU2i', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Шаг 1 — Прошивка {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Все устройства от Robonomics поставляются с предустановленной прошивкой. Однако, поскольку все устройства являются наборами для разработки, инструкции охватывают вариант прошивки устройства с нуля. Если вы не хотите делать это сейчас, перейдите к [**Шагу 2 - Точка доступа**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Извлеките устройство из коробки и подключите его к компьютеру. Затем перейдите на веб-сайт [webflasher.robonomics.network](https://webflasher.robonomics.network/). Это веб-прошивальщик.

{% roboWikiVideo {videos:[{src: 'QmVWmGSnvGwQ3dQfZC8iM5KHBoGpaWVXXUjNuNesULQrGw', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Примечание! Веб-прошивальщик работает только с браузерами Google Chrome или Microsoft Edge.{% endroboWikiNote %}

В выпадающем списке "Firmware" выберите опцию **"SWS-1G-E-11-23"**, а затем в "SELECT CHIP" выберите **"ESP32"**. Нажмите кнопку **"CONNECT"**.
Появится всплывающее окно, где вам нужно выбрать последовательный порт, к которому подключено устройство (обычно это `/ttyUSB0`). Затем выберите **"INSTALL SWS-1G-E-11-23"**.
На следующем окне вы можете выполнить **CLEAR INSTALLATION**, отметив **ERASE DEVICE**. Нажмите Далее, а затем Установить. Подождите, пока прошивка загрузится на устройство Smart switch.

После завершения процесса установки появится всплывающее окно конфигурации Wi-Fi. Укажите учетные данные Wi-Fi.

После настройки Wi-Fi вы можете посетить устройство с помощью кнопки **VISIT DEVICE**. Позже вы сможете посетить устройство по его IP-адресу в сети. Чтобы найти его, вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Пропустите **Шаг 2 — Точка доступа** и перейдите к [**Шагу 3 — Конфигурация**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Шаг 2 — Точка доступа {% endroboWikiTitle %}

Если вы извлекли Смарт-выключатель из коробки и подключили его к источнику питания, он создаст точку доступа с именем "robonomics-XXXXXXX". Подключитесь к нему.
Должно открыться окно конфигурации. Если этого не произошло, откройте веб-браузер и перейдите на страницу `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"image"} %}{% endroboWikiPicture %}

Укажите учетные данные Wi-Fi. После этого устройство Smart switch подключится к сети Wi-Fi. Проверьте устройство по его IP-адресу в сети. Чтобы найти его, вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или [инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Шаг 3 — Конфигурация {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

Перейдите в **"Configuration"**->**"Configure other"**. В строку **"Template"** вставьте следующее:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-1L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,1,224,1,0,0,320,1,0,0,0,0,1,1,1,32,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Убедитесь, что флажок **"Activate"** и **"MQTT Enable"** включены. Если нет, включите их и нажмите кнопку Сохранить.

Вернитесь в главное меню и перейдите в **"Configuration"** -> **"Configure MQTT"**.
Укажите здесь ваши учетные данные MQTT:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"image"} %}{% endroboWikiPicture %}

Это все, что касается ESP на данный момент. Следующим шагом будет установка интеграции с Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Шаг 4 — Настройка интеграции {% endroboWikiTitle %}

В этой статье предполагается, что у вас есть Home Assistant. Чтобы подключить устройство Smart Switch к Home Assistant, вам нужно установить интеграцию Tasmota.

{% roboWikiVideo {videos:[{src: 'QmQw6aA5e7UqT1hZrAV8m1UPq1rWCgLsWcVufuxitQm84p', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

По сути, Home Assistant автоматически обнаружит интеграцию Tasmota. Но если этого не произошло, добавьте ее вручную.
Это все. Теперь вы можете добавить сущность выключателя на панель управления.

{% roboWikiNote {type: "warning"}%}Все устройства от Robonomics можно приобрести на официальном [сайте](https://robonomics.network/devices/).
{% endroboWikiNote %}