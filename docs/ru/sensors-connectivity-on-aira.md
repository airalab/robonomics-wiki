---
title: Sensors Connectivity
locale: 'ru' 
contributors: [LoSk-p, Vourhey, tubleronchik]
translated: true
---

Для получения и обработки данных Sensors Robonomics Network использует модуль sensors community от Робономики. Этот модуль позволяет любому пользователю поднять свой собственный сервер для получения данных с датчиков и дальнейшей их обработки. Сейчас разработчиками запущено несколько таких серверов и любой датчик может отправлять данные на них. Запуск нескольких серверов позволяет избежать потери данных при проблемах в работе одного из них, поскольку датчики с нерабочего сервера переключатся на рабочий.

Схема работы Sensors Connectivity:

```
    station1 \                        / feeder1
    station2 -  sensors-connectivity  - feeder2
    station3 /                        \ feeder3
```

Sensors Connectivity представляет из себя набор станций (station1, station2...), на которые приходят различные данные, в том числе данные с датчиков по http протоколу. Но также это могут быть датчики, подключенные к компьтеру по USB или любой другой истчник данных.

Полученные со станций данные обрабатываются Sensors Connectivity и переходят к фидерам (feeder1, feeder2...). Фидеры же отправляют обработанные данные пользователю. В нашем случае данные отправляются в децентрализованный IPFS канал.

