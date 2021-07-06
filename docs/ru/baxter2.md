---
title: Say "Hello Baxter!" with robonomics
contributors: [nakata5321]
translated: false
---

Example of how it works is available [here][db1]:

https://youtu.be/2AQGFVzkGdg

## Requirements:
 - Ubuntu 18.04
 - ROS Melodic + Gazebo (installation manual [here][db2])  
 - extra packages:
```sh
sudo apt-get install ros-melodic-qt-build ros-melodic-driver-common ros-melodic-gazebo-ros-control ros-melodic-gazebo-ros-pkgs ros-melodic-ros-control ros-melodic-control-toolbox ros-melodic-realtime-tools ros-melodic-ros-controllers ros-melodic-xacro python-wstool ros-melodic-tf-conversions ros-melodic-kdl-parser python-wstool python-catkin-tools qt4-default
```

- IPFS 0.4.22 (download from [here][db3] and install)
- pip:
```sh
sudo apt install python-pip
```

- ipfshttpclient
```sh
pip install ipfshttpclient
```  


 - Robonomics node (binary file) (download latest [release][db4] here)
 - Create __Baxter__ and __Employer__ accounts  on **Robonomics Portal**  
 (you can find tutorial ["Create an Account on Robonomics Portal"][db8] here).
 - IPFS browser extension (not necessary)

## 1. Download Baxter model
Download packages:
```sh
cd ~
mkdir -p robot_ws/src
cd robot_ws/src/
wstool init .
wstool merge https://raw.githubusercontent.com/RethinkRobotics/baxter_simulator/master/baxter_simulator.rosinstall
wstool update
git clone https://github.com/nakata5321/Baxter_simulation_controller.git
```
This packages were created for ROS indigo. We have to change some files to run them on ROS melodic.
We will use **patch** files.
```sh
patch ./baxter_simulator/baxter_sim_io/include/baxter_sim_io/qnode.hpp ./Baxter_simulation_controller/patch/qnode_patch
patch ./baxter_simulator/baxter_sim_kinematics/src/arm_kinematics.cpp ./Baxter_simulation_controller/patch/arm_patch
```
And let's build  all our packages:
```sh
cd ..
catkin build
```
Dont forget to add source command:
```sh
echo "source /home/$USER/robot_ws/devel/setup.bash" >> ~/.bashrc
source ~/.bashrc
```  
__Important!__ At the end save *Robonomics node (binary file)* in **robot_ws** directory.

## 2. Start simulation
First of all copy and edit `baxter.sh`
```sh
cp src/baxter/baxter.sh .
```

Find your local ip adress with command:
```
ip a
```
![ip_a][im14]

Edit the following values in `baxter.sh` :
```
nano baxter.sh
```

Edit the following values in `baxter.sh` :

- your_ip - put your local ip address. See `ip a`
- ros_version - for example "melodic"

![baxtersh][im15]

Run the baxter shell script with sim specified:
```sh
./baxter.sh sim
roslaunch baxter_gazebo baxter_world.launch
```
You can put some models in front of our baxter. It will be more intresting.
![baxter][im2]

## 3.Manage accounts in DAPP

Since we are testing, let us create a local robonomics network with robonomics binary file. Go to folder with robonomics file and run:
```sh
./robonomics --dev --rpc-cors all
```
![robonomics][im3]

Don't forget to remove `db` folder after every launch:
```sh
rm -rf /home/$USER/.local/share/robonomics/chains/dev/db
```

Go to [https://parachain.robonomics.network][db5] and switch to local node
![local node][im4]

Go to Accounts and transfer some money to __Baxter__ and __Employer__ accounts.

You can find The manual "Create an Account on Robonomics Portal" [here.][db8]


Add Baxter's secret key and adress to `config.yaml` in `robot_ws/src/Baxter_simulation_controller/config/`

## 4.Beginning of work

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

Return to the first terminal, open new window and send command to [**robonomics io**][db6]. This command will turn ON your robot:
```sh
echo "ON" | ./robonomics io write launch -r <BAXTER ADDRESS> -s <EMPLOYER’S KEY>
```
Where `<BAXTER ADDRESS>`  and `<EMPLOYER’S KEY>` are replaced with previously saved strings accordingly.

![rob_message][im8]

You should see the following:

![working][im9]

when the work is over go to the Robonomics Portal to `Developer > Chain state`. Choose *datalog* in **state query** and add Baxter datalog message using "+" button.

![datalog][im10]

Now the IPFS hash of the telemetry and photos is saved in the blockchain. To see the data simply copy the hash and insert it in the search bar with URL: `gateway.ipfs.io/ipfs/<put your hash here>`


That's all!

![result1][im12]
![result2][im13]

[db1]: <https://youtu.be/2AQGFVzkGdg>
[db2]: <http://wiki.ros.org/melodic/Installation>
[db3]: <https://dist.ipfs.io/go-ipfs/v0.4.22/go-ipfs_v0.4.22_linux-386.tar.gz>
[db4]: <https://github.com/airalab/robonomics/releases>
[db8]: </docs/create-account-in-dapp>
[im1]: <../images/baxter_demo/empty_world.jpg>
[im2]: <../images/baxter_demo/baxter_simulation.jpg>
[im3]: <../images/baxter_demo/robonomics.jpg>
[db5]: <https://parachain.robonomics.network>
[im4]: <../images/baxter_demo/local_node.jpg>
[im7]: <../images/baxter_demo/waiting.jpg>
[im8]: <../images/baxter_demo/rob_message.jpg>
[im9]: <../images/baxter_demo/working.jpg>
[im10]: <../images/baxter_demo/datalog.jpg>
[im11]: <../images/baxter_demo/ipfs.jpg>
[im12]: <../images/baxter_demo/result1.jpg>
[im13]: <../images/baxter_demo/result2.jpg>
[db6]: </docs/rio-overview>
[im14]:<../images/baxter_demo/ip_a.png>
[im15]:<../images/baxter_demo/baxter_sh.jpg>
