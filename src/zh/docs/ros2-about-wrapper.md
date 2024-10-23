---
title: 关于Robonomics ROS 2包装器
contributors: [Fingerling42]
tools:   
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**在本文中，您将了解Robonomics ROS 2包装器包，该包允许您在任何ROS 2兼容的机器人上使用Robonomics平行链的所有功能。**

该包的理念是将[robonomics-interface](https://github.com/airalab/robonomics-interface)提供的Robonomics平行链API包装到ROS 2的节点中。目标是为ROS 2开发人员提供一种方便的方式，将其机器人或设备与平行链功能集成。机器人设备集成背后的逻辑是在Robonomics平行链中为其创建一个唯一地址，该地址用于控制设备或接收其遥测数据。

可用功能包括：

* **启动功能** — 启动设备以执行传递为字符串或文件的指定参数的任何命令。
* **数据日志功能** — 发布设备遥测以哈希形式发送到平行链。
* **使用 Robonomics 订阅** — 无需费用即可发送交易的能力。
* **安全文件存储** — 使用 [星际文件系统](https://ipfs.tech/) 来打包和解压数据，允许通过其唯一哈希访问文件。为了方便使用 IPFS，包含了 [Pinata](https://www.pinata.cloud/) 支持，允许固定 IPFS 文件以便快速下载。
* **文件加密和解密** — 使用公钥加密保护文件。

目前，该包装器可在 [Python 实现](https://github.com/airalab/robonomics-ros2/) 中找到。

## 包装器架构

从架构上看，该包装器由一个工作节点（具有必要的主题和服务）和一个基本节点类组成，可用于您特定的机器人。

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"ROS 2 Wrapper Architecture"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — 每个机器人的独特节点，作为连接到 Web3 的入口点。它包装了通过 Robonomics 发送数据日志和接收启动的服务，并允许下载/上传到 IPFS。该节点通过一个特殊文件进行配置，下文将对其进行描述。节点与特定机器人的关联可以是通过ROS命名空间指定。
* `robonomics_ros2_robot_handler` — 一个基于基本类`basic_robonomics_handler`的机器人特定节点，用于协调pubsub和机器人。它处理启动并决定何时发送数据日志以控制机器人。

## 安装包装器

要使用包装器，您需要以下软件：

* Linux操作系统发行版（通常为Ubuntu）
* ROS 2发行版
* IPFS节点
* Python 3（用于包装器的Python实现）

请按照[此处](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started)提供的安装指南，并检查所需软件的版本。下载所需组件后，您需要使用`colcon`实用程序将包装器构建为通常的ROS 2软件包。

## 配置连接到Web3云

在启动包装器之前，您需要设置您的机器人将如何连接到去中心化的Robonomics云和支持的Web3服务。为此，您需要编辑名为`robonomics_pubsub_params_template.yaml`的配置文件，该文件对于需要访问Robonomics的每个启动的机器人必须是唯一的。

该文件包含以下配置字段：

| 字段                 | 描述                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Robonomics平行链的账户种子                                                                              |
| crypto_type           | 您的账户类型，`ED25519`或`SR25519`                                                                      |
| remote_node_url       | Robonomics节点URL，默认为`wss://kusama.rpc.robonomics.network`，本地节点为`ws://127.0.0.1:9944`           |
| rws_owner_address     | 用于使用RWS模块的Robonomics订阅所有者的地址                                                            |
| ipfs_dir_path         | 包含IPFS文件的目录路径                                                                               |
| ipfs_gateway          | 用于下载文件的IPFS网关，例如`https://ipfs.io`                                                         |
| pinata_api_key        | 来自[Pinata](https://www.pinata.cloud/)的API密钥，用于IPFS的固定服务                                    |
| pinata_api_secret_key | 来自[Pinata](https://www.pinata.cloud/)的秘密API密钥，用于IPFS的固定服务                               |

要在Robonomics平行链上创建一个账户，请使用我们维基上的[以下指南](https://wiki.robonomics.network/docs/create-account-in-dapp/)。请注意创建的账户类型，因为SR25519类型的账户无法使用文件加密。

{% roboWikiNote {type: "warning", title: "警告"}%}

  种子短语是一种敏感信息，允许任何人使用您的帐户。确保不要将配置文件上传到GitHub或任何其他地方。
{% endroboWikiNote %}

请注意`remote_node_url`字段，因为它允许您选择如何连接到Robonomics平行链，包括本地连接。您可以部署用于测试和开发的本地Robonomics实例。有关如何执行此操作的说明，请参阅我们维基上的[此文章](https://wiki.robonomics.network/docs/run-dev-node/)。

如果您有一个Robonomics订阅，允许您免费发送交易，请将订阅所有者的地址插入`rws_owner_address`字段。不要忘记将您的帐户添加到您的订阅中。有关如何激活您的Robonomics订阅的说明有两个指南：通过[Robonomics dapp](https://wiki.robonomics.network/docs/sub-activate/)具有用户友好界面或通过[Robonomics Substrate门户](https://wiki.robonomics.network/docs/get-subscription/)。

`ipfs_gateway`参数允许您指定通过哪个网关下载IPFS文件。这些可以是[公共网关](https://ipfs.github.io/public-gateway-checker/)或专门的私人网关（例如在Pinata上获得的网关）。