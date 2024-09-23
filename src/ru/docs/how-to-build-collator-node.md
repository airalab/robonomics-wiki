---
title: Как построить узел коллатора из исходного кода
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---


{% roboWikiNote {title:"Примечание", type: "note"}%} В видеоролике и скриншотах этой статьи мы использовали версию 1.4.0 Robonomics. Вам нужно использовать те же команды, но заменить версию Robonomics на текущую.{% endroboWikiNote %}

## Что такое коллатор

Коллатор является частью параконтракта Robonomics. Этот тип узлов создает новые блоки для цепочки.

>Коллаторы поддерживают параконтракты, собирая транзакции параконтрактов от пользователей и создавая доказательства перехода состояния для валидаторов цепочки ретрансляции. Другими словами, коллаторы поддерживают параконтракты, агрегируя транзакции параконтрактов в кандидаты на блоки параконтрактов и создавая доказательства перехода состояния для валидаторов на основе этих блоков.

Вы можете узнать больше о коллаторе на соответствующей [странице вики Polkadot](https://wiki.polkadot.network/docs/learn-collator)

В параконтракте Robonomics каждый коллатор получает вознаграждение (**0.000380520 XRT**) за каждый построенный блок, если этот блок был запечатан в цепочку.
Также коллатор получает **50% комиссии за транзакции** из этого блока.

## Процесс сборки

https://youtu.be/wnAtD7w0Pxk

Убедитесь, что у вас установлен Rust и необходимое программное обеспечение. Установщик Rust спросит вас о текущих параметрах установки, вы должны выбрать опцию `1) Продолжить установку (по умолчанию)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # на Windows загрузите и запустите rustup-init.exe
  # с https://rustup.rs вместо этого
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"install rust"} %}{% endroboWikiPicture %}


Установите необходимую ночную версию инструментальной цепочки и цель wasm.
Следующие команды актуальны для Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"install nightly"} %}{% endroboWikiPicture %}


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Также вам нужно установить следующие пакеты:

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
    # Установите git https://git-scm.com/download/win
    # Установите LLVM
    # Скачайте и установите Предварительные сборки Windows
    # LLVM с http://releases.llvm.org/download.html
  ```
Теперь вы можете установить узел robonomics из исходного кода git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Start build Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"End build Robonomics"} %}{% endroboWikiPicture %}


После этой команды скомпилированный двоичный файл robonomics будет находиться в каталоге `~/.cargo/bin`.

Следующим шагом является запуск узла коллатора. Вы можете прочитать об этом в статье ["Как запустить коллатор Robonomics"](/docs/how-to-launch-the-robonomics-collator).