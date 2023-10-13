---
title: 在Home Assistant中进行PTZ摄像机控制
contributors: [nakata5321]
---

本文介绍了在Home Assistant中设置PTZ摄像头的过程。
将使用ONVIF协议。这需要一个本地摄像机账户。

<robo-wiki-note type="warning">
本文不涵盖设置本地摄像机账户的过程。
</robo-wiki-note>

要求:
- PTZ camera
- 本地摄像机账户
- 摄像机IP地址
- 配置的Home Assistant

## ONVIF集成

让我们从**ONVIF集成**的安装开始。

转到"设置"Settings""Devices & Services"，然后点击"ADD INTEGRATION"按钮。
输入"ONVIF"并选择集成。您将看到下一个窗口。

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

点击"Submit"按钮。它将尝试自动搜索您的摄像机。如果成功， 
从列表中选择您的摄像机并填写空白字段。 
否则，您必须手动填写所有字段。您将看到以下窗口。

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

填写空白处:
- Name - 为您的摄像机命名
- Host - 提供您的摄像机IP地址
- Port - 通常是2020年最常见的，但您的摄像机供应商可能会更改它
- Username - 为您的摄像机本地账户编写用户名
  - Password - 为您的摄像机本地账户编写密码

然后点击"Submit"。为您的摄像机选择一个区域，然后点击"Finish"。

## 将摄像机控制添加到仪表板

现在您已经完全设置好摄像机，可以将其流和控制按钮添加到仪表板。

转到仪表板并开始创建一个新卡片。选择"Picture Glance"。

 <robo-wiki-picture src="home-assistant/glance.jpg" />

填写数据:
- Title - 选择摄像机图像标题
- Camera Entity - 从下拉列表中选择一个摄像机实体
- Camera View - 选择"live"以减少延迟

接下来，通过按下左下角的按钮切换到"Code Editor"模式。您将看到以下代码:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

根据下面的示例替换`entities: []`的内容（`<YOUR_CAMERA_ENTITY>`与`camera_image`参数相同）:

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

就这样。现在您应该在仪表板上看到PTZ摄机卡片以及控制按钮.

## 故障排除
如果您正在使用Home Assistant Core，但是您没有看到来自摄像头的流，请安装"stream"和"FFMPEG"集成。 
要做到这一点，您应该在configuration.yaml的末尾添加`stream: `和`ffmpeg: `字符串。