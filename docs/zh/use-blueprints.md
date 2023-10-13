---
title: 如何使用蓝图
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

在本文中，您将了解如何将自动化蓝图添加到您的Home Assistant并进行配置。

## 蓝图自动化

某些蓝图已经安装。基于这些蓝图的自动化只需要进行配置。在Web界面中，您可以在`Settings/Automations & Scenes`中找到预安装的蓝图。打开`Blueprints`并找到您想要使用的蓝图。在本示例中，将使用`Motion-activated Light`。 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

单击`Create Automation`以打开自动化编辑器。给它命名，选择要使用的蓝图（在我们的例子中是`Motion-activated Light`）。之后，您需要选择运动传感器和灯。配置完成后，单击`Save`。

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation 配置" />

如果您想进行更改，可以通过转到`Settings/Automations & Scenes`，然后选择`Automations`来找到它。 

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## 导入蓝图

Home Assistant可以从Home Assistant论坛、GitHub和GitHub gists导入蓝图。所有蓝图的列表位于[蓝图交流](https://community.home-assistant.io/c/blueprints-exchange/53)上。选择后，转到`Settings/Automations & Scenes`，然后打开`Blueprints`。单击`Import Blueprint`，并插入所选蓝图的URL。然后单击`PREVIEW BLUEPRINT`。在这种情况下，我们将使用[所有电池传感器的低电量检测和通知](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664)。 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

这将加载蓝图并在导入对话框中显示预览。您可以更改名称并完成导入。单击`Create Automation`以打开自动化编辑器。在这里，您可以配置自动化的参数并添加操作以获取通知。

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 