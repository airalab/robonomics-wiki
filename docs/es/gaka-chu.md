---
title: Configuración e instalación de software de Gaka-Chu

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**En este artículo repasaremos algunos pasos de instalación y lanzamiento para configurar un robot pintor. Requisitos:**
- KUKA KR6 R900 sixx con KRC4 y un SmartPad;
- Intel NUC con [ROS melodic](http://wiki.ros.org/melodic/Instalaration/Ubuntu) instalado;
- Mesa, pintura, pincel, agua.

## Instalación de software en KRC4
Se requiere la interfaz EKI tanto en KRC4 como en NUC. Se presenta información detallada sobre cómo configurarlo en KRC4 [aquí](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Lanzarlo en el controlador del robot.

## Instalación de software en NUC
Crear un espacio de trabajo de catkin:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
Descargar paquetes de ROS. Todos los scripts se almacenan [aquí](https://github.com/airalab/robot_painter/tree/test_branch). Clonar el repositorio:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
Es posible que necesite algunos archivos de encabezado y bibliotecas para que todo funcione correctamente. Descárguelos:
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
Agregar el comando de origen al archivo `.bashrc`:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
Hasta ahora, debería poder lanzar los scripts. Si algo sale mal, intente algunas [soluciones](https://github.com/airalab/robot_painter/issues)

## Rellenando constantes
En primer lugar, el robot necesita conocer la ubicación y orientación del lienzo, así como la posición del bote de pintura. Todo esto se especifica en `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Echemos un vistazo.
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
Estas son las constantes de la ecuación del plano que especifican la posición del lienzo en el espacio tridimensional. Se deben obtener durante un proceso de calibración que se describe a continuación. A continuación, viene la pintura.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Estas son las coordenadas del bote de pintura. También se pueden especificar durante la calibración. El tamaño del lienzo se especifica en
```
canvas.width = 0.5;
canvas.height = 0.4;
```
Varias constantes importantes más se almacenan en `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
Sus nombres lo dicen todo, así que complételos según la situación.

## Calibrando Gaka-Chu
El proceso de calibración en sí es bastante simple.

1) Inicie la interfaz EKI en el KRC4:

Inicie sesión en el modo 'AUT', encienda los controladores y ejecute el script `eki_hw_interface`

2) Inicie la interfaz EKI en el NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Debería mostrar registros infinitos.

3) Inicie RViz
```
roslaunch kuka_moveit_config demo.launch
```
Debería ver lo siguiente:

![KUKA in RViz](../images/kuka-real/kuka_rviz.png "KUKA in RViz")

Intente mover el efector final y hacer clic en 'Planificar y ejecutar'. El robot debería moverse. En SmartPad, vaya a **Mostrar -> Posición actual** y observe las coordenadas del efector final. Coloque un lienzo horizontalmente en la base del robot. Conecte un pincel al soporte del pincel y muévalo cuidadosamente hasta que apenas toque el lienzo. En esta posición, guarde las coordenadas del efector final. Repita 12-15 veces. Además, guarde las coordenadas del centro del lienzo y del bote de pintura.
Cuando tenga un conjunto de coordenadas, use [estos](https://github.com/nakata5321/Matlab_scripts_gaka-chu) scripts de Matlab para resolver las constantes y cuaternión faltantes. Péguelos. Reconstruya su espacio de trabajo con
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Probando la calibración de Gaka-Chu
Una vez calibrado, Gaka-Chu debe ser probado dibujando los bordes del lienzo. Para hacerlo, ejecute cada uno en una nueva terminal:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Después de esto, debería ver un contorno del lienzo en RViz:

![KUKA in RViz canvas](../images/kuka-real/kuka_rviz_canvas.png "KUKA in RViz canvas")

En la terminal, presione "S" para realizar la prueba. El efector final del robot debería moverse justo encima de los bordes del lienzo y el pincel debería tocar suavemente el lienzo durante todo el movimiento. Si no es así, intente recalibrar. Si el modelo del lienzo está girado incorrectamente, puede girarlo cambiando el cuaternión en Matlab.

## Haciendo arte
Necesitas 6 módulos básicos para que todo funcione:
- Interfaz EKI;
- MOVEit + RViz;
- Transmisión de marcos de entorno;
- Servicio de conversión de imágenes;
- Módulo de dibujo de trayectorias;
- Disparador de inicio.

Vamos a lanzarlos uno por uno.

### Interfaz Eki
En KRC4, inicie `eki_hw_interface`, en NUC en una nueva terminal haga:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz y MOVEit
Necesitas un planificador y una simulación. Lánzalos con
```
roslaunch kuka_moveit_config demo.launch
```

### Entorno
Indique al robot dónde se encuentra el bote de pintura y el lienzo. Tenga en cuenta que no es necesario lanzar el nodo `draw workspace`, el `tf_broadcaster` comparte el tamaño del lienzo. Simplemente no lo muestra en RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Procesador de imágenes
Todas las imágenes entrantes deben ser procesadas. Lanza el servicio.
```
rosrun picture_preprocessing TextConverter.py
```
Cuando recibe la llamada, procesa una imagen con un filtro HP y crea un archivo rosbag con trayectorias.

### Dibujante de trayectorias
El script principal aquí es el propio dibujante de trayectorias. Espera la imagen, llama al servicio TextConverter y dibuja la pintura.
```
rosrun local_task_planner trajectory_drawing
```

## Envía al robot una imagen para dibujar
El robot escucha un tópico específico de ROS donde debes pasar la ruta a una imagen deseada. La imagen debe ser cuadrada (ancho igual a alto) y estar compuesta por líneas. Envía la ruta:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
Después de eso, aparecen dos ventanas mostrando los contornos y las pistas. Ciérralas y observa a Gaka-Chu dibujando. Ten cuidado con la seguridad y siempre esté listo para presionar el botón de parada de emergencia.
Cuando Gaka-Chu termina su arte, puedes enviar otra ruta de imagen y el pintor repite todo el proceso.
