---
title: Conexión de Aira a través de SSH
locale: 'es' 
contributors: [akru]
translated: true
---

Es más conveniente trabajar con una máquina virtual a través de una conexión SSH. En esta sección configuraremos VM.

> **Se requiere tener su clave pública ssh en Github. En caso de que no tenga uno, siga [el enlace](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)**

A continuación se muestra el video tutorial:

https://www.youtube.com/embed/R6waDG5iwm0

## Añadir el Adaptador Host

Vaya a `File` -> `Host Network Manager...` o presione `Ctrl+H`

![Administrador de red de VirtualBox](../images/virtualbox_network_manager.png "Administrador de red de VirtualBox")

Click en boton `Create`.

## Añadir el segundo adaptador a la VM

Seleccione la VM importada y haga clic en `Settings`. Vaya a la pestaña `Network` y habilite el segundo adaptador.

![Añadir el segundo adaptador](../images/add_second_adapter_to_vm.png "Añadir el segundo adaptador")

## Keys Autorizadas Pobladas

Inicie la VM y ejecute el siguiente comando reemplazando `<username>` con su nombre de usuario de Github:

```
mkdir .ssh
chmod 700 .ssh
curl -sSL https://github.com/<username>.keys >> .ssh/authorized_keys
```

Descubra la dirección IP de la máquina virtual ejecutando:

```
ip a
```

Debe buscar una dirección que comience con `192.168.xx.xx`

## Iniciar Sesion a través de SSH

Ahora abra su terminal e inicie sesión a través de SSH como de costumbre usando la dirección del paso anterior:

```
ssh root@192.168.xx.xx
```
