---
title: How to Send Launch with Subscription

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"Parachain", type: "warning"}%}Pay attention that this tutorial demonstrates using a subscription on Robonomics Kusama parachain. You can also perform all the same steps on your [local node](/docs/run-dev-node). {% endroboWikiNote %}


If your address has an active subscription, then any devices set up with that account's secret can send extrinsics with no fee.
Let's try to send the `launch` command.

Go to the `Developer/Extrinsics` page, then choose your account (the one from device list) and select `rws -> call(subscriptionId, call)`.
Then in `subscriptionId` field paste the subscription's owner address (the one who bid the auction) and in the next field
choose `launch -> launch(robot, param)`. In the `robot` field type the address you want to send `launch` transaction
to and insert the command (for launch command description refer [here](/docs/launch)). Then submit transaction:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}


Now go to the `Network/Explorer` page, and in the `Recent Events` area you will see two events that you created; `rws.NewCall` and `launch.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}

