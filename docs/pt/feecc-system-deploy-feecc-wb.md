---
title: Развертывание "Feecc Рабочее Место Инженера" (РМИ или Workbench)
 
contributors: [timofeev41]
translated: false
---

## Общая информация:

Работа системы "Feecc Рабочее Место Инженера" (далее Feecc РМИ) зависит от работы сервисов feecc-workbench-frontend (Фронтенд), feecc-workbench-daemon (Daemon), feecc-ipfs-gateway (IPFS Gateway), feecc-print-server (Print Server), feecc-cameraman (Cameraman), feecc-hid-reader-daemon (HID Daemon).

Чтобы узнать больше о сервисах, обратитесь в раздел [Обзор архитектуры](/docs/feecc-system-architecture).


## Запуск HID Daemon

> Инструкция может устареть, обратитесь к инструкции в [репозитории](https://github.com/Multi-Agent-io/feecc-hid-reader-daemon#readme)

1. Склонируйте репозиторий

    `git clone https://github.com/Multi-Agent-io/feecc-hid-reader-daemon`

2. Обновите систему и установите необходимые пакеты:

    Для Debian-based систем:

    ```bash
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt dist-upgrade -y
    sudo apt autoremove -y
    sudo apt install -y htop python3 python3-dev python3-pip gcc
    ```

3. Запустите Daemon

    ```bash
    sudo mv EventToInternet /etc/systemd/system/
    sudo chown -R root:root /etc/systemd/system/EventToInternet
    cd /etc/systemd/system/EventToInternet
    ```

4. Установите пакеты (обязательно с `sudo`)

    ```bash
    sudo python3 -m pip install -r requirements.txt
    sudo bash install.sh
    ```

* Для удаления:

    ```bash
    sudo bash /etc/systemd/system/EventToInternet/uninstall.sh
    sudo rm -rf /etc/systemd/system/EventToInternet*
    ```


## Запуск Workbench Daemon

> Инструкция может устареть, обратитесь к инструкции в [репозитории](https://github.com/Multi-Agent-io/feecc-workbench-daemon#readme)

1. Склонируйте репозиторий

    `git clone https://github.com/Multi-Agent-io/feecc-workbench-daemon && cd feecc-workbench-daemon`

2. Проведите конфигурацию, открыв docker-compose.yml любым текстовым редактором

    Измените переменные окружения. Значения каждого параметра:

    ```
    
    MONGODB_URI (Required): MongoDB connection URI
    ROBONOMICS_ENABLE_DATALOG (Optional): enable datalog posting or not (bool)
    ROBONOMICS_ACCOUNT_SEED (Optional): Your Robonomics network account seed phrase
    ROBONOMICS_SUBSTRATE_NODE_URL (Optional): Robonomics network node URI
    YOURLS_SERVER (Required): Your Your Yourls server URL
    YOURLS_USERNAME (Required): Yourls server username
    YOURLS_PASSWORD (Required): Yourls server password
    IPFS_GATEWAY_ENABLE (Optional): Whether to enable IPFS posting or not
    IPFS_GATEWAY_IPFS_SERVER_URI (Optional): Your IPFS gateway deployment URI
    PRINTER_ENABLE (Optional): Whether to enable printing or not
    PRINTER_PRINT_SERVER_URI (Optional): Your Print-server deployment URI
    PRINTER_SKIP_ACK (Optional): Whether to wait for the task acknowledgement (slow) or not
    PRINTER_PRINT_BARCODE (Optional): Whether to print barcodes or not
    PRINTER_PRINT_QR (Optional): Whether to print QR codes or not
    PRINTER_PRINT_QR_ONLY_FOR_COMPOSITE (Optional): Whether to enable QR code printing for non-composite units or note or not
    PRINTER_QR_ADD_LOGOS (Optional): Whether to add logos to the QR code or not
    PRINTER_PRINT_SECURITY_TAG (Optional): Whether to enable printing security tags or not
    PRINTER_SECURITY_TAG_ADD_TIMESTAMP (Optional): Whether to enable timestamps on security tags or not
    CAMERA_ENABLE (Optional): Whether to enable Cameraman or not
    CAMERA_CAMERAMAN_URI (Optional): Your Cameraman deployment URI
    CAMERA_CAMERA_NO (Optional): Camera number
    WORKBENCH_NUMBER (Required): Workbench number
    HID_DEVICES_RFID_READER (Optional): RFID reader device name
    HID_DEVICES_BARCODE_READER (Optional): Barcode reader device name
    LOG_ECS_ENABLE (Optional): Emit file logs in the ECS format (defaults to "disabled")
    ```

3. Запустите Workbench daemon:

    `sudo docker-compose up -d --build`

4. Проверьте работоспособность:

    Перейдите на `127.0.0.1:5000/docs` и убедитесь, что Swagger отдает данные о REST API

## Запуск IPFS Gateway

1. Склонируйте репозитории

    `git clone https://github.com/Multi-Agent-io/feecc-ipfs-gateway.git`

2. Измените параметры

    ```bash
    cd feecc-ipfs-gateway
    vim docker-compose.yml
    ```

    Значение параметров:

    ```
      MONGODB_URI: ''  # Your MongoDB connection URI ending with /db-name
      PRODUCTION_ENVIRONMENT: no  # Leave "no" if you want testing credentials to work
      LOCAL_IPFS_ENABLED: yes  # Whether to enable local IPFS node publishing or not.
      PINATA_ENABLED: yes  # Whether to upload files to Pinata.cloud or not
      PINATA_API: ''  # Pinata.cloud credentials. Leave empty if you don't need it
      PINATA_SECRET_API: ''  # Pinata.cloud credentials. Leave empty if you don't need it
      ROBONOMICS_ENABLE_DATALOG: no  # Whether to post CIDs to Robonomics network datalog or not
      ROBONOMICS_ACCOUNT_SEED: ''  # Robonomics network account seed
      ROBONOMICS_SUBSTRATE_NODE_URL: ''  # Robonomics node URL in case you want to use non-default node
      PY_IPFS_HTTP_CLIENT_DEFAULT_ADDR: '/dns/ipfsnode/tcp/5001/http'  # Node address, don't change
      AUTH_MODE: "workbench" # Auth mode. Available options are "analytics", "workbench" and "noauth"
    ```

3. Запустите контейнер

    `sudo docker-compose up --build`

4. Проверьте работоспособность

    Проверьте развертывание, перейдя по адресу http://127.0.0.1:8082/docs в браузере. Вы должны увидеть страницу SwaggerUI. 

## Запуск Print server

1. Склонируйте репозиторий

    `git clone https://github.com/Multi-Agent-io/feecc-print-server.git`

2. Измените параметры

    ```bash
    cd feecc-print-server
    vim docker-compose.yml
    ```

    Значения параметров:

    ```
    MONGODB_URI - Your MongoDB connection URI ending with /db-name
    PRODUCTION_ENVIRONMENT - Leave null if you want testing credentials to work, otherwise set it to true
    PAPER_WIDTH - Paper width in mm
    PRINTER_MODEL - Label printer model name
    RED - Whether the black and red paper is loaded or not (boolean, null for false)
    ```

3. Запустите контейнер

    `sudo docker-compose up --build`

4. Проверьте работоспособность

    Проверьте развертывание, перейдя по адресу http://127.0.0.1:8083/docs в браузере. Вы должны увидеть страницу SwaggerUI. 

## Запуск Cameraman

1. Склонируйте репозитории

    `git clone https://github.com/Multi-Agent-io/feecc-cameraman.git`

2. Измените параметры

    ```bash
    cd feecc-cameraman
    vim docker-compose.yml
    ```

    Значение параметров:

    ```
    MONGODB_URI - Your MongoDB connection URI ending with /db-name
    PRODUCTION_ENVIRONMENT - Leave null if you want testing credentials to work, otherwise set it to true
    FFMPEG_COMMAND - ffmpeg command used for capturing the video stream
    CAMERAS_CONFIG - A JSON-like string for camera configuration. This string represents a JSON list of strings, each one describing an RTSP stream ("-" separated stream number and RTSP stream URI). Example: '["1-rtsp://login:password@192.168.88.239:554/Streaming/Channels/101"]'
    ```

3. Запустите контейнер

    `sudo docker-compose up --build`

4. Проверьте работоспособность

    Проверьте развертывание, перейдя по адресу http://127.0.0.1:8081/docs в браузере. Вы должны увидеть страницу SwaggerUI. 


## Запуск фронтенда

1. Склонируйте репозитории

    `git clone https://github.com/Multi-Agent-io/feecc-workbench-frontend.git`

2. Измените параметры

    `vim configs/config.json`

    Значение параметров:

    ```json
    { 
       "socket": адрес Workbench Daemon,
       "interface_language": Язык интерфейса ("ru"/"en"),
       "dev_show_reducers": Режим разработчика,
       "pulling_period": Периодичность получения обновлений с бекенда в мс,
       "use_devtools": использование devtools,
       "show_test_schemas": показывать ли тестовые схемы
    }
    ```

3. Запустите контейнер
   
   `docker-compose up --build -d`

4. Проверьте работоспособность

    Откройте в браузере страницу `localhost:3000`. Должна открыться страница авторизации.