---
title: Sensors Connectivity Module Setup

contributors: [LoSk-p, Vourhey, tubleronchik]
translated: false
tools:   
  - IPFS 0.8.0
    https://docs.ipfs.io/install/command-line/
  - sensors-connectivity 1.2.0
    https://github.com/airalab/sensors-connectivity/tree/v1.2.0

---

Now let's start personal sensors Connectivity module.

## Pre-requirements

To build a python package the IPFS daemon has to be installed. **This module requires IPFS daemon version no greater than 0.8.x** . 
So, in example, IPFS daemon version is 0.8.0. Assuming, you work on linux:

```
wget https://dist.ipfs.io/go-ipfs/v0.8.0/go-ipfs_v0.8.0_linux-amd64.tar.gz
tar -xzf go-ipfs_v0.8.0_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh 
ipfs init
```
Also, we need to install `python3 dev` package and `pip`:

```shell
sudo apt install python3-dev
sudo apt install python3-pip
```

## Installation as PyPi package

```
pip3 install sensors-connectivity
```

If you see warning like this:

```shell
  WARNING: The script sensors_connectivity is installed in '/home/test2/.local/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
```

Run next command:
```shell
cd ~
export PATH="/usr/local/bin:$PATH"
source .profile
```

<robo-wiki-title :type="2" anchor="json-configuration"> 
Configuration
</robo-wiki-title>

First, we need to create directory for configuration file and database file. You can create it wherever you want, these commands below are just an example:

```shell
cd ~
mkdir sensors_connectivity
cd sensors_connectivity
touch database.db
```

<robo-wiki-note type="okay"> Name of the database file can be any, but extension must be `.db`</robo-wiki-note>

This database will save IPFS hashes of sensor data, timestamp and service status.

Next, create configuration file:
```shell
touch my_config.json
```

There is default configuration file:

```json
{
   "general": {
      "publish_interval": 30,
      "db_path": ""
   },
   "comstation": {
      "enable": false,
      "port": "/dev/ttyUSB0",
      "work_period": 300,
      "geo": "",
      "public_key": ""
   },
   "httpstation": {
      "enable": true,
      "port": 8001
   },
   "mqttstation": {
      "enable": false,
      "host": "localhost",
      "port": 1883
   },
   "luftdaten": {
      "enable": false
   },
   "robonomics": {
      "enable": true,
      "ipfs_provider": "/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic": "airalab.lighthouse.5.robonomics.eth"
   },
   "datalog": {
      "enable": false,
      "suri": "",
      "dump_interval": 60,
      "temporal_username": "",
      "temporal_password": "",
      "pinata_api": "",
      "pinata_secret": ""
   },
   "dev": {
      "sentry": ""
   },
   "frontier": {
      "enable": false,
      "suri": ""
   },
   "trackagro": {
      "enable": false,
      "token": ""
   }
}
```

fill `my_config.json` with example and **insert full path to the database file in `db_path` field.** 

This configuration will be enough to get sensors data over http and send it to the Robonomics map.

## Running

First, launch IPFS daemon:

```
ipfs daemon --enable-pubsub-experiment
```
After config is set, you can run the service: (in another terminal)

```
sensors_connectivity "path/to/your/config/file"
```

You will be able to see logs in your console and in `~/.logs`.

Example of logs:
```shell
$ sensors_connectivity test.json 
2022-09-02 14:08:48,408 - INFO - Getting data from the stations...
2022-09-02 14:08:48,409 - INFO - airalab-http-v0.8.0: [[]]
2022-09-02 14:08:48,409 - INFO - Sending result to the feeders...
2022-09-02 14:08:48,411 - INFO - Checking data base...
2022-09-02 14:09:18,410 - INFO - Sending result to the feeders...
2022-09-02 14:09:18,410 - INFO - Getting data from the stations...
2022-09-02 14:09:18,411 - INFO - airalab-http-v0.8.0: [[]]
2022-09-02 14:09:48,411 - INFO - Sending result to the feeders...
2022-09-02 14:09:48,412 - INFO - Getting data from the stations...
2022-09-02 14:09:48,413 - INFO - airalab-http-v0.8.0: [[]]
2022-09-02 14:10:18,413 - INFO - Sending result to the feeders...
2022-09-02 14:10:18,413 - INFO - Getting data from the stations...

```

## Post installation

To connect you **sensors-connectivity** module to Robonomics map [sensors.robonomics.network](https://sensors.robonomics.network/) and see the data,
you have to send your IPFS id to ***vm@multi-agent.io*** or ***ping@airalab.org***. 

You can get IPFS ID with the following command after running IPFS daemon (it is in the `ID` column):

```console
$ ipfs id
{
	"ID": "QmUZxw8jsRpSx5rWkTpJokPGKvWihTrt5rbRCFXzJ4eCAP",
	"PublicKey": "CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/uMV3rLM/C+LOh2DGPo3chr+VM+vyYMKi...
    ...
```

We require it to add your ID to еру ACL list.

In the next article we will look at various combinations of configuration file. It will allow you to connect sensor
over MQTT or COM port and send data to Robonomics Parachain datalog.