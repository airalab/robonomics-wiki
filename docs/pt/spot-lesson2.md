---
title: Lesson 2. Remote controlled and programmed motion
locale: 'pt' 
contributors: [LoSk-p, khssnv]
translated: true
---

In the second lesson you will learn how to use Spot Command services and walk with Spot.

## The challenge

You have a list of points with their local coordinates in the `/home/student/lessons` directory. Spot should go through these points. The origin of the local coordinates is in the place where Spot was turned on. On each point Spot should make one of the motions from the following list, then go to the next point. 

The list of moves:
* To turn around himself
* To lie down in pose to change battery
* To nod
* To change the stance of robot's legs
* To go sideways to the next point

Create and execute a Python script that implements behavior described.

> You can find Spot local coordinates with:
> ```python
> get_vision_tform_body(robot_state_client.get_robot_state().kinematic_state.transforms_snapshot)
> ```

## Theory

You can control Spot with `Robot Command Service`. Firstly you need to build a command to supply it to the command service.
Spot SDK has a `RobotCommandBuilder` class for it.
Full list of methods and its descriprions you can find [here](https://github.com/boston-dynamics/spot-sdk/blob/7ce5c5f31f4e1e45e9ff4be29fb097e258b75919/python/bosdyn-client/src/bosdyn/client/robot_command.py#L593). 

In this lesson you may need to use:

* Stand Command

```python
def stand_command(params=None, body_height=0.0, 
                footprint_R_body=geometry.EulerZXY())
```

* Go to point

```python
def synchro_se2_trajectory_point_command(goal_x, goal_y, goal_heading,      
                                    frame_name, params=None,
                                    body_height=0.0,
                                    locomotion_hint=spot_command_pb2.HINT_AUTO,
                                    build_on_command=None)
```

Check usage example [here](https://github.com/boston-dynamics/spot-sdk/blob/master/python/examples/frame_trajectory_command/frame_trajectory_command.py).

* Velocity Command

```python
def synchro_velocity_command(v_x, v_y, v_rot, params=None, body_height=0.0,
                            locomotion_hint=spot_command_pb2.HINT_AUTO, 
                            frame_name=BODY_FRAME_NAME)
```

* Stance Command

```python
def stance_command(se2_frame_name, pos_fl_rt_frame, pos_fr_rt_frame, 
                        pos_hl_rt_frame,
                        pos_hr_rt_frame, accuracy=0.05, 
                        params=None, body_height=0.0,
                        footprint_R_body=geometry.EulerZXY(), 
                        build_on_command=None)
```

The example of use is [here](https://github.com/boston-dynamics/spot-sdk/blob/91ed30607264e795699995d6d7834ba0c8a94d36/python/examples/stance/stance_in_place.py)

* Pose to change battery

```python
def battery_change_pose_command(dir_hint=1)
```

Example of building and running velocity command:

```python
from bosdyn.client.robot_command import RobotCommandClient, RobotCommandBuilder
import time

command_client = robot.ensure_client(RobotCommandClient.default_service_name)
cmd = RobotCommandBuilder.velocity_command(0.5, 0, 0.5)
command_client.robot_command(cmd, end_time_secs=time.time() + 2)
```

## Practice

> Ensure you have Yggdrasil Network software running and configured as described in the [Lesson 0](/docs/spot-lesson0). Otherwise you will not have connection to the robot.
> On macOS you may need to launch Yggdrasil Network in the terminal:
> ```bash
> sudo yggdrasil -useconffile /etc/yggdrasil.conf
> ```

1. Connect to Spot from a terminal or using your development environment remote execution function.

```console
ssh student@strelka.ygg.merklebot.com
```

2. Develop and demonstrate your solution to the challenge.

We create [E-Stop endpoint](https://dev.bostondynamics.com/python/examples/estop/readme) for you, so you should not create it.
For Spot authentication use username and password from `/home/student/credentials` file.
Spot address is `192.168.50.3`.
