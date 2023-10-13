---
title: 连接传感器

contributors: [LoSk-p, makyul]
---

工作示例在视频中：

https://youtu.be/jsaFCVAx2sA

## 要求

* [Aqara智能插座](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* Raspberry Pi
* Zigbee adapter [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (或其中之一 [支持](https://www.zigbee2mqtt.io/在部分中，超时是以秒为单位的，它将创建包含以下信息的数据日志：formation/supported_adapters.html))

服务在 Raspberry Pi 上运行，并通过 zigbee 协议联系智能插头。

## Zigbee棒

如果您有JetHome USB JetStick Z2，则已经具备必要的固件，因您不需要刷新它。但是，如果您有另一个适配器，首先需要使用zigbee2MQTT软件刷新它。您可以在您的设备上找到说明 [这里](https://www.zigbee2mqtt.io/information/supported_adapters.html).

连接适配器并验证适配器地址 (它也可能是 `/dev/ttyUSB1`):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

您可能需要先访问 USB 端口。 将您的用户添加到 `dialout` 组（在ubuntu上有效，但是在其他操作系统上组的名称可能不同）。

对于ubuntu：
```bash
sudo usermod -a -G dialout $USER
```
对于arch：
```bash
sudo usermod -a -G uucp $USER
```
然后注销并登录或重新启动计算机。

## 安装

克隆存储库：

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## 配置

转到 `data/configuration.yaml` 并设置 `permit_join: true`:

```
# Home Assistant integration (MQTT discovery)
homeassistant: false

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://172.17.0.1'
  # MQTT server authentication, uncomment if required:
  # user: my_user
  # password: my_password

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/ttyUSB0
```
此外，您可能想用相应的信息填充字段 `server` 和 `port`。 在 `server` 字段中使用 `docker0` 网桥的 IP 来建立连接：

```bash
$ ip a                                                 127
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

...

5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:dff:feff:5fa3/64 scope link 
       valid_lft forever preferred_lft forever
```

这里你的地址是 `172.17.0.1`。

然后使用以下信息创建文件 config/config.yaml 并设置您的位置（您可以查找 https://countrycode.org/ 获取 3 个字母的 ISO 代码）：

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## 连接插头

第一次运行：

```
docker-compose up     
```

要切换到插头上的配对模式，请长按电源按钮几秒钟，直到指示灯开始快速闪烁蓝色。

在日志中，您现在应该看到您的插件开始发布到 mqtt。 


## 配对后

如果您不想让其他设备与您的棒配对，现在您应该转到 `data/configuration.yaml` 并设置`permit_join: false`。 重新启动服务（使用 `Ctrl+C` 并

```bash
docker-compose up     
```
再次提交更改）。

## 跑步

首次启动时，将创建该插件的帐户。
> 如果您已经有一个帐户，则应将其种子添加到 `device_seed` 部分中的 `config.config.yaml`文件中：
>
> ```
> location: RUS
> service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
> twin_id: 5
> sending_timeout: 3600
> broker_address: "172.17.0.1"
> broker_port: 1883
> device_seed: <device_seed>
>```

创建帐户后，您将在日志中看到地址（种子将添加到 `config/config.yaml`）:

```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
您需要向该账户转入一些代币作为交易费用，您可以在 [Robonomics Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts) 上进行. 

服务将看到您有足够的令牌，在日志中您将看到：
```
plug               | Balance is OK
```
服务将看到来自插头的 mqtt 消息和安全用电情况。 每小时（您可以在 `sending_timeout` 部分更改 `config/config.yaml` 中的超时，超时以秒为单位）它将创建包含以下信息的数据日志：

```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
