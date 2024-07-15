---
title: Backup Services

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In this article, you will learn how to generate backups of your Home Assistant configuration and restore it when needed. To create backups, a service is called that generates a secure archive with configuration files. Also service adds Mosquitto brocker and Zigbee2MQTT configuration  to backup if exist. This service then adds the archive to IPFS and stores the resulting CID in Robonomics Digital Twin.**
## Creating Home Assistant Configuration's Backup

Creating a backup allows you to easily restore your Home Assistant configuration in the event of a failure.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "WARNING"}%}In order to backup and restore your configuration, it is necessary to use a **custom IPFS gateway** such as Pinata. Without it, your backup will be stored solely on your local IPFS node, which may prevent you from restoring your Home Assistant configuration in the event of a local node failure.
{% endroboWikiNote %}

1. In the web interface of Home Assistant go to `Developer Tools` -> `Services`. Search for `Robonomics: Save Backup to Robonomics` and press `CALL SERVICE`.

2. Wait until you see the notification `Backup was updated in Robonomics` appear in `Notification`.


{% roboWikiNote {type: "warning", title: "WARNING"}%} Do not attempt to create a backup or restore configuration immediately after loading Home Assistant and Robonomics Integration. Please **wait for approximately 5 minutes** to allow for the initial setup to complete. {% endroboWikiNote %}

Service arguments:
- **Full Backup**  (default: False) - add database to the backup, so history of entity states will be stored too.
- **Path to mosquitto password file** (default: `/etc/mosquitto`) - If you used Home Assistant Core or Docker installation methods and don't have default path to Mosquitto brocker, you should change this parameter. *Not needed for Home Assistant OS or Superviser*.

## Restoring Home Assistant Configuration from Backup

In order to restore your configuration, you will need an installed Home Assistant and Robonomics Integration.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}


{% roboWikiNote {type: "warning"}%}To ensure successful restoration of your configuration in Home Assistant Core and Docker installation methods, you need to perform additional setup steps as described at the end of the page.
{% endroboWikiNote %}


1. Install Home Assisntant with Robonomics Integration (if it is not installed yet), following the steps from the article for the [desired installation method](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2.  [Set up Robonomics Integration](https://wiki.robonomics.network/docs/robonomics-hass-integration) using **the same seeds** you used in previous Robonomics configuration. If you subscription has ended, [reactivate it](https://wiki.robonomics.network/docs/sub-activate).

3. In the web interface of Home Assistant go to `Developer Tools` -> `Services`. Search for `Robonomics: Restore from the Backup in Robonomics` and press `CALL SERVICE`. Navigate to the `Overview` page, to check the status of your backup, .

4. After restoring, Home Assistant will automatically restart. If for some reason Home Assistant does not restart, you can check the restoration status by monitoring the state of the `robonomics.backup` entity. If the status is `restored` you will need to manually restart Home Assistant by navigating to `Settings` > `System` and clicking on the `RESTART` button located in the upper right corner.

5. If your backup includes the Zigbee2MQTT or Mosquitto configuration, you need to restart these services to enable the new configuration. You can do this manually by restarting the services individually, or you can simply restart the Home Assistant computer to ensure all services are restarted.

Service arguments:
- **Path to mosquitto password file** (default: `/etc/mosquitto`) - If you used Home Assistant Core or Docker installation methods and have not default path to Mosquitto brocker, you should change this parameter. *Not needed for Home Assistant OS or Superviser*.
- **Path to Zigbee2MQTT config**  (default: `/opt/zigbee2mqtt`) - If you used Home Assistant Core or Docker installation methods and have not default path to Zigbee2MQTT, you should change this parameter. *Not needed for Home Assistant OS or Superviser*.

## Restore Mosquitto and Zigbee2MQTT Configuration for Home Assistant Core Installation Method

If the backup includes the configuration for Mosquitto or Zigbee2MQTT, during the restore process, they will be placed in the default path or in the path specified in the arguments. However, if you installed the Robonomics integration in an existing Home Assistant Core *(not from the preinstalled Robonomics image)*, the `homeassistant` user may not have access to this path.

So to restore the configuration of Mosquitto and Zigbee2MQTT, you need to grant the necessary read permissions to the user `homeassistant`:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Backup Mosquitto and Zigbee2MQTT Configuration for Home Assistant Docker Installation Method

To backup the Mosquitto and Zigbee2MQTT configurations from a Docker container, you need to create volumes for their respective configurations. This can be achieved by running your Home Assistant container with additional arguments:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

or make changes in your `compose.yaml` file:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"Note"}%}Please note that the default paths for Mosquitto and Zigbee2MQTT configurations are `/etc/mosquitto` and `/opt/zigbee2mqtt`, respectively. However, these paths may vary depending on your specific setup.
{% endroboWikiNote %}

## Backup Buttons

In addition to using services to work with backups, you can simplify the process by using the `button.create_backup` and `button.restore_from_backup` buttons from the Robonomics integration. These buttons invoke the respective services with default parameters (the backup button creates a backup without history).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

To add buttons to your dashboard, follow these steps:

1. Click on the three dots in the top right corner of the dashboard.
2. Select `Edit Dashboard`.
3. Click on the `Add Card` button in the bottom right corner.
4. Choose the `Entities` card.
5. In the `Entities` field, search for the button.create_backup and button.restore_from_backup entities.
6. Press `Save` to add the entities to the card.
7. Finish editing by clicking the `Done` button in the top right corner.