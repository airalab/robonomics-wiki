---
title: Запуск робота из облака
contributors: [Fingerling42]
tools:   
  - Оболочка Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**В этой статье вы узнаете, как использовать функцию запуска Robonomics в ROS 2 на примерах**

Основной особенностью парачейна Robonomics для отправки команд устройствам является внешний вызов запуска. Эта функция позволяет отправлять строку, содержащую параметр (в виде 32-байтового шестнадцатеричного значения) на указанный адрес в парачейне. Обычно строка представляет собой хеш IPFS, который указывает на файл с необходимыми параметрами для выполнения команды. Более подробную информацию о функции запуска можно найти [в этой статье](https://wiki.robonomics.network/docs/launch/).

В оболочке Robonomics ROS 2 Wrapper функция запуска реализована как сервис для отправки команд и как тема для получения команд.

## Отправка запуска

Сервис, называемый `robonomics/send_launch`, выглядит следующим образом:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # Просто строка параметров или имя файла с параметрами, которые необходимо загрузить в IPFS
string  target_address          # Адрес, который будет запущен с помощью запуска
bool    is_file         True    # Является ли параметром запускафайл, который должен быть загружен в IPFS (по умолчанию True)?
bool    encrypt_status  True    # Проверьте, нужно ли зашифровать файл параметров с целевым адресом, по умолчанию True
---
string  launch_hash             # Хэш транзакции запуска
```

{% endcodeHelper %}

Сервис принимает следующие параметры в качестве части запроса: параметр команды (либо простая строка, либо имя файла, содержащего параметры команды), целевой адрес в парачейне Robonomics для отправки запуска и два флага: один указывает, является ли параметр файлом, а другой указывает, должен ли файл быть зашифрован (оба установлены по умолчанию в true). Файл будет загружен в IPFS, и его хэш будет передан в качестве параметра запуска. Поэтому файл должен быть помещен в каталог, предназначенный для файлов IPFS, как указано в файле конфигурации узла `robonomics_ros2_pubsub`.

По умолчанию файл зашифрован с использованием публичного адреса получателя запуска. Применяемый метод шифрования - шифрование с открытым ключом на основе криптографии эллиптической кривой Curve25519. В текущей реализации шифрование поддерживается только для адресов учетных записей типа ED25519 (Эдвардс) (вы можете узнать больше об этом в [этой статье](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

После отправки запуска сервис возвращает хэш транзакции.

## Получение Запуска

ПолучениеЗапуск организован в форме соответствующей темы. Технически узел использует функциональность robonomics-interface для подписки на состояние собственного адреса и ожидает появления события `NewLaunch`. Как только событие происходит, узел публикует сообщение в тему `robonomics/received_launch`. Формат сообщения следующий:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # Адрес учетной записи, отправившей команду на запуск
string  param                   # Строка с параметром или имя файла с параметрами
```

{% endcodeHelper %}

Поля сообщения содержат адрес, с которого был отправлен запуск, и сам параметр: либо простая строка, либо имя файла с параметрами, который был загружен с IPFS и помещен в рабочий каталог IPFS. Если файл был зашифрован, он расшифровывается во время этого процесса.


## Пример с Turtlesim

Далее мы продемонстрируем, как использовать функцию запуска с [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) в качестве примера. Turtlesim - это легкий симулятор, разработанный для изучения ROS 2. Вы можете установить его, используя следующую команду:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```
{% endcodeHelper %}

Пакет Robonomics ROS 2 Wrapper включает предварительно собранный пакет под названием `turtlesim_robonomics`, специально адаптированный для Turtlesim. Этот пакет позволяет вам протестировать все функции обертки. Давайте попробуем запустить его.

{% roboWikiNote {type: "warning", title: "Предупреждение"}%}

  Пожалуйста, убедитесь, что у вас достаточно средств на счету или активная подписка для выполнения транзакций.

{% endroboWikiNote %}

1. Для начала создайте файл конфигурации для экземпляра pubsub `turtlesim_robonomics` с использованием шаблона `config/robonomics_pubsub_params_template.yaml`. Заполните соответствующие поля вашими учетными данными Robonomics (семя учетной записи, тип криптовалюты, адрес владельца подписки). Также укажите каталог для файлов IPFS. После завершения переименуйте файл, например, в `first_pubsub_params.yaml`.

2. Запустите демон IPFS:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. Запустите следующий файл запуска ROS 2. Он запустит все необходимые узлы: сам Turtlesim, реализацию обертки для Turtlesim и Robonomics pubsub:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params
```.yaml пространство имен:='turtlesim1'
```

{% endcodeHelper %}

Вы увидите симулятор с черепахой, а также журналы ROS 2 в консоли, отображающие IPFS ID, путь к каталогу с файлами IPFS, адрес Robonomics и другую актуальную информацию.

### Запуск Turtlesim из портала Polkadot

1. Turtlesim управляется через тему `/cmd_vel`, поэтому вам нужно подготовить соответствующие сообщения и включить их в файл, который будет использоваться в качестве параметра запуска. Для удобства эти сообщения подготовлены в файле JSON. Создайте файл (например, `turtle_cmd_vel.json`) и вставьте следующее:

  {% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
```    }
  ]
  ```

  {% endcodeHelper %}

  В этом примере JSON команда заставит черепаху дважды двигаться.

2. Далее файл нужно загрузить в IPFS. Вы можете выбрать любой метод, но для этого примера мы будем использовать IPFS Kubo. Откройте терминал в каталоге, где находится файл JSON, и загрузите его в IPFS:

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  Вы получите IPFS-хеш файла. Обязательно сохраните его для дальнейшего использования.

3. Перед отправкой запуска IPFS-хеш должен быть преобразован в строку длиной 32 байта. Это можно сделать с помощью нескольких команд Python. Откройте терминал, запустите интерпретатор Python 3 и выполните следующие команды:

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  Сохраните полученную строку для дальнейшего использования.

4. Откройте портал Robonomics [Polkadot/Substrate portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) и перейдитеК **Разработчикам** -> вкладка **Экструзии**. Выберите экструзию `launch` -> `launch(robot, param)`. В поле `robot` вставьте адрес вашего робота, а в поле `param` вставьте строку с преобразованным хэшем IPFS. Отправьте транзакцию.


5. Перейдите к симулятору Turtlesim. После успешной отправки транзакции черепаха должна начать движение.


### Запуск Turtlesim из инструментов командной строки ROS 2

1. Теперь давайте попробуем отправить запуск Turtlesim из другого узла ROS 2 pubsub. Сначала создайте другой файл конфигурации (например, `second_pubsub_params.yaml`) с другими учетными данными Robonomics и отдельной директорией IPFS.

2. В отдельном терминале запустите новый узел `robonomics_ros2_pubsub` с использованием нового файла конфигурации:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. Поместите JSON-файл, содержащий команды для Turtlesim (`turtle_cmd_vel.json`), в директорию IPFS нового pubsub.

4. Прежде чем отправить запуск, давайте настроим мониторинг, чтобы наблюдать, как `turtlesim_robonomics` получает. данные по прибытии. Для этого в отдельном терминале подпишитесь на соответствующую тему:

{% codeHelper { copy: true}%}

```shell
ros2 topic echo /turtlesim1/robonomics/received_launch
```

{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"}%} 
По умолчанию обработчик запуска ожидает хеш IPFS файла в качестве параметра. Если вам нужно, чтобы pubsub обрабатывал параметр как обычную строку, вам нужно изменить соответствующий параметр узла ROS 2 `launch_is_ipfs` с `True` на `False`. Вы можете сделать это с помощью команды `ros2 param set`.
{% endroboWikiNote %}


5. Сейчас нам нужно вызвать сервис ROS 2, чтобы отправить запуск. В отдельном терминале используйте следующую команду:

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'YOUR_TURTLESIM_ADDRESS'"}
```
{% endcodeHelper %}

