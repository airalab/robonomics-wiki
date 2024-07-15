---
title: Digital Twins
contributors: [nakata5321, PaTara43]

tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.6
    https://github.com/Multi-Agent-io/robonomics-interface
---

**Imagine having a complicated device or system which has several modules to maintain and requires a few accounts to use. To keep all of them in one place or to encode some functionality with separate accounts or, for example, to set different datalog sources for different information flows, Digital Twin module is to be used.**

{% roboWikiNote {title:"Dev Node", type: "warning"}%} Please pay attention that this and following tutorials are demonstrated on a local instance of Robonomics Node. Set up yours with [these instructions](/docs/run-dev-node).
{% endroboWikiNote %}

## Theory overview
Any account can create and manage a Digital Twin. The Twin may be imagined as some sort of table with the following contents:

| DT id  | Topic Name 	| Source    	|
|--------|------------	|-----------	|
| 0      | 0x00...000 	| 4Gz...hQJ 	|
| 1      | 0x00...001 	| 4GVi...Bn 	|
| 	      | 0x00...002 	| 4Hm...vLS 	|
| 	      | 0x00...... 	| 4HQ...RQY 	|
| n	  | 0xFF...FFF 	| 4Hw...CyK 	|


Where:
* **DT id** is unsigned integer unique Digital Twin index.
* **Topic name** is a hex `H256` or ASCII data of 32 bytes length, same as [`Launch`](/docs/launch) extrinsic parameter.
For example: `0x1234....FF` or  `hello.parachain.robonomics.world`.
* **Source** - is some Account address.

{% roboWikiNote {title:"Topics", type: "note"}%} As have been discussed previously in Launch extrinsic overview, the `H256` may be represented as an encoded IPFS CID (see [Python tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes) for that).
Therefore, topics may be used as some data storage as well, say, a Twin's module description. {% endroboWikiNote %}


## Create Digital Twin

### 1. Navigate to Developer -> Extrinsics

{% roboWikiPicture {src:"docs/digital-twin/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

### 2. Choose digitalTwin -> create from the dropdown list of possible extrinsics

{% roboWikiPicture {src:"docs/digital-twin/twin-create.jpg", alt:"twin-create"} %}{% endroboWikiPicture %}

Submit the transaction. Here, no parameters needed to create a Twin. It will be granted an index and only the Digital Twin owner is able to add/modify topics of the Twin from now on.

Twin ID may be found on the Explorer overview page.

{% roboWikiPicture {src:"docs/digital-twin/create-log.jpg", alt:"create-log"} %}{% endroboWikiPicture %}

## Add Topic

### Choose digitalTwin -> setSource from the dropdown list of possible extrinsics

{% roboWikiPicture {src:"docs/digital-twin/set-topic.jpg", alt:"set-topic"} %}{% endroboWikiPicture %}

* `id` - Digital Twin ID, which has been obtained on the Explorer page.
* `topic` - previously discussed `H256` topic name. In this picture it's a string of 32 symbols.
* `source` - account address to be associated with the topic.

{% roboWikiNote {title:"Overwrite", type: "note"}%} Pay attention that the topic may be overwritten with another source address if needed.{% endroboWikiNote %}

Sign and submit the extrinsic.

## Explore

You can find all information about existing Digital Twins in `Developer -> Chain state` storage module `digitalTwin`.

- Total number of Twins - `total()`;
- Digital Twin owner - `owner(u32)`;
- Information about topics of a Digital Twin - `digitalTwin(u32)`.

{% roboWikiPicture {src:"docs/digital-twin/chain-state.jpg", alt:"chain-state"} %}{% endroboWikiPicture %}