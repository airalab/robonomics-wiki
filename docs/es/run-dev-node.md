---
title: Cómo ejecutar un nodo de desarrollo de Robonomics
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Para probar tus aplicaciones en Robonomics, es posible que desees ejecutarlo en modo de desarrollo. Este artículo muestra paso a paso
instrucciones sobre cómo obtener tu propia instancia de prueba local de Robonomics.**


## Obtener el archivo binario del nodo

1. Primero, necesitas un archivo binario, descarga el archivo comprimido desde la última [versión](https://github.com/airalab/robonomics/releases).

2. Navega hasta la carpeta del archivo comprimido, descomprímelo y cambia los permisos:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Ejecutar

Ejecuta el nodo con:

```bash
./robonomics --dev
```
Verás la siguiente salida:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  Si deseas eliminar los bloques existentes, puedes hacerlo eliminando RocksDB en `/tmp/substrate******/chains/dev/db/full`.
  Reemplaza `******` con el identificador correspondiente que se muestra en los registros al iniciar.

  Si deseas iniciar el nodo desde cero cada vez, utiliza la opción `--tmp`.

</robo-wiki-note>

## Conectar

Ahora puedes conectarte a tu nodo local a través del [Portal Polkadot](https://polkadot.js.org/apps/#/explorer).

Cambia la red a `Local Node` en la esquina superior izquierda y presiona `Switch`.

![switch](../images/dev-node/portal.png)

¡Bienvenido a la instancia local de Robonomics!

![local_node](../images/dev-node/dev-portal.png)


