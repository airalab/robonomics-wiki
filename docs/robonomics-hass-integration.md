---
title: Robonomics integration setup

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In this article, you will add Robonomics to Home Assistant. This allows Home Assistant to record datalogs with encrypted data to Robonomics Parachain and listen to launch commands from the parachain to control smart devices. Integration uses IPFS to store data and send IPFS hashes to datalog or launch functions.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. In the web interface of Home Assistant go to `Settings` -> `Device & Services` and press `ADD INTEGRATION`. Search for `Robonomics`.

2. Click on Robonomics and fill in the configuration: 

- Add seed from the `SUB_CONTROLLER` account to controller account seed.
- Add the public address of the `SUB_OWNER` account to the subscription owner address.
- Set the interval of data sending (by default it is 10 minutes).
- (Optional) You can add credentials for pinning service Pinata or other custom gateway to spread your data wider over the IPFS network.

<robo-wiki-note type="note" title="Note">

  In [Pinata Setup section](/docs/pinata-setup) you can find more detailed information about using Pinata.

</robo-wiki-note>

3. Press `SUBMIT` after finishing the configuration. If you filled in everything correctly, you will see the success window.

That's all! You have fully setup Robonomics Integration into Home Assistant. Now you can use all 
Robonomics Web Services. To find out more about them, go to ["Use" section](/docs/global-administration).
