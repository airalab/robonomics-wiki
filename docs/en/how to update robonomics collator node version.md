---
title: How to update robonomics collator node version
locale: 'en' 
contributors: [Leemo94]
translated: false
---

It is recommended to have read the following articles prior to reading this post. ["how-to-build-collator-node"](https://github.com/airalab/robonomics-wiki/blob/master/docs/en/how-to-build-collator-node.md) & ["how-to-launch-the-robonomics-collator"](https://github.com/airalab/robonomics-wiki/blob/master/docs/en/how-to-launch-the-robonomics-collator.md).

This article contains the commands required to update a Robonomics collator node (running on Ubuntu), and also gives an example afterwards.

# **Required Commands**

*Before you begin, it is recommended that you are logged in as Root, if not, then I would recommend that you use:*

``sudo su -``

1. Stop the robonomics service

``systemctl stop robonomics.service``

2. Remove previous version of Robonomics (make sure you are in the correct directory)

``rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz``

3. Get the latest release version of Robonomics

``wget https://github.com/airalab/robonomics/releases/vX.X.X/.....``

4. tar -xf new file

``tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz``

5. Move the file

``mv robonomics /usr/local/bin/``

*(note, you need to move this file to the correct directory which you installed the Robonomics node)*

6. Start Robonomics

``systemctl start robonomics.service``

# **Example when upgrading collator node to Robonomics v1.8.4**

``sudo su -`` - log in to root environment

``cd /home/admin`` - navigate to the correct directory (your directory may be different)

``systemctl stop robonomics.service`` - stop Robonomics

``rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz`` - remove previous version

``wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz`` - download latest release version (in this example v1.8.3)

``tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz`` - extract files

``mv robonomics /usr/local/bin/`` - move files to desired location

``systemctl start robonomics.service`` start Robonomics service

Note: releases of Robonomics can be found here: https://github.com/airalab/robonomics/releases/ 


