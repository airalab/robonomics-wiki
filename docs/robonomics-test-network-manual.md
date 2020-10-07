# Ручной запуск сети Робономики из 3 узлов
> Требуется развернуть свою сеть Robonomics из N (N >= 2) узлов

## Требования
- Robonomics binary, скачать актуальный можно здесь: https://github.com/airalab/robonomics/releases/
- Subkey tool, скачать актуальный можно здесь: https://github.com/airalab/robonomics/releases/
- 3 сервера с root доступом к ним. Их ip-адресами в моем случае будут **165.227.171.127**, **159.89.25.75** и **159.89.30.50**

## Подготовка директорий
Скачаем 2 архива по ссылкам выше, перейдем в папку с ними в терминале.
Затем создадим директорию для проекта, распакуем в нее содержимое архивов и перейдем в созданную папку:
```
$ mkdir robonomics_test_network
$ tar -xf ./robonomics-ubuntu-0.21.0-x86_64.tar.xz -C ./robonomics_test_network/
$ tar -xf ./subkey-ubuntu-0.21.0-x86_64.tar.xz -C ./robonomics_test_network/
$ cd ./robonomics_test_network/
```

Создадим для каждого сервера отдельную директорию **uploads**, а также необходимые поддиректории, в них будем сохранять все файлы, предназначенные для выгрузки на конкретный сервер:
```
$ mkdir -p uploads/165.227.171.127/keystore && mkdir -p uploads/165.227.171.127/network
$ mkdir -p uploads/159.89.25.75/keystore && mkdir -p uploads/159.89.25.75/network
$ mkdir -p uploads/159.89.30.50/keystore && mkdir -p uploads/159.89.30.50/network
```

Также, создадим директорию **local** с поддиректориями **validators** и **sudo**, в которых будем локально хранить ключи валидаторов и sudo.
```
$ mkdir -p local/validators && mkdir -p local/sudo
```

## Подготовка spec.json
Используя бинарник робономики, сгенерируем файл **spec.json**, который возьмем за основу:
```
$ ./robonomics build-spec --chain dev > uploads/spec.json
```

Далее предстоит отредактировать данный файл, рассмотрим по очереди интересующие нас поля. 
Для начала поправим первые три поля, приведем их к следующему виду:
```json
"name": "Test Robonomics Network",
"id": "dev",
"chainType": "Live",
```

### bootNodes
Поле **bootNodes** представляет собой список строк, отформатированных нужным образом. Для каждой из наших нод необходимо прописать здесь соответствующую ей строку.
Для этого нам нужно сначала при помощи **subkey** создать ключ для каждой бутноды:
```
$ ./subkey generate-node-key uploads/165.227.171.127/network/secret_ed25519  
12D3KooWBPq1fDLQC2iqQ4FpM2mUpiXjBRcb8ptk7tbaqr2B6HZN
$ ./subkey generate-node-key uploads/159.89.25.75/network/secret_ed25519
12D3KooWRbGmdpbz6o1fe66wFs7nJsUYfBp2f3W7J1uDXj3gt4Bh
$ ./subkey generate-node-key uploads/159.89.30.50/network/secret_ed25519
12D3KooWMuTrL9CmJxj8LjH43s4hsJMsyuMdbuB86zCaAf9VCwFf
```

Каждая команда создает файл ключа в указанной директории и выводит в stdout строку, которая понадобится нам для заполнения поля **bootNodes** в файле **spec.json**.
В итоге у меня получился следующий вид раздела **bootNodes**:
```
"bootNodes": [
"/ip4/165.227.171.127/tcp/30333/p2p/12D3KooWBPq1fDLQC2iqQ4FpM2mUpiXjBRcb8ptk7tbaqr2B6HZN",
"/ip4/159.89.25.75/tcp/30333/p2p/12D3KooWRbGmdpbz6o1fe66wFs7nJsUYfBp2f3W7J1uDXj3gt4Bh",
"/ip4/159.89.30.50/tcp/30333/p2p/12D3KooWMuTrL9CmJxj8LjH43s4hsJMsyuMdbuB86zCaAf9VCwFf"
],
```
Следующие 3 поля (telemetryEndpoints, protocolId, properties) заполнил следующим образом:
```
 "telemetryEndpoints": [
     [
       "/dns4/telemetry.polkadot.io/tcp/443/x-parity-wss/%2Fsubmit%2F",
       0
     ]
 ],
"protocolId": "txrt",
"properties": {
    "ss58Format": 32,
    "tokenDecimals": 9,
    "tokenSymbol": "TXRT"
},
```
Далее, вплоть до поля **palletBalances**, оставляем без изменений.


