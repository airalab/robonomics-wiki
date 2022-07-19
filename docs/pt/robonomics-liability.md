---
title: Robonomics Liability 
locale: 'pt' 
contributors: [ensrationis, akru]
translated: true
---

The package is responsible for receiving `New Liability` events (`listener` node) and playing topics from `objective` field (`executor` node).
The launch file also include `ipfs_channel` node and `signer` node.

## ROS Parameters

### ~web3_http_provider

Web3 HTTP provider address. The type is `string`, defaults to `http://127.0.0.1:8545`

### ~web3_ws_provider

Web3 WebSocket provider address. The type is `string`, defaults to `ws://127.0.0.1:8546`

### ~ipfs_http_provider

IPFS HTTP provider address. The type is `string`, defaults to `http://127.0.0.1:5001`

### ~ipfs_swarm_connect_addresses

IPFS nodes to connect to. The type is `string`, defaults to `""`

### ~ipfs_public_providers

A public IPFS node to pin result files. The type is `string`, defaults to `""`

### ~factory_contract

The name of the liability factory. The type is `string`, defaults to `factory.5.robonomics.eth`

### ~lighthouse_contract

The name of a lighthouse you are working on. The type is `string`, defaults to `airalab.lighthouse.5.robonomics.eth`

### ~enable_executor

Enable or disable executor node. If it's `false`, no topics from objective would be published. The type is `boolean`, defaults to `true`

### ~master_check_interval

Period (in seconds) to check master for new topic publications. It's necessary for the Recorder, which records all the topics a CPS publishes. The type is `double`, defaults to `0.1`

### ~recording_topics

List of topics name separated by comma. It allows you to specify which topics would be recorded. The type is `string`, defaults to `""`

### ~ens_contract

The checksumed address of ENS registry. The type is `string`, defaults to `""`

### ~keyfile

Path to keyfile. The type is `string`, defaults to `""`. **Required parameter**

### ~keyfile_password_file

Path to a file with password for the keyfile. The type is `string`, defaults to `""`. **Required parameter**

## Subscribed topics

### /liability/infochan/eth/signing/demand (robonomics_msgs/Demand)

[robonomics_msgs/Demand](/docs/market-messages#demand) message to sign and send further to IPFS channel

### /liability/infochan/eth/signing/offer (robonomics_msgs/Offer)

[robonomics_msgs/Offer](/docs/market-messages#offer) message to sign and send further to IPFS channel

### /liability/infochan/eth/signing/result (robonomics_msgs/Result)

[robonomics_msgs/Result](/docs/market-messages#result) message to sign and send further to IPFS channel


## Published topics

### /liability/infochan/incoming/demand (robonomics_msgs/Demand)

Contains a [robonomics_msgs/Demand](/docs/market-messages#demand) message which was read from IPFS channel

### /liability/infochan/incoming/offer (robonomics_msgs/Offer)

Contains a [robonomics_msgs/Offer](/docs/market-messages#offer) message which was read from IPFS channel

### /liability/infochan/incoming/result (robonomics_msgs/Result)

Contains a [robonomics_msgs/Result](/docs/market-messages#result) message which was read from IPFS channel

### /liability/incoming (robonomics_liability/Liability)

Contains all the information about the last created [robonomics_liability/Liability](/docs/robonomics-liability-messages#robonomics_liabilityliabilitymsg)

### /liability/ready (robonomics_liability/Liability)

Signals when a [robonomics_liability/Liability](/docs/robonomics-liability-messages#robonomics_liabilityliabilitymsg)is ready for execution

### /liability/complete (robonomics_liability/Liability)

Signals when a [robonomics_liability/Liability](/docs/robonomics-liability-messages#robonomics_liabilityliabilitymsg) has done its job

### /liability/finalized (std_msgs/String)

Signals when a liability has been finalized

## Services

### /liability/start (robonomics_liability/StartLiability)

The service tells executor to play topics from the objective. It's required to pass a liability address ([robonomics_liability/StartLiability](/docs/robonomics-liability-messages#robonomics_liabilitystartliabilitysrv)), which you can get from `/liability/ready` topic

### /liability/finish (robonomics_liability/FinishLiability)

CPS should call the service after performing the task. The input is [robonomics_liability/FinishLiability](/docs/robonomics-liability-messages#robonomics_liabilityfinishiabilitysrv)

### /liability/restart (robonomics_liability/StartLiability)

The service allows to restart a liability after the system shutdown. The input is [robonomics_liability/StartLiability](/docs/robonomics-liability-messages#robonomics_liabilitystartliabilitysrv)

### /liability/resume (robonomics_liability/StartLiability)

The service allows to resume a liability from the last timestamp available in the persistence store. The input is [robonomics_liability/StartLiability](/docs/robonomics-liability-messages#robonomics_liabilitystartliabilitysrv)

### /liability/read (robonomics_liability/ReadLiability)

The service returns all the data about a liability by its address. The input is [robonomics_liability/ReadLiability](/docs/robonomics-liability-messages#robonomics_liabilityreadliabilitysrv)
