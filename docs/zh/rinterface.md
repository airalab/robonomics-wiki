---
title: Python接口和Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**一些在Robonomics调色板中实现的外部功能很难从Polkadot应用程序中提交。此外，有 
需要使用编程语言与此功能进行交互。为此，开发了一个简单的Python工具
称为 [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface)。 它是 polkascan 维护的包装
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface)。下面对此软件包的简要描述
和一些有用的链接和示例。还讨论了CLI工具**

## robonomics-interface

可在[PyPi](https://pypi.org/project/robonomics-interface/)上下载和设置软件包。
还提供了详细的基于docstring生成的[文档](https://multi-agent-io.github.io/robonomics-interface/)。

总的来说，这是一个供开发人员使用编程工具与Robonomics区块链进行交互的工具。几乎 
Robonomics团队的所有Python项目都使用这个接口与平行链进行交互。

### 安装

安装过程要求用户至少安装Python 3.8。既不是`x86`，也不是`arm7`，也不是`arm8`
架构。所有的轮子都是由依赖维护者构建和发布的。

`pip`被用作安装工具:

```bash
$ pip3 install robonomics_interface
```

### 示例用法

主要思想是创建一个`Account`实例，然后使用它来创建专用于调色板的实例。


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  还可以使用自定义的端点（例如，用于测试的本地节点）:

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

也可以提交外部功能:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  正如前面所说，更多示例可在[文档](https://multi-agent-io.github.io/robonomics-interface/)页面上找到。

</robo-wiki-note>

## CLI tool

`robonomics-interface`还包含一个Python `click` CLI工具，用于原型设计和快速测试。它已安装
与软件包一起，并在终端中可用:

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   Subscribe to datalog/launch events in the chain
#  write  Send various extrinsics (launch commands or record datalogs)
```

您可以尝试在本地节点上使用它。采用了流水线哲学:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```