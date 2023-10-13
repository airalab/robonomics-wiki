---
title: Offsettemg Service 

contributors: [tubleronchik]
---

Exemplo de trabalho está no vídeo:

https://youtu.be/Ha9wN6bjh64

Serviço para compensar a pegada de carbono CO2 queimando tokens na rede Statemine. 
O CO2 produzido é calculado da seguinte forma: dados do dispositivo em Wh multiplicados pelos coeficientes que dependem da região. 1 tonelada de CO2 é coberta pelo consumo de 1 token. [Aqui](/docs/carbon-footprint-sensor) estão as instruções para conectar o dispositivo.

## Cenário

1. Registre um novo dispositivo no Digital Twin na rede Robonomics
2. Uma vez em um intervalo, obtendo os últimos dados de todos os dispositivos e multiplicando pelo coeficiente dependendo da região
3. Somar os dados e convertê-los em toneladas de CO2
4. Subtrair o número total de tokens queimados dos dados atuais 
5. Queimar um número inteiro de tokens na rede Statemine 
6. Salvar o número total de tokens queimados no banco de dados local e no Datalog 


## Instalação

Clone o repositório e edite o arquivo de configuração.

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Configuração description

Não edite `config/config_template.yaml`!

```
robonomics:
  seed: <seed for account in Robonomics Network waqui Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```
Os coeficientes para energia não renovável foram obtidos do [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) e armazenados em `utils/coefficients.py`. 

## Lançamento

```
docker-compose up
```