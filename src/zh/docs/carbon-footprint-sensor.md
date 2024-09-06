---
title: 连接传感器

contributors: [LoSk-p, makyul]
---

工作示例在视频中：

https://youtu.be/jsaFCVAx2sA

## 要求

* [Aqara智能插头](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* 树莓派
* Zigbee适配器 [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/)（或其中一个[支持的](https://www.zigbee2mqtt.io/information/supported_adapters.html)）

服务在树莓派上运行，并通过zigbee协议与智能插头联系。

## Zigbee适配器

如果您有JetHome USB JetStick Z2，则已经具有必要的固件，因此无需刷新。但如果您有另一个适配器，首先需要使用zigbee2MQTT软件刷新它。您可以在[这里](https://www.zigbee2mqtt.io/information/supported_adapters.html)找到您设备的说明。

连接适配器并验证适配器地址（也可能是`/dev/ttyUSB1`）：
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

您可能需要先访问USB端口。将您的用户添加到`dialout`组（对于ubuntu有效，但其他操作系统上该组的名称可能不同）。
对于ubuntu：
```bash
sudo usermod -a -G dialout $USER
```
对于arch：
```bash
sudo usermod -a -G uucp $USER
```
然后注销并重新登录或重新启动计算机。

## 安装

克隆存储库：

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## 配置

转到`data/configuration.yaml`并设置`permit_join: true`：

```
# Home Assistant集成（MQTT发现）
homeassistant: false

# 允许新设备加入
permit_join: true

# MQTT设置
mqtt:
  # zigbee2mqtt MQTT消息的MQTT基本主题
  base_topic: zigbee2mqtt
  # MQTT服务器URL
  server: 'mqtt://172.17.0.1'
  # MQTT服务器身份验证，如果需要，请取消注释：
  # user: my_user
  # password: my_password

# 串行设置
serial:
  # CC2531 USB监听器的位置
  port: /dev/ttyUSB0
```
您可能还想要填写`server`和`port`字段与相应信息。在`server`字段中使用`docker0`桥的IP建立连接：

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
这里您的地址是`172.17.0.1`。

然后创建文件`config/config.yaml`，填写以下信息并设置您的位置（您可以查看https://countrycode.org/获取3个字母的ISO代码）：

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## 连接插头

首先运行：

```
docker-compose up     
```

要将插头切换到配对模式，请长按电源按钮几秒，直到灯开始快速闪烁蓝色。

在日志中，您现在应该看到您的插头开始发布到mqtt。

## 配对后

如果您不希望其他设备与您的适配器配对，现在应该去`data/configuration.yaml`并设置`permit_join: false`。重新启动服务（使用'Ctrl+C'和

```bash
docker-compose up     
```
再次提交更改）。

## 运行
在首次启动时，将创建插头的帐户。
> 如果您已经有一个帐户，您应该将其种子添加到`config.config.yaml`文件的`device_seed`部分：
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

创建帐户后，您将在日志中看到地址（种子将添加到`config/config.yaml`）：
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
您需要向此帐户转移一些代币以支付交易费用，您可以在[Robonomics门户](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts)上执行此操作。

服务将看到您有足够的代币，您将在日志中看到：
```
plug               | Balance is OK
```
服务将查看来自插头的mqtt消息并安全地使用电力。每小时（您可以在`config/config.yaml`的`sending_timeout`部分更改超时，超时以秒为单位）它将创建包含以下信息的数据日志：
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```