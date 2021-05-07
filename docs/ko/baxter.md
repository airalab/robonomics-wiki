---
title: Control Baxter robot with robonomics
contributors: [nakata5321, Vourhey]
translated: false
---

Example of how it works:

https://youtu.be/AeufQmaNRWk

## Requirements:
 - Ubuntu 18.04
 - ROS Melodic + Gazebo (installation manual [here][db2])  
 - extra packages:
```sh
sudo apt-get install ros-melodic-gazebo-ros-control ros-melodic-effort-controllers ros-melodic-joint-state-controller
```
- IPFS 0.4.22 (download from [here][db3] and install)
- pip:
```sh
sudo apt install python-pip
```

- ipfshttpclient:
```sh
pip install ipfshttpclient
```


 - Robonomics node (binary file) (download latest [release][db4] here)
 - Create __Baxter__ and __Employer__ accounts  on **Robonomics Portal**  
 (you can find tutorial ["Create an Account on Robonomics Portal"][db6] here).
 - IPFS browser extension (not necessary)

## 1. Download Baxter model and controller packages
Download packages:
```sh
cd ~
mkdir -p robot_ws/src
cd robot_ws/src
git clone https://github.com/nakata5321/Baxter_simulation_controller.git
cd Baxter_simulation_controller
git checkout old_version
cd ../..
catkin build
```
Dont forget to add source command:
```sh
echo "source /home/$USER/robot_ws/devel/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

## 2. Create simulation world
Let's start gazebo world and put our baxter in it:
```sh
roslaunch gazebo_ros empty_world.launch
```
![empty world][im1]

Open one more window in terminal:
```sh
rosrun gazebo_ros spawn_model -file `rospack find baxter_description`/urdf/baxter.urdf -urdf -z 1 -model baxter
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

You can find The manual "Create an Account on Robonomics Portal" [here.][db6]

Add Baxter's secret key and adress to `configuration.txt` in `robot_ws/src/robot_controller/src/`

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

Return to the first terminal, open new window and send command to [**robonomics io**][db7]. This command will turn ON your robot:
```sh
echo "ON" | ./robonomics io write launch -r <CURIOSITY ADDRESS> -s <EMPLOYER’S KEY>
```
Where `<CURIOSITY ADDRESS>` and `<EMPLOYER’S KEY>` are replaced with previously saved strings accordingly

![rob_message][im8]

You should see the following:

![working][im9]

when the work is over go to the Robonomics Portal to `Developer > Chain state`. Choose *datalog* in **state query** and add Baxter datalog message using "+" button.

![datalog][im10]

Now the IPFS hash of the telemetry and photos is saved in the blockchain. To see the data simply copy the hash and insert it in IPFS Companion:

![ipfs][im11]

Click  __View on Gateway__ and that's all!

![result1][im12]
![result2][im13]

[db2]: <http://wiki.ros.org/melodic/Installation>
[db3]: <https://dist.ipfs.io/go-ipfs/v0.4.22/go-ipfs_v0.4.22_linux-386.tar.gz>
[db4]: <https://github.com/airalab/robonomics/releases>
[im1]: <../images/baxter_demo/empty_world.jpg>
[im2]: <../images/baxter_demo/baxter_simulation.jpg>
[im3]: <../images/baxter_demo/robonomics.jpg>
[db5]: <https://parachain.robonomics.network>
[im4]: <../images/baxter_demo/local_node.jpg>
[im7]: <../images/baxter_demo/waiting.jpg>
[db6]: </docs/create-account-in-dapp>
[im8]: <../images/baxter_demo/rob_message.jpg>
[im9]: <../images/baxter_demo/working.jpg>
[im10]: <../images/baxter_demo/datalog.jpg>
[im11]: <../images/baxter_demo/ipfs.jpg>
[im12]: <../images/baxter_demo/result1.jpg>
[im13]: <../images/baxter_demo/result2.jpg>
[db7]: </docs/rio-overview>
