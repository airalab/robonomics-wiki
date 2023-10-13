---
title: Cómo actualizar la versión del nodo Robonomics Collator

contributors: [Leemo94]
---

Se recomienda haber leído los siguientes artículos antes de leer esta publicación: ["Cómo construir un nodo Collator"](/docs/how-to-build-collator-node) y ["Cómo lanzar el Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

Este artículo contiene los comandos necesarios para actualizar un nodo Collator de Robonomics (ejecutándose en Ubuntu), y también proporciona un ejemplo posteriormente.

## **Comandos necesarios**

0. Antes de comenzar, se recomienda que haya iniciado sesión como `root`, si no es así, entonces recomendaría que utilice:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Detenga el servicio de Robonomics:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Elimine la versión anterior de Robonomics (asegúrese de estar en el directorio correcto):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Obtenga la [última versión](https://github.com/airalab/robonomics/releases) de Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Extraiga el archivo:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Mueva el archivo:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

Debe mover este archivo al directorio correcto donde instaló el nodo Robonomics)

</robo-wiki-note>

6. Inicie Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Ejemplo para actualizar el nodo Collator a Robonomics v1.8.4:

<code-helper>

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
</code-helper>

## **Cambiar la base de datos de la cadena de relevo Kusama sin establecer una ruta base**

Hay momentos en los que ciertos snapshots de la cadena de relevo Kusama causan errores en su nodo. Esto a menudo hace que su nodo deje de funcionar. Ejemplo de error causado por una base de datos corrupta de la cadena de relevo:

<code-helper>

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```
</code-helper>

Para solucionar este error, debe eliminar su base de datos existente de la cadena de relevo Kusama (probablemente RocksDb) y reemplazarla por otra base de datos como ParityDb. Ejecute los siguientes comandos:

1. Encuentre el directorio del nodo Robonomics y verifique los archivos:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Confirme que ve el directorio polkadot y luego navegue hasta el directorio chains:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Elimine el directorio `ksmcc3`:

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Cree un nuevo directorio `ksmcc3`.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Ahora debe descargar un nuevo snapshot. Este ejemplo utiliza un snapshot de la cadena de relevo altamente podado, pero puede cambiarlo por cualquier snapshot que prefiera.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Mientras se descarga el snapshot, abra una nueva sesión y edite su archivo de servicio:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Modifique las líneas dentro del archivo de servicio que se refieren a la base de datos y la poda:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Use `Ctrl + S` y luego `Ctrl + X` para guardar y salir del archivo de servicio.

7. Ahora debe recargar su daemon.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. Para este momento, en su otra sesión, esperemos que se haya descargado la nueva base de datos, así que extraiga el archivo:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. Después de que se complete el desempaquetado, ejecute lo siguiente:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Ahora puede iniciar el servicio, monitorearlo en busca de errores y verificar que esté emparejado tanto en la cadena de relevo como en la parachain:


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>