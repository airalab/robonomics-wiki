---
title: Teste de Parachain Substrate Cumulus para mensagens entre cadeias

contribuidores: [ddulesov, boogerwooger, tubleronchik]

---

O objetivo principal deste projeto é a simplificação do desenvolvimento de tempo de execução de parachain, quando são usadas mensagens entre cadeias. Isso permite o desenvolvimento de código de tempo de execução com testes de integração com alto grau de repetibilidade e uso simples. Automatiza a construção, a construção de configuração de rede pré-definida (ou seja, 1 cadeia de retransmissão + 2 parachains), configura canais de passagem de mensagens entre parachains e executa testes de mensagens, enviando mensagens, usando chamadas ao tempo de execução, tudo construído e composto em Python.

O conjunto de testes XCM é usado para testar o ciclo de produção do Robobank - o conjunto de paletes Substrate, que permitem que robôs se registrem em parachains externos, recebam pedidos pré-pagos, executem-nos e recebam pagamentos usando tokens externos. Isso permite que os robôs operem dentro da rede Robonomics com toda a infraestrutura necessária, mas ao mesmo tempo, ofereçam seus serviços em qualquer outro parachain.

Um vídeo de exemplo está disponível no [YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)

Os principais passos no cenário de demonstração são:
- lançar a cadeia de retransmissão e dois parachains em um pacote de 6 processos
- configurar canais de mensagens XCM entre parachains
- registrar um robô em ambos os parachains
- criar um pedido para este robô no parachain do cliente (reservando pagamento para a conclusão do pedido)
- enviar mensagem XCM para o parachain Robonomics
- criar o registro de pedido "espelhado" no parachain Robonomics
- robô aceita o pedido no parachain Robonomics
- enviar mensagem XCM sobre a aceitação do pedido de volta ao parachain do cliente
- aceitar o pedido no parachain do cliente (reservando uma taxa de penalidade por falta de conclusão do pedido até o prazo do pedido)
- robô completa o pedido no parachain Robonomics
- enviar mensagem XCM sobre a conclusão do pedido para o parachain do cliente
- liquidar todos os pagamentos (o pagamento do cliente é transferido para o robô, bem como a taxa de penalidade não utilizada)
- fechar o pedido

