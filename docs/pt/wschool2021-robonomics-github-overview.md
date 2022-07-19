---
title: Lesson 2, Robonomics AIRA Overview 
locale: 'pt' 
contributors: [Ensrationis]
translated: true
---
In this lesson you will learn about Autonomous Intelligent Robot Agent (AIRA). 

AIRA is a NixOS-based operating system that implements an economic standard for human-robot and robot-robot interactions. AIRA makes it possible to connect a variety of different robots under decentralized computer control (currently supports Ethereum, Polkadot, and Substrate).

Towards learning how to leverage AIRA, in this lesson, you would install AIRA, ssh into it and interact with it by runnig a simple example.


## Part 1: AIRA Installation on VirtualBox

### **Requirements**

* [VirtualBox](https://www.virtualbox.org/wiki/Downloads#VirtualBox6.1.2OracleVMVirtualBoxExtensionPack) 6.1 or higher
* [VirtualBox Extension Pack](https://www.virtualbox.org/wiki/Downloads#VirtualBox6.1.2OracleVMVirtualBoxExtensionPack)
* 2GB of RAM for the machine
* 20GB of free disk space

> You can follow the procedure mentioned [here](https://computingforgeeks.com/install-virtualbox-6-on-ubuntu-linux/) to install VirtualBox and its extension.

> After successfully installing VirtualBox download the WinterSchool AIRA image from [here](https://static.aira.life/ova/airaos-21.11_robonomics-winter-school.ova).

### **Import AIRA to VirtualBox**

Open VirtualBox and press `Ctrl+I` or go to `File > Import Applicance...` and choose the previously downloaded image to be imported.

![AIRA import VB image](../images/aira-installation/aira_import_vb_image.jpg "AIRA import VB image")

## **Launch the machine**

Once the importing is over, press on Start button and you'll see AIRA welcoming you with generated Ethereum address and IPFS identifier

![AIRA image ready, Welcome screen](../images/aira-installation/aira_image_ready.jpg "AIRA image ready, Welcome screen")

> In case of any problems, a detailed walk-through video of this section can be [here](https://youtu.be/ISKilRfY3Ow).

## Part 2: Connecting to Aira via SSH

In order to easily interact with AIRA without frequently switching between your host machine and the virtual machine (VM), you can simply ssh to the AIRA, and run everything on AIRA from the terminal on your host machine. Here we show you how to setup a password-less ssh for AIRA.

> **It's required to have your ssh public key on Github. In case you don't have one, please follow the [link](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)**

### **Add Host Adapter**

Go to `File` -> `Host Network Manager...` or press `Ctrl+H`

Click on `Create` button. You should see a new adapter created such as `vboxnet#`.

### **Add the adapter to the VM**

Select imported VM and click `Settings`. Go to `Network` tab and enable the adapter you just created. (e.g. in the figure below the new adapter name is  `vboxnet1`)

![Add Second Adapter](../images/add_second_adapter_to_vm.png "Add Second Adapter")

### **Populate Authorized Keys**

Launch the VM and run the following command replacing `<username>` with your Github user name:

```
mkdir .ssh
chmod 700 .ssh
curl -sSL https://github.com/<username>.keys >> .ssh/authorized_keys
```

Find out the VM's IP address by running:

```
ip a
```

You should look for an address which starts with `192.168.xx.xx`

### **Log in via SSH**

Now open your terminal and log in via SSH as usual using the address from the previous step:

```
ssh root@192.168.xx.xx
```
> In case of any problems, a detailed walk-through video of this section can be [here](https://youtu.be/W0rOcRA2sEc).
## Part 3: Interact with AIRA

At this point you should be familiar with a [DApp](/docs/get-weather-on-fuji-mountain/) from lesson 1 and also how to launch [AIRA image](/docs/aira-installation-on-vb/).
Now you are ready to do more complicated stuff like installing a package and interacting with it via DApp


### **Package installation**

After you launched AIRA and logged in via SSH using your terminal, run the following commands:

```
su liability && cd
git clone https://github.com/vourhey/hello_aira
cd hello_aira
nix build -f release.nix
source result/setup.bash
rosrun hello_aira hello_aira
```

Upon running the last command, you should see a link to DApp generated specifically for your instance.

![Terminal with AIRA](../images/aira_hello_terminal.jpg "Terminal with AIRA")

Click on the link, the DApp should be shown.

### **DApp** 

Connect [MetaMask](http://metamask.io/) if prompted and click on the button

![Request connection in Robonomics Dapp](../images/aira_hello_dapp.jpg "Request connection in Robonomics Dapp")

Sign the message and wait for the result

![Wait for Result of request](../images/aira_hello_dapp_2.jpg "Wait for Result of request")

Meanwhile have a look at the terminal. You should see the greeting

![AIRA greeting in terminal](../images/aira_hello_terminal_2.jpg "AIRA greeting in terminal")

At the end, the greeting will appear in the DApp

![Robonomics DApp Greeting for AIRA](../images/aira_hello_dapp_3.jpg "Robonomics DApp Greeting for AIRA")

### **Troubleshooting**

### You click "Request current values" but see no greeting

Probably you have just launched AIRA and IPFS hasn't finished initialization. Wait a minute or so and try again.

### I see response hash but the data doesn't appear

Again most probably the issue comes from IPFS connection. Click and the hash and you'll see the result. It's not necessary to download the file.

> In case of any problems, a detailed walk-through video of this section can be [here](https://youtu.be/fhRTF2mddfU).
