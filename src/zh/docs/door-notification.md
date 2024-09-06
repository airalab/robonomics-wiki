---
title: 当门打开时收到通知
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

在本文中，您将安装Telegram机器人通知集成，并配置一个自动化，当门打开时将通知发送到您的Telegram帐户。

## Telegram机器人通知

首先，您需要创建一个个人Telegram机器人。请访问[特殊的Telegram机器人 @BotFather](https://t.me/botfather)并按照说明操作。
保存您的访问HTTP API的令牌。

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} 保持您的令牌**安全**并**安全**存储，任何人都可以使用它来控制您的机器人
{% endroboWikiNote %}

下一步是找到您的***用户聊天ID***。请使用下面的[GetIdsBot](https://t.me/getidsbot)。

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

现在让我们安装"Telegram广播"集成。此集成将向您的Telegram发送消息。

对于Robonomics预安装的镜像、Home Assistant Docker或Home Assistant Core，您需要编辑`configuration.yaml`。通过`ssh`连接到您的Raspberry Pi：

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}


{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

将下面的代码粘贴到文件末尾。插入您的**机器人API密钥**和**您的用户聊天ID**。还要为您的通知服务创建一个名称：


{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  用户示例ID

notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**保存配置并重新加载Home Assistant。**


结果是，在您的Home Assistant服务中将创建一个服务，该服务将向您的Telegram聊天发送任何消息。
您可以在Home Assistant Web界面的开发人员工具菜单中查看。

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

##  门打开通知

现在是时候创建自动化了。首先，您需要从以下链接将蓝图导入到您的Home Assistant中：

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

然后创建自动化：

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

现在，每当门打开时，您将收到来自Telegram机器人的消息。

{% roboWikiNote {type: "okay"}%} 您可以将此自动化应用于家中的任何门窗。 
{% endroboWikiNote %}