---
title: Inicialização do Home Assistant
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.5.4
    https://github.com/home-assistant/core
---

**Após instalar o Home Assistant, é necessário inicializá-lo.**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

Você está começando com a criação da conta do proprietário do Home Assistant. Esta conta é de administrador e pode fazer quaisquer alterações.
Abra o navegador da web e vá para `http://%PC_IP_ADDRESS%:8123`. Você pode encontrar o endereço IP do Raspberry Pi usando o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).
Se você configurou tudo em seu PC, use `http://localhost:8123`.

{% roboWikiNote {type: "note"}%} O endereço IP pode mudar com o tempo, devido às configurações do roteador {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Na primeira página, insira um nome, nome de usuário, senha e clique no botão `CRIAR CONTA`.

2. Na próxima tela, insira um nome para sua casa e defina sua localização e sistema de unidades. Clique em `DETECT` para encontrar sua localização e definir seu fuso horário e sistema de unidades com base nessa localização. Se você não quiser enviar sua localização, pode definir esses valores manualmente.

3. Depois disso, o Home Assistant mostrará quaisquer dispositivos que ele tenha descoberto em sua rede. Não se preocupe se você ver menos itens do que o mostrado abaixo; você sempre pode adicionar dispositivos manualmente mais tarde. Por enquanto, apenas clique em `FINALIZAR` e você estará na tela principal do Home Assistant.

4. Por fim, você verá a interface web do Home Assistant, que mostrará todos os seus dispositivos.


## Solução de Problemas

1. Se você esquecer seu login ou senha para o usuário local, [verifique este artigo](https://www.home-assistant.io/docs/locked_out/) para restaurar suas credenciais.