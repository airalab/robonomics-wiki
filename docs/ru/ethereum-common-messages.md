---
title: Ethereum Common Messages
locale: 'ru' 
contributors: [ensrationis, akru]
translated: false
---

## ethereum_common/Address.msg

| Field   	| Type            	| Description                    	|
|---------	|-----------------	|--------------------------------	|
| address 	| std_msgs/String 	| Address in Ethereum blockchain 	|

## ethereum_common/UInt256.msg

| Field   	| Type            	| Description                	|
|---------	|-----------------	|----------------------------	|
| uint256 	| std_msgs/String 	| A wrapper for big integers 	|

## ethereum_common/TransferEvent.msg

| Field      	| Type                                                  	| Description      	|
|------------	|-------------------------------------------------------	|------------------	|
| args_from  	| [ethereum_common/Address](#ethereum_commonaddressmsg) 	| Sender address   	|
| args_to    	| [ethereum_common/Address](#ethereum_commonaddressmsg) 	| Receiver address 	|
| args_value 	| [ethereum_common/UInt256](#ethereum_commonuint256msg) 	| Amount of tokens 	|

## ethereum_common/ApprovalEvent.msg

| Field        	| Type                                                  	| Description      	|
|--------------	|-------------------------------------------------------	|------------------	|
| args_owner   	| [ethereum_common/Address](#ethereum_commonaddressmsg) 	| Owner address    	|
| args_spender 	| [ethereum_common/Address](#ethereum_commonaddressmsg) 	| Spender address  	|
| args_value   	| [ethereum_common/UInt256](#ethereum_commonuint256msg) 	| Amount of tokens 	|

## ethereum_common/AccountBalance.srv

**Request**

| Field   	| Type                                                  	| Description      	|
|---------	|-------------------------------------------------------	|------------------	|
| account 	| [ethereum_common/Address](#ethereum_commonaddressmsg) 	| Ethereum address 	|

**Response**

| Field   	| Type                                                  	| Description    	|
|---------	|-------------------------------------------------------	|----------------	|
| balance 	| [ethereum_common/UInt256](#ethereum_commonuint256msg) 	| Balance in Wei 	|

## ethereum_common/AccountToAddressAllowance.srv

**Request**

| Field   	| Type                                                  	| Description      	|
|---------	|-------------------------------------------------------	|------------------	|
| account 	| [ethereum_common/Address](#ethereum_commonaddressmsg) 	| Ethereum address 	|
| to      	| [ethereum_common/Address](#ethereum_commonaddressmsg) 	| Ethereum address 	|

**Response**

| Field  	| Type                                                  	| Description   	|
|--------	|-------------------------------------------------------	|---------------	|
| amount 	| [ethereum_common/UInt256](#ethereum_commonuint256msg) 	| Balance in Wn 	|

## ethereum_common/Accounts.srv

**Request**

Request is empty

**Response**

| Field     | Type                                                      | Description                   |
|---------- |-------------------------------------------------------    |----------------------------   |
| accounts  | [ethereum_common/Address[]](#ethereum_commonaddressmsg)     | List of available accounts    |

## ethereum_common/Allowance.srv

**Request**

Request is empty

**Response**

| Field     | Type                                                      | Description                                       |
|--------   |-------------------------------------------------------    |-----------------------------------------------    |
| amount    | [ethereum_common/UInt256](#ethereum_commonuint256msg)     | Amount of XRT the Factory is allowed to spend     |

## ethereum_common/Approve.srv

**Request**

| Field     | Type                                                      | Description                   |
|---------  |-------------------------------------------------------    |-----------------------------  |
| spender   | [ethereum_common/Address](#ethereum_commonaddressmsg)     | Who is allowed to spend       |
| value     | [ethereum_common/UInt256](#ethereum_commonuint256msg)     | How much tokens are allowed   |

**Response**

| Field     | Type                  | Description       |
|--------   |--------------------   |------------------ |
| txhash    | std_msgs/Uint8[32]    | Transaction hash  |

## ethereum_common/Balance.srv

**Request**

Request is empty

**Response**

| Field     | Type                                                      | Description                       |
|---------  |-------------------------------------------------------    |--------------------------------   |
| balance   | [ethereum_common/UInt256](#ethereum_commonuint256msg)     | The balance of default account    |

## ethereum_common/BlockNumber.srv

**Request**

Request is empty

**Response**

| Field     | Type              | Description           |
|--------   |-----------------  |---------------------- |
| number    | std_msgs/Uint64   | Current block number  |

## ethereum_common/Transfer.srv

**Request**

| Field     | Type                                                      | Description           |
|-------    |-------------------------------------------------------    |---------------------- |
| to        | [ethereum_common/Address](#ethereum_commonaddressmsg)     | Ethereum address      |
| value     | [ethereum_common/UInt256](#ethereum_commonuint256msg)     | The amount of tokens  |

**Response**

| Field     | Type                  | Description       |
|--------   |--------------------   |------------------ |
| txhash    | std_msgs/Uint8[32]    | Transaction hash  |

## ethereum_common/TransferFrom.srv

**Request**

| Field     | Type                                                      | Description           |
|-------    |-------------------------------------------------------    |---------------------- |
| owner     | [ethereum_common/Address](#ethereum_commonaddressmsg)     | Owner's address       |
| to        | [ethereum_common/Address](#ethereum_commonaddressmsg)     | Another account       |
| value     | [ethereum_common/UInt256](#ethereum_commonuint256msg)     | The amount of tokens  |

**Response**

| Field     | Type                  | Description       |
|--------   |--------------------   |------------------ |
| txhash    | std_msgs/Uint8[32]    | Transaction hash  |
