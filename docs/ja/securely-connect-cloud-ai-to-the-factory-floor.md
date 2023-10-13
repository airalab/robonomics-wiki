---
title: クラウドAIを工場の現場に安全に接続する
contributors: [vitl2907]
---

Robonomicsの技術は、Industry 4.0が直面する課題を既に解決しており、産業環境での実際のシナリオに既に適用されています。

多くのAI企業が工場の現場のプロセスを最適化するためのソリューションを構築しており、工場がより少ないコストでより多くの生産を行うことを可能にしています。しかし、ほとんどの工場は、インフラを直接クラウドに接続することに躊躇しています。なぜなら、これにより潜在的なサイバーセキュリティリスクが生じ、数百万ドルの損失や人命の喪失につながる可能性があるからです。

[MerkleBot](https://merklebot.com)は、工業クライアントが工場をクラウドベースのAIに安全に接続するためのソリューションを構築するために[Robonomics Network](https://robonomics.network)を使用しました。

この記事は、モバイルデバイスの写真に基づいて物理的なアイテムの非侵襲的な保護を作成するアルゴリズムを使用する[Veracity Protocol](https://www.veracityprotocol.org/)との実験の結果を受けて書かれています。

このユースケースでは、ロボットアームを使用して工業部品をスキャンするプロセスが示されています。

[Demo video](https://youtu.be/8AL70LFVX5w)

## ステップバイステップのプロセス

### DAppとしてのユーザーインターフェース

<!-- ![](../images/google-play-store.gif) -->
<!-- <img src="../images/google-play-store.gif" /> -->
<robo-wiki-picture src="google-play-store.gif" />

DAppはオペレーターのためのユーザーインターフェースとして機能します。これは、工場環境とクラウドベースのAIの間で安全な通信を可能にするために使用されます。

### ロボットの起動

<!-- ![](../images/Veracity_Protocol_Transaction.gif) -->
<!-- <img src="../images/Veracity_Protocol_Transaction.gif" /> -->
<robo-wiki-picture src="Veracity_Protocol_Transaction.gif" />

オペレーターはDAppでトランザクションに署名することでロボットスキャンを起動します。このステップにより、工場の現場でのプロセスは公開ブロックチェーンのトランザクションに基づいてのみ開始されることが保証されます。

ロボットはRobonomics Networkを介してブロックチェーンからコマンドを受け取り、スキャンを開始します。Robonomics Networkの技術により、ビジネス目標とロボット操作のギャップを埋めることができます。

### データの収集とクラウドベースのAIへの送信

DAppでは、オペレーターは確認を表示し、ロボットはテーブル上に配置されたアイテム（このユースケースの場合）または必要に応じて直接工場ライン上にスキャンを開始します。

<!-- ![](../images/Veracity_Protocol_Launch.gif) -->
<!-- <img src="../images/Veracity_Protocol_Launch.gif" /> -->
<robo-wiki-picture src="Veracity_Protocol_Launch.gif" />


ロボットがデータを収集すると、それをローカルに保存し、IPFSプロトコルを介してクラウドベースのAIに利用可能にします。データを暗号化し、ブロックチェーンのトランザクションを介してデータ交換を組織することで、データへのアクセスをクラウドベースのAIに許可しデータが安全かつ確実に保たれることができます。

Robonomicsに組み込まれたセキュリティメカニズムは、公開ブロックチェーンの共有セキュリティに基づいており、ほとんどの工場が独自に組織することができないほどのセキュリティレベルを確保することができます。

### デジタルパスポートの作成

クラウドベースのAIがデータを分析すると、ログファイルと推奨事項が自動的に[デジタルパスポート](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/)として記録されます。ブロックチェーンの記録には、IPFSプロトコルを介してこれらのファイルへのハッシュが含まれているため、すべての操作とスキャンを追跡することができます。

## ユースケースに関するコメント

このユースケースでは、Universal Robot UR3工業用アームが使用されました。しかし、RobonomicsはROSをサポートしているため、KUKA、Fanuc、Yaskawaなどの主要な産業用マニピュレータを使用して、クラウドベースのAIに安全に接続することができます。

クラウドベースのAIインストゥルメントの展開と統合について詳しく知りたい場合は、[お問い合わせください](mailto:v@merklebot.com)
