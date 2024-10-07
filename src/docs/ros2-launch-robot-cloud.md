---
title: Launch Robot from Cloud
contributors: [Fingerling42]
tools:   
  - Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**In this article, you will learn how to use the Robonomics launch function in ROS 2 through various examples**

The key feature of the Robonomics parachain for sending commands to devices is the launch extrinsic. This function allows you to send a string containing a parameter (in the form of 32-byte long hex value) to a specified address within the parachain. Typically, the string represents an IPFS hash that points to a file with the necessary parameters to execute the command. You can find more details about the launch function [in this article](https://wiki.robonomics.network/docs/launch/).

In the Robonomics ROS 2 Wrapper, the launch function is implemented as a service for sending commands and as a topic for receiving commands.

## Sending Launch

The service, called `robonomics/send_launch`, looks as follow:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # Just param string or file name with parameters that need to be uploaded to IPFS
string  target_address          # Address to be triggered with launch
bool    is_file         True    # Is a launch param a file that needs to be uploaded to IPFS (default is True)?
bool    encrypt_status  True    # Check whether the parameter file needs to be encrypted with the target address, default is True
---
string  launch_hash             # Hash of the launch transaction
```

{% endcodeHelper %}

The service accepts the following parameters as part of the request: a command parameter (either a simple string or the name of a file containing the command parameters), the target address in the Robonomics parachain for sending the launch, and two flags: one indicating whether the parameter is a file, and the other specifying whether the file should be encrypted (both are set to true by default). The file will be uploaded to IPFS, and its hash will be passed as the launch parameter. Therefore, the file must be placed in the directory designated for IPFS files, as specified in the configuration file for the `robonomics_ros2_pubsub` node.

By default, the file is encrypted using the public address of the launch recipient. The encryption method applied is public-key encryption based on Curve25519 elliptic curve cryptography. In the current implementation, encryption is only supported for account addresses of the ED25519 (Edwards) type (you can read more about this in [this article](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

After sending the launch, the service returns the transaction hash.

## Receiving Launch

Receiving launches is organized in the form of a corresponding topic. Technically, the node utilizes the robonomics-interface functionality to subscribe to the state of its own address and waits for the `NewLaunch` event to appear. Once the event occurs, the node publishes a message to the `robonomics/received_launch` topic. The message format is as follows:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # Address of account that sent launch command
string  param                   # String with param or name of file with parameters
```

{% endcodeHelper %}

The message fields contain the address from which the launch was sent and the parameter itself: either a simple string or the name of the file with parameters that was downloaded from IPFS and placed in the IPFS working directory. If the file was encrypted, it is decrypted during this process.


## Example with Turtlesim

Next, we will demonstrate how to use the launch function with [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) as an example. Turtlesim is a lightweight simulator designed for learning ROS 2. You can install it using the following command:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

The Robonomics ROS 2 Wrapper package includes a pre-built package called `turtlesim_robonomics`, specifically adapted for Turtlesim. This package allows you to test all the features of the wrapper. Let's give it a try and run it.

{% roboWikiNote {type: "warning", title: "Warning"}%}

  Please ensure that you have sufficient balance in your account or an active subscription to perform transactions.

{% endroboWikiNote %}

1. To begin, create a configuration file for the pubsub instance of `turtlesim_robonomics` using the `config/robonomics_pubsub_params_template.yaml` template. Fill in the appropriate fields with your Robonomics credentials (account seed, crypto type, subscription owner address). Also, specify a directory for IPFS files. Once completed, rename the file, for example, `first_pubsub_params.yaml`.

2. Launch IPFS Daemon:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. Run the following ROS 2 launch file. It will start all the necessary nodes: Turtlesim itself, the wrapper implementation for Turtlesim, and the Robonomics pubsub:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params.yaml namespace:='turtlesim1'
```

{% endcodeHelper %}

You will see the simulator with the turtle, along with ROS 2 logs in the console displaying the IPFS ID, the path to the directory with IPFS files, the Robonomics address, and other relevant information.

### Launch Turtlesim from Polkadot portal

1. Turtlesim is controlled via the `/cmd_vel` topic, so you need to prepare the corresponding messages and include them in a file, which will be used as the launch parameter. For convenience, these messages are prepared in a JSON file. Create a file (e.g., `turtle_cmd_vel.json`) and paste the following:

  {% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
    }
  ]
  ```

  {% endcodeHelper %}

  This JSON example will command the turtle to move twice.

2. Next, the file needs to be uploaded to IPFS. You can choose any method, but for this example, we will use IPFS Kubo. Open a terminal in the directory where the JSON file is located and upload it to IPFS:

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  You will receive the IPFS hash of the file. Be sure to save it for later use.

3. Before sending the launch, the IPFS hash must be converted to a 32-byte long string. This can be done using a few Python commands. Open a terminal, launch the Python 3 interpreter, and run the following commands:

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  Save the resulting string for later use.

4. Open the Robonomics [Polkadot/Substrate portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) and navigate to the **Developers** -> **Extrinsics** tab. Select the extrinsic `launch` -> `launch(robot, param)`. In the `robot` field, insert the address of your robot, and in the `param` field, insert the string with the converted IPFS hash. Submit the transaction.


5. Go to the Turtlesim simulator. After successfully sending the transaction, the turtle should begin moving.


### Launch Turtlesim from ROS 2 Command Line Tools

1. Now let's try to send a launch to Turtlesim from another ROS 2 pubsub node. First, create another configuration file (e.g., `second_pubsub_params.yaml`) with different Robonomics credentials and a separate IPFS directory.

2. In a separate terminal, run a new `robonomics_ros2_pubsub` node using the new configuration file:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. Place the JSON file containing the commands for Turtlesim (`turtle_cmd_vel.json`) into the IPFS directory of the new pubsub.

4. Before sending the launch, let's set up monitoring to observe how `turtlesim_robonomics` receives data upon arrival. To do this, in a separate terminal, subscribe to the corresponding topic:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 topic echo /turtlesim1/robonomics/received_launch
  ```

  {% endcodeHelper %}

  {% roboWikiNote {type: "warning", title: "Launch Param as String"}%}

    By default, the launch handler expects an IPFS hash of a file as a parameter. If you need the pubsub to handle the parameter as a regular string, you must change the corresponding ROS 2 node parameter `launch_is_ipfs` from `True` to `False`. You can do this using the command `ros2 param set`.

  {% endroboWikiNote %}

5. Now, we need to call the ROS 2 service to send the launch. In a separate terminal, use the following command:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'YOUR_TURTLESIM_ADDRESS'"}
  ```

  {% endcodeHelper %}

  You will see the pubsub logs displaying details of the launch submission.

6. Go to the Turtlesim simulator. After successfully sending the transaction, the turtle should start moving. Additionally, in the logs of the subscribed topic, you should see information about the received data.


### Launch Turtlesim from Another Node

1. Now, let's try creating a test node that will wait for the launch to arrive and then forward it to Turtlesim. You can use the ready-made test package `test_robot_robonomics`. Copy this package to your ROS 2 workspace.

2. Open the node file located at `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` in any text editor, and add the following code after the `__init__` function:

  {% codeHelper { copy: true}%}

  ```python
  def launch_file_subscriber_callback(self, msg) -> None:
      super().launch_file_subscriber_callback(msg)

      transaction_hash = self.send_launch_request(self.param, target_address='YOUR_TURTLESIM_ADDRESS', is_file=True, encrypt_status=True)

      self.get_logger().info('Sent launch to the turtle with hash: %s ' % str(transaction_hash))
  ```
  {% endcodeHelper %}

  This function will first process the received launch and then use its parameter to send a new launch to Turtlesim.

3. Build the package using `colcon`, and then source its setup files.

4. Run the ROS 2 launch file of the test package with the second pubsub credentials:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```

  {% endcodeHelper %}

5. Now, send a launch with the `turtle_cmd_vel.json` parameters to the test node’s address, for example, via the Polkadot/Substrate portal. Before doing this, ensure that Turtlesim is still running. The test node should receive the launch and then send a new one with the same parameters, causing the turtle in Turtlesim to start moving.
