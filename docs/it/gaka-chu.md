---
title: Configurazione e installazione del software Gaka-Chu

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**In questo articolo passeremo attraverso alcuni passaggi di installazione e avvio per configurare un robot pittore. Requisiti:**
- KUKA KR6 R900 sixx con KRC4 e SmartPad;
- Intel NUC con [ROS melodic](http://wiki.ros.org/melodic/Installaation/Ubuntu) installato;
- Tavolo, vernice, pennello, acqua.

## Installazione del software su KRC4
È necessaria l'interfaccia EKI sia su KRC4 che su NUC. Le informazioni dettagliate su come configurarla su KRC4 sono presentate [qui](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Avviala sul controller del robot.

## Installazione del software su NUC
Crea uno spazio di lavoro catkin:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
Scarica i pacchetti ROS. Tutti gli script sono archiviati [qui](https://github.com/airalab/robot_painter/tree/test_branch). Clona il repository:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
Potrebbe essere necessario scaricare alcuni file di intestazione e librerie per far funzionare tutto correttamente. Scaricali:
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
Aggiungi il comando di origine al file `.bashrc`:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
Finora dovresti essere in grado di avviare gli script. Se qualcosa va storto, prova a risolvere alcuni [problemi](https://github.com/airalab/robot_painter/issues)

## Compilazione delle costanti
Innanzitutto, il robot deve conoscere la posizione e l'orientamento della tela e la posizione del barattolo di vernice. Tutto ciò è specificato in `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Diamo un'occhiata.
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
Queste sono le costanti dell'equazione del piano che specificano la posizione della tela nello spazio tridimensionale. Devono essere ottenute durante un processo di calibrazione descritto di seguito. Successivamente viene la vernice.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Queste sono le coordinate del barattolo di vernice. Possono anche essere specificate durante la calibrazione. Le dimensioni della tela sono specificate in
```
canvas.width = 0.5;
canvas.height = 0.4;
```
Altre costanti importanti sono archiviate in `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
I loro nomi dicono tutto, quindi compilali in base alla situazione.

## Calibrazione di Gaka-Chu
Il processo di calibrazione stesso è piuttosto semplice.

1) Avvia l'interfaccia EKI su KRC4:

Accedi in modalità 'AUT', accendi i driver e avvia lo script `eki_hw_interface`

2) Avvia l'interfaccia EKI su NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Dovrebbe produrre log infiniti.

3) Avvia RViz
```
roslaunch kuka_moveit_config demo.launch
```
Dovresti vedere quanto segue:

![KUKA in RViz](../images/kuka-real/kuka_rviz.png "KUKA in RViz")

Prova a muovere l'effettore terminale e fare clic su 'Pianifica ed esegui'. Il robot dovrebbe muoversi. Sul SmartPad vai su **Visualizza -> Posizione effettiva** e osserva le coordinate dell'effettore terminale. Posiziona una tela in posizione orizzontale rispetto alla base del robot. Inserisci un pennello nel supporto del pennello e spostalo delicatamente fino a quando tocca appena la tela. In questa posizione, salva le coordinate dell'effettore terminale. Ripeti 12-15 volte. Salva anche le coordinate del centro della tela e del barattolo di vernice.
Quando hai un insieme di coordinate, utilizza [questi](https://github.com/nakata5321/Matlab_scripts_gaka-chu) script Matlab per risolvere le costanti e il quaternione mancanti. Incollali. Ricostruisci il tuo spazio di lavoro con
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Test della calibrazione di Gaka-Chu
Quando è calibrato, Gaka-Chu deve essere testato disegnando i bordi della tela. Per farlo, esegui ognuno in un nuovo terminale:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Dopo questo, dovresti vedere un contorno della tela in RViz:

![KUKA in RViz canvas](../images/kuka-real/kuka_rviz_canvas.png "KUKA in RViz canvas")

Nel terminale premi "S" per eseguire il test. L'effettore terminale del robot dovrebbe muoversi proprio sopra i bordi della tela e il pennello dovrebbe toccare delicatamente la tela durante tutto il movimento. Se non è così, prova a ricalibrare. Se il modello della tela è ruotato in modo errato, puoi ruotarlo cambiando il quaternione in Matlab.

## Creazione di arte
Hai bisogno di 6 moduli di base per far funzionare tutto:
- Interfaccia EKI;
- MOVEit + RViz;
- Trasmissione dei frame dell'ambiente;
- Servizio di conversione delle immagini;
- Modulo di disegno delle traiettorie;
- Trigger di avvio.

Lanciamoli uno per uno.

### Interfaccia Eki
Su KRC4 avvia `eki_hw_interface`, su NUC in un nuovo terminale fai:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz e MOVEit
Hai bisogno di un pianificatore e di una simulazione. Avviali con
```
roslaunch kuka_moveit_config demo.launch
```

### Ambiente
Indica al robot dove si trovano il barattolo di vernice e la tela. Nota che non è necessario avviare il nodo `draw workspace`, il `tf_broadcaster` condivide le dimensioni della tela. Non le mostra solo in RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Processore di immagini
Tutte le immagini in ingresso devono essere elaborate. Avvia il servizio.
```
rosrun picture_preprocessing TextConverter.py
```
Quando riceve la chiamata, elabora un'immagine con un filtro HP e crea un file rosbag con le traiettorie.

### Disegnatore di traiettorie
Lo script principale qui è il disegnatore di traiettorie stesso. Aspetta l'immagine, chiama il servizio TextConverter e disegna il dipinto.
```
rosrun local_task_planner trajectory_drawing
```

## Invia al robot un'immagine da disegnare
Il robot ascolta un ROS-topic specifico dove devi passare il percorso di un'immagine desiderata. L'immagine dovrebbe essere quadrata (larghezza uguale altezza) e composta da linee. Invia il percorso:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Dopo di che, due finestre si aprono mostrando i contorni e le tracce. Chiudile e guarda Gaka-Chu disegnare. Stai attento alla sicurezza e sii sempre pronto a premere il pulsante di arresto di emergenza.
Quando Gaka-Chu finisce la sua arte, puoi inviare un altro percorso per l'immagine e il pittore ripete l'intero processo.
