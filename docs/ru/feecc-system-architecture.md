---
title: System Architecture
contributors: [adeptvin1, timofeev41]
translated: true
tools:
  - Feecc Analytics frontend
    https://github.com/Multi-Agent-io/feecc-analytics-frontend
  - Feecc Analytics backend
    https://github.com/Multi-Agent-io/feecc-analytics-backend
  - Feecc Workbench frontend
    https://github.com/Multi-Agent-io/feecc-workbench-frontend
  - Feecc Workbench daemon
    https://github.com/Multi-Agent-io/feecc-workbench-daemon
  - Feecc Validator frontend
    https://github.com/Multi-Agent-io/feecc-validator-frontend
  - Feecc Validator backend
    https://github.com/Multi-Agent-io/feecc-validator-backend
  - Feecc IPFS gateway
    https://github.com/Multi-Agent-io/feecc-ipfs-gateway
  - Feecc Print server
    https://github.com/Multi-Agent-io/feecc-print-server
  - Feecc Cameraman
    https://github.com/Multi-Agent-io/feecc-cameraman
  - Feecc HID reader daemon
    https://github.com/Multi-Agent-io/feecc-hid-reader-daemon
---
## Описание архитектуры
Платформа Feecc состоит из нескольких сервисов, таких как:
### Feecc Analytics

- [feecc-analytics-frontend](https://github.com/Multi-Agent-io/feecc-analytics-frontend)
- [feecc-analytics-backend](https://github.com/Multi-Agent-io/feecc-analytics-backend)

### Feecc Workbench

- [feecc-workbench-frontend](https://github.com/Multi-Agent-io/feecc-workbench-frontend)
- [feecc-workbench-daemon](https://github.com/Multi-Agent-io/feecc-workbench-daemon)

### Feecc Validator

- [feecc-validator-frontend](https://github.com/Multi-Agent-io/feecc-validator-frontend)
- [feecc-validator-backend](https://github.com/Multi-Agent-io/feecc-validator-backend)

### Feecc other services

- [feecc-ipfs-gateway](https://github.com/Multi-Agent-io/feecc-ipfs-gateway)
- [feecc-print-server](https://github.com/Multi-Agent-io/feecc-print-server)
- [feecc-cameraman](https://github.com/Multi-Agent-io/feecc-cameraman)
- [feecc-hid-reader-daemon](https://github.com/Multi-Agent-io/feecc-hid-reader-daemon)
  
Каждый сервис отвечает за тот или иной функционал необходимый для развертывания в корпоративной среде.

### Feecc Рабочее Место Инженера
Основная задача Feecc Рабочее Место Инженера как следует из названия - это организация рабочего пространства инженера занимающегося сборкой изделий. В зависимости от задачи инженеру могут потребоваться следующие устройства:
- IP или Web камера для организации видеосъемки процесса производства.
- RFID reader для идентификации в системе по личной RFID карточке.
- Barcode reader для сканирования этикеток произведенных изделий
- Принтер этикеток для маркировки производимых изделий. 
- Цифровые датчики собирающие данные с различных устройств/станков
  
Feecc Рабочее Место Инженера обычно состоит из следующих контейнеров:
Установка обязательна на компьютер с которого производится сборка изделия.

- [feecc-workbench-frontend](https://github.com/Multi-Agent-io/feecc-workbench-frontend)
- [feecc-workbench-daemon](https://github.com/Multi-Agent-io/feecc-workbench-daemon)
- [feecc-hid-reader-daemon](https://github.com/Multi-Agent-io/feecc-hid-reader-daemon)

Установка может быть осуществлена как на компьютер с которого производится сборка изделия так и на сервер или другое устройство в локальной сети.

- [feecc-ipfs-gateway](https://github.com/Multi-Agent-io/feecc-ipfs-gateway)
- [feecc-print-server](https://github.com/Multi-Agent-io/feecc-print-server)
- [feecc-cameraman](https://github.com/Multi-Agent-io/feecc-cameraman)

На рисунке 1 и 2 изображенны архитектуры Feecc Рабочее Место Инженера с децентрализованной и централизованной топологией организации системы в корпоративной среде.
![architec1](../images/feecc-system-architecture/picture1.png)

<p align="center">
Рисунок 1 - Архитектура Feecc Рабочее Место Инженера с децентрализованной топологией организации системы в корпоративной среде.
</p>

![architec2](../images/feecc-system-architecture/picture2.png)

<p align="center">
Рисунок 2 - Архитектура Feecc Рабочее Место Инженера с централизованной топологией организации системы в корпоративной среде.
</p>

Выбор топологии и развертывание различных комбинаций зависит от существующей сети передачи данных компании, установленных компьюетров, требований к надежности, централизации или децентрализации и многого другого. Все микросервисные приложения поддерживают обмен данными по IP сети между собой.  

### Feecc Аналитика
Основная задача Feecc Аналитика - это организация процесса отслеживания готовых изделий и их предпродажная проверка в отделе контроля качества изделий.
Feecc Аналитика зависит от работы следующих контейнеров:

- [feecc-analytics-frontend](https://github.com/Multi-Agent-io/feecc-analytics-frontend)
- [feecc-analytics-backend](https://github.com/Multi-Agent-io/feecc-analytics-backend)

И обычно разворачивается на одном сервере с глобально маршрутизируемым IP для доступа к Feecc Аналитика извне, но при этом может быть развернуто и локально. 

### Feecc Валидатор
Основная задача Feecc Валидатор - это сравнение данных из различных хранилищ данных с целью подтверждения неизменности цифрового сертификата изделия. 
Feecc Валидатор зависит от работы следующих контейнеров:

- [feecc-validator-frontend](https://github.com/Multi-Agent-io/feecc-validator-frontend)
- [feecc-validator-backend](https://github.com/Multi-Agent-io/feecc-validator-backend)
  
И обычно разворачивается на одном сервере с глобально маршрутизируемым IP для доступа к Feecc Валидатор извне, но при этом может быть развернуто и локально. 