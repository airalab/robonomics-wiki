---

title: 升级您的Home Assistant OS
contributors: [LoSk-p]
tools:
  - 适用于RaspPi的Home Assistant OS 12.1
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy Add-on 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**本文包含升级现有Home Assistant OS与Robonomics集成的说明。**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## 安装HACS

[Home Assistant社区商店（HACS）](https://hacs.xyz/)允许您安装自定义集成。

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 在开始之前，您需要安装用于连接到Home Assistant设备的SSH的附加组件。在附加组件商店中搜索`ssh`。我们建议安装`SSH & Web Terminal`附加组件。

{% roboWikiNote {title:"警告", type: "warning"}%} 如果未找到SSH附加组件，请尝试在用户配置设置中启用高级模式。要执行此操作，请单击左下角的个人资料图标，然后找到高级模式选项。{% endroboWikiNote %}

2. 选择附加组件并按下`INSTALL`。安装完成后，转到`Configuration`选项卡并添加`password`或`authorized_keys`。不要忘记保存此部分配置。

3. 在`Info`选项卡中按下`START`。如果要在侧边栏中看到附加组件，请不要忘记启用`Show in sidebar`。

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. 打开SSH附加组件并运行以下命令：

{% codeHelper { additionalLine: "Home Assistant Command Line", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. 重新启动Home Assistant（您可以在`Settings`->`System`中执行）。

6. 现在HACS集成将可用于在`Integrations`菜单中添加。转到`Settings`->`Devices & Services`，按下`Add Integration`，然后找到HACS。

{% roboWikiNote {title:"警告", type: "warning"}%} 要使用HACS，您需要一个Github帐户。{% endroboWikiNote %}

7. 单击它并按照安装说明操作。

## 安装IPFS Daemon和Libp2p - WS Proxy Add-Ons

Robonomics Integration使用本地IPFS守护程序存储数据，并使用Libp2p进行远程控制，因此您需要首先安装它。您可以使用以下按钮添加Robonomics Add-Ons存储库

[![打开您的Home Assistant实例并显示添加特定存储库URL预填充的对话框。](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

或通过以下步骤手动添加：

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 有一个[Robonomics Addons Repository](https://github.com/PinoutLTD/robonomics-addons)。要安装它，请转到`Settings` -> `Add-Ons`，然后按下右下角的`ADD-ON STORE`按钮。

2. 在右上角按下三个点，然后选择`Repositories`。在那里添加以下链接：

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. 按下`ADD`按钮。

4. 关闭存储库管理器并刷新页面。现在在页面底部您可以看到Robonomics Add-Ons。

现在您可以安装这两个附加组件。打开它们并按下`INSTALL`。安装完成后按下`START`。

## 安装Robonomics Integration

现在您可以使用HACS安装Robonomics Integration。

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

从侧边栏菜单中打开HACS，搜索`Robonomics`。然后单击位于右下角的`Download`按钮。下载完成后，重新启动Home Assistant。