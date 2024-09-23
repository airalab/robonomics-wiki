---
title: 로보노믹스 개발 노드 실행 방법
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**로보노믹스에서 애플리케이션을 테스트하려면 개발 모드에서 실행할 수 있습니다. 이 문서는 로보노믹스의 로컬 테스트 인스턴스를 설정하는 단계별 지침을 제공합니다.**


## 노드 이진 파일 가져오기

1. 먼저, 이진 파일이 필요합니다. 최신 [릴리스](https://github.com/airalab/robonomics/releases)에서 해당 아카이브를 다운로드하세요.

2. 아카이브 폴더로 이동하여 이진 파일을 풀고 권한을 변경하세요:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## 실행

다음 명령어로 노드를 실행하세요:

```bash
./robonomics --dev
```
다음 출력이 표시됩니다:

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"From Scratch", type: "note"}%} 기존 블록을 삭제하려면 `/tmp/substrate******/chains/dev/db/full`에서 RocksDB를 제거할 수 있습니다.
시작 시 로그에 표시된 해당 식별자로 `******`를 대체하세요.

매번 노드를 처음부터 시작하려면 `--tmp` 플래그를 사용하세요.
{% endroboWikiNote %}


## 연결

이제 [Polkadot Portal](https://polkadot.js.org/apps/#/explorer)을 통해 로컬 노드에 연결할 수 있습니다.

왼쪽 상단의 네트워크를 `Local Node`로 변경하고 `Switch`를 누르세요.

로보노믹스의 로컬 인스턴스에 오신 것을 환영합니다!

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}