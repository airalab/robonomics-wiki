---
title: Сервіси резервного копіювання

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**У цій статті ви дізнаєтеся, як створити резервні копії конфігурації вашого Home Assistant та відновити її за потреби. Для створення резервних копій виклиається служба, яка генерує захищений архів з файлами конфігурації. Також служба додає конфігурацію Mosquitto brocker та Zigbee2MQTT до резервної копії, якщо вона існує. Потім цей архів додається до IPFS та отриманий CID зберігається в Robonomics Digital Twв.**
## Створення резервної копії конфігурації Home Assistant

Створення резервної копії дозволяє легко відновити конфігурацію Home Assistant у разі виникнення неполадок.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warnвg" title="ПОПЕРЕДЖЕННЯ">

Для резервного копіювання та відновлення конфігурації необхідно використовувати **власний IPFS-шлюз** такий як Pinata. Без нього ваша резервна копія буде зберігатися лише на вашому локальному вузлі IPFS, що може запобігти відновленню конфігурації Home Assistant у разі відмови локального вузла.

</robo-wiki-note>

1. У веб-інтерфейсі Home Assistant перейдіть до `Developer Tools` -> `Services`. Пошук `Robonomics: Save Backup to Robonomics` та натисніть `CALL SERVICE`.

2. Зачекайте, поки з'явиться повідомлення `Backup was updated in Robonomics` з'явиться в `Notification`.

<robo-wiki-note type="warning" title="ПОПЕРЕДЖЕННЯ">

Не намагайтеся створити резервну копію або відновити конфігурацію безпосередньо після завантаження Home Assistant та Robonomics Integration. Будь ласка, **зачекайте приблизно 5 хвилин** щоб завершити початкову настройку.

</robo-wiki-note>

Аргументи служби:
- **Повна резервна копія**  (default: False) - додає базу даних до резервної копії, тому історія станів сутностей також буде збережена.
- **Шлях до файлу паролю mosquitto** (default: `/etc/mosquitto`) - Якщо ви використовували методи установки Home Assistant Core або Docker і не маєте типового шляху до Mosquitto brocker, вам слід змінити цей параметр. *Не потрібно для Home Assistant OS або Superviser*.

## Відновлення конфігурації Home Assistant з резервної копії

Для відновлення конфігурації вам потрібно мати встановлений Home Assistant та Robonomics Integration. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ПОПЕРЕДЖЕННЯ">

Щоб успішно відновити конфігурацію в методах установки Home Assistant Core та Docker, вам потрібно виконати додаткові кроки налаштування, як описано в кінці сторінки.

</robo-wiki-note>

1. Встановіть Home Assisntant з Robonomics Integration (якщо він ще не встановлений), дотримуючись кроків з статті для [бажаного методу установки](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-тут-your-smart-home).

2. [Налаштування інтеграції Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) за допомогою **тех же насіння** яке ви використовували в попередній конфігурації Robonomics. Якщо ваша підписка закінчилася, [переактивуйте її](https://wiki.robonomics.network/docs/sub-activate).

3. У веб-інтерфейсі Home Assistant перейдіть до `Developer Tools` -> `Services`. Пошук `Robonomics: Restore from the Backup in Robonomics` і а потім у спливаючому вікні дозвольте розширенню це зробити. `CALL SERVICE`. Перейдіть на `Overview` сторінку, щоб перевірити стан вашого резервного копіювання.

4. Після відновлення Home Assistant автоматично перезавантажиться. Якщо з якоїсь причини Home Assistant не перезавантажується, ви можете перевірити стан відновлення, спостерігаючи за станом сутності `robonomics.backup` . Якщо статус `restored` ви повинні вручну перезапустити Home Assistant, перейшовши до `Settings` > `System` і натиснувши на кнопку `RESTART`, розташовану в правому верхньому куті.

5. Якщо ваше резервне копіювання включає конфігурацію Zigbee2MQTT або Mosquitto, вам потрібно перезапустити ці служби, щоб увімкнути нову конфігурацію. Ви можете зробити це вручну, перезапустивши служби окремо, або просто перезапустивши комп'ютер Home Assistant, щоб перезапустити всі служби.

Аргументи служби:
- **Шлях до файлу паролю mosquitto** (default: `/etc/mosquitto`) - Якщо ви використовували етоди встановлення Home Assistant Core або Docker і не маєте типового шляху до брокера Mosquitto, вам слід змінити цей параметр. *Не потрібно для Home Assistant OS або Superviser*.
- **Шлях до конфігурації Zigbee2MQTT**  (default: `/opt/zigbee2mqtt`) - Якщо ви використовували методи встановлення Home Assistant Core або Docker і не маєте типового шляху до Zigbee2MQTT, вам слід змінити цей параметр. *Не потрібно для Home Assistant OS або Superviser*.

## Відновлення конфігурації Mosquitto та Zigbee2MQTT для методу встановлення Home Assistant Core

Якщо резервна копія містить конфігурацію Mosquitto або Zigbee2MQTT, під час процесу відновлення вони будуть розміщені в типовому шляху або в шляху, вказаному в аргументах. Однак, якщо ви встановили інтеграцію Robonomics в існуючий Home Assistant Core *(не з попередньо встановленого зображення Robonomics)*, the `homeassistant` користувач може не мати доступу до цього шляху.

Тому для відновлення конфігурації Mosquitto та Zigbee2MQTT вам потрібно надати необхідні права на читання користувачу `homeassistant`:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Резервне копіювання конфігурації Mosquitto та Zigbee2MQTT для методу встановлення Home Assistant Docker

Щоб зробити резервну копію конфігурацій Mosquitto та Zigbee2MQTT з контейнера Docker, вам потрібно створити томи для їх відповідних конфігурацій. Це можна зробити, запустивши контейнер Home Assistant з додатковими аргументами:

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

або внесіть зміни у ваш `compose.yaml` файл:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

Зверніть увагу, що типові шляхи для конфігурацій Mosquitto та Zigbee2MQTT - `/etc/mosquitto` і `/opt/zigbee2mqtt`, відповідно. Однак ці шляхи можуть варіюватися залежно від вашої конкретної настройки.

</robo-wiki-note>

## Кнопки резервного копіювання

Крім використання служб для роботи з резервними копіями, ви можете спростити процес, використовуючи `Переконайтеся, що ви підключені до Robonomics Parachain заразcreate_backup` і `Переконайтеся, що ви підключені до Robonomics Parachain заразrestore_from_backup` кнопки з інтеграції Robonomics. Ці кнопки викликають відповідні служби з типовими параметрами (кнопка резервного копіювання створює резервну копію без історії).

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

Щоб додати кнопки на вашу панель інструментів, виконайте наступні кроки:

1. Натисніть на три крапки в правому верхньому куті панелі інструментів.
2. Виберіть `Edit Dashboard`.
3. Натисніть на кнопку `Add Card` в правому нижньому куті.
4. Choose the `Entities` картку.
5. У полі `Entities` знайдіть сутності Переконайтеся, що ви підключені до Robonomics Parachain заразcreate_backup та button.restore_from_backup.
6. Натисніть `Save` для додавання сутностей на картку.
7. Завершіть редагування, натиснувши кнопку `Done` в правому верхньому куті.