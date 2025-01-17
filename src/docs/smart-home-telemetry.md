---
title: Get Smart Home Telemetry

contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp
    https://github.com/airalab/robonomics.app
  - Robonomics Home Assistant Integration 1.8.4
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In this article, you will use the Robonomics service, which queries the telemetry of smart home devices.**

{% roboWikiVideo {videos:[{src: 'Qmev1RwhsHNA7bvkNCMnpWKzTU7qKSJPBxbjTCJGpWcQUx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Go to dApp and select [Devices & Control](https://robonomics.app/#/telemetry).

2. Make sure that you have selected the right subscription.

3. Telemetry will be securely downloaded from Robonomics parachain, this will take a while. Once it finishes, you will see the information from your devices and sensors. Then, the Libp2p protocol will be used for faster connection to the smart home.
