---
title: About Robonomics ROS 2 Wrapper
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

**In this article, you will learn about the Robonomics ROS 2 Wrapper package, which allows you to use all the features of the Robonomics parachain for any ROS 2 compatible robot.**

The idea of ​​the package is to wrapping the Robonomics parachain API provided by [robonomics-interface](https://github.com/airalab/robonomics-interface) into nodes of ROS 2. The goal is to provide ROS 2 developers with a convenient way to integrate their robots or devices with parachain features. The logic behind the integration of a robotic device is that a unique address is created for it in the Robonomics parachain, which is used to control the device or receive its telemetry.

Available features include:

* **Launch function** — launching a device to execute any command with a specified set of parameters passed as a string or a file.
* **Datalog function** — publishing device telemetry in a form of hash to parachain.
* **Usage of Robonomics subscription** — the ability to send transactions without a fee.
* **Secure file storage** — to pack and unpack data, [InterPlanetary File System](https://ipfs.tech/) is used, which allows to access files by their unique hash. For convenient usage of IPFS, [Pinata](https://www.pinata.cloud/) support included, which allows to pin IPFS files for fast downloading.
* **File encryption and decryption** — protection of files with public key encryption.

Currently, the wrapper is available in [Python implementation](https://github.com/airalab/robonomics-ros2/).

## Wrapper Architecture

Architecturally, the wrapper consists of a worker node (with the necessary topics and services) and a basic node class that can be used for your specific robots.

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"ROS 2 Wrapper Architecture"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — a unique node for each robot that serve as an entrance point to Web3. It wraps the services for sending datalogs and receiving launches via Robonomics and allows files to be downloaded/uploaded to IPFS. This node is configured by a special file, which is described below. A node's affiliation with a specific robot can be specified via the ROS namespace.
* `robonomics_ros2_robot_handler` — a robot-specific node based on a basic class `basic_robonomics_handler` for coordinating pubsub and the robot. It processes launches and decides when to send datalogs for controlling the robot.

## Installing the Wrapper

To work with the wrapper you need the following software:

* Linux OS distribution (usually, Ubuntu)
* ROS 2 distribution
* IPFS node
* Python 3 (for Python implementation of the wrapper)

Please follow the installation guide available [here](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started) and check needed versions of the software. After downloading the required components, you will need [to build](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#installation-and-building) the wrapper as a usual ROS 2 package using the `colcon` utility.

## Configuring Connections to Web3 Cloud

Before starting wrapper, you need to set up how exactly your robot will connect to the decentralized Robonomics cloud and supporting Web3 services. To do this, you need to edit the file a configuration file called `robonomics_pubsub_params_template.yaml`, which must be unique for each launched robot that needs to access Robonomics.

The file contains the following configuration fields:

| Field                 | Description                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Account seed of Robonomics parachain                                                                       |
| crypto_type           | Type of your account, `ED25519` or `SR25519`                                                               |
| remote_node_url       | Robonomics node url, default is `wss://kusama.rpc.robonomics.network`, for local node `ws://127.0.0.1:9944`|
| rws_owner_address     | An address of Robonomics subscription owner to use RWS module                                              |
| ipfs_dir_path         | A path of directory to contain IPFS files                                                                  |
| ipfs_gateway          | IPFS gateway to download files, e.g. `https://ipfs.io`                                                     |
| pinata_api_key        | API key from [Pinata](https://www.pinata.cloud/) pinning service for IPFS                                  |
| pinata_api_secret_key | Secret API key from [Pinata](https://www.pinata.cloud/) pinning service for IPFS                           |

To create an account on the Robonomics parachain, please use [the following guide](https://wiki.robonomics.network/docs/create-account-in-dapp/) on our wiki. Please pay attention to the type of account you create, as accounts with SR25519 type cannot use file encryption.

{% roboWikiNote {type: "warning", title: "Warning"}%}

  The seed phrase is sensitive information that allows anyone to use your account. Make sure you don't upload a config file with it to GitHub or anywhere else.

{% endroboWikiNote %}

Pay attention to the `remote_node_url` field, as it allows you to choose how exactly to connect to the Robonomics parachain, including locally. You can deploy your local Robonomics instance for testing and development. Instructions on how to do this are available in [this article](https://wiki.robonomics.network/docs/run-dev-node/) on our wiki.

If you have a Robonomics subscription that allows you to send transactions without fees, please insert the address of the subscription owner to the `rws_owner_address` field. Don't forget that your account must be added to your subscription. Instructions on how to activate your Robonomics subscription are available in two guides: via [Robonomics dapp](https://wiki.robonomics.network/docs/sub-activate/) with user-friendly interface or via [Robonomics Substrate portal](https://wiki.robonomics.network/docs/get-subscription/).

 The `ipfs_gateway` parameter allows you to specify the gateway through which IPFS files will be downloaded. These can be either [public gateways](https://ipfs.github.io/public-gateway-checker/) or specialized private ones (for example, those obtained on Pinata)
