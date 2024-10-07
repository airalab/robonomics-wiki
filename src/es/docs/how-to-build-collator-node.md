---
title: Cómo construir un nodo collator desde la fuente
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
  - Cadena de herramientas Rust nightly-2022-08-05
---


{% roboWikiNote {title:"Nota", type: "nota"}%} En la grabación de pantalla y capturas de pantalla de este artículo, usamos la versión 1.4.0 de Robonomics. Debes usar los mismos comandos, pero reemplazar la versión de Robonomics con la actual.{% endroboWikiNote %}

## ¿Qué es un collator?

El collator es parte de la paracadena de Robonomics. Este tipo de nodos crea nuevos bloques para la cadena.

>Los collators mantienen las paracadenas recopilando transacciones de usuarios y produciendo pruebas de transición de estado para los validadores de la Cadena de Relevo. En otras palabras, los collators mantienen las paracadenas agregando transacciones de paracadena en candidatos de bloques de paracadena y produciendo pruebas de transición de estado para los validadores basadas en esos bloques.

Puedes aprender más sobre el collator en la página wiki relacionada de [Polkadot](https://wiki.polkadot.network/docs/learn-collator)

En la paracadena de Robonomics, cada collator recibe recompensas (**0.000380520 XRT**) por cada bloque que construye, si este bloque se selló en la cadena.
Además, el collator recibe **50% de las tarifas de transacción** de este bloque.

## Proceso de construcción

https://youtu.be/wnAtD7w0Pxk

Asegúrate de tener Rust y el software de soporte instalados. El instalador de Rust te preguntará sobre las opciones de instalación actuales, debes elegir la opción `1) Continuar con la instalación (predeterminado)`.


```
  curl https://sh.rustup.rs -sSf | sh
  # en Windows descarga y ejecuta rustup-init.exe
  # desde https://rustup.rs en su lugar
  source $HOME/.cargo/env
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_rust.jpg", alt:"instalar rust"} %}{% endroboWikiPicture %}


Instala la cadena de herramientas nightly requerida y el objetivo wasm.
Los siguientes comandos son actuales para Robonomics v2.6.0:

```
  rustup install nightly-2022-08-05
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/install_nightly.jpg", alt:"instalar nightly"} %}{% endroboWikiPicture %}


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
    # Instalar git https://git-scm.com/download/win
    # Instalar LLVM
    # Descargar e instalar los binarios precompilados para Windows
    # de LLVM desde http://releases.llvm.org/download.html
  ```
Ahora puedes instalar el nodo de robonomics desde la fuente de git.

```
  cargo install --force --git https://github.com/airalab/robonomics --tag v2.6.0 robonomics-node
```

{% roboWikiPicture {src:"docs/how-to-build-collator-node/start_build_robonomics.jpg", alt:"Iniciar construcción de Robonomics"} %}{% endroboWikiPicture %}
{% roboWikiPicture {src:"docs/how-to-build-collator-node/end_build_robonomics.jpg", alt:"Finalizar construcción de Robonomics"} %}{% endroboWikiPicture %}


Después de este comando, el binario de robonomics compilado estará en el directorio `~/.cargo/bin`.

El siguiente paso es cómo iniciar el nodo collator. Puedes leer sobre esto en el artículo ["Cómo iniciar el collator de Robonomics"](/docs/how-to-launch-the-robonomics-collator).