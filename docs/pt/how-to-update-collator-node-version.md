---
title: Como atualizar a versão do nó Robonomics Collator

contributors: [Leemo94]
---

Recomenda-se ler os seguintes artigos antes de ler esta postagem: ["Como construir um nó Collator"](/docs/how-to-build-collator-node) e ["Como lançar o Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

Este artigo contém os comandos necessarios para atualizar um nó collator Robonomics (executando no Ubuntu) e também dá um exemplo posteriormente.

## **Comandos necessários**

0. Antes de começar, é recomendado que você esteja logado como `root`, caso contrário, recomendo que você use:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Pare o serviço Robonomics:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Remova a versão anterior do Robonomics (certifique-se de estar no diretório correto):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Obtenha a [versão mais recente](https://github.com/airalab/robonomics/releases) do Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Extraia o arquivo:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Mova o arquivo:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

Você precisa mover este arquivo para o diretório correto onde você instalou o nó Robonomics)

</robo-wiki-note>

6. Inicie o Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Exemplo de atualização do nó collator para Robonomics v1.8.4:

<code-helper>

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
</code-helper>

## **Alterando o banco de dados da cadeia de retransmissão Kusama sem definir um caminho base**

Há momentos em que certos instantâneos da cadeia de retransmissão Kusama causam erros no seu nó. Isso geralmente faz com que o nó pare de funcionar. Exemplo de erro causado por um banco de dados corrompido da cadeia de retransmissão:

<code-helper>

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
</code-helper>

Para corrigir esse erro, você deve remover o banco de dados existente da cadeia de retransmissão Kusama (provavelmente RocksDb) e substituí-lo por outro banco de dados, como ParityDb. Execute os seguintes comandos:

1. Encontre o diretório do nó Robonomics e verifique os arquivos:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Confirme que você vê o diretório polkadot e, em seguida, navegue até o diretório chains:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Exclua o diretório `ksmcc3`:

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Crie um novo diretório `ksmcc3`.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Agora você precisa baixar um novo instantâneo. Este exemplo usa um instantâneo da cadeia de retransmissão fortemente podado, mas você pode trocá-lo por qualquer instantâneo que preferir.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Enquanto o instantâneo está sendo baixado, abra uma nova sessão e edite seu arquivo de serviço:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Modifique as linhas dentro do arquivo de serviço que se referem ao banco de dados e poda:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Use `Ctrl + S` e depois `Ctrl + X` para salvar e sair do arquivo de serviço.

7. Agora você precisa recarregar seu daemon.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. Neste momento, em sua outra sessão, esperamos que o novo banco de dados tenha sido baixado, então extraia o arquivo:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. Após a descompactação ser concluída, execute o seguinte:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Agora você pode iniciar o serviço, monitorá-lo em busca de erros e verificar se ele está se conectando tanto à cadeia de retransmissão quanto à parachain.


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>