### palletBalances
Для заполнения поля palletBalances создадим ключи в количестве, равном **количеству нод + 1** (последний ключ - для **sudo**). Это можно сделать при помощи **subkey**, в имени файла будем указывать **SS58 Address** из сгенерированного ключа, а в содержимом файла - **seed** фразу в кавычках. 

На примере одного ключа.
 - Сгенерировать ключ:
    ```
    $ ./subkey generate
    Secret phrase `display cargo domain april joy still bundle notice bridge pencil fat approve` is account:
      Network ID/version: substrate
      Secret seed:        0x0275ab9bce53e4359184f02112943162c708f483009e0b7b3ba63549c5c2e514
      Public key (hex):   0xd0996b85dd1b2876080b26123f9c27097d698f871c5978c3cb9c299253e7a530
      Account ID:         0xd0996b85dd1b2876080b26123f9c27097d698f871c5978c3cb9c299253e7a530
      SS58 Address:       5CnxYUugEzLQ8Re2d5P2Jso25pe8PBttcVjc3VdNL2V9shVx
    ```
 - Создать файл ключа:
    ```
    $ touch ./local/validators/5CnxYUugEzLQ8Re2d5P2Jso25pe8PBttcVjc3VdNL2V9shVx && echo '"display cargo domain april joy still bundle notice bridge pencil fat approve"' | tee ./local/validators/5CnxYUugEzLQ8Re2d5P2Jso25pe8PBttcVjc3VdNL2V9shVx
    ```
  
