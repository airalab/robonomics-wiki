---
title: Como Conectar o Sensor SDS011

contributors: [tubleronchik]
---

**Aqui está um guia passo a passo sobre como conectar seu sensor à Rede de Sensores Robonomics e ao Assistente Doméstico. Nossos sensores utilizam o firmware Robonomics, que é uma versão aprimorada do firmware sensor.community. Ele inclui sensores adicionais e possui um mecanismo de envio de dados modificado.**

{% roboWikiNote {type: "warning"}%} Todos os dispositivos da Robonomics podem ser adquiridos no site oficial [website](https://robonomics.network/devices/).
{% endroboWikiNote %}


## Configuração

1. Conecte o sensor à tomada para alimentá-lo.
2. A placa criará uma rede Wi-Fi chamada `RobonomicsSensor-xxxxxxxxx`. Conecte-se a ela pelo seu telefone ou computador: você verá a janela de autorização (se não, abra o navegador e vá para `192.168.4.1`).
3. Selecione sua rede Wi-Fi na lista (ou escreva-a você mesmo se não estiver na lista) e preencha o campo de senha.
{% roboWikiNote {type: "warning", title: "INFO"}%} O sensor só pode ser conectado a uma rede Wi-Fi de 2,4GHz. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. Escreva as coordenadas do local onde o sensor será instalado. Você pode obtê-las de qualquer mapa ou obtê-las do endereço usando [este link.](https://www.latlong.net/convert-address-to-lat-long.html)
{% roboWikiNote {type: "warning", title: "WARNING"}%} As coordenadas do sensor serão exibidas em um mapa de acesso público. Se você não deseja mostrar suas informações privadas, escreva coordenadas próximas, mas não exatas.
{% endroboWikiNote %}
5. Clique em `Salvar configuração e reiniciar`. A placa reiniciará e se conectará à rede Wi-Fi especificada.
6. Abra o [mapa de sensores da Robonomics](https://sensors.robonomics.network/#/) e encontre o local onde você instalou o sensor. Em alguns minutos, você poderá ver seu sensor com dados no mapa.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}{% endroboWikiPicture %}

## Home Assistant

Existem duas opções de instalação disponíveis:

### Opção 1: HACS

A maneira mais fácil de adicionar um Sensor Local Luftdaten é através do HACS. [Aqui](https://hacs.xyz/docs/setup/download/) você pode encontrar uma breve explicação sobre como configurar o HACS.

Depois de instalar o HACS, vá para HACS -> Integrações e procure pela integração `Local Luftdaten Sensor`. Clique no botão de download e reinicie o Home Assistant assim que a integração for baixada.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### Opção 2: Instalação Manual

Sob o usuário `homeassistant`, clone o repositório do projeto:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

</code-helper>

Se você já tiver integrações personalizadas, copie o diretório `custom_components/local_luftdaten/` para o seu diretório `custom_components`, por exemplo:

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

Se você não tiver nenhuma integração personalizada, copie todo o diretório `custom_components` para o diretório de configuração do seu Home Assistant. Por exemplo:

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## Configuração

Crie uma nova entrada de sensor no seu `configuration.yaml` e ajuste o nome do host ou o endereço IP. Para encontrar o endereço IP local do seu sensor, você pode usar o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). O nome pode ser qualquer um.

|Parâmetro              |Tipo    | Necessidade    | Descrição
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | obrigatório     | Endereço IP do sensor
|`scan_interval`        | número | padrão: 180 | Frequência (em segundos) entre as atualizações
|`name`                 | string | obrigatório    | Nome do sensor
|`monitored_conditions` | lista   | obrigatório     | Lista dos sensores monitorados


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Sensor de qualidade do ar
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> Uma lista de todos os sensores suportados pode ser encontrada no [repositório](https://github.com/lichtteil/local_luftdaten).

Reinicie o seu Home Assistant.
Depois disso, você pode adicionar um sensor ao seu painel. O nome da entidade será o nome que você adicionou ao `configuration.yaml`.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}