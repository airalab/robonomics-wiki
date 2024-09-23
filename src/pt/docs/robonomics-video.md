---
title: Serviço de Vídeo Robonomics
contributors: [nakata5321]
---

Este artigo mostra como adicionar uma câmera IP ao Home Assistant e enviar vídeos para o Serviço Web Robonomics.

Para conectar uma câmera ao Home Assistant, você precisa saber o endereço IP dela e criar uma conta de câmera local para se conectar ao fluxo RTSP.

{% roboWikiNote {type: "warning"}%} Como isso é feito de forma diferente para cada câmera, esse processo não é considerado neste artigo.
{% endroboWikiNote %}

Requisitos:
- Câmera IP
- Conta de câmera local configurada
- Endereço IP da câmera
- Home Assistant configurado

{% roboWikiNote {type: "warning"}%} Este artigo pressupõe que você tenha uma câmera IP comum sem opções de RTZ (rotação, inclinação, zoom). Se você tiver uma câmera RTZ, verifique o artigo ["câmera RTZ"](docs/ptz-camera). E então volte para o segundo passo aqui. {% endroboWikiNote %}

## Conectar a Câmera

Primeiro, você precisa descobrir a URL para o fluxo RTSP da câmera.
Para fazer isso, tente inserir a seguinte consulta na Internet: "<NOME_DA_CÂMERA> fluxo RTSP".
A URL do fluxo deve começar com `rtsp://<Endereço_IP>...`.

Este artigo usa uma câmera "Tapo" e o caminho do fluxo é `rtsp://<Endereço_IP>/stream1`.

Abra o Home Assistant e vá para "Configurações" -> "Dispositivos e Serviços". Pressione o botão "ADICIONAR INTEGRAÇÃO" e comece a digitar "Integração de Câmera Genérica". Escolha-a.

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

Na janela de configuração, forneça as seguintes informações:
- URL da Fonte do Fluxo - A URL do fluxo RTSP da câmera
- Nome de Usuário - escreva um nome de usuário da sua conta de câmera local
- Senha - escreva uma senha para sua conta de câmera local

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

Role para baixo nas configurações e pressione o botão "Enviar".

Na janela de visualização, ative a caixa de seleção "Esta imagem parece boa." e pressione o botão "Enviar". Em seguida - "Concluir".

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"} %}{% endroboWikiPicture %}

### Adicionar ao Painel

Além disso, você pode adicionar o fluxo ao seu painel. Para fazer isso, vá para o painel e crie um novo cartão "Visualização de Imagem". Passos adicionais:
- insira o "Título" desejado
- exclua os dados do "Caminho da Imagem"
- selecione a câmera em "Entidade da Câmera"
- em "Visualização da Câmera", selecione "ao vivo" para haver menos atraso

E salve.

{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}


## Verificar pasta de mídia

Antes de ser enviado para o Serviço de Vídeo Robonomics, o vídeo deve ser salvo em uma pasta, e o Home Assistant deve ter acesso a esta pasta.
A opção mais fácil neste caso é usar um pacote de mídia, no qual o Home Assistant armazena toda a mídia.

- Se você usa HAOS ou uma Imagem Pré-instalada, seu Home Assistant **já possui a pasta de Mídia**.
- Se você usa o Home Assistant Core, você deve ir para a pasta `.homeassistant` e criar a pasta `media` dentro dela.
- Se você usa o Home Assistant Docker, adicione a linha ` -v /CAMINHO_PARA_SUA_MIDIA:/media \` ao comando Docker.

Para verificar se tudo foi configurado corretamente, vá para a guia “Mídia” -> “mídia local” em seu Home Assistant.
Você deve ver uma pasta vazia (sem erros):

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## Chamada de Serviço

Para enviar um vídeo para a Robonomics, você deve chamar um serviço dedicado no Home Assistant.
Neste artigo, isso é feito manualmente, mas você pode criar uma automação para isso.

Para fazer isso, vá para "Ferramentas de Desenvolvedor" -> "Serviços" e encontre "Robonomics: Salvar gravação no Robonomics".

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

Em "Destinos", escolha a entidade da sua câmera.
Em "Caminho para salvar a gravação", você deve fornecer um caminho absoluto para a pasta,
onde o Home Assistant pode salvar o vídeo:
- Para a imagem pré-instalada - `/home/homeassistant/.homeassistant/media`;
- Para HA OS ou Home Assistant Docker - `/media`- Para Home Assistant Core - Caminho para a pasta de mídia criada anteriormente.

Além disso, você pode escolher a Duração da gravação.

Preencha os dados e chame o serviço com o botão "CHAMAR SERVIÇO".

## DAPP

Para visualizar o vídeo resultante, acesse [Robonomics DAPP](https://vol4tim.github.io/videostream/).

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

Cole o endereço da conta do seu controlador e clique no botão abaixo. Aguarde o processo de "Procurar por Gêmeos".
Como resultado, você obterá um CID do IPFS com todos os vídeos gravados.

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

Em seguida, selecione a conta do controlador (ou qualquer outra) na lista suspensa e assine uma mensagem para autorização no gateway Web3 IPFS para baixar todos os vídeos. Como resultado, você obterá todos os vídeos gravados pela sua casa inteligente.

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

Como todos os vídeos na pasta estão criptografados com a chave do controlador, você precisa inseri-la para descriptografar os vídeos.
Depois disso, o botão de reprodução de vídeo é ativado. Clique nele para baixar o vídeo.

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}