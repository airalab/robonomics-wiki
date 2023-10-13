---
title: 데이터로그
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**계정에 일정 금액의 자금이 있으므로 extrinsic을 제출할 수 있습니다. 먼저 시도해 볼 수 있는 것은 데이터로그입니다. 이를 통해 데이터를 블록체인에 영구적으로 저장할 수 있습니다. 분산 및 암호화된 데이터 저장소를 상상해보세요. 그게 바로 데이터로그입니다!**

<robo-wiki-note type="warning" title="Dev Node">

  주의하세요. 이 튜토리얼 및 다음 튜토리얼은 로보노믹스 노드의 로컬 인스턴스에서 보여집니다. [이 지침](/docs/run-dev-node)을 따라 직접 설정하세요.

</robo-wiki-note>

## 1. Developer -> Extrinsics로 이동하기

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. 드롭다운 목록에서 datalog -> record를 선택하기

또한 extrinsic을 제출할 계정을 선택하세요. record 필드를 작성하세요.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  데이터로그는 최대 512바이트의 문자열을 지원합니다. 대량의 데이터를 저장하려면 [IPFS](https://ipfs.tech/)를 사용할 수 있습니다.

</robo-wiki-note>

## 3. 트랜잭션 제출하기

확장 프로그램이나 DApp을 사용하여 트랜잭션에 서명하고 제출하세요.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  또한 *datalog -> erase* 호출로 **모든** 레코드를 삭제할 수도 있습니다.

</robo-wiki-note>

## 4. 스토리지에서 데이터로그 검토하기

이를 위해 *Developer -> Chain state*,로 이동하고 *datalog -> datalogIndex*를 선택한 다음, 계정을 지정하고 "+" 버튼을 눌러 계정의 레코드 인덱스를 가져온 다음, *datalog -> datalogItem*을 사용하여 필요한 레코드를 탐색하세요.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="탐색하기r">

  데이터로그 레코드를 포함한 모든 이벤트는 *Explorer*의 이벤트 플로우에서 볼 수 있습니다.

</robo-wiki-note>