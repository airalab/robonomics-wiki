---
title: Lesson 3. Find and follow an object, navigate between them
locale: 'ko' 
contributors: [LoSk-p, khssnv]
translated: false
---

In the third lesson you will learn how to find World Objects and go to them.

## The challenge

You start with Spot in the place with some fiducials (a mark on the object) around. Create and execute Python script detects at least two fiducials and moves Spot to each of them within 1 m.

## Theory

Spot has the World Object Service that provides a way to track and store objects detected in the world around Spot. A world object is considered a higher-level item in the scene that has some amount of semantic information associated with it. More information you can find in [Robot Services](https://dev.bostondynamics.com/docs/concepts/robot_services#world-object) tab in Spot SDK documentation.

Using world object service you can find fiducials near the Spot. 

> Spot can find objects around faster if he stands.

In the task you will need find fiducials' coordinates and go to them. You already know how to move to the local coordinates from the [Lesson 2](/docs/en/spot-lesson2.md). The example of how to find a fiducial and it's coordinates is in [fiducial_follow example](https://github.com/boston-dynamics/spot-sdk/blob/7ce5c5f31f4e1e45e9ff4be29fb097e258b75919/python/examples/fiducial_follow/fiducial_follow.py).

In your script, firstly, you need to find fiducial object with World Object Service:

```python
fiducial_objects = world_object_client.list_world_objects(
            object_type=[world_object_pb2.WORLD_OBJECT_APRILTAG]).world_objects
```

Then get fiducial coordinates in a visual frame:

```python
fiducial = fiducial_objects[0]
vision_tform_fiducial = get_a_tform_b(fiducial.transforms_snapshot, VISION_FRAME_NAME,fiducial.apriltag_properties.frame_name_fiducial.to_proto()
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
