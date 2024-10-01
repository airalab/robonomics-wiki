---
title: 在Home Assistant中控制PTZ摄像头
contributors: [nakata5321]
---

本文涵盖了在Home Assistant中设置PTZ摄像头的过程。
将使用ONVIF协议。这需要一个本地摄像头帐户。

{% roboWikiNote {type: "warning"}%} 本文不涵盖设置本地摄像头帐户的过程。
{% endroboWikiNote %}


要求：
- PTZ摄像头
- 本地摄像头帐户
- 摄像头IP地址
- 配置好的Home Assistant

## ONVIF集成

让我们从安装**ONVIF集成**开始。

转到“设置”中的“设备和服务”，然后点击“添加集成”按钮。
输入“ONVIF”并选择集成。您将看到下一个窗口。

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

点击“提交”按钮。它将尝试自动搜索您的摄像头。如果成功，
从列表中选择您的摄像头并填写空字段。
否则，您必须手动填写所有字段。您将看到以下窗口。

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

填写空白处：
- 名称 - 给您的摄像头取一个名称
- 主机 - 提供您的摄像头的IP地址
- 端口 - 通常是2020，但您的摄像头供应商可能会更改它
- 用户名 - 写下您的摄像头本地帐户的用户名
  - 密码 - 为您的摄像头本地帐户设置密码

然后点击“提交”。为您的摄像头选择一个区域，然后点击“完成”。

## 将摄像头控制添加到仪表板

现在您已经完全设置好摄像头，可以将其流和控制按钮添加到仪表板。

转到仪表板，开始创建一个新卡片。选择“图片概览”。

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

填写数据：
- 标题 - 选择摄像头图像标题
- 摄像头实体 - 从下拉列表中选择一个摄像头实体
- 摄像头视图 - 选择“实时”以减少延迟

接下来，通过点击左下角的按钮切换到“代码编辑器”模式。您将看到以下代码：
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

根据以下示例替换`entities: []`的内容（`<YOUR_CAMERA_ENTITY>`与`camera_image`参数相同）：

{% codeHelper { copy: true}%}

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

{% endcodeHelper %}

就这样。现在您应该在仪表板上看到带有控制按钮的PTZ摄像头卡片。

## 故障排除
如果您使用Home Assistant Core并且看不到摄像头的流，请安装“stream”和“FFMPEG”集成。
要做到这一点，您应该在configuration.yaml的末尾添加`stream: `和`ffmpeg: `字符串。