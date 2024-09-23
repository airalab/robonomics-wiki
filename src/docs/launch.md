---
title: Launch
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Another basic feature of Robonomics parachain is the Launch pallet. It allows you to send commands to the accounts/any entities behind them. These commands include parameter to specify the task to be executed.**

{% roboWikiNote {title:"Dev Node", type: "Warning"}%} Please pay attention that this and following tutorials are demonstrated on a local instance of Robonomics Node. Set up yours with [these instructions](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Navigate to Developer -> Extrinsics

{% roboWikiPicture {src:"docs/launch/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Choose launch -> launch from the dropdown list of possible extrinsics

Also choose an account you want to submit the extrinsic with. Fill in the target address and the parameter field.

{% roboWikiPicture {src:"docs/launch/launch.jpg", alt:"launch"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"32 byte", type: "note"}%}   Launch supports 32 bytes long strings as commands ([source](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  so there is a room to improvise here:
  - For basic commands like toggling you may use "0x0000000000000000000000000000000000000000000000000000000000000001" or
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - For advanced commands including json-like you may use [IPFS](https://ipfs.tech/) CID formatted in a
  [proper way](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
{% endroboWikiNote %}

## 3. Submit transaction

{% roboWikiPicture {src:"docs/launch/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

## 4. Review your launch in the events

For this, navigate to *Network -> Explorer* and find a list of events on the right. Click a triangle icon to expand.

{% roboWikiPicture {src:"docs/launch/event.jpg", alt:"event"} %}{% endroboWikiPicture %}
