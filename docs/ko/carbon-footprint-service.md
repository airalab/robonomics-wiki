---
title: 오셋팅 서비스 

contributors: [tubleronchik]
---

작업 예시는 동영상에 있습니다:

https://youtu.be/Ha9wN6bjh64

Service to offset CO2 footprint by burning tokens in Statemine network. 
생산된 CO2는 다음과 같이 계산됩니다: 기기에서의 데이터(Wh)에 지역에 따라 다른 계수를 곱합니다. 1톤의 CO2는 1토큰의 소비로 상쇄됩니다. [여기](/docs/carbon-footprint-sensor)에서 기기 연결을 위한 지침을 확인할 수 있습니다.

## 시나리오

1. 로보노믹스 네트워크의 디지털 트윈에 새로운 기기를 등록합니다. 
2. 일정 간격으로 모든 기기에서 최신 데이터를 가져와 지역에 따라 계수를 곱합니다.
3. 데이터를 합산하고 CO2 톤으로 변환합니다.
4. 현재 데이터에서 총 연소 토큰 수를 차감합니다. 
5. Statemine 네트워크에서 정수 개수의 토큰을 연소합니다. 
6. 로컬 DB와 데이터로그에 총 연소 토큰 수를 저장합니다. 


## 설치

저장소를 복제하고 구성 파일을 편집합니다.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## 구성 description

`config/config_template.yaml` 파일을 편집하지 마세요!

```
robonomics:
  seed: <seed for account in Robonomics Network where Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
재생 가능하지 않은 에너지에 대한 계수는 [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg)에서 가져와 `utils/coefficients.py`에 저장되어 있습니다. 

## 실행

```
docker-compose up
```