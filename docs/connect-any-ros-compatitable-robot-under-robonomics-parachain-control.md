# Connect any ROS-compatitable robot under Robonomics parachain control

**In this article we will show that with the help of Robonomics tools you can control any ROS-compatitable device. We will find a random drone simulation package on the web and adjust it to run with Robonomics.**
**Requirements:**
- Ubuntu 18.04 LTS
- ROS Melodic + Gazebo + RViz (installation manual [here](http://wiki.ros.org/melodic/Installation))
- Robonomics node (binary file) (download latest release [here](https://github.com/airalab/robonomics/releases))

Here is the video showing successful launch:
## 1. Find a simulation
Let's surf the web. Google for `ROS drone simulator`. The first link will most likely show you the `tum_simulator` page on [http://wiki.ros.org/tum_simulator](http://wiki.ros.org/tum_simulator)

![tum_simulator](./images/drone-demo/tum_simulator.jpg "tum_simulator")

It's pretty outdated, so we better find a fork for our system. Google for `tum_simulator Ubuntu 18 Gazebo 9 fork`. This will result in a GitHub [repo](https://github.com/tahsinkose/sjtu-drone) with an appropriate package. Dowload it
```
mkdir -p drone_simulator_ws/src
cd drone_simulator_ws/src
git clone https://github.com/tahsinkose/sjtu-drone
cd ..
catkin build
```
Don’t forget to add source command to `~/.bashrc`:
```
echo "source /home/$USER/drone_simulator_ws/devel/setup.bash" >> ~/.bashrc
source "~/.bashrc"
```
Now we can run the simulation to see what do we need to do to take the drone under parachain control.
```
roslaunch sjtu_drone simple.launch
```

## 2. Inspect ROS topics
When the simulation is runnung, in a new tab run the following command to see the list of topics used by the drone:
```
rostopic list
```
Let's take a look at `/cmd_vel`, `/drone/takeoff` and `/drone/land`:
```
rostopic info /cmd_vel
rostopic info /drone/takeoff
rostopic info /drone/land
```

![topics_info](./images/drone-demo/topics_info.jpg "topics_info")

Shut the simulation for a while.
## 3. Create a new package 
Let's create a package and a script file inside `~/drone_simulator_ws/src`. As seen from topics' info we need `Twist` and `Empty` message types. Since they are parts of `std_msgs` and `geometry_msgs`, mention them as dependencies:
```
cd ~/drone_simulator_ws/src
catkin_create_pkg drone_simulator_controller rospy std_msgs geometry_msgs
cd drone_simulator_controller/src
touch drone_sample_controller.py
chmod +x drone_sample_controller.py
```
Open the file and let's make the drone fly. First things first, modules.
```python
#!/usr/bin/env python

import ConfigParser #to parse config file with drone and employer's addresses and keys
import os #to locate files
import rospy #Python client library for ROS
import subprocess #to call shell commands from terminal and use robonomics binary
import threading #threading to publish topics
import time #to sleep

from geometry_msgs.msg import Twist #message type for /cmd_vel
from std_msgs.msg import Empty #message type for /drone/takeoff and /drone/land
```
Let's then specify `takeoff` and `land` functions. Basically, they are the simpliest [ROS publishers](http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28python%29):
```python
def takeoff():
    rospy.loginfo("Taking Off")
    takeoff = rospy.Publisher('drone/takeoff', Empty, queue_size=10)

    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        takeoff.publish()
        if stop_takingoff:
            break
        rate.sleep()
        
def land():

    rospy.loginfo("Landing")
    land = rospy.Publisher('drone/land', Empty, queue_size=10)

    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        land.publish()
        if stop_landing:
            break
        rate.sleep()
```
Fly function is a little tircky, we need to specify all the parameters of the message and add a stop option when we finish the motion.
```python
def fly():

    rospy.loginfo("Flying")
    move = rospy.Publisher('cmd_vel', Twist, queue_size=10)

    circle_command = Twist()
    circle_command.linear.x = 1.0
    circle_command.linear.y = 0.0
    circle_command.linear.z = 0.0

    circle_command.angular.x = 0.0
    circle_command.angular.y = 0.0
    circle_command.angular.z = 0.4

    rate = rospy.Rate(10)
    while not rospy.is_shutdown():
        move.publish(circle_command)
        if stop_flying:
            circle_command.linear.x = 0.0
            circle_command.angular.z = 0.0
            move.publish(circle_command)
            break
        rate.sleep()
```
Before going further, let's create a config file next to the python script in the src folder:
```
touch config.config
```
It should contain the name of the block of parameters and the parameters themselves:
```
[key_and_addresses]
DRONE_ADDRESS =  #get it from Robonomics portal
DRONE_KEY =  #get it from Robonomics portal
EMPLOYER_ADDRESS =  #get it from Robonomics portal
EMPLOEYR_KEY =  #get it from Robonomics portal
ROBONOMICS_DIR =  #path to robonomics_binary
```
We'll fill in the file later. Now let's go back to the script. The first step of main body is to initialize the node to enable logs and parse the config file.
```python
rospy.init_node('drone_controller', anonymous = False)
rospy.loginfo('Node initialized')

#waiting for transaction
rospy.loginfo("Parsing Config")
dirname = os.path.dirname(__file__) + '/../'
configParser = ConfigParser.RawConfigParser()
configFilePath = dirname + 'src/config.config'
configParser.read(configFilePath)
rospy.loginfo("Parsing Completed")
```
Then we implement the transaction checking block using [Robonomics IO](https://wiki.robonomics.network/docs/rio-overview/) features. The script won't run furhter, until the `"if"` condition is met:
```python
rospy.loginfo("Waiting for flight payment")

program = configParser.get('key_and_addresses', 'ROBONOMICS_DIR') + "/robonomics io read launch" #that's the bash command to launch Robonomics IO and read the transactions
process = subprocess.Popen(program, shell=True, stdout=subprocess.PIPE)
while True:
    try:
        output = process.stdout.readline()
        if output.strip() == configParser.get('key_and_addresses', 'EMPLOYER_ADDRESS') + " >> " + configParser.get('key_and_addresses', 'DRONE_ADDRESS') + " : true": #checking the correct payment to the drone address
            rospy.loginfo("Flight Paid!")
            process.kill()
            break #after that the script will continue running
        if output.strip():
            rospy.loginfo("Not my flight is paid!")
    except KeyboardInterrupt:
        process.kill()
        exit
```
And last but not least is the simple motion script. We will use threading module to face the ROS publisher and subscriber function requirements.
```python
takingoff = threading.Thread(target=takeoff)
flying = threading.Thread(target=fly)
landing = threading.Thread(target=land)

stop_takingoff = False
stop_flying = False
stop_landing = False #flages used to stop threads

takingoff.start()
time.sleep(1)
stop_takingoff = True
takingoff.join()

flying.start()
time.sleep(10)
stop_flying = True
flying.join()

landing.start()
time.sleep(1)
stop_landing = True
landing.join()
```
Save the file and go on to managing parachain accounts
## 4. Manage accounts in DAPP
Since we are testing, let's create a local robonomics network node with robonomics binary file:
```
./robonomics --dev 
```
**Important!** Before next launches it is necessary to remove a directory `db` with

```
rm -rf /home/$USER/.local/share/robonomics/chains/dev/db
```
After a successful launch go to https://parachain.robonomics.network and switch to local node:

![local_node](./images/drone-demo/local_node.jpg "local_node")

Go to Accounts and create **DRONE** and **EMPLOYER** accounts. **Important**! Copy each account's raw key and address (to copy address click on account's icon) and add these addresses, keys and path to robonomics binary file to file `config.config` in `drone_simulator_ws/src/drone_simulator_controller/src`. Transfer some money (units) to these accounts:

![balances](./images/drone-demo/balances.jpg "balances")
### 5. Launching the drone under parachain control
Up to now the **only thing running** should be the robonomics local node. In a separate terminal launch drone simulation:
```
roslaunch sjtu_drone simple.launch
```
Run the script:
```
rosrun drone_simulator_controller drone_sample_controller.py
```

![launched_drone](./images/drone-demo/launched_drone.jpg "launched_drone")

Now you can send a transaction triggering the drone to start flying. To do so, you should use the Robonomics IO `write` subcommand of robonomics binary file:
```
echo "ON" | ./robonomics io write launch -r <DRONE_ADDRESS> -s <EMPLOYER’S_KEY>
```
Where `<DRONE_ADDRESS>`  and `<EMPLOYER’S_KEY>` are replaced with  previously saved strings accordingly.
You should see the log `"Taking Off"` and the drone should start Flying:

![flying](./images/drone-demo/flying.jpg "flying")

That's how any ROS-compatitable robot can be controlled by Robonomics parachain control.