Шаблон команды создания файла ключа валидаторов:  
> touch ./local/validators/**SS58_Address** && echo '"**seed**"' | tee ./local/validators/**SS58_Address**

Шаблон команды создания файла ключа sudo:   
> touch ./local/sudo/**SS58_Address** && echo '"**seed**"' | tee ./local/sudo/**SS58_Address**

Три ключа запишем в папку **local/validators**, а один - в папку **local/sudo**. В итоге в директории **local** я получил следующее содержимое:
```
./local/
├── sudo
│   └── 5Dy6bzrvoApwjLaAjfrtvtX3tthCw6fnCU1Ym5KNyRGt3kKb
└── validators
    ├── 5CnxYUugEzLQ8Re2d5P2Jso25pe8PBttcVjc3VdNL2V9shVx
    ├── 5EeMi84pk5P5nQpyupQeCZ1C4NhUFtMF7Xh1MXJLANkZ3BTd
    └── 5FPRYfSVqwaX39vXZ78tT3DPBT9FmFXvdQDD7y5UQKncJGu1
```

Теперь заполним данными ключами раздел palletBalances в файле spec.json
В моем случае он стал выглядеть так:
```
"palletBalances": {
  "balances": [
    [
      "5CnxYUugEzLQ8Re2d5P2Jso25pe8PBttcVjc3VdNL2V9shVx",    <-- Ключ валидатора 1
      1000000000000000000
    ],
    [
      "5EeMi84pk5P5nQpyupQeCZ1C4NhUFtMF7Xh1MXJLANkZ3BTd",    <-- Ключ валидатора 2
      1000000000000000000
    ],
    [
      "5FPRYfSVqwaX39vXZ78tT3DPBT9FmFXvdQDD7y5UQKncJGu1",    <-- Ключ валидатора 3
      1000000000000000000
    ],
    [
      "5Dy6bzrvoApwjLaAjfrtvtX3tthCw6fnCU1Ym5KNyRGt3kKb",    <-- Ключ sudo
      1000000000000000000
    ],
  ]
},
```
Значения, которые там присутствовали ранее, я удалил.


### palletSession
Следующий шаг - раздел **palletSession** в файле **spec.json**. Сначала опишу формат его заполнения. 
Данный раздел содержит поле keys, в котором у нас будет список из трех списков (по количеству нод). Каждый из этих списков будет следующего вида:
```
[
    "%validator_SS58_address%",
    "%validator_SS58_address%",
    {
        "babe": "%sr25519_babe_SS58_address%",
        "im_online": "%sr25519_im_online_SS58_address%"
        "authority_discovery": "%sr25519_authority_discovery_SS58_address%",
        "grandpa": "%ed25519_grandpa_SS58_address%",
    }
]
```
**%validator_SS58_address%** - это ключ валидатора, который мы сгенерировали для каждой ноды в разделе **palletBalances** данной инструкции. Его нужно для каждой ноду просто дважды скопировать.  

Чтобы заполнить данный раздел, нужно будет сначала создать по 4 файла ключа для каждой ноды, их будем хранить в папках **keystore**.
По мере создания файлов ключей будем наполнять и **palletSession**.  

В содержимое каждого ключа будем записывать **seed** фразу в кавычках.
Формирование имени каждого ключа потребует отдельного рассмотрения.
Имя каждого ключа формируется по принципу **prefix** + **account_id без ведущего шестнадцатеричного нуля**

Соответствие префиксов:  
>      grandpa: '6772616e'  
>      babe: '62616265'
>      im_online: '696d6f6e'  
>      authority_discovery: '61756469'  

Создание ключей на примере одной ноды:
- Создание файла ключа **babe** (префикс *62616265*)  
  ```
  $ ./subkey --sr25519 generate
  ```
  >  Secret phrase **cover once garment syrup income chair elder business diary frozen rack damage** is account:  
  >  Network ID/version: substrate  
  >  Secret seed:        0x90ddeee3a9a0c464572021d311c245eefc41f9a59c739faefda47efcf4755677  
  >  Public key (hex):   0xfa44d96e310cf68350dd855c745794f7c1afa63089ebdb2c96bff3797972bb43  
  >  Account ID:         0x**fa44d96e310cf68350dd855c745794f7c1afa63089ebdb2c96bff3797972bb43**  
  >  SS58 Address:       *5HirHF5BVHxkRBtqptFxBSmnAiZir1qQLs6pL9Utmm4eF77C*
  
 ```
 $ touch uploads/165.227.171.127/keystore/62616265fa44d96e310cf68350dd855c745794f7c1afa63089ebdb2c96bff3797972bb43 && echo '"cover once garment syrup income chair elder business diary frozen rack damage"' | tee ./uploads/165.227.171.127/keystore/62616265fa44d96e310cf68350dd855c745794f7c1afa63089ebdb2c96bff3797972bb43 
 ```
 Данной командой я создал файл ключа **babe** для ноды **165.227.171.127**. Для заполнения **spec.json** мне нужно взять из данного вывода значение **SS58 Address**: *5HirHF5BVHxkRBtqptFxBSmnAiZir1qQLs6pL9Utmm4eF77C*. Этот адрес нужно вставить вместо **%sr25519_babe_SS58_address%** в вышеуказанном шаблоне **palletSession**.
   
 Шаблон команды создания файла ключа **babe**:  
  > touch ./uploads/**node_ip**/keystore/62616265+**Account_ID** && echo '"**seed**"' | tee ./uploads/**node_ip**/keystore/62616265+**Account_ID**  

  Как мы видим, имя файла ключа babe складывается из двух подстрок: **префикса, соответствующего babe ('62616265')**, а также **account_id** сгенерированного ключа, без ведущего нуля (**fa44d96e310cf68350dd855c745794f7c1afa63089ebdb2c96bff3797972bb43**). 
  Также, нужно обратить внимание, что ключи **babe, im_online, authority_discovery** генерируются c указанием **--sr25519**. В примере это указано явно для наглядности, но вообще subkey использует данный тип ключа по умолчанию. 
  А вот при создании ключа **grandpa** обязательно будет явно указывать **--ed25519** .
 

