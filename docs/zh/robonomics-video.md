---
title: Robonomics视频服务
contributors: [nakata5321]
---

本文介绍如何将IP摄像机添加到Home Assistant并将视频发送到Robonomics Web服务。

要将摄像机连接到Home Assistant，您需要知道其IP地址并创建一个本地摄像机帐户以连接到RTSP流。

<robo-wiki-note type="warning">
由于每个摄像机的操作方式不同，本文不涉及此过程。
</robo-wiki-note>

要求:
- IP摄像机
- 配置的本地摄像机帐户
- 摄像机的IP地址
- 配置的Home Assistant

<robo-wiki-note type="note">

本文假设您拥有一台没有RTZ（旋转、倾斜、缩放）选项的通用IP摄像机。 
如果您有一台RTZ摄像机，请查看["RTZ摄像机"文章](/docs/ptz-camera)。然后回到这里的第二步。

</robo-wiki-note>

## 连接摄像机

首先，您需要找到摄像机的 RTSP 流的 URL。
为此，请尝试在互联网上输入以下查询：“<摄像机名称> RTSP流”。
流URL必须以`rtsp://<IP地址>...`开头。 

本文使用的是“Tapo”摄像机，流路径为`rtsp://<IP地址>/stream1`。

打开Home Assistant并转到"Settings"-> "Devices & Services"。按下"ADD INTEGRATION"按钮并
开始输入"Generic Camera"集成。选择它。

 <robo-wiki-picture src="home-assistant/generic.jpg" />

在配置窗口中提供以下信息：
- Stream Source URL - 摄像机的RTSP流URL
- Username - 编写本地摄像机帐户的用户名
- Password - 编写本地摄像机帐户的密码

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

向下滚动设置并按下"Submit"按钮。

在预览窗口中激活复选框"This image looks good."并按下"Submit"按钮。然后 - "Finish".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### 添加到仪表板

此外，您还可以将流添加到仪表板。要执行此操作，请导航到仪表板并创建一个新卡片 
"Picture Glance"。进一步的步骤：
- 输入您想要的"Title"
- 从“Image Path"中删除数据
- 在Camera Entity"中选择摄像机
- 在"Camera View"中，选择"live"以减少延迟

然后保存。
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## 检查媒体文件夹

Before being sent to the Robonomics Video Service, the video must be saved in a folder, and Home Assistant must have access to this folder. 
在这种情况下，最简单的选择是使用媒体包，其中Home Assistant存储所有媒体。

- 如果您使用HAOS或预安装的映像，您的Home Assistant **已经有媒体文件夹**。
- 如果您使用Home Assistant Core，您应该转到`.homeassistant`文件夹并在其中创建`media`文件夹。
- 如果您使用Home Assistant Docker，请将` -v /PATH_TO_YOUR_MEDIA:/media \`行添加到Docker命令中。

要检查是否正确设置了所有内容，请转到Home Assistant中的“Media” -> “local media”选项卡。 
您应该看到一个空文件夹（没有错误）：

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## 服务调用

要将视频发送到Robonomics，您应该在Home Assistant中调用一个专用服务。 
在本文中，这是手动完成的，但您可以为其创建一个自动化。

要执行此操作，请转到"Developer tools" -> "Services"，然后找到"Robonomics: Save recording to Robonomics".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

在"Targets"中选择您的摄像机实体。
在"Path to save the recording"中，您应该提供一个绝对路径到文件夹，
Home Assistant可以在其中保存视频：
- 对于预安装的映像 - `/home/homeassistant/.homeassistant/media`;
- 对于HA OS或Home Assistant Docker- `/media`;
- 对于Home Assistant Core-先前创建的媒体文件夹的路径。

此外，您还可以选择录制持续时间。 

填写数据并使用"CALL SERVICE"按钮调用服务。

## DAPP

要查看生成的视频，请转到[Robonomics DAPP](https://vol4tim.github.io/videostream/)。

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

粘贴您的控制器帐户地址并单击下面的按钮。等待"Search for Twins"过程。 
结果，您将获得一个带有所有录制视频的IPFS CID。

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

接下来，从下拉列表中选择控制器帐户（或其他任何帐户），并签署一条用于在
Web3 IPFS网关中进行授权以下载所有视频的消息。结果，您将获得由您的智能家居录制的所有视频。

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

由于文件夹中的所有视频都使用控制器密钥进行加密，因此您需要插入它以解密视频。
之后，视频播放按钮将被激活。单击它以下载视频。

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






