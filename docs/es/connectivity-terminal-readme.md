---
title: Substrate Cumulus Parachain Testsuite for cross-chain messaging 
locale: 'es' 
contributors: [tubleronchik] 
translated: false 
---

# Sensors-Connectivity Terminal Readme

## Connection

To connect to the server:

```bash
ssh <user>@<address>
```
Where user and address are replaced with user, which connectivity service runs under, and address of the VM respectively.

## Installation

Installation guide can be found on this [page](https://wiki.robonomics.network/docs/en/sensors-connectivity-on-aira/).


## Status checking 

Assuming you launch the code as a systemd service. Therefore, to check service status:

```bash
systemctl status connectivity.service
```
There you will find all necessary information about the service, including path to the log files.

## Logs

General path for log files is: ` ~/.ros/log/latest/connectivity-worker-1.log` where `connectivity-worker-1.log` is the last recordered file.

For watching logs in real time:
```bash
tail -f  <path>
```
Where path should be replced with the log path. To look through the whole file simply open the log file in your favourite editor.

It can be useful to copy log files to your local machine:

```bash
scp -rv <user>@<address>: <path-to-log-files> <path-in-your-local-machine>
```