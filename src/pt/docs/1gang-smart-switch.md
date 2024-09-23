---
title: Interruptor Inteligente de 1 Gangue
contributors: [nakata5321]
---
Este artigo irá mostrar o processo de configuração do Interruptor Inteligente de 1 Gangue.

{% roboWikiNote {type: "warning"}%}Todos os dispositivos da Robonomics podem ser adquiridos no site oficial [website](https://robonomics.network/devices/).{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmTWhDu1PdQgR1ZuLuGpEtYG8uMm8eiWLziK1zLupQwU2i', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiTitle { type:'2', anchor: 'step1'} %} Passo 1 — Flash {% endroboWikiTitle %}

{% roboWikiNote {type: "warning"}%}Todos os dispositivos da Robonomics vêm pré-flashados de fábrica. No entanto, como todos os dispositivos são kits de desenvolvimento, as instruções cobrirão a opção de flashar o dispositivo do zero. Se você não deseja fazer isso agora, siga para [**Passo 2 - Ponto de Acesso**](/docs/ir-controller/#step2).
{% endroboWikiNote %}

Retire o dispositivo da caixa e conecte-o ao computador. Em seguida, acesse o site [webflasher.robonomics.network](https://webflasher.robonomics.network/). Este é o flash da web.

{% roboWikiVideo {videos:[{src: 'QmVWmGSnvGwQ3dQfZC8iM5KHBoGpaWVXXUjNuNesULQrGw', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Nota! O flash da web só funciona com os navegadores Google Chrome ou Microsoft Edge.{% endroboWikiNote %}

No menu suspenso "Firmware", escolha a opção **"SWS-1G-E-11-23"** e em seguida, em "SELECIONAR CHIP", escolha **"ESP32"**. Pressione o botão **"CONECTAR"**.
Uma janela pop-up aparecerá, onde você deve selecionar a porta serial à qual o dispositivo está conectado (geralmente é `/ttyUSB0`). Em seguida, escolha **"INSTALAR SWS-1G-E-11-23"**.
Na próxima janela, você pode fazer uma **INSTALAÇÃO LIMPA** marcando **APAGAR DISPOSITIVO**. Clique em Avançar e depois em Instalar. Aguarde até que o firmware seja carregado no dispositivo do interruptor inteligente.

Após concluir o processo de instalação, uma janela pop-up de configuração Wi-Fi aparecerá. Forneça as credenciais do Wi-Fi.

Após configurar o Wi-Fi, você pode acessar o dispositivo através do botão **VISITAR DISPOSITIVO**. Posteriormente, você pode acessar o dispositivo através do seu endereço IP na rede. Para encontrá-lo, você pode usar o aplicativo móvel [Fing](https://www.fing.com/products) ou a
ferramenta de linha de comando [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Pule o **Passo 2 — Ponto de Acesso** e vá para [**Passo 3 — Configuração**](/docs/ir-controller/#step3).

{% roboWikiTitle { type:'2', anchor: 'step2'} %} Passo 2 — Ponto de Acesso {% endroboWikiTitle %}

Se você retirar o interruptor inteligente da caixa e conectá-lo à fonte de alimentação, ele criará um hotspot com o nome "robonomics-XXXXXXX". Conecte-se a ele.
Uma janela de configuração deve abrir. Se não abrir, abra um navegador da web e acesse a página `192.168.4.1`.

{% roboWikiPicture {src:"docs/ir-controller/phone-wifi.jpg", alt:"imagem"} %}{% endroboWikiPicture %}

Forneça as credenciais do Wi-Fi. Após isso, o dispositivo do interruptor inteligente se conectará à rede Wi-Fi. Verifique o dispositivo através do seu endereço IP na rede. Para encontrá-lo, você pode usar o aplicativo móvel [Fing](https://www.fing.com/products) ou a
ferramenta de linha de comando [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

{% roboWikiTitle { type:'2', anchor: 'step3'} %} Passo 3 — Configuração {% endroboWikiTitle %}

{% roboWikiVideo {videos:[{src: 'QmZokF8TnReLt4B6q8ixkBmpZwpiiU9PQCPdyJw9RcnYFn', type: 'mp4'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

Vá para **"Configuração"** -> **"Configurar outro"**. Na string **"Modelo"**, insira o seguinte:

{% codeHelper { copy: true}%}

```shell
{"NOME":"Robonomics-1L-Switch","GPIO":[1,1,1,1,1,1,1,1,1,576,1,1,1,1,3200,5440,0,1,224,1,0,0,320,1,0,0,0,0,1,1,1,32,1,0,0,1],"FLAG":0,"BASE":1}
```

{% endcodeHelper %}

Verifique se as caixas de seleção **"Ativar"** e **"Habilitar MQTT"** estão marcadas. Se não estiverem, marque-as e pressione o botão Salvar.

Volte para o menu principal e vá para **"Configuração"** -> **"Configurar MQTT"**.
Forneça suas credenciais MQTT aqui:

{% roboWikiPicture {src:"docs/ir-controller/mqtt.jpg", alt:"imagem"} %}{% endroboWikiPicture %}

Isso é tudo com o ESP por enquanto. O próximo passo é instalar a integração com o Home Assistant.

{% roboWikiTitle { type:'2', anchor: 'step4'} %} Passo 4 — Configuração da Integração {% endroboWikiTitle %}

Este artigo pressupõe que você tenha o Home Assistant. Para conectar o dispositivo do Interruptor Inteligente ao Home Assistant, você precisa instalar a integração Tasmota.

{% roboWikiVideo {videos:[{src: 'QmQw6aA5e7UqT1hZrAV8m1UPq1rWCgLsWcVufuxitQm84p', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Basicamente, o Home Assistant descobrirá automaticamente a integração Tasmota. Mas se não o fizer, adicione manualmente.
Isso é tudo. Agora você pode adicionar a entidade do interruptor ao painel.

{% roboWikiNote {type: "warning"}%}Todos os dispositivos da Robonomics podem ser adquiridos no site oficial [website](https://robonomics.network/).
{% endroboWikiNote %}