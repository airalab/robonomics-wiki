---
title: 从云端启动机器人
contributors: [Fingerling42]
tools:   
  - Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**在本文中，您将学习如何通过各种示例在ROS 2中使用Robonomics启动功能**

Robonomics平行链用于向设备发送命令的关键功能是启动外部函数。此功能允许您发送一个包含参数的字符串（以32字节长的十六进制值形式）到平行链中的指定地址。通常，该字符串代表一个指向包含执行命令所需参数的文件的IPFS哈希。您可以在[本文](https://wiki.robonomics.network/docs/launch/)中找到有关启动功能的更多详细信息。

在Robonomics ROS 2 Wrapper中，启动功能被实现为用于发送命令的服务和用于接收命令的主题。

## 发送启动

名为`robonomics/send_launch`的服务如下所示：

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # 只是参数字符串或包含需要上传到IPFS的参数的文件名
string  target_address          # 要触发启动的地址
bool    is_file         True    # 是否为启动参数要上传到IPFS的文件（默认为True）吗？
bool encrypt_status True # 检查参数文件是否需要使用目标地址加密，默认为True
---
string launch_hash # 启动交易的哈希值
```

{% endcodeHelper %}

服务接受以下参数作为请求的一部分：命令参数（可以是简单字符串或包含命令参数的文件名），用于发送启动的Robonomics平行链中的目标地址，以及两个标志：一个指示参数是否为文件，另一个指定文件是否应加密（默认都设置为true）。文件将被上传到IPFS，并且其哈希值将作为启动参数传递。因此，文件必须放在专门用于IPFS文件的目录中，如`robonomics_ros2_pubsub`节点的配置文件中指定的那样。

默认情况下，文件将使用启动接收者的公共地址进行加密。应用的加密方法是基于Curve25519椭圆曲线密码学的公钥加密。在当前实现中，仅支持ED25519（Edwards）类型的帐户地址进行加密（您可以在[此文章](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)中了解更多信息）。

发送启动后，服务将返回交易哈希值。

## 接收启动

接收启动以相应主题的形式组织。从技术上讲，节点利用robonomics-interface功能订阅自己地址的状态，并等待`NewLaunch`事件的出现。一旦事件发生，节点将向`robonomics/received_launch`主题发布消息。消息格式如下：

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # 发送启动命令的帐户地址
string  param                   # 带有参数或参数文件名称的字符串
```

{% endcodeHelper %}

消息字段包含发送启动命令的地址以及参数本身：可以是简单字符串，也可以是从IPFS下载并放置在IPFS工作目录中的参数文件的名称。如果文件已加密，则在此过程中将对其进行解密。


## 以Turtlesim为例

接下来，我们将演示如何使用[Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html)作为示例来使用启动功能。Turtlesim是专为学习ROS 2设计的轻量级模拟器。您可以使用以下命令安装它：

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

Robonomics ROS 2包中包含一个名为`turtlesim_robonomics`的预构建包，专门为Turtlesim定制。该包允许您测试包装器的所有功能。让我们试一试并运行它。

{% roboWikiNote {type: "warning", title: "警告"}%}

  请确保您的帐户中有足够的余额或者有一个活跃的订阅以执行交易。

{% endroboWikiNote %}

1. 首先，使用`config/robonomics_pubsub_params_template.yaml`模板为`turtlesim_robonomics`的pubsub实例创建一个配置文件。填写Robonomics凭据（帐户种子、加密类型、订阅所有者地址）中的适当字段。还要指定一个IPFS文件目录。完成后，将文件重命名为，例如，`first_pubsub_params.yaml`。

2. 启动IPFS守护程序：

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. 运行以下ROS 2启动文件。它将启动所有必要的节点：Turtlesim本身、Turtlesim的包装器实现以及Robonomics pubsub：

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params
```.yaml namespace:='turtlesim1'
```

{% endcodeHelper %}

您将在控制台中看到带有乌龟的模拟器，显示IPFS ID、带有IPFS文件的目录路径、Robonomics地址和其他相关信息的ROS 2日志。

### 从Polkadot门户启动Turtlesim

1. Turtlesim通过`/cmd_vel`主题进行控制，因此您需要准备相应的消息并将其包含在一个文件中，该文件将用作启动参数。为了方便起见，这些消息已经准备在一个JSON文件中。创建一个文件（例如，`turtle_cmd_vel.json`）并粘贴以下内容：

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
```    }
  ]
  ```

  {% endcodeHelper %}

  这个 JSON 示例将命令乌龟移动两次。

2. 接下来，文件需要上传到 IPFS。您可以选择任何方法，但在这个示例中，我们将使用 IPFS Kubo。在存放 JSON 文件的目录中打开终端，并将其上传到 IPFS：

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  您将收到文件的 IPFS 哈希。请务必保存以备后用。

3. 在发送启动之前，IPFS 哈希必须转换为一个 32 字节长的字符串。这可以通过几个 Python 命令完成。打开终端，启动 Python 3 解释器，并运行以下命令：

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  保存生成的字符串以备后用。

4. 打开 Robonomics [Polkadot/Substrate 门户](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) 并导航前往**开发者** -> **外部函数**选项卡。选择外部函数 `launch` -> `launch(robot, param)`。在 `robot` 字段中，插入您的机器人地址，在 `param` 字段中，插入包含转换后的IPFS哈希的字符串。提交交易。

5. 进入Turtlesim模拟器。成功发送交易后，乌龟应该开始移动。

### 从ROS 2命令行工具启动Turtlesim

1. 现在让我们尝试从另一个ROS 2 pubsub节点向Turtlesim发送一个启动。首先，创建另一个配置文件（例如，`second_pubsub_params.yaml`），其中包含不同的Robonomics凭据和一个单独的IPFS目录。

2. 在另一个终端中，使用新的配置文件运行一个新的 `robonomics_ros2_pubsub` 节点：

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. 将包含Turtlesim命令的JSON文件（`turtle_cmd_vel.json`）放入新pubsub的IPFS目录中。

4. 在发送启动之前，让我们设置监视以观察 `turtlesim_robonomics` 如何接收。数据到达后。为此，在单独的终端中，订阅相应的主题：

{% codeHelper { copy: true}%}

```shell
ros2 topic echo /turtlesim1/robonomics/received_launch
```

{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"}%}
默认情况下，启动处理程序期望文件的IPFS哈希作为参数。如果您需要pubsub将参数处理为常规字符串，必须将相应的ROS 2节点参数`launch_is_ipfs`从`True`更改为`False`。您可以使用`ros2 param set`命令执行此操作。
{% endroboWikiNote %}

5. 现在，我们需要调用ROS 2服务以发送启动。在单独的终端中，使用以下命令：

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'YOUR_TURTLESIM_ADDRESS'"}
```

{% endcodeHelper %}

您将看到pubsub日志显示启动提交的详细信息。

6. 转到 Turtlesim 模拟器。成功发送交易后，乌龟应该开始移动。此外，在订阅主题的日志中，您应该会看到有关已接收数据的信息。

### 从另一个节点启动Turtlesim

1. 现在，让我们尝试创建一个测试节点，该节点将等待启动到达，然后将其转发到Turtlesim。您可以使用现成的测试包`test_robot_robonomics`。将此包复制到您的ROS 2工作空间中。

2. 在任何文本编辑器中打开位于`test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py`的节点文件，并在`__init__`函数之后添加以下代码：

{% codeHelper { copy: true}%}

   ```python
   def launch_file_subscriber_callback(self, msg) -> None:
       super().launch_file_subscriber_callback(msg)

       transaction_hash = self.send_launch_request(self.param, target_address='YOUR_TURTLESIM_ADDRESS', is_file=True, encrypt_status=True)

       self.get_logger().info('Sent launch to the turtle with hash: %s ' % str(transaction_hash))
   ```
{% endcodeHelper %}

   此函数将首先处理接收到的启动，然后使用其参数向Turtlesim发送新的启动。

3. 使用`colcon`构建包，然后源化其设置文件。

4. 使用第二个pubsub凭据运行测试包的ROS 2启动文件：

  {% codeHelper { copy: true}%}

  ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```

  {% endcodeHelper %}

5. 现在，将带有 `turtle_cmd_vel.json` 参数的启动发送到测试节点的地址，例如，通过 Polkadot/Substrate 门户。在执行此操作之前，请确保 Turtlesim 仍在运行。测试节点应该接收到启动，然后发送一个带有相同参数的新启动，导致 Turtlesim 中的小乌龟开始移动。