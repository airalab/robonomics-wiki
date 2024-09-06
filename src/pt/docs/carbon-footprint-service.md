---
title: Serviço de Compensação

contribuidores: [tubleronchik]
---

Exemplo do trabalho está no vídeo:

https://youtu.be/Ha9wN6bjh64

Serviço para compensar a pegada de CO2 queimando tokens na rede Statemine. O CO2 produzido é calculado da seguinte forma: dados do dispositivo em Wh multiplicados pelos coeficientes dependendo da região. 1 tonelada de CO2 é coberta pelo consumo de 1 token. [Aqui](/docs/carbon-footprint-sensor) estão as instruções para conectar o dispositivo.

## Cenário

1. Registrar um novo dispositivo no Gêmeo Digital na rede Robonomics
2. Em um intervalo, obter os últimos dados de todos os dispositivos e multiplicar pelo coeficiente dependendo da região
3. Somar os dados e convertê-los em toneladas de CO2
4. Subtrair o número total de tokens queimados dos dados atuais
5. Queimar um número inteiro de tokens na rede Statemine
6. Salvar o número total de tokens queimados no banco de dados local e no Datalog

## Instalação

Clone o repositório e edite o arquivo de configuração.

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## Descrição da Configuração

Não edite `config/config_template.yaml`!

```
robonomics:
  seed: <seed para a conta na Rede Robonomics onde o Gêmeo Digital será criado>
statemine:
  seed: <seed para a conta de administrador com tokens verdes na Rede Statemine>
  endpoint: <ponto final do statemine>
  token_id: <id do token que será queimado>
  ss58_format: <formato de endereço no Polkadot (para a Rede Statemine é 2)>

service:
  interval: <com que frequência os dados dos dispositivos serão coletados>
```

Os coeficientes para energia não renovável foram retirados do [Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg) e armazenados em `utils/coefficients.py`.

## Lançamento

```
docker-compose up
```