---
title: IPFS Common
locale: 'pt' 
contributors: [ensrationis, akru]
translated: true
---

The package handle IPFS connections, provides useful services for working with IPFS Network. 
It's included in `robonomics_liability` launch file

## ROS Parameters

### ~lighthouse_contract

The name of a lighthouse you are working on. The type is `string`, defaults to `airalab.lighthouse.5.robonomics.eth`

### ~ipfs_http_provider

IPFS HTTP provider address. The type is `string`, defaults to `http://127.0.0.1:5001`

### ~ipfs_public_providers

A public IPFS node to pin result files. The type is `string`, defaults to `""`

### ~ipfs_file_providers

A list of public nodes to pin result files. The type is `list of strings`, defaults to `[ipfs_public_providers]`

### ~ipfs_swarm_connect_addresses

IPFS nodes to connect to. The type is `string`, defaults to `""`

### ~ipfs_swarm_connect_to

A list of IPFS nodes to connect to. The type is `list of strings`, defaults to `[ipfs_swarm_connect_addresses]`

## Subscribed topics