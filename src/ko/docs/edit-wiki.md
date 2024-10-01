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

저장소 디렉토리로 이동하여 다음 명령을 실행하십시오.

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

### 2. 로컬로 실행 (develop, develop-m1)

`node 버전은 v20 || >=22 이어야 합니다`

그런 다음 프로젝트를 로컬로 배포하십시오.

```
npm run start
```

### 3. PR 만들기

[풀 리퀘스트 만들기](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)[위키 저장소](https://github.com/airalab/robonomics-wiki)

## 구성 요소

{% roboWikiNote {title:"사용자 정의 구성 요소", type: "warning"}%} **사용자 정의 구성 요소를 추가할 때의 팁**:
구성 요소를 추가한 후 레이아웃에 문제가 있는 경우 공백을 확인해보세요. 여는 태그와 닫는 태그 뒤에 공백을 **제거**하는 것이 도움이 될 것입니다 (아래 예시와 같이){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} 로렘 입숨 도롭 싯 아멧.{% raw %}{% endroboWikiNote %}{% endraw %}

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

**코드 도우미 속성**

| 속성            | 유형       | 필수     | 기본값    | 설명                                                     |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | 코드에 복사 버튼 추가                                    |
| `additionalLine` | `String`  | `false`  | ''       | 코드에 표시될 추가 라인                                  |


{% codeHelper { additionalLine: "추가 라인", copy: true}%}

```bash
일부 텍스트 코드
	다른 테스트 라인
		다른 것
```

{% endcodeHelper %}### Frontmatter
로보노믹스 위키의 문서에는 frontmatter 블록이 포함되어 있습니다. Markdown 파일의 맨 위에 있어야 하며, 유효한 YAML 형식으로 세 개의 대시로 둘러싸인 블록 안에 있어야 합니다. 세 개의 대시로 둘러싸인 블록 사이에는 다음 옵션을 설정하거나 편집할 수 있습니다:

```YAML
---
title: 기여 방법 # 페이지 제목, 텍스트에서 중복해서 사용할 필요 없음
contributors: [positivecrash] # 주요 기여자(이 페이지를 적극적으로 관리하는 사람). 추가 기호 없이 GitHub 닉네임 필요
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # 기술 테스트에 사용된 도구
---
```

### Grid
요소에 그리드 레이아웃을 추가하는 데 도움이 됩니다:

- 먼저 그리드 래퍼 컴포넌트를 사용하십시오:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- 그리고 래퍼 내부에 원하는 만큼의 그리드 항목 컴포넌트를 사용하십시오:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} 첫 번째 요소 {% endroboWikiGrid %}
	{% roboWikiGrid %} 두 번째 요소 {% endroboWikiGrid %}
	{% roboWikiGrid %} 세 번째 요소 {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}{% endraw %}
``````html
{% roboWikiGridWrapper %}
	{% roboWikiGrid %} second element {% endroboWikiGrid %}
	{% roboWikiGrid %} third element {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}
