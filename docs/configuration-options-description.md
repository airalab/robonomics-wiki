# Configuration Options Description

Basically, you can think of the package as a black box with one input (sensor data) and many outputs.
For now only SDS011 sensor is supported, but if you are familiar with Python it'd be easy to add other sensors as well.

Have a look at [configuration](https://github.com/airalab/sensors-connectivity/blob/master/config/default.json) file:

```json
{
   "general":{
      "publish_interval":30            
   },
   "comstation":{
      "enable":false,
      "port":"/dev/ttyUSB0",
      "work_period":300,
      "geo":"",
      "public_key":""
   },
   "httpstation":{
      "enable":true,
      "port":8001
   },
   "luftdaten":{
      "enable":true
   },
   "robonomics":{
      "enable":true,
      "ipfs_provider":"/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic":"airalab.lighthouse.5.robonomics.eth"
   },
   "datalog":{
      "enable":false,
      "path":"",
      "suri":"",
      "remote":"wss://substrate.ipci.io",
      "dump_interval":3600,
      "temporal_username":"",
      "temporal_password":""
   },
   "dev":{
      "sentry":""
   }
}
```
At the moment it's possible to publish data to [Luftdaten](https://luftdaten.info/), [Robonomics Network](https://robonomics.network/) and [Datalog](https://github.com/airalab/robonomics).
The last one is experimental!

> DO NOT edit `config/default.json` file. Instead make a copy

Play around with the configuration!

Explanation of options:

| Field                         | Description                                                                                                                                                                                                                                           |
|------------------------------    |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    |
| `general/publish_interval`         | integer number from 1 and above. Tells how often send measurements. Keep in mind that if measurements from sensors come less often than this number connectivity sends last data      |
| `comstation/enable`                | true/false. Enabling/disabling the station      |
| `comstation/port`                  | valid path to com port, for example `/dev/ttyUSB0`. It is where a sensor is connected to      |
| `comstation/work_period`           | integer from 0 to 1800. For SDS011 sensor 0 means continuous work. Recommended period is 300 seconds     |
| `comstation/geo`                   | `lat,lon` a string with two floats separated by a comma. It represents latitude and longitude of a sensor     |
| `comstation/public_key`            | Ed25519 verifying key in hex format. If not provided connectivity generates a new one      |
| `httpstation/enable`                | true/false. Enabling/disabling the station   |
| `httpstation/port`                  | what port listen to      |
| `luftdaten/enable`                 | true/false. Whether or not publish data to [Luftdaten](https://devices.sensor.community/). Don't forget to register the sensor's mac address on the site         |
| `robonomics/enable`                | true/false. Whether or not publish data to IPFS topic according to Robonomics communication protocol      |
| `robonomics/ipfs_proveder`         | an endpoint for IPFS daemon. By default it's `/ip4/127.0.0.1/tcp/5001/http` that means local daemon. The endpoint must by in multiaddr format. For example for [Infura.io](https://infura.io/) it would be `/dns/ipfs.infura.io/tcp/5001/https`       |
| `robonomics/ipfs_topic`            | IPFS topic's name. If you want to use [DApp](https://sensors.robonomics.network) provided by Robonomics team leave it untouched                 |
| `datalog/enable`                   | true/false. Enable/Disable saving log to [Robonomics on Substrate chain](https://ui.ipci.io/)    |
| `datalog/path`                     | full path to `robonomics` executable file. You can find the latest release on [this](https://github.com/airalab/robonomics/releases) page  |
| `datalog/suri`                     | a private key from substrate chain account  |
| `datalog/remote`                   | an endpoint to substrate instance                                                           |
| `datalog/dump_interval`            | specify a period of time for collecting log in seconds                                      |
| `datalog/temporal_username`        | set username to upload files to [Temporal.Cloud](https://temporal.cloud/) (Optional)                  |
| `detalog/temporal_password`        | set password to upload files to [Temporal.Cloud](https://temporal.cloud/) (Optional)                  |
| `dev/sentry`                       | for development purpose. If you have a [Sentry.io](https://sentry.io/) account you can put sentry's credentials in here   |

## Scenario #1: Connect SDS011 to serial port

The easiest and the most straightforward way to connect your sensor to the network is using the serial port

Connect you SDS011 sensor to a USB port, let's assume it got `/dev/ttyUSB0` address

```json
{
   "general":{
      "publish_interval":30            
   },
   "comstation":{
      "enable":true,
      "port":"/dev/ttyUSB0",
      "work_period":300,
      "geo":"59.944954,30.294534",
      "public_key":""
   },
   "httpstation":{
      "enable":false,
      "port":8001
   },
   "luftdaten":{
      "enable":true
   },
   "robonomics":{
      "enable":true,
      "ipfs_provider":"/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic":"airalab.lighthouse.5.robonomics.eth"
   },
   "datalog":{
      "enable":false,
      "path":"",
      "suri":"",
      "remote":"wss://substrate.ipci.io",
      "dump_interval":3600,
      "temporal_username":"",
      "temporal_password":""
   },
   "dev":{
      "sentry":""
   }
}
```

## Scenario #2: Connect SDS011 via HTTP

### Connectivity Configuration

```json
{
   "general":{
      "publish_interval":30            
   },
   "comstation":{
      "enable":false,
      "port":"/dev/ttyUSB0",
      "work_period":300,
      "geo":"59.944954,30.294534",
      "public_key":""
   },
   "httpstation":{
      "enable":true,
      "port":8001
   },
   "luftdaten":{
      "enable":true
   },
   "robonomics":{
      "enable":true,
      "ipfs_provider":"/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic":"airalab.lighthouse.5.robonomics.eth"
   },
   "datalog":{
      "enable":false,
      "path":"",
      "suri":"",
      "remote":"wss://substrate.ipci.io",
      "dump_interval":3600,
      "temporal_username":"",
      "temporal_password":""
   },
   "dev":{
      "sentry":""
   }
}
```

> Do not forget to open the port in system firewall
>
> On NixOS you can do:
> ```
> networking.firewall.allowedTCPPorts = [ 31313 ];
> ```

## Scenario #3: Connect Multiple Sensors and Publish to Datalog

### Install Robonomics

From `root` user do:

```
echo "https://github.com/airalab/airapkgs/archive/nixos-unstable.tar.gz nixos" > /root/.nix-channels
nix-channel --update
```

Then edit `/etc/nixos/configuration.nix` and add:

```
...
  environment.systemPackages = with pkgs; [
        substrate-node-robonomics-bin
  ];
...
```

Run rebuild and find out where `robonomics` is:
```
nixos-rebuild switch
whereis robonomics
```

Let's assume you got the following path: `/nix/store/2gz2ik17w5xad8w819bsb05a23pbjbya-system-path/bin/robonomics`

### Configuration

```json
{
   "general":{
      "publish_interval":30            
   },
   "comstation":{
      "enable":false,
      "port":"/dev/ttyUSB0",
      "work_period":300,
      "geo":"59.944954,30.294534",
      "public_key":""
   },
   "httpstation":{
      "enable":true,
      "port":8001
   },
   "luftdaten":{
      "enable":true
   },
   "robonomics":{
      "enable":true,
      "ipfs_provider":"/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic":"airalab.lighthouse.5.robonomics.eth"
   },
   "datalog":{
      "enable":true,
      "path":"/nix/store/2gz2ik17w5xad8w819bsb05a23pbjbya-system-path/bin/robonomics",
      "suri":"0x...",
      "remote":"wss://substrate.ipci.io",
      "dump_interval":3600,
      "temporal_username":"temporaluser",
      "temporal_password":"temporalpass"
   },
   "dev":{
      "sentry":""
   }
}
```


