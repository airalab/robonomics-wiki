---
title: Robonomics + Prometheus + Grafana 

contributors: [Vourhey]
---

**A seguinte instrução é fornecida por [Hubo Bubo](https://github.com/hubobubo)**

**O artigo original está localizado [aqui](https://github.com/hubobubo/robonomics/wiki/Robonomics-(XRT)-metrics-using-Prometheus-and-Grafana)**

## Introdução
Para monitorar e manter melhor o(s) nó(s) do Robonomics, é bom configurar um monitoramento baseado no Prometheus Server e Grafana. Este documento mostrará como configurar cada um deles para monitorar completamente o seu nó.

##  Pré-requisitos
* [Configuração do servidor com Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04) 
* [Collator parachain do Robonomics instalado](https://blog.aira.life/installing-and-running-the-robonomics-validator-in-the-polkadot-network-487ad4c1a567)
* Certifique-se de que o robonomics.service esteja funcionando em sua máquina e a porta 9615 esteja acessível 

## Passo 1 - Criando Usuários de Serviço

Por motivos de segurança, começaremos criando duas novas contas de usuário, prometheus e node_exporter. Crie esses dois usuários e use as opções _--no-create-home_ e _--shell /bin/false_ para que esses usuários não possam fazer login no servidor.
```
sudo useradd --no-create-home --shell /bin/false prometheus
sudo useradd --no-create-home --shell /bin/false node_exporter
```

Antes de baixarmos os binários do Prometheus, crie os diretórios necessários para armazenar os arquivos e dados do Prometheus. Seguindo as convenções padrão do Linux, criaremos um diretório em _/etc_ para os arquivos de configuração do Prometheus e um diretório em _/var/lib_ para seus dados.
```
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
```
Agora, defina a propriedade do usuário e do grupo nos novos diretórios para o usuário prometheus.
```
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```
## Passo 2 - Baixando o Prometheus

Primeiro, baixe e descompacte a versão estável atual do Prometheus em seu diretório pessoal. Você pode encontrar os binários mais recentes na [página de download do Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz

```
Agora, descompacte o arquivo baixado.

```
tar xvf prometheus-2.21.0.linux-amd64.tar.gz

```
Isso criará um diretório chamado prometheus-2.21.0.linux-amd64 contendo dois arquivos binários (prometheus e promtool), diretórios _consoles_ e _console_libraries_ contendo os arquivos da interface da web, uma licença, um aviso e vários arquivos de exemplo.

Copie os dois binários para o diretório _/usr/local/bin_.

```
sudo cp prometheus-2.21.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.21.0.linux-amd64/promtool /usr/local/bin/

```
Defina a propriedade do usuário e do grupo nos binários para o usuário prometheus criado no Passo 1.

```
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

```
Copie os diretórios consoles e _console_libraries_ para _/etc/prometheus_.

```
sudo cp -r prometheus-2.21.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.21.0.linux-amd64/console_libraries /etc/prometheus

```
Defina a propriedade do usuário e do grupo nos diretórios para o usuário prometheus. Usar a opção -R garantirá que a propriedade seja definida nos arquivos dentro do diretório também.

```
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

```
Agora que o Prometheus está instalado, criaremos seus arquivos de configuração e serviço em preparação para sua primeira execução.

## Passo 3 - Configurando o Prometheus

No diretório _/etc/prometheus_, use o nano ou o seu editor de texto favorito para criar um arquivo de configuração chamado _prometheus.yml_.

```
sudo nano /etc/prometheus/prometheus.yml

```
Nas configurações globais, defina o intervalo padrão para coletar métricas. Observe que o Prometheus aplicará essas configurações a todos os exportadores, a menos que as configurações próprias de um exportador individual substituam as globais.

```
global:
  scrape_interval: 15s

```
Esse valor de scrape_interval diz ao Prometheus para coletar métricas de seus exportadores a cada 15 segundos, o que é tempo suficiente para a maioria dos exportadores.
Agora, adicione o próprio Prometheus à lista de exportadores a serem coletados com a seguinte diretiva scrape_configs:

```
...
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
O Prometheus usa o _job_name_ para rotular exportadores em consultas e gráficos, portanto, certifique-se de escolher algo descritivo aqui.

E, como o Prometheus exporta dados importantes sobre si mesmo que você pode usar para monitorar o desempenho e depurar, substituímos a diretiva global scrape_interval de 15 segundos para 5 segundos para atualizações mais frequentes.

Por fim, o Prometheus usa as diretivas _static_configs_ e _targets_ para determinar onde os exportadores estão sendo executados. Como esse exportador específico está sendo executado no mesmo servidor que o próprio Prometheus, podemos usar localhost em vez de um endereço IP junto com a porta padrão, 9090.

Seu arquivo de configuração deve ficar assim:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
```
Salve o arquivo e saia do editor de texto.

Agora, defina a propriedade do usuário e do grupo no arquivo de configuração para o usuário prometheus criado no Passo 1.

```
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

```
Com a configuração concluída, estamos prontos para testar o Prometheus executando-o pela primeira vez.

## Passo 4 - Executando o Prometheus

Inicie o Prometheus como usuário _prometheus_, fornecendo o caminho tanto para o arquivo de configuração quanto para o diretório de dados.

```
sudo -u prometheus /usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries
```

A saída contém informações sobre o progresso de carregamento do Prometheus, arquivo de configuração e serviços relacionados. Ele também confirma que o Prometheus está ouvindo na porta _9090_.

```
_log output_
Sep 14 17:55:53 robonomics systemd[1]: Started Prometheus.
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.347Z caller=main.go:310 msg="No time or size retention was set so using the default time retention" duration=15d
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.350Z caller=main.go:346 msg="Starting Prometheus" version="(version=2.21.0, branch=HEAD, revision=e83ef207b6c2398919b69cd87d2693cfc2fb4127)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:347 build_context="(go=go1.15.2, user=root@a4d9bea8479e, date=20200911-11:35:02)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:348 host_details="(Linux 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 robonomics (none))"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:349 fd_limits="(soft=1024, hard=4096)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.351Z caller=main.go:350 vm_limits="(soft=unlimited, hard=unlimited)"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.357Z caller=main.go:701 msg="Starting TSDB ..."
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.368Z caller=web.go:523 component=web msg="Start listening for connections" address=0.0.0.0:9090
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.372Z caller=head.go:644 component=tsdb msg="Replaying on-disk memory mappable chunks if any"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:658 component=tsdb msg="On-disk memory mappable chunks replay completed" duration=12.659µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.373Z caller=head.go:664 component=tsdb msg="Replaying WAL, this may take a while"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.380Z caller=head.go:716 component=tsdb msg="WAL segment loaded" segment=0 maxSegment=1
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:716 component=tsdb msg="WAL segment loaded" segment=1 maxSegment=1
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.381Z caller=head.go:719 component=tsdb msg="WAL replay completed" checkpoint_replay_duration=48.125µs wal_replay_duration=8.253748ms total_replay_duration=8.343335ms
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.383Z caller=main.go:721 fs_type=EXT4_SUPER_MAGIC
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:724 msg="TSDB started"
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:850 msg="Loading configuration file" filename=/etc/prometheus/prometheus.yml
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:881 msg="Completed loading of configuration file" filename=/etc/prometheus/prometheus.yml totalDuration=908.135µs remote_storage=6.693µs web_handler=819ns query_engine=1.383µs scrape=400.232µs scrape_sd=41.679µs notify=1.1µs notify_sd=1.847µs rules=1.522µs
Sep 14 17:55:53 robonomics prometheus[29488]: level=info ts=2020-09-14T15:55:53.384Z caller=main.go:673 msg="Server is ready to receive web requests."
```
Se você receber uma mensagem de erro, verifique se você usou a sintaxe YAML em seu arquivo de configuração e siga as instruções na tela para resolver o problema.

Agora, pare o Prometheus pressionando _CTRL+C_ e abra um novo arquivo de serviço _systemd_.

```
sudo nano /etc/systemd/system/prometheus.service

```
O arquivo de serviço informa ao _systemd_ para executar o Prometheus como usuário prometheus, com o arquivo de configuração localizado no diretório _/etc/prometheus/prometheus.yml_ e para armazenar seus dados no diretório _/var/lib/prometheus_. Copie o seguinte conteúdo para o arquivo:

```
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

Por fim, salve o arquivo e feche o editor de texto. Para usar o serviço recém-criado, recarregue o systemd.

```
sudo systemctl daemon-reload

```
Agora você pode iniciar o Prometheus usando o seguinte comando:

```
sudo systemctl start prometheus

```
Para garantir que o Prometheus esteja em execução, verifique o status do serviço.

```
sudo systemctl status prometheus

```
A saída informa o status do Prometheus, o identificador do processo principal (PID), o uso de memória e muito mais.

Se o status do serviço não estiver ativo, siga as instruções na tela e refaça os passos anteriores para resolver o problema antes de continuar o tutorial.

```
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:59:48 CEST; 24h ago
 Main PID: 29650 (prometheus)
    Tasks: 9 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-29650 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Quando estiver pronto para prosseguir, pressione _Q_ para sair do comando de status. Por último, habilite o serviço para iniciar na inicialização.

```
sudo systemctl enable prometheus

```

Agora que o Prometheus está em execução, podemos instalar um exportador adicional para gerar métricas sobre os recursos do nosso servidor.

## Passo 5 — Baixando o Node Exporter

Para expandir o Prometheus além das métricas apenas sobre si mesmo, vamos instalar um exportador adicional chamado Node Exporter. O Node Exporter fornece informações detalhadas sobre o sistema, incluindo uso de CPU, disco e memória. Baixe a versão estável atual do Node Exporter para o seu diretório pessoal. Você pode encontrar os binários mais recentes na [página de download do Prometheus.](https://prometheus.io/download/)

```
wget https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz

```
Agora, descompacte o arquivo baixado.

```
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz

```
Isso criará um diretório chamado _node_exporter-1.0.1.linux-amd64_ contendo um arquivo binário chamado _node_exporter_, uma licença e um aviso.

Copie o binário para o diretório _/usr/local/bin_ e defina a propriedade de usuário e grupo para o usuário node_exporter que você criou no Passo 1.

```
sudo cp node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

```
Agora que você instalou o Node Exporter, vamos testá-lo executando-o antes de criar um arquivo de serviço para que ele seja iniciado na inicialização.

## Passo 6 — Executando o Node Exporter

Os passos para executar o Node Exporter são semelhantes aos passos para executar o próprio Prometheus. Comece criando o arquivo de serviço Systemd para o Node Exporter.

```
sudo nano /etc/systemd/system/node_exporter.service

```
Copie o seguinte conteúdo para o arquivo de serviço:

```
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter --collector.systemd

[Install]
WantedBy=multi-user.target
```

Salve o arquivo e feche o editor de texto. Por fim, recarregue o systemd para usar o serviço recém-criado.

```
sudo systemctl daemon-reload

```
Agora você pode executar o Node Exporter usando o seguinte comando:

```
sudo systemctl start node_exporter

```
Verificar that Node Exporter’s running correctly with the status command.

```
sudo systemctl status node_exporter

```
Como antes, esta saída informa o status do Node Exporter, o identificador do processo principal (PID), o uso de memória e muito mais. Se o status do serviço não estiver ativo, siga as mensagens na tela e refaça os passos anteriores para resolver o problema antes de continuar.

```
_Output_
* node_exporter.service - Node Exporter
   Loaded: loaded (/etc/systemd/system/node_exporter.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-09-14 17:58:25 CEST; 1 day 1h ago
 Main PID: 29612 (node_exporter)
    Tasks: 7 (limit: 4915)
   CGroup: /system.slice/node_exporter.service
           `-29612 /usr/local/bin/node_exporter --collector.systemd
```
Por último, habilite o Node Exporter para iniciar na inicialização.

```
sudo systemctl enable node_exporter

```
Com o Node Exporter totalmente configurado e em execução conforme o esperado, vamos informar ao Prometheus para começar a coletar as novas métricas.

## Passo 7 — Configurando o Prometheus para coletar o Node Exporter

Como o Prometheus só coleta exportadores que estão definidos na parte scrape_configs de seu arquivo de configuração, precisaremos adicionar uma entrada para o Node Exporter, assim como fizemos para o próprio Prometheus. Abra o arquivo de configuração.

```
sudo nano /etc/prometheus/prometheus.yml

```
No final do bloco scrape_configs, adicione uma nova entrada chamada node_exporter.

```
...
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Como este exportador também está sendo executado no mesmo servidor que o próprio Prometheus, podemos usar localhost novamente junto com a porta padrão do Node Exporter, 9100. Seu arquivo de configuração completo deve ficar assim:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
```
Salve o arquivo e saia do editor de texto quando estiver pronto para continuar. Por fim, reinicie o Prometheus para que as alterações entrem em vigor.

```
sudo systemctl restart prometheus

```
Mais uma vez, verifique se tudo está sendo executado corretamente com o comando de status.

```
sudo systemctl status prometheus

```
Se o status do serviço não estiver definido como ativo, siga as instruções na tela e refaça os passos anteriores antes de prosseguir.

```
Output
* prometheus.service - Prometheus
   Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2020-09-15 19:06:56 CEST; 2s ago
 Main PID: 19725 (prometheus)
    Tasks: 8 (limit: 4915)
   CGroup: /system.slice/prometheus.service
           `-19725 /usr/local/bin/prometheus --config.file /etc/prometheus/prometheus.yml --storage.tsdb.path /var/lib/prometheus/ --web.console.templates=/etc/prometheus/consoles --web.console.libraries=/etc/prometheus/console_libraries
```

Agora temos o Prometheus e o Node Exporter instalados, configurados e em execução.

## Passo 8 - Adicionando o build in node_exporter do Robonomic

Depois de instalar com sucesso o Prometheus e o node_exporter, teremos que usar o exportador do Prometheus integrado em cada projeto do substrato. Para fazer isso, precisamos adicionar uma entrada adicional em _/etc/prometheus/prometheus.yml_. 
Abra o arquivo de configuração.

```
sudo nano /etc/prometheus/prometheus.yml

```
No final do bloco scrape_configs, adicione uma nova entrada chamada robonomic_exporter.

``` 
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```
Salve o arquivo e saia do seu editor de texto. Seu arquivo de configuração completo deve ficar assim:

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9100']
  - job_name: 'robonomics_exporter'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9615']
```

Por fim, reinicie o Prometheus para que as alterações entrem em vigor.

```
sudo systemctl restart prometheus

```
Mais uma vez, verifique se tudo está sendo executado corretamente com o comando de status.

```
sudo systemctl status prometheus

```
Agora temos o _Prometheus_, o _Node Exporter_ e o _Robonomic Exporter_ instalados, configurados e em execução. Agora siga para o Grafana.

## Passo 9 - Configurando o Grafana

O último passo é conectar o Prometheus como uma Fonte de Dados no Grafana. Para este tutorial, usaremos o grafana baseado em nuvem gratuito, que permite ter até 5 painéis, além do [painel dedicado do Robonomics](https://grafana.com/grafana/dashboards/13015). Basta ir para [grafana.com](https://grafana.com/), criar uma nova conta e fazer login na sua instância recém-criada do grafana.

No início, devemos adicionar ao Grafana uma nova _**Fonte de Dados**_, que neste caso será o servidor Prometheus.
Acesse Fonte de Dados:

>![DataSource](../images/prometheus-grafana/grafana-6-2020-09-15-19-18-50-Window.png)

Em seguida, clique em **_Adicionar fonte de dados_**

>![DataSource](../images/prometheus-grafana/grafana-7-2020-09-15-19-18-50-Window.png)

Next selecione _**Prometheus**_

>![DataSource](../images/prometheus-grafana/grafana-8-2020-09-15-19-18-50-Window.png)

Na nova tela, insira o **_endereço IP do servidor Prometheus com a porta 9090_**

> ![DataSource](../images/prometheus-grafana/grafana-9-2020-09-15-19-18-50-Window.png)

Depois disso, _**Salve e teste**_ se você seguiu todos os passos, você deve ver a cor verde e estar pronto para importar o painel. No site principal, clique em **+** e depois em **Importar**, como mostrado na imagem abaixo:

> ![Import dashboard](../images/prometheus-grafana/grafana-1-2020-09-15-19-18-50-Window.png)

Em seguida, você verá a página de importação:

> ![Import page](../images/prometheus-grafana/grafana-2-2020-09-15-19-18-50-Window.png)

No campo _URL ou ID do painel do Grafana.com_, escreva _**13015**_ (pois este é o ID do painel do Robonomic)

> ![Import Robonomic dashboard](../images/prometheus-grafana/grafana-3-2020-09-15-19-18-50-Window.png)

Ao carregar o painel externo, você verá esta tela:

> ![XRT 13015 dashboard import](../images/prometheus-grafana/grafana-4-2020-09-15-19-18-50-Window.png)

O último passo é escolher a **_Fonte de Dados_** previamente criada e clicar em _**Importar**_

> ![Prometheus as a DataSource](../images/prometheus-grafana/grafana-5-2020-09-15-19-18-50-Window.png)

PRONTO! Neste ponto, você deverá ver o painel importado. 


## Referências

* [Como instalar o Prometheus no Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-prometheus-on-ubuntu-16-04)
* [Criando um painel de monitoramento com Prometheus + Grafana](https://medium.com/htc-research-engineering-blog/build-a-monitoring-dashboard-by-prometheus-grafana-741a7d949ec2)
* [Suporte do Grafana para Prometheus](https://prometheus.io/docs/visualization/grafana/)
* [Monitorando métricas de host Linux com o node exporter](https://prometheus.io/docs/guides/node-exporter/)
* [Consultando o Prometheus](https://prometheus.io/docs/prometheus/latest/querying/basics/)
* [Visualizando métricas de nó](https://substrate.dev/docs/en/tutorials/visualize-node-metrics/)
* [Exportador do Prometheus para Substrate](https://github.com/paritytech/substrate/tree/master/utils/prometheus)
* [polkadot-dashboard](https://github.com/w3f/polkadot-dashboard)
* [Métricas do nó Polkadot](https://grafana.com/grafana/dashboards/12425)
* [Painel do Exportador de Nó para Prometheus](https://grafana.com/grafana/dashboards/11074)
* [Métricas do ROBONOMICS (XRT) do Grafana](https://grafana.com/grafana/dashboards/13015)

