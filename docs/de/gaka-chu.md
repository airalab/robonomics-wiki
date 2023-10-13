---
title: Gaka-Chu Einrichtung und Softwareinstallation

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**In diesem Artikel werden wir einige Installierenierenations- und Startschritte durchgehen, um einen Roboter-Maler einzurichten. Anforderungen:**
- KUKA KR6 R900 sixx mit KRC4 und einem SmartPad;
- Intel NUC mit [ROS melodic](http://wiki.ros.org/melodic/Installation/Ubuntu) installiert;
- Tisch, Farbe, Pinsel, Wasser.

## Softwareinstallation auf KRC4
EKI-Schnittstelle ist sowohl auf KRC4 als auch auf NUC erforderlich. Detaillierte Informationen zur Einrichtung auf KRC4 finden Sie [hier](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Starten Sie es auf dem Controller des Roboters.

## Softwareinstallation auf NUC
Erstellen Sie einen Catkin-Arbeitsbereich:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
Laden Sie ROS-Pakete herunter. Alle Skripte sind [hier](https://github.com/airalab/robot_painter/tree/test_branch) gespeichert. Klonen Sie das Repository:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
Sie benötigen möglicherweise einige Header-Dateien und Bibliotheken, um alles korrekt funktionieren zu lassen. Laden Sie sie herunter:
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
Fügen Sie den Quellbefehl zur Datei `.bashrc` hinzu:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
Bis jetzt sollten Sie in der Lage sein, die Skripte zu starten. Wenn etwas schief geht, versuchen Sie einige [Fehlerbehebung](https://github.com/airalab/robot_painter/issues)

## Ausfüllen von Konstanten
Zunächst muss der Roboter den Standort und die Ausrichtung der Leinwand sowie die Position der Farbdose kennen. All dies wird in `fake_painter_enviroment_tf/src/tf_broadcaster.cpp` angegeben. Schauen wir uns das an.
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
Dies sind die Konstanten der Ebenengleichung, die die Position der Leinwand im 3D-Raum angeben. Sie werden während eines Kalibrierungsprozesses ermittelt, der unten beschrieben wird. Als nächstes kommt die Farbe.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Dies sind die Koordinaten der Farbdose. Sie können auch während der Kalibrierung angegeben werden. Die Größe der Leinwand ist angegeben in
```
canvas.width = 0.5;
canvas.height = 0.4;
```
Einige weitere wichtige Konstanten sind in `local_task_planner/src/Drawing.cpp` gespeichert:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
Ihre Namen sagen alles, füllen Sie sie entsprechend der Situation aus.

## Kalibrierung von Gaka-Chu
Der Kalibrierungsprozess selbst ist ziemlich einfach.

1) Starten Sie die EKI-Schnittstelle auf dem KRC4:

Melden Sie sich im 'AUT'-Modus an, schalten Sie die Treiber ein und starten Sie das Skript `eki_hw_interface`

2) Starten Sie die EKI-Schnittstelle auf dem NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Es sollte endlose Protokolle ausgeben.

3) Starten Sie RViz
```
roslaunch kuka_moveit_config demo.launch
```
Sie sollten Folgendes sehen:

![KUKA in RViz](../images/kuka-real/kuka_rviz.png "KUKA in RViz")

Versuchen Sie, den Endeffektor zu bewegen und auf 'Planen und Ausführen' zu klicken. Der Roboter sollte sich bewegen. Gehen Sie auf dem SmartPad zu **Display -> Actual position** und beobachten Sie die Koordinaten des Endeffektors. Platzieren Sie eine Leinwand horizontal zur Roboterbasis. Stecken Sie einen Pinsel in den Pinselhalter und bewegen Sie ihn vorsichtig, bis er die Leinwand kaum berührt. Speichern Sie in dieser Position die Koordinaten des Endeffektors. Wiederholen Sie dies 12-15 Mal. Speichern Sie auch die Koordinaten des Leinwandzentrums und der Farbdose.
Wenn Sie eine Reihe von Koordinaten haben, verwenden Sie [diese](https://github.com/nakata5321/Matlab_scripts_gaka-chu) Matlab-Skripte, um die fehlenden Konstanten und Quaternionen zu berechnen. Fügen Sie sie ein. Erstellen Sie Ihren Arbeitsbereich neu mit
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Testen der Gaka-Chu-Kalibrierung
Wenn kalibriert, muss Gaka-Chu durch das Zeichnen der Grenzen der Leinwand getestet werden. Um dies zu tun, führen Sie jeweils in einem neuen Terminal aus:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Danach sollten Sie eine Leinwandkontur in RViz sehen:

![KUKA in RViz canvas](../images/kuka-real/kuka_rviz_canvas.png "KUKA in RViz canvas")

Drücken Sie in der Konsole "S", um den Test durchzuführen. Der Endeffektor des Roboters sollte sich direkt über den Grenzen der Leinwand bewegen und der Pinsel sollte die Leinwand während der gesamten Bewegung sanft berühren. Wenn dies nicht der Fall ist, versuchen Sie eine erneute Kalibrierung. Wenn das Leinwandmodell falsch gedreht ist, können Sie es durch Ändern des Quaternions in Matlab drehen.

## Kunst machen
Sie benötigen 6 grundlegende Module, um alles zum Laufen zu bringen:
- EKI-Schnittstelle;
- MOVEit + RViz;
- Umgebungsfelderübertragung;
- Bildkonverterdienst;
- Trajektorienzeichnungsmodul;
- Startauslöser.

Lassen Sie uns sie nacheinander starten.

### Eki-Schnittstelle
Starten Sie auf KRC4 `eki_hw_interface`, auf NUC in einem neuen Terminal:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz und MOVEit
Sie benötigen einen Planer und eine Simulation. Starten Sie sie mit
```
roslaunch kuka_moveit_config demo.launch
```

### Umgebung
Sagen Sie dem Roboter, wo sich die Farbdose und die Leinwand befinden. Beachten Sie, dass es nicht notwendig ist, den Knoten `draw workspace` zu starten, der `tf_broadcaster` teilt die Größe der Leinwand mit. Es zeigt es nur nicht in RViz an.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Bilderprozessor
Alle eingehenden Bilder müssen verarbeitet werden. Starten Sie den Dienst.
```
rosrun picture_preprocessing TextConverter.py
```
Wenn es den Anruf erhält, verarbeitet es ein Bild mit einem HP-Filter und erstellt eine rosbag-Datei mit Trajektorien.

### Trajektorien-Zeichner
Das Hauptskript hier ist der Trajektorien-Zeichner selbst. Es wartet auf das Bild, ruft den TextConverter-Service auf und zeichnet das Gemälde.
```
rosrun local_task_planner trajectory_drawing
```

## Schicken Sie dem Roboter ein Bild zum Zeichnen
Der Roboter hört auf ein bestimmtes ROS-Thema, in dem Sie den Pfad zu einem gewünschten Bild übergeben müssen. Das Bild sollte quadratisch sein (Breite entspricht Höhe) und aus Linien bestehen. Senden Sie den Pfad:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Danach öffnen sich zwei Fenster, die die Konturen und die Spuren zeigen. Schließen Sie sie und sehen Sie Gaka-Chu beim Zeichnen zu. Achten Sie auf Sicherheit und seien Sie immer bereit, den Not-Aus-Knopf zu drücken.
Wenn Gaka-Chu seine Kunst beendet hat, können Sie einen anderen Pfad zum Bild senden und der Maler wiederholt den gesamten Prozess.
