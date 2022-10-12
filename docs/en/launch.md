---
title: Launch
contributors: [PaTara43]
translated: true
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Another basic feature of Robonomics parachain is the Launch pallet. It allows you to send commands to the accounts/any 
entities behind them. These commands include parameter to specify the task to be executed.**

## 1. Navigate to Developer -> Extrinsics

<robo-wiki-picture src="launch/extrinsics.jpg" />

## 2. Choose launch -> launch from the dropdown list of possible extrinsics

Also choose an account you want to submit the extrinsic with. Fill in the target address and the parameter field.

<robo-wiki-picture src="launch/launch.jpg" />

<robo-wiki-note type="note" title="32 bytes">

  Launch supports 32 bytes long strings as commands ([source](https://polkascan.github.io/py-scale-codec/types.html#scalecodec.types.H256)),
  so there is a room to improvise here:
  - For basic commands like toggling you may use "0x0000000000000000000000000000000000000000000000000000000000000001" or
  "0x0000000000000000000000000000000000000000000000000000000000000000".
  - For advanced commands including json-like you may use [IPFS](https://ipfs.tech/) CID formatted in a 
  [proper way](https://github.com/Multi-Agent-io/robonomics-interface/blob/17a55368cadfaa086af13a96f711684417640d88/robonomicsinterface/utils.py#L64).
  This python library will be discussed in particular [later]().

[//]: # (todo)
[//]: # (add link to rinterface.)

</robo-wiki-note>

## 3. Submit transaction

<robo-wiki-picture src="launch/submit.jpg" />

## 4. Review your launch in the events

For this, navigate to *Network -> Explorer* and find a list of events on the right. Click a triangle icon to expand.

<robo-wiki-picture src="launch/event.jpg" />
