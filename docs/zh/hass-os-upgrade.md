---
title: 升级您的Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**本文包含使用Robonomics集成升级现有Home Assistant OS的说明。**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## 安装 IPFS Add-on


Robonomics集成使用本地IPFS守护程序存储数据，因此您需要先安装它。 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. 有一个[Home Assistant的IPFS插件](https://github.com/airalab/ipfs-addon)。要安装它，转到`Settings` -> `Add-ons`并按右下角的“ADD-ON STORE”按钮。

2. 点击右上角的三个点，选择“Repositories”。在那里添加以下链接：

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. 点击“ADD”按钮。

4. 关闭存储库管理器并刷新页面。现在在页面末尾，您可以看到IPFS Daemon插件。

5. 打开插件并点击“INSTALL”。安装完成后，点击“START”。

## 安装HACS

[Home Assistant社区商店（HACS）](https://hacs.xyz/)允许您安装自定义集成。

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. 在开始之前，您需要安装用于通过SSH连接到Home Assistant设备的插件。在插件商店中搜索“ssh”。我们建议安装“SSH＆Web终端”插件。

<robo-wiki-note type="warning" title="Warning">

  如果找不到SSH插件，请尝试在用户配置文件设置中启用高级模式。要做到这一点，点击左下角的个人资料图标，找到高级模式选项。

</robo-wiki-note>

2. 选择插件并点击“INSTALL”。安装完成后，转到“配置”选项卡并添加“password”或“authorized_keys”。不要忘记保存此部分配置。

3. 在“Info”选项卡中点击“START”。如果您想在侧边栏中看到该插件，请不要忘记启用“Show in sidebar”。

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. 打开SSH插件并运行以下命令：

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. 重新启动Home Assistant（您可以在 `Settings`->`System`中进行.

6. 现在HACS集成将可在“Integrations”菜单中添加。转到“Settings”->“Devices & Services”，点击“Add Integration”并找到HACS。

<robo-wiki-note type="warning" title="Warning">

  要使用HACS，您需要一个Github帐户。

</robo-wiki-note>

7. 点击它并按照安装说明进行操作。 

## 安装Robonomics集成

现在您可以使用HACS安装Robonomics集成。

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

从侧边栏菜单打开HACS，导航到“Integrations”。点击“Explore & Download Repositories”，然后搜索“Robonomics”并点击右下角的“Download”按钮。下载完成后，重新启动Home Assistant。