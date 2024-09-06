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


{% roboWikiNote {title:"Примітка", type: "note"}%} У відео та знімках екрану цієї статті ми використовували версію 1.4.0 Robonomics. Вам потрібно використовувати ті ж команди, але замінити версію Robonomics на поточну.{% endroboWikiNote %}

## Що таке колатор

Колатор є частиною паралельної мережі Robonomics. Цей тип вузлів створює нові блоки для ланцюжка.

>Колатори підтримують паралельні ланцюжки, збираючи транзакції паралельних ланцюжків від користувачів та створюючи докази переходу стану для валідаторів Ланцюжка Реле. Іншими словами, колатори підтримують паралельні ланцюжки, агрегуючи транзакції паралельних ланцюжків у кандидати на блоки паралельних ланцюжків та створюючи докази переходу стану для валідаторів на основі цих блоків.

Докладніше про колатора можна дізнатися на відповідній [сторінці вікі Polkadot](https://wiki.polkadot.network/docs/learn-collator)

У паралельній мережі Robonomics кожен колатор отримує винагороду (**0.000380520 XRT**) за кожен побудований блок, якщо цей блок був запечатаний у ланцюжок.
Також колатор отримує **50% від оплати транзакцій** з цього блоку.

## Процес побудови

https://youtu.be/wnAtD7w0Pxk

Переконайтеся, що у вас встановлено Rust та необхідне програмне забезпечення. Інсталятор Rust запитає вас про поточні опції встановлення, ви повинні вибрати опцію `1) Продовжити встановлення (за замовчуванням)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # на Windows завантажте та запустіть rustup-init.exe
  # з https://rustup.rs замість цього
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"install rust"} %}{% endroboWikiPicture %}


Встановіть необхідний нічний інструментарій та ціль wasm.
Наступні команди актуальні для Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"install nightly"} %}{% endroboWikiPicture %}


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
Також вам потрібно встановити наступні пакети:

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
    # Встановіть git https://git-scm.com/download/win
    # Встановіть LLVM
    # Завантажте та встановіть попередньо побудовані бінарні файли для Windows
    # LLVM з http://releases.llvm.org/download.html
  ```
Тепер ви можете встановити вузол robonomics з вихідного коду git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Start build Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"End build Robonomics"} %}{% endroboWikiPicture %}


Після цієї команди скомпільований бінарний файл robonomics буде в каталозі `~/.cargo/bin`.

Наступним кроком є запуск вузла колатора. Про це можна прочитати у статті ["Як запустити колатор Robonomics"](/docs/how-to-launch-the-robonomics-collator).