```

<br/>

**robo-wiki-grid-wrapper 속성**

| 속성        | 타입      | 필수     | 기본값   | 설명                                                                    |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4       | 열의 수를 선택할 수 있습니다:   <br/> - `1에서 5까지` 중 선택 가능       |
| `align`     | `String` | `false`  |         | 블록 축에서 항목을 정렬합니다:   <br/> - 옵션: `start, center, end`     |
| `justify`   | `String` | `false`  |         | 인라인 축에서 항목을 정렬합니다:  <br/> - 옵션: `start, center, end`    |
| `textAlign` | `String` | `false`  | `left`  | 그리드 내부의 텍스트를 정렬합니다:  <br/> - 옵션: `left, center, right` |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (적어도 2GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD 카드 16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee 어댑터(옵션) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee 스마트 기기(옵션) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>설치용 데스크톱</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### 이미지

#### 업로드 방법
이미지를 `src/assets/docs/images/url-of-your-doc` 폴더에 업로드하세요
* 이미지를 로컬화해야 하는 경우, 모두 한 폴더에 넣으세요
* 이미지가 로컬화되어야 하는 경우 이미지 이름에 로캘 추가를 사용하세요. 예: `image_en.jpg`
* 이미지가 웹 최적화되어 있고 동시에 좋아 보이도록 해주세요

#### 삽입 방법

문서에 그림을 삽입하는 두 가지 방법이 있습니다:

{% roboWikiNote {type: 'warning'}%} 내장 태그 `<robo-wiki-picture>`를 사용하여 그림을 삽입하는 것이 좋습니다. 그러나 Markdown 파일의 표준 방법도 사용할 수 있습니다. {% endroboWikiNote %}

`캡션과 함께`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", link: '/docs/overview', caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`또는 캡션 없이`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki",link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`또는 간단한 이미지`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics 위키 탐색"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`또는 캡션이 있는 간단한 이미지`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics 위키 탐색", caption: "탐색하기"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**robo-wiki-picture의 속성:**

| 속성      | 유형       | 필수     | 기본값   | 설명                                                                                                                                                   |
|-----------|-----------|----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | 이미지 경로:  <br/> - 이미지를 `/src/assets/images/docs/`에 직접 업로드한 경우: `url-of-your-doc` <br/> - 폴더 중 하나에 이미지를 업로드한 경우: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | 블록 축에서 항목을 정렬:   <br/> - 옵션: `start, center, end`                                                                                         |`caption` | `String` | `false` | | 인라인 축에 항목을 정렬합니다: <br/> - 옵션: `start, center, end`
| `alt` | `String` | `true` | picture | 이미지를 볼 수 없는 경우를 대비하여 이미지에 대체 정보를 제공합니다.
| `zoom` | `Boolean` | `false` | | 이미지 확대
| `loading` | `String` | `false` | lazy | 두 가지 옵션이 있습니다: lazy와 eager

### 참고 사항 및 경고
노트를 추가하고 특정 유형을 지정할 수 있습니다:
* 경고 (<span style="color:#f08432">**이미지 포함**</span>)
* 좋음 (<span style="color:#3eaf7c">**녹색**</span>)
* 노트 (<span style="color:#90a4b7">**회색**</span>)

`제목이 있는 노트`

```c
{% raw %} {% roboWikiNote {title:"예제 제목", type: "좋음"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`내용이 있는 노트`

```c
{% raw %} {% roboWikiNote {type: "좋음"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br>/>

`제목과 내용이 있는 노트`

```c
{% raw %} {% roboWikiNote {title: "제목", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Discord 가입", type: "okay"}%} [Robonomics 개발자 디스코드 가입하기](https://discord.gg/jTxqGeF5Qy) 커뮤니티와 기술 지원을 받으세요. {% endroboWikiNote %}

{% roboWikiNote {title: "Discord 가입"}%} [Robonomics 개발자 디스코드 가입하기](https://discord.gg/jTxqGeF5Qy) 커뮤니티와 기술 지원을 받으세요. {% endroboWikiNote %}

{% roboWikiNote {title: "Discord 가입", type: "warning"}%} [Robonomics 개발자 디스코드 가입하기](https://discord.gg/jTxqGeF5Qy) 커뮤니티와 기술 지원을 받으세요. {% endroboWikiNote %}

**robo-wiki-note 속성**

| 속성     | 유형      | 필수 여부 | 기본값 | 설명                                                         |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `문자열` | `false`  |         | - 총 3가지 유형이 있습니다: `note`, `warning`, `okay` |
| `title`  | `문자열`` | `false`  |         | 노트에 제목을 추가합니다.                                     |


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
{% endroboWikiTabs %}
{% endraw %}
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
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],mode: '수직'} %}
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

**robo-wiki-tabs(래퍼) 속성**

| 속성     | 유형      | 필수     | 기본값     | 설명                                                             |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `배열`   | `true`   |            | - 각 탭의 제목이 포함된 배열                                      |
| `mode`   | `문자열` | `false`  | 수평       | 탭 모드 선택 가능: <br/> - `수평` <br/> - `수직` |

**robo-wiki-tab(항목) 속성**

| 속성     | 유형       | 필수     | 기본값    | 설명                         |
|----------|-----------|----------|---------|-----------------------------|
| `border` | `부울`    | `false`  | `false` | 테두리가 있는지 여부           |false` | - 콘텐츠 래퍼에 테두리 추가 |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### 앵커가 있는 제목
앵커가 있는 사용자 정의 제목을 만들고 특정 값을 할당할 수 있습니다

`앵커가 있는 제목`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

또는 `앵커가 없는 제목`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (사용자 정의 제목) {% endroboWikiTitle%}

<br/>

**robo-wiki-title에 대한 속성**

| 속성     | 유형                     | 필수     | 기본값  | 설명                  |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Number (2에서 6까지)`   | `true`   |         | 헤딩 레벨 선택       |
| `anchor` | `String`               | `false`  |         | 앵커 값               |

### 동영상

문서에 동영상을 삽입하는 두 가지 방법이 있습니다:

{% roboWikiNote {type: "warning"}%} 동영상을 삽입할 때 내장 태그 `<robo-wiki-video>`를 사용하는 것이 좋지만, Markdown 파일의 표준 방법도 사용할 수 있습니다. {% endroboWikiNote %}

#### IPFS / 서버
동영상 형식을 지정해야 합니다

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"게이트웨이에 대해"}%} 링크의 게이트웨이는 구성 파일인 `src/_data/video_config.js`에서 자동으로 선택됩니다. 일부 게이트웨이를 추가하거나 제거하여 변경할 수 있습니다.file. {% endroboWikiNote %}


#### 로컬

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### 속성

- 파일 크기가 <span style="color:#af1c1c">10MB</span>보다 큰 경우, 저장소가 아닌 서버에 업로드해 주세요.

- [HTML5 비디오 태그](https://www.w3schools.com/tags/tag_video.asp)에 대해 어떤 속성이든 사용할 수 있습니다.

- 허용되는 형식 - mp4, webm, ogg.

| 속성 | 유형 | 필수 | 기본값 | 설명 |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | 객체 배열 [{src: `비디오 경로`, type: `비디오 유형`}] |


#### YouTube
문서에 YouTube 비디오를 임베드하려면 공유 링크를 따로 단락으로 삽입하면 됩니다. 추가적인 따옴표나 태그는 필요하지 않습니다. 예: `https://youtu.be/kQaSwNYHJQ8`

그러나 자동 재생이 필요한 경우 특별한 구성 요소를 사용해야 합니다:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%```
endroboWikiYoutube %}{% endraw %}
```

**로보 위키 유튜브를 위한 속성**

| 속성 | 유형 | 필수 | 기본값 | 설명 |
|---|---|---|---|---|
| `link` | `String` | `true` |  | 유튜브 비디오 링크 |
| `autoplay` | `Boolean` | `false` | `false` | 유튜브 비디오 자동 재생 |
| `loop` | `Boolean` | `false` | `false` | 유튜브 비디오 반복 재생 |


## 사이드바 내비게이션 편집 방법

로보노믹스 위키의 사이드바 내비게이션을 편집해야 하는 경우 다음 단계를 따르십시오:

* 파일 `src/_data/sidebar_docs.json`을 편집합니다.

* 문서를 어디에 배치할지 결정합니다.

* `src/_data/sidebar_docs.json`에 유효한 JSON을 사용하고 기존 파일 구조를 의존합니다.

* **중요 참고:** 동일한 문서를 다른 섹션/하위 섹션에서 사용하는 경우:

```

{
	"title": "홈 어시스턴트 OS 업그레이드",
	"children": [
	{
		"title": "구독 활성화",
		"url": "/docs/sub-activate",
	}],
	"title": "유닉스류 OS용 홈 어시스턴트 도커 업그레이드",
		"children": [
	{
		"title": "구독 활성화",
		"url": "/docs/sub-activate",
	}],
}

```

반드시 이렇게 `topic` 매개변수를 추가해야 합니다:

(내비게이션이 올바르게 작동하도록)```
{
	"title": "홈 어시스턴트 OS 업그레이드",
	"children": [
	{
		"title": "구독 활성화",
		"url": "/docs/sub-activate",
		"topic": "홈 어시스턴트 OS 업그레이드"
	}],
	"title": "유닉스류 OS용 홈 어시스턴트 도커 업그레이드",
		"children": [
	{
		"title": "구독 활성화",
		"url": "/docs/sub-activate",
		"topic": "유닉스류 OS용 홈 어시스턴트 도커 업그레이드"
	}],
}

```

## 문서에 사용자 정의 탐색 추가하는 방법

* `src/_data/sidebar_docs.json` 파일을 편집합니다.

* 적절한 문서를 찾아 `prev` 및 `next` 매개변수를 다음과 같이 추가합니다:

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

* 탐색을 완전히 제거하려면 `withoutNav` 매개변수를 추가합니다:

```
{
	"title": "개요",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* 탐색을 완전히 제거하려면`이전 페이지` 또는 `다음 페이지` 탐색 후에 `withoutPrev` 또는 `withoutNext` 매개변수를 추가하십시오:

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

{% roboWikiNote {title: '중요', type: '경고'}%} **.env** 파일을 만들고 *OPENAI_KEY* 변수를 키와 함께 추가해야 합니다. {% endroboWikiNote %}

문서를 번역하려면 다음 명령을 실행해야 합니다:

```bash
npm run translate-md
```

명령을 실행한 후에는 기다리기만 하면 되며 파일을 확인할 수도 있습니다 (AI 번역에는 일부 결함이 있을 수 있습니다).

### 번역 문제 해결

번역 중에 문제가 발생할 수 있습니다.

1. 명령을 다시 실행하고 작동하는지 확인해 보세요.

2. 때로는 md 파일의 태그가 잘못 작성될 수 있습니다. 예를 들어:


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