Вы увидите журналы pubsub, отображающие детали отправки запуска.

6. Перейдите к симулятору Turtlesim. После успешной отправки транзакции черепаха должна начать.

### Запуск Turtlesim из другого узла

1. Теперь давайте попробуем создать тестовый узел, который будет ожидать прибытия запуска, а затем пересылать его в Turtlesim. Вы можете использовать готовый тестовый пакет `test_robot_robonomics`. Скопируйте этот пакет в ваше рабочее пространство ROS 2.

2. Откройте файл узла, расположенный по пути `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py`, в любом текстовом редакторе, и добавьте следующий код после функции `__init__`:

{% codeHelper { copy: true}%}

   ```python
   def launch_file_subscriber_callback(self, msg) -> None:
       super().launch_file_subscriber_callback(msg)

       transaction_hash = self.send_launch_request(self.param, target_address='YOUR_TURTLESIM_ADDRESS', is_file=True, encrypt_status=True)

       self.get_logger().info('Отправлен запуск черепахе с хэшем: %s ' % str(transaction_hash))
   ```

{% endcodeHelper %}

Эта функция сначала обработает полученный запуск, а затем использует его параметр для отправки нового запуска в Turtlesim.

3. Соберите пакет с помощью `colcon`, а затем активируйте его установочные файлы.

4. Запустите файл запуска ROS 2 тестового пакета с учетными данными второго pubsub:


  {% codeHelper { copy: true}%}

   ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```
  
  {% endcodeHelper %}

5. Теперь отправьте запуск с параметрами `turtle_cmd_vel.json` на адрес тестового узла, например, через портал Polkadot/Substrate. Прежде чем это сделать, убедитесь, что Turtlesim все еще работает. Тестовый узел должен получить запуск, а затем отправить новый с теми же параметрами, что заставит черепаху в Turtlesim начать движение.
