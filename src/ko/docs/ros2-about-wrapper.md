---
title: Robonomics ROS 2 Wrapper 소개
contributors: [Fingerling42]
도구:   
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**이 기사에서는 Robonomics ROS 2 Wrapper 패키지에 대해 알아보겠습니다. 이 패키지를 사용하면 Robonomics 파라체인의 모든 기능을 ROS 2 호환 로봇에서 사용할 수 있습니다.**

이 패키지의 아이디어는 [robonomics-interface](https://github.com/airalab/robonomics-interface)에서 제공하는 Robonomics 파라체인 API를 ROS 2의 노드로 래핑하는 것입니다. 목표는 ROS 2 개발자에게 로봇이나 장치를 파라체인 기능과 편리하게 통합할 수 있는 방법을 제공하는 것입니다. 로봇 장치를 통합하는 논리는 Robonomics 파라체인에 해당 장치를 위한 고유 주소가 생성되며, 이 주소를 사용하여 장치를 제어하거나 텔레메트리를 수신하는 데 사용됩니다.

사용 가능한 기능은 다음과 같습니다:

* **Launch function** — 지정된 매개변수 집합을 문자열 또는 파일로 전달하여 장치를 실행하여 임의의 명령을 실행합니다.
* **Datalog function** — 장치를 게시하여텔레메트리를 해시 형태로 패러체인에 전송합니다.
* **Robonomics 구독 사용** — 수수료 없이 트랜잭션을 보낼 수 있는 능력.
* **안전한 파일 저장** — 데이터를 압축하고 해제하기 위해 [InterPlanetary File System](https://ipfs.tech/)을 사용하며, 파일에 고유한 해시를 통해 액세스할 수 있습니다. IPFS의 편리한 사용을 위해 [Pinata](https://www.pinata.cloud/) 지원이 포함되어 있어 IPFS 파일을 빠르게 다운로드할 수 있습니다.
* **파일 암호화 및 복호화** — 공개 키 암호화를 사용하여 파일을 보호합니다.

현재, 래퍼는 [Python 구현](https://github.com/airalab/robonomics-ros2/)으로 사용할 수 있습니다.

## 래퍼 아키텍처

아키텍처적으로, 래퍼는 필요한 토픽과 서비스를 갖춘 워커 노드와 특정 로봇에 사용할 수 있는 기본 노드 클래스로 구성됩니다.

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"ROS 2 Wrapper Architecture"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — 각 로봇에 대한 고유한 노드로, Robonomics를 통해 데이터 로그를 보내고 발사를 수신하는 서비스를 래핑하며 IPFS로 파일을 다운로드/업로드할 수 있습니다. 이 노드는 아래에 설명된 특별한 파일에 의해 구성됩니다. 노드의 특정 로봇과의 연관성은ROS 네임스페이스를 통해 지정됩니다.
* `robonomics_ros2_robot_handler` — 로봇별 노드로, 퍼브-섭 및 로봇을 조정하기 위한 `basic_robonomics_handler` 클래스를 기반으로 합니다. 이는 로봇을 제어하기 위해 데이터 로그를 보낼 때의 런치를 처리하고 결정합니다.

## 래퍼 설치

래퍼를 사용하려면 다음 소프트웨어가 필요합니다:

* 리눅스 OS 배포 (일반적으로 Ubuntu)
* ROS 2 배포
* IPFS 노드
* Python 3 (래퍼의 Python 구현을 위해)

설치 가이드를 [여기](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started)에서 확인하고 필요한 소프트웨어 버전을 확인해 주세요. 필요한 구성 요소를 다운로드한 후, `colcon` 유틸리티를 사용하여 래퍼를 일반적인 ROS 2 패키지로 빌드해야 합니다.

## Web3 클라우드에 대한 연결 구성

래퍼를 시작하기 전에 로봇이 탈중앙화된 Robonomics 클라우드 및 Web3 서비스를 지원하는 방식을 설정해야 합니다. 이를 위해 각 로봇을 시작할 때 고유해야 하는 `robonomics_pubsub_params_template.yaml`이라는 구성 파일을 편집해야 합니다.

이 파일에는 다음 구성 필드가 포함되어 있습니다:

| 필드                 | 설명                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Robonomics 파라체인의 계정 시드                                                                       |
| crypto_type           | 계정 유형, `ED25519` 또는 `SR25519`                                                               |
| remote_node_url       | Robonomics 노드 URL, 기본값은 `wss://kusama.rpc.robonomics.network`, 로컬 노드의 경우 `ws://127.0.0.1:9944`|
| rws_owner_address     | RWS 모듈을 사용하기 위한 Robonomics 구독 소유자의 주소                                              |
| ipfs_dir_path         | IPFS 파일을 포함하는 디렉토리 경로                                                                  |
| ipfs_gateway          | 파일을 다운로드할 IPFS 게이트웨이, 예: `https://ipfs.io`                                                     |
| pinata_api_key        | IPFS를 위한 [Pinata](https://www.pinata.cloud/) 핀 서비스의 API 키                                  |
| pinata_api_secret_key | IPFS를 위한 [Pinata](https://www.pinata.cloud/) 핀 서비스의 비밀 API 키                           |

Robonomics 파라체인에 계정을 생성하려면, [다음 가이드](https://wiki.robonomics.network/docs/create-account-in-dapp/)를 참조하십시오. 생성하는 계정 유형에 주의하십시오. SR25519 유형의 계정은 파일 암호화를 사용할 수 없습니다.

{% roboWikiNote {type: "warning", title: "경고"}%}

  시드 문구는 누구나 사용할 수 있는 민감한 정보입니다.계정을 사용하세요. GitHub나 다른 곳에 구성 파일을 업로드하지 않도록 주의하십시오.

{% endroboWikiNote %}

`remote_node_url` 필드에 주목하십시오. 이 필드를 통해 로보노믹스 파라체인에 어떻게 연결할지 선택할 수 있습니다. 로컬을 포함한 다양한 방법으로 로보노믹스 파라체인에 연결할 수 있습니다. 테스트 및 개발을 위해 로컬 로보노믹스 인스턴스를 배포할 수 있습니다. 이에 대한 지침은 [이 기사](https://wiki.robonomics.network/docs/run-dev-node/)에서 확인할 수 있습니다.

수수료 없이 거래를 보낼 수 있는 로보노믹스 구독이 있다면, `rws_owner_address` 필드에 구독 소유자의 주소를 삽입하십시오. 계정이 구독에 추가되어 있어야 함을 잊지 마십시오. 로보노믹스 구독을 활성화하는 방법에 대한 지침은 두 가지 가이드에서 확인할 수 있습니다: [로보노믹스 dapp](https://wiki.robonomics.network/docs/sub-activate/)을 통한 사용자 친화적 인터페이스 또는 [로보노믹스 Substrate 포털](https://wiki.robonomics.network/docs/get-subscription/)을 통해.

`ipfs_gateway` 매개변수를 사용하여 IPFS 파일을 다운로드할 게이트웨이를 지정할 수 있습니다. 이는 [공개 게이트웨이](https://ipfs.github.io/public-gateway-checker/) 또는 특수화된 개인 게이트웨이(예: Pinata에서 얻은 것)일 수 있습니다.