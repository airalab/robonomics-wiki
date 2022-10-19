---
title: Python interface and Robonomics IO
contributors: [PaTara43]
translated: true
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Some extrinsics implemented in Robonomics pallets are hard to be submitted from the Polkadot app. More that, there is 
a need to interact with this functionality using programming languages. For this purpose a simple Python tool was developed
called [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). It's a wrapper over polkascan-maintained 
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface). Below is a brief description of this package
and some useful links and examples. Also, CLI tools is discussed.**

## robonomics-interface

Available on [PyPi](https://pypi.org/project/robonomics-interface/) package is ready to download and set up.
There is a detailed docstring-generated [documentation](https://multi-agent-io.github.io/robonomics-interface/) available as well.

All in all, this is a tool for developers who wish to interact with Robonomics blockchain via programming tools. Almost 
all the Python projects of Robonomics team which interact with the parachain use this interface.

### Installation

The installation process requires user to have at least Python 3.8 installed. Neither `x86`, nor `arm7`, nor `arm8`
architectures require compilation process. All the wheels are built and published by dependencies maintainers.

`pip` is used as an installation tool:

```bash
$ pip3 install robonomics_interface
```

### Sample use

The main idea is to create an `Account` instance and then use it to create pallet-dedicated instances.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  It is also possible to use custom endpoints (e.g. local node for testing):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

Extrinsics are also possible to submit:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  As have been said, more examples are available on the [documentation](https://multi-agent-io.github.io/robonomics-interface/) page.

</robo-wiki-note>

### IPFS gateway.

There is an utility to upload files to IPFS via Web3-authenticate gateway provided by [Crust](https://crust.network/):

```python
from robonomicsinterface.utils import ipfs_get_content, ipfs_upload_content

seed = "one two three four five six seven eight nine ten eleven twelve"

content = "Hello, World!"
cid, size = ipfs_upload_content(tester_tokens_seed, content)
print(cid, size)

content_ = ipfs_get_content(cid)
print(content_)


with open("path_to_file", 'rb') as f:
    content = f.read()
cid, size = ipfs_upload_content(tester_tokens_seed, content)
print(cid, size)

content_ = ipfs_get_content(cid)
with open("path_to_the_fetched_file", 'wb') as f:
    f.write(content_)
```

## CLI tool

`robonomics-interface` also contains a Python `click` CLI tools to use for purposes of prototyping and quick tests. It is installed
with the package and available in the Terminal:

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

You may try to use it with local node. Pipeline philosophy is adopted:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```