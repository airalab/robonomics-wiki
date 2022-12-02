---
title: Robonomics Smart Home Overview

contributors: [Fingerling42, nakata5321]
---

## Introduction

For your smart home, the modern IoT market provides a wide range of solutions. But you are usually tied to centralized cloud providers or expensive proprietary gateways. As a result, you as a user are always dependent on the hardware and infrastructure vendor to run your smart system. At the same time, your smart home cannot be truly smart without cloud statistics and analytics.

**We see two main problems with current smart homes:**

1. You have no control over what data you share with the vendor or third party.
2. Your smart home is vulnerable to shutdowns of centralized cloud servers. 

<robo-wiki-picture src="home-assistant/ha-problems.png" />

To solve both problems, we suggest you to try Robonomics, our **secure**, **serverless** and **futuristic** decentralized cloud.

<robo-wiki-picture src="home-assistant/ha-robonomics.png" />

To prepare your smart home, you will need:

 <table>
  <tr>
    <th width = "25%">
        <robo-wiki-picture src="home-assistant/need_1.png" /> 
        <p align="center"><a href="https://www.home-assistant.io/">Home Assistant</a> as 
        control system software</p> 
    </th>
    <th width = "25%">
        <robo-wiki-picture src="home-assistant/need_2.png" /> 
        <p align="center">Raspberry Pi 4 (at least 2 GB RAM)</p> 
    </th>
    <th width = "25%">
        <robo-wiki-picture src="home-assistant/need_3.png" /> 
        <p align="center">SD card (minimum 16 GB)</p> 
    </th>
    <th width = "25%">
        <robo-wiki-picture src="home-assistant/need_4.png" /> 
        <p align="center">SD adapter</p>
    </th>
  </tr>
      <tr >
    <th colspan="2">
    <robo-wiki-picture src="home-assistant/need_5.png" />
    <p align="center">Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </th>
    <th colspan="2">
    <robo-wiki-picture src="home-assistant/need_6.png" /> 
    <p align="center">Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
    <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
    </th>
  </tr>
</table> 

## Options 

You have several options for installing Home Assistant with Robonomics:

* [Pre-installed image](/docs/hass-image-install/) — This method implies setting up a whole new OS on your Raspberry Pi.
* [Home Assistant OS](/docs/hass-os-upgrade/) — The method is suitable for integrating Robonomics with an existing Home Assistant OS.
* [Home Assistant Docker for Unix-like OS](/docs/hass-docker-upgrade/) — The method is suitable for integrating Robonomics with an existing Home Assistant Docker for Unix-like OS.
* [Home Assistant Core](/docs/hass-core-upgrade/) — The method is suitable for integrating Robonomics with an existing Home Assistant Core.