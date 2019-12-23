Market Messages
===============

Market messages is used for exchange **Demand** and **Offer** information. It also used for delivery **Result** messages with liability execution reports.

!!! note
    This is spec for Robonomics `Generation 5`.

* Currently for message delivery is used [IPFS PubSub](https://ipfs.io/blog/25-pubsub/) broadcaster.
* IPFS PubSub **topic** is set according to *Lighthouse* [ENS](https://ens.domains/) name.

## Messages content

Robonomics market message use [JSON](https://www.json.org/) data format.

### Demand

| Field         | ROS Type                  | Description                                       |
|-------------- |-------------------------  |------------------------------------------------   |
| model         | [ipfs_common/Multihash](api/ipfs_common_msgs.md#ipfs_commonmultihashmsg)      | CPS behavioral model identifier                   |
| objective     | [ipfs_common/Multihash](api/ipfs_common_msgs.md#ipfs_commonmultihashmsg)      | CPS behavioral model parameters in rosbag file    |
| token         | [ethereum_common/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Operational token address                         |
| cost          | [ethereum_common/UInt256](api/ethereum_common_msgs.md#ethereum_commonuint256msg)   | CPS behavioral model execution cost               |
| lighthouse    | [ethereum_common/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Lighthouse contract address                       |
| validator     | [ethereum_common/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Observing network address                         |
| validatorFee  | [ethereum_common/UInt256](api/ethereum_common_msgs.md#ethereum_commonuint256msg)   | Observing network fee                             |
| deadline      | [ethereum_common/UInt256](api/ethereum_common_msgs.md#ethereum_commonuint256msg)   | Deadline block number                             |
| nonce         | [ethereum_common/UInt256](api/ethereum_common_msgs.md#ethereum_commonuint256msg)   | Robonomics message counter                        |
| sender        | [ethereum_common/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Message sender address                            |
| signature     | std_msgs/UInt8[]          | Sender’s Ethereum signature                       |

### Offer

| Field             | ROS Type                  | Description                                       |
|---------------    |-------------------------  |------------------------------------------------   |
| model             | [ipfs_commom/Multihash](api/ipfs_common_msgs.md#ipfs_commonmultihashmsg)     | CPS behavioral model identifier                   |
| objective         | [ipfs_commom/Multihash](api/ipfs_common_msgs.md#ipfs_commonmultihashmsg)     | CPS behavioral model parameters in rosbag file    |
| token             | [ethereum_commom/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Operational token address                         |
| cost              | [ethereum_commom/UInt256](api/ethereum_common_msgs.md#ethereum_commonuint256msg)   | CPS behavioral model execution cost               |
| validator         | [ethereum_commom/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Observing network address                         |
| lighthouse        | [ethereum_commom/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Lighthouse contract address                       |
| lighthouseFee     | [ethereum_commom/UInt256](api/ethereum_common_msgs.md#ethereum_commonuint256msg)   | Liability creation fee                            |
| deadline          | [ethereum_commom/UInt256](api/ethereum_common_msgs.md#ethereum_commonuint256msg)   | Deadline block number                             |
| nonce             | [ethereum_commom/UInt256](api/ethereum_common_msgs.md#ethereum_commonuint256msg)   | Robonomics message counter                        |
| sender            | [ethereum_commom/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Message sender address                            |
| signature         | std_msgs/UInt8[]          | Sender’s Ethereum signature                       |

### Result

| Field         | ROS Type                  | Description                       |
|-----------    |-------------------------  |---------------------------------- |
| liability     | [ethereum_commom/Address](api/ethereum_common_msgs.md#ethereum_commonaddressmsg)   | Liability contract address        |
| result        | [ipfs_commom/Multihash](api/ipfs_common_msgs.md#ipfs_commonmultihashmsg)     | Liability result multihash        |
| success       | std_msgs/Bool             | Is liability executed successful  |
| signature     | std_msgs/UInt8[]          | Sender’s Ethereum signature       |

## Messages signing

Before signing the messages is packed using [abi.encodePacked](https://solidity.readthedocs.io/en/latest/abi-spec.html#non-standard-packed-mode
) solidity finction and hashed by Keccak_256.

```solidity

   demandHash = keccak256(abi.encodePacked(
        _model
      , _objective
      , _token
      , _cost
      , _lighthouse
      , _validator
      , _validator_fee
      , _deadline
      , IFactory(factory).nonceOf(_sender)
      , _sender
      ));
```

!!! note
    `nonce` parameter is counted by factory smart contract and incremented for each created liability smart contract.

Message hash are signed using Ethereum ``secp256k1`` [signature](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign).

