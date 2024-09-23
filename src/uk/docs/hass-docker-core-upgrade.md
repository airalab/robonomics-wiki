---
title: Оновлення вашого додатку Home Assistant Docker або Core для операційної системи подібної до Unix
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Інтеграція Robonomics Home Assistant 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**У цій статті містяться інструкції щодо оновлення вашого існуючого додатку Home Assistant Docker або Core (на операційній системі подібній до Unix) з інтеграцією Robonomics.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"УВАГА", type: "warning"}%}
  1. Передбачається, що Docker встановлено належним чином.
  2. Передбачається, що використовуються типові образи та контейнери Docker для Home Assistant або Home Assitant Core.
  3. IPFS та Libp2p-ws-proxy будуть встановлені як контейнери Docker.
{% endroboWikiNote %}


## Встановлення

Завантажте скрипт встановлення та запустіть його в терміналі:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Він перевірить, чи Docker встановлено належним чином. Потім спробує знайти IPFS та запропонує перевірити конфігурацію, якщо IPFS встановлено. Якщо IPFS не знайдено, скрипт встановить як IPFS, так і Libp2p-ws Proxy. Ви побачите наступний вивід:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker встановлено
$Користувач належить до групи docker.
Перевірка наявності IPFS... Це може зайняти кілька хвилин. Будь ласка, зачекайте
<...>
 ✔ Контейнер ipfs-daemon      запущено
 ✔ Контейнер lipb2p-ws-proxy  запущено
Все готово!
``` install_integration_core.sh
```

{% endcodeHelper %}

Якщо IPFS вже встановлено, ви побачите наступний вивід:
```shell
Docker встановлено
$Користувач належить до групи docker.
Перевірка наявності IPFS... Це може зайняти кілька хвилин. Будь ласка, зачекайте
IPFS-екземпляр знайдено. Переконайтеся, що ваша конфігурація налаштована належним чином з наступними параметрами:
      - 'Шлюз': '/ip4/0.0.0.0/tcp/8080'
      - Порти 4001, 5001 та 8080 доступні.
      Також, додайте наступні вузли-запуску:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      Чи ваша конфігурація налаштована належним чином? [так/Ні]:

```
У цьому випадку вам потрібно налаштувати файл конфігурації IPFS та підтвердити його.

{% roboWikiNote {title:"Увага!", type: "warning"}%} Належна конфігурація IPFS є важливою; не пропускайте цей крок!{% endroboWikiNote %}

## Завантаження інтеграції Robonomics

Ми використаємо [HACS](https://hacs.xyz/), щоб встановити інтеграцію. Якщо HACS ще не встановлено на вашому Home Assistant, спочатку вам потрібно [встановити](https://hacs.xyz/docs/setup/download/) його.

Далі, у вашому Home Assistant перейдіть до HACS та знайдіть `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Відкрийте його та натисніть `Завантажити` у правому нижньому куті. Завантаження репозиторію може зайняти деякий час.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Це все. Продовжуйте до наступної статті.