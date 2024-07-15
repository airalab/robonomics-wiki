---
title: How To Use Blueprints
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In this article you will know how to add automation blueprints to your Home Assistant and configure it.

## Blueprint Automations

Some blueprints are already installed. Automations based on such blueprints only need to be configured. In web interface you can find pre-installed blueprints in `Settings/Automations & Scenes`. Open `Blueprints` and find the blueprint you want to use. In this example `Motion-activated Light` will be used.

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"Blueprint Settings"} %}{% endroboWikiPicture %}

Click on `Create Automation` to open the automation editor. Give a name, choose a blueprint to use (`Motion-activated Light` in our case). After that you need to choose motion sensor and lamp. When configuration is finished, click `Save`.

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"Automation Configuration"} %}{% endroboWikiPicture %}

If you want to make changes, you can find it by going to `Settings/Automations & Scenes` and then `Automations`.

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"Automations List"} %}{% endroboWikiPicture %}

## Importing Blueprints

Home Assistant can import blueprints from the Home Assistant forums, GitHub and GitHub gists. List of all Blueprints are located on [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). After you chose, go to `Settings/Automations & Scenes` and open `Blueprints`. Click on `Import Blueprint` and insert URL of the chosen blueprint. Then click on `PREVIEW BLUEPRINT`. In this case we will use [Low battery level detection & notification for all battery sensors](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664).

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"Importing Blueprint"} %}{% endroboWikiPicture %}

This will load the blueprint and show a preview in the import dialog. You can change the name and finish the import. Click on `Create Automation` to open the automation editor. Here you can configure automation's parameters and add actions to get notifications.

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"Configure Battery Blueprint"} %}{% endroboWikiPicture %}