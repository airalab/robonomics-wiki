---
title: 如何从源代码构建收集器节点
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust 工具链 nightly-2022-08-05
---


{% roboWikiNote {title:"注意", type: "note"}%} 在本文的视频和截图中，我们使用的是 Robonomics 的 1.4.0 版本。您需要使用相同的命令，但将 Robonomics 的版本替换为当前版本。{% endroboWikiNote %}

## 什么是收集器

收集器是 Robonomics 平行链的一部分。这种节点类型为链创建新块。

> 收集器通过从用户收集平行链交易并为中继链验证者生成状态转换证明来维护平行链。换句话说，收集器通过将平行链交易聚合到平行链块候选项中，并基于这些块为验证者生成状态转换证明来维护平行链。

您可以在相关的 [Polkadot wiki 页面](https://wiki.polkadot.network/docs/learn-collator) 上了解更多关于收集器的信息。

在 Robonomics 平行链中，每个收集器在构建的每个块上都会获得奖励（**0.000380520 XRT**），如果此块被封存到链上。此外，收集器还会从该块中获得 **50% 的交易费用**。

## 构建过程

https://youtu.be/wnAtD7w0Pxk

确保您已安装 Rust 和所需的支持软件。Rust 安装程序将询问您有关当前安装选项，您应选择 `1) Proceed with installation (default)` 选项。


```
  curl https://sh.rustup.rs -sSf | sh
  # 在 Windows 上，从 https://rustup.rs 下载并运行 rustup-init.exe
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"install rust"} %}{% endroboWikiPicture %}


安装所需的 nightly 工具链和 wasm 目标。下面的命令适用于 Robonomics v2.6.0：

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"install nightly"} %}{% endroboWikiPicture %}


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
    # 安装 git https://git-scm.com/download/win
    # 安装 LLVM
    # 从 http://releases.llvm.org/download.html 下载并安装 LLVM 的 Pre Build Windows 二进制文件
  ```
现在，您可以从 git 源代码安装 robonomics 节点。

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Start build Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"End build Robonomics"} %}{% endroboWikiPicture %}


执行此命令后，编译的 robonomics 二进制文件将位于 `~/.cargo/bin` 目录中。

下一步是如何启动收集器节点。您可以在["如何启动 Robonomics 收集器"](/docs/how-to-launch-the-robonomics-collator)文章中了解更多信息。