- Создание файла ключа **im_online** (префикс *696d6f6e*)  
  ```
  $ ./subkey --sr25519 generate
  ```
  > Secret phrase **envelope truly balance turkey undo casual waste skill average ordinary gun split** is account:  
  >   Network ID/version: substrate  
  >   Secret seed:        0x8a19df08feeff9f1fa3581902ca22a305252aea32e284d32f10e990d00bb8926  
  >   Public key (hex):   0x6c13ff8e37d91b80fe3b03f9b92a91a1ef7db741434cf12cc44d5ed29257ab09  
  >   Account ID:         0x**6c13ff8e37d91b80fe3b03f9b92a91a1ef7db741434cf12cc44d5ed29257ab09**  
  >   SS58 Address:       *5EWQyBRoucH4Wjd4JtGoSEYYCw4bbkonjoFy9hNUX5fbmMEt*
   
  ```
  $ touch uploads/165.227.171.127/keystore/696d6f6e6c13ff8e37d91b80fe3b03f9b92a91a1ef7db741434cf12cc44d5ed29257ab09 && echo '"envelope truly balance turkey undo casual waste skill average ordinary gun split"' | tee uploads/165.227.171.127/keystore/696d6f6e6c13ff8e37d91b80fe3b03f9b92a91a1ef7db741434cf12cc44d5ed29257ab09
  ```
  Шаблон команды создания файла ключа **im_online**:  
  > touch ./uploads/**node_ip**/keystore/696d6f6e+**Account_ID** && echo '"**seed**"' | tee ./uploads/**node_ip**/keystore/696d6f6e+**Account_ID**  
  
  **spec.json**: *5EWQyBRoucH4Wjd4JtGoSEYYCw4bbkonjoFy9hNUX5fbmMEt* нужно вставить вместо **%sr25519_im_online_SS58_address%** в шаблоне **palletSession**.


- Создание файла ключа **authority_discovery** (префикс *61756469*)
   ```
   $ ./subkey --sr25519 generate
   ```
   > Secret phrase **boy harsh because omit equip atom apart spring undo explain walnut crystal** is account:  
   > Network ID/version: substrate  
   >   Secret seed:        0x27838c9ea0524353da3717862ef0ecef123f40e81b73bb5ef377d12b47d1c543  
   >   Public key (hex):   0x4e33ccfd4105d30dfd93c5ef4658e2585a749508ea7c7abe754efc36dd634c07  
   >   Account ID:         0x**4e33ccfd4105d30dfd93c5ef4658e2585a749508ea7c7abe754efc36dd634c07**  
   >   SS58 Address:       *5DqEyoefRSz746sjaonxJ7KZQz8MUq4cKFA87DfoLzQgWk8t*
   
   ```
   $ touch uploads/165.227.171.127/keystore/617564694e33ccfd4105d30dfd93c5ef4658e2585a749508ea7c7abe754efc36dd634c07 && echo '"boy harsh because omit equip atom apart spring undo explain walnut crystal"' | tee uploads/165.227.171.127/keystore/617564694e33ccfd4105d30dfd93c5ef4658e2585a749508ea7c7abe754efc36dd634c07
   ```
  Шаблон команды создания файла ключа **authority_discovery**:  
  > touch ./uploads/**node_ip**/keystore/61756469+**Account_ID** && echo '"**seed**"' | tee ./uploads/**node_ip**/keystore/61756469+**Account_ID**  
  
   **spec.json**: *5DqEyoefRSz746sjaonxJ7KZQz8MUq4cKFA87DfoLzQgWk8t* нужно вставить вместо **%sr25519_authority_discovery_SS58_address%** в шаблоне **palletSession**.


