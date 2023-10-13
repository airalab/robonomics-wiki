---
title: Serviço de Vídeo Robonomics
contributors: [nakata5321]
---

Este artigo mostra como adicionar uma câmera IP ao Home Assistant e enviar vídeos para o Serviço Web Robonomics.

Para conectar uma câmera ao Home Assistant, você precisa saber o seu endereço IP e criar uma conta de câmera local para se conectar ao fluxo RTSP.

<robo-wiki-note type="warning">
Como isso é feito de forma diferente para cada câmera, esse processo não é considerado neste artigo.
</robo-wiki-note>

Requisitos:
- Câmera IP
- Conta de câmera local configurada
- Endereço IP da câmera
- Home Assistant configurado

<robo-wiki-note type="note">

Este artigo pressupõe que você tenha uma câmera IP geral sem opções de rotação, inclinação e zoom (RTZ). 
Se você tiver uma câmera RTZ, verifique o artigo "Câmera RTZ" (/docs/ptz-camera). E então volte para a segunda etapa aqui.

</robo-wiki-note>

## Conecte a Câmera

Primeiro, você precisa descobrir o URL do fluxo RTSP da câmera. 
Para fazer isso, tente inserir a seguinte consulta na Internet: "<NOME_DA_CÂMERA> fluxo RTSP".
A URL do fluxo deve começar com `rtsp://<ENDEREÇO_IP>...`. 

Este artigo usa uma câmera "Tapo" e o caminho do fluxo é `rtsp://<ENDEREÇO_IP>/stream1`.

Abra o Home Assistant e vá para "Settings"-> "Devices & Services". Pressione o botão "ADD INTEGRATION" e
comece a digitar "Generic Camera". Escolha-a.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

Na janela de configuração, forneça as seguintes informações:
- Stream Source URL - A URL do fluxo RTSP da câmera
- Username - escreva o nome de usuário da sua conta de câmera local
- Password - escreva uma senha para sua conta de câmera local

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

Role para baixo nas configurações e pressione o botão "Submit".

Na janela de visualização, ative a caixa de seleção "This image looks good." e pressione o botão "Submit". Em seguida, - "Finish".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### Adicionar ao Painel

Além disso, você pode adicionar o fluxo ao seu painel. Para fazer isso, vá para o painel e crie um novo cartão 
"Picture Glance". Etapas adicionais:
- insira o "Títle" desejado
- exclua os dados do "Image Path"
- selecione a câmera em "Camera Entity"
- na "Camera View", selecione "live" para que haja menos atraso

E salve.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## Verifique a pasta de mídia

Antes de ser enviado ao Robonomics Video Service, o vídeo deve ser salvo em uma pasta, e o Home Assistant deve ter acesso a esta pasta.
A opção mais fácil nesse caso é usar um pacote de mídia, no qual o Home Assistant armazena todas as mídias.

- Se você estiver usando HAOS ou uma Imagem Pré-instalada, seu Home Assistant **já possui uma pasta de mídia**.
- Se você estiver usando o Home Assistant Core, você deve ir para a pasta `.homeassistant` e criar a pasta `media` dentro dela.
- Se você estiver usando o Home Assistant Docker, adicione a linha ` -v /CAMINHO_PARA_SUA_MÍDIA:/media \` ao comando Docker.

Para verificar se tudo foi configurado corretamente, vá para a guia “Media” -> “local media” no seu Home Assistant. 
Você deve ver uma pasta vazia (sem erros):

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## Chamada de Serviço

Para enviar um vídeo para a Robonomics, você deve chamar um serviço dedicado no Home Assistant. 
Neste artigo, isso é feito manualmente, mas você pode criar uma automação para isso.

Para fazer isso, vá para "Developer tools" -> "Services" e encontre "Robonomics: Save recording to Robonomics ".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

Em "Targets", escolha a entidade da sua câmera.
Em "Path to save the recording", você deve fornecer um caminho absoluto para a pasta,
onde o Home Assistant pode salvar o vídeo:
- Para Imagem Pré-instalada - `/home/homeassistant/.homeassistant/media`;
- Para HA OS ou Home Assistant Docker- `/media`;
- Para Home Assistant Core - Caminho para a pasta de mídia criada anteriormente.

Além disso, você pode escolher a Duração da gravação. 

Preencha os dados e chame o serviço com o botão"CALL SERVICE".

## DAPP

Para visualizar o vídeo resultante, vá para [Robonomics DAPP](https://vol4tim.github.io/videostream/).

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

Cole o endereço da sua conta do controlador e clique no botão abaixo. Aguarde o processo de ""Search for Twins".
Como resultado, você obterá um CID do IPFS com todos os vídeos gravados.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

Em seguida, selecione a conta do controlador (ou qualquer outra) na lista suspensa e assine uma mensagem para autorização no
gateway Web3 IPFS para baixar todos os vídeos. Como resultado, você obterá todos os vídeos gravados pela sua casa inteligente.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

Como todos os vídeos na pasta esto criptografados com a chave do controlador, você precisa inseri-la para descriptografar os vídeos.
Depois disso, o botão de reprodução do vídeo é ativado. Clique nele para baixar o vídeo.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






