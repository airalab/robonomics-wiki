---
title: Interfaz de Python y Robonomics IO
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Algunas extrínsecas implementadas en los palets de Robonomics son difíciles de enviar desde la aplicación Polkadot. Además, es necesario interactuar con esta funcionalidad utilizando lenguajes de programación. Con este propósito se desarrolló una herramienta simple en Python llamada [robonomics-interface](https://github.com/Multi-Agent-io/robonomics-interface). Es un envoltorio sobre [py-substrate-interface](https://github.com/polkascan/py-substrate-interface) mantenido por polkascan. A continuación, se presenta una breve descripción de este paquete y algunos enlaces y ejemplos útiles. También se discuten las herramientas de la interfaz de línea de comandos (CLI).**

## robonomics-interface

Disponible en el paquete [PyPi](https://pypi.org/project/robonomics-interface/) listo para descargar e instalar.
También está disponible una [documentación](https://multi-agent-io.github.io/robonomics-interface/) detallada generada por docstring.

En resumen, esta es una herramienta para desarrolladores que desean interactuar con la cadena de bloques de Robonomics a través de herramientas de programación. Casi todos los proyectos en Python del equipo de Robonomics que interactúan con la paracadena utilizan esta interfaz.

### Instalación

El proceso de instalación requiere que el usuario tenga al menos Python 3.8 instalado. Ni las arquitecturas `x86`, ni `arm7`, ni `arm8` requieren un proceso de compilación. Todas las ruedas son construidas y publicadas por los mantenedores de las dependencias.

Se utiliza `pip` como herramienta de instalación:

```bash
$ pip3 install robonomics_interface
```

### Uso de muestra

La idea principal es crear una instancia de `Account` y luego usarla para crear instancias dedicadas a los palets.

```python
from robonomicsinterface import Account, Datalog
account = Account()
datalog_ = Datalog(account)
datalog_.get_item(addr="4G1V6yyvrkd3Z57H1giUky8RTRX3SZieRvuDpQzK4knNRy5R",index=2)

>>> (1657226418528, 'blah')
```

{% roboWikiNote {title:"Nodo local", type: "note"}%}
  También es posible utilizar puntos finales personalizados (por ejemplo, un nodo local para pruebas):

  ```python
  account = Account(remote_ws="ws://127.0.0.1:9944")
  ```
{% endroboWikiNote %}

También es posible enviar extrínsecas:

```python
from robonomicsinterface import Account, Datalog
account = Account(seed="one two three four five six seven eight nine ten eleven twelve")
datalog_ = Datalog(account)
datalog_.record("¡Hola, Robonomics!")

>>> 0xb2f742b6164ffc14b75a21188b37287c2416e6617635805e0a77db12773f6068  # este es un hash de extrínseco
```

{% roboWikiNote {title:"Documentos", type: "note"}%}Como se ha mencionado, hay más ejemplos disponibles en la página de [documentación](https://multi-agent-io.github.io/robonomics-interface/). {% endroboWikiNote %}

## Herramienta CLI

`robonomics-interface` también contiene herramientas CLI de Python `click` para usar en prototipos y pruebas rápidas. Se instala con el paquete y está disponible en la Terminal:

```bash
$ robomomics_interface --help

#Uso: robonomics_interface [OPTIONS] COMMAND [ARGS]...
#
#Opciones:
#  --help  Muestra este mensaje y sale.
#
#Comandos:
#  read   Suscríbase a eventos de datalog/lanzamiento en la cadena
#  write  Envíe varias extrínsecas (comandos de lanzamiento o registre datalogs)
```

Puedes intentar usarlo con un nodo local. Se adopta la filosofía de canalización:

```bash
$ echo "¡Hola, Robonomics!" | robonomics_interface write datalog -s "//Alice" --remote_ws "ws://127.0.0.1:9944"

#0x22dbac7d25d2ee67c7d985f074163f674c8c9b4c554e545ca4c7186307e9023c  # este es un hash de extrínseco
```