---
title: Como Atualizar a Versão do Nó Colator Robonomics

contributors: [Leemo94]
---

É recomendável ter lido os seguintes artigos antes de ler este post: ["Como Construir um Nó Colator"](/docs/how-to-build-collator-node) & ["Como Iniciar o Colator Robonomics"](/docs/how-to-launch-the-robonomics-collator).

Este artigo contém os comandos necessários para atualizar um nó colator Robonomics (rodando no Ubuntu), e também dá um exemplo posteriormente.

## **Comandos Necessários**

0. Antes de começar, é recomendável que você esteja logado como `root`, se não estiver, recomendo que você use:


{% codeHelper { copy: true} %}

```shell
sudo su -
```

{% endcodeHelper %}

1. Pare o serviço Robonomics:

{% codeHelper { copy: true} %}

```shell
systemctl stop robonomics.service
```

{% endcodeHelper %}


2. Remova a versão anterior do Robonomics (certifique-se de estar no diretório correto):

{% codeHelper { copy: true} %}

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

{% endcodeHelper %}

3. Obtenha a [última versão de lançamento](https://github.com/airalab/robonomics/releases) do Robonomics:


{% codeHelper { copy: true}%}

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

{% endcodeHelper %}


4. Extraia o arquivo:

{% codeHelper { copy: true}%}

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

{% endcodeHelper %}


5. Mova o arquivo:

{% codeHelper { copy: true}%}

```shell
mv robonomics /usr/local/bin/
```

{% endcodeHelper %}

{% roboWikiNote {type: "note"}%} Você precisa mover este arquivo para o diretório correto onde você instalou o nó Robonomics {% endroboWikiNote %}

6. Inicie o Robonomics:

{% codeHelper { copy: true}%}

```shell
systemctl start robonomics.service
```

{% endcodeHelper %}

Exemplo de atualização do nó colator para Robonomics v1.8.4:

{% codeHelper %}

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service

```

{% endcodeHelper %}


## **Alterando o Banco de Dados da Cadeia de Revezamento Kusama sem Caminho Base Definido**

Há momentos em que certos instantâneos da Cadeia de Revezamento Kusama causam erros em seu nó. Isso frequentemente faz com que seu nó pare de funcionar. Exemplo de erro causado por um banco de dados da Cadeia de Revezamento corrompido:


{% codeHelper %}

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

{% endcodeHelper %}


Para corrigir este erro, você deve remover seu banco de dados existente da Cadeia de Revezamento Kusama (provavelmente RocksDb) e substituí-lo por outro banco de dados como ParityDb. Execute os seguintes comandos:

1. Encontre o diretório do nó Robonomics e verifique os arquivos:

{% codeHelper %}

```shell
cd /home/robonomics/
ls -a
```

{% endcodeHelper %}


2. Confirme que você vê o diretório polkadot e então navegue até o diretório chains:


{% codeHelper %}

```shell
cd /polkadot/chains/
ls -a
```

{% endcodeHelper %}

3. Delete o diretório `ksmcc3`:


{% codeHelper {copy: true} %}

```shell
rm -r ksmcc3
```

{% endcodeHelper %}


4. Crie um novo diretório `ksmcc3`.

{% codeHelper {copy: true} %}

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

{% endcodeHelper %}

5. Agora você precisa baixar um novo instantâneo. Este exemplo usa um instantâneo da cadeia de revezamento fortemente podado, mas você pode trocá-lo por qualquer instantâneo que preferir.


{% codeHelper {copy: true} %}

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

{% endcodeHelper %}

6. Enquanto o instantâneo está sendo baixado, abra uma nova sessão e edite seu arquivo de serviço:

{% codeHelper {copy: true} %}

```shell
sudo nano /etc/systemd/system/robonomics.service
```

{% endcodeHelper %}

Modifique as linhas dentro do arquivo de serviço que se referem ao banco de dados e poda:


{% codeHelper {copy: true} %}

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

{% endcodeHelper %}


Use `Ctrl + S` e depois `Ctrl + X` para salvar e sair do arquivo de serviço.

7. Agora você precisa recarregar seu daemon.

{% codeHelper {copy: true} %}

```shell
systemctl daemon-reload
```

{% endcodeHelper %}


8. Neste momento, em sua outra sessão, esperançosamente o novo banco de dados foi baixado, então extraia o arquivo:

{% codeHelper {copy: true} %}

```shell
tar -xvzf ksm_pruned.tar.gz
```

{% endcodeHelper %}


9. Após a descompactação ser concluída, execute o seguinte:

{% codeHelper {copy: true} %}

```shell
chown -R robonomics:robonomics paritydb
```

{% endcodeHelper %}

10. Agora você pode iniciar o serviço, monitorá-lo para quaisquer erros e verificar se ele está se conectando tanto à cadeia de revezamento quanto à paracadeia:

{% codeHelper {copy: true} %}

```shell
systemctl start robonomics && journalctl -fu robonomics
```

{% endcodeHelper %}