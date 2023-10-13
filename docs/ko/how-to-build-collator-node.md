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

<robo-wiki-note type="note" title="Note">
  이 문서의 스크린 캐스트와 스크린샷에서는 Robonomics의 버전 1.4.0을 사용했습니다. 동일한 명령을 사용하지만 Robonomics의 버전을 현재 버전으로 바꿔야 합니다.
</robo-wiki-note>

## 콜레이터란 무엇인가요

콜레이터는 Robonomics 파라체인의 일부입니다. 이 노드 유형은 체인에 새로운 블록을 생성합니다..

>콜레이터는 사용자로부터 파라체인 트랜잭션을 수집하고 Relay Chain 검증자를 위해 상태 전이 증명을 생성하여 파라체인을 유지합니다. 다시 말해, 콜레이터는 파라체인 트랜잭션을 파라체인 블록 후보로 집계하고 해당 블록을 기반으로 검증자를 위한 상태 전이 증명을 생성하여 파라체인을 유지합니다.

관련 [Polkadot 위키 페이지](https://wiki.polkadot.network/docs/learn-collator)에서 콜레이터에 대해 더 자세히 알아볼 수 있습니다.

Robonomics 파라체인에서 모든 대조자는 자신이 만든 모든 블록에 대해 보상(**0.000380520 XRT**)을 받습니다(이 블록이 체인에 봉인된 경우).
또한 대조자는 이 블록에서 **50% 거래 수수료**를 받습니다.

## 빌드 과정

https://youtu.be/wnAtD7w0Pxk

Rust와 관련 지원 소프트웨어가 설치되어 있는지 확인하세요. Rust 설치 프로그램에서 현재 설치 옵션에 대해 물어볼 것이며, '1) 설치 진행 (기본값)' 옵션을 선택해야 합니다.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![설치 Rust](../images/how-to-build-collator-node/install_rust.jpg)


필요한 nightly toolchain과 wasm target을 설치하세요.
다음 명령은 Robonomics v2.6.0에 대해 적용됩니다.

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
또한 다음 패키지를 설치해야 합니다.

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
    # Install git https://git-scm.com/download/win
    # Install LLVM
    # Download and install the Pre Build Windows binaries
    # of LLVM  from http://releases.llvm.org/download.html
  ```
이제 git 소스에서 robonomics 노드를 설치할 수 있습니다.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


이 명령을 실행하면 컴파일된 robonomics 이진 파일이 '~/.cargo/bin' 디렉토리에 생성됩니다.

다음 단계는 콜레이터 노드를 실하는 방법입니다. ["Robonomics 콜레이터를 실행하는 방법"](/docs/how-to-launch-the-robonomics-collator) 문서에서 자세히 읽을 수 있습니다.