- Создание файла ключа **grandpa** (префикс *6772616e*)
   ```
   $ ./subkey --ed25519 generate
   ```
   > Secret phrase **squeeze nature off vendor comic pause tattoo seek omit spatial regular cattle** is account:  
   >   Network ID/version: substrate  
   >   Secret seed:        0xef0a9f51a4da7b789c0a25d39b44428d4da7262cc3fe013d4383b45216e8b83e  
   >   Public key (hex):   0x7ea1beed13fb66a333b50b1ae417ebfd152bab99b223be2d4d886adb5fa7f009  
   >   Account ID:         0x**7ea1beed13fb66a333b50b1ae417ebfd152bab99b223be2d4d886adb5fa7f009**  
   >   SS58 Address:       *5EvjwRdgUg6YtdUDjq6Z3PoTKtzH5cgFgwnzArMSbw3RzYTa*
    
   ```
   $ touch uploads/165.227.171.127/keystore/6772616e7ea1beed13fb66a333b50b1ae417ebfd152bab99b223be2d4d886adb5fa7f009
    
   $ echo '"squeeze nature off vendor comic pause tattoo seek omit spatial regular cattle"' | tee uploads/165.227.171.127/keystore/6772616e7ea1beed13fb66a333b50b1ae417ebfd152bab99b223be2d4d886adb5fa7f009
   ```
   Шаблон команды создания файла ключа **grandpa**:  
  > touch ./uploads/**node_ip**/keystore/6772616e+**Account_ID** && echo '"**seed**"' | tee ./uploads/**node_ip**/keystore/6772616e+**Account_ID** 
   
   **spec.json**: *5EvjwRdgUg6YtdUDjq6Z3PoTKtzH5cgFgwnzArMSbw3RzYTa* нужно вставить вместо **%sr25519_grandpa_SS58_address%** в шаблоне **palletSession**.
   
   
**Сейчас мы создали 4 файла ключей для одной ноды. Необходимо повторить данную процедуру для оставшихся двух нод.**

После создания всех ключей должна получиться примерно следующая структура каталога **uploads**:
```
./uploads/
├── 165.227.171.127
│   ├── keystore
│   │   ├── 617564694e33ccfd4105d30dfd93c5ef4658e2585a749508ea7c7abe754efc36dd634c07
│   │   ├── 62616265fa44d96e310cf68350dd855c745794f7c1afa63089ebdb2c96bff3797972bb43
│   │   ├── 6772616e7ea1beed13fb66a333b50b1ae417ebfd152bab99b223be2d4d886adb5fa7f009
│   │   └── 696d6f6e6c13ff8e37d91b80fe3b03f9b92a91a1ef7db741434cf12cc44d5ed29257ab09
│   └── network
│       └── secret_ed25519
├── 159.89.25.75
│   ├── keystore
│   │   ├── 617564692ac9bd30c0168fa623cfd66abb4327992d900a652bcbb238b740bdde497a565f
│   │   ├── 626162657cd666bb540c41cb33896a34d7413ffb86fcef1eddddfcd4edb325166df6335d
│   │   ├── 6772616e084402349bc08ef90c2837e8e3f12ebe8bd4ab86809e9ee5f4f8ca26e73a0518
│   │   └── 696d6f6e6ed2d507c0283ae869ba6514975bd8765eb8e06abd22afc09e8f36ef3950a116
│   └── network
│       └── secret_ed25519
└── 159.89.30.50
|   ├── keystore
|   │   ├── 61756469f20a4e16a0ee79431d6f9a70c38892c7532ad1347c2226d43ef6ffe8966e9b30
|   │   ├── 62616265e695aa459dbfd42bea7ed3b87970f164f34b6fee4d5a831ffbecd89eb9769b26
|   │   ├── 6772616eadef59f896ea6b94bcd4519be8cc4b70263fc318cec1a3be14850bbc22117c34
|   │   └── 696d6f6e2cb4dc8f8a67f477da15045ca40ef3861a2a6b2034ae0c64a179b4431341ea2c
|   └── network
|       └── secret_ed25519
└── spec.json
```

