---
title: Experimento de Governo On-chain

---

Atualmente, Polkadot é um dos maiores DAOs do mundo! Existem muitos eventos interessantes acontecendo no ecossistema como parte do experimento de governança on-chain. Os desenvolvedores da Robonomics sugerem que os participantes do hackathon aumentem o nível de imersão na comunidade Polkadot integrando eventos relacionados a votações, novas solicitações de tesouraria, mudanças de época e muito mais, em um sistema típico de casa inteligente.


---

Este artigo discute a gestão de casas inteligentes através da Robonomics Cloud como resultado de qualquer evento no ecossistema Polkadot. Aqui está um exemplo de como uma lâmpada pode ser ligada quando uma nova proposta de referendo está sendo submetida na rede Polkadot.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Requisitos

 - Instância do Home Assistant instalada com integração Robonomics. Os métodos de instalação podem ser encontrados [aqui](/docs/install-smart-home).
 - Nó ou gateway Polkadot para interação. Por exemplo - `wss://polkadot.api.onfinality.io`
 - Nó ou gateway Robonomics para interação.
 - Conta criada no formato ED25519. As informações podem ser encontradas [aqui](/docs/sub-activate).
 - Ter criado uma conta na lista de dispositivos da assinatura Robonomics. Saiba mais [aqui](/docs/add-user).
 - Endereços do proprietário e controlador da assinatura.

Bibliotecas Python:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Criando um Ouvinte Polkadot

Primeiramente, você precisa criar um script que irá ouvir por novos eventos na rede Polkadot. No exemplo, iremos rastrear a criação de novos Referendos.

Para conveniência de teste, foi utilizado um nó Polkadot local em modo de desenvolvimento. Você pode encontrar o [manual de implantação aqui](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

Para se conectar a um nó público, altere o "POLKAD"A variável "POLKADOT_GATEWAY".

Código de exemplo:


{% codeHelper {copy: true}%}

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Início da contagem de referendos:', data.value)
    if update_nr > 0:
        print('Contagem de referendos aumentada:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

Este script irá ouvir as alterações no número atual do referendo e exibir o número do último referendo.

### Testando

Execute o programa e abra [polkadot.js](https://polkadot.js.org/apps/#/explorer).
Para mudar para o nó de desenvolvimento local, clique no ícone no canto superior esquerdo e um menu lateral aparecerá. Selecione "Development" e "Local Node" na parte inferior e clique em "Switch".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

Você mudará para o nó local. Vá para a aba "Governance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

Crie uma nova preimagem. Vamos deixar um comentário na rede. Assine e envie para a rede.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

Você receberá seu hash. Copie-o e vá para a aba "Governance" -> "Referenda". Faça "Enviar Proposta". Como esta é uma rede de teste, a maioria dos campos configuráveis pode ser deixada como padrão. Cole o hash da preimagem e assine a proposta.


{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

Após enviá-lo para a rede, o programa detectará a nova proposta e exibirá os seguintes logs:

```
Início da contagem de referendos: 0
Contagem de referendos aumentada: 1## Conectando-se à Casa Inteligente

Agora precisamos adicionar uma interação com a casa inteligente após criar uma nova proposta.

Para isso, precisamos saber o seguinte:
- Domínio de serviço
- Nome do serviço
- Entidade alvo
- Dados - devem ser do tipo "dict"

Vamos ver onde encontrá-los. Abra a instância do Home Assistant instalada. Vá para "Ferramentas do Desenvolvedor -> Serviços", selecione qualquer serviço e mude para o modo YAML. Vamos considerar o exemplo de um interruptor.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"serviços"} %}{% endroboWikiPicture %}

A chave "service" contém o domínio e o nome do serviço. Tudo antes do ponto é o domínio, e tudo depois do ponto é o nome do serviço. O campo de dados também é necessário.

Para encontrar a entidade alvo, vá para "Configurações -> Dispositivos e Serviços -> Entidades". Haverá uma coluna com "ID da entidade" - este é o parâmetro de entidade alvo necessário.

Agora que conhecemos todos os parâmetros, vamos ver o que acontecerá no script.

O script se conectará ao daemon IPFS local. (Se você seguiu as instruções de configuração da casa inteligente, você já tem o daemon IPFS em execução.)

Primeiro, formaremos um comando no formato JSON. Em seguida, a mensagem é criptografada com as chaves do usuário e do controlador.
Então o comando criptografado é salvo em um arquivo e adicionado ao IPFS. Depois disso, o hash IPFS resultante é enviado para a parachain Robonomics através de um extrínseco `Launch` para o endereço do controlador.
Quando o controlador recebe o lançamento, ele baixará o arquivo do IPFS, descriptografará e chamará o serviço especificado dentro.

O código completo é o seguinte:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# parte do polkadot
GATEWAY_POLKADOT = "<GATEWAY_POLKADOT>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=GATEWAY_POLKADOT)

# parte do Robonomics

# Credenciais do Robonomics
# O endereço do usuário deve estar emDispositivos RWS
# O endereço do usuário deve ser ED25519
user_seed = "<SEED_PHRASE>"
controller_address = "<ENDEREÇO_DO_CONTROLADOR>"
sub_owner_address = "<ENDEREÇO_DO_PROPRIETÁRIO>"

# Comando
service_domain = "<DOMÍNIO>"  # domínio é o que está antes do ponto no nome do serviço. Por exemplo, "switch"
service_name = "<NOME>"  # nome - o que vem depois do ponto no nome do serviço. Por exemplo, "turn_on"
target_entity = "<ID_ENTIDADE>"  # id_entidade. Por exemplo, "switch.boiler"
data = {}  # Deve ser um dicionário


def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Contagem de Referendos iniciada:', data.value)

    if update_nr > 0:
        print('Contagem de Referendos aumentada:', data.value)
        # Enviar lançamento para o endereço do controlador com hash ipfs
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"Resultado da transação: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    Criptografar a mensagem com a chave privada do remetente e a chave pública do destinatário
    :param message: Mensagem a ser criptografada
    :param sender_keypair: Par de chaves da conta do remetente
    :param recipient_public_key: Chave pública do destinatário
    :return: mensagem criptografada
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# Formatar mensagem para lançamento
data['entity_id'] = target_entity
command = {'plataforma': service_domain, 'nome': service_name, 'params': data}

message = json.dumps(command)
print(f"Mensagem: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# Criptografar comando
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"Mensagem Criptografada: {message}")
filename = "arquivo_temporário"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```python
result_ipfs  = result["Hash"]
    print(f"Hash IPFS: {result_ipfs}")
    print(f"Hash IPFS para lançamento {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

se tudo foi feito corretamente, você verá os seguintes logs:
```
Mensagem: {"plataforma": "switch", "nome": "ligar", "parâmetros": {"entidade_id": "switch.boiler"}}
Mensagem criptografada: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
Hash IPFS: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
Hash IPFS para lançamento 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Contagem de referendos inicial: 0
Contagem de referendos aumentada: 1
Resultado da transação: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```