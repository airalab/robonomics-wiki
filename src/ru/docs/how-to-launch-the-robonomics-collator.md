---
title: Как запустить коллатор Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"заметка", type: "заметка"}%} В видеоролике и скриншотах этой статьи мы использовали версию 1.4.0 Robonomics. Вам нужно использовать те же команды, но заменить версию Robonomics на текущую.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

В настоящее время сеть Robonomics в основном поддерживается первоначальными разработчиками, но любой может поддержать проект. Каждый дополнительный полный узел блокчейна помогает ему стать более устойчивым и отказоустойчивым. Бинарные файлы узлов Robonomics доступны в [релизах](https://github.com/airalab/robonomics/releases) или их можно [собрать из исходного кода](/docs/how-to-build-collator-node/).

## Что такое коллатор

Коллатор является частью парачейна Robonomics. Этот тип узла создает новые блоки для цепочки Robonomics.

>Коллаторы поддерживают парачейны, собирая транзакции парачейна от пользователей и создавая доказательства перехода состояния для валидаторов цепочки ретрансляции. Другими словами, коллаторы поддерживают парачейны, агрегируя транзакции парачейна в кандидаты на блоки парачейна и создавая доказательства перехода состояния для валидаторов на основе этих блоков.

Вы можете узнать больше о коллаторах на соответствующей [странице вики Polkadot](https://wiki.polkadot.network/docs/learn-collator)

В парачейне Robonomics каждый коллатор получает вознаграждение (**0.001598184 XRT**) за каждый блок, который строит коллатор (вознаграждение начисляется при запечатывании блоков в цепочку).
Также коллатор, который создает блок, получает **50% от комиссий за транзакции**, содержащиеся в блоке, который они создают.

## Требования

Рекомендуется запускать коллатор с **стандартными аппаратными требованиями** для [валидаторов Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ x86-64 совместимый.
+ Intel Ice Lake или новее (серия Xeon или Core); AMD Zen3 или новее (EPYC или Ryzen).
+ 4 физических ядра @ 3.4 ГГц.
+ Отключенное одновременное многопоточное выполнение (Hyper-Threading на Intel, SMT на AMD).
+ Хранилище - NVMe SSD объемом 1 ТБ (должно быть разумного размера для работы с ростом блокчейна).
+ Память - 32 ГБ DDR4 ECC


В этой статье мы используем следующие характеристики:
+ 4 vCPU
+ 700 ГБ пространства NVMe для баз данных коллатора. Требуется возможность расширения этого дискового пространства.
+ 8 ГБ ОЗУ


## Важная информация
1. Мы используем некоторые переменные в этих инструкциях, и вам нужно будет заменить значения на свои во всех командах:
    + **%NODE_NAME%** - имя узла. Пример: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** - путь к примонтированному тому. Пример: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** - адрес учетной записи в экосистеме Polkadot в формате SS58. Пример: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Обратите внимание, что в запуске службы коллатора необходимо включить *--state-cache-size=0*. Этот параметр важен для стабильности коллатора.
Более подробную информацию можно найти в связанном [issue](https://github.com/airalab/robonomics/issues/234) на github.

## Легкий первый запуск коллатора Robonomics

Вы можете легко запустить коллатор напрямую в командной строке, чтобы проверить наличие ошибок.
После этого настоятельно рекомендуется запустить коллатор Robonomics как службу (смотрите следующий шаг).

```
root@robokusama-collator-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb
```


## Запуск коллатора Robonomics как службы

1. Создайте пользователя для службы с домашним каталогом
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Загрузите, извлеките и переместите бинарный файл Robonomics в каталог */usr/local/bin/*. Вам нужно заменить *$ROBONOMICS_VERSION* на текущую версию Robonomics в командах в этом разделе. Текущую версию можно найти на [странице релизов репозитория Robonomics на github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Download Robonomics 1.4.0 binary"} %}{% endroboWikiPicture %}


3. Создайте файл службы systemd с именем *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    И добавьте следующие строки в файл службы:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Create Robonomics service file"} %}{% endroboWikiPicture %}


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Сохраните этот файл, затем включите и запустите службу:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

URL телеметрии: https://telemetry.parachain.robonomics.network/#/Robonomics

Журналы коллаторов можно отслеживать с помощью: `journalctl -u robonomics.service -f`

После запуска коллатора Robonomics он начнет синхронизацию с цепочкой ретрансляции Kusama, что может занять значительное время в зависимости от скорости вашей сети и характеристик системы, поэтому мы рекомендуем загрузить снимок Kusama.


## Ускорение процесса синхронизации с помощью снимка Kusama

Мы рекомендуем сделать это сразу после создания и запуска службы Robonomics. Более подробную информацию о снимках и инструкции по использованию можно найти на следующей странице: https://ksm-rocksdb.polkashots.io/

Инструкции:

1. Остановите службу Robonomics и удалите текущий каталог базы данных Kusama:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Загрузите актуальный снимок и извлеките его:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# tar -xvf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Download Kusama snapshot"} %}{% endroboWikiPicture %}

    После успешной распаковки загруженного архива можно удалить:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Установка правильного владельца для папки базы данных:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Запустите службу Robonomics снова:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Проверьте журналы службы:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Check service logs"} %}{% endroboWikiPicture %}

## Устранение неполадок
### Ошибка: "Ошибка базы данных состояния: Слишком много вставленных блоков-соседей"
Для исправления этой ошибки можно просто запустить свой коллатор в режиме архива:

1) Сначала необходимо остановить службу Robonomics:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) Затем добавьте параметр `--state-pruning=archive` к части служебного файла парачейна. Пример отредактированного служебного файла:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

3) Перезагрузите конфигурацию менеджера systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Удалите существующую базу данных парачейна:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Запустите службу Robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    После этого нужно подождать синхронизации базы данных парачейна.

### Ошибка: "не удается создать модуль: настройки компиляции несовместимы с хостом"
Эта ошибка связана с параметрами виртуализации. Необходимо использовать тип "host-model" эмулируемого процессора. Вы можете настроить это на хосте виртуализации.

Однако, если вы столкнулись с этой ошибкой на любом хостинге, вам следует обратиться к технической поддержке только по этой проблеме.