Раздел palletSession должен получиться примерно следующего вида:
```
"palletSession": {
    "keys": [
        [
            "5CnxYUugEzLQ8Re2d5P2Jso25pe8PBttcVjc3VdNL2V9shVx",
            "5CnxYUugEzLQ8Re2d5P2Jso25pe8PBttcVjc3VdNL2V9shVx",
            {
                "authority_discovery": "5DqEyoefRSz746sjaonxJ7KZQz8MUq4cKFA87DfoLzQgWk8t",
                "babe": "5HirHF5BVHxkRBtqptFxBSmnAiZir1qQLs6pL9Utmm4eF77C",
                "grandpa": "5EvjwRdgUg6YtdUDjq6Z3PoTKtzH5cgFgwnzArMSbw3RzYTa",
                "im_online": "5EWQyBRoucH4Wjd4JtGoSEYYCw4bbkonjoFy9hNUX5fbmMEt"
            }
        ],
        [
            "5EeMi84pk5P5nQpyupQeCZ1C4NhUFtMF7Xh1MXJLANkZ3BTd",
            "5EeMi84pk5P5nQpyupQeCZ1C4NhUFtMF7Xh1MXJLANkZ3BTd",
            {
                "authority_discovery": "5F6daoG2gBXRLvbT4mVRajExZdZBHH7APmX3wDuLYJyzxHSS",
                "babe": "5C7vBVHUYKqApCywqGsuap6XhjZ3gdYnW4YYP2mMyvYctLqT",
                "grandpa": "5G3Ai6BGUjqtCoM2aTvWyR19gQ8WZiNnh1KFM47RyiYTwkE6",
                "im_online": "5FHA7gzKfSLvd8jP85JUCWV6RyeRLm331KHcjnynGx7TWm7D"
            }
        ],
        [
            "5FPRYfSVqwaX39vXZ78tT3DPBT9FmFXvdQDD7y5UQKncJGu1",
            "5FPRYfSVqwaX39vXZ78tT3DPBT9FmFXvdQDD7y5UQKncJGu1",
            {
                "authority_discovery": "5CqzJFkdSZg52PfV6Fd4gJ3vPLmRu1HGuPvNivjJ8dDWaz1a",
                "babe": "5EComk8TsrT399xT6MPhGnhbZEif6U6cny8DiyZ3zezo9b5f",
                "grandpa": "5Cqi4rG3CzWRZairhZX4isT8qG2jyz9fGDXJMrP6uBYkrft5",
                "im_online": "5C7V6R59cZVbabExqgWvHVE1vj1E1cV42SZr8d8zZD3gmsqk"
            }
        ]
    ]
},
```

### palletStaking
**palletStaking** я заполнил следующим образом:
```
"palletStaking": {
    "historyDepth": 84,
    "validatorCount": 10,
    "minimumValidatorCount": 2,
    "invulnerables": [
        "5DnVqsovQHFTp86XJ29jDPDg7vJUiM3puUhAWRuNGRYkXdJV",     <-- Ключ валидатора 1
        "5ENyfEkqDc8wXxxKzeT9AgBSqzPgfSeUx5gyaN4K8EzDmd77",     <-- Ключ валидатора 2
        "5EkMjyVJAPsFZVXv3BgUUs4rVi7JmucPqBCHwYteiymkFghM"      <-- Ключ валидатора 3
    ],
    "forceEra": "NotForcing",
    "slashRewardFraction": 100000000,
    "canceledPayout": 0,
    "stakers": [
        [
            "5DnVqsovQHFTp86XJ29jDPDg7vJUiM3puUhAWRuNGRYkXdJV",  <-- Ключ валидатора 1
            "5EAUMb2c4B5RKcDcpYbrfFBb4zZBNWkvaZinVaHvYhthaZPo",  <-- Адрес babe валидатора 1
            1000000,
            "Validator"
        ],
        [
            "5ENyfEkqDc8wXxxKzeT9AgBSqzPgfSeUx5gyaN4K8EzDmd77",  <-- Ключ валидатора 2
            "5C7vBVHUYKqApCywqGsuap6XhjZ3gdYnW4YYP2mMyvYctLqT",  <-- Адрес babe валидатора 2
            1000000,
            "Validator"
        ],
        [
            "5EkMjyVJAPsFZVXv3BgUUs4rVi7JmucPqBCHwYteiymkFghM",   <-- Ключ валидатора 3
            "5EComk8TsrT399xT6MPhGnhbZEif6U6cny8DiyZ3zezo9b5f",   <-- Адрес babe валидатора 3
            1000000,
            "Validator"
        ]
    ]
},
```
В примере указано в какие поля какие значения необходимо подставить.

