---
title: ブループリントの使い方
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

この記事では、自動化ブループリントをHome Assistantに追加し、設定する方法について説明します。

## ブループリント自動化

一部のブループリントはすでにインストールされています。このようなブループリントに基く自動化は、設定するだけで済みます。Webインターフェースでは、`Settings/Automations & Scenes`で事前にインストールされたブループリントを見つけることができます。`Blueprints`を開き、使用したいブループリントを見つけます。この例では、`Motion-activated Light`を使用します。 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

`Create Automation`をクリックして自動化エディタを開きます。名前を付け、使用するブループリントを選択します（この場合は`Motion-activated Light`）。その後、モーションセンサーとランプを選択する必要があります。構成が完了したら、`Save`をクリックします。

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation 設定" />

変更を加えたい場合は、 `Settings/Automations & Scenes`に移動し、`Automations`を選択します。 

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## ブループリントのインポート

Home Assistantは、Home Assistantフォーラム、GitHub、GitHub gistsからブループリントをインポートすることができます。すべてのブループリントのリストは[ブループリントエクスチェンジ](https://community.home-assistant.io/c/blueprints-exchange/53)にあります。選択した後、`Settings/Automations & Scenes`に移動し、`Blueprints`を開きます。`Import Blueprint`をクリックし、選択したブループリントのURLを挿入します。その後、`PREVIEW BLUEPRINT`をクリックします。この場合、[すべてのバッテリーセンサーの低バッテリーレベル検出と通知](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664)を使用します。 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

これにより、ブループリントが読み込まれ、インポートダイアログでプレビューが表示されます。名前を変更し、インポートを完了します。`Create Automation`をクリックして自動化エディタを開きます。ここで、自動化のパラメータを設定し、通知を受け取るためのアクションを追加することができます。

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 