---
title: Controle Remoto IR
contributors: [nakata5321]
---
Este artigo mostrará o processo de configuração do controle remoto IR.

{% roboWikiNote {type: "warning"}%} Todos os dispositivos da Robonomics podem ser adquiridos no site oficial [website](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmUpSdy3oQbU7dx59sE3MMdL1kr6E2TKsPA5kmFeKHTgF4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Passo 1 — Flashing {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Todos os dispositivos da Robonomics vêm pré-flashados de fábrica. No entanto, como todos os dispositivos são kits de desenvolvimento, as instruções cobrirão a opção de flashar o dispositivo do zero. Se você não deseja fazer isso agora, siga para [**Passo 2 - Ponto de Acesso**](/docs/ir-controller/#step2). {% endroboWikiNote %}

Retire o dispositivo da caixa e conecte-o ao computador. Em seguida, acesse o site [webflasher.robonomics.network](https://webflasher.robonomics.network/). Este é o flasher web.

{% roboWikiVideo {videos:[{src: 'QmT6CDmmF8yahM1WTCwmAZBcrYUh6xxXpmvuboiYe42rEQ', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Observação! O flasher web funciona apenas com os navegadores Google Chrome ou Microsoft Edge. {% endroboWikiNote %}

No menu suspenso "Firmware", escolha a opção **"IR REMOTE"** e em seguida, em "SELECT CHIP", escolha **"ESP32"**. Pressione o botão **"CONNECT"**.
Uma janela pop-up aparecerá, onde você deve selecionar a porta serial à qual o dispositivo está conectado (geralmente é `/ttyUSB0`). Em seguida, escolha **"INSTALL IR-REMOTE_EN"**.
Na próxima janela, você pode fazer uma **INSTALAÇÃO LIMPA** marcando **ERASE DEVICE**. Pressione Avançar e depois Instalar. Aguarde até que o firmware seja carregado no controlador IR.

Após concluir o processo de instalação, uma janela pop-up de configuração Wi-Fi aparecerá. Lá, você tem as seguintes opções:

1) Você pode fornecer as credenciais Wi-Fi, pular o **Passo 2 - Ponto de Acesso** e ir para [**Passo 3 - Configuração**](/docs/ir-controller/#step3).

{% roboWikiVideo {videos:[{src: 'QmVbCvncuEZFVDpxnpD3VyE4LCx8TN6xKCVs4MkrJGhGDx', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Após configurar o Wi-Fi, você pode acessar o dispositivo através do botão **VISIT DEVICE**. Mais tarde, você pode acessar o dispositivo através de seu endereço IP na rede. Para encontrá-lo, você pode usar o aplicativo móvel [Fing](https://www.fing.com/products) ou a
ferramenta de linha de comando [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

2) Ou desconecte o dispositivo do computador e conecte-o à fonte de alimentação. O IR Remote iniciará e criará um hotspot Wi-Fi. Para conectar o IR Remote à sua rede Wi-Fi doméstica através de um hotspot, siga as instruções no Passo 2.

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Passo 2 — Ponto de Acesso {% endroboWikiTitle %}

Se você retirar o IR Remote da caixa e conectá-lo à fonte de alimentação, ele criará um hotspot com o nome "tasmota-XXXXXXX". Conecte-se a ele. Uma janela de configuração deve abrir. Se não abrir, abra o navegador da web e acesse a página `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Forneça as credenciais Wi-Fi. Depois disso, o IR Remote se conectará à rede Wi-Fi. Verifique o dispositivo através de seu endereço IP na rede. Para encontrá-lo, você pode usar o aplicativo móvel [Fing](https://www.fing.com/products) ou a
ferramenta de linha de comando [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Passo 3 — Configuração {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Vá para **"Configuração"** -> **"Configurar outros"**. Na string **"Template"**, insira o seguinte:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics IR remote","GPIO":[1,1,1,1,1056,1088,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Verifique se as caixas de seleção **"Ativar"** e **"Habilitar MQTT"** estão marcadas. Se não estiverem, marque-as e pressione o botão Salvar.

Volte para o **"Menu Principal"** e vá para **"Configuração"** -> **"Configurar MQTT"**.
Forneça suas credenciais MQTT aqui:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Por enquanto, é isso com o ESP. O próximo passo é instalar a integração com o Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Passo 4 — Configuração da Integração {% endroboWikiTitle %}

Este artigo pressupõe que você tenha o Home Assistant e o HACS. Vá para o HACS e adicione um repositório personalizado.

{% roboWikiVideo {videos:[{src: 'QmSqvGpq5q9tHUsi45VkycQamR2o2hoDcyAgiz2dp279eF', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Para fazer isso, pressione os três pontos no canto superior direito, escolha **REPOSITÓRIOS PERSONALIZADOS**
e insira este URL: `https://github.com/hristo-atanasov/Tasmota-IRHVAC`. Em Categoria, escolha "Integração". Depois disso, encontre-o na busca e instale-o. Não se esqueça de reiniciar o Home Assistant depois disso.

Abra os logs do controle remoto IR. Para fazer isso, acesse a URL local apropriada, ou abra novamente [webflasher.robonomics.network](https://webflasher.robonomics.network/) e escolha "Tasmota IR" e "ESP32". Pressione "Connect" e escolha a porta.
Pressione **VISIT DEVICE**, e você verá a página principal do dispositivo. Vá para "Consoles" -> "console".

Aponte seu controle remoto IR (por exemplo, de um ar-condicionado) para o Robonomics IR Remote e pressione os botões no controle remoto. Você verá o seguinte log no console:
```
10:08:06.925 MQT: tele/tasmota_F6CF74/RESULT = {"IrReceived":{"Protocol":"MITSUBISHI112","Bits":112,"Data":"0x23CB260100A003060D00000000CB","Repeat":0,"IRHVAC":{"Vendor":"MITSUBISHI112","Model":-1,"Mode":"Cool","Power":"Off","Celsius":"On","Temp":25,"FanSpeed":"Medium","SwingV":"Highest","SwingH":"Auto","Quiet":"Off","Turbo":"Off","Econo":"Off","Light":"Off","Filter":"Off","Clean":"Off","Beep":"Off","Sleep":-1}}}
```
Você precisará das informações do tópico `IRHVAC`.

Abra o arquivo `configuration.yaml` de sua instância do Home Assistant e insira o seguinte:

{% codeHelper { copy: true}%}

```shell
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "<Nome Aqui>"
    command_topic: "cmnd/<seu_dispositivo_tasmota>/irhvac"
    # Escolha uma das seguintes opções:
    # O estado é atualizado quando o dispositivo tasmota recebe um sinal IR (inclui transmissão própria e controle remoto original)
    # útil quando um controle remoto normal é usado junto com o dispositivo tasmota, pode ser menos confiável do que a segunda opção.
    state_topic: "tele/<seu_dispositivo_tasmota>/RESULT"
    # O estado é atualizado quando o dispositivo tasmota completa a transmissão IR, deve ser bastante confiável.
    #state_topic: "stat/<seu_dispositivo_tasmota>```>/RESULT"
    # Descomente se o 'tópico disponível' do dispositivo IR Tasmota for diferente (se o dispositivo no HA estiver desativado)
    #availability_topic: "tele/<seu_dispositivo_tasmota>/LWT"
    temperature_sensor: <sensor de temperatura na sala> - # necessário para medir a temperatura em uma sala. ex. sensor.kitchen_temperature
    humidity_sensor: None #opcional - padrão None (ex. sensor.kitchen_humidity)
    power_sensor: None #opcional - padrão None (ex. binary_sensor.kitchen_ac_power)
    vendor: "<Seu fornecedor aqui>" #encontre seu fornecedor nos logs.
    min_temp: 16 #opcional - padrão valor int 16
    max_temp: 32 #opcional - padrão valor int 32
    target_temp: 26 #opcional - padrão valor int 26
    initial_operation_mode: "off" # opcional - padrão valor de string "off" (um dos "supported_modes")
    away_temp: 24 #opcional - padrão valor int 24
    precision: 1 #opcional - padrão valor int ou float 1. Pode ser definido como 1, 0.5 ou 0.1
    supported_modes:
      - "heat"
      - "cool"
      - "dry"
      - "fan_only" # Use "fan_only" mesmo se o Tasmota mostrar "Mode":"Fan"
      - "auto"
      - "off" #Desliga o ar condicionado - Deve estar entre aspas
      # Alguns dispositivos têm "auto" e "fan_only" trocados
      # Se as duas linhas a seguir forem descomentadas, "auto" e "fan" devem ser comentados
      #- "auto_fan_only" #se o controle remoto mostrar fan mas o tasmota disser auto
      #- "fan_only_auto" #se o controle remoto mostrar auto mas o tasmota disser fan
    supported_fan_speeds:
      # Alguns dispositivos dizem max, mas é high, e auto que é max
      # Se você descomentar os dois seguintes, você deve comentar high e max
      # - "auto_max" #se tornaria max
      # - "max_high" #se tornaria high
      #- "on"
      #- "off"
      #- "low"
      - "medium"
      - "high"
      #- "middle"
      #- "focus"
      #- "diffuse"
      - "min"
      - "max"
      #- "auto"
    supported_swing_list:
      - "off"
      - "vertical" #de cima para baixo
      # - "horizontal" # Da esquerda para a direita
      # - "both"
    default_quiet_mode: "Off" #opcional - padrão valor de string "Off"
    default_turbo_mode: "Off" #opcional - padrão valor de string "Off"
    default_econo_mode: "Off" #opcional - padrão valor de string "Off"
    hvac_model: "-1" #opcional - padrão valor de string "1"
    celsius_mode: "On" #opcional - padrão valor de string "On"
    default_light_mode: "Off" #opcional - padrão valor de string "Off"
    default_filter_mode: "Off" #opcional - padrão valor de string "Off"
    default_clean_mode: "Off" #opcional - padrão valor de string "Off"
    default_beep_mode: "Off" #opcional - padrão valor de string "Off"
    default_sleep_mode: "-1" #opcional - padrão valor de string "-1"
    default_swingv: "high" #opcional - padrão valor de string ""
    default_swingh: "left" #opcional - padrão valor de string ""
    keep_mode_when_off: True #opcional - padrão valor booleano False: Deve ser True para MITSUBISHI_AC, ECOCLIM, etc.
    toggle_list: #opcional - padrão []
      # A propriedade alternada é uma configuração que não mantém o estado ligado.
      # Defina isso se as propriedades do seu ar condicionado forem uma função de alternância.
      #- Beep
      #- Clean
      #- Econo
      #- Filter
      #- Light
      #- Quiet
      #- Sleep
      #- SwingH
      #- SwingV
      #- Turbo
```

{% endcodeHelper %}

Altere todas as declarações necessárias na parte inserida com os valores da mensagem do console. Como resultado, parte do seu arquivo de configuração deve se parecer com isso
(no exemplo, a declaração não utilizada foi excluída):
```
tasmota_irhvac:

climate:
  - platform: tasmota_irhvac
    name: "controle de clima de Bangkok"
    unique_id : "teste de clima de Bangkok"
    command_topic: "cmnd/tasmota_F6CF74/irhvac"
    state_topic: "tele/tasmota_F6CF74/RESULT"
    temperature_sensor: sensor.robonomicssensor_36133_temperature_2
    vendor: "MITSUBISHI112"
    min_temp: 16 #opcional - padrão valor int 16
    max_temp: 31 #opcional - padrão valor int 32
    target_temp: 25 #opcional - padrão valor int 26
    initial_operation_mode: "cool"
    supported_modes:
      - "cool"
      - "dry"
      - "fan_only" # Use "fan_only" mesmo se o Tasmota mostrar "Mode":"Fan"
      - "auto"
      - "off" #Desliga o ar condicionado - Deve estar entre aspas
      # Alguns dispositivos têm "auto" e "fan_only" trocados
      # Se as duas linhas a seguir forem descomentadas, "auto" e "fan" devem ser comentados
      #- "auto_fan_only" #se o controle remoto mostrar fan mas o tasmota disser auto
      #- "fan_only_auto" #se o controle remoto mostrar auto mas o tasmota disser fan
    supported_fan_speeds:
      # Alguns dispositivos dizem max, mas é high, e auto que é max
      # Se você descomentar os dois seguintes, você deve comentar high e max
      # - "auto_max" #se tornaria max
      # - "max_high" #se tornaria high
      - "low"
      - "medium"
      - "max"
      - "auto"
    supported_swing_list:
      - "off"
      - "vertical" #de cima para baixo

    hvac_model: "-1" #opcional - padrão valor de string "1"

    keep_mode_when_off: True #opcional - padrão valor booleano False: Deve ser True para MITSUBISHI_AC, ECOCLIM, etc.

```

Salve `configuration.yaml` e reinicie o Home Assistant.
Após reiniciar, você pode adicionar um novo cartão termostato na interface do usuário e selecionar o dispositivo recém-integrado.

{% roboWikiPicture {src:"docs/ir-controller/thermo.jpg", alt:"thermo"} %}{% endroboWikiPicture %}

Se você tiver problemas com o modo GUI, mude para "EDITOR DE CÓDIGO" e escreva o seguinte:
```
type: thermostat
entity: climate.<seu nome de clima>
```

{% roboWikiNote { type: "warning"}%} Todos os dispositivos da Robonomics podem ser adquiridos no site oficial [website](https://robonomics.network/devices/).{% endroboWikiNote %}