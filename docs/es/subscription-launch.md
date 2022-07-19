---
title: How to Send Launch with Subscription
locale: 'es' 
contributors: [LoSk-p]
translated: false
---

If your address is in devices of any subscription you can send extrinsics with no fee. Lets try to send `launch`.

Go to `Developer/Extrinsics`, choose your account (`MAIN` in the picture) and `rws -> call`. Then in `subscriptionID` field write the subscription's owner address (`SUBSCRIPTION OWNER` in the picture) and in the next field choose `launch -> launch`. In the `robot` field write the address you want to send `launch` transaction to(`LIGHTBULB (EXTENTION)` in the picture) and choose the parameter `Yes` or `No`. Then submit transaction:

![launch](../images/dev-node/launch.png)


Now go to `Network/Explorer` and in the `Recent Events` you will see two events `rws.NewCall` and `launch.NewLaunch`:

![events](../images/dev-node/events.png)