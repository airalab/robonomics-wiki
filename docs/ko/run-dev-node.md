---
title: 로보노믹스 Dev 노드 실행 방법
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**로보노믹스에서 애플리케이션을 테스트하려면 개발 모드에서 실행해야 할 수도 있습니다. 이 문서에서는 단계별로
로보노믹스의 로컬 테스트 인스턴스를 얻는 방법에 대한 지침을 제공합니다.**


## 노드 이진 일 가져오기

1. 먼저 이진 파일이 필요합니다. 최신 [릴리스](https://github.com/airalab/robonomics/releases)에서 아카이브를 다운로드하세요.

2. 아카이브 폴더로 이동하여 이진 파일을 압축 해제하고 권한을 변경하세요.

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## 실행

다음 명령으로 노드를 실행하세요:

```bash
./robonomics --dev
```
다음 출력이 표시됩니다:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  기존 블록을 삭제하려면 `/tmp/substrate******/chains/dev/db/full`에서 RocksDB를 제거할 수 있습니다.
  로그에서 표시된 해당 식별자로 `******`를 대체하세요.

  매번 처음부터 노드를 시작하려면 `--tmp` 플래그를 사용하세요.

</robo-wiki-note>

## 연결

이제 [Polkadot Portal](https://polkadot.js.org/apps/#/explorer)을 통해 로컬 노드에 연결할 수 있습니다.

왼쪽 상단 모서리에서 네트워크를 `Local Node`로 변경하고 `Switch`를 누르세요.

![switch](../images/dev-node/portal.png)

로보노믹스의 로컬 인스턴스에 오신 것을 환영합니다!

![local_node](../images/dev-node/dev-portal.png)


