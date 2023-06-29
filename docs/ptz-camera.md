---
title: RTZ camera control in Home Assistant
contributors: [nakata5321]
---

In this article, you will set up an RTZ camera in Home Assistant. 
To set up the RTZ camera in Home Assistant you will use the ONVIF protocol. 
To use it usually you have to set up a local camera account.

<robo-wiki-note type="warning">
the process of setting up the local camera account is not going to be covered in the article.
</robo-wiki-note>

Requirements:
- RTZ camera
- Configured  camera **device** account
- IP address of the camera
- Configured Home Assistant

## ONVIF integration

Let's start with the installation of **ONVIF integration**. 

Go to "Devices & Services" in "Settings" and press the "ADD INTEGRATION" button.
Type "ONVIF" and choose the integration. You will see the next window.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Press the "Submit" button. It will try to automatically search for your camera. If it will be succeeding, 
choose your camera from the list and fill in empty fields. 
Or you have to fill in all fields manually. You will see the next window.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Fill in the fields:
- Name - give a name to your camera
- Host - provide The IP address of your camera
- Port - 2020 (Usually port is 2020, but your camera provider may change port)
- Username - write a username of your camera **device** account
- Password - write a password for your camera **device** account

and press "Submit". Choose an Area for your camera and "Finish" installation.

## Add camera control to the dashboard

You already fully set up the camera to Home Assistant. 
Now let's provide a camera stream and control buttons to the dashboard.

Go to the dashboard and start creating a new card. Choose the "Picture Glance" card.

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Change nest fields:
- Name - Write a place where you install the camera
- Camera Entity - Choose a camera entity from the drop list
- Camera View - choose "live" to get less time lag

Next, change to "Code Editor" mode by pressing the button at the bottom left side. You will see the next code:
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

Then copy the camera entity id from the "camera_image" key. (In the example it's `camera.tapo_mainstream`.) 
And insert it in place of `<YOUR_CAMERA_ENTITY>`. Save configuration.

That's all. Now you should see Card on the dashboard with control buttons.

## Troubleshooting
If you are using Home Assistant Core and you don't see a stream from the camera, you should install "stream" and "FFMPEG" integrations. 
To do this, you should add `stream: `  and `ffmpeg: ` strings to the end of configuration.yaml.