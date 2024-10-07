---
title: Gaka-Chu 설정 및 소프트웨어 설치

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**이 기사에서는 로봇 화가를 설정하기 위한 몇 가지 설치 및 실행 단계를 살펴보겠습니다. 요구 사항:**
- KUKA KR6 R900 sixx와 KRC4 및 SmartPad;
- [ROS melodic](http://wiki.ros.org/melodic/Installation/Ubuntu)가 설치된 Intel NUC;
- 테이블, 페인트, 붓, 물.

## KRC4에 소프트웨어 설치
EKI 인터페이스는 KRC4와 NUC 양쪽에 필요합니다. KRC4에 설정하는 방법에 대한 자세한 정보는 [여기](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl)에 제시되어 있습니다. 로봇 컨트롤러에서 실행하십시오.

## NUC에 소프트웨어 설치
catkin 워크스페이스를 만듭니다:
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
ROS 패키지를 다운로드합니다. 모든 스크립트는 [여기](https://github.com/airalab/robot_painter/tree/test_branch)에 저장되어 있습니다. 저장소를 복제합니다:
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
모두 올바르게 작동하도록 하려면 일부 헤더 파일과 라이브러리가 필요할 수 있습니다. 이를 다운로드합니다:
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
`.bashrc` 파일에 소스 명령을 추가합니다:
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
지금까지 진행하면 스크립트를 실행할 수 있어야 합니다.. 무언가 잘못되면 [문제 해결](https://github.com/airalab/robot_painter/issues)을 시도해보세요.

## 상수 채우기
우선, 로봇은 캔버스 위치 및 방향과 페인트 통 위치를 알아야 합니다. 이 모든 것은 `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`에서 지정됩니다. 한번 살펴보겠습니다.
```
// 평면 상수
const double A = -0.0641;
const double B = 0.0214;
const double C = 0.9977;
const double D = -0.2198;

// 캔버스 변환
const double px = 0.52;
const double py = -0.24;
const double qx = -0.011;
const double qy = -0.032;
const double qz = 0.0;
const double qw = 0.999;
```
이것들은 3차원 공간에서 캔버스 위치를 지정하는 평면 방정식 상수입니다. 아래에 설명된 보정 과정 중에 얻어져야 합니다. 다음은 페인트입니다.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
이것들은 페인트 통 좌표입니다. 이것들도 보정하는 동안 지정될 수 있습니다. 캔버스 크기는 다음과 같이 지정됩니다.
```
canvas.width = 0.5;
canvas.height = 0.4;
```
더 중요한 상수들은 `local_task_planner/src/Drawing.cpp`에 저장되어 있습니다:
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
그들의 이름이 모든 것을 말해주기 때문에 상황에 맞게 채워 넣으세요.

## 가카-추 보정하기
보정 과정 자체는 매우 간단합니다.

1) KRC4에서 EKI 인터페이스 시작:

'AUT' 모드로 로그인하고 드라이버를 켜고 `eki_hw_interface` 스크립트를 실행합니다.

2) NUC에서 EKI 인터페이스 시작
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
끝없는 로그가 출력되어야 합니다.

3) RViz 시작
```
roslaunch kuka_moveit_config demo.launch
```
다음을 볼 수 있어야 합니다:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz.png", alt:"KUKA in RViz"} %}{% endroboWikiPicture %}

엔드 이펙터를 움직이고 'Plan and Execute'를 클릭해보세요. 로봇이 움직여야 합니다. SmartPad에서 **Display -> Actual position**으로 이동하여 엔드 이펙터의 좌표를 관찰합니다. 캔버스를 로봇 베이스에 수평으로 배치하세요. 브러시를 브러시 홀더에 꽂고 캔버스에 가까이 이동시켜 부드럽게 닿을 때까지 조심스럽게 이동하세요. 이 위치에서 엔드 이펙터의 좌표를 저장하세요. 12-15번 반복하세요. 또한 캔버스 중심과 페인트 통의 좌표도 저장하세요.
좌표 세트가 있으면 [이](https://github.com/nakata5321/Matlab_scripts_gaka-chu) Matlab 스크립트를 사용하여 누락된 상수와 쿼터니언을 해결하세요. 붙여넣으세요. 다음과 같이 워크스페이스를 다시 빌드하세요.
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## Gaka-Chu 보정 테스트
보정된 후 Gaka-Chu는 캔버스의 테두리를 그리는 테스트가 필요합니다. 다음을 각각 새 터미널에서 실행하여 그렇게 하세요:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
이후에 RViz에서 캔버스 윤곽을 볼 수 있어야 합니다:

{% roboWikiPicture {src:"docs/kuka-real/kuka_rviz_canvas.png", alt:"KUKA in RViz canvas"} %}{% endroboWikiPicture %}

터미널에서 "S"를 눌러 테스트를 수행하세요. 로봇의 엔드 이펙터는 캔버스의 테두리 바로 위로 이동하고 브러시는 이동하는 동안 캔버스에 부드럽게 닿아야 합니다. 그렇지 않은 경우 다시 보정해보세요. 캔버스 모델이 잘못 회전된 경우 Matlab에서 쿼터니언을 변경하여 회전시킬 수 있습니다.

## 예술 작품 만들기
모든 작업을 수행하려면 6가지 기본 모듈이 필요합니다:
- EKI 인터페이스;
- MOVEit + RViz;
- 환경 프레임 브로드캐스팅;
- 이미지 변환 서비스;
- 궤적 그리기 모듈;
- 시작 트리거.

하나씩 실행해보겠습니다.

### Eki 인터페이스
KRC4에서 `eki_hw_interface`를 실행하세요. NUC에서 새 터미널에서 다음을 실행하십시오:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz 및 MOVEit
플래너와 시뮬레이션이 필요합니다. 다음 명령어로 실행하십시오:
```
roslaunch kuka_moveit_config demo.launch
```

### 환경
로봇에게 페인트 통과 캔버스의 위치를 알려주세요. `draw workspace` 노드를 실행할 필요는 없습니다. `tf_broadcaster`가 캔버스 크기를 공유합니다. 다만 RViz에는 표시되지 않습니다.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### 사진 처리기
들어오는 모든 사진은 처리되어야 합니다. 서비스를 실행하십시오.
```
rosrun picture_preprocessing TextConverter.py
```
호출을 받으면 HP 필터로 사진을 처리하고 궤적이 담긴 rosbag 파일을 생성합니다.

### 궤적 그리기
여기서 가장 중요한 스크립트는 궤적 그리기입니다. 사진을 기다리고, TextConverter 서비스를 호출하여 그림을 그립니다.
```
rosrun local_task_planner trajectory_drawing
```

## 로봇에게 그릴 사진 보내기
로봇은 특정 ROS 토픽을 듣고 있습니다. 여기에 원하는 사진의 경로를 전달해야 합니다. 사진은 정사각형이어야 하며 선으로 이루어져 있어야 합니다. 경로를 보내십시오:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
이후 두 개의 창이 나타나고 윤곽과 궤적이 표시됩니다. 이를 닫고 Gaka-Chu가 그리는 것을 관찰하세요. 안전에 주의하고 언제든지 비상 정지 버튼을 누를 준비를 해야 합니다.
Gaka-Chu가 작품을 완성하면 다른 사진 경로를 보내고 화가가 전체 과정을 반복합니다.