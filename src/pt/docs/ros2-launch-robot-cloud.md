---
title: Lançar Robô da Nuvem
contributors: [Fingerling42]
tools:   
  - Robonomics ROS 2 Wrapper 3.1.0
    https://github.com/airalab/robonomics-ros2/releases
---

**Neste artigo, você aprenderá como usar a função de lançamento do Robonomics no ROS 2 através de vários exemplos**

A principal característica da parachain Robonomics para enviar comandos para dispositivos é o extrínseco de lançamento. Essa função permite enviar uma string contendo um parâmetro (na forma de um valor hexadecimal longo de 32 bytes) para um endereço especificado dentro da parachain. Tipicamente, a string representa um hash IPFS que aponta para um arquivo com os parâmetros necessários para executar o comando. Você pode encontrar mais detalhes sobre a função de lançamento [neste artigo](https://wiki.robonomics.network/docs/launch/).

No Robonomics ROS 2 Wrapper, a função de lançamento é implementada como um serviço para enviar comandos e como um tópico para receber comandos.

## Enviando Lançamento

O serviço, chamado `robonomics/send_launch`, parece o seguinte:

{% codeHelper { additionalLine: "RobonomicsROS2SendLaunch.srv"}%}

```YAML
string  param                   # Apenas string de parâmetro ou nome de arquivo com parâmetros que precisam ser enviados para o IPFS
string  target_address          # Endereço a ser acionado com o lançamento
bool    is_file         True    # É um parâmetro de lançamentoum arquivo que precisa ser carregado para o IPFS (padrão é Verdadeiro)?
bool    encrypt_status  True    # Verificar se o arquivo de parâmetro precisa ser criptografado com o endereço de destino, padrão é Verdadeiro
---
string  launch_hash             # Hash da transação de lançamento
```

{% endcodeHelper %}

O serviço aceita os seguintes parâmetros como parte da solicitação: um parâmetro de comando (ou uma simples string ou o nome de um arquivo contendo os parâmetros de comando), o endereço de destino na parachain Robonomics para enviar o lançamento e duas flags: uma indicando se o parâmetro é um arquivo e a outra especificando se o arquivo deve ser criptografado (ambos são definidos como verdadeiros por padrão). O arquivo será carregado para o IPFS e seu hash será passado como parâmetro de lançamento. Portanto, o arquivo deve ser colocado no diretório designado para arquivos IPFS, conforme especificado no arquivo de configuração para o nó `robonomics_ros2_pubsub`.

Por padrão, o arquivo é criptografado usando o endereço público do destinatário do lançamento. O método de criptografia aplicado é criptografia de chave pública baseada na criptografia de curva elíptica Curve25519. Na implementação atual, a criptografia é suportada apenas para endereços de conta do tipo ED25519 (Edwards) (você pode ler mais sobre isso neste [artigo](http://localhost:8080/docs/create-account-in-dapp/#22-create-account)).

Após enviar o lançamento, o serviço retorna o hash da transação.

## Recebendo o Lançamento

RecebendoOs lançamentos são organizados na forma de um tópico correspondente. Tecnicamente, o nó utiliza a funcionalidade robonomics-interface para se inscrever no estado de seu próprio endereço e aguarda o evento `NewLaunch` aparecer. Uma vez que o evento ocorre, o nó publica uma mensagem no tópico `robonomics/received_launch`. O formato da mensagem é o seguinte:

{% codeHelper { additionalLine: "RobonomicsROS2ReceivedLaunch.msg"}%}
```YAML
string  launch_sender_address   # Endereço da conta que enviou o comando de lançamento
string  param                   # String com parâmetro ou nome do arquivo com parâmetros
```
{% endcodeHelper %}

Os campos da mensagem contêm o endereço de onde o lançamento foi enviado e o parâmetro em si: seja uma string simples ou o nome do arquivo com parâmetros que foi baixado do IPFS e colocado no diretório de trabalho do IPFS. Se o arquivo estiver criptografado, ele é descriptografado durante esse processo.


## Exemplo com Turtlesim

A seguir, demonstraremos como usar a função de lançamento com o [Turtlesim](https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Introducing-Turtlesim/Introducing-Turtlesim.html) como exemplo. Turtlesim é um simulador leve projetado para aprender ROS 2. Você pode instalá-lo usando o seguinte comando:

{% codeHelper { copy: true}%}

```shell
sudo apt install ros-$ROS_DISTRO-turtlesim
```

{% endcodeHelper %}

O pacote Robonomics ROS 2 Wrapper inclui um pacote pré-construído chamado `turtlesim_robonomics`, especificamente adaptado para Turtlesim. Este pacote permite testar todas as funcionalidades do wrapper. Vamos tentar executá-lo.

{% roboWikiNote {type: "warning", title: "Aviso"}%}Por favor, certifique-se de ter saldo suficiente em sua conta ou uma assinatura ativa para realizar transações.{% endroboWikiNote %}

1. Para começar, crie um arquivo de configuração para a instância pubsub de `turtlesim_robonomics` usando o modelo `config/robonomics_pubsub_params_template.yaml`. Preencha os campos apropriados com suas credenciais Robonomics (seed da conta, tipo de criptomoeda, endereço do proprietário da assinatura). Além disso, especifique um diretório para os arquivos IPFS. Uma vez concluído, renomeie o arquivo, por exemplo, `first_pubsub_params.yaml`.

2. Inicie o Daemon IPFS:

{% codeHelper { copy: true}%}

```shell
ipfs daemon
```

{% endcodeHelper %}

3. Execute o seguinte arquivo de lançamento do ROS 2. Ele iniciará todos os nós necessários: o próprio Turtlesim, a implementação do wrapper para Turtlesim e o Robonomics pubsub:

{% codeHelper { copy: true}%}

```shell
ros2 launch turtlesim_robonomics turtlesim_robonomics_launch.py pubsub_params_path:=./first_pubsub_params```.yaml namespace:='turtlesim1'
```

{% endcodeHelper %}

Você verá o simulador com a tartaruga, juntamente com os logs do ROS 2 no console exibindo o ID do IPFS, o caminho para o diretório com os arquivos IPFS, o endereço do Robonomics e outras informações relevantes.

### Iniciar o Turtlesim a partir do portal Polkadot

1. O Turtlesim é controlado através do tópico `/cmd_vel`, então você precisa preparar as mensagens correspondentes e incluí-las em um arquivo, que será usado como parâmetro de lançamento. Para conveniência, essas mensagens são preparadas em um arquivo JSON. Crie um arquivo (por exemplo, `turtle_cmd_vel.json`) e cole o seguinte:

{% codeHelper { copy: true}%}

  ```json
  [
    {
       "linear": {
          "x": 5.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 1.5
       }
    },
    {
       "linear": {
          "x": 2.0,
          "y": 0.0,
          "z": 0.0
       },
       "angular": {
          "x": 0.0,
          "y": 0.0,
          "z": 2.5
       }
```    }
  ]
  ```

{% endcodeHelper %}

  Este exemplo JSON comandará a tartaruga para se mover duas vezes.

2. Em seguida, o arquivo precisa ser carregado no IPFS. Você pode escolher qualquer método, mas para este exemplo, usaremos o IPFS Kubo. Abra um terminal no diretório onde o arquivo JSON está localizado e faça o upload para o IPFS:

{% codeHelper { copy: true}%}

  ```shell
  ipfs add turtle_cmd_vel.json
  ```

{% endcodeHelper %}

  Você receberá o hash IPFS do arquivo. Certifique-se de salvá-lo para uso posterior.

3. Antes de enviar o lançamento, o hash IPFS deve ser convertido em uma string de 32 bytes de comprimento. Isso pode ser feito usando alguns comandos Python. Abra um terminal, inicie o interpretador Python 3 e execute os seguintes comandos:

{% codeHelper { copy: true}%}

```python
  from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes
  ipfs_qm_hash_to_32_bytes('HASH_DO_ARQUIVO_IPFS')
```

{% endcodeHelper %}

  Salve a string resultante para uso posterior.

4. Abra o portal Robonomics [Polkadot/Substrate](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/extrinsics) e naveguePara a aba **Desenvolvedores** -> **Extrínsecos**. Selecione o extrínseco `launch` -> `launch(robot, param)`. No campo `robot`, insira o endereço do seu robô e, no campo `param`, insira a string com o hash IPFS convertido. Envie a transação.

5. Vá para o simulador Turtlesim. Após enviar com sucesso a transação, a tartaruga deve começar a se mover.

### Iniciar Turtlesim a partir das Ferramentas de Linha de Comando do ROS 2

1. Agora vamos tentar enviar um lançamento para o Turtlesim a partir de outro nó pubsub do ROS 2. Primeiro, crie outro arquivo de configuração (por exemplo, `second_pubsub_params.yaml`) com credenciais Robonomics diferentes e um diretório IPFS separado.

2. Em um terminal separado, execute um novo nó `robonomics_ros2_pubsub` usando o novo arquivo de configuração:

{% codeHelper { copy: true}%}

  ```shell
  ros2 run robonomics_ros2_pubsub robonomics_ros2_pubsub --ros-args -r __ns:=/test -p pubsub_params_path:=./second_pubsub_params.yaml
  ```

{% endcodeHelper %}

3. Coloque o arquivo JSON contendo os comandos para o Turtlesim (`turtle_cmd_vel.json`) no diretório IPFS do novo pubsub.

4. Antes de enviar o lançamento, vamos configurar o monitoramento para observar como `turtlesim_robonomics` recebe.dados após a chegada. Para fazer isso, em um terminal separado, inscreva-se no tópico correspondente:

{% codeHelper { copy: true}%}

```shell
ros2 topic echo /turtlesim1/robonomics/received_launch
```

{% endcodeHelper %}

Ao fazer isso, os logs do pubsub exibirão detalhes do envio do lançamento.

{% roboWikiNote {type: "warning", title: "Launch Param as String"}%} Para lidar com o parâmetro de lançamento como uma string regular, em vez de um hash IPFS de um arquivo, você precisa alterar o parâmetro do nó ROS 2 correspondente `launch_is_ipfs` de `True` para `False`. Você pode fazer isso usando o comando `ros2 param set`.
{% endroboWikiNote %}

5. Agora, precisamos chamar o serviço ROS 2 para enviar o lançamento. Em um terminal separado, use o seguinte comando:

{% codeHelper { copy: true}%}

```shell
ros2 service call /test/robonomics/send_launch robonomics_ros2_interfaces/srv/RobonomicsROS2SendLaunch {"param: 'turtle_cmd_vel.json', target_address: 'SEU_ENDEREÇO_TURTLESIM'"}
```

{% endcodeHelper %}

Você verá os logs do pubsub exibindo detalhes do envio do lançamento.

6. Vá para o simulador Turtlesim. Após enviar com sucesso a transação, o turtle deve começar.

### Iniciar o Turtlesim a partir de Outro Nó

1. Agora, vamos tentar criar um nó de teste que irá esperar pelo lançamento e depois encaminhá-lo para o Turtlesim. Você pode usar o pacote de teste pronto `test_robot_robonomics`. Copie este pacote para o seu espaço de trabalho do ROS 2.

2. Abra o arquivo do nó localizado em `test_robot_robonomics/test_robot_robonomics/test_robot_robonomics_node.py` em qualquer editor de texto e adicione o seguinte código após a função `__init__`:

{% codeHelper { copy: true}%}

```python
def launch_file_subscriber_callback(self, msg) -> None:
    super().launch_file_subscriber_callback(msg)

    transaction_hash = self.send_launch_request(self.param, target_address='SEU_ENDEREÇO_TURTLESIM', is_file=True, encrypt_status=True)

    self.get_logger().info('Enviado lançamento para o turtle com hash: %s ' % str(transaction_hash))
```

{% endcodeHelper %}

   Esta função irá primeiro processar o lançamento recebido e depois usar seu parâmetro para enviar um novo lançamento para o Turtlesim.

3. Compile o pacote usando `colcon` e, em seguida, inclua seus arquivos de configuração.

4. Execute o arquivo de lançamento do ROS 2 do pacote de teste com as credenciais de pubsub: 

{% codeHelper { copy: true}%} 

  ```shell
  ros2 launch test_robot_robonomics test_robot_robonomics_launch.py pubsub_params_path:=./second_pubsub_params.yaml namespace:='test'
  ```

{% endcodeHelper %}

5. Agora, envie um lançamento com os parâmetros `turtle_cmd_vel.json` para o endereço do nó de teste, por exemplo, através do portal Polkadot/Substrate. Antes de fazer isso, certifique-se de que o Turtlesim ainda está em execução. O nó de teste deve receber o lançamento e, em seguida, enviar um novo com os mesmos parâmetros, fazendo com que a tartaruga no Turtlesim comece a se mover.