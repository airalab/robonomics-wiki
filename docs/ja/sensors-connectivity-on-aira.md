---
title: Install Sensors Connectivity
contributors: [LoSk-p, Vourhey, tubleronchik]
translated: false
---

## Pre-requirements

To build a python package IPFS daemon should be installed. Assyming, you work with linux:

```
wget https://dist.ipfs.io/go-ipfs/v0.8.0/go-ipfs_v0.8.0_linux-amd64.tar.gz
tar -xzf go-ipfs_v0.8.0_linux-amd64.tar.gz
cd go-ipfs
sudo bash install.sh 
ipfs init
```

# Installation as PyPi package

```
pip3 install py-sr25519-bindings
pip3 install sensors-connectivity
```

## Configuration

[Here](/docs/configuration-options-description/) you can find an article to set a proper configuration for your instance.

## Running

First, launch IPFS daemon:

```
ipfs daemon --enable-pubsub-experiment
```
After config and log files are setted, you can run the service: (in another terminal)

```
sensors_connectivity "path/to/your/config/file"
```

You will be able to see logs in your console and in `~/.logs`.

# Build from source
## Requirements

To build a python package fron source [poetry](https://python-poetry.org/docs/#osx--linux--bashonwindows-install-instructions) should be also installed. Assyming, you work with linux:

```
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

## Get a Package And Installing dependencies

```
git clone https://github.com/airalab/sensors-connectivity
cd sensors-connectivity
poetry install
```

## Documentation

To prepare a sensor for the work with the package follow instructions on [Robonomics Wiki](/docs/connect-sensor-to-robonomics/).

## Configuration

[Here](/docs/configuration-options-description/) you can find an article to set a proper configuration for your instance.

Make a copy of `default.json` and fill it using description from the article.

You also can set a logging file. The default file for logs is `logging.py`, which uses `console` and `file` handler by default. Pay attention for the `file` handler. The template is stored in `connectivity/config/logging_template.py`. You can cpecify the path (`filename`), where your logs will be stored in (do not forget to create this directory if it doesn't exist). Default path for logs is `~/.logs`. You can figure any other handlers from the [library](https://docs.python.org/3.8/library/logging.html).

## Running

First, launch IPFS daemon:

```
ipfs daemon --enable-pubsub-experiment
```
After config and log files are setted, you can run the service: (in another terminal)

```
poetry run sensors_connectivity "path/to/your/config/file"  
```

If your log file is setted with `console` handler, you will be able to see logs in your console.

## Example of logs:

```
2022-02-17 19:30:51,248 - INFO - Getting data from the stations...
2022-02-17 19:30:51,443 - INFO - airalab-http-v0.8.0: [[], [{MAC: c8e2650f254e, Uptime: 0:00:14.010502, M: {Public: 0be87b58e87599a85dc79bf14731cc9ad547411e9b10c883e29f78fc2c67206a, geo: (53.518475,49.397178000000004), measurements: {'airtemp': -8.0, 'windang': 45.0, 'windspeed': 0.13, 'windspeedmax': 0.13, 'pm10': '', 'pm25': '', 'timestamp': 1645113602.0}}}]]
2022-02-17 19:30:51,443 - INFO - Sending result to the feeders...
2022-02-17 19:31:07,517 - INFO - Frontier Datalog: Data sent to Robonomics datalog and included in block 0x04baf3d81c6d31ec6f3ca3e515b9a6920666ee17cbd66f57130eaa000bad2cd4
2022-02-17 19:31:07,519 - INFO - RobonomicsFeeder: {"0be87b58e87599a85dc79bf14731cc9ad547411e9b10c883e29f78fc2c67206a": {"model": 2, "geo": "53.518475,49.397178000000004", "measurement": {"airtemp": -8.0, "windang": 45.0, "windspeed": 0.13, "windspeedmax": 0.13, "pm10": "", "pm25": "", "timestamp": 1645113602.0}}}
2022-02-17 19:31:07,523 - INFO - Checking data base...
127.0.0.1 - - [17/Feb/2022 19:31:13] "POST / HTTP/1.1" 200 -
2022-02-17 19:31:21,248 - INFO - Getting data from the stations...
2022-02-17 19:31:21,429 - INFO - airalab-http-v0.8.0: [[{MAC: c8e2650f254e, Uptime: 0:00:43.818101, M: {Public: 133b761496539ab5d1140e94f644e2ef92c7ac32446dc782bfe1a768379a669a, geo: (1,200), measurements: {'pm10': 27.58, 'pm25': 15.02, 'temperature': 22.93, 'pressure': 758.0687068706872, 'humidity': 39.44, 'timestamp': 1645115473}}}], [{MAC: c8e2650f254e, Uptime: 0:00:43.996539, M: {Public: 0be87b58e87599a85dc79bf14731cc9ad547411e9b10c883e29f78fc2c67206a, geo: (53.518475,49.397178000000004), measurements: {'airtemp': -8.0, 'windang': 45.0, 'windspeed': 0.13, 'windspeedmax': 0.13, 'pm10': '', 'pm25': '', 'timestamp': 1645113602.0}}}]]
2022-02-17 19:31:21,444 - INFO - Sending result to the feeders...
2022-02-17 19:31:51,249 - INFO - Getting data from the stations...
```

## Troubleshooting

### Python.h: No such file or directory

If during running `poetry install` comand you get such error, you need to install the header files and static libraries for python dev. Use your package manager for installation. For example, for `apt` you need to run
```
sudo apt install python3-dev
```
> Note:
python3-dev does not cover all versions for python3. The service needs at least python3.8, for that you may need to specify the version `sudo apt install python3.8-dev`.

[Here](https://stackoverflow.com/a/21530768) you can find examples for other package managers.

### Python versions mismatch

If during running `poetry install` comand you get `SolverProblemError`, which says "The current project's Python requirement (3.6.9) is not compatible with some of the required packages Python requirement:..", even though you have older version of python (e.g. python3.8), you may need to specify the python version poetry is using:

```
poetry env use python3.8
```

