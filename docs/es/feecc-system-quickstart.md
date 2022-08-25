---
title: Быстрый старт
 
contributors: [adeptvin1]
translated: false
---
## Описание
В данном разделе описываются методы тестового развертывания "Feecc Рабочее Место Инженера" для тестирования и оценки системы в производственной среде. В качестве инструмента развертывания системы "Feecc Рабочее Место Инженера" используется инструмент Docker Compose.

### Предварительные настройки

#### Установка Docker Engine
1. Обновите систему и установите служебные пакеты для установки Docker:

    Для Debian-based систем:

    ```bash
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt dist-upgrade -y
    sudo apt autoremove -y
    sudo apt-get install \
        ca-certificates \
        curl \
        gnupg \
        lsb-release   
    ```

2. Удалите старую версию Docker если она была
   
   Для Debian-based систем:

    ```bash
    sudo apt-get remove docker docker-engine docker.io containerd runc
    ```

3. Добавьте официальный GPG ключ Docker и настройте список репозиториев
   
    Для Debian-based систем:

    ```bash
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

4. Установите Docker Engine
   
   Для Debian-based систем:
   ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

В данный комплект поставки Docker Engine уже входит Docker Compose, по этому  дополнительных манипуляций с Docker проводить не нужно. 

#### Подготовка базы данных MongoDB
Для оперативного хранения и доступа к данным в "Feecc Рабочее Место Инженера" используется база данных MongoDB. В ходе подготовки к развертыванию "Feecc Рабочее Место Инженера" вы можете выбрать любой подходящий вам метод развертывания MongoDB, как на своей инфраструктуре так и на облачной, мы приложили несколько ссылок чтобы вам было удобнее ориентироваться:

- [Установка MongoDB на свой сервер](https://www.mongodb.com/try/download/community)
- [Бесплатный MongoDB кластер в Atlas](https://www.mongodb.com/atlas)
- [Аренда MongoDB кластера в Digital Ocean](https://www.digitalocean.com/products/managed-databases-mongodb) 

Мы в свою очередь на первом этапе рекомендуем воспользоваться [бесплатным MongoDB кластером в Atlas](https://www.mongodb.com/atlas), данная платформа является крайне удобной и гибкой в рабочих задачах. Ниже будет инструкция как воспользоваться MongoDB Atlas в связке с "Feecc Рабочее Место Инженера"

#### Создание аккаунта в Pinata.cloud
Для обеспечения быстрой доступности файлов из IPFS в обычной сети связи используется сервис Pinata.cloud. Чтобы завести аккаунт вам необходимо пройти по [ссылке](https://app.pinata.cloud/register) и завести собственный аккаунт, это бесплатно. Вам необходимо сохранить логин и пароль так как в дальнейшем он будет использоваться в "Feecc Рабочее Место Инженера".

#### Создание аккаунта в YOURLS

#### Создание аккаунта Robonomics parachain в экосистеме Polkadot
Для создания аккаунта Robonomics parachain в экосистеме Polkadot воспользуйтесь инструкцией по [ссылке](https://wiki.robonomics.network/docs/en/create-account-in-dapp/#1-using-polkadotjs-browser-extension) 

### Развертывание Feecc Рабочее Место Инженера с использованием рекомендованного оборудования
Для запуска 

### Развертывание Feecc Рабочее Место Инженера в режиме эмуляции рекомендованного оборудования
