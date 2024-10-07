---
title: Налаштування Gaka-Chu та встановлення програмного забезпечення

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**У цій статті ми розглянемо кілька кроків встановлення та запуску для налаштування робот-художника. Вимоги:**
- KUKA KR6 R900 sixx з KRC4 та SmartPad;
- Intel NUC з [ROS melodic](http://wiki.ros.org/melodic/Installation/Ubuntu) встановленим;
- Стіл, фарба, пензель, вода.

## Встановлення програмного забезпечення на KRC4
Для обох, KRC4 та NUC, потрібний інтерфейс EKI. Детальна інформація про те, як його налаштувати на KRC4, наведена [тут](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Запустіть його на контролері робота.

## Встановлення програмного забезпечення на NUC
Створіть робоче середовище catkin:
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
Додайте команду source до файлу `.bashrc`:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
На цей момент ви повинні мати змогу запускати скрипти.. Якщо щось пішло не так, спробуйте [вирішити проблему](https://github.com/airalab/robot_painter/issues)

## Заповнення констант
По-перше, робот повинен знати місце та орієнтацію полотна, а також позицію банки з фарбою. Все це вказано в `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Давайте розглянемо це.
```
// Константи площини
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// Трансформація полотна
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
Це константи рівняння площини, які вказують позицію полотна в тривимірному просторі. Їх слід отримати під час калібрування, описаного нижче. Далі йде фарба.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Це координати банки з фарбою. Їх також можна вказати під час калібрування. Розмір полотна вказаний у
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

Увійдіть у режим 'AUT', увімкніть драйвери та запустіть скрипт `eki_hw_interface`

2) Запустіть інтерфейс EKI на NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Він повинен вивести безкінечні журнали.

3) Запустіть RViz
```
roзапустіть kuka_moveit_config demo.launch
```
Ви повинні побачити наступне:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz.png", alt:"KUKA in RViz"} %}{% endroboWikiPicture %}

Спробуйте перемістити кінцевий ефектор та натиснути 'Plan and Execute'. Робот повинен рухатися. На SmartPad перейдіть до **Display -> Actual position** та спостерігайте координати кінцевого ефектора. Покладіть полотно горизонтально до бази робота. Підключіть пензлик до тримача пензлика та обережно рухайте його, поки він ледве доторкається до полотна. На цій позиції збережіть координати кінцевого ефектора. Повторіть 12-15 разів. Також збережіть координати центру полотна та банки з фарбою.
Коли у вас є набір координат, скористайтеся [цими](https://github.com/nakata5321/Matlab_scripts_gaka-chu) скриптами Matlab, щоб вирішити відсутні константи та кватерніон. Вставте їх. Перебудуйте свій робочий простір за допомогою
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Тестування калібрування Gaka-Chu
Після калібрування Gaka-Chu потрібно протестувати, намалювавши межі полотна. Щоб він це зробив, виконайте кожен у новому терміналі:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Після цього ви повинні побачити контур полотна в RViz:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz_canvas.png", alt:"KUKA in RViz canvas"} %}{% endroboWikiPicture %}

У терміналі натисніть "S", щоб виконати тестування. Кінцевий ефектор робота повинен рухатися праворуч над межами полотна, а пензлик повинен ніжно доторкатися до полотна протягом усього руху. Якщо цього не відбувається, спробуйте перекалібрувати. Якщо модель полотна обернена неправильно, ви можете повернути її, змінивши кватерніон в Matlab.

## Створення мистецтва
Вам потрібно 6 основних модулів, щоб все працювало:
- Інтерфейс EKI;
- MOVEit + RViz;
- Трансляція середовища;
- Сервіс конвертації зображень;
- Модуль малювання траєкторій;
- Початковий тригер.

Давайте запустимо їх по черзі.

### Інтерфейс Eki
На KRC4 запустіть `eki_hw_interface`, на NУ новому терміналі виконайте:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz та MOVEit
Вам потрібен планувальник та симуляція. Запустіть їх за допомогою
```
roslaunch kuka_moveit_config demo.launch
```

### Середовище
Повідомте роботу, де знаходиться банка з фарбою та полотно. Зверніть увагу, що не потрібно запускати вузол `draw workspace`, `tf_broadcaster` передає розмір полотна. Просто це не відображається в RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Обробник зображень
Усі вхідні зображення потрібно обробити. Запустіть сервіс.
```
rosrun picture_preprocessing TextConverter.py
```
Коли він отримує виклик, він обробляє зображення з фільтром HP та створює файл rosbag з траєкторіями.

### Малюнок траєкторій
Основний скрипт тут - це сам малюнок траєкторій. Він чекає на зображення, викликає сервіс TextConverter та малює картину.
```
rosrun local_task_planner trajectory_drawing
```

## Надішліть роботу зображення для малювання
Робот слухає конкретний ROS-топік, де вам потрібно передати шлях до бажаного зображення. Зображення повинно бути квадратним (ширина дорівнює висоті) та складатися з ліній. Надішліть шлях:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Після цього відкриються два вікна, що показують контури та треки. Закрийте їх і подивіться, як Гака-Чу малює. Будьте обережні з безпекою та завжди будьте готові натиснути кнопку аварійної зупинки.
Коли Гака-Чу завершить своє мистецтво, ви можете надіслати інший шлях до зображення, і художник повторить весь процес.