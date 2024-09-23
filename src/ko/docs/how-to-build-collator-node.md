---
title: 소스에서 콜레이터 노드를 빌드하는 방법
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---


{% roboWikiNote {title:"참고", type: "노트"}%} 이 기사의 스크린 캐스트와 스크린샷에서는 Robonomics의 버전 1.4.0을 사용했습니다. 동일한 명령을 사용하지만 Robonomics의 버전을 최신 버전으로 바꿔야 합니다.{% endroboWikiNote %}

## 콜레이터란

콜레이터는 Robonomics 파라체인의 일부입니다. 이 노드 유형은 체인에 새로운 블록을 생성합니다.

> 콜레이터는 사용자로부터 파라체인 트랜잭션을 수집하고 Relay Chain 검증자를 위한 상태 전이 증명을 생성하여 파라체인을 유지합니다. 다시 말해, 콜레이터는 파라체인 트랜잭션을 집계하여 파라체인 블록 후보를 생성하고 해당 블록을 기반으로 검증자를 위한 상태 전이 증명을 생성합니다.

관련된 [Polkadot 위키 페이지](https://wiki.polkadot.network/docs/learn-collator)에서 콜레이터에 대해 더 알아볼 수 있습니다.

Robonomics 파라체인에서 모든 콜레이터는 각 블록을 구축할 때마다 보상(**0.000380520 XRT**)을 받습니다. 또한 콜레이터는 이 블록에서 **50%의 트랜잭션 수수료**를 받습니다.

## 빌드 프로세스

https://youtu.be/wnAtD7w0Pxk

Rust 및 지원 소프트웨어가 설치되어 있는지 확인하십시오. Rust 설치 프로그램은 현재 설치 옵션에 대해 물어볼 것이며, `1) 설치 진행 (기본값)` 옵션을 선택해야 합니다.


```
  curl https://sh.rustup.rs -sSf | sh
  # Windows에서는 https://rustup.rs에서 rustup-init.exe를 다운로드하여 실행하십시오
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"rust 설치"} %}{% endroboWikiPicture %}


필요한 nightly toolchain 및 wasm 타겟을 설치하십시오.
다음 명령은 Robonomics v2.6.0에 대한 것입니다:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"nightly 설치"} %}{% endroboWikiPicture %}


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
또한 다음 패키지를 설치해야 합니다:

  1. Linux:

  ```
    sudo apt install cmake git clang libclang-dev
  ```
  2. Mac:

  ```
    brew install cmake pkg-config git llvm
  ```
  3. Windows (PowerShell):

  ```
    # git 설치 https://git-scm.com/download/win
    # LLVM 설치
    # LLVM의 Pre Build Windows 바이너리를 다운로드하여 설치하십시오
    # http://releases.llvm.org/download.html
  ```
이제 git 소스에서 robonomics 노드를 설치할 수 있습니다.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Robonomics 빌드 시작"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"Robonomics 빌드 완료"} %}{% endroboWikiPicture %}


이 명령을 실행하면 컴파일된 robonomics 이진 파일이 `~/.cargo/bin` 디렉토리에 생성됩니다.

다음 단계는 콜레이터 노드를 시작하는 방법입니다. 이에 대해 ["Robonomics 콜레이터 시작 방법"](/docs/how-to-launch-the-robonomics-collator) 기사에서 읽을 수 있습니다.