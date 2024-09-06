---
title: Configuration et installation du logiciel Gaka-Chu

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**Dans cet article, nous passerons en revue quelques étapes d'installation et de lancement pour configurer un robot-peintre. Exigences :**
- KUKA KR6 R900 sixx avec KRC4 et un SmartPad ;
- Intel NUC avec [ROS mélodique](http://wiki.ros.org/melodic/Installation/Ubuntu) installé ;
- Table, peinture, pinceau, eau.

## Installation du logiciel sur KRC4
L'interface EKI est requise à la fois sur le KRC4 et le NUC. Des informations détaillées sur la façon de le configurer sur le KRC4 sont présentées [ici](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Lancez-le sur le contrôleur du robot.

## Installation du logiciel sur le NUC
Créez un espace de travail catkin :
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
Téléchargez les packages ROS. Tous les scripts sont stockés [ici](https://github.com/airalab/robot_painter/tree/test_branch). Clonez le dépôt :
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
Vous pourriez avoir besoin de certains fichiers d'en-tête et bibliothèques pour que tout fonctionne correctement. Téléchargez-les :
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
Ajoutez la commande source au fichier `.bashrc` :
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
À ce stade, vous devriez être en mesure de lancer les scripts.. Si quelque chose ne va pas, essayez quelques [solutions de dépannage](https://github.com/airalab/robot_painter/issues)

## Remplir les constantes
Tout d'abord, le robot doit connaître l'emplacement et l'orientation de la toile ainsi que la position de la boîte de peinture. Tout cela est spécifié dans `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Jetons-y un coup d'œil.
```
// Constantes du plan
const double A = -0,0641;
const double B = 0,0214;
const double C = 0,9977;
const double D = -0,2198;

// Transformation de la toile
const double px = 0,52;
const double py = -0,24;
const double qx = -0,011;
const double qy = -0,032;
const double qz = 0,0;
const double qw = 0,999;
```
Ce sont les constantes de l'équation du plan qui spécifient la position de la toile dans l'espace en 3D. Elles doivent être obtenues lors d'un processus de calibration décrit ci-dessous. Ensuite, passons à la peinture.
```
colorTransform.transform.translation.x = 0,5;
colorTransform.transform.translation.y = 0,2;
colorTransform.transform.translation.z = 0,258;
```
Ce sont les coordonnées de la boîte de peinture. Elles peuvent également être spécifiées lors de la calibration. La taille de la toile est spécifiée dans
```
canvas.width = 0,5;
canvas.height = 0,4;
```
Plusieurs autres constantes importantes sont stockées dans `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0,06;
const double COLOR_HEIGHT = 0,045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0,02;
const double BRUSH_HEIGHT = 0,01;
const double BRUSH_WIDTH = 0,01;
```
Leurs noms en disent long, alors remplissez-les en fonction de la situation.

## Calibration de Gaka-Chu
Le processus de calibration en lui-même est assez simple.

1) Démarrez l'interface EKI sur le KRC4 :

Connectez-vous en mode 'AUT', activez les pilotes et lancez le script `eki_hw_interface`

2) Démarrez l'interface EKI sur le NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Il devrait produire des journaux sans fin.

3) Démarrez RViz
```
roslaunch kuka_moveit_config demo.launch
```
Vous devriez voir ce qui suit :

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz.png", alt:"KUKA in RViz"} %}{% endroboWikiPicture %}

Essayez de déplacer l'effecteur final et cliquez sur 'Plan and Execute'. Le robot devrait bouger. Sur SmartPad, allez à **Display -> Actual position** et observez les coordonnées de l'effecteur final. Placez une toile horizontalement à la base du robot. Branchez un pinceau dans le support de pinceau et déplacez-le soigneusement jusqu'à ce qu'il touche à peine la toile. À cette position, enregistrez les coordonnées de l'effecteur final. Répétez 12 à 15 fois. Enregistrez également les coordonnées du centre de la toile et de la boîte de peinture.
Lorsque vous avez un ensemble de coordonnées, utilisez [ces](https://github.com/nakata5321/Matlab_scripts_gaka-chu) scripts Matlab pour résoudre les constantes manquantes et le quaternion. Collez-les. Reconstruisez votre espace de travail avec
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Test de l'étalonnage de Gaka-Chu
Une fois étalonné, Gaka-Chu doit être testé en dessinant les bords de la toile. Pour le faire, exécutez chacune des commandes dans un nouveau terminal :
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Après cela, vous devriez voir un contour de toile dans RViz :

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz_canvas.png", alt:"KUKA in RViz canvas"} %}{% endroboWikiPicture %}

Dans le terminal, appuyez sur "S" pour effectuer le test. L'effecteur final du robot devrait se déplacer juste au-dessus des bords de la toile et le pinceau devrait toucher doucement la toile pendant tout le mouvement. Si ce n'est pas le cas, essayez de recalibrer. Si le modèle de la toile est mal orienté, vous pouvez le faire pivoter en changeant le quaternion dans Matlab.

## Création artistique
Vous avez besoin de 6 modules de base pour que tout fonctionne :
- Interface EKI ;
- MOVEit + RViz ;
- Diffusion des cadres environnementaux ;
- Service de conversion d'image ;
- Module de dessin de trajectoires ;
- Déclencheur de démarrage.

Lançons-les un par un.

### Interface Eki
Sur KRC4, lancez `eki_hw_interface`, sur NDans un nouveau terminal, exécutez :
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz et MOVEit
Vous avez besoin d'un planificateur et d'une simulation. Lancez-les avec :
```
roslaunch kuka_moveit_config demo.launch
```

### Environnement
Indiquez au robot où se trouvent la boîte de peinture et la toile. Notez qu'il n'est pas nécessaire de lancer le nœud `draw workspace`, le `tf_broadcaster` partage la taille de la toile. Il ne l'affiche simplement pas dans RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Processeur d'images
Toutes les images entrantes doivent être traitées. Lancez le service.
```
rosrun picture_preprocessing TextConverter.py
```
Lorsqu'il reçoit l'appel, il traite une image avec un filtre HP et crée un fichier rosbag avec des trajectoires.

### Traceur de trajectoires
Le script principal ici est le traceur de trajectoires lui-même. Il attend l'image, appelle le service TextConverter et dessine la peinture.
```
rosrun local_task_planner trajectory_drawing
```

## Envoyez au robot une image à dessiner
Le robot écoute un sujet ROS spécifique où vous devez transmettre le chemin d'une image souhaitée. L'image doit être carrée (largeur égale à la hauteur) et composée de lignes. Envoyez le chemin :
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Après cela, deux fenêtres s'ouvrent montrant les contours et les pistes. Fermez-les et regardez Gaka-Chu dessiner. Faites attention à la sécurité et soyez toujours prêt à appuyer sur le bouton d'arrêt d'urgence.
Lorsque Gaka-Chu termine son œuvre, vous pouvez envoyer un autre chemin vers une image et le peintre répète tout le processus.