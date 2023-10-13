---
title: 위키 편집 방법 
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics 위키는 오픈 소스입니다. 오류 수정, 오타 수정, 명확하지 않거나 오래된 정보 수정, 어떤 언어로든 번역을 환영합니다. [GitHub](https://github.com/) 계정이 필요합니다.**


## 편집하는 방법

Robonomics 위키 문서를 편집해야 하는 경우 다음 단계를 따르십시오.

[Node.js](https://nodejs.org/en/download/package-manager/)와 [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool)이 설치되어 있는지 확인하십시오.

### 1. 저장소 복제

먼저 위키 저장소를 복제해야 합니다.

```
git clone https://github.com/airalab/robonomics-wiki.git
```

저장소 디렉토리로 이동한 다음 다음 명령을 실행하십시오.

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

### 2. 로컬로 서비스 제공 (개발, 개발-m1)

그런 다음 프로젝트를 로컬로 배포하십시오. 

```
gridsome develop
```

> `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS` 오류가 발생하는 경우 다음 명령을 실행하십시오.
```
gridsome develop-m1
```

### 3. PR 생성

[풀 리퀘스트 생성](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)를 [위키 저장소](https://github.com/airalab/robonomics-wiki)에 제출하십시오.

## 구성 요소

### Asciinema
Robonomics 위키는 Asciinema를 지원합니다. Asciinema를 삽입하려면 다음 지침을 따르십시오.
* frontmatter 블록 이후에 컴포넌트를 가져옵니다. `import Asciinema from '~/components/Asciinema.vue'`
* 별도의 단락으로 삽입합니다. `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, 여기서 vid는 특정 asciicast의 ID입니다.

> asciicast 페이지의 "Embed" 링크를 클릭하여 특정 asciicast에 대한 위젯 스크립트를 얻을 수 있습니다.
> 이렇게 보입니다:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Asciinema docs](https://asciinema.org/docs/embedding)

위의 예시에서 vid는 14입니다.

### 코드

 코드에 유용한 추가 기능을 추가할 수 있습니다.  

`복사 버튼이 있는 코드`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

또는 `추가 줄이 있는 코드`

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**code-helper 속성**

<probs-table :items="[{ id: 0, items: [{ name: 'copy', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add a copy button for your code'}]}, { id: 1, items: [{ name: 'additional line', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `additional line for you code that will be displayed above`}]}]" />

<code-helper copy>

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>

<code-helper copy additionalLine="your@helper">

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>


### Frontmatter
Robonomics 위키 문서에는 frontmatter 블록이 포함되어야 합니다. 이는 Markdown 파일의 맨 위에 있어야 하며, 세 개의 대시로 둘러싸인 유효한 YAML 형식으로 작성되어야 합니다. 세 개의 대시 사이에서 다음 옵션을 설정하거나 편집할 수 있습니다.

```YAML
---
title: How to contribute #  페이지 제목은 텍스트에서 중복으로 작성할 필요가 없습니다.
contributors: [positivecrash] #  주요 기여자 (이 페이지를 적극적으로 관리하는 사람)입니다. 추가 기호 없이 GitHub 닉네임이 필요합니다.
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/설치
    #  기술 테스트에 사용된 도구입니다.
---
```

### Grid 
요소에 그리드 레이아웃을 추가하는 데 도움이 됩니다.

- 먼저 그리드 래퍼 컴포넌트를 사용하십시오. 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- 그런 다음 래퍼 내부에서 원하는 만큼의 그리드 항목 구성 요소를 사용합니다.

```c
  <robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_6.png" /> 
      <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
      <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
    </robo-wiki-grid-element/>
  </robo-wiki-grid-element-wrapper>
```

**robo-wiki-grid-element-wrapper 속성** 

<probs-table :items="[{ id: 0, items: [{ name: 'columns', code: true}, {name: 'Number', code: true}, {name: false, code: true}, {name: 4, code: true}, {name: [{text: 'you can choose column number:'}, {text: `from`, codeText: ' 1 to 5'}]}]}, { id: 1, items: [{ name: 'align', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the block axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 2, items: [{ name: 'justify', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the inline axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 3, items: [{ name: 'textAlign', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'left', code: true}, {name: [{text: 'align text inside grid'}, {text: `options:`, codeText: 'left, center, right'}]}]}, ]" />


<robo-wiki-grid-element-wrapper textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_1.png" /> 
    <p><a href="https://www.home-assistant.io/">Home Assistant</a> as control system software</p> 
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_2.png" /> 
    <p>라즈베리 파이 4 (at least 2 GB RAM)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_3.png" /> 
    <p>SD card (minimum 16 GB)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_4.png" /> 
    <p>SD adapter</p>
  </robo-wiki-grid-element>
</robo-wiki-grid-element-wrapper>

<robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_5.png" />
    <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_6.png" /> 
    <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
    <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
  </robo-wiki-grid-element/>
</robo-wiki-grid-element-wrapper>


### 이미지

#### 업로드하는 방법 
`/docs/images/url-of-your-doc` 폴더에 이미지를 업로드하세요
* 이미지가 로컬라이즈되어야 하는 경우, 모두 한 폴더에 삽입하세요
* 로컬라이즈된 경우 이미지 이름에 로케일 접미사를 사용하세요. 예: `image_en.jpg`
* 이미지가 웹 최적화되어 있고 동시에 좋아 보이는지 확인하세요

#### 삽입하는 방법 

문서에 사진을 삽입하는 두 가지 방법이 있습니다:

<robo-wiki-note type="warning">

내장 태그 `<robo-wiki-picture>`를 사용하여 사진을 삽입하는 것이 권장됩니다. 그러나 Markdown 파일의 표준 방법도 사용할 수 있습니다.

</robo-wiki-note>

`캡션과 함께`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`캡션 없이` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`간단한 이미지` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`캡션 있는 간단한 이미지`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`대체 텍스트가 있는 이미지`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**robo-wiki-picture의 속성:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### 참고 사항 및 경고
참고 사항을 추가하고 특정 유형을 지정할 수 있습니다:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`제목이 있는 참고 사항`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`내용이 있는 참고 사항`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`제목과 내용이 있는 참고 사항`

```c
<robo-wiki-note type="okay" title="Robonomics for you">
  Fascinating information about robonomics here only
</robo-wiki-note>
```

<robo-wiki-note type="okay" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="note" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="warning" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

**robo-wiki-note의 속성:**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
문서에 탭을 추가할 수 있습니다:

- 탭 래퍼 컴포넌트를 사용하세요: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- 그런 다음 원하는 만큼 탭 항목 컴포넌트를 래퍼 내부에 사용하세요:

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```


`수평 탭`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`수직 탭`

```c
  <robo-wiki-tabs mode="vertical">
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      <pre>ifconfig</pre>
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`테두리가 있는 탭 항목`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX" border>
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

**robo-wiki-tabs (래퍼)의 속성:**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**robo-wiki-tab (항목)의 속성:**

<probs-table :items="[{ id: 0, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'title for the tab'}]}, { id: 1, items: [{ name: 'border', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add border to the content wrapper'}]}]" />


<robo-wiki-tabs>
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX" border >
      ifconfig 
  </robo-wiki-tab>
</robo-wiki-tabs>


<robo-wiki-tabs mode="vertical">
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX">
    <pre>ifconfig</pre>
  </robo-wiki-tab>
</robo-wiki-tabs>


### 앵커가 있는 제목
앵커가 있는 사용자 정의 제목을 만들고 특정 값을 지정할 수 있습니다.

`앵커가 있는 제목`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

또는

'앵커 없는 제목'

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**robo-wiki-title의 속성:**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### 동영상

문서에 동영상을 삽입하는 두 가지 방법이 있습니다:

<robo-wiki-note type="warning">

내장 태그 `<robo-wiki-video>`를 사용하여 동영상을 삽입하는 것이 권장됩니다. 그러나 Markdown 파일의 표준 방법도 사용할 수 있습니다.

</robo-wiki-note>

#### IPFS / 서버
동영상의 형식을 지정해야 합니다.

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'https://cloudflare-ipfs.com/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### 속성

- <span style="color:#af1c1c">10MB</span> 이상의 파일을 추가하는 경우 저장소가 아닌 서버에 업로드하세요.

- [HTML5 비디오 태그](https://www.w3schools.com/tags/tag_video.asp)에는 어떤 속성이든 사용할 수 있습니다.

- 허용되는 형식 - mp4, webm, ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
YouTube 동영상을 문서에 삽입하려면 공유 링크를 따옴표나 태그 없이 별도의 단락으로 삽입하세요. 예: `https://youtu.be/kQaSwNYHJQ8`

그러나 자동 재생이 필요한 경우 특수 컴포넌트를 사용해야 합니다. 

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**robo-wiki-youtube의 속성:**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## 편집하는 방법 sidebar navigation

Robonomics Wiki의 사이드바 탐색을 편집해야 하는 경우 다음 단계를 따르세요:

* 파일 `/data/sidebar_docs.yaml`을 편집하세요.

* 문서를 어디에 배치할지 결정하세요.

* `/data/sidebar_docs.yaml`에 유효한 YAML을 사용하고 기존 파일 구조를 따르세요.

* **중요한 참고 사항:** 동일한 문서를 다른 섹션/하위 섹션에 사용하는 경우: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Pre-installed Image For 라즈베리 파이
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

다음과 같이 `topic` 매개변수를 추가해야 합니다: 

(탐색이 올바르게 작동하려면) 

```
    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Upgrade Home Assistant OS
    - title_en: Pre-installed Image For Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Pre-installed Image For Raspberry Pi

```

## 문서에 사용자 정의 탐색을 추가하는 방법 

* 파일 `/data/sidebar_docs.yaml`을 편집하세요.

* 올바른 문서를 찾고 다음과 같이 'prev' 및 'next' 매개변수를 추가하세요.

```
    - title_en: 위키 편집 방법
      link: /docs/edit-wiki
      prev: 
        - title: title of the previous page
          link: /docs/prev_page_url
      next: 
        - title: title of the next page
          link: /docs/next_page_url

```

* 탐색을 완전히 제거하려면 `withoutNav` 매개변수를 추가하세요.

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* 이전 페이지 또는 다음 페이지 탐색만 제거하려면 `withoutPrev` 또는 `withoutNext` 매개변수를 추가하세요.

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

또는

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```