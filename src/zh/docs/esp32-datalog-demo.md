---
title: 如何从ESP32发送外部数据

contributors: [LoSk-p]
---

使用[robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp)在ESP32上发送Robonomics Network中的数据日志外部数据。您可以在[这里](https://github.com/LoSk-p/esp32-datalog-demo)找到演示代码。

### 要求

* Platformio核心（[安装说明](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)）。
* 任何适用于您操作系统的串行客户端（例如Linux上的`tio`）。您可以使用以下命令安装`tio`
```bash
sudo apt install tio
```
### 安装
克隆存储库：
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### 配置
在`src`文件夹中创建名为`Private.h`的文件，并填入以下内容：
```
#pragma once

// 设置真实的密钥和地址，而不是虚拟值
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
并使用您的Robonomics帐户和WiFi网络的信息填充它。`PRIV_KEY`是您的Robonomics帐户的私钥，`SS58_ADR`是其地址。

{% roboWikiNote {type: "warning"}%} 此演示仅适用于ED25519帐户！
{% endroboWikiNote %}

您可以使用[get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py)脚本从您的帐户种子短语中获取私钥。只需运行它并按照说明操作：
```bash
python3 get-private-key.py
```

### 上传
使用USB电缆将ESP32连接到计算机并构建项目：
```bash
cd esp32-datalog-demo
platformio run -t upload
```
此命令将为esp构建二进制文件并将其上传，因此最终您将看到以下内容
```
Writing at 0x000b9def... (84 %)
Writing at 0x000bf4c2... (87 %)
Writing at 0x000c56bf... (90 %)
Writing at 0x000cc6df... (93 %)
Writing at 0x000d1dec... (96 %)
Writing at 0x000d71b0... (100 %)
Wrote 836160 bytes (538555 compressed) at 0x00010000 in 12.2 seconds (effective 548.7 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
=========================== [SUCCESS] Took 24.08 seconds ===========================
```

### 运行

上传后，重新连接ESP到计算机并运行您的串行客户端（在本例中使用端口`/dev/ttyACM0`的`tio`）：
```bash
tio /dev/ttyACM0
```
并编写数据日志记录外部数据的文本。

您可以在上一节中`platformio run -t upload`命令后的日志中找到端口。查找类似以下内容的内容：
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```