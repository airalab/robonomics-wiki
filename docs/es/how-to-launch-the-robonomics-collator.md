---
title: Cómo lanzar el colador Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  En el screencast y las capturas de pantalla de este artículo, utilizamos la versión 1.4.0 de Robonomics. Debes usar los mismos comandos, pero reemplazar la versión de Robonomics por la actual.
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

Actualmente, la red Robonomics es mantenida principalmente por los desarrolladores iniciales, pero cualquier persona puede apoyar el proyecto. Cada nodo completo adicional de la cadena de bloques ayuda a que sea más sostenible y tolerante a fallos. Los binarios del nodo Robonomics están disponibles en [release](https://github.com/airalab/robonomics/releases) o se pueden [compilar desde el código fuente](/docs/how-to-build-collator-node/).

## ¿Qué es un collator?

Un colador es parte de la paracadena Robonomics. Este tipo de nodo crea nuevos bloques para la cadena Robonomics.

>Los collators mantienen las parachains recopilando transacciones de los usuarios y produciendo pruebas de transición de estado para los validadores de la Relay Chain. En otras palabras, los collators mantienen las parachains agregando transacciones de parachain en candidatos de bloques de parachain y produciendo pruebas de transición de estado para los validadores basadas en esos bloques.

Puedes obtener más información sobre los coladores en la página wiki relacionada de [Polkadot](https://wiki.polkadot.network/docs/learn-collator).

En la parachain de Robonomics, cada clasificador obtiene recompensas de (**0.001598184 XRT**) por cada bloque que construye (las recompensas se producen cuando los bloques se sellan a la cadena).
Además, el colador que construye el bloque recibe **el 50% de las tarifas de transacción** contenidas en el bloque que crean.

## Requisitos

Se recomienda lanzar un colador utilizando los **requisitos de hardware estándar** para [validadores de Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ Compatible con x86-64.
+ Intel Ice Lake, o más nuevo (Xeon o serie Core); AMD Zen3, o más nuevo (EPYC o Ryzen).
+ 4 núcleos físicos a 3.4GHz.
+ Multihilo simultáneo desactivado (Hyper-Threading en Intel, SMT en AMD).
+ Almacenamiento: Un SSD NVMe de 1 TB (debe tener un tamaño razonable para manejar el crecimiento de la cadena de bloques).
+ Memoria: 32 GB DDR4 ECC.


En este artículo utilizamos las siguientes especificaciones:
+ 4 vCPU
+ 700 GB de espacio NVMe para las bases de datos del colador. Se requiere la capacidad de ampliar este espacio en disco.
+ 8GB de RAM.


## Información importante
1. Utilizamos algunas variables en estas instrucciones y deberás reemplazar los valores por los tuyos en todos los comandos:
    + **%NODE_NAME%** es el nombre del nodo. Ejemplo: *mi-robonomics-kusama-collator*.
    + **%BASE_PATH%** es la ruta al volumen montado. Ejemplo: */mnt/HC_Volume_16056435/*.
    + **%POLKADOT_ACCOUNT_ADDRESS%** es la dirección de la cuenta en el ecosistema de Polkadot en formato SS58. Ejemplo: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*.

2. Ten en cuenta que debes incluir *--state-cache-size=0* en el lanzamiento del servicio del colador. Este parámetro es importante para la estabilidad del colador.
Puedes ver más información en el [issue](https://github.com/airalab/robonomics/issues/234) relacionado en GitHub.

## Lanzar fácilmente un colador Robonomics por primera vez

Puedes lanzar fácilmente un colador directamente desde la línea de comandos para verificar errores.
Después de hacer esto, se recomienda encarecidamente lanzar el colador Robonomics como un servicio (siguiente paso).

```
root@robokusama-collator-screencast:~# robonomics \
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


## Lanzar el colador Robonomics como un servicio

1. Crea el usuario para el servicio con directorio de inicio.
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Descarga, extrae y mueve el binario de Robonomics al directorio */usr/local/bin/*. Debes reemplazar *$ROBONOMICS_VERSION* con la versión actual de Robonomics en los comandos de esta sección. Puedes encontrar la versión actual en la [página de lanzamientos del repositorio de Robonomics en GitHub](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


3. Crea el archivo de servicio systemd llamado *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
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

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Guarda este archivo, luego habilita y inicia el servicio:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

URL de telemetría: https://telemetry.parachain.robonomics.network/#/Robonomics

Los registros de los clasificadores se pueden monitorear con: `journalctl -u robonomics.service -f` 

Una vez que se inicia el clasificador Robonomics, comenzará a sincronizarse con Kusama Relay Chain, esto puede llevar una cantidad de tiempo considerable, dependiendo de la velocidad de su red y las especificaciones del sistema, por lo que recomendamos descargar una instantánea de Kusama.


## Acelerar el proceso de sincronización utilizando una instantánea de Kusama

Recomendamos hacer esto inmediatamente después de haber creado e iniciado el servicio de Robonomics. Puedes encontrar más información sobre instantáneas e instrucciones de uso en la siguiente página: https://ksm-rocksdb.polkashots.io/

Instrucciones:

1. Detén el servicio de Robonomics y elimina el directorio actual de la base de datos de Kusama:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Descarga la instantánea actual y extráela:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    Puede eliminar el archivo descargado después de descomprimirlo correctamente:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Establece la propiedad correcta para la carpeta de la base de datos:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Inicia nuevamente el servicio de Robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Verifica los registros del servicio:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```    
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## Solución de problemas
### Error: "State Database error: Too many sibling blocks inserted"
Para corregir este error, simplemente puede iniciar su clasificador en modo archivo:

1) Primero, debes detener el servicio de Robonomics. 
    
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    

2) Luego agregue el parámetro `--state-pruning=archive` a la parte de la parachain del archivo de servicio. Ejemplo del archivo de servicio editado:
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

3) Recargue la configuración del administrador de systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Elimine la base de datos existente de la parachain:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Inicie el servicio de robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Después de eso, es necesario esperar la sincronización de la base de datos de la parachain.

### Error: "cannot create module: compilation settings are not compatible with the native host"
Este error está relacionado con los parámetros de virtualización. Es necesario utilizar el tipo "host-model" del procesador emulado. Puede configurarlo en el host de virtualización.

Pero, si encuentra este error en cualquier alojamiento, es necesario consultar al soporte técnico solo sobre este problema.
