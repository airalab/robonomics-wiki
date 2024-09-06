---
title: 로보노믹스 콜레이터를 시작하는 방법
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"노트", type: "노트"}%} 이 기사의 스크린 캐스트와 스크린샷에서는 Robonomics의 버전 1.4.0을 사용했습니다. 동일한 명령을 사용하지만 Robonomics의 버전을 현재 버전으로 바꿔야 합니다.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

현재 Robonomics 네트워크는 주로 초기 개발자들에 의해 유지되고 있지만 누구나 이 프로젝트를 지원할 수 있습니다. 블록체인의 추가적인 전체 노드는 블록체인이 더 지속 가능하고 오류 허용성이 높아지도록 돕습니다. Robonomics 노드 이진 파일은 [릴리스](https://github.com/airalab/robonomics/releases) 자산에서 사용할 수 있거나 [소스에서 빌드](/docs/how-to-build-collator-node/)할 수 있습니다.

## 콜레이터란

콜레이터는 Robonomics 파라체인의 일부입니다. 이 유형의 노드는 Robonomics 체인을 위한 새로운 블록을 생성합니다.

> 콜레이터는 사용자로부터 파라체인 트랜잭션을 수집하고 Relay Chain 검증자들을 위한 상태 전이 증명을 생성함으로써 파라체인을 유지합니다. 다시 말해, 콜레이터는 파라체인 트랜잭션을 집계하여 파라체인 블록 후보를 생성하고 해당 블록에 기반한 검증자들을 위한 상태 전이 증명을 생성합니다.

관련된 [Polkadot 위키 페이지](https://wiki.polkadot.network/docs/learn-collator)에서 콜레이터에 대해 더 알아볼 수 있습니다.

Robonomics 파라체인에서 각 콜레이터는 콜레이터가 구축한 각 블록에 대해 (**0.001598184 XRT**)의 보상을 받습니다 (보상은 체인에 봉인된 블록에 발생합니다).
또한 블록을 생성한 콜레이터는 해당 블록에 포함된 **거래 수수료의 50%**를 받습니다.

## 요구 사항

**Polkadot 검증자용 표준 하드웨어 요구 사항**을 사용하여 콜레이터를 시작하는 것이 좋습니다(https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ x86-64 호환.
+ Intel Ice Lake 또는 그 이상 (Xeon 또는 Core 시리즈); AMD Zen3 또는 그 이상 (EPYC 또는 Ryzen).
+ 4개의 물리적 코어 @ 3.4GHz.
+ 동시 멀티스레딩 비활성화 (Intel의 Hyper-Threading, AMD의 SMT).
+ 저장 공간 - 블록체인 성장을 처리하기 위해 합리적으로 크기가 조정된 1TB의 NVMe SSD.
+ 메모리 - 32GB DDR4 ECC

이 기사에서는 다음 사양을 사용합니다:
+ 4 vCPU
+ 콜레이터 데이터베이스용 700GB의 NVMe 공간. 이 디스크 공간을 확장할 수 있는 능력이 필요합니다.
+ 8GB RAM

## 중요 정보
1. 이 지침에서 일부 변수를 사용하며, 모든 명령에서 자신의 값으로 교체해야 합니다:
    + **%NODE_NAME%**은 노드 이름입니다. 예: *my-robonomics-kusama-collator*
    + **%BASE_PATH%**는 마운트된 볼륨의 경로입니다. 예: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%**는 Polkadot 생태계의 SS58 형식의 계정 주소입니다. 예: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. 콜레이터의 서비스 시작에 *--state-cache-size=0*를 포함해야 합니다. 이 매개변수는 콜레이터의 안정성에 중요합니다.
관련 [이슈](https://github.com/airalab/robonomics/issues/234)에서 자세한 정보를 확인할 수 있습니다.

## 처음으로 Robonomics 콜레이터를 쉽게 시작하기

명령줄에서 직접 콜레이터를 쉽게 시작하여 오류를 확인할 수 있습니다.
이 작업을 수행한 후 Robonomics 콜레이터를 서비스로 시작하는 것이 강력히 권장됩니다(다음 단계 참조).

```
root@robokusama-collator-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb
```


## Robonomics 콜레이터를 서비스로 시작

1. 홈 디렉토리가 있는 서비스용 사용자를 생성합니다.
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Robonomics 바이너리를 다운로드하고 추출하여 */usr/local/bin/* 디렉토리로 이동합니다. 이 섹션의 명령에서 *$ROBONOMICS_VERSION*을 Robonomics의 현재 버전으로 교체해야 합니다. [github의 Robonomics 저장소 릴리스 페이지](https://github.com/airalab/robonomics/releases)에서 현재 버전을 찾을 수 있습니다.
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Robonomics 1.4.0 바이너리 다운로드"} %}{% endroboWikiPicture %}


3. *robonomics.service*라는 systemd 서비스 파일을 생성합니다:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    그리고 서비스 파일에 다음 줄을 추가합니다:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Robonomics 서비스 파일 생성"} %}{% endroboWikiPicture %}


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. 이 파일을 저장한 후 서비스를 활성화하고 시작합니다:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

텔레메트리 URL: https://telemetry.parachain.robonomics.network/#/Robonomics

콜레이터 로그는 `journalctl -u robonomics.service -f`로 모니터링할 수 있습니다.

Robonomics 콜레이터가 시작되면 Kusama Relay Chain과 동기화를 시작하며, 이는 네트워크 속도와 시스템 사양에 따라 상당한 시간이 소요될 수 있으므로 Kusama 스냅샷을 다운로드하는 것이 좋습니다.


## Kusama 스냅샷을 사용하여 동기화 프로세스 가속화

Robonomics 서비스를 생성하고 시작한 후 즉시 이를 수행하는 것이 좋습니다. 스냅샷 및 사용 지침에 대한 자세한 내용은 다음 페이지에서 확인할 수 있습니다: https://ksm-rocksdb.polkashots.io/

지침:

1. Robonomics 서비스를 중지하고 현재 Kusama 데이터베이스 디렉토리를 제거합니다:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. 실제 스냅샷을 다운로드하고 추출합니다:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# tar -xf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Download Kusama snapshot"} %}{% endroboWikiPicture %}

    성공적으로 압축 해제한 후 다운로드한 아카이브를 제거할 수 있습니다:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. 데이터베이스 폴더에 올바른 소유권 설정:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Robonomics 서비스 다시 시작:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. 서비스 로그 확인:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Check service logs"} %}{% endroboWikiPicture %}

## 문제 해결
### 오류: "State Database error: Too many sibling blocks inserted"
이 오류를 해결하려면 콜레이터를 아카이브 모드로 실행하면 됩니다:

1) 먼저 Robonomics 서비스를 중지해야 합니다:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) 그런 다음 서비스 파일의 파라체인 부분에 `--state-pruning=archive` 매개변수를 추가하십시오. 수정된 서비스 파일 예시:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

3) systemd 관리자 구성을 다시로드하십시오:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) 기존 파라체인 데이터베이스를 제거하십시오:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) robonomics 서비스를 시작하십시오:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    이후 파라체인 데이터베이스의 동기화를 기다려야 합니다.

### 오류: "cannot create module: compilation settings are not compatible with the native host"
이 오류는 가상화 매개변수와 관련이 있습니다. 에뮬레이션된 프로세서의 "host-model" 유형을 사용해야 합니다. 이를 가상화 호스트에서 설정할 수 있습니다.

그러나 호스팅에서 이 오류가 발생하면 기술 지원팀에게 이 문제에 대해 문의해야 합니다.