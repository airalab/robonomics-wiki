---
title: Digital Twins
locale: 'ja' 
contributors: [nakata5321]
translated: false
---

## Requirements
- `robonomics` [executable][ln1]
- Be familiar with [parachain.robonomics][ln2]

## Digital Twins Schema

Digital twins have the following structure:

| DT id 	| Topic Name 	| Source    	|
|-------	|------------	|-----------	|
| 0     	| 0x00...000 	| 4Gz...hQJ 	|
| 1     	| 0x00...001 	| 4GVi...Bn 	|
|       	| 0x00...002 	| 4Hm...vLS 	|
|       	| 0x00...... 	| 4HQ...RQY 	|
|       	| 0xFF...FFF 	| 4Hw...CyK 	|
| 2     	| 0x00...000 	| 4HJ...k3o 	|

 Where:
* **DT id** - is unsigned integer unique number.
* **Topic name** - is 0x prefixed `H256 hex` or `ascii data` with 32 bytes length. For example: `0x1234....FF` and  `hello.parachain.robonomics.world`.
* **Source** - is Account address.

## Create Digital Twin
Go to ***Developer -> Extrinsics*** and choose `digitalTwin.create()` extrinsic.
![digital Twin create][im1]

 Submit transaction and go to ***Network -> Explorer*** and in the **recent events** you will see information about digital twin.
 ![digital Twin create info][im2]

## Add DT Topic

You can create multiple topics for one digital twin. for creating topic you need go to ***Developer -> Extrinsics*** and choose `digitalTwin.setSource(id,topic,source)` extrinsic. Fill in the fields and submit transaction.
![DT topic fields][im3]

Again go to **Network -> Explorer*** and in the **recent events** you will see information about created topic.
![info about topic][im4]

You can create several topics for one twin.
![topics][im5]

## Chain State

You can find all information about existing *digital twins in* ***Developer -> Chain state*** such as:
- Total number of Digital twins - total()
- Information about owner of digital twin - owner(u32)
- Information about topics in digital twin - digitalTwin(u32)
![chain info][im6]


[ln1]: <https://github.com/airalab/robonomics/releases>
[ln2]: </docs/create-account-in-dapp>
[im1]: <../images/digital-twin/twin-create.jpg>
[im2]: <../images/digital-twin/create-log.jpg>
[im3]: <../images/digital-twin/fields.jpg>
[im4]: <../images/digital-twin/topic.jpg>
[im5]: <../images/digital-twin/topics.jpg>
[im6]: <../images/digital-twin/chain-state.jpg>
