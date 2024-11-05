---
title: Como Editar a Wiki
contributors: [positivecrash]
description: Maneiras de nos ajudar a melhorar nossa wiki
---

**A Wiki da Robonomics é de código aberto. Qualquer correção é bem-vinda: corrigir erros, digitação, informações confusas ou desatualizadas, tradução para qualquer idioma. Você precisará de uma conta no [GitHub](https://github.com/).**


## Como editar

Se você precisar editar documentos da Wiki da Robonomics, siga estas etapas

Certifique-se de ter o [Node.js](https://nodejs.org/en/download/package-manager/) instalado.

### 1. Clonar repositório

Primeiro, você precisa clonar o repositório da wiki:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Vá para o diretório do repositório e execute os seguintes comandos:

`usando npm`
```
cd robonomics-wiki
npm install
```

`usando yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Servir localmente (desenvolver, desenvolver-m1)

`a versão do node deve ser 20 || >=22`

Em seguida, implante o projeto localmente:

```
npm run start
```

> pode ser necessário criar um arquivo .env com as mesmas variáveis do arquivo .env.example

### 3. Fazer PR

[Criar pull request](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) para [repositório wiki](https://github.com/airalab/robonomics-wiki)

## Componentes

{% roboWikiNote {title:"COMPONENTES PERSONALIZADOS", type: "aviso"}%} Uma **dica** ao adicionar componentes personalizados:
Se houver algo errado com o layout após adicionar um componente, você pode querer verificar os espaços. Deve ajudar a **REMOVER** os espaços após a tag de abertura e de fechamento (como no exemplo abaixo){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"teste", type: "ok"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Código

Você pode adicionar extras úteis ao seu código:

`código com botão de cópia`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

algum texto de código
	outra linha de teste
		outra coisa

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

ou `código com linha adicional`

```bash
{% raw %}{% codeHelper { additionalLine: "linha adicional"}%}{% endraw %}

algum texto de código
	outra linha de teste
		outra coisa

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Propriedades para code-helper**

| Propriedade         | Tipo| Obrigatório | Padrão   | Descrição                                                 |
|------------------|-----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | adicionar um botão de cópia para o seu código            |
| `additionalLine` | `String`  | `false`  | ''       | linha adicional para o seu código que será exibida acima  |


{% codeHelper { additionalLine: "linha adicional", copy: true}%}

```bash
algum texto de código
	outra linha de teste
		outra coisa
```

{% endcodeHelper %}


### Frontmatter
Documentos na Wiki do Robonomics contêm um bloco de frontmatter. Deve estar no topo do arquivo Markdown e deve ter a forma de YAML válido entre linhas de traços triplos. Entre as linhas de traços triplos, você pode definir ou editar as seguintes opções:

```YAML
---
title: Como contribuir # Título da página, não é necessário duplicá-lo no texto
contributors: [positivecrash] # Principais contribuidores (quem cura ativamente esta página). Apelido do GitHub necessário, sem nenhum símbolo adicional
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # Ferramentas que foram usadas para testes de tecnologia
---
```

### Grid
Ajuda a adicionar layout de grade aos elementos:

- Use primeiro o componente de envoltório de grade:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- E então use quantos componentes de itens de grade desejar dentro do envoltório:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} primeiro elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} segundo elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} terceiro elemento {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**Propriedades para robo-wiki-grid-wrapper**

| Propriedade | Tipo     | Obrigatório | Padrão | Descrição                                                             |
|-------------|----------|-------------|--------|------------------------------------------------------------------------|
| `columns`   | `Número` | `false`     | 4      | você pode escolher o número de colunas:   <br/> - de `1 a 5`           |
| `align`     | `String` | `false`     |        | alinhar itens no eixo do bloco:   <br/> - opções: `start, center, end` |
| `justify`   | `String` | `false`     |         | alinhar itens no eixo inline:  <br/> - opções: `início, centro, fim` |
| `textAlign` | `String` | `falso`  | `esquerda`  | alinhar texto dentro da grade:  <br/> - opções: `esquerda, centro, direita`        |

{% roboWikiGridWrapper {colunas: '3', textAlign: 'centro', flexível: verdadeiro} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"necessidade"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (pelo menos 2 GB de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"necessidade"} %}{% endroboWikiPicture %}
	<b>Cartão SD de 16Gb</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"necessidade"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptador Zigbee (Opcional) </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivos inteligentes Zigbee (Opcionalmente) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Computador para configuração</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Imagens

#### Como fazer upload
Faça o upload da imagem na pasta `src/assets/docs/images/url-of-your-doc`
* Se a imagem precisar ser localizada, insira todas elas em uma única pasta
* Use o apêndice de localidade no nome das imagens se estiver localizado, por exemplo, `image_en.jpg`
* Certifique-se de que sua imagem esteja otimizada para a web e ao mesmo tempo pareça boa

#### Como inserir

Existem duas maneiras de inserir imagens em seus documentos:

{% roboWikiNote {type: 'warning'}%} É recomendado inserir imagens com a tag embutida `<robo-wiki`-picture>`, mas você também pode usar a maneira padrão para arquivos Markdown. {% endroboWikiNote %}

`com legenda`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki robomomics", link: '/docs/overview', caption: "EXPLORAR"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ou sem legenda`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki robomomics", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ou imagem simples`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki robomomics"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ou imagem simples com legenda`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorar wiki robomomics", caption: "EXPLORAR"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Propriedades para robo-wiki-picture:**

| Propriedade | Tipo      | Obrigatório | Padrão | Descrição                                                                                                                                                                                                          |
|------------|-----------|------------|---------||----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | caminho para a imagem:  <br/> - se você enviou sua imagem diretamente para `/src/assets/images/docs/` use: `url-do-seu-doc` <br/> - se você enviou a imagem em uma das pastas, use: `nome-da-pasta/url-do-seu-doc` |
| `link`    | `String`  | `false`  |         | alinhar itens no eixo do bloco:   <br/> - opções: `início, centro, fim`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | alinhar itens no eixo inline:  <br/> - opções: `início, centro, fim`                                                                                                                                               |
| `alt`     | `String`  | `true`   | imagem | fornece informações alternativas para uma imagem se um usuário, por algum motivo, não puder visualizá-la                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | ampliar imagem                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | existem duas opções: lazy e eager                                                                                                                                                                                |

### Notas e avisos
Você pode adicionar notas e atribuir a elas tipos específicos:
* aviso (<span style="color:#f08432">**com imagem**</span>)
* okay (<span style="color:#3eaf7c">**cor verde**</span>)
* nota (<span style="color:#90a4b7">**cor cinza**</span>)

`nota com título`

```c
{% raw %} {% roboWikiNote {title:"TÍTULO DE EXEMPLO", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`nota com conteúdo`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`nota com título e conteúdo`

```c
{% raw %} {% roboWikiNote {title: "TÍTULO", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Junte-se ao Discord", type: "okay"}%} [Junte-se ao Discord dos Desenvolvedores da Robonomics](https://discord.gg/jTxqGeF5Qy) para se conectar com a comunidade e obter suporte técnico. {% endroboWikiNote %}

{% roboWikiNote {title: "Junte-se ao Discord"}%} [Junte-se ao Discord dos Desenvolvedores da Robonomics](https://discord.gg/jTxqGeF5Qy) para se conectar com a comunidade e obter suporte técnico. {% endroboWikiNote %}

{% roboWikiNote {title: "Junte-se ao Discord", type: "warning"}%} [Junte-se ao Discord dos Desenvolvedores Robonomics](https://discord.gg/jTxqGeF5Qy) para se conectar com a comunidade e obter suporte técnico. {% endroboWikiNote %}

**Propriedades para nota de wiki de robô**

| Propriedade | Tipo      | Obrigatório | Padrão | Descrição                                                    |
|------------|-----------|-------------|--------|--------------------------------------------------------------|
| `type`     | `String`  | `false`     |        | - existem três tipos no total: `note`, `warning`, `okay`     |
| `title`    | `String`  | `false`     |        | adiciona título à sua nota                                   |


### Abas
Você pode adicionar abas ao documento:

- Use o componente de envoltório de abas:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- E então use quantos componentes de itens de aba desejar dentro do envoltório:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}{% endraw %}
```

<br/>

`guias horizontais`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`guias verticais`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`item de guia com borda`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Propriedades para robo-wiki-tabs (embrulho)**

| Propriedade | Tipo     | Obrigatório | Padrão    | Descrição                                                       |
|------------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - Array com títulos para cada aba                                  |
| `mode`   | `String` | `false`  | horizontal | você pode escolher o modo das abas: <br/> - `horizontal` <br/> - `vertical` |

**Propriedades para robo-wiki-tab (item)**

| Propriedade | Tipo      | Obrigatório | Padrão | Descrição                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - adicionar borda ao invólucro de conteúdo |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Título com âncoras
Você pode criar títulos personalizados com âncoras e atribuir-lhes um valor específico`Título com âncora`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

ou `Título sem âncora`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (título personalizado) {% endroboWikiTitle %}

<br/>

**Propriedades para robo-wiki-title**

| Propriedade | Tipo                   | Obrigatório | Padrão | Descrição            |
|------------|------------------------|-------------|--------|----------------------|
| `type`     | `Número (de 2 a 6)`    | `verdadeiro`|        | escolha o nível do título |
| `anchor`   | `String`               | `falso`     |        | valor para a âncora |

### Vídeos

Existem duas maneiras de inserir vídeos em seus documentos:

{% roboWikiNote {type: "warning"}%} É recomendado inserir vídeos com a tag embutida `<robo-wiki-video>`, no entanto, você também pode usar o método padrão para arquivos Markdown. {% endroboWikiNote %}

#### IPFS / Servidor
Você precisa especificar o formato do vídeo

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"Sobre gateways"}%} O gateway para o link é escolhido automaticamente a partir do arquivo de configuração - `src/_data/video_config.js`. Você pode adicionar ou remover alguns gateways alterando o arquivo. {% endroboWikiNote %}


#### Local

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Propriedades

- Se estiver adicionando um arquivo com mais de <span style="color:#af1c1c">10MB</span>, por favor, faça o upload no servidor, não no repositório.

- Você pode usar quaisquer propriedades para a [tag de vídeo HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Formatos aceitáveis - mp4, webm, ogg.

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|---|---|---|---|---|
| `videos` |`Array` | `true` |  | Array de objetos [{src: `caminho para o vídeo`, tipo: `tipo de vídeo`}] |


#### YouTube
Você pode incorporar qualquer vídeo do YouTube no documento inserindo o link de compartilhamento como um parágrafo separado sem aspas ou tags adicionais, por exemplo: `https://youtu.be/kQaSwNYHJQ8`

No entanto, se precisar de um autoplay, você deve usar um componente especial:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**Propriedades para robo-wiki-youtube**

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|---|---|---|---|---|
| `link` | `String` | `true` |  | link para o vídeo do YouTube |
| `autoplay` | `Boolean` | `false` | `false` | reproduz automaticamente o vídeo do YouTube |
| `loop` | `Boolean` | `false` | `false` | faz loop no vídeo do YouTube |


## Como editar a navegação da barra lateral

Se precisar editar a navegação da barra lateral do Robonomics Wiki, siga estas etapas:

* Edite o arquivo `src/_data/sidebar_docs.json`.

* Decida onde colocar seu documento

* Use JSON válido para `src/_data/sidebar_docs.json` e confie noestrutura de arquivo existente

* Você deve adicionar novas linhas ao arquivo de tradução `translations/pages/en.json` também, se você não tiver traduzido novo conteúdo anteriormente, por exemplo:

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **NOTA IMPORTANTE:** se você estiver usando o mesmo documento em diferentes seções/subseções, por exemplo:

```

{
	"title": "Atualizar Home Assistant OS",
	"children": [
	{
		"title": "Ativar Assinatura",
		"url": "/docs/sub-activate",
	}],
	"title": "Atualizar Home Assistant Docker para SO semelhante ao Unix",
		"children": [
	{
		"title": "Ativar Assinatura",
		"url": "/docs/sub-activate",
	}],
}

```

CERTIFIQUE-SE DE ADICIONAR O PARÂMETRO `topic` ASSIM:

(para que a navegação funcione corretamente)

```
{
	"title": "Atualizar Home Assistant OS",
	"children": [
	{
		"title": "Ativar Assinatura",
		"url": "/docs/sub-activate",
		"topic": "Atualizar Home Assistant OS"
	}],
	"title": "Atualizar Home Assistant Docker para SO semelhante ao Unix",
		"children": [
	{
		"title": "Ativar Assinatura",
		"url": "/docs/sub-activate",
		"topic": "Atualizar Home Assistant Docker para SO semelhante ao Unix"
	}],
}

```

## Como adicionar navegação personalizada para documentos

* Editar arquivo`src/_data/sidebar_docs.json`.

* Encontre o documento correto e adicione os parâmetros `prev` e `next` assim:

```
	{
		"title": "Visão Geral",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Adicionar Usuário",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Adicionar Usuário",
				"url": "/docs/add-user"
			}
		],
	},

```

* Se desejar remover a navegação completamente, adicione o parâmetro `withoutNav`:

```
{
	"title": "Visão Geral",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Se desejar remover apenas a navegação de `página anterior` ou `próxima página`, adicione o parâmetro `withoutPrev` ou `withoutNext`:

```
{
	"title": "Visão Geral",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

ou

```
{
	"title": "Visão Geral",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## Como traduzir um documento

{% roboWikiNote {title: 'Importante', type: 'warning'}%} Você deve criar **Arquivo **.env** e adicione a variável *OPENAI_KEY* com sua chave {% endroboWikiNote %}

Se deseja traduzir seu documento md, você precisa executar o comando:

```bash
npm run translate-md
```

{% roboWikiNote {title: 'Tradução fácil', type: 'warning'}%} Para traduzir tudo de uma vez, todas as novas linhas em páginas, novo documento ou documento alterado, você precisa de apenas um comando agora {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> Além disso, certifique-se de que está traduzindo apenas os arquivos alterados que são **necessários** para serem traduzidos. Por exemplo, você precisa alterar 5 arquivos. Três deles incluem alterações de texto e remoção de algumas informações desatualizadas. E os outros dois precisam atualizar links para algumas imagens ou apenas alterar um link externo. Nesse caso, seria sábio alterar os três primeiros arquivos e traduzi-los e somente então alterar os links nos outros dois.

> A tradução ocorre em todos os arquivos alterados, mas não é necessária para os links atualizados, especialmente se o arquivo for grande e, portanto, a tradução levar algum tempo.

Após executar o comando necessário, tudo o que você precisa fazer é esperar e talvez verificar os arquivos (as traduções de IA têm algumas falhas). Para verificar os arquivos, execute `npm run build` e veja se há algum erro.

### Solução de problemas de tradução

Você pode encontrar alguns problemas com as traduções.

1. Tente executar o comando novamente e veja se funcionou.

2. Às vezes, as tagsNos arquivos md podem ser escritos incorretamente, por exemplo:

```
{%raw %}
	[11ty] 1. Com dificuldades para renderizar o modelo njk ./src/de/docs/edit-wiki.md (via TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Linha 168, Coluna 96]
	[11ty]   tag de bloco desconhecida: endroboWiki (via erro de renderização do modelo)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

Em seguida, basta corrigir a tag.