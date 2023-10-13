---
title: Como lançar o Robonomics collator
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  No screencast e nas capturas de tela deste artigo, usamos a versão 1.4.0 do Robonomics. Você precisa usar os mesmos comandos, mas substituir a versão do Robonomics pela atual.
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

Atualmente, a rede Robonomics é mantida principalmente pelos desenvolvedores iniciais, mas qualquer pessoa pode apoiar o projeto. Cada nó completo adicional da blockchain ajuda a torná-la mais sustentável e tolerante a falhas. Os binários do nó Robonomics estão disponíveis em [release](https://github.com/airalab/robonomics/releases) ou podem ser [construídos a partir do código-fonte](/docs/how-to-build-collator-node/).

## O que é um colator

Um Collator faz parte do parachain Robonomics. Esse tipo de nó cria novos blocos para a cadeia Robonomics.

>Os colatores mantêm as parachains coletando transações de parachain dos usuários e produzindo provas de transição de estado para os validadores da Relay Chain. Em outras palavras, os colatores mantêm as parachains agregando transações de parachain em candidatos a blocos de parachain e produzindo provas de transição de estado para os validadores com base nesses blocos.

Você pode aprender mais sobre collators na página wiki relacionada do [Polkadot](https://wiki.polkadot.network/docs/learn-collator)

No parachain Robonomics, cada agrupador recebe recompensas de (**0,001598184 XRT**) para cada bloco que o agrupador constrói (as recompensas ocorrem quando os blocos são selados à cadeia).
Além disso, o collator que constrói o bloco recebe **50% das taxas de transação** contidas no bloco que eles criam.

## Requisitos

Recomenda-se lançar um collator usando os **requisitos de hardware padrão** para [validadores Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ Compatível com x86-64.
+ Intel Ice Lake, ou mais recente (Xeon ou série Core); AMD Zen3, ou mais recente (EPYC ou Ryzen).
+ 4 núcleos físicos @ 3.4GHz.
+ Multithreading simultâneo desativado (Hyper-Threading na Intel, SMT na AMD).
+ Armazenamento - Um SSD NVMe de 1 TB (Deve ter um tamanho razoável para lidar com o crescimento da blockchain).
+ Memória - 32 GB DDR4 ECC


Neste artigo, usamos as seguintes especificações:
+ 4 vCPU
+ 700 GB de espaço NVMe para bancos de dados do collator. A capacidade de expandir esse espaço em disco é necessária.
+ 8GB de RAM


## Informações importantes
1. Usamos algumas variáveis nessas instruções e você precisará substituir os valores pelos seus próprios em todos os comandos:
    + **%NODE_NAME%** é o nome do nó. Exemplo: *meu-robonomics-kusama-collator*
    + **%BASE_PATH%** é o caminho para o volume montado. Exemplo: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** é o endereço da conta no ecossistema Polkadot no formato SS58. Exemplo: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Observe que você precisa incluir *--state-cache-size=0* no lançamento do serviço do collator. Esse parâmetro é importante para a estabilidade do collator.
Você pode ver mais informações no [issue](https://github.com/airalab/robonomics/issues/234) relacionado no github.

## Lançar facilmente um Robonomics collator pela primeira vez

Você pode lançar facilmente um collator diretamente na linha de comando para verificar erros.
Depois de fazer isso, é altamente recomendável lançar o Robonomics collator como um serviço (veja o próximo passo).

```
root@robokusama-collator-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb 
```


## Lançar o Robonomics collator como um serviço

1. Crie o usuário para o serviço com diretório home
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Baixe, extraia e mova o binário do Robonomics para o diretório */usr/local/bin/*. Você precisa substituir *$ROBONOMICS_VERSION* pela versão atual do Robonomics nos comandos desta seção. Você pode encontrar a versão atual na [página de lançamentos do repositório Robonomics no github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


3. Crie o arquivo de serviço systemd chamado *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    E adicione as seguintes linhas no arquivo de serviço:
    ```
    [Unit]
    Description=robonomics
    After=network.target
    
    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Salve este arquivo, em seguida, habilite e inicie o serviço:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

URL de telemetria: https://telemetry.parachain.robonomics.network/#/Robonomics

Os logs dos agrupadores podem ser monitorados com: `journalctl -u robonomics.service -f` 

Assim que o coletor Robonomics for iniciado, ele começará a sincronizar com o Kusama Relay Chain. Isso pode levar um tempo considerável, dependendo da velocidade da rede e das especificações do sistema, por isso recomendamos baixar um instantâneo do Kusama.


## Acelerando o processo de sincronização usando um snapshot do Kusama

Recomendamos fazer isso imediatamente após criar e iniciar o serviço Robonomics. Você pode encontrar mais informações sobre snapshots e instruções de uso na seguinte página: https://ksm-rocksdb.polkashots.io/

Instruções:

1. Pare o serviço Robonomics e remova o diretório do banco de dados atual do Kusama:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Baixe o snapshot atual e extraia-o:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    Você pode remover o arquivo baixado após descompactar com sucesso:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Definindo a propriedade correta para a pasta do banco de dados:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Inicie o serviço Robonomics novamente:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Verifique os logs do serviço:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```    
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## Solucionando Problemas
### Erro: "State Database error: Too many sibling blocks inserted"
Para corrigir esse erro, você pode simplesmente iniciar seu agrupador no modo de arquivamento:

1) Primeiro, pare o serviço Robonomics: 
    
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    

2) Em seguida, adicione o parâmetro `--state-pruning=archive` à parte da parachain do arquivo de serviço. Exemplo do arquivo de serviço editado:
    ```
    [Unit]
    Description=robonomics
    After=network.target
    
    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm 

    [Instalar]
    WantedBy=multi-user.target
    ```

3) Recarregue a configuração do gerenciador do systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Remova o banco de dados da parachain existente:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Inicie o serviço robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Depois disso, é necessário aguardar a sincronização do banco de dados da parachain.

### Erro: "cannot create module: compilation settings are not compatible with the native host"
Esse erro está relacionado aos parâmetros de virtualização. É necessário usar o tipo de processador emulado "host-model". Você pode configurar isso no host de virtualização.

No entanto, se você encontrar esse erro em qualquer hospedagem, é necessário entrar em contato com o suporte técnico apenas sobre esse problema.
