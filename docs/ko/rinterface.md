---
title: 파이썬 인터페이스 및 Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Robonomics 팔레트에 구현된 일부 extrinsic은 Polkadot 앱에서 제출하기 어렵습니다. 더욱이 
프로그래밍 언어를 사용하여이 기능과 상호 작용해야합니다. 이를 위해 간단한 파이썬 도구가 개발되었습니다.
[robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface)라고 합니다. Polkascan으로 관리되는 래퍼입니다.
[py-substrate-interface](https://github.com/polkascan/py-substrate-interface)입니다. 이 패키지에 대한 간단한 설명은 아래에 나와 있습니다.
그리고 일부 유용한 링크와 예제가 있습니다. 또한, CLI 도구에 대해서도 논의됩니다.**

## robonomics-interface

[PyPi](https://pypi.org/project/robonomics-interface/) 패키지에서 사용할 수 있으며 다운로드 및 설정이 준비되어 있습니다.
자세한 docstring-generated [documentation](https://multi-agent-io.github.io/robonomics-interface/)도 사용할 수 있습니다.

모두 모두, 이것은 프로그래밍 도구를 통해 Robonomics 블록 체인과 상호 작용하려는 개발자를 위한 도구입니다. 
파라체인과 상호 작용하는 Robonomics 팀의 거의 모든 파이썬 프로젝트에서 이 인터페이스를 사용합니다.

### 설치

설치 프로세스를 위해서는 사용자가 적어도 Python 3.8이 설치되어 있어야합니다. `x86`, `arm7`, `arm8` 중 어느 아키텍처도 컴파일 프로세스가 필요하지 않습니다.
모든 휠은 종속성 유지 관리자에 의해 빌드되고 게시됩니다.

`pip`는 설치 도구로 사용됩니다:

```bash
$ pip3 install robonomics_interface
```

### 샘플 사용

주요 아이디어는 `Account` 인스턴스를 생성 한 다음 팔레트 전용 인스턴스를 사용하는 것입니다.


```python
from robonomicsinterface import Account, 데이터로그
account = Account()
datalog_ = 데이터로그(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  또한 사용자 정의 엔드 포인트 (예 : 테스트용 로컬 노드)를 사용할 수도 있습니다.

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

Extrinsic도 제출할 수 있습니다:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  말했듯이, 더 많은 예제는 [documentation](https://multi-agent-io.github.io/robonomics-interface/) 페이지에서 확인할 수 있습니다.

</robo-wiki-note>

## CLI tool

`robonomics-interface`에는 프로토타이핑 및 빠른 테스트 목적으로 사용할 수있는 Python `click` CLI 도구도 포함되어 있습니다. 설치되어 있습니다.
패키지와 터미널에서 사용할 수 있습니다:

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

로컬 노드에서 사용해 볼 수 있습니다. 파이프 라인 철학이 채택되었습니다.

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```