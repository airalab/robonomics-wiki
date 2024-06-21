---
title: Попередньо встановлене зображення для Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Ласкаво просимо до посібника з встановлення Home Assistant з інтеграцією Robonomics на Raspberry Pi. Home Assistant - це система автоматизації домашнього використання з відкритим кодом, яка надає централізовану платформу для керування розумними пристроями в домашній мережі. Інтегруючись з Robonomics, децентралізованою хмарною службою, ви можете покращити функціональність та безпеку вашого розумного будинку. У цій статті ми надамо пошагові інструкції щодо встановлення Home Assistant з Robonomics на Raspberry Pi, що дозволить вам автоматизувати та керувати різними аспектами вашого будинку за допомогою безпечного та децентралізованого рішення. Почнемо!** 

## Апаратне забезпечення, яке вам потрібно для встановлення

Якщо ви ще не включили Home Assistant до своєї системи розумного будинку, важливо знати про обладнання, яке вам знадобиться для створення повноцінної системи розумного будинку з нуля.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Завантажте почередньо встановлене зображення Robonomics

Попередньо встановлене зображення Robonomics містить:
- Home Assistant Core
- IPFS
- MQTT брокер та інтеграцію
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

Ви можете перевірити вихідний код та завантажити останню версію зображення на [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. Налаштуйте зображення

Встановіть [Raspberry Pi Imager](https://www.raspberrypi.com/software/) на свій комп'ютер. Потім вставте SD-карту. 

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Запустіть програму Raspberry Pi Imager. Виберіть потрібне зображення як операційну систему та переконайтеся, що ви вибрали SD-карту зі спадного меню пам’яті.
У налаштуваннях:
- Встановіть ім'я користувача та пароль (збережіть типове ім'я користувача "pi", щоб його легко запам'ятати),  
- надайте назву та пароль Wi-Fi, 
- виберіть свою країну зі списку випадаючих меню
а потім `Записати` зображення.  
                   
<robo-wiki-note type="note">Уважно зберігайте ім'я користувача та пароль, оскільки ці облікові дані знадобляться у разі усунення неполадок</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

Ви можете знайти коди країн [тут](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes). 

## 3. Перший запуск

**Безпечно витягніть SD-карту**, вставте її в Raspberry Pi. Потім вставте адаптер Zigbee в Raspberry Pi. 

<robo-wiki-note type="warning">Важливо вставити адаптер Zigbee перед першим запуском Raspberry Pi! 
Це необхідно для автоматичної конфігурації мережі Zigbee. </robo-wiki-note>

**Якщо у вас є [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (який має всю необхідну прошивку), ви можете просто продовжити за цими інструкціями. Однак, якщо у вас є інший адаптер, першим, що вам потрібно зробити, є його прошивка за допомогою програмного забезпечення Zigbee2MQTT. Інструкції для вашого пристрою можна знайти [тут](https://www.zigbee2mqtt.io/information/supported_adapters.html).** 

Далі підключіть кабель живлення до вашого пристрою. Він повинен підключитися до вашої Wi-Fi мережі.  

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Після підключення Raspberry Pi засвітиться червоний світлодіод, а зелений світлодіод блимає деякий час. Зачекайте до 5 хвилин, поки Raspberry Pi завантажиться та зареєструється в мережі. 

Тепер знайдіть IP-адресу Raspberry Pi. Щоб знайти її, ви можете використовувати [мобільний додаток Fing](https://www.fing.com/products) або 
[інструмент командного рядка nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Знайдіть `robots-home` (необов'язкове ім'я може бути `Home (homeassistant)`) 
назва хост-машини в списку IP. 

У цьому прикладі адреса - `192.168.43.56`.  

Щоб перевірити, що все працює, відкрийте веб-переглядач та перейдіть на веб-сторінку `http://%RASPBERRY_IP_ADDRESS%:8123`. У цьому прикладі це буде `192.168.43.56:8123`. 
Якщо все гаразд, ви побачите веб-інтерфейс Home Assistant. Якщо веб-сторінка не відкривається, зачекайте до 5 хвилин, щоб Raspberry Pi завантажився і спробуйте знову.  

<robo-wiki-video loop controls :videos="[{src: 'QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Усунення неполадок

1. Щоб змінити налаштування Wi-Fi пізніше, вам потрібно увійти до Raspberry Pi за допомогою команди `ssh`. Для цього відкрийте термінал на своєму комп'ютері
і введіть команду ssh з вашим ім'ям користувача, яке ви створили на кроці "Налаштування зображення" (типове - "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

а потім використовуйте команду `sudo raspi-config`. Докладнішу інформацію про цю команду можна знайти на [офіційному сайті.](https://www.raspberrypi.com/documentation/computers/configuration.html)
