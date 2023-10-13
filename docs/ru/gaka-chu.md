---
title: Gaka-Chu setup and software Установка

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**В этой статье мы рассмотрим некоторые этапы установки и запуска робота-художника. Требования:**
- KUKA KR6 R900 sixx с KRC4 и SmartPad;
- установленные Intel NUC с [ROS melodic](http://wiki.ros.org/melodic/Установка/Ubuntu);
- Стол, краска, кисть, вода.

## Установка программного обеспечения на KRC4
Требуется интерфейс EKI как на KRC4, так и на NUC. Подробная информация о том, как его настроить на KRC4, представлена [здесь](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Запустите его на контроллере робота.

## Установка программного обеспечения на NUC
Создайте рабочее пространство catkin:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
Загрузите пакеты ROS. Все скрипты хранятся [здесь](https://github.com/airalab/robot_painter/tree/test_branch). Клонировать репозиторий:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
Вам может понадобиться некоторые заголовочные файлы и библиотеки, чтобы все работало правильно. Загрузите их:
```
cd ~
git clone https://github.com/PaTara43/kuka_moveit_webots
cd kuka_moveit_webots
sudo mv -r headers/* usr/include/c++/7/
sudo mv libs/* usr/local/lib/
cd ~
svn checkout https://github.com/PX4/Matrix/trunk/matrix
mv matrix -r /usr/include/c++/7/
sudo apt-get install ros-melodic-brics-actuator
cd ~/catkin_ws
catkin build
```
Добавьте команду source в файл `.bashrc`:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
На данный момент вы должны иметь возможность запускать скрипты. Если что-то идет не так, попробуйте некоторые [решения проблем](https://github.com/airalab/robot_painter/issues)

## Заполнение констант
Прежде всего, роботу необходимо знать местоположение и ориентацию холста, а также позицию банки с краской. Все это указывается в `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Давайте посмотрим на это.
```
// Plane constants
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// Canvas transform
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
Это константы уравнения плоскости, которые указывают положение холста в трехмерном пространстве. Они должны быть получены во время процесса калибровки, описанного ниже. Далее идет краска.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Это координаты банки с краской. Они также могут быть указаны при калибровке. Размер холста указывается в
```
canvas.width = 0.5;
canvas.height = 0.4;
```
Еще несколько важных констант хранятся в `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
Их названия говорят сами за себя, поэтому заполните их в соответствии с ситуацией.

## Калибровка Gaka-Chu
Сам процесс калибровки довольно прост.

1) Запустите интерфейс EKI на KRC4:

Войдите в режим 'AUT', включите драйверы и запустите скрипт `eki_hw_interface`

2) Запустите интерфейс EKI на NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Он должен выводить бесконечные журналы.

3) Запустите RViz
```
roslaunch kuka_moveit_config demo.launch
```
Вы должны увидеть следующее:

![KUKA in RViz](../images/kuka-real/kuka_rviz.png "KUKA in RViz")

Попробуйте переместить рабочий орган и нажмите 'Plan and Execute'. Робот должен двигаться. На SmartPad перейдите к **Display -> Actual position** и наблюдайте координаты рабочего органа. Горизонтально расположите холст на базе робота. Вставьте кисть в держатель и аккуратно перемещайте ее, пока она едва касается холста. В этом положении сохраните координаты рабочего органа. Повторите 12-15 раз. Также сохраните координаты центра холста и банки с краской.
Когда у вас есть набор координат, используйте [эти](https://github.com/nakata5321/Matlab_scripts_gaka-chu) скрипты Matlab для определения недостающих констант и кватерниона. Вставьте их. Перестройте свое рабочее пространство с
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Тестирование калибровки Gaka-Chu
После калибровки Gaka-Chu необходимо протестировать, нарисовав границы холста. Чтобы сделать это, выполните каждую в новом терминале:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
После этого вы должны увидеть контур холста в RViz:

![KUKA in RViz canvas](../images/kuka-real/kuka_rviz_canvas.png "KUKA in RViz canvas")

В терминале нажмите "S" для выполнения тестирования. Конечный эффектор робота должен двигаться прямо над границами холста, и кисть должна мягко касаться холста во время всего движения. Если это не так, попробуйте перекалибровать. Если модель холста повернута неправильно, вы можете повернуть ее, изменив кватернион в Matlab.

## Создание искусства
Для работы вам понадобятся 6 основных модулей:
- Интерфейс EKI;
- MOVEit + RViz;
- Трансляция окружающих рамок;
- Сервис конвертации изображений;
- Модуль рисования траекторий;
- Триггер запуска.

Давайте запустим их по одному.

### Интерфейс EKI
При запуске KRC4 запустите `eki_hw_interface`, на NUC в новом терминале выполните следующее:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz и MOVEit
Вам понадобится планировщик и симуляция. Запустите их с помощью
```
roslaunch kuka_moveit_config demo.launch
```

### Окружение
Сообщите роботу, где находятся банка с краской и холст. Обратите внимание, что нет необходимости запускать узел `draw workspace`, `tf_broadcaster` передает размер холста. Он просто не отображается в RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Обработчик изображений
Все входящие изображения должны быть обработаны. Запустите сервис.
```
rosrun picture_preprocessing TextConverter.py
```
Когда он получает вызов, он обрабатывает изображение с помощью фильтра HP и создает файл rosbag с траекториями.

### Модуль рисования траекторий
Основной скрипт здесь - это сам модуль рисования траекторий. Он ожидает изображение, вызывает сервис TextConverter и рисует картину.
```
rosrun local_task_planner trajectory_drawing
```

## Отправьте роботу изображение для рисования
Робот слушает определенную ROS-тему, где вам нужно передать путь к желаемому изображению. Изображение должно быть квадратным (ширина равна высоте) и состоять из линий. Отправьте путь:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
После этого появятся два окна, показывающие контуры и траектории. Закройте их и посмотрите, как рисует Gaka-Chu. Будьте внимательны к безопасности и всегда готовы нажать кнопку аварийной остановки.
Когда Gaka-Chu заканчивает свое искусство, вы можете отправить другой путь к изображению, и художник повторяет весь процесс.
