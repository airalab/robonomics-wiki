---
title: Robonomics Liability Messages 
locale: 'ko' 
contributors: [ensrationis, akru]
translated: false
---

## robonomics_liability/Liability.msg

| Field        	| Type                                                                         	| Description                                    	|
|--------------	|------------------------------------------------------------------------------	|------------------------------------------------	|
| address      	| [ethereum_commom/Address](/docs/ethereum-common-messages#ethereum_commonaddressmsg) 	| The Liability’s address                        	|
| model        	| [ipfs_commom/Multihash](/docs/ipfs-common-messages#ipfs_commonmultihashmsg)         	| CPS behavioral model Identifier                	|
| objective    	| [ipfs_commom/Multihash](/docs/ipfs-common-messages#ipfs_commonmultihashmsg)         	| CPS behavioral model parameters in rosbag file 	|
| result       	| [ipfs_commom/Multihash](/docs/ipfs-common-messages#ipfs_commonmultihashmsg)         	| Liability result hash                          	|
| promisee     	| [ethereum_commom/Address](/docs/ethereum-common-messages#ethereum_commonaddressmsg) 	| The promisee address                           	|
| promisor     	| [ethereum_commom/Address](/docs/ethereum-common-messages#ethereum_commonaddressmsg) 	| The promisor address (usually CPS)             	|
| lighthouse   	| [ethereum_commom/Address](/docs/ethereum-common-messages#ethereum_commonaddressmsg) 	| The address of lighthouse your CPS works on    	|
| token        	| [ethereum_commom/Address](/docs/ethereum-common-messages#ethereum_commonaddressmsg) 	| Operational token address                      	|
| cost         	| [ethereum_commom/UInt256](/docs/ethereum-common-messages#ethereum_commonuint256msg) 	| CPS behavioral model implementation cost       	|
| validator    	| [ethereum_commom/Address](/docs/ethereum-common-messages#ethereum_commonaddressmsg) 	| Observing network address                      	|
| validatorFee 	| [ethereum_commom/UInt256](/docs/ethereum-common-messages#ethereum_commonuint256msg) 	| Observing network commission                   	|

## robonomics_liability/StartLiability.srv

**Request**

| Field     | Type              | Description                                           |
|---------  |-----------------  |-----------------------------------------------------  |
| address   | std_msgs/String   | The address of Liability you are willing to execute   |

**Response**

| Field     | Type              | Description                               |
|---------  |-----------------  |------------------------------------------ |
| success   | std_msgs/Bool     | Weather or not the Liability was started  |
| msg       | std_msgs/String   | Status of launch                          |

## robonomics_liability/FinishLiability.srv

**Request**

| Field     | Type              | Description                           |
|---------  |-----------------  |------------------------------------   |
| address   | std_msgs/String   | The address of Liability to finish    |
| success   | std_msgs/Bool     | The status of execution               |

**Response**

The response is empty

## robonomics_liability/ReadLiability.srv

**Request**

| Field     | Type                                                                          | Description                   |
|---------  |------------------------------------------------------------------------------ |----------------------------   |
| address   | [ethereum_commom/Address](/docs/ethereum-common-messages#ethereum_commonaddressmsg)  | The address of a liability    |

**Response**

| Field         | Type                                                                  | Description           |
|-----------    |---------------------------------------------------------------------  |---------------------  |
| read          | std_msgs/Bool                                                         | Status of execution   |
| liability     | [robonomics_liability/Liability](#robonomics_liabilityliabilitymsg)   | Liability             |
