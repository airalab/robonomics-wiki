---
title: Como adicionar o sensor SDS011 ao Home Assistant

contributors: [tubleronchik]
---

Este artigo explica como conectar o sensor de qualidade do ar SDS com o Firmware [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) & [Robonomics](https://github.com/airalab/sensors-software) ao Home Assistant.

## Instalação 
Existem duas opções de instalação disponíveis:

### Opção 1: HACS

A maneira mais fácil de adicionar um Sensor Local Luftdaten é através do HACS. [Aqui](https://hacs.xyz/docs/setup/download/) você pode encontrar uma breve explicação sobre como configurar o HACS.

Depois de instalar o HACS, vá para HACS -> Integrações e procure pela integração `Local Luftdaten Sensor`. Clique no botão de download e reinicie o Home Assistant assim que a integração for baixada.
<robo-wiki-picture src="sds-hacs.png"/>

### Opção 2: Instalação Manual

Com o usuário homeassistant, clone o repositório do projeto:

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

Se você já tiver alguma integração personalizada, copie a pasta `custom_components/local_luftdaten/` para o diretório `custom_components`, por exemplo:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
Se você não tiver nenhuma integração personalizada, copie todo o diretório `custom_components` para o diretório de configuração do Home Assistant, por exemplo:

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## Configuração

Crie uma nova entrada de sensor no seu `configuration.yaml` e ajuste o nome do host ou o endereço IP. Para encontrar o endereço IP local do seu sensor, você pode usar o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). O nome pode ser qualquer um.

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors

<code-helper copy>

  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Air quality sensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```
</code-helper>

> A lista de todos os sensores suportados pode ser encontrada no [repositório](https://github.com/lichtteil/local_luftdaten).

Reinicie o Home Assistant.
Depois disso, você pode adicionar o sensor ao seu painel. O nome da entidade será o nome que você adicionou ao `configuration.yaml`.
<robo-wiki-picture src="sds-configuration-card.png"/>