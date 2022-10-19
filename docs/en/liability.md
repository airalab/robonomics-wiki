---
title: Liability
contributors: [PaTara43]
translated: true
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
  - robonomics_interface 1.3.5
    https://github.com/Multi-Agent-io/robonomics-interface
---

**To turn robots into economic agents one needs a contract tool for this. Meet Liability - Robonomics pallet implementing
contracts between parachain accounts!**

## Theory Overview

Back on the Ethereum there was quite a complicated structure of liability interaction. You can get acquainted with it 
[here](/docs/robonomics-how-it-works). Nowadays things are a bit easier with Kusama!

### Negotiations

To sign a contract the two sides need to negotiate first. This may be done several ways, including 
[IPFS PubSub ](https://blog.ipfs.tech/25-pubsub/) or Robonomics PubSub. A sample of Python code using Robonomics PubSub is 
presented [here](https://multi-agent-io.github.io/robonomics-interface/usage.html#pubsub). 

Offer and demand are messages containing two main characteristics of a contract: **job description** and **price**. Message
format is to be designed by user for each specific application. It is not that important in the negotiations process to follow
a strict format rule. The possible flow is presented in the picture below.

<robo-wiki-picture src="liability/negotiations.jpg" />

<robo-wiki-note type="warning" title="PubSub">

  Note that PubSub is an open protocol, so no sensible data should be transferred. For this you should use other protocols.

</robo-wiki-note>


### Signatures

When negotiations are successfully over, each side needs to sign its so-called agreement named a signature. This is a 
message containing job description and price **in a specific format** signed with a private key of the account. There is a 
[Python tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_liability) for that as well.
 - Job description is called **technics**. This is a launch-like 32 bytes long string which may be an encoded IPFS CID.
 - Price is called **economics**. This is an XRT decimal - Weiner. 1 Weiner = 10**-9 XRT.

<robo-wiki-note type="note" title="32 bytes">

  One may obtain an [IPFS](https://ipfs.tech/) CID formatted in a proper way with the [Python library](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_qm_hash_to_32_bytes).
  When using the `sign_liability` function, no need to transform the hash, it will be done automatically.

</robo-wiki-note>

Following the coffee example:

1. The task is a JSON
```json
{"task": "make_espresso", "description": "Make one cup of espresso"}
```
2. Its IPFS CID is `QmP17mWKtQtq2Gq6qZAggPRrho3sVjQGBpXZ8KZiQ57FDi`
3. So the **technics** (transformed CID) is `0x09daaa8055722a6894951b1273e807f8a46628efeec46805f0228ace230bd5a9` 
4. **Economics** is `1.5 XRT`.

When signed, it's time to create a liability! This may be done by one of the sides (either promisee or promisor) or by a 
3rd-party account of a so-called provider.

## Create Liability

### Preparations

As have been mentioned earlier, at least two sides are involved in the process. For this example, let's use three and make
a separated provider for this. Assume that the negotiations took place somehow already.

### 1. Create three accounts and add funds to them

<robo-wiki-picture src="liability/balances.jpg" />

Here we have supplied the provider with 100 XRT to sign liability extrinsics, promisee was given 2 XRT to pay for the work.
Promisor wasn't granted any funds (except for an existential deposit of at least 1 mXRT).

### 1. Navigate to Developer -> Extrinsics

<robo-wiki-picture src="liability/extrinsics.jpg" />

### 2. Choose liability -> create from the dropdown list of possible extrinsics

Also choose an account you want to submit the extrinsic with. Fill in all the parameters.

<robo-wiki-picture src="liability/create.jpg" />

<robo-wiki-note type="note" title="Signatures">

  Since provider is used here, no need to know seeds of the participants. Only their signatures needed.

</robo-wiki-note>

### 3. Submit transaction

<robo-wiki-picture src="liability/submit.jpg" />

### 4. Review your liability in the events

For this, navigate to `Network -> Explorer` and find a list of events on the right. Click a triangle icon to expand.

<robo-wiki-picture src="liability/new-liability.jpg" />

<robo-wiki-note type="note" title="Hash">

  The hash may be transformed to an IPFS CID with the same 
  [Python tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.utils.ipfs_32_bytes_to_qm_hash).

</robo-wiki-note>

### 5. Storage exploring

You may also explore some characteristics of the liabilities in storage module `liability`.

<robo-wiki-picture src="liability/storage-liability.jpg" />

<robo-wiki-note type="note" title="Next Index">

  The `Next Index` storage function shows the latest liability index +1, so even though it's `1`, liability `0` is explored.

</robo-wiki-note>

## Reports

Image that a coffee has been made and now the coffee machine needs to report it somehow. That's where liability reports
come into scene. As a proof of labour the account adds another IPFS CID as a report content when finalizing the existing
liability. This again requires a signature of the promisor.

<robo-wiki-note type="note" title="Report signature">

  Message signed contains of the existing liability index and the report IPFS CID encoded in 32 bytes representation. Once again,
  the [Python tool](https://multi-agent-io.github.io/robonomics-interface/modules.html#robonomicsinterface.Liability.sign_report) can help to sign the report.

</robo-wiki-note>

Keeping with the coffee machine example:

1. Report is a JSON
```json
{"report": "Coffee made! Time to execute - 80 seconds."}
```
2. Its IPFS CID is `QmeXCrBuv6cw825JJfSWqNVv28AyjJZW9KReN9wcLQjfCm`
3. So the **payload** (transformed CID) is `0xf06f2394f55537a5f37d63fd72bfbef50e9f60ea9e0e34224e455afae27a97a2` 
4. **Index** is `0` it's the existing liability index.

### 1. Navigate to extrinsics, liability -> finalize(report)

Fill in the parameters and submit extrinsic. Again, this may be done by a 3rd-party account. 

<robo-wiki-picture src="liability/report.jpg" />

<robo-wiki-note type="warning" title="Existential deposit">

  Pay attention that the promisor account should not be "dead" - it should have the existential deposit of at least 1 mXRT.

</robo-wiki-note>

Sign and submit the report. When done, you can explore it in the events.

<robo-wiki-picture src="liability/new-report.jpg" />

### 2. Explore reports

You can also observe the report in the storage. Go to `Developer -> Storage` and choose `liability` from the dropdown list.

<robo-wiki-picture src="liability/storage-report.jpg" />

### 3. Check balances

On the picture it's shown that now the promisor has got the "salary". Economical relationship happened!

<robo-wiki-picture src="liability/balances-2.jpg" />


<robo-wiki-note type="note" title="Verifying">

  As for now there is no way to verify the job is done, so as soon as the promisor reports, the tokens are transferred to its account.
  The verify feature is to be added in the future.

</robo-wiki-note>