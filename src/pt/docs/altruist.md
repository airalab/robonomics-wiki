---
title: Configuração do Altruist
contributors: [tubleronchik]
---

**Este guia orienta você na configuração e ativação de um sensor Altruist Outdoor. Você conectará o sensor ao Wi-Fi, configurará sua localização e ativará uma assinatura usando tokens XRT. Além disso, são fornecidas instruções para integrar o sensor com o Home Assistant via HACS ou instalação manual.**

{% roboWikiNote {type: "warning"}%} Todos os dispositivos da Robonomics podem ser adquiridos no [site oficial](https://robonomics.network/devices/).{% endroboWikiNote %}

## Ativar Assinatura Robonomics

{% roboWikiNote {type: "okay"} %}Para completar esta etapa, certifique-se de ter pelo menos 2-3 tokens XRT em sua conta `Robonomics Polkadot`.{% endroboWikiNote %}

1) Navegue até a [página de assinatura](https://robonomics.app/#/rws-buy) do dApp Robonomics. 
2) Clique em **Conta** e conecte sua carteira. O endereço da sua conta e saldo serão exibidos.
Se você não tiver uma conta, siga [este guia](https://wiki.robonomics.network/docs/create-account-in-dapp/) para criar uma.

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"página de assinatura"} %}{% endroboWikiPicture %}

3) Clique em `COMPRAR ASSINATURA` e assine a transação. **Aguarde a conclusão do processo de ativação**. 
4) Uma vez ativado, você será redirecionado para a **página de configuração**, onde poderá ver o nome da sua assinatura e a data de expiração.

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"página de configuração de assinatura"} %}{% endroboWikiPicture %}

5) **Salve o endereço da sua conta** — você precisará dele durante a configuração do sensor. Você pode copiá-lo da seção "PROPRIETÁRIO" ou clicando no nome da sua conta no canto superior direito e selecionando o botão de copiar.

## Configuração do Sensor

{% roboWikiNote {type: "warning", title: "INFORMAÇÃO"}%} O sensor só pode ser conectado a uma rede Wi-Fi de 2.4GHz.{% endroboWikiNote %}

1) **Conecte o sensor** a uma tomada.
2) A placa criará uma rede Wi-Fi chamada Altruist-xxxxxxxxx. Conecte-se a ela a partir do seu telefone ou computador. Você deve ser automaticamente solicitado a abrir a janela de autorização.
- Se não, abra um navegador e vá para 192.168.4.1.

{% roboWikiPicture {src:"docs/altruist/networks.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

3) **Configure as configurações de Wi-Fi**:
- Selecione sua rede Wi-Fi da lista ou insira-a manualmente se não aparecer.
- Insira a senha no campo "CONFIGURAÇÕES DE WI-FI".
- Se você tiver vários dispositivos Altruist na mesma rede, altere o Nome de Host Local. Após configurar o WiFi, você pode se conectar ao seu sensor usando este nome de host.

{% roboWikiPicture {src:"docs/altruist/wifi_creds.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

4) **Salvar Configuração**
- Clique no`Salvar Configuração e Reiniciar` e aguarde o sensor conectar ao WiFi. Uma vez conectado, ele exibirá seu novo endereço IP — copie-o, pois esta é uma maneira alternativa de conectar aos seus sensores após a configuração.

{% roboWikiPicture {src:"docs/altruist/connected.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

5) **Insira seus detalhes do Robonomics**:
- Abra a interface web do Altruist em http://altruist.local (ou use seu Nome de Host Local personalizado seguido de `.local` se você o alterou). Em seguida, navegue até a página `Configuração`.
- Na seção `Robonomics`, cole o Endereço do Proprietário RWS que você copiou anteriormente no campo designado.

6) **Defina a localização do sensor**:
- Na seção `Correção de GPS e Temperatura`, insira as coordenadas do local de instalação do sensor.
- Você pode encontrar coordenadas usando mapas online ou converter um endereço para latitude/longitude usando [este link.](https://www.latlong.net/convert-address-to-lat-long.html)

{% roboWikiNote {type: "warning", title: "AVISO"}%}As coordenadas do sensor serão exibidas em um mapa disponível publicamente. Se você não quiser mostrar suas informações privadas, escreva coordenadas próximas, mas não exatas.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/robo-gps.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

7) **Copie o "Endereço Robonomics" do Altruist**:
- Você o encontrará no topo da página. Salve-o paraa etapa final.

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"endereço do altruísta"} %}{% endroboWikiPicture %}

8) Clique em "**Salvar configuração e reiniciar**" na parte inferior da página. A placa será reiniciada.

## Ativar Altruist
A etapa final no processo de configuração é adicionar o **endereço do Altruist** à sua **Assinatura Robonomics**.

1) Volte para a [página de Configuração](https://robonomics.app/#/rws-setup).

2) Role para baixo até a seção "**Usuários na assinatura**".

3) No campo "**Adicionar um usuário**", cole o **endereço Altruist Robonomics** que você copiou anteriormente.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"adicionar usuário"} %}{% endroboWikiPicture %}

4) Clique no **botão de mais (+)** e assine a mensagem.

5) Aguarde a conclusão da operação.

É isso! Sua configuração está agora completa. 🎉

Agora você pode encontrar seu Altruist no mapa do [Robonomics Sensors Social](https://sensors.social/#). 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"mapa do sensor"} %}{% endroboWikiPicture %}

## Home Assistant

Existem duas maneiras de adicionar o **Altruist** ao **Home Assistant**:

### Opção 1: HACS (Recomendado)

A maneira mais fácil de adicionar o **Altruist** é através do **HACS**. Você pode encontrar um breve guia de configuração [aqui](https://hacs.xyz/docs/use/) 

**Passos**:
1) Uma vez que o HACS esteja instalado, abra-o.

2) Clique nos **três pontos** no canto superior direito e selecione "**Repositórios personalizados**".

3) Na janela pop-up, insira o seguinte URL:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) Defina o tipo como "**Integração**" e clique em "**ADICIONAR**".

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) Procure pela integração **Altruist Sensor**.

6) Clique no botão **Download**, depois reinicie o **Home Assistant** assim que a integração estiver instalada.


{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### Opção 2: Instalação Manual

1) Sob o usuário `homeassistant`, clone o repositório do projeto:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) Se você já tiver alguma integração personalizada, mova a pasta `altruist` para o seu diretório `custom_components`:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) Se você **não** tiver nenhuma integração personalizada, mova todo o diretório custom_components:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integrationmv custom_components/ ~/.homeassistant/

{% endcodeHelper %}

## Configuração

Após a instalação e reinicialização do Home Assistant, a integração detectará automaticamente o Altruist na sua rede.

1) Vá para **Configurações → Dispositivos e Serviços**.

2) Adicione o **Sensor Altruist**.

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"descobrir altruist"} %}{% endroboWikiPicture %}

É isso! 🚀 Seu Sensor Altruist agora está integrado com o Home Assistant.