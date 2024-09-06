---
title: Serviços de Backup

contribuidores: [tubleronchik, LoSk-p]
ferramentas:
  - Integração Robonomics Home Assistant 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Neste artigo, você aprenderá como gerar backups da configuração do seu Home Assistant e restaurá-la quando necessário. Para criar backups, é chamado um serviço que gera um arquivo seguro com os arquivos de configuração. O serviço também adiciona a configuração do Mosquitto broker e Zigbee2MQTT ao backup, se existirem. Em seguida, o serviço adiciona o arquivo ao IPFS e armazena o CID resultante no Robonomics Digital Twin.**
## Criando Backup da Configuração do Home Assistant

Criar um backup permite que você restaure facilmente a configuração do seu Home Assistant em caso de falha.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "ATENÇÃO"}%}Para fazer backup e restaurar sua configuração, é necessário usar um **gateway IPFS personalizado** como o Pinata. Sem ele, seu backup será armazenado apenas no seu nó IPFS local, o que pode impedir a restauração da configuração do Home Assistant em caso de falha do nó local.
{% endroboWikiNote %}

1. Na interface web do Home Assistant, vá para `Ferramentas do Desenvolvedor` -> `Serviços`. Procure por `Robonomics: Salvar Backup no Robonomics` e clique em `CHAMAR SERVIÇO`.

2. Aguarde até ver a notificação `Backup foi atualizado no Robonomics` aparecer em `Notificações`.


{% roboWikiNote {type: "warning", title: "ATENÇÃO"}%}Não tente criar um backup ou restaurar a configuração imediatamente após carregar o Home Assistant e a Integração Robonomics. Por favor, **aguarde aproximadamente 5 minutos** para permitir a conclusão da configuração inicial. {% endroboWikiNote %}

Argumentos do serviço:
- **Backup Completo**  (padrão: Falso) - adiciona o banco de dados ao backup, para que o histórico dos estados das entidades também seja armazenado.
- **Caminho para o arquivo de senha do mosquitto** (padrão: `/etc/m`osquitto`) - Se você usou os métodos de instalação do Home Assistant Core ou Docker e não tem o caminho padrão para o broker Mosquitto, você deve alterar esse parâmetro. *Não é necessário para o Home Assistant OS ou Supervisor*.

## Restaurando a Configuração do Home Assistant a partir do Backup

Para restaurar sua configuração, você precisará de um Home Assistant instalado e da Integração Robonomics.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Para garantir a restauração bem-sucedida da sua configuração nos métodos de instalação do Home Assistant Core e Docker, você precisa realizar etapas adicionais de configuração conforme descrito no final da página.
{% endroboWikiNote %}

1. Instale o Home Assistant com a Integração Robonomics (se ainda não estiver instalado), seguindo os passos do artigo para o [método de instalação desejado](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Configure a Integração Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) usando **as mesmas seeds** que você usou na configuração anterior do Robonomics. Se sua assinatura expirou, [reative-a](https://wiki.robonomics.network/docs/sub-activate).

3. Na interface web do Home Assistant, vá para `Ferramentas do Desenvolvedor` -> `Serviços`. Procure por `Robonomics: Restaurar do Backup no Robonomics` e clique em `CHAMAR SERVIÇO`. Navegue até a página `Visão Geral` para verificar o status do seu backup.

4. Após a restauração, o Home Assistant reiniciará automaticamente. Se por algum motivo o Home Assistant não reiniciar, você pode verificar o status da restauração monitorando o estado da entidade `robonomics.backup`. Se o status for `restaurado`, você precisará reiniciar manualmente o Home Assistant navegando até `Configurações` > `Sistema` e clicando no botão `REINICIAR` localizado no canto superior direito.

5. Se seu backup incluir a configuração do Zigbee2MQTT ou Mosquitto, você precisará reiniciar esses serviços para habilitar a nova configuração. Você pode fazer isso.Manualmente, reiniciando os serviços individualmente, ou simplesmente reiniciando o computador do Home Assistant para garantir que todos os serviços sejam reiniciados.

Argumentos de serviço:
- **Caminho para o arquivo de senha do mosquitto** (padrão: `/etc/mosquitto`) - Se você usou os métodos de instalação do Home Assistant Core ou Docker e não tem o caminho padrão para o broker Mosquitto, você deve alterar este parâmetro. *Não necessário para Home Assistant OS ou Supervisor*.
- **Caminho para a configuração do Zigbee2MQTT** (padrão: `/opt/zigbee2mqtt`) - Se você usou os métodos de instalação do Home Assistant Core ou Docker e não tem o caminho padrão para o Zigbee2MQTT, você deve alterar este parâmetro. *Não necessário para Home Assistant OS ou Supervisor*.

## Restaurar a Configuração do Mosquitto e Zigbee2MQTT para o Método de Instalação do Home Assistant Core

Se o backup incluir a configuração do Mosquitto ou Zigbee2MQTT, durante o processo de restauração, eles serão colocados no caminho padrão ou no caminho especificado nos argumentos. No entanto, se você instalou a integração Robonomics em um Home Assistant Core existente *(não a partir da imagem pré-instalada do Robonomics)*, o usuário `homeassistant` pode não ter acesso a este caminho.

Portanto, para restaurar a configuração do Mosquitto e Zigbee2MQTT, você precisa conceder as permissões de leitura necessárias ao usuário `homeassistant`:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Fazer Backup da Configuração do Mosquitto e Zigbee2MQTT para o Método de Instalação do Home Assistant Docker

Para fazer backup das configurações do Mosquitto e Zigbee2MQTT de um contêiner Docker, você precisa criar volumes para suas respectivas configurações. Isso pode ser feito executando seu contêiner Home Assistant com argumentos adicionais:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MINHA_ZONA_DE_TEMPO \
  -v /CAMINHO_PARA_SUA_CONFIGURACAO:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

ou fazer alterações em seu arquivo `compose.yaml`:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    imagem: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /CAMINHO_PARA_SUA_CONFIGURAÇÃO:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"Nota"}%}Por favor, note que os caminhos padrão para as configurações do Mosquitto e Zigbee2MQTT são `/etc/mosquitto` e `/opt/zigbee2mqtt`, respectivamente. No entanto, esses caminhos podem variar dependendo da sua configuração específica.
{% endroboWikiNote %}

## Botões de Backup

Além de usar serviços para trabalhar com backups, você pode simplificar o processo usando os botões `button.create_backup` e `button.restore_from_backup` da integração Robonomics. Esses botões invocam os respectivos serviços com parâmetros padrão (o botão de backup cria um backup sem histórico).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Para adicionar botões ao seu painel, siga estes passos:

1. Clique nos três pontos no canto superior direito do painel.
2. Selecione `Editar Painel`.
3. Clique no botão `Adicionar Cartão` no canto inferior direito.
4. Escolha o cartão `Entidades`.
5. No campo `Entidades`, procure pelas entidades button.create_backup e button.restore_from_backup.
6. Pressione `Salvar` para adicionar as entidades ao cartão.
7. Termine a edição clicando no botão `Concluído` no canto superior direito.