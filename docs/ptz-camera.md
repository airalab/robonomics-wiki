---
title: RTZ camera control in Home Assistant
contributors: [nakata5321]
---

In this article, you will set up RTZ camera in Home Assistant. 
To set up RTZ camera in Home assistant you will use ONVIF protocol. 
To use it usually you have to set up local camera account, his process won't be covered in this article.

Requirements:
- RTZ camera
- Configured  camera **device** account
- IP address of camera
- Configured Home Assistant

## ONVIF integration

Let's start with installation  **ONVIF integration**. 

Go to "Devices & Services" in "Settings" and press "ADD INTEGRATION" button.
Type "ONVIF" and choose the integration. You will see the next window.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Press "Submit" button. It will try to automatic search of your camera. If it will be succeeding, choose your camera from list and 
fill empty fields. Or you have to fill all fields manually. You will see next window.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Fill the fields:
- Name - give a name to your camera
- Host - provide The IP address of your camera
- Port - 2020 (Usually port is 2020, but your camera provider may change port)
- Username - write a username of your camera **device** account
- Password - write a password of your camera **device** account

and press "Submit". Choose an Area for your camera and "Finish" installation.

## Add camera control to dashboard

You already fully setup camera to Home Assistant. Now let's provide camera stream and control buttons to dashboard.

Go to dashboard and start creating a new card. Choose "Picture Glance" card.

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Change nest fields:
- Name - Write a place where you install the camera
- Camera Entity - Choose camera entity from drop list
- Camera View - choose "live" to get less time lag

Next, change to "Code Editor" mode by press button at the bottom left side. You will se next code:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```
Instead of `entities: []` line insert next (The list of entities could be not empty. Then delete all lines with entities):

<code-helper copy>

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

</code-helper>

Then copy camera entity id from "camera_image" key. (In example it's `camera.tapo_mainstream`.) 
And insert it in place of `<YOUR_CAMERA_ENTITY>`. Save configuration.

That's all. Now you should see Card at the dashboard with control buttons.

## Troubleshooting
If you are using Home Assistant Core and you don't see stream from camera, you should install "stream" and "FFMPEG" integrations. 
To do this, you should add `stream: `  and `ffmpeg: `strings to the end of configuration.yaml.