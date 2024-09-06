---
title: Експеримент уряду на ланцюжку

---

На даний момент, Polkadot є однією з найбільших DAO у світі! У екосистемі відбувається багато цікавих подій в рамках експерименту з управлінням на ланцюжку. Розробники Robonomics пропонують учасникам хакатону підвищити рівень занурення у спільноту Polkadot, інтегруючи події, пов'язані з голосуванням, нові запити до скарбниці, зміни епох та багато іншого, у типову систему розумного будинку.


---

У цій статті обговорюється управління розумним будинком через хмару Robonomics внаслідок будь-якої події в екосистемі Polkadot. Ось приклад того, як лампа може бути увімкнена, коли в мережі Polkadot подається нова референдум.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Вимоги

 - Встановлений екземпляр Home Assistant з інтеграцією Robonomics. Методи встановлення можна знайти [тут](/docs/install-smart-home).
 - Вузол Polkadot або шлюз для взаємодії. Наприклад - `wss://polkadot.api.onfinality.io`
 - Вузол або шлюз Robonomics для взаємодії.
 - Створений обліковий запис у форматі ED25519. Інформацію можна знайти [тут](/docs/sub-activate).
 - Створений обліковий запис у списку пристроїв підписки Robonomics. Дізнайтеся більше [тут](/docs/add-user).
 - Адреси власника та контролера підписки.

Бібліотеки Python:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Створення Прослуховувача Polkadot

Спочатку вам потрібно створити скрипт, який буде слухати нові події в мережі Polkadot. У прикладі ми будемо відстежувати створення нових Референдумів.

Для зручності тестування використовувався локальний вузол Polkadot у режимі розробки. Ви можете знайти посібник з розгортання [тут](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

Для підключення до публічного вузла змініть "POLKAD"Змініть значення змінної "POLKADOT_GATEWAY".

Приклад коду:


{% codeHelper {copy: true}%}

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Початок кількості референдумів:', data.value)
    if update_nr > 0:
        print('Збільшення кількості референдумів:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

Цей скрипт буде слухати зміни в поточному номері референдуму та відображати номер останнього референдуму.

### Тестування

Запустіть програму та відкрийте [polkadot.js](https://polkadot.js.org/apps/#/explorer).
Щоб перейти на локальний вузол розробки, клацніть на значок у верхньому лівому куті, і з'явиться бічне меню. Виберіть "Development" та "Local Node" унизу, а потім клацніть "Switch".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

Ви перейдете на локальний вузол. Перейдіть на вкладку "Governance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

Створіть новий преімедж. Давайте залишимо примітку в мережі. Підпишіть та надішліть її в мережу.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

Ви отримаєте його хеш. Скопіюйте його та перейдіть на вкладку "Governance" -> "Referenda". Зробіть "Подати пропозицію". Оскільки це тестова мережа, більшість налаштовуваних полів можна залишити за замовчуванням. Вставте хеш преімеджу та підпишіть пропозицію.


{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

Після надсилання його в мережу програма виявить нову пропозицію та виведе наступні журнали:

```
Початок кількості референдумів: 0
Збільшення кількості референдумів: 1## Підключення до розумного будинку

Тепер нам потрібно додати взаємодію з розумним будинком після створення нової пропозиції.

Для цього нам потрібно знати наступне:
- Домен служби
- Назва служби
- Цільова сутність
- Дані - повинні бути типу "dict"

Давайте подивимося, де їх знайти. Відкрийте встановлену інстанцію Home Assistant. Перейдіть до "Інструменти розробника -> Служби", виберіть будь-яку службу та перейдіть у режим YAML. Розглянемо приклад перемикача.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"services"} %}{% endroboWikiPicture %}

Ключ "service" містить домен та назву служби. Все перед крапкою - це домен, а все після крапки - назва служби. Також потрібне поле даних.

Щоб знайти цільову сутність, перейдіть до "Налаштування -> Пристрої та служби -> Сутності". Там буде стовпчик з "ідентифікатором сутності" - це необхідний параметр цільової сутності.

Тепер, коли ми знаємо всі параметри, давайте розглянемо, що відбудеться в скрипті.

Скрипт підключиться до локального демона IPFS. (Якщо ви слідували інструкціям з налаштування розумного будинку, у вас вже працює демон IPFS.)

Спочатку ми сформуємо команду у форматі JSON. Далі повідомлення шифрується за ключами користувача та контролера. Потім зашифровану команду зберігають у файлі та додають до IPFS. Після цього отриманий хеш IPFS відправляється на паракшен Robonomics через екстрикс `Launch` на адресу контролера. Коли контролер отримує запуск, він завантажує файл з IPFS, розшифровує його та викликає вказану службу всередині.

Повний код виглядає наступним чином:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# частина polkadot
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Частина Robonomics

# Облікові дані Robonomics
# Адреса користувача повинна бути вRWS пристрої

# Адреса користувача повинна бути ED25519
user_seed = "<SEED_PHRASE>"
controller_address = "<CONTROLLER_ADDRESS>"
sub_owner_address = "<OWNER_ADDRESS>"

# Команда
service_domain = "<DOMAIN>"  # домен - це те, що знаходиться перед крапкою в назві сервісу. Наприклад, "switch"
service_name = "<NAME>"  # ім'я - це те, що йде після крапки в назві сервісу. Наприклад, "turn_on"
target_entity = "<ENTITY_ID>"  # ідентифікатор сутності. Наприклад, "switch.boiler"
data = {}  # Повинно бути словником


def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Початок підрахунку референдумів:', data.value)

    if update_nr > 0:
        print('Збільшення підрахунку референдумів:', data.value)
        # Надіслати запуск на адресу контролера з хешем ipfs
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"Результат транзакції: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    Зашифрувати повідомлення за допомогою приватного ключа відправника та публічного ключа отримувача
    :param message: Повідомлення для шифрування
    :param sender_keypair: Ключова пара облікового запису відправника
    :param recipient_public_key: Публічний ключ отримувача
    :return: зашифроване повідомлення
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# Форматування повідомлення для запуску
data['entity_id'] = target_entity
command = {'platform': service_domain, 'name': service_name, 'params': data}

message = json.dumps(command)
print(f"Повідомлення: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# Зашифрувати команду
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"Зашифроване повідомлення: {message}")
filename = "temporal_file"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```python
result_ipfs  = result["Hash"]
    print(f"Хеш IPFS: {result_ipfs}")
    print(f"Хеш IPFS для запуску {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

якщо ви все зробили правильно, ви побачите наступні журнали:
```
Повідомлення: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
Зашифроване повідомлення: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
Хеш IPFS: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
Хеш IPFS для запуску 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Початкова кількість референдумів: 0
Збільшення кількості референдумів: 1
Результат транзакції: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```