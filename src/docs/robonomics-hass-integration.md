---
title: Robonomics integration setup

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 2.0.2
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
 

1. In the web interface of Home Assistant go to `Settings` -> `Device & Services` and press `ADD INTEGRATION`. Search for `Robonomics`.

2. Click on Robonomics, upload your setup file, and enter password for the `CONTROLLER` account. Instructions on how to create the setup file can be found [here](/docs/sub-activate/?topic=smart-home#setup-your-subscription)

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"controller create"} %}{% endroboWikiPicture %}

3. Optional: You can choose which network to use.

4. Press `SUBMIT` after finishing the configuration. If you filled in everything correctly, you will see the success window.

{% roboWikiNote {type: "okay", title: "" }%} The installation may take approximately 10–15 minutes, depending on your internet connection. {% endroboWikiNote %}

That's all! You have fully setup Robonomics Integration into Home Assistant. Now you can use all
Robonomics Web Services. To find out more about them, go to ["Use" section](/docs/add-user).
