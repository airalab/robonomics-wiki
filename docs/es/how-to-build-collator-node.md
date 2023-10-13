---
title: Cómo construir un nodo de collator desde el código fuente
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Rust toolchain nightly-2022-08-05
---

<robo-wiki-note type="note" title="Note">
  En el screencast y las capturas de pantalla de este artículo, utilizamos la versión 1.4.0 de Robonomics. Debes usar los mismos comandos, pero reemplazar la versión de Robonomics por la actual.
</robo-wiki-note>

## ¿Qué es un collator?

Collator es parte de la parachain de Robonomics. Este tipo de nodo crea nuevos bloques para la cadena..

>Los collators mantienen las parachains recopilando transacciones de los usuarios y produciendo pruebas de transición de estado para los validadores de la Relay Chain. En otras palabras, los collators mantienen las parachains agregando transacciones de parachain en candidatos de bloques de parachain y produciendo pruebas de transición de estado para los validadores basadas en esos bloques.

Puedes obtener más información sobre collator en la página wiki relacionada de [Polkadot](https://wiki.polkadot.network/docs/learn-collator).

En Robonomics parachain, cada clasificador obtiene recompensas (**0.000380520 XRT**) por cada bloque que construye, si este bloque estaba sellado a la cadena.
Además, el clasificador obtiene **tarifas de transacción del 50 %** de este bloque.

## Proceso de construcción

https://youtu.be/wnAtD7w0Pxk

Asegúrate de tener Rust y el software de soporte instalados. El instalador de Rust te preguntará sobre las opciones de instalación actuales, debes elegir la opción `1) Continuar con la instalación (predeterminado)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # on Windows download and run rustup-init.exe
  # from https://rustup.rs instead
  source $HOME/.cargo/env
```
![Instalar Rust](../images/how-to-build-collator-node/install_rust.jpg)


Instala la cadena de herramientas nocturna requerida y el objetivo wasm.
Los siguientes comandos son válidos para Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```
![Install nightly](../images/how-to-build-collator-node/install_nightly.jpg)


```
  rustup default nightly-2022-08-05
  rustup target add wasm32-unknown-unknown --toolchain nightly-2022-08-05
```
También necesitarás instalar los siguientes paquetes:

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
Ahora puedes instalar el nodo de Robonomics desde la fuente de git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```
![Start build Robonomics](../images/how-to-build-collator-node/start_build_robonomics.jpg)
![End build Robonomics](../images/how-to-build-collator-node/end_build_robonomics.jpg)


Después de este comando, el binario compilado de Robonomics estará en el directorio `~/.cargo/bin`.

El siguiente paso es cómo lanzar el nodo de collator. Puedes leer sobre ello en el artículo ["Cómo lanzar el collator de Robonomics"](/docs/how-to-launch-the-robonomics-collator).