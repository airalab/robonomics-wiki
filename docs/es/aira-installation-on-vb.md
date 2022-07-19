---
title: Instalación de AIRA en VirtualBox
locale: 'es' 
contributors: [akru]
translated: true
---

AIRA significa “Autonomous Intelligent Robot Agent”. Es el cliente de Robonomics Network desarrollado por [Airalab](https://aira.life). Es un sistema operativo basado en [NixOS](https://nixos.org/). Con AIRA puedes convertir cualquier sistema ciberfísico en un agente económico, donde los robots operan como un servicio por los pagos razonables. [Más informacion sobre AIRA aquí]((/docs/aira-overview))

Es posible instalar AIRA en una x86_64 PC. También hay imágenes para Raspberry Pi 3 y 4 compatibles con el equipo.

La mejor manera de probar AIRA es comenzar desde instalarlo como una máquina virtual en [VirtualBox](https://www.virtualbox.org/).

## Requerimientos

* VirtualBox
* [Paquete de extensión de VirtualBox](https://www.virtualbox.org/wiki/Downloads#VirtualBox6.1.2OracleVMVirtualBoxExtensionPack)
* 2Gb de RAM para la máquina
* 40Gb de espacio libre en disco

## Obtener la Imagen

AIRA tiene canales [estables](https://aira.life/channels/aira-stable/) e [inestables](https://aira.life/channels/aira-unstable/). Para obtener una imagen estable, descargue el archivo con la extensión `.ova`. El enlace para una imagen estable [está aquí](https://releases.aira.life/channels/aira/stable/862-aira-stable/nixos-20.03pre-git-x86_64-linux.ova).

No olvide comparar la suma de comprobación de la imagen descargada con el hash `SHA-256` de la última columna en [la página de descarga](https://aira.life/channels/aira-stable/). Debe ser igual a la salida del siguiente comando (es un ejemplo, primero verifique el nombre del archivo .ova descargado):

```
sha256sum nixos-20.03pre-git-x86_64-linux.ova
```

Es posible que desee ver el video tutorial:

https://www.youtube.com/embed/cDcaypYPBhI

## Solución de Problemas

Si tiene VirtualBox recién instalado, debe instalar el pack de [extensión](https://www.virtualbox.org/wiki/Downloads) o deshabilitar el controlador USB 2.0.

Además, VirtualBox puede mostrar una advertencia sobre `Display settings`. Considere cambiar el `Graphics Controller` en la configuración de la máquina virtual a `VMSVGA`.

## Importar a VirtualBox

Abra VirtualBox y presione `Ctrl+I` o `File > Import Applicance...`

![Imagen VB de importación AIRA](../images/aira-installation/aira_import_vb_image.jpg "Imagen VB de importación AIRA")

En este momento, el siguiente paso no es necesario, pero te ayudará a conectarte a la VM a través de SSH fácilmente.

Primero agregue el adaptador `Host-Only` en el menú de VirtualBox `File > Host Network Manager...` o presionando `Ctrl+H`

![Host Only](../images/aira-installation/host_only_adapter.jpg "Host Only")

Luego vaya a la configuración de la imagen, Red y agregue el segundo adaptador de red.

![Segundo adaptador](../images/aira-installation/add_second_adapter.jpg "Segundo adaptador")

Para obtener más detalles, consulte [la lección](/docs/aira-connecting-via-ssh/) independiente.

Opcionalmente, puede aumentar la cantidad de memoria de video y cambiar `Graphics Controller` a `VMSVGA`.

## Iniciar la Maquina

Finalmente presione `Start` y verá AIRA dándole la bienvenida con la dirección Ethereum generada y el identificador IPFS

![Imagen AIRA lista, pantalla de bienvenida](../images/aira-installation/aira_image_ready.jpg "Imagen AIRA lista, pantalla de bienvenida")

En la primera inicialización, AIRA genera una nueva dirección Ethereum e identificador IPNS para usted.

