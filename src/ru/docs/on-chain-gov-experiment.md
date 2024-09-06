---
title: Эксперимент с управлением на цепи

---

В настоящее время Polkadot является одним из крупнейших DAO в мире! В экосистеме происходит много интересных событий в рамках эксперимента с управлением на цепи. Разработчики Robonomics предлагают участникам хакатона повысить уровень погружения в сообщество Polkadot, интегрируя события, связанные с голосованием, новыми запросами к казне, изменениями эпох и многим другим, в типичную систему умного дома.


---

В этой статье обсуждается управление умным домом через облако Robonomics в результате любого события в экосистеме Polkadot. Вот пример того, как лампа может включиться, когда в сети Polkadot подается новый референдум.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Требования

 - Установленный экземпляр Home Assistant с интеграцией Robonomics. Методы установки можно найти [здесь](/docs/install-smart-home).
 - Узел Polkadot или шлюз для взаимодействия. Например - `wss://polkadot.api.onfinality.io`
 - Узел или шлюз Robonomics для взаимодействия.
 - Созданный аккаунт в формате ED25519. Информацию можно найти [здесь](/docs/sub-activate).
 - Созданный аккаунт в списке устройств подписки Robonomics. Узнайте больше [здесь](/docs/add-user).
 - Адреса владельца и контроллера подписки.

Библиотеки Python:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Создание слушателя Polkadot

Сначала вам нужно создать скрипт, который будет слушать новые события в сети Polkadot. В примере мы будем отслеживать создание новых референдумов.

Для удобства тестирования использовался локальный узел Polkadot в режиме разработки. Вы можете найти руководство по развертыванию [здесь](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

Для подключения к общедоступному узлу измените "POLKADПеременная "POLKADOT_GATEWAY".

Пример кода:


{% codeHelper {copy: true}%}

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Начало подсчета референдумов:', data.value)
    if update_nr > 0:
        print('Увеличение количества референдумов:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

Этот скрипт будет отслеживать изменения в текущем номере референдума и отображать номер последнего референдума.

### Тестирование

Запустите программу и откройте [polkadot.js](https://polkadot.js.org/apps/#/explorer).
Чтобы переключиться на локальный узел разработки, нажмите на значок в верхнем левом углу, и появится боковое меню. Выберите "Development" и "Local Node" внизу, затем нажмите "Switch".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

Вы перейдете на локальный узел. Перейдите на вкладку "Governance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

Создайте новый преимидж. Давайте оставим заметку в сети. Подпишите и отправьте ее в сеть.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

Вы получите его хэш. Скопируйте его и перейдите на вкладку "Governance" -> "Referenda". Сделайте "Submit Proposal". Поскольку это тестовая сеть, большинство настраиваемых полей можно оставить по умолчанию. Вставьте хэш преимиджа и подпишите предложение.


{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

После отправки в сеть программа обнаружит новое предложение и выведет следующие журналы:

```
Начало подсчета референдумов: 0
Увеличение количества референдумов: 1## Подключение к умному дому

Теперь нам нужно добавить взаимодействие с умным домом после создания нового предложения.

Для этого нам нужно знать следующее:
- Домен службы
- Название службы
- Целевая сущность
- Данные - должны быть типа "dict"

Давайте посмотрим, где их найти. Откройте установленный экземпляр Home Assistant. Перейдите в "Инструменты разработчика -> Службы", выберите любую службу и переключитесь в режим YAML. Рассмотрим пример переключателя.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"services"} %}{% endroboWikiPicture %}

Ключ "service" содержит домен и название службы. Все до точки - это домен, а все после точки - название службы. Также требуется поле данных.

Чтобы найти целевую сущность, перейдите в "Настройки -> Устройства и службы -> Сущности". Там будет столбец с "идентификатором сущности" - это требуемый параметр целевой сущности.

Теперь, когда мы знаем все параметры, давайте рассмотрим, что произойдет в скрипте.

Скрипт будет подключаться к локальному демону IPFS. (Если вы следовали инструкциям по настройке умного дома, у вас уже запущен демон IPFS.)

Сначала мы сформируем команду в формате JSON. Затем сообщение будет зашифровано с использованием ключей пользователя и контроллера.
Затем зашифрованная команда сохраняется в файл и добавляется в IPFS. После этого полученный хэш IPFS отправляется на паракшен Robonomics через экструзию `Launch` на адрес контроллера.
Когда контроллер получает запуск, он загружает файл из IPFS, расшифровывает его и вызывает указанную внутри службу.

Полный код выглядит следующим образом:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# часть Polkadot
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Часть Robonomics

# Учетные данные Robonomics
# Адрес пользователя должен быть вУстройства RWS
# Адрес пользователя должен быть ED25519
user_seed = "<SEED_PHRASE>"
controller_address = "<CONTROLLER_ADDRESS>"
sub_owner_address = "<OWNER_ADDRESS>"

# Команда
service_domain = "<DOMAIN>"  # домен - то, что находится перед точкой в имени сервиса. Например, "switch"
service_name = "<NAME>"  # имя - то, что идет после точки в имени сервиса. Например, "turn_on"
target_entity = "<ENTITY_ID>"  # идентификатор_сущности. Например, "switch.boiler"
data = {}  # Должно быть словарем

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Начало подсчета референдумов:', data.value)

    if update_nr > 0:
        print('Увеличение количества референдумов:', data.value)
        # Отправить запуск на адрес контроллера с хэшем ipfs
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"Результат транзакции: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    Зашифровать сообщение с помощью закрытого ключа отправителя и открытого ключа получателя
    :param message: Сообщение для шифрования
    :param sender_keypair: Ключевая пара учетной записи отправителя
    :param recipient_public_key: Открытый ключ получателя
    :return: зашифрованное сообщение
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# Форматирование сообщения для запуска
data['entity_id'] = target_entity
command = {'platform': service_domain, 'name': service_name, 'params': data}

message = json.dumps(command)
print(f"Сообщение: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# Зашифровать команду
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"Зашифрованное сообщение: {message}")
filename = "temporal_file"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)result_ipfs  = result["Hash"]
    print(f"Хэш IPFS: {result_ipfs}")
    print(f"Хэш IPFS для запуска {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

если вы все сделали правильно, вы увидите следующие логи:
```
Сообщение: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
Зашифрованное сообщение: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
IPFS хэш: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
IPFS хэш для запуска 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Начальное количество референдумов: 0
Увеличение количества референдумов: 1
Результат транзакции: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```