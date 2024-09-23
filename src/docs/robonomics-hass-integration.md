---
title: Robonomics integration setup

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In this article, you will add Robonomics to Home Assistant. This allows Home Assistant to record datalogs with encrypted data to Robonomics Parachain and listen to launch commands from the parachain to control smart devices. Integration uses IPFS to store data and send IPFS hashes to datalog or launch functions.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

First of all you need to create config for your dashboard. For this open your Home Assistant dashboard and at the right top corner press "Edit Dashboard" button (a pencil).
In the opened pop-up, click on the three dots icon and select the "Take Control" button:

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

Press "Take Control" one more time:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'integration setup'}%} {% endroboWikiPicture %}

Now you can install the Robonomics integration. To do so, follow these steps:
 
{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. In the web interface of Home Assistant go to `Settings` -> `Device & Services` and press `ADD INTEGRATION`. Search for `Robonomics`.

2. Click on Robonomics and fill in the configuration:

- Add seed from the `SUB_CONTROLLER` account to controller account seed.
- Add the public address of the `SUB_OWNER` account to the subscription owner address.
- Set the interval of data sending (by default it is 10 minutes).
- (Optional) You can add credentials for pinning service Pinata or other custom gateway to spread your data wider over the IPFS network.

{% roboWikiNote {title:"Note", type: "Note"}%} In [Pinata Setup section](/docs/pinata-setup) you can find more detailed information about using Pinata.{% endroboWikiNote %}

3. Press `SUBMIT` after finishing the configuration. If you filled in everything correctly, you will see the success window.

That's all! You have fully setup Robonomics Integration into Home Assistant. Now you can use all
Robonomics Web Services. To find out more about them, go to ["Use" section](/docs/add-user).
