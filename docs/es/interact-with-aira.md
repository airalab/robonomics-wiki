---
title: Interactuar con AIRA
locale: 'es' 
contributors: [akru]
translated: true
---

En este punto, debe estar familiarizado con una [DApp](/docs/get-weather-on-fuji-mountain/) y cómo iniciar [la imagen AIRA](/docs/aira-installation-on-vb/). Ahora está listo para hacer cosas más complicadas como instalar un paquete e interactuar con él a través de DApp.

> **Importante:**
> asegúrese de haber cubierto las lecciones anteriores antes de continuar.


> **Consejo:**
> durante la lección, escribirás algunos comandos en la terminal. La imagen AIRA no es compatible con el portapapeles, por lo que, para facilitar la vida, eche un vistazo a [Connect via SSH](/docs/aira-connecting-via-ssh/) e inicie sesión a través de SSH en la VM

Video tutorial:

https://www.youtube.com/embed/QM06l07_wuA

## Instalación del Paquete

Después de iniciar AIRA e iniciar sesión con su terminal, haga lo siguiente:

```
su liability && cd
git clone https://github.com/vourhey/hello_aira
cd hello_aira
nix build -f release.nix
source result/setup.bash
rosrun hello_aira hello_aira
```

Ejecute uno por uno los comandos anteriores. Después del último, debería ver un enlace a DApp generado específicamente para su instancia.

![Terminal con AIRA](../images/aira_hello_terminal.jpg "Terminal con AIRA")

Haga clic en el enlace, debería mostrarse la DApp.

## DApp 

Conecte [MetaMask](http://metamask.io/) si se le solicita y haga clic en el botón.

![Solicitar conexión en Robonomics Dapp](../images/aira_hello_dapp.jpg "Solicitar conexión en Robonomics Dapp")

Firme el mensaje como de costumbre y espere el resultado.

![Espere el resultado de la solicitud](../images/aira_hello_dapp_2.jpg "Espere el resultado de la solicitud")

Mientras tanto, echa un vistazo a la terminal. Deberías ver el saludo.

![Saludo de AIRA en la terminal](../images/aira_hello_terminal_2.jpg "Saludo de AIRA en la terminal")

Al final aparecerá el saludo en la DApp.

![Saludo de la DApp de Robonomics para AIRA](../images/aira_hello_dapp_3.jpg "Saludo de la DApp de Robonomics para AIRA")

## Solución de Problemas

### Usted haga click en “Request Current Values” pero no ve el saludo

Probablemente acaba de lanzar AIRA e IPFS no ha terminado de inicializarse. Espere un minuto y vuelva a intentarlo.

### Si ves el Hash de respuesta pero los datos no aparecen

Lo más probable es que el problema provenga de la conexión IPFS. Haga clic en hash y verá el resultado. No es necesario descargar el archivo.

## Tarea para el Hogar (Opcional)

Si está familiarizado con [Python](https://www.python.org/), cambie el texto mostrado por algo diferente y complete la lección con su versión de `hello_aira`

- Haz una bifurcación del [repositorio](https://github.com/vourhey/hello_aira)
- El texto de salida se encuentra [aquí](https://github.com/Vourhey/hello_aira/blob/master/scripts/hello_aira#L45)
