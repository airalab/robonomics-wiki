---
title: 오프셋 서비스

contributors: [tubleronchik]
---

작업 예시는 다음 비디오에서 확인할 수 있습니다:

https://youtu.be/Ha9wN6bjh64

Statemine 네트워크에서 토큰을 태우는 것으로 CO2 발자국을 상쇄하는 서비스입니다. 생성된 CO2는 다음과 같이 계산됩니다: 장치에서의 데이터(Wh)에 지역에 따라 다른 계수를 곱합니다. 1톤의 CO2는 1토큰의 소비로 상쇄됩니다. [여기](/docs/carbon-footprint-sensor)에서 장치를 연결하는 지침을 확인할 수 있습니다.

## 시나리오

1. Robonomics 네트워크의 디지털 트윈에 새로운 장치를 등록합니다.
2. 일정 간격으로 모든 장치에서 최신 데이터를 가져와 지역에 따라 다른 계수를 곱합니다.
3. 데이터를 합산하고 CO2 톤으로 변환합니다.
4. 현재 데이터에서 태운 토큰의 총 수를 뺍니다.
5. Statemine 네트워크에서 정수 토큰 수를 태웁니다.
6. 로컬 DB와 Datalog에 태운 토큰의 총 수를 저장합니다.

## 설치

저장소를 복제하고 구성 파일을 편집합니다.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## 구성 설명

`config/config_template.yaml`을 편집하지 마세요!

```
robonomics:
  seed: <디지털 트윈이 생성될 Robonomics 네트워크 계정의 시드>
statemine:
  seed: <Statemine 네트워크의 그린 토큰을 가진 관리자 계정의 시드>
  endpoint: <statemine 엔드포인트>
  token_id: <태울 토큰의 ID>
  ss58_format: <Polkadot 주소 형식 (Statemine 네트워크의 경우 2)>

service:
  interval: <장치에서 데이터를 수집하는 주기>
```

비재생 가능 에너지에 대한 계수는 [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg)에서 가져와 `utils/coefficients.py`에 저장되어 있습니다.

## 실행

```
docker-compose up
```