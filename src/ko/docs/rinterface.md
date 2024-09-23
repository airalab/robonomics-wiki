---
title: Python 인터페이스 및 Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Robonomics 팔렛에 구현된 일부 extrinsics는 Polkadot 앱에서 제출하기 어려울 수 있습니다. 더구나, 이 기능과 상호 작용하기 위해 프로그래밍 언어를 사용해야 합니다. 이를 위해 [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface)라는 간단한 Python 도구가 개발되었습니다. 이 도구는 polkascan이 유지 관리하는 [py-substrate-interface](https://github.com/polkascan/py-substrate-interface) 위에 래퍼로 작동합니다. 아래에는 이 패키지에 대한 간단한 설명과 유용한 링크 및 예제가 제공됩니다. 또한 CLI 도구에 대해 논의됩니다.**

## robonomics-interface

[PyPi](https://pypi.org/project/robonomics-interface/)에서 사용 가능한 패키지를 다운로드하고 설정할 수 있습니다.
또한 자세한 docstring 생성 [문서](https://multi-agent-io.github.io/robonomics-interface/)도 이용할 수 있습니다.

이 모든 것은 Robonomics 블록체인과 상호 작용하려는 개발자들을 위한 도구입니다. 거의 모든 Robonomics 팀의 Python 프로젝트는 이 인터페이스를 사용하여 파라체인과 상호 작용합니다.

### 설치

설치 과정에서는 사용자가 적어도 Python 3.8이 설치되어 있어야 합니다. `x86`, `arm7`, `arm8` 아키텍처는 컴파일 과정이 필요하지 않습니다. 모든 휠은 의존성 유지 관리자에 의해 빌드되고 게시됩니다.

설치 도구로 `pip`을 사용합니다:

```bash
$ pip3 install robonomics_interface
```

### 샘플 사용

주요 아이디어는 `Account` 인스턴스를 생성한 다음 이를 사용하여 팔렛에 특화된 인스턴스를 생성하는 것입니다.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"로컬 노드", type: "note"}%}
  테스트를 위해 사용자 정의 엔드포인트(예: 로컬 노드)를 사용할 수도 있습니다:

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

Extrinsics를 제출하는 것도 가능합니다:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # 이것은 extrinsic 해시입니다
```

{% roboWikiNote {title:"문서", type: "note"}%}말했듯이, 더 많은 예제는 [문서](https://multi-agent-io.github.io/robonomics-interface/) 페이지에서 확인할 수 있습니다. {% endroboWikiNote %}

## CLI 도구

`robonomics-interface`에는 프로토타이핑 및 빠른 테스트 목적으로 사용할 수 있는 Python `click` CLI 도구도 포함되어 있습니다. 이 도구는 패키지와 함께 설치되며 터미널에서 사용할 수 있습니다:

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   체인에서 datalog/launch 이벤트를 구독합니다
#  write  다양한 extrinsics(런치 명령 또는 데이터 로그 기록)을 전송합니다
```

로컬 노드로 시도해 볼 수 있습니다. 파이프라인 철학이 채택되었습니다:

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # 이것은 extrinsic 해시입니다
```