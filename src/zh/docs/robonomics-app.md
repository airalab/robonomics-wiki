---
title: 使用 robonomics.app
contributors: [vol4tim, positivecrash, ensrationis]
---

[robonomics.app](https://robonomics.app) 是 Robonomics 的网页应用。你可以用它购买订阅、连接 Home Assistant、在任何浏览器中控制你的家，以及查看设备树和传感器数据。本页逐个界面进行说明。

你需要一个 Polkadot 钱包扩展，里面有一个 Robonomics 账户。购买任何东西或发送交易时，该账户需要少量 XRT。见[快速入门](/docs/getting-started/)。

## 连接钱包

钱包按钮在右上角。从扩展中选择一个账户，并允许网站使用它。同一个按钮也用于切换网络。请使用 Polkadot。

## 购买订阅

在菜单中打开 **Buy/renew a subscription**。

- 页面会显示价格、激活所需时间（约两分钟），以及当前可购买的订阅数量。
- 你的余额需要足够支付价格加一笔少量手续费。
- 一笔交易完成两件事：对一个空闲拍卖出价，并把你的账户添加到订阅中。
- 如果没有可购买的订阅，只有在治理投票通过后才会开放新的订阅。见[旧版 pallet](/docs/legacy-pallets/#current-state)。

订阅中列出的账户可以免手续费发送交易。Home Assistant 就是用这种方式与链通信的。详情：[RWS 订阅](/docs/legacy-pallets/#rws-subscriptions)。

## 添加配置

配置（setup）就是应用眼中的你的家：一个订阅，以及与它关联的账户。菜单中的 **New setup** 提供三种添加方式：

- **通过所有者地址。** 粘贴持有订阅的地址。应用会找到该订阅并显示它的结束日期，即使订阅已经过期。
- **通过扩展。** 不用手动输入，直接从钱包中选择所有者账户。
- **从文件导入。** 上传你之前导出的备份。

配置列表只保存在你的浏览器中。从应用中删除一个配置，只会把它从这个列表中移除，链上不会有任何变化。

## Your setup

**Your setup** 显示一个订阅：

- **Active until.** 结束日期，过期后显示为红色。
- **Owner.** 持有订阅的账户。
- **Controller.** 你的 Home Assistant 用来向链写入数据的账户。它由 Home Assistant 集成创建，你把它粘贴到这里。
- **Users.** 可以控制这个家的账户。添加或移除用户是由所有者发起的一笔交易。
- **Subscription backup.** 把配置导出为文件。要换到另一个浏览器或设备，在 **New setup** 中上传这个文件。

## 设备与控制

**Devices & Control** 在浏览器中打开你的 Home Assistant 仪表板。

- 选择一个用户，输入该用户的密钥短语。应用用它解密来自 Home Assistant 的数据。密钥短语只保留在浏览器中。
- 只在你信任的设备上勾选 **Keep me signed in**。
- 应用以点对点方式直接连接 Home Assistant。无法直接连接时，会经过中继。数据全程加密。

要使用这个页面，Home Assistant 需要安装 Robonomics 集成。有哪些集成、各自的更新程度，见[连接设备](/docs/connect-devices/#home-assistant)。

## 设备树

菜单中的 **Device tree** 显示 Robonomics 5.0 的[设备树](/docs/device-tree/)。

- 首页列出根节点及其所有者。
- 可以按编号打开节点，也可以按其设备的账户打开。
- 节点页面显示到根节点的路径、所有者、设备账户、`meta` 和 `payload`（JSON 和文本以文本形式显示）、子节点以及访问条目。
- 连接账户后，你可以创建根节点，为你拥有的节点添加子节点，并在你是所有者或拥有 `Write` 权限的节点上编辑 `meta` 和 `payload`。树中的所有内容都是公开的。

## Datalog

首页上的 **Send your first record** 会打开 Datalog 页面。

- 输入最多 512 字节的内容并发送。手续费远低于 0.001 XRT。
- 下方可以查看任意账户的记录，最新的排在最前。链上为每个账户保留最近 128 条记录。

Datalog 是[旧版 pallet](/docs/legacy-pallets/#datalog) 之一。它适合做第一次测试。设备请使用设备树。

## 传感器与数字孪生

- **Altruist.** 打开 `robonomics.app/#/altruist/<sensor address>`，查看该传感器记录在链上的读数：颗粒物、噪声、温度、湿度，以及单独一条坐标轴上以 hPa 为单位的气压。见 [Altruist 与 sensors.social](/docs/altruist/)。
- **能耗监测器。** 打开 `robonomics.app/#/energy-monitor/<address>`，对能耗监测器查看同样的内容。
- **数字孪生。** 列出你的孪生，以及每个主题背后的账户。见 [DigitalTwin](/docs/legacy-pallets/#digitaltwin)。

如果某个地址没有读数，页面会直接说明，而不是一直加载。

## 遇到问题时

- **应用连接到了错误的网络。** 应用会记住曾经通过链接传入的网络地址。打开一次 `https://robonomics.app/?rpc=wss://polkadot.rpc.robonomics.network/` 即可切换回来。
- **Uniswap 链接显示的是另一种代币。** 以太坊上的正式 XRT 是 `0x1F752250f518e419f2F03804E25728c5C6DfF73f`。旧代币 `0x7dE9…1cb7` 不是正式 XRT。见[其他网络上的 XRT](/docs/xrt-migration/)。
- **Controller 或用户没有保存，或者无法管理 Kusama 订阅。** 这是已知问题，在 [robonomics.app issues](https://github.com/airalab/robonomics.app/issues) 的 #213 和 #223 中跟踪。
- **其他问题。** 在 [github.com/airalab/robonomics.app](https://github.com/airalab/robonomics.app/issues) 提交 issue。附上浏览器控制台中的构建版本号，它会在应用启动时打印出来。
