---
title: 如何从源代码构建碎片节点
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  在本文的演示和截图中，我们使用了Robonomics的1.4.0版本。您需要使用相同的命令，但将Robonomics的版本替换为当前版本。
</robo-wiki-note>

## 什么是碎片节点

碎片节点是Robonomics碎片链的一部分。这种节点类型为链创建新的区块。.

>碎片节点通过从用户收集碎片链交易并为中继链验证者生成状态转换证明来维护碎片链。换句话说，碎片节点通过将碎片链交易聚合到碎片链块候选项中，并根据这些块为验证者生成状态转换证明来维护碎片链。

您可以在相关的[Polkadot wiki页面](https://wiki.polkadot.network/docs/learn-collator)上了解更多关于碎片节点的信息。

在 Robonomics 平行链中，如果该区块被密封到链上，则每个整理者都会为其构建的每个区块获得奖励 (**0.000380520 XRT**)。
整理者还可以从该区块中获得 **50% 的交易费用**。

## 构建过程

https://youtu.be/wnAtD7w0Pxk

确保您已安装Rust和支持软件。Rust安装程序将询问您有关当前安装选项的问题，您应选择“1）继续安装（默认）”选项。


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![安装 Rust](../images/how-to-build-collator-node/install_rust.jpg)


安装所需的夜间工具链和wasm目标。
下面的命令适用于Robonomics v2.6.0：

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
您还需要安装以下软件包：

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
现在您可以从git源代码安装robonomics节点。

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


执行此命令后，编译后的robonomics二进制文件将位于“~/.cargo/bin”目录中。

下一步是如何启动碎片节点。您可以在["如何启动Robonomics碎片节点"](/docs/how-to-launch-the-robonomics-collator)文章中阅读相关信息。