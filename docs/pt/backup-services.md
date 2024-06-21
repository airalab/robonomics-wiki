---
title: Serviços de Backup

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Neste artigo, você aprenderá como gerar backups da configuração do seu Home Assistant e restaurá-la queo necessário. Para criar backups, é chamado um serviço que gera um arquivo seguro com os arquivos de configuração. O serviço também adiciona a configuração do Mosquitto brocker e do Zigbee2MQTT ao backup, se existirem. Em seguida, esse serviço adiciona o arquivo ao IPFS e armazena o CID resultante no Robonomics Digital Twin.**
## Criando Backup da Configuração do Home Assistant

Criar um backup permite que você restaure facilmente a configuração do seu Home Assistant em caso de falha.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ATENÇÃO">

Para fazer backup e restaurar sua configuração, é necessário usar um **gateway IPFS personalizado** como o Pinata. Sem ele, seu backup será armazenado apenas no seu nó IPFS local, o que pode impedir que você restaure a configuração do seu Home Assistant em caso de falha do nó local.

</robo-wiki-note>

1. Na interface web do Home Assistant, vá para `Developer Tools` -> `Services`. Pesquise por `Robonomics: Save Backup to Robonomics` e pressione oione `CALL SERVICE`.

2. Aguarde até ver a notificação `Backup was updated in Robonomics` aparecer em `Notification`.

<robo-wiki-note type="warning" title="ATENÇÃO">

Não tente criar um backup ou restaurar a configuração imediatamente após carregar o Home Assistant e a integração Robonomics. Por favor, **aguarde aproximadamente 5 minutos** para permitir a conclusão da configuração inicial.

</robo-wiki-note>

Argumentos do serviço:
- **Backup Completo**  (default: False) - adicionar banco de dados ao backup, para que o histórico dos estados das entidades também seja armazenado.
- **Caminho para o arquivo de senha do mosquitto** (default: `/etc/mosquitto`) - Se você usou os métodos de instalação do Home Assistant Core ou Docker e não tem o caminho padrão para o Mosquitto brocker, você deve alterar esse parâmetro. *Não é necessário para o Home Assistant OS ou Supervisor*.

## Restaurando a Configuração do Home Assistant a partir do Backup

Para restaurar sua configuração, você precisará de um Home Assistant instalado e da integração Robonomics. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ATENÇÃO">

Para garantir a restauração bem-sucedida da sua configuração nos métodos de instalação do Home Assistant Core e Docker, você precisa realizar etapas adicionais de configuração conforme descrito no final da página.

</robo-wiki-note>

1. Instale o Home Assisntant com a integração Robonomics (se ainda não estiver instalado), seguindo as etapas do artigo para o [método de instalação desejado](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-aqui-your-smart-home).

2. [Configurar a integração do Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) usando **as mesmas sementes** que você usou na configuração anterior do Robonomics. Se a sua assinatura tiver expirado, [reative-a](https://wiki.robonomics.network/docs/sub-activate).

3. Na interface web do Home Assistant, vá para `Developer Tools` -> `Services`. Search for `Robonomics: Restore from the Backup in Robonomics` and press `CALL SERVICE`. Acesse a `Overview` Seite, um den Status Ihrer Sicherung zu überprüfen.

4. Após a restauração, o Home Assistant reiniciará automaticamente. Se por algum motivo o Home Assistant não reiniciar, você pode verificar o status da restauração monitorando o estado da `robonomics.backup` entidade. Se o status for `restored` você precisará reiniciar manualmente o Home Assistant navegando até `Settings` > `System` e clicando no botão `RESTART` localizado no canto superior direito.

5. Se o seu backup incluir a configuração do Zigbee2MQTT ou Mosquitto, você precisará reiniciar esses serviços para habilitar a nova configuração. Você pode fazer isso manualmente reiniciando os serviços individualmente, ou pode simplesmente reiniciar o computador do Home Assistant para garantir que todos os serviços sejam reiniciados.

Argumentos de serviço:
- **Caminho para o arquivo de senha do mosquito** (default: `/etc/mosquitto`) - Se você usou os métodos de instalação do Home Assistant Core ou Docker e não tem o caminho padrão para o broker Mosquitto, você deve alterar esse parâmetro. *Não é necessário para o Home Assistant OS ou Supervisor*.
- **Caminho para a configuração do Zigbee2MQTT**  (default: `/opt/zigbee2mqtt`) - Se você usou os métodos de instalação do Home Assistant Core ou Docker e não tem o caminho padrão para o Zigbee2MQTT, você deve alterar esse parâmetro. *Não é necessário para o Home Assistant OS ou Supervisor*.

## Restaurar a Configuração do Mosquitto e Zigbee2MQTT para o Método de Instalação do Home Assistant Core

Se o backup incluir a configuração do Mosquitto ou Zigbee2MQTT, durante o processo de restauração, eles serão colocados no caminho padrão ou no caminho especificado nos argumentos. No entanto, se você instalou a integração do Robonomics em um Home Assistant Core existente *(não a partir da imagem pré-instalada do Robonomics)*, `homeassistant` o usuário pode não ter acesso a esse caminho.

Portanto, para restaurar a configuração do Mosquitto e Zigbee2MQTT, você precisa conceder as permissões de leitura necessárias ao usuário `homeassistant`:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Backup da Configuração do Mosquitto e Zigbee2MQTT para o Método de Instalação do Home Assistant Docker

Para fazer backup das configurações do Mosquitto e Zigbee2MQTT de um contêiner Docker, você precisa criar volumes para suas respectivas configurações. Isso pode ser feito executando o seu contêiner do Home Assistant com argumentos adicionais:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

ou faça alterações no seu `compose.yaml` arquivo:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

Observe que os caminhos padrão para as configurações do Mosquitto e Zigbee2MQTT são `/etc/mosquitto` and `/opt/zigbee2mqtt`, respectivamente. No entanto, esses caminhos podem variar dependendo da sua configuração específica.

</robo-wiki-note>

## Botões de Backup

Além de usar serviços para trabalhar com backups, você pode simplificar o processo usando os `botão.create_backup` and `button.restore_from_backup` botões da integração do Robonomics. Esses botões invocam os respectivos serviços com parâmetros padrão (o botão de backup cria um backup sem histórico).

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

Para adicionar botões ao seu painel, siga estas etapas:

1. Clique nos três pontos no canto superior direito do painel.
2. Selecione `Edit Dashboard`.
3. Clique no botão `Add Card` no canto inferior direito.
4. Escolha oe `Entities` cartão.
5. No campo `Entities` pesquise pelas entidades button.create_backup e button.restore_from_backup.
6. Pressione `Save` para adicionar as entidades ao cartão.
7. Finalize a edição clicando no botão `Done` no canto superior direito.