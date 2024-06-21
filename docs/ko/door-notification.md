---
title: 문이 열릴 때 알림 받기
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

이 문서에서는 텔레그램 봇 알림 통합을 설치하고 자동화를 구성하는 방법을 알려드리겠습니다. 이 자동화는 문이 열릴 때 텔레그램 계정으로 알림을 보냅니다.

## 텔레그램 봇 알림

먼저 개인 텔레그램 봇을 만들어야 합니다. 이를 위해서는 [특수 텔레그램 봇 @BotFather](https://t.me/botfather)로 이동하여 지침을 따르세요. 
HTTP API에 액세스하기 위한 토큰을 저장하세요.

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type:'mp4'}]" />

<robo-wiki-note type="warning">

토큰을 **안전하게** 보관하고 **안전하게** 저장하세요. 누구나 이 토큰을 사용하여 봇을 제어할 수 있습니다. 

</robo-wiki-note>

다음 단계는 ***사용자 채팅 ID***를 찾는 것입니다. 이를 위해 다음 [GetIdsBot](https://t.me/getidsbot)을 사용하세요. 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type:'mp4'}]" />

이제 "텔레그램 방송" 통합을 설치해 보겠습니다. 이 통합은 텔레그램으로 메시지를 보냅니다.

Robonomics 사전 설치된 이미지, Home Assistant Docker 또는 Home Assistant Core의 경우 `configuration.yaml`을 편집해야 합니다. `ssh`를 통해 Raspberry Pi에 연결하세요.

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type:'mp4'}]" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

다음 줄을 파일 끝에 붙여넣으세요. **봇 API 키**와 **사용자 채팅 ID**를 입력하세요. 또한 알림 서비스의 이름을 만들어 주세요.


<code-helper copy >

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  example id of a user
      
notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

</code-helper >

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type:'mp4'}]" />

**구성을 저장하고 Home Assistant를 다시 로드하세요.**


결과적으로 Home Assistant 서비스에는 메시지를 텔레그램 채팅으로 보내는 서비스가 생성됩니다. 
Home Assistant 웹 인터페이스의 개발자 도구 메뉴에서 확인할 수 있습니다. 

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type:'mp4'}]" />

##  문이 열릴 때 알림

이제 자동화를 생성할 시간입니다. 먼저 이 링크에서 Home Assistant로 블루프린트를 가져옵니다:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type:'mp4'}]" />

그리고 자동화를 생성하세요:

<robo-wiki-video controls :videos="[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type:'mp4'}]" />

이제 문이 열릴 때마다 텔레그램 봇으로 메시지를 받게 됩니다.

<robo-wiki-note type="okay">
이 자동화를 집의 모든 문/창문에 사용할 수 있습니다.
</robo-wiki-note>

