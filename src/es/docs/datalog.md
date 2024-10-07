---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Ahora que tienes fondos en tu cuenta, puedes enviar extrínsecos. El primero que puedes probar es un Datalog. Te permite almacenar datos de forma persistente en la cadena de bloques. ¡Imagina un almacenamiento distribuido y protegido con criptografía para tus datos y eso es todo!**

{% roboWikiNote {type: "warning", title: "Nodo de Desarrollo"}%}Por favor, presta atención a que este y los siguientes tutoriales se están demostrando en una instancia local del Nodo Robonomics. Configura la tuya con [estas instrucciones](/docs/run-dev-node).
{% endroboWikiNote %}


## 1. Navega a Desarrollador -> Extrínsecos

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Elige datalog -> record en la lista desplegable de extrínsecos posibles

También elige una cuenta con la que desees enviar el extrínseco. Rellena el campo de registro.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Gran cantidad de datos"}%} Datalog admite una cadena con un máximo de 512 bytes. Para almacenar una gran cantidad de datos, se puede utilizar [IPFS](https://ipfs.tech/).
{% endroboWikiNote %}

## 3. Enviar transacción

Firma y envía la transacción con una cuenta creada previamente utilizando la extensión o la DApp.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Borrar"}%} También puedes borrar **TODOS** tus registros con la llamada *datalog -> erase*.
{% endroboWikiNote %}

## 4. Revisa tu datalog en el almacenamiento

Para esto, navega a *Desarrollador -> Estado de la cadena*, selecciona *datalog -> datalogIndex*, especifica tu cuenta y presiona el botón "+"
para obtener los índices de los registros de tu cuenta y luego explora el que necesitas con *datalog -> datalogItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Explorador"}%} Todos los eventos, incluido el registro de datalog, se pueden ver en el flujo de eventos en el *Explorador*.
{% endroboWikiNote %}