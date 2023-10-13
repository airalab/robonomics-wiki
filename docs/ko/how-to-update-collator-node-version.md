---
title: 로보노믹스 콜레이터 노드 버전 업데이트 방법

contributors: [Leemo94]
---

이 게시물을 읽기 전에 다음 기사를 읽는 것을 권장합니다: ["콜레이터 노드 빌드 방법"](/docs/how-to-build-collator-node) 및 ["로보노믹스 콜레이터 시작 방법"](/docs/how-to-launch-the-robonomics-collator).

기사에는 로보노믹스 콜레이터 노드를 업데이트하는 데 필요한 명령어와 그 이후의 예제가 포함되어 있습니다.

## **필수 명령어**

0. 시작하기 전에 `root`로 로그인하는 것이 좋습니다. 그렇지 않으면 다음을 사용하는 것을 권장합니다:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. 로보노믹스 서비스를 중지합니다:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. 이전 버전의 로보노믹스를 제거합니다 (올바른 디렉토리에 있는지 확인하세요):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. [최신 릴리스](https://github.com/airalab/robonomics/releases) 버전의 로보노믹스를 가져옵니다:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. 파일을 추출합니다:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. 파일을 이동합니다:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

이 파일을 로보노믹스 노드를 설치한 올바른 디렉토리로 이동해야 합니다)

</robo-wiki-note>

6. 로보노믹스를 시작합니다:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

콜레이터 노드를 로보노믹스 v1.8.4로 업그레이드하는 예제:

<code-helper>

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
</code-helper>

## **베이스 경로가 설정되지 않은 쿠사마 릴레이 체인 데이터베이스 변경**

쿠사마 릴레이 체인의 특정 스냅샷은 노드에 오류를 발생시킬 수 있습니다. 이로 인해 노드가 작동을 멈출 수 있습니다. 손상된 릴레이 체인 데이터베이스로 인한 예제 오류:

<code-helper>

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
</code-helper>

이 오류를 수정하려면 기존의 쿠사마 릴레이 체인 데이터베이스 (일반적으로 RocksDb)를 제거하고 ParityDb와 같은 다른 Db로 대체해야 합니다. 다음 명령어를 실행하세요:

1. 로보노믹스 노드 디렉토리를 찾고 파일을 확인합니다:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. polkadot 디렉토리를 확인한 후 chains 디렉토리로 이동합니다:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. `ksmcc3` 디렉터리를 삭제합니다.

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. 새로운 `ksmcc3` 디렉토리를 만듭니다.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. 이제 새로운 스냅샷을 다운로드해야 합니다. 이 예제에서는 크게 가지치기된 릴레이 체인 스냅샷을 사용하지만 원하는 스냅샷으로 교체할 수 있습니다.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. 스냅샷이 다운로드되는 동안 새 세션을 열고 서비스 파일을 편집합니다:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

데이터베이스와 가지치기와 관련된 서비스 파일 내의 줄을 수정합니다:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
`Ctrl + S`를 누르고 `Ctrl + X`를 눌러 서비스 파일을 저장하고 종료합니다.

7. 이제 데몬을 다시로드해야 합니다.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. 이 시간에 다른 세션에서 새로운 Db가 다운로드되었는지 확인합니다. 그런 다음 파일을 추출합니다:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. 압축 해제가 완료되면 다음을 실행합니다:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. 이제 서비스를 시작하고 오류를 모니터링하고 릴레이 체인과 파라체인 모두에서 피어링되는지 확인할 수 있습니다.


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>