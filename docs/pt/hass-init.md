---
title: Inicialização do Home Assistant
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
---

**Após instalar o Home Assistant, ele precisa ser inicializado.**

<robo-wiki-picture src="home-assistant/ha_init.png" />

Você está começando com a criação da conta do proprietário do Home Assistant. Essa conta é um administrador e pode fazer qualquer alteração. Abra o navegador da web e vá para `http://%RASPBERRY_IP_ADDRESS%:8123`. Você pode encontrar o endereço IP do Raspberry Pi usando o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

<robo-wiki-note type="note">O endereço do Raspberry Pi pode mudar com o tempo, devido às configurações do roteador.</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type:'mp4'}]" />

1. Na primeira página, digite um nome, nome de usuário, senha e clique no botão `CREATE ACCOUNT`.

2. Na próxima tela, digite um nome para sua casa e defina sua localização e sistema de unidades. Clique em `DETECT` para encontrar sua localização e definir seu fuso horário e sistema de unidades com base nessa localização. Se você não quiser enviar sua localização, você pode definir esses valores manualmente.

3. Depois disso, o Home Assistant mostrará quaisquer dispositivos que ele tenha descoberto em sua rede. Não se preocupe se você ver menos itens do que o mostrado abaixo; você sempre pode adicionar dispositivos manualmente posteriormente. Por enquanto, clique em `FINISH` e você estará na tela principal do Home Assistant.

4. Por fim, você verá a interface web do Home Assistant, que mostrará todos os seus dispositivos. 


## Solucionando Problemas

1. Se você esquecer seu nome de usuário ou senha para o usuário local, [verifique este artigo](https://www.home-assistant.io/docs/locked_out/) para restaurar suas credenciais.
