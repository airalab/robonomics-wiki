---
title: Control Baxter robot with robonomics
locale: 'ru' 
contributors: [nakata5321, Vourhey]
translated: false
---

Example of how it works:

https://www.youtube.com/watch?v=JivTDhDJLHo

## Requirements:

 - ROS Melodic + Gazebo (installation manual [here][db2])  
 - extra packages:
```shell
sudo apt-get install ros-melodic-gazebo-ros-control ros-melodic-effort-controllers ros-melodic-joint-state-controller python-catkin-tools python3-dev python3-catkin-pkg-modules python3-numpy python3-yaml ros-melodic-cv-bridge
```
- IPFS up to 0.6.0 (download from [here][db3] and install)
- python packages:
```shell
sudo apt-get -y install python3-pip
pip3 install --upgrade pip
```
 - Robonomics node download latest [release][db4] here (last tested release v1.1)
 - IPFS browser extension (not necessary)
## 0. install CV Bridge extension for python3
 
 - Create catkin workspace
```shell
mkdir -p catkin_workspace/src
cd catkin_workspace
catkin init
```

 - Instruct catkin to set cmake variables. Use your current version of `python`. For me, it is `python3.6`:
```sh
catkin config -DPYTHON_EXECUTABLE=/usr/bin/python3 -DPYTHON_INCLUDE_DIR=/usr/include/python3.6m -DPYTHON_LIBRARY=/usr/lib/x86_64-linux-gnu/libpython3.6m.so
catkin config --install
```

 - Clone cv_bridge src:
```shell
git clone https://github.com/ros-perception/vision_opencv.git src/vision_opencv
```

 - Find version of cv_bridge in your repository:
```shell
apt-cache show ros-melodic-cv-bridge | grep Version
    Version: 1.12.8-0xenial-20180416-143935-0800
```

 - Checkout right version in git repo. In our case it is 1.12.8:
```shell
cd src/vision_opencv/
git checkout 1.12.8
cd ../../
```

 - Build:
```shell
catkin build cv_bridge
```

 - Extend environment with new package:

```shell
source install/setup.bash --extend
``` 
 - Test:
```shell
$ python3

Python 3.6.9 (default, Jan 26 2021, 15:33:00) 
[GCC 8.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> from cv_bridge.boost.cv_bridge_boost import getCvType
>>>
```


## 1. Download simulation and controller packages
Download packages:
```sh
cd ~
mkdir -p robot_ws/src
cd robot_ws/src
git clone https://github.com/nakata5321/Baxter_simulation_controller.git
cd Baxter_simulation_controller
git checkout old_version
pip3 install -r requirements.txt
cd ../..
catkin build -DPYTHON_EXECUTABLE=/usr/bin/python3
```
Don't forget to add source command:
```sh
echo "source /home/$USER/robot_ws/devel/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

## 2. Start simulation
Let's start gazebo world and put our baxter in it:
```sh
roslaunch gazebo_ros empty_world.launch
```
![empty world][im1]

Open one more window in terminal:
```sh
rosrun gazebo_ros spawn_model -file `rospack find baxter_description`/urdf/baxter.urdf -urdf -z 1 -model baxter
```
You can put some models in front of our baxter. It will be more interesting.

![baxter][im2]

## 3.Manage accounts in DAPP

Since we are testing, let us create a local robonomics network with robonomics binary file. Go to folder with robonomics file and run:
```sh
./robonomics --dev --tmp --rpc-cors all
```
![robonomics][im3]


Go to [Robonomics Parachain portal][db5] and switch to local node

![local node][im4]

Go to Accounts and create __Baxter__ and __Employer__ accounts (__Robot__ is not necessary)

__Important!__ Copy each account's **Mnemonic** and **address** (to copy address click on account's icon). **Mnemonic** is the private key for account.
Transfer some money (units) to these accounts:

![create account][im5]

![create account2][im14]

![accounts][im6]

Add Baxter's **Mnemonic** and **address** to `config.yaml` in `robot_ws/src/Baxter_simulation_controller/config/`

## 4.Start simulation

In new window run:
```sh
ifps init #you only need to do this once
ipfs daemon
```
Open separate terminal and start *controller package*:
```sh
rosrun robot_controller robot_control.py
```
![waiting][im7]

Now you can send a transaction triggering the Baxter to start moving and collecting data. To do so, you can use the same [Robonomics Parachain portal][db5]. Go to **Developer->Extrinsics** and select Baxter's employer account, `launch` extrinsic, Baxter's account as a target account and `yes` as a parameter. Submit the extrinsic.


![rob_message][im8]

The robot should start moving. It won't accept commands from other accounts neither commands with `no` parameter.
You should see the following:

![working][im9]

when the work is over go to the Robonomics Portal to `Developer > Chain state`. Choose *datalog.datalogItem(AccountId,u64)* in **state query**.If you want to show all datalog's, then turn off `include option` add view Baxter's datalog message using "+" button.

![datalog][im10]

Now the IPFS hash of the telemetry and photos is saved in the blockchain. To see the data simply copy the hash and insert it in the search bar with URL: gateway.ipfs.io/ipfs/< put your hash here >

![ipfs][im11]

Click  __View on Gateway__ and that's all!

![result1][im12]

![result2][im13]

[db2]: <http://wiki.ros.org/melodic/Installation>
[db3]: <https://dist.ipfs.io/go-ipfs/v0.6.0/go-ipfs_v0.6.0_linux-386.tar.gz>
[db4]: <https://github.com/airalab/robonomics/releases>
[im1]: <../images/baxter_demo/empty_world.jpg>
[im2]: <../images/baxter_demo/baxter_simulation.jpg>
[im3]: <../images/baxter_demo/robonomics.jpg>
[db5]: <https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/>
[im4]: <../images/baxter_demo/local_node.jpg>
[im5]: <../images/baxter_demo/create_account.jpg>
[im6]: <../images/baxter_demo/accounts.jpg>
[im7]: <../images/baxter_demo/waiting.jpg>
[db6]: <https://wiki.robonomics.network/docs/rio-overview/>
[im8]: <../images/baxter_demo/rob_message.jpg>
[im9]: <../images/baxter_demo/working.jpg>
[im10]: <../images/baxter_demo/datalog.jpg>
[im11]: <../images/baxter_demo/ipfs.jpg>
[im12]: <../images/baxter_demo/result1.jpg>
[im13]: <../images/baxter_demo/result2.jpg>
[im14]: <../images/baxter_demo/create_account2.jpg>