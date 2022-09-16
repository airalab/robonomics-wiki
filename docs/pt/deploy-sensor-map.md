---
title: Deploy Sensor Map

contributors: [nakata]
translated: false
---

After assembling a [sensor](/docs/sensor-hardware/) and setting up [Sensors Connectivity module](/docs/sensors-connectivity-setup/)
it is time to deploy personal decentralised sensor map.

## Requirements 

Sensors Map works on JS. So you need to install `node` and `yarn` manager.

```shell
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install --global yarn
```

## Installation

Let's download and build the map:

```shell
git clone https://github.com/airalab/sensors.robonomics.network.git
cd sensors.robonomics.network/
yarn install
```

For tests let's run the map in `development` mode. It will create map with all robonomics sensors available:

```shell
yarn serve
```

Go to url in terminal. You will see the similar:

<robo-wiki-picture src="sensors-connectivity/robonomics_map.jpg"/>

Stop it with **ctrl+C**.

## Configuration

Now we will create configuration files. For this go to `src` folder and rename the files:

```shell
cd src 
cp config.template.json config.json
cp agents.template.json agents.json
```

Now you need to add your IPFS id to agents.json. First find it with `ipfs id`. It will be in "ID" field:

```shell
$ ipfs id
{
	"ID": "QmUZxw8jsRpSx5rWkTpJokPGKvWihTrt5rbRCFXzJ4eCAP",
	"PublicKey": "CAASpgIwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC/uMV3rLM/C+LOh2DGPo3chr+VM+vyYMKi...
    ...
```
 
Insert your IPFS id in `agents.json`. It will look like:

```json
[
  "QmUZxw8jsRpSx5rWkTpJokPGKvWihTrt5rbRCFXzJ4eCAP"
]
```

Next open `config.json` file. You need to change the next part of configuration file:

```json
...
  REMOTE_PROVIDER: "",
  WIND_PROVIDER: "",
  MAP: {
    zoom: "8",
    position: {
      lat: "",
      lng: "",
    },
  },
  SHOW_MESSAGES: true,
};
```

Here you have to insert latitude and longitude of your city.       

Optionally, you can set up ["Wind direction" service](https://github.com/danwild/wind-js-server) and provide URL to it in `WIND_PROVIDER` field.

## Build for Release

To build files for release run:
```shell
yarn build
```

It will create `dist` directory. It contains all components of static website. To check if everything is correct,
move to `dist` directory and open `index.html` file. You should see the similar:

<robo-wiki-picture src="sensors-connectivity/local_map.jpg"/>

After some time sensor's data from your Sensors Connectivity module will appear on the map.

 That's all. Now you have your own Decentralized Sensors Map. Currently, it aggregates sensors data realtime only. 
 To look throughout of history measurements, you need to set up "RoSeMAN" module. Find out setup process in the next article.