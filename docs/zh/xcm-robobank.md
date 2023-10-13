---
title: Substrate Cumulus Parachain Testsuite for cross-chain messaging 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


该项目的主要目标是简化平行链运行时开发，当使用跨链消息时。 
它允许使用高度可重复性和简单使用的集成测试开发运行时代码。
它自动构建、构建预设网络配置（即1个中继链+2个平行链）、设置平行链之间的消息传递通道并运行消息测试、发送消息、使用对运行时的调用，所有这些都是在Python中构建和组合的。

XCM测试套件用于测试Robobank的生产周期-一组Substrate托盘，允许机器人在外部平行链上注册、接收预付订单、执行订单并使用外部代币收款。这使得机器人可以在Robonomics网络内运行，并提供其服务于任何其他平行链。

示例视频可在[YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)上找到。

演示场景中的主要步骤是：
- 启动一个包含6个进程的中继链和两个平行链的组合
- 在平行链之间设置XCM消息通道
- 在两个平行链中注册一个机器人
- 在客户端平行链中为该机器人创建一个订单（为订单完成保留付款）
- 向Robonomics平行链发送XCM消息
- 在Robonomics平行链上创建"镜像"订单记录
- 机器人在Robonomics平行链上接受订单
- 将有关订单接受的XCM消息发送回客户端平行链
- 在客户端平行链上接受订单（为订单未完成保留罚款费用，直到订单截止日期）
- 机器人在Robonomics平行链上完成订单
- 将有关订单完成的XCM消息发送到客户端平行链
- 结算所有付款（客户付款转给机器人，未使用罚款费用也转给机器人）
- 关闭订单1


## 上游
该项目是"substrate-node-template"的一个分支
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
它包含正在测试的运行时托盘的代码。
与原始节点代码的区别在于，平行链的代码位于"./pallets"、"./runtime"、"./node"目录中。

与原始的"substrate-node-template"的区别：
- 此收集器运行时具有HRMP处理程序模块，并且可以处理来自兄弟平行链的消息
- 为内部XCM测试准备的模拟测试运行时

## 构建和运行
推荐（强烈）设置： 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[注意]第一次构建可能需要很长时间，最多几个小时在非最佳的机器上。

[注意]脚本使用Polkadot（Rococo）的固定版本（提交哈希）在中继链和平行链中。

[注意]默认情况下，脚本在每次启动时都会重新创建相同的环境，删除所有先前的状态。可以在"config.sh"中使用"PERSISTENT"参数更改此行为。


运行构建和设置脚本。  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

"init.sh"脚本的基本操作：
 - 读取配置（文件"config.sh"，包括修订号、初始节点密钥和标识符、链数据持久性参数等）
 - 设置操作系统包、Rust和Python
 - 为中继链和两个平行链构建单独的二进制文件
    - 二进制文件将生成在./bin子目中。 
 - （可选）删除所有链的先前链数据
    - 如果在"config.sh"中设置了"PERSISTENT=1"，则禁用
 - 作为单独的进程运行（具有单独的PID和I/O管道）：
    - 中继链的验证者（即运行稳定的Rococo修订版的4个验证者）
    - 用于平行链-100的收集器（即第一个正在开发的平行链的单个收集器）
    - 用于平行链-200的收集器（即第二个正在开发的平行链的单个收集器）
 - 将所有链的所有端点、端口打印到控制台，允许您使用前端应用程序（浏览器、DApp）研究任何链
 - 将所有链的所有输出数据持续打印到控制台

[警告]启动后，请等待网络启动，确保块最终化已开始，并且平行链已注册。这些过程应该需要大约5分钟（50个块x 6秒）。

## 检查初始设置是否正常工作 

使用标准的Polkdot前端和生成的"--ws-port"端点连接到每个节点。
打开[Polkadot应用程序](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)以监视链。 

### 示例：
本地主机，4个中继链验证者，一个平行链-100收集器，一个平行链-200收集器：
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


如果一切正常，并且共识已经开始，我们可以继续运行我们的测试用例（在新的终端中）。

### UMP消息传递测试
```bash
./scripts/init.sh ump
```
它在`parachain-100`中创建一个`Balance.transfer`消息，并将其传递给中继链。
当中继链接收到消息时，它将从`para 100`账户向Charlie账户转15个代币。


### HRMP消息传递测试
```bash
./scripts/init.sh ump
```

它在`parachain-100`中创建一个`Balance.transfer`消息，并将其传递给`sibling 200`。
在此之前，它将`subl 100`账户赋予1000个代币，并在平行链之间建立通信通道。
```bash
./scripts/init.sh hrmp
```
下一条消息可以通过运行`hrmpm`子命令发送。它不会创建通道，因此运行速度更快。
```bash
./scripts/init.sh hrmpm
```

### 更多选项
```bash
./scripts/init.sh help
```

## 本地测试网络

### 创建自定义链规范
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

编辑rococo_local.json，用您自己的余额和权限参数替换它们。
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

用于//Alice//stash的Polkadot地址（sr25519密码学）。
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

用于//Alice的Polkadot grandpa会话密钥（ed25519密码学）。
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

用于//Alice的Polkadot地址（sr25519密码学）。
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

将rococo_local.json转换为原始格式。
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
要使用新的链规范，将rococo.json文件替换为./config/目录中的此新文件，并重新运行链。
```bash
./scripts/init.sh run
```
您可以自由编辑代码。上述命令将在启动之前重新构建项目并更新整理者节点。
Cumulus是预发布软件，仍在积极开发中。
我们正在使用特定的polkadot提交[46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

您可以使用更新版本的软件。要做到这一点，请在./scipt/config.sh中更POLKADOT_COMMIT为`rococo-v1`分支的最新提交，删除./bin/polkadot，并运行
`rococo-v1`分支的最新提交，删除./bin/polkadot，并运行 
```bash
./scripts/init.sh run
```

更新整理者项目依赖项 
```bash
cargo update
./scripts/init.sh build
```
某些依赖项可能需要新的rust工具链功能。该项目基于rust `nightly-2021-01-26`
在构建之前，请在./scripts/config.sh中更新rust工具链版本。

##  黑客平行链
[添加外部托盘](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - 可能应该在"了解更多"中？
## Learn More

有关此项目的结构、封装的功能以及这些功能的实现方式，请参考上游[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)。您可以在官方Polkadot博客上了解有关[Parachain块的路径](https://polkadot.network/the-path-of-a-parachain-block/)的更多信息。[Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)