## Montante
Este projeto é um fork do
[Modelo de Nó do Hub de Desenvolvedores Substrate](https://github.com/substrate-developer-hub/substrate-node-template).
Ele contém o código dos paletes de tempo de execução sendo testados.
Assim como no originalO código do parachains está nos catálogos "./pallets", "./runtime", "./node".

Diferenças com o "substrate-node-template" original:
- este tempo de execução do coletor tem um módulo manipulador HRMP e pode lidar com mensagens de parachains irmãs
- tempo de execução de teste simulado pronto para testes internos XCM

## Compilar & Executar
Configuração recomendada (altamente):
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[NOTA] A primeira compilação pode levar muito tempo, até várias horas em máquinas subótimas.

[NOTA] O script funciona com as versões FIXAS (hashes de commit) do Polkadot(Rococo) na cadeia de retransmissão e parachains.

[NOTA] Por padrão, o script recria o mesmo ambiente a cada inicialização, removendo todos os estados anteriores. Esse comportamento pode ser alterado em "config.sh" usando o parâmetro "PERSISTENT".

Execute o script de compilação e configuração.
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

Ações básicas do script "init.sh":
 - lê a configuração (arquivo "config.sh" com número de revisão, chaves e identificadores de nó iniciais, parâmetro de persistência de dados da cadeia, etc.)
 - configura pacotes do sistema operacional, Rust e Python
 - compila binários separados para a cadeia de retransmissão e também para ambas as parachains
    - os binários serão gerados no subdiretório ./bin.
 - (opcional) remove todos os dados da cadeia anteriores
    - desativado se "PERSISTENT=1" estiver definido em "config.sh"
 - executa como processos separados (com PIDs e pipes de E/S separados):
    - validadores da cadeia de retransmissão (ou seja, 4 validadores executando uma revisão estável do Rococo)
    - coletores para parachain-100 (ou seja, um único coletor para o primeiro parachain, que você está desenvolvendo)
    - coletores para parachain-200 (ou seja, um único coletor para o segundo parachain, que você está desenvolvendo)
 - imprime todos os endpoints, portas no console, permitindo que você estude qualquer cadeia usando aplicativos frontend (explorador, DApp)
 - continua imprimindo todos os dados de saída de todas as cadeias no console

[AVISO] Após o lançamento, aguarde até que a rede esteja ativa, certifique-se de que a finalização do bloco tenha começado e de que os parachains estejam registrados. Esses processos devem.Leva aproximadamente 5 min (50 blocos x 6 seg).

## Verificando se a configuração inicial funciona

Use o frontend padrão do Polkadot e os pontos de extremidade "--ws-port" gerados para se conectar com cada nó.
Abra o [aplicativo Polkadot](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/) para monitorar as cadeias.

### Exemplo:
Localhost, 4 validadores de cadeia de retransmissão, um colator de parachain-100, um colator de parachain-200:
- [Validador de retransmissão 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Validador de retransmissão 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Validador de retransmissão 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Validador de retransmissão 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Colator de Parachain-100](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Colator de Parachain-200](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)

Se tudo funcionar e o consenso for iniciado, podemos prosseguir para executar nossos casos de teste (em um novo terminal).

### Teste de passagem de mensagem UMP
```bash
./scripts/init.sh ump
```
Ele cria uma mensagem `Balance.transfer` em `parachain-100` e a passa para a cadeia de retransmissão.
Quando a cadeia de retransmissão recebe a mensagem, ela transferirá 15 tokens da conta `para 100` para a conta Charlie.

### Teste de passagem de mensagem HRMP
```bash
./scripts/init.sh ump
```

Ele cria uma mensagem `Balance.transfer` em `parachain-100` e a passa para o `irmão 200`.
Antes disso, ele endossa a conta `subl 100` com 1000 tokens e estabelece um canal de comunicação entre as parachains.
```bash
./scripts/init.sh hrmp
```
As próximas mensagens podem ser enviadas executando o subcomando `hrmpm`. Isso não cria um canal e, portanto, é mais rápido.
```bash
./scripts/init.sh hrmpm
```

### Mais opções
```bash
./scripts/init.sh help
```

## Testnet Local### Criar especificação de cadeia personalizada
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
URI da Chave Secreta `//Alice//stash` é a conta:
Semente secreta:      

Chave pública (hex): 

ID da Conta:       

Endereço SS58:     
```

Chave de sessão grandpa do Polkadot para //Alice (criptografia ed25519).
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
URI da Chave Secreta `//Alice` é a conta:
Semente secreta:      

Chave pública (hex): 

ID da Conta:       

Endereço SS58:     
```

Endereço Polkadot para //Alice (criptografia sr25519).
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
URI da Chave Secreta `//Alice` é a conta:
Semente secreta:      

Chave pública (hex): 

ID da Conta:       

Endereço SS58:     
```

Converter rococo_local.json para o formato bruto.
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
Para usar a nova especificação de cadeia, substitua o arquivo rococo.json no diretório ./config/ por este novo e execute novamente a cadeia.
```bash
./scripts/init.sh run
```
Você pode editar livremente o código. O comando acima reconstruirá o projeto e atualizará o nó coletor antes de iniciar.
Cumulus é um software pré-lançamento que ainda está em desenvolvimento intenso.
Estamos usando um commit específico do polkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5)dbcd0987ed53f104e6e15)

Você pode usar versões mais recentes do software. Para fazer isso, altere  POLKADOT_COMMIT  em ./scipt/config.sh
para o commit mais recente da branch `rococo-v1`, exclua ./bin/polkadot e execute 
```bash
./scripts/init.sh run
```

Atualize as dependências do projeto do coletor 
```bash
cargo update
./scripts/init.sh build
```
Algumas dependências provavelmente exigem novos recursos da ferramenta rust. Este projeto é baseado no rust `nightly-2021-01-26`
Atualize a versão da ferramenta rust em ./scripts/config.sh antes de compilar.

## Hack parachain
[Adicionar pallet externo](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - provavelmente deveria estar em "saiba mais"?
## Saiba Mais

Consulte o upstream
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
para aprender mais sobre a estrutura deste projeto, as capacidades que ele encapsula e a maneira como
essas capacidades são implementadas. Você pode aprender mais sobre
[O Caminho de um Bloco de Parachain](https://polkadot.network/the-path-of-a-parachain-block/) no
blog oficial da Polkadot.
[Oficina Parity Cumulus](https://substrate.dev/cumulus-workshop/#/)