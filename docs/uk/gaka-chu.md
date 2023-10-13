---
title: Встановлення та встановлення програмного забезпечення Gaka-Chu

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**У цій статті ми розглянемо кілька кроків встановлення та запуску для налаштування робота-художника. Вимоги:**
- KUKA KR6 R900 sixx з KRC4 та SmartPad;
- Intel NUC з встановленою [ROS melodic](http://wiki.ros.org/melodic/Встановитиation/Ubuntu);
- Стіл, фарба, пензель, вода.

## Встановлення програмного забезпечення на KRC4
Для цього потрібний інтерфейс EKI як на KRC4, так і на NUC. Детальна інформація про те, як його налаштувати на KRC4, наведена [тут](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Запустіть його на контролері робота.

## Встановлення програмного забезпечення на NUC
Створіть робочий простір catkin:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
Завантажте пакети ROS. Усі скрипти зберігаються [тут](https://github.com/airalab/robot_painter/tree/test_branch). Клонуйте репозиторій:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
Можливо, вам знадобляться деякі заголовкові файли та бібліотеки, щоб все працювало правильно. Завантажте їх:
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
Додайте команду джерела до файлу `.bashrc`:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
Наразі ви повинні мати могу запускати скрипти. Якщо щось піде не так, спробуйте вирішити деякі [проблеми](https://github.com/airalab/robot_painter/issues)

## Заповнення констант
По-перше, роботу потрібно знати місцезнаходження та орієнтацію полотна, а також позицію бляшанки з фарбою. Все це вказано в `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Давайте подивимося на це.
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
Це константи рівняння площини, які вказують положення полотна в 3D-просторі. Вони мають бути отримані під час процесу калібрування, описаного нижче. Далі йде фарба.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Це координати бляшанки з фарбою. Вони також можуть бути вказані під час калібрування. Розмір полотна вказується в
```
canvas.width = 0.5;
canvas.height = 0.4;
```
Кілька важливих констант зберігаються в `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
Їх назви говорять самі за себе, тому заповніть їх відповідно до ситуації.

## Калібрування Gaka-Chu
Сам процес калібрування досить простий.

1) Запустіть інтерфейс EKI на KRC4:

Увійдіть в режим 'AUT', увімкніть драйвери та запустіть скрипт `eki_hw_interface`

2) Запустіть інтерфейс EKI на NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Він повинен виводити безкінечні журнали.

3) Запустіть RViz
```
roslaunch kuka_moveit_config demo.launch
```
Ви повинні побачити наступне:

![KUKA in RViz](../images/kuka-real/kuka_rviz.png "KUKA in RViz")

Спробуйте перемістити кінцевий ефектор та натиснути 'Plan and Execute'. Робот повинен рухатися. На SmartPad перейдіть до **Display -> Actual position** та спостерігайте координати кінцевого ефектора. Покладіть полотно горизонтально до основи робота. Увімкніть пензель у тримач пензля та обережно перемістіть його, поки він ледь торкається полотна. У цьому положенні збережіть координати кінцевого ефектора. Повторіть це 12-15 разів. Також збережіть координати центру полотна та бляшанки з фрбою.
Коли у вас є набір координат, використовуйте [ці](https://github.com/nakata5321/Matlab_scripts_gaka-chu) скрипти Matlab, щоб вирішити відсутні константи та кватерніон. Вставте їх. Перебудуйте свій робочий простір з
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Тестування калібрування Gaka-Chu
Після калібрування Gaka-Chu потрібно протестувати, намалювавши межі полотна. Щоб це зробити, виконайте кожен з них в новому терміналі:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Після цього ви повинні побачити контур полотна в RViz:

![KUKA in RViz canvas](../images/kuka-real/kuka_rviz_canvas.png "KUKA in RViz canvas")

У терміналі натисніть "S", щоб виконати тестування. Кінцевий ефектор робота повинен рухатися праворуч над межами полотна, а пензель повинен м'яко торкатися полотна протягом усього руху. Якщо цього не відбувається, спробуйте повторно калібрувати. Якщо модель полотна обертається неправильно, ви можете обернути її, змінивши кватрніон в Matlab.

## Створення мистецтва
Для того, щоб все працювало, вам потрібно 6 основних модулів:
- Інтерфейс EKI;
- MOVEit + RViz;
- Трансляція середовища кадрів;
- Сервіс конвертації зображень;
- Модуль малювання траєкторій;
- Початковий тригер.

Давайте запустимо їх по одному.

### Інтерфейс Eki
На KRC4 запустіть `eki_hw_interface`, на NUC у новому терміналі виконайте:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz та MOVEit
Вам потрібен планувальник та симуляція. Запустіть їх з
```
roslaunch kuka_moveit_config demo.launch
```

### Середовище
Скажіть роботу, де знаходяться бляшанка з фарбою та полотно. Зверніть увагу, що не обов'язково запускати вузол `draw workspace`, `tf_broadcaster` ділиться розміром полотна. Він просто не показує його в RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Обробник зображень
Всі вхідні зображення потрібно обробляти. Запустіть сервіс.
```
rosrun picture_preprocessing TextConverter.py
```
Коли він отримує виклик, він обробляє зображення з фільтром HP і створює файл rosbag з траєкторіями.

### Траєкторії малюнка
Основний скрипт тут - сам малюнок траєкторій. Він чекає на зобаження, викликає сервіс TextConverter та малює картину.
```
rosrun local_task_planner trajectory_drawing
```

## Надішліть роботу зображення для малювання
Робот слухає конкретну ROS-тему, де вам потрібно передати шлях до бажаного зображення. Зображення повинно бути квадратним (ширина дорівнює висоті) і складатися з ліній. Надішліть шлях:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Після цього з'являються два вікна, на яких показані контури та треки. Закрийте їх і подивіться, як Гака-Чу малює. Будьте обережні і завжди будьте готові натиснути кнопку аварійної зупинки.
Коли Гака-Чу закінчує своє мистецтво, ви можете надіслати інший шлях до зображення, і художник повторює весь процес.
