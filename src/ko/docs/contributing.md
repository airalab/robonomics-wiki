---
title: 기여하기
contributors: [positivecrash, ensrationis]
---

Robonomics는 오픈 소스 프로젝트이며, 누구나 쉽게 기여할 수 있기를 바랍니다. 문제를 보고하거나, 변경을 제안하거나, 코드나 이 문서를 개선할 수 있습니다. 변경 사항이 속한 저장소에 이슈나 풀 리퀘스트를 여세요.

## 주요 저장소

- [airalab/robonomics](https://github.com/airalab/robonomics): 런타임과 팔레트. 자체 CONTRIBUTING.md와 SECURITY.md가 있습니다.
- [airalab/robins](https://github.com/airalab/robins): `cps` 명령줄 도구와 디바이스 게이트웨이를 포함한 도구 모음.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): Python 라이브러리.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): 웹 앱 [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): 이 위키.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): 메인 웹사이트.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): Robonomics Academy 웹사이트.

## 이슈 보고

1. 이슈가 속한 저장소를 고릅니다.
2. 버그라면 이미 보고된 것이 아닌지 확인합니다.
3. 명확한 제목과 설명을 쓰고, 관련 정보를 최대한 많이 담습니다.
4. 이 위키에 대한 이슈는 이슈 템플릿을 사용하고, 고쳐야 할 페이지를 적어 주세요.

보안 취약점은 공개 이슈로 보고하지 마세요. [airalab/robonomics](https://github.com/airalab/robonomics)의 SECURITY.md를 따르세요. GitHub Security Advisories를 통한 비공개 보고 방식을 사용합니다.

## 네트워크 변경 제안

런타임과 그 파라미터의 변경은 XRT 보유자가 결정합니다. 먼저 [airalab/robonomics](https://github.com/airalab/robonomics/issues)에 이슈를 열어 아이디어를 설명하고, 그다음 국민투표에 올리세요. [XRT와 거버넌스](/docs/xrt-and-governance/#how-to-propose-a-change)를 참고하세요.

## 풀 리퀘스트

1. 오타 같은 작은 수정은 이슈보다 풀 리퀘스트가 낫습니다.
2. 풀 리퀘스트에 문제와 해결 방법을 설명하세요. 관련 이슈가 있으면 링크를 걸어 주세요.
3. 공백이나 서식만 고치는 풀 리퀘스트는 보내지 마세요.
4. 주변 텍스트의 스타일, 언어, 구성을 따르세요.

## 이 위키 편집

이 위키는 Eleventy로 빌드합니다. Node.js 20, 또는 22 이상이 필요합니다.

1. [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki)를 클론한 다음 `npm install`과 `npm run start`를 실행해 로컬에서 띄웁니다.
2. 페이지는 `src/docs/`에 있는 Markdown 파일입니다. 각 파일은 frontmatter로 시작합니다: `title`, `contributors`(GitHub 사용자 이름), 그리고 선택 사항인 `tools`.
3. 사이드바는 `src/_data/sidebar_docs.json`입니다. 항목을 추가할 때는 제목을 `translations/pages/en.json`에도 추가하세요.

[README](https://github.com/airalab/robonomics-wiki#readme)에 페이지 컴포넌트와 번역 작업 방식이 설명되어 있습니다.
