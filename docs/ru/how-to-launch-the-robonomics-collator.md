---
title: Как запустить коллатор Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  В видео и скриншотах этой статьи мы использовали версию 1.4.0 Robonomics. Вам нужно использовать те же команды, но заменить версию Robonomics на текущую.
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

В настоящее время сеть Robonomics в основном поддерживается начальными разработчиками, но любой может поддержать проект. Каждый дополнительный полный узел блокчейна помогает ему стать более устойчивым и устойчивым к сбоям. Бинарные файлы узла Robonomics доступны в [релизе](https://github.com/airalab/robonomics/releases) или их можно [собрать из исходного кода](/docs/how-to-build-collator-node/).

## Что такое коллатор

Коллатор является частью парачейна Robonomics. Этот тип узла создает новые блоки для цепи Robonomics.

>Коллаторы поддерживают парачейны, собирая транзакции парачейна от пользователей и создавая доказательства перехода состояния для валидаторов цепи ретрансляции. Другими словами, коллаторы поддерживают парачейны, агрегируя транзакции парачейна в кандидаты на блоки парачейна и создавая доказательства перехода состояния для валидаторов на основе этих блоков.

Вы можете узнать больше о коллаторах на связанной [странице вики Polkadot](https://wiki.polkadot.network/docs/learn-collator)

В парачейне Robonomics каждый коллатор получает вознаграждение (**0.001598184 XRT**) за каждый блок, который коллатор строит (вознаграждения происходят при запечатывании блоков в цепь). 
Также коллатор, который строит блок, получает **50% комиссии за транзакции**, содержащиеся в созданном им блоке.

## Требования

Рекомендуется запускать коллатор с использованием **стандартных аппаратных требований** для [валидаторов Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ совместимый с x86-64.
+ Intel Ice Lake или новее (Xeon или Core серии); AMD Zen3 или новее (EPYC или Ryzen).
+ 4 физических ядра @ 3.4GHz.
+ Одновременная многопоточность отключена (Hyper-Threading на Intel, SMT на AMD).
+ Хранение - NVMe SSD объемом 1 ТБ (так как он должен быть разумного размера для работы с ростом блокчейна).
+ Память - 32 ГБ DDR4 ECC


В этой статье мы используем следующие спецификации:
+ 4 vCPU
+ 700 ГБ пространства NVMe для баз данных коллатора. Требуется возможность расширения этого дискового пространства.
+ 8 ГБ ОЗУ


## Важная информация
1. Мы используем некоторые переменные в этих инструкциях, и вам нужно будет заменить значения на свои во всех командах:
    + **%NODE_NAME%** это имя узла. Пример: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** это путь к примонтированному тому. Пример: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** это адрес учетной записи в экосистеме Polkadot в формате SS58. Пример: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Обратите внимание, что в запуске службы коллатора необходимо включить *--state-cache-size=0*. Этот параметр важен для стабильности коллатора.
Вы можете увидеть больше информации в связанной [проблеме](https://github.com/airalab/robonomics/issues/234) на github.

## Первый раз легко запустить Robonomics коллатор

Вы можете легко запустить коллатор напрямую в командной строке, чтобы проверить наличие ошибок.
После этого настоятельно рекомендуется запустить Robonomics коллатор как сервис (смотрите следующий шаг).

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


## Запустите Robonomics коллатор как сервис

1. Создайте пользователя для сервиса с домашним каталогом
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Скачайте, извлеките и переместите бинарный файл Robonomics в каталог */usr/local/bin/*. В командах в этом разделе необходимо заменить *$ROBONOMICS_VERSION* на текущую версию Robonomics. Вы можете найти текущую версию на [странице релизов репозитория Robonomics на github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


3. Создайте файл службы systemd с именем *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    And add the following lines in the service file:
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

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


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

После запуска Robonomics коллатора он начнет синхронизацию с Kusama Relay Chain, это может занять значительное время в зависимости от скорости вашей сети и системных характеристик, поэтому рекомендуется загрузить снимок Kusama. 


## Ускорение процесса синхронизации с использованием снимка Kusama

Мы рекомендуем сделать это сразу после создания и запуска службы Robonomics. Более подробную информацию о снимках и инструкции по использованию вы можете найти на следующей странице: https://ksm-rocksdb.polkashots.io/

Инструкции:

1. Остановите службу Robonomics и удалите текущий каталог базы данных Kusama:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Скачайте актуальный снимок и извлеките его:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    You can remove the downloaded archive after succesful unpacking:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Установите правильную собственность для папки базы данных:
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
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## Устранение неполадок
### Ошибка: "State Database error: Too many sibling blocks inserted"
For fix this error you can just launch your collator in archive mode: 

1) First, need to stop the Robonomics service: 
    
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    

2) Затем добавьте параметр `--state-pruning=archive` к части службы parachain. Пример отредактированного файла службы:
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

4) Удалите существующую базу данных parachain:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Запустите службу robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    After that need to wait for the synchronization of the parahain database.

### Ошибка: "cannot create module: compilation settings are not compatible with the native host"
Эта ошибка связана с параметрами виртуализации. Необходимо использовать тип эмулируемого процессора "host-model". Вы можете настроить это на хосте виртуализации.

Но, если вы заметили эту ошибку на каком-либо хостинге, вам нужно только обратиться с этой проблемой в техподдержку.
