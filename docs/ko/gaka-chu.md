---
title: Gaka-Chu setup and software 설치

contributors: [PaTara43]
---

https://www.youtube.com/watch?v=GxlYxaykqTU

**이 기사에서는 로봇 페인터를 설정하기 위한 몇 가지 설치 및 실행 단계를 살펴보겠습니다. 요구 사항:**
- KUKA KR6 R900 sixx 및 KRC4와 SmartPad;
- [ROS melodic](http://wiki.ros.org/melodic/설치/Ubuntu)이 설치된 Intel NUC;
- 테이블, 페인트, 브러시, 물.

## KRC4에 소프트웨어 설치
KRC4와 NUC 모두에 EKI 인터페이스가 필요합니다. KRC4에서 설정하는 방법에 대한 자세한 정보는 [여기](https://github.com/AlexeiOvcharov/kuka_experimental/tree/a915bf4e932990379c84164713e7ae11a24a2a13/kuka_eki_hw_interface/krl)에서 제공됩니다. 로봇 컨트롤러에서 실행하세요.

## NUC에 소프트웨어 설치
catkin 작업 공간을 생성하세요.
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin build
```
ROS 패키지를 다운로드하세요. 모든 스크립트는 [여기](https://github.com/airalab/robot_painter/tree/test_branch)에 저장되어 있습니다. 리포지토리를 복제하세요.
```
cd src
git clone --branch test_branch https://github.com/airalab/robot_painter
cd robot_painter
rm -rf scenes
mv * ../
cd ..
rmdir robot_painter
```
모두가 올바르게 작동하려면 일부 헤더 파일과 라이브러리가 필요할 수 있습니다. 다운로드하세요.
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
`.bashrc` 파일에 소스 명령을 추가하세요.
```
echo “source ~/catkin_ws/devel/setup.bash” >> ~/.bashrc
source ~/.bashrc
```
지금까지 스크립트를 실행할 수 있어야 합니다. 문제가 발생하면 [문제 해결](https://github.com/airalab/robot_painter/issues)을 시도하세요.

## 상수 채우기
먼저, 로봇은 캔버스 위치와 방향, 그리고 페인트 통 위치를 알아야 합니다. 이 모든 것은 `fake_painter_enviroment_tf/src/tf_broadcaster.cpp`에서 지정됩니다. 살펴보겠습니다.
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
이것들은 3D 공간에서 캔버스 위치를 지정하는 평면 방정식 상수입니다. 아래에서 설명하는 보정 과정 중에 얻어야 합니다. 다음은 페인트입니다.
```
colorTransform.transform.translation.x = 0.5;
colorTransform.transform.translation.y = 0.2;
colorTransform.transform.translation.z = 0.258;
```
이것들은 페인트 통 좌표입니다. 보정하는 동안 지정할 수도 있습니다. 캔버스 크기는
```
canvas.width = 0.5;
canvas.height = 0.4;
```
`local_task_planner/src/Drawing.cpp`에 저장된 몇 가지 더 중요한 상수가 있습니.
```
const double COLOR_BOTLE_HEIGHT = 0.06;
const double COLOR_HEIGHT = 0.045;
const double HEIGHT_OFFSET = COLOR_BOTLE_HEIGHT - COLOR_HEIGHT + 0.02;
const double BRUSH_HEIGHT = 0.01;
const double BRUSH_WIDTH = 0.01;
```
상수의 이름이 그 자체로 말해주기 때문에 상황에 맞게 채우세요.

## Gaka-Chu 보정
보정 과정 자체는 매우 간단합니다.

1) KRC4에서 EKI 인터페이스 시작:

'AUT' 모드로 로그인하고 드라이버를 켜고 `eki_hw_interface` 스크립트를 실행하세요.

2) NUC에서 EKI 인터페이스 시작
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```
무한한 로그가 출력되어야 합니다.

3) RViz 시작
```
roslaunch kuka_moveit_config demo.launch
```
다음을 볼 수 있어야 합니다.

![KUKA in RViz](../images/kuka-real/kuka_rviz.png "KUKA in RViz")

끝 지점을 이동하고 '계획 및 실행'을 클릭해 보세요. 로봇이 움직여야 합니다. SmartPad에서 **Display -> Actual position**으로 이동하여 끝 지점의 좌표를 확인하세요. 캔버스를 로봇 베이스에 수평으로 배치하세요. 브러시를 브러시 홀더에 연결하고 조심스럽게 캔버스에 거의 닿을 때까지 이동하세요. 이 위치에서 끝 지점의 좌표를 저장하세요. 12-15번 반복하세요. 또한 캔버스 중심과 페인트 통의 좌표를 저장하세요.
좌표 세트가 있으면 [이](https://github.com/nakata5321/Matlab_scripts_gaka-chu) Matlab 스크립트를 사용하여 누락된 상수와 쿼터니온을 해결하세요. 붙여넣으세요. 다음으로
```
cd ~/catkin_workspace
rm -rf build logs devel
catkin build
```

## 작업 공간을 다시 빌드하세요.
Gaka-Chu 보정 테스트
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
roslaunch kuka_moveit_config demo.launch
rosrun fake_painter_enviroment_tf tf_broadcaster
rosrun local_task_planner draw_workspace
```
보정된 후에는 Gaka-Chu를 사용하여 캔버스의 테두리를 그리는 테스트를 수행해야 합니다. 각각을 새로운 터미널에서 실행하세요.

![KUKA in RViz canvas](../images/kuka-real/kuka_rviz_canvas.png "KUKA in RViz canvas")

터미널에서 테스트를 수행하려면 "S"를 누르세요. 로봇의 엔드 이펙터는 캔버스의 테두리 바로 위로 이동해야 하며 브러시는 이동 동안 캔버스에 부드럽게 닿아야 합니다. 그렇지 않으면 재보정을 시도해보세요. 캔버스 모델이 잘못 회전된 경우, Matlab에서 쿼터니언을 변경하여 회전시킬 수 있습니다.

## 아트 만들기
모두 작동하려면 6개의 기본 모듈이 필요합니다:
- EKI 인터페이스;
- MOVEit + RViz;
- 환경 프레임 브로드캐스팅;
- 사진 변환 서비스;
- 트라젝토리 그리기 모듈;
- 시작 트리거.

하나씩 실행해 보겠습니다.

### Eki 인터페이스
KRC4에서 `eki_hw_interface`를 실행하고, 새 터미널에서 NUC에서 다음을 수행하세요:
```
roslaunch kuka_eki_hw_interface test_hardware_interface.launch
```

### RViz와 MOVEit
플래너와 시뮬레이션이 필요합니다. 다음과 같이 실행하세요.
```
roslaunch kuka_moveit_config demo.launch
```

### 환경
로봇에게 페인트 통과 캔버스의 위치를 알려주세요. `draw workspace` 노드를 실행할 필요는 없으며, `tf_broadcaster`가 캔버스 크기를 공유합니다. 그저 RViz에 표시되지 않을 뿐입니다.
```
rosrun fake_painter_enviroment_tf tf_broadcaster
```

### 사진 처리기
들어오는 모든 사진은 처리되어야 합니다. 서비스를 실행하세요.
```
rosrun picture_preprocessing TextConverter.py
```
호출을 받으면 HP 필터로 사진을 처리하고 트라젝토리가 포함된 rosbag 파일을 생성합니다.

### 트라젝토리 그리기
가장 중요한 스크립트는 트라젝토리 그리기 자체입니다. 그림을 기다리고 TextConverter 서비스를 호출하여 그림을 그립니다.
```
rosrun local_task_planner trajectory_drawing
```

## 로봇에게 그릴 그림을 보내세요
로봇은 특정 ROS 픽을 청취하여 원하는 그림의 경로를 전달해야 합니다. 그림은 정사각형이어야 하며 (너비와 높이가 같아야 함) 선으로 이루어져 있어야 합니다. 경로를 전송하세요:
```
rostopic pub /run std_msgs/String "data: '<path_to_picture>'"
```
이후에 두 개의 창이 나타나고 윤곽과 트랙이 표시됩니다. 이를 닫고 Gaka-Chu의 그림을 확인하세요. 안전에 주의하고 언제든지 비상 정지 버튼을 누를 준비를 해야 합니다.
Gaka-Chu가 그림을 완성하면 다른 경로를 그림에 전송할 수 있으며, 화가는 전체 과정을 반복합니다.
