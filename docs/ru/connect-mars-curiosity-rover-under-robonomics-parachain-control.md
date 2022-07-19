---
title: Подключить марсоход Curiosity под управлением парачейна Робономики 
locale: 'ru' 
contributors: [Vourhey, PaTara43, katerina510]
translated: true
---

**Давайте посмотрим, как контроль Парачейна Робономики заставляет двигаться марсоход Curiosity. Требования:**
- ROS Melodic + Gazebo + RViz (руководство по установке [здесь](http://wiki.ros.org/melodic/Installation))
- дополнительные пакеты:
```shell
sudo apt-get install ros-melodic-gazebo-ros-control ros-melodic-effort-controllers ros-melodic-joint-state-controller
```
- IPFS до [0.6.0](https://dist.ipfs.io/go-ipfs/v0.6.0/go-ipfs_v0.6.0_linux-386.tar.gz)
- расширение [IPFS Companion](https://github.com/ipfs/ipfs-companion)
- узел Робономики (двоичный файл) (скачайте последнюю версию [здесь](https://github.com/airalab/robonomics/releases). Это руководство было успешно протестировано на v1.1)

В этом видео показан успешный запуск:

https://www.youtube.com/watch?v=6BSOyRbmac8

### 1. Настройте симуляцию
Скачайте пакет для марсохода Curiosity:
```shell
mkdir -p robonomics_ws/src
cd robonomics_ws/src
git clone https://bitbucket.org/theconstructcore/curiosity_mars_rover/src/master/
cd ..
catkin build
```
Нужно настроить начальные условия, чтобы наш марсоход успешно появился:
- Перейдите в

`src/master/curiosity_mars_rover_description/worlds` и измените строку 14 файла `mars_curiosity.world` на 
`<pose>0 0 8 0 0 0</pose>`

- Перейдите в

`src/master/curiosity_mars_rover_description/launch` и измените строку 4 файла `mars_curiosity_world.launch` на
`<arg name="paused" default="false"/>`

Не забудьте добавить команду source в `~/.bashrc`
`source /home/$USER/robonomics_ws/devel/setup.bash`


- Перезагрузите консоль и запустите симуляцию:

```shell
roslaunch curiosity_mars_rover_description main_real_mars.launch
```
![марсоход](../images/curiosity-demo/rover.jpg?raw=true "Марсоход")

Заметьте: если картинка темная, например, затененная, измените `Camera` на `Orthorgraphic` в панели инструментов Gazebo.
Симуляцию можно закрыть на некоторое время.

------------

### 2. Скачайте пакет контроллера Робономики
Чтобы загрузить пакет контролера для типа марсоход, введите в терминале:
```shell
cd ~/robonomics_ws/src
git clone https://github.com/PaTara43/robonomics_sample_controller
cd robonomics_sample_controller
pip3 install -r requirements.txt
pip3 install rospkg
cd ..
catkin build -DPYTHON_EXECUTABLE=/usr/bin/python3 # The controller supports python3
```

------------

### 3. Управление аккаунтами в децентрализованном приложении
Так как мы тестируем, давайте создадим локальную сеть Робономики с двоичным файлом Робономики:
```shell
./robonomics --dev --tmp
```

![Запускаем узел](../images/curiosity-demo/robonomics.jpg?raw=true "Запускаем узел")


Перейдите на [портал парачейна Робономики](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) и переключитесь на локальный узел. 

![Локальный узел](../images/curiosity-demo/local_node.jpg?raw=true "Локальный узел")


Перейдите в Accounts и создайте аккаунты **CURIOSITY** и **EMPLOYER**.

**Важно**! Скопируйте адрес каждого аккаунта (чтобы это сделать, кликните на иконку аккаунта) и **сид-фразу** аккаунта Curiosity (сгенерированную при создании аккаунта). Отправьте токены на эти аккаунты. Подробнее об аккаунтах Робономики можно прочесть [здесь](https://wiki.robonomics.network/docs/ru/create-account-in-dapp/)

![Создание аккаунта](../images/curiosity-demo/account_creation.jpg?raw=true "Создание аккаунта")


Добавьте эти адреса, сид и адрес узла (по умолчанию `ws://127.0.0.1:9944` - узел разработчика) в `config.config` в `robonomics_ws/src/robonomics_sample_controller/src`. Без кавычек.

------------


### 4. Запустите Робономику

Перед тем как двигаться дальше, убедитесь, что Вы установили [расширение IPFS Companion](https://github.com/ipfs/ipfs-companion).

В отдельном терминале запустите IPFS:
```shell
ifps init #you only need to do this once per IPFS installation
ipfs daemon
```

В другом отдельном терминале запустите симуляцию Curiosity, если она еще не запущена:
```shell
roslaunch curiosity_mars_rover_description main_real_mars.launch
```
Дождитесь выполнения операций.

В другом терминале запустите контроллера:
```shell
rosrun robonomics_sample_controller sample_controller.py
```
![Контроллер](../images/curiosity-demo/controller.jpg?raw=true "Контроллер")


Теперь Вы можете отправлять транзакции, запускающие движение и сборку данных марсоходом. Чтобы это сделать, Вы можете использовать все тот же [портал парачейна Робономики](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/).
Перейдите в `Developer->Extrinsics` и выберите аккаунт employer для Curiosity, экстринсик `launch`, аккаунт Curiosity как целевой аккаунт и `yes` как параметр.
Отправьте экстринсик.

![Экстринсик](../images/curiosity-demo/extrinsic.jpg?raw=true "Экстринсик")


Робот должен начать двигаться. Он не будет принимать команды от других аккаунтов, а также команды с параметром `no`. Марсоход будет двигаться и собирать данные примерно около минуты.
Затем, после выполнения работы:

![Работа выполнена](../images/curiosity-demo/job_done.jpg?raw=true "Работа выполнена")


На портале Робономики перейдите в `Developer -> Chain state` и получите журнал данных `CURIOSITY`, используя кнопку “+” с выбранным `datalog -> RingBufferItem` в качестве запроса: 

![Журнал данных](../images/curiosity-demo/datalog.jpg?raw=true "Журнал данных")

Теперь хэш IPFS телеметрии сохранен в блокчейне. Чтобы посмотреть данные, просто скопируйте хэш и найдите его на шлюзе:

![Данные в IPFS](../images/curiosity-demo/data_in_ipfs.jpg?raw=true "Данные в IPFS")


Эта телеметрия хранится в децентрализованном хранилище, а ее хэш хранится в блокчейне!
