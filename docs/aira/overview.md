# Overview

## Introduction

Autonomous intelligent robot agent (AIRA) project which implements the standard of economic interaction between human-robot and robot-robot.
Aira makes it possible to connect a variety of different robots to the market of robot's liabilities which existing in Ethereum.

Basically it is the client for Robonomics Network supported by Airalab.

AIRA is NixOS based operating system and officially supports the following architectures: x86, Raspberry Pi 3 B+ and Raspberry Pi 4.

The most simple way to get familiar with AIRA is to try installing AIRA as a [virtual machine](../try_it_out/aira_installation.md).

AIRA comes with a few preinstalled and configured services to help you focus on [agent](../glossary.md#agent) development.
Meanwhile it's highly customizable, but it's recommended to understand [NixOS](http://nixos.org/) and [Nix](https://nixos.org/nix/) language.

## What's included? 

The following services are included in the default distribution:

* [Robonomics communication stack](https://github.com/airalab/robonomics_comm)
* [IPFS](https://ipfs.io/)
* OpenSSH
* [cjdns](https://github.com/cjdelisle/cjdns)
* [Yggdrasil-go](https://yggdrasil-network.github.io/)

Besides at the first launch AIRA [generates](../try_it_out/aira_installation.md#launch-the-machine) for you new Ethereum address and IPNS identifier.

It's possible to use AIRA as a virtual machine or install as a main operating system. Also you can install only the services you need

