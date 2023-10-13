---
title: Atualize seu Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**Este artigo contém instruções para atualizar seu Home Assistant OS existente com integração Robonomics.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Instalar IPFS Add-on


A integração Robonomics armazena os dados usando o daemon IPFS local, portanto, você precisa instalá-lo primeiro. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. Existe um [Add-on IPFS para Home Assistant](https://github.com/airalab/ipfs-addon). Para instalá-lo, vá para `Settings` -> `Add-ons` e pressione o botão `ADD-ON STORE` no canto inferior direito.

2. Clique nos três pontos no canto superior direito e escolha `Repositories`. Adicione o seguinte link lá:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Pressione o botão `ADD`.

4. Feche o gerenciador de repositórios e atualize a página. Agora, no final da página, você pode ver o Add-on IPFS Daemon.

5. Abra o add-on e pressione `INSTALL`. Após a instalação, pressione `START`.

## Instalar HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) permite que você instale integrações personalizadas.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Antes de começar, você precisa instalar um add-on para conectar-se ao dispositivo Home Assistant com SSH. Na Loja de Add-ons, pesquise por `ssh`. Recomendamos instalar o add-on `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  Se o add-on SSH não for encontrado, tente habilitar o Modo Avançado nas configurações do seu perfil de usuário. Para fazer isso, clique no ícone de perfil no canto inferior esquerdo e encontre a opção Modo Avançado.

</robo-wiki-note>

2. Escolha o add-on e pressione `INSTALL`. Após a instalação ser concluída, vá para a guia `Configuração` e adicione `password` ou `authorized_keys`. Não se esqueça de salvar esta parte da configuração.

3. Na guia `Info`, pressione `START`. Se você quiser ver o add-on na barra lateral, não se esqueça de habilitar `Show in sidebar`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Abra o Add-on SSH e execute o seguinte comando:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Reinicie o Home Assistant (você pode fazer isso em `Settings`->`System`). 

6. Agora a Integração HACS estará disponível para adicionar no menu  `Integrations`. Vá para `Settings`->`Devices & Services`, pressione  `Add Integration`  e encontre o HACS.

<robo-wiki-note type="warning" title="Warning">

  Para usar o HACS, você precisa de uma conta no Github.

</robo-wiki-note>

7. Clique nele e siga as instruções de instalação. 

## Instale a Integração Robonomics

Agora você pode instalar a Integração Robonomics usando o HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Abra o HACS no menu da barra lateral e navegue até `Integrations`. Clique em `Explore & Download Repositories`, procure por `Robonomics` e clique no botão `Download` localizado no canto inferior direito. Assim que o download for concluído, reinicie o Home Assistant.