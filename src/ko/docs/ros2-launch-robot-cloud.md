---
title: 클라우드에서 로봇 시작
contributors: [Fingerling42]
tools:   
  - Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**이 기사에서는 다양한 예제를 통해 ROS 2에서 Robonomics 시작 기능을 사용하는 방법을 배우게 됩니다**

장치로 명령을 보내기 위한 Robonomics 파라체인의 주요 기능은 시작 extrinsic입니다. 이 함수를 사용하면 32바이트 길이의 16진수 값 형태의 매개변수를 포함한 문자열을 파라체인 내의 지정된 주소로 보낼 수 있습니다. 일반적으로, 이 문자열은 명령을 실행하는 데 필요한 매개변수가 포함된 파일을 가리키는 IPFS 해시를 나타냅니다. 시작 함수에 대한 자세한 내용은 [이 기사](https://wiki.robonomics.network/docs/launch/)에서 확인할 수 있습니다.

Robonomics ROS 2 Wrapper에서 시작 함수는 명령을 보내는 서비스로 구현되어 있으며 명령을 수신하는 토픽으로 구현되어 있습니다.

## 시작 보내기

`robonomics/send_launch`라는 서비스는 다음과 같이 보입니다:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # 업로드해야 하는 IPFS에 매개변수가 포함된 파일 이름 또는 매개변수 문자열
string  target_address          # 시작을 트리거할 주소
bool    is_file         True    # 시작 매개변수인지 여부파일을 IPFS에 업로드해야 하는지 여부 (기본값은 True)?
bool encrypt_status True # 파일이 대상 주소로 암호화되어야 하는지 확인, 기본값은 True
---
string launch_hash # 런치 트랜잭션의 해시
```

{% endcodeHelper %}

서비스는 요청의 일부로 다음 매개변수를 허용합니다: 명령 매개변수(단순 문자열 또는 명령 매개변수를 포함하는 파일의 이름), 런치를 보내기 위한 Robonomics 파라체인의 대상 주소, 그리고 두 개의 플래그: 매개변수가 파일인지를 나타내는 것과 파일을 암호화해야 하는지를 지정하는 것(둘 다 기본값은 true로 설정됨). 파일은 IPFS에 업로드되며 해당 해시가 런치 매개변수로 전달됩니다. 따라서 파일은 `robonomics_ros2_pubsub` 노드의 구성 파일에서 지정된 IPFS 파일용 디렉토리에 배치되어야 합니다.

기본적으로 파일은 런치 수신자의 공개 주소를 사용하여 암호화됩니다. 적용된 암호화 방법은 Curve25519 타원 곡선 암호화를 기반으로 한 공개 키 암호화입니다. 현재 구현에서는 암호화가 ED25519(Edwards) 유형의 계정 주소에 대해서만 지원됩니다(이에 대해 더 읽어보려면 [이 기사](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)를 참조하세요).

런치를 보낸 후, 서비스는 트랜잭션 해시를 반환합니다.

## 런치 수신

수신발사는 해당 주제 형식으로 구성됩니다. 기술적으로, 노드는 자신의 주소 상태를 구독하기 위해 robonomics-interface 기능을 활용하고 `NewLaunch` 이벤트가 나타날 때까지 기다립니다. 이벤트가 발생하면 노드는 `robonomics/received_launch` 주제에 메시지를 게시합니다. 메시지 형식은 다음과 같습니다:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}

```YAML
string  launch_sender_address   # 발사 명령을 보낸 계정의 주소
string  param                   # 매개변수 또는 매개변수가 있는 파일 이름의 문자열
```

{% endcodeHelper %}

메시지 필드에는 발사를 보낸 주소와 매개변수 자체가 포함됩니다: 간단한 문자열 또는 IPFS에서 다운로드하고 IPFS 작업 디렉토리에 배치된 매개변수 파일의 이름입니다. 파일이 암호화되었으면이 프로세스 중에 복호화됩니다.


## Turtlesim을 사용한 예제

다음으로, [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html)을 예로 들어 발사 기능을 사용하는 방법을 보여드리겠습니다. Turtlesim은 ROS 2 학습용으로 설계된 가벼운 시뮬레이터입니다. 다음 명령을 사용하여 설치할 수 있습니다:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

로보노믹스 ROS 2 래퍼 패키지에는 Turtlesim을 위해 특별히 적합한 `turtlesim_robonomics`라는 미리 빌드된 패키지가 포함되어 있습니다. 이 패키지를 사용하면 래퍼의 모든 기능을 테스트할 수 있습니다. 한번 시도해 보고 실행해 봅시다.

{% roboWikiNote {type: "warning", title: "주의"}%}

  거래를 수행하려면 계정에 충분한 잔액이나 활성 구독이 있는지 확인하십시오.

{% endroboWikiNote %}

1. 먼저 `config/robonomics_pubsub_params_template.yaml` 템플릿을 사용하여 `turtlesim_robonomics`의 pubsub 인스턴스를 위한 구성 파일을 만듭니다. Robonomics 자격 증명(계정 시드, 암호화 유형, 구독 소유자 주소)을 적절히 입력하고 IPFS 파일을 저장할 디렉토리를 지정합니다. 작성이 완료되면 파일 이름을 `first_pubsub_params.yaml`과 같이 변경합니다.

2. IPFS 데몬을 실행합니다:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. 다음 ROS 2 런치 파일을 실행합니다. 필요한 모든 노드를 시작합니다: Turtlesim 자체, Turtlesim을 위한 래퍼 구현 및 Robonomics pubsub:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params
```.yaml namespace:='turtlesim1'
```

{% endcodeHelper %}

거북이와 함께 시뮬레이터를 볼 수 있으며 콘솔에는 IPFS ID, IPFS 파일이 있는 디렉토리 경로, Robonomics 주소 및 기타 관련 정보가 표시됩니다.

### Polkadot 포털에서 Turtlesim 시작

1. Turtlesim은 `/cmd_vel` 토픽을 통해 제어되므로 해당 메시지를 준비하고 이를 런치 매개변수로 사용할 파일에 포함해야 합니다. 편의를 위해 이러한 메시지는 JSON 파일에 준비되어 있습니다. 파일을 생성하고(예: `turtle_cmd_vel.json`) 다음을 붙여넣으세요:

  {% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
```    }
  ]
  ```

  {% endcodeHelper %}

  이 JSON 예제는 거북이에게 두 번 이동하도록 명령합니다.

2. 다음으로, 파일을 IPFS에 업로드해야 합니다. 어떤 방법을 선택해도 괜찮지만, 이 예제에서는 IPFS Kubo를 사용할 것입니다. JSON 파일이 있는 디렉토리에서 터미널을 열고 다음 명령을 사용하여 IPFS에 업로드합니다:

  {% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

  {% endcodeHelper %}

  파일의 IPFS 해시를 받게 될 것입니다. 나중에 사용할 수 있도록 저장해 두세요.

3. 발사 전에 IPFS 해시를 32바이트 길이의 문자열로 변환해야 합니다. 이 작업은 몇 가지 Python 명령을 사용하여 수행할 수 있습니다. 터미널을 열고 Python 3 인터프리터를 실행한 다음 다음 명령을 실행하세요:

  {% codeHelper { copy: true}%}

  ```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('IPFS_FILE_HASH')
  ```

  {% endcodeHelper %}

  결과 문자열을 나중에 사용할 수 있도록 저장하세요.

4. Robonomics [Polkadot/Substrate portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics)을 열고 이동하세요.**개발자** -> **외부** 탭으로 이동하십시오. 외부 `launch` -> `launch(robot, param)`를 선택하십시오. `robot` 필드에 로봇의 주소를 삽입하고, `param` 필드에는 변환된 IPFS 해시가 포함된 문자열을 삽입하십시오. 거래를 제출하십시오.


5. Turtlesim 시뮬레이터로 이동하십시오. 거래를 성공적으로 전송한 후 거북이가 움직이기 시작해야 합니다.


### ROS 2 명령줄 도구에서 Turtlesim 시작

1. 이제 다른 ROS 2 pubsub 노드에서 Turtlesim으로 launch를 보내보겠습니다. 먼저 다른 Robonomics 자격 증명과 별도의 IPFS 디렉토리를 가진 다른 구성 파일(예: `second_pubsub_params.yaml`)을 만드십시오.

2. 별도의 터미널에서 새로운 구성 파일을 사용하여 `robonomics_ros2_pubsub` 노드를 실행하십시오:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

  {% endcodeHelper %}

3. 새 pubsub의 IPFS 디렉토리에 Turtlesim에 대한 명령을 포함하는 JSON 파일(`turtle_cmd_vel.json`)을 배치하십시오.

4. launch를 보내기 전에 `turtlesim_robonomics`가 어떻게 수신하는지 관찰하기 위해 모니터링을 설정하겠습니다.데이터가 도착하면 확인해야 합니다. 이를 위해 해당 주제를 구독하려면 별도의 터미널에서 다음을 실행하세요:

{% codeHelper { copy: true}%}

```shell
ros2 topic echo /turtlesim1/robonomics/received_launch
```

{% endcodeHelper %}

{% roboWikiNote {type: "warning", title: "Launch Param as String"}%} 기본적으로 런치 핸들러는 파일의 IPFS 해시를 매개변수로 예상합니다. 매개변수를 일반 문자열로 처리하려면 ROS 2 노드 매개변수 `launch_is_ipfs`를 `True`에서 `False`로 변경해야 합니다. 이 작업은 `ros2 param set` 명령을 사용하여 수행할 수 있습니다.
{% endroboWikiNote %}

5. 이제 ROS 2 서비스를 호출하여 런치를 전송해야 합니다. 별도의 터미널에서 다음 명령을 사용하세요:

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'YOUR_TURTLESIM_ADDRESS'"}
```

