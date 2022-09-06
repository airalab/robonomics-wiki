---
title: Deploy Sensor Map

contributors: [nakata]
translated: true
---

After assembling a [sensor](/docs/sensor-hardware/) and setting up [Sensors Connectivity module](/docs/sensors-connectivity-setup/)
it is time to deploy personal decentralised sensor map.

## Requirements 

Sensors Map works on JS. So, you need to install `node` and `yarn` manager.

```shell
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install --global yarn
```

## Installation

Let's download and build Map:

```shell
git clone https://github.com/airalab/sensors.robonomics.network.git
cd sensors.robonomics.network/
yarn install
```

For tests let's run map in `development` mode. It will create map with all robonomics sensors available:

```shell
yarn serve
```

Go to showed url. You will see the similar:

<robo-wiki-picture src="sensors-connectivity/robonomics_map.jpg"/>

Stop it with **ctrl+C**.

## Configuration

Now we will create configuration files. For this go to `src` folder and change name of files:

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

Next open `config.json` file. You interested in next part of configuration file:

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

## Build for Release

To build files for release run:
```shell
yarn build
```

It will create `dist` directory. It contains all components of static website. To Check that everything correct,
go inside `dist` directory and open `index.html` file. You should see similar:

<robo-wiki-picture src="sensors-connectivity/local_map.jpg"/>

After sometime sensors data from your Sensors Connectivity module will appearance on the map.

 That all. Now you have your own Decentralized Sensors Map. Currently, it aggregates sensors data only in realtime. 
 To look throw out of history measurements, you need to set up "RoSeMAN" module. Find out setup process in next article.