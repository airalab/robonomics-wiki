---
title: Altruist Setup
contributors: [tubleronchik]
---

**This guide walks you through setting up and activating an Altruist Outdoor sensor. You'll connect the sensor to Wi-Fi, configure its location, and activate a subscription using XRT tokens. Additionally, instructions for integrating the sensor with Home Assistant via HACS or manual installation are provided.**

{% roboWikiNote {type: "warning"}%} All devices from Robonomics can be purchased on the official [website](https://robonomics.network/devices/).{% endroboWikiNote %}

## Activate Robonomics Subscription

{% roboWikiNote {type: "okay"} %}To complete this step, ensure you have at least 2-3 XRT tokens in your `Robonomics Polkadot` account.{% endroboWikiNote %}

1) Navigate to the Robonomics dApp [subscription page](https://robonomics.app/#/rws-buy). 
2) Click on **Account** and connect your wallet. Your account address and balance will be displayed.
If you don’t have an account, follow [this guide](https://wiki.robonomics.network/docs/create-account-in-dapp/) to create one.

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"subscription page"} %}{% endroboWikiPicture %}

3) Сlick `BUY SUBSCRIPTION` and sign the transaction. **Wait for the activation process to complete**. 
4) Once activated, you will be redirected to the **setup page**, where you can see your subscription name and expiration date.

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"subscription setup page"} %}{% endroboWikiPicture %}

5) **Save your account address** — you will need it during the sensor setup. You can copy it from the "OWNER" section or by clicking your account name in the top-right corner and selecting the copy button.

## Sensor Setup

{% roboWikiNote {type: "warning", title: "INFO"}%} The sensor can only be connected to a 2.4GHz Wi-Fi network.{% endroboWikiNote %}

1) **Plug in the sensor** to a power socket.
2) The board will create a Wi-Fi network named Altruist-xxxxxxxxx. Connect to it from your phone or computer. You should be automatically prompted to open the authorization window. 
- If not, open a browser and go to 192.168.4.1.

{% roboWikiPicture {src:"docs/altruist/networks.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

3) **Configure the Wi-Fi settings**:
- Select your Wi-Fi network from the list or enter it manually if it doesn't appear.
- Enter the password in the "WI-FI SETTINGS" field.
- If you have multiple Altruist devices on the same network, change the Local Hostname. After setting up WiFi, you can connect to your sensor using this hostname.

{% roboWikiPicture {src:"docs/altruist/wifi_creds.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

4) **Save Configuration**
- Click the `Save Configuration and Restart` button and wait for the sensor to connect to WiFi. Once connected, it will display its new IP address — copy it, as this is an alternative way to connect to your sensors after setup.

{% roboWikiPicture {src:"docs/altruist/connected.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

5) **Enter your Robonomics details**:
- Open the Altruist web interface at http://altruist.local (or use your custom Local Hostname followed by `.local` if you changed it). Then, navigate to the `Configuration` page.
- In the `Robonomics` section paste the RWS Owner Address you copied earlier into the designated field. 

6) **Set the sensor location**:
- In the `GPS & Temperature Correction` section enter the coordinates of the sensor's installation site.
- You can find coordinates using online maps or convert an address to latitude/longitude using [this link.](https://www.latlong.net/convert-address-to-lat-long.html)


{% roboWikiNote {type: "warning", title: "WARNING"}%}The sensor coordinates will then be displayed on a publicly available map. If you do not want to show your private information, write close, but not exact coordinates.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/robo-gps.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

7) **Copy the Altruist "Robonomics Address"**:
- You will find it at the top of the page. Save it for the final step.

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"altruist address"} %}{% endroboWikiPicture %}

8) Click "**Save configuration and restart**" at the bottom of the page. The board will reboot.

## Altruist activate
The final step in the setup process is adding the **Altruist address** to your **Robonomics Subscription**.

1) Go back to the [Setup page](https://robonomics.app/#/rws-setup).

2) Scroll down to the "**Users in subscription**" section.

3) In the "**Add a user**" field, paste the **Altruist Robonomics address** you copied earlier.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"add user"} %}{% endroboWikiPicture %}

4) Click the **plus (+) button** and sign the message.

5) Wait for the operation to complete.

That's it! Your setup is now complete. 🎉

You can now find your Altruist on the [Robonomics Sensors Social](https://sensors.social/#) map. 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"sensor map"} %}{% endroboWikiPicture %}

## Home Assistant

There are two ways to add **Altruist** to **Home Assistant**:

### Option 1: HACS (Recommended)

The easiest way to add **Altruist** is through **HACS**. You can find a brief setup guide [here](https://hacs.xyz/docs/use/) 

**Steps**:
1) Once HACS is installed, open it.

2) Click the **three dots** in the top-right corner and select "**Custom repositories**".

3) In the pop-up window, enter the following URL:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) Set the type to "**Integration**" and click "**ADD**".

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) Search for the **Altruist Sensor** integration.

6) Click the **Download** button, then restart **Home Assistant** once the integration is installed.


{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### Option 2: Manual Installation

1) Under the `homeassistant` user, clone the project repository:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) If you already have any custom integrations, move the `altruist` folder to your `custom_components` directory:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) If you **don’t** have any custom integrations, move the entire custom_components directory:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integration
mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Configuration

After installation and restarting Home Assistant, the integration will automatically detect Altruist on your network.

1) Go to **Settings → Devices & Services**.

2) Add the **Altruist Sensor**.

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"discover altruist"} %}{% endroboWikiPicture %}

That’s it! 🚀 Your Altruist Sensor is now integrated with Home Assistant.

