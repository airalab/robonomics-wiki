---
title: Datalog
contributors: [PaTara43]
tools:
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Now that you have some funds on your account you can submit extrinsics. The first to try is a Datalog. It allows you to store data in the blockchain persistently. Imagine a distributed and crypto-protected storage for your data and this is it!**

{% roboWikiNote {type: "warning", title: "Dev Node"}%}Please pay attention that this and following tutorials are demonstrated on a local instance of Robonomics Node. Set up yours with [these instructions](/docs/run-dev-node).
{% endroboWikiNote %}


## 1. Navigate to Developer -> Extrinsics

{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}

## 2. Choose datalog -> record from the dropdown list of possible extrinsics

Also choose an account you want to submit the extrinsic with. Fill in the record field.

{% roboWikiPicture {src:"docs/datalog/record.jpg", alt:"record"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Large amount of data"}%} Datalog supports a string with a maximum of 512 bytes. To store large amount of data one may use [IPFS](https://ipfs.tech/).
{% endroboWikiNote %}

## 3. Submit transaction

Sign and submit the transaction with an account created previously using the extension or the DApp.

{% roboWikiPicture {src:"docs/datalog/submit.jpg", alt:"submit"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Erase"}%} You may also erase **ALL** of your records with *datalog -> erase* call.
{% endroboWikiNote %}

## 4. Review your datalog in the storage

For this, navigate to *Developer -> Chain state*, select *datalog -> datalogIndex*, specify your account and press the
"+" button to get the indexes of your account's records and then explore the one you need with *datalog -> datalogItem*.

{% roboWikiPicture {src:"docs/datalog/item.jpg", alt:"item"} %}{% endroboWikiPicture %}

{% roboWikiNote {type: "note", title: "Explorer"}%} All the events including datalog record may be seen in the events flow in the *Explorer*.
{% endroboWikiNote %}