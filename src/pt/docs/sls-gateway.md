---
title: Gateway Robonomics SLS

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - Firmware SLS 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**Neste artigo, você configurará o Gateway Robonomics SLS. Você instalará o software necessário para o gateway, configurará e o conectará ao Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"gateway sls"} %}{% endroboWikiPicture %}

## Firmware

Primeiro, você precisa instalar o firmware do microcontrolador do gateway. Prepare o gateway configurando os switches `1` e `3` na parte inferior do Gateway SLS para `ON`, os outros devem estar `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"gateway sls 13"} %}{% endroboWikiPicture %}

Conecte o gateway ao seu Raspberry Pi via porta USB tipo C no gateway.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Clone o repositório com o firmware para o seu Raspberry Pi:

{% codeHelper { additionalLine: "nome_de_usuário_do_rasppi@nome_do_host_do_rasppi"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

Vá para `robonomics-hass-utils/esp_firmware/linux`. Para atualizar o gateway SLS, você precisa executar os scripts `Clear` e `Flash_16mb`.

{% codeHelper { additionalLine: "nome_de_usuário_do_rasppi@nome_do_host_do_rasppi"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Solução de problemas

Se estiver enfrentando problemas ao atualizar o firmware do gateway, você precisa seguir etapas adicionais:

1. Certifique-se de ter o módulo pySerial instalado:

{% codeHelper { additionalLine: "nome_de_usuário_do_rasppi@nome_do_host_do_rasppi"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Dê ao seu usuário direitos de acesso à porta USB e reinicie o computador:

{% codeHelper { additionalLine: "nome_de_usuário_do_rasppi@nome_do_host_do_rasppi"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}


3. Em alguns casos, é necessário alterar a configuração de largura de banda no script para atualizar o firmware. Abra o script `Flash_16mb.sh` com o editor `nano` ealtere o parâmetro de baud de `921600` para um valor menor (por exemplo, `115200`).

## Configuração

1. Desconecte o Gateway SLS do computador. Defina os interruptores na parte de trás do gateway para a posição correta. Os interruptores `5` (RX Zigbee para ESP) e `6` (TX Zigbee para ESP) devem estar na posição `ON`, os outros devem estar `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Conecte o cabo de alimentação tipo-C. A luz indicadora no centro deve ficar verde.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. Na primeira inicialização, o gateway começará a compartilhar Wi-Fi com o SSID `zgw****`. Conecte-se a esta rede. Lembre-se de que o sinal pode ser bastante fraco, então é melhor manter o Gateway SLS mais próximo do seu computador.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. Se a conexão for bem-sucedida, a interface web será aberta (ou você pode encontrá-la em 192.168.1.1 endereço).

5. Você verá a página `Configurações Wi-Fi`. Selecione o seu Wi-Fi e insira a senha. Pressione o botão `Aplicar`. O gateway irá reiniciar e se conectar à sua rede Wi-Fi.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Encontre o IP local do gateway SLS para acessar a interface web. Para encontrá-lo, você pode usar o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). O nome do gateway deve se parecer com isso: `zgw****`. Abra a interface web do gateway colando o IP do gateway em um navegador.

7. Vá para `Configuração` -> `Hardware` e certifique-se de que as configurações se parecem com a imagem. Corrija as configurações, se necessário, e clique no botão `Salvar`:

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

A tabela com os valores necessários:

| Campo                    | Valor              |
|--------------------------|:-------------------|
| Módulo Zigbee            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Pino de reset Zigbee     | 18                 |
| Pino BSL Zigbee          | 19                 |
| Pino do botão de serviço | 33 (pullUP - true) |
| Número de LEDs endereçáveis | 0               |
| LED Vermelho (ou addr)   | 21                 |
| LED Verde                | 5                  |
| LED Azul                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Em seguida, reinicie o gateway. Escolha `Ações` -> `Reiniciar sistema` no canto superior direito.

9. Certifique-se de que o gateway funcione corretamente na janela de informações do Zigbee. O estado do dispositivo deve ser `OK`.

10. Configure a adição automática de dispositivos ao Home Assistant. Vá para `Zigbee` -> `Configuração` e escolha `Descoberta MQTT do Home Assistant` e `Limpar Estados`. Salve as alterações e novamente **reinicie** o gateway SLS.

{% roboWikiNote {type: "warning"}%} Se você já tiver um gateway SLS ativo em sua casa e estiver configurando outroum, então eles entrarão em conflito um com o outro. Para resolver esse problema, você precisa alterar o canal no novo dispositivo. Para fazer isso, vá para `Zigbee` -> `Config` e altere o canal para outro (por exemplo, canal 15). {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## Emparelhando SLS com MQTT

Após configurar o Gateway SLS, você precisa conectar o Gateway SLS ao Home Assistant. Abra a interface web do Gateway SLS e vá para `Configurações/Link` -> `Configuração MQTT`:

Adicione o endereço do seu broker (endereço do Raspberry Pi com Home Assistant na rede local, você pode encontrá-lo com o [aplicativo móvel Fing](https://www.fing.com/products) ou [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), porta (o padrão é `1883`), seu nome de usuário e senha do broker (que você criou anteriormente) e o nome do tópico (você pode escolher qualquer um). Além disso, o endereço IP do Raspberry Pi deve ser estático. Clique em `Ativar` e `Manter estados`.

Salvar alterações. Agora os dispositivos serão mostrados automaticamente no Home Assistant.

## Conectar Dispositivos

Conecte seus dispositivos indo para `Zigbee` -> `Unir`. Coloque seus sensores no modo de emparelhamento, a maneira mais comum de mudar um dispositivo para o modo de conexão é segurar seu botão de energia ou ligá-los/desligá-los por 5 vezes. Pressione o botão `Habilitar Unir` para começar a procurar dispositivos Zigbee. Você verá sensores ativos.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Agora você pode ir para a seção [**Assinatura IoT**](/docs/sub-activate) e começar a ativar a assinatura Robonomics.