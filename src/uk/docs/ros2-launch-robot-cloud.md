---
title: Запуск Робота з Хмари
contributors: [Fingerling42]
tools:   
  - Обгортка Robonomics ROS 2 версії 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**У цій статті ви дізнаєтеся, як використовувати функцію запуску Robonomics в ROS 2 за допомогою різних прикладів**

Основною функцією парачейну Robonomics для відправлення команд на пристрої є зовнішній запуск. Ця функція дозволяє відправляти рядок, що містить параметр (у вигляді значення hex у формі 32 байтів) на вказану адресу у парачейні. Зазвичай рядок представляє собою хеш IPFS, який вказує на файл з необхідними параметрами для виконання команди. Більше деталей про функцію запуску можна знайти [у цій статті](https://wiki.robonomics.network/docs/launch/).

У Обгортці Robonomics ROS 2 функція запуску реалізована як сервіс для відправлення команд та як тема для отримання команд.

## Відправлення Запуску

Сервіс, під назвою `robonomics/send_launch`, виглядає наступним чином:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # Просто рядок параметрів або ім'я файлу з параметрами, які потрібно завантажити в IPFS
string  target_address          # Адреса, яку потрібно активувати за допомогою запуску
bool    is_file         True    # Це параметр запускучи потрібно завантажити файл в IPFS (за замовчуванням True)?
bool    encrypt_status  True    # Перевірте, чи потрібно зашифрувати файл параметрів за цільовою адресою, за замовчуванням True
---
string  launch_hash             # Хеш транзакції запуску
```

{% endcodeHelper %}

Сервіс приймає наступні параметри як частину запиту: параметр команди (це може бути простий рядок або назва файлу, що містить параметри команди), цільова адреса в паралельному ланцюжку Robonomics для відправлення запуску, та два прапорці: один вказує, чи є параметр файлом, а інший вказує, чи файл повинен бути зашифрованим (обидва за замовчуванням встановлені на true). Файл буде завантажено в IPFS, і його хеш буде переданий як параметр запуску. Тому файл повинен бути розміщений у каталозі, призначеному для файлів IPFS, як вказано в файлі конфігурації для вузла `robonomics_ros2_pubsub`.

За замовчуванням файл зашифровується за допомогою публічної адреси отримувача запуску. Застосований метод шифрування - шифрування на основі публічного ключа на основі криптографії еліптичної кривої Curve25519. У поточній реалізації шифрування підтримується лише для адрес рахунків типу ED25519 (Edwards) (ви можете дізнатися більше про це в [цій статті](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

Після відправлення запуску сервіс повертає хеш транзакції.

## Отримання запуску

ОтриманняЗапуск організований у формі відповідної теми. Технічно, вузол використовує функціонал інтерфейсу robonomics для підписки на стан власної адреси та очікує появи події `NewLaunch`. Як тільки подія відбудеться, вузол публікує повідомлення на тему `robonomics/received_launch`. Формат повідомлення виглядає наступним чином:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # Адреса облікового запису, яка відправила команду на запуск
string  param                   # Рядок з параметром або назва файлу з параметрами
```

{% endcodeHelper %}

Поля повідомлення містять адресу, з якої був відправлений запуск, та сам параметр: або простий рядок, або назва файлу з параметрами, який був завантажений з IPFS та розміщений у робочому каталозі IPFS. Якщо файл був зашифрований, він розшифровується під час цього процесу.


## Приклад з Turtlesim

Далі ми продемонструємо, як використовувати функцію запуску з [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) як приклад. Turtlesim - це легкий симулятор, призначений для вивчення ROS 2. Ви можете встановити його за допомогою наступної команди:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

Пакет обгортки Robonomics ROS 2 включає попередньо побудований пакет під назвою `turtlesim_robonomics`, спеціально адаптований для Turtlesim. Цей пакет дозволяє вам перевірити всі можливості обгортки. Давайте спробуємо запустити його.

{% roboWikiNote {type: "warning", title: "Попередження"}%}

  Будь ласка, переконайтеся, що у вас є достатній баланс на рахунку або активна підписка для виконання транзакцій.

{% endroboWikiNote %}

1. Для початку створіть файл конфігурації для екземпляра pubsub `turtlesim_robonomics` за допомогою шаблону `config/robonomics_pubsub_params_template.yaml`. Заповніть відповідні поля своїми обліковими даними Robonomics (seed-код рахунку, тип криптовалюти, адреса власника підписки). Також вкажіть каталог для файлів IPFS. Після завершення перейменуйте файл, наприклад, `first_pubsub_params.yaml`.

2. Запустіть демон IPFS:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. Запустіть наступний файл запуску ROS 2. Він запустить всі необхідні вузли: сам Turtlesim, реалізацію обгортки для Turtlesim та Robonomics pubsub:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params```.yaml простір імен:='turtlesim1'
```

{% endcodeHelper %}

Ви побачите симулятор з черепахою, разом з журналами ROS 2 у консолі, де відображається IPFS ID, шлях до каталогу з файлами IPFS, адреса Robonomics та інша важлива інформація.

### Запуск Turtlesim з порталу Polkadot

1. Turtlesim керується через тему `/cmd_vel`, тому вам потрібно підготувати відповідні повідомлення та включити їх у файл, який буде використовуватися як параметр запуску. Для зручності ці повідомлення підготовлені у файлі JSON. Створіть файл (наприклад, `turtle_cmd_vel.json`) та вставте наступне:

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

  Цей приклад JSON буде вказувати черепаху рухатися двічі.

2. Далі файл потрібно завантажити в IPFS. Ви можете вибрати будь-який метод, але для цього прикладу ми використаємо IPFS Kubo. Відкрийте термінал у каталозі, де знаходиться файл JSON, і завантажте його в IPFS:

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  Ви отримаєте хеш IPFS файлу. Обов'язково збережіть його для подальшого використання.

3. Перш ніж відправити запуск, хеш IPFS повинен бути перетворений у рядок довжиною 32 байти. Це можна зробити за допомогою кількох команд Python. Відкрийте термінал, запустіть інтерпретатор Python 3 і виконайте наступні команди:

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  Збережіть отриманий рядок для подальшого використання.

4. Відкрийте портал Robonomics [Polkadot/Substrate portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) та перейдітьдо вкладки **Розробники** -> **Екструзії**. Виберіть екструзію `launch` -> `launch(robot, param)`. У полі `robot` вставте адресу вашого робота, а в поле `param` вставте рядок з конвертованим хешем IPFS. Надішліть транзакцію.


5. Перейдіть до симулятора Turtlesim. Після успішного відправлення транзакції черепаха повинна почати рухатися.


### Запуск Turtlesim з інструментів командного рядка ROS 2

1. Тепер спробуємо відправити запуск до Turtlesim з іншого вузла ROS 2 pubsub. Спочатку створіть інший файл конфігурації (наприклад, `second_pubsub_params.yaml`) з іншими обліковими даними Robonomics та окремим каталогом IPFS.

2. У окремому терміналі запустіть новий вузол `robonomics_ros2_pubsub` за допомогою нового файлу конфігурації:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. Помістіть файл JSON, що містить команди для Turtlesim (`turtle_cmd_vel.json`), в каталог IPFS нового pubsub.

4. Перед відправленням запуску налаштуйте моніторинг, щоб спостерігати, як `turtlesim_robonomics` отримує дані.дані по прибуттю. Для цього в окремому терміналі підпишіться на відповідну тему:

{% codeHelper { copy: true}%}

```shell
ros2 topic echo /turtlesim1/robonomics/received_launch
```

{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"}%}
За замовчуванням обробник запуску очікує хеш IPFS файлу як параметр. Якщо вам потрібно, щоб pubsub обробляв параметр як звичайний рядок, вам потрібно змінити відповідний параметр вузла ROS 2 `launch_is_ipfs` з `True` на `False`. Це можна зробити за допомогою команди `ros2 param set`. 
{% endroboWikiNote %}

5. Зараз нам потрібно викликати сервіс ROS 2 для відправки запуску. У відокремленому терміналі використовуйте наступну команду:

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'YOUR_TURTLESIM_ADDRESS'"}
```

{% endcodeHelper %}

Ви побачите журнали pubsub, які відображають деталі відправлення запуску.

6. Перейдіть до симулятора Turtlesim. Після успішної відправки транзакції черепаха повинна почати.переміщення. Крім того, в журналах підписаної теми ви повинні бачити інформацію про отримані дані.


### Запуск Turtlesim з іншого вузла

1. Тепер спробуйте створити тестовий вузол, який буде чекати на прихід запуску, а потім пересилати його до Turtlesim. Ви можете використовувати готовий тестовий пакет `test_robot_robonomics`. Скопіюйте цей пакет до вашого робочого простору ROS 2.

2. Відкрийте файл вузла, розташований за шляхом `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` у будь-якому текстовому редакторі, і додайте наступний код після функції `__init__`:

  {% codeHelper { copy: true}%}

  ```python
  def launch_file_subscriber_callback(self, msg) -> None:
      super().launch_file_subscriber_callback(msg)

      transaction_hash = self.send_launch_request(self.param, target_address='YOUR_TURTLESIM_ADDRESS', is_file=True, encrypt_status=True)

      self.get_logger().info('Sent launch to the turtle with hash: %s ' % str(transaction_hash))
  ```
  
  {% endcodeHelper %}

  Ця функція спочатку оброблятиме отриманий запуск, а потім використовуватиме його параметр для відправлення нового запуску до Turtlesim.

3. Побудуйте пакет, використовуючи `colcon`, а потім використовуйте його налаштувальні файли.

4. Запустіть ROS 2 файл запуску тестового пакету з другими публікаційними / підписними обліковими даними:

  {% codeHelper { copy: true}%} 

  ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```

  {% endcodeHelper %}

5. Тепер надішліть запуск з параметрами `turtle_cmd_vel.json` на адресу вузла тесту, наприклад, через портал Polkadot/Substrate. Перед цим переконайтеся, що Turtlesim все ще працює. Тестовий вузол повинен отримати запуск, а потім надіслати новий з тими ж параметрами, що призведе до руху черепахи в Turtlesim.
