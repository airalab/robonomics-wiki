---
title: Playground Overview
locale: 'es' 
contributors: [LoSk-p]
translated: false
---

Robonomics allows to use robots as autonomous agents that receive commands from a human or another robot and do some useful work, storing a report of their actions in Blockchain. The interaction between the robot and the Robonomics platform is quite simple with a [Robonomics IO](/docs/rio-overview).
## What Robots You Can Control
The playground section contains examples of connecting different robots to Robonomics which everyone can try to repeat step by step. In this section you can try to control:
* [an Unmanned Aerial Vehicle](/docs/iris-drone/)
* [a Mars Rover](/docs/connect-mars-curiosity-rover-under-robonomics-parachain-control/)
* [a Manipulator](/docs/kuka/)
* [an industrial Baxter Robot](/docs/baxter2/)

Since all robots are available as simulation models, you don't need any special hardware. So you can try to connect the robot to Robonomics Network right now.
## How Do You Control the Robot
All of our Demos are launched in a local network, however you can connect a robot to the live networks in the same way.

All Demos in this section follow a similar scenario. You [create an account](/docs/create-account-in-dapp/) for the robot and send him some units for paying transactions. Then the user sends an `ON/OFF` transaction to the robot's address, the robot receives it and starts working. After the job is done the telemetry is saved in IPFS and the file hash is sent to datalog. So at any time you can see how the robot performed its work.
## Connect Your Own Robot
In addition you can create your own control package for any ROS-compatible device with [this](/docs/connect-any-ros-compatible-robot-under-robonomics-parachain-control-1/) instruction.

