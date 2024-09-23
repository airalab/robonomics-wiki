---
title: 工場の床とクラウドAIを安全に接続する
contributors: [vitl2907]
---

ロボノミクス技術は、すでに産業環境での現実的なシナリオに適用されており、産業4.0が直面する課題を解決できます。

多くのAI企業が工場の床でのプロセスを最適化するソリューションを構築しており、工場がより少ないコストでより多くの生産を行うことを可能にしています。しかし、ほとんどの工場は、インフラを直接クラウドに接続することに躊躇しています。なぜなら、これにより潜在的なサイバーセキュリティリスクが生じ、数百万ドルの損失や人命の喪失につながる可能性があります。

[MerkleBot](https://merklebot.com) は、工業クライアントが工場をクラウドベースのAIに安全に接続するためのソリューションを構築するために [Robonomics Network](https://robonomics.network) を使用しています。

この記事は、モバイルデバイスからの写真に基づいて物理アイテムの非侵襲的な保護を作成するアルゴリズムを使用する [Veracity Protocol](https://www.veracityprotocol.org/) との実験の後に書かれました。

このユースケースでは、ロボットアームを使用して工業部品をスキャンするプロセスが示されています。

[デモ動画](https://youtu.be/8AL70LFVX5w)

## ステップバイステップのプロセス

### ユーザーインターフェースとしてのDApp

{% roboWikiPicture {src:"docs/google-play-store.gif", alt:"/google-play-store"} %}{% endroboWikiPicture %}

DAppはオペレーターのためのユーザーインターフェースとして機能します。これは、ロボットの起動をリクエストするために使用され、工場環境とクラウドベースのAIとの安全な通信を可能にします。

### ロボットの起動

{% roboWikiPicture {src:"docs/Veracity_Protocol_Transaction.gif", alt:"/Veracity_Protocol_Transaction"} %}{% endroboWikiPicture %}

オペレーターは、DAppでトランザクションに署名してロボットスキャンを開始します。このステップにより、工場床でのプロセスは公開ブロックチェーンのトランザクションに基づいてのみ開始できることが保証されます。

ロボットは、Robonomics Networkを介してブロックチェーンからコマンドを受け取り、スキャンを開始します。 Robonomics Networkテクノロジーにより、ビジネス目標とロボティクス操作との間のギャップを埋めることができます。

### データ収集とクラウドベースのAIへの送信

DAppでは、オペレーターが確認を見ると、ロボットはテーブルに置かれたアイテムをスキャンし始めます。このユースケースでは、または必要に応じて工場ラインに直接配置されます。

{% roboWikiPicture {src:"docs/Veracity_Protocol_Launch.gif", alt:"/Veracity_Protocol_Launch"} %}{% endroboWikiPicture %}

ロボットがデータを収集すると、それをローカルに保存し、IPFSプロトコルを介してクラウドベースのAIに利用可能にします。データを暗号化し、ブロックチェーントランザクションを介してデータ交換を整理することで、データが安全であり、その場所に留まることを確認しながら、クラウドベースのAIへのアクセスを許可できます。

Robonomicsに組み込まれたセキュリティメカニズムは、公開ブロックチェーンの共有セキュリティに基づいて構築されており、ほとんどの工場が独自に組織するのが費用対効果の高いセキュリティレベルを獲得できます。

### デジタルパスポートの作成

クラウドベースのAIがデータを分析すると、ログファイルと推奨事項が自動的に [Digital Passport](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/) として記録されます。ブロックチェーンレコードには、これらのファイルすべてに対するハッシュがIPFSプロトコルを介して含まれているため、すべての操作とスキャンを追跡できます。

## ユースケースに関するコメント

このユースケースでは、Universal Robot UR3工業用アームが使用されました。しかし、RobonomicsはROSをサポートしているため、KUKA、Fanuc、Yaskawaを含む主要な産業用マニピュレータを使用して、安全にクラウドベースのAIに接続できます。

クラウドベースのAI機器の展開と統合に関心がある場合は、安全に [連絡してください](mailto:v@merklebot.com)。