{% endcodeHelper %}

런치 제출의 세부 정보가 표시되는 퍼브서브 로그를 볼 수 있습니다.

6. Turtlesim 시뮬레이터로 이동하세요. 거래를 성공적으로 전송한 후 거북이가 시작해야합니다.이동합니다. 또한, 구독된 주제의 로그에는 수신된 데이터에 대한 정보가 표시됩니다.


### 다른 노드에서 Turtlesim 시작

1. 이제 도착을 기다리고 그것을 Turtlesim으로 전달할 테스트 노드를 만들어 봅시다. `test_robot_robonomics`라는 준비된 테스트 패키지를 사용할 수 있습니다. 이 패키지를 ROS 2 작업 공간으로 복사합니다.

2. 아무 텍스트 편집기에서 `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py`에 위치한 노드 파일을 열고, `__init__` 함수 뒤에 다음 코드를 추가합니다:

  {% codeHelper { copy: true}%}

  ```python
  def launch_file_subscriber_callback(self, msg) -> None:
      super().launch_file_subscriber_callback(msg)

      transaction_hash = self.send_launch_request(self.param, target_address='YOUR_TURTLESIM_ADDRESS', is_file=True, encrypt_status=True)

      self.get_logger().info('Sent launch to the turtle with hash: %s ' % str(transaction_hash))
  ```
  
  {% endcodeHelper %}

  이 함수는 먼저 받은 도착을 처리한 다음 해당 매개변수를 사용하여 Turtlesim에 새로운 도착을 보냅니다.

3. `colcon`을 사용하여 패키지를 빌드하고, 그리고 나서 설정 파일을 소스합니다.

4. 두 번째 pubsub 자격 증명으로 테스트 패키지의 ROS 2 런치 파일을 실행합니다:

  {% codeHelper { copy: true}%}

  ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```

  {% endcodeHelper %}

5. 이제 `turtle_cmd_vel.json` 매개변수를 테스트 노드의 주소로 보내어 Polkadot/Substrate 포털을 통해 예를 들어 전송하십시오. 이를 하기 전에 Turtlesim이 여전히 실행 중인지 확인하십시오. 테스트 노드는 런치를 받은 다음 동일한 매개변수로 새로운 런치를 보내어 Turtlesim의 거북이가 움직이도록 해야 합니다.