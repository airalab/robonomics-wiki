---
title: Monitoramento de Energia
contributors: [nakata5321]
---
Este artigo mostrará o processo de configuração do Monitoramento de Energia.

{% roboWikiNote {type: "warning"}%} Todos os dispositivos da Robonomics podem ser adquiridos no site oficial [website](https://robonomics.network/devices/).
{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTNyEP12NA7PPjw5WJBwyGwMq9Pg3YHmgEeaFRgNaS5Lc', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Passo 1 — Flashing {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%} Todos os dispositivos da Robonomics vêm pré-flashados de fábrica. No entanto, como todos os dispositivos são kits de desenvolvimento, as instruções abordarão a opção de flashar o dispositivo do zero. Se você não deseja fazer isso agora, siga para [**Passo 2 - Ponto de Acesso**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Retire o dispositivo da caixa e conecte-o ao computador. Em seguida, acesse o site [webflasher.robonomics.network](https://webflasher.robonomics.network/). Este é o flasher web.

{% roboWikiVideo {videos:[{src: 'QmapJYTMqxVSzavJmWJg3rQjRoyCtdeFzYifgvDkXdzi8S', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Observação! O flasher web funciona apenas com os navegadores Google Chrome ou Microsoft Edge.
{% endroboWikiNote %}

No menu suspenso "Firmware", escolha a opção **"ENERGY MONITOR"** e em seguida, em "SELECT CHIP", escolha **"ESP32-S3"**. Pressione o botão **"CONNECT"**.
Uma janela pop-up aparecerá, onde você deve selecionar a porta serial à qual o dispositivo está conectado (geralmente é `/ttyUSB0`). Em seguida, escolha **"INSTALL ENERGY-MONITOR_EN"**.
Na próxima janela, você pode fazer uma **INSTALAÇÃO LIMPA** marcando **ERASE DEVICE**. Clique em Avançar e depois em Instalar. Aguarde até que o firmware seja carregado no dispositivo de Monitoramento de Energia.

Após concluir o processo de instalação, uma janela pop-up de configuração Wi-Fi aparecerá. Forneça as credenciais do Wi-Fi.

Após configurar o Wi-Fi, você pode acessar o dispositivo através do botão **VISIT DEVICE**. Mais tarde, você pode acessar o dispositivo através de seu endereço IP na rede. Para encontrá-lo, você pode usar o aplicativo móvel [Fing](https://www.fing.com/products) ou a
ferramenta de linha de comando [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Pule o **Passo 2 — Ponto de Acesso** e vá para [**Passo 3 — Configuração**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Passo 2 — Ponto de Acesso {% endroboWikiTitle %}

Se você retirar o Monitor de Energia da caixa e conectá-lo à fonte de alimentação, ele criará um hotspot com o nome "robonomics-XXXXXXX". Conecte-se a ele. Uma janela de configuração deve abrir. Se não abrir, abra o navegador da web e acesse a página `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"phone-wifi"} %}{% endroboWikiPicture %}

Forneça as credenciais do Wi-Fi. Após isso, o dispositivo de Monitoramento de Energia se conectará à rede Wi-Fi. Verifique o dispositivo através de seu endereço IP na rede. Para encontrá-lo, você pode usar o aplicativo móvel [Fing](https://www.fing.com/products) ou a
ferramenta de linha de comando [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Passo 3 — Configuração {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Vá para **"Configuração"** -> **"Configurar outros"**. Na string **"Template"**, insira o seguinte:

{% codeHelper { copy: true}%}

```shell
{"NAME":"Robonomics-Energy-Monitor","GPIO":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3200,5440,1,1,576,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],"FLAG":0,"BASE":1, "CMND":"SetOption21 1|WattRes 2|VoltRes 2"}
```

{% endcodeHelper %}

Verifique se as caixas de seleção **"Ativar"** e **"Habilitar MQTT"** estão marcadas. Se não estiverem, marque-as e pressione o botão Salvar.

Volte para o "menu principal" e vá para **"Configuração"** -> **"Configurar MQTT"**.
Forneça suas credenciais MQTT aqui:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"mqtt"} %}{% endroboWikiPicture %}

Isso é tudo com o ESP por enquanto. O próximo passo é instalar a integração com o Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Passo 4 — Configuração da Integração {% endroboWikiTitle %}

Este artigo pressupõe que você tenha o Home Assistant. Para conectar o dispositivo de Monitoramento de Energia ao Home Assistant, você precisa instalar a integração "Tasmota".

{% roboWikiVideo {videos:[{src: 'QmXzAFkgV2ZR4pmedhjSCwh9JvfUkmmKUqtHDuzhb6CQaH', type: 'mp4'}],  attrs:['controls', 'loop', 'autoplay']} %}{% endroboWikiVideo %}

Basicamente, o Home Assistant descobrirá automaticamente a integração "Tasmota". Mas se não o fizer, adicione manualmente.

{% roboWikiPicture {src:"docs/energymeter/HA.jpg", alt:"energymeter-ha"} %}{% endroboWikiPicture %}

Isso é tudo. Agora você pode adicionar entidades de energia ao painel.

{% roboWikiNote {type: "warning"}%} Todos os dispositivos da Robonomics podem ser adquiridos no site oficial [website](https://robonomics.network/devices/).
{% endroboWikiNote %}