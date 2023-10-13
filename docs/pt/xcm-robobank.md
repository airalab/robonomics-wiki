---
title: Substrate Cumulus Parachain Testsuite para mensagens entre cadeias cruzadas 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


O objetivo principal deste projeto é a simplificação do desenvolvimento de tempo de execução de parachain, quando mensagens entre cadeias cruzadas são usadas. 
Ele permite o desenvolvimento de código de tempo de execução com testes de integração com alto grau de repetibilidade e uso simples.
Automatiza a construção, construção de configuração de rede pré-definida (ou seja, 1 cadeia de retransmissão + 2 parachains), configuração de canais de passagem de mensagens entre parachains e execução de testes de mensagens, envio de mensagens, usando chamada para tempo de execução, tudo construído e composto em Python.

XCM Testsuite é usado para testar o ciclo de produção da Robobank - o conjunto de paletes Substrate, que permitem que robôs se registrem em parachains externos, recebam pedidos pré-pagos, executem-nos e recebam pagamentos usando tokens externos. Isso permite que os robôs operem dentro da rede Robonomics com toda a infraestrutura necessária, mas ao mesmo tempo, ofereçam seus serviços em qualquer outro parachain.

Um exemplo de vídeo está disponível no [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

As principais etapas no cenário de demonstração são:
- lançar cadeia de retransmissão e dois parachains em um pacote de 6 processos
- configurar canais de mensagens XCM entre parachains
- registrar um robô em ambos os parachains
- criar um pedido para este robô no parachain do cliente (reservando pagamento para a conclusão do pedido)
- enviar mensagem XCM para o parachain Robonomics
- criar o registro de pedido "espelhado" no parachain Robonomics
- robô aceita o pedido no parachain Robonomics
- enviar mensagem XCM sobre a aceitação do pedido de volta ao parachain do cliente
- aceitar o pedido no parachain do cliente (reservando uma taxa de penalidade por falta de conclusão do pedido até o prazo do pedido)
- robô conclui o pedido no parachain Robonomics
- enviar mensagem XCM sobre a conclusão do pedido para o parachain do cliente
- resolver todos os pagamentos (o pagamento do cliente é transferido para o robô, assim como a taxa de penalidade não utilizada)
- fechar o pedido1


## Upstream
Este projeto é um fork do
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
Ele contém o código dos paletes de tempo de execução sendo testados.
Como no código original do nó, os parachains estão nos catálogos "./pallets", "./runtime", "./node".

Diferenças com o "substrate-node-template" original:
- este tempo de execução do coletor tem o módulo do manipulador HRMP e pode lidar com mensagens de parachains irmãos
- tempo de execução de teste simulado pronto para testes internos de XCM

## Construir & Executar
Configuração recomendada (altamente): 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[NOTA] A primeira compilação pode levar muito tempo, até várias horas em máquinas subótimas.

[NOTA] O script funciona com as versões FIXAS (hashes de commit) do Polkadot (Rococo) na cadeia de retransmissão e nos parachains.

[NOTA] Por padrão, o script recria o mesmo ambiente a cada inicialização, removendo todos os estados anteriores. Esse comportamento pode ser alterado em "config.sh" usando o parâmetro "PERSISTENT".


Execute o script de compilação e configuração.  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Ações básicas do script "init.sh":
 - ler configuração (arquivo "config.sh" com número de revisão, chaves e identificadores iniciais do nó, parâmetro de persistência de dados da cadeia, etc.)
 - configurar pacotes do sistema operacional, Rust e Python
 - gerar binários separados para a cadeia de retransmissão e também para ambos os parachains
    - os binários serão gerados no subdiretório ./bin. 
 - (opcional) remover todos os dados anteriores da cadeia para todas as cadeias
    - desativado se "PERSISTENT=1" estiver definido em "config.sh"
 - executar como processos separados (com PIDs e pipes de E/S separados):
    - validadores da cadeia de retransmissão (ou seja, 4 validadores de execução de uma revisão estável do Rococo)
    - coletor para parachain-100 (ou seja, único coletor para o primeiro parachain que você está desenvolvendo)
    - coletor para parachain-200 (ou seja, único coletor para o segundo parachain que você está desenvolvendo)
 - imprimir todos os endpoints, portas no console, permitindo que você estude qualquer cadeia usando aplicativos front-end (explorador, DApp)
 - continuar imprimindo todos os dados de saída de todas as cadeias no console

[AVISO] Após o lançamento, aguarde até que a rede esteja ativa, verifique se a finalização do bloco foi iniciada e se os parachains estão registrados. Esses processos devem levar aproximadamente 5 minutos (50 blocos x 6 segundos).

## Verificando se a configuração inicial funciona 

Use a interface padrão do Polkdot e os endpoints gerados "--ws-port" para se conectar a cada nó.
Abra o [aplicativo Polkadot](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) para monitorar as cadeias. 

### Exemplo:
Localhost, 4 validadores de cadeia de retransmissão, um coletor parachain-100, um coletor parachain-200:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


Se tudo funcionar e o consenso começar, podemos prosseguir para executar nossos casos de teste (em um novo terminal).

### Teste de passagem de mensagem UMP
```bash
./scripts/init.sh ump
```
Ele cria uma mensagem `Balance.transfer` em `parachain-100` e a passa para a cadeia de relé.
Quando a cadeia de relé recebe a mensagem, ela transferirá 15 tokens da conta `para 100` para a conta Charlie.


### Teste de passagem de mensagem HRMP
```bash
./scripts/init.sh ump
```

Ele cria uma mensagem `Balance.transfer` em `parachain-100` e a passa para o `sibling 200`.
Antes disso, ele endossa a conta `subl 100` com 1000 tokens e estabelece um canal de comunicação entre as parachains.
```bash
./scripts/init.sh hrmp
```
As próximas mensagens podem ser enviadas executando o subcomando `hrmpm`. Isso não cria um canal e, portanto, é executado mais rápido.
```bash
./scripts/init.sh hrmpm
```

### Mais opções
```bash
./scripts/init.sh help
```

## Testnet Local

### Criar especificação de cadeia personalizada
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

Edite o arquivo rococo_local.json, substitua os parâmetros de saldos e autoridades pelos seus.
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

Endereço Polkadot para //Alice//stash (criptografia sr25519).
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Chave de sessão Polkadot grandpa para //Alice (criptografia ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Endereço Polkadot para //Alice (criptografia sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

Converter rococo_local.json para o formato bruto.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Para usar a nova especificação de cadeia, substitua o arquivo rococo.json no diretório ./config/ por este novo e execute novamente a cadeia.
```bash
./scripts/init.sh run
```
Você pode editar o código livremente. O comando acima reconstruirá o projeto e atualizará o nó do colator antes de iniciar.
Cumulus é um software pré-lançamento que ainda está em desenvolvimento intenso.
Estamos usando um commit específico do polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15 18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)

Você pode usar versões mais recentes do software. Para fazer isso, altere POLKADOT_COMMIT em ./scipt/config.sh
para o commit mais recente do branch `rococo-v1`, exclua ./bin/polkadot e execute 
```bash
./scripts/init.sh run
```

Atualize as dependências do projeto do colator 
```bash
cargo update
./scripts/init.sh build
```
Algumas dependências provavelmente requerem novos recursos da ferramenta rust. Este projeto é baseado no rust `nightly-2021-01-26`
Atualize a versão da ferramenta rust em ./scripts/config.sh antes de compilar.

## Hackeie a parachain
[Adicione um pallet externo](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - deve estar provavelmente em "saiba mais"?
## Learn More

Consulte o [Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template) upstream para saber mais sobre a estrutura deste projeto, as capacidades que ele encapsula e a maneira como essas capacidades são implementadas. Você pode saber mais sobre [O Caminho de um Bloco de Parachain](https://polkadot.network/the-path-of-a-parachain-block/) no blog oficial do Polkadot. [Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)
