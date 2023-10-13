---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**La siguiente instrucción es proporcionada por [Hubo Bubo](https://github.com/hubobubo)**

**El artículo original se encuentra [aquí](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Introducción
Para monitorear y mantener mejor el/los nodo(s) de Robonomics, es bueno configurar un monitoreo basado en Prometheus Server y Grafana. Este documento mostrará cómo configurar cada uno de ellos para monitorear completamente su nodo.

##  Prerrequisitos
* [Configuración del servidor con Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Collator de parachain de Robonomics instalado](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Asegúrese de que robonomics.service esté funcionando en su máquina y que el puerto 9615 sea accesible 

## Paso 1: Crear usuarios de servicio

Por razones de seguridad, comenzaremos creando dos nuevas cuentas de usuario, prometheus y node_exporter. Cree estos dos usuarios y use las opciones _--no-create-home_ y _--shell /bin/false_ para que estos usuarios no puedan iniciar sesión en el servidor.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Antes de descargar los binarios de Prometheus, cree los directorios necesarios para almacenar los archivos y datos de Prometheus. Siguiendo las convenciones estándar de Linux, crearemos un directorio en _/etc_ para los archivos de configuración de Prometheus y un directorio en _/var/lib_ para sus datos.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Ahora, establezca la propiedad del usuario y del grupo en los nuevos directorios para el usuario prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Paso 2: Descargar Prometheus

Primero, descargue y descomprima la versión estable actual de Prometheus en su directorio de inicio. Puede encontrar los últimos binarios en la [página de descarga de Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Ahora, descomprima el archivo descargado.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Esto creará un directorio llamado prometheus-2.21.0.linux-amd64 que contiene dos archivos binarios (prometheus y promtool), los directorios _consoles_ y _console_libraries_ que contienen los archivos de la interfaz web, una licencia, un aviso y varios archivos de ejemplo.

Copie los dos binarios al directorio _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Establezca la propiedad del usuario y del grupo en los binarios para el usuario prometheus creado en el Paso 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Copie los directorios consoles y _console_libraries_ a _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Establezca la propiedad del usuario y del grupo en los directorios para el usuario prometheus. Usar la bandera -R asegurará que la propiedad se establezca también en los archivos dentro del directorio.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Ahora que Prometheus está instalado, crearemos su configuración y archivos de servicio en preparación para su primera ejecución.

## Paso 3: Configurar Prometheus

En el directorio _/etc/prometheus_, use nano o su editor de texto favorito para crear un archivo de configuración llamado _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
En la configuración global, defina el intervalo predeterminado para recopilar métricas. Tenga en cuenta que Prometheus aplicará esta configuración a cada exportador a menos que la configuración propia del exportador anule las globales.

```
global:
  scrape_interval: 15s

```
Este valor de scrape_interval le indica a Prometheus que recopile métricas de sus exportadores cada 15 segundos, lo cual es suficiente para la mayoría de los exportadores.
Ahora, agregue Prometheus mismo a la lista de exportadores para recopilar con la siguiente directiva scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Prometheus utiliza el _job_name_ para etiquetar los exportadores en consultas y gráficos, así que asegúrese de elegir algo descriptivo aquí.

Y, como Prometheus exporta datos importantes sobre sí mismo que puede utilizar para monitorear el rendimiento y depurar, hemos anulado la directiva global scrape_interval de 15 segundos a 5 segundos para actualizaciones más frecuentes.

Por último, Prometheus utiliza las directivas _static_configs_ y _targets_ para determinar dónde se ejecutan los exportadores. Dado que este exportador en particular se ejecuta en el mismo servidor que Prometheus mismo, podemos usar localhost en lugar de una dirección IP junto con el puerto predeterminado, 9090.

Su archivo de configuración debería verse así ahora:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Guarde el archivo y salga de su editor de texto.

Ahora, establezca la propiedad del usuario y del grupo en el archivo de configuración para el usuario prometheus creado en el Paso 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Con la configuración completa, estamos listos para probar Prometheus ejecutándolo por primera vez.

## Paso 4: Ejecutar Prometheus

Inicie Prometheus como usuario _prometheus_, proporcionando la ruta tanto al archivo de configuración como al directorio de datos.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

La salida contiene información sobre el progreso de carga de Prometheus, el archivo de configuración y los servicios relacionados. También confirma que Prometheus está escuchando en el puerto _9090_.

```
_log output_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="No time or size retention was set so using the default time retention" duration=15d
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Starting Prometheus" version="(version=2.21.0, branch=HEAD, revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Starting TSDB ..."
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.368Z caller=web.go:523 component=web msg="Start listening for connections" address=0.0.0.0:9090
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="Replaying on-disk memory mappable chunks if any"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="On-disk memory mappable chunks replay completed" duration=12.659µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="Replaying WAL, this may take a while"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="WAL segment loaded" segment=0 maxSegment=1
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="WAL segment loaded" segment=1 maxSegment=1
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="WAL replay completed" checkpoint_replay_duration=48.125µs wal_replay_duration=8.253748ms total_replay_duration=8.343335ms
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB started"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server is ready to receive web requests."
```
Si recibes un mensaje de error, verifica que hayas utilizado la sintaxis YAML en tu archivo de configuración y luego sigue las instrucciones en pantalla para resolver el problema.

Ahora, detén Prometheus presionando _CTRL+C_, y luego abre un nuevo archivo de servicio _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
El archivo de servicio le indica a _systemd_ que ejecute Prometheus como usuario prometheus, con el archivo de configuración ubicado en el directorio _/etc/prometheus/prometheus.yml_ y que almacene sus datos en el directorio _/var/lib/prometheus_. Copia el siguiente contenido en el archivo:

```
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

Finalmente, guarda el archivo y cierra tu editor de texto. Para usar el servicio recién creado, recarga systemd.

```
sudo systemctl daemon-reload

```
Ahora puedes iniciar Prometheus usando el siguiente comando:

```
sudo systemctl start prometheus

```
Para asegurarte de que Prometheus esté en funcionamiento, verifica el estado del servicio.

```
sudo systemctl status prometheus

```
La salida te muestra el estado de Prometheus, el identificador del proceso principal (PID), el uso de memoria y más.

Si el estado del servicio no está activo, sigue las instrucciones en pantalla y vuelve a seguir los pasos anteriores para resolver el problema antes de continuar con el tutorial.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Cuando estés listo para continuar, presiona _Q_ para salir del comando de estado. Por último, habilita el servicio para que se inicie en el arranque.

```
sudo systemctl enable prometheus

```

Ahora que Prometheus está en funcionamiento, podemos instalar un exportador adicional para generar métricas sobre los recursos de nuestro servidor.

## Paso 5 — Descargar Node Exporter

Para ampliar Prometheus más allá de las métricas solo sobre sí mismo, instalaremos un exportador adicional llamado Node Exporter. Node Exporter proporciona información detallada sobre el sistema, incluido el uso de CPU, disco y memoria. Descarga la versión estable actual de Node Exporter en tu directorio de inicio. Puedes encontrar los últimos binarios en [la página de descarga de Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Ahora, descomprima el archivo descargado.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Esto creará un directorio llamado _node_exporter-1.0.1.linux-amd64_ que contiene un archivo binario llamado _node_exporter_, una licencia y un aviso.

Copia el binario al directorio _/usr/local/bin_ y establece la propiedad de usuario y grupo en el usuario node_exporter que creaste en el Paso 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Ahora que has instalado Node Exporter, probémoslo ejecutándolo antes de crear un archivo de servicio para que se inicie en el arranque.

## Paso 6 — Ejecutar Node Exporter

Los pasos para ejecutar Node Exporter son similares a los de ejecutar Prometheus en sí. Comienza creando el archivo de servicio Systemd para Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Copia el siguiente contenido en el archivo de servicio:

```
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter --collector.systemd

[Install]
WantedBy=multi-user.target
```

Guarda el archivo y cierra tu editor de texto. Por último, recarga systemd para usar el servicio recién creado.

```
sudo systemctl daemon-reload

```
Ahora puedes ejecutar Node Exporter usando el siguiente comando:

```
sudo systemctl start node_exporter

```
Verificar that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
Al igual que antes, esta salida te muestra el estado de Node Exporter, el identificador del proceso principal (PID), el uso de memoria y más. Si el estado del servicio no está activo, sigue los mensajes en pantalla y vuelve a seguir los pasos anteriores para resolver el problema antes de continuar.

```
_Output_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)
    Tasks: 7 (limit: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd
```
Por último, habilita Node Exporter para que se inicie en el arranque.

```
sudo systemctl enable node_exporter

```
Con Node Exporter completamente configurado y funcionando como se esperaba, le diremos a Prometheus que comience a recopilar las nuevas métricas.

## Paso 7 — Configurar Prometheus para recopilar Node Exporter

Dado que Prometheus solo recopila exportadores que están definidos en la sección scrape_configs de su archivo de configuración, deberemos agregar una entrada para Node Exporter, al igual que hicimos para Prometheus en sí. Abre el archivo de configuración.

```
sudo nano /etc/prometheus/prometheus.yml

```
Al final del bloque scrape_configs, agrega una nueva entrada llamada node_exporter.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Dado que este exportador también se está ejecutando en el mismo servidor que Prometheus en sí, podemos usar localhost en lugar de una dirección IP nuevamente junto con el puerto predeterminado de Node Exporter, 9100. Tu archivo de configuración completo debería verse así:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Guarda el archivo y cierra tu editor de texto cuando estés listo para continuar. Por último, reinicia Prometheus para que los cambios surtan efecto.

```
sudo systemctl restart prometheus

```
Una vez más, verifica que todo esté funcionando correctamente con el comando de estado.

```
sudo systemctl status prometheus

```
Si el estado del servicio no está activo, sigue las instrucciones en pantalla y vuelve a seguir tus pasos anteriores antes de continuar.

```
Output
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Ahora tenemos Prometheus y Node Exporter instalados, configurados y en funcionamiento.

## Paso 8 - Agregar Robonomic build en node_exporter

Después de instalar correctamente Prometheus y node_exporter, tendremos que usar el exportador de Prometheus integrado en cada proyecto de sustrato. Para lograr esto, debemos agregar una entrada adicional a _/etc/prometheus/prometheus.yml_. 
Abre el archivo de configuración.

```
sudo nano /etc/prometheus/prometheus.yml

```
Al final del bloque scrape_configs, agrega una nueva entrada llamada robonomic_exporter.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Guarde el archivo y salga de su editor de texto. Su archivo de configuración completo debería verse así:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```

Finalmente, reinicie Prometheus para que los cambios surtan efecto.

```
sudo systemctl restart prometheus

```
Una vez más, verifica que todo esté funcionando correctamente con el comando de estado.

```
sudo systemctl status prometheus

```
Ahora tenemos _Prometheus_, _Node Exporter_ y _Robonomic Exporter_ instalados, configurados y en funcionamiento. Ahora pasemos a Grafana.

## Paso 9 - Configuración de Grafana

El último paso es conectar Prometheus como una Fuente de Datos en Grafana. Para este tutorial, utilizaremos una instancia gratuita de Grafana basada en la nube que permite tener hasta 5 paneles de control, así como un panel de control dedicado de [Robonomics](https://grafana.com/grafana/dashboards/13015). Simplemente vaya a [grafana.com](https://grafana.com/), cree una cuenta nueva e inicie sesión en su instancia de Grafana recién creada.

Al principio, debemos agregar a Grafana una nueva _**Fuente de Datos**_, que en nuestro caso será el servidor Prometheus.
Vaya a Fuente de Datos:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

Luego haga clic en **_Agregar fuente de datos_**

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Next seleccione _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

En la nueva pantalla, ingrese la **_dirección IP de su servidor Prometheus con el puerto 9090_**

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

Después de eso, haga clic en _**Guardar y probar**_ si ha seguido todos los pasos, debería aparecer en verde y listo para importar el panel de control. En el sitio principal, haga clic en **+** y luego en **Importar**, como se muestra en la imagen a continuación:

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

Luego debería ver la página de importación:

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

En la _URL o ID del panel de control de Grafana.com_, escriba _**13015**_ (ya que este es el ID del panel de control de Robonomic)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

Después de cargar el panel de control externo, verá esta pantalla:

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

El último paso es elegir la **_Fuente de Datos_** previamente creada y hacer clic en _**Importar**_

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

¡ESO ES TODO! En este punto, debería ver el panel de control importado. 


## Referencias

* [Cómo instalar Prometheus en Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Crear un panel de control de monitoreo con Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Soporte de Grafana para Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Monitoreo de métricas de host de Linux con el exportador de nodos](https://prometheus.io/docs/guides/node-exporter/)
* [Consultar Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Visualizar métricas de nodos](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Exportador de Prometheus para Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Métricas de nodos de Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Panel de control del Exportador de Nodos para Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Métricas de ROBONOMICS (XRT) de Grafana](https://grafana.com/grafana/dashboards/13015)

