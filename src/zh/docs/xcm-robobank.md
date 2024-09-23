---
title: Substrate Cumulus Parachain Testsuite for cross-chain messaging 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


该项目的主要目标是简化当使用跨链消息时的平行链运行时开发。
它允许开发带有高度可重复性和简单使用的集成测试的运行时代码。
它自动构建、构造预设网络配置（即1个中继链+2个平行链）、在平行链之间设置消息传递通道并运行消息测试，发送消息，使用对运行时的调用，所有这些都是用Python构建和组合的。

XCM测试套件用于测试Robobank的生产周期 - 一组Substrate托盘，允许机器人在外部平行链上注册，接收预付订单，执行它们并使用外部代币接收付款。这使得机器人可以在Robonomics网络内运行，具备所有必要的基础设施，但同时也可以在任何其他平行链上提供其服务。

可在[YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)上观看示例视频。

演示方案中的主要步骤包括：
- 在6个进程包中启动中继链和两个平行链
- 在平行链之间设置XCM消息通道
- 在两个平行链中注册一个机器人
- 在客户端平行链中为该机器人创建订单（保留订单完成的付款）
- 向Robonomics平行链发送XCM消息
- 在Robonomics平行链上创建“镜像”订单记录
- 机器人在Robonomics平行链上接受订单
- 将有关订单接受的XCM消息发送回客户端平行链
- 在客户端平行链上接受订单（在订单截止日期之前保留罚款费用以防订单未完成）
- 机器人在Robonomics平行链上完成订单
- 将有关订单完成的XCM消息发送回客户端平行链
- 结算所有付款（客户付款转移到机器人，未使用的罚款费用也转移）
- 关闭订单1


## 上游
该项目是[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)的一个分支。
其中包含正在测试的运行时托盘的代码。
就像原始的一样。节点代码的平行链位于“./pallets”、“./runtime”和“./node”目录中。

与原始“substrate-node-template”不同之处：
- 此收集器运行时具有HRMP处理程序模块，可以处理来自兄弟平行链的消息
- 为内部XCM测试准备的模拟测试运行时

## 构建和运行
推荐（极力推荐）设置：
```
Ubuntu 20，16 Gb RAM，8 CPU，120 Gb SSD
```
[注意] 第一次构建可能需要很长时间，在性能不佳的机器上可能需要几个小时。

[注意] 该脚本使用 Polkadot（Rococo）在中继链和平行链中的固定版本（提交哈希）。

[注意] 默认情况下，脚本在每次启动时重新创建相同的环境，通过删除所有先前的状态。可以在“config.sh”中使用“PERSISTENT”参数更改此行为。


运行构建和设置脚本。
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

“init.sh”脚本的基本操作：
 - 读取配置（文件“config.sh”包含修订号、初始节点密钥和标识符、链数据持久性参数等）
 - 设置操作系统数据包、Rust 和 Python
 - 为中继链和两个平行链分别构建二进制文件
    - 二进制文件将生成在./bin子目录中。
 - （可选）删除所有先前的链数据
    - 如果在“config.sh”中设置了“PERSISTENT=1”，则禁用此功能
 - 作为单独的进程运行（具有单独的 PID 和 I/O 管道）：
    - 中继链的验证者（即运行稳定的 Rococo 修订版的 4 个验证者）
    - 平行链-100 的收集器（即您正在开发的第一个平行链的单个收集器）
    - 平行链-200 的收集器（即您正在开发的第二个平行链的单个收集器）
 - 将所有端点、端口打印到控制台，允许您使用前端应用程序（资源管理器、DApp）研究任何链
 - 继续将所有链的输出数据打印到控制台

[警告] 启动后，请等待网络启动，确保区块最终化已开始，并且平行链已注册。这些过程应该需要大约5分钟（50个区块 x 6秒）。

## 检查初始设置是否有效

使用标准的 Polkdot 前端和生成的“--ws-port”端点连接到每个节点。
打开[Polkadot 应用程序](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)来监视链的情况。

### 示例：
本地主机，4个中继链验证者，一个平行链-100收集者，一个平行链-200收集者：
- [中继验证者 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [中继验证者 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [中继验证者 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [中继验证者 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [平行链-100收集者](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [平行链-200收集者](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)

如果一切正常，并且共识已经开始，我们可以继续运行我们的测试用例（在新的终端中）。

### UMP 消息传递测试
```bash
./scripts/init.sh ump
```
它在`平行链-100`中创建一个`Balance.transfer`消息，并将其传递到中继链。
当中继链接收到消息时，它将从`para 100`账户中转移15个代币到 Charlie 账户。

### HRMP 消息传递测试
```bash
./scripts/init.sh ump
```

它在`平行链-100`中创建一个`Balance.transfer`消息，并将其传递到`sibling 200`。
在此之前，它会向`subl 100`账户提供1000个代币，并在平行链之间建立通信通道。
```bash
./scripts/init.sh hrmp
```
接下来的消息可以通过运行`hrmpm`子命令发送。它不会创建通道，因此运行速度更快。
```bash
./scripts/init.sh hrmpm
```

### 更多选项
```bash
./scripts/init.sh help
```

## 本地测试网### 创建自定义链规范
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

编辑 rococo_local.json，用你自己的余额和权限参数替换。
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

Polkadot 地址为 //Alice//stash（sr25519密码学）。
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` 是账户：
Secret seed:      

Public key (hex): 

Account ID:       

SS58 地址:     
```

Polkadot //Alice（ed25519密码学）的 grandpa 会话密钥。
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` 是账户：
Secret seed:      

Public key (hex): 

Account ID:       

SS58 地址:     
```

Polkadot 地址为 //Alice（sr25519密码学）。
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` 是账户：
Secret seed:      

Public key (hex): 

Account ID:       

SS58 地址:     
```

将 rococo_local.json 转换为原始格式。
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
要使用新的链规范，请将 rococo.json 文件替换为 ./config/ 目录中的这个新文件，然后重新运行链。
```bash
./scripts/init.sh run
```
您可以自由编辑代码。上述命令将在启动之前重建项目并更新采集器节点。
Cumulus 是仍在积极开发中的预发布软件。
我们正在使用特定提交的 polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  2021年3月18日](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5)。dbcd0987ed53f104e6e15)

您可以使用更近期的软件版本。要做到这一点，请在./scipt/config.sh中将 POLKADOT_COMMIT 更改为`rococo-v1`分支的最新提交，删除./bin/polkadot，并运行
```bash
./scripts/init.sh run
```

更新收集器项目依赖项
```bash
cargo update
./scripts/init.sh build
```
一些依赖可能需要新的 Rust 工具链功能。该项目基于 Rust `nightly-2021-01-26`
在构建之前，请在./scripts/config.sh中更新 Rust 工具链版本。

## 黑客空投链
[添加外部托盘](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - 这可能应该在“了解更多”中吧？
## 了解更多

请参考上游
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
以了解更多关于该项目结构、封装的功能以及实现这些功能的方式。您可以在
[空投链块的路径](https://polkadot.network/the-path-of-a-parachain-block/)上了解更多
官方 Polkadot 博客上的内容。
[Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)