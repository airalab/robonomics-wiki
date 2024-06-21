---
title: Administración Global

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**Este artículo te mostrará cómo configurar un nuevo usuario en tu Home Assistant.**

## Añadir usuarios a la suscripción

No puedes utilizar cuentas creadas anteriormente porque `SUB_OWNER` y `SUB_CONTROLLER` proporcionan seguridad, y el primer usuario que creaste cuando iniciaste por primera vez Home Assistant no tiene una cuenta de Robonomics Parachain.

1. Crea una cuenta en Robonomics parachain, como lo hiciste en el [artículo anterior](/docs/sub-activate/).

2. Utilizando la cuenta `SUB_OWNER`, añade una nueva cuenta de usuario a la suscripción en la [dapp](https://dapp.robonomics.network/#/subscription/devices). Ahora debería haber tres direcciones en la lista de acceso: `SUB_OWNER`, `SUB_CONTROLLER` y `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## Conceder acceso al usuario

1. Ve al servicio de dapp llamado [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). Elige la cuenta que acabas de crear en la barra lateral derecha (verifica que has elegido la cuenta deseada presionando el ícono de perfil).

2. Ingresa la semilla `USER` en el campo requerido. Añade las direcciones `SUB_OWNER` y `SUB_CONTROLLER` en los campos de créditos de administrador. Si todo es correcto, verás el estado de verificación `VERIFIED`.

3. Crea una contraseña para el nuevo usuario que acabas de registrar y luego confirma la transacción, que ahora no tendrá tarifa debido a la suscripción. Más tarde podrás restaurar la contraseña en la pestaña de Restaurar.

4. Después del proceso de registro, inicia sesión en Home Assistant con la dirección de tu usuario como inicio de sesión y la contraseña recién creada.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

Ahora puedes utilizar la dapp para controlar tu hogar a través de Robonomics, consulta el artículo [**"Obtener Telemetría del Hogar Inteligente"**](/docs/smart-home-telemetry/).

## Solución de problemas

1. Si olvida una contraseña para Home Assistant desde su cuenta de Robonomics, [consulte la Dapp.](https://dapp.robonomics.network/#/home-assistant)
Ve a la parte "Your Home Assistant password" y elige la pestaña "Restore".
