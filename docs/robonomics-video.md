---
title: Robonomics Video Service
contributors: [nakata5321]
---

This article shows how to add ip camera to home assistant and send video to robonomics web service.

To connect a camera to Home Assistant, you need to know its IP address and create a local camera account to connect to the RTSP stream.

<robo-wiki-note type="warning">
Since this is done differently in each camera, this is not considered in this article.
</robo-wiki-note>

Requirements:
- IP camera
- Configured local camera account
- IP address of the camera
- Configured Home Assistant

<robo-wiki-note type="note">

In this article assumes that you have a general IP camera without RTZ(rotate,tilt, zoom) options. 
If you have RTZ camera, check ["RTZ camera" article](/docs/ptz-camera). And then go to second step here.

</robo-wiki-note>

## Connect the Camera

First, you need to find out the url address from the rtsp stream of the camera. 
To find information, try entering the following query on the Internet: "<CAMERA_NAME> rtsp stream".
Stream url must start with `rtsp://<IP_Address>...`. 

This article uses a Tapo camera and the stream path is `rtsp://<IP_Address>/stream1`.

Open Home Assistant and go to "Settings"-> "Devices & Services". Press the "ADD INTEGRATION" button and
start typing "generic camera" integration. Choose it.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

In the configuration window provide next information:
- Stream Source URL - The URL of camera RTSP stream
- Username - write a username of your local camera account
- Password - write a password for your local camera account

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

scroll down the setting and press the "Submit" button.

In Preview window activate the checkbox "This image looks good." and then the "Submit" button. And finish installation.

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### Add to the Dashboard

Additionally, you can add the stream to your dashboard. To do this, let's go to it and create a new card 
"Picture Glance". Further:
- enter the title you want
- delete data from image path
- select our camera in camera_entity
- in the camera view, select live so that there is less delay

And save it.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## Check media folder

Before sending the video to the Robonomics Video Service, it must be saved in a folder, and Home Assistant must have access to this folder. 
The easiest option in this case is to use a media pack, in which the Home Assistant stores all the media.

- If you use HAOS or Pre-installed Image your Home Assistant **already have Media folder**.
- If you use Home Assistant Core, you should go to `.homeassistant` folder and create `media` folder in it.
- If you use Home Assistant Docker, add ` -v /PATH_TO_YOUR_MEDIA:/media \` line to the Docker command.

to check that everything works, go to the “Media” -> “local media” tab and see an empty folder (don’t see any errors):

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## Service Call

To send a video to Robonomics, you should call a service "Robonomics: Save recording to robonomics ". Now you will do it manually, but later you can create automation for it. 

To do this, go to "Developer tools" -> "Services" and find "Robonomics: Save recording to robonomics ".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

In "Targets" choose your camera entity.
in "Path to save the recording" you should provide an absolute path to the folder,
where Home Assistant can save the video:
- For Pre-installed image - `/home/homeassistant/.homeassistant/media`;
- For HA OS or Home Assistant Docker- `/media`;
- For Home Assistant Core - Path to the folder, where you create a media folder.

Additionally, you can choose the recording Duration. 

Fill in the fields and call the service with the "CALL SERVICE" button.

## DAPP

to view the received video go to [Robonomics DAPP](https://vol4tim.github.io/videostream/).

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

Paste in your controller's account address and click the button. Wait while the search for twins is in progress. 
As a result, you will get an IPFS hash with all recorded videos.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

Next, select the controller account (or any other) from the drop-down list and sign a message for authorization in
the web3 ipfs gateway to download all the videos. As a result, we see all the videos recorded by our smart home.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

Since all the videos in the folder are encrypted with the controller key, you need to insert them to decrypt videos.
After that, the video playback button is activated. After clicking on the play button, 
the video is downloaded, and it will become available for playback.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






