---
title: Robonomicsスマートホーム概要

contributors: [Fingerling42, nakata5321]
---

## ブロックチェーンでセキュアなIoT

あなたのスマートホームには、現代のIoT市場がさまざまなソリューションを提供しています。しかし、通常は中央集権型のクラウドプロバイダーに縛られたり、高価な専用ゲートウェイに依存することがあります。その結果、ユーザーとしてはハードウェアやインフラストラクチャのベンダーに常に依存してスマートシステムを実行することになります。同時に、クラウド統計や分析なしでは、あなたのスマートホームは本当にスマートとは言えません。

{% roboWikiVideo {videos:[{src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type: 'mp4'}, {src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**現在のスマートホームには、次の2つの主な問題があります:**

1. ベンダーや第三者と共有するデータをコントロールできません。
2. 中央集権型クラウドサーバーのシャットダウンに対して、あなたのスマートホームは脆弱です。

{% roboWikiPicture {src:"docs/home-assistant/ha-problems.png", alt:"image"} %}{% endroboWikiPicture %}

これらの問題を解決するために、Robonomicsをお試しいただくことをお勧めします。Robonomicsは、**セキュア**で**サーバーレス**かつ**未来志向**の分散型クラウドです。

{% roboWikiPicture {src:"docs/home-assistant/ha-robonomics.png", alt:"warning"} %}{% endroboWikiPicture %}

## 企業フリークラウドへのステップ

Home Assistantをデバイス通信アプリケーションとして使用し、Robonomicsを企業フリーで分散型のクラウドプラットフォームとして使用して、手頃な価格のスマートホームを作成するための簡単な手順をご紹介します。Robonomicsは、現代のセキュアなWeb3テクノロジを活用し、プロセス全体でセキュリティを強化しています。

{% roboWikiPicture {src:"docs/home-assistant/OVERVIEW.png", alt:"warning"} %}{% endroboWikiPicture %}

## ここからスマートホームを始めましょう

Robonomicsでスマートホームを設定するための詳細なガイドを用意しています。手順は、すでに動作中のHome Assistantとペアリングされたデバイスを持っているか、スマートホームを構築するためにゼロから始めるかによって異なります。

{% roboWikiGridWrapper {columns: '2', textAlign: center, flexible: true} %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Home Assistantユーザー向け", link: "/docs/sub-activate/?topic=Upgrade Home Assistant OS", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "新規ユーザー向け", link: "/docs/install-smart-home", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}