---
title: ROS-based Projects for Smart Spaces
locale: 'pt' 
contributors: [Fingerling42]
translated: true
---

Throughout its 15 years of development, the Robot Operating System framework was integrated with dozens of [various robotic devices](https://robots.ros.org/), and there are even more packages with algorithms and tools developed by the community. Truth be told, there are now so many projects, and the chaoticness of the description style of their repositories grew so much that it is currently quite problematic to find projects dedicated to a specific subject topic. 

Here, you’ll find a modest list of ROS-based projects that are dedicated to robots and IoT-devices that are meant for use in a home or office environment. This subject matter is one of the pillars of the Robonomics platform. Our goal is to try and bring these projects on track with Robonomics, from both a technical integration point of view and the perspective of an interesting application of these devices in a robot economy. Feel free to use this list in your search for ideas and inspiration.

You can check out some examples of ROS-projects integrated with Robonomics in the [Playground Overview page](https://wiki.robonomics.network/docs/en/playground-overview/). New projects, including those described here, will be added to the Wiki with time.

As of right now (**April 2021**), Robonomics is oriented towards ROS **Melodic** and **Noetic** versions. Older versions can also work, but there may be additional integration work needed. In the future, support for ROS version 2 will be added.

The main resources to search for ROS repositories and packages can be accessed [here](https://index.ros.org/).

## Simulation

Before shifting our attention solely to devices, it’s worth remembering that for a large quantity of ROS projects, there exists an option to test them in a simulation. The most popular tool for the 3D modeling of various robots under ROS is the [Gazebo](http://gazebosim.org/) simulator and its offshoot project, [Ignition](https://index.ros.org/r/ros_ign/). Both simulators allow to model devices in various difficult indoor and outdoor environments, alter the model and environment itself, test control algorithms and debug before moving over to the real device. Also, this is an excellent tool for training and situations when a real device is absent.

Overall, this is one of the best options for trying to integrate Robonomics with a ROS device without any expenditures at all. A real scenario would merely require slight code modifications. For Gazebo, Robonomics has a detailed guide that consists of two parts that cover [settings](https://wiki.robonomics.network/docs/en/connect-any-ros-compatible-robot-under-robonomics-parachain-control-1/) and [integrations](https://wiki.robonomics.network/docs/en/connect-any-ros-compatible-robot-under-robonomics-parachain-control-2/) (using a drone as an example). The main challenge is in finding a ready model (for example, [here](https://github.com/osrf/gazebo_models)) for Gazebo or trying to create your own model using the [SDFormat](http://sdformat.org/) developed for simulators. 

## Single-board computers and other boards

Such boards act as a base component for connecting other devices to ROS, primarily sensors and recording devices (audio, photo, and video recorders, cameras, temperature, pressure, and substance concentration sensors.) because the concept of a smart space implies the creation of a [digital twin](https://gateway.pinata.cloud/ipfs/QmNNdLG3vuTsJtZtNByWaDTKRYPcBZSZcsJ1FY6rTYCixQ/Robonomics_keypoint_March_2021.pdf) of infrastructure objects. Also, boards can act as the main computing device and controller for constructing a robotic mobile device. A list of boards that support ROS is presented below:

| Name and link                                                                                         |                                    Description                                  | ROS version | Last update |
|:-----------------------------------------------------------------------------------------------------:|---------------------------------------------------------------------------------|:-----------:|:-----------:|
|  [Raspberry Pi](http://wiki.ros.org/ROSberryPi/Installing%20ROS%20Melodic%20on%20the%20Raspberry%20Pi)| single board computer; RaspPi versions 2, 3 and 4 are available                 |   melodic   |     2020    |
|    [Arduino](http://wiki.ros.org/rosserial_arduino)                                                   | single board computer                                                           |    noetic   |     2021    |
|    [Phidgets](http://wiki.ros.org/phidgets)                                                           | sets of boards, various sensors and devices: Ph sensor, LED, RFID, motor control|    noetic   |     2020    |
|   [Sense HAT](https://wiki.ros.org/sensehat_ros)                                                      | shield for RaspPi with a set of sensors and LED                                 |    noetic   |     2020    |
|     [Navio2](https://navio2.emlid.com/)                                                               | autopliot shield for RaspPi 2,3,4                                               |    noetic   |     2020    |
|     [OpenCR](http://wiki.ros.org/opencr)                                                              | robot controller                                                                |    noetic   |     2021    |

## Smart home devices and household robots

Presented here are ROS devices whose initial use was for smart homes or offices. The list varies widely, from vacuum cleaners and robotic assistance to home control systems.

| Name and link                                             | Description                                                 |          ROS version          | Last update |
|:---------------------------------------------------------:|-------------------------------------------------------------|:-----------------------------:|:-----------:|
|  [Care-O-bot 4](http://wiki.ros.org/care-o-bot)           | household robot-assistant; a simulation is available        |            melodic            |     2021    |
|     [Kobuki](http://wiki.ros.org/kobuki)                  | mobile platform with different use cases (e.g. a waiter)    |            melodic            |     2020    |
|    [QTrobot](http://wiki.ros.org/Robots/qtrobot)          | humanoid social robot                                       | kinetic (melodic can be used) |     2020    |
|      [Nao](http://wiki.ros.org/nao)                       | humanoid robot; a simulation is available                   |            Melodic            |     2020    |
|     [TIAGo](http://wiki.ros.org/Robots/TIAGo)             | service robot with a manipulator; a simulation is available |            kinetic            |     2020    |
|     [Roomba](https://github.com/AutonomyLab/create_robot) | robot vacuum cleaner                                        |            melodic            |     2020    |
|    [OpenHAB](http://wiki.ros.org/iot_bridge)              | home automation system                                      |            kinetic            |     2017    |
|     [Sesame](https://index.ros.org/p/sesame_ros/)         | smart lock                                                  |            melodic            |     2021    |

## Mobile platforms and manipulators

First and foremost, ROS is known for supporting mobile robotics, from drones to industrial manipulators, for which many packages were created that realize simultaneous localization and mapping ([SLAM](http://wiki.ros.org/rtabmap_ros)), solve the direct and inverse task of kinematics, [trajectory planning](https://moveit.ros.org/), and etc. Mobile robotics are gradually penetrating into everyday life, which is why it is certainly interesting to test existing ROS-robots in their use within a smart space. The general list of ROS-based mobile platforms is rather large, which is why here we have selected those that are potentially convenient to operate in a home or office space. 

| Name and link                                             | Description                                | ROS version | Last update |
|:---------------------------------------------------------:|--------------------------------------------|:-----------:|:-----------:|
|   [turtlebot](http://wiki.ros.org/turtlebot3)             | mobile platform tailored for ROS           |    noetic   |     2020    |
|    [GoPiGo3](http://wiki.ros.org/Robots/gopigo3)          | mobile robot based on RaspPi               |   melodic   |     2020    |
|    [LoCoBot](http://wiki.ros.org/locobot)                 | mobile manipulator                         |   kinetic   |     2020    |
|   [ROSbot 2.0](http://wiki.ros.org/Robots/ROSbot-2.0)     | mobile platform; a simulation is available |    noetic   |     2021    |
|     [VOLTA](http://wiki.ros.org/Robots/Volta)             | mobile platform; a simulation is available |   melodic   |     2021    |
|    [evarobot](http://wiki.ros.org/Robots/evarobot)        | mobile platform; a simulation is available |    noetic   |     2020    |
|    [Freight](http://wiki.ros.org/Robots/freight)          | mobile platform; a simulation is available |   melodic   |     2021    |
|      [PR2](http://wiki.ros.org/Robots/PR2)                | mobile platform; a simulation is available |   melodic   |     2021    |