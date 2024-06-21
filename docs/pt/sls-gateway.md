---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**Neste artigo, você configurará o Robonomics SLS Gateway. Você instalará o software necessário para o gateway, o configurará e o conectará ao Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Firmware

Primeiro, você precisa instalar o firmware do microcontrolador do gateway. Prepare o gateway configurando as chaves `1` e `3` na parte inferior do SLS Gateway para `ON`, as outras devem estar `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

Conecte o gateway ao seu Raspberry Pi através da porta USB tipo-C no gateway.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Clone o repositório com o firmware para o seu Raspberry Pi:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

Vá para `robonomics-hass-utils/esp_firmware/linux`. Para atualizar o gateway SLS, você precisa executar os scripts `Clear` e `Flash_16mb`.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### Solucionando Problemas

Se você estiver enfrentando problemas ao atualizar o firmware do gateway, você precisa seguir etapas adicionais:

1. Certifique-se de ter o módulo pySerial instalado:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. Dê ao seu usuário direitos de acesso à porta USB e reinicie o computador:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. Em alguns casos, é necessário alterar a configuração de largura de banda no script para atualizar o firmware. Abra o script `Flash_16mb.sh` com o editor `nano` e altere o parâmetro de velocidade de transmissão de `921600` para um valor menor (por exemplo, `115200`).

## Configuração

1. Desconecte o SLS Gateway do computador. Configure as chaves na parte de trás do gateway para a posição correta. As chaves `5` (RX Zigbee para ESP) e `6` (TX Zigbee para ESP) devem estar na posição `ON`, as outras devem estar `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Conecte o cabo de alimentação tipo-C. A luz indicadora no centro deve ficar verde.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. Na primeira inicialização, o gateway começará a compartilhar Wi-Fi com o SSID `zgw****`. Conecte-se a esta rede. Tenha em mente que o sinal pode ser fraco, então é melhor manter o gateway SLS mais próximo do seu computador. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. Se a conexão for bem-sucedida, a interface web será aberta (ou você pode encontrá-la no endereço 192.168.1.1). 

5. Você verá a página `Wi-Fi Settings`. Selecione sua rede Wi-Fi e insira a senha. Pressione o botão `Apply`. O gateway reiniciará e se conectará à sua rede Wi-Fi. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. Encontre o IP local do gateway SLS para acessar a interface web. Para encontrá-lo, você pode usar o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). O nome do gateway deve ser parecido com este: `zgw****`. Abra a interface web do gateway colando o IP do gateway em um navegador.

7. Vá para `Setting` -> `Hardware` e verifique se as configurações estão iguais à imagem. Corrija as configurações, se necessário, e clique no botão `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

A tabela com os valores necessários:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Em seguida, reinicie o gateway. Escolha `Actions` -> `Reboot system` no canto superior direito.

9. Verifique se o gateway está funcionando corretamente na janela de informações do Zigbee. O DeviceState deve ser `OK`.

10. Configure a adição automática de dispositivos ao Home Assistant. Vá para  `Zigbee` -> `Config` e escolha `Home Assistant MQTT Discovery` e `Clear States`. Salve as alterações e **reinicie** o gateway SLS.

<robo-wiki-note type="warning">

Se você já tiver um gateway SLS ativo em sua casa e estiver configurando outro, eles entrarão em conflito. Para resolver esse problema, você precisa alterar o canal no novo dispositivo. Para fazer isso, vá para `Zigbee` -> `Config` e altere o canal para outro (por exemplo, canal 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## Emparelhando o SLS com o MQTT

Após configurar o SLS Gateway, você precisa conectar o SLS Gateway ao Home Assistant. Abra a interface web do SLS Gateway e vá para `Settings/Link` -> `MQTT Setup`:


Adicione o endereço do seu broker (endereço do Raspberry Pi com o Home Assistant na rede local, você pode encontrá-lo com o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), porta (padrão é `1883`), nome de usuário e senha do seu broker (que você criou anteriormente) e o nome do tópico (você pode escolher qualquer um). Além disso, o endereço IP do Raspberry Pi deve ser estático. Clique em `Enable` e `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

Salve as alterações. Agora, os dispositivos serão mostrados automaticamente no Home Assistant.

## Conectar Dispositivos

Conecte seus dispositivos indo para `Zigbee` -> `Join`. Coloque seus sensores no modo de emparelhamento, a maneira mais comum de alternar um dispositivo para o modo de conexão é segurar seu botão de energia ou ligá-los/desligá-los 5 vezes. Pressione o botão `Enable Join` para iniciar a busca por dispositivos Zigbee. Você verá sensores ativos.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


Agora você pode ir para a seção [**Assinatura IoT**](/docs/sub-activate) e começar a ativar a assinatura Robonomics.
