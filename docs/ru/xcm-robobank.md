---
title: Substrate Cumulus Parachain Testsuite для межцепочечной передачи сообщений 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


Основная цель этого проекта - упрощение разработки времени выполнения парачейна при использовании межцепочечных сообщений. 
Он позволяет разрабатывать код времени выполнения с интеграционными тестами с высокой степенью повторяемости и простым использованием.
Он автоматизирует построение, создание предварительно заданной конфигурации сети (т.е. 1 ретрансляционная цепочка + 2 парачейна), настройку каналов передачи сообщений между парачейнами и запуск тестов передачи сообщений, отправку сообщений с использованием вызова времени выполнения, все это создано и составлено на языке Python.

XCM Testsuite используется для тестирования производственного цикла Robobank - набора палеток Substrate, которые позволяют роботам регистрироваться на внешних парачейнах, получать предоплаченные заказы, выполнять их и получать платежи с использованием внешних токенов. Это позволяет роботам работать внутри сети Robonomics со всей необходимой инфраструктурой, но в то же время предлагать свои услуги на любом другом парачейне.

Пример видео доступен на [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

Основные шаги в демонстрационном сценарии:
- запуск ретрансляционной цепочки и двух парачейнов в пакете из 6 процессов
- настройка каналов передачи сообщений XCM между парачейнами
- регистрация робота в обоих парачейнах
- создание заказа для этого робота в клиентском парачейне (резервирование платежа для завершения заказа)
- отправка сообщения XCM на парачейн Robonomics
- создание "зеркальной" записи заказа на парачейне Robonomics
- робот принимает заказ на парачейне Robonomics
- отправка сообщения XCM о принятии заказа обратно на клиентский парачейн
- принятие заказа на клиентском парачейне (резервирование штрафного сбора за невыполнение заказа до срока)
- робот завершает заказ на парачейне Robonomics
- отправка сообщения XCM о завершении заказа на клиентский парачейн
- расчет всех платежей (платеж клиента передается роботу, а также неиспользованный штрафной сбор)
- закрытие заказа1


## Верхний поток
Этот проект является форком
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
Он содержит код палеток времени выполнения, которые тестируются.
Как и в исходном коде узла, код парачейнов находится в каталогах "./pallets", "./runtime", "./node".

Отличия от исходного "substrate-node-template":
- этот временной код имеет модуль обработчика HRMP и может обрабатывать сообщения от соседних парачейнов
- готовый к использованию тестовый временной код для внутренних тестов XCM

## Сборка и запуск
Рекомендуется (очень) настройка: 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[ПРИМЕЧАНИЕ] Первая сборка может занять много времени, до нескольких часов на неоптимальных машинах.

[ПРИМЕЧАНИЕ] Скрипт работает с ФИКСИРОВАННЫМИ версиями (хэшами коммитов) Polkadot(Rococo) в ретрансляционной цепочке и парачейнах.

[ПРИМЕЧАНИЕ] По умолчанию скрипт каждый раз создает одну и ту же среду при запуске, удаляя все предыдущие состояния. Это поведение можно изменить в "config.sh", используя параметр "PERSISTENT".


Запустите сборку и настройку скрипта.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Основные действия скрипта "init.sh":
 - чтение конфигурации (файл "config.sh" с номером ревизии, начальными ключами и идентификаторами узлов, параметром сохранения цепных данных и т.д.)
 - настройка пакетов ОС, Rust и Python
 - создание отдельных двоичных файлов для ретрансляционной цепочки и также для обоих парачейнов
    - бинарные файлы будут сгенерированы в подкаталоге ./bin. 
 - (необязательно) удаление всех предыдущих цепных данных для всех цепей
    - отключается, если "PERSISTENT=1" установлено в "config.sh"
 - запуск в виде отдельных процессов (с отдельными PID и каналами ввода-вывода):
    - валидаторы ретрансляционной цепочки (т.е. 4 валидатора, работающих на стабильной ревизии Rococo)
    - коллаторы для парачейна-100 (т.е. один коллатор для первого парачейна, который вы разрабатываете)
    - коллаторы для парачейна-200 (т.е. один коллатор для второго парачейна, который вы разрабатываете)
 - печать всех конечных точек, портов в консоль, позволяющая изучать любую цепь с помощью приложений фронтенда (обозреватель, DApp)
 - продолжайте печатать все выходные данные всех цепей в консоль

[ПРЕДУПРЕЖДЕНИЕ] После запуска дождитесь, пока сеть будет работать, убедитесь, что финализация блока началась и что парачейны зарегистрированы. Эти процессы должны занимать примерно 5 минут (50 блоков x 6 секунд).

## Проверка работы начальной настройки 

Используйте стандартный фронтенд Polkdot и сгенерированные конечные точки "--ws-port" для подключения к каждому узлу.
Откройте [приложение Polkadot](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) для мониторинга цепей. 

### Пример:
Localhost, 4 валидатора ретрансляционной цепочки, один коллатор парачейна-100, один коллатор парачейна-200:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


Если все работает, и согласование началось, мы можем перейти к запуску наших тестовых случаев (в новом терминале).

### Тестирование передачи сообщений UMP
```bash
./scripts/init.sh ump
```
Он создает сообщение `Balance.transfer` в `парачейн-100` и передает его на цепочку реле.
Когда цепочка реле получает сообщение, она переводит 15 токенов со счета `пара 100` на счет Чарли.


### Тестирование передачи сообщений HRMP
```bash
./scripts/init.sh ump
```

Он создает сообщение `Balance.transfer` в `парачейн-100` и передает его в `соседний 200`.
До этого он наделяет счет `субл 100` 1000 токенами и устанавливает коммуникационный канал между парачейнами.
```bash
./scripts/init.sh hrmp
```
Следующие сообщения могут быть отправлены, запустив подкоманду `hrmpm`. Он не создает канал, поэтому работает быстрее.
```bash
./scripts/init.sh hrmpm
```

### Дополнительные параметры
```bash
./scripts/init.sh help
```

## Локальная тестовая сеть

### Создание настраиваемой спецификации цепи
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Отредактируйте файл rococo_local.json, заменив параметры балансов и авторитетов на свои.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

Адрес Polkadot для //Alice//stash (криптография sr25519).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Ключ сессии Polkadot grandpa для //Alice (криптография ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Адрес Polkadot для //Alice (криптография sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Преобразование rococo_local.json в необработанный формат.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Чтобы использовать новую спецификацию цепи, замените файл rococo.json в каталоге ./config/ на этот новый и перезапустите цепь.
```bash
./scripts/init.sh run
```
Вы можете свободно редактировать код. Вышеуказанная команда перестроит проект и обновит узел коллатора перед запуском.
Cumulus - это предварительная версия программного обеспечения, которое все еще находится в активной разработке.
We are using a specific commit of polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

Вы можете использовать более новые версии программного обеспечения. Для этого измените POLKADOT_COMMIT в ./scipt/config.sh
на последний коммит ветки `rococo-v1`, удалите ./bin/polkadot и запустите 
```bash
./scripts/init.sh run
```

Обновление зависимостей проекта коллатора 
```bash
cargo update
./scripts/init.sh build
```
Некоторые зависимости, вероятно, требуют новых функций инструментальной цепи Rust. Этот проект основан на Rust `nightly-2021-01-26`
Обновите версию инструментальной цепи Rust в ./scripts/config.sh перед сборкой.

## Взлом парачейна
[Добавление внешнего паллета](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - возможно, это должно быть в разделе "Узнать больше"?
## Learn More

Ссылка на оригинальный [Шаблон узла разработчика Substrate](https://github.com/substrate-developer-hub/substrate-node-template), чтобы узнать больше о структуре этого проекта, его возможностях и способе их реализации. Вы можете узнать больше о [Пути блока парачейна](https://polkadot.network/the-path-of-a-parachain-block/) на официальном блоге Polkadot. [Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)
