---

title: Atualize seu Home Assistant OS
contributors: [LoSk-p]
tools:
  - Home Assistant OS 12.1 para RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Integração Robonomics Home Assistant 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy Add-on 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**Este artigo contém instruções para atualizar seu Home Assistant OS existente com a integração Robonomics.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## Instalar HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) permite que você instale integrações personalizadas.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Antes de começar, você precisa instalar um complemento para se conectar ao dispositivo Home Assistant com SSH. Na Loja de Complementos, pesquise por `ssh`. Recomendamos instalar o complemento `SSH & Web Terminal`.

{% roboWikiNote {title:"Aviso", type: "warning"}%} Se o complemento SSH não for encontrado, tente habilitar o Modo Avançado nas configurações do seu perfil de usuário. Para fazer isso, clique no ícone de perfil no canto inferior esquerdo e encontre a opção Modo Avançado.{% endroboWikiNote %}

2. Escolha o complemento e pressione `INSTALAR`. Após a instalação, vá para a guia `Configuração` e adicione `senha` ou `authorized_keys`. Não se esqueça de salvar esta parte da configuração.

3. Na guia `Informações`, pressione `INICIAR`. Se deseja ver o complemento na barra lateral, não se esqueça de habilitar `Mostrar na barra lateral`.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. Abra o Complemento SSH e execute o seguinte comando:

{% codeHelper { additionalLine: "Linha de Comando do Home Assistant", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Reinicie o Home Assistant (você pode fazer isso em `Configurações`->`Sistema`).

6. Agora a Integração HACS estará disponível para adicionar no menu `Integrações`. Vá para `Configurações`->`Dispositivos e Serviços`, pressione `Adicionar Integração` e encontre HACS.

{% roboWikiNote {title:"Aviso", type: "warning"}%} Para usar o HACS, você precisa de uma Conta no Github.{% endroboWikiNote %}

7. Clique nele e siga as instruções de instalação.

## Instalar Daemon IPFS e Complementos Libp2p - WS Proxy

A Integração Robonomics armazena os dados usando um daemon IPFS local e também usa Libp2p para controle remoto, então você precisa instalá-los primeiro. Você pode adicionar o repositório de Complementos Robonomics usando este botão

[![Abra sua instância do Home Assistant e mostre a caixa de diálogo de adicionar complemento com uma URL de repositório específica pré-preenchida.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

Ou manualmente seguindo os seguintes passos:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Existe um [Repositório de Complementos Robonomics](https://github.com/PinoutLTD/robonomics-addons). Para instalá-lo, vá para `Configurações` -> `Complementos` e pressione o botão `LOJA DE COMPLEMENTOS` no canto inferior direito.

2. Pressione os três pontos no canto superior direito e escolha `Repositórios`. Adicione lá o seguinte link:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. Pressione o botão `ADICIONAR`.

4. Feche o gerenciador de repositórios e atualize a página. Agora no final da página você pode ver os Complementos Robonomics.

Agora você pode instalar ambos os complementos. Abra-os e pressione `INSTALAR`. Após a instalação, pressione `INICIAR`.

## Instalar Integração Robonomics

Agora você pode instalar a Integração Robonomics usando o HACS.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Abra o HACS no menu lateral e procure por `Robonomics`. Em seguida, clique no botão `Download` localizado no canto inferior direito. Uma vez que o download estiver completo, reinicie o Home Assistant.