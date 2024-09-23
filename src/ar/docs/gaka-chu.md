---
title: إعداد Gaka-Chu وتثبيت البرنامج

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**في هذا المقال سنقوم بشرح بعض خطوات التثبيت والتشغيل لإعداد روبوت رسام. المتطلبات:**
- KUKA KR6 R900 sixx مع KRC4 و SmartPad؛
- Intel NUC مع [ROS melodic](http://wiki.ros.org/melodic/Installation/Ubuntu) مثبت؛
- طاولة، طلاء، فرشاة، ماء.

## تثبيت البرنامج على KRC4
يتطلب واجهة EKI على كل من KRC4 و NUC. يتم تقديم معلومات مفصلة حول كيفية إعدادها على KRC4 [هنا](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). قم بتشغيلها على تحكم الروبوت.

## تثبيت البرنامج على NUC
إنشاء مساحة عمل catkin:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
قم بتنزيل حزم ROS. يتم تخزين جميع النصوص [هنا](https://github.com/airalab/robot_painter/tree/test_branch). استنسخ المستودع:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
قد تحتاج إلى بعض ملفات الرأس والمكتبات لجعل كل شيء يعمل بشكل صحيح. قم بتنزيلها:
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
أضف أمر المصدر إلى ملف `.bashrc`:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
حتى الآن، يجب أن تكون قادرًا على تشغيل النصوص.. إذا حدث خطأ، جرب بعض [إجراءات الاستكشاف والإصلاح](https://github.com/airalab/robot_painter/issues)

## ملء الثوابت
أولاً، يحتاج الروبوت إلى معرفة موقع واتجاه القماش وكذلك موقع علبة الدهان. يتم تحديد كل هذا في `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. دعنا نلقي نظرة عليه.
```
// ثوابت السطح
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// تحويل القماش
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
هذه هي ثوابت معادلة السطح التي تحدد موقع القماش في الفضاء ثلاثي الأبعاد. يجب الحصول عليها أثناء عملية المعايرة الموضحة أدناه. بعد ذلك يأتي الدهان.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
هذه هي إحداثيات علبة الدهان. يمكن أيضًا تحديدها أثناء عملية المعايرة. يتم تحديد حجم القماش في
```
canvas.width = 0.5;
canvas.height = 0.4;
```
تُخزن العديد من الثوابت الهامة الأخرى في `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
أسماؤها توضح كل شيء، لذا قم بملئها وفقًا للوضع.

## معايرة Gaka-Chu
عملية المعايرة نفسها بسيطة جدًا.

1) قم بتشغيل واجهة EKI على KRC4:

قم بتسجيل الدخول في وضع 'AUT'، وقم بتشغيل السائقين وتشغيل النص البرمجي `eki_hw_interface`

2) قم بتشغيل واجهة EKI على NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
يجب أن يخرج سجلات لا نهاية لها.

3) قم بتشغيل RViz
```
roشغّل أمر `kuka_moveit_config demo.launch`

سترى ما يلي:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz.png", alt:"KUKA in RViz"} %}{% endroboWikiPicture %}

حاول تحريك نهاية العمل وانقر على 'تخطيط وتنفيذ'. يجب أن يتحرك الروبوت. اذهب إلى **Display -> Actual position** على SmartPad ولاحظ إحداثيات نهاية العمل. ضع قماشًا أفقيًا بجوار قاعدة الروبوت. قم بتوصيل فرشاة بحامل الفرشاة وانقلها بحذر حتى تلامس القماش بشكل طفيف. في هذا الموضع، احفظ إحداثيات نهاية العمل. كرر هذا 12-15 مرة. كما، احفظ إحداثيات مركز القماش وعلبة الطلاء.
عندما تحصل على مجموعة من الإحداثيات، استخدم [هذه](https://github.com/nakata5321/Matlab_scripts_gaka-chu) النصوص في Matlab لحساب الثوابت المفقودة والرباعيات. ألصقها. أعد بناء مساحة العمل الخاصة بك بالأمر
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## اختبار معايرة Gaka-Chu
عندما تتم المعايرة، يجب اختبار Gaka-Chu عن طريق رسم حدود القماش. لجعله يقوم بذلك، قم بتنفيذ كل من الأوامر التالية في نافذة الطرفية الجديدة:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
بعد ذلك، يجب أن ترى حدود قماش في RViz:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz_canvas.png", alt:"KUKA in RViz canvas"} %}{% endroboWikiPicture %}

في الطرفية، اضغط على "S" لإجراء الاختبار. يجب أن تتحرك نهاية العمل للروبوت مباشرة فوق حدود القماش ويجب أن تلامس الفرشاة القماش بلطف خلال الحركة بأكملها. إذا لم يحدث ذلك، جرب إعادة المعايرة. إذا كانت نموذج القماش مدارًا بشكل خاطئ، يمكنك تدويره عن طريق تغيير الرباعيات في Matlab.

## إنشاء فن
تحتاج إلى 6 وحدات أساسية لجعل كل شيء يعمل:
- واجهة EKI؛
- MOVEit + RViz؛
- بث إطارات البيئة؛
- خدمة تحويل الصور؛
- وحدة رسم المسارات؛
- مشغل البدء.

دعنا نشغلها واحدة تلو الأخرى.

### واجهة Eki
على KRC4، قم بتشغيل `eki_hw_interface`، على Nفي نافذة الطرفية الجديدة، قم بالتالي:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz وMOVEit
تحتاج إلى مخطط ومحاكاة. قم بتشغيلهما باستخدام الأمر التالي:
```
roslaunch kuka_moveit_config demo.launch
```

### البيئة
أخبر الروبوت بمكان علبة الدهان والقماش. لاحظ أنه ليس من الضروري تشغيل `draw workspace` node، حيث يشارك `tf_broadcaster` حجم القماش. لكنه لا يعرضه في RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### معالج الصور
جميع الصور الواردة يجب معالجتها. قم بتشغيل الخدمة.
```
rosrun picture_preprocessing TextConverter.py
```
عند استلامها، يقوم بمعالجة الصورة بفلتر HP وإنشاء ملف rosbag بالمسارات.

### رسام المسارات
البرنامج الرئيسي هنا هو رسام المسارات نفسه. ينتظر الصورة، يستدعي خدمة TextConverter ويقوم برسم اللوحة.
```
rosrun local_task_planner trajectory_drawing
```

## إرسال صورة للروبوت لرسمها
الروبوت يستمع إلى موضوع ROS محدد حيث تحتاج إلى تمرير مسار الصورة المرغوبة. يجب أن تكون الصورة مربعة (العرض يساوي الارتفاع) ومصنوعة من خطوط. أرسل المسار:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
بعد ذلك، ستظهر نافذتان تظهران الحدود والمسارات. أغلقهما وانتظر رسم Gaka-Chu. كن حذرًا من السلامة وكن دائمًا على استعداد للضغط على زر التوقف الطارئ.
عندما ينتهي Gaka-Chu من فنه، يمكنك إرسال مسار آخر للصورة ويكرر الرسام العملية بأكملها.