---
title: Datalog
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Now that you have some funds on your account you can submit extrinsics. The first to try is a Datalog. It allows you to store data in the blockchain persistently. Imagine a distributed and crypto-protected storage for your data and this is it!**

<robo-wiki-note type="warning" title="Dev Node">

  Please pay attention that this and following tutorials are demonstrated on a local instance of Robonomics Node. Set
 up yours with [these instructions](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navigate to Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. Choose datalog -> record from the dropdown list of possible extrinsics

Also choose an account you want to submit the extrinsic with. Fill in the record field.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalog supports a string with a maximum of 512 bytes. To store large amount of data one may use [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. Submit transaction

Sign and submit the transaction with an account created previously using the extension or the DApp.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  You may also erase **ALL** of your records with *datalog -> erase* call.

</robo-wiki-note>

## 4. Review your datalog in the storage

For this, navigate to *Developer -> Chain state*, select *datalog -> datalogIndex*, specify your account and press the 
"+" button to get the indexes of your account's records and then explore the one you need with *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="Explorer">

  All the events including datalog record may be seen in the events flow in the *Explorer*.

</robo-wiki-note>