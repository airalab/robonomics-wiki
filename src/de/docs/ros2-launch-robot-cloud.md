---
title: Starten Sie den Roboter aus der Cloud
contributors: [Fingerling42]
tools:   
  - Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**In diesem Artikel erfahren Sie, wie Sie die Robonomics-Startfunktion in ROS 2 anhand verschiedener Beispiele verwenden können**

Das Schlüsselmerkmal der Robonomics-Parachain zum Senden von Befehlen an Geräte ist die Start-Extrinsik. Diese Funktion ermöglicht es Ihnen, einen String zu senden, der einen Parameter enthält (in Form eines 32-Byte langen Hex-Werts), an eine bestimmte Adresse innerhalb der Parachain. Typischerweise repräsentiert der String einen IPFS-Hash, der auf eine Datei mit den erforderlichen Parametern verweist, um den Befehl auszuführen. Weitere Details zur Startfunktion finden Sie [in diesem Artikel](https://wiki.robonomics.network/docs/launch/).

Im Robonomics ROS 2 Wrapper ist die Startfunktion als Dienst zum Senden von Befehlen und als Thema zum Empfangen von Befehlen implementiert.

## Starten des Starts

Der Dienst namens `robonomics/send_launch` sieht wie folgt aus:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # Nur Parameter-String oder Dateiname mit Parametern, die auf IPFS hochgeladen werden müssen
string  target_address          # Adresse, die mit dem Start ausgelöst werden soll
bool    is_file         True    # Ist ein Startparametereine Datei, die auf IPFS hochgeladen werden muss (Standardwert ist True)?
bool    encrypt_status  True    # Überprüfen, ob die Parameterdatei mit der Zieladresse verschlüsselt werden muss, Standardwert ist True
---
string  launch_hash             # Hash der Starttransaktion
```

{% endcodeHelper %}

Der Dienst akzeptiert die folgenden Parameter als Teil der Anfrage: ein Befehlsparameter (entweder ein einfacher String oder der Name einer Datei, die die Befehlsparameter enthält), die Zieladresse im Robonomics-Parachain für den Startversand und zwei Flags: eines, das angibt, ob der Parameter eine Datei ist, und das andere, das angibt, ob die Datei verschlüsselt werden soll (beide sind standardmäßig auf true gesetzt). Die Datei wird auf IPFS hochgeladen, und ihr Hash wird als Startparameter übergeben. Daher muss die Datei im Verzeichnis platziert werden, das für IPFS-Dateien vorgesehen ist, wie im Konfigurationsfile für den `robonomics_ros2_pubsub`-Knoten angegeben.

Standardmäßig wird die Datei mit der öffentlichen Adresse des Startempfängers verschlüsselt. Die angewendete Verschlüsselungsmethode basiert auf der Public-Key-Verschlüsselung mit elliptischer Kurve Curve25519. In der aktuellen Implementierung wird die Verschlüsselung nur für Kontoadressen des Typs ED25519 (Edwards) unterstützt (mehr dazu finden Sie in [diesem Artikel](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

Nach dem Versenden des Starts gibt der Dienst den Transaktionshash zurück.

## Empfangen des Starts

Empfangenstarts wird in Form eines entsprechenden Themas organisiert. Technisch gesehen nutzt der Knoten die Funktionalität der robonomics-Schnittstelle, um sich für den Zustand seiner eigenen Adresse zu abonnieren und auf das Erscheinen des `NewLaunch`-Ereignisses zu warten. Sobald das Ereignis eintritt, veröffentlicht der Knoten eine Nachricht im Thema `robonomics/received_launch`. Das Nachrichtenformat lautet wie folgt:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # Adresse des Kontos, das den Startbefehl gesendet hat
string  param                   # Zeichenfolge mit Parameter oder Name der Datei mit Parametern
```

{% endcodeHelper %}

Die Nachrichtenfelder enthalten die Adresse, von der aus der Start gesendet wurde, und den Parameter selbst: entweder eine einfache Zeichenfolge oder den Namen der Datei mit Parametern, die von IPFS heruntergeladen und im IPFS-Arbeitsverzeichnis abgelegt wurde. Wenn die Datei verschlüsselt war, wird sie während dieses Prozesses entschlüsselt.


## Beispiel mit Turtlesim

Als nächstes zeigen wir, wie die Startfunktion am Beispiel von [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) verwendet wird. Turtlesim ist ein leichtgewichtiger Simulator, der für das Erlernen von ROS 2 entwickelt wurde. Sie können es mit dem folgenden Befehl installieren:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

Das Robonomics ROS 2 Wrapper-Paket enthält ein vorkonfiguriertes Paket namens `turtlesim_robonomics`, das speziell für Turtlesim angepasst ist. Dieses Paket ermöglicht es Ihnen, alle Funktionen des Wrappers zu testen. Lassen Sie uns versuchen, es auszuführen.

{% roboWikiNote {type: "warning", title: "Warnung"}%}

  Stellen Sie bitte sicher, dass Sie über ausreichendes Guthaben auf Ihrem Konto oder ein aktives Abonnement verfügen, um Transaktionen durchzuführen.

{% endroboWikiNote %}

1. Erstellen Sie zunächst eine Konfigurationsdatei für die Pubsub-Instanz von `turtlesim_robonomics` mithilfe der Vorlage `config/robonomics_pubsub_params_template.yaml`. Füllen Sie die entsprechenden Felder mit Ihren Robonomics-Anmeldeinformationen (Kontosamen, Kryptotyp, Abonnementinhaberadresse) aus. Geben Sie außerdem ein Verzeichnis für IPFS-Dateien an. Nach Abschluss benennen Sie die Datei beispielsweise in `first_pubsub_params.yaml` um.

2. Starten Sie den IPFS-Daemon:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. Führen Sie die folgende ROS 2-Startdatei aus. Sie wird alle erforderlichen Knoten starten: Turtlesim selbst, die Implementierung des Wrappers für Turtlesim und den Robonomics-Pubsub:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params
```.yaml namespace:='turtlesim1'
```

{% endcodeHelper %}

Sie sehen den Simulator mit der Schildkröte sowie ROS 2-Protokolle in der Konsole, die die IPFS-ID, den Pfad zum Verzeichnis mit IPFS-Dateien, die Robonomics-Adresse und andere relevante Informationen anzeigen.

### Starten Sie Turtlesim vom Polkadot-Portal aus

1. Turtlesim wird über das Thema `/cmd_vel` gesteuert, daher müssen Sie die entsprechenden Nachrichten vorbereiten und in einer Datei einfügen, die als Startparameter verwendet wird. Diese Nachrichten sind zur einfacheren Handhabung in einer JSON-Datei vorbereitet. Erstellen Sie eine Datei (z. B. `turtle_cmd_vel.json`) und fügen Sie Folgendes ein:

  {% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
```    }
  ]
  ```

  {% endcodeHelper %}

  Dieses JSON-Beispiel wird die Schildkröte anweisen, sich zweimal zu bewegen.

2. Als nächstes muss die Datei auf IPFS hochgeladen werden. Sie können jede Methode wählen, aber für dieses Beispiel verwenden wir IPFS Kubo. Öffnen Sie ein Terminal im Verzeichnis, in dem sich die JSON-Datei befindet, und laden Sie sie auf IPFS hoch:

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  Sie erhalten den IPFS-Hash der Datei. Stellen Sie sicher, dass Sie ihn für spätere Verwendung speichern.

3. Bevor der Start gesendet wird, muss der IPFS-Hash in einen 32-Byte langen String umgewandelt werden. Dies kann mit einigen Python-Befehlen erfolgen. Öffnen Sie ein Terminal, starten Sie den Python 3-Interpreter und führen Sie die folgenden Befehle aus:

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  Speichern Sie den resultierenden String für die spätere Verwendung.

4. Öffnen Sie das Robonomics [Polkadot/Substrate-Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) und navigieren SieZum **Entwickler** -> **Extrinsisches** Registerkarte. Wählen Sie das extrinsische `launch` -> `launch(robot, param)`. Geben Sie die Adresse Ihres Roboters im Feld `robot` ein und fügen Sie im Feld `param` den String mit dem konvertierten IPFS-Hash ein. Senden Sie die Transaktion ab.

5. Gehen Sie zum Turtlesim-Simulator. Nach erfolgreichem Senden der Transaktion sollte die Schildkröte anfangen sich zu bewegen.

### Starten von Turtlesim von den ROS 2-Befehlszeilentools aus

1. Versuchen wir nun, einen Start an Turtlesim von einem anderen ROS 2-Pubsub-Knoten aus zu senden. Erstellen Sie zunächst eine weitere Konfigurationsdatei (z. B. `second_pubsub_params.yaml`) mit unterschiedlichen Robonomics-Anmeldeinformationen und einem separaten IPFS-Verzeichnis.

2. Führen Sie in einem separaten Terminal einen neuen `robonomics_ros2_pubsub`-Knoten mit der neuen Konfigurationsdatei aus:

{% codeHelper { copy: true}%}

```shell
ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
```

{% endcodeHelper %}

3. Platzieren Sie die JSON-Datei mit den Befehlen für Turtlesim (`turtle_cmd_vel.json`) in das IPFS-Verzeichnis des neuen Pubsub.

4. Bevor Sie den Start senden, richten wir eine Überwachung ein, um zu beobachten, wie `turtlesim_robonomics` empfängt.data upon arrival. To do this, in a separate terminal, subscribe to the corresponding topic:

{% codeHelper { copy: true}%}

  ```shell
  ros2 topic echo /turtlesim1/robonomics/received_launch
  ```

{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"}%}
  Standardmäßig erwartet der Launch-Handler einen IPFS-Hash einer Datei als Parameter. Wenn Pubsub den Parameter als reguläre Zeichenfolge behandeln soll, müssen Sie den entsprechenden ROS 2-Knotenparameter `launch_is_ipfs` von `True` in `False` ändern. Sie können dies mit dem Befehl `ros2 param set` tun.
{% endroboWikiNote %}

5. Jetzt müssen wir den ROS 2-Dienst aufrufen, um den Start zu senden. Verwenden Sie in einem separaten Terminal den folgenden Befehl:

{% codeHelper { copy: true}%}

  ```shell
  ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'YOUR_TURTLESIM_ADDRESS'"}
  ```

{% endcodeHelper %}

Sie sehen die Pubsub-Protokolle mit den Details der Startübermittlung.

6. Gehen Sie zum Turtlesim-Simulator. Nach dem erfolgreichen Senden der Transaktion sollte die Schildkröte starten.

### Starten von Turtlesim von einem anderen Knoten aus

1. Versuchen wir nun, einen Testknoten zu erstellen, der auf den Start wartet und ihn dann an Turtlesim weiterleitet. Sie können das vorgefertigte Testpaket `test_robot_robonomics` verwenden. Kopieren Sie dieses Paket in Ihr ROS 2-Arbeitsbereich.

2. Öffnen Sie die Knotendatei unter `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` in einem beliebigen Texteditor und fügen Sie den folgenden Code nach der `__init__`-Funktion hinzu:

{% codeHelper { copy: true}%}

   ```python
   def launch_file_subscriber_callback(self, msg) -> None:
       super().launch_file_subscriber_callback(msg)

       transaction_hash = self.send_launch_request(self.param, target_address='IHRE_TURTLESIM_ADRESSE', is_file=True, encrypt_status=True)

       self.get_logger().info('Start an die Schildkröte gesendet mit Hash: %s ' % str(transaction_hash))
   ```

{% endcodeHelper %}

   Diese Funktion wird zuerst den empfangenen Start verarbeiten und dann dessen Parameter verwenden, um einen neuen Start an Turtlesim zu senden.

3. Bauen Sie das Paket mit `colcon` und aktivieren Sie dann dessen Einrichtungsdateien.

4. Starten Sie die ROS 2-Startdatei des Testpakets mit den zweiten Pub/Sub-Anmeldeinformationen:

{% codeHelper { copy: true}%}

```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
```

{% endcodeHelper %}

5. Jetzt senden Sie einen Start mit den Parametern `turtle_cmd_vel.json` an die Adresse des Testknotens, zum Beispiel über das Polkadot/Substrate-Portal. Stellen Sie sicher, dass Turtlesim noch läuft, bevor Sie dies tun. Der Testknoten sollte den Start empfangen und dann einen neuen mit denselben Parametern senden, wodurch die Schildkröte in Turtlesim zu bewegen beginnt.