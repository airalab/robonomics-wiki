# Interact With AIRA

At this point you should be familiar with a [DApp](get_weather_on_fuji_mountain.md) and how to launch [AIRA image](aira_installation.md).
Now you are ready to do more complicated stuff like installing a package and interacting with it via DApp.

!!! important

    Make sure you have covered previous lessons before you continue

!!! tip

    During the lesson you will type few commands in a terminal. AIRA image doesn't support clipboard so to make life easier have a look at [Connect via SSH](../aira/connecting_via_ssh.md) and log in via SSH to the VM

Walkthrough video:
<iframe width="756" height="425" src="https://www.youtube.com/embed/QM06l07_wuA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Package installation

After you launched AIRA and logged in using your terminal do the following:

```
su liability && cd
git clone https://github.com/vourhey/hello_aira
cd hello_aira
nix build -f release.nix
source result/setup.bash
rosrun hello_aira hello_aira
```

Run one by one commands above. After the last one you should see a link to DApp generated specifically for your instance.

![Terminal](../img/hello_aira_terminal.png "Terminal")

Click on the link, the DApp should be shown.

## DApp 

Connect [MetaMask](http://metamask.io/) if prompted and click on the button

![Request](../img/hello_aira_dapp.png "Request")

Sign the message as usual and wait for the result

![Wait for Result](../img/hello_aira_dapp_2.png "Wait for Result")

Meanwhile have a look at the terminal. You should see the greeting

![Greeting](../img/hello_aira_terminal_2.png "Greeting")

In the end the greeting will appear in the DApp

![DApp Greeting](../img/hello_aira_dapp_3.png "DApp Greeting")

## Troubleshooting

### You click "Request current values" but see no greeting

Probably you have just launched AIRA and IPFS hasn't finished initialization. Wait a minute or so and try again

### I see response hash but the data doesn't appear

Again most probably the issue comes from IPFS connection. Click and the hash and you'll see the result. It's not necessary to download the file

## Home Task (optional)

If you are familiar with [Python](https://www.python.org/) change the shown text to something different and complete the lesson with your version of `hello_aira`

!!! tip

    Make a fork of the [repository](https://github.com/vourhey/hello_aira)

!!! tip

    The output text is located [here](https://github.com/Vourhey/hello_aira/blob/master/scripts/hello_aira#L45)

