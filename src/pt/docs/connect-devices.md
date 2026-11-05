---
title: Conectar dispositivos
contributors: [Fingerling42, nakata5321, ensrationis]
---

Há duas formas de levar dispositivos para o Robonomics: pelo Home Assistant ou diretamente, com qualquer dispositivo que consiga assinar uma transação ou falar com um gateway.

Hardware pronto e instalação de casa inteligente são oferecidos pela Pinout Limited. Produtos e serviços em [pinout.cloud](https://pinout.cloud).

## Home Assistant

Existem três integrações para o Home Assistant. Elas fazem coisas diferentes e não estão igualmente atualizadas.

| Integração | O que faz | Situação |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Monitora o Home Assistant em busca de problemas. Criptografa um relatório de erro, envia para o IPFS e registra o CID on-chain. O relatório vira um chamado de suporte no seu integrador. Também envia um heartbeat diário. | Mantida. Lançada como pre-release. Exige Home Assistant 2026.3.1 ou mais recente; instale pelo HACS como repositório personalizado. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | Acesso remoto ao Home Assistant por transações criptografadas com uma assinatura RWS, além de usuários e backups. | Parada. A última versão é a 2.2.1, de outubro de 2025. Usa o antigo `robonomics-interface` 1.6.3, precisa de um nó IPFS local, e os endpoints padrão ainda apontam para a Kusama, que foi desligada. É possível escolher um endpoint do Polkadot. Não foi testada com o runtime atual. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | Lê um sensor Altruist pela rede local. Não usa a chain. | Pequena, só local. |

A integração Robonomics da airalab depende das assinaturas RWS. Veja a situação atual delas em [Pallets legados](/docs/legacy-pallets/#rws-subscriptions).

## Qualquer dispositivo

Estes são os blocos básicos para conectar o seu próprio dispositivo.

1. **Dê ao dispositivo uma conta própria.** A chave fica no dispositivo.
2. **Pague as transações dele.** Envie um pouco de XRT para a conta (no momento em que escrevemos, um registro de datalog custa uma fração de milésimo de XRT), ou adicione-a a uma assinatura RWS com `rws.set_devices` (até 32 dispositivos) e envie as transações via `rws.call`.
3. **Descreva a instalação na árvore de dispositivos.** Crie um nó para o local e nós para os dispositivos. Vincule a conta do dispositivo ao nó dele como identidade do nó. Conceda `Write` a um gateway se ele grava pelo dispositivo. Veja [Árvore de dispositivos (CPS)](/docs/device-tree/).
4. **Grave dados.** Coloque o estado atual no `payload` do nó (até 8 KiB), ou grave registros com `datalog.record` (até 512 bytes, [legado](/docs/legacy-pallets/#datalog)). Coloque dados maiores no IPFS e grave o CID.
5. **Envie comandos, se precisar.** A chamada legada `launch` envia um evento de comando assinado para a conta de um dispositivo. Veja [Launch](/docs/legacy-pallets/#launch).

Bibliotecas para cada passo: Python `robonomics-interface`, JavaScript `@polkadot/api` e Rust `libcps` com a ferramenta `cps`. Veja [Bibliotecas cliente](/docs/client-libraries/).

### Gateways para dispositivos pequenos

Nem todo dispositivo consegue falar com a chain. Estes gateways de código aberto ficam no meio do caminho:

- **edge** ([airalab/robins](https://github.com/airalab/robins)): recebe mensagens assinadas por HTTP e Meshtastic e as repassa via libp2p GossipSub.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): transforma mensagens MQTT em atualizações da árvore de dispositivos.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): coleta medições assinadas dos sensores e as repassa para o IPFS pubsub e para a parachain. Atende os sensores do [sensors.social](https://sensors.social).

Os nós de relay públicos e o status deles estão em [pubsub.robonomics.network](https://pubsub.robonomics.network).
