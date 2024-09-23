---
title: Gaka-Chu Einrichtung und Softwareinstallation

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**In diesem Artikel werden wir einige Installationsschritte durchgehen, um einen Roboter-Maler einzurichten. Anforderungen:**
- KUKA KR6 R900 sixx mit KRC4 und einem SmartPad;
- Intel NUC mit [ROS Melodic](http://wiki.ros.org/melodic/Installation/Ubuntu) installiert;
- Tisch, Farbe, Pinsel, Wasser.

## Softwareinstallation auf KRC4
Die EKI-Schnittstelle ist sowohl auf KRC4 als auch auf NUC erforderlich. Detaillierte Informationen zur Einrichtung auf KRC4 finden Sie [hier](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Starten Sie sie auf dem Controller des Roboters.

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
Möglicherweise benötigen Sie einige Header-Dateien und Bibliotheken, um alles korrekt funktionieren zu lassen. Laden Sie sie herunter:
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
Fügen Sie den Befehl `source` zur Datei `.bashrc` hinzu:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
Bis jetzt sollten Sie in der Lage sein, die Skripte zu starten.. Wenn etwas schief geht, versuchen Sie einige [Fehlerbehebung](https://github.com/airalab/robot_painter/issues)

## Ausfüllen von Konstanten
Zunächst muss der Roboter den Standort und die Ausrichtung der Leinwand sowie die Position der Farbdose kennen. All dies ist in `fake_painter_enviroment_tf/src/tf_broadcaster.cpp` festgelegt. Schauen wir uns das genauer an.
```
// Ebenenkonstanten
const double A = -0,0641;
const double B = 0,0214;
const double C = 0,9977;
const double D = -0,2198;

// Leinwandtransform
const double px = 0,52;
const double py = -0,24;
const double qx = -0,011;
const double qy = -0,032;
const double qz = 0,0;
const double qw = 0,999;
```
Dies sind die Ebenengleichungskonstanten, die die Position der Leinwand im 3-D-Raum festlegen. Sie werden während eines unten beschriebenen Kalibrierungsprozesses erhalten. Als Nächstes kommt die Farbe.
```
colorTransform.transform.translation.x = 0,5;
colorTransform.transform.translation.y = 0,2;
colorTransform.transform.translation.z = 0,258;
```
Dies sind die Koordinaten der Farbdose. Sie können auch während der Kalibrierung festgelegt werden. Die Größe der Leinwand ist festgelegt in
```
canvas.width = 0,5;
canvas.height = 0,4;
```
Mehrere weitere wichtige Konstanten sind in `local_task_planner/src/Drawing.cpp` gespeichert:
```
const double COLOR_BOTLE_HEIGHT = 0,06;
const double COLOR_HEIGHT = 0,045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0,02;
const double BRUSH_HEIGHT = 0,01;
const double BRUSH_WIDTH = 0,01;
```
Ihre Namen sagen alles, also füllen Sie sie entsprechend der Situation aus.

## Kalibrieren von Gaka-Chu
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

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz.png", alt:"KUKA in RViz"} %}{% endroboWikiPicture %}

Versuchen Sie, den Endeffektor zu bewegen und auf 'Plan and Execute' zu klicken. Der Roboter sollte sich bewegen. Gehen Sie auf dem SmartPad zu **Display -> Aktuelle Position** und beobachten Sie die Koordinaten des Endeffektors. Platzieren Sie eine Leinwand horizontal zur Roboterbasis. Stecken Sie einen Pinsel in den Pinselhalter und bewegen Sie ihn vorsichtig, bis er die Leinwand kaum berührt. An dieser Position speichern Sie die Koordinaten des Endeffektors. Wiederholen Sie dies 12-15 Mal. Speichern Sie auch die Koordinaten des Leinwandzentrums und der Farbdose.
Wenn Sie einen Satz von Koordinaten haben, verwenden Sie [diese](https://github.com/nakata5321/Matlab_scripts_gaka-chu) Matlab-Skripte, um die fehlenden Konstanten und Quaternionen zu berechnen. Fügen Sie sie ein. Bauen Sie Ihren Arbeitsbereich neu auf mit
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Testen der Gaka-Chu-Kalibrierung
Wenn kalibriert, muss Gaka-Chu getestet werden, indem die Grenzen der Leinwand gezeichnet werden. Führen Sie dazu jeweils in einem neuen Terminal aus:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Danach sollten Sie eine Leinwandkontur in RViz sehen:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz_canvas.png", alt:"KUKA in RViz canvas"} %}{% endroboWikiPicture %}

Drücken Sie im Terminal "S", um den Test durchzuführen. Der Endeffektor des Roboters sollte direkt über den Grenzen der Leinwand bewegt werden und der Pinsel sollte die Leinwand während der gesamten Bewegung sanft berühren. Wenn dies nicht der Fall ist, versuchen Sie eine Neukalibrierung. Wenn das Leinwandmodell falsch gedreht ist, können Sie es durch Ändern des Quaternion in Matlab drehen.

## Kunst machen
Sie benötigen 6 Grundmodule, um alles zum Laufen zu bringen:
- EKI-Schnittstelle;
- MOVEit + RViz;
- Umgebungsrahmenübertragung;
- Bildkonvertierungsdienst;
- Trajektorienzeichnungsmodul;
- Startauslöser.

Lassen Sie uns sie nacheinander starten.

### Eki-Schnittstelle
Auf KRC4 starten Sie `eki_hw_interface`, auf NIn einem neuen Terminal führen Sie aus:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz und MOVEit
Sie benötigen einen Planer und eine Simulation. Starten Sie sie mit
```
roslaunch kuka_moveit_config demo.launch
```

### Umgebung
Sagen Sie dem Roboter, wo sich die Farbdose und die Leinwand befinden. Beachten Sie, dass es nicht erforderlich ist, den `draw workspace`-Knoten zu starten, der `tf_broadcaster` teilt die Größe der Leinwand mit. Es wird einfach nicht in RViz angezeigt.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Bildverarbeitung
Alle eingehenden Bilder müssen verarbeitet werden. Starten Sie den Service.
```
rosrun picture_preprocessing TextConverter.py
```
Wenn er den Aufruf erhält, verarbeitet er ein Bild mit einem HP-Filter und erstellt eine rosbag-Datei mit Trajektorien.

### Trajektorienzeichner
Das wichtigste Skript hier ist der Trajektorienzeichner selbst. Er wartet auf das Bild, ruft den TextConverter-Service auf und zeichnet das Gemälde.
```
rosrun local_task_planner trajectory_drawing
```

## Senden Sie dem Roboter ein Bild zum Zeichnen
Der Roboter hört auf ein bestimmtes ROS-Thema, in dem Sie den Pfad zu einem gewünschten Bild übergeben müssen. Das Bild sollte quadratisch sein (Breite entspricht der Höhe) und aus Linien bestehen. Senden Sie den Pfad:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Danach erscheinen zwei Fenster, die die Konturen und die Spuren zeigen. Schließen Sie sie und sehen Sie Gaka-Chu beim Zeichnen zu. Achten Sie auf Sicherheit und seien Sie immer bereit, die Not-Aus-Taste zu drücken.
Wenn Gaka-Chu sein Kunstwerk beendet hat, können Sie einen anderen Bildpfad senden, und der Maler wiederholt den gesamten Prozess.