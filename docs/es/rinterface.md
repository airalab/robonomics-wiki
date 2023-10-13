---
title: Interfaz de Python y Robonomics IO
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Algunas extrínsecas implementadas en los palets de Robonomics son difíciles de enviar desde la aplicación Polkadot. Además de eso, hay 
una necesidad de interactuar con esta funcionalidad utilizando lenguajes de programación. Con este propósito se desarrolló una herramienta simple de Python
llamado [interfaz-robonomics](https://github.com/Multi-Agent-io/robonomics-interface). Es una envoltura sobre mantenida por polkascan.
[interfaz-substrato-py](https://github.com/polkascan/py-substrate-interface).A continuación se muestra una breve descripción de este paquete
y algunos enlaces y ejemplos útiles. También se discuten las herramientas de línea de comandos.

## robonomics-interface

Disponible en [PyPi](https://pypi.org/project/robonomics-interface/) el paquete está listo para descargar e instalar.
También hay disponible una [documentación](https://multi-agent-io.github.io/robonomics-interface/) detallada generada por docstring.

En resumen, esta es una herramienta para desarrolladores que desean interactuar con la cadena de bloques de Robonomics a través de herramientas de programación. Casi 
todos los proyectos de Python del equipo de Robonomics que interactúan con la parachain utilizan esta interfaz.

### Instalación

El proceso de instalación requiere que el usuario tenga al menos Python 3.8 instalado. Ni `x86`, ni `arm7`, ni `arm8`
arquitecturas requieren un proceso de compilación. Todas las ruedas son construidas y publicadas por los mantenedores de las dependencias.

`pip` se utiliza como herramienta de instalación:

```bash
$ pip3 install robonomics_interface
```

### Uso de ejemplo

La idea principal es crear una instancia de `Account` y luego usarla para crear instancias dedicadas a los palets.


```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

<robo-wiki-note type="note" title="Local node">

  También es posible utilizar puntos finales personalizados (por ejemplo, un nodo local para pruebas):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```

</robo-wiki-note>

También es posible enviar extrínsecas:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("Hello, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # this is an extrinsic hash
```

<robo-wiki-note type="note" title="Docs">

  Como se ha dicho, hay más ejemplos disponibles en la página de [documentación](https://multi-agent-io.github.io/robonomics-interface/).

</robo-wiki-note>

## CLI tool

`robonomics-interface` también contiene herramientas de línea de comandos de Python `click` para usar con fines de prototipado y pruebas rápidas. Se instala
con el paquete y está disponible en la Terminal:

```bash
$ robomomics_interface --help

#Usage: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Options:
#  --help  Show this message and exit.
#
#Commands:
#  read   Subscribe to datalog/launch events in the chain
#  write  Send various extrinsics (launch commands or record datalogs)
```

Puedes intentar usarlo con un nodo local. Se adopta la filosofía de canalización.

```bash
$ echo "Hello, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # this is an extrinsic hash
```