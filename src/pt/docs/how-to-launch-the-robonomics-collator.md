---
title: Como lançar o colator Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"nota", type: "nota"}%} No screencast e nas capturas de tela deste artigo, usamos a versão 1.4.0 do Robonomics. Você precisa usar os mesmos comandos, mas substituir a versão do Robonomics pela atual.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

Atualmente, a rede Robonomics é mantida principalmente pelos desenvolvedores iniciais, mas qualquer pessoa pode apoiar o projeto. Cada nó completo adicional da blockchain ajuda a torná-la mais sustentável e tolerante a falhas. Os binários do nó Robonomics estão disponíveis nos ativos de [lançamento](https://github.com/airalab/robonomics/releases) ou podem ser [construídos a partir do código-fonte](/docs/how-to-build-collator-node/).

## O que é um colator

Um Colator faz parte da paracadeia Robonomics. Esse tipo de nó cria novos blocos para a cadeia Robonomics.

>Os Colators mantêm as paracadeias coletando transações de paracadeias dos usuários e produzindo provas de transição de estado para os validadores da Cadeia de Revezamento. Em outras palavras, os colators mantêm as paracadeias agregando transações de paracadeias em candidatos a blocos de paracadeias e produzindo provas de transição de estado para os validadores com base nesses blocos.

Você pode aprender mais sobre colators na página wiki relacionada do [Polkadot](https://wiki.polkadot.network/docs/learn-collator)

Na paracadeia Robonomics, cada colator recebe recompensas de (**0.001598184 XRT**) para cada bloco que o colator constrói (as recompensas ocorrem quando os blocos são selados na cadeia).
Além disso, o colator que constrói o bloco recebe **50% das taxas de transação** contidas no bloco que eles criam.

## Requisitos

É recomendado lançar um colator usando os **requisitos de hardware padrão** para [validadores Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ Compatível com x86-64.
+ Intel Ice Lake, ou mais recente (série Xeon ou Core); AMD Zen3, ou mais recente (EPYC ou Ryzen).
+ 4 núcleos físicos @ 3.4GHz.
+ Multithreading simultâneo desativado (Hyper-Threading na Intel, SMT na AMD).
+ Armazenamento - Um SSD NVMe de 1 TB (Deve ser dimensionado de forma razoável para lidar com o crescimento da blockchain).
+ Memória - 32 GB DDR4 ECC


Neste artigo, usamos as seguintes especificações:
+ 4 vCPU
+ 700 GB de espaço NVMe para bancos de dados do colator. A capacidade de expandir esse espaço em disco é necessária.
+ 8GB de RAM


## Informações importantes
1. Usamos algumas variáveis nestas instruções, e você precisará substituir os valores pelos seus em todos os comandos:
    + **%NODE_NAME%** é o nome do nó. Exemplo: *meu-colator-robonomics-kusama*
    + **%BASE_PATH%** é o caminho para o volume montado. Exemplo: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** é o endereço da conta no ecossistema Polkadot no formato SS58. Exemplo: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Observe que você precisa incluir *--state-cache-size=0* no lançamento do serviço do colator. Este parâmetro é importante para a estabilidade do colator.
Você pode ver mais informações na [questão](https://github.com/airalab/robonomics/issues/234) relacionada no github.

## Lançar facilmente um colator Robonomics pela primeira vez

Você pode lançar facilmente um colator diretamente na linha de comando para verificar erros.
Após fazer isso, é altamente recomendável lançar o colator Robonomics como um serviço (veja o próximo passo).

```
root@colator-screencast-robonomics:~# robonomics \
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


## Lançar o colator Robonomics como um serviço

1. Crie o usuário para o serviço com diretório pessoal
    ```
    root@colator-screencast-robonomics:~# useradd -m robonomics
    ```

2. Baixe, extraia e mova o binário Robonomics para o diretório */usr/local/bin/*. Você precisa substituir *$ROBONOMICS_VERSION* pela versão atual do Robonomics nos comandos desta seção. Você pode encontrar a versão atual na [página de lançamentos do repositório Robonomics no github](https://github.com/airalab/robonomics/releases).
   ```
   root@colator-screencast-robonomics:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@colator-screencast-robonomics:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@colator-screencast-robonomics:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Baixar binário Robonomics 1.4.0"} %}{% endroboWikiPicture %}


3. Crie o arquivo de serviço systemd chamado *robonomics.service*:
    ```
    root@colator-screencast-robonomics:~# nano /etc/systemd/system/robonomics.service
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

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Criar arquivo de serviço Robonomics"} %}{% endroboWikiPicture %}


    ```
    root@colator-screencast-robonomics:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Salve este arquivo, então habilite e inicie o serviço:
    ```
    root@colator-screencast-robonomics:~# systemctl enable robonomics.service
    root@colator-screencast-robonomics:~# systemctl start robonomics.service
    ```

URL de telemetria: https://telemetry.parachain.robonomics.network/#/Robonomics

Os logs dos colators podem ser monitorados com: `journalctl -u robonomics.service -f`

Assim que o colator Robonomics for lançado, ele começará a sincronizar com a Cadeia de Revezamento Kusama, o que pode levar um tempo considerável, dependendo da velocidade da sua rede e das especificações do sistema, então recomendamos baixar um snapshot do Kusama.


## Acelerando o processo de sincronização usando um snapshot do Kusama

Recomendamos fazer isso imediatamente após ter criado e iniciado o serviço Robonomics. Você pode encontrar mais informações sobre snapshots e instruções de uso na seguinte página: https://ksm-rocksdb.polkashots.io/

Instruções:

1. Pare o serviço Robonomics e remova o diretório do banco de dados Kusama atual:
    ```
    root@colator-screencast-robonomics:~# systemctl stop robonomics.service
    root@colator-screencast-robonomics:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Baixe o snapshot atual e extraia-o:
    ```
    root@colator-screencast-robonomics:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@colator-screencast-robonomics:~# tar -xf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Baixar snapshot do Kusama"} %}{% endroboWikiPicture %}

    Você pode remover o arquivo baixado após o desempacotamento bem-sucedido:
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

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Verificar logs do serviço"} %}{% endroboWikiPicture %}

## Solução de Problemas
### Erro: "Erro no banco de dados de estado: Muitos blocos irmãos inseridos"
Para corrigir esse erro, você pode simplesmente iniciar seu collator no modo de arquivo de arquivamento:

1) Primeiro, é necessário parar o serviço Robonomics:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) Em seguida, adicione o parâmetro `--state-pruning=archive` à parte parachain do arquivo de serviço. Exemplo do arquivo de serviço editado:
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

    [Install]
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

### Erro: "não é possível criar módulo: as configurações de compilação não são compatíveis com o host nativo"
Esse erro está relacionado aos parâmetros de virtualização. É necessário usar o tipo "host-model" do processador emulado. Você pode configurar isso no host de virtualização.

No entanto, se você encontrar esse erro em qualquer hospedagem, será necessário entrar em contato com o suporte técnico para resolver esse problema.