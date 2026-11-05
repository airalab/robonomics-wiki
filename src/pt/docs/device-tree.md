---
title: Árvore de dispositivos (CPS)
contributors: [ensrationis]
---

A árvore de dispositivos descreve a sua instalação na nuvem Robonomics: um local, seus cômodos, os dispositivos dentro deles. Cada parte é um nó. A chain guarda a estrutura da instalação e o estado mais recente de cada nó. Ela não foi feita para grandes volumes de dados.

No runtime, a árvore de dispositivos é o pallet `CPS` (sistemas ciberfísicos). Referência técnica completa: [README do pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md).

## Nós

- Todo nó tem um número (`NodeId`). Os números sobem de um em um e nunca são reutilizados.
- Um nó pode ter um pai. Um nó sem pai é um nó raiz.
- Um nó tem dois campos, ambos opcionais:
  - `meta`: uma descrição que muda pouco, até 1 KiB.
  - `payload`: o estado atual, até 8 KiB.
- Os dois campos são bytes simples. Você escolhe o formato, por exemplo JSON.
- O pai de um nó nunca muda. Para mover um nó, crie um novo e apague o antigo.
- Um nó pode ter no máximo 100 filhos. Só um nó sem filhos pode ser apagado.

<!-- -->

{% roboWikiNote {type: "warning", title: "Os dados são públicos"}%} Qualquer pessoa pode ler tudo o que está na árvore de dispositivos. Se os dados precisam ficar privados, criptografe-os antes de gravar. A ferramenta `cps` do [airalab/robins](https://github.com/airalab/robins) pode criptografar para você. {% endroboWikiNote %}

## Scope

Um Scope é a parte da árvore que pertence a uma conta.

- Quando você cria um nó raiz, também cria um Scope, e você é o dono dele.
- Cada nó pertence à raiz de Scope mais próxima acima dele, ou ao próprio Scope, se ele mesmo for uma raiz de Scope.
- Você pode transformar um nó dentro da sua árvore na raiz de um novo Scope aninhado. Um Scope aninhado é um limite rígido: o dono externo e as permissões externas não têm efeito dentro dele. Uma exceção: o dono do Scope logo acima pode substituí-lo.
- O dono de um Scope nunca muda. Para passar um Scope adiante, ele é substituído: uma conta autorizada a criar um Scope no nó raiz chama `create_scope`. Isso gera um novo ID de Scope, quem chamou vira o dono e todas as permissões antigas são apagadas.
- Um Scope tem no máximo 32 nós de profundidade, contando de um nó até a raiz do seu Scope. A árvore inteira pode ser mais profunda.
- Um Scope só desaparece quando o nó raiz dele é apagado.

## Access

O dono do Scope pode fazer tudo dentro dele. Outras contas precisam de uma permissão, que só o dono pode conceder.

| Capability | Permite |
|---|---|
| `Write` | `set_meta` e `set_payload` |
| `CreateScope` | `create_scope` |

- Uma permissão vale em um de dois modos: `Node` (um nó) ou `Subtree` (o nó e tudo abaixo dele, mas não dentro de Scopes aninhados).
- Um Scope tem no máximo 32 permissões.
- Criar filhos, apagar nós e conceder ou revogar permissões não pode ser delegado. Só o dono pode fazer isso.

Outras capabilities (para transações, armazenamento e computação) estão previstas no roadmap do 5.0. Elas ainda não estão no runtime.

## Contas dos nós

Um nó pode ser vinculado a uma conta, a sua identidade. Normalmente é a chave do próprio dispositivo. Uma conta só pode ser a identidade de um nó, então dá para encontrar um nó pela conta do dispositivo.

- Só o dono do Scope pode definir ou remover uma identidade. A permissão `Write` não basta.
- Se a identidade não for quem chama, a conta da identidade precisa assinar um permit. O permit é a codificação SCALE de `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)`, assinada como bytes brutos, sem o wrapper `<Bytes>`.
- Um permit vale por no máximo um dia (14,400 blocos). Ele não se esgota com o uso: funciona dentro do seu Scope até expirar. Substituir o Scope invalida os permits antigos.
- Um nó raiz novo só aceita como identidade a própria conta de quem chama.
- Apagar um nó remove a identidade dele.

## Chamadas

O Polkadot.js mostra esses nomes em camelCase, por exemplo `cps.createNode`.

| Chamada | Argumentos | Quem pode chamar |
|---|---|---|
| `create_node` | `parent_id` (opcional), `meta` (opcional), `payload` (opcional), `identity` (opcional: uma conta e, se necessário, um permit) | Nó raiz: qualquer conta, que vira dona do Scope. Nó filho: o dono do Scope do pai. |
| `set_meta` | `node_id`, `meta` (`None` remove) | Quem tem `Write` |
| `set_payload` | `node_id`, `payload` (`None` remove) | Quem tem `Write` |
| `delete_node` | `node_id` | Dono do Scope. O nó não pode ter filhos. Apagar uma raiz de Scope apaga o Scope e suas permissões. |
| `create_scope` | `node_id` | Quem tem `CreateScope`. Na raiz de um Scope aninhado, também o dono do Scope em volta. |
| `grant_access` | `node_id`, `principal`, `capability` (`Write` ou `CreateScope`), `mode` (`Node` ou `Subtree`) | Dono do Scope |
| `revoke_access` | `node_id`, `principal`, `capability` | Dono do Scope |
| `set_identity` | `node`, `identity`, `permit` (opcional) | Dono do Scope |
| `clear_identity` | `node` | Dono do Scope |

Eventos: `NodeCreated`, `MetaSet`, `PayloadSet`, `NodeDeleted`, `ScopeCreated`, `ScopeDeleted`, `AccessGranted`, `AccessRevoked`, `IdentitySet`, `IdentityCleared`.

## Lendo a árvore

- Leituras simples são consultas ao storage: `cps.nodes`, `cps.meta`, `cps.payload`, `cps.children`.
- O pallet também tem view functions (elas precisam de metadata V16, que a chain oferece):
  - pelo número do nó: `resolve_scope`, `has_capability`, `identity_of`, `node_by_identity`;
  - pela conta do dispositivo: `parent`, `children`, `meta`, `payload`, `scope_of`, `address_capability`. Elas falham com `MissingProjectedIdentity` se algum nó do resultado não tiver identidade.
- Em JavaScript as view functions são `api.view.cps.*`, o que exige uma versão do `@polkadot/api` com suporte a view functions. Em Rust elas estão no crate tipado `robonomics-runtime-subxt-api`.

## Limites e taxas

| Limite | Valor |
|---|---|
| Tamanho de `meta` | 1,024 bytes |
| Tamanho de `payload` | 8,192 bytes |
| Profundidade do Scope | 32 nós |
| Filhos por nó | 100 |
| Permissões por Scope | 32 |
| Validade do permit de identidade | 1 dia (14,400 blocos) |

São constantes do runtime. Para mudá-las é preciso uma atualização do runtime.

A árvore de dispositivos não cobra depósito de armazenamento. Você paga a taxa normal de transação, que cresce com o tamanho dos dados. Por exemplo, no momento em que escrevemos, um nó raiz com 100 bytes de `meta` e 100 bytes de `payload` custa cerca de 0.0003 XRT.

## Ferramentas

- A ferramenta de linha de comando `cps` e a biblioteca Rust `libcps` cobrem toda a árvore de dispositivos. Veja [Bibliotecas cliente](/docs/client-libraries/#cps-command-line-tool).
- Qualquer cliente que envie extrinsics também serve, por exemplo o `@polkadot/api`.
- Para dispositivos que não conseguem falar diretamente com a chain, veja [Conectar dispositivos](/docs/connect-devices/).

## O que vem a seguir

Com as assinaturas (5.0, em desenvolvimento), o dono do Scope vai poder pagar as transações dos dispositivos da árvore, para que um sensor grave dados sem ter XRT. Isso ainda não está no runtime.
