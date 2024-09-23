---
title: Agregar fondos a tu cuenta en el Portal de Robonomics

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Después de crear con éxito tus cuentas en el portal de Robonomics, es hora de agregar fondos a ellas para poder iniciar transacciones.**

{% roboWikiNote {title: 'Nodo de Desarrollo', type: "warning"} %}Por favor, presta atención a que estos y los siguientes tutoriales se demuestran en una instancia local del Nodo de Robonomics. Configura el tuyo con [estas instrucciones](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Navega a la sección de Cuentas en el portal de Robonomics

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"cuentas"} %}{% endroboWikiPicture %}

## 2. Elige la cuenta de la que deseas transferir fondos

En el modo de desarrollo, existen varias cuentas, con un valor de 10000 unidades de fondos cada una, que se pueden utilizar para transferir fondos a otras cuentas creadas en la red de desarrollo. Estas cuentas están indicadas por signos de llave inglesa <img src="/assets/images/docs/adding-funds/wrench.png" alt="signo de llave inglesa" width="20"/> junto a ellas.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Cuentas-para-enviar", caption: "Cuentas-para-enviar"} %}{% endroboWikiPicture %}

- Haz clic en el botón "enviar" de la cuenta de la que deseas transferir fondos, por ejemplo, BOB

## 3. Elige la cuenta a la que deseas transferir fondos
Después de hacer clic en el botón "enviar", se te presentará la "ventana de envío de fondos". En la ventana que aparece:

- De la lista de cuentas disponibles, elige la cuenta a la que deseas enviar fondos.
- Ingresa la cantidad de unidades que deseas enviar.
- Presiona "realizar transferencia"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transferir-Fondos", caption: "Transferir-Fondos"} %}{% endroboWikiPicture %}

## 4. Autoriza la transacción

Después de presionar "realizar transferencia" en la etapa anterior, se te presentará la "ventana de autorización de transacción".<br/>
Revisa los detalles de la transacción y finalmente haz clic en el botón "firmar y enviar".

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"firmar-transacción", caption: "firmar-transacción"} %}{% endroboWikiPicture %}

En este ejemplo, transferimos 500 unidades de fondos de "BOB" a "EMPLEADOR". Puedes ver que la cuenta del EMPLEADOR, que inicialmente no tenía fondos, ahora tiene 500 unidades de fondos.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"fondos-agregados", caption: "fondos-agregados"} %}{% endroboWikiPicture %}

**Asegúrate de tener suficientes fondos en las cuentas que deseas utilizar en el entorno de pruebas.**