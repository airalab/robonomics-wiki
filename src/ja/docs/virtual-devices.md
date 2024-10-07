---
title: 仮想デバイス

contributors: [nakata5321]
---

**この記事では、スマートホームで仮想デバイスを作成する方法を紹介します。これにより、実際のプラットフォームの外観を確認できます。**

{% roboWikiPicture {src:"docs/home-assistant/virtual-sensors.png", alt:"virtual sensor"} %}{% endroboWikiPicture %}

## 統合のインストール

仮想デバイスを使用するには、["demo" 統合](https://www.home-assistant.io/integrations/demo/)をインストールする必要があります。
これを行うには、構成ファイルを編集する必要があります。

構成プロセス中に提供した構成フォルダに移動します。このフォルダ内には、"homeassistant" という名前のフォルダがあります。
そのフォルダに移動します。**root** ユーザーで `configuration.yaml` ファイルをテキストエディタで開き、次の行を挿入します:

{% codeHelper { copy: true}%}

```
...
# Example configuration.yaml entry
demo:
...
```

{% endcodeHelper %}


その後、Webインターフェイス経由で Home Assistant を再起動します。スマートホームが再起動すると、"demo" エンティティ内にすべての仮想デバイスが見つかります。
これらは `Settings -> Devices & services -> Demo` で見つけることができます。これらのエンティティはすべてダッシュボードに追加できます。

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"demo-entities"} %}{% endroboWikiPicture %}