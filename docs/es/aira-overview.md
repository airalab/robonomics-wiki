---
title: AIRA Overview
locale: 'es' 
contributors: [ensrationis, akru, positivecrash]
translated: false
---

## Introduction

AIRA stands for "Autonomous Intelligent Robot Agent". It implements the standard of economic interaction between human-robot and robot-robot. AIRA makes it possible to connect a variety of different robots under decentralized computer's control (currently supported Ethereum and Polkadot/Substrate).

Basically it is the client for Robonomics Network developed by [Airalab](https://aira.life).

AIRA is NixOS based operating system and officially supports the following architectures: x86, Raspberry Pi 3 B+ and Raspberry Pi 4.

The most simple way to get familiar with AIRA is to try installing AIRA as a [virtual machine](/docs/aira-installation-on-vb/).

AIRA comes with a few preinstalled and configured services to help you focus on [agent](/docs/glossary#agent) development.

Meanwhile it's highly customizable, but it's recommended to understand [NixOS](http://nixos.org/) and [Nix](https://nixos.org/nix/) language.

## What's included? 

The following services are included in the default distribution:

* [Robonomics communication stack](https://github.com/airalab/robonomics_comm)
* [IPFS](https://ipfs.io/)
* OpenSSH
* [cjdns](https://github.com/cjdelisle/cjdns)
* [Yggdrasil-go](https://yggdrasil-network.github.io/)

Besides at the first launch AIRA [generates](/docs/aira-installation-on-vb#launch-the-machine) for you new Ethereum address and IPNS identifier.

It's possible to use AIRA as a virtual machine or install as a main operating system. Also you can install only the services you need.
