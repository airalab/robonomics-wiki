---
title: Robonomics视频服务
contributors: [nakata5321]
---

本文介绍如何将IP摄像头添加到Home Assistant并将视频发送到Robonomics Web服务。

要将摄像头连接到Home Assistant，您需要知道其IP地址并创建一个本地摄像头帐户以连接到RTSP流。

{% roboWikiNote {type: "warning"}%} 由于每个摄像头的操作方式不同，本文不涉及此过程。 {% endroboWikiNote %}

要求：
- IP摄像头
- 配置好的本地摄像头帐户
- 摄像头的IP地址
- 配置好的Home Assistant

{% roboWikiNote {type: "warning"}%} 本文假设您使用的是没有RTZ（旋转、倾斜、缩放）选项的普通IP摄像头。如果您有一个RTZ摄像头，请查看["RTZ摄像头"文章](/docs/ptz-camera)。然后再回到这里的第二步。 {% endroboWikiNote %}

## 连接摄像头

首先，您需要找出摄像头的RTSP流的URL。
为此，请尝试在互联网上输入以下查询：“<摄像头名称> RTSP流”。
流URL必须以`rtsp://<IP地址>...`开头。

本文使用的是“Tapo”摄像头，流路径为`rtsp://<IP地址>/stream1`。

打开Home Assistant，转到“设置”->“设备和服务”。点击“添加集成”按钮，然后开始输入“通用摄像头”集成。选择它。

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

在配置窗口中提供以下信息：
- 流源URL - 摄像头的RTSP流的URL
- 用户名 - 您本地摄像头帐户的用户名
- 密码 - 您本地摄像头帐户的密码

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

向下滚动设置并点击“提交”按钮。

在预览窗口中激活复选框“这个图像看起来不错。”，然后点击“提交”按钮。然后 - “完成”。

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"} %}"} %}{% endroboWikiPicture %}

### 添加到仪表板

此外，您可以将流添加到您的仪表板。要做到这一点，请导航到仪表板并创建一个新卡片“图片概览”。进一步的步骤：
- 输入您想要的“标题”
- 从“图像路径”中删除数据
- 在“摄像头实体”中选择摄像头
- 在“摄像头视图”中选择“实时”，以减少延迟

然后保存。
{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}


## 检查媒体文件夹

在发送到Robonomics视频服务之前，视频必须保存在一个文件夹中，并且Home Assistant必须能够访问该文件夹。
在这种情况下，最简单的选择是使用媒体包，其中Home Assistant存储所有媒体。

- 如果您使用HAOS或预安装的映像，您的Home Assistant **已经有媒体文件夹**。
- 如果您使用Home Assistant Core，您应该转到`.homeassistant`文件夹并在其中创建`media`文件夹。
- 如果您使用Home Assistant Docker，请在Docker命令中添加` -v /PATH_TO_YOUR_MEDIA:/media \`行。

要检查是否设置正确，请转到Home Assistant中的“媒体”->“本地媒体”选项卡。
您应该看到一个空文件夹（没有错误）：

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## 服务调用

要将视频发送到Robonomics，您应该在Home Assistant中调用一个专用服务。
在本文中，这是手动完成的，但您也可以为此创建自动化。

要做到这一点，请转到“开发人员工具”->“服务”，然后找到“Robonomics: 将录制保存到Robonomics”。

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

在“目标”中选择您的摄像头实体。
在“保存录制的路径”中，您应该提供一个绝对路径到文件夹，
Home Assistant可以保存视频的位置：
- 对于预安装映像 - `/home/homeassistant/.homeassistant/media`;
- 对于HA OS或Home Assistant Docker- `/media`- 对于Home Assistant Core - 路径到先前创建的媒体文件夹。

此外，您可以选择录制持续时间。

填写数据并使用“调用服务”按钮调用服务。

## DAPP

要查看生成的视频，请转到[Robonomics DAPP](https://vol4tim.github.io/videostream/)。

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

粘贴您的控制器帐户地址并单击下面的按钮。等待“搜索双生体”过程。
结果，您将获得一个带有所有录制视频的IPFS CID。

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

接下来，从下拉列表中选择控制器帐户（或其他任何帐户）并签署一条消息以授权在Web3 IPFS网关中下载所有视频。
结果，您将获得由您的智能家居录制的所有视频。

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

由于文件夹中的所有视频都使用控制器密钥加密，因此您需要插入密钥以解密视频。
之后，视频播放按钮将被激活。单击它以下载视频。

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}