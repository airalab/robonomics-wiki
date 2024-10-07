---
title: Configuração e Instalação de Software do Gaka-Chu

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**Neste artigo, passaremos por algumas etapas de instalação e lançamento para configurar um robô pintor. Requisitos:**
- KUKA KR6 R900 sixx com KRC4 e um SmartPad;
- Intel NUC com [ROS melodic](http://wiki.ros.org/melodic/Installation/Ubuntu) instalado;
- Mesa, tinta, pincel, água.

## Instalação de Software no KRC4
A interface EKI é necessária tanto no KRC4 quanto no NUC. Informações detalhadas sobre como configurá-la no KRC4 estão apresentadas [aqui](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl). Inicie-a no controlador do robô.

## Instalação de Software no NUC
Crie um espaço de trabalho catkin:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
Baixe os pacotes do ROS. Todos os scripts estão armazenados [aqui](https://github.com/airalab/robot_painter/tree/test_branch). Clone o repositório:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
Você pode precisar de alguns arquivos de cabeçalho e bibliotecas para fazer tudo funcionar corretamente. Baixe-os:
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
Adicione o comando de origem ao arquivo `.bashrc`:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
Até agora, você deve ser capaz de lançar os scripts.. Se algo der errado, tente algumas [soluções de problemas](https://github.com/airalab/robot_painter/issues)

## Preenchendo constantes
Em primeiro lugar, o robô precisa saber a localização e orientação da tela, bem como a posição da lata de tinta. Tudo isso é especificado em `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`. Vamos dar uma olhada.
```
// Constantes do plano
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// Transformação da tela
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
Essas são as constantes da equação do plano que especificam a posição da tela no espaço 3D. Elas devem ser obtidas durante um processo de calibração descrito abaixo. Em seguida, vem a tinta.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
Essas são as coordenadas da lata de tinta. Elas também podem ser especificadas durante a calibração. O tamanho da tela é especificado em
```
canvas.width = 0.5;
canvas.height = 0.4;
```
Várias outras constantes importantes são armazenadas em `local_task_planner/src/Drawing.cpp`:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
Seus nomes dizem tudo, então preencha-os de acordo com a situação.

## Calibrando Gaka-Chu
O processo de calibração em si é bastante simples.

1) Inicie a interface EKI no KRC4:

Faça login no modo 'AUT', ligue os drivers e inicie o script `eki_hw_interface`

2) Inicie a interface EKI no NUC
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
Deverá exibir logs intermináveis.

3) Inicie o RViz
```
roslaunch kuka_moveit_config demo.launch
```
Você deverá ver o seguinte:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz.png", alt:"KUKA in RViz"} %}{% endroboWikiPicture %}

Tente mover o efetuador final e clique em 'Planejar e Executar'. O robô deve se mover. No SmartPad, vá para **Exibir -> Posição atual** e observe as coordenadas do efetuador final. Coloque uma tela horizontalmente à base do robô. Conecte um pincel ao suporte de pincel e mova-o cuidadosamente até tocar levemente na tela. Nessa posição, salve as coordenadas do efetuador final. Repita 12-15 vezes. Além disso, salve as coordenadas do centro da tela e da lata de tinta.
Quando tiver um conjunto de coordenadas, use [estes](https://github.com/nakata5321/Matlab_scripts_gaka-chu) scripts Matlab para resolver as constantes e o quaternion faltantes. Cole-os. Reconstrua seu espaço de trabalho com
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Testando a calibração do Gaka-Chu
Quando calibrado, o Gaka-Chu precisa ser testado desenhando as bordas da tela. Para fazê-lo, execute cada um em um novo terminal:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
Após isso, você deverá ver um contorno da tela no RViz:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz_canvas.png", alt:"KUKA in RViz canvas"} %}{% endroboWikiPicture %}

No terminal, pressione "S" para realizar o teste. O efetuador final do robô deve se mover exatamente acima das bordas da tela e o pincel deve tocar suavemente na tela durante todo o movimento. Se não for assim, tente recalibrar. Se o modelo da tela estiver rotacionado incorretamente, você pode rotacioná-lo alterando o quaternion no Matlab.

## Criando arte
Você precisa de 6 módulos básicos para fazer tudo funcionar:
- Interface EKI;
- MOVEit + RViz;
- Transmissão de quadros do ambiente;
- Serviço de conversão de imagem;
- Módulo de desenho de trajetórias;
- Gatilho de início.

Vamos lançá-los um por um.

### Interface Eki
No KRC4, inicie `eki_hw_interface`, no NNo novo terminal UC faça:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz e MOVEit
Você precisa de um planejador e uma simulação. Inicie-os com
```
roslaunch kuka_moveit_config demo.launch
```

### Ambiente
Informe ao robô onde estão a lata de tinta e a tela. Note que não é necessário iniciar o nó `draw workspace`, o `tf_broadcaster` compartilha o tamanho da tela. Apenas não o exibe no RViz.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### Processador de imagens
Todas as imagens recebidas precisam ser processadas. Inicie o serviço.
```
rosrun picture_preprocessing TextConverter.py
```
Quando receber a chamada, ele processa uma imagem com um filtro HP e cria um arquivo rosbag com trajetórias.

### Desenhador de trajetórias
O script principal aqui é o desenhador de trajetórias em si. Ele aguarda a imagem, chama o serviço TextConverter e desenha a pintura.
```
rosrun local_task_planner trajectory_drawing
```

## Enviar ao robô uma imagem para desenhar
O robô escuta um tópico ROS específico onde você precisa passar o caminho para uma imagem desejada. A imagem deve ser quadrada (largura igual à altura) e composta por linhas. Envie o caminho:
```
rostopic pub /run std_msgs/String "data: '<caminho_para_a_imagem>'"
```
Depois disso, duas janelas aparecem mostrando os contornos e as trilhas. Feche-as e veja Gaka-Chu desenhando. Esteja atento à segurança e esteja sempre pronto para pressionar o botão de parada de emergência.
Quando Gaka-Chu terminar sua arte, você pode enviar outro caminho para a imagem e o pintor repetirá todo o processo.