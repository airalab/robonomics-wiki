---
title: 如何使用蓝图
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

在本文中，您将了解如何将自动化蓝图添加到您的Home Assistant并进行配置。

## 蓝图自动化

一些蓝图已经安装好了。基于这些蓝图的自动化只需要进行配置。在Web界面中，您可以在`设置/自动化与场景`中找到预安装的蓝图。打开`蓝图`，找到您想要使用的蓝图。在本示例中，将使用`运动触发灯`。

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"蓝图设置"} %}{% endroboWikiPicture %}

单击`创建自动化`以打开自动化编辑器。给出一个名称，选择要使用的蓝图（在我们的例子中是`运动触发灯`）。之后，您需要选择运动传感器和灯。配置完成后，单击`保存`。

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"自动化配置"} %}{% endroboWikiPicture %}

如果您想要进行更改，可以通过转到`设置/自动化与场景`，然后选择`自动化`来找到它。

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"自动化列表"} %}{% endroboWikiPicture %}

## 导入蓝图

Home Assistant可以从Home Assistant论坛、GitHub和GitHub gists导入蓝图。所有蓝图的列表位于[蓝图交流](https://community.home-assistant.io/c/blueprints-exchange/53)。选择后，转到`设置/自动化与场景`，打开`蓝图`。单击`导入蓝图`，并插入所选蓝图的URL。然后单击`预览蓝图`。在这种情况下，我们将使用[所有电池传感器的低电量检测和通知](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664)。

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"导入蓝图"} %}{% endroboWikiPicture %}

这将加载蓝图并在导入对话框中显示预览。您可以更改名称并完成导入。单击`创建自动化`以打开自动化编辑器。在这里，您可以配置自动化的参数并添加操作以获取通知。

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"配置电池蓝图"} %}{% endroboWikiPicture %}