Карта [sensors.robonomics.network](https://sensors.robonomics.network/) это децентрализванное приложение (DApp), работающее на вашем компьютере. Оно читает данные из IPFS канала и выводит их на карту. Таким образом нет прямой связи между сервером, собирающим данные с датчиков, и картой, которую видит пользователь, передача данных между ними происходит через IPFS pubsub, что снижает нагрузку на сервера.

Кроме того, раз в какое-то время файл с данными за последний промежуток времени сохраняется в IPFS, а хэш этих данных далее записывается в блокчейн. Так как IPFS это контентно-адресуемая сеть, то сохранение данных в ней дает гарантию, что любое изменение в них не пройдет незамеченным, потому что адрес нужного файла содержит хэш его содержимого, который поменяется при любом изменении данных. Блокчейн используется для передачи хэша дальше пользователю, который может использовать его, чтобы получить из IPFS нужные данные (что и происходит при запросе просмотра истории на карте [sensors.robonomics.network](https://sensors.robonomics.network/)). Так как сделанную транзакцию невозможно изменить, то можно быть уверенным, что это правильный хэш.

Исходный код для Sensors Connectivity доступен по [ссылке](https://github.com/airalab/sensors-connectivity). Чтобы увидеть данные со своего сервера на карте, вам нужно обратиться к команде разработки по адресу vm@multi-agent.io и отправить ipfs id своего сервера.


## Требования

Чтобы собрать Python пакет вам нужен IPFS daemon. Установите его следующими командами:

```
wget https://dist.ipfs.io/go-ipfs/v0.8.0/go-ipfs_v0.8.0_linux-amd64.tar.gz
tar -xzf go-ipfs_v0.8.0_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh 
ipfs init
```
Вы можете получить IPFS ID следующей командой после запуска IPFS daemon (вам нужно то, что в графе `ID`)

```console
$ ipfs id
{
	"ID": "QmUZxw8jsRpSx5rWkTpJokPGKvWihTrt5rbRCFXzJ4eCAP",
	"PublicKey": "CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/uMV3rLM/C+LOh2DGPo3chr+VM+vyYMKi...
    ...
```

## Установка в качестве PyPi пакета

```
pip3 install py-sr25519-bindings
pip3 install sensors-connectivity
```

### Конфигурация

[Здесь](/docs/configuration-options-description/) вы можете найти статью о том, как установить правильную конфигурацию для вашего сервера.

### Запуск

Сначала запустите IPFS Daemon:

```
ipfs daemon --enable-pubsub-experiment
```
После настройки конфигурации можно запустить сервис (в другом терминале):

```
sensors_connectivity "path/to/your/config/file"
```

Вы сможете увидеть логи в терминале и в файле `~/.logs`.

## Сборка из источников
### Требования

Чтобы собрать пакет из источников вам нужен установленный [poetry](https://python-poetry.org/docs/#osx--linux--bashonwindows-install-instructions) . Для linux:

```
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

### Получение пакета и установка зависимостей

```
git clone https://github.com/airalab/sensors-connectivity
cd sensors-connectivity
poetry install
```

### Документация

Чтобы подготовить датчик к работе с собственным сервером, пройдите инструкцию на [Robonomics Wiki](/docs/connect-sensor-to-robonomics/).

### Конфигурация

[Здесь](/docs/configuration-options-description/) вы можете найти статью о том, как установить правильную конфигурацию для вашего сервера.

Скопируйте `default.json` и заполните его использую информацию из статьи.

Вы также можете задать файл протоколирования. По умолчанию для логгирования используется файл `logging.py`, который по умолчанию использует обработчик `console` и `file`. Обратите внимание на обработчик `file`. Шаблон хранится в файле `connectivity/config/logging_template.py`. Вы можете указать путь (`filename`), в котором будут храниться ваши логи (не забудьте создать этот каталог, если он не существует). По умолчанию путь для логов - `~/.logs`. Вы можете использовать любые другие обработчики из [library](https://docs.python.org/3.8/library/logging.html).

### Запуск

Запустите IPFS Daemon:

```
ipfs daemon --enable-pubsub-experiment
```
После настройки конфигурации и лог файлов можно запустить службу (в другом терминале):

```
poetry run sensors_connectivity "path/to/your/config/file"  
```
Если в вашем файле журнала установлен обработчик `console`, вы сможете видеть логи в консоли.

### Пример логов:

```
2022-02-17 19:30:51,248 - INFO - Getting data from the stations...
2022-02-17 19:30:51,443 - INFO - airalab-http-v0.8.0: [[], [{MAC: c8e2650f254e, Uptime: 0:00:14.010502, M: {Public: 0be87b58e87599a85dc79bf14731cc9ad547411e9b10c883e29f78fc2c67206a, geo: (53.518475,49.397178000000004), measurements: {'airtemp': -8.0, 'windang': 45.0, 'windspeed': 0.13, 'windspeedmax': 0.13, 'pm10': '', 'pm25': '', 'timestamp': 1645113602.0}}}]]
2022-02-17 19:30:51,443 - INFO - Sending result to the feeders...
2022-02-17 19:31:07,517 - INFO - Frontier Datalog: Data sent to Robonomics datalog and included in block 0x04baf3d81c6d31ec6f3ca3e515b9a6920666ee17cbd66f57130eaa000bad2cd4
2022-02-17 19:31:07,519 - INFO - RobonomicsFeeder: {"0be87b58e87599a85dc79bf14731cc9ad547411e9b10c883e29f78fc2c67206a": {"model": 2, "geo": "53.518475,49.397178000000004", "measurement": {"airtemp": -8.0, "windang": 45.0, "windspeed": 0.13, "windspeedmax": 0.13, "pm10": "", "pm25": "", "timestamp": 1645113602.0}}}
2022-02-17 19:31:07,523 - INFO - Checking data base...
127.0.0.1 - - [17/Feb/2022 19:31:13] "POST / HTTP/1.1" 200 -
2022-02-17 19:31:21,248 - INFO - Getting data from the stations...
2022-02-17 19:31:21,429 - INFO - airalab-http-v0.8.0: [[{MAC: c8e2650f254e, Uptime: 0:00:43.818101, M: {Public: 133b761496539ab5d1140e94f644e2ef92c7ac32446dc782bfe1a768379a669a, geo: (1,200), measurements: {'pm10': 27.58, 'pm25': 15.02, 'temperature': 22.93, 'pressure': 758.0687068706872, 'humidity': 39.44, 'timestamp': 1645115473}}}], [{MAC: c8e2650f254e, Uptime: 0:00:43.996539, M: {Public: 0be87b58e87599a85dc79bf14731cc9ad547411e9b10c883e29f78fc2c67206a, geo: (53.518475,49.397178000000004), measurements: {'airtemp': -8.0, 'windang': 45.0, 'windspeed': 0.13, 'windspeedmax': 0.13, 'pm10': '', 'pm25': '', 'timestamp': 1645113602.0}}}]]
2022-02-17 19:31:21,444 - INFO - Sending result to the feeders...
2022-02-17 19:31:51,249 - INFO - Getting data from the stations...
```

## Устранение неполадок

### Python.h: No such file or directory

Если при выполнении команды `poetry install` вы получаете такую ошибку, вам необходимо установить заголовочные файлы и статические библиотеки для python dev. Для установки используйте ваш менеджер пакетов. Например, для `apt` вам нужно выполнить команду
```
sudo apt install python3-dev
```
> Note:
python3-dev не охватывает все версии для python3. Для работы сервиса требуется как минимум python3.8, для этого вам может потребоваться указать версию `sudo apt install python3.8-dev`..

[Здесь](https://stackoverflow.com/a/21530768) вы можете найти примеры для других менеджеров пакетов.

### Несоответствие версий Python

Если при выполнении команды `poetry install` вы получаете ошибку `SolverProblemError`, которая гласит "The current project's Python requirement (3.6.9) is not compatible with some of the required packages Python requirement:...", даже если у вас более старая версия python (например, python3.8), возможно, вам нужно указать версию python, которую использует poetry:

```
poetry env use python3.8
```

