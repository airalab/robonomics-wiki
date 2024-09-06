---
title: 로보노믹스 콜레이터 노드 버전 업데이트 방법

contributors: [Leemo94]
---

이 게시물을 읽기 전에 다음 기사를 읽는 것이 좋습니다: ["콜레이터 노드 빌드 방법"](/docs/how-to-build-collator-node) 및 ["로보노믹스 콜레이터 시작 방법"](/docs/how-to-launch-the-robonomics-collator).

이 기사에는 Ubuntu에서 실행 중인 로보노믹스 콜레이터 노드를 업데이트하는 데 필요한 명령어와 그 후 예제가 포함되어 있습니다.

## **필요한 명령어**

0. 시작하기 전에 `root`로 로그인하는 것이 좋습니다. 그렇지 않으면 다음을 사용하는 것이 좋습니다:


{% codeHelper { copy: true} %}

```shell
sudo su -
```

{% endcodeHelper %}

1. 로보노믹스 서비스를 중지합니다:

{% codeHelper { copy: true} %}

```shell
systemctl stop robonomics.service
```

{% endcodeHelper %}


2. 이전 버전의 로보노믹스를 제거합니다 (올바른 디렉토리에 있는지 확인하십시오):

{% codeHelper { copy: true} %}

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

{% endcodeHelper %}

3. 로보노믹스의 [최신 릴리스](https://github.com/airalab/robonomics/releases) 버전을 가져옵니다:


{% codeHelper { copy: true}%}

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

{% endcodeHelper %}


4. 파일을 추출합니다:

{% codeHelper { copy: true}%}

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

{% endcodeHelper %}


5. 파일을 이동합니다:

{% codeHelper { copy: true}%}

```shell
mv robonomics /usr/local/bin/
```

{% endcodeHelper %}

{% roboWikiNote {type: "note"}%} 이 파일을 로보노믹스 노드를 설치한 올바른 디렉토리로 이동해야 합니다. {% endroboWikiNote %}

6. 로보노믹스를 시작합니다:

{% codeHelper { copy: true}%}

```shell
systemctl start robonomics.service
```

{% endcodeHelper %}

콜레이터 노드를 로보노믹스 v1.8.4로 업그레이드하는 예시:

{% codeHelper %}

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service

```

{% endcodeHelper %}


## **베이스 경로가 설정되지 않은 Kusama 릴레이 체인 데이터베이스 변경**

Kusama 릴레이 체인의 특정 스냅샷이 노드에 오류를 발생시킬 때가 있습니다. 이로 인해 노드가 작동을 멈출 수 있습니다. 손상된 릴레이 체인 데이터베이스로 인한 예시 오류:


{% codeHelper %}

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

{% endcodeHelper %}


이 오류를 해결하려면 기존의 Kusama 릴레이 체인 데이터베이스(아마도 RocksDb)를 제거하고 ParityDb와 같은 다른 Db로 교체해야 합니다. 다음 명령어를 실행하십시오:

1. Robonomics 노드 디렉토리를 찾아 파일을 확인합니다:

{% codeHelper %}

```shell
cd /home/robonomics/
ls -a
```

{% endcodeHelper %}


2. polkadot 디렉토리를 확인하고 chains 디렉토리로 이동합니다:


{% codeHelper %}

```shell
cd /polkadot/chains/
ls -a
```

{% endcodeHelper %}

3. `ksmcc3` 디렉토리를 삭제합니다:


{% codeHelper {copy: true} %}

```shell
rm -r ksmcc3
```

{% endcodeHelper %}


4. 새 `ksmcc3` 디렉토리를 만듭니다.

{% codeHelper {copy: true} %}

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

{% endcodeHelper %}

5. 이제 새 스냅샷을 다운로드해야 합니다. 이 예시에서는 크게 가지치기된 릴레이 체인 스냅샷을 사용하지만 선호하는 스냅샷으로 교체할 수 있습니다.


{% codeHelper {copy: true} %}

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

{% endcodeHelper %}

6. 스냅샷이 다운로드되는 동안 새 세션을 열고 서비스 파일을 편집합니다:

{% codeHelper {copy: true} %}

```shell
sudo nano /etc/systemd/system/robonomics.service
```

{% endcodeHelper %}

데이터베이스와 가지치기와 관련된 서비스 파일 내의 줄을 수정합니다:


{% codeHelper {copy: true} %}

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

{% endcodeHelper %}


`Ctrl + S`를 눌러 저장하고 서비스 파일을 종료합니다.

7. 이제 데몬을 다시로드해야 합니다.

{% codeHelper {copy: true} %}

```shell
systemctl daemon-reload
```

{% endcodeHelper %}


8. 이제 다른 세션에서 새 Db가 다운로드되었을 때 파일을 추출합니다:

{% codeHelper {copy: true} %}

```shell
tar -xvzf ksm_pruned.tar.gz
```

{% endcodeHelper %}


9. 압축 해제가 완료되면 다음을 실행합니다:

{% codeHelper {copy: true} %}

```shell
chown -R robonomics:robonomics paritydb
```

{% endcodeHelper %}

10. 이제 서비스를 시작하고 오류를 모니터링하고 릴레이 체인과 파라체인 모두에서 피어링되는지 확인합니다:

{% codeHelper {copy: true} %}

```shell
systemctl start robonomics && journalctl -fu robonomics
```

{% endcodeHelper %}