---
title: ブループリントの使用方法
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

この記事では、Home Assistantに自動化ブループリントを追加し、構成する方法について説明します。

## ブループリント自動化

一部のブループリントはすでにインストールされています。このようなブループリントに基づく自動化は構成するだけで済みます。Webインターフェースでは、`Settings/Automations & Scenes`で事前にインストールされたブループリントを見つけることができます。`Blueprints`を開き、使用したいブループリントを見つけます。この例では、`Motion-activated Light`を使用します。

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"Blueprint Settings"} %}{% endroboWikiPicture %}

`Create Automation`をクリックして自動化エディターを開きます。名前を付け、使用するブループリントを選択します（この場合は`Motion-activated Light`）。その後、モーションセンサーとランプを選択する必要があります。構成が完了したら、`Save`をクリックします。

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"Automation Configuration"} %}{% endroboWikiPicture %}

変更を加えたい場合は、`Settings/Automations & Scenes`に移動してから`Automations`に進みます。

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"Automations List"} %}{% endroboWikiPicture %}

## ブループリントのインポート

Home Assistantは、Home Assistantフォーラム、GitHub、GitHub gistsからブループリントをインポートできます。すべてのブループリントのリストは[Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53)にあります。選択した後、`Settings/Automations & Scenes`に移動して`Blueprints`を開きます。`Import Blueprint`をクリックし、選択したブループリントのURLを挿入します。その後、`PREVIEW BLUEPRINT`をクリックします。この場合は、[Low battery level detection & notification for all battery sensors](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664)を使用します。

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"Importing Blueprint"} %}{% endroboWikiPicture %}

これにより、ブループリントが読み込まれ、インポートダイアログでプレビューが表示されます。名前を変更してインポートを完了します。`Create Automation`をクリックして自動化エディターを開きます。ここで自動化のパラメータを構成し、通知を受け取るためのアクションを追加できます。

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"Configure Battery Blueprint"} %}{% endroboWikiPicture %}