---
title: Ajouter des fonds à votre compte sur le portail Robonomics

contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Después de crear exitosamente sus cuentas en el portal de Robonomics, es hora de agregar fondos a ellas para que pueda eniciar transacciones.**

<robo-wiki-note type="warning" title="Dev Node">

Por favor, preste atención a que estos tutoriales se demuestran en una instancia local de Robonomics Node. Configure la suya con [estas instrucciones](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navegue a la sección de Cuentas en el portal de Robonomics 

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. Elija la cuenta desde la cual desea transferir fondos

En el modo de desarrollo, existen varias cuentas, con un valor de 10000 Unidades de fondos cada una, que se pueden utilizar para transferir fondos a otras cuentas creadas en la red de desarrollo. Estas cuentas están indicadas por signos de llave inglesa <img alt="wrench sign" src="../images/adding-funds/wrench.png" width="20" /> junto a ellas.

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- Haga clic en el botón "enviar" de la cuenta desde la cual desea transferir fondos, por ejemplo BOB

## 3. Elija la cuenta a la cual desea transferir fondos
Después de hacer clic en el botón "enviar", se le pedirá en la "ventana de envío de fondos". En la ventana solicitada:

- De la lista de cuentas disponibles, elija la cuenta a la cual desea enviar fondos.
- Ingrese la cantidad de Unidades que desea enviar.
- Presione "realizar transferencia"

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. Autorice la transacción

Después de presionar "realizar transferencia" en la etapa anterior, se le pedirá en la "ventana de autorización de transacción".<br/>
Revise los detalles de la transacción y finalmente haga clic en el botón "firmar y enviar".

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")
En este ejemplo, transferimos 500 unidades de fondos de "BOB" a "EMPLEADOR". Puede ver que la cuenta de EMPLEADOR, que inicialmente no tenía fondos, ahora tiene 500 Unidades de fondos.

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**Asegúrese de tener suficientes fondos en las cuentas que desea utilizar en el playground.**