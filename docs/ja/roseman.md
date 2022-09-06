---
title: RoSeMAN Setup

contributors: [nakata5321]
translated: false
---

RoSeMAN is Robonomics Sensors Measure Analytics and Archive Node. It is needed for accumulating sensors 
data to show measurement history.

## Requirements

First, RoSeMAN requires **Mongodb** [Database server.](https://www.mongodb.com/docs/manual/introduction/) 
In this article the installation process isn't discuss, it is assumed that you already have it. 

Also, I have to turn on "Datalog" option for Sensors Connectivity module, as shown in "Scenario #3" in ["Configuration Options Description" article.](/docs/configuration-options-description/)
You should have XRT on your robonomics account, which connected to Sensors Connectivity **Datalog**.

## Setup

First, download repository and go in it:

```shell
git clone https://github.com/airalab/RoSeMAN.git
cd RoSeMAN
```

Then create configuration files:

```shell
cp config.template.json config.json
cp agents.template.json agents.json
```

Open `config.json` file and edit database path:

```json
...
  "DB": {
    "path": "mongodb://localhost:27017/rosemandb"
  },
...
```

Then add public address of your account to `agents.json` file. You can add several addresses to file, 
if you want to collect data from different Sensors Connectivity modules. Example of file:

```shell
[
  "4Cewrqmbbmu8SMXp7sUpxCtwTshzdap8jk6JLSXVvGxCX56o"
]
```

Next, install dependencies and build server:

```shell
yarn install
yarn build
```

Finally, start RoSeMAN server:

```shell
yarn start
```

Web server launched at `http://127.0.0.1:3000`.

## Post-installation

After deploy RoSeMAN service to a server you have to get public IP address or URL to server. 
Alternatively, if you run RoSeMAN service and Sensors Map at one server, you can use local IP address.

Next, you have to open Sensors Map configuration file(check [previous article](/docs/deploy-sensor-map/)) 
and insert URL in `config.js` file into `REMOTE_PROVIDER` field:

```json
...
  },
  REMOTE_PROVIDER: "https://roseman.examlpe.org/",
  WIND_PROVIDER: "",
  MAP: {
...
```

Then rebuild map with `yarn build` and start it again. Now you will be able to see measurement history.