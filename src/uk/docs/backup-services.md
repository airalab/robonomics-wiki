---
title: Послуги резервного копіювання

contributors: [tubleronchik, LoSk-p]
tools:
  - Інтеграція Robonomics Home Assistant 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**У цій статті ви дізнаєтеся, як створювати резервні копії конфігурації вашого додатка Home Assistant та відновлювати її за потреби. Для створення резервних копій викликається служба, яка генерує захищений архів з файлами конфігурації. Також служба додає конфігурацію Mosquitto brocker та Zigbee2MQTT до резервної копії, якщо вони існують. Потім ця служба додає архів до IPFS та зберігає отриманий CID в Robonomics Digital Twin.**
## Створення резервної копії конфігурації Home Assistant

Створення резервної копії дозволяє легко відновити конфігурацію вашого додатка Home Assistant у разі виникнення неполадок.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "УВАГА"}%}Для створення резервної копії та відновлення конфігурації необхідно використовувати **індивідуальний шлюз IPFS**, такий як Pinata. Без цього ваша резервна копія буде збережена лише на вашому локальному вузлі IPFS, що може унеможливити відновлення конфігурації Home Assistant у разі відмови локального вузла.
{% endroboWikiNote %}

1. У веб-інтерфейсі Home Assistant перейдіть до `Інструменти розробника` -> `Служби`. Знайдіть `Robonomics: Зберегти резервну копію в Robonomics` та натисніть `ВИКЛИКАТИ СЛУЖБУ`.

2. Зачекайте, доки ви не побачите сповіщення `Резервна копія була оновлена в Robonomics` у `Сповіщеннях`.


{% roboWikiNote {type: "warning", title: "УВАГА"}%} Не намагайтеся створити резервну копію або відновити конфігурацію безпосередньо після завантаження Home Assistant та інтеграції Robonomics. Будь ласка, **почекайте приблизно 5 хвилин**, щоб завершити початкове налаштування. {% endroboWikiNote %}

Аргументи служби:
- **Повна резервна копія** (за замовчуванням: Ложь) - додає базу даних до резервної копії, тому історія станів сутностей також буде збережена.
- **Шлях до файлу пароля mosquitto** (за замовчуванням: `/etc/mosquitto`) - Якщо ви використовували методи встановлення Home Assistant Core або Docker і не маєте типового шляху до брокера Mosquitto, вам слід змінити цей параметр. *Не потрібно для Home Assistant OS або Superviser*.

## Відновлення конфігурації Home Assistant з резервної копії

Для відновлення конфігурації вам знадобиться встановлений Home Assistant та інтеграція Robonomics.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Для успішного відновлення конфігурації в методах встановлення Home Assistant Core та Docker вам потрібно виконати додаткові кроки налаштування, як описано в кінці сторінки.
{% endroboWikiNote %}

1. Встановіть Home Assistant з інтеграцією Robonomics (якщо вона ще не встановлена), слідуючи крокам зі статті для [бажаного методу встановлення](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Налаштуйте інтеграцію Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration), використовуючи **ті самі seeds**, які ви використовували у попередній конфігурації Robonomics. Якщо ваша підписка закінчилася, [переактивуйте її](https://wiki.robonomics.network/docs/sub-activate).

3. У веб-інтерфейсі Home Assistant перейдіть до `Інструменти розробника` -> `Сервіси`. Знайдіть `Robonomics: Відновлення з резервної копії в Robonomics` та натисніть `ВИКЛИКАТИ СЕРВІС`. Перейдіть на сторінку `Огляд`, щоб перевірити статус вашої резервної копії.

4. Після відновлення Home Assistant автоматично перезапуститься. Якщо з якоїсь причини Home Assistant не перезапускається, ви можете перевірити статус відновлення, спостерігаючи за станом сутності `robonomics.backup`. Якщо статус - `відновлено`, вам потрібно вручну перезапустити Home Assistant, перейшовши до `Налаштування` > `Система` та натиснувши кнопку `ПЕРЕЗАПУСК`, розташовану в правому верхньому куті.

5. Якщо ваша резервна копія включає конфігурацію Zigbee2MQTT або Mosquitto, вам потрібно перезапустити ці сервіси, щоб увімкнути нову конфігурацію. Ви можете це зробитиВи можете відновити конфігурацію Mosquitto та Zigbee2MQTT для методу установки Home Assistant Core вручну, перезапустивши служби окремо, або просто перезапустивши комп'ютер Home Assistant, щоб забезпечити перезапуск усіх служб.

Аргументи служби:
- **Шлях до файлу пароля mosquitto** (за замовчуванням: `/etc/mosquitto`) - Якщо ви використовували методи установки Home Assistant Core або Docker і не маєте шляху за замовчуванням до брокера Mosquitto, вам слід змінити цей параметр. *Не потрібно для Home Assistant OS або Superviser*.
- **Шлях до конфігурації Zigbee2MQTT** (за замовчуванням: `/opt/zigbee2mqtt`) - Якщо ви використовували методи установки Home Assistant Core або Docker і не маєте шляху за замовчуванням до Zigbee2MQTT, вам слід змінити цей параметр. *Не потрібно для Home Assistant OS або Superviser*.

## Відновлення конфігурації Mosquitto та Zigbee2MQTT для методу установки Home Assistant Core

Якщо резервна копія включає конфігурацію для Mosquitto або Zigbee2MQTT, під час процесу відновлення вони будуть розміщені за шляхом за замовчуванням або за шляхом, вказаним у аргументах. Однак, якщо ви встановили інтеграцію Robonomics в існуючий Home Assistant Core *(не з попереднього образу Robonomics)*, користувач `homeassistant` може не мати доступу до цього шляху.

Отже, для відновлення конфігурації Mosquitto та Zigbee2MQTT вам потрібно надати необхідні права на читання користувачу `homeassistant`:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Резервне копіювання конфігурації Mosquitto та Zigbee2MQTT для методу установки Home Assistant Docker

Для резервного копіювання конфігурацій Mosquitto та Zigbee2MQTT з контейнера Docker вам потрібно створити томи для їхніх відповідних конфігурацій. Це можна зробити, запустивши контейнер Home Assistant з додатковими аргументами:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

або внесіть зміни у ваш файл `compose.yaml`:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /ШЛЯХ_ДО_ВАШОГО_КОНФІГУРАЦІЇ:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"Примітка"}%}Зверніть увагу, що типові шляхи для конфігурацій Mosquitto та Zigbee2MQTT - `/etc/mosquitto` та `/opt/zigbee2mqtt` відповідно. Однак ці шляхи можуть відрізнятися залежно від вашого конкретного налаштування.
{% endroboWikiNote %}

## Кнопки резервного копіювання

Крім використання служб для роботи з резервними копіями, ви можете спростити процес, використовуючи кнопки `button.create_backup` та `button.restore_from_backup` з інтеграції Robonomics. Ці кнопки викликають відповідні служби з типовими параметрами (кнопка резервного копіювання створює резервну копію без історії).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Щоб додати кнопки на вашу панель, дотримуйтесь цих кроків:

1. Натисніть на три крапки у верхньому правому куті панелі.
2. Виберіть `Редагувати панель`.
3. Натисніть кнопку `Додати картку` у нижньому правому куті.
4. Виберіть картку `Сутності`.
5. У полі `Сутності` знайдіть сутності button.create_backup та button.restore_from_backup.
6. Натисніть `Зберегти`, щоб додати сутності на картку.
7. Завершіть редагування, натиснувши кнопку `Готово` у верхньому правому куті.