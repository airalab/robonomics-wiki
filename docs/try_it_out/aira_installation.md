# AIRA Installation on VirtualBox

AIRA is a client for Robonomics Network by Airalab. Basically it's a [NixOS](https://nixos.org/) based operating system.
It's possible to install AIRA on a x86_64 PC. Also there are images for Raspberry Pi 3 and 4 supported by the team.

To get familiar with the OS it's better to start from installing it as a virtual machine in [VirtualBox](https://www.virtualbox.org/).

Requirements:

* VirtualBox
* 2Gb of RAM for the machine
* 40Gb of free disk space

## Obtain the image

There are channels [stable](https://aira.life/channels/aira-stable/) and [unstable](https://aira.life/channels/aira-unstable/)

To get stable image download the file with `.ova` extension or:

```
wget https://aira.life/channels/aira-stable/nixos-20.03pre-git-x86_64-linux.ova
```

The same is for unstable one:

```
wget https://aira.life/channels/aira-unstable/nixos-20.03pre-git-x86_64-linux.ova
```

!!! note
    Don't forget to check checksum of an image

## Import to VirtualBox

Open VirtualBox and press `Ctrl+I` or go to `File > Import Applicance...`

![Import image](../img/try_it_out/aira_installation/import_image.png "Import image")

For checking out the image the next step is not necessary but to make connection via SSH more convenient it's recommended to add a second network adapter.

First add `Host-Only` adapter in VirtualBox menu `File > Host Network Manager...` or by pressing `Ctrl+H`

![Host Only](../img/try_it_out/aira_installation/host_only_adapter.png "Host Only")

Then go to the image's settings, Network and add the second network adapter

![Second adapter](../img/try_it_out/aira_installation/add_second_adapter.png "Second adapter")

Finally press Start and you'll see AIRA welcoming you with generated Ethereum address and IPFS identifier

![Welcome](../img/try_it_out/aira_installation/ready.png "Welcome")

There is a walkthrough video you may wish to check it out

<iframe width="756" height="425" src="https://www.youtube.com/embed/cDcaypYPBhI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Troubleshooting

If you have a fresh installed VirtualBox you need to install the [extension](https://www.virtualbox.org/wiki/Downloads) pack


