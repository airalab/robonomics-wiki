---
title: 当门打开时收到通知
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

在本文中，您将安装Telegram机器人通知集成并配置自动化，当门打开时，将向您的Telegram帐户发送通知。

## Telegram机器人通知

首先，您需要创建一个个人的Telegram机器人。为此，请转到 [特殊的Telegram机器人 @BotFather](https://t.me/botfather) 并按照说明进操作。 
保存您的令牌以访问HTTP API。

<robo-wiki-video controls src="https://static.robonomics.network/wiki/bot-father.mp4" />

<robo-wiki-note type="warning">

保持您的令牌**安全**并将其**安全地**存储起来，任何人都可以使用它来控制您的机器人。 

</robo-wiki-note>

下一步是找到您的 ***User Chat ID***. 为此，请使用下一个 [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/get-id-bot.mp4" />

现在让我们安装"Telegram broadcast"集成。此集成将向您的Telegram发送消息。

对于预安装了Robonomics镜像、Home Assistant Docker或Home Assistant Core的用户，您需要编辑`configuration.yaml`文件。通过`ssh`连接到您的Raspberry Pi：

<robo-wiki-video controls src="https://static.robonomics.network/wiki/open-config.mp4" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

将下面的行粘贴到文件末尾。插入您的 **bot API key** 和**your User Chat ID**. 还要为您的通知服务创建一个名称：


<code-helper copy >

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  example id of a user
      
notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-config.mp4" />

**保存配置并重新加载Home Assistant。**


结果是，在您的Home Assistant服务中将创建一个服务，该服务将向您的Telegram聊天发送任何消息。 
您可以在Home Assistant Web界面的开发者工具菜单中进行检查。 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/telegram-result.mp4" />

##  门打开通知

现在是时候创建自动化了。首先，您从此链接导入蓝图到您的Home Assistant中：

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-blue.mp4" />

然后创建自动化：

<robo-wiki-video controls src="https://static.robonomics.network/wiki/create-automation.mp4" />

现在，每次门打开时，您都会收到来自Telegram机器人的消息。

<robo-wiki-note type="okay">
您可以将此自动化用于家中的任何门窗。
</robo-wiki-note>

