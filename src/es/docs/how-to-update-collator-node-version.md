---
title: Cómo actualizar la versión del nodo Collator de Robonomics

contributors: [Leemo94]
---

Se recomienda haber leído los siguientes artículos antes de leer esta publicación: ["Cómo construir un nodo Collator"](/docs/how-to-build-collator-node) y ["Cómo lanzar el Collator de Robonomics"](/docs/how-to-launch-the-robonomics-collator).

Este artículo contiene los comandos necesarios para actualizar un nodo Collator de Robonomics (ejecutándose en Ubuntu), y también proporciona un ejemplo a continuación.

## **Comandos necesarios**

0. Antes de comenzar, se recomienda que hayas iniciado sesión como `root`, si no es así, te recomendaría que uses:


{% codeHelper { copy: true} %}

```shell
sudo su -
```

{% endcodeHelper %}

1. Detén el servicio de Robonomics:

{% codeHelper { copy: true} %}

```shell
systemctl stop robonomics.service
```

{% endcodeHelper %}


2. Elimina la versión anterior de Robonomics (asegúrate de estar en el directorio correcto):

{% codeHelper { copy: true} %}

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

{% endcodeHelper %}

3. Obtén la [última versión de lanzamiento](https://github.com/airalab/robonomics/releases) de Robonomics:


{% codeHelper { copy: true}%}

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

{% endcodeHelper %}


4. Extrae el archivo:

{% codeHelper { copy: true}%}

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

{% endcodeHelper %}


5. Mueve el archivo:

{% codeHelper { copy: true}%}

```shell
mv robonomics /usr/local/bin/
```

{% endcodeHelper %}

{% roboWikiNote {type: "note"}%} Debes mover este archivo al directorio correcto donde instalaste el nodo de Robonomics {% endroboWikiNote %}

6. Inicia Robonomics:

{% codeHelper { copy: true}%}

```shell
systemctl start robonomics.service
```

{% endcodeHelper %}

Ejemplo para actualizar el nodo Collator a Robonomics v1.8.4:

{% codeHelper %}

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service

```

{% endcodeHelper %}


## **Cambiar la base de datos de la Cadena de Relevo Kusama sin establecer una ruta base**

Hay momentos en los que ciertas instantáneas de la Cadena de Relevo Kusama causan errores en tu nodo. Esto a menudo hará que tu nodo deje de funcionar. Ejemplo de error causado por una base de datos de Cadena de Relevo corrupta:


{% codeHelper %}

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Error del votante GRANDPA: no se pudo completar una ronda en el disco: Base de datos
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] La tarea esencial `grandpa-voter` falló. Apagando el servicio.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Servicio(Otro("Tarea esencial fallida."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: El proceso principal ha salido, código=salido, estado=1/FALLO
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Falló con el resultado 'código de salida'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Servicio(Cliente(Backend("Argumento no válido: Familias de columnas no abiertas: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: El proceso principal ha salido, código=salido, estado=1/FALLO
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Falló con el resultado 'código de salida'.
```

{% endcodeHelper %}


Para solucionar este error, debes eliminar tu base de datos existente de la Cadena de Relevo Kusama (probablemente RocksDb) y reemplazarla por otra base de datos como ParityDb. Ejecuta los siguientes comandos:

1. Encuentra el directorio del nodo de Robonomics y verifica los archivos:

{% codeHelper %}

```shell
cd /home/robonomics/
ls -a
```

{% endcodeHelper %}


2. Confirma que ves el directorio polkadot, y luego navega al directorio chains:


{% codeHelper %}

```shell
cd /polkadot/chains/
ls -a
```

{% endcodeHelper %}

3. Elimina el directorio `ksmcc3`:


{% codeHelper {copy: true} %}

```shell
rm -r ksmcc3
```

{% endcodeHelper %}


4. Crea un nuevo directorio `ksmcc3`.

{% codeHelper {copy: true} %}

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

{% endcodeHelper %}

5. Ahora necesitas descargar una nueva instantánea. Este ejemplo utiliza una instantánea de Cadena de Relevo altamente podada, pero puedes cambiarla por cualquier instantánea que prefieras.


{% codeHelper {copy: true} %}

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

{% endcodeHelper %}

6. Mientras se descarga la instantánea, abre una nueva sesión y edita tu archivo de servicio:

{% codeHelper {copy: true} %}

```shell
sudo nano /etc/systemd/system/robonomics.service
```

{% endcodeHelper %}

Modifica las líneas dentro del archivo de servicio que se relacionan con la base de datos y la poda:


{% codeHelper {copy: true} %}

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

{% endcodeHelper %}


Utiliza `Ctrl + S` y luego `Ctrl + X` para guardar y salir del archivo de servicio.

7. Ahora necesitas recargar tu demonio.

{% codeHelper {copy: true} %}

```shell
systemctl daemon-reload
```

{% endcodeHelper %}


8. Para este momento, en tu otra sesión, esperemos que la nueva base de datos se haya descargado, así que extrae el archivo:

{% codeHelper {copy: true} %}

```shell
tar -xvzf ksm_pruned.tar.gz
```

{% endcodeHelper %}


9. Después de que se complete el desempaquetado, ejecuta lo siguiente:

{% codeHelper {copy: true} %}

```shell
chown -R robonomics:robonomics paritydb
```

{% endcodeHelper %}

10. Ahora puedes iniciar el servicio, monitorearlo en busca de errores y verificar que esté emparejando tanto en la cadena de relevo como en la paracadena:

{% codeHelper {copy: true} %}

```shell
systemctl start robonomics && journalctl -fu robonomics
```

{% endcodeHelper %}