---
title: Try It Out
contributors: [LoSk-p]
translated: false
---

With this tutorial you will be able to see in simulation what real Spot did.

## Requirements

* ROS melodic desktop (installation instructions [here](http://wiki.ros.org/melodic/Installation/Ubuntu))

## Install package

Create workspace and clone packages:
```bash
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/src
git clone https://github.com/clearpathrobotics/spot_ros.git
git clone https://github.com/ros/geometry2 --branch 0.6.5
```

Then install dependencies:
```bash
cd ~/catkin_ws/
rosdep install --from-paths src --ignore-src -y
catkin_make
```

## Run

Get example rosbag file:
```bash
wget -O spot_rosbag.bag https://gateway.ipfs.io/ipfs/QmYifXdEuzEEHz1hQLg6u9RgNAA6yNsPFb3oCBsqdqnkcH
```

Run rviz with the Spot model:
```bash
source ~/catkin_ws/devel/setup.bash
roslaunch spot_viz view_model.launch
``` 
Then in a new terminal:
```bash
source ~/catkin_ws/devel/setup.bash
roslaunch spot_viz view_robot.launch
``` 
![spot_viz](../images/spot/spot.jpg)
Play rosbag file and you will see the robot move:
```bash
rosbag play spot_rosbag.bag
```