### palletSudo
В оставшейся часть файла **spec.json** я изменил только содержимое **palletSudo**, подставив туда сгенерированный ранее адрес **sudo**:
```
            "palletBabe": {
                "authorities": []
            },
            "palletGrandpa": {
                "authorities": []>  Secret phrase **cover once garment syrup income chair elder business diary frozen rack damage** is account:  
183
  
            },
            "palletImOnline": {
                "keys": []
            },
            "palletAuthorityDiscovery": {
                "keys": []
            },
            "palletTreasury": {},
            "palletElectionsPhragmen": {
                "members": []
            },
            "palletCollectiveInstance1": {
                "phantom": null,
                "members": []
            },
            "palletSudo": {
                "key": "5Dy6bzrvoApwjLaAjfrtvtX3tthCw6fnCU1Ym5KNyRGt3kKb"   <-- адрес sudo
            }
        }
    }
}
```

## systemd unit file
Создадим файл юнита systemd:
```
$ touch ./uploads/robonomics.service
```

Запишем в него следующее содержимое:
```
[Unit]
Description=robonomics
After=network.target

[Service]
User=root
Group=root
Type=users
WorkingDirectory=/root
Restart=on-failure
ExecStart=/usr/bin/robonomics  --chain /etc/substrate/spec.json --name ${HOSTNAME} --validator

[Install]
WantedBy=multi-user.target
```
Как видно из строки запуска, бинарник **robonomics** нужно будет выгрузить в директорию **/usr/bin/**, а файл **spec.json** - в директорию **/etc/substrate/**.

## Выгрузка файлов
Выгрузку оформил в виде однострочной команды. Важно, чтобы в директории **uploads** не было никаких других папок, кроме папок с ip-адресами нод:
```
$ \
for IP in `ls -l ./uploads/ | grep '^d' | awk '{print $9}'`; do \
    ssh root@"$IP" "mkdir -p /root/.local/share/robonomics/chains/dev" && \
    scp -r ./uploads/$IP/* root@$IP:/root/.local/share/robonomics/chains/dev/ && \
    scp ./uploads/robonomics.service root@$IP:/etc/systemd/system/ && \
    scp ./robonomics root@$IP:/usr/bin/ && \
    ssh root@$IP "mkdir -p /etc/substrate" && \
    scp ./uploads/spec.json root@$IP:/etc/substrate/ \
; done
```

## Запуск сети
Теперь нужно подключиться ко всем нодам, добавить в автозагрузку и запустить сервис **robonomics.service**:
```
$  \
for IP in `ls -l ./uploads/ | grep '^d' | awk '{print $9}'`; do \
   ssh root@$IP "systemctl enable robonomics.service && systemctl start robonomics.service" \
; done
```
Далее, после запуска сервиса на всех трех нодах, можно смотреть логи нод при помощи **journalctl**. 
Для этого можно подключиться к любому имеющемуся серверу по ssh и выполнить следующую команду:
```
$ journalctl -u robonomics.service -f
```
![Robonomics Chart](./images/robonomics-test-network-manual/result-journalctl.jpg "Robonomics Network journalctl stdout")
