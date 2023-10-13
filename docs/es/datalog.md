---
title: Datalog
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Ahora que tienes algunos fondos en tu cuenta, puedes enviar extrinsics. El primero en probar es un Datalog. Te permite almacenar datos de forma persistente en la cadena de bloques. ¡Imagina un almacenamiento distribuido y protegido criptográficamente para tus datos y esto es todo!**

<robo-wiki-note type="warning" title="Dev Node">

Por favor, preste atención de que estos tutoriales se demuestran en una instancia local de Robonomics Node. Configure la suya con [estas instrucciones](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navegue hasta  Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. Elija datalog -> record desde la lista desplegable de posibles extrínsecos

También elija una cuenta con la que desee enviar el extrínseco. Rellene el campo de registro.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalog admite una cadena con un máximo de 512 bytes. Para almacenar una gran cantidad de datos, se puede utilizar [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. Enviar transacción

Firme y envíe la transacción con una cuenta creada previamente utilizando la extensión o la DApp.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  También puede borrar **TODOS** sus registros con *datalog -> erase* llamada.

</robo-wiki-note>

## 4. Revise su datalog en el almacenamiento

Para ello, navegue hasta *Developer -> Chain state*, seleccione *datalog -> datalogIndex*, especifique su cuenta y presione el 
"+" botón para obtener los índices de los registros de su cuenta y luego explore el que necesite con *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="Explorarr">

  Todos los eventos, incluido el registro de datalog, se pueden ver en el flujo de eventos en el *Explorador*.

</robo-wiki-note>