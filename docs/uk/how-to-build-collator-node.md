---
title: Як побудувати вузол колатора з вихідного коду
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  У відео та знімках екрану цієї статті ми використовували версію 1.4.0 Robonomics. Вам потрібно використовувати ті ж команди, але замінити весію Robonomics на поточну.
</robo-wiki-note>

## Що таке колатор

Колатор є частиною парачейну Robonomics. Цей тип вузлів створює нові блоки для ланцюжка..

>Колатори підтримують парачейни, збираючи транзакції парачейну від користувачів та створюючи докази переходу стану для перевіряючих ланцюжок ретрансляції. Іншими словами, колатори підтримують парачейни, агрегуючи транзакції парачейну в кандидати на блоки парачейну та створюючи докази переходу стану для перевіряючих на основі цих блоків.

Ви можете дізнатися більше про колатор на відповідній [сторінці вікі Polkadot](https://wiki.polkadot.network/docs/learn-collator)

У парачейні Robonomics кожен збирач отримує винагороду (**0,000380520 XRT**) за кожен створений ним блок, якщо цей блок був запечатаний у ланцюжку.
Також Collator отримує **50% комісії за транзакції** з цього блоку.

## Процес будівництва

https://youtu.be/wnAtD7w0Pxk

Переконайтеся, що у вас встановлені Rust та необхідне програмне забезпечення. Інсталятор Rust запитає вас про поточні параметри встановлення, ви повині вибрати опцію `1) Продовжити із встановленням (за замовчуванням)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![Встановити Rust](../images/how-to-build-collator-node/install_rust.jpg)


Встановіть необхідний нічний інструментарій та ціль wasm.
Наступні команди актуальні для Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Вам також потрібно встановити наступні пакети:

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
Тепер ви можете встановити вузол robonomics з вихідного коду git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


Після цієї команди скомпільований бінарний файл robonomics буде знаходитися в каталозі `~/.cargo/bin`.

Наступним кроком є запуск вузла колатора. Ви можете прочитати про це в статті ["Як запустити колатор Robonomics"](/docs/how-to-launch-the-robonomics-collator).