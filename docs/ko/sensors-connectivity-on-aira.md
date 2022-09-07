---
title: Sensors Connectivity Module Introduction

contributors: [LoSk-p, Vourhey, tubleronchik]
translated: false
---

The Sensors Robonomics Network uses the sensors-connectivity module to receive and process data. 
This module allows any user to raise his own server to receive data from sensors and process it further. 
Now the developers have launched several such servers and any sensor can send data to them. Running several servers allows to avoid data loss in case of problems with one of them,
because sensors from a non-working server will switch to a working one.

Sensors Connectivity module architecture:

```
    station1 \                        / feeder1
    station2 -  sensors-connectivity  - feeder2
    station3 /                        \ feeder3
```

Sensors Connectivity module is a set of stations (station1, station2...), which receive various data, including data from sensors via http protocol. But also it can be sensors connected to the computer via USB or any other data source.

Data received from the stations are processed by Sensors Connectivity module and passed to feeders (feeder1, feeder2...). Feeders send the processed data to the user. In our case the data is sent to the decentralized IPFS channel.

Map [sensors.robonomics.network](https://sensors.robonomics.network/) is a decentralized application (DApp) running on your computer. It reads data from the IPFS channel and outputs them to the map. So there is no direct connection between the server collecting the data from the sensors and the map the user sees, the data transfer between them is done via IPFS pubsub, which reduces the load on the servers.

In addition, every once in a while, a file with data from the last time period is saved in IPFS, and the hash of that data is further written to the blockchain. Since IPFS is a content-addressable network, storing data in it guarantees that any change in the data will not go unnoticed, because the address of the desired file contains a hash of its content, which will change if any change in the data occurs. The blockchain is used to pass the hash on to the user, who can use it to retrieve the desired data from the IPFS (which is what happens when requesting to view the history on [sensors.robonomics.network](https://sensors.robonomics.network/)). Since the transaction made cannot be changed, we can be sure that it is the correct hash.

The source code for Sensors Connectivity is available at [link](https://github.com/airalab/sensors-connectivity). 

