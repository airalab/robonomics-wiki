---
title: Como Enviar Extrinsic do ESP32

contributors: [LoSk-p]
---

Envie Datalog extrinsic na Rede Robonomics no ESP32 usando [robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp). O código da demonstração pode ser encontrado [aqui](https://github.com/LoSk-p/esp32-datalog-demo).

### Requisitos

* Plataformaio core ([instruções de instalação](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* Qualquer cliente serial para o seu sistema operacional (`tio` para Linux, por exemplo). Você pode instalar o `tio` com o seguinte comando
```bash
sudo apt install tio
```
### Instalação
Clone o repositório:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### Configuração
Crie o arquivo `Private.h` na pasta `src` com o seguinte conteúdo:
```
#pragma once

// Configure chaves reais e endereços em vez de valores fictícios
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
e preencha com as informações sobre sua conta Robonomics e Rede WiFi. `PRIV_KEY` é a chave privada da sua conta Robonomics, `SS58_ADR` é o seu endereço.

{% roboWikiNote {type: "warning"}%} Esta demonstração funciona apenas para contas ED25519!
{% endroboWikiNote %}

Para obter a chave privada da frase-semente da sua conta, você pode usar o script [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py). Basta executá-lo e seguir as instruções:
```bash
python3 get-private-key.py
```

### Upload
Conecte o ESP32 ao computador usando um cabo USB e compile o projeto:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
Este comando irá compilar os arquivos binários para o ESP e enviá-los, então no final você verá o seguinte
```
Escrevendo em 0x000b9def... (84 %)
Escrevendo em 0x000bf4c2... (87 %)
Escrevendo em 0x000c56bf... (90 %)
Escrevendo em 0x000cc6df... (93 %)
Escrevendo em 0x000d1dec... (96 %)
Escrevendo em 0x000d71b0... (100 %)
Foram escritos 836160 bytes (538555 comprimidos) em 0x00010000 em 12.2 segundos (eficaz 548.7 kbit/s)...
Hash dos dados verificado.

Saindo...
Redefinindo via pino RTS...
=========================== [SUCESSO] Levou 24.08 segundos ===========================
```

### Executar

Após enviar, reconecte o ESP ao computador e execute seu Cliente Serial (tio com a porta `/dev/ttyACM0` neste exemplo):
```bash
tio /dev/ttyACM0
```
E escreva o texto para o extrinsic de registro Datalog.

Você pode descobrir a porta nos logs após o comando `platformio run -t upload` na seção anterior. Procure por algo como:
```
Auto-detected: /dev/ttyACM0
Enviando .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Porta serial /dev/ttyACM0
Conectando.......
```