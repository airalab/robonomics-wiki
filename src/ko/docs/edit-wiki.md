---
title: 위키 편집 방법
contributors: [positivecrash]
description: 당사 위키를 개선하는 방법
---

**Robonomics 위키는 오픈 소스입니다. 오류 수정, 오타 수정, 명확하지 않거나 오래된 정보 수정, 어떤 언어로든 번역하는 것을 환영합니다. [GitHub](https://github.com/) 계정이 필요합니다.**


## 편집하는 방법

Robonomics 위키 문서를 편집해야 하는 경우 다음 단계를 따르십시오.

[Node.js](https://nodejs.org/en/download/package-manager/)가 설치되어 있는지 확인하십시오.

### 1. 저장소 복제

먼저 위키 저장소를 복제해야 합니다.

```
git clone https://github.com/airalab/robonomics-wiki.git
```

저장소 디렉토리로 이동한 후 다음 명령을 실행하십시오.

`npm 사용`
```
cd robonomics-wiki
npm install
```

`yarn 사용`
```
cd robonomics-wiki
yarn install
```

### 2. 로컬로 서비스 제공 (develop, develop-m1)

`node 버전은 20 || >=22 이어야 합니다`

그런 다음 프로젝트를 로컬로 배포하십시오.

```
npm run start
```

> .env.example 파일과 동일한 변수를 포함하는 .env 파일을 만들어야 할 수도 있습니다.

### 3. PR 만들기

[풀 리퀘스트 만들기](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) to [위키 리포](https://github.com/airalab/robonomics-wiki)

## 구성 요소

{% roboWikiNote {title:"사용자 정의 구성 요소", type: "경고"}%} 사용자 정의 구성 요소를 추가할 때 **팁**:
구성 요소를 추가한 후 레이아웃에 문제가 있는 경우 공백을 확인해보세요. 여는 태그와 닫는 태그 사이의 공백을 **제거**하는 것이 도움이 될 것입니다 (아래 예시와 같이){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"테스트", type: "좋음"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### 코드

코드에 유용한 추가 기능을 추가할 수 있습니다:

`복사 버튼이 있는 코드`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

일부 텍스트 코드
	다른 테스트 라인
		다른 것

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

또는 `추가 라인이 있는 코드`

```bash
{% raw %}{% codeHelper { additionalLine: "추가 라인"}%}{% endraw %}

일부 텍스트 코드
	다른 테스트 라인
		다른 것

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**코드 도우미용 속성**

| 속성         | 유형| 필수 | 기본값 | 설명                                                     |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `부울`    | `false`  | `false`  | 코드에 복사 버튼 추가                                    |
| `additionalLine` | `문자열`  | `false`  | ''       | 코드 위에 표시될 추가 라인                                |


{% codeHelper { additionalLine: "추가 라인", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}


### 프론트매터
로보노믹스 위키의 문서에는 프론트매터 블록이 포함되어 있습니다. 이는 Markdown 파일의 맨 위에 있어야 하며, 삼중 대시 사이에 유효한 YAML 형식으로 작성되어야 합니다. 삼중 대시 사이에는 다음 옵션을 설정하거나 편집할 수 있습니다:

```YAML
---
title: 기여 방법 # 페이지 제목, 별도로 텍스트에 중복해서 작성할 필요 없음
contributors: [positivecrash] # 주요 기여자(이 페이지를 적극적으로 관리하는 사람). 추가 기호 없이 GitHub 닉네임만 필요
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # 기술 테스트에 사용된 도구들
---
```

### 그리드
요소에 그리드 레이아웃을 추가하는 데 도움이 됩니다:

- 먼저 그리드 래퍼 컴포넌트를 사용하십시오:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- 그리고 래퍼 내부에 원하는 만큼 그리드 아이템 컴포넌트를 사용하십시오:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} 첫 번째 요소 {% endroboWikiGrid %}
	{% roboWikiGrid %} 두 번째 요소 {% endroboWikiGrid %}
	{% roboWikiGrid %} 세 번째 요소 {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**robo-wiki-grid-wrapper의 속성**

| 속성       | 타입      | 필수     | 기본값   | 설명                                                                    |
|------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`  | `숫자`    | `false`  | 4       | 열 수를 선택할 수 있습니다:   <br/> - `1에서 5까지` 중 선택 가능         |
| `align`    | `문자열`  | `false`  |         | 블록 축에서 항목을 정렬합니다:   <br/> - 옵션: `start, center, end`     |
| `justify`  | `문자열`  | `false`  |         |         | 인라인 축에 항목 정렬:  <br/> - 옵션: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | 그리드 내 텍스트 정렬:  <br/> - 옵션: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (적어도 2GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD 카드 16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> 지그비 어댑터(옵션) </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee 스마트 장치(옵션) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>설치용 데스크탑</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### 이미지

#### 업로드 방법
이미지를 `src/assets/docs/images/url-of-your-doc` 폴더에 업로드하세요
* 이미지를 로컬화해야 하는 경우, 모두 한 폴더에 넣으세요
* 이미지가 로컬화되어 있다면 이름에 로케일 부록을 사용하세요. 예: `image_en.jpg`
* 이미지가 웹 최적화되어 있고 동시에 좋아 보이는지 확인하세요

#### 삽입 방법

문서에 그림을 삽입하는 두 가지 방법이 있습니다:

{% roboWikiNote {type: 'warning'}%} 내장 태그 `<robo-wiki`를 사용하여 그림을 삽입하는 것이 좋습니다.-사진>`를 사용할 수 있지만 Markdown 파일의 표준 방식을 사용할 수도 있습니다. {% endroboWikiNote %}

`캡션 포함`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"로보노믹스 위키 탐색", link: '/docs/overview', caption: "탐색하기"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`캡션 없이`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"로보노믹스 위키 탐색", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`간단한 이미지`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"로보노믹스 위키 탐색"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`캡션과 함께 간단한 이미지`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"로보노믹스 위키 탐색", caption: "탐색하기"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**robo-wiki-picture의 속성:**

| 속성      | 유형      | 필수 여부 | 기본값 | 설명                                                                                                                                                                                                          |
|-----------|-----------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | path to the image:  <br/> - if you uploaded your image directly to the `/src/assets/images/docs/` use: `url-of-your-doc` <br/> - if you uploaded image in one of the folders than use: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | align items on the block axis:   <br/> - options: `start, center, end`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | align items on the inline axis:  <br/> - options: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | provides alternative information for an image if a user for some reason cannot view it                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | zoom image                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | there are two options: lazy and eager                                                                                                                                                                                |

### Notes & warnings
You can add notes and give them specific types:
* warning (<span style="color:#f08432">**with image**</span>)
* okay (<span style="color:#3eaf7c">**녹색**</span>)
* 노트 (<span style="color:#90a4b7">**회색**</span>)

`제목이 있는 노트`

```c
{% raw %} {% roboWikiNote {title:"예시 제목", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`내용이 있는 노트`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`제목과 내용이 있는 노트`

```c
{% raw %} {% roboWikiNote {title: "제목", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Discord 가입", type: "okay"}%} [Robonomics Developers Discord 가입하기](https://discord.gg/jTxqGeF5Qy) 커뮤니티와 기술 지원을 받으세요. {% endroboWikiNote %}

{% roboWikiNote {title: "Discord 가입"}%} [Robonomics Developers Discord 가입하기](https://discord.gg/jTxqGeF5Qy) 커뮤니티와 기술 지원을 받으세요. {% endroboWikiNote %}

{% roboWikiNote {title: "Join Discord", type: "warning"}%} [Robonomics 개발자 Discord에 가입](https://discord.gg/jTxqGeF5Qy)하여 커뮤니티와 기술 지원을 받으세요. {% endroboWikiNote %}

**robo-wiki-note의 속성**

| 속성     | 유형      | 필수     | 기본값   | 설명                                                         |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `false`  |         | - 총 세 가지 유형이 있습니다: `note`, `warning`, `okay`     |
| `title`  | `String` | `false`  |         | 노트에 제목을 추가합니다                                     |


### 탭
문서에 탭을 추가할 수 있습니다:

- 탭 래퍼 컴포넌트를 사용하세요:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- 그리고 래퍼 내부에 원하는 만큼의 탭 항목 컴포넌트를 사용하세요:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %} {% endraw %}
```

<br/>

`수평 탭`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`수직 탭`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`테두리가 있는 탭 항목`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**robo-wiki-tabs (wrapper) 속성**

| 속성     | 유형   | 필수    | 기본값 | 설명             |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - 각 탭의 제목을 포함하는 배열                                  |
| `mode`   | `String` | `false`  | horizontal | 탭 모드를 선택할 수 있습니다: <br/> - `horizontal` <br/> - `vertical` |

**robo-wiki-tab (item)을 위한 속성**

| Property | Type      | Required | Default | Description                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - 콘텐츠 래퍼에 테두리 추가 |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### 앵커가 있는 제목
앵커를 포함하고 특정 값을 부여할 수 있습니다`앵커가 있는 제목`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

또는 `앵커가 없는 제목`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (사용자 정의 제목) {% endroboWikiTitle %}

<br/>

**robo-wiki-title 속성**

| 속성     | 유형                   | 필수     | 기본값   | 설명                  |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `숫자 (2에서 6까지)`    | `true`   |         | 제목 레벨 선택        |
| `anchor` | `문자열`               | `false`  |         | 앵커 값               |

### 비디오

문서에 비디오를 삽입하는 두 가지 방법이 있습니다:

{% roboWikiNote {type: "warning"}%} 내장 태그 `<robo-wiki-video>`를 사용하여 비디오를 삽입하는 것이 좋지만, Markdown 파일의 표준 방법을 사용할 수도 있습니다. {% endroboWikiNote %}

#### IPFS / 서버
비디오 형식을 지정해야 합니다

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

{% roboWikiNote {type: "warning", title:"게이트웨이에 대해"}%} 링크의 게이트웨이는 자동으로 구성 파일인 `src/_data/video_config.js`에서 선택됩니다. 파일을 변경하여 일부 게이트웨이를 추가하거나 제거할 수 있습니다. {% endroboWikiNote %}

#### 로컬

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### 속성

- <span style="color:#af1c1c">10MB</span>보다 큰 파일을 추가하는 경우, 저장소가 아닌 서버에 업로드해 주세요.

- [HTML5 비디오 태그](https://www.w3schools.com/tags/tag_video.asp)에 대해 어떤 속성이든 사용할 수 있습니다.

- 허용되는 형식 - mp4, webm, ogg.

| 속성 | 유형 | 필수 | 기본값 | 설명 |
|---|---|---|---|---|
| `videos` |`배열` | `true` |  | 객체 배열 [{src: `비디오 경로`, type: `비디오 유형`}] |


#### YouTube
문서에 YouTube 비디오를 임베드하려면 추가적인 따옴표나 태그 없이 공유 링크를 별도의 단락으로 삽입하면 됩니다. 예: `https://youtu.be/kQaSwNYHJQ8`

그러나 자동 재생이 필요한 경우 특별한 컴포넌트를 사용해야 합니다:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**robo-wiki-youtube의 속성**

| 속성 | 유형 | 필수 | 기본값 | 설명 |
|---|---|---|---|---|
| `link` | `문자열` | `true` |  | YouTube 비디오 링크 |
| `autoplay` | `부울` | `false` | `false` | YouTube 비디오 자동 재생 |
| `loop` | `부울` | `false` | `false` | YouTube 비디오 반복 재생 |


## 사이드바 내비게이션 편집 방법

Robonomics 위키의 사이드바 내비게이션을 편집해야 하는 경우 다음 단계를 따르십시오:

* `src/_data/sidebar_docs.json` 파일을 편집합니다.

* 문서를 어디에 배치할지 결정합니다.

* `src/_data/sidebar_docs.json`에 유효한 JSON을 사용하고 이를 신뢰합니다.기존 파일 구조

* 새로운 내용을 번역하지 않았다면 번역 파일 `translations/pages/en.json`에 새로운 줄을 추가해야 합니다. 예를 들어:

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **중요 사항:** 동일한 문서를 다른 섹션/하위 섹션에서 사용하는 경우:

```

{
	"title": "Upgrade Home Assistant OS",
	"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
	}],
	"title": "Upgrade Home Assistant Docker for Unix-like OS",
		"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
	}],
}

```

반드시 다음과 같이 `topic` 매개변수를 추가해야 합니다:

(정상적인 탐색을 위해)

```
{
	"title": "Upgrade Home Assistant OS",
	"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
		"topic": "Upgrade Home Assistant OS"
	}],
	"title": "Upgrade Home Assistant Docker for Unix-like OS",
		"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
		"topic": "Upgrade Home Assistant Docker for Unix-like OS"
	}],
}

```

## 문서에 사용자 정의 탐색 추가하는 방법

* 파일 편집`src/_data/sidebar_docs.json`.

* 올바른 문서를 찾아 다음과 같이 `prev` 및 `next` 매개변수를 추가하십시오:

```
	{
		"title": "개요",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "사용자 추가",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "사용자 추가",
				"url": "/docs/add-user"
			}
		],
	},

```

* 전체 탐색을 제거하려면 `withoutNav` 매개변수를 추가하십시오:

```
{
	"title": "개요",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* 이전 페이지 또는 다음 페이지 탐색만 제거하려면 `withoutPrev` 또는 `withoutNext` 매개변수를 추가하십시오:

```
{
	"title": "개요",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

또는

```
{
	"title": "개요",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## 문서 번역 방법

{% roboWikiNote {title: '중요', type: 'warning'}%} 반드시 **생성**해야 합니다..env** 파일을 만들고 *OPENAI_KEY* 변수를 키와 함께 추가하세요 {% endroboWikiNote %}

md 문서를 번역하려면 다음 명령을 실행해야 합니다:

```bash
npm run translate-md
```

{% roboWikiNote {title: '쉽게 번역하기', type: 'warning'}%} 한꺼번에 모두 번역하려면 페이지의 모든 새로운 줄, 새 문서 또는 변경된 문서를 번역하려면 이제 한 번의 명령만 필요합니다 {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> 또한, 번역해야 할 **필요한** 변경된 파일만 번역하는지 확인하세요. 예를 들어, 5개의 파일을 변경해야 한다고 가정해보겠습니다. 그 중 3개는 텍스트 변경과 일부 오래된 정보를 제거하는 것이고, 나머지 2개는 이미지에 대한 링크를 업데이트하거나 외부 링크를 변경해야 합니다. 이 경우 처음 3개 파일을 변경하고 번역한 후에 다른 2개 파일의 링크를 변경하는 것이 현명할 것입니다.

> 변경된 파일에 대해서는 모두 번역이 이루어지지만, 특히 파일이 크고 번역에 시간이 걸리는 경우에는 업데이트된 링크에 대한 번역이 필요하지 않습니다.

필요한 명령을 실행한 후에 해야 할 일은 기다리고 파일을 확인하는 것뿐입니다 (AI 번역에는 일부 결함이 있을 수 있습니다). 파일을 확인하려면 `npm run build`를 실행하여 오류가 있는지 확인하세요.

### 번역 문제 해결

번역에 문제가 발생할 수 있습니다.

1. 명령을 다시 실행해보고 작동하는지 확인해보세요.

2. 때로는 태그들md 파일에는 잘못 작성된 경우가 있습니다. 예를 들어:

```
{%raw %}
	[11ty] 1. Having trouble rendering njk template ./src/de/docs/edit-wiki.md (via TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Line 168, Column 96]
	[11ty]   unknown block tag: endroboWiki (via Template render error)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

그럼, 태그를 수정하면 됩니다.