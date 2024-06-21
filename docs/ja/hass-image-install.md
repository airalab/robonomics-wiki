---
title: Raspberry Piのためのプリインストールイメージ
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Raspberry PiにHome AssistantとRobonomicsの統合をインストールするガイドへようこそ。Home Assistantはオープンソースのホームオートメーションシステムであり、家庭ネットワーク内のスマートデバイスを制するための中央集約ハブを提供します。Robonomicsと統合することで、分散型クラウドサービスを活用してスマートホームの機能とセキュリティを向上させることができます。この記事では、Raspberry PiにHome AssistantとRobonomicsをインストールする手順をステップバイステップで説明し、安全で分散化されたソリューションを使用して自宅のさまざまな側面を自動化および制御する能力を提供します。さあ、始めましょう！**

## インストールに必要なハードウェア

すでにHome Assistantをスマートホームに組み込んでいない場合、完全なスマートホームシステムを構築するために必要な機器を把握することが重要です。

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Robonomicsのプリインストールイメージをダウンロードする

Robonomicsのプリインストールイメージには以下が含まれています。
- Home Assistant Core
- IPFS
- MQTTブローカーと統合
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

ソースコードを確認し、最新リリースのイメージを[GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)でダウンロードできます。

</robo-wiki-note>


## 2. イメージの設定

コンピュータに[Raspberry Pi Imager](https://www.raspberrypi.com/software/)をインストールします。の後、SDカードを挿入します。

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Raspberry Pi Imager プログラムを実行します。 オペレーティング システムとして必要なイメージを選択し、ストレージ ドロップダウン メニューから SD カードを必ず選択してください。
設定で以下を行います。
- ユーザー名とパスワードを設定します（デフォルトのユーザー名「pi」を保存しておくと覚えやすいです）、  
- Wi-Fiの名前とパスワードを入力します、 
- ドロップダウンリストから国を選択します
そしてイメージを`書き込み`します。 
                   
<robo-wiki-note type="note">ユーザー名とパスワードを注意深く保存してください。これらの資格情報はトラブルシューティングの場合に必要になります。</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

国コードは[こちら](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)で確認できます。

## 3. 初回起動

**SDカードを安全に取り外し**、Raspberry Piに挿入します。次に、**Zigbeeアダプター**をRaspberry Piに挿入します。

<robo-wiki-note type="warning">Raspberry Piを初めて起動する前にZigbeeアダプターを挿入することが重要です！ 
これはZigbeeネットワークの自動設定に必要です。</robo-wiki-note>

**[JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en)（必要なファームウェアをすべて備えている）をお持ちの場合、これらの手順に従って簡単に進めることができます。ただし、他のアダプターをお持ちの場合は、まずZigbee2MQTTソフトウェアでフラッシュする必要があります。お使いのデバイスの手順は[こちら](https://www.zigbee2mqtt.io/information/supported_adapters.html)で確認できます。**

次に、電源ケーブルをデバイスに接続します。これにより、Wi-Fiネットワークに接続されます。 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Raspberry Pi が接続されると、赤色の LED が点灯し、緑色の LED がしばらく点滅します。 Raspberry Pi が起動してネットワークに登録されるまで、最大 5 分間待ちます。

次に、Raspberry PiのIPアドレスを見つけます。[Fingモバイルアプリ](https://www.fing.com/products)や 
[nmap CLIツール](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)を使用してIPアドレスを見つけます。IPリストで`robots-home`（オプションの名前は`Home(homeassistant)`） 
ホストマシンの名前です。 

この例ではアドレスは`192.168.43.56`です。 

すべてが正常に動作しているかを確認するために、ウェブブラウザを開き、`http://%RASPBERRY_IP_ADDRESS%:8123`にアクセスします。この例では`192.168.43.56:8123`になります。
すべてが正常であれば、Home Assistantのウェブインターフェースが表示されます。ウェブページが開かない場合は、Raspberry Piの起動まで最大5分待ってから再試行してください。 

<robo-wiki-video loop controls :videos="[{src: 'QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## トラブルシューティング

1. Wi-Fiの設定を後で変更するには、Raspberry Piに`ssh`コマンドでログインする必要があります。これにはコンピュータのターミナルを開き、
"Configuring the Image"ステップで作成したユーザー名を使用してsshコマンドを入力します（デフォルトは"pi"です）。 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

そして`sudo raspi-config`コマンドを使用します。このコマンドについての詳細な情報は[公式サイト](https://www.raspberrypi.com/documentation/computers/configuration.html)を参照してください。
