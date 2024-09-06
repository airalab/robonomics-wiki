---
title: Cómo lanzar el colador de Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"nota", type: "nota"}%} En el screencast y capturas de pantalla de este artículo, usamos la versión 1.4.0 de Robonomics. Necesitas usar los mismos comandos, pero reemplazar la versión de Robonomics con la actual.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

Actualmente, la red de Robonomics es mantenida principalmente por los desarrolladores iniciales, pero cualquiera puede apoyar el proyecto. Cada nodo completo adicional de la cadena de bloques ayuda a que sea más sostenible y tolerante a fallos. Los binarios de los nodos de Robonomics están disponibles en los activos de [lanzamiento](https://github.com/airalab/robonomics/releases) o se pueden [compilar desde el código fuente](/docs/how-to-build-collator-node/).

## ¿Qué es un colador?

Un colador es parte de la paracadena de Robonomics. Este tipo de nodo crea nuevos bloques para la cadena de Robonomics.

>Los coladores mantienen las paracadenas recopilando transacciones de las paracadenas de los usuarios y produciendo pruebas de transición de estado para los validadores de la Cadena de Relevo. En otras palabras, los coladores mantienen las paracadenas agregando transacciones de las paracadenas en candidatos de bloques de paracadenas y produciendo pruebas de transición de estado para los validadores basadas en esos bloques.

Puedes aprender más sobre los coladores en la página wiki relacionada de [Polkadot](https://wiki.polkadot.network/docs/learn-collator)

En la paracadena de Robonomics, cada colador recibe recompensas de (**0.001598184 XRT**) por cada bloque que el colador construye (las recompensas ocurren cuando los bloques se sellan en la cadena).
Además, el colador que construye el bloque recibe **el 50% de las tarifas de transacción** contenidas dentro del bloque que crean.

## Requisitos

Se recomienda lanzar un colador utilizando los **requisitos de hardware estándar** para los [validadores de Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ Compatible con x86-64.
+ Intel Ice Lake, o más nuevo (serie Xeon o Core); AMD Zen3, o más nuevo (EPYC o Ryzen).
+ 4 núcleos físicos @ 3.4GHz.
+ Multihilo simultáneo desactivado (Hyper-Threading en Intel, SMT en AMD).
+ Almacenamiento - Un SSD NVMe de 1 TB (ya que debe tener un tamaño razonable para hacer frente al crecimiento de la cadena de bloques).
+ Memoria - 32 GB DDR4 ECC


En este artículo usamos las siguientes especificaciones:
+ 4 vCPU
+ 700 GB de espacio NVMe para las bases de datos del colador. Se requiere la capacidad de expandir este espacio en disco.
+ 8GB de RAM


## Información importante
1. Usamos algunas variables en estas instrucciones, y deberás reemplazar los valores por los tuyos en todos los comandos:
    + **%NODE_NAME%** es el nombre del nodo. Ejemplo: *mi-colador-robonomics-kusama*
    + **%BASE_PATH%** es la ruta al volumen montado. Ejemplo: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** es la dirección de la cuenta en el ecosistema de Polkadot en formato SS58. Ejemplo: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Ten en cuenta que necesitas incluir *--state-cache-size=0* en el lanzamiento del servicio del colador. Este parámetro es importante para la estabilidad del colador.
Puedes ver más información en el [issue](https://github.com/airalab/robonomics/issues/234) relacionado en github.

## Lanzar fácilmente un colador de Robonomics por primera vez

Puedes lanzar fácilmente un colador directamente en la línea de comandos para verificar errores.
Después de hacer esto, se recomienda encarecidamente lanzar el colador de Robonomics como un servicio (sigue el siguiente paso).

```
root@colador-robokusama-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb
```


## Lanzar el colador de Robonomics como un servicio

1. Crea el usuario para el servicio con directorio de inicio
    ```
    root@colador-robokusama-screencast:~# useradd -m robonomics
    ```

2. Descarga, extrae y mueve el binario de Robonomics al directorio */usr/local/bin/*. Debes reemplazar *$ROBONOMICS_VERSION* con la versión actual de Robonomics en los comandos de esta sección. Puedes encontrar la versión actual en la [página de lanzamientos del repositorio de Robonomics en github](https://github.com/airalab/robonomics/releases).
   ```
   root@colador-robokusama-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@colador-robokusama-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@colador-robokusama-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Descargar binario de Robonomics 1.4.0"} %}{% endroboWikiPicture %}


3. Crea el archivo de servicio systemd llamado *robonomics.service*:
    ```
    root@colador-robokusama-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    Y agrega las siguientes líneas en el archivo de servicio:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Crear archivo de servicio de Robonomics"} %}{% endroboWikiPicture %}


    ```
    root@colador-robokusama-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Guarda este archivo, luego habilita y inicia el servicio:
    ```
    root@colador-robokusama-screencast:~# systemctl enable robonomics.service
    root@colador-robokusama-screencast:~# systemctl start robonomics.service
    ```

URL de telemetría: https://telemetry.parachain.robonomics.network/#/Robonomics

Los registros de los coladores se pueden monitorear con: `journalctl -u robonomics.service -f`

Una vez que se lance el colador de Robonomics, comenzará a sincronizarse con la Cadena de Relevo de Kusama, esto puede llevar una cantidad considerable de tiempo, dependiendo de la velocidad de tu red y las especificaciones del sistema, por lo que recomendamos descargar un snapshot de Kusama.


## Acelerar el proceso de sincronización utilizando un snapshot de Kusama

Recomendamos hacer esto inmediatamente después de haber creado e iniciado el servicio de Robonomics. Puedes encontrar más información sobre snapshots e instrucciones de uso en la siguiente página: https://ksm-rocksdb.polkashots.io/

Instrucciones:

1. Detén el servicio de Robonomics y elimina el directorio de la base de datos actual de Kusama:
    ```
    root@colador-robokusama-screencast:~# systemctl stop robonomics.service
    root@colador-robokusama-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Descarga el snapshot actual y extráelo:
    ```
    root@colador-robokusama-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@colador-robokusama-screencast:~# tar -xf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Descargar instantánea de Kusama"} %}{% endroboWikiPicture %}

    Puedes eliminar el archivo descargado después de desempaquetarlo con éxito:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Establecer la propiedad correcta para la carpeta de la base de datos:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Iniciar de nuevo el servicio de Robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Verificar los registros del servicio:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Verificar los registros del servicio"} %}{% endroboWikiPicture %}

## Solución de problemas
### Error: "Error de la base de datos de estado: Se insertaron demasiados bloques hermanos"
Para corregir este error, simplemente puedes iniciar tu collator en modo de archivo:

1) Primero, necesitas detener el servicio de Robonomics:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) Luego, agrega el parámetro `--state-pruning=archive` a la parte de la paracadena del archivo de servicio. Ejemplo del archivo de servicio editado:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

3) Recarga la configuración del administrador de systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Elimina la base de datos existente de la paracadena:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Inicia el servicio de robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Después de eso, es necesario esperar a que se sincronice la base de datos de la paracadena.

### Error: "no se puede crear el módulo: la configuración de compilación no es compatible con el host nativo"
Este error está relacionado con los parámetros de virtualización. Necesitas usar el tipo "host-model" del procesador emulado. Puedes configurar esto en el host de virtualización.

Pero, si encuentras este error en cualquier alojamiento, necesitas consultar al soporte técnico sobre este problema únicamente.