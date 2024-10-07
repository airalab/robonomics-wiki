---
title: Python接口和Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Robonomics调色板中实现的一些外部功能很难从Polkadot应用程序中提交。此外，有必要使用编程语言与此功能进行交互。为此，开发了一个名为[robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface)的简单Python工具。它是对由polkascan维护的[py-substrate-interface](https://github.com/polkascan/py-substrate-interface)的包装器。以下是对此软件包的简要描述以及一些有用的链接和示例。还讨论了CLI工具。**

## robonomics-interface

可在[PyPi](https://pypi.org/project/robonomics-interface/)上找到该软件包，可供下载和设置。
还有一个详细的基于docstring生成的[文档](https://multi-agent-io.github.io/robonomics-interface/)可供查阅。

总的来说，这是一个供希望通过编程工具与Robonomics区块链进行交互的开发人员使用的工具。几乎所有与平行链交互的Robonomics团队的Python项目都使用这个接口。

### 安装

安装过程要求用户至少安装了Python 3.8。无论是`x86`、`arm7`还是`arm8`架构，都不需要编译过程。所有的wheel都是由依赖维护者构建和发布的。

使用`pip`作为安装工具：

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

{% roboWikiNote {title:"本地节点", type: "note"}%}
  也可以使用自定义端点（例如，用于测试的本地节点）：

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

还可以提交外部功能：

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # 这是一个外部功能哈希
```

{% roboWikiNote {title:"文档", type: "note"}%}正如所说，更多示例可在[文档](https://multi-agent-io.github.io/robonomics-interface/)页面上找到。{% endroboWikiNote %}

## CLI工具

`robonomics-interface`还包含一个Python `click` CLI工具，用于原型设计和快速测试。它随软件包一起安装，并在终端中可用：

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   订阅链中的数据日志/启动事件
#  write  发送各种外部功能（启动命令或记录数据日志）
```

您可以尝试在本地节点上使用它。采用了管道哲学：

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # 这是一个